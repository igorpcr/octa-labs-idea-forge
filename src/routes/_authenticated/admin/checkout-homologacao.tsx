import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAccount } from "@/components/auth-context";
import { supabase } from "@/integrations/supabase/client";
import { diagnosticAccess } from "@/lib/blackpix-diagnostics.functions";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/admin/checkout-homologacao")({
  component: CheckoutHomologacao,
});
type Attempt = { status: number; orderId?: string; created?: boolean; totalCents?: number; error?: string };
async function attempt(key: string): Promise<Attempt> {
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  if (sessionError || !session?.access_token) return { status: 401, error: "Sessão expirada: faça login novamente." };
  const response = await supabase.functions.invoke("octa-demo-checkout", {
    body: { idempotencyKey: key, sku: "kit-pesquisa-bioquimica", quantity: 1, destinationCep: "30130110", serviceId: 2 },
    headers: { Authorization: `Bearer ${session.access_token}` },
  });
  const result = response.data as Record<string, unknown> | null;
  const status = response.error && "context" in response.error && response.error.context instanceof Response
    ? response.error.context.status : response.error ? 503 : 200;
  return {
    status,
    orderId: typeof result?.orderId === "string" ? result.orderId : undefined,
    created: typeof result?.created === "boolean" ? result.created : undefined,
    totalCents: typeof result?.totalCents === "number" ? result.totalCents : undefined,
    error: typeof result?.error === "string" ? result.error : response.error?.message,
  };
}
function CheckoutHomologacao() {
  const { user, loading } = useAccount();
  const accessCheck = useServerFn(diagnosticAccess);
  const [allowed, setAllowed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ first: Attempt; second: Attempt; passed: boolean } | null>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    let active = true;
    if (!user) { setAllowed(false); setChecking(false); return; }
    setChecking(true);
    void accessCheck().then(x => { if (active) setAllowed(x.isAdmin); })
      .catch(() => { if (active) setAllowed(false); })
      .finally(() => { if (active) setChecking(false); });
    return () => { active = false; };
  }, [user, accessCheck]);
  async function run() {
    setBusy(true); setError(""); setResult(null);
    try {
      const key = crypto.randomUUID();
      const first = await attempt(key);
      if (first.status !== 200 || !first.orderId || first.created !== true) {
        setResult({ first, second: { status: 0, error: "Não executado" }, passed: false }); return;
      }
      const second = await attempt(key);
      const passed = second.status === 200 && second.created === false &&
        second.orderId === first.orderId && second.totalCents === first.totalCents;
      setResult({ first, second, passed });
    } catch { setError("Não foi possível concluir o teste. Nenhuma cobrança foi criada."); }
    finally { setBusy(false); }
  }
  return <main className="mx-auto max-w-3xl p-6 space-y-6">
    <h1 className="text-2xl font-bold">Homologação do checkout B2B</h1>
    <p>Teste administrativo com Kit de Pesquisa Bioquímica fictício. Não gera Pix nem habilita pagamentos.</p>
    {(loading || checking) ? <p>Verificando autorização…</p> :
      !user ? <p role="alert">Entre na sua conta para continuar.</p> :
      !allowed ? <p role="alert">Acesso restrito a administradores.</p> :
      <Button type="button" onClick={() => void run()} disabled={busy}>{busy ? "Testando…" : "Executar teste autenticado de idempotência"}</Button>}
    {error && <p role="alert">{error}</p>}
    {result && <section aria-live="polite" className="space-y-3">
      <h2 className="font-semibold">{result.passed ? "Teste aprovado" : "Teste não aprovado"}</h2>
      <p>Primeira chamada: HTTP {result.first.status}; created={String(result.first.created)}; {result.first.error ?? ""}</p>
      <p>Segunda chamada: HTTP {result.second.status}; created={String(result.second.created)}; {result.second.error ?? ""}</p>
      {result.first.orderId && <p>Pedido: {result.first.orderId}</p>}
      {result.first.totalCents !== undefined && <p>Total: {(result.first.totalCents / 100).toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}</p>}
    </section>}
  </main>;
}
