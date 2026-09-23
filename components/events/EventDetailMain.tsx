"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useEventStoryProgress } from "@/hooks/useEventStoryProgress";

/** Like RevealMain, plus the event detail page's scroll-driven chapter progress bar. */
export function EventDetailMain({ id, children }: { id?: string; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);
  useEventStoryProgress(ref);
  return (
    <main id={id} className="events-page event-detail-page" ref={ref}>
      {children}
    </main>
  );
}
