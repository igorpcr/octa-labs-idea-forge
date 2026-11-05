import { createFileRoute } from "@tanstack/react-router";
import { octaContact } from "@/lib/octa-contact";
import { ImportedHeader } from "./index";
import capturedCSS from "../styles/site.css?raw";

export const Route = createFileRoute("/produtos")({
  head: () => ({ meta: [
    { title: "Catálogo de Produtos — OCTA LABS" },
    { name: "description", content: "Explore o catálogo OCTA Labs de reagentes para pesquisa. Consulte disponibilidade e entre em contato com nossa equipe." },
    { property: "og:title", content: "Catálogo de Produtos — OCTA LABS" },
    { property: "og:description", content: "Explore o catálogo OCTA Labs de reagentes para pesquisa. Consulte disponibilidade e entre em contato com nossa equipe." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  staticData: { importedDocument: { html: { "lang": "pt-BR" }, body: { "data-site-import-popup-incomplete": "limit" } } },
  component: Index,
});

function Index() {
  return (
    <>
      <style>{capturedCSS}</style>
      <ImportedHeader />
      <main>
        <section className={"\x62order-b \x62g-card"}>
          <div className="container-x py-14 md:py-20">
            <h1 className="text-4xl font-extrabold text-foreground md:text-5xl">Catálogo de Produtos</h1>
            <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">Use a busca e os filtros para encontrar o produto ideal.</p>
          </div>
        </section>
        <ImportedSection />
      </main>
      <ImportedFooter />
      <div className={"card-surface fixed bottom-4 left-4 right-4 z-40 p-5 \x73hadow-lg sm:left-auto sm:max-w-sm"} role="dialog" aria-label="Preferências de cookies">
        <p className="text-sm font-semibold text-foreground">Usamos cookies</p>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">Utilizamos cookies para melhorar sua experiência. Veja nossa <a className="text-highlight underline" href="/privacidade">Política de Privacidade</a>.</p>
        <div className="mt-4 flex gap-2">
          <button className={"rounded-full \x62g-primary px-4 py-2 text-xs font-semibold text-primary-foreground \x68over:\x62g-primary-deep"}>Aceitar</button>
          <button className={"rounded-full \x62order \x62order-silver px-4 py-2 text-xs font-semibold text-primary \x68over:\x62order-highlight"}>Essenciais</button>
          <button className="px-2 py-2 text-xs font-semibold text-highlight">Opções</button>
        </div>
      </div>
    </>
  );
}


function ImportedSection() {
  return (
    <section className="container-x py-10 md:py-14">
      <div className={"mb-8 flex flex-col gap-4 \x6dd:\x66lex-row \x6dd:\x69tems-center \x6dd:\x6austify-between"}>
        <label className="relative w-full md:max-w-xs">
          <span className={"\x73r-only"}>Buscar produtos</span>
          <svg className={"absolute left-4 top-1/2 h-4 w-4 \x2dtranslate-y-1/\x32 text-muted-foreground"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m21 21-4.34-4.34" />
            <circle cx="11" cy="11" r="8" />
          </svg>
          <input className={"w-full rounded-full \x62order \x62g-card py-3 pl-11 pr-4 text-sm \x6futline-none \x66ocus:\x62order-highlight"} placeholder="Buscar produto..." defaultValue="" />
        </label>
        <div className="flex flex-wrap gap-2">
          <button className={"rounded-full px-4 py-2 text-sm font-medium transition-colors \x62g-primary text-primary-foreground"}>Todos</button>
          <button className={"rounded-full px-4 py-2 text-sm font-medium transition-colors \x62order \x62order-border \x62g-card text-muted-foreground \x68over:\x62order-highlight hover:text-highlight"}>Premium</button>
          <button className={"rounded-full px-4 py-2 text-sm font-medium transition-colors \x62order \x62order-border \x62g-card text-muted-foreground \x68over:\x62order-highlight hover:text-highlight"}>Emagrecimento &amp; Metabolismo</button>
          <button className={"rounded-full px-4 py-2 text-sm font-medium transition-colors \x62order \x62order-border \x62g-card text-muted-foreground \x68over:\x62order-highlight hover:text-highlight"}>Recuperação &amp; Articulações</button>
          <button className={"rounded-full px-4 py-2 text-sm font-medium transition-colors \x62order \x62order-border \x62g-card text-muted-foreground \x68over:\x62order-highlight hover:text-highlight"}>Hormônio do Crescimento</button>
          <button className={"rounded-full px-4 py-2 text-sm font-medium transition-colors \x62order \x62order-border \x62g-card text-muted-foreground \x68over:\x62order-highlight hover:text-highlight"}>Longevidade &amp; Energia</button>
          <button className={"rounded-full px-4 py-2 text-sm font-medium transition-colors \x62order \x62order-border \x62g-card text-muted-foreground \x68over:\x62order-highlight hover:text-highlight"}>Cognição &amp; Bem-estar</button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="/produto/tirzepatida-30mg">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/48b3448146c379a4.jpg" alt="Tirzepatida 30mg" loading="lazy" width="1024" height="1024" />
            <span className="absolute left-3 top-3">
              <span className={"inline-flex items-center gap-1.5 rounded-full \x62g-highlight-soft px-3 py-1 text-xs font-semibold text-highlight"}>Mais vendido</span>
            </span>
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Premium</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">Tirzepatida 30mg</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 617,50 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="/produto/tirzepatida-60mg">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/dffa087024e0e2ab.jpg" alt="Tirzepatida 60mg" loading="lazy" width="1024" height="1024" />
            <span className="absolute left-3 top-3">
              <span className={"inline-flex items-center gap-1.5 rounded-full \x62g-highlight-soft px-3 py-1 text-xs font-semibold text-highlight"}>Premium</span>
            </span>
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Premium</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">Tirzepatida 60mg</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 902,50 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="/produto/retatrutida-30mg">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/1630ccd1a660092e.jpg" alt="Retatrutida 30mg" loading="lazy" width="1024" height="1024" />
            <span className="absolute left-3 top-3">
              <span className={"inline-flex items-center gap-1.5 rounded-full \x62g-highlight-soft px-3 py-1 text-xs font-semibold text-highlight"}>Mais vendido</span>
            </span>
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Premium</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">Retatrutida 30mg</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 1.140,00 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="/produto/retatrutida-60mg">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/68aef4d4818591e5.jpg" alt="Retatrutida 60mg" loading="lazy" width="1024" height="1024" />
            <span className="absolute left-3 top-3">
              <span className={"inline-flex items-center gap-1.5 rounded-full \x62g-highlight-soft px-3 py-1 text-xs font-semibold text-highlight"}>Premium</span>
            </span>
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Premium</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">Retatrutida 60mg</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 1.567,50 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="/produto/cagrilintida-mais-semaglutida-10mg">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/be0b0a11fa13e0e4.jpg" alt="Cagrilintida + Semaglutida 10mg" loading="lazy" width="1024" height="1024" />
            <span className="absolute left-3 top-3">
              <span className={"inline-flex items-center gap-1.5 rounded-full \x62g-highlight-soft px-3 py-1 text-xs font-semibold text-highlight"}>Premium</span>
            </span>
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Premium</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">Cagrilintida + Semaglutida 10mg</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 570,00 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="/produto/cagrilintida-mais-semaglutida-20mg">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/0271320bfe5e08e7.jpg" alt="Cagrilintida + Semaglutida 20mg" loading="lazy" width="1024" height="1024" />
            <span className="absolute left-3 top-3">
              <span className={"inline-flex items-center gap-1.5 rounded-full \x62g-highlight-soft px-3 py-1 text-xs font-semibold text-highlight"}>Premium</span>
            </span>
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Premium</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">Cagrilintida + Semaglutida 20mg</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 902,50 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="/produto/aod-9604-5mg">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/a6febb19d538b181.jpg" alt="AOD 9604 5mg" loading="lazy" width="1024" height="1024" />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Emagrecimento &amp; Metabolismo</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">AOD 9604 5mg</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 216,60 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="/produto/aod-9604-10mg">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/a252cd0153f026c6.jpg" alt="AOD 9604 10mg" loading="lazy" width="1024" height="1024" />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Emagrecimento &amp; Metabolismo</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">AOD 9604 10mg</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 345,80 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="https://wa.me/5511943181553?text=Ol%C3%A1%21%20Quero%20fazer%20um%20pedido%20de%20Adipotide%202mg." target="_blank" rel="noreferrer" aria-label="Pedir Adipotide 2mg pelo WhatsApp">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/22d75cfa4f5849d2.jpg" alt="Adipotide 2mg" loading="lazy" width="1024" height="1024" />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Emagrecimento &amp; Metabolismo</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">Adipotide 2mg</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 114,00 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="https://wa.me/5511943181553?text=Ol%C3%A1%21%20Quero%20fazer%20um%20pedido%20de%20AICAR%2050mg." target="_blank" rel="noreferrer" aria-label="Pedir AICAR 50mg pelo WhatsApp">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/11095b27b40c984f.jpg" alt="AICAR 50mg" loading="lazy" width="1024" height="1024" />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Emagrecimento &amp; Metabolismo</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">AICAR 50mg</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 95,00 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="https://wa.me/5511943181553?text=Ol%C3%A1%21%20Quero%20fazer%20um%20pedido%20de%20SLU-PP-332%205mg." target="_blank" rel="noreferrer" aria-label="Pedir SLU-PP-332 5mg pelo WhatsApp">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/e27bcfa8cea73f2c.jpg" alt="SLU-PP-332 5mg" loading="lazy" width="1024" height="1024" />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Emagrecimento &amp; Metabolismo</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">SLU-PP-332 5mg</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 94,05 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="https://wa.me/5511943181553?text=Ol%C3%A1%21%20Quero%20fazer%20um%20pedido%20de%20SLU-PP-332%2010mg." target="_blank" rel="noreferrer" aria-label="Pedir SLU-PP-332 10mg pelo WhatsApp">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/b2df7946bdafeef9.jpg" alt="SLU-PP-332 10mg" loading="lazy" width="1024" height="1024" />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Emagrecimento &amp; Metabolismo</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">SLU-PP-332 10mg</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 193,80 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="https://wa.me/5511943181553?text=Ol%C3%A1%21%20Quero%20fazer%20um%20pedido%20de%205-Amino-1MQ%205mg." target="_blank" rel="noreferrer" aria-label="Pedir 5-Amino-1MQ 5mg pelo WhatsApp">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/7668234eb8100f43.jpg" alt="5-Amino-1MQ 5mg" loading="lazy" width="1024" height="1024" />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Emagrecimento &amp; Metabolismo</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">5-Amino-1MQ 5mg</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 161,50 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="https://wa.me/5511943181553?text=Ol%C3%A1%21%20Quero%20fazer%20um%20pedido%20de%205-Amino-1MQ%2010mg." target="_blank" rel="noreferrer" aria-label="Pedir 5-Amino-1MQ 10mg pelo WhatsApp">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/d4b9bda402a2f558.jpg" alt="5-Amino-1MQ 10mg" loading="lazy" width="1024" height="1024" />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Emagrecimento &amp; Metabolismo</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">5-Amino-1MQ 10mg</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 85,50 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="https://wa.me/5511943181553?text=Ol%C3%A1%21%20Quero%20fazer%20um%20pedido%20de%20HGH%20Frag%20176-191%201mg." target="_blank" rel="noreferrer" aria-label="Pedir HGH Frag 176-191 1mg pelo WhatsApp">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/456fc7fec1c5fd6c.jpg" alt="HGH Frag 176-191 1mg" loading="lazy" width="1024" height="1024" />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Emagrecimento &amp; Metabolismo</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">HGH Frag 176-191 1mg</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 105,45 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="https://wa.me/5511943181553?text=Ol%C3%A1%21%20Quero%20fazer%20um%20pedido%20de%20HGH%20Frag%20176-191%202mg." target="_blank" rel="noreferrer" aria-label="Pedir HGH Frag 176-191 2mg pelo WhatsApp">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/0f1c6bc449d2cbdc.jpg" alt="HGH Frag 176-191 2mg" loading="lazy" width="1024" height="1024" />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Emagrecimento &amp; Metabolismo</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">HGH Frag 176-191 2mg</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 139,65 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="https://wa.me/5511943181553?text=Ol%C3%A1%21%20Quero%20fazer%20um%20pedido%20de%20HGH%20Frag%20176-191%205mg." target="_blank" rel="noreferrer" aria-label="Pedir HGH Frag 176-191 5mg pelo WhatsApp">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/41f74e6af43024c5.jpg" alt="HGH Frag 176-191 5mg" loading="lazy" width="1024" height="1024" />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Emagrecimento &amp; Metabolismo</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">HGH Frag 176-191 5mg</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 244,15 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="https://wa.me/5511943181553?text=Ol%C3%A1%21%20Quero%20fazer%20um%20pedido%20de%20HGH%20Frag%20176-191%2010mg." target="_blank" rel="noreferrer" aria-label="Pedir HGH Frag 176-191 10mg pelo WhatsApp">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/c8482ce054ec9a12.jpg" alt="HGH Frag 176-191 10mg" loading="lazy" width="1024" height="1024" />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Emagrecimento &amp; Metabolismo</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">HGH Frag 176-191 10mg</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 319,20 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="https://wa.me/5511943181553?text=Ol%C3%A1%21%20Quero%20fazer%20um%20pedido%20de%20HGH%20Frag%20176-191%2012mg." target="_blank" rel="noreferrer" aria-label="Pedir HGH Frag 176-191 12mg pelo WhatsApp">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/0007da0d43b5e0ef.jpg" alt="HGH Frag 176-191 12mg" loading="lazy" width="1024" height="1024" />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Emagrecimento &amp; Metabolismo</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">HGH Frag 176-191 12mg</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 380,00 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="https://wa.me/5511943181553?text=Ol%C3%A1%21%20Quero%20fazer%20um%20pedido%20de%20HGH%20Frag%20176-191%2015mg." target="_blank" rel="noreferrer" aria-label="Pedir HGH Frag 176-191 15mg pelo WhatsApp">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/df7e584fb1568717.jpg" alt="HGH Frag 176-191 15mg" loading="lazy" width="1024" height="1024" />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Emagrecimento &amp; Metabolismo</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">HGH Frag 176-191 15mg</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 440,80 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="https://wa.me/5511943181553?text=Ol%C3%A1%21%20Quero%20fazer%20um%20pedido%20de%20BPC-157%205mg." target="_blank" rel="noreferrer" aria-label="Pedir BPC-157 5mg pelo WhatsApp">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/9d47657d7013f12b.jpg" alt="BPC-157 5mg" loading="lazy" width="1024" height="1024" />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Recuperação &amp; Articulações</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">BPC-157 5mg</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 108,30 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="https://wa.me/5511943181553?text=Ol%C3%A1%21%20Quero%20fazer%20um%20pedido%20de%20BPC-157%2010mg." target="_blank" rel="noreferrer" aria-label="Pedir BPC-157 10mg pelo WhatsApp">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/8d168023382a6b9e.jpg" alt="BPC-157 10mg" loading="lazy" width="1024" height="1024" />
            <span className="absolute left-3 top-3">
              <span className={"inline-flex items-center gap-1.5 rounded-full \x62g-highlight-soft px-3 py-1 text-xs font-semibold text-highlight"}>Mais vendido</span>
            </span>
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Recuperação &amp; Articulações</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">BPC-157 10mg</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 168,15 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="https://wa.me/5511943181553?text=Ol%C3%A1%21%20Quero%20fazer%20um%20pedido%20de%20BPC-157%2020mg." target="_blank" rel="noreferrer" aria-label="Pedir BPC-157 20mg pelo WhatsApp">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/8a91833345236eb5.jpg" alt="BPC-157 20mg" loading="lazy" width="1024" height="1024" />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Recuperação &amp; Articulações</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">BPC-157 20mg</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 267,90 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="https://wa.me/5511943181553?text=Ol%C3%A1%21%20Quero%20fazer%20um%20pedido%20de%20TB-500%205mg." target="_blank" rel="noreferrer" aria-label="Pedir TB-500 5mg pelo WhatsApp">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/5452600e947e9a3c.jpg" alt="TB-500 5mg" loading="lazy" width="1024" height="1024" />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Recuperação &amp; Articulações</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">TB-500 5mg</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 185,25 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="https://wa.me/5511943181553?text=Ol%C3%A1%21%20Quero%20fazer%20um%20pedido%20de%20TB-500%2010mg." target="_blank" rel="noreferrer" aria-label="Pedir TB-500 10mg pelo WhatsApp">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/7dd0d67ffffcd0fa.jpg" alt="TB-500 10mg" loading="lazy" width="1024" height="1024" />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Recuperação &amp; Articulações</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">TB-500 10mg</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 280,25 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="https://wa.me/5511943181553?text=Ol%C3%A1%21%20Quero%20fazer%20um%20pedido%20de%20TB-500%20%2B%20BPC-157%2010mg." target="_blank" rel="noreferrer" aria-label="Pedir TB-500 + BPC-157 10mg pelo WhatsApp">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/0d00e3f51df5157d.jpg" alt="TB-500 + BPC-157 10mg" loading="lazy" width="1024" height="1024" />
            <span className="absolute left-3 top-3">
              <span className={"inline-flex items-center gap-1.5 rounded-full \x62g-highlight-soft px-3 py-1 text-xs font-semibold text-highlight"}>Mais vendido</span>
            </span>
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Recuperação &amp; Articulações</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">TB-500 + BPC-157 10mg</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 327,75 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="https://wa.me/5511943181553?text=Ol%C3%A1%21%20Quero%20fazer%20um%20pedido%20de%20KPV%2010mg." target="_blank" rel="noreferrer" aria-label="Pedir KPV 10mg pelo WhatsApp">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/6088525f8c3f0b2d.jpg" alt="KPV 10mg" loading="lazy" width="1024" height="1024" />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Recuperação &amp; Articulações</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">KPV 10mg</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 142,50 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="https://wa.me/5511943181553?text=Ol%C3%A1%21%20Quero%20fazer%20um%20pedido%20de%20KLOW%2080mg." target="_blank" rel="noreferrer" aria-label="Pedir KLOW 80mg pelo WhatsApp">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/56495ed255cae660.jpg" alt="KLOW 80mg" loading="lazy" width="1024" height="1024" />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Recuperação &amp; Articulações</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">KLOW 80mg</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 332,50 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="https://wa.me/5511943181553?text=Ol%C3%A1%21%20Quero%20fazer%20um%20pedido%20de%20PEG-MGF%202mg." target="_blank" rel="noreferrer" aria-label="Pedir PEG-MGF 2mg pelo WhatsApp">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/803b61fb95aa5537.jpg" alt="PEG-MGF 2mg" loading="lazy" width="1024" height="1024" />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Recuperação &amp; Articulações</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">PEG-MGF 2mg</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 171,00 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="https://wa.me/5511943181553?text=Ol%C3%A1%21%20Quero%20fazer%20um%20pedido%20de%20ACE-031%2010mg." target="_blank" rel="noreferrer" aria-label="Pedir ACE-031 10mg pelo WhatsApp">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/83d375bba98a716d.jpg" alt="ACE-031 10mg" loading="lazy" width="1024" height="1024" />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Recuperação &amp; Articulações</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">ACE-031 10mg</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 104,50 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="https://wa.me/5511943181553?text=Ol%C3%A1%21%20Quero%20fazer%20um%20pedido%20de%20VIP%205mg." target="_blank" rel="noreferrer" aria-label="Pedir VIP 5mg pelo WhatsApp">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/1e49db4e3418f9a0.jpg" alt="VIP 5mg" loading="lazy" width="1024" height="1024" />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Recuperação &amp; Articulações</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">VIP 5mg</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 128,25 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="https://wa.me/5511943181553?text=Ol%C3%A1%21%20Quero%20fazer%20um%20pedido%20de%20CJC-1295%20sem%20DAC%205mg." target="_blank" rel="noreferrer" aria-label="Pedir CJC-1295 sem DAC 5mg pelo WhatsApp">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/7fca8cb2fbd6e0db.jpg" alt="CJC-1295 sem DAC 5mg" loading="lazy" width="1024" height="1024" />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Hormônio do Crescimento</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">CJC-1295 sem DAC 5mg</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 193,80 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="https://wa.me/5511943181553?text=Ol%C3%A1%21%20Quero%20fazer%20um%20pedido%20de%20CJC-1295%20sem%20DAC%2010mg." target="_blank" rel="noreferrer" aria-label="Pedir CJC-1295 sem DAC 10mg pelo WhatsApp">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/6d378e0994a5d26a.jpg" alt="CJC-1295 sem DAC 10mg" loading="lazy" width="1024" height="1024" />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Hormônio do Crescimento</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">CJC-1295 sem DAC 10mg</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 291,65 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="https://wa.me/5511943181553?text=Ol%C3%A1%21%20Quero%20fazer%20um%20pedido%20de%20CJC-1295%20sem%20DAC%205mg%20%2B%20Ipamorelin%205mg." target="_blank" rel="noreferrer" aria-label="Pedir CJC-1295 sem DAC 5mg + Ipamorelin 5mg pelo WhatsApp">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/e2dd5f107f4b8f5d.jpg" alt="CJC-1295 sem DAC 5mg + Ipamorelin 5mg" loading="lazy" width="1024" height="1024" />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Hormônio do Crescimento</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">CJC-1295 sem DAC 5mg + Ipamorelin 5mg</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 285,00 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="https://wa.me/5511943181553?text=Ol%C3%A1%21%20Quero%20fazer%20um%20pedido%20de%20Ipamorelin%205mg." target="_blank" rel="noreferrer" aria-label="Pedir Ipamorelin 5mg pelo WhatsApp">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/bee834c2cc442e4c.jpg" alt="Ipamorelin 5mg" loading="lazy" width="1024" height="1024" />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Hormônio do Crescimento</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">Ipamorelin 5mg</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 91,20 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="https://wa.me/5511943181553?text=Ol%C3%A1%21%20Quero%20fazer%20um%20pedido%20de%20Ipamorelin%2010mg." target="_blank" rel="noreferrer" aria-label="Pedir Ipamorelin 10mg pelo WhatsApp">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/45e563f3630a07c7.jpg" alt="Ipamorelin 10mg" loading="lazy" width="1024" height="1024" />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Hormônio do Crescimento</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">Ipamorelin 10mg</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 151,05 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="https://wa.me/5511943181553?text=Ol%C3%A1%21%20Quero%20fazer%20um%20pedido%20de%20GHRP-6%205mg." target="_blank" rel="noreferrer" aria-label="Pedir GHRP-6 5mg pelo WhatsApp">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/61201b989e2be8c5.jpg" alt="GHRP-6 5mg" loading="lazy" width="1024" height="1024" />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Hormônio do Crescimento</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">GHRP-6 5mg</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 108,30 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="https://wa.me/5511943181553?text=Ol%C3%A1%21%20Quero%20fazer%20um%20pedido%20de%20GHRP-6%2010mg." target="_blank" rel="noreferrer" aria-label="Pedir GHRP-6 10mg pelo WhatsApp">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/567abcd4941df34a.jpg" alt="GHRP-6 10mg" loading="lazy" width="1024" height="1024" />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Hormônio do Crescimento</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">GHRP-6 10mg</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 118,75 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="https://wa.me/5511943181553?text=Ol%C3%A1%21%20Quero%20fazer%20um%20pedido%20de%20Tesamorelin%205mg." target="_blank" rel="noreferrer" aria-label="Pedir Tesamorelin 5mg pelo WhatsApp">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/226875243f688dc9.jpg" alt="Tesamorelin 5mg" loading="lazy" width="1024" height="1024" />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Hormônio do Crescimento</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">Tesamorelin 5mg</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 210,90 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="https://wa.me/5511943181553?text=Ol%C3%A1%21%20Quero%20fazer%20um%20pedido%20de%20Tesamorelin%2010mg." target="_blank" rel="noreferrer" aria-label="Pedir Tesamorelin 10mg pelo WhatsApp">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/da2ac09d5b62546f.jpg" alt="Tesamorelin 10mg" loading="lazy" width="1024" height="1024" />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Hormônio do Crescimento</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">Tesamorelin 10mg</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 376,20 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="https://wa.me/5511943181553?text=Ol%C3%A1%21%20Quero%20fazer%20um%20pedido%20de%20Tesamorelin%2015mg." target="_blank" rel="noreferrer" aria-label="Pedir Tesamorelin 15mg pelo WhatsApp">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/4b08d92931b89892.jpg" alt="Tesamorelin 15mg" loading="lazy" width="1024" height="1024" />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Hormônio do Crescimento</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">Tesamorelin 15mg</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 430,35 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="https://wa.me/5511943181553?text=Ol%C3%A1%21%20Quero%20fazer%20um%20pedido%20de%20Sermorelin%205mg." target="_blank" rel="noreferrer" aria-label="Pedir Sermorelin 5mg pelo WhatsApp">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/31f2f286d8e96a27.jpg" alt="Sermorelin 5mg" loading="lazy" width="1024" height="1024" />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Hormônio do Crescimento</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">Sermorelin 5mg</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 128,25 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="https://wa.me/5511943181553?text=Ol%C3%A1%21%20Quero%20fazer%20um%20pedido%20de%20IGF-1%20LR3%200%2C1mg." target="_blank" rel="noreferrer" aria-label="Pedir IGF-1 LR3 0,1mg pelo WhatsApp">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/26848909357c6639.jpg" alt="IGF-1 LR3 0,1mg" loading="lazy" width="1024" height="1024" />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Hormônio do Crescimento</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">IGF-1 LR3 0,1mg</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 99,75 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="https://wa.me/5511943181553?text=Ol%C3%A1%21%20Quero%20fazer%20um%20pedido%20de%20IGF-1%20LR3%201mg." target="_blank" rel="noreferrer" aria-label="Pedir IGF-1 LR3 1mg pelo WhatsApp">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/7c55805b3c7a4107.jpg" alt="IGF-1 LR3 1mg" loading="lazy" width="1024" height="1024" />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Hormônio do Crescimento</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">IGF-1 LR3 1mg</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 391,40 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="https://wa.me/5511943181553?text=Ol%C3%A1%21%20Quero%20fazer%20um%20pedido%20de%20HGH%20191AA%2010UI." target="_blank" rel="noreferrer" aria-label="Pedir HGH 191AA 10UI pelo WhatsApp">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/6cb6f6373d6cab38.jpg" alt="HGH 191AA 10UI" loading="lazy" width="1024" height="1024" />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Hormônio do Crescimento</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">HGH 191AA 10UI</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 104,50 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="https://wa.me/5511943181553?text=Ol%C3%A1%21%20Quero%20fazer%20um%20pedido%20de%20HGH%20191AA%2012UI." target="_blank" rel="noreferrer" aria-label="Pedir HGH 191AA 12UI pelo WhatsApp">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/85f61ccd209836fd.jpg" alt="HGH 191AA 12UI" loading="lazy" width="1024" height="1024" />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Hormônio do Crescimento</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">HGH 191AA 12UI</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 123,50 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="https://wa.me/5511943181553?text=Ol%C3%A1%21%20Quero%20fazer%20um%20pedido%20de%20HGH%20191AA%2015UI." target="_blank" rel="noreferrer" aria-label="Pedir HGH 191AA 15UI pelo WhatsApp">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/5e3b47527260ca56.jpg" alt="HGH 191AA 15UI" loading="lazy" width="1024" height="1024" />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Hormônio do Crescimento</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">HGH 191AA 15UI</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 142,50 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="https://wa.me/5511943181553?text=Ol%C3%A1%21%20Quero%20fazer%20um%20pedido%20de%20HGH%20191AA%2024UI." target="_blank" rel="noreferrer" aria-label="Pedir HGH 191AA 24UI pelo WhatsApp">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/c6a7162d7b04558f.jpg" alt="HGH 191AA 24UI" loading="lazy" width="1024" height="1024" />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Hormônio do Crescimento</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">HGH 191AA 24UI</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 161,50 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="https://wa.me/5511943181553?text=Ol%C3%A1%21%20Quero%20fazer%20um%20pedido%20de%20HGH%20191AA%2036UI." target="_blank" rel="noreferrer" aria-label="Pedir HGH 191AA 36UI pelo WhatsApp">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/f4956a9b2b31537b.jpg" alt="HGH 191AA 36UI" loading="lazy" width="1024" height="1024" />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Hormônio do Crescimento</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">HGH 191AA 36UI</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 199,50 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="https://wa.me/5511943181553?text=Ol%C3%A1%21%20Quero%20fazer%20um%20pedido%20de%20HCG%205000UI." target="_blank" rel="noreferrer" aria-label="Pedir HCG 5000UI pelo WhatsApp">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/052664be300c9a46.jpg" alt="HCG 5000UI" loading="lazy" width="1024" height="1024" />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Hormônio do Crescimento</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">HCG 5000UI</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 161,50 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="https://wa.me/5511943181553?text=Ol%C3%A1%21%20Quero%20fazer%20um%20pedido%20de%20Kisspeptin%2010mg." target="_blank" rel="noreferrer" aria-label="Pedir Kisspeptin 10mg pelo WhatsApp">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/358e46c935a93f4a.jpg" alt="Kisspeptin 10mg" loading="lazy" width="1024" height="1024" />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Hormônio do Crescimento</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">Kisspeptin 10mg</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 142,50 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="https://wa.me/5511943181553?text=Ol%C3%A1%21%20Quero%20fazer%20um%20pedido%20de%20Epithalon%2010mg." target="_blank" rel="noreferrer" aria-label="Pedir Epithalon 10mg pelo WhatsApp">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/b0b924cb97272be3.jpg" alt="Epithalon 10mg" loading="lazy" width="1024" height="1024" />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Longevidade &amp; Energia</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">Epithalon 10mg</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 76,00 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="https://wa.me/5511943181553?text=Ol%C3%A1%21%20Quero%20fazer%20um%20pedido%20de%20Epithalon%2050mg." target="_blank" rel="noreferrer" aria-label="Pedir Epithalon 50mg pelo WhatsApp">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/a16e79ddc03c8717.jpg" alt="Epithalon 50mg" loading="lazy" width="1024" height="1024" />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Longevidade &amp; Energia</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">Epithalon 50mg</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 233,70 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="https://wa.me/5511943181553?text=Ol%C3%A1%21%20Quero%20fazer%20um%20pedido%20de%20Epithalon%20100mg." target="_blank" rel="noreferrer" aria-label="Pedir Epithalon 100mg pelo WhatsApp">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/b1985aa503ea53f1.jpg" alt="Epithalon 100mg" loading="lazy" width="1024" height="1024" />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Longevidade &amp; Energia</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">Epithalon 100mg</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 384,75 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="https://wa.me/5511943181553?text=Ol%C3%A1%21%20Quero%20fazer%20um%20pedido%20de%20MOTS-C%2010mg." target="_blank" rel="noreferrer" aria-label="Pedir MOTS-C 10mg pelo WhatsApp">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/ab5e95c047591724.jpg" alt="MOTS-C 10mg" loading="lazy" width="1024" height="1024" />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Longevidade &amp; Energia</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">MOTS-C 10mg</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 142,50 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="https://wa.me/5511943181553?text=Ol%C3%A1%21%20Quero%20fazer%20um%20pedido%20de%20MOTS-C%2020mg." target="_blank" rel="noreferrer" aria-label="Pedir MOTS-C 20mg pelo WhatsApp">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/5c292f6e791fd0b2.jpg" alt="MOTS-C 20mg" loading="lazy" width="1024" height="1024" />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Longevidade &amp; Energia</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">MOTS-C 20mg</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 259,35 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="https://wa.me/5511943181553?text=Ol%C3%A1%21%20Quero%20fazer%20um%20pedido%20de%20MOTS-C%2040mg." target="_blank" rel="noreferrer" aria-label="Pedir MOTS-C 40mg pelo WhatsApp">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/8ffa76a1e6d85c52.jpg" alt="MOTS-C 40mg" loading="lazy" width="1024" height="1024" />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Longevidade &amp; Energia</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">MOTS-C 40mg</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 334,40 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="https://wa.me/5511943181553?text=Ol%C3%A1%21%20Quero%20fazer%20um%20pedido%20de%20SS-31%2010mg." target="_blank" rel="noreferrer" aria-label="Pedir SS-31 10mg pelo WhatsApp">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/ba0e7f3ea03a59c4.jpg" alt="SS-31 10mg" loading="lazy" width="1024" height="1024" />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Longevidade &amp; Energia</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">SS-31 10mg</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 222,30 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="https://wa.me/5511943181553?text=Ol%C3%A1%21%20Quero%20fazer%20um%20pedido%20de%20SS-31%2050mg." target="_blank" rel="noreferrer" aria-label="Pedir SS-31 50mg pelo WhatsApp">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/29867e81dd539a77.jpg" alt="SS-31 50mg" loading="lazy" width="1024" height="1024" />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Longevidade &amp; Energia</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">SS-31 50mg</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 465,50 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="https://wa.me/5511943181553?text=Ol%C3%A1%21%20Quero%20fazer%20um%20pedido%20de%20NAD%2B%20100mg." target="_blank" rel="noreferrer" aria-label="Pedir NAD+ 100mg pelo WhatsApp">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/0901e7c3f5df2766.jpg" alt="NAD+ 100mg" loading="lazy" width="1024" height="1024" />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Longevidade &amp; Energia</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">NAD+ 100mg</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 71,25 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="https://wa.me/5511943181553?text=Ol%C3%A1%21%20Quero%20fazer%20um%20pedido%20de%20NAD%2B%20500mg." target="_blank" rel="noreferrer" aria-label="Pedir NAD+ 500mg pelo WhatsApp">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/fb309de4d0c21392.jpg" alt="NAD+ 500mg" loading="lazy" width="1024" height="1024" />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Longevidade &amp; Energia</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">NAD+ 500mg</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 91,20 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="https://wa.me/5511943181553?text=Ol%C3%A1%21%20Quero%20fazer%20um%20pedido%20de%20NAD%2B%201000mg." target="_blank" rel="noreferrer" aria-label="Pedir NAD+ 1000mg pelo WhatsApp">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/7d5040c10452abcf.jpg" alt="NAD+ 1000mg" loading="lazy" width="1024" height="1024" />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Longevidade &amp; Energia</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">NAD+ 1000mg</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 116,85 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="https://wa.me/5511943181553?text=Ol%C3%A1%21%20Quero%20fazer%20um%20pedido%20de%20Cardiogen%2020mg." target="_blank" rel="noreferrer" aria-label="Pedir Cardiogen 20mg pelo WhatsApp">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/39e49dd11b406fd7.jpg" alt="Cardiogen 20mg" loading="lazy" width="1024" height="1024" />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Longevidade &amp; Energia</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">Cardiogen 20mg</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 147,25 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="https://wa.me/5511943181553?text=Ol%C3%A1%21%20Quero%20fazer%20um%20pedido%20de%20Cortagen%2020mg." target="_blank" rel="noreferrer" aria-label="Pedir Cortagen 20mg pelo WhatsApp">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/cb69aed0d93a1a83.jpg" alt="Cortagen 20mg" loading="lazy" width="1024" height="1024" />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Longevidade &amp; Energia</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">Cortagen 20mg</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 147,25 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="https://wa.me/5511943181553?text=Ol%C3%A1%21%20Quero%20fazer%20um%20pedido%20de%20Matrixyl%2030mg." target="_blank" rel="noreferrer" aria-label="Pedir Matrixyl 30mg pelo WhatsApp">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/f13b2a1320725887.jpg" alt="Matrixyl 30mg" loading="lazy" width="1024" height="1024" />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Longevidade &amp; Energia</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">Matrixyl 30mg</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 66,50 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="https://wa.me/5511943181553?text=Ol%C3%A1%21%20Quero%20fazer%20um%20pedido%20de%20Selank%2010mg." target="_blank" rel="noreferrer" aria-label="Pedir Selank 10mg pelo WhatsApp">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/a72a5748d733d54d.jpg" alt="Selank 10mg" loading="lazy" width="1024" height="1024" />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Cognição &amp; Bem-estar</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">Selank 10mg</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 114,00 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="https://wa.me/5511943181553?text=Ol%C3%A1%21%20Quero%20fazer%20um%20pedido%20de%20Semax%2010mg." target="_blank" rel="noreferrer" aria-label="Pedir Semax 10mg pelo WhatsApp">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/9d48f7959af31cc9.jpg" alt="Semax 10mg" loading="lazy" width="1024" height="1024" />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Cognição &amp; Bem-estar</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">Semax 10mg</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 114,00 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="https://wa.me/5511943181553?text=Ol%C3%A1%21%20Quero%20fazer%20um%20pedido%20de%20Semax%20%2B%20Selank%2020mg." target="_blank" rel="noreferrer" aria-label="Pedir Semax + Selank 20mg pelo WhatsApp">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/0808aa9a63c8f318.jpg" alt="Semax + Selank 20mg" loading="lazy" width="1024" height="1024" />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Cognição &amp; Bem-estar</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">Semax + Selank 20mg</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 152,00 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="https://wa.me/5511943181553?text=Ol%C3%A1%21%20Quero%20fazer%20um%20pedido%20de%20Adamax%205mg." target="_blank" rel="noreferrer" aria-label="Pedir Adamax 5mg pelo WhatsApp">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/6cad19084f4dc120.jpg" alt="Adamax 5mg" loading="lazy" width="1024" height="1024" />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Cognição &amp; Bem-estar</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">Adamax 5mg</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 114,00 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="https://wa.me/5511943181553?text=Ol%C3%A1%21%20Quero%20fazer%20um%20pedido%20de%20Cerebrolysin%2060mg." target="_blank" rel="noreferrer" aria-label="Pedir Cerebrolysin 60mg pelo WhatsApp">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/b6856b5ec91d5c81.jpg" alt="Cerebrolysin 60mg" loading="lazy" width="1024" height="1024" />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Cognição &amp; Bem-estar</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">Cerebrolysin 60mg</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 190,00 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="https://wa.me/5511943181553?text=Ol%C3%A1%21%20Quero%20fazer%20um%20pedido%20de%20DSIP%202mg." target="_blank" rel="noreferrer" aria-label="Pedir DSIP 2mg pelo WhatsApp">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/697ee0f7d3698b46.jpg" alt="DSIP 2mg" loading="lazy" width="1024" height="1024" />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Cognição &amp; Bem-estar</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">DSIP 2mg</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 76,00 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="https://wa.me/5511943181553?text=Ol%C3%A1%21%20Quero%20fazer%20um%20pedido%20de%20PE-22-28%205mg." target="_blank" rel="noreferrer" aria-label="Pedir PE-22-28 5mg pelo WhatsApp">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/86a6b5eeb56b3ade.jpg" alt="PE-22-28 5mg" loading="lazy" width="1024" height="1024" />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Cognição &amp; Bem-estar</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">PE-22-28 5mg</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 95,00 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className="group card-surface card-hover flex flex-col overflow-hidden" href="https://wa.me/5511943181553?text=Ol%C3%A1%21%20Quero%20fazer%20um%20pedido%20de%20PT-141%2010mg." target="_blank" rel="noreferrer" aria-label="Pedir PT-141 10mg pelo WhatsApp">
          <div className="relative aspect-square product-bg">
            <img className={"h-full w-full object-cover transition-transform duration-500 \x67roup-hover:\x73cale-[\x31.\x303]"} src="/site-assets/698feb59250ba120.jpg" alt="PT-141 10mg" loading="lazy" width="1024" height="1024" />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-muted-foreground">Cognição &amp; Bem-estar</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">PT-141 10mg</h3>
            <p className="mt-2 font-display text-lg font-bold text-primary">R$ 114,00 <span className="text-xs font-medium text-muted-foreground">no PIX</span></p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-highlight">Comprar <svg className={"h-4 w-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
      </div>
    </section>
  );
}

function ImportedFooter() {
  return (
    <footer className={"\x62g-primary-deep text-silver"}>
      <div className="container-x grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <a className="flex items-center gap-2.5" aria-label="OCTA LABS — início" href="/">
            <span className={"grid h-10 w-10 place-items-center rounded-xl \x62g-silver/\x390"}>
              <img className="h-9 w-9 object-contain" src="/site-assets/652a01c8780ff967.png" alt="" width="40" height="40" />
            </span>
            <span className="leading-none">
              <span className="block font-display text-[19px] font-extrabold tracking-[0.06em] text-primary-foreground">OCTA</span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.42em] text-silver">Labs</span>
            </span>
          </a>
          <p className="mt-5 max-w-xs text-sm leading-relaxed">Texto institucional de exemplo sobre a marca. Descreva aqui a missão, o compromisso com qualidade e o público atendido.</p>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold text-primary-foreground">Empresa</h3>
          <ul className={"\x73pace-y-2.\x35 text-sm"}>
            <li>
              <a className="transition-colors hover:text-primary-foreground" href="/sobre">Sobre nós</a>
            </li>
            <li>
              <a className="transition-colors hover:text-primary-foreground" aria-current="page" href="#">Catálogo</a>
            </li>
            <li>
              <a className="transition-colors hover:text-primary-foreground" href="/contato">Contato</a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold text-primary-foreground">Suporte</h3>
          <ul className={"\x73pace-y-2.\x35 text-sm"}>
            <li>
              <a className="transition-colors hover:text-primary-foreground" href="/faq">FAQ</a>
            </li>
            <li>
              <a className="transition-colors hover:text-primary-foreground" href="/envio">Política de Envio</a>
            </li>
            <li>
              <a className="transition-colors hover:text-primary-foreground" href="/contato">Suporte Técnico</a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold text-primary-foreground">Legal</h3>
          <ul className={"\x73pace-y-2.\x35 text-sm"}>
            <li>
              <a className="transition-colors hover:text-primary-foreground" href="/termos">Termos de Uso</a>
            </li>
            <li>
              <a className="transition-colors hover:text-primary-foreground" href="/privacidade">Privacidade</a>
            </li>
            <li>
              <a className="transition-colors hover:text-primary-foreground" href="/envio">Trocas e Envio</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container-x">
        <div className={"grid gap-2 \x62order-t \x62order-primary-foreground/\x310 py-6 text-xs sm:grid-cols-3"}>
          <p className={"\x73m:\x74ext-right"}>{octaContact.email}</p>
        </div>
        <p className={"\x62order-t \x62order-primary-foreground/\x310 py-6 text-xs"}>© 2026 OCTA LABS. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}

function ImportedAsideEditWithLovable() {
  return (
    <aside className="[will-change:transform,opacity]" id="lovable-badge" role="complementary" dir="ltr" lang="en" aria-label="Edit with Lovable"><a aria-label="Edit with Lovable" href="https://lovable.dev/projects/lovp_7m4a47c45b8k6taj1v9h68pgft?utm_source=lovable-badge" id="lovable-badge-cta" rel="noopener nofollow" target="_blank">{"\n\t\t"}<span id="lovable-badge-text">Edit with</span>{"\n\t\t"}<span id="lovable-badge-logo"><svg xmlns="http://www.w3.org/2000/svg" width="52" height="16" fill="none" viewBox="0 0 52 16">{"\n  "}<path fill="#FCFBF8" fillRule="evenodd" d="M20.318 5.25c.643 0 1.206.14 1.69.418a2.81 2.81 0 0 1 1.118 1.191c.266.513.4 1.115.4 1.807s-.134 1.296-.4 1.812a2.81 2.81 0 0 1-1.118 1.193c-.484.278-1.047.418-1.69.418s-1.208-.14-1.695-.418a2.85 2.85 0 0 1-1.125-1.193c-.262-.516-.393-1.12-.393-1.812s.131-1.294.393-1.807a2.848 2.848 0 0 1 1.125-1.191c.487-.279 1.052-.418 1.695-.418Zm0 1.425c-.27 0-.504.076-.7.228-.193.147-.34.37-.443.67-.102.295-.153.66-.153 1.093 0 .435.05.801.153 1.1.102.3.25.524.443.676.196.147.43.22.7.22.27 0 .502-.073.694-.22.193-.152.341-.375.443-.67.103-.299.153-.667.153-1.106 0-.65-.112-1.145-.337-1.481a1.08 1.08 0 0 0-.953-.51ZM32.7 5.25c.61 0 1.127.1 1.549.3.422.197.74.48.953.849.217.368.325.809.325 1.32v2.704c0 .29.02.562.062.812.044.245.108.4.19.466V12h-1.935a5.895 5.895 0 0 1-.105-.684 7.745 7.745 0 0 1-.02-.228 2.293 2.293 0 0 1-.151.203c-.205.242-.47.437-.793.584-.32.143-.685.215-1.094.215-.406 0-.77-.08-1.094-.24a1.845 1.845 0 0 1-.756-.682 1.984 1.984 0 0 1-.27-1.045c0-.606.178-1.069.535-1.388.356-.324.87-.534 1.542-.633l1.125-.16c.225-.032.403-.074.534-.123a.622.622 0 0 0 .288-.196.549.549 0 0 0 .093-.327.65.65 0 0 0-.11-.367.702.702 0 0 0-.32-.27c-.14-.07-.31-.105-.51-.105-.32 0-.576.083-.768.251-.193.164-.298.39-.314.676h-1.923c.016-.434.147-.82.393-1.155.25-.34.596-.604 1.039-.792.442-.189.954-.283 1.535-.283Zm.99 3.498a.98.98 0 0 1-.215.14 2.49 2.49 0 0 1-.584.178l-.473.092c-.315.061-.553.156-.713.283-.155.127-.233.305-.233.534 0 .23.084.412.252.547.168.135.383.203.645.203s.494-.058.694-.173c.201-.118.355-.282.461-.49.11-.21.166-.448.166-.714v-.6Zm4.526-2.375c.065-.125.138-.243.221-.349.197-.25.437-.44.719-.571.282-.135.6-.203.952-.203.528 0 .988.138 1.377.412.389.275.688.67.896 1.186.21.512.314 1.12.314 1.824 0 .7-.107 1.309-.32 1.825-.213.512-.518.906-.915 1.18-.393.275-.854.412-1.383.412-.352 0-.667-.062-.946-.184a1.832 1.832 0 0 1-.7-.554 2.2 2.2 0 0 1-.234-.383V12h-1.843V3h1.862v3.373Zm1.284.296c-.274 0-.51.085-.707.253-.192.163-.338.397-.436.7a3.376 3.376 0 0 0-.148 1.05c0 .406.05.759.148 1.058.098.299.243.53.436.694.197.164.433.246.707.246.279 0 .512-.082.7-.246.193-.164.336-.395.43-.694.099-.3.148-.652.148-1.058 0-.405-.05-.757-.147-1.056-.095-.299-.238-.53-.43-.694a1.015 1.015 0 0 0-.7-.253Zm9.416-1.419c.602 0 1.136.131 1.604.393.466.262.829.643 1.086 1.143.263.5.394 1.097.394 1.794 0 .25-.002.449-.006.596H47.51c.018.288.071.538.164.75a1.3 1.3 0 0 0 .491.596c.214.13.465.196.757.196.319 0 .583-.082.792-.246.209-.167.34-.403.393-.706h1.862a2.48 2.48 0 0 1-.485 1.235 2.54 2.54 0 0 1-1.051.805c-.439.188-.949.283-1.53.283-.655 0-1.225-.125-1.708-.375a2.672 2.672 0 0 1-1.13-1.143c-.267-.508-.4-1.137-.4-1.887 0-.712.14-1.327.418-1.843a2.86 2.86 0 0 1 1.155-1.186c.491-.27 1.051-.405 1.678-.405Zm-.044 1.345c-.274 0-.516.068-.725.203a1.29 1.29 0 0 0-.479.59 2.045 2.045 0 0 0-.132.498h2.562a1.873 1.873 0 0 0-.138-.602 1.061 1.061 0 0 0-.418-.516 1.243 1.243 0 0 0-.67-.173Z" clipRule="evenodd" />{"\n  "}<path fill="#FCFBF8" d="m26.605 9.995 1.342-4.566h1.924L27.628 12h-2.07l-2.33-6.57h1.98l1.397 4.565Zm-13.013.143h2.256c1.632 0 1.421 1.837 1.418 1.861h-5.603V3h1.93v7.138Zm31.516 1.861h-1.862V3h1.862v8.999Z" />{"\n  "}<path fill="url(#a)" fillRule="evenodd" d="M2.7 3c1.492 0 2.7 1.192 2.7 2.663v1.012h.9c1.49 0 2.7 1.192 2.7 2.662S7.791 12 6.3 12H0V5.663C0 4.193 1.209 3 2.7 3Z" clipRule="evenodd" />{"\n  "}<defs><radialGradient id="a" cx="0" cy="0" r="1" gradientTransform="matrix(-1.54236 7.07838 -10.231 -2.15602 4.627 5.022)" gradientUnits="userSpaceOnUse"><stop offset=".106" stopColor="#FE7B02" /><stop offset=".394" stopColor="#FE3F21" /><stop offset=".608" stopColor="#F858BC" /><stop offset=".929" stopColor="#575ECF" /></radialGradient></defs>{"\n"}</svg>{"\n\n"}</span>{"\n\t"}</a><span id="lovable-badge-divider" aria-hidden="true" /><button className="min-w-[24px]" id="lovable-badge-close" aria-label="Dismiss" title="Dismiss" type="button">{"\n\t\t"}<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16" aria-hidden="true">{"\n\t\t\t"}<path d="M10.646 4.646a.5.5 0 1 1 .707.708L8.707 8l2.646 2.646a.5.5 0 1 1-.707.707L8 8.707l-2.646 2.646a.5.5 0 1 1-.708-.707L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708L8 7.293l2.646-2.647Z" />{"\n\t\t"}</svg>{"\n\t"}</button></aside>
  );
}
