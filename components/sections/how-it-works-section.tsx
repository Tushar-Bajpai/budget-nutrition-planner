"use client";

import { UserCircle, Sliders, CalendarDays, ShoppingBag } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const steps = [
  {
    step: "01",
    icon: UserCircle,
    title: "Enter Your Details",
    description:
      "Provide your health goals, calorie requirements, dietary preferences, and weekly grocery budget.",
  },
  {
    step: "02",
    icon: Sliders,
    title: "Generate Your Meal Plan",
    description:
      "Our recommendation engine creates a personalized weekly meal plan optimized for nutrition and cost.",
  },
  {
    step: "03",
    icon: ShoppingBag,
    title: "Get Your Grocery List",
    description:
      "Receive a detailed shopping list containing all ingredients needed for the week.",
  },
  {
    step: "04",
    icon: CalendarDays,
    title: "Eat Healthy and Save Money",
    description:
      "Follow your plan to maintain a balanced diet while staying within your grocery budget.",
  },
];

export function HowItWorksSection() {
  const ref = useScrollAnimation<HTMLElement>();

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="py-20 md:py-28 bg-secondary"
      aria-label="How it works"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 animate-in-view">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight text-balance mb-4">
            How NutriBudget Works
          </h2>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div
            className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-border"
            aria-hidden="true"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map(({ step, icon: Icon, title, description }, i) => (
              <div
                key={step}
                className="animate-in-view flex flex-col items-center text-center gap-4"
                data-delay={String(i + 1) as "1" | "2" | "3" | "4"}
              >
                {/* Step number + icon */}
                <div className="relative flex flex-col items-center gap-2">
                  <div className="w-20 h-20 rounded-2xl bg-card border border-border shadow-sm flex items-center justify-center transition-transform duration-200 hover:scale-110 hover:shadow-md">
                    <Icon className="w-8 h-8 text-primary" aria-hidden="true" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                    {step.slice(-1)}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="text-base font-bold text-foreground">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
