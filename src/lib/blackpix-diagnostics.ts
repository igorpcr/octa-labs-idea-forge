import { z } from "zod";

export const diagnosticMessages = {
  event_processing_unavailable: "Processamento de eventos ainda não disponível.",
  invalid_signature: "Assinatura inválida ou expirada.",
  secret_not_configured: "Segredo de assinatura não configurado.",
  invalid_json: "Formato JSON inválido.",
  invalid_payload: "Estrutura do aviso inválida.",
  request_read_failed: "Não foi possível ler o aviso.",
  signature_verification_failed: "Falha ao verificar a assinatura.",
  audit_write_failed: "Falha ao registrar o aviso no histórico privado.",
} as const;
export const diagnosticInput = z.object({
  status: z.enum(["blocked", "failed", "rejected"]),
  error: z.enum(["event_processing_unavailable", "invalid_signature", "secret_not_configured", "invalid_json", "invalid_payload", "request_read_failed", "signature_verification_failed", "audit_write_failed"]),
}).strict();
export type DiagnosticInput = z.infer<typeof diagnosticInput>;
export function safeDiagnosticInput(input: unknown) {
  const data = diagnosticInput.parse(input);
  return { status: data.status, message: diagnosticMessages[data.error] };
}
export async function withAdminAccess<T>(isAdmin: boolean, operation: () => Promise<T>): Promise<T> {
  if (!isAdmin) throw new Error("Acesso restrito a administradores.");
  return operation();
}