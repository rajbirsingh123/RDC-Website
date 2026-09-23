"use client";

import { useEffect, useState } from "react";
import { DEFAULT_RATES, fetchHomeRates, type HomeRates } from "@/data/rates";

const REFRESH_INTERVAL_MS = 15 * 60 * 1000;

export function useHomeRates(): HomeRates {
  const [rates, setRates] = useState<HomeRates>(DEFAULT_RATES);

  useEffect(() => {
    let cancelled = false;

    const load = () => {
      fetchHomeRates().then((next) => {
        if (!cancelled) setRates(next);
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
