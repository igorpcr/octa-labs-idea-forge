import { quoteTrustedCart } from "./blackpix-trusted-catalog.server";

const MAX_BYTES = 4096;
const WINDOW_MS = 60_000;
const MAX_ATTEMPTS = 15;
const attempts = new Map<string, { count: number; until: number }>();

/** Lightweight per-instance abuse protection, NOT a distributed production rate limiter. */
export function allowQuoteAttempt(key: string, now = Date.now()): boolean {
  if (!key || key.length > 256) return false;
  if (attempts.size > 5000) {
    for (const [id, record] of attempts) if (record.until <= now) attempts.delete(id);
    if (attempts.size > 5000) return false;
  }
  const previous = attempts.get(key);
  const record = !previous || previous.until <= now ? { count: 0, until: now + WINDOW_MS } : previous;
  record.count += 1;
  attempts.set(key, record);
  return record.count <= MAX_ATTEMPTS;
}

export function checkQuoteOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try { return new URL(origin).origin === new URL(request.url).origin; } catch { return false; }
}

const json = (status: number, body: Record<string, unknown>) => Response.json(body, {
  status, headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" },
});

/** Public quote only: no database writes, no BlackPix requests and no payment creation. */
export async function handlePublicPixQuote(request: Request, catalogJson: string | undefined): Promise<Response> {
  if (!checkQuoteOrigin(request)) return json(403, { error: "invalid_origin" });
  if (request.headers.get("content-type")?.split(";")[0]?.trim().toLowerCase() !== "application/json")
    return json(415, { error: "invalid_content_type" });
  const declared = Number(request.headers.get("content-length") ?? "0");
  if (!Number.isSafeInteger(declared) || declared < 0 || declared > MAX_BYTES) return json(413, { error: "request_too_large" });
  // Per-instance throttling reduces accidental bursts but cannot protect a scaled deployment.
  const key = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anonymous";
  if (!allowQuoteAttempt(key)) return json(429, { error: "rate_limited" });
  let body: unknown;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BYTES || new TextEncoder().encode(raw).length > MAX_BYTES) return json(413, { error: "request_too_large" });
    body = JSON.parse(raw);
  } catch { return json(400, { error: "invalid_json" }); }
  if (!body || typeof body !== "object" || Array.isArray(body) ||
      !Object.hasOwn(body, "items") || Object.keys(body).some(key => key !== "items"))
    return json(400, { error: "invalid_body" });
  try {
    const quote = quoteTrustedCart((body as { items: unknown }).items as never, catalogJson);
    return json(200, { lines: quote.lines, amountCents: quote.amountCents, currency: "BRL",
      paymentAvailable: false, shippingConfirmed: false });
  } catch (error) {
    if (error instanceof Error && error.message === "invalid_server_catalog") return json(503, { error: "catalog_unavailable" });
    return json(422, { error: "invalid_cart_or_unavailable_product" });
  }
}
