import { createFileRoute } from "@tanstack/react-router";
import { quoteTrustedCart } from "@/lib/blackpix-trusted-catalog.server";
import { checkQuoteOrigin, allowQuoteAttempt } from "@/lib/blackpix-public-quote.server";
import { validateDestinationPostalCode } from "@/lib/superfrete-standard-parcel.server";

/** Server proxy: never expose Supabase function credentials to the browser. */
export const Route = createFileRoute("/api/public/superfrete-quote")({
  server: { handlers: { POST: async ({ request }) => {
    const respond = (status: number, body: unknown) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
    if (!checkQuoteOrigin(request)) return respond(403, { error: "invalid_origin" });
    if (!request.headers.get("content-type")?.startsWith("application/json")) return respond(415, { error: "invalid_content_type" });
    if (!allowQuoteAttempt("shipping:" + (request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anonymous"))) return respond(429, { error: "rate_limited" });
    let body: unknown;
    try { const raw = await request.text(); if (new TextEncoder().encode(raw).length > 4096) return respond(413, { error: "request_too_large" }); body = JSON.parse(raw); }
    catch { return respond(400, { error: "invalid_json" }); }
    if (!body || typeof body !== "object" || Array.isArray(body)) return respond(400, { error: "invalid_body" });
    const input = body as Record<string, unknown>;
    if (Object.keys(input).some(k => k !== "destinationCep" && k !== "items")) return respond(400, { error: "invalid_body" });
    let destinationCep: string;
    let lines: ReturnType<typeof quoteTrustedCart>["lines"];
    try {
      destinationCep = validateDestinationPostalCode(input.destinationCep);
      lines = quoteTrustedCart(input.items as never, process.env["OCTA_TRUSTED_CATALOG_JSON"]).lines;
    } catch { return respond(422, { error: "invalid_cart_or_destination" }); }
    // Eligibility must be an explicit server-owned allowlist, never a client flag.
    let eligible: string[];
    try { eligible = JSON.parse(process.env["OCTA_SHIPPING_ELIGIBLE_SKUS_JSON"] || "[]"); }
    catch { return respond(503, { error: "shipping_eligibility_not_configured" }); }
    if (!Array.isArray(eligible) || lines.some(line => !eligible.includes(line.id)) || !lines.length)
      return respond(422, { error: "manual_shipping_review_required" });
    // Parcel capacity is NOT inferred from quantity. Only one item may use the
    // standard box until packed-weight and fit metadata are server validated.
    if (lines.length !== 1 || lines[0].quantity !== 1) return respond(422, { error: "manual_shipping_review_required" });
    const base = process.env["SUPABASE_URL"];
    const secret = process.env["OCTA_SUPABASE_FUNCTION_JWT"];
    if (!base || !secret) return respond(503, { error: "shipping_proxy_not_configured" });
    const url = new URL("/functions/v1/octa-superfrete-quote", base);
    if (url.protocol !== "https:" || !url.hostname.endsWith(".supabase.co")) return respond(503, { error: "shipping_proxy_not_configured" });
    try {
      const upstream = await fetch(url, { method: "POST", signal: AbortSignal.timeout(10000),
        headers: { Authorization: `Bearer ${secret}`, "Content-Type": "application/json" },
        body: JSON.stringify({ destinationCep, eligible: true }) });
      if (!upstream.ok) return respond(502, { error: "shipping_quote_unavailable" });
      const result: unknown = await upstream.json();
      if (!result || typeof result !== "object" || Array.isArray(result)) throw new Error("invalid_response");
      const rates = (result as Record<string, unknown>).rates;
      if (!Array.isArray(rates)) throw new Error("invalid_response");
      const safeRates = rates.filter((x): x is Record<string, unknown> => !!x && typeof x === "object" && !Array.isArray(x) &&
        Number.isSafeInteger((x as Record<string, unknown>).serviceId) &&
        typeof (x as Record<string, unknown>).name === "string" &&
        typeof (x as Record<string, unknown>).carrier === "string" &&
        Number.isSafeInteger((x as Record<string, unknown>).priceCents) &&
        Number((x as Record<string, unknown>).priceCents) > 0 &&
        Number.isSafeInteger((x as Record<string, unknown>).deliveryDays) &&
        Number((x as Record<string, unknown>).deliveryDays) > 0);
      return respond(200, { rates: safeRates, paymentAvailable: false });
    } catch { return respond(502, { error: "shipping_quote_unavailable" }); }
  } } },
});
