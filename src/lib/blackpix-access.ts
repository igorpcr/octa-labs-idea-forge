export type BlackPixAccess = "loading" | "signed_out" | "denied" | "admin" | "error";

export function accessFailureState(error: unknown): "signed_out" | "error" {
  // Only the authentication middleware's known rejection identifies a bad session.
  // Network, configuration and database failures must never look like a role denial.
  return error instanceof Error && error.message.startsWith("Unauthorized:")
    ? "signed_out"
    : "error";
}

export function checkedAdminRole(result: {
  data: { role: string } | null;
  error: unknown;
}): boolean {
  if (result.error) throw new Error("admin_role_check_unavailable");
  return result.data?.role === "admin";
}