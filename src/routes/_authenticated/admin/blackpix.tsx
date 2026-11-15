import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useCallback, useEffect, useRef, useState } from "react";
import { History, LoaderCircle, LogOut, RefreshCw, ShieldCheck, Sparkles } from "lucide-react";
import { useAccount } from "@/components/auth-context";
import { Button } from "@/components/ui/button";
import { ImportedHeader, ImportedFooter } from "../../index";
import { diagnosticMessages, diagnosticInput, type DiagnosticInput } from "@/lib/blackpix-diagnostics";
import { analyzeBlackPix, diagnosticAccess, listBlackPixReceipts } from "@/lib/blackpix-diagnostics.functions";
import type { BlackPixAudit } from "@/lib/blackpix-audit";
import { checkoutHead } from "@/lib/octa-cart";
import capturedCSS from "@/styles/site.css?raw";

export const Route = createFileRoute("/_authenticated/admin/blackpix")({
  head: () => ({ ...checkoutHead("Diagnóstico BlackPix", "Análise administrativa de avisos BlackPix da OCTA Labs."), meta: [...checkoutHead("Diagnóstico BlackPix", "Análise administrativa de avisos BlackPix da OCTA Labs.").meta, { name: "robots", content: "noindex, nofollow" }] }),
  component: BlackPixDiagnostics,
});

const receiptStatusLabels: Record<BlackPixAudit["processing_status"], string> = {
  blocked: "Bloqueado",
  failed: "Falha",
  rejected: "Rejeitado",
};

function BlackPixDiagnostics() {
  const { user, signOut } = useAccount();
  const [access, setAccess] = useState<"loading" | "signed_out" | "denied" | "admin">("loading");
  const [status, setStatus] = useState<DiagnosticInput["status"]>("blocked");
  const [errorCode, setErrorCode] = useState<DiagnosticInput["error"]>("event_processing_unavailable");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [receipts, setReceipts] = useState<BlackPixAudit[]>([]);
  const [receiptsBusy, setReceiptsBusy] = useState(false);
  const [receiptsError, setReceiptsError] = useState<string | null>(null);
  const checkAccess = useServerFn(diagnosticAccess);
  const analyze = useServerFn(analyzeBlackPix);
  const listReceipts = useServerFn(listBlackPixReceipts);
  const trackedAccess = useRef<string | null>(null);
  useEffect(() => {
    let active = true;
    async function refresh() {
      if (!user) { trackedAccess.current = null; if (active) { setAccess("loading"); setResult(null); } return; }
      try {
        const permission = await checkAccess();
        if (active) {
          setAccess(permission.isAdmin ? "admin" : "denied"); setResult(null);
          if (permission.isAdmin && trackedAccess.current !== user.id) {
            trackedAccess.current = user.id;
            window.__lovableEvents?.track?.("project.admin_access_granted", { area: "blackpix" });
          }
        }
      } catch { if (active) setAccess("denied"); }
    }
    void refresh();
    return () => { active = false; };
  }, [checkAccess, user]);
  const refreshReceipts = useCallback(async () => {
    setReceiptsBusy(true);
    setReceiptsError(null);
    try {
      const history = await listReceipts();
      setReceipts(history.receipts);
      setReceiptsError(history.error);
    } catch {
      setReceiptsError("Não foi possível carregar o histórico de avisos.");
    } finally {
      setReceiptsBusy(false);
    }
  }, [listReceipts]);
  useEffect(() => {
    if (access === "admin") void refreshReceipts();
  }, [access, refreshReceipts]);
  async function submit(event: React.FormEvent) {
    event.preventDefault(); setBusy(true); setError(null); setResult(null);
    try {
      const response = await analyze({ data: { status, error: errorCode } });
      setResult(response.text); setError(response.error);
    } catch { setError("Acesso indisponível ou não autorizado. Entre novamente com uma conta administradora."); }
    finally { setBusy(false); }
  }
  return <div className="min-h-screen bg-background text-foreground"><style>{capturedCSS}</style><ImportedHeader />
    <main className="mx-auto max-w-4xl px-5 py-12 sm:py-16">
      <div className="flex items-center gap-3 text-primary"><ShieldCheck size={24} /><span className="text-sm font-medium uppercase">Administração OCTA</span></div>
      <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">Diagnóstico BlackPix</h1>
      {access === "loading" && <p className="mt-8 text-muted-foreground" role="status">Verificando acesso…</p>}
      {access === "denied" && <p className="mt-8 text-muted-foreground" role="alert">Sua conta ainda não possui permissão de administrador.</p>}
      {access === "admin" && <form onSubmit={submit} className="mt-8 space-y-6 border-y border-border py-8">
        <div><label htmlFor="notice-status" className="mb-2 block font-medium">Status de processamento</label><select id="notice-status" value={status} disabled={busy} onChange={e => { setStatus(diagnosticInput.shape.status.parse(e.target.value)); setResult(null); }} className="h-11 w-full rounded-md border border-input bg-background px-3"><option value="blocked">Bloqueado</option><option value="failed">Falha</option><option value="rejected">Rejeitado</option></select></div>
        <div><label htmlFor="notice-error" className="mb-2 block font-medium">Mensagem de erro sanitizada</label><select id="notice-error" value={errorCode} disabled={busy} onChange={e => { setErrorCode(diagnosticInput.shape.error.parse(e.target.value)); setResult(null); }} className="h-11 w-full min-w-0 rounded-md border border-input bg-background px-3 text-sm">{Object.entries(diagnosticMessages).map(([code, message]) => <option key={code} value={code}>{message}</option>)}</select></div>
        <Button type="submit" disabled={busy}>{busy ? <LoaderCircle className="animate-spin" /> : <Sparkles />}{busy ? "Analisando…" : "Analisar aviso"}</Button>
      </form>}
      {access === "admin" && <section className="mt-10 border-y border-border py-8" aria-labelledby="blackpix-receipts-title">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-primary"><History size={20} /><h2 id="blackpix-receipts-title" className="text-xl font-semibold text-foreground">Avisos recebidos</h2></div>
          <Button type="button" variant="outline" size="sm" disabled={receiptsBusy} onClick={() => { void refreshReceipts(); }}><RefreshCw className={receiptsBusy ? "animate-spin" : undefined} />Atualizar</Button>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">Os 50 avisos verificados mais recentes aparecem aqui. Tentativas sem assinatura válida são rejeitadas e não são gravadas.</p>
        {receiptsBusy && <p className="mt-6 text-muted-foreground" role="status">Carregando avisos…</p>}
        {receiptsError && <p className="mt-6 text-destructive" role="alert">{receiptsError}</p>}
        {!receiptsBusy && !receiptsError && receipts.length === 0 && <p className="mt-6 text-muted-foreground">Nenhum aviso verificado foi registrado ainda.</p>}
        {!receiptsError && receipts.length > 0 && <ul className="mt-6 space-y-4">
          {receipts.map((receipt) => <li key={receipt.id} className="rounded-lg border border-border p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <time dateTime={receipt.received_at} className="font-medium">{new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "medium" }).format(new Date(receipt.received_at))}</time>
              <span className="rounded-full border border-border px-3 py-1 text-xs uppercase text-muted-foreground">{receiptStatusLabels[receipt.processing_status]}</span>
            </div>
            <p className="mt-3 text-sm">{diagnosticMessages[receipt.error_code]}</p>
            <p className="mt-2 text-xs text-muted-foreground">Resposta HTTP {receipt.http_status} · {receipt.duration_ms} ms</p>
          </li>)}
        </ul>}
      </section>}
      {error && <p role="alert" className="mt-6 text-destructive">{error}</p>}
      {result && <section className="mt-8" aria-live="polite"><h2 className="text-xl font-semibold">Análise do aviso</h2><p className="mt-4 whitespace-pre-wrap break-words leading-7">{result}</p><p className="mt-6 text-sm text-muted-foreground">Sugestões de IA sujeitas à revisão humana. Nenhum pagamento ou registro foi alterado.</p></section>}
      {(access === "admin" || access === "denied") && <Button variant="ghost" className="mt-8" onClick={() => { void signOut().catch(() => setError("Não foi possível sair. Tente novamente.")); }}><LogOut />Sair</Button>}
    </main><ImportedFooter /></div>;
}