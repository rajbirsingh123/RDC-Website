"use client";

import { useEffect } from "react";
import { initFoundingStoryVideo } from "@/lib/about/foundingStoryVideo";

/**
 * Auto-plays/pauses the #crestStoryVideo element as it scrolls in and out of view. Ported from
 * public/assets/founding-story-video.js. Renders no markup — it just attaches behaviour to the
 * <video> already rendered in the page. Dynamically imported with ssr:false.
 */
export function FoundingStoryVideo() {
  useEffect(() => {
    const video = document.getElementById("crestStoryVideo") as HTMLVideoElement | null;
    if (!video) return;
    return initFoundingStoryVideo(video);
  }, []);

  return null;
}
