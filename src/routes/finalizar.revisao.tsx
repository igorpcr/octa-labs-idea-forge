import { createFileRoute } from "@tanstack/react-router";
import { ReviewPage } from "@/components/checkout";
import { checkoutHead } from "@/lib/octa-cart";
export const Route = createFileRoute("/finalizar/revisao")({ head: () => checkoutHead("Revisar pedido", "Revise os dados de contato, entrega e produtos OCTA Labs antes da etapa de pagamento."), component: ReviewPage });