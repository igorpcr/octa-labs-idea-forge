import { describe, expect, it } from "vitest";
import { parseTrustedCatalog, quoteTrustedCart } from "./blackpix-trusted-catalog.server";
const fixture = JSON.stringify([{ id: "sku-test", name: "Test item", priceCents: 2500, enabled: true }]);
describe("trusted server catalog", () => {
  it("fails closed when no catalog configured", () => { expect(() => quoteTrustedCart([{ id: "sku-test", quantity: 1 }], undefined)).toThrow("unavailable_product"); });
  it("prices from server config rather than client", () => { expect(quoteTrustedCart([{ id: "sku-test", quantity: 2, pixCents: 1 } as never], fixture).amountCents).toBe(5000); });
  it("rejects duplicate SKUs", () => { expect(() => parseTrustedCatalog(JSON.stringify([{ id: "x", name: "X", priceCents: 100, enabled: true }, { id: "x", name: "Y", priceCents: 100, enabled: true }]))).toThrow("invalid_server_catalog"); });
  it("rejects disabled products", () => { expect(() => quoteTrustedCart([{ id: "sku-test", quantity: 1 }], fixture.replace('"enabled":true', '"enabled":false'))).toThrow("unavailable_product"); });
  it("rejects malformed configuration", () => { expect(() => parseTrustedCatalog("{")).toThrow("invalid_server_catalog"); });
});
