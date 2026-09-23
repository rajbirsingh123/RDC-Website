"use client";

import { useEffect, useRef } from "react";
import { destroyHeroBlueprintScene, initHeroBlueprintScene } from "@/lib/hero/heroBlueprintScene";

/** Renders the decorated hero-blueprint-scene container; the GSAP choreography is loaded and run client-side only. */
export function HeroBlueprintScene({ variant = "full" }: { variant?: "full" | "compact" }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    let stale = false;
    initHeroBlueprintScene(root, () => stale).catch(() => {});
    return () => {
      stale = true;
      destroyHeroBlueprintScene(root);
    };
  }, []);

  return <div className="hero-blueprint-scene" data-scene-variant={variant} ref={ref} aria-hidden="true" />;
}

/** The homepage's animated crest ("logo story") — same lazy-loaded GSAP module as the scene above. */
export function HeroLogoStory({ logoSrc }: { logoSrc: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    let stale = false;
    initHeroBlueprintScene(root, () => stale).catch(() => {});
    return () => {
      stale = true;
      destroyHeroBlueprintScene(root);
    };
  }, []);

  return <div className="hero-logo-story" data-logo-src={logoSrc} ref={ref} aria-hidden="true" />;
}
