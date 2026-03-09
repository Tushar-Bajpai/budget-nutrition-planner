"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

export function CtaSection() {
  const ref = useScrollAnimation<HTMLElement>();

  return (
    <section
      id="cta"
      ref={ref}
      className="py-20 md:py-28 bg-background"
      aria-label="Call to action"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-in-view rounded-3xl bg-primary px-8 py-16 md:py-20 flex flex-col items-center text-center gap-8 relative overflow-hidden">
          {/* Decorative circles */}
          <div
            className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-white/5"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-white/5"
            aria-hidden="true"
          />

          <div className="relative flex flex-col items-center gap-4 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground text-balance leading-tight">
              Start Planning Your Meals Today
            </h2>
            <p className="text-lg text-primary-foreground/80 leading-relaxed">
              Generate personalized meal plans and grocery lists within seconds.
            </p>
          </div>

          <div className="relative flex flex-col sm:flex-row items-center gap-3">
            <Button
              asChild
              size="lg"
              className="bg-card text-primary hover:bg-card/90 font-bold rounded-xl px-8 gap-2 text-base shadow-md"
            >
              <Link href="#planner">
                Start My Meal Plan <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          <p className="relative text-xs text-primary-foreground/60">
            No credit card required &bull; Free plan available &bull; Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}
