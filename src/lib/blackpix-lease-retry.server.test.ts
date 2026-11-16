import { describe, expect, it, vi } from "vitest";
import { retryPixChargeWithLease } from "./blackpix-lease-retry.server";
const id = "550e8400-e29b-41d4-a716-446655440000";
const token = "f4f1aa01-67cc-4bda-91ac-4ec5ac1b0001";
function mocks(claimed: boolean = true) {
  const rpc = vi.fn().mockResolvedValueOnce({ data: claimed, error: null }).mockResolvedValue({ data: true, error: null });
  const retry = vi.fn().mockResolvedValue({ depositId: "dep" });
  return { db: { rpc } as never, retry, token: () => token, rpc };
}
describe("distributed lease guarded Pix retry", () => {
  it("claims before provider retry and releases afterwards", async () => {
    const m = mocks(); await expect(retryPixChargeWithLease(id, m)).resolves.toEqual({ depositId: "dep" });
    expect(m.rpc).toHaveBeenNthCalledWith(1, "claim_octa_pix_charge_lease", { p_order_id: id, p_token: token, p_lease_seconds: 90 });
    expect(m.retry).toHaveBeenCalledTimes(1);
    expect(m.rpc).toHaveBeenNthCalledWith(2, "release_octa_pix_charge_lease", { p_order_id: id, p_token: token });
  });
  it("does not invoke provider when another worker owns the lease", async () => {
    const m = mocks(false); await expect(retryPixChargeWithLease(id, m)).rejects.toThrow("order_busy_or_unavailable");
    expect(m.retry).not.toHaveBeenCalled(); expect(m.rpc).toHaveBeenCalledTimes(1);
  });
  it("releases lease after retry failure", async () => {
    const m = mocks(); m.retry.mockRejectedValueOnce(new Error("provider_timeout"));
    await expect(retryPixChargeWithLease(id, m)).rejects.toThrow("provider_timeout");
    expect(m.rpc).toHaveBeenCalledTimes(2);
  });
  it("fails closed on claim error", async () => {
    const m = mocks(); m.rpc.mockReset().mockResolvedValueOnce({ data: null, error: { message: "offline" } });
    await expect(retryPixChargeWithLease(id, m)).rejects.toThrow("lease_claim_unavailable");
    expect(m.retry).not.toHaveBeenCalled();
  });
  it("rejects invalid ids before RPC", async () => {
    const m = mocks(); await expect(retryPixChargeWithLease("bad", m)).rejects.toThrow("invalid_order_id");
    expect(m.rpc).not.toHaveBeenCalled();
  });
});
