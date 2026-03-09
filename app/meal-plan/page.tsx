"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { MealPlanHeader } from "@/components/meal-plan/meal-plan-header";
import { WeeklyMealGrid } from "@/components/meal-plan/weekly-meal-grid";
import { NutritionSummary } from "@/components/meal-plan/nutrition-summary";
import { BudgetSummary } from "@/components/meal-plan/budget-summary";
import { RegenerateButton } from "@/components/meal-plan/regenerate-button";
import { FooterSection } from "@/components/sections/footer-section";
import { generateSampleMealPlan, type MealPlanData } from "@/app/meal-plan/types";
import { Spinner } from "@/components/ui/spinner";

export default function MealPlanPage() {
  const [mealPlanData, setMealPlanData] = useState<MealPlanData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data (in real app, this would come from URL params or context)
    const timer = setTimeout(() => {
      const data = generateSampleMealPlan(2000, 75, "none");
      setMealPlanData(data);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  function handleRegenerate() {
    setLoading(true);
    setTimeout(() => {
      const newData = generateSampleMealPlan(2000, 75, "none");
      setMealPlanData(newData);
      setLoading(false);
    }, 1500);
  }

  if (loading || !mealPlanData) {
    return (
      <div className="min-h-screen bg-background font-sans">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <Spinner className="w-10 h-10 text-primary" />
          <p className="text-lg font-medium text-foreground">Generating your meal plan...</p>
          <p className="text-sm text-muted-foreground">This may take a moment</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />

      {/* Page header */}
      <MealPlanHeader
        totalCalories={mealPlanData.totalCalories}
        totalCost={mealPlanData.totalCost}
        currency="$"
      />

      {/* Weekly meal grid */}
      <WeeklyMealGrid weeklyPlan={mealPlanData.weeklyPlan} />

      {/* Summary sections */}
      <section className="py-8 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-6">
            <NutritionSummary
              macros={mealPlanData.macros}
              totalCalories={mealPlanData.totalCalories}
              targetCalories={mealPlanData.targetCalories}
            />
            <BudgetSummary
              totalCost={mealPlanData.totalCost}
              targetBudget={mealPlanData.targetBudget}
              groceryList={mealPlanData.groceryList}
              currency="$"
            />
          </div>
        </div>
      </section>

      {/* Regenerate button section */}
      <RegenerateButton onRegenerate={handleRegenerate} />

      <FooterSection />
    </div>
  );
}
