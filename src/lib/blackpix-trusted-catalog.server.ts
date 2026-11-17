import { validateCheckout, type CheckoutSelection, type TrustedProduct } from "./blackpix-checkout-validation";

/** Server-only product catalog. Never accept price, product name or availability from the browser. */
export function parseTrustedCatalog(raw: string | undefined): ReadonlyMap<string, TrustedProduct> {
  if (!raw) return new Map(); // fail closed until the merchant configures SKUs
  let parsed: unknown;
  try { parsed = JSON.parse(raw); } catch { throw new Error("invalid_server_catalog"); }
  if (!Array.isArray(parsed) || parsed.length > 1000) throw new Error("invalid_server_catalog");
  const catalog = new Map<string, TrustedProduct>();
  for (const entry of parsed) {
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) throw new Error("invalid_server_catalog");
    const item = entry as Record<string, unknown>;
    if (typeof item['id'] !== "string" || !/^[a-zA-Z0-9_-]{1,80}$/.test(item['id']) ||
      typeof item['name'] !== "string" || item['name'].trim().length === 0 || item['name'].length > 200 ||
      !Number.isSafeInteger(item['priceCents']) || (item['priceCents'] as number) <= 0 ||
      typeof item['enabled'] !== "boolean" || catalog.has(item['id'])) throw new Error("invalid_server_catalog");
    catalog.set(item['id'], { id: item['id'], name: item['name'], priceCents: item['priceCents'] as number, enabled: item['enabled'] });
  }
  return catalog;
}

/** This function is called only on the server; rawCatalog comes from a server environment variable. */
export function quoteTrustedCart(selections: CheckoutSelection[], rawCatalog: string | undefined) {
  return validateCheckout(selections, parseTrustedCatalog(rawCatalog));
}
