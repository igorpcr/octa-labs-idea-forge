import { createFileRoute } from "@tanstack/react-router";
import { CartPage } from "@/components/checkout";
import { checkoutHead } from "@/lib/octa-cart";
export const Route = createFileRoute("/carrinho")({ head: () => checkoutHead("Seu carrinho", "Confira os produtos selecionados e o resumo do pedido OCTA Labs."), component: CartPage });