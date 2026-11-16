-- Server-only lease to coordinate retry workers across multiple instances.
-- Not applied automatically; deploy and verify on staging before production.
ALTER TABLE public.octa_pix_orders
  ADD COLUMN IF NOT EXISTS charge_lease_token uuid,
  ADD COLUMN IF NOT EXISTS charge_lease_until timestamptz;

CREATE OR REPLACE FUNCTION public.claim_octa_pix_charge_lease(
  p_order_id uuid,
  p_token uuid,
  p_lease_seconds integer DEFAULT 90
) RETURNS boolean
LANGUAGE plpgsql SECURITY INVOKER SET search_path = public
AS $$
DECLARE v_updated integer;
BEGIN
  IF p_order_id IS NULL OR p_token IS NULL OR p_lease_seconds < 30 OR p_lease_seconds > 300 THEN
    RETURN false;
  END IF;
  UPDATE public.octa_pix_orders
     SET charge_lease_token = p_token,
         charge_lease_until = clock_timestamp() + make_interval(secs => p_lease_seconds),
         updated_at = clock_timestamp()
   WHERE id = p_order_id
     AND status = 'pending'
     AND deposit_id IS NULL
     AND provider_request_id IS NULL
     AND (charge_lease_until IS NULL OR charge_lease_until < clock_timestamp());
  GET DIAGNOSTICS v_updated = ROW_COUNT;
  RETURN v_updated = 1;
END;
$$;
REVOKE ALL ON FUNCTION public.claim_octa_pix_charge_lease(uuid,uuid,integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.claim_octa_pix_charge_lease(uuid,uuid,integer) TO service_role;

CREATE OR REPLACE FUNCTION public.release_octa_pix_charge_lease(
  p_order_id uuid,
  p_token uuid
) RETURNS boolean
LANGUAGE plpgsql SECURITY INVOKER SET search_path = public
AS $$
DECLARE v_updated integer;
BEGIN
  IF p_order_id IS NULL OR p_token IS NULL THEN RETURN false; END IF;
  UPDATE public.octa_pix_orders
     SET charge_lease_token = NULL, charge_lease_until = NULL, updated_at = clock_timestamp()
   WHERE id = p_order_id AND charge_lease_token = p_token;
  GET DIAGNOSTICS v_updated = ROW_COUNT;
  RETURN v_updated = 1;
END;
$$;
REVOKE ALL ON FUNCTION public.release_octa_pix_charge_lease(uuid,uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.release_octa_pix_charge_lease(uuid,uuid) TO service_role;
