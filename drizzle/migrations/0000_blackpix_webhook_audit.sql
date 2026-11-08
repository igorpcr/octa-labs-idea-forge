CREATE TABLE public.blackpix_webhook_receipts (
  id uuid PRIMARY KEY,
  received_at timestamptz NOT NULL,
  recorded_at timestamptz NOT NULL DEFAULT now(),
  processing_status text NOT NULL CHECK (processing_status IN ('blocked', 'failed')),
  signature_status text NOT NULL DEFAULT 'verified' CHECK (signature_status = 'verified'),
  error_code text NOT NULL CHECK (error_code IN ('event_processing_unavailable', 'invalid_json', 'invalid_payload', 'request_read_failed', 'signature_verification_failed')),
  http_status integer NOT NULL CHECK (http_status IN (400, 503)),
  duration_ms integer NOT NULL CHECK (duration_ms >= 0)
);
GRANT ALL ON public.blackpix_webhook_receipts TO service_role;
REVOKE ALL ON public.blackpix_webhook_receipts FROM anon, authenticated;
ALTER TABLE public.blackpix_webhook_receipts ENABLE ROW LEVEL SECURITY;
CREATE INDEX blackpix_webhook_receipts_received_at_idx ON public.blackpix_webhook_receipts (received_at DESC);
COMMENT ON TABLE public.blackpix_webhook_receipts IS 'Server-only audit of signature-verified webhook deliveries; excludes payloads, provider identifiers, headers, signatures, secrets and personal data. Unverified attempts are recorded only as sanitized operational logs.';