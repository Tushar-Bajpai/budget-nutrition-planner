import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/sections/hero-section";
import { ProblemSection } from "@/components/sections/problem-section";
import { SolutionSection } from "@/components/sections/solution-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { BenefitsSection } from "@/components/sections/benefits-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { CtaSection } from "@/components/sections/cta-section";
import { FooterSection } from "@/components/sections/footer-section";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background font-sans" suppressHydrationWarning>
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <FeaturesSection />
        <HowItWorksSection />
        <BenefitsSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <FooterSection />
    </div>
  );
}
