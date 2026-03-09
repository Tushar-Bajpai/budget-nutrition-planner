"use client";

import { type WeeklyMealPlan, type DayName } from "@/app/meal-plan/types";
import { DayMealCard } from "./day-meal-card";

interface WeeklyMealGridProps {
  weeklyPlan: WeeklyMealPlan;
}

const days: DayName[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function getTodayName(): DayName | null {
  const dayIndex = new Date().getDay();
  // Sunday = 0, so we need to remap
  const dayMap: Record<number, DayName> = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  };
  return dayMap[dayIndex];
}

export function WeeklyMealGrid({ weeklyPlan }: WeeklyMealGridProps) {
  const today = getTodayName();

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-foreground mb-1">Weekly Schedule</h2>
          <p className="text-sm text-muted-foreground">
            Click on any meal to view details, swap ingredients, or adjust portions.
          </p>
        </div>

        {/* Responsive grid: 1 col on mobile, 2 on tablet, 3-4 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {days.map((day) => (
            <DayMealCard
              key={day}
              day={day}
              meals={weeklyPlan[day]}
              isToday={day === today}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
