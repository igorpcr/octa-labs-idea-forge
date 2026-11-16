# BlackPix: isolated local PostgreSQL concurrency verification

**Do not run against the Octa Labs production database.** Supabase branching requires Pro; the project has no test branch. These are manual test instructions, not a claim that database concurrency was verified.

## Prerequisites

1. Run a disposable PostgreSQL 17 instance locally, with a non-production database and connection string. Never reuse production secrets.
2. Apply `drizzle/migrations/0002_octa_pix_orders.sql` and then `drizzle/migrations/0004_octa_pix_charge_lease.sql` to the disposable database as an administrative role.
3. For function tests, connect as a role with permission to update `public.octa_pix_orders`; service-role-only RPC privileges must be separately verified in Supabase staging.
4. Insert one synthetic order using the following SQL, substituting locally generated UUIDs:

```sql
INSERT INTO public.octa_pix_orders (id, amount_cents, description, idempotency_key)
VALUES ('550e8400-e29b-41d4-a716-446655440000', 100, 'Synthetic test order', '550e8400-e29b-41d4-a716-446655440001');
```

## Two-session locking test

Open two **independent database connections**. In session A:

```sql
BEGIN;
SELECT public.claim_octa_pix_charge_lease(
 '550e8400-e29b-41d4-a716-446655440000',
 '550e8400-e29b-41d4-a716-446655440002', 90
);
-- Expect true. Keep the transaction open while starting session B.
```

In session B:

```sql
SET lock_timeout = '5s';
SELECT public.claim_octa_pix_charge_lease(
 '550e8400-e29b-41d4-a716-446655440000',
 '550e8400-e29b-41d4-a716-446655440003', 90
);
-- Expect lock timeout while A holds the row lock.
```

Commit session A, then retry session B's SELECT; expect `false` because the lease is active. Verify the lease owner cannot be released by the wrong token, but can by the correct token:

```sql
SELECT public.release_octa_pix_charge_lease(
 '550e8400-e29b-41d4-a716-446655440000',
 '550e8400-e29b-41d4-a716-446655440003'
); -- false
SELECT public.release_octa_pix_charge_lease(
 '550e8400-e29b-41d4-a716-446655440000',
 '550e8400-e29b-41d4-a716-446655440002'
); -- true
```

Now retry claim with token ...0003; expect true. Repeat on a fresh synthetic order after manually setting `charge_lease_until` to a timestamp in the past; expect claim true. Confirm a linked deposit or non-pending order cannot be claimed.

## Acceptance gates before real payments

- Record actual PostgreSQL results from two connections; the GitHub CI tests alone do not verify this.
- Verify RPC privileges as `anon`, `authenticated`, and `service_role` in a staging Supabase project.
- Bound provider HTTP timeout below lease lifetime or implement lease renewal. Verify failure and restart recovery.
- Verify BlackPix idempotency with provider-approved test credentials, not live customer funds.
- Confirm trusted SKU prices, shipping calculation, order ownership, distributed rate limiting and regulatory compliance.
- Keep public Pix creation disabled until every gate passes.
