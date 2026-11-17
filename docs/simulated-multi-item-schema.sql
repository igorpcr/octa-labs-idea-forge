-- DRAFT / NOT APPLIED. Isolated simulated-order schema; no live sales.
create table if not exists public.octa_sim_orders (
 id uuid primary key default gen_random_uuid(),
 buyer_id uuid not null references auth.users(id),
 idempotency_key uuid not null,
 fingerprint text not null,
 status text not null default 'documentation_pending' check (status in ('documentation_pending','documentation_received','reviewed','cancelled')),
 destination_cep text not null check (destination_cep ~ '^[0-9]{8}$'),
 subtotal_cents bigint not null check (subtotal_cents >= 0),
 shipping_cents bigint not null default 0 check (shipping_cents >= 0),
 total_cents bigint generated always as (subtotal_cents + shipping_cents) stored,
 created_at timestamptz not null default now(),
 unique(buyer_id,idempotency_key)
);
create table if not exists public.octa_sim_order_items (
 id uuid primary key default gen_random_uuid(),
 order_id uuid not null references public.octa_sim_orders(id) on delete cascade,
 sku text not null,
 title_snapshot text not null,
 quantity integer not null check(quantity between 1 and 99),
 unit_cents bigint not null check(unit_cents > 0),
 unique(order_id,sku)
);
create table if not exists public.octa_sim_documentation (
 order_id uuid primary key references public.octa_sim_orders(id) on delete cascade,
 status text not null default 'pending' check(status in ('pending','received','under_review','approved','rejected')),
 notes text,
 updated_at timestamptz not null default now()
);
alter table public.octa_sim_orders enable row level security;
alter table public.octa_sim_order_items enable row level security;
alter table public.octa_sim_documentation enable row level security;
revoke all on public.octa_sim_orders,public.octa_sim_order_items,public.octa_sim_documentation from anon,authenticated;
-- Service-role only; admin authorization must be checked by Edge Function.
create or replace function public.octa_sim_create_order(
 p_buyer_id uuid,p_idempotency_key uuid,p_items jsonb,p_destination_cep text
) returns table(order_id uuid,created boolean,total_cents bigint)
language plpgsql set search_path='' as $$
declare v_order uuid; v_fingerprint text; v_existing text; v_subtotal bigint; v_count integer;
begin
 if p_buyer_id is null or p_idempotency_key is null or p_destination_cep !~ '^[0-9]{8}$'
 or jsonb_typeof(p_items) <> 'array' or jsonb_array_length(p_items) not between 1 and 30
 then raise exception 'invalid_sim_order' using errcode='22023'; end if;
 if exists(select 1 from jsonb_array_elements(p_items) x
 where jsonb_typeof(x) <> 'object'
 or x->>'sku' is null or x->>'quantity' !~ '^[0-9]{1,2}$'
 or (x->>'quantity')::integer not between 1 and 99
 or (x - 'sku' - 'quantity') <> '{}'::jsonb)
 then raise exception 'invalid_sim_items' using errcode='22023'; end if;
 select count(*),sum((x->>'quantity')::integer*c.unit_cents)::bigint
 into v_count,v_subtotal
 from jsonb_array_elements(p_items) x
 join public.octa_demo_catalog c on c.sku=x->>'sku' and c.enabled;
 if v_count <> jsonb_array_length(p_items) or v_subtotal is null
 or (select count(distinct x->>'sku') from jsonb_array_elements(p_items) x) <> v_count
 then raise exception 'unavailable_or_duplicate_sku' using errcode='22023'; end if;
 v_fingerprint:=encode(extensions.digest((p_destination_cep||':'||
 (select string_agg(x->>'sku'||':'||x->>'quantity',',' order by x->>'sku') from jsonb_array_elements(p_items) x))::bytea,'sha256'),'hex');
 insert into public.octa_sim_orders(buyer_id,idempotency_key,fingerprint,destination_cep,subtotal_cents)
 values(p_buyer_id,p_idempotency_key,v_fingerprint,p_destination_cep,v_subtotal)
 on conflict(buyer_id,idempotency_key) do nothing returning id into v_order;
 if v_order is not null then
   insert into public.octa_sim_order_items(order_id,sku,title_snapshot,quantity,unit_cents)
   select v_order,c.sku,c.title,(x->>'quantity')::integer,c.unit_cents
   from jsonb_array_elements(p_items) x join public.octa_demo_catalog c on c.sku=x->>'sku';
   insert into public.octa_sim_documentation(order_id) values(v_order);
   return query select v_order,true,o.total_cents from public.octa_sim_orders o where o.id=v_order;
 else
   select o.id,o.fingerprint into v_order,v_existing from public.octa_sim_orders o
   where o.buyer_id=p_buyer_id and o.idempotency_key=p_idempotency_key;
   if v_order is null or v_existing is distinct from v_fingerprint
   then raise exception 'idempotency_conflict' using errcode='23505'; end if;
   return query select v_order,false,o.total_cents from public.octa_sim_orders o where o.id=v_order;
 end if;
end $$;
revoke all on function public.octa_sim_create_order(uuid,uuid,jsonb,text) from public,anon,authenticated;
grant execute on function public.octa_sim_create_order(uuid,uuid,jsonb,text) to service_role;
