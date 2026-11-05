import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, FlaskConical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { tools } from "@/lib/octa-tools";
import { ImportedHeader, ImportedFooter } from "./index";
import capturedCSS from "@/styles/site.css?raw";

export const Route = createFileRoute("/ferramentas/")({
  head: () => ({ meta: [{ title: "Ferramentas Grátis para Pesquisa — OCTA Labs" }, { name: "description", content: "Calcule concentrações, diluições, conversões e custos e organize ensaios com as ferramentas gratuitas de pesquisa OCTA Labs." }, { property: "og:title", content: "Ferramentas Grátis para Pesquisa — OCTA Labs" }, { property: "og:description", content: "Seis ferramentas gratuitas OCTA para cálculos e organização de pesquisa laboratorial." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: ToolsIndex,
});
function ToolsIndex() {
  return <><style>{capturedCSS}</style><ImportedHeader /><main className="container-x py-12 md:py-16"><p className="mb-3 text-sm font-semibold text-highlight">OCTA Labs · Pesquisa laboratorial</p><h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">Ferramentas Grátis</h1><div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{tools.map(tool => <article key={tool.id} className="flex flex-col rounded-lg border border-border bg-card p-7"><FlaskConical className="h-6 w-6 text-highlight" /><h2 className="mt-5 text-xl font-semibold text-foreground">{tool.title}</h2><p className="mb-6 mt-3 leading-relaxed text-muted-foreground">{tool.description}</p><Button asChild variant="outline" className="mt-auto justify-between"><Link to={tool.path}>Abrir ferramenta<ArrowRight /></Link></Button></article>)}</div><p className="mt-10 text-sm text-muted-foreground">Uso exclusivo em pesquisa laboratorial. Sem recomendações de tratamento, doses corporais ou ciclos de uso.</p></main><ImportedFooter /></>;
}