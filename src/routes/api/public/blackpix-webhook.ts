import { createFileRoute } from "@tanstack/react-router";
import { createHash } from "node:crypto";
import { validBlackPixSignature } from "@/lib/blackpix-webhook";

const json = (status: number, payload: Record<string, string>) =>
  Response.json(payload, { status, headers: { "Cache-Control": "no-store" } });

/**
 * The webhook contract does not specify event payload fields.
 * Verify the exact raw body and durably store the authenticated event before
 * returning 200. Never mark an order paid based on this payload alone.
 * A separate worker must reconcile pending deposits against BlackPix GET API.
 */
async function receive(request: Request): Promise<Response> {
  const secret = process.env["BLACKPIX_WEBHOOK_SECRET"];
  if (!secret) { console.error("[blackpix_webhook] webhook_not_configured"); return json(503, { error: "webhook_not_configured" }); }
  let raw: string;
  try { raw = await request.text(); }
  catch { return json(400, { error: "invalid_body" }); }
  if (raw.length > 262144) return json(413, { error: "payload_too_large" });
  const signature = request.headers.get("X-BlackPix-Signature");
  try {
    if (!(await validBlackPixSignature(raw, signature, secret))) {
      return json(401, { error: "invalid_signature" });
    }
  } catch { console.error("[blackpix_webhook] signature_verification_unavailable"); return json(503, { error: "signature_verification_unavailable" }); }
  let payload: unknown;
  try { payload = JSON.parse(raw); }
  catch { return json(400, { error: "invalid_json" }); }
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return json(400, { error: "invalid_payload" });
  }
  // Signature digest is unique for provider retries of the same signed request.
  const digest = createHash("sha256").update(signature ?? "").digest("hex");
  try {
    const { getBlackPixSupabaseAdmin } = await import("@/lib/blackpix-supabase.server");
    const supabaseAdmin = getBlackPixSupabaseAdmin();
    // The inbox is created by migration 0003; generated Supabase types are
    // refreshed separately. No browser-facing access is granted.
    const { error } = await (supabaseAdmin as unknown as {
      from: (name: string) => {
        upsert: (row: Record<string, unknown>, options: { onConflict: string; ignoreDuplicates: boolean }) =>
          PromiseLike<{ error: { code?: string; hint?: string } | null }>;
      };
    }).from("blackpix_webhook_inbox").upsert(
      { signature_digest: digest, event_payload: payload },
      { onConflict: "signature_digest", ignoreDuplicates: true },
    );
    if (error) {
      console.error("[blackpix_webhook] storage_error", { code: error.code ?? "unknown", hint: error.hint ? "present" : "absent" });
      return json(503, { error: "webhook_storage_unavailable" });
    }
  } catch {
    return json(503, { error: "webhook_storage_unavailable" });
  }
  // A verified webhook is a trigger, not proof of payment. Query the provider
  // for a bounded batch of persisted orders; never trust event payload status.
  // Reconciliation failures do not invalidate a durably stored webhook.
  try {
    const { reconcilePendingPixOrders } = await import("@/lib/blackpix-order-reconciliation.server");
    const result = await reconcilePendingPixOrders(5);
    if (result.failed) console.error("[blackpix_webhook] reconciliation_incomplete", { failed: result.failed });
  } catch {
    console.error("[blackpix_webhook] reconciliation_unavailable");
  }
  return json(200, { status: "received" });
}

export const Route = createFileRoute("/api/public/blackpix-webhook")({
  server: { handlers: { POST: ({ request }) => receive(request) } },
});
