"use client";

import { useEffect } from "react";
import { destroyFoundingStoryAnimation, initFoundingStoryAnimation } from "@/lib/about/foundingStoryAnimation";

/**
 * Runs the GSAP choreography for the "Story Behind Our Crest" section (#story) on the About Us
 * page. Renders no markup of its own — ported from public/assets/founding-story-animation.js,
 * which operated the same way (scoped selectors against already-rendered DOM), just wired into a
 * React effect instead of a page-load <script>. Dynamically imported with ssr:false so GSAP only
 * loads on this route.
 */
export function FoundingStoryAnimation() {
  useEffect(() => {
    const section = document.getElementById("story");
    if (!section) return;
    let stale = false;
    initFoundingStoryAnimation(section, () => stale).catch(() => {});
    return () => {
      stale = true;
      destroyFoundingStoryAnimation(section);
    };
  }, []);

  return null;
}
