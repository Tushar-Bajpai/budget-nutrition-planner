"use client";

import { DollarSign, Brain, Clock } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const problems = [
  {
    icon: DollarSign,
    title: "Healthy Food Feels Expensive",
    description:
      "Many people assume eating healthy requires expensive ingredients and complicated recipes.",
  },
  {
    icon: Clock,
    title: "Meal Planning Takes Too Much Time",
    description:
      "Planning meals for the week and organizing groceries can take hours, especially for busy students and working professionals.",
  },
  {
    icon: Brain,
    title: "Nutrition Is Hard to Understand",
    description:
      "Balancing calories, protein, and nutrients can be confusing without proper knowledge or guidance.",
  },
];

export function ProblemSection() {
  const ref = useScrollAnimation<HTMLElement>();

  return (
    <section
      id="problem"
      ref={ref}
      className="py-20 md:py-28 bg-background dark:bg-secondary"
      aria-label="The problem"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-14 animate-in-view">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground dark:text-primary-foreground leading-tight text-balance">
            Why Healthy Eating Is Difficult for Many People
          </h2>
        </div>

        {/* Problem cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map(({ icon: Icon, title, description }, i) => (
            <div
              key={title}
              className="animate-in-view flex flex-col gap-4 p-6 rounded-2xl bg-card border border-border hover:shadow-md dark:bg-secondary/50 dark:border-secondary dark:hover:bg-secondary/70 transition-colors"
              data-delay={String(i + 1) as "1" | "2" | "3"}
            >
              <div className="w-10 h-10 rounded-xl bg-primary/15 dark:bg-primary/30 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-base font-semibold text-foreground dark:text-primary-foreground leading-snug">
                  {title}
                </h3>
                <p className="text-sm text-muted-foreground dark:text-white/60 leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Stat bar */}
        <div className="mt-14 grid sm:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden">
          {[
            { value: "$1,800", label: "avg. annual food waste per household" },
            { value: "68%", label: "of people skip meal planning entirely" },
            { value: "3x", label: "more likely to eat healthy with a plan" },
          ].map(({ value, label }, i) => (
            <div
              key={label}
              className="animate-in-view-scale bg-card dark:bg-foreground px-8 py-7 flex flex-col gap-1"
              data-delay={String(i + 1) as "1" | "2" | "3"}
            >
              <span className="text-3xl font-bold text-primary">{value}</span>
              <span className="text-sm text-muted-foreground leading-relaxed">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
