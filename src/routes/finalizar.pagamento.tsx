import { createFileRoute } from "@tanstack/react-router";
import { PaymentPage } from "@/components/checkout";
import { checkoutHead } from "@/lib/octa-cart";
export const Route = createFileRoute("/finalizar/pagamento")({ head: () => checkoutHead("Pagamento", "Etapa final do pedido OCTA Labs, aguardando a integração com o sistema de pagamentos."), component: PaymentPage });