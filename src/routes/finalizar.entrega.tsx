import { createFileRoute } from "@tanstack/react-router";
import { DeliveryPage } from "@/components/checkout";
import { checkoutHead } from "@/lib/octa-cart";
export const Route = createFileRoute("/finalizar/entrega")({ head: () => checkoutHead("Dados e entrega", "Informe seus dados e o endereço nacional de entrega do pedido OCTA Labs."), component: DeliveryPage });