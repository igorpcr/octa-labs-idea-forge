# SuperFrete: standard shipping parcel (pre-integration)

Approved merchant defaults:
- Origin CEP: **33239-210** (stored as `33239210`).
- External box dimensions: **20 × 15 × 10 cm**.
- Total packed weight: **1 kg**, including packaging and contents.

Source of truth: `src/lib/superfrete-standard-parcel.server.ts`.

## Safety and release gates
1. The merchant reports that `SUPERFRETE_API_TOKEN` is saved as a Supabase Edge Functions secret. **This PR does not verify the secret or assume it is accessible to the TanStack server.** Never log or expose it.
2. Obtain official documentation and authorization for a custom SuperFrete API integration. Platform-specific integration tokens may not authorize arbitrary API requests. **Do not guess API URLs, request fields, headers, or response prices.**
3. Confirm shipping eligibility for each SKU, including carrier prohibitions and temperature-control requirements. Do not quote restricted/special-handling products automatically.
4. The standard parcel can be used only when the fully packed order actually fits the box and weighs no more than 1 kg. Require manual review otherwise.
5. Build a server-only quote adapter with strict response validation, timeout, anti-abuse controls and no-cache semantics. Revalidate shipping server-side when placing an order; do not trust browser-selected amounts.
6. Verify server-side trusted catalog, correct product IDs, live rates, destination, quote expiry, and final sum before enabling checkout.
7. BlackPix payment creation remains disabled. No payment, shipping label, or external API call is introduced by this PR.

SuperFrete publishes carrier limits at https://ajuda.superfrete.com/artigo/pesos-medidas-e-seguro-maximo-por-modalidade-nos-envios-via-integracao/ . These dimensions do not fit Mini Envios (height and weight limits).
