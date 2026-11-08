import { describe, expect, it } from "vitest";
import { receiveBlackPixWebhook } from "./blackpix-webhook";

describe("BlackPix preparation safety", () => {
  it("does not acknowledge payments before the provider contract is verified", async () => {
    const response = receiveBlackPixWebhook();
    expect(response.status).toBe(503);
    expect(response.ok).toBe(false);
    expect(await response.json()).toEqual({ error: "payment_integration_unavailable" });
  });
  it("does not allow caching unavailable payment responses", () => {
    expect(receiveBlackPixWebhook().headers.get("Cache-Control")).toBe("no-store");
  });
});