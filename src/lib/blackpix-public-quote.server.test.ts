import { describe, expect, it } from "vitest";
import { allowQuoteAttempt, checkQuoteOrigin, handlePublicPixQuote } from "./blackpix-public-quote.server";
const url = "https://octa.example/api/public/blackpix-quote";
const catalog = JSON.stringify([{ id: "sku", name: "Test", priceCents: 1500, enabled: true }]);
const req = (body: unknown, origin = "https://octa.example") => new Request(url, {
  method: "POST", headers: { origin, "content-type": "application/json" }, body: JSON.stringify(body),
});
describe("public Pix quote guard", () => {
  it("quotes trusted prices, ignoring browser price injection", async () => {
    const response = await handlePublicPixQuote(req({ items: [{ id: "sku", quantity: 2, pixCents: 1 }] }), catalog);
    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({ amountCents: 3000, paymentAvailable: false, shippingConfirmed: false });
  });
  it("rejects cross-origin requests", async () => {
    expect(checkQuoteOrigin(req({ items: [] }, "https://attacker.example"))).toBe(false);
    expect((await handlePublicPixQuote(req({ items: [] }, "https://attacker.example"), catalog)).status).toBe(403);
  });
  it("rejects unknown SKUs", async () => {
    expect((await handlePublicPixQuote(req({ items: [{ id: "unknown", quantity: 1 }] }), catalog)).status).toBe(422);
  });
  it("rejects extra request fields", async () => {
    expect((await handlePublicPixQuote(req({ items: [{ id: "sku", quantity: 1 }], amountCents: 1 }), catalog)).status).toBe(400);
  });
  it("fails closed when catalog is absent", async () => {
    expect((await handlePublicPixQuote(req({ items: [{ id: "sku", quantity: 1 }] }), undefined)).status).toBe(422);
  });
  it("rejects oversized requests", async () => {
    expect((await handlePublicPixQuote(req({ items: [], padding: "x".repeat(5000) }), catalog)).status).toBe(413);
  });
  it("limits bursts per key", () => {
    const key = "test-unique-rate-limit-key";
    for (let i = 0; i < 15; i++) expect(allowQuoteAttempt(key, 1000)).toBe(true);
    expect(allowQuoteAttempt(key, 1000)).toBe(false);
    expect(allowQuoteAttempt(key, 61000)).toBe(true);
  });
});
