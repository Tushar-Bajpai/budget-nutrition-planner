import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="pt-24 pb-16 md:pt-32 md:pb-24 bg-background overflow-hidden"
      aria-label="Hero"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text content */}
          <div className="flex flex-col gap-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary border border-border w-fit text-sm font-medium text-primary">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Personalized Meal Plans in Seconds
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
              Eat Well.{" "}
              <span className="text-primary">Spend Less.</span>{" "}
              Feel Great.
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
              NutriSave generates personalized, nutritionist-approved meal plans
              tailored to your dietary goals and weekly budget — no guesswork,
              no waste.
            </p>

            {/* Social proof */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {["#4ade80", "#22c55e", "#16a34a", "#15803d"].map((color, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-background flex items-center justify-center text-xs font-bold text-white"
                    style={{ backgroundColor: color }}
                    aria-hidden="true"
                  >
                    {["A", "B", "C", "D"][i]}
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-accent text-accent"
                      aria-hidden="true"
                    />
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
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-xl px-7 gap-2 text-base"
              >
                <Link href="#get-started">
                  Start for Free <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-xl px-7 font-medium text-base border-border text-foreground hover:bg-secondary"
              >
                <Link href="#how-it-works">See How It Works</Link>
              </Button>
            </div>

            <p className="text-xs text-muted-foreground">
              No credit card required. Free plan includes up to 3 meal plans/month.
            </p>
          </div>

          {/* Hero image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] lg:aspect-square">
              <Image
                src="/images/hero-meal.jpg"
                alt="A colorful spread of healthy, budget-friendly meals and fresh ingredients"
                fill
                className="object-cover"
                priority
              />
              {/* Floating stats card */}
              <div className="absolute bottom-4 left-4 right-4 md:right-auto md:min-w-56 bg-background/95 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-border">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">
                      Weekly grocery budget
                    </p>
                    <p className="text-2xl font-bold text-foreground">$42.50</p>
                    <p className="text-xs text-primary font-semibold mt-0.5">
                      ↓ 38% vs. average household
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    {[
                      { label: "Protein", pct: 85, color: "bg-primary" },
                      { label: "Carbs", pct: 72, color: "bg-accent" },
                      { label: "Fats", pct: 60, color: "bg-muted-foreground" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground w-10">
                          {item.label}
                        </span>
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

            {/* Decorative background ring */}
            <div
              className="absolute -z-10 -top-8 -right-8 w-72 h-72 rounded-full bg-secondary opacity-60"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
