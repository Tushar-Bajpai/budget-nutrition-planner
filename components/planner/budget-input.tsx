"use client";

import { Wallet, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { type PlannerFormData } from "@/app/planner/types";

interface BudgetInputProps {
  data: PlannerFormData;
  onChange: (updates: Partial<PlannerFormData>) => void;
}

const presets = [25, 50, 75, 100, 150];
const currencies = [
  { value: "USD", symbol: "$" },
  { value: "EUR", symbol: "€" },
  { value: "GBP", symbol: "£" },
];
const priorities = [
  { value: "nutrition", label: "Best Nutrition", desc: "Maximize nutrient density" },
  { value: "balanced", label: "Balanced", desc: "Balance cost and nutrition" },
  { value: "cost", label: "Lowest Cost", desc: "Minimize grocery spending" },
] as const;

export function BudgetInput({ data, onChange }: BudgetInputProps) {
  const symbol = currencies.find((c) => c.value === data.currency)?.symbol ?? "$";
  const perDay = data.weeklyBudget > 0 ? (data.weeklyBudget / 7).toFixed(2) : "0.00";
  const perMeal =
    data.weeklyBudget > 0 && data.mealsPerDay > 0
      ? (data.weeklyBudget / 7 / data.mealsPerDay).toFixed(2)
      : "0.00";

  return (
    <div className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm">
      {/* Step header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">
          4
        </div>
        <div className="flex items-center gap-2">
          <Wallet className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Weekly Budget</h2>
        </div>
      </div>

      {/* Currency + amount input */}
      <div className="flex gap-2 mb-4">
        <div className="flex rounded-xl border border-border overflow-hidden bg-background">
          {currencies.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => onChange({ currency: c.value as PlannerFormData["currency"] })}
              className={cn(
                "px-3 py-2 text-sm font-medium transition-all duration-150",
                data.currency === c.value
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              {c.symbol} {c.value}
            </button>
          ))}
        </div>
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
            {symbol}
          </span>
          <input
            type="number"
            min={10}
            max={1000}
            step={5}
            value={data.weeklyBudget || ""}
            onChange={(e) => onChange({ weeklyBudget: Number(e.target.value) })}
            className="w-full h-11 pl-8 pr-4 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="75"
          />
        </div>
      </div>

      {/* Quick presets */}
      <div className="flex gap-2 flex-wrap mb-6">
        {presets.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onChange({ weeklyBudget: p })}
            className={cn(
              "px-4 py-1.5 rounded-full border text-xs font-medium transition-all duration-150",
              data.weeklyBudget === p
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-background text-muted-foreground hover:border-primary/40"
            )}
          >
            {symbol}{p}/wk
          </button>
        ))}
      </div>

      {/* Budget breakdown */}
      <div className="flex gap-3 mb-6">
        <div className="flex-1 bg-secondary rounded-xl px-4 py-3">
          <p className="text-xs text-muted-foreground mb-1">Per day</p>
          <p className="text-lg font-bold text-foreground">{symbol}{perDay}</p>
        </div>
        <div className="flex-1 bg-secondary rounded-xl px-4 py-3">
          <p className="text-xs text-muted-foreground mb-1">Per meal</p>
          <p className="text-lg font-bold text-foreground">{symbol}{perMeal}</p>
        </div>
      </div>

      {/* Prioritization */}
      <div>
        <p className="text-sm font-medium text-foreground mb-3">Prioritize</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {priorities.map((p) => (
            <button
              key={p.value}
              type="button"
              onClick={() => onChange({ prioritize: p.value })}
              className={cn(
                "flex flex-col items-start px-4 py-3 rounded-xl border text-left transition-all duration-150",
                data.prioritize === p.value
                  ? "border-primary bg-primary/10"
                  : "border-border bg-background hover:border-primary/40"
              )}
            >
              <span className={cn("text-sm font-semibold", data.prioritize === p.value ? "text-primary" : "text-foreground")}>
                {p.label}
              </span>
              <span className="text-xs text-muted-foreground mt-0.5">{p.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Info note */}
      <div className="flex items-start gap-2 mt-5 p-3 rounded-xl bg-secondary border border-border">
        <Info className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
        <p className="text-xs text-muted-foreground leading-relaxed">
          Budget estimates are based on average grocery prices. Actual costs may vary by location and store.
        </p>
      </div>
    </div>
  );
}
