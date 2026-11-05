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
