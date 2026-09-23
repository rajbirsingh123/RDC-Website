"use client";

import { useEffect } from "react";

/** Loads Bootstrap's JS bundle client-side once (dropdowns/accordions/navbar-collapse). */
export function BootstrapClient() {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return null;
}
