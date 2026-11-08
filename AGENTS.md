<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Public contact values live in src/lib/octa-contact.ts; pages use this module so approved contact and disclosure rules remain consistent.
- The original institutional page lives at /sobre and reuses the home header, footer and captured theme to preserve OCTA identity without copying external pages.

- All public pages reuse the home header so desktop and mobile tool navigation stays consistent; tool definitions and pure calculations live in src/lib/octa-tools.ts and each tool has its own leaf route.
- Free tools operate on laboratory quantities only; do not add human dosing, U-100 injection guidance, or experimental compound titration schedules.
- The shipping policy lives at /envio and reuses the shared home header, footer and captured theme so existing footer links resolve consistently.
- Checkout presentation uses /carrinho and /finalizar/{entrega,revisao,pagamento}; the root cart provider keeps only a session draft and address in memory, with payment disabled until a separately authorized integration.
- Legacy imported purchase markup is adapted by the root cart click bridge; use explicit product data and API-authoritative prices when implementing real payments, never trust draft totals for billing.
- BlackPix callbacks use /api/public/blackpix-webhook and fail closed without event processing until the official API/signature contract is verified; never infer a contract from similarly named providers.
- BlackPix server calls use the linked custom connector gateway and runtime credentials only; never expose account-wide order queries to shoppers or use browser draft prices for charges.
