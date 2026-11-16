import { describe, expect, it, vi } from "vitest";
import { persistTrustedPixOrder } from "./blackpix-order-persistence.server";
const catalogJson = JSON.stringify([{ id: "sku-1", name: "Fixture", priceCents: 1200, enabled: true }]);
const uuid = () => "550e8400-e29b-41d4-a716-446655440000";
function fakeDb() {
  const single = vi.fn().mockResolvedValue({ data: { id: "order-id" }, error: null });
  const select = vi.fn().mockReturnValue({ single });
  const insert = vi.fn().mockReturnValue({ select });
  const from = vi.fn().mockReturnValue({ insert });
  return { db: { from } as never, from, insert };
}
describe("BlackPix trusted order persistence", () => {
  it("stores a server-calculated amount and stable idempotency key", async () => {
    const { db, from, insert } = fakeDb();
    const result = await persistTrustedPixOrder([{ id: "sku-1", quantity: 2 }], { catalogJson, db, uuid });
    expect(from).toHaveBeenCalledWith("octa_pix_orders");
    expect(insert).toHaveBeenCalledWith(expect.objectContaining({ amount_cents: 2400, status: "pending", idempotency_key: uuid() }));
    expect(result).toEqual({ orderId: "order-id", amountCents: 2400, description: "OCTA Labs - 2 item(ns)", idempotencyKey: uuid() });
  });
  it("does not touch database for unknown SKUs", async () => {
    const { db, from } = fakeDb();
    await expect(persistTrustedPixOrder([{ id: "unknown", quantity: 1 }], { catalogJson, db, uuid })).rejects.toThrow("unavailable_product");
    expect(from).not.toHaveBeenCalled();
  });
  it("fails closed without catalog", async () => {
    const { db, from } = fakeDb();
    await expect(persistTrustedPixOrder([{ id: "sku-1", quantity: 1 }], { catalogJson: "[]", db, uuid })).rejects.toThrow("unavailable_product");
    expect(from).not.toHaveBeenCalled();
  });
  it("reports storage failure without invoking payment provider", async () => {
    const db = { from: () => ({ insert: () => ({ select: () => ({ single: async () => ({ data: null, error: { message: "failed" } }) }) }) }) } as never;
    await expect(persistTrustedPixOrder([{ id: "sku-1", quantity: 1 }], { catalogJson, db, uuid })).rejects.toThrow("order_storage_unavailable");
  });
});
