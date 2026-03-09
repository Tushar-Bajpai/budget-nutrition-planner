import { UserCircle, Sliders, CalendarDays, ShoppingBag } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: UserCircle,
    title: "Tell us about yourself",
    description:
      "Enter your dietary goals, food preferences, allergies, and how many people you're cooking for. Takes under 2 minutes.",
  },
  {
    step: "02",
    icon: Sliders,
    title: "Set your weekly budget",
    description:
      "Enter how much you want to spend on groceries. Our engine finds the best nutritional value for every dollar.",
  },
  {
    step: "03",
    icon: CalendarDays,
    title: "Generate your meal plan",
    description:
      "Click generate and receive a full 7-day plan complete with breakfast, lunch, dinner, and snacks — in seconds.",
  },
  {
    step: "04",
    icon: ShoppingBag,
    title: "Shop and enjoy",
    description:
      "Download your sorted grocery list, head to the store, and start cooking. It's really that simple.",
  },
];

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="py-20 md:py-28 bg-secondary"
      aria-label="How it works"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
            How It Works
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight text-balance mb-4">
            Your personalized plan in 4 easy steps.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            No nutritionist degree required. NutriSave guides you from setup
            to shopping cart in just a few clicks.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div
            className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-border"
            aria-hidden="true"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map(({ step, icon: Icon, title, description }) => (
              <div key={step} className="flex flex-col items-center text-center gap-4">
                {/* Step number + icon */}
                <div className="relative flex flex-col items-center gap-2">
                  <div className="w-20 h-20 rounded-2xl bg-card border border-border shadow-sm flex items-center justify-center">
                    <Icon className="w-8 h-8 text-primary" aria-hidden="true" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                    {step.slice(-1)}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="text-base font-bold text-foreground">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
