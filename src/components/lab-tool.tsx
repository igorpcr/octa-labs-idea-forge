import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Calculator, Copy, Download, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { calculateTool, tools, type ToolId, type ToolValues, type ToolResult } from "@/lib/octa-tools";
import { ImportedHeader, ImportedFooter } from "@/routes/index";
import capturedCSS from "@/styles/site.css?raw";

type Field = { key: string; label: string; placeholder?: string; type?: string };
const fields: Record<ToolId, Field[]> = {
  concentracao: [{ key: "mass", label: "Massa do reagente (mg)", placeholder: "Ex.: 10" }, { key: "volume", label: "Volume final da solução (mL)", placeholder: "Ex.: 2" }],
  diluicao: [{ key: "initial", label: "Concentração inicial (mg/mL)", placeholder: "Ex.: 5" }, { key: "target", label: "Concentração final (mg/mL)", placeholder: "Ex.: 1" }, { key: "volume", label: "Volume final (mL)", placeholder: "Ex.: 10" }],
  conversor: [{ key: "amount", label: "Valor", placeholder: "Ex.: 1" }],
  rendimento: [{ key: "mass", label: "Massa disponível (mg)", placeholder: "Ex.: 10" }, { key: "aliquot", label: "Massa por ensaio (mg)", placeholder: "Ex.: 0,5" }, { key: "cost", label: "Custo do reagente (R$)", placeholder: "Ex.: 200" }],
  cronograma: [{ key: "start", label: "Data inicial", type: "date" }, { key: "count", label: "Quantidade de ensaios", placeholder: "Ex.: 4" }, { key: "interval", label: "Intervalo entre ensaios (dias)", placeholder: "Ex.: 7" }],
  amostra: [{ key: "sample", label: "Massa da amostra (g)", placeholder: "Ex.: 2" }, { key: "ratio", label: "Proporção de reagente (mg/g)", placeholder: "Ex.: 0,5" }],
};
const formulas: Record<ToolId, string> = {
  concentracao: "Concentração = massa ÷ volume final.",
  diluicao: "C₁ × V₁ = C₂ × V₂. Diluente = volume final − volume da solução inicial.",
  conversor: "1 g = 1.000 mg = 1.000.000 µg. UI mede atividade biológica e não tem conversão universal para massa.",
  rendimento: "Ensaios completos = parte inteira de massa disponível ÷ massa por ensaio. O custo é proporcional à massa consumida.",
  cronograma: "Datas calculadas a partir da data inicial e do intervalo em dias corridos. Sem titulação ou recomendação de uso de substâncias.",
  amostra: "Massa de reagente (mg) = massa da amostra (g) × proporção (mg/g). Não é um cálculo de dose corporal.",
};

export function LabTool({ id }: { id: ToolId }) {
  const tool = tools.find(item => item.id === id);
  const [values, setValues] = useState<ToolValues>({ unit: "mg" });
  const [result, setResult] = useState<ToolResult | null>(null);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");
  if (!tool) return null;
  const update = (key: string, value: string) => { setValues(prev => ({ ...prev, [key]: value })); setResult(null); setError(""); setFeedback(""); };
  const summary = `${tool.title} — OCTA Labs\n${fields[id].map(field => `${field.label}: ${values[field.key] ?? ""}`).join("\n")}\n${result?.map(row => `${row.label}: ${row.value}`).join("\n")}\nUso exclusivo em pesquisa laboratorial.`;
  const copy = async () => { try { await navigator.clipboard.writeText(summary); setFeedback("Resultado copiado."); } catch { setFeedback("Não foi possível copiar. Use a opção de download."); } };
  const download = () => {
    const url = URL.createObjectURL(new Blob([summary], { type: "text/plain;charset=utf-8" }));
    const a = document.createElement("a"); a.href = url; a.download = `octa-${id}.txt`; a.click(); URL.revokeObjectURL(url); setFeedback("Resultado baixado.");
  };
  return <><style>{capturedCSS}</style><ImportedHeader /><main className="container-x py-10 md:py-16">
    <Button asChild variant="link" className="mb-7 h-auto px-0 text-highlight"><Link to="/ferramentas"><ArrowLeft />Ferramentas Grátis</Link></Button>
    <div className="mb-10 max-w-3xl"><p className="mb-3 text-sm font-semibold text-highlight">OCTA Labs · Pesquisa laboratorial</p><h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">{tool.title}</h1><p className="mt-4 leading-relaxed text-muted-foreground">{tool.description}</p></div>
    <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_1fr]">
      <form className="rounded-lg border border-border bg-card p-6 md:p-8" onSubmit={event => { event.preventDefault(); setFeedback(""); try { setResult(calculateTool(id, values)); setError(""); } catch (err) { setError(err instanceof Error ? err.message : "Confira os valores informados."); setResult(null); } }} noValidate>
        <h2 className="mb-6 text-xl font-semibold text-foreground">Dados do cálculo</h2>
        <div className="space-y-5">{fields[id].map(field => <div key={field.key}><label htmlFor={field.key} className="mb-2 block text-sm font-medium text-foreground">{field.label}</label><Input id={field.key} type={field.type ?? "text"} inputMode={field.type === "date" ? undefined : "decimal"} value={values[field.key] ?? ""} onChange={event => update(field.key, event.target.value)} placeholder={field.placeholder} className="h-12 border-border bg-background text-foreground" aria-invalid={!!error} aria-describedby={error ? "calculation-error" : undefined} /></div>)}
          {id === "conversor" && <fieldset><legend className="mb-2 text-sm font-medium text-foreground">Unidade de origem</legend><div className="flex gap-2">{[ ["mg", "mg"], ["mcg", "µg"], ["g", "g"] ].map(([value, label]) => <Button key={value} type="button" variant={values.unit === value ? "default" : "outline"} aria-pressed={values.unit === value} onClick={() => update("unit", value)}>{label}</Button>)}</div></fieldset>}
        </div>
        {error && <p id="calculation-error" role="alert" className="mt-5 text-sm text-destructive">{error}</p>}
        <div className="mt-7 flex flex-wrap gap-3"><Button type="submit" size="lg"><Calculator />Calcular</Button><Button type="button" variant="outline" size="lg" onClick={() => { setValues({ unit: "mg" }); setResult(null); setError(""); setFeedback(""); }}><RotateCcw />Limpar</Button></div>
      </form>
      <section aria-label="Resultado do cálculo" aria-live="polite" className="min-w-0 py-2">
        <h2 className="text-xl font-semibold text-foreground">Resultado</h2>
        {result ? <><dl className="mt-6 max-h-[32rem] space-y-5 overflow-y-auto">{result.map(row => <div key={row.label} className="border-b border-border pb-5"><dt className="text-sm text-muted-foreground">{row.label}</dt><dd className="mt-2 break-words text-2xl font-semibold text-highlight">{row.value}</dd></div>)}</dl><div className="mt-5 flex gap-2"><Button type="button" variant="outline" onClick={copy}><Copy />Copiar</Button><Button type="button" variant="outline" onClick={download}><Download />Baixar</Button></div></> : <p className="mt-6 text-muted-foreground">Aguardando cálculo.</p>}
        {feedback && <p role="status" className="mt-4 text-sm text-highlight">{feedback}</p>}
        <div className="mt-8 border-t border-border pt-6"><h3 className="text-sm font-semibold text-foreground">Referência matemática</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{formulas[id]}</p></div>
      </section>
    </div>
    <p className="mt-10 max-w-4xl border-l-2 border-highlight pl-5 text-sm leading-relaxed text-muted-foreground">Uso exclusivo em pesquisa laboratorial. Estes cálculos não orientam administração humana ou veterinária. Confira a compatibilidade dos reagentes e o protocolo aprovado do laboratório antes de qualquer procedimento.</p>
  </main><ImportedFooter /></>;
}