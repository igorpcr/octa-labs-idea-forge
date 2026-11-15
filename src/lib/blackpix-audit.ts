import { z } from "zod";

// Only generated metadata and enumerated errors may enter storage or logs.
export const blackPixAuditSchema = z
  .object({
    id: z.string().uuid(),
    received_at: z.string().datetime(),
    processing_status: z.enum(["blocked", "failed", "rejected"]),
    signature_status: z.enum(["verified", "invalid", "not_checked"]),
    error_code: z.enum([
      "event_processing_unavailable",
      "invalid_json",
      "invalid_payload",
      "secret_not_configured",
      "invalid_signature",
      "request_read_failed",
      "signature_verification_failed",
      "audit_write_failed",
    ]),
    http_status: z.union([z.literal(400), z.literal(401), z.literal(503)]),
    duration_ms: z.number().int().nonnegative(),
  })
  .strict();

export type BlackPixAudit = z.infer<typeof blackPixAuditSchema>;
export type BlackPixAuditOptions = {
  persist?: (record: BlackPixAudit) => Promise<void>;
  log?: (record: BlackPixAudit) => void;
};

export const blackPixReceiptSelect =
  "id,received_at,processing_status,signature_status,error_code,http_status,duration_ms";

/** Keep administrative history to the same allowlist accepted by private storage. */
export function parseBlackPixReceipts(rows: unknown): BlackPixAudit[] {
  return z.array(blackPixAuditSchema).parse(rows);
}

export function logBlackPixAudit(record: BlackPixAudit): void {
  console.info("blackpix_webhook", JSON.stringify(blackPixAuditSchema.parse(record)));
}
