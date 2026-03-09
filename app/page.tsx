import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/sections/hero-section";
import { ProblemSection } from "@/components/sections/problem-section";
import { SolutionSection } from "@/components/sections/solution-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { CtaSection } from "@/components/sections/cta-section";
import { FooterSection } from "@/components/sections/footer-section";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <HowItWorksSection />
        <CtaSection />
      </main>
      <FooterSection />
    </div>
  );
}
