"use client";

import { useEffect } from "react";
import type { RefObject } from "react";

/** Toggles .is-scrolled on the header past 60px of scroll. */
export function useHeaderShrink(ref: RefObject<HTMLElement>) {
  useEffect(() => {
    const header = ref.current;
    if (!header) return;

    let ticking = false;
    const applyState = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 60);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(applyState);
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    applyState();
    return () => window.removeEventListener("scroll", onScroll);
  }, [ref]);
}
