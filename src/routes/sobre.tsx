import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, HeartHandshake, Mail, MessageCircle, Search, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { octaContact } from "@/lib/octa-contact";
import { ImportedFooter, ImportedHeader } from "./index";
import heroFrasco from "@/assets/hero-frasco-prata.png";
import capturedCSS from "../styles/site.css?raw";

export const Route = createFileRoute("/sobre")({
  head: () => ({ meta: [
    { title: "Quem Somos — A história da OCTA Labs" },
    { name: "description", content: "Conheça a origem da OCTA Labs: uma necessidade pessoal que se transformou em uma busca por acesso, informação e atendimento próximo no universo da pesquisa." },
    { property: "og:title", content: "Quem Somos — A história da OCTA Labs" },
    { property: "og:description", content: "Uma história de pessoas, perguntas e propósito. Conheça a origem e os compromissos da OCTA Labs." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  staticData: { importedDocument: { html: { lang: "pt-BR" } } },
  component: About,
});

function About() {
  return (
    <>
      <style>{capturedCSS}</style>
      <ImportedHeader />
      <main>
        <section className="relative isolate overflow-hidden border-b border-border">
          <img src={heroFrasco} alt="Frasco OCTA Labs com etiqueta prateada" className="absolute inset-0 -z-20 h-full w-full object-cover object-center opacity-40" />
          <div className="absolute inset-0 -z-10 bg-background/75" />
          <div className="container-x py-16 md:py-24">
            <p className="mb-5 text-sm font-semibold uppercase text-highlight">Quem somos</p>
            <h1 className="font-display text-5xl font-bold text-foreground md:text-6xl">OCTA Labs</h1>
            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-foreground">Antes de ser uma marca, fomos uma pessoa em busca de respostas.</p>
            <p className="mt-5 max-w-2xl leading-relaxed text-muted-foreground">Nossa origem está em uma necessidade pessoal. Nosso propósito está na proximidade com quem também busca informação, transparência e acesso no universo da pesquisa.</p>
          </div>
        </section>

        <section className="container-x py-14 md:py-20" aria-labelledby="origem">
          <div className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-16">
            <div>
              <p className="mb-3 text-sm font-semibold text-highlight">Nossa origem</p>
              <h2 id="origem" className="text-3xl font-bold leading-tight text-foreground">Uma necessidade pessoal.<br />Um propósito compartilhado.</h2>
            </div>
            <div className="max-w-3xl space-y-6 text-base leading-relaxed text-muted-foreground">
              <p>As dores articulares faziam parte do dia a dia de um dos sócios do nosso grupo. Foi nesse contexto que um amigo comentou sobre estudos envolvendo o TB500. A conversa despertou perguntas e deu início a uma busca por informações.</p>
              <p>Depois de pesquisar na internet, ele adquiriu a substância por um preço muito elevado. O custo se tornou uma barreira concreta. Então, começou a estudar possibilidades de aquisição e importação, procurando entender por que o acesso era tão caro e como poderia reduzir esse custo.</p>
              <p>Aquela busca não nasceu de um plano comercial. Nasceu de uma dificuldade vivida de perto. Com o tempo, amigos próximos passaram a compartilhar suas próprias dúvidas e dificuldades de acesso. O que havia começado como uma iniciativa individual ganhou outra dimensão: havia outras pessoas diante das mesmas barreiras.</p>
              <p>Foi assim que surgiu a OCTA Labs. Uma busca pessoal se transformou em negócio, levando consigo a memória do que significa procurar respostas e encontrar obstáculos no caminho.</p>
              <p className="border-l-2 border-highlight pl-6 text-xl font-medium leading-relaxed text-foreground">A OCTA nasceu de uma necessidade. E não quer perder a capacidade de enxergar a pessoa por trás de cada conversa.</p>
              <p>As preocupações com o bem-estar físico e mental de pessoas comuns fazem parte dessa motivação. Hoje, traduzimos essa origem em atendimento próximo e comunicação responsável sobre reagentes destinados à pesquisa — sem prometer tratamentos ou resultados clínicos.</p>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-card/40">
          <div className="container-x py-14 md:py-20">
            <p className="text-sm font-semibold text-highlight">O que nos move</p>
            <h2 className="mt-3 text-3xl font-bold text-foreground">Proximidade com responsabilidade.</h2>
            <div className="mt-10 grid gap-10 md:grid-cols-3">
              <div>
                <HeartHandshake className="h-7 w-7 text-highlight" aria-hidden="true" />
                <h3 className="mt-5 text-xl font-semibold text-foreground">Pessoas primeiro</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">Ouvir com respeito, acolher dúvidas e manter um atendimento humano. Não esquecer as dificuldades que deram origem à nossa marca.</p>
              </div>
              <div>
                <Search className="h-7 w-7 text-highlight" aria-hidden="true" />
                <h3 className="mt-5 text-xl font-semibold text-foreground">Informação e acesso</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">Facilitar a consulta a produtos e informações de pesquisa, com diálogo direto sobre disponibilidade, custos e documentação.</p>
              </div>
              <div>
                <ShieldCheck className="h-7 w-7 text-highlight" aria-hidden="true" />
                <h3 className="mt-5 text-xl font-semibold text-foreground">Transparência</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">Distinguir estudos de evidências clínicas, respeitar os limites de cada informação e não transformar expectativas em promessas.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="container-x py-14 md:py-20">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-foreground">Pesquisa exige clareza.</h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">Nossa história explica a motivação dos fundadores; ela não é um relato de eficácia ou uma recomendação de uso. Os produtos apresentados pela OCTA Labs são destinados exclusivamente à pesquisa laboratorial, não ao uso humano ou veterinário. Estudos sobre uma substância não significam que ela seja um tratamento aprovado. Questões de saúde física ou mental devem ser discutidas com profissionais habilitados.</p>
          </div>
        </section>

        <section className="border-t border-border">
          <div className="container-x py-14 md:py-16">
            <h2 className="text-3xl font-bold text-foreground">Vamos conversar?</h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">Fale diretamente com a OCTA Labs para consultar produtos e informações comerciais.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg"><a href={octaContact.whatsapp} target="_blank" rel="noreferrer"><MessageCircle />Falar com a OCTA</a></Button>
              <Button asChild size="lg" variant="outline"><a href="/produtos">Ver catálogo<ArrowRight /></a></Button>
            </div>
            <div className="mt-6 flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:gap-6">
              <a href={`mailto:${octaContact.email}`} className="inline-flex items-center gap-2 hover:text-highlight"><Mail className="h-4 w-4" />{octaContact.email}</a>
              <a href={octaContact.phoneHref} className="hover:text-highlight">{octaContact.phone}</a>
            </div>
          </div>
        </section>
      </main>
      <ImportedFooter />
    </>
  );
}