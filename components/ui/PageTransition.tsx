"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Fades + rises each page's content in on route change, so navigating the site feels
 *  continuous instead of an abrupt hard-cut. Keyed by pathname so it replays per route. */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="page-transition">
      {children}
    </div>
  );
}
