import { describe, expect, it } from "vitest";
import { accessFailureState, checkedAdminRole } from "./blackpix-access";
import { withAdminAccess } from "./blackpix-diagnostics";

describe("BlackPix administrator authorization", () => {
  it("authorizes only a successful admin role lookup", () => {
    expect(checkedAdminRole({ data: { role: "admin" }, error: null })).toBe(true);
    expect(checkedAdminRole({ data: { role: "user" }, error: null })).toBe(false);
  });
  it("denies a successful lookup without a role", async () => {
    const allowed = checkedAdminRole({ data: null, error: null });
    let executed = false;
    await expect(withAdminAccess(allowed, async () => { executed = true; })).rejects.toThrow();
    expect(executed).toBe(false);
  });
  it("fails closed on database errors even if data contains admin", () => {
    expect(() => checkedAdminRole({ data: { role: "admin" }, error: { code: "42501" } })).toThrow("admin_role_check_unavailable");
  });
  it("distinguishes JWT rejection from technical failures", () => {
    expect(accessFailureState(new Error("Unauthorized: Invalid token"))).toBe("signed_out");
    expect(accessFailureState(new Error("admin_role_check_unavailable"))).toBe("error");
    expect(accessFailureState(new TypeError("Failed to fetch"))).toBe("error");
  });
});