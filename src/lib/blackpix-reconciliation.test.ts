import { describe, expect, it } from "vitest";
import { assessPixDeposit, type StoredPixCharge } from "./blackpix-reconciliation.server";

const charge: StoredPixCharge = {
  orderId: "order-123", depositId: "PIX-123", requestId: "3f1c2a4e-9b7d-4c61-8e2f-5a6b7c8d9e0f", amountCents: 19700,
};
const deposit = {
  id: charge.depositId, requestId: charge.requestId, amountCents: charge.amountCents,
  currency: "BRL", status: "paid", paidAt: "2026-11-15T20:41:00.000Z",
};
describe("BlackPix reconciliation", () => {
  it("accepts provider-confirmed paid deposit with exact persisted identifiers and amount", () => {
    expect(assessPixDeposit(charge, { success: true, deposit })).toEqual({
      outcome: "paid", orderId: charge.orderId, depositId: charge.depositId, paidAt: deposit.paidAt,
    });
  });
  it("does not accept pending deposits", () => {
    expect(assessPixDeposit(charge, { deposit: { ...deposit, status: "pending", paidAt: null } }).outcome).toBe("pending");
  });
  it("rejects a different amount, request or deposit id", () => {
    for (const changed of [
      { amountCents: 100 }, { requestId: "other" }, { id: "PIX-other" },
    ]) expect(assessPixDeposit(charge, { deposit: { ...deposit, ...changed } }).outcome).toBe("mismatch");
  });
  it("rejects malformed or missing paidAt and incomplete API response", () => {
    expect(assessPixDeposit(charge, { deposit: { ...deposit, paidAt: null } }).outcome).toBe("invalid_provider_response");
    expect(assessPixDeposit(charge, { deposit: { ...deposit, paidAt: "bad" } }).outcome).toBe("invalid_provider_response");
    expect(assessPixDeposit(charge, { success: true }).outcome).toBe("invalid_provider_response");
  });
});
