import postgres from "postgres";
import { readFileSync } from "node:fs";
import assert from "node:assert/strict";

const url = process.env.TEST_DATABASE_URL;
if (!url || !url.includes("localhost")) throw new Error("local_test_database_only");
const db = postgres(url, { max: 4 });
const id = "550e8400-e29b-41d4-a716-446655440000";
const key = "550e8400-e29b-41d4-a716-446655440001";
const a = "550e8400-e29b-41d4-a716-446655440002";
const b = "550e8400-e29b-41d4-a716-446655440003";
const claim = async (token) => (await db`select public.claim_octa_pix_charge_lease(${id}::uuid,${token}::uuid,90) as ok`)[0].ok;
const release = async (token) => (await db`select public.release_octa_pix_charge_lease(${id}::uuid,${token}::uuid) as ok`)[0].ok;
try {
  await db.unsafe("create role service_role; create role anon; create role authenticated;");
  await db.unsafe(readFileSync("drizzle/migrations/0002_octa_pix_orders.sql", "utf8"));
  await db.unsafe(readFileSync("drizzle/migrations/0004_octa_pix_charge_lease.sql", "utf8"));
  await db`insert into public.octa_pix_orders (id,amount_cents,description,idempotency_key) values (${id}::uuid,100,'Synthetic test order',${key}::uuid)`;
  assert.equal(await claim(a), true);
  assert.equal(await claim(b), false);
  assert.equal(await release(b), false);
  assert.equal(await release(a), true);
  assert.equal(await claim(b), true);
  assert.equal(await release(b), true);
  // Both independent sessions compete simultaneously; only one may win.
  const [r1,r2] = await Promise.all([claim(a),claim(b)]);
  assert.deepEqual([r1,r2].sort(), [false,true]);
  assert.equal(await release(r1 ? a : b), true);
  await db`update public.octa_pix_orders set charge_lease_token=${a}::uuid, charge_lease_until=now()-interval '1 second' where id=${id}::uuid`;
  assert.equal(await claim(b), true);
  assert.equal(await release(b), true);
  await db`update public.octa_pix_orders set deposit_id='linked' where id=${id}::uuid`;
  assert.equal(await claim(a), false);
  console.log("PASS: local PostgreSQL lease concurrency, ownership, expiry and linked-order guards");
} finally { await db.end(); }
