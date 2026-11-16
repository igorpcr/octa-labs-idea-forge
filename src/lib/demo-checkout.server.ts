import { quoteTrustedCart } from "./blackpix-trusted-catalog.server";
export function computeDemoCheckout(items: { id: string; quantity: number }[], catalog: string, shippingCents: number) {
  if (!Number.isSafeInteger(shippingCents) || shippingCents < 0) throw new Error("invalid_shipping");
  const quote = quoteTrustedCart(items, catalog);
  const totalCents = quote.amountCents + shippingCents;
  if (!Number.isSafeInteger(totalCents)) throw new Error("invalid_total");
  return { subtotalCents: quote.amountCents, shippingCents, totalCents };
}
export function selectShippingFailure() {
  return { code: "shipping_unavailable", manualReview: true, paymentAvailable: false } as const;
}
