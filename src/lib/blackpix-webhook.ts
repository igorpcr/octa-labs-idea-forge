import { blackPixAuditSchema, logBlackPixAudit, type BlackPixAudit, type BlackPixAuditOptions } from "./blackpix-audit";

/** Verify the user-supplied BlackPix contract over the untouched request text. */
export async function validBlackPixSignature(
  body: string,
  signature: string | null,
  secret: string | undefined,
  nowMs = Date.now(),
): Promise<boolean> {
  if (!signature || !secret) return false;

  const fields = new Map<string, string>();
  for (const part of signature.split(",")) {
    const pair = part.trim().split("=");
    if (pair.length !== 2) return false;
    const [key, value] = pair;
    if (!key || !value || fields.has(key)) return false;
    fields.set(key, value);
  }

  const timestamp = fields.get("t");
  const digest = fields.get("v1");
  if (!timestamp || !/^\d+$/.test(timestamp) || !digest || !/^[a-f0-9]{64}$/.test(digest)) return false;
  const seconds = Number(timestamp);
  if (!Number.isSafeInteger(seconds) || !Number.isFinite(nowMs) || Math.abs(nowMs / 1000 - seconds) > 300) return false;

  // Load server-only crypto inside the verifier, not in the route's client graph.
  const { createHmac, timingSafeEqual } = await import("node:crypto");
  const expected = createHmac("sha256", secret).update(`${timestamp}.${body}`).digest("hex");
  return timingSafeEqual(new TextEncoder().encode(expected), new TextEncoder().encode(digest));
}

function unavailable(): Response {
  return Response.json(
    { error: "payment_integration_unavailable" },
    { status: 503, headers: { "Cache-Control": "no-store", "Retry-After": "3600" } },
  );
}

/** Authenticate, but never acknowledge or process events until their contract is known. */
export async function receiveBlackPixWebhook(request: Request, secret?: string, audit: BlackPixAuditOptions = {}): Promise<Response> {
  const started = Date.now();
  const id = crypto.randomUUID();
  const receivedAt = new Date(started).toISOString();
  let verified = false;
  const finish = async (
    response: Response,
    status: BlackPixAudit["processing_status"],
    signature: BlackPixAudit["signature_status"],
    error: BlackPixAudit["error_code"],
  ) => {
    const record = blackPixAuditSchema.parse({
      id, received_at: receivedAt, processing_status: status, signature_status: signature,
      error_code: error, http_status: response.status, duration_ms: Math.max(0, Date.now() - started),
    });
    // Untrusted callers never cause privileged writes or supply log content.
    if (verified && audit.persist) {
      try {
        await audit.persist(record);
      } catch {
        (audit.log ?? logBlackPixAudit)({ ...record, processing_status: "failed", error_code: "audit_write_failed", http_status: 503 });
        return Response.json({ error: "audit_write_failed" }, { status: 503, headers: { "Cache-Control": "no-store", "Retry-After": "3600" } });
      }
    }
    (audit.log ?? logBlackPixAudit)(record);
    return response;
  };
  const badRequest = (error: string) => Response.json({ error }, { status: 400, headers: { "Cache-Control": "no-store" } });
  if (!secret) return finish(unavailable(), "blocked", "not_checked", "secret_not_configured");
  let body: string;
  try {
    body = await request.text();
  } catch {
    return finish(badRequest("request_read_failed"), "failed", "not_checked", "request_read_failed");
  }
  try {
    verified = await validBlackPixSignature(body, request.headers.get("X-BlackPix-Signature"), secret);
  } catch {
    return finish(unavailable(), "failed", "not_checked", "signature_verification_failed");
  }
  if (!verified) {
    return finish(Response.json({ error: "invalid_signature" }, { status: 401, headers: { "Cache-Control": "no-store" } }), "rejected", "invalid", "invalid_signature");
  }
  let payload: unknown;
  try {
    payload = JSON.parse(body);
  } catch {
    return finish(badRequest("invalid_json"), "failed", "verified", "invalid_json");
  }
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return finish(badRequest("invalid_payload"), "failed", "verified", "invalid_payload");
  }
  return finish(unavailable(), "blocked", "verified", "event_processing_unavailable");
}