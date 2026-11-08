import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { ShieldCheck, Sparkles, LoaderCircle, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import "@lovable.dev/cloud-auth-js/styles.css";
import { Button } from "@/components/ui/button";
import { ImportedHeader, ImportedFooter } from "./index";
import { diagnosticMessages, diagnosticInput, type DiagnosticInput } from "@/lib/blackpix-diagnostics";
import { analyzeBlackPix, diagnosticAccess } from "@/lib/blackpix-diagnostics.functions";
import { checkoutHead } from "@/lib/octa-cart";

export const Route = createFileRoute("/admin/blackpix")({
  head: () => ({ ...checkoutHead("Diagnóstico BlackPix", "Análise administrativa de avisos BlackPix da OCTA Labs."), meta: [...checkoutHead("Diagnóstico BlackPix", "Análise administrativa de avisos BlackPix da OCTA Labs.").meta, { name: "robots", content: "noindex, nofollow" }] }),
  component: BlackPixDiagnostics,
});

function BlackPixDiagnostics() {
  const [access, setAccess] = useState<"loading" | "signed_out" | "denied" | "admin">("loading");
  const [status, setStatus] = useState<DiagnosticInput["status"]>("blocked");
  const [errorCode, setErrorCode] = useState<DiagnosticInput["error"]>("event_processing_unavailable");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const checkAccess = useServerFn(diagnosticAccess);
  const analyze = useServerFn(analyzeBlackPix);
  useEffect(() => {
    let active = true;
    async function refresh() {
      const { data } = await supabase.auth.getSession();
      if (!data.session) { if (active) { setAccess("signed_out"); setResult(null); } return; }
      try {
        const permission = await checkAccess();
        if (active) { setAccess(permission.isAdmin ? "admin" : "denied"); setResult(null); }
      } catch { if (active) setAccess("denied"); }
    }
    void refresh();
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "USER_UPDATED") void refresh();
    });
    return () => { active = false; data.subscription.unsubscribe(); };
  }, [checkAccess]);
  async function signIn(provider: "google" | "lovable") {
    setError(null);
    const outcome = await lovable.auth.signInWithOAuth(provider, { redirect_uri: `${window.location.origin}/admin/blackpix` });
    if (outcome.error) setError("Não foi possível entrar. Tente novamente.");
  }
  async function submit(event: React.FormEvent) {
    event.preventDefault(); setBusy(true); setError(null); setResult(null);
    try {
      const response = await analyze({ data: { status, error: errorCode } });
      setResult(response.text); setError(response.error);
    } catch { setError("Acesso indisponível ou não autorizado. Entre novamente com uma conta administradora."); }
    finally { setBusy(false); }
  }
  return <div className="min-h-screen bg-background text-foreground"><ImportedHeader />
    <main className="mx-auto max-w-4xl px-5 py-12 sm:py-16">
      <div className="flex items-center gap-3 text-primary"><ShieldCheck size={24} /><span className="text-sm font-medium uppercase">Administração OCTA</span></div>
      <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">Diagnóstico BlackPix</h1>
      {access === "loading" && <p className="mt-8 text-muted-foreground" role="status">Verificando acesso…</p>}
      {access === "signed_out" && <section className="mt-8 max-w-md space-y-4"><h2 className="text-xl font-medium">Entrar na administração</h2>
        <Button className="lovable-auth-button w-full" onClick={() => void signIn("lovable")}>Sign in with Lovable</Button>
        <Button variant="outline" className="w-full" onClick={() => void signIn("google")}><svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18"><path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"/><path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"/><path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"/><path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"/></svg>Entrar com Google</Button>
      </section>}
      {access === "denied" && <p className="mt-8 text-muted-foreground" role="alert">Sua conta ainda não possui permissão de administrador.</p>}
      {access === "admin" && <form onSubmit={submit} className="mt-8 space-y-6 border-y border-border py-8">
        <div><label htmlFor="notice-status" className="mb-2 block font-medium">Status de processamento</label><select id="notice-status" value={status} disabled={busy} onChange={e => { setStatus(diagnosticInput.shape.status.parse(e.target.value)); setResult(null); }} className="h-11 w-full rounded-md border border-input bg-background px-3"><option value="blocked">Bloqueado</option><option value="failed">Falha</option><option value="rejected">Rejeitado</option></select></div>
        <div><label htmlFor="notice-error" className="mb-2 block font-medium">Mensagem de erro sanitizada</label><select id="notice-error" value={errorCode} disabled={busy} onChange={e => { setErrorCode(diagnosticInput.shape.error.parse(e.target.value)); setResult(null); }} className="h-11 w-full min-w-0 rounded-md border border-input bg-background px-3 text-sm">{Object.entries(diagnosticMessages).map(([code, message]) => <option key={code} value={code}>{message}</option>)}</select></div>
        <Button type="submit" disabled={busy}>{busy ? <LoaderCircle className="animate-spin" /> : <Sparkles />}{busy ? "Analisando…" : "Analisar aviso"}</Button>
      </form>}
      {error && <p role="alert" className="mt-6 text-destructive">{error}</p>}
      {result && <section className="mt-8" aria-live="polite"><h2 className="text-xl font-semibold">Análise do aviso</h2><p className="mt-4 whitespace-pre-wrap break-words leading-7">{result}</p><p className="mt-6 text-sm text-muted-foreground">Sugestões de IA sujeitas à revisão humana. Nenhum pagamento ou registro foi alterado.</p></section>}
      {(access === "admin" || access === "denied") && <Button variant="ghost" className="mt-8" onClick={() => void supabase.auth.signOut()}><LogOut />Sair</Button>}
    </main><ImportedFooter /></div>;
}