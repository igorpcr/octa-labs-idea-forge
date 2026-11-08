import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { octaContact } from "@/lib/octa-contact";
import capturedCSS from "../styles/site.css?raw";
import { ToolsMenu, MobileToolLinks } from "@/components/tools-menu";
import heroFrasco from "@/assets/hero-frasco-prata.png";
import { CartLink } from "@/components/cart-context";
import { AccountActions } from "@/components/auth-context";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "OCTA Labs — Reagentes peptídicos para pesquisa" },
    { name: "description", content: "Conheça os reagentes peptídicos da OCTA Labs para pesquisa metabólica e P&D. Consulte produtos, documentação por lote e atendimento comercial." },
    { property: "og:title", content: "OCTA Labs — Reagentes peptídicos para pesquisa" },
    { property: "og:description", content: "Reagentes para pesquisa metabólica e P&D, documentação por lote e atendimento OCTA Labs." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  staticData: { importedDocument: { html: { "lang": "pt-BR" }, body: { "data-site-import-popup-incomplete": "limit" } } },
  component: Index,
});

function Index() {
  const [cookiesDone, setCookiesDone] = useState(true);
  useEffect(() => { setCookiesDone(!!localStorage.getItem("cookie-consent")); }, []);
  const decide = (v: string) => { localStorage.setItem("cookie-consent", v); setCookiesDone(true); };
  return (
    <>
      <style>{capturedCSS}</style>
      <ImportedHeader />
      <main>
        <ImportedSectionPesquisaCompadrODeexcel />
        <section className="container-x pb-4 pt-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="reveal card-surface p-7 text-center" data-visible="true">
              <p className="font-display text-4xl font-extrabold text-primary">99%+</p>
              <p className="mt-2 text-sm text-muted-foreground">Padrão de qualidade verificado</p>
            </div>
            <div className="reveal card-surface p-7 text-center" data-visible="true">
              <p className="font-display text-4xl font-extrabold text-primary">Lote</p>
              <p className="mt-2 text-sm text-muted-foreground">Rastreabilidade individual</p>
            </div>
            <div className="reveal card-surface p-7 text-center" data-visible="true">
              <p className="font-display text-4xl font-extrabold text-primary">24/7</p>
              <p className="mt-2 text-sm text-muted-foreground">Atendimento e suporte online</p>
            </div>
          </div>
        </section>
        <ImportedSectionMaisVendidosNaLoja />
        <ImportedSectionDocumentaOEQualidade />
        <ImportedSectionTPicosEmDestaque />
        <ImportedSectionConformidadeEPadrEs />
        <ImportedSectionCatLogoDeProdutos />
        <ImportedSectionProdutoDeExemplo04 />
        <ImportedSectionQualidadeECompliance />
        <ImportedSectionEntreEmContato />
      </main>
      <ImportedFooter />
      {!cookiesDone && <div className={"card-surface fixed bottom-4 left-4 right-4 z-40 p-5 \x73hadow-lg sm:left-auto sm:max-w-sm"} role="dialog" aria-label="Preferências de cookies">
        <p className="text-sm font-semibold text-foreground">Sua privacidade importa</p>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">Escolha suas preferências de cookies ao navegar na OCTA Labs. Consulte nossa <a className="text-highlight underline" href="/privacidade">Política de Privacidade</a>.</p>
        <div className="mt-4 flex gap-2">
          <button onClick={() => decide("all")} className={"rounded-full \x62g-primary px-4 py-2 text-xs font-semibold text-primary-foreground \x68over:\x62g-primary-deep"}>Aceitar</button>
          <button onClick={() => decide("essential")} className={"rounded-full \x62order \x62order-silver px-4 py-2 text-xs font-semibold text-primary \x68over:\x62order-highlight"}>Essenciais</button>
          <a href="/privacidade" className="px-2 py-2 text-xs font-semibold text-highlight">Opções</a>
        </div>
      </div>}
    </>
  );
}

export function ImportedHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const openBtn = useRef<HTMLButtonElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const close = () => { setMenuOpen(false); openBtn.current?.focus(); };
  useEffect(() => {
    if (!menuOpen) return;
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);
  return (
    <header className={"sticky top-0 z-40 \x62order-b \x62g-card/\x390 \x62ackdrop-blur-md"}>
      <div className="container-x flex h-[72px] items-center justify-between gap-6">
        <a className="flex items-center gap-2.5" aria-current="page" aria-label="OCTA LABS — início" href="/">
          <span className="grid h-10 w-10 place-items-center rounded-xl">
            <img className="h-9 w-9 object-contain" src="/site-assets/652a01c8780ff967.png" alt="" width="40" height="40" />
          </span>
          <span className="leading-none">
            <span className="block font-display text-[19px] font-extrabold tracking-[0.06em] text-foreground">OCTA</span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.42em] text-muted-foreground">Labs</span>
          </span>
        </a>
        <nav className={"hidden items-center gap-7 \x6cg:\x66lex"} aria-label="Principal">
          <a className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary text-primary" aria-current="page" href="/">Home</a>
          <a className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary" href="/sobre">Sobre</a>
          <a className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary" href="/produtos">Produtos</a>
          <ToolsMenu />
          <a className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary" href="/contato">Contato</a>
        </nav>
        <div className={"hidden items-center gap-2 \x6cg:\x66lex"}>
          <a className={"inline-flex items-center justify-center gap-2 rounded-full \x62order \x62order-silver \x62g-card px-6 py-3 text-sm font-semibold text-primary transition-all duration-200 \x68over:\x62order-highlight hover:text-highlight !px-4 !py-2.5"} href="/produtos?categoria=Premium">Catálogo Premium</a>
          <a className={"inline-flex items-center justify-center gap-2 rounded-full \x62g-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-200 \x68over:\x62g-primary-deep \x68over:\x2dtranslate-y-0.\x35 !px-5 !py-2.5"} href="/produtos">Catálogo</a>
        </div>
        <div className="flex items-center gap-1"><AccountActions /><CartLink /></div>
        <button ref={openBtn} onClick={() => setMenuOpen(true)} aria-expanded={menuOpen} className={"rounded-lg p-2 text-primary \x6cg:\x68idden"} aria-label="Abrir menu">
          <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 5h16" />
            <path d="M4 12h16" />
            <path d="M4 19h16" />
          </svg>
        </button>
      </div>
      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="absolute inset-0 bg-foreground/40" onClick={close} />
          <div className="absolute inset-y-0 right-0 flex h-dvh w-[85%] max-w-sm flex-col overflow-y-auto bg-card">
            <div className="flex h-[72px] items-center justify-between border-b px-6">
              <span className="flex items-center gap-2.5">
                <img className="h-9 w-9 object-contain" src="/site-assets/652a01c8780ff967.png" alt="" width="40" height="40" />
                <span className="leading-none">
                  <span className="block font-display text-[19px] font-extrabold tracking-[0.06em] text-foreground">OCTA</span>
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.42em] text-muted-foreground">Labs</span>
                </span>
              </span>
              <button ref={closeBtn} onClick={close} className="rounded-lg p-2 text-primary" aria-label="Fechar menu">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" /></svg>
              </button>
            </div>
            <nav className="flex flex-col gap-1 px-6 py-6" aria-label="Menu móvel">
              <a className="py-3 text-lg font-medium text-foreground" href="/" onClick={close}>Home</a>
              <a className="py-3 text-lg font-medium text-foreground" href="/sobre" onClick={close}>Sobre</a>
              <a className="py-3 text-lg font-medium text-foreground" href="/produtos" onClick={close}>Produtos</a>
              <MobileToolLinks onNavigate={close} />
              <AccountActions mobile />
              <a className="py-3 text-lg font-medium text-foreground" href="/contato" onClick={close}>Contato</a>
              <div className="mt-4 flex flex-col gap-3">
                <a className="rounded-full bg-primary px-6 py-3 text-center text-sm font-semibold text-primary-foreground" href="/produtos">Catálogo</a>
                <a className="rounded-full border border-silver bg-card px-6 py-3 text-center text-sm font-semibold text-primary" href="/produtos?categoria=Premium">Catálogo Premium</a>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

function ImportedSectionPesquisaCompadrODeexcel() {
  return (
    <section className="container-x grid items-center gap-12 py-14 md:py-20 lg:grid-cols-2">
      <div>
        <span className={"inline-flex items-center gap-1.5 rounded-full \x62g-highlight-soft px-3 py-1 text-xs font-semibold text-highlight"}><svg className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" /><path d="m9 12 2 2 4-4" /></svg> Qualidade documentada por lote</span>
        <h1 className={"mt-6 text-[40px] font-extrabold leading-[1.05] text-foreground sm:text-5xl \x6cg:\x74ext-[\x358px]"}>Reagentes peptídicos para<br /><span className="text-highlight">pesquisa e P&D.</span></h1>
        <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">A OCTA Labs reúne reagentes para pesquisa metabólica e desenvolvimento científico. Explore o catálogo e consulte a documentação de cada lote com nossa equipe.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a className={"inline-flex items-center justify-center gap-2 rounded-full \x62g-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-200 \x68over:\x62g-primary-deep \x68over:\x2dtranslate-y-0.\x35"} href="/produtos">Ver catálogo <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></a>
          <a className={"inline-flex items-center justify-center gap-2 rounded-full \x62g-highlight px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:opacity-90 \x68over:\x2dtranslate-y-0.\x35"} href="/produtos?categoria=Premium">Catálogo Premium</a>
        </div>
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <a className="inline-flex items-center gap-1.5 hover:text-highlight" href={`mailto:${octaContact.email}`}><svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" /><rect x="2" y="4" width="20" height="16" rx="2" /></svg>{" "}{octaContact.email}</a>
          <a className="inline-flex items-center gap-1.5 hover:text-highlight" href="https://wa.me/5511943181553" rel="noreferrer" target="_blank"><svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" /></svg> WhatsApp</a>
        </div>
      </div>
      <div className="relative">
        <div className="card-surface overflow-hidden product-bg aspect-[4/5] sm:aspect-square">
          <img className="h-full w-full object-cover" src={heroFrasco} alt="Frasco OCTA LABS Retatrutida com etiqueta prateada" width="1024" height="1024" fetchPriority="high" />
        </div>
        <div className="card-surface absolute -bottom-5 left-5 flex items-center gap-3 px-4 py-3">
          <svg className="h-6 w-6 text-highlight" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
          <div>
            <p className="text-sm font-semibold">Lote rastreável</p>
            <p className="text-xs text-muted-foreground">Documentação disponível</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ImportedSectionMaisVendidosNaLoja() {
  return (
    <section className="container-x section-y">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-highlight">Destaques</p>
          <h2 className="text-3xl font-bold md:text-4xl">Mais vendidos na loja</h2>
        </div>
        <a className="inline-flex items-center gap-1 text-sm font-semibold text-highlight hover:gap-2 transition-all" href="/produtos">Ver toda a loja <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></a>
      </div>
      <div className={"-mx-5 flex \x73nap-x gap-5 overflow-x-auto px-5 pb-2 md:mx-0 \x6dd:\x67rid md:grid-cols-4 md:overflow-visible md:px-0"}>
        <div className={"w-[72%] shrink-0 \x73nap-start sm:w-[45%] md:w-auto"}>
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
        </div>
        <div className={"w-[72%] shrink-0 \x73nap-start sm:w-[45%] md:w-auto"}>
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
        </div>
        <div className={"w-[72%] shrink-0 \x73nap-start sm:w-[45%] md:w-auto"}>
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
        </div>
        <div className={"w-[72%] shrink-0 \x73nap-start sm:w-[45%] md:w-auto"}>
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
        </div>
      </div>
    </section>
  );
}

function ImportedSectionDocumentaOEQualidade() {
  return (
    <section className={"\x62g-card section-y \x62order-y"}>
      <div className="container-x">
        <div className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-highlight">Transparência</p>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">Documentação e rastreabilidade para pesquisa</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">Informações técnicas e identificação por lote ajudam a avaliar os reagentes antes de cada etapa da pesquisa. Consulte a OCTA Labs sobre os documentos disponíveis para seu produto.</p>
        </div>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className={"reveal \x73pace-y-6"} data-visible="true">
            <div className="flex gap-4">
              <div className={"flex h-11 w-11 shrink-0 items-center justify-center rounded-xl \x62g-highlight-soft"}>
                <svg className="h-5 w-5 text-highlight" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
                  <path d="M14 2v5a1 1 0 0 0 1 1h5" />
                  <path d="M10 9H8" />
                  <path d="M16 13H8" />
                  <path d="M16 17H8" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Documentação por lote</h3>
                <p className="mt-1 leading-relaxed text-muted-foreground">Solicite a documentação técnica e o Certificado de Análise (COA) disponível para o lote de interesse. Confira os resultados e as especificações antes de realizar seu pedido.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className={"flex h-11 w-11 shrink-0 items-center justify-center rounded-xl \x62g-highlight-soft"}>
                <svg className="h-5 w-5 text-highlight" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M6 18h8" />
                  <path d="M3 22h18" />
                  <path d="M14 22a7 7 0 1 0 0-14h-1" />
                  <path d="M9 14h2" />
                  <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z" />
                  <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Qualidade para sua pesquisa</h3>
                <p className="mt-1 leading-relaxed text-muted-foreground">Avalie a pureza, a identificação e os dados analíticos informados na documentação do lote. Nossa equipe orienta a consulta às informações técnicas de cada reagente.</p>
              </div>
            </div>
          </div>
          <div className={"reveal rounded-3xl \x62g-highlight-soft p-6 sm:p-8"} data-visible="true">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="card-surface p-5 text-center">
                <p className="font-display text-2xl font-extrabold text-primary">100%</p>
                <p className="mt-1 text-xs text-muted-foreground">Lotes documentados</p>
              </div>
              <div className="card-surface p-5 text-center">
                <p className="font-display text-2xl font-extrabold text-primary">+500</p>
                <p className="mt-1 text-xs text-muted-foreground">Pedidos enviados</p>
              </div>
              <div className="card-surface p-5 text-center">
                <p className="font-display text-2xl font-extrabold text-primary">48h</p>
                <p className="mt-1 text-xs text-muted-foreground">Prazo de despacho</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ImportedSectionTPicosEmDestaque() {
  return (
    <section className="container-x section-y">
      <div className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
        <h2 className="text-3xl font-bold text-foreground md:text-4xl">Tópicos em Destaque</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">Conheça temas presentes na literatura científica sobre peptídeos, sempre no contexto de pesquisa laboratorial.</p>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        <div className="reveal card-surface card-hover p-7" data-visible="true">
          <div className={"flex h-11 w-11 shrink-0 items-center justify-center rounded-xl \x62g-highlight-soft"}>
            <svg className="h-5 w-5 text-highlight" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z" />
              <path d="M12 22V12" />
              <polyline points="3.29 7 12 12 20.71 7" />
              <path d="m7.5 4.27 9 5.15" />
            </svg>
          </div>
          <h3 className="mt-5 text-lg font-semibold">BPC-157</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Peptídeo estudado a partir de sequências associadas a proteínas gástricas, abordado em pesquisas experimentais.</p>
        </div>
        <div className="reveal card-surface card-hover p-7" data-visible="true">
          <div className={"flex h-11 w-11 shrink-0 items-center justify-center rounded-xl \x62g-highlight-soft"}>
            <svg className="h-5 w-5 text-highlight" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
              <path d="M15 18H9" />
              <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
              <circle cx="17" cy="18" r="2" />
              <circle cx="7" cy="18" r="2" />
            </svg>
          </div>
          <h3 className="mt-5 text-lg font-semibold">TB-500</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Tema relacionado à timosina beta-4 e investigado em modelos experimentais na literatura acadêmica.</p>
        </div>
        <div className="reveal card-surface card-hover p-7" data-visible="true">
          <div className={"flex h-11 w-11 shrink-0 items-center justify-center rounded-xl \x62g-highlight-soft"}>
            <svg className="h-5 w-5 text-highlight" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
              <path d="m9 14 2 2 4-4" />
            </svg>
          </div>
          <h3 className="mt-5 text-lg font-semibold">GLP-1 e pesquisa metabólica</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Semaglutida e tirzepatida estão entre as moléculas discutidas em estudos sobre vias metabólicas e sinalização celular.</p>
        </div>
      </div>
      <div className="mt-10 text-center">
        <a className={"inline-flex items-center justify-center gap-2 rounded-full \x62g-primary-deep px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-200 \x68over:\x62g-primary"} href="/faq">Acessar FAQ <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></a>
      </div>
    </section>
  );
}

function ImportedSectionConformidadeEPadrEs() {
  return (
    <section className="container-x pb-14 md:pb-24">
      <div className={"reveal card-surface \x62order-t-4 !\x62order-t-highlight p-7 md:p-12"} data-visible="true">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr_0.8fr]">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">Pesquisa responsável e padrões de qualidade</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">Da seleção do reagente à consulta da documentação, a pesquisa exige atenção à qualidade, à rastreabilidade e às normas aplicáveis. Verifique os requisitos de sua instituição e as especificações de cada lote.</p>
          </div>
          <ul className={"\x73pace-y-3"}>
            <li className="flex items-start gap-3 text-sm"><svg className="mt-0.5 h-4 w-4 shrink-0 text-highlight" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg> Procedimentos operacionais padronizados</li>
            <li className="flex items-start gap-3 text-sm"><svg className="mt-0.5 h-4 w-4 shrink-0 text-highlight" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg> Inspeção de cada lote recebido</li>
            <li className="flex items-start gap-3 text-sm"><svg className="mt-0.5 h-4 w-4 shrink-0 text-highlight" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg> Armazenamento controlado</li>
            <li className="flex items-start gap-3 text-sm"><svg className="mt-0.5 h-4 w-4 shrink-0 text-highlight" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg> Embalagem de proteção</li>
            <li className="flex items-start gap-3 text-sm"><svg className="mt-0.5 h-4 w-4 shrink-0 text-highlight" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg> Registro e rastreabilidade</li>
          </ul>
          <div className={"rounded-2xl \x62g-highlight-soft p-6"}>
            <svg className="h-5 w-5 text-highlight" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
            <p className="mt-3 text-sm font-semibold text-primary">Uso exclusivo em pesquisa</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">Reagentes destinados à pesquisa laboratorial, sem indicação terapêutica. As informações apresentadas não constituem orientação para uso humano ou veterinário.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ImportedSectionCatLogoDeProdutos() {
  return (
    <section className={"\x62g-card \x62order-y section-y"}>
      <div className="container-x">
        <div className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-highlight">Loja</p>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">Catálogo de reagentes para pesquisa</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">Explore os peptídeos e compostos da OCTA Labs. Consulte apresentações, preços e informações técnicas para planejar sua pesquisa.</p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
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
        </div>
        <div className="mt-10 text-center">
          <a className={"inline-flex items-center justify-center gap-2 rounded-full \x62g-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-200 \x68over:\x62g-primary-deep \x68over:\x2dtranslate-y-0.\x35"} href="/produtos">Ver catálogo completo <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></a>
        </div>
      </div>
    </section>
  );
}

function ImportedSectionProdutoDeExemplo04() {
  return (
    <section className="container-x section-y grid items-center gap-12 lg:grid-cols-2">
      <div className="reveal" data-visible="true">
        <span className={"inline-flex items-center gap-1.5 rounded-full \x62g-highlight-soft px-3 py-1 text-xs font-semibold text-highlight"}>Produto em destaque</span>
        <h2 className="mt-5 text-3xl font-bold md:text-4xl">Tirzepatida: pesquisa metabólica e qualidade</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">Conheça a tirzepatida no catálogo OCTA Labs e consulte as informações do lote para aplicações laboratoriais. Sua presença em estudos científicos não transforma o reagente de pesquisa em medicamento.</p>
        <ul className={"mt-6 \x73pace-y-3"}>
          <li className="flex items-center gap-3"><span className={"flex h-6 w-6 items-center justify-center rounded-full \x62g-highlight-soft"}><svg className="h-3.5 w-3.5 text-highlight" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg></span>Reagente para estudos laboratoriais</li>
          <li className="flex items-center gap-3"><span className={"flex h-6 w-6 items-center justify-center rounded-full \x62g-highlight-soft"}><svg className="h-3.5 w-3.5 text-highlight" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg></span>Apresentações disponíveis no catálogo</li>
          <li className="flex items-center gap-3"><span className={"flex h-6 w-6 items-center justify-center rounded-full \x62g-highlight-soft"}><svg className="h-3.5 w-3.5 text-highlight" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg></span>Informações técnicas por lote</li>
          <li className="flex items-center gap-3"><span className={"flex h-6 w-6 items-center justify-center rounded-full \x62g-highlight-soft"}><svg className="h-3.5 w-3.5 text-highlight" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg></span>Atendimento direto com a OCTA Labs</li>
        </ul>
        <a className={"inline-flex items-center justify-center gap-2 rounded-full \x62g-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-200 \x68over:\x62g-primary-deep \x68over:\x2dtranslate-y-0.\x35 mt-8"} href="/produto/tirzepatida-60mg">Ver produto <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></a>
      </div>
      <div className="reveal card-surface overflow-hidden product-bg aspect-square" data-visible="true">
        <img className="h-full w-full object-cover" src="/site-assets/dffa087024e0e2ab.jpg" alt="Tirzepatida 60mg OCTA Labs" loading="lazy" width="1024" height="1024" />
      </div>
    </section>
  );
}

function ImportedSectionQualidadeECompliance() {
  return (
    <section className={"\x62g-card \x62order-y section-y"}>
      <div className="container-x">
        <div className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">Qualidade e Compliance</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="reveal card-surface card-hover p-6" data-visible="true">
            <svg className="h-5 w-5 text-highlight" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            <h3 className="mt-4 font-semibold">Segurança</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">Consulte as orientações de manuseio e os requisitos de segurança de sua instituição.</p>
          </div>
          <div className="reveal card-surface card-hover p-6" data-visible="true">
            <svg className="h-5 w-5 text-highlight" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2" />
              <path d="M6.453 15h11.094" />
              <path d="M8.5 2h7" />
            </svg>
            <h3 className="mt-4 font-semibold">Análise</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">Verificação técnica de cada lote.</p>
          </div>
          <div className="reveal card-surface card-hover p-6" data-visible="true">
            <svg className="h-5 w-5 text-highlight" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z" />
              <path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12" />
              <path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17" />
            </svg>
            <h3 className="mt-4 font-semibold">Rastreabilidade</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">Registro completo do recebimento ao envio.</p>
          </div>
          <div className="reveal card-surface card-hover p-6" data-visible="true">
            <svg className="h-5 w-5 text-highlight" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            <h3 className="mt-4 font-semibold">Conservação e embalagem</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">Verifique as condições de armazenamento de cada reagente e consulte nossa equipe sobre o envio.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ImportedSectionEntreEmContato() {
  return (
    <section className="container-x section-y">
      <div className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
        <h2 className="text-3xl font-bold text-foreground md:text-4xl">Entre em Contato</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">Fale com a OCTA Labs para consultar produtos, disponibilidade, documentação e informações sobre seu pedido.</p>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="reveal card-surface p-7 md:p-9" data-visible="true">
          <div className={"flex h-11 w-11 shrink-0 items-center justify-center rounded-xl \x62g-highlight-soft"}>
            <svg className="h-5 w-5 text-highlight" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
            </svg>
          </div>
          <h3 className="mt-5 text-xl font-semibold">Contato Comercial</h3>
          <dl className={"mt-5 \x73pace-y-3 text-sm"}>
            <div className={"flex flex-col gap-0.5 \x73m:\x66lex-row sm:gap-3"}>
              <dt className="w-24 shrink-0 text-muted-foreground">Telefone</dt>
              <dd className="font-medium">(11) 94318-1553</dd>
            </div>
            <div className={"flex flex-col gap-0.5 \x73m:\x66lex-row sm:gap-3"}>
              <dt className="w-24 shrink-0 text-muted-foreground">WhatsApp</dt>
              <dd className="font-medium">(11) 94318-1553</dd>
            </div>
            <div className={"flex flex-col gap-0.5 \x73m:\x66lex-row sm:gap-3"}>
              <dt className="w-24 shrink-0 text-muted-foreground">E-mail</dt>
              <dd className="font-medium"><a className="break-all hover:text-highlight" href={`mailto:${octaContact.email}`}>{octaContact.email}</a></dd>
            </div>
            <div className={"flex flex-col gap-0.5 \x73m:\x66lex-row sm:gap-3"}>
              <dt className="w-24 shrink-0 text-muted-foreground">Horário</dt>
              <dd className="font-medium">Seg a Sex, 9h às 18h</dd>
            </div>
          </dl>
        </div>
        <div className="reveal card-surface flex flex-col p-7 md:p-9" data-visible="true">
          <div className={"flex h-11 w-11 shrink-0 items-center justify-center rounded-xl \x62g-highlight-soft"}>
            <svg className="h-5 w-5 text-highlight" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
            </svg>
          </div>
          <h3 className="mt-5 text-xl font-semibold">Suporte Técnico</h3>
          <p className="mt-3 leading-relaxed text-muted-foreground">Precisa consultar especificações, documentos de um lote ou condições de conservação? Nossa equipe ajuda a localizar as informações necessárias para sua pesquisa.</p>
          <div className="mt-auto flex flex-wrap gap-3 pt-6">
            <a className={"inline-flex items-center justify-center gap-2 rounded-full \x62g-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-200 \x68over:\x62g-primary-deep \x68over:\x2dtranslate-y-0.\x35"} href="https://wa.me/5511943181553" rel="noreferrer" target="_blank"><svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" /></svg> Falar no WhatsApp</a>
            <a className={"inline-flex items-center justify-center gap-2 rounded-full \x62order \x62order-silver \x62g-card px-6 py-3 text-sm font-semibold text-primary transition-all duration-200 \x68over:\x62order-highlight hover:text-highlight"} href="/contato">Formulário</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ImportedFooter() {
  return (
    <footer className={"octa-footer text-muted-foreground"}>
      <div className="container-x grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <a className="flex items-center gap-2.5" aria-current="page" aria-label="OCTA LABS — início" href="/">
            <span className={"grid h-10 w-10 place-items-center rounded-xl \x62g-muted"}>
              <img className="h-9 w-9 object-contain" src="/site-assets/652a01c8780ff967.png" alt="" width="40" height="40" />
            </span>
            <span className="leading-none">
              <span className="block font-display text-[19px] font-extrabold tracking-[0.06em] text-foreground">OCTA</span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.42em] text-silver">Labs</span>
            </span>
          </a>
          <p className="mt-5 max-w-xs text-sm leading-relaxed">OCTA Labs: reagentes peptídicos para pesquisa e desenvolvimento científico, com informações técnicas por lote e atendimento direto. Uso exclusivo em pesquisa laboratorial.</p>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold text-foreground">Empresa</h3>
          <ul className={"\x73pace-y-2.\x35 text-sm"}>
            <li>
              <a className="transition-colors hover:text-highlight" href="/sobre">Sobre nós</a>
            </li>
            <li>
              <a className="transition-colors hover:text-highlight" href="/produtos">Catálogo</a>
            </li>
            <li>
              <a className="transition-colors hover:text-highlight" href="/contato">Contato</a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold text-foreground">Suporte</h3>
          <ul className={"\x73pace-y-2.\x35 text-sm"}>
            <li>
              <a className="transition-colors hover:text-highlight" href="/faq">FAQ</a>
            </li>
            <li>
              <a className="transition-colors hover:text-highlight" href="/envio">Política de Envio</a>
            </li>
            <li>
              <a className="transition-colors hover:text-highlight" href="/contato">Suporte Técnico</a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold text-foreground">Legal</h3>
          <ul className={"\x73pace-y-2.\x35 text-sm"}>
            <li>
              <a className="transition-colors hover:text-highlight" href="/termos">Termos de Uso</a>
            </li>
            <li>
              <a className="transition-colors hover:text-highlight" href="/privacidade">Privacidade</a>
            </li>
            <li>
              <a className="transition-colors hover:text-highlight" href="/envio">Trocas e Envio</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container-x">
        <div className={"grid gap-2 \x62order-t \x62order-border py-6 text-xs sm:grid-cols-3"}>
          <p className={"\x73m:\x74ext-right"}>{octaContact.email}</p>
        </div>
        <p className={"\x62order-t \x62order-border py-6 text-xs"}>© 2026 OCTA LABS. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
