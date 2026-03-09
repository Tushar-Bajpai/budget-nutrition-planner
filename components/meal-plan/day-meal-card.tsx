"use client";

import { type DayMeal, type DayName } from "@/app/meal-plan/types";
import { MealItemCard } from "./meal-item";
import { cn } from "@/lib/utils";

interface DayMealCardProps {
  day: DayName;
  meals: DayMeal;
  isToday?: boolean;
}

const dayColors: Record<DayName, string> = {
  Monday: "border-t-blue-500",
  Tuesday: "border-t-green-500",
  Wednesday: "border-t-purple-500",
  Thursday: "border-t-orange-500",
  Friday: "border-t-pink-500",
  Saturday: "border-t-teal-500",
  Sunday: "border-t-red-500",
};

export function DayMealCard({ day, meals, isToday }: DayMealCardProps) {
  const totalCalories =
    meals.breakfast.calories + meals.lunch.calories + meals.dinner.calories + meals.snack.calories;
  const totalCost =
    meals.breakfast.cost + meals.lunch.cost + meals.dinner.cost + meals.snack.cost;

  return (
    <div
      className={cn(
        "bg-card rounded-2xl border border-border shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md",
        "border-t-4",
        dayColors[day],
        isToday && "ring-2 ring-primary ring-offset-2"
      )}
    >
      {/* Day header */}
      <div className="px-4 py-3 border-b border-border bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-foreground">{day}</h3>
            {isToday && (
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-primary text-primary-foreground">
                Today
              </span>
            )}
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">
              {totalCalories} cal &middot; ${totalCost.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Meals grid */}
      <div className="p-4 flex flex-col gap-3">
        <MealItemCard type="breakfast" meal={meals.breakfast} />
        <MealItemCard type="lunch" meal={meals.lunch} />
        <MealItemCard type="dinner" meal={meals.dinner} />
        <MealItemCard type="snack" meal={meals.snack} />
      </div>
    </div>
  );
}
