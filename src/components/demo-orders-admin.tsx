import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

type OrderRow = { id: string; created_at: string; status: string; subtotal_cents: number; shipping_cents: number; total_cents: number; shipping_source: string };
type OrdersResponse = { orders?: OrderRow[]; error?: string };
const brl = (cents: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(cents / 100);

export function DemoOrdersAdmin() {
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("Pedidos simulados; pagamentos desativados.");
  async function refresh() {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) { setMessage("Faça login novamente."); return; }
      const { data, error } = await supabase.functions.invoke<OrdersResponse>("octa-demo-admin-orders", {
        body: { limit: 30 },
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      if (error || !Array.isArray(data?.orders)) {
        setMessage("Consulta administrativa indisponível. O serviço ainda pode estar aguardando homologação.");
        return;
      }
      setOrders(data.orders);
      setMessage(`${data.orders.length} pedidos simulados carregados. Nenhuma cobrança foi realizada.`);
    } catch {
      setMessage("Não foi possível carregar os pedidos simulados.");
    } finally { setLoading(false); }
  }
  return <section className="space-y-3 rounded-lg border p-4" aria-label="Pedidos de demonstração">
    <h2 className="text-xl font-semibold">Painel administrativo — pedidos simulados</h2>
    <p className="text-sm text-muted-foreground">{message}</p>
    <Button type="button" variant="outline" disabled={loading} onClick={() => void refresh()}>{loading ? "Carregando…" : "Consultar pedidos de teste"}</Button>
    <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr><th className="p-2 text-left">Pedido</th><th className="p-2 text-left">Data</th><th className="p-2 text-left">Situação</th><th className="p-2 text-right">Total</th></tr></thead>
      <tbody>{orders.map(order => <tr key={order.id} className="border-t"><td className="p-2 font-mono text-xs">{order.id.slice(0, 8)}</td><td className="p-2">{new Date(order.created_at).toLocaleString("pt-BR")}</td><td className="p-2">{order.status}</td><td className="p-2 text-right">{brl(order.total_cents)}</td></tr>)}</tbody></table></div>
  </section>;
}
