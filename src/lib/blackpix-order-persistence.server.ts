import { randomUUID } from "node:crypto";
import { quoteTrustedCart } from "./blackpix-trusted-catalog.server";
import type { CheckoutSelection } from "./blackpix-checkout-validation";
import { getBlackPixSupabaseAdmin } from "./blackpix-supabase.server";

/** Persists a server-quoted draft before any BlackPix call. Never exposed as a public API. */
export async function persistTrustedPixOrder(
  selections: CheckoutSelection[],
  options: {
    catalogJson?: string;
    db?: Pick<ReturnType<typeof getBlackPixSupabaseAdmin>, "from">;
    uuid?: () => string;
  } = {},
): Promise<{ orderId: string; amountCents: number; description: string; idempotencyKey: string }> {
  const quote = quoteTrustedCart(selections, options.catalogJson ?? process.env["OCTA_TRUSTED_CATALOG_JSON"]);
  if (quote.amountCents <= 0 || quote.lines.length === 0) throw new Error("invalid_quote");
  const description = `OCTA Labs - ${quote.lines.reduce((sum, line) => sum + line.quantity, 0)} item(ns)`;
  const idempotencyKey = (options.uuid ?? randomUUID)();
  const db = options.db ?? getBlackPixSupabaseAdmin();
  const { data, error } = await db.from("octa_pix_orders").insert({
    amount_cents: quote.amountCents,
    description,
    idempotency_key: idempotencyKey,
    status: "pending",
  }).select("id").single();
  if (error || !data || typeof data.id !== "string") throw new Error("order_storage_unavailable");
  return { orderId: data.id, amountCents: quote.amountCents, description, idempotencyKey };
}
