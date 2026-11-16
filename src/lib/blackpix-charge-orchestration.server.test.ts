import { describe, expect, it, vi } from "vitest";
import { createTrustedPixCharge } from "./blackpix-charge-orchestration.server";
const order = { orderId: "order-1", amountCents: 2500, description: "OCTA Labs - 1 item(ns)", idempotencyKey: "550e8400-e29b-41d4-a716-446655440000" };
const deposit = { id: "dep-1", requestId: "req-1", amountCents: 2500, description: order.description, currency: "BRL", status: "pending", pixCopyPasteCode: "pix-code", expiresAt: "2026-12-01T00:00:00Z" };
function mocks() {
  const maybeSingle = vi.fn().mockResolvedValue({ data: { id: order.orderId }, error: null });
  const select = vi.fn().mockReturnValue({ maybeSingle });
  const is = vi.fn().mockReturnValue({ select });
  const eq = vi.fn().mockReturnValue({ eq: vi.fn().mockReturnValue({ is }) });
  const update = vi.fn().mockReturnValue({ eq });
  const from = vi.fn().mockReturnValue({ update });
  const persist = vi.fn().mockResolvedValue(order);
  const create = vi.fn().mockResolvedValue({ success: true, reused: false, deposit });
  return { persist, create, db: { from } as never, update };
}
describe("trusted BlackPix charge orchestration", () => {
  it("persists first, charges with stored idempotency key, then links provider", async () => {
    const m = mocks();
    const result = await createTrustedPixCharge([{ id: "sku-1", quantity: 1 }], m);
    expect(m.persist.mock.invocationCallOrder[0]).toBeLessThan(m.create.mock.invocationCallOrder[0]);
    expect(m.create).toHaveBeenCalledWith({ amountCents: 2500, description: order.description, idempotencyKey: order.idempotencyKey });
    expect(m.update).toHaveBeenCalledWith(expect.objectContaining({ deposit_id: "dep-1", provider_request_id: "req-1" }));
    expect(result.pixCopyPasteCode).toBe("pix-code");
  });
  it("does not call provider when persistence fails", async () => {
    const m = mocks(); m.persist.mockRejectedValueOnce(new Error("order_storage_unavailable"));
    await expect(createTrustedPixCharge([], m)).rejects.toThrow("order_storage_unavailable");
    expect(m.create).not.toHaveBeenCalled();
  });
  it("rejects mismatched provider amount", async () => {
    const m = mocks(); m.create.mockResolvedValueOnce({ deposit: { ...deposit, amountCents: 1 } });
    await expect(createTrustedPixCharge([], m)).rejects.toThrow("provider_mismatch");
    expect(m.update).not.toHaveBeenCalled();
  });
  it("fails closed when linking fails", async () => {
    const m = mocks(); m.db = { from: () => ({ update: () => ({ eq: () => ({ eq: () => ({ is: () => ({ select: () => ({ maybeSingle: async () => ({ data: null, error: { message: "failed" } }) }) }) }) }) }) }) } as never;
    await expect(createTrustedPixCharge([], m)).rejects.toThrow("deposit_link_unavailable");
  });
});
