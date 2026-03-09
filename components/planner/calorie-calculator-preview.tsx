"use client";

import { Flame, Zap, Wheat, Droplets } from "lucide-react";
import { type PlannerFormData, calculateCalories } from "@/app/planner/types";
import { cn } from "@/lib/utils";

interface CalorieCalculatorPreviewProps {
  data: PlannerFormData;
}

const goalLabels: Record<string, { label: string; color: string }> = {
  lose: { label: "Weight Loss", color: "text-orange-500" },
  maintain: { label: "Maintenance", color: "text-primary" },
  gain: { label: "Muscle Gain", color: "text-blue-500" },
};

function MacroBar({ label, grams, percent, color }: { label: string; grams: number; percent: number; color: string }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-foreground">{label}</span>
        <span className="text-muted-foreground">{grams}g</span>
      </div>
      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-700", color)}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

export function CalorieCalculatorPreview({ data }: CalorieCalculatorPreviewProps) {
  const { bmr, tdee, target, protein, carbs, fat } = calculateCalories(data);
  const isReady = target > 0;
  const symbol = { USD: "$", EUR: "€", GBP: "£" }[data.currency] ?? "$";

  const totalMacroG = protein + carbs + fat;
  const proteinPct = totalMacroG > 0 ? (protein / totalMacroG) * 100 : 0;
  const carbsPct = totalMacroG > 0 ? (carbs / totalMacroG) * 100 : 0;
  const fatPct = totalMacroG > 0 ? (fat / totalMacroG) * 100 : 0;

  const goalInfo = data.goal ? goalLabels[data.goal] : null;

  return (
    <div className="sticky top-24 flex flex-col gap-4">
      {/* Calorie summary card */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Flame className="w-5 h-5 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Calorie Estimate</h3>
          {goalInfo && (
            <span className={cn("ml-auto text-xs font-semibold", goalInfo.color)}>
              {goalInfo.label}
            </span>
          )}
        </div>

        {isReady ? (
          <>
            {/* Target calories — big display */}
            <div className="flex flex-col items-center py-5 mb-4 bg-primary/5 rounded-xl border border-primary/20">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                Daily Target
              </p>
              <p className="text-5xl font-bold text-primary tabular-nums">
                {target.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground mt-1">kcal / day</p>
            </div>

            {/* BMR / TDEE row */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="bg-secondary rounded-xl px-3 py-2.5 text-center">
                <p className="text-xs text-muted-foreground mb-0.5">BMR</p>
                <p className="text-base font-bold text-foreground tabular-nums">{bmr.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">kcal/day</p>
              </div>
              <div className="bg-secondary rounded-xl px-3 py-2.5 text-center">
                <p className="text-xs text-muted-foreground mb-0.5">TDEE</p>
                <p className="text-base font-bold text-foreground tabular-nums">{tdee.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">kcal/day</p>
              </div>
            </div>

            {/* Macro bars */}
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Macro Split
              </p>
              <MacroBar label="Protein" grams={protein} percent={proteinPct} color="bg-blue-500" />
              <MacroBar label="Carbohydrates" grams={carbs} percent={carbsPct} color="bg-primary" />
              <MacroBar label="Fat" grams={fat} percent={fatPct} color="bg-orange-400" />
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center py-10 gap-3">
            <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
              <Flame className="w-7 h-7 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground text-center leading-relaxed">
              Fill in your profile and goal to see your personalized calorie estimate.
            </p>
          </div>
        )}
      </div>

      {/* Budget summary card */}
      <div className="bg-card rounded-2xl border border-border p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-4 h-4 text-accent-foreground" />
          <h3 className="text-sm font-semibold text-foreground">Plan Summary</h3>
        </div>
        <div className="flex flex-col gap-2">
          {[
            {
              label: "Weekly Budget",
              value: data.weeklyBudget ? `${symbol}${data.weeklyBudget}` : "—",
            },
            {
              label: "Meals / Day",
              value: data.mealsPerDay ? `${data.mealsPerDay} meals` : "—",
            },
            {
              label: "Diet Type",
              value: data.dietType !== "none" ? data.dietType : "No restriction",
            },
            {
              label: "Goal",
              value: data.goal ? goalLabels[data.goal]?.label : "—",
            },
          ].map((row) => (
            <div key={row.label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <span className="text-xs text-muted-foreground">{row.label}</span>
              <span className="text-xs font-semibold text-foreground capitalize">{row.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
