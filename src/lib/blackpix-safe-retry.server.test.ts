import { describe, expect, it, vi } from "vitest";
import { retryStoredPixCharge } from "./blackpix-safe-retry.server";
const id = "550e8400-e29b-41d4-a716-446655440000";
const key = "f4f1aa01-67cc-4bda-91ac-4ec5ac1b0001";
const row = { id, status: "pending", amount_cents: 1234, currency: "BRL", description: "OCTA order", idempotency_key: key, deposit_id: null, provider_request_id: null };
const deposit = { id: "dep", requestId: "req", pixCopyPasteCode: "pix", amountCents: 1234, currency: "BRL", description: "OCTA order", expiresAt: "2026-12-01T00:00:00Z" };
function mocks(stored = row) {
  const read = vi.fn().mockResolvedValue({ data: stored, error: null });
  const linked = vi.fn().mockResolvedValue({ data: { id }, error: null });
  const readQuery = { eq: () => ({ maybeSingle: read }) };
  const updateQuery = { eq: () => ({ eq: () => ({ is: () => ({ is: () => ({ select: () => ({ maybeSingle: linked }) }) }) }) }) };
  const db = { from: () => ({ select: () => readQuery, update: () => updateQuery }) } as never;
  const create = vi.fn().mockResolvedValue({ success: true, reused: true, deposit });
  return { db, create, linked };
}
describe("BlackPix retry with persisted idempotency", () => {
  it("retries with original persisted data and links deposit", async () => {
    const m = mocks(); const result = await retryStoredPixCharge(id, m);
    expect(m.create).toHaveBeenCalledWith({ amountCents: 1234, description: "OCTA order", idempotencyKey: key });
    expect(result).toEqual({ orderId: id, depositId: "dep", pixCopyPasteCode: "pix", expiresAt: deposit.expiresAt });
  });
  it("rejects invalid order ids before database access", async () => {
    const m = mocks(); await expect(retryStoredPixCharge("not-a-uuid", m)).rejects.toThrow("invalid_order_id");
    expect(m.create).not.toHaveBeenCalled();
  });
  it("does not retry an already linked order", async () => {
    const m = mocks({ ...row, deposit_id: "existing" });
    await expect(retryStoredPixCharge(id, m)).rejects.toThrow("order_not_retryable");
    expect(m.create).not.toHaveBeenCalled();
  });
  it("does not link mismatched provider response", async () => {
    const m = mocks(); m.create.mockResolvedValueOnce({ deposit: { ...deposit, amountCents: 1 } });
    await expect(retryStoredPixCharge(id, m)).rejects.toThrow("provider_mismatch");
    expect(m.linked).not.toHaveBeenCalled();
  });
  it("does not claim success when database linking fails", async () => {
    const m = mocks(); m.linked.mockResolvedValueOnce({ data: null, error: { message: "fail" } });
    await expect(retryStoredPixCharge(id, m)).rejects.toThrow("deposit_link_unavailable");
  });
});
