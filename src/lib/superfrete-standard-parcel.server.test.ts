import { describe, expect, it } from "vitest";
import { OCTA_STANDARD_PARCEL, assertStandardParcelEligible, validateDestinationPostalCode } from "./superfrete-standard-parcel.server";

describe("OCTA SuperFrete standard parcel", () => {
  it("uses the approved fixed origin, dimensions and total mass", () => {
    expect(OCTA_STANDARD_PARCEL).toEqual({
      originPostalCode: "33239210", lengthCm: 20, widthCm: 15,
      heightCm: 10, totalWeightKg: 1,
    });
  });
  it("normalizes Brazilian destination postal codes", () => {
    expect(validateDestinationPostalCode("30123-456")).toBe("30123456");
    expect(() => validateDestinationPostalCode("123")).toThrow("invalid_destination_postal_code");
    expect(() => validateDestinationPostalCode("12345678x")).toThrow("invalid_destination_postal_code");
  });
  it("blocks overweight, oversized or special-handling shipments", () => {
    expect(() => assertStandardParcelEligible({ packedWeightKg: 1, fitsStandardBox: true, requiresSpecialHandling: false })).not.toThrow();
    for (const invalid of [
      { packedWeightKg: 1.01, fitsStandardBox: true, requiresSpecialHandling: false },
      { packedWeightKg: 0.5, fitsStandardBox: false, requiresSpecialHandling: false },
      { packedWeightKg: 0.5, fitsStandardBox: true, requiresSpecialHandling: true },
      { packedWeightKg: NaN, fitsStandardBox: true, requiresSpecialHandling: false },
    ]) expect(() => assertStandardParcelEligible(invalid)).toThrow("manual_shipping_review_required");
  });
});
