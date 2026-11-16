import { describe, expect, it } from "vitest";
import { validateCheckout } from "./blackpix-checkout-validation";
const catalog = new Map([["sku-1", { id: "sku-1", name: "Test item", priceCents: 1500, enabled: true }]]);
describe("server-side checkout validation", () => {
  it("computes amount from trusted catalog", () => { expect(validateCheckout([{ id: "sku-1", quantity: 2, pixCents: 1 }], catalog).amountCents).toBe(3000); });
  it("rejects unknown items", () => { expect(() => validateCheckout([{ id: "fake", quantity: 1 }], catalog)).toThrow("unavailable_product"); });
  it("rejects invalid quantities", () => { expect(() => validateCheckout([{ id: "sku-1", quantity: -1 }], catalog)).toThrow("invalid_item"); });
  it("rejects duplicate selections", () => { expect(() => validateCheckout([{ id: "sku-1", quantity: 1 }, { id: "sku-1", quantity: 1 }], catalog)).toThrow("duplicate_item"); });
  it("rejects empty carts", () => { expect(() => validateCheckout([], catalog)).toThrow("invalid_cart"); });
});
