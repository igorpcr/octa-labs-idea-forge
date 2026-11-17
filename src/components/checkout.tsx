import { useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CreditCard, LockKeyhole, MapPin, MessageCircle, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/components/cart-context";
import { money, subtotal, validDelivery, type Delivery } from "@/lib/octa-cart";
import { octaContact } from "@/lib/octa-contact";
import { ImportedHeader, ImportedFooter } from "@/routes/index";
import capturedCSS from "@/styles/site.css?raw";

const stages = [{ title: "Carrinho", path: "/carrinho" }, { title: "Entrega", path: "/finalizar/entrega" }, { title: "Revisão", path: "/finalizar/revisao" }, { title: "Pagamento", path: "/finalizar/pagamento" }] as const;
export function CheckoutShell({ step, title, children }: { step: number; title: string; children: ReactNode }) {
  const { items, ready } = useCart();
  return <><style>{capturedCSS}</style><ImportedHeader /><main className="container-x py-8 md:py-12">
    <p className="text-sm font-semibold text-highlight">OCTA Labs · Seu pedido</p>
    <h1 className="mt-3 font-display text-3xl font-bold text-foreground md:text-4xl">{title}</h1>
    <ol aria-label="Etapas da compra" className="mt-8 grid grid-cols-4 border-b border-border pb-6">
      {stages.map((stage, index) => <li key={stage.path} className="flex flex-col items-center gap-2 text-xs sm:text-sm"><span className={`grid h-8 w-8 place-items-center rounded-full border ${index === step ? "border-highlight bg-highlight-soft text-highlight" : "border-border text-muted-foreground"}`}>{index + 1}</span>{index < step ? <Link to={stage.path} className="text-highlight">{stage.title}</Link> : <span aria-current={index === step ? "step" : undefined} className={index === step ? "text-foreground" : "text-muted-foreground"}>{stage.title}</span>}</li>)}
    </ol>
    {!ready ? <p className="py-16 text-muted-foreground">Carregando carrinho…</p> : items.length === 0 ? <div className="py-20 text-center"><ShoppingBag className="mx-auto h-12 w-12 text-highlight" /><h2 className="mt-6 text-2xl font-semibold">Seu carrinho está vazio</h2><Button asChild className="mt-6"><Link to="/produtos">Ver catálogo<ArrowRight /></Link></Button></div> : <div className="grid gap-10 py-8 lg:grid-cols-[minmax(0,1fr)_340px]"><div className="min-w-0">{children}</div><Summary /></div>}
  </main><ImportedFooter /></>;
}
function Summary() {
  const { items, selectedShipping, delivery } = useCart();
  const shipping = selectedShipping && selectedShipping.destinationCep === delivery.cep.replace(/\D/g, "") ? selectedShipping : null;
  return <aside className="self-start border-t border-border pt-6 lg:sticky lg:top-28"><h2 className="text-xl font-semibold">Resumo do pedido</h2><ul className="mt-5 space-y-4">{items.map(item => <li key={item.id} className="flex gap-3"><img src={item.image} alt={item.name} width={56} height={56} className="h-14 w-14 rounded-md object-cover" /><div className="min-w-0 flex-1"><p className="text-sm font-medium">{item.name}</p><p className="mt-1 text-xs text-muted-foreground">{item.quantity} × {money(item.pixCents)}</p></div><span className="text-sm">{money(item.pixCents * item.quantity)}</span></li>)}</ul><dl className="mt-6 space-y-3 border-t border-border pt-5"><div className="flex justify-between gap-4"><dt>Subtotal de referência</dt><dd>{money(subtotal(items))}</dd></div><div className="flex justify-between gap-4 text-sm text-muted-foreground"><dt>Frete</dt><dd>{shipping ? money(shipping.priceCents) : "A confirmar"}</dd></div><div className="flex justify-between gap-4 border-t border-border pt-4 font-semibold"><dt>{shipping ? "Total estimado" : "Total dos produtos"}</dt><dd className="text-highlight">{money(subtotal(items) + (shipping?.priceCents ?? 0))}</dd></div></dl><p className="mt-4 text-xs leading-relaxed text-muted-foreground">Valores exibidos no catálogo. Frete e condições finais ainda sujeitos à confirmação; nenhuma cobrança nesta etapa.</p></aside>;
}
export function CartPage() {
  const { items, setQuantity } = useCart();
  return <CheckoutShell step={0} title="Seu carrinho"><h2 className="text-xl font-semibold">Produtos selecionados</h2><ul className="mt-4 divide-y divide-border">{items.map(item => <li key={item.id} className="flex gap-4 py-6"><img src={item.image} alt={item.name} width={88} height={88} className="h-20 w-20 shrink-0 rounded-md object-cover sm:h-24 sm:w-24" /><div className="min-w-0 flex-1"><h3 className="font-semibold">{item.name}</h3><p className="mt-2 text-sm text-muted-foreground">{money(item.pixCents)} (valor demonstrativo)</p><div className="mt-4 flex items-center gap-3"><Button size="icon" variant="outline" aria-label={`Diminuir ${item.name}`} onClick={() => setQuantity(item.id, item.quantity - 1)}><Minus /></Button><span className="w-8 text-center" aria-label={`Quantidade de ${item.name}`}>{item.quantity}</span><Button size="icon" variant="outline" aria-label={`Aumentar ${item.name}`} onClick={() => setQuantity(item.id, item.quantity + 1)}><Plus /></Button><Button size="icon" variant="ghost" aria-label={`Remover ${item.name}`} onClick={() => setQuantity(item.id, 0)}><Trash2 /></Button></div></div></li>)}</ul><div className="mt-6 flex flex-wrap gap-3"><Button asChild size="lg"><Link to="/finalizar/entrega">Revisar simulação<ArrowRight /></Link></Button><Button asChild variant="outline"><Link to="/produtos"><ArrowLeft />Continuar comprando</Link></Button></div></CheckoutShell>;
}
const fields: { key: keyof Delivery; label: string; type?: string; autoComplete?: string; optional?: boolean }[] = [
  { key: "name", label: "Nome completo", autoComplete: "name" }, { key: "email", label: "E-mail", type: "email", autoComplete: "email" }, { key: "phone", label: "Telefone", type: "tel", autoComplete: "tel" }, { key: "cep", label: "CEP", autoComplete: "postal-code" }, { key: "street", label: "Rua / Avenida", autoComplete: "address-line1" }, { key: "number", label: "Número" }, { key: "complement", label: "Complemento", optional: true, autoComplete: "address-line2" }, { key: "district", label: "Bairro" }, { key: "city", label: "Cidade", autoComplete: "address-level2" }, { key: "state", label: "Estado (UF)", autoComplete: "address-level1" },
];
export function DeliveryPage() {
  const { delivery, setDelivery, selectedShipping, setSelectedShipping } = useCart();
  const [form, setForm] = useState(delivery);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [rates, setRates] = useState<{ serviceId: number; name: string; carrier: string; priceCents: number; deliveryDays: number }[]>([]);
  const [shippingLoading, setShippingLoading] = useState(false);
  const { items } = useCart();
  const navigate = useNavigate();
  async function calculateShipping() {
    setShippingLoading(true); setError(""); setRates([]); setSelectedShipping(null);
    try {
      const response = await fetch("/api/public/superfrete-quote", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ destinationCep: form.cep, items: items.map(item => ({ id: item.id, quantity: item.quantity })) }) });
      if (!response.ok) throw new Error("shipping_unavailable");
      const result = await response.json();
      setRates(Array.isArray(result.rates) ? result.rates : []);
    } catch { setError("Cotação indisponível para este pedido. Consulte a OCTA para confirmar o envio."); }
    finally { setShippingLoading(false); }
  }
  async function lookup() {
    const cep = form.cep.replace(/\D/g, "");
    if (cep.length !== 8) { setError("Informe um CEP com 8 dígitos."); return; }
    setLoading(true); setError("");
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      if (!response.ok) throw new Error();
      const data = await response.json();
      if (data.erro) { setError("CEP não encontrado. Confira o número informado."); return; }
      setForm(current => ({ ...current, street: data.logradouro || "", district: data.bairro || "", city: data.localidade || "", state: data.uf || "" }));
    } catch { setError("Não foi possível consultar o CEP. Preencha o endereço manualmente."); }
    finally { setLoading(false); }
  }
  return <CheckoutShell step={1} title="Dados e entrega"><h2 className="flex items-center gap-2 text-xl font-semibold"><MapPin className="text-highlight" />Endereço no Brasil</h2><form className="mt-6" onSubmit={event => { event.preventDefault(); if (!validDelivery(form)) { setError("Confira os dados, o CEP e o endereço completo."); return; } setDelivery(form); void navigate({ to: "/finalizar/revisao" }); }}><div className="grid gap-5 sm:grid-cols-2">{fields.map(field => <label key={field.key} className="block text-sm font-medium" htmlFor={field.key}>{field.label}{field.optional ? " (opcional)" : ""}<Input id={field.key} className="mt-2" type={field.type || "text"} autoComplete={field.autoComplete} required={!field.optional} value={form[field.key]} maxLength={field.key === "state" ? 2 : field.key === "cep" ? 9 : undefined} onChange={event => { const value = event.target.value; setForm(current => ({ ...current, [field.key]: field.key === "state" ? value.toUpperCase() : value })); if (field.key === "cep") { setRates([]); setSelectedShipping(null); } }} />{field.key === "cep" && <Button type="button" variant="link" className="mt-1 px-0" disabled={loading} onClick={lookup}>{loading ? "Consultando…" : "Buscar endereço pelo CEP"}</Button>}</label>)}</div>{error && <p role="alert" className="mt-4 text-sm text-warning-foreground">{error}</p>}<section className="mt-6 border-t border-border pt-5"><h3 className="font-semibold">Consultar opções de frete</h3><p className="mt-2 text-sm text-muted-foreground">Cotação informativa. A modalidade e o valor final ainda precisam ser confirmados antes do pagamento.</p><Button type="button" variant="outline" className="mt-3" disabled={shippingLoading || !/^[0-9]{5}-?[0-9]{3}$/.test(form.cep)} onClick={() => void calculateShipping()}>{shippingLoading ? "Consultando…" : "Calcular frete"}</Button>{rates.length > 0 && <ul className="mt-4 space-y-3">{rates.map(rate => <li key={rate.serviceId} className="rounded-md border border-border p-3"><label className="flex items-center gap-2"><input type="radio" name="shipping" checked={selectedShipping?.serviceId === rate.serviceId && selectedShipping.destinationCep === form.cep.replace(/\D/g, "")} onChange={() => setSelectedShipping({ ...rate, destinationCep: form.cep.replace(/\D/g, "") })} /><span className="font-medium">{rate.carrier} · {rate.name}</span></label><span className="ml-3 text-highlight">{money(rate.priceCents)}</span><p className="text-xs text-muted-foreground">Prazo estimado: {rate.deliveryDays} dias. Selecione para usar na estimativa de revisão.</p></li>)}</ul>}</section><div className="mt-6 flex flex-wrap gap-3"><Button type="submit" size="lg">Revisar pedido<ArrowRight /></Button><Button asChild variant="outline"><Link to="/carrinho"><ArrowLeft />Voltar</Link></Button></div></form></CheckoutShell>;
}
export function ReviewPage() {
  const { delivery, selectedShipping } = useCart();
  return <CheckoutShell step={2} title="Revisar pedido">{!validDelivery(delivery) ? <><p className="text-muted-foreground">Preencha os dados de entrega antes de continuar.</p><Button asChild className="mt-6"><Link to="/finalizar/entrega">Informar endereço<ArrowRight /></Link></Button></> : <><section className="border-b border-border pb-6"><div className="flex items-center justify-between gap-4"><h2 className="text-xl font-semibold">Dados de contato</h2><Button asChild variant="link"><Link to="/finalizar/entrega">Editar</Link></Button></div><p className="mt-4">{delivery.name}</p><p className="mt-2 break-all text-muted-foreground">{delivery.email}</p><p className="mt-2 text-muted-foreground">{delivery.phone}</p></section><section className="py-6"><h2 className="text-xl font-semibold">Endereço de entrega</h2><p className="mt-4 leading-relaxed text-muted-foreground">{delivery.street}, {delivery.number}{delivery.complement && ` · ${delivery.complement}`}<br />{delivery.district} · {delivery.city} / {delivery.state}<br />CEP {delivery.cep}</p><p className="mt-5 text-sm text-muted-foreground">{selectedShipping && selectedShipping.destinationCep === delivery.cep.replace(/\D/g, "") ? `${selectedShipping.carrier} · ${selectedShipping.name} · ${money(selectedShipping.priceCents)} · prazo estimado ${selectedShipping.deliveryDays} dias. Cotação informativa, não contratação de transporte.` : "Frete não selecionado. Volte à entrega para consultar uma modalidade elegível."}</p></section><Button asChild size="lg"><Link to="/finalizar/pagamento">Ver simulação sem pagamento<ArrowRight /></Link></Button></>}</CheckoutShell>;
}
export function PaymentPage() {
  const { delivery, items } = useCart();
  const [busy, setBusy] = useState(false);
  const [order, setOrder] = useState<{ id: string; totalCents: number } | null>(null);
  const [submitError, setSubmitError] = useState("");
  const [requestKey] = useState(() => crypto.randomUUID());
  async function createSimulatedOrder() {
    if (!validDelivery(delivery) || !items.length || busy) return;
    setBusy(true); setSubmitError("");
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) { setSubmitError("Entre na sua conta para registrar a simulação."); return; }
      const { data, error } = await supabase.functions.invoke("octa-sim-multi-checkout", {
        body: { idempotencyKey: requestKey, destinationCep: delivery.cep.replace(/\\D/g, ""), items: items.map(i => ({ sku: i.id, quantity: i.quantity })) },
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      if (error || !data || typeof data.orderId !== "string" || !Number.isSafeInteger(data.totalCents)) {
        setSubmitError("Não foi possível registrar a simulação. Confira a disponibilidade dos SKUs no servidor."); return;
      }
      setOrder({ id: data.orderId, totalCents: data.totalCents });
    } catch { setSubmitError("Serviço de homologação indisponível. Nenhuma cobrança foi criada."); }
    finally { setBusy(false); }
  }
  return <CheckoutShell step={3} title="Pagamento">{!validDelivery(delivery) ? <><p>Confirme os dados de entrega primeiro.</p><Button asChild className="mt-5"><Link to="/finalizar/entrega">Informar endereço</Link></Button></> : <><LockKeyhole className="h-10 w-10 text-highlight" /><h2 className="mt-5 text-2xl font-semibold">Pagamentos desativados — ambiente de teste</h2><p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">Este é um fluxo de revisão do catálogo. Nenhum pedido real será registrado e nenhuma cobrança será gerada. A integração transacional com o catálogo autorizado será habilitada somente após homologação.</p><div className="mt-7 flex items-center gap-3 border-y border-border py-5"><CreditCard className="text-silver" /><div><p className="font-medium">Pix · Desativado</p><p className="mt-1 text-sm text-muted-foreground">Aguardando liberação para pagamentos.</p></div></div><Button disabled size="lg" className="mt-7 w-full sm:w-auto"><LockKeyhole />Gerar Pix</Button><div className="mt-5 rounded-lg border p-4"><h3 className="font-semibold">Pedido de simulação</h3><p className="mt-2 text-sm text-muted-foreground">O registro depende de SKUs autorizados no servidor. A documentação ficará pendente de revisão manual; não há pagamento ou envio automático.</p>{submitError && <p role="alert" className="mt-2 text-sm text-destructive">{submitError}</p>}{order ? <p className="mt-3 text-sm">Simulação registrada: <strong>{order.id}</strong> · Total {money(order.totalCents)} · Documentação pendente.</p> : <Button type="button" variant="outline" className="mt-3" disabled={busy} onClick={() => void createSimulatedOrder()}>{busy ? "Registrando…" : "Registrar pedido simulado"}</Button>}</div><div className="mt-5 flex flex-wrap gap-3"><Button asChild variant="outline"><Link to="/finalizar/revisao"><ArrowLeft />Voltar à revisão</Link></Button><Button asChild variant="outline"><a href={octaContact.whatsapp} target="_blank" rel="noreferrer"><MessageCircle />Consultar a OCTA</a></Button></div></>}</CheckoutShell>;
}