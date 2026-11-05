import { describe, expect, it } from "vitest";
import { addCartItem, parseBRL, subtotal, emptyDelivery, validDelivery } from "./octa-cart";
describe("Cart draft calculations", () => {
  it("keeps the existing Tirzepatida 60mg PIX price in integer cents", () => expect(parseBRL("R$ 902,50 no PIX")).toBe(90250));
  it("adds quantities without duplicating a product and recalculates subtotal", () => {
    const item = { id: "tirzepatida-60mg", name: "Tirzepatida 60mg", image: "", pixCents: 90250 };
    const items = addCartItem(addCartItem([], item), item);
    expect(items).toHaveLength(1);
    expect(items[0]?.quantity).toBe(2);
    expect(subtotal(items)).toBe(180500);
  });
  it("requires a complete national delivery address", () => {
    const address = { ...emptyDelivery, name: "Teste", email: "teste@example.com", phone: "11999999999", cep: "01001-000", street: "Praça", number: "1", district: "Sé", city: "São Paulo", state: "SP" };
    expect(validDelivery(address)).toBeTruthy();
    expect(validDelivery({ ...address, cep: "0100" })).toBeFalsy();
    expect(validDelivery({ ...address, street: "" })).toBeFalsy();
  });
});