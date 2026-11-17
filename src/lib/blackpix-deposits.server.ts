/**
 * BlackPix deposit API client. Server-side only; never import into browser code.
 * No public checkout route is enabled until order persistence and webhook event
 * schemas are confirmed.
 */
const BASE_URL = "https://blackpix.site/api/integrations/v1";
export type PixDeposit = {
  id: string;
  requestId: string;
  status: string;
  amountCents: number;
  feeCents: number;
  netAmountCents: number;
  currency: "BRL";
  pixCopyPasteCode: string;
  description: string;
  createdAt: string;
  expiresAt: string;
  paidAt: string | null;
};
export type PixDepositResponse = { success: true; reused: boolean; deposit: PixDeposit };

export class BlackPixApiError extends Error {
  constructor(readonly status: number) {
    super("BlackPix API request failed");
    this.name = "BlackPixApiError";
  }
}
function apiKey(): string {
  const key = process.env["BLACKPIX_API_KEY"];
  if (!key || !key.startsWith("bpx_live_")) throw new Error("BLACKPIX_API_KEY is not configured");
  return key;
}
function depositResponse(value: unknown): PixDepositResponse {
  if (!value || typeof value !== "object") throw new Error("Invalid BlackPix response");
  const data = value as Record<string, unknown>;
  const d = data['deposit'];
  if (data['success'] !== true || typeof data['reused'] !== "boolean" || !d || typeof d !== "object") {
    throw new Error("Invalid BlackPix response");
  }
  const deposit = d as Record<string, unknown>;
  if (
    typeof deposit['id'] !== "string" || !deposit['id'] ||
    typeof deposit['requestId'] !== "string" ||
    typeof deposit['status'] !== "string" ||
    !Number.isSafeInteger(deposit['amountCents']) ||
    typeof deposit['pixCopyPasteCode'] !== "string" ||
    typeof deposit['description'] !== "string" ||
    deposit['currency'] !== "BRL"
  ) throw new Error("Invalid BlackPix deposit");
  return data as PixDepositResponse;
}
async function requestBlackPix(path: string, init: RequestInit = {}, fetcher: typeof fetch = fetch): Promise<unknown> {
  const response = await fetcher(`${BASE_URL}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${apiKey()}`, ...(init.headers as Record<string, string> | undefined) },
    signal: init.signal ?? AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new BlackPixApiError(response.status);
  return response.json();
}
/**
 * The caller must persist the UUID and identical amount/description before
 * making this request. On timeouts or 503, retry with the SAME UUID and data.
 */
export async function createPixDeposit(
  input: { amountCents: number; description: string; idempotencyKey: string },
  fetcher: typeof fetch = fetch,
): Promise<PixDepositResponse> {
  if (!Number.isSafeInteger(input.amountCents) || input.amountCents <= 0) throw new Error("Invalid amountCents");
  if (!input.description.trim()) throw new Error("Invalid description");
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(input.idempotencyKey)) {
    throw new Error("Invalid UUID v4 idempotency key");
  }
  const result = await requestBlackPix("/deposits", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Idempotency-Key": input.idempotencyKey },
    body: JSON.stringify({ amountCents: input.amountCents, description: input.description }),
  }, fetcher);
  return depositResponse(result);
}
export async function getPixDeposit(id: string, fetcher: typeof fetch = fetch): Promise<unknown> {
  if (!id.trim() || id.includes("/") || id.includes("?") || id.includes("#")) throw new Error("Invalid deposit id");
  return requestBlackPix(`/deposits/${encodeURIComponent(id)}`, {}, fetcher);
}
