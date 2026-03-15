import Link from "next/link";
import { UtensilsCrossed, BarChart3, Lightbulb, DollarSign } from "lucide-react";

const features = [
  { icon: BarChart3, label: "Smart Meal Planning", description: "AI-powered personalized plans" },
  { icon: Lightbulb, label: "Nutrition Tracking", description: "Track macros and calories" },
  { icon: DollarSign, label: "Budget Optimization", description: "Save money on groceries" },
];

export function FooterSection() {
  return (
    <footer 
      className="bg-foreground pt-16 pb-10 relative" 
      style={{
        backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)`,
        backgroundSize: "20px 20px"
      }}
      aria-label="Footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Features Grid */}
        <div className="grid sm:grid-cols-3 gap-8 mb-12">
          {features.map(({ icon: Icon, label, description }) => (
            <div key={label} className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Icon className="w-5 h-5 text-primary" />
                <h3 className="text-sm font-semibold text-primary-foreground">
                  {label}
                </h3>
              </div>
              <p className="text-xs text-white/50 leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>

        {/* Brand & Copyright */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 w-fit"
            aria-label="NutriBudget home"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary">
              <UtensilsCrossed className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-primary-foreground font-sans">
              NutriBudget
            </span>
          </Link>
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} NutriBudget. Built to help you eat well and spend less.
          </p>
        </div>
      </div>
    </footer>
  );
}
