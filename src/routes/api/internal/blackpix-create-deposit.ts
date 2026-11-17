import { createFileRoute } from "@tanstack/react-router";
import { createHash, timingSafeEqual } from "node:crypto";
import { randomUUID } from "node:crypto";
import { getBlackPixSupabaseAdmin } from "@/lib/blackpix-supabase.server";
import { createPixDeposit } from "@/lib/blackpix-deposits.server";

const json = (status: number, body: Record<string, unknown>) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

/**
 * Administrative charge creation only. Do NOT call this route from the public
 * checkout. Amount and description are supplied by a trusted server/admin,
 * never accepted as authoritative from a shopper's cart.
 */
async function handle(request: Request): Promise<Response> {
  const secret = process.env["OCTA_RECONCILE_SECRET"];
  const auth = request.headers.get("Authorization");
  if (!secret || secret.length < 32) return json(503, { error: "admin_secret_not_configured" });
  if (!auth?.startsWith("Bearer ")) return json(401, { error: "unauthorized" });
  const actual = createHash("sha256").update(auth.slice(7)).digest();
  const expected = createHash("sha256").update(secret).digest();
  if (!timingSafeEqual(actual, expected)) return json(401, { error: "unauthorized" });
  let body: unknown;
  try { body = await request.json(); } catch { return json(400, { error: "invalid_json" }); }
  if (!body || typeof body !== "object" || Array.isArray(body)) return json(400, { error: "invalid_body" });
  const input = body as Record<string, unknown>;
  if (!Number.isSafeInteger(input['amountCents']) || (input['amountCents'] as number) <= 0 ||
      typeof input['description'] !== "string" || input['description'].trim().length < 1 ||
      input['description'].length > 255) return json(400, { error: "invalid_charge" });
  const db = getBlackPixSupabaseAdmin();
  const idempotencyKey = randomUUID();
  const { data: order, error: insertError } = await db.from("octa_pix_orders")
    .insert({ amount_cents: input['amountCents'], description: input['description'],
      idempotency_key: idempotencyKey, status: "pending" })
    .select("id").single();
  if (insertError || !order) return json(503, { error: "order_storage_unavailable" });
  try {
    const response = await createPixDeposit({
      amountCents: input['amountCents'] as number,
      description: input['description'],
      idempotencyKey,
    });
    const deposit = response.deposit;
    if (deposit['amountCents'] !== input['amountCents'] || deposit.currency !== "BRL" ||
        !deposit.id || !deposit.requestId) {
      console.error("[blackpix_create] provider_mismatch");
      return json(502, { error: "provider_mismatch", orderId: order.id });
    }
    const { data: linked, error: updateError } = await db.from("octa_pix_orders")
      .update({ deposit_id: deposit.id, provider_request_id: deposit.requestId, updated_at: new Date().toISOString() })
      .eq("id", order.id).eq("status", "pending").is("deposit_id", null).select("id").maybeSingle();
    if (updateError || !linked) return json(503, { error: "deposit_link_unavailable", orderId: order.id });
    return json(201, { orderId: order.id, depositId: deposit.id, status: deposit.status,
      pixCopyPasteCode: deposit.pixCopyPasteCode, expiresAt: deposit.expiresAt });
  } catch {
    // Preserve persisted idempotency key; do not automatically create another charge.
    console.error("[blackpix_create] provider_unavailable");
    return json(503, { error: "provider_unavailable", orderId: order.id });
  }
}

export const Route = createFileRoute("/api/internal/blackpix-create-deposit")({
  server: { handlers: { POST: ({ request }) => handle(request) } },
});
