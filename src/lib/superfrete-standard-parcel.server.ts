/** Fixed shipping parcel used only for eligible, single-parcel orders.
 * Values are server-owned: never accept package dimensions from a checkout request.
 * Shipping quotes remain unavailable until an official SuperFrete API contract
 * and permitted product categories have been verified.
 */
export const OCTA_STANDARD_PARCEL = Object.freeze({
  originPostalCode: "33239210",
  lengthCm: 20,
  widthCm: 15,
  heightCm: 10,
  totalWeightKg: 1,
});

export type StandardParcel = typeof OCTA_STANDARD_PARCEL;

export function validateDestinationPostalCode(input: unknown): string {
  if (typeof input !== "string") throw new Error("invalid_destination_postal_code");
  const digits = input.replace(/[.\-\s]/g, "");
  if (!/^\d{8}$/.test(digits)) throw new Error("invalid_destination_postal_code");
  return digits;
}

/** Prevent a parcel assumption from silently covering incompatible orders.
 * This is an operational eligibility gate, NOT proof of carrier acceptance.
 */
export function assertStandardParcelEligible(input: {
  packedWeightKg: number;
  fitsStandardBox: boolean;
  requiresSpecialHandling: boolean;
}): void {
  if (!Number.isFinite(input.packedWeightKg) || input.packedWeightKg <= 0 ||
      input.packedWeightKg > OCTA_STANDARD_PARCEL.totalWeightKg ||
      input.fitsStandardBox !== true || input.requiresSpecialHandling !== false) {
    throw new Error("manual_shipping_review_required");
  }
}
