import { createFileRoute } from "@tanstack/react-router";
import { receiveBlackPixWebhook } from "@/lib/blackpix-webhook";

export const Route = createFileRoute("/api/public/blackpix-webhook")({
  server: {
    handlers: {
      POST: ({ request }) => receiveBlackPixWebhook(request, process.env.BLACKPIX_WEBHOOK_SECRET),
    },
  },
});