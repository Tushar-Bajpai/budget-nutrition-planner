"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type PlannerFormData, calculateCalories } from "@/app/planner/types";
import { cn } from "@/lib/utils";

interface GeneratePlanButtonProps {
  data: PlannerFormData;
}

function isFormComplete(data: PlannerFormData): { ready: boolean; missing: string[] } {
  const missing: string[] = [];
  if (!data.name.trim()) missing.push("Name");
  if (!data.age) missing.push("Age");
  if (!data.gender) missing.push("Gender");
  if (!data.height) missing.push("Height");
  if (!data.weight) missing.push("Weight");
  if (!data.activityLevel) missing.push("Activity level");
  if (!data.goal) missing.push("Goal");
  if (!data.weeklyBudget) missing.push("Weekly budget");
  return { ready: missing.length === 0, missing };
}

export function GeneratePlanButton({ data }: GeneratePlanButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);

  const { ready, missing } = isFormComplete(data);
  const { target } = calculateCalories(data);
  const symbol = { USD: "$", EUR: "€", GBP: "£" }[data.currency] ?? "$";

  async function handleGenerate() {
  if (!ready) return;
  setLoading(true);

  try {
    const response = await fetch("/api/generate-plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error:", errorData.errors);
      setLoading(false);
      return;
    }

    const mealPlanData = await response.json();
    console.log("Generated plan:", mealPlanData);

    // Store the data in localStorage so meal-plan page can access it
    localStorage.setItem("generatedMealPlan", JSON.stringify(mealPlanData));
    localStorage.setItem("lastPlannerInput", JSON.stringify(data));

    setLoading(false);
    setGenerated(true);
  } catch (error) {
    console.error("Generation failed:", error);
    setLoading(false);
  }
}

  function handleViewPlan() {
    router.push("/meal-plan");
  }

  return (
    <div className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm">
      {/* Step header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">
          5
        </div>
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Generate Your Plan</h2>
        </div>
      </div>

      {/* Plan snapshot */}
      {ready && !generated && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Daily Calories", value: target ? `${target.toLocaleString()} kcal` : "—" },
            { label: "Weekly Budget", value: data.weeklyBudget ? `${symbol}${data.weeklyBudget}` : "—" },
            { label: "Meals/Day", value: `${data.mealsPerDay} meals` },
            { label: "Diet", value: data.dietType !== "none" ? data.dietType : "Standard" },
          ].map((stat) => (
            <div key={stat.label} className="bg-secondary rounded-xl px-4 py-3 text-center">
              <p className="text-xs text-muted-foreground mb-1 capitalize">{stat.label}</p>
              <p className="text-sm font-bold text-foreground capitalize">{stat.value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Missing fields warning */}
      {!ready && !generated && (
        <div className="mb-5 p-4 rounded-xl bg-muted border border-border">
          <p className="text-sm font-medium text-foreground mb-2">
            Please complete the following fields:
          </p>
          <ul className="flex flex-wrap gap-2">
            {missing.map((m) => (
              <li
                key={m}
                className="px-2.5 py-1 text-xs font-medium rounded-full bg-background border border-border text-muted-foreground"
              >
                {m}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Success state */}
      {generated ? (
        <div className="flex flex-col items-center gap-4 py-6">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
            <CheckCircle2 className="w-9 h-9 text-primary" />
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-foreground mb-1">Your Meal Plan is Ready!</p>
            <p className="text-sm text-muted-foreground">
              A personalized 7-day meal plan has been generated based on your inputs.
            </p>
          </div>
          <div className="flex gap-3 mt-2">
            <Button
              variant="outline"
              className="rounded-xl border-border"
              onClick={() => setGenerated(false)}
            >
              Adjust Inputs
            </Button>
            <Button
              onClick={handleViewPlan}
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl gap-2"
            >
              View Meal Plan <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ) : (
        <Button
          onClick={handleGenerate}
          disabled={!ready || loading}
          className={cn(
            "w-full h-14 rounded-xl text-base font-bold gap-3 transition-all duration-200",
            ready
              ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99]"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          )}
        >
          {loading ? (
            <>
              <span className="w-5 h-5 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin" />
              Generating your plan...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate My Meal Plan
            </>
          )}
        </Button>
      )}

      {!generated && (
        <p className="text-xs text-muted-foreground text-center mt-3">
          Your plan will include a 7-day meal schedule and a complete grocery list.
        </p>
      )}
    </div>
  );
}
