import { OCTA_STANDARD_PARCEL, validateDestinationPostalCode } from "./superfrete-standard-parcel.server";

export type ShippingOption = Readonly<{
  serviceId: number; name: string; carrier: string; priceCents: number; deliveryDays: number;
}>;

/** Normalizes a third-party response; invalid rates are never shown or charged. */
export function parseSuperfreteRates(value: unknown): ShippingOption[] {
  if (!Array.isArray(value)) throw new Error("invalid_shipping_response");
  const options: ShippingOption[] = [];
  const seen = new Set<number>();
  for (const entry of value) {
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) continue;
    const rate = entry as Record<string, unknown>;
    if (rate['has_error'] !== false || !Number.isSafeInteger(rate['id']) ||
        typeof rate['name'] !== "string" || !rate['name'].trim() ||
        typeof rate['company'] !== "object" || !rate['company'] || Array.isArray(rate['company'])) continue;
    const carrier = (rate['company'] as Record<string, unknown>)['name'];
    const price = typeof rate.price === "number" ? rate.price : typeof rate.price === "string" && /^[0-9]+(?:[.][0-9]{1,2})?$/.test(rate.price) ? Number(rate.price) : NaN;
    const cents = Math.round(price * 100);
    if (typeof carrier !== "string" || !carrier.trim() || !Number.isFinite(price) || price <= 0 ||
        !Number.isSafeInteger(cents) || !Number.isSafeInteger(rate.delivery_time) ||
        (rate.delivery_time as number) < 1 || seen.has(rate.id as number)) continue;
    seen.add(rate.id as number);
    options.push({ serviceId: rate.id as number, name: rate.name.slice(0, 80),
      carrier: carrier.slice(0, 80), priceCents: cents, deliveryDays: rate.delivery_time as number });
  }
  return options;
}

/** No live requests until official contract and transport eligibility are confirmed. */
export async function quoteSuperfrete(
  destinationPostalCode: unknown,
  options: { enabled: boolean; token: string | undefined; request?: typeof fetch },
): Promise<ShippingOption[]> {
  const destination = validateDestinationPostalCode(destinationPostalCode);
  if (!options.enabled || !options.token) throw new Error("shipping_not_configured");
  // Deliberately disabled pending confirmation of official API request schema and
  // legal/carrier eligibility for all products; never return fabricated prices.
  void destination;
  void OCTA_STANDARD_PARCEL;
  throw new Error("shipping_contract_not_verified");
}
