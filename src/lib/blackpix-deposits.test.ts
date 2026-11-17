import { afterEach, describe, expect, it, vi } from "vitest";
import { BlackPixApiError, createPixDeposit, getPixDeposit } from "./blackpix-deposits.server";

const key = "3f1c2a4e-9b7d-4c61-8e2f-5a6b7c8d9e0f";
const deposit = {
  id: "PIX-test", requestId: key, status: "pending", amountCents: 19700,
  feeCents: 0, netAmountCents: 19700, currency: "BRL",
  pixCopyPasteCode: "000201...", description: "Pagamento do pedido 123",
  createdAt: "2026-01-01T12:00:00.000Z",
  expiresAt: "2026-01-01T12:30:00.000Z", paidAt: null,
};
const original = process.env["BLACKPIX_API_KEY"];
afterEach(() => {
  if (original === undefined) delete process.env["BLACKPIX_API_KEY"];
  else process.env["BLACKPIX_API_KEY"] = original;
});
describe("BlackPix deposit client", () => {
  it("sends the documented payload and headers without exposing the API key in the body", async () => {
    process.env["BLACKPIX_API_KEY"] = "bpx_live_test_only";
    const fetcher = vi.fn(async (_input: RequestInfo | URL, _init?: RequestInit) => Response.json({ success: true, reused: false, deposit }));
    const result = await createPixDeposit({ amountCents: 19700, description: deposit.description, idempotencyKey: key }, fetcher as typeof fetch);
    expect(result.deposit.pixCopyPasteCode).toBe("000201...");
    expect(fetcher).toHaveBeenCalledOnce();
    const call = fetcher.mock.calls[0];
    if (!call?.[1]) throw new Error("Expected fetch request");
    const [url, init] = call;
    expect(url).toBe("https://blackpix.site/api/integrations/v1/deposits");
    expect(init.method).toBe("POST");
    expect(init.headers).toMatchObject({ Authorization: "Bearer bpx_live_test_only", "Idempotency-Key": key, "Content-Type": "application/json" });
    expect(JSON.parse(init.body as string)).toEqual({ amountCents: 19700, description: deposit.description });
  });
  it("rejects invalid amounts and idempotency keys without making requests", async () => {
    const fetcher = vi.fn();
    await expect(createPixDeposit({ amountCents: 0, description: "Pedido", idempotencyKey: key }, fetcher as typeof fetch)).rejects.toThrow();
    await expect(createPixDeposit({ amountCents: 100, description: "Pedido", idempotencyKey: "not-uuid" }, fetcher as typeof fetch)).rejects.toThrow();
    expect(fetcher).not.toHaveBeenCalled();
  });
  it("preserves HTTP errors for caller-managed idempotent retries", async () => {
    process.env["BLACKPIX_API_KEY"] = "bpx_live_test_only";
    const fetcher = vi.fn(async () => new Response(null, { status: 503 }));
    await expect(createPixDeposit({ amountCents: 19700, description: "Pedido", idempotencyKey: key }, fetcher as typeof fetch)).rejects.toMatchObject({ status: 503, name: "BlackPixApiError" });
  });
  it("queries a deposit using the documented route", async () => {
    process.env["BLACKPIX_API_KEY"] = "bpx_live_test_only";
    const fetcher = vi.fn(async (_input: RequestInfo | URL, _init?: RequestInit) => Response.json({ success: true, deposit }));
    await getPixDeposit("PIX-test", fetcher as typeof fetch);
    expect(fetcher.mock.calls[0]?.[0]).toBe("https://blackpix.site/api/integrations/v1/deposits/PIX-test");
  });
});
