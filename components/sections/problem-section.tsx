import { DollarSign, Brain, ShoppingCart, Clock } from "lucide-react";

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
  return (
    <section
      id="problem"
      className="py-20 md:py-28 bg-foreground"
      aria-label="The problem"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground leading-tight text-balance">
            Why Healthy Eating Is Difficult for Many People
          </h2>
        </div>

        {/* Problem cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex flex-col gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/8 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-base font-semibold text-primary-foreground leading-snug">
                  {title}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Stat bar */}
        <div className="mt-14 grid sm:grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden">
          {[
            { value: "$1,800", label: "avg. annual food waste per household" },
            { value: "68%", label: "of people skip meal planning entirely" },
            { value: "3x", label: "more likely to eat healthy with a plan" },
          ].map(({ value, label }) => (
            <div
              key={label}
              className="bg-foreground px-8 py-7 flex flex-col gap-1"
            >
              <span className="text-3xl font-bold text-primary">{value}</span>
              <span className="text-sm text-white/60 leading-relaxed">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
