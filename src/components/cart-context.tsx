import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addCartItem, emptyDelivery, parseBRL, type CartItem, type Delivery } from "@/lib/octa-cart";

export type SelectedShipping = { serviceId: number; name: string; carrier: string; priceCents: number; deliveryDays: number; destinationCep: string };
type CartContextValue = { selectedShipping: SelectedShipping | null; setSelectedShipping: (value: SelectedShipping | null) => void; items: CartItem[]; setQuantity: (id: string, quantity: number) => void; delivery: Delivery; setDelivery: (value: Delivery) => void; ready: boolean };
const CartContext = createContext<CartContextValue | null>(null);
export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("CartProvider is required");
  return context;
}
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [delivery, setDeliveryState] = useState<Delivery>(emptyDelivery);
  const [selectedShipping, setSelectedShipping] = useState<SelectedShipping | null>(null);
  const setDelivery = (value: Delivery) => { if (value.cep.replace(/\\D/g, "") !== delivery.cep.replace(/\\D/g, "")) setSelectedShipping(null); setDeliveryState(value); };
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    try {
      const saved: unknown = JSON.parse(sessionStorage.getItem("octa-draft-cart") || "[]");
      if (Array.isArray(saved)) setItems(saved.filter((i): i is CartItem => i && typeof i.id === "string" && typeof i.name === "string" && typeof i.image === "string" && Number.isSafeInteger(i.pixCents) && i.pixCents > 0 && Number.isSafeInteger(i.quantity) && i.quantity > 0));
    } catch { /* A malformed draft starts empty. */ }
    setReady(true);
  }, []);
  useEffect(() => { if (ready) { try { sessionStorage.setItem("octa-draft-cart", JSON.stringify(items)); } catch { /* Cart still works in memory. */ } } }, [items, ready]);
  useEffect(() => {
    const purchase = (event: MouseEvent) => {
      if (!(event.target instanceof Element) || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
      const anchor = event.target.closest<HTMLAnchorElement>("main a");
      if (!anchor) return;
      const card = anchor.matches(".card-surface") && anchor.querySelector("h3") && anchor.querySelector(".mt-auto");
      const cardBuy = card && (event.target.closest(".mt-auto") || anchor.href.includes("wa.me"));
      const detailBuy = !card && anchor.textContent?.trim().startsWith("Comprar ") && anchor.href.includes("wa.me");
      if (!cardBuy && !detailBuy) return;
      const scope = card ? anchor : document.querySelector("main");
      const name = scope?.querySelector(card ? "h3" : "h1")?.textContent?.trim();
      const image = scope?.querySelector<HTMLImageElement>(card ? "img" : ".product-bg img")?.getAttribute("src");
      const price = scope?.querySelector(card ? "p.font-display" : "p.text-4xl.text-success")?.textContent;
      const pixCents = parseBRL(price || "");
      if (!name || !image || !pixCents) return;
      event.preventDefault();
      event.stopPropagation();
      setItems(current => addCartItem(current, { id: name, name, image, pixCents }));
      setSelectedShipping(null);
      void navigate({ to: "/carrinho" });
    };
    document.addEventListener("click", purchase, true);
    return () => document.removeEventListener("click", purchase, true);
  }, [navigate]);
  return <CartContext.Provider value={{ items, delivery, setDelivery, selectedShipping, setSelectedShipping, ready, setQuantity: (id, quantity) => { setSelectedShipping(null); setItems(current => quantity <= 0 ? current.filter(i => i.id !== id) : current.map(i => i.id === id ? { ...i, quantity: Math.floor(quantity) } : i)); } }}>{children}</CartContext.Provider>;
}
export function CartLink() {
  const { items } = useCart();
  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  return <Button asChild variant="ghost" size="icon" className="relative ml-auto shrink-0 lg:ml-0"><Link to="/carrinho" aria-label={`Carrinho, ${count} itens`} title="Carrinho"><ShoppingBag />{count > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-highlight px-1 text-xs text-background">{count}</span>}</Link></Button>;
}