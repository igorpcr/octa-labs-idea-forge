/** Validate checkout selections against a trusted server-side catalog. */
export type TrustedProduct = { id: string; name: string; priceCents: number; enabled: boolean };
export type CheckoutSelection = { id: string; quantity: number };
export type ValidatedCheckout = { lines: { id: string; name: string; quantity: number; unitCents: number }[]; amountCents: number };
export function validateCheckout(input: unknown, catalog: ReadonlyMap<string, TrustedProduct>): ValidatedCheckout {
  if (!Array.isArray(input) || input.length === 0 || input.length > 50) throw new Error("invalid_cart");
  const seen = new Set<string>();
  let amountCents = 0;
  const lines = input.map((entry: unknown) => {
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) throw new Error("invalid_item");
    const item = entry as Record<string, unknown>;
    if (typeof item.id !== "string" || !item.id || !Number.isSafeInteger(item.quantity) || (item.quantity as number) < 1 || (item.quantity as number) > 99) throw new Error("invalid_item");
    if (seen.has(item.id)) throw new Error("duplicate_item");
    seen.add(item.id);
    const product = catalog.get(item.id);
    if (!product || !product.enabled || !Number.isSafeInteger(product.priceCents) || product.priceCents <= 0) throw new Error("unavailable_product");
    const lineTotal = product.priceCents * (item.quantity as number);
    if (!Number.isSafeInteger(lineTotal) || !Number.isSafeInteger(amountCents + lineTotal)) throw new Error("invalid_total");
    amountCents += lineTotal;
    return { id: product.id, name: product.name, quantity: item.quantity as number, unitCents: product.priceCents };
  });
  return { lines, amountCents };
}
