import { describe, expect, it } from "vitest";
import { clearAndSignOut, safeAuthDestination, signupNeedsConfirmation } from "./octa-auth";

describe("Account access", () => {
  it("does not treat an unconfirmed signup as signed in", () => {
    expect(signupNeedsConfirmation(null)).toBe(true);
    expect(signupNeedsConfirmation({ access_token: "test" })).toBe(false);
  });
  it("rejects external or unapproved login destinations", () => {
    expect(safeAuthDestination("https://example.com")).toBe("/");
    expect(safeAuthDestination("//example.com")).toBe("/");
    expect(safeAuthDestination("/admin/blackpix")).toBe("/admin/blackpix");
  });
  it("stops queries and removes protected cache before signout and replaces navigation", async () => {
    const calls: string[] = [];
    await clearAndSignOut({ cancelQueries: async () => { calls.push("cancel"); }, clear: () => { calls.push("clear"); } }, async () => { calls.push("signout"); return { error: null }; }, async () => { calls.push("replace"); });
    expect(calls).toEqual(["cancel", "clear", "signout", "replace"]);
  });
});