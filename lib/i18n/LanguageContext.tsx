"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { translations, type LangCode } from "./translations";

export type Lang = "en" | LangCode;

const STORAGE_KEY = "rdc_lang";
const DEFAULT_LANG: Lang = "en";

export const LANGS: Record<Lang, { label: string; short: string }> = {
  en: { label: "English", short: "EN" },
  fr: { label: "Français", short: "FR" },
  pa: { label: "ਪੰਜਾਬੀ", short: "PA" },
  zh: { label: "中文", short: "ZH" },
};

/** Languages shown in the language switcher. Punjabi is hidden for now but its
 *  translations and the "pa" language code stay intact so it can be re-enabled later. */
export const VISIBLE_LANGS: Lang[] = ["en", "fr", "zh"];

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string, fallback: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getStoredLang(): Lang {
  if (typeof window === "undefined") return DEFAULT_LANG;
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v && VISIBLE_LANGS.includes(v as Lang) ? (v as Lang) : DEFAULT_LANG;
  } catch {
    return DEFAULT_LANG;
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);

  useEffect(() => {
    setLangState(getStoredLang());
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    const safe = VISIBLE_LANGS.includes(next) ? next : DEFAULT_LANG;
    setLangState(safe);
    try {
      window.localStorage.setItem(STORAGE_KEY, safe);
    } catch {
      /* ignore storage failures (private browsing etc.) */
    }
  }, []);

  const t = useCallback(
    (key: string, fallback: string) => {
      if (lang === "en") return fallback;
      const dict = translations[lang as LangCode];
      return dict?.[key] ?? fallback;
    },
    [lang]
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
