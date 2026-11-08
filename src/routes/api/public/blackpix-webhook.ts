import { createFileRoute } from "@tanstack/react-router";
import { receiveBlackPixWebhook } from "@/lib/blackpix-webhook";
import { blackPixAuditSchema } from "@/lib/blackpix-audit";

export const Route = createFileRoute("/api/public/blackpix-webhook")({
  server: {
    handlers: {
      POST: ({ request }) => receiveBlackPixWebhook(request, process.env['BLACKPIX_WEBHOOK_SECRET'], {
        persist: async (record) => {
          const safeRecord = blackPixAuditSchema.parse(record);
          if (safeRecord.signature_status !== "verified") throw new Error("unverified_audit");
          // Called only after the handler has verified the request signature.
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          const { error } = await supabaseAdmin.from("blackpix_webhook_receipts").insert(safeRecord);
          if (error) throw new Error("audit_write_failed");
        },
      }),
    },
  },
});