export type CartItem = { id: string; name: string; image: string; pixCents: number; quantity: number };
export type Delivery = { name: string; email: string; phone: string; cep: string; street: string; number: string; complement: string; district: string; city: string; state: string };
export const emptyDelivery: Delivery = { name: "", email: "", phone: "", cep: "", street: "", number: "", complement: "", district: "", city: "", state: "" };
export const money = (cents: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(cents / 100);
export function parseBRL(text: string) {
  const value = text.match(/R\$\s*([\d.]+,\d{2})/);
  return value?.[1] ? Number(value[1].replaceAll(".", "").replace(",", "")) : null;
}
export const subtotal = (items: CartItem[]) => items.reduce((sum, item) => sum + item.pixCents * item.quantity, 0);
export function addCartItem(items: CartItem[], item: Omit<CartItem, "quantity">): CartItem[] {
  return items.some(i => i.id === item.id) ? items.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i) : [...items, { ...item, quantity: 1 }];
}
export function validDelivery(value: Delivery) {
  return /^\d{8}$/.test(value.cep.replace(/\D/g, "")) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email) && value.phone.replace(/\D/g, "").length >= 10 && [value.name, value.street, value.number, value.district, value.city, value.state].every(v => v.trim());
}
export function checkoutHead(title: string, description: string) {
  return { meta: [{ title: `${title} — OCTA Labs` }, { name: "description", content: description }, { property: "og:title", content: `${title} — OCTA Labs` }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }, { name: "robots", content: "noindex, nofollow" }] };
}