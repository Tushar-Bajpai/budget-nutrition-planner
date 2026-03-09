"use client";

import { CheckCircle2 } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const features = [
  {
    title: "Budget-Based Meal Planning",
    description:
      "Generate meal plans that match your weekly grocery budget.",
  },
  {
    title: "Personalized Nutrition",
    description:
      "Meal recommendations tailored to your calorie needs and health goals.",
  },
  {
    title: "Automatic Grocery Lists",
    description:
      "Instantly generate a complete shopping list for the week based on your selected meal plan.",
  },
  {
    title: "Nutrition Tracking",
    description:
      "Track calories, protein, carbohydrates, and fats for each meal plan.",
  },
  {
    title: "Dietary Preference Support",
    description:
      "Supports vegetarian, vegan, and high-protein meal plans.",
  },
  {
    title: "Smart Budget Optimization",
    description:
      "Select ingredients that maximize nutrition while minimizing cost.",
  },
];

export function FeaturesSection() {
  const ref = useScrollAnimation<HTMLElement>();

  return (
    <section
      id="features"
      ref={ref}
      className="py-20 md:py-28 bg-background"
      aria-label="Key features"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 animate-in-view">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight text-balance">
            Key Features
          </h2>
        </div>

        {/* Feature grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ title, description }, i) => (
            <div
              key={title}
              className="animate-in-view flex flex-col gap-4 p-6 rounded-2xl border border-border bg-card hover:shadow-md hover:-translate-y-1 transition-all duration-200"
              data-delay={String(i + 1) as "1" | "2" | "3" | "4" | "5" | "6"}
            >
              <div className="flex items-start gap-3">
                <CheckCircle2
                  className="w-5 h-5 text-primary shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <h3 className="text-base font-semibold text-foreground leading-snug">
                  {title}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
