"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { MealPlanHeader } from "@/components/meal-plan/meal-plan-header";
import { PrintableMealPlan } from "@/components/meal-plan/printable-meal-plan";
import { WeeklyMealGrid } from "@/components/meal-plan/weekly-meal-grid";
import { NutritionSummary } from "@/components/meal-plan/nutrition-summary";
import { BudgetSummary } from "@/components/meal-plan/budget-summary";
import { RegenerateButton } from "@/components/meal-plan/regenerate-button";
import { FooterSection } from "@/components/sections/footer-section";
import { type MealPlanData } from "@/app/meal-plan/types";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

export default function MealPlanPage() {
  const router = useRouter();
  const [mealPlanData, setMealPlanData] = useState<MealPlanData | null>(null);
  const [loading, setLoading] = useState(true);
  const [regenerating, setRegenerating] = useState(false);
  const [exportingPdf, setExportingPdf] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem("generatedMealPlan");

    if (storedData) {
      try {
        const parsedMealPlan = JSON.parse(storedData) as MealPlanData;
        setMealPlanData(parsedMealPlan);
      } catch (error) {
        console.error("Failed to parse stored meal plan:", error);
      }
    }

    setLoading(false);
  }, []);

  async function requestMealPlan(rawInput: string) {
    const parsedInput = JSON.parse(rawInput);
    const response = await fetch("/api/generate-plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsedInput),
    });

    const payload = await response.json();

    if (!response.ok) {
      const message = Array.isArray(payload.errors)
        ? payload.errors.join(", ")
        : "Failed to generate meal plan.";
      throw new Error(message);
    }

    localStorage.setItem("generatedMealPlan", JSON.stringify(payload));
    setMealPlanData(payload as MealPlanData);
  }

  async function handleRegenerate() {
    const storedInput = localStorage.getItem("lastPlannerInput");

    if (!storedInput) {
      router.push("/planner");
      return;
    }

    setRegenerating(true);

    try {
      await requestMealPlan(storedInput);
    } catch (error) {
      console.error("Failed to regenerate meal plan:", error);
    } finally {
      setRegenerating(false);
    }
  }

  function handlePrint() {
    window.print();
  }

  function handleExportPdf() {
    const previousTitle = document.title;
    const fileDate = new Date().toISOString().slice(0, 10);

    setExportingPdf(true);
    document.title = `meal-plan-${fileDate}`;

    try {
      window.print();
    } finally {
      document.title = previousTitle;
      setExportingPdf(false);
    }
  }

  if (loading) {
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

  if (!mealPlanData) {
    return (
      <div className="min-h-screen bg-background font-sans">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-4 text-center">
          <h1 className="text-2xl font-bold text-foreground">No Meal Plan Found</h1>
          <p className="max-w-md text-sm text-muted-foreground">
            Generate a meal plan from the planner page before opening this screen.
          </p>
          <Button asChild className="rounded-xl">
            <Link href="/planner">Go To Planner</Link>
          </Button>
        </div>
        <FooterSection />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-sans">
      <div className="screen-only">
        <Navbar />

        {/* Page header */}
        <MealPlanHeader
          totalCalories={mealPlanData.totalCalories}
          totalCost={mealPlanData.totalCost}
          currency="$"
          onPrint={handlePrint}
          onExportPdf={handleExportPdf}
          onRegenerate={handleRegenerate}
          isExporting={exportingPdf}
          isRegenerating={regenerating}
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
        <RegenerateButton onRegenerate={handleRegenerate} loading={regenerating} />

        <FooterSection />
      </div>

      <PrintableMealPlan mealPlanData={mealPlanData} currency="$" />
    </div>
  );
}
