import { describe, expect, it } from "vitest";
import { createHmac } from "node:crypto";
import { receiveBlackPixWebhook, validBlackPixSignature } from "./blackpix-webhook";

const secret = "test-only-blackpix-secret";
const body = '{ "event": "payment.updated" }';
const timestamp = "1794138720";
const now = Number(timestamp) * 1000;
function signed(text = body, time = timestamp) {
  return `t=${time},v1=${createHmac("sha256", secret).update(`${time}.${text}`).digest("hex")}`;
}
function request(signature?: string) {
  return new Request("https://example.test/api/public/blackpix-webhook", {
    method: "POST", body, headers: signature ? { "X-BlackPix-Signature": signature } : {},
  });
}

describe("BlackPix signature contract", () => {
  it("accepts HMAC-SHA256 of timestamp dot untouched body", async () => {
    expect(await validBlackPixSignature(body, signed(), secret, now)).toBe(true);
  });
  it("rejects a body modified after signing", async () => {
    expect(await validBlackPixSignature(JSON.stringify(JSON.parse(body)), signed(), secret, now)).toBe(false);
  });
  it("accepts timestamps exactly 300 seconds away in either direction", async () => {
    for (const offset of [-300, 300]) expect(await validBlackPixSignature(body, signed(), secret, now + offset * 1000)).toBe(true);
  });
  it("rejects timestamps more than 300 seconds away in either direction", async () => {
    for (const offset of [-301, 301]) expect(await validBlackPixSignature(body, signed(), secret, now + offset * 1000)).toBe(false);
  });
  it("rejects missing credentials and signatures", async () => {
    expect(await validBlackPixSignature(body, null, secret, now)).toBe(false);
    expect(await validBlackPixSignature(body, signed(), undefined, now)).toBe(false);
  });
  it("rejects invalid, missing and duplicate timestamp fields", async () => {
    for (const signature of [signed().replace(timestamp, "NaN"), signed().replace(timestamp, "Infinity"), signed().split(",")[1] ?? "", `${signed()},t=${timestamp}`]) {
      expect(await validBlackPixSignature(body, signature, secret, now)).toBe(false);
    }
  });
  it("rejects malformed, duplicated and incorrect digests without throwing", async () => {
    for (const signature of [`t=${timestamp}`, `t=${timestamp},v1=abc`, `t=${timestamp},v1=${"z".repeat(64)}`, `t=${timestamp},v1=${"0".repeat(64)}`, `${signed()},v1=${"0".repeat(64)}`]) {
      expect(await validBlackPixSignature(body, signature, secret, now)).toBe(false);
    }
  });
  it("rejects a signature generated with another secret", async () => {
    expect(await validBlackPixSignature(body, signed(), "different-test-secret", now)).toBe(false);
  });
});

describe("BlackPix preparation safety", () => {
  it("does not acknowledge payments before the provider contract is verified", async () => {
    const response = await receiveBlackPixWebhook(request());
    expect(response.status).toBe(503);
    expect(response.ok).toBe(false);
    expect(await response.json()).toEqual({ error: "payment_integration_unavailable" });
  });
  it("does not allow caching unavailable payment responses", async () => {
    expect((await receiveBlackPixWebhook(request())).headers.get("Cache-Control")).toBe("no-store");
  });
  it("rejects unsigned events when the secret is configured", async () => {
    const response = await receiveBlackPixWebhook(request(), secret);
    expect(response.status).toBe(401);
    expect(await response.json()).toEqual({ error: "invalid_signature" });
  });
  it("does not acknowledge even authenticated events before processing is implemented", async () => {
    const response = await receiveBlackPixWebhook(request(signed(body, String(Math.floor(Date.now() / 1000)))), secret);
    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({ error: "payment_integration_unavailable" });
  });
});