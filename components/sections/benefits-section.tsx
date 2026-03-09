"use client";

import { Wallet, Heart, Clock, Leaf } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const benefits = [
  {
    icon: Wallet,
    title: "Save Money",
    description:
      "Reduce grocery spending with optimized meal plans.",
  },
  {
    icon: Heart,
    title: "Improve Your Health",
    description:
      "Balanced meals designed around your nutritional needs.",
  },
  {
    icon: Clock,
    title: "Save Time",
    description:
      "No more spending hours planning meals and grocery lists.",
  },
  {
    icon: Leaf,
    title: "Reduce Food Waste",
    description:
      "Buy only what you need for the week.",
  },
];

export function BenefitsSection() {
  const ref = useScrollAnimation<HTMLElement>();

  return (
    <section
      id="benefits"
      ref={ref}
      className="py-20 md:py-28 bg-secondary"
      aria-label="Benefits"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 animate-in-view">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight text-balance">
            Benefits of Using NutriBudget
          </h2>
        </div>

        {/* Benefit grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map(({ icon: Icon, title, description }, i) => (
            <div
              key={title}
              className="animate-in-view flex flex-col gap-4 p-6 rounded-2xl border border-border bg-background hover:shadow-md hover:-translate-y-1 transition-all duration-200"
              data-delay={String(i + 1) as "1" | "2" | "3" | "4"}
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110">
                <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
              </div>
              <h3 className="text-base font-semibold text-foreground">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
