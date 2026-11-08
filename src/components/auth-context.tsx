import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { User } from "@supabase/supabase-js";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate, useRouter } from "@tanstack/react-router";
import { LogIn, LogOut, UserRound } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { clearAndSignOut } from "@/lib/octa-auth";
import { Button } from "@/components/ui/button";

const AuthContext = createContext<{ user: User | null; loading: boolean; recovery: boolean; signOut: () => Promise<void> }>({ user: null, loading: true, recovery: false, signOut: async () => {} });
export const useAccount = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [recovery, setRecovery] = useState(false);
  const router = useRouter();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  useEffect(() => {
    let active = true;
    let revision = 0;
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY") setRecovery(true);
      if (!["SIGNED_IN", "SIGNED_OUT", "USER_UPDATED", "PASSWORD_RECOVERY"].includes(event)) return;
      revision++;
      setUser(session?.user ?? null);
      setLoading(false);
      if (event === "SIGNED_OUT") { setRecovery(false); queryClient.clear(); }
      void router.invalidate();
      if (event !== "SIGNED_OUT") void queryClient.invalidateQueries();
    });
    const initialRevision = revision;
    void supabase.auth.getUser().then(({ data }) => {
      if (active && initialRevision === revision) { setUser(data.user); setLoading(false); }
    }).catch(() => { if (active) setLoading(false); });
    return () => { active = false; data.subscription.unsubscribe(); };
  }, [queryClient, router]);
  const signOut = async () => {
    await clearAndSignOut(queryClient, () => supabase.auth.signOut(), () => navigate({ to: "/auth", replace: true }));
  };
  return <AuthContext.Provider value={{ user, loading, recovery, signOut }}>{children}</AuthContext.Provider>;
}

export function AccountActions({ mobile = false }: { mobile?: boolean }) {
  const { user, loading, signOut } = useAccount();
  const [error, setError] = useState(false);
  return <div className={mobile ? "flex flex-wrap items-center gap-2 py-2" : "flex shrink-0 items-center gap-1"}>
    <Button asChild variant="ghost" size={mobile ? "default" : "icon"} title={user ? "Minha conta" : "Entrar / Criar conta"}>
      <Link to="/auth" aria-label={user ? "Minha conta" : "Entrar / Criar conta"}>{user ? <UserRound /> : <LogIn />}{mobile && (user ? "Minha conta" : "Entrar / Criar conta")}</Link>
    </Button>
    {user && !loading && <Button variant="ghost" size={mobile ? "default" : "icon"} title="Sair" aria-label="Sair" onClick={() => { void signOut().catch(() => setError(true)); }}><LogOut />{mobile && "Sair"}</Button>}
    {error && <span role="alert" className="text-xs text-destructive">Falha ao sair.</span>}
  </div>;
}