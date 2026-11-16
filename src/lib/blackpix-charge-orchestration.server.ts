import type { CheckoutSelection } from "./blackpix-checkout-validation";
import { persistTrustedPixOrder } from "./blackpix-order-persistence.server";
import { createPixDeposit } from "./blackpix-deposits.server";
import { getBlackPixSupabaseAdmin } from "./blackpix-supabase.server";

/** Trusted server-side orchestration only. Never call from an unauthenticated public endpoint. */
export async function createTrustedPixCharge(
  selections: CheckoutSelection[],
  deps: {
    persist?: typeof persistTrustedPixOrder;
    create?: typeof createPixDeposit;
    db?: ReturnType<typeof getBlackPixSupabaseAdmin>;
  } = {},
): Promise<{ orderId: string; depositId: string; status: string; pixCopyPasteCode: string; expiresAt: string }> {
  const persist = deps.persist ?? persistTrustedPixOrder;
  const create = deps.create ?? createPixDeposit;
  const db = deps.db ?? getBlackPixSupabaseAdmin();
  // Persist the exact amount and UUID before calling the provider.
  const order = await persist(selections);
  const response = await create({ amountCents: order.amountCents, description: order.description, idempotencyKey: order.idempotencyKey });
  const deposit = response.deposit;
  if (!deposit.id || !deposit.requestId || !deposit.pixCopyPasteCode ||
      deposit.amountCents !== order.amountCents || deposit.currency !== "BRL" ||
      deposit.description !== order.description) throw new Error("provider_mismatch");
  const { data, error } = await db.from("octa_pix_orders")
    .update({ deposit_id: deposit.id, provider_request_id: deposit.requestId, updated_at: new Date().toISOString() })
    .eq("id", order.orderId).eq("status", "pending").is("deposit_id", null).select("id").maybeSingle();
  if (error || !data || data.id !== order.orderId) throw new Error("deposit_link_unavailable");
  return { orderId: order.orderId, depositId: deposit.id, status: deposit.status,
    pixCopyPasteCode: deposit.pixCopyPasteCode, expiresAt: deposit.expiresAt };
}
