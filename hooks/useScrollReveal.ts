"use client";

import { useEffect } from "react";
import type { RefObject } from "react";

const REVEAL_SELECTOR = [
  ".section-heading", ".rate-card", ".service-card", ".mortgage-service-card", ".feature-card",
  ".team-card", ".hierarchy-node", ".type-card", ".goal-grid article", ".industry-grid article", ".doc-checklist li",
  ".renovation-panel", ".renovation-grid article", ".renovation-process article",
  ".mortgage-detail-card", ".detail-two-up article", ".detail-cta-panel", ".related-mortgage-links a",
  ".compare-table-wrap", ".image-stat", ".cta-panel", ".contact-form-panel", ".contact-card", ".consult-card",
  ".rate-comparison div", ".rate-savings-card", ".home-link-panel a", ".home-link-list a", ".service-link-grid a",
  ".career-benefit-list section", ".career-process-grid article", ".career-standard-grid article",
  ".career-callout", ".career-requirements", ".career-form", ".career-process-intro",
  ".career-event-gallery figure", ".career-event-badge", ".career-growth-points div", ".career-teaser",
  ".knowledge-block", ".knowledge-flow div", ".formula-panel", ".knowledge-diagram", ".payment-map",
  ".decision-tree", ".knowledge-help-list",
  ".check-list li", ".partner-strip img", ".accordion-item", ".funding-band",
  ".calc-input-card", ".calc-summary-card", ".breakdown-card",
  ".event-point-row span", ".event-photo-card", ".event-timeline-item",
  ".event-speaker-card", ".event-stat-card", ".event-card",
  ".event-featured", ".event-more-teaser",
].join(", ");

/** Fades + rises matching elements into view as they scroll in. Scoped to a container ref instead of document-wide. */
export function useScrollReveal(containerRef: RefObject<HTMLElement>) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const targets = Array.from(container.querySelectorAll<HTMLElement>(REVEAL_SELECTOR));
    if (!targets.length) return;

    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    targets.forEach((el, index) => {
      const startsNearViewport = el.getBoundingClientRect().top < window.innerHeight * 1.15;
      if (startsNearViewport) {
        el.classList.add("is-visible");
        return;
      }
      el.classList.add("reveal");
      el.style.transitionDelay = `${Math.min((index % 4) * 0.05, 0.15)}s`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.01, rootMargin: "0px 0px 80px 0px" }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [containerRef]);
}
