"use client";

import { Coffee, Sun, Moon, Cookie, Clock, Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import { type MealItem as MealItemType } from "@/app/meal-plan/types";

interface MealItemProps {
  type: "breakfast" | "lunch" | "dinner" | "snack";
  meal: MealItemType;
}

const mealConfig = {
  breakfast: {
    icon: Coffee,
    label: "Breakfast",
    gradient: "from-amber-500/10 to-orange-500/10",
    iconColor: "text-amber-600",
  },
  lunch: {
    icon: Sun,
    label: "Lunch",
    gradient: "from-yellow-500/10 to-amber-500/10",
    iconColor: "text-yellow-600",
  },
  dinner: {
    icon: Moon,
    label: "Dinner",
    gradient: "from-indigo-500/10 to-purple-500/10",
    iconColor: "text-indigo-600",
  },
  snack: {
    icon: Cookie,
    label: "Snack",
    gradient: "from-green-500/10 to-emerald-500/10",
    iconColor: "text-green-600",
  },
};

export function MealItemCard({ type, meal }: MealItemProps) {
  const config = mealConfig[type];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "relative rounded-xl p-3 border border-border/50 bg-gradient-to-br transition-all duration-200 hover:shadow-sm hover:border-border",
        config.gradient
      )}
    >
      {/* Meal type header */}
      <div className="flex items-center gap-2 mb-2">
        <div className={cn("p-1.5 rounded-lg bg-background/80", config.iconColor)}>
          <Icon className="w-3.5 h-3.5" />
        </div>
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          {config.label}
        </span>
      </div>

      {/* Meal name */}
      <h4 className="text-sm font-semibold text-foreground mb-2 line-clamp-1">
        {meal.name}
      </h4>

      {/* Quick stats */}
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Flame className="w-3 h-3 text-orange-500" />
          {meal.calories} cal
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {meal.prepTime}m
        </span>
      </div>

      {/* Macros row */}
      <div className="flex items-center gap-2 mt-2 pt-2 border-t border-border/50">
        <span className="text-xs px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-700 font-medium">
          P: {meal.protein}g
        </span>
        <span className="text-xs px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-700 font-medium">
          C: {meal.carbs}g
        </span>
        <span className="text-xs px-1.5 py-0.5 rounded bg-pink-500/10 text-pink-700 font-medium">
          F: {meal.fat}g
        </span>
      </div>
    </div>
  );
}
