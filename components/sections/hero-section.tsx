"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  {
    src: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&q=85&auto=format&fit=crop",
    alt: "Colorful bowl of fresh vegetables, grains and legumes — a balanced budget meal",
    caption: "Balanced macro bowls",
  },
  {
    src: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=900&q=85&auto=format&fit=crop",
    alt: "Meal prep containers filled with healthy, portioned meals for the week",
    caption: "Smart weekly meal prep",
  },
  {
    src: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=900&q=85&auto=format&fit=crop",
    alt: "Fresh colorful salad with vegetables, seeds and a light dressing",
    caption: "High-protein, low-cost salads",
  },
  {
    src: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=900&q=85&auto=format&fit=crop",
    alt: "Grilled salmon with roasted vegetables and quinoa — a nutritious dinner",
    caption: "Nutritionist-approved dinners",
  },
  {
    src: "https://images.unsplash.com/photo-1494390248081-4e521a5940db?w=900&q=85&auto=format&fit=crop",
    alt: "Overhead shot of healthy breakfast with fruits, yogurt and granola",
    caption: "Energising breakfasts",
  },
];

export function HeroSection() {
  const [current, setCurrent] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback((index: number) => {
    setCurrent((SLIDES.length + index) % SLIDES.length);
  }, []);

  // Auto-rotate slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="pt-24 pb-16 md:pt-32 md:pb-24 bg-background overflow-hidden"
      aria-label="Hero"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Text content — slides in from left */}
          <div
            className="flex flex-col gap-6 animate-in-view-left is-visible"
            style={{ transitionDelay: "0ms" }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary border border-border w-fit text-sm font-medium text-primary">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" aria-hidden="true" />
              Personalized Meal Plans in Seconds
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
              Healthy Eating That Fits Your{" "}
              <span className="text-primary">Budget</span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
              Plan affordable, nutritious meals tailored to your health goals. Our smart meal planner generates weekly meal plans and grocery lists while keeping your budget in mind.
            </p>

            <p className="text-base text-muted-foreground leading-relaxed max-w-lg">
              Stop overspending on groceries and struggling with meal planning. NutriBudget helps you eat healthier, save money, and simplify your weekly food planning.
            </p>

            {/* Social proof */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2" aria-hidden="true">
                {["#4ade80", "#22c55e", "#16a34a", "#15803d"].map((color, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-background flex items-center justify-center text-xs font-bold text-white"
                    style={{ backgroundColor: color }}
                  >
                    {["A", "B", "C", "D"][i]}
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" aria-hidden="true" />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground font-medium">
                  Loved by 12,000+ users
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-xl px-7 gap-2 text-base transition-transform duration-150 hover:scale-105 active:scale-95"
              >
                <Link href="/planner">
                  Generate My Meal Plan <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-xl px-7 font-medium text-base border-border text-foreground hover:bg-secondary transition-transform duration-150 hover:scale-105 active:scale-95"
              >
                <Link href="#how-it-works">Learn How It Works</Link>
              </Button>
            </div>

            <p className="text-xs text-muted-foreground">
              No credit card required. Free plan includes up to 3 meal plans/month.
            </p>
          </div>

          {/* Image Slider — slides in from right */}
          <div
            className="relative animate-in-view-right is-visible"
            style={{ transitionDelay: "120ms" }}
          >
            {/* Decorative ring */}
            <div
              className="absolute -z-10 -top-8 -right-8 w-72 h-72 rounded-full bg-secondary opacity-60"
              aria-hidden="true"
            />

            <div
              ref={trackRef}
              className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] lg:aspect-square select-none group"
              role="region"
              aria-label="Meal inspiration image slider — auto-rotating"
            >
              {/* Slides */}
              {SLIDES.map((slide, i) => (
                <div
                  key={slide.src}
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{ opacity: i === current ? 1 : 0 }}
                  aria-hidden={i !== current}
                >
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={i === 0}
                  />
                </div>
              ))}

              {/* Dark gradient overlay at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" aria-hidden="true" />

              {/* Caption */}
              <div className="absolute bottom-20 left-5 right-5 pointer-events-none">
                <p className="text-white text-sm font-semibold tracking-wide drop-shadow-md transition-all duration-300">
                  {SLIDES[current]?.caption || ""}
                </p>
              </div>

              {/* Dot indicators */}
              <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2 pointer-events-none" role="tablist" aria-label="Slide indicators">
                {SLIDES.map((_, i) => (
                  <button
                    key={i}
                    role="tab"
                    aria-selected={i === current}
                    aria-label={`Go to slide ${i + 1}: ${SLIDES[i]?.caption || ""}`}
                    onClick={() => goTo(i)}
                    className={[
                      "rounded-full transition-all duration-300 pointer-events-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
                      i === current
                        ? "w-6 h-2 bg-white"
                        : "w-2 h-2 bg-white/50 hover:bg-white/80",
                    ].join(" ")}
                  />
                ))}
              </div>

              {/* Prev / Next arrow buttons */}
              <button
                onClick={() => goTo(current - 1)}
                aria-label="Previous slide"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center shadow-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:opacity-0 md:group-hover:opacity-100 opacity-100"
              >
                <ChevronLeft className="w-4 h-4 text-foreground" aria-hidden="true" />
              </button>
              <button
                onClick={() => goTo(current + 1)}
                aria-label="Next slide"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center shadow-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:opacity-0 md:group-hover:opacity-100 opacity-100"
              >
                <ChevronRight className="w-4 h-4 text-foreground" aria-hidden="true" />
              </button>
            </div>

            {/* Floating stats card */}
            <div className="absolute -bottom-5 left-4 right-4 md:right-auto md:min-w-60 bg-background/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-border">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Weekly grocery budget</p>
                  <p className="text-2xl font-bold text-foreground">$42.50</p>
                  <p className="text-xs text-primary font-semibold mt-0.5">
                    38% less vs. avg. household
                  </p>
                </div>
                <div className="flex flex-col gap-1.5">
                  {[
                    { label: "Protein", pct: 85, color: "bg-primary" },
                    { label: "Carbs", pct: 72, color: "bg-accent" },
                    { label: "Fats", pct: 60, color: "bg-muted-foreground" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground w-10">{item.label}</span>
                      <div className="w-20 h-1.5 rounded-full bg-border overflow-hidden">
                        <div
                          className={`h-full rounded-full ${item.color}`}
                          style={{ width: `${item.pct}%` }}
                          aria-label={`${item.label}: ${item.pct}%`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
