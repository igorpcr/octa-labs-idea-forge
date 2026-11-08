import { createHmac } from "node:crypto";
import { describe, expect, it, vi } from "vitest";
import { blackPixAuditSchema } from "./blackpix-audit";
import { receiveBlackPixWebhook } from "./blackpix-webhook";

const secret = "test-only-audit-secret";
function delivery(body: string, sign = true) {
  const t = String(Math.floor(Date.now() / 1000));
  const v1 = createHmac("sha256", secret).update(`${t}.${body}`).digest("hex");
  return new Request("https://example.test/api/public/blackpix-webhook", {
    method: "POST", body, headers: sign ? { "X-BlackPix-Signature": `t=${t},v1=${v1}` } : {},
  });
}

describe("BlackPix safe audit", () => {
  it("stores verified receipts as blocked without acknowledging a payment", async () => {
    const persist = vi.fn(async () => {});
    const log = vi.fn();
    const response = await receiveBlackPixWebhook(delivery('{"event":"payment.updated"}'), secret, { persist, log });
    expect(response.status).toBe(503);
    expect(persist).toHaveBeenCalledOnce();
    expect(persist.mock.calls[0]?.[0]).toMatchObject({ processing_status: "blocked", signature_status: "verified", error_code: "event_processing_unavailable", http_status: 503 });
    expect(log).toHaveBeenCalledWith(persist.mock.calls[0]?.[0]);
  });
  it("never writes unverified attempts and logs only a rejection", async () => {
    const persist = vi.fn(async () => {});
    const log = vi.fn();
    const response = await receiveBlackPixWebhook(delivery("{}", false), secret, { persist, log });
    expect(response.status).toBe(401);
    expect(persist).not.toHaveBeenCalled();
    expect(log).toHaveBeenCalledWith(expect.objectContaining({ processing_status: "rejected", error_code: "invalid_signature" }));
  });
  it("records signed invalid JSON as a processing failure", async () => {
    const persist = vi.fn(async () => {});
    const response = await receiveBlackPixWebhook(delivery("{"), secret, { persist, log: vi.fn() });
    expect(response.status).toBe(400);
    expect(persist).toHaveBeenCalledWith(expect.objectContaining({ processing_status: "failed", error_code: "invalid_json" }));
  });
  it("records signed non-object payloads as invalid", async () => {
    const persist = vi.fn(async () => {});
    const response = await receiveBlackPixWebhook(delivery("[]"), secret, { persist, log: vi.fn() });
    expect(response.status).toBe(400);
    expect(persist).toHaveBeenCalledWith(expect.objectContaining({ error_code: "invalid_payload" }));
  });
  it("excludes payload fields, signatures, personal data and secrets", async () => {
    const persist = vi.fn(async () => {});
    const log = vi.fn();
    const sensitive = '{"email":"private@example.test","secret":"DO_NOT_RECORD","error":"injected-error"}';
    await receiveBlackPixWebhook(delivery(sensitive), secret, { persist, log });
    const captured = JSON.stringify({ stored: persist.mock.calls, logs: log.mock.calls });
    for (const value of ["private@example.test", "DO_NOT_RECORD", "injected-error", secret, "v1=", sensitive]) expect(captured).not.toContain(value);
    const record = persist.mock.calls[0]?.[0];
    expect(record).toBeDefined();
    expect(blackPixAuditSchema.safeParse({ ...record, body: sensitive }).success).toBe(false);
    expect(blackPixAuditSchema.safeParse({ ...record, error_code: "injected-error" }).success).toBe(false);
  });
  it("fails closed with a safe error if storage throws secret-bearing details", async () => {
    const log = vi.fn();
    const response = await receiveBlackPixWebhook(delivery("{}"), secret, {
      persist: async () => { throw new Error("DO_NOT_RECORD storage credential"); }, log,
    });
    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({ error: "audit_write_failed" });
    expect(log).toHaveBeenCalledWith(expect.objectContaining({ processing_status: "failed", error_code: "audit_write_failed" }));
    expect(JSON.stringify(log.mock.calls)).not.toContain("DO_NOT_RECORD");
  });
  it("logs missing configuration without privileged writes", async () => {
    const persist = vi.fn(async () => {});
    const log = vi.fn();
    expect((await receiveBlackPixWebhook(delivery("{}"), undefined, { persist, log })).status).toBe(503);
    expect(persist).not.toHaveBeenCalled();
    expect(log).toHaveBeenCalledWith(expect.objectContaining({ error_code: "secret_not_configured", signature_status: "not_checked" }));
  });
});