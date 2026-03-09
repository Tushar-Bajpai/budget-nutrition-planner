"use client";

import { Leaf, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { type PlannerFormData } from "@/app/planner/types";

interface DietPreferenceSelectorProps {
  data: PlannerFormData;
  onChange: (updates: Partial<PlannerFormData>) => void;
}

const dietTypes = [
  { value: "none", label: "No Restriction", emoji: "🍽" },
  { value: "vegetarian", label: "Vegetarian", emoji: "🥗" },
  { value: "vegan", label: "Vegan", emoji: "🌱" },
  { value: "keto", label: "Keto", emoji: "🥑" },
  { value: "paleo", label: "Paleo", emoji: "🍖" },
  { value: "mediterranean", label: "Mediterranean", emoji: "🫒" },
  { value: "gluten-free", label: "Gluten-Free", emoji: "🌾" },
  { value: "dairy-free", label: "Dairy-Free", emoji: "🥛" },
];

const allergens = [
  "Nuts", "Shellfish", "Eggs", "Soy", "Wheat", "Fish", "Sesame", "Peanuts",
];

const cuisines = [
  "American", "Asian", "Mediterranean", "Mexican", "Indian", "Italian", "Middle Eastern", "Any",
];

export function DietPreferenceSelector({ data, onChange }: DietPreferenceSelectorProps) {
  function toggleAllergen(allergen: string) {
    const current = data.allergens;
    const updated = current.includes(allergen)
      ? current.filter((a) => a !== allergen)
      : [...current, allergen];
    onChange({ allergens: updated });
  }

  function toggleCuisine(cuisine: string) {
    const current = data.cuisines;
    const updated = current.includes(cuisine)
      ? current.filter((c) => c !== cuisine)
      : [...current, cuisine];
    onChange({ cuisines: updated });
  }

  return (
    <div className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm">
      {/* Step header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">
          3
        </div>
        <div className="flex items-center gap-2">
          <Leaf className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Diet Preferences</h2>
        </div>
      </div>

      {/* Diet type */}
      <div className="mb-6">
        <p className="text-sm font-medium text-foreground mb-3">Diet Type</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {dietTypes.map((diet) => {
            const isActive = data.dietType === diet.value;
            return (
              <button
                key={diet.value}
                type="button"
                onClick={() => onChange({ dietType: diet.value as PlannerFormData["dietType"] })}
                className={cn(
                  "flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all duration-150",
                  isActive
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
                )}
              >
                <span className="text-base leading-none">{diet.emoji}</span>
                <span className="truncate">{diet.label}</span>
                {isActive && <Check className="w-3.5 h-3.5 ml-auto shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Allergens */}
      <div className="mb-6">
        <p className="text-sm font-medium text-foreground mb-1">Allergens to Avoid</p>
        <p className="text-xs text-muted-foreground mb-3">Select all that apply</p>
        <div className="flex flex-wrap gap-2">
          {allergens.map((allergen) => {
            const isSelected = data.allergens.includes(allergen);
            return (
              <button
                key={allergen}
                type="button"
                onClick={() => toggleAllergen(allergen)}
                className={cn(
                  "px-3 py-1.5 rounded-full border text-xs font-medium transition-all duration-150",
                  isSelected
                    ? "border-destructive bg-destructive/10 text-destructive"
                    : "border-border bg-background text-muted-foreground hover:border-muted-foreground"
                )}
              >
                {isSelected && <span className="mr-1">✕</span>}
                {allergen}
              </button>
            );
          })}
        </div>
      </div>

      {/* Cuisine preferences */}
      <div>
        <p className="text-sm font-medium text-foreground mb-1">Preferred Cuisines</p>
        <p className="text-xs text-muted-foreground mb-3">Select all you enjoy</p>
        <div className="flex flex-wrap gap-2">
          {cuisines.map((cuisine) => {
            const isSelected = data.cuisines.includes(cuisine);
            return (
              <button
                key={cuisine}
                type="button"
                onClick={() => toggleCuisine(cuisine)}
                className={cn(
                  "px-3 py-1.5 rounded-full border text-xs font-medium transition-all duration-150",
                  isSelected
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-background text-muted-foreground hover:border-primary/40"
                )}
              >
                {cuisine}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
