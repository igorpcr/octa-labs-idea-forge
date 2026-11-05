import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Box, ClipboardCheck, MapPin, MessageCircle, PackageCheck, Route as RouteIcon, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { octaContact } from "@/lib/octa-contact";
import { ImportedFooter, ImportedHeader } from "./index";
import shippingImage from "@/assets/octa-envios-nacionais.jpg";
import capturedCSS from "../styles/site.css?raw";

export const Route = createFileRoute("/envio")({
  head: () => ({ meta: [
    { title: "Política de Envios Nacionais — OCTA Labs" },
    { name: "description", content: "Consulte informações sobre frete, prazos, acompanhamento e recebimento de pedidos nacionais da OCTA Labs. Atendimento direto para entregas no Brasil." },
    { property: "og:title", content: "Política de Envios Nacionais — OCTA Labs" },
    { property: "og:description", content: "Clareza em cada etapa do pedido: condições de envio, acompanhamento e suporte para entregas no Brasil." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  staticData: { importedDocument: { html: { lang: "pt-BR" } } },
  component: ShippingPolicy,
});

const steps = [
  { icon: MapPin, title: "Destino", text: "Informe seu CEP para consultar a disponibilidade de entrega e as condições para sua região." },
  { icon: ClipboardCheck, title: "Confirmação", text: "Confira os produtos, os dados de entrega, o frete e a previsão informada antes de concluir o pedido." },
  { icon: Box, title: "Preparação", text: "Consulte a equipe sobre a separação do pedido e os cuidados de transporte indicados para cada reagente." },
  { icon: PackageCheck, title: "Recebimento", text: "Acompanhe a entrega e confira a embalagem e os itens recebidos. Em caso de divergência, fale com a OCTA." },
];

const sections = [
  { id: "cobertura", title: "Entregas em território nacional", paragraphs: [
    "Esta política trata exclusivamente de pedidos com destino no Brasil. A disponibilidade de entrega deve ser consultada com a OCTA Labs conforme o CEP e as características do pedido.",
    "Antes de concluir a compra, informe os dados necessários à entrega: nome do destinatário, CEP, endereço completo, complemento quando houver e um telefone para contato. Confira essas informações para evitar dificuldades no recebimento.",
  ] },
  { id: "frete", title: "Frete e condições do pedido", paragraphs: [
    "Solicite a cotação de envio à nossa equipe. O valor do frete e as opções disponíveis devem ser confirmados para o seu destino antes da conclusão do pedido.",
    "Não há nesta página uma tarifa única ou uma promessa de frete gratuito. Considere as condições apresentadas no atendimento para o seu pedido específico.",
  ] },
  { id: "prazos", title: "Preparação e prazo de entrega", paragraphs: [
    "O tempo de preparação do pedido e a estimativa de transporte são etapas diferentes. Consulte ambos com a equipe, considerando a disponibilidade dos itens, a confirmação do pedido e a modalidade de envio.",
    "A previsão de entrega depende do destino e das condições de transporte. Feriados, restrições locais ou ocorrências no trajeto podem afetar essa estimativa. Se houver atraso em relação à previsão recebida, entre em contato para verificar a situação.",
  ] },
  { id: "acompanhamento", title: "Acompanhamento do envio", paragraphs: [
    "Peça à equipe a confirmação do despacho e as informações de acompanhamento disponíveis para a modalidade contratada. Quando houver código de rastreamento, consulte as atualizações no canal indicado.",
    "Se o acompanhamento não apresentar novas informações ou indicar uma ocorrência, envie os dados do pedido à OCTA para solicitar orientação.",
  ] },
  { id: "recebimento", title: "Cuidados ao receber", paragraphs: [
    "Observe as condições externas da embalagem e confira os itens recebidos em relação ao pedido. Consulte as orientações específicas de conservação do reagente; não presuma que todos os produtos tenham as mesmas condições de armazenamento.",
    "Em caso de embalagem danificada, item divergente ou ausência de produto, registre o ocorrido, preserve a embalagem e entre em contato com a OCTA. Fotografias da embalagem e dos itens ajudam a esclarecer a situação, sem substituir seus direitos legais.",
  ] },
  { id: "ocorrencias", title: "Ocorrências e suporte", paragraphs: [
    "Entrega não localizada, tentativa de entrega sem sucesso ou necessidade de correção de dados devem ser comunicadas à equipe. A análise considera as informações do pedido e do transporte, sem atribuir automaticamente a responsabilidade ao destinatário.",
    "Se houver necessidade de devolução ou reenvio, solicite as orientações antes de encaminhar qualquer volume. Esta política não limita os direitos previstos na legislação aplicável.",
  ] },
];

function ShippingPolicy() {
  return <>
    <style>{capturedCSS}</style>
    <ImportedHeader />
    <main>
      <section className="relative isolate overflow-hidden border-b border-border">
        <img src={shippingImage} width={1536} height={1024} alt="Ilustração de embalagem preta com frascos prateados protegidos para transporte" className="absolute inset-0 -z-20 h-full w-full object-cover object-right opacity-30 sm:opacity-60" />
        <div className="absolute inset-0 -z-10 bg-background/40" />
        <div className="container-x py-14 md:py-20">
          <p className="mb-4 flex items-center gap-2 text-sm font-semibold text-highlight"><Truck className="h-4 w-4" aria-hidden="true" />Entregas no Brasil</p>
          <h1 className="max-w-xl font-display text-4xl font-bold leading-tight text-foreground md:text-5xl">Política de Envios<br /><span className="text-highlight">OCTA Labs</span></h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-foreground">Clareza do primeiro contato ao recebimento.</p>
          <p className="mt-3 max-w-lg leading-relaxed text-muted-foreground">Consulte as condições do seu pedido, acompanhe cada etapa e conte com um canal direto para esclarecer dúvidas sobre a entrega.</p>
          <Button asChild size="lg" className="mt-7"><a href={octaContact.whatsapp} target="_blank" rel="noreferrer"><MessageCircle />Consultar envio</a></Button>
        </div>
      </section>

      <section className="border-b border-border" aria-labelledby="etapas">
        <div className="container-x py-12 md:py-14">
          <p className="text-sm font-semibold text-highlight">Do pedido à entrega</p>
          <h2 id="etapas" className="mt-3 text-2xl font-bold text-foreground">Cada etapa, uma informação importante.</h2>
          <ol className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(({ icon: Icon, title, text }, index) => <li key={title} className="border-t border-border pt-5">
              <div className="flex items-center justify-between"><Icon className="h-6 w-6 text-highlight" aria-hidden="true" /><span className="font-mono text-xs text-silver">0{index + 1}</span></div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </li>)}
          </ol>
        </div>
      </section>

      <div className="container-x grid gap-10 py-12 md:py-16 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16">
        <nav aria-label="Nesta política" className="self-start lg:sticky lg:top-28">
          <p className="flex items-center gap-2 text-sm font-semibold text-foreground"><RouteIcon className="h-4 w-4 text-highlight" aria-hidden="true" />Nesta política</p>
          <ul className="mt-4 space-y-3 border-l border-border pl-4">
            {sections.map(({ id, title }) => <li key={id}><a href={`#${id}`} className="text-sm leading-relaxed text-muted-foreground transition-colors hover:text-highlight">{title}</a></li>)}
          </ul>
        </nav>
        <div className="min-w-0">
          {sections.map(({ id, title, paragraphs }, index) => <section key={id} id={id} className="scroll-mt-28 border-b border-border pb-8 pt-8 first:pt-0 last:border-b-0">
            <p className="mb-3 font-mono text-xs text-highlight">0{index + 1}</p>
            <h2 className="text-2xl font-bold leading-tight text-foreground">{title}</h2>
            {paragraphs.map(text => <p key={text} className="mt-4 leading-relaxed text-muted-foreground">{text}</p>)}
          </section>)}
          <p className="mt-6 border-l-2 border-highlight pl-4 text-sm leading-relaxed text-muted-foreground">Os produtos OCTA Labs são destinados exclusivamente à pesquisa laboratorial, não ao uso humano ou veterinário.</p>
        </div>
      </div>

      <section className="border-t border-border bg-card/40">
        <div className="container-x py-12 md:py-16">
          <p className="text-sm font-semibold text-highlight">Atendimento OCTA</p>
          <h2 className="mt-3 text-3xl font-bold text-foreground">Dúvidas sobre sua entrega?</h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">Tenha em mãos os dados do pedido e, para consultar o frete, o CEP de destino. Nossa equipe é seu ponto de contato para informações de envio.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="lg"><a href={octaContact.whatsapp} target="_blank" rel="noreferrer"><MessageCircle />Falar com a OCTA</a></Button>
            <Button asChild size="lg" variant="outline"><a href="/produtos">Ver catálogo<ArrowRight /></a></Button>
          </div>
          <div className="mt-6 flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:gap-6">
            <a href={`mailto:${octaContact.email}`} className="hover:text-highlight">{octaContact.email}</a>
            <a href={octaContact.phoneHref} className="hover:text-highlight">{octaContact.phone}</a>
          </div>
        </div>
      </section>
    </main>
    <ImportedFooter />
  </>;
}