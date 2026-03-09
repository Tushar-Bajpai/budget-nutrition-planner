import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section
      id="get-started"
      className="py-20 md:py-28 bg-background"
      aria-label="Get started"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-primary px-8 py-16 md:py-20 flex flex-col items-center text-center gap-8 relative overflow-hidden">
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
            <span className="text-sm font-semibold text-primary-foreground/70 uppercase tracking-widest">
              Ready to get started?
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground text-balance leading-tight">
              Start eating better and saving money today.
            </h2>
            <p className="text-lg text-primary-foreground/80 leading-relaxed">
              Join over 12,000 people who have already transformed the way they
              eat and shop. Your first 3 meal plans are completely free.
            </p>
          </div>

          <div className="relative flex flex-col sm:flex-row items-center gap-3">
            <Button
              asChild
              size="lg"
              className="bg-card text-primary hover:bg-card/90 font-bold rounded-xl px-8 gap-2 text-base shadow-md"
            >
              <Link href="#">
                Generate My First Meal Plan <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="text-primary-foreground hover:bg-primary-foreground/10 rounded-xl px-6 font-medium text-base"
            >
              <Link href="#">View sample plan</Link>
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
