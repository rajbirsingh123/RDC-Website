"use client";

import { useLanguage } from "./LanguageContext";

/** t(key, fallback) — dict miss or English falls back to the given (original) text. */
export function useTranslation() {
  const { t, lang, setLang } = useLanguage();
  return { t, lang, setLang };
}
