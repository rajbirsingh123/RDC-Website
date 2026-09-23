"use client";

import { useEffect } from "react";
import type { RefObject } from "react";

/**
 * Scroll progress bar for an event detail page's story chapters — ported from
 * legacy-site/script.js's initEventStoryProgress(). Injects a fixed progress bar into
 * document.body (same as the original, which appended it there rather than inside the page),
 * and fills it based on scroll position across the [data-chapter-index] markers scoped to the
 * given page ref.
 */
export function useEventStoryProgress(pageRef: RefObject<HTMLElement>) {
  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const chapters = Array.from(page.querySelectorAll<HTMLElement>("[data-chapter-index]"));
    if (!chapters.length) return;

    const bar = document.createElement("div");
    bar.className = "event-progress-bar";
    bar.innerHTML = '<span class="event-progress-fill"></span>';
    bar.setAttribute("aria-hidden", "true");
    document.body.appendChild(bar);
    const fill = bar.querySelector<HTMLElement>(".event-progress-fill");

    const lastSection = chapters[chapters.length - 1].closest("section") || chapters[chapters.length - 1];

    let ticking = false;
    const update = () => {
      const startY = chapters[0].getBoundingClientRect().top + window.scrollY;
      const endY = lastSection.getBoundingClientRect().bottom + window.scrollY;
      const readerY = window.scrollY + window.innerHeight * 0.35;
      const progress = Math.min(1, Math.max(0, (readerY - startY) / Math.max(1, endY - startY)));
      if (fill) fill.style.width = `${progress * 100}%`;

      bar.classList.toggle("is-visible", window.scrollY > 40 && window.scrollY < endY);

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      bar.remove();
    };
  }, [pageRef]);
}
