"use client";

import { Target, TrendingDown, TrendingUp, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { type PlannerFormData } from "@/app/planner/types";

interface GoalSelectorProps {
  data: PlannerFormData;
  onChange: (updates: Partial<PlannerFormData>) => void;
}

const goals = [
  {
    value: "lose" as const,
    icon: TrendingDown,
    label: "Lose Weight",
    description: "Calorie deficit to reduce body fat while preserving muscle",
    color: "text-orange-500",
    bg: "bg-orange-50 border-orange-200",
    activeBg: "bg-orange-500/10 border-orange-500",
  },
  {
    value: "maintain" as const,
    icon: Minus,
    label: "Maintain Weight",
    description: "Stay at your current weight with balanced nutrition",
    color: "text-primary",
    bg: "bg-secondary border-border",
    activeBg: "bg-primary/10 border-primary",
  },
  {
    value: "gain" as const,
    icon: TrendingUp,
    label: "Gain Muscle",
    description: "Calorie surplus optimized for muscle growth and recovery",
    color: "text-blue-500",
    bg: "bg-blue-50 border-blue-200",
    activeBg: "bg-blue-500/10 border-blue-500",
  },
];

const mealsPerDay = [2, 3, 4, 5, 6];

export function GoalSelector({ data, onChange }: GoalSelectorProps) {
  return (
    <div className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm">
      {/* Step header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">
          2
        </div>
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Your Goal</h2>
        </div>
      </div>

      {/* Goal cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {goals.map((goal) => {
          const Icon = goal.icon;
          const isActive = data.goal === goal.value;
          return (
            <button
              key={goal.value}
              type="button"
              onClick={() => onChange({ goal: goal.value })}
              className={cn(
                "relative flex flex-col items-start gap-2 p-4 rounded-xl border-2 text-left transition-all duration-200 hover:shadow-sm",
                isActive ? goal.activeBg : `${goal.bg} hover:border-muted-foreground/30`
              )}
            >
              <div className={cn("flex items-center justify-center w-9 h-9 rounded-lg bg-white shadow-sm", isActive && "shadow-md")}>
                <Icon className={cn("w-5 h-5", goal.color)} />
              </div>
              <div>
                <p className={cn("text-sm font-semibold", isActive ? "text-foreground" : "text-foreground")}>
                  {goal.label}
                </p>
                <p className="text-xs text-muted-foreground leading-snug mt-0.5">
                  {goal.description}
                </p>
              </div>
              {isActive && (
                <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-primary" />
              )}
            </button>
          );
        })}
      </div>

      {/* Meals per day */}
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-foreground">Meals per day</p>
        <div className="flex gap-2 flex-wrap">
          {mealsPerDay.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => onChange({ mealsPerDay: n })}
              className={cn(
                "w-11 h-11 rounded-xl border text-sm font-semibold transition-all duration-150",
                data.mealsPerDay === n
                  ? "border-primary bg-primary text-primary-foreground shadow-sm"
                  : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground"
              )}
            >
              {n}
            </button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          Meals will be distributed evenly throughout the day.
        </p>
      </div>
    </div>
  );
}
