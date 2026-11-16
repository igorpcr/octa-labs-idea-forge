/**
 * Provider-authoritative payment reconciliation.
 * This does not infer the undocumented webhook payload shape. A signed webhook
 * may trigger reconciliation of known pending deposits, but NEVER mark an order
 * paid merely because a webhook arrived.
 */
import { getPixDeposit } from "./blackpix-deposits.server";

export type StoredPixCharge = {
  orderId: string;
  depositId: string;
  amountCents: number;
  requestId: string;
};

export type Reconciliation =
  | { outcome: "paid"; orderId: string; depositId: string; paidAt: string }
  | { outcome: "pending"; orderId: string; depositId: string; providerStatus: string }
  | { outcome: "mismatch"; orderId: string; depositId: string }
  | { outcome: "invalid_provider_response"; orderId: string; depositId: string };

export function assessPixDeposit(charge: StoredPixCharge, raw: unknown): Reconciliation {
  const base = { orderId: charge.orderId, depositId: charge.depositId };
  if (!raw || typeof raw !== "object") return { ...base, outcome: "invalid_provider_response" };
  const result = raw as Record<string, unknown>;
  // GET response envelope has not been documented. Accept either the documented
  // creation-style envelope or the deposit object, but only after strict checks.
  const candidate = result.deposit && typeof result.deposit === "object" ? result.deposit : result;
  const deposit = candidate as Record<string, unknown>;
  if (
    typeof deposit.id !== "string" ||
    typeof deposit.requestId !== "string" ||
    !Number.isSafeInteger(deposit.amountCents) ||
    typeof deposit.status !== "string" ||
    deposit.currency !== "BRL"
  ) return { ...base, outcome: "invalid_provider_response" };
  if (
    deposit.id !== charge.depositId ||
    deposit.requestId !== charge.requestId ||
    deposit.amountCents !== charge.amountCents
  ) return { ...base, outcome: "mismatch" };
  if (deposit.status !== "paid") {
    return { ...base, outcome: "pending", providerStatus: deposit.status };
  }
  if (typeof deposit.paidAt !== "string" || !Number.isFinite(Date.parse(deposit.paidAt))) {
    return { ...base, outcome: "invalid_provider_response" };
  }
  return { ...base, outcome: "paid", paidAt: deposit.paidAt };
}

export async function reconcilePixCharge(
  charge: StoredPixCharge,
  fetcher: typeof fetch = fetch,
): Promise<Reconciliation> {
  if (
    !charge.orderId || !charge.depositId || !charge.requestId ||
    !Number.isSafeInteger(charge.amountCents) || charge.amountCents <= 0
  ) throw new Error("Invalid stored charge");
  const response = await getPixDeposit(charge.depositId, fetcher);
  return assessPixDeposit(charge, response);
}

/**
 * A 'paid' result is a verified eligibility signal, not a database update.
 * The caller must atomically transition its persisted order from pending to
 * paid exactly once, conditional on the same depositId and amountCents.
 */
