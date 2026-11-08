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
export async function receiveBlackPixWebhook(request: Request, secret?: string): Promise<Response> {
  if (!secret) return unavailable();
  const body = await request.text();
  if (!(await validBlackPixSignature(body, request.headers.get("X-BlackPix-Signature"), secret))) {
    return Response.json({ error: "invalid_signature" }, { status: 401, headers: { "Cache-Control": "no-store" } });
  }
  return unavailable();
}