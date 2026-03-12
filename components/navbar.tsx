"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X, UtensilsCrossed } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Planner", href: "/planner" },
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
];

function smoothScrollTo(href: string) {
  if (!href.startsWith("#")) return;
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  // Active link: pathname-based for page routes, section-based for anchors
  // Initialize from pathname (provided by Next.js) to avoid hydration mismatch
  const [activeHref, setActiveHref] = useState<string>(
    () => navLinks.find((l) => !l.href.startsWith("#") && l.href === pathname)?.href ?? "/"
  );

  // Refs for the nav container and per-link elements to measure positions
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // Sliding indicator state: left offset + width
  const [indicator, setIndicator] = useState({ left: 0, width: 0, ready: false });

  // Recompute indicator position whenever activeHref changes or on resize
  const updateIndicator = useCallback(() => {
    const activeIdx = navLinks.findIndex((l) => l.href === activeHref);
    const linkEl = linkRefs.current[activeIdx];
    const navEl = navRef.current;
    if (!linkEl || !navEl) return;

    const navRect = navEl.getBoundingClientRect();
    const linkRect = linkEl.getBoundingClientRect();
    setIndicator({
      left: linkRect.left - navRect.left,
      width: linkRect.width,
      ready: true,
    });
  }, [activeHref]);

  useEffect(() => {
    updateIndicator();
  }, [updateIndicator]);

  useEffect(() => {
    window.addEventListener("resize", updateIndicator, { passive: true });
    return () => window.removeEventListener("resize", updateIndicator);
  }, [updateIndicator]);

  // Set active based on current route on mount / pathname change
  useEffect(() => {
    const matched = navLinks.find((l) => !l.href.startsWith("#") && l.href === pathname);
    if (matched) setActiveHref(matched.href);
  }, [pathname]);

  // Section intersection observer (only on home page where anchors exist)
  useEffect(() => {
    if (pathname !== "/") return;

    const anchorLinks = navLinks.filter((l) => l.href.startsWith("#"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHref(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    anchorLinks.forEach(({ href }) => {
      const el = document.getElementById(href.replace("#", ""));
      if (el) observer.observe(el);
    });

    // Default to Home when at top of page
    function onScroll() {
      if (window.scrollY < 80) setActiveHref("/");
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  // Scroll progress bar
  useEffect(() => {
    function onScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(scrollTop > 10);
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleNavClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    link: { href: string; label: string }
  ) {
    if (link.href.startsWith("#")) {
      e.preventDefault();
      setActiveHref(link.href);
      if (pathname !== "/") {
        // Navigate home first, then scroll after mount
        router.push(`/${link.href}`);
      } else {
        smoothScrollTo(link.href);
      }
    } else {
      setActiveHref(link.href);
    }
    setMobileOpen(false);
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b transition-all duration-300",
        scrolled ? "border-border shadow-sm" : "border-transparent"
      )}
    >
      {/* Scroll-progress bar */}
      <div
        className="absolute bottom-0 left-0 h-[2px] bg-primary transition-[width] duration-150 ease-out rounded-r-full pointer-events-none"
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 shrink-0"
            aria-label="NutriBudget home"
            onClick={() => setActiveHref("/")}
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary">
              <UtensilsCrossed className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg text-foreground font-sans tracking-tight">
              NutriBudget
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            ref={navRef}
            className="hidden md:flex items-center gap-1 relative"
            aria-label="Main navigation"
          >
            {/* Sliding background + underline indicator */}
            {indicator.ready && (
              <>
                {/* Background highlight */}
                <span
                  aria-hidden="true"
                  className="absolute top-1/2 -translate-y-1/2 h-8 rounded-lg bg-secondary pointer-events-none"
                  style={{
                    left: indicator.left,
                    width: indicator.width,
                    transition: "left 300ms cubic-bezier(0.4,0,0.2,1), width 300ms cubic-bezier(0.4,0,0.2,1)",
                  }}
                />
                {/* Sliding underline */}
                <span
                  aria-hidden="true"
                  className="absolute bottom-1 h-0.5 rounded-full bg-primary pointer-events-none"
                  style={{
                    left: indicator.left + indicator.width * 0.25,
                    width: indicator.width * 0.5,
                    transition: "left 300ms cubic-bezier(0.4,0,0.2,1), width 300ms cubic-bezier(0.4,0,0.2,1)",
                  }}
                />
              </>
            )}

            {navLinks.map((link, i) => {
              const isActive = activeHref === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  ref={(el) => { linkRefs.current[i] = el; }}
                  onClick={(e) => handleNavClick(e, link)}
                  className={cn(
                    "relative z-10 px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-150 select-none",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* CTA — desktop */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              asChild
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-lg px-5 transition-transform duration-150 hover:scale-105 active:scale-95"
            >
              <Link href="/planner" onClick={() => setActiveHref("/planner")}>
                Start Planning
              </Link>
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <span className={cn("block transition-all duration-200", mobileOpen ? "rotate-90" : "rotate-0")}>
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden border-t bg-background/95 backdrop-blur-md overflow-hidden transition-all duration-300 ease-in-out",
          mobileOpen ? "max-h-96 opacity-100 border-border" : "max-h-0 opacity-0 border-transparent"
        )}
        aria-hidden={!mobileOpen}
      >
        <nav className="px-4 py-4 flex flex-col gap-1" aria-label="Mobile navigation">
          {navLinks.map((link, i) => {
            const isActive = activeHref === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                style={{ transitionDelay: mobileOpen ? `${i * 40}ms` : "0ms" }}
                className={cn(
                  "px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                  mobileOpen ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0",
                  isActive
                    ? "text-primary bg-secondary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
                onClick={(e) => handleNavClick(e, link)}
                aria-current={isActive ? "page" : undefined}
              >
                {/* Mobile active indicator dot */}
                <span className="flex items-center gap-2">
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden="true" />
                  )}
                  {link.label}
                </span>
              </a>
            );
          })}
          <div className="mt-3 pt-3 border-t border-border flex flex-col gap-2">
            <Button
              asChild
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-lg"
            >
              <Link href="/planner" onClick={() => { setActiveHref("/planner"); setMobileOpen(false); }}>
                Start Planning
              </Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
