"use client";

import { CalendarDays, Download, Printer, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MealPlanHeaderProps {
  totalCalories: number;
  totalCost: number;
  currency?: string;
}

export function MealPlanHeader({ totalCalories, totalCost, currency = "$" }: MealPlanHeaderProps) {
  return (
    <div className="bg-primary/5 border-b border-border pt-24 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          {/* Title section */}
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <CalendarDays className="w-5 h-5 text-primary" />
              <p className="text-xs font-semibold text-primary uppercase tracking-widest">
                Your 7-Day Plan
              </p>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground text-balance leading-tight mb-3">
              Personalized Meal Plan
            </h1>
            <p className="text-base text-muted-foreground leading-relaxed">
              Your weekly meal plan is ready. Follow this schedule to meet your nutrition goals while staying within budget.
            </p>

            {/* Quick stats */}
            <div className="flex flex-wrap items-center gap-4 mt-5">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary border border-border">
                <span className="text-xs text-muted-foreground">Avg. Daily Calories:</span>
                <span className="text-sm font-bold text-foreground">{totalCalories.toLocaleString()} kcal</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary border border-border">
                <span className="text-xs text-muted-foreground">Weekly Cost:</span>
                <span className="text-sm font-bold text-foreground">{currency}{totalCost.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="rounded-lg border-border gap-2"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-lg border-border gap-2"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export PDF</span>
            </Button>
            <Button
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Regenerate
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
