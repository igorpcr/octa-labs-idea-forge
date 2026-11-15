import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { ComponentType } from "react";

const mocks = vi.hoisted(() => ({
  pages: {} as Record<string, ComponentType>,
  account: { user: null as null | { id: string }, loading: false, signOut: vi.fn() },
  signup: vi.fn(),
  permission: vi.fn(),
  receipts: vi.fn(),
  navigate: vi.fn(),
}));
vi.mock("@tanstack/react-router", () => ({
  createFileRoute: (path: string) => (options: { component: ComponentType }) => {
    mocks.pages[path] = options.component;
    return { useSearch: () => ({ redirect: "/" }) };
  },
  useNavigate: () => mocks.navigate,
  Link: () => null,
}));
vi.mock("@tanstack/react-start", () => ({ useServerFn: (fn: unknown) => fn }));
vi.mock("@/components/auth-context", () => ({ useAccount: () => mocks.account }));
vi.mock("@/integrations/supabase/client", () => ({ supabase: { auth: { signUp: mocks.signup } } }));
vi.mock("@/integrations/lovable/index", () => ({ lovable: { auth: {} } }));
vi.mock("@/routes/index", () => ({ ImportedHeader: () => null, ImportedFooter: () => null }));
vi.mock("@/lib/blackpix-diagnostics.functions", () => ({
  diagnosticAccess: mocks.permission,
  analyzeBlackPix: vi.fn(),
  listBlackPixReceipts: mocks.receipts,
}));

async function open(path: string) {
  if (path === "/auth") await import("../routes/auth");
  else await import("../routes/_authenticated/admin/blackpix");
  const Page = mocks.pages[path];
  if (!Page) throw new Error("Missing existing page");
  await act(async () => {
    render(<Page />);
  });
}
async function register() {
  await open("/auth");
  fireEvent.click(screen.getByRole("tab", { name: "Criar conta" }));
  fireEvent.change(screen.getByLabelText("E-mail"), { target: { value: "test@example.test" } });
  fireEvent.change(screen.getByLabelText("Senha", { exact: true }), {
    target: { value: "test-password-123" },
  });
  fireEvent.change(screen.getByLabelText("Confirmar senha"), {
    target: { value: "test-password-123" },
  });
  await act(async () => {
    fireEvent.click(screen.getByRole("button", { name: /^Criar conta$/ }));
  });
}
describe("Existing account flow events", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.account.user = null;
    mocks.receipts.mockResolvedValue({ receipts: [], error: null });
    window.__lovableEvents = { track: vi.fn(() => null) };
  });
  afterEach(() => {
    cleanup();
    delete window.__lovableEvents;
  });
  it("emits signup only after a new registration succeeds without personal fields", async () => {
    mocks.signup.mockResolvedValue({
      data: { user: { identities: [{}] }, session: null },
      error: null,
    });
    await register();
    expect(window.__lovableEvents?.track).toHaveBeenCalledExactlyOnceWith(
      "project.signup_completed",
      { confirmation_required: true },
    );
  });
  it("does not count rejected or obfuscated duplicate signups", async () => {
    mocks.signup.mockResolvedValue({
      data: { user: { identities: [] }, session: null },
      error: null,
    });
    await register();
    expect(window.__lovableEvents?.track).not.toHaveBeenCalled();
    cleanup();
    mocks.signup.mockResolvedValue({ data: {}, error: { code: "failure" } });
    await register();
    expect(window.__lovableEvents?.track).not.toHaveBeenCalled();
  });
  it("counts entry only after successful administrator authorization", async () => {
    mocks.account.user = { id: "test-admin" };
    mocks.permission.mockResolvedValue({ isAdmin: true });
    await open("/_authenticated/admin/blackpix");
    await waitFor(() =>
      expect(screen.getByRole("button", { name: "Analisar aviso" })).toBeTruthy(),
    );
    expect(window.__lovableEvents?.track).toHaveBeenCalledExactlyOnceWith(
      "project.admin_access_granted",
      { area: "blackpix" },
    );
  });
  it("does not count denied administrator access", async () => {
    mocks.account.user = { id: "test-nonadmin" };
    mocks.permission.mockResolvedValue({ isAdmin: false });
    await open("/_authenticated/admin/blackpix");
    await waitFor(() => expect(screen.getByRole("alert")).toBeTruthy());
    expect(window.__lovableEvents?.track).not.toHaveBeenCalled();
  });
  it("shows verified webhook history without identifiers or private content", async () => {
    mocks.account.user = { id: "test-admin" };
    mocks.permission.mockResolvedValue({ isAdmin: true });
    mocks.receipts.mockResolvedValue({
      receipts: [
        {
          id: "123e4567-e89b-42d3-a456-426614174000",
          received_at: "2026-11-14T10:00:00.000Z",
          processing_status: "blocked",
          signature_status: "verified",
          error_code: "event_processing_unavailable",
          http_status: 503,
          duration_ms: 12,
        },
      ],
      error: null,
    });
    await open("/_authenticated/admin/blackpix");
    await waitFor(() =>
      expect(screen.getByText("Processamento de eventos ainda não disponível.")).toBeTruthy(),
    );
    expect(screen.getByText("Bloqueado")).toBeTruthy();
    expect(screen.getByText("Resposta HTTP 503 · 12 ms")).toBeTruthy();
    expect(screen.queryByText(/123e4567/)).toBeNull();
  });
});
