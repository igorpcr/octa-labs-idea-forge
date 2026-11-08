export function safeAuthDestination(value: unknown): "/" | "/admin/blackpix" {
  return value === "/admin/blackpix" ? "/admin/blackpix" : "/";
}

export function signupNeedsConfirmation(session: unknown) {
  return session == null;
}

export async function clearAndSignOut(cache: { cancelQueries: () => Promise<unknown>; clear: () => void }, signOut: () => Promise<{ error: unknown }>, navigate: () => Promise<unknown>) {
  await cache.cancelQueries();
  cache.clear();
  const { error } = await signOut();
  if (error) throw new Error("Não foi possível sair. Tente novamente.");
  await navigate();
}