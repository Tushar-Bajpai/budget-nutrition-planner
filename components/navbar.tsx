"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X, Leaf } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Planner", href: "/planner" },
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "About", href: "#about" },
];

/** Smooth-scroll to anchor, falls back gracefully for plain hrefs. */
function scrollTo(href: string) {
  if (!href.startsWith("#")) return;
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("/");

  /* Scroll progress + shadow trigger */
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

  /* Active section detection via IntersectionObserver */
  useEffect(() => {
    const sectionIds = navLinks
      .map((l) => l.href.replace("#", ""))
      .filter((id) => id !== "/");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b transition-all duration-300",
        scrolled ? "border-border shadow-sm" : "border-transparent"
      )}
    >
      {/* Scroll-progress bar */}
      <div
        className="absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-150 ease-out rounded-r-full"
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 shrink-0 group"
            aria-label="NutriBudget home"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary transition-transform duration-200 group-hover:scale-110">
              <Leaf className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg text-foreground font-sans tracking-tight">
              NutriBudget
            </span>
          </Link>

          {/* Center nav links — desktop */}
          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    if (link.href.startsWith("#")) {
                      e.preventDefault();
                      scrollTo(link.href);
                    }
                  }}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-150",
                    isActive
                      ? "text-primary bg-secondary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                  {/* Active underline pill */}
                  {isActive && (
                    <span
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-primary"
                      aria-hidden="true"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* CTA — desktop */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="#"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-150"
            >
              Log in
            </Link>
            <Button
              asChild
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-lg px-5 transition-transform duration-150 hover:scale-105 active:scale-95"
            >
              <Link href="/planner">Start Planning</Link>
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <span
              className={cn(
                "block transition-all duration-200",
                mobileOpen ? "rotate-90" : "rotate-0"
              )}
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden border-t bg-background/95 backdrop-blur-md overflow-hidden transition-all duration-300 ease-in-out",
          mobileOpen
            ? "max-h-96 opacity-100 border-border"
            : "max-h-0 opacity-0 border-transparent"
        )}
        aria-hidden={!mobileOpen}
      >
        <nav
          className="px-4 py-4 flex flex-col gap-1"
          aria-label="Mobile navigation"
        >
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              style={{ transitionDelay: mobileOpen ? `${i * 40}ms` : "0ms" }}
              className={cn(
                "px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                mobileOpen
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-2 opacity-0",
                activeSection === link.href
                  ? "text-primary bg-secondary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
              onClick={(e) => {
                if (link.href.startsWith("#")) {
                  e.preventDefault();
                  scrollTo(link.href);
                }
                setMobileOpen(false);
              }}
              aria-current={activeSection === link.href ? "page" : undefined}
            >
              {link.label}
            </a>
          ))}
          <div className="mt-3 pt-3 border-t border-border flex flex-col gap-2">
            <Link
              href="#"
              className="px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Log in
            </Link>
            <Button
              asChild
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-lg"
            >
              <Link href="/planner" onClick={() => setMobileOpen(false)}>
                Start Planning
              </Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
