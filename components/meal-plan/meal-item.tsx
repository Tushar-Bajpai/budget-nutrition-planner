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
    gradient: "from-primary/10 to-primary/5",
    iconColor: "text-primary",
  },
  lunch: {
    icon: Sun,
    label: "Lunch",
    gradient: "from-accent/10 to-accent/5",
    iconColor: "text-accent",
  },
  dinner: {
    icon: Moon,
    label: "Dinner",
    gradient: "from-primary/10 to-primary/5",
    iconColor: "text-primary",
  },
  snack: {
    icon: Cookie,
    label: "Snack",
    gradient: "from-accent/10 to-accent/5",
    iconColor: "text-accent",
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
        <span className="text-xs px-1.5 py-0.5 rounded bg-primary/10 text-primary font-medium">
          P: {meal.protein}g
        </span>
        <span className="text-xs px-1.5 py-0.5 rounded bg-accent/10 text-accent font-medium">
          C: {meal.carbs}g
        </span>
        <span className="text-xs px-1.5 py-0.5 rounded bg-secondary-foreground/10 text-secondary-foreground font-medium">
          F: {meal.fat}g
        </span>
      </div>
    </div>
  );
}
