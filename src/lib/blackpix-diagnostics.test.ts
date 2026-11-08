import { describe, expect, it, vi } from "vitest";
import { diagnosticInput, safeDiagnosticInput, withAdminAccess } from "./blackpix-diagnostics";

describe("Administrative BlackPix diagnosis", () => {
  it("blocks non-administrators before calling AI", async () => {
    const model = vi.fn(async () => "analysis");
    await expect(withAdminAccess(false, model)).rejects.toThrow("Acesso restrito");
    expect(model).not.toHaveBeenCalled();
  });
  it("allows explicitly authorized administrators", async () => {
    const model = vi.fn(async () => "analysis");
    expect(await withAdminAccess(true, model)).toBe("analysis");
    expect(model).toHaveBeenCalledOnce();
  });
  it("only sends an approved sanitized message and status to AI", () => {
    expect(safeDiagnosticInput({ status: "blocked", error: "event_processing_unavailable" })).toEqual({ status: "blocked", message: "Processamento de eventos ainda não disponível." });
  });
  it("rejects arbitrary error text, secrets and extra payloads", () => {
    expect(diagnosticInput.safeParse({ status: "failed", error: "secret=private" }).success).toBe(false);
    expect(diagnosticInput.safeParse({ status: "failed", error: "audit_write_failed", payload: "private" }).success).toBe(false);
    expect(diagnosticInput.safeParse({ status: "paid", error: "audit_write_failed" }).success).toBe(false);
  });
});