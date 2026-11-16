/**
 * Internal server-side reconciliation. Never expose this function as a public
 * route without authorization and rate limiting. No webhook payload assumptions.
 */
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { reconcilePixCharge } from "./blackpix-reconciliation.server";

export async function reconcileStoredPixOrder(orderId: string): Promise<
  { outcome: "paid" | "already_paid" | "pending" | "mismatch" | "invalid_provider_response" | "not_found" | "unavailable" }
> {
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(orderId)) {
    return { outcome: "not_found" };
  }
  // This table is introduced by migration 0002. The database types are not
  // regenerated until the migration is deployed, so use a narrow local cast.
  const db = supabaseAdmin as unknown as {
    from: (table: string) => {
      select: (fields: string) => { eq: (column: string, value: string) => { maybeSingle: () => Promise<{ data: unknown; error: unknown }> } };
    };
    rpc: (name: string, params: Record<string, unknown>) => Promise<{ data: unknown; error: unknown }>;
  };
  const { data, error } = await db.from("octa_pix_orders")
    .select("id,status,amount_cents,deposit_id,provider_request_id")
    .eq("id", orderId).maybeSingle();
  if (error) return { outcome: "unavailable" };
  if (!data || typeof data !== "object") return { outcome: "not_found" };
  const row = data as Record<string, unknown>;
  if (row.status === "paid") return { outcome: "already_paid" };
  if (
    row.status !== "pending" ||
    typeof row.deposit_id !== "string" ||
    typeof row.provider_request_id !== "string" ||
    !Number.isSafeInteger(row.amount_cents)
  ) return { outcome: "unavailable" };
  const result = await reconcilePixCharge({
    orderId,
    depositId: row.deposit_id,
    requestId: row.provider_request_id,
    amountCents: row.amount_cents as number,
  });
  if (result.outcome !== "paid") {
    return { outcome: result.outcome === "pending" ? "pending" : result.outcome };
  }
  const updated = await db.rpc("confirm_octa_pix_order", {
    p_order_id: orderId,
    p_deposit_id: row.deposit_id,
    p_request_id: row.provider_request_id,
    p_amount_cents: row.amount_cents,
    p_paid_at: result.paidAt,
  });
  if (updated.error) return { outcome: "unavailable" };
  return { outcome: updated.data === true ? "paid" : "unavailable" };
}
