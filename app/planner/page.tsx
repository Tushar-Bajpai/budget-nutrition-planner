"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { UserProfileForm } from "@/components/planner/user-profile-form";
import { GoalSelector } from "@/components/planner/goal-selector";
import { DietPreferenceSelector } from "@/components/planner/diet-preference-selector";
import { BudgetInput } from "@/components/planner/budget-input";
import { CalorieCalculatorPreview } from "@/components/planner/calorie-calculator-preview";
import { GeneratePlanButton } from "@/components/planner/generate-plan-button";
import { FooterSection } from "@/components/sections/footer-section";
import { defaultFormData, type PlannerFormData } from "@/app/planner/types";

export default function PlannerPage() {
  const [formData, setFormData] = useState<PlannerFormData>(defaultFormData);

  function handleChange(updates: Partial<PlannerFormData>) {
    setFormData((prev) => ({ ...prev, ...updates }));
  }

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />

      {/* Page header */}
      <div className="bg-primary/5 border-b border-border pt-24 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">
              Meal Planner
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground text-balance leading-tight mb-3">
              Build Your Personalized Meal Plan
            </h1>
            <p className="text-base text-muted-foreground leading-relaxed">
              Fill in your details below and we will generate a 7-day meal plan tailored to your nutrition goals and weekly budget.
            </p>
          </div>

          {/* Progress indicator */}
          <div className="flex items-center gap-2 mt-6">
            {["Profile", "Goal", "Diet", "Budget", "Generate"].map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">{i + 1}</span>
                  </div>
                  <span className="text-xs font-medium text-muted-foreground hidden sm:block">{step}</span>
                </div>
                {i < 4 && <div className="w-6 sm:w-10 h-px bg-border" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* Left column — form stack */}
          <div className="flex-1 min-w-0 flex flex-col gap-6">
            <UserProfileForm data={formData} onChange={handleChange} />
            <GoalSelector data={formData} onChange={handleChange} />
            <DietPreferenceSelector data={formData} onChange={handleChange} />
            <BudgetInput data={formData} onChange={handleChange} />
            <GeneratePlanButton data={formData} />
          </div>

          {/* Right column — sticky preview */}
          <aside className="w-full lg:w-80 xl:w-96 shrink-0">
            <CalorieCalculatorPreview data={formData} />
          </aside>

        </div>
      </main>

      <FooterSection />
    </div>
  );
}
