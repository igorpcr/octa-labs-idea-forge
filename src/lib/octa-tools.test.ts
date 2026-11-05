import { describe, expect, it } from "vitest";
import { calculateTool, parsePositive } from "./octa-tools";

describe("Laboratory tools", () => {
  it("calculates mass concentration and microgram equivalent", () => {
    expect(calculateTool("concentracao", { mass: "10", volume: "2" })).toEqual([{ label: "Concentração", value: "5 mg/mL" }, { label: "Equivalente", value: "5.000 µg/mL" }]);
  });
  it("calculates dilution volumes", () => {
    const result = calculateTool("diluicao", { initial: "5", target: "1", volume: "10" });
    expect(result.map(row => row.value)).toEqual(["2 mL", "8 mL", "10 mL"]);
  });
  it("rejects increasing concentration through dilution", () => {
    expect(() => calculateTool("diluicao", { initial: "1", target: "5", volume: "10" })).toThrow();
  });
  it("converts mass units without assuming biological activity", () => {
    expect(calculateTool("conversor", { amount: "1000", unit: "mcg" }).map(row => row.value)).toEqual(["1 mg", "1.000 µg", "0,001 g"]);
    expect(() => calculateTool("conversor", { amount: "1", unit: "UI" })).toThrow();
  });
  it("calculates complete assays, remaining mass and proportional cost", () => {
    expect(calculateTool("rendimento", { mass: "10", aliquot: "3", cost: "200" }).map(row => row.value)).toEqual(["3", "1 mg", (60).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })]);
  });
  it("calculates sample mass proportions", () => {
    expect(calculateTool("amostra", { sample: "2", ratio: "0,5" }).map(row => row.value)).toEqual(["1 mg", "1.000 µg"]);
  });
  it("schedules across month boundaries without timezone changes", () => {
    expect(calculateTool("cronograma", { start: "2026-11-29", count: "3", interval: "7" }).map(row => row.value)).toEqual(["29/11/2026", "06/12/2026", "13/12/2026"]);
  });
  it("rejects impossible dates and excessive schedules", () => {
    expect(() => calculateTool("cronograma", { start: "2026-02-30", count: "3", interval: "7" })).toThrow();
    expect(() => calculateTool("cronograma", { start: "2026-11-05", count: "101", interval: "7" })).toThrow();
  });
  it("rejects empty, negative, infinite and zero inputs and accepts decimal commas", () => {
    for (const value of ["", "-1", "0", "Infinity", "abc"]) expect(() => parsePositive(value, "Valor")).toThrow();
    expect(parsePositive("0,5", "Valor")).toBe(0.5);
  });
});