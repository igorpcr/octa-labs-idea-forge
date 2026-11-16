import { createFileRoute } from "@tanstack/react-router";
import { createHash, timingSafeEqual } from "node:crypto";

const respond = (status: number, data: Record<string, unknown>) =>
  Response.json(data, { status, headers: { "Cache-Control": "no-store" } });

async function handle(request: Request): Promise<Response> {
  const expected = process.env["OCTA_RECONCILE_SECRET"];
  if (!expected || expected.length < 32) return respond(503, { error: "reconciliation_not_configured" });
  const supplied = request.headers.get("Authorization");
  if (!supplied?.startsWith("Bearer ")) return respond(401, { error: "unauthorized" });
  const a = createHash("sha256").update(supplied.slice(7)).digest();
  const b = createHash("sha256").update(expected).digest();
  if (!timingSafeEqual(a, b)) return respond(401, { error: "unauthorized" });
  try {
    const { reconcilePendingPixOrders } = await import("@/lib/blackpix-order-reconciliation.server");
    const result = await reconcilePendingPixOrders(5);
    return respond(result.failed ? 503 : 200, result);
  } catch {
    console.error("[blackpix_reconcile] batch_unavailable");
    return respond(503, { error: "reconciliation_unavailable" });
  }
}

/** Private scheduled reconciliation. Never expose the secret to the browser. */
export const Route = createFileRoute("/api/internal/blackpix-reconcile")({
  server: { handlers: { POST: ({ request }) => handle(request) } },
});
