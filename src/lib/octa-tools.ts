export const tools = [
  { id: "concentracao", path: "/ferramentas/concentracao", title: "Concentração de Soluções", description: "Relação entre massa e volume em uma solução de pesquisa.", icon: "flask" },
  { id: "diluicao", path: "/ferramentas/diluicao", title: "Diluição de Bancada", description: "Volumes para diluição a partir de uma solução de concentração conhecida.", icon: "droplet" },
  { id: "conversor", path: "/ferramentas/conversor", title: "Conversor de Medidas", description: "Conversão entre miligramas, microgramas e gramas.", icon: "arrows" },
  { id: "rendimento", path: "/ferramentas/rendimento", title: "Rendimento e Custo", description: "Número de alíquotas e custo de reagentes por ensaio.", icon: "calculator" },
  { id: "cronograma", path: "/ferramentas/cronograma", title: "Agenda de Pesquisa", description: "Datas de ensaios recorrentes para organizar atividades de bancada.", icon: "calendar" },
  { id: "amostra", path: "/ferramentas/amostra", title: "Proporção por Amostra", description: "Massa de reagente a partir da massa de uma amostra laboratorial.", icon: "scale" },
] as const;

export type ToolId = typeof tools[number]["id"];
export type ToolValues = Record<string, string>;
export type ToolResult = { label: string; value: string }[];

export function parsePositive(raw: string, label: string): number {
  const value = Number(raw.trim().replace(",", "."));
  if (!raw.trim() || !Number.isFinite(value) || value <= 0) throw new Error(`${label}: informe um número maior que zero.`);
  return value;
}

const format = (value: number) => value.toLocaleString("pt-BR", { maximumSignificantDigits: 8 });

export function calculateTool(id: ToolId, values: ToolValues): ToolResult {
  const n = (key: string, label: string) => parsePositive(values[key] ?? "", label);
  if (id === "concentracao") {
    const mass = n("mass", "Massa"), volume = n("volume", "Volume");
    const concentration = mass / volume;
    if (!Number.isFinite(concentration) || concentration === 0) throw new Error("Valores fora da faixa de cálculo.");
    return [{ label: "Concentração", value: `${format(concentration)} mg/mL` }, { label: "Equivalente", value: `${format(concentration * 1000)} µg/mL` }];
  }
  if (id === "diluicao") {
    const initial = n("initial", "Concentração inicial"), target = n("target", "Concentração final"), finalVolume = n("volume", "Volume final");
    if (target > initial) throw new Error("A concentração final não pode superar a inicial em uma diluição.");
    const stock = target * finalVolume / initial;
    return [{ label: "Solução inicial", value: `${format(stock)} mL` }, { label: "Diluente", value: `${format(finalVolume - stock)} mL` }, { label: "Volume final", value: `${format(finalVolume)} mL` }];
  }
  if (id === "conversor") {
    const amount = n("amount", "Valor");
    const unit = values.unit;
    if (unit !== "mg" && unit !== "mcg" && unit !== "g") throw new Error("Selecione uma unidade de massa válida.");
    const mg = amount * (unit === "g" ? 1000 : unit === "mcg" ? 0.001 : 1);
    return [{ label: "Miligramas", value: `${format(mg)} mg` }, { label: "Microgramas", value: `${format(mg * 1000)} µg` }, { label: "Gramas", value: `${format(mg / 1000)} g` }];
  }
  if (id === "rendimento") {
    const total = n("mass", "Massa disponível"), aliquot = n("aliquot", "Massa por ensaio"), cost = n("cost", "Custo do reagente");
    const count = Math.floor(total / aliquot);
    return [{ label: "Ensaios completos", value: String(count) }, { label: "Massa restante", value: `${format(Math.max(0, total - count * aliquot))} mg` }, { label: "Custo proporcional por ensaio", value: (cost * aliquot / total).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) }];
  }
  if (id === "amostra") {
    const sample = n("sample", "Massa da amostra"), ratio = n("ratio", "Proporção");
    return [{ label: "Massa calculada de reagente", value: `${format(sample * ratio)} mg` }, { label: "Equivalente", value: `${format(sample * ratio * 1000)} µg` }];
  }
  const date = values.start ?? "";
  const count = n("count", "Quantidade de ensaios"), interval = n("interval", "Intervalo");
  if (!Number.isInteger(count) || count > 100 || !Number.isInteger(interval) || interval > 365) throw new Error("Use entre 1 e 100 ensaios e um intervalo inteiro de 1 a 365 dias.");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error("Informe uma data inicial válida.");
  const start = new Date(`${date}T12:00:00Z`);
  if (!Number.isFinite(start.getTime()) || start.toISOString().slice(0, 10) !== date) throw new Error("Informe uma data inicial válida.");
  return Array.from({ length: count }, (_, i) => {
    const day = new Date(start.getTime() + i * interval * 86400000);
    return { label: `Ensaio ${i + 1}`, value: day.toLocaleDateString("pt-BR", { timeZone: "UTC" }) };
  });
}

export function toolHead(id: ToolId) {
  const tool = tools.find(item => item.id === id);
  const title = `${tool?.title ?? "Ferramentas Grátis"} — OCTA Labs`;
  const description = tool?.description ?? "Ferramentas gratuitas OCTA Labs para pesquisa laboratorial.";
  return { meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] };
}