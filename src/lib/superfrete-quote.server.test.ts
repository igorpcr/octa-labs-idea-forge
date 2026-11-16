import { describe, expect, it } from "vitest";
import { parseSuperfreteRates, quoteSuperfrete } from "./superfrete-quote.server";

describe("SuperFrete response safety", () => {
  it("rejects non-array responses", () => {
    expect(() => parseSuperfreteRates({ error: "bad" })).toThrow("invalid_shipping_response");
  });
  it("filters errors and malformed prices, never invents a rate", () => {
    expect(parseSuperfreteRates([
      { id: 1, name: "PAC", price: "18.61", delivery_time: 5, company: { name: "Correios" }, has_error: false },
      { id: 17, name: "Mini Envios", price: 0, delivery_time: 8, company: { name: "Correios" }, has_error: true },
      { id: 2, name: "SEDEX", price: "abc", delivery_time: 3, company: { name: "Correios" }, has_error: false },
    ])).toEqual([{ serviceId: 1, name: "PAC", carrier: "Correios", priceCents: 1861, deliveryDays: 5 }]);
  });
  it("does not call any external API while integration is disabled", async () => {
    const request = async () => { throw new Error("unexpected_network_call"); };
    await expect(quoteSuperfrete("30123-456", { enabled: false, token: "fake", request: request as typeof fetch })).rejects.toThrow("shipping_not_configured");
    await expect(quoteSuperfrete("30123-456", { enabled: true, token: "fake", request: request as typeof fetch })).rejects.toThrow("shipping_contract_not_verified");
  });
});
