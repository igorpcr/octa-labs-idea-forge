import { createFileRoute } from "@tanstack/react-router";
import { octaContact } from "@/lib/octa-contact";
import capturedCSS from "../styles/site.css?raw";

export const Route = createFileRoute("/produto_/cagrilintida-mais-semaglutida-20mg")({
  head: () => ({ meta: [
    { title: "Cagrilintida + Semaglutida 20mg — OCTA LABS" },
    { name: "description", content: "Consulte Cagrilintida + Semaglutida 20mg, informações de pesquisa e atendimento comercial da OCTA Labs. Uso exclusivo em pesquisa laboratorial." },
    { property: "og:title", content: "Cagrilintida + Semaglutida 20mg — OCTA LABS" },
    { property: "og:description", content: "Consulte Cagrilintida + Semaglutida 20mg, informações de pesquisa e atendimento comercial da OCTA Labs. Uso exclusivo em pesquisa laboratorial." },
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
        <div className="container-x py-8 md:py-12">
          <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground" aria-label="Breadcrumb">
            <a className={"inline-flex items-center gap-1 font-medium text-highlight \x68over:\x75nderline"} href="/produtos"><svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg> Catálogo</a>
            <span>/</span>
            <span className="truncate text-foreground">Cagrilintida + Semaglutida 20mg</span>
          </nav>
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div className={"\x6cg:\x73ticky lg:top-24 lg:self-start"}>
              <div className="card-surface relative overflow-hidden product-bg aspect-square">
                <img className="h-full w-full object-cover" src="/site-assets/0271320bfe5e08e7.jpg" alt="Cagrilintida + Semaglutida 20mg" width="1024" height="1024" />
                <span className="absolute right-4 top-4">
                  <span className={"inline-flex items-center gap-1.5 rounded-full \x62g-highlight-soft px-3 py-1 text-xs font-semibold text-highlight"}>Premium</span>
                </span>
              </div>
            </div>
            <div>
              <h1 className={"text-3xl font-extrabold \x6dd:\x74ext-[\x342px] md:leading-tight"}>Cagrilintida + Semaglutida 20mg</h1>
              <p className="mt-3 leading-relaxed text-muted-foreground">Cagrilintida + Semaglutida 20mg — composto de pesquisa com alta pureza, destinado exclusivamente a uso laboratorial.</p>
              <div className="mt-4">
                <span className={"inline-flex items-center gap-1.5 rounded-full \x62g-highlight-soft px-3 py-1 text-xs font-semibold text-highlight"}><svg className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" /></svg> Pronta entrega</span>
              </div>
              <div className="card-surface mt-6 p-6">
                <p className="font-display text-4xl font-extrabold text-success">R$ 902,50 <span className="text-base font-semibold">no PIX</span></p>
                <p className="mt-1 text-sm text-muted-foreground">PIX com desconto de 5%</p>
                <div className={"mt-4 \x73pace-y-2 text-sm"}>
                  <p className="flex items-center gap-2"><svg className="h-4 w-4 text-highlight" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="20" height="14" x="2" y="5" rx="2" /><line x1="2" x2="22" y1="10" y2="10" /></svg> ou R$ 950,00 em até 6x de R$ 158,33 sem juros</p>
                  <p className="flex items-center gap-2"><svg className="h-4 w-4 text-highlight" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" /><path d="M15 18H9" /><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" /><circle cx="17" cy="18" r="2" /><circle cx="7" cy="18" r="2" /></svg> Frete grátis para todo o Brasil</p>
                </div>
                <a className={"inline-flex items-center justify-center gap-2 rounded-full \x62g-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-200 \x68over:\x62g-primary-deep \x68over:\x2dtranslate-y-0.\x35 mt-6 w-full !py-4 text-base"} href="https://wa.me/5511943181553?text=Ol%C3%A1!%20Tenho%20interesse%20no%20Cagrilintida%20%2B%20Semaglutida%2020mg." rel="noreferrer" target="_blank">Comprar Cagrilintida + Semaglutida 20mg</a>
                <p className="mt-3 text-center text-sm text-muted-foreground">Dúvidas? <a className={"font-medium text-highlight \x68over:\x75nderline"} href="/contato">Fale com o suporte</a></p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <a className={"inline-flex items-center justify-center gap-2 rounded-full \x62order \x62order-silver \x62g-card px-6 py-3 text-sm font-semibold text-primary transition-all duration-200 \x68over:\x62order-highlight hover:text-highlight !px-3"} href="https://wa.me/5511943181553?text=Ol%C3%A1!%20Tenho%20interesse%20no%20Cagrilintida%20%2B%20Semaglutida%2020mg." rel="noreferrer" target="_blank"><svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" /></svg> Enviar no WhatsApp</a>
                  <button className={"inline-flex items-center justify-center gap-2 rounded-full \x62order \x62order-silver \x62g-card px-6 py-3 text-sm font-semibold text-primary transition-all duration-200 \x68over:\x62order-highlight hover:text-highlight !px-3"}><svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" x2="15.42" y1="13.51" y2="17.49" /><line x1="15.41" x2="8.59" y1="6.51" y2="10.49" /></svg>{" "}Compartilhar</button>
                </div>
              </div>
              <ul className={"mt-6 \x73pace-y-2.\x35 text-sm"}>
                <li className="flex items-center gap-3"><svg className="h-4 w-4 shrink-0 text-highlight" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>Documentação do lote disponível</li>
                <li className="flex items-center gap-3"><svg className="h-4 w-4 shrink-0 text-highlight" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>Embalagem de proteção</li>
                <li className="flex items-center gap-3"><svg className="h-4 w-4 shrink-0 text-highlight" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>Envio em até 48h úteis</li>
                <li className="flex items-center gap-3"><svg className="h-4 w-4 shrink-0 text-highlight" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>Código de rastreio por e-mail</li>
                <li className="flex items-center gap-3"><svg className="h-4 w-4 shrink-0 text-highlight" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>Suporte técnico dedicado</li>
              </ul>
              <div className={"mt-6 rounded-2xl \x62g-highlight-soft p-6"}>
                <div className="flex items-center gap-2 font-semibold text-primary"><svg className="h-5 w-5 text-highlight" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" /><path d="M14 2v5a1 1 0 0 0 1 1h5" /><path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" /></svg> Informações e documentação</div>
                <p className="mt-2 text-sm text-muted-foreground">Acesse os documentos de exemplo deste produto.</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <a className={"rounded-full \x62order \x62order-silver \x62g-card px-4 py-2 text-xs font-semibold text-primary \x68over:\x62order-highlight"} href="/contato">Ficha técnica</a>
                  <a className={"rounded-full \x62order \x62order-silver \x62g-card px-4 py-2 text-xs font-semibold text-primary \x68over:\x62order-highlight"} href="/contato">Certificado do lote</a>
                  <a className={"rounded-full \x62order \x62order-silver \x62g-card px-4 py-2 text-xs font-semibold text-primary \x68over:\x62order-highlight"} href="/contato">Manual</a>
                </div>
              </div>
              <div className="card-surface mt-6 p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold">Avaliações</h2>
                  <div className="flex items-center gap-1 text-sm"><span className="flex"><svg className={"h-4 w-4 \x66ill-star text-star"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" /></svg><svg className={"h-4 w-4 \x66ill-star text-star"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" /></svg><svg className={"h-4 w-4 \x66ill-star text-star"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" /></svg><svg className={"h-4 w-4 \x66ill-star text-star"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" /></svg><svg className={"h-4 w-4 \x66ill-star text-star"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" /></svg></span> <span className="ml-1 font-semibold">5,0</span></div>
                </div>
                <div className={"mt-4 \x62order-t pt-4"}>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="flex">
                      <svg className={"h-4 w-4 \x66ill-star text-star"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                      </svg>
                      <svg className={"h-4 w-4 \x66ill-star text-star"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                      </svg>
                      <svg className={"h-4 w-4 \x66ill-star text-star"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                      </svg>
                      <svg className={"h-4 w-4 \x66ill-star text-star"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                      </svg>
                      <svg className={"h-4 w-4 \x66ill-star text-star"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                      </svg>
                    </span>
                    <span className="text-sm font-semibold">Cliente A.</span>
                    <span className="text-xs font-medium text-success">✓ Compra verificada</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">Avaliação de exemplo: produto chegou bem embalado e dentro do prazo.</p>
                </div>
                <div className={"mt-4 \x62order-t pt-4"}>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="flex">
                      <svg className={"h-4 w-4 \x66ill-star text-star"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                      </svg>
                      <svg className={"h-4 w-4 \x66ill-star text-star"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                      </svg>
                      <svg className={"h-4 w-4 \x66ill-star text-star"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                      </svg>
                      <svg className={"h-4 w-4 \x66ill-star text-star"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                      </svg>
                      <svg className={"h-4 w-4 \x66ill-star text-star"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                      </svg>
                    </span>
                    <span className="text-sm font-semibold">Cliente B.</span>
                    <span className="text-xs font-medium text-success">✓ Compra verificada</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">Avaliação de exemplo: atendimento rápido e documentação completa.</p>
                </div>
              </div>
              <div className="card-surface mt-6 flex gap-4 p-6">
                <svg className="h-6 w-6 shrink-0 text-highlight" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z" />
                  <path d="M12 22V12" />
                  <polyline points="3.29 7 12 12 20.71 7" />
                  <path d="m7.5 4.27 9 5.15" />
                </svg>
                <div>
                  <h2 className="font-semibold">Envio e embalagem</h2>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">Texto de exemplo: pedidos são embalados com proteção adequada e enviados com rastreio. Consulte a <a className={"text-highlight \x68over:\x75nderline"} href="/envio">Política de Envio</a>.</p>
                </div>
              </div>
            </div>
          </div>
          <section className="mt-20">
            <h2 className="mb-8 text-2xl font-bold md:text-3xl">Produtos relacionados</h2>
            <div className="grid gap-5 sm:grid-cols-3">
              <a className="card-surface card-hover overflow-hidden" href="/produto/tirzepatida-30mg">
                <div className="aspect-square product-bg">
                  <img className="h-full w-full object-cover" src="/site-assets/48b3448146c379a4.jpg" alt="Tirzepatida 30mg" loading="lazy" width="1024" height="1024" />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold">Tirzepatida 30mg</h3>
                  <p className="mt-1 font-display text-lg font-bold text-success">R$ 617,50</p>
                  <p className="text-xs text-muted-foreground">PIX com desconto · frete grátis</p>
                </div>
              </a>
              <a className="card-surface card-hover overflow-hidden" href="/produto/tirzepatida-60mg">
                <div className="aspect-square product-bg">
                  <img className="h-full w-full object-cover" src="/site-assets/dffa087024e0e2ab.jpg" alt="Tirzepatida 60mg" loading="lazy" width="1024" height="1024" />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold">Tirzepatida 60mg</h3>
                  <p className="mt-1 font-display text-lg font-bold text-success">R$ 902,50</p>
                  <p className="text-xs text-muted-foreground">PIX com desconto · frete grátis</p>
                </div>
              </a>
              <a className="card-surface card-hover overflow-hidden" href="/produto/retatrutida-30mg">
                <div className="aspect-square product-bg">
                  <img className="h-full w-full object-cover" src="/site-assets/1630ccd1a660092e.jpg" alt="Retatrutida 30mg" loading="lazy" width="1024" height="1024" />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold">Retatrutida 30mg</h3>
                  <p className="mt-1 font-display text-lg font-bold text-success">R$ 1.140,00</p>
                  <p className="text-xs text-muted-foreground">PIX com desconto · frete grátis</p>
                </div>
              </a>
            </div>
          </section>
          <ImportedSectionDescriO />
          <div className={"mt-10 flex gap-3 rounded-2xl \x62order \x62order-warning-border \x62g-warning p-5 text-sm text-warning-foreground"}>
            <svg className="h-5 w-5 shrink-0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
              <path d="M12 9v4" />
              <path d="M12 17h.01" />
            </svg>
            <p><strong>Aviso legal:</strong> texto de exemplo. Inclua aqui as informações legais e condições de uso aplicáveis aos produtos.</p>
          </div>
          <a className={"fixed bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-full \x62g-whatsapp text-primary-foreground \x73hadow-lg transition-transform duration-200 \x68over:\x73cale-105"} aria-label="Falar no WhatsApp" href="https://wa.me/5511943181553?text=Ol%C3%A1!%20Tenho%20interesse%20no%20Cagrilintida%20%2B%20Semaglutida%2020mg." rel="noreferrer" target="_blank">
            <svg className="h-7 w-7" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
            </svg>
          </a>
        </div>
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

function ImportedHeader() {
  return (
    <header className={"sticky top-0 z-40 \x62order-b \x62g-card/\x390 \x62ackdrop-blur-md"}>
      <div className="container-x flex h-[72px] items-center justify-between gap-6">
        <a className="flex items-center gap-2.5" aria-label="OCTA LABS — início" href="/">
          <span className="grid h-10 w-10 place-items-center rounded-xl">
            <img className="h-9 w-9 object-contain" src="/site-assets/652a01c8780ff967.png" alt="" width="40" height="40" />
          </span>
          <span className="leading-none">
            <span className="block font-display text-[19px] font-extrabold tracking-[0.06em] text-foreground">OCTA</span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.42em] text-muted-foreground">Labs</span>
          </span>
        </a>
        <nav className={"hidden items-center gap-7 \x6cg:\x66lex"} aria-label="Principal">
          <a className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary" href="/">Home</a>
          <a className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary" href="/sobre">Sobre</a>
          <a className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary" href="/produtos">Produtos</a>
          <div className="group relative">
            <button className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary inline-flex items-center gap-1" aria-haspopup="true">Ferramentas <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg></button>
            <div className={"invisible absolute left-1/2 top-full w-56 \x2dtranslate-x-1/\x32 pt-3 opacity-0 transition-all duration-200 \x67roup-focus-within:\x76isible \x67roup-focus-within:\x6fpacity-100 \x67roup-hover:\x76isible \x67roup-hover:\x6fpacity-100"}>
              <div className="card-surface p-2">
                <a className={"block rounded-lg px-3 py-2 text-sm text-foreground \x68over:\x62g-highlight-soft hover:text-highlight"} href="/faq">FAQ</a>
                <a className={"block rounded-lg px-3 py-2 text-sm text-foreground \x68over:\x62g-highlight-soft hover:text-highlight"} href="/envio">Política de Envio</a>
                <a className={"block rounded-lg px-3 py-2 text-sm text-foreground \x68over:\x62g-highlight-soft hover:text-highlight"} href="/contato">Suporte Técnico</a>
              </div>
            </div>
          </div>
          <a className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary" href="/contato">Contato</a>
        </nav>
        <div className={"hidden items-center gap-2 \x6cg:\x66lex"}>
          <a className={"inline-flex items-center justify-center gap-2 rounded-full \x62order \x62order-silver \x62g-card px-6 py-3 text-sm font-semibold text-primary transition-all duration-200 \x68over:\x62order-highlight hover:text-highlight !px-4 !py-2.5"} href="/produtos?categoria=Premium">Catálogo Premium</a>
          <a className={"inline-flex items-center justify-center gap-2 rounded-full \x62g-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-200 \x68over:\x62g-primary-deep \x68over:\x2dtranslate-y-0.\x35 !px-5 !py-2.5"} href="/produtos">Catálogo</a>
        </div>
        <button className={"rounded-lg p-2 text-primary \x6cg:\x68idden"} aria-label="Abrir menu">
          <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 5h16" />
            <path d="M4 12h16" />
            <path d="M4 19h16" />
          </svg>
        </button>
      </div>
    </header>
  );
}

function ImportedSectionDescriO() {
  return (
    <section className="card-surface mt-16 p-7 md:p-10">
      <h2 className="text-2xl font-bold">Descrição</h2>
      <p className="mt-4 leading-relaxed text-muted-foreground">Descrição longa de exemplo. Use este espaço para detalhar as características do produto, especificações, apresentação e qualquer informação relevante para o cliente.</p>
      <ul className={"mt-5 \x73pace-y-2.\x35"}>
        <li className="flex items-center gap-3 text-sm"><svg className="h-4 w-4 shrink-0 text-highlight" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>Ponto de destaque de exemplo 1</li>
        <li className="flex items-center gap-3 text-sm"><svg className="h-4 w-4 shrink-0 text-highlight" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>Ponto de destaque de exemplo 2</li>
        <li className="flex items-center gap-3 text-sm"><svg className="h-4 w-4 shrink-0 text-highlight" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>Ponto de destaque de exemplo 3</li>
        <li className="flex items-center gap-3 text-sm"><svg className="h-4 w-4 shrink-0 text-highlight" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>Ponto de destaque de exemplo 4</li>
      </ul>
      <h3 className="mt-10 text-lg font-bold">Itens relacionados</h3>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <a className="group card-surface card-hover flex flex-col overflow-hidden" aria-current="page" href="#">
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
      </div>
      <h3 className="mt-10 text-lg font-bold">Referências</h3>
      <ol className={"mt-3 list-decimal \x73pace-y-1.\x35 pl-5 text-sm text-muted-foreground"}>
        <li>Referência de exemplo 1 — Autor, Título, Ano.</li>
        <li>Referência de exemplo 2 — Autor, Título, Ano.</li>
        <li>Referência de exemplo 3 — Autor, Título, Ano.</li>
      </ol>
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
              <a className="transition-colors hover:text-primary-foreground" href="/produtos">Catálogo</a>
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
