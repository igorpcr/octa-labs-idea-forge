import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Eye, EyeOff, LoaderCircle, LogIn, Mail, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAccount } from "@/components/auth-context";
import { supabase } from "@/integrations/supabase/client";
import { safeAuthDestination, signupNeedsConfirmation } from "@/lib/octa-auth";
import { checkoutHead } from "@/lib/octa-cart";
import { ImportedHeader, ImportedFooter } from "./index";
import capturedCSS from "@/styles/site.css?raw";
import { lovable } from "@/integrations/lovable/index";
import "@lovable.dev/cloud-auth-js/styles.css";

export const Route = createFileRoute("/auth")({
  validateSearch: (search: Record<string, unknown>): { redirect?: "/" | "/admin/blackpix" } => ({ redirect: safeAuthDestination(search['redirect']) }),
  head: () => checkoutHead("Entrar ou criar conta", "Acesse sua conta OCTA Labs ou cadastre-se com e-mail e senha."),
  component: AuthPage,
});

function AuthPage() {
  const { user, loading, signOut } = useAccount();
  const { redirect = "/" } = Route.useSearch();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup" | "forgot">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [visible, setVisible] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  function changeMode(next: typeof mode) { setMode(next); setError(null); setNotice(null); setPassword(""); setConfirm(""); }
  async function socialSignIn(provider: "google" | "lovable") {
    setBusy(true); setError(null);
    try {
      const outcome = await lovable.auth.signInWithOAuth(provider, { redirect_uri: `${window.location.origin}/auth?redirect=${encodeURIComponent(redirect)}` });
      if (outcome.error) throw outcome.error;
      const { data } = await supabase.auth.getUser();
      if (data.user) await navigate({ to: redirect, replace: true });
    } catch { setError("Não foi possível entrar. Tente novamente."); }
    finally { setBusy(false); }
  }
  async function submit(event: FormEvent) {
    event.preventDefault(); setError(null); setNotice(null);
    if (mode === "signup" && password !== confirm) { setError("As senhas devem ser iguais."); return; }
    setBusy(true);
    try {
      if (mode === "forgot") {
        const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo: `${window.location.origin}/reset-password` });
        if (error) throw error;
        setNotice("Se houver uma conta com esse e-mail, você receberá um link para redefinir sua senha.");
      } else if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({ email: email.trim(), password, options: { emailRedirectTo: window.location.origin } });
        if (error) throw error;
        setPassword(""); setConfirm("");
        if (signupNeedsConfirmation(data.session)) setNotice("Confira seu e-mail e clique no link de confirmação antes de entrar.");
        else await navigate({ to: redirect, replace: true });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (error) throw error;
        setPassword(""); await navigate({ to: redirect, replace: true });
      }
    } catch (failure) {
      const code = failure && typeof failure === "object" && "code" in failure ? failure.code : null;
      setError(code === "email_not_confirmed" ? "Confirme seu e-mail antes de entrar." : code === "over_email_send_rate_limit" ? "Limite temporário de e-mails. Aguarde antes de tentar novamente." : mode === "login" ? "Não foi possível entrar. Confira seu e-mail e senha." : "Não foi possível concluir. Confira os dados e tente novamente mais tarde.");
    } finally { setBusy(false); }
  }
  const inputClass = "h-12 w-full min-w-0 rounded-md border border-input bg-background px-3 text-base text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring";
  return <div className="min-h-screen bg-background text-foreground"><style>{capturedCSS}</style><ImportedHeader />
    <main className="mx-auto w-full max-w-md px-5 py-12 sm:py-16">
      <div className="flex items-center gap-2 text-highlight"><ShieldCheck size={20} /><span className="text-sm font-semibold">OCTA LABS</span></div>
      <h1 className="mt-4 text-3xl font-semibold">{user ? "Minha conta" : mode === "signup" ? "Criar conta" : mode === "forgot" ? "Recuperar senha" : "Entrar"}</h1>
      {loading ? <p role="status" className="mt-8 text-muted-foreground">Verificando acesso…</p> : user ? <section className="mt-8 space-y-5">
        <p className="break-words text-muted-foreground">{user.email}</p>
        <Button asChild className="w-full"><Link to="/admin/blackpix">Administração BlackPix</Link></Button>
        <Button variant="outline" className="w-full" disabled={busy} onClick={() => { setBusy(true); void signOut().catch(() => setError("Não foi possível sair. Tente novamente.")).finally(() => setBusy(false)); }}>Sair da conta</Button>
      </section> : <>
        {mode !== "forgot" && <div className="mt-7 grid grid-cols-2 gap-1 border-b border-border pb-3" role="tablist" aria-label="Acesso à conta"><Button role="tab" aria-selected={mode === "login"} variant={mode === "login" ? "secondary" : "ghost"} disabled={busy} onClick={() => changeMode("login")}>Entrar</Button><Button role="tab" aria-selected={mode === "signup"} variant={mode === "signup" ? "secondary" : "ghost"} disabled={busy} onClick={() => changeMode("signup")}>Criar conta</Button></div>}
        <form onSubmit={submit} className="mt-7 space-y-5">
          <div><label htmlFor="account-email" className="mb-2 block text-sm font-medium">E-mail</label><input id="account-email" type="email" autoComplete="email" required maxLength={254} value={email} disabled={busy} onChange={e => setEmail(e.target.value)} className={inputClass} /></div>
          {mode !== "forgot" && <div><label htmlFor="account-password" className="mb-2 block text-sm font-medium">Senha</label><div className="relative"><input id="account-password" type={visible ? "text" : "password"} autoComplete={mode === "signup" ? "new-password" : "current-password"} required minLength={mode === "signup" ? 8 : undefined} maxLength={128} value={password} disabled={busy} onChange={e => setPassword(e.target.value)} className={`${inputClass} pr-12`} /><Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1.5" aria-label={visible ? "Ocultar senha" : "Mostrar senha"} title={visible ? "Ocultar senha" : "Mostrar senha"} onClick={() => setVisible(!visible)}>{visible ? <EyeOff /> : <Eye />}</Button></div>{mode === "signup" && <p className="mt-2 text-xs text-muted-foreground">Mínimo de 8 caracteres.</p>}</div>}
          {mode === "signup" && <div><label htmlFor="confirm-password" className="mb-2 block text-sm font-medium">Confirmar senha</label><input id="confirm-password" type={visible ? "text" : "password"} autoComplete="new-password" required value={confirm} disabled={busy} onChange={e => setConfirm(e.target.value)} className={inputClass} /></div>}
          <Button type="submit" className="h-12 w-full" disabled={busy}>{busy ? <LoaderCircle className="animate-spin motion-reduce:animate-none" /> : mode === "forgot" ? <Mail /> : <LogIn />}{busy ? "Aguarde…" : mode === "signup" ? "Criar conta" : mode === "forgot" ? "Enviar link de recuperação" : "Entrar"}</Button>
          <Button type="button" variant="link" className="w-full" disabled={busy} onClick={() => changeMode(mode === "forgot" ? "login" : "forgot")}>{mode === "forgot" ? "Voltar para entrar" : "Esqueci minha senha"}</Button>
        </form>
        {mode !== "forgot" && <div className="mt-5 space-y-3 border-t border-border pt-5"><Button variant="outline" className="h-11 w-full" disabled={busy} onClick={() => void socialSignIn("google")}>Entrar com Google</Button><Button className="lovable-auth-button h-11 w-full" disabled={busy} onClick={() => void socialSignIn("lovable")}>Sign in with Lovable</Button></div>}
      </>}
      {error && <p role="alert" className="mt-5 text-sm text-destructive">{error}</p>}
      {notice && <p role="status" className="mt-5 text-sm leading-relaxed text-highlight">{notice}</p>}
    </main><ImportedFooter /></div>;
}