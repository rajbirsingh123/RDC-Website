/* "Story Behind Our Crest" section animation — ported near-verbatim from the static site's
   public/assets/founding-story-animation.js (GSAP + ScrollTrigger). Logic/choreography unchanged;
   only the module wrapper, GSAP import (instead of window.gsap globals), and an init/destroy split
   for React mount/unmount were adapted. Fully skipped under prefers-reduced-motion, same as the
   original. See that file for the original comments. */
/* eslint-disable @typescript-eslint/no-explicit-any */

let gsapRef: any = null;
let scrollTriggerRef: any = null;

function scrollTriggerFor(trigger: Element | string, start = "top 84%") {
  return scrollTriggerRef ? { trigger, start, once: true } : undefined;
}

/**
 * Initializes the choreography scoped to a specific section element (the #story section).
 * `isStale`, if given, is checked right after the async GSAP import resolves — React's dev-mode Strict Mode
 * mounts every component twice (mount → cleanup → mount again) specifically to surface bugs like this one: a
 * slow-resolving first mount can start setting up tweens *after* the second mount already has, stepping on it.
 * Aborting before touching anything once superseded avoids that; production builds don't double-invoke effects.
 */
export async function initFoundingStoryAnimation(section: HTMLElement, isStale?: () => boolean) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const gsapModule = await import("gsap");
  const scrollTriggerModule = await import("gsap/ScrollTrigger");
  if (isStale?.()) return;
  gsapRef = gsapModule.gsap ?? gsapModule.default;
  scrollTriggerRef = scrollTriggerModule.ScrollTrigger;
  gsapRef.registerPlugin(scrollTriggerRef);
  const gsap = gsapRef;

  // 1. Kicker / heading / lead copy -- gentle staggered rise.
  const headingEls = section.querySelectorAll(
    ".founding-story-heading .section-kicker, .founding-story-heading h2, .founding-story-heading p"
  );
  if (headingEls.length) {
    gsap.from(headingEls, {
      opacity: 0,
      y: 26,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.12,
      scrollTrigger: scrollTriggerFor(section.querySelector(".founding-story-heading") ?? section),
    });
  }

  // 2. Banner plaque -- settles into place, then a soft breathing glow.
  const wrap = section.querySelector(".founding-story-banner-wrap");
  const frame = section.querySelector(".founding-story-banner-frame");
  const glow = section.querySelector(".founding-story-banner-glow");

  if (wrap && frame) {
    const bannerTl = gsap.timeline({
      scrollTrigger: scrollTriggerFor(wrap, "top 80%"),
    });

    bannerTl.from(frame, {
      opacity: 0,
      y: 46,
      scale: 0.94,
      duration: 1.1,
      ease: "power3.out",
    });

    if (glow) {
      bannerTl.to(
        glow,
        {
          opacity: 0.7,
          duration: 0.9,
          ease: "power2.out",
          onComplete: () => {
            gsap.to(glow, {
              opacity: 0.35,
              duration: 2.8,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
            });
          },
        },
        "-=0.5"
      );
    }
  }

  // 3. Symbol cards -- staggered rise with a quick icon "pop" just behind.
  const cards = section.querySelectorAll(".founding-story-card");
  if (cards.length) {
    const cardTl = gsap.timeline({
      scrollTrigger: scrollTriggerFor(section.querySelector(".founding-story-grid") ?? section),
    });

    cardTl.from(cards, {
      opacity: 0,
      y: 34,
      scale: 0.96,
      duration: 0.65,
      ease: "power3.out",
      stagger: 0.09,
    });

    const icons = section.querySelectorAll(".founding-story-card i");
    if (icons.length) {
      cardTl.from(
        icons,
        {
          opacity: 0,
          scale: 0,
          duration: 0.5,
          ease: "back.out(2.2)",
          stagger: 0.09,
        },
        "-=0.55"
      );
    }
  }

  // 4. Royal / Den split, closing lead line, pull-quote, and tagline.
  const nameCols = section.querySelectorAll(".founding-story-name > div");
  if (nameCols.length) {
    gsap.from(nameCols, {
      opacity: 0,
      y: 22,
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.15,
      scrollTrigger: scrollTriggerFor(section.querySelector(".founding-story-name") ?? section),
    });
  }

  const lead = section.querySelector(".founding-story-lead");
  if (lead) {
    gsap.from(lead, {
      opacity: 0,
      y: 20,
      duration: 0.7,
      ease: "power3.out",
      scrollTrigger: scrollTriggerFor(lead),
    });
  }

  const quote = section.querySelector(".founding-story-quote");
  if (quote) {
    gsap.from(quote, {
      opacity: 0,
      y: 18,
      scale: 0.97,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: scrollTriggerFor(quote),
    });
  }

  const tagline = section.querySelector(".founding-story-tagline");
  if (tagline && tagline.children.length) {
    gsap.from(Array.from(tagline.children), {
      opacity: 0,
      y: 16,
      duration: 0.6,
      ease: "power3.out",
      stagger: 0.12,
      scrollTrigger: scrollTriggerFor(tagline),
    });
  }

  // ScrollTriggers above are computed against the layout as it exists right now, but the
  // section's video poster, hero images, and web fonts are often still loading at this point —
  // once they finish and the page grows/shifts, those cached trigger positions go stale and a
  // `once: true` tween can end up never firing (stuck at its opacity:0 "from" state). Recompute
  // whenever anything that can change this section's layout finishes loading, plus a couple of
  // fallback passes so a slow-loading asset can't leave the trigger stuck on a stale position.
  const refresh = () => {
    // refresh() recalculates each trigger's start/end pixel bounds against the current layout;
    // update() then re-checks the current scroll position against those bounds immediately, so a
    // trigger the user already scrolled past (while its bounds were still stale) fires right away
    // instead of waiting for the next scroll event that may never come if they've stopped scrolling.
    scrollTriggerRef?.refresh();
    scrollTriggerRef?.update();
  };
  if (document.readyState === "complete") {
    requestAnimationFrame(refresh);
  } else {
    window.addEventListener("load", refresh, { once: true });
  }
  document.fonts?.ready?.then(refresh);
  section.querySelectorAll("video, img").forEach((media) => {
    if (media instanceof HTMLVideoElement) {
      if (media.readyState >= 1) refresh();
      else media.addEventListener("loadedmetadata", refresh, { once: true });
    } else if (media instanceof HTMLImageElement) {
      if (media.complete) refresh();
      else media.addEventListener("load", refresh, { once: true });
    }
  });
  window.setTimeout(refresh, 800);
  window.setTimeout(refresh, 2000);
}

/** Tears down GSAP tweens/ScrollTriggers created for this section, for clean unmount on route change. */
export function destroyFoundingStoryAnimation(section: HTMLElement) {
  scrollTriggerRef?.getAll().forEach((st: any) => {
    if (st.trigger === section || section.contains(st.trigger)) st.kill();
  });
  gsapRef?.globalTimeline.getChildren(true, true, false).forEach((tween: any) => {
    const target = tween.targets?.()[0];
    if (target instanceof Node && section.contains(target)) tween.kill();
  });
}
