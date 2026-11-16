import { describe, expect, it, vi } from "vitest";
import { singleFlightOrder } from "./blackpix-single-flight.server";
const first = "550e8400-e29b-41d4-a716-446655440000";
const second = "550e8400-e29b-41d4-a716-446655440001";
describe("same-process concurrent Pix order guard", () => {
  it("deduplicates simultaneous attempts for the same order", async () => {
    let release!: (value: string) => void;
    const deferred = new Promise<string>(resolve => { release = resolve; });
    const work = vi.fn(() => deferred);
    const a = singleFlightOrder(first, work);
    const b = singleFlightOrder(first, work);
    await Promise.resolve();
    expect(work).toHaveBeenCalledTimes(1);
    release("linked");
    expect(await Promise.all([a, b])).toEqual(["linked", "linked"]);
  });
  it("allows independent orders to progress", async () => {
    const work = vi.fn(async () => "ok");
    await Promise.all([singleFlightOrder(first, work), singleFlightOrder(second, work)]);
    expect(work).toHaveBeenCalledTimes(2);
  });
  it("releases lock after success", async () => {
    const work = vi.fn(async () => "ok");
    await singleFlightOrder(first, work);
    await singleFlightOrder(first, work);
    expect(work).toHaveBeenCalledTimes(2);
  });
  it("releases lock after failure so recovery remains possible", async () => {
    const work = vi.fn().mockRejectedValueOnce(new Error("network")).mockResolvedValueOnce("ok");
    await expect(singleFlightOrder(first, work)).rejects.toThrow("network");
    await expect(singleFlightOrder(first, work)).resolves.toBe("ok");
    expect(work).toHaveBeenCalledTimes(2);
  });
  it("rejects invalid order ids without invoking work", async () => {
    const work = vi.fn(async () => "ok");
    await expect(singleFlightOrder("bad", work)).rejects.toThrow("invalid_order_id");
    expect(work).not.toHaveBeenCalled();
  });
});
