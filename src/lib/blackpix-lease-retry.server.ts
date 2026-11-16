import { randomUUID } from "node:crypto";
import { retryStoredPixCharge } from "./blackpix-safe-retry.server";
import { getBlackPixSupabaseAdmin } from "./blackpix-supabase.server";

/**
 * Trusted server-side retry with an atomic database lease. Requires migration 0004.
 * The lease coordinates workers; the persisted provider idempotency key remains
 * the source of duplicate-charge protection if a worker times out.
 * Never expose this function directly to an unauthenticated HTTP route.
 */
export async function retryPixChargeWithLease(
  orderId: string,
  deps: {
    db?: ReturnType<typeof getBlackPixSupabaseAdmin>;
    retry?: typeof retryStoredPixCharge;
    token?: () => string;
  } = {},
) {
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(orderId))
    throw new Error("invalid_order_id");
  const db = deps.db ?? getBlackPixSupabaseAdmin();
  const token = (deps.token ?? randomUUID)();
  const { data: claimed, error: claimError } = await db.rpc("claim_octa_pix_charge_lease", {
    p_order_id: orderId, p_token: token, p_lease_seconds: 90,
  });
  if (claimError) throw new Error("lease_claim_unavailable");
  if (claimed !== true) throw new Error("order_busy_or_unavailable");
  try {
    return await (deps.retry ?? retryStoredPixCharge)(orderId, { db });
  } finally {
    // A release error must not mask the provider outcome. Expiry is the fallback.
    try {
      const { error } = await db.rpc("release_octa_pix_charge_lease", {
        p_order_id: orderId, p_token: token,
      });
      if (error) console.error("[blackpix] lease_release_failed");
    } catch { console.error("[blackpix] lease_release_failed"); }
  }
}
