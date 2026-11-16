import { createFileRoute } from "@tanstack/react-router";
import { handlePublicPixQuote } from "@/lib/blackpix-public-quote.server";

/** Quote endpoint intentionally cannot create a charge or reserve stock. */
export const Route = createFileRoute("/api/public/blackpix-quote")({
  server: { handlers: { POST: ({ request }) => handlePublicPixQuote(request, process.env["OCTA_TRUSTED_CATALOG_JSON"]) } },
});
