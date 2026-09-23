"use client";

import type { ReactNode } from "react";
import { useTranslation } from "./useTranslation";

/** Maps the old markup's data-i18n="key">English text< pattern: <T k="key">English</T>. */
export function T({ k, children }: { k: string; children: string | string[] }) {
  const { t } = useTranslation();
  const fallback = Array.isArray(children) ? children.join("") : children;
  return <>{t(k, fallback)}</>;
}

/** For strings containing inline markup (old data-i18n-html) — fallback is raw HTML. */
export function THtml({ k, html }: { k: string; html: string }) {
  const { t } = useTranslation();
  return <span dangerouslySetInnerHTML={{ __html: t(k, html) }} />;
}

export function useT() {
  const { t } = useTranslation();
  return t;
}

export type { ReactNode };
