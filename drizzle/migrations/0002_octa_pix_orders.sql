-- Prepared storage for BlackPix Pix checkout. This migration must be applied
-- before any public checkout is enabled. No client-side table access.
CREATE TABLE public.octa_pix_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'expired', 'canceled')),
  amount_cents bigint NOT NULL CHECK (amount_cents > 0),
  currency text NOT NULL DEFAULT 'BRL' CHECK (currency = 'BRL'),
  description text NOT NULL CHECK (length(description) BETWEEN 1 AND 255),
  idempotency_key uuid NOT NULL UNIQUE,
  deposit_id text UNIQUE,
  provider_request_id text,
  paid_at timestamptz,
  CONSTRAINT paid_requires_provider_confirmation CHECK (
    status <> 'paid' OR (deposit_id IS NOT NULL AND provider_request_id IS NOT NULL AND paid_at IS NOT NULL)
  )
);
CREATE INDEX octa_pix_orders_status_idx ON public.octa_pix_orders (status, created_at);
ALTER TABLE public.octa_pix_orders ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.octa_pix_orders FROM anon, authenticated;
GRANT ALL ON public.octa_pix_orders TO service_role;
COMMENT ON TABLE public.octa_pix_orders IS 'Server-managed Pix orders; amounts must be derived from trusted catalog prices, not browser cart totals.';

-- Atomic, replay-safe transition. Only a server-side service-role caller that
-- already verified the deposit with GET /deposits/{id} may invoke this function.
CREATE OR REPLACE FUNCTION public.confirm_octa_pix_order(
  p_order_id uuid,
  p_deposit_id text,
  p_request_id text,
  p_amount_cents bigint,
  p_paid_at timestamptz
) RETURNS boolean
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
DECLARE v_updated integer;
BEGIN
  IF p_paid_at IS NULL OR p_deposit_id IS NULL OR p_request_id IS NULL THEN
    RETURN false;
  END IF;
  UPDATE public.octa_pix_orders
  SET status = 'paid', paid_at = p_paid_at, updated_at = now()
  WHERE id = p_order_id
    AND status = 'pending'
    AND deposit_id = p_deposit_id
    AND provider_request_id = p_request_id
    AND amount_cents = p_amount_cents
    AND currency = 'BRL';
  GET DIAGNOSTICS v_updated = ROW_COUNT;
  RETURN v_updated = 1;
END;
$$;
REVOKE ALL ON FUNCTION public.confirm_octa_pix_order(uuid,text,text,bigint,timestamptz) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.confirm_octa_pix_order(uuid,text,text,bigint,timestamptz) TO service_role;
