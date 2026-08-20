/* Royal Den Capital - "Story Behind Our Crest" section animation.
   Built with GSAP + ScrollTrigger for eased, choreographed motion instead of
   the flat two-keyframe CSS loops. Fully skipped under prefers-reduced-motion,
   and degrades to plain static content if the GSAP CDN fails to load. */
(function () {
  "use strict";

  var section = document.getElementById("story");
  if (!section) return;
  if (typeof window.gsap === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  if (window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  var scrollTrigger = function (trigger, start) {
    return window.ScrollTrigger
      ? { trigger: trigger, start: start || "top 84%", once: true }
      : undefined;
  };

  // 1. Kicker / heading / lead copy -- gentle staggered rise.
  var headingEls = section.querySelectorAll(
    ".founding-story-heading .section-kicker, .founding-story-heading h2, .founding-story-heading p"
  );
  if (headingEls.length) {
    gsap.from(headingEls, {
      opacity: 0,
      y: 26,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.12,
      scrollTrigger: scrollTrigger(".founding-story-heading"),
    });
  }

  // 2. Banner plaque -- settles into place, then a soft breathing glow and a
  // single elegant light sweep (repeating only rarely, not on a tight loop).
  var wrap = section.querySelector(".founding-story-banner-wrap");
  var frame = section.querySelector(".founding-story-banner-frame");
  var glow = section.querySelector(".founding-story-banner-glow");
  var shine = section.querySelector(".founding-story-banner-shine");

  if (wrap && frame) {
    var bannerTl = gsap.timeline({
      scrollTrigger: scrollTrigger(wrap, "top 80%"),
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
          onComplete: function () {
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

    if (shine) {
      bannerTl.fromTo(
        shine,
        { xPercent: -160 },
        {
          xPercent: 220,
          duration: 1.3,
          ease: "power2.inOut",
          repeat: -1,
          repeatDelay: 6.5,
        },
        "-=0.3"
      );
    }
  }

  // 3. Symbol cards -- staggered rise with a quick icon "pop" just behind.
  var cards = section.querySelectorAll(".founding-story-card");
  if (cards.length) {
    var cardTl = gsap.timeline({
      scrollTrigger: scrollTrigger(".founding-story-grid"),
    });

    cardTl.from(cards, {
      opacity: 0,
      y: 34,
      scale: 0.96,
      duration: 0.65,
      ease: "power3.out",
      stagger: 0.09,
    });

    var icons = section.querySelectorAll(".founding-story-card i");
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
  var nameCols = section.querySelectorAll(".founding-story-name > div");
  if (nameCols.length) {
    gsap.from(nameCols, {
      opacity: 0,
      y: 22,
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.15,
      scrollTrigger: scrollTrigger(".founding-story-name"),
    });
  }

  var lead = section.querySelector(".founding-story-lead");
  if (lead) {
    gsap.from(lead, {
      opacity: 0,
      y: 20,
      duration: 0.7,
      ease: "power3.out",
      scrollTrigger: scrollTrigger(lead),
    });
  }

  var quote = section.querySelector(".founding-story-quote");
  if (quote) {
    gsap.from(quote, {
      opacity: 0,
      y: 18,
      scale: 0.97,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: scrollTrigger(quote),
    });
  }

  var tagline = section.querySelector(".founding-story-tagline");
  if (tagline) {
    gsap.from(tagline.children, {
      opacity: 0,
      y: 16,
      duration: 0.6,
      ease: "power3.out",
      stagger: 0.12,
      scrollTrigger: scrollTrigger(tagline),
    });
  }
})();
