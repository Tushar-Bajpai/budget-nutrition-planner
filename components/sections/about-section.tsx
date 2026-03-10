"use client";

import { useRef } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Heart, Users, Zap, Target } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Health First",
    description: "We believe everyone deserves access to balanced nutrition without breaking the bank.",
  },
  {
    icon: Users,
    title: "Community Focused",
    description: "Built for students, professionals, and families who want to eat smarter.",
  },
  {
    icon: Zap,
    title: "Intelligent Technology",
    description: "AI-powered algorithms that learn your preferences and optimize every meal plan.",
  },
  {
    icon: Target,
    title: "Budget Conscious",
    description: "Save money on groceries while achieving your nutritional goals.",
  },
];

export function AboutSection() {
  const ref = useRef<HTMLElement>(null);

  return (
    <section
      id="about"
      ref={ref}
      className="py-20 md:py-28 bg-background"
      aria-label="About NutriBudget"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="animate-in-view">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight text-balance mb-4">
              About NutriBudget
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We're on a mission to make healthy eating affordable and accessible to everyone.
            </p>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="bg-secondary rounded-2xl p-8 md:p-12 mb-16 animate-in-view" data-delay="1">
          <h3 className="text-2xl font-bold text-foreground mb-4">Our Mission</h3>
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            NutriBudget was created to bridge the gap between health and affordability. We understand that maintaining a healthy diet shouldn't drain your wallet. Our intelligent meal planning system combines nutritional science with budget optimization to create personalized meal plans that work for your lifestyle and your finances.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Whether you're a busy student, a working professional, or a parent managing a household, NutriBudget helps you make informed food choices without the stress or expense. We believe that healthy eating is a right, not a privilege, and our platform is designed to make nutritious, affordable meals accessible to everyone.
          </p>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-foreground mb-10 text-center">Our Core Values</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, description }, i) => (
              <div
                key={title}
                className="bg-card rounded-xl p-6 border border-border animate-in-view hover:shadow-md transition-shadow duration-300"
                data-delay={String(i + 1)}
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-secondary mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">{title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How We Work */}
        <div className="mb-16 animate-in-view" data-delay="2">
          <h3 className="text-2xl font-bold text-foreground mb-10 text-center">How We Work</h3>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="text-4xl font-bold text-primary mb-4">1</div>
              <h4 className="text-lg font-semibold text-foreground mb-3">Smart Analysis</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Our AI analyzes your health goals, dietary preferences, allergies, and budget constraints to understand your unique needs.
              </p>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="text-4xl font-bold text-primary mb-4">2</div>
              <h4 className="text-lg font-semibold text-foreground mb-3">Intelligent Planning</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Our recommendation engine generates optimized 7-day meal plans that balance nutrition, taste, variety, and cost.
              </p>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="text-4xl font-bold text-primary mb-4">3</div>
              <h4 className="text-lg font-semibold text-foreground mb-3">Organized Shopping</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Get a comprehensive grocery list organized by category, with exact quantities and estimated costs for each item.
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="grid md:grid-cols-2 gap-12 items-center animate-in-view" data-delay="3">
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-6">Why Choose NutriBudget?</h3>
            <ul className="space-y-4">
              {[
                "Personalized meal plans based on your dietary preferences and health goals",
                "Weekly meal plans that fit your grocery budget to the dollar",
                "Complete grocery lists organized by aisle for faster shopping",
                "Macro and micronutrient tracking for balanced nutrition",
                "Fast generation — get your meal plan in seconds, not hours",
                "Flexible regeneration to try new meals anytime",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center shrink-0 mt-0.5">
                    <span className="w-1.5 h-1.5 bg-primary-foreground rounded-full" />
                  </div>
                  <span className="text-muted-foreground text-base leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 border border-primary/20">
            <div className="space-y-6">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">1000+</div>
                <p className="text-sm text-muted-foreground">Users saving money on groceries</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">50K+</div>
                <p className="text-sm text-muted-foreground">Meal plans generated</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">$2.5M</div>
                <p className="text-sm text-muted-foreground">Total saved on groceries</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">4.9★</div>
                <p className="text-sm text-muted-foreground">Average user rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-in-view" data-delay="4">
          <p className="text-lg text-muted-foreground mb-4">
            Ready to start planning healthier meals and saving money?
          </p>
          <a
            href="/planner"
            className="inline-block bg-primary text-primary-foreground font-semibold rounded-xl px-8 py-3 hover:bg-primary/90 transition-colors duration-200"
          >
            Create Your First Meal Plan
          </a>
        </div>
      </div>
    </section>
  );
}
