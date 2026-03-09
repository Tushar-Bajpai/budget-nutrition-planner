import { CheckCircle2, Sparkles, Target, TrendingDown, Apple } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Goal-tailored nutrition",
    description:
      "Set your caloric targets, macronutrient ratios, dietary restrictions, and allergies. Every plan is built around you.",
  },
  {
    icon: TrendingDown,
    title: "Budget-first planning",
    description:
      "Enter your weekly grocery budget and we optimize every meal to fit — without sacrificing nutrition or flavor.",
  },
  {
    icon: Sparkles,
    title: "AI-powered generation",
    description:
      "Our intelligent planner creates diverse, balanced weekly menus in seconds, pulling from thousands of affordable recipes.",
  },
  {
    icon: Apple,
    title: "Automatic shopping list",
    description:
      "Export a consolidated, store-aisle-sorted grocery list based on your plan. No duplicates, no surprises at checkout.",
  },
];

const checks = [
  "7-day personalized meal plans",
  "Macro & micronutrient tracking",
  "Budget optimization engine",
  "One-click grocery export",
  "Dietary filters & allergy modes",
  "Swap meals with one click",
];

export function SolutionSection() {
  return (
    <section
      id="features"
      className="py-20 md:py-28 bg-background"
      aria-label="Our solution"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight text-balance mb-4">
            A Smarter Way to Plan Your Meals
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            NutriBudget uses intelligent recommendation algorithms to generate personalized weekly meal plans based on your calorie goals, dietary preferences, and grocery budget.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            The platform ensures that you receive balanced nutrition without exceeding your weekly food spending.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex flex-col gap-4 p-6 rounded-2xl border border-border bg-card hover:shadow-md transition-shadow"
            >
              <div className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
              </div>
              <h3 className="text-base font-semibold text-foreground leading-snug">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                {description}
              </p>
            </div>
          ))}
        </div>

        {/* Feature checklist + visual */}
        <div className="rounded-3xl bg-secondary border border-border overflow-hidden">
          <div className="grid lg:grid-cols-2">
            {/* Checklist */}
            <div className="p-8 md:p-12 flex flex-col gap-6 justify-center">
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground text-balance">
                One app. All the tools you need.
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Built for real people with real constraints — whether you&apos;re
                feeding a family of four or meal-prepping solo on a tight student
                budget.
              </p>
              <ul className="grid sm:grid-cols-2 gap-3" aria-label="Features list">
                {checks.map((check) => (
                  <li key={check} className="flex items-start gap-2.5">
                    <CheckCircle2
                      className="w-5 h-5 text-primary shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span className="text-sm font-medium text-foreground">
                      {check}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mock plan preview card */}
            <div className="bg-card p-8 md:p-12 flex items-center justify-center border-t lg:border-t-0 lg:border-l border-border">
              <div className="w-full max-w-sm rounded-2xl border border-border shadow-sm overflow-hidden">
                <div className="bg-primary px-5 py-4 flex items-center justify-between">
                  <span className="text-sm font-semibold text-primary-foreground">
                    Week of March 10–16
                  </span>
                  <span className="text-xs bg-primary-foreground/20 text-primary-foreground px-2 py-1 rounded-full font-medium">
                    Budget: $45
                  </span>
                </div>
                <div className="divide-y divide-border">
                  {[
                    { day: "Monday", meal: "Lentil Soup + Sourdough", cals: "520 kcal", cost: "$3.20" },
                    { day: "Tuesday", meal: "Chicken & Rice Bowl", cals: "640 kcal", cost: "$4.10" },
                    { day: "Wednesday", meal: "Veggie Stir-Fry + Tofu", cals: "490 kcal", cost: "$2.85" },
                    { day: "Thursday", meal: "Black Bean Tacos", cals: "580 kcal", cost: "$3.50" },
                    { day: "Friday", meal: "Pasta Primavera", cals: "610 kcal", cost: "$2.95" },
                  ].map(({ day, meal, cals, cost }) => (
                    <div key={day} className="px-5 py-3 flex items-center justify-between gap-3">
                      <div className="flex flex-col gap-0.5 min-w-0">
                        <span className="text-xs font-semibold text-primary">{day}</span>
                        <span className="text-sm text-foreground font-medium truncate">{meal}</span>
                        <span className="text-xs text-muted-foreground">{cals}</span>
                      </div>
                      <span className="text-sm font-bold text-foreground shrink-0">{cost}</span>
                    </div>
                  ))}
                </div>
                <div className="px-5 py-3 bg-muted flex items-center justify-between">
                  <span className="text-xs text-muted-foreground font-medium">5-day dinner total</span>
                  <span className="text-sm font-bold text-primary">$16.60</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
