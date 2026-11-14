import { act, cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  callback: undefined as undefined | ((event: string, session: unknown) => void),
  query: { clear: vi.fn(), invalidateQueries: vi.fn() },
  router: { invalidate: vi.fn() },
  navigate: vi.fn(),
}));
vi.mock("@/integrations/supabase/client", () => ({ supabase: { auth: {
  onAuthStateChange: (callback: typeof mocks.callback) => {
    mocks.callback = callback;
    return { data: { subscription: { unsubscribe: vi.fn() } } };
  },
  getUser: async () => ({ data: { user: null } }),
} } }));
vi.mock("@tanstack/react-query", () => ({ useQueryClient: () => mocks.query }));
vi.mock("@tanstack/react-router", () => ({ useNavigate: () => mocks.navigate, useRouter: () => mocks.router, Link: () => null }));

const session = { user: { id: "test-account", email_confirmed_at: "2026-11-14", last_sign_in_at: "2026-11-14T01:00:00Z" } };
async function mount() {
  const { AuthProvider } = await import("./auth-context");
  await act(async () => { render(<AuthProvider><span>Account</span></AuthProvider>); });
}
async function emit(event: string, value: unknown = session) {
  await act(async () => { mocks.callback?.(event, value); });
}
describe("Account analytics", () => {
  beforeEach(() => {
    vi.resetModules();
    window.history.replaceState({}, "", "/auth");
    window.__lovableEvents = { track: vi.fn(() => null) };
  });
  afterEach(() => { cleanup(); delete window.__lovableEvents; });
  it("counts a successful login once despite repeated auth notifications", async () => {
    await mount(); await emit("SIGNED_IN"); await emit("SIGNED_IN"); await emit("TOKEN_REFRESHED");
    expect(window.__lovableEvents?.track).toHaveBeenCalledExactlyOnceWith("project.login_completed");
  });
  it("does not count restored sessions as logins", async () => {
    await mount(); await emit("INITIAL_SESSION"); await emit("SIGNED_IN");
    expect(window.__lovableEvents?.track).not.toHaveBeenCalled();
  });
  it("counts a verified signup callback as confirmation, not login", async () => {
    window.history.replaceState({}, "", "/#type=signup");
    await mount(); await emit("SIGNED_IN"); await emit("SIGNED_IN");
    expect(window.__lovableEvents?.track).toHaveBeenCalledExactlyOnceWith("project.email_confirmed");
  });
  it("never counts an unconfirmed callback or recovery session", async () => {
    window.history.replaceState({}, "", "/#type=signup");
    await mount(); await emit("SIGNED_IN", { user: { id: "test", email_confirmed_at: null } });
    await emit("PASSWORD_RECOVERY");
    expect(window.__lovableEvents?.track).not.toHaveBeenCalled();
  });
  it("counts a later login after signout", async () => {
    await mount(); await emit("SIGNED_IN"); await emit("SIGNED_OUT", null); await emit("SIGNED_IN");
    expect(window.__lovableEvents?.track).toHaveBeenCalledTimes(2);
  });
});