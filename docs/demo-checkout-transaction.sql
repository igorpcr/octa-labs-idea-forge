-- Staging-only B2B checkout simulation. Apply after review, not to production.
create table if not exists public.octa_demo_orders (
  id uuid primary key default gen_random_uuid(),
  buyer_id uuid not null references auth.users(id),
  idempotency_key uuid not null,
  request_fingerprint text not null check (length(request_fingerprint) = 64),
  status text not null default 'draft' check (status in ('draft','shipping_pending','ready','failed')),
  subtotal_cents bigint not null check (subtotal_cents > 0),
  shipping_cents bigint check (shipping_cents >= 0),
  total_cents bigint generated always as (subtotal_cents + coalesce(shipping_cents,0)) stored,
  shipping_source text check (shipping_source in ('superfrete','manual_review')),
  created_at timestamptz not null default now(),
  unique (buyer_id, idempotency_key)
);
create table if not exists public.octa_demo_order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.octa_demo_orders(id) on delete cascade,
  sku text not null,
  quantity integer not null check (quantity between 1 and 99),
  unit_cents bigint not null check (unit_cents > 0),
  unique (order_id, sku)
);
alter table public.octa_demo_orders enable row level security;
alter table public.octa_demo_order_items enable row level security;
revoke all on public.octa_demo_orders, public.octa_demo_order_items from anon, authenticated;
-- Use a server-side authenticated RPC after the catalog and auth model are verified.
-- A single database transaction must insert both the order and its items.
