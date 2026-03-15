"use client";

import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Student, Budget-Conscious",
    avatar: "SC",
    content: "NutriBudget saved me $150 a month on groceries while eating healthier. The meal plans are delicious and actually fit my budget!",
    rating: 5,
  },
  {
    name: "Marcus Johnson",
    role: "Working Professional",
    avatar: "MJ",
    content: "Finally, meal planning that doesn't take hours. I get personalized plans in seconds and save money doing it. Highly recommend!",
    rating: 5,
  },
  {
    name: "Emma Williams",
    role: "Fitness Enthusiast",
    avatar: "EW",
    content: "The macro tracking and personalized nutrition advice is exactly what I needed. Best investment for my health and wallet.",
    rating: 5,
  },
  {
    name: "David Park",
    role: "Parent of Two",
    avatar: "DP",
    content: "Managing family nutrition on a budget was stressful until NutriBudget. Now I have healthy, affordable meals planned weekly.",
    rating: 5,
  },
  {
    name: "Lisa Rodriguez",
    role: "Nutrition Advocate",
    avatar: "LR",
    content: "As a dietitian, I appreciate how scientifically sound these meal plans are. It's making healthy eating accessible to everyone.",
    rating: 5,
  },
  {
    name: "James Mitchell",
    role: "Small Business Owner",
    avatar: "JM",
    content: "Time-saving and money-saving. The automated grocery lists and meal planning have simplified my entire week. Love it!",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 md:py-28 bg-foreground relative overflow-hidden" aria-label="User testimonials">
      {/* Dotted background pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground leading-tight text-balance mb-4">
            Loved by Over 12,000 Users
          </h2>
          <p className="text-lg text-primary-foreground/70 leading-relaxed max-w-2xl mx-auto">
            See how NutriBudget is transforming the way people eat, save, and plan their meals
          </p>
        </div>

        {/* Carousel Container */}
        <div className="space-y-8">
          {/* Row 1 - Left to Right */}
          <div className="relative h-80 overflow-hidden">
            <div className="flex gap-6 animate-carousel-left absolute">
              {[...testimonials.slice(0, 3), ...testimonials.slice(0, 3)].map((testimonial, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 w-96 bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-border/20 hover:border-primary/30 transition-colors duration-300"
                >
                  {/* Rating */}
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-accent text-accent"
                        aria-hidden="true"
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-sm text-card-foreground/80 leading-relaxed mb-4">
                    "{testimonial.content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-xs font-bold text-primary-foreground">
                        {testimonial.avatar}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-card-foreground">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-card-foreground/60">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 - Right to Left */}
          <div className="relative h-80 overflow-hidden">
            <div className="flex gap-6 animate-carousel-right absolute">
              {[...testimonials.slice(3, 6), ...testimonials.slice(3, 6)].map((testimonial, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 w-96 bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-border/20 hover:border-primary/30 transition-colors duration-300"
                >
                  {/* Rating */}
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-accent text-accent"
                        aria-hidden="true"
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-sm text-card-foreground/80 leading-relaxed mb-4">
                    "{testimonial.content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-xs font-bold text-primary-foreground">
                        {testimonial.avatar}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-card-foreground">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-card-foreground/60">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
