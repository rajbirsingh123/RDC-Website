"use client";

import { useEffect } from "react";
import type { RefObject } from "react";

/** Subtle scroll parallax on the hero, desktop/mouse only, off for prefers-reduced-motion. */
export function useHeroParallax(ref: RefObject<HTMLElement>) {
  useEffect(() => {
    const hero = ref.current;
    if (!hero) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let ticking = false;
    const update = () => {
      const offset = Math.max(-30, Math.min(30, hero.getBoundingClientRect().top * -0.08));
      hero.style.setProperty("--hero-parallax", `${offset}px`);
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
    return () => window.removeEventListener("scroll", onScroll);
  }, [ref]);
}

/** Tiny pointer-following movement in the hero. Desktop/mouse only, off for prefers-reduced-motion. */
export function useHeroPointerMotion(ref: RefObject<HTMLElement>) {
  useEffect(() => {
    const hero = ref.current;
    if (!hero) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let frame: number | null = null;
    let nextX = 0;
    let nextY = 0;

    const update = () => {
      hero.style.setProperty("--hero-shift-x", `${nextX * -8}px`);
      hero.style.setProperty("--hero-card-x", `${nextX * 5}px`);
      hero.style.setProperty("--hero-card-y", `${nextY * 5}px`);
      frame = null;
    };

    const onMouseMove = (event: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      nextX = (event.clientX - rect.left) / rect.width - 0.5;
      nextY = (event.clientY - rect.top) / rect.height - 0.5;
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onMouseLeave = () => {
      nextX = 0;
      nextY = 0;
      if (!frame) frame = requestAnimationFrame(update);
    };

    hero.addEventListener("mousemove", onMouseMove);
    hero.addEventListener("mouseleave", onMouseLeave);
    return () => {
      hero.removeEventListener("mousemove", onMouseMove);
      hero.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [ref]);
}
