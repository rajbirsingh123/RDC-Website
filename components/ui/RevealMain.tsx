"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/** Wraps a page's <main> content and applies the site's scroll-reveal animation to it. */
export function RevealMain({ id, className, children }: { id?: string; className?: string; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);
  return (
    <main id={id} className={className} ref={ref}>
      {children}
    </main>
  );
}
