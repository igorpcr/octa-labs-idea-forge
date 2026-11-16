import { createClient } from "@supabase/supabase-js";

/**
 * Dedicated server-only BlackPix inbox client.
 * Lovable reserves SUPABASE_* secret names, so allow OCTA_* overrides.
 * Never import this module into browser-facing components.
 */
export function getBlackPixSupabaseAdmin() {
  const url = process.env["OCTA_SUPABASE_URL"] || process.env["SUPABASE_URL"];
  const key = process.env["OCTA_SUPABASE_SECRET_KEY"] || process.env["SUPABASE_SERVICE_ROLE_KEY"];
  if (!url || !key) {
    console.error("[blackpix_webhook] missing_supabase_configuration", {
      urlPresent: Boolean(url),
      secretPresent: Boolean(key),
    });
    throw new Error("BlackPix Supabase server configuration unavailable");
  }
  if (!key.startsWith("sb_secret_") && !key.startsWith("eyJ")) {
    throw new Error("Invalid administrative Supabase key format");
  }
  const customFetch: typeof fetch = (input, init) => {
    const headers = new Headers(init?.headers);
    if (key.startsWith("sb_secret_") && headers.get("Authorization") === `Bearer ${key}`) {
      headers.delete("Authorization");
    }
    headers.set("apikey", key);
    return fetch(input, { ...init, headers });
  };
  return createClient(url, key, {
    global: { fetch: customFetch },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
