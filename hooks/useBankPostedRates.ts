"use client";

import { useEffect, useState } from "react";
import { fetchPostedBankRates, type PostedBankRates } from "@/data/rates";

const REFRESH_INTERVAL_MS = 60 * 60 * 1000;

export function useBankPostedRates(): PostedBankRates | null {
  const [rates, setRates] = useState<PostedBankRates | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = () => {
      fetchPostedBankRates().then((next) => {
        if (!cancelled && next) setRates(next);
      });
    };

    load();
    const interval = setInterval(load, REFRESH_INTERVAL_MS);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return rates;
}
