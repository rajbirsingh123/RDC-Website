"use client";

import { useEffect, useState } from "react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const applyState = () => {
      setVisible(window.scrollY > 480);
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
  }, []);

  return (
    <button
      type="button"
      className={visible ? "back-to-top is-visible" : "back-to-top"}
      aria-label="Go to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <i className="bi bi-arrow-up" />
    </button>
  );
}
