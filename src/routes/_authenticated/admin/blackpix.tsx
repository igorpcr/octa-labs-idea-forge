import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef, useState } from "react";
import { ShieldCheck, Sparkles, LoaderCircle, LogOut } from "lucide-react";
import { useAccount } from "@/components/auth-context";
import { Button } from "@/components/ui/button";
import { ImportedHeader, ImportedFooter } from "../../index";
import { diagnosticMessages, diagnosticInput, type DiagnosticInput } from "@/lib/blackpix-diagnostics";
import { analyzeBlackPix, diagnosticAccess } from "@/lib/blackpix-diagnostics.functions";
import { checkoutHead } from "@/lib/octa-cart";
import capturedCSS from "@/styles/site.css?raw";

export const Route = createFileRoute("/_authenticated/admin/blackpix")({
  head: () => ({ ...checkoutHead("Diagnóstico BlackPix", "Análise administrativa de avisos BlackPix da OCTA Labs."), meta: [...checkoutHead("Diagnóstico BlackPix", "Análise administrativa de avisos BlackPix da OCTA Labs.").meta, { name: "robots", content: "noindex, nofollow" }] }),
  component: BlackPixDiagnostics,
});

function BlackPixDiagnostics() {
  const { user, signOut } = useAccount();
  const [access, setAccess] = useState<"loading" | "signed_out" | "denied" | "admin">("loading");
  const [status, setStatus] = useState<DiagnosticInput["status"]>("blocked");
  const [errorCode, setErrorCode] = useState<DiagnosticInput["error"]>("event_processing_unavailable");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const checkAccess = useServerFn(diagnosticAccess);
  const analyze = useServerFn(analyzeBlackPix);
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
      {error && <p role="alert" className="mt-6 text-destructive">{error}</p>}
      {result && <section className="mt-8" aria-live="polite"><h2 className="text-xl font-semibold">Análise do aviso</h2><p className="mt-4 whitespace-pre-wrap break-words leading-7">{result}</p><p className="mt-6 text-sm text-muted-foreground">Sugestões de IA sujeitas à revisão humana. Nenhum pagamento ou registro foi alterado.</p></section>}
      {(access === "admin" || access === "denied") && <Button variant="ghost" className="mt-8" onClick={() => { void signOut().catch(() => setError("Não foi possível sair. Tente novamente.")); }}><LogOut />Sair</Button>}
    </main><ImportedFooter /></div>;
}