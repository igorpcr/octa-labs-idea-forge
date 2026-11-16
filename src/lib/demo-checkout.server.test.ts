import { describe, it, expect } from "vitest";
import { computeDemoCheckout, selectShippingFailure } from "./demo-checkout.server";

describe("demo checkout fail-closed", () => {
  it("calculates trusted subtotal plus shipping without browser totals", () => {
    expect(computeDemoCheckout([{ id: "kit-pesquisa-bioquimica", quantity: 2 }],
      '[{"id":"kit-pesquisa-bioquimica","name":"Kit de Pesquisa Bioquímica","priceCents":10000,"enabled":true}]',1432))
      .toEqual({ subtotalCents: 20000, shippingCents: 1432, totalCents: 21432 });
  });
  it("rejects invalid shipping price", () => {
    expect(() => computeDemoCheckout([{ id: "kit-pesquisa-bioquimica", quantity: 1 }],
      '[{"id":"kit-pesquisa-bioquimica","name":"Kit de Pesquisa Bioquímica","priceCents":10000,"enabled":true}]',-1)).toThrow();
  });
  it("fails closed when SuperFrete fails, never inventing a fixed price", () => {
    expect(selectShippingFailure()).toEqual({ code: "shipping_unavailable", manualReview: true, paymentAvailable: false });
  });
});
