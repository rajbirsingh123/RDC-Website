"use client";

import { useEffect } from "react";
import type { RefObject } from "react";
import { applyReducedMotionToHeroVideo } from "@/lib/hero/heroBlueprintScene";

export function useHeroVideoAutoplay(ref: RefObject<HTMLVideoElement>) {
  useEffect(() => {
    if (ref.current) applyReducedMotionToHeroVideo(ref.current);
  }, [ref]);
}
