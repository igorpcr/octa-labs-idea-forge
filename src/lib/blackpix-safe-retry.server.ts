import { createPixDeposit } from "./blackpix-deposits.server";
import { getBlackPixSupabaseAdmin } from "./blackpix-supabase.server";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
type StoredOrder = {
  id: string; status: string; amount_cents: number; currency: string;
  description: string; idempotency_key: string;
  deposit_id: string | null; provider_request_id: string | null;
};
/**
 * Server-only recovery for a previously persisted, unlinked Pix order.
 * Reuses the exact original UUID/amount/description; never inserts a new order.
 * Concurrent retries are not a public API and must be serialized by a trusted caller.
 */
export async function retryStoredPixCharge(
  orderId: string,
  deps: { db?: ReturnType<typeof getBlackPixSupabaseAdmin>; create?: typeof createPixDeposit } = {},
): Promise<{ orderId: string; depositId: string; pixCopyPasteCode: string; expiresAt: string }> {
  if (!UUID.test(orderId)) throw new Error("invalid_order_id");
  const db = deps.db ?? getBlackPixSupabaseAdmin();
  const { data, error } = await db.from("octa_pix_orders")
    .select("id,status,amount_cents,currency,description,idempotency_key,deposit_id,provider_request_id")
    .eq("id", orderId).maybeSingle();
  if (error || !data) throw new Error("order_unavailable");
  const order = data as StoredOrder;
  if (order.status !== "pending" || order.deposit_id !== null || order.provider_request_id !== null ||
      order.currency !== "BRL" || !Number.isSafeInteger(order.amount_cents) || order.amount_cents <= 0 ||
      typeof order.description !== "string" || !order.description.trim() || !UUID.test(order.idempotency_key)) {
    throw new Error("order_not_retryable");
  }
  const result = await (deps.create ?? createPixDeposit)({
    amountCents: order.amount_cents, description: order.description, idempotencyKey: order.idempotency_key,
  });
  const deposit = result.deposit;
  if (!deposit.id || !deposit.requestId || !deposit.pixCopyPasteCode ||
      deposit.amountCents !== order.amount_cents || deposit.currency !== order.currency ||
      deposit.description !== order.description) throw new Error("provider_mismatch");
  const { data: linked, error: linkError } = await db.from("octa_pix_orders")
    .update({ deposit_id: deposit.id, provider_request_id: deposit.requestId, updated_at: new Date().toISOString() })
    .eq("id", order.id).eq("status", "pending").is("deposit_id", null)
    .is("provider_request_id", null).select("id").maybeSingle();
  if (linkError || linked?.id !== order.id) throw new Error("deposit_link_unavailable");
  return { orderId: order.id, depositId: deposit.id, pixCopyPasteCode: deposit.pixCopyPasteCode, expiresAt: deposit.expiresAt };
}
