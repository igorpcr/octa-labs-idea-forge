import { z } from "zod";

export const supportHistory = z.object({
  messages: z
    .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().min(1).max(4000) }))
    .min(1)
    .max(80),
});
export const supportAnswer = z.object({
  answer: z.string().min(1).max(4000),
  certain: z.boolean(),
  sources: z.array(z.enum(["shipping", "research", "contact", "checkout"])).max(4),
});
export const supportSources = {
  shipping: {
    label: "Política de Envios",
    href: "/envio",
    text: "Entregas somente no Brasil. Disponibilidade, frete e estimativas dependem do CEP e devem ser confirmados com a equipe antes do pedido. Preparação e transporte são etapas diferentes. Solicitar à equipe confirmação de despacho e rastreamento disponível. Em danos ou divergências, preservar embalagem e falar com a OCTA. Consultar orientação antes de devolver ou reenviar. Não há tarifa, frete grátis ou prazo fixo publicado.",
  },
  research: {
    label: "Pesquisa laboratorial",
    href: "/ferramentas",
    text: "Reagentes destinados exclusivamente à pesquisa laboratorial, não ao uso humano ou veterinário. Ferramentas gratuitas calculam quantidades de laboratório; não fornecem dosagem humana, injeções, tratamentos ou titulação experimental em pessoas.",
  },
  contact: {
    label: "Atendimento OCTA",
    href: "/sobre",
    text: "O atendimento da OCTA é pelo WhatsApp e e-mail exibidos no site. Não há horário de atendimento confirmado. Dados empresariais e endereços não estão publicados.",
  },
  checkout: {
    label: "Carrinho",
    href: "/carrinho",
    text: "O checkout mantém apenas um rascunho temporário. Pagamento Pix online ainda indisponível; não há cobrança real nem confirmação automática. O suporte não tem acesso seguro a pedidos reais de clientes. Consultas de situação específica, rastreamento, pagamento e alterações devem ser encaminhadas à equipe, nunca inferidas do carrinho.",
  },
} as const;
export function requiresHuman(text: string) {
  return /\b(meu|minha|pedido|rastre|pagamento|paguei|reembolso|cancel|atendente|humano|pessoa|cpf|senha|dosagem|dose|injet|tratamento)\w*/i.test(
    text,
  );
}
export function safeSupportAnswer(value: unknown) {
  const parsed = supportAnswer.safeParse(value);
  if (!parsed.success || !parsed.data.certain || parsed.data.sources.length === 0) {
    return {
      answer:
        "Não tenho informação confirmada para responder com segurança. A equipe OCTA pode ajudar pelo WhatsApp.",
      handoff: true,
      sources: [],
    };
  }
  return { answer: parsed.data.answer, handoff: false, sources: parsed.data.sources };
}
