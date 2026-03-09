"use client";

import { useEffect, useRef } from "react";

/**
 * Attaches an IntersectionObserver to a container ref.
 * Any descendant with class `animate-in-view`, `animate-in-view-left`,
 * `animate-in-view-right`, or `animate-in-view-scale` will receive
 * the `is-visible` class once it enters the viewport, triggering
 * the CSS transition defined in globals.css.
 */
export function useScrollAnimation<T extends HTMLElement = HTMLElement>(
  threshold = 0.15
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const targets = container.querySelectorAll<HTMLElement>(
      ".animate-in-view, .animate-in-view-left, .animate-in-view-right, .animate-in-view-scale"
    );

    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target); // fire once
          }
        });
      },
      { threshold }
    );

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
