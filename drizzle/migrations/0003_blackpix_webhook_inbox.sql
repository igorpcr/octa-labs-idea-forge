-- Durable, private inbox for verified BlackPix webhooks.
-- Apply this migration before deploying the new handler.
CREATE TABLE public.blackpix_webhook_inbox (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  received_at timestamptz NOT NULL DEFAULT now(),
  signature_digest text NOT NULL,
  event_payload jsonb NOT NULL,
  processed_at timestamptz,
  CONSTRAINT blackpix_webhook_inbox_signature_unique UNIQUE (signature_digest),
  CONSTRAINT blackpix_webhook_inbox_payload_object CHECK (jsonb_typeof(event_payload) = 'object')
);
CREATE INDEX blackpix_webhook_inbox_pending_idx
  ON public.blackpix_webhook_inbox (received_at) WHERE processed_at IS NULL;
ALTER TABLE public.blackpix_webhook_inbox ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.blackpix_webhook_inbox FROM PUBLIC, anon, authenticated;
GRANT ALL ON public.blackpix_webhook_inbox TO service_role;
COMMENT ON TABLE public.blackpix_webhook_inbox IS
  'Private durable receipt of authenticated BlackPix notifications; processing and payment confirmation are separate.';
