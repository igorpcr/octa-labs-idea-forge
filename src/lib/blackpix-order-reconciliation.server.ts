/**
 * Server-only reconciliation of persisted Octa Pix orders.
 * Never trust undocumented webhook payload fields to confirm payment.
 */
import { getBlackPixSupabaseAdmin } from "./blackpix-supabase.server";
import { reconcilePixCharge } from "./blackpix-reconciliation.server";

type Outcome = "paid" | "already_paid" | "pending" | "mismatch" | "invalid_provider_response" | "not_found" | "unavailable";
type OrderRow = {
  id: string; status: string; amount_cents: number;
  deposit_id: string | null; provider_request_id: string | null;
};
const validUuid = (id: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

export async function reconcileStoredPixOrder(orderId: string): Promise<{ outcome: Outcome }> {
  if (!validUuid(orderId)) return { outcome: "not_found" };
  const db = getBlackPixSupabaseAdmin();
  const { data, error } = await db.from("octa_pix_orders")
    .select("id,status,amount_cents,deposit_id,provider_request_id")
    .eq("id", orderId).maybeSingle();
  if (error) { console.error("[blackpix_reconcile] order_read_failed", { code: error.code }); return { outcome: "unavailable" }; }
  if (!data) return { outcome: "not_found" };
  const row = data as OrderRow;
  if (row.status === "paid") return { outcome: "already_paid" };
  if (row.status !== "pending" || !row.deposit_id || !row.provider_request_id ||
      !Number.isSafeInteger(row.amount_cents) || row.amount_cents <= 0) return { outcome: "unavailable" };
  const assessment = await reconcilePixCharge({
    orderId: row.id, depositId: row.deposit_id,
    requestId: row.provider_request_id, amountCents: row.amount_cents,
  });
  if (assessment.outcome !== "paid") return { outcome: assessment.outcome };
  const { data: updated, error: updateError } = await db.rpc("confirm_octa_pix_order", {
    p_order_id: row.id,
    p_deposit_id: row.deposit_id,
    p_request_id: row.provider_request_id,
    p_amount_cents: row.amount_cents,
    p_paid_at: assessment.paidAt,
  });
  if (updateError) {
    console.error("[blackpix_reconcile] order_update_failed", { code: updateError.code });
    return { outcome: "unavailable" };
  }
  return { outcome: updated === true ? "paid" : "unavailable" };
}

/** Bound work per signed webhook. Reconciliation failures never fabricate a paid order. */
export async function reconcilePendingPixOrders(limit = 10): Promise<{ checked: number; paid: number; failed: number }> {
  const db = getBlackPixSupabaseAdmin();
  const { data, error } = await db.from("octa_pix_orders")
    .select("id").eq("status", "pending").not("deposit_id", "is", null)
    .order("created_at", { ascending: true }).limit(Math.min(Math.max(limit, 1), 10));
  if (error) throw new Error("Unable to list pending Pix orders");
  let checked = 0, paid = 0, failed = 0;
  for (const order of data ?? []) {
    checked++;
    try {
      const result = await reconcileStoredPixOrder(order.id);
      if (result.outcome === "paid") paid++;
      if (result.outcome === "unavailable") failed++;
    } catch {
      failed++;
      console.error("[blackpix_reconcile] provider_query_failed");
    }
  }
  return { checked, paid, failed };
}
