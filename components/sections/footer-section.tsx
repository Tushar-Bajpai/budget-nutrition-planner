import Link from "next/link";
import { UtensilsCrossed } from "lucide-react";

const footerLinks = {
  Product: ["Features", "Pricing", "Sample Plans", "Changelog"],
  Company: ["About", "Blog", "Careers", "Press"],
  Support: ["Help Center", "Contact Us", "Privacy Policy", "Terms of Service"],
};

export function FooterSection() {
  return (
    <footer className="bg-foreground pt-16 pb-10" aria-label="Footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 w-fit"
              aria-label="NutriBudget home"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary">
                <UtensilsCrossed className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-lg text-primary-foreground font-sans">
                NutriBudget
              </span>
            </Link>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              Personalized meal plans that fit your nutritional goals and your
              budget — generated in seconds.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group} className="flex flex-col gap-3">
              <h3 className="text-xs font-semibold text-white/40 uppercase tracking-widest">
                {group}
              </h3>
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} NutriBudget. All rights reserved.
          </p>
          <p className="text-xs text-white/40">
            Built to help you eat well and spend less.
          </p>
        </div>
      </div>
    </footer>
  );
}
