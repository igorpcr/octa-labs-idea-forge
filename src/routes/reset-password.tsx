import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { useAccount } from "@/components/auth-context";
import { supabase } from "@/integrations/supabase/client";
import { checkoutHead } from "@/lib/octa-cart";
import { ImportedHeader, ImportedFooter } from "./index";
import capturedCSS from "@/styles/site.css?raw";

export const Route = createFileRoute("/reset-password")({
  head: () => checkoutHead("Redefinir senha", "Defina uma nova senha para sua conta OCTA Labs com um link de recuperação válido."),
  component: ResetPassword,
});
function ResetPassword() {
  const { recovery, user, loading } = useAccount();
  const [hashRecovery, setHashRecovery] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => { setHashRecovery(new URLSearchParams(window.location.hash.slice(1)).get("type") === "recovery"); }, []);
  async function submit(event: FormEvent) {
    event.preventDefault(); setError(null);
    if (!user || !(recovery || hashRecovery)) return;
    if (password !== confirm) { setError("As senhas devem ser iguais."); return; }
    setBusy(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setDone(true); setPassword(""); setConfirm(""); window.history.replaceState(null, "", "/reset-password");
    } catch { setError("Não foi possível redefinir a senha. Solicite outro link e tente novamente."); }
    finally { setBusy(false); }
  }
  return <div className="min-h-screen bg-background text-foreground"><style>{capturedCSS}</style><ImportedHeader /><main className="mx-auto max-w-md px-5 py-12 sm:py-16"><h1 className="text-3xl font-semibold">Redefinir senha</h1>
    {done ? <div className="mt-8 space-y-5"><p role="status" className="text-highlight">Senha atualizada.</p><Button asChild><Link to="/auth">Ir para minha conta</Link></Button></div> : loading ? <p role="status" className="mt-8">Verificando link…</p> : user && (recovery || hashRecovery) ? <form onSubmit={submit} className="mt-8 space-y-5">{[{ id: "new-password", label: "Nova senha", value: password, set: setPassword }, { id: "new-confirm", label: "Confirmar nova senha", value: confirm, set: setConfirm }].map(field => <div key={field.id}><label htmlFor={field.id} className="mb-2 block text-sm font-medium">{field.label}</label><input id={field.id} type="password" autoComplete="new-password" minLength={8} maxLength={128} required disabled={busy} value={field.value} onChange={e => field.set(e.target.value)} className="h-12 w-full rounded-md border border-input bg-background px-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" /></div>)}<Button type="submit" className="h-12 w-full" disabled={busy}>{busy ? "Salvando…" : "Salvar nova senha"}</Button></form> : <div className="mt-8 space-y-5"><p role="alert" className="text-muted-foreground">Link inválido ou expirado. Solicite um novo link de recuperação.</p><Button asChild variant="outline"><Link to="/auth">Voltar para entrar</Link></Button></div>}
    {error && <p role="alert" className="mt-5 text-destructive">{error}</p>}
    </main><ImportedFooter /></div>;
}