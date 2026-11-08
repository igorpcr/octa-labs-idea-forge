/** Fail closed until BlackPix's official signature and event contract is verified.
 * Never parse, log, acknowledge, or persist payment events in this preparation stage.
 */
export function receiveBlackPixWebhook(): Response {
  return Response.json(
    { error: "payment_integration_unavailable" },
    { status: 503, headers: { "Cache-Control": "no-store", "Retry-After": "3600" } },
  );
}