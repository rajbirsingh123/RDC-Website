"use client";

import { useEffect, useRef, useState } from "react";

export function CountUp({
  to,
  decimals = 0,
  suffix = "",
  prefix = "",
  as: Tag = "strong",
}: {
  to: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  as?: keyof JSX.IntrinsicElements;
}) {
  const ref = useRef<HTMLElement>(null);
  const [text, setText] = useState(`${prefix}${(0).toFixed(decimals)}${suffix}`);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const animate = () => {
      if (prefersReducedMotion) {
        setText(`${prefix}${to.toFixed(decimals)}${suffix}`);
        return;
      }
      const duration = 1200;
      const start = performance.now();
      const step = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setText(`${prefix}${(to * eased).toFixed(decimals)}${suffix}`);
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    if (!("IntersectionObserver" in window)) {
      animate();
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [to, decimals, suffix, prefix]);

  const Component = Tag as any;
  return <Component ref={ref}>{text}</Component>;
}
