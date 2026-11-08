import { createFileRoute } from "@tanstack/react-router";
import { PaymentPage } from "@/components/checkout";
import { checkoutHead } from "@/lib/octa-cart";
export const Route = createFileRoute("/finalizar/pagamento")({ head: () => checkoutHead("Pagamento Pix", "Etapa de pagamento Pix do pedido OCTA Labs. BlackPix em preparação, sem cobranças disponíveis."), component: PaymentPage });