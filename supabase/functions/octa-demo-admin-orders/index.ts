// Draft only: deploy after review. Never expose the service-role key to clients.
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
const origin = "https://octa-labs-idea-forge.lovable.app";
const cors = { "Access-Control-Allow-Origin": origin, "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-client-info", "Access-Control-Allow-Methods": "POST, OPTIONS", "Vary": "Origin" };
const reply = (status: number, body: unknown) => Response.json(body, { status, headers: { ...cors, "Cache-Control": "no-store" } });
Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
  if (request.method !== "POST") return reply(405, { error: "method_not_allowed" });
  const token = request.headers.get("Authorization") ?? "";
  if (!/^Bearer\\s+\\S+$/.test(token)) return reply(401, { error: "unauthorized" });
  const url = Deno.env.get("SUPABASE_URL");
  const secret = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !secret) return reply(503, { error: "not_configured" });
  const headers = { apikey: secret, Authorization: `Bearer ${secret}` };
  try {
    const auth = await fetch(`${url}/auth/v1/user`, { headers: { ...headers, Authorization: token }, signal: AbortSignal.timeout(8000) });
    if (!auth.ok) return reply(401, { error: "unauthorized" });
    const user = await auth.json();
    if (!user?.id) return reply(401, { error: "unauthorized" });
    // Authorization is enforced on the server, not merely by the admin page.
    const role = await fetch(`${url}/rest/v1/user_roles?user_id=eq.${encodeURIComponent(user.id)}&role=eq.admin&select=role&limit=1`, { headers, signal: AbortSignal.timeout(8000) });
    if (!role.ok) return reply(503, { error: "role_check_unavailable" });
    const roles = await role.json();
    if (!Array.isArray(roles) || roles.length !== 1) return reply(403, { error: "forbidden" });
    const orders = await fetch(`${url}/rest/v1/octa_demo_orders?select=id,created_at,status,subtotal_cents,shipping_cents,total_cents,shipping_source&order=created_at.desc&limit=30`, { headers, signal: AbortSignal.timeout(8000) });
    if (!orders.ok) return reply(503, { error: "orders_unavailable" });
    return reply(200, { orders: await orders.json(), paymentAvailable: false });
  } catch { return reply(503, { error: "temporarily_unavailable" }); }
});
