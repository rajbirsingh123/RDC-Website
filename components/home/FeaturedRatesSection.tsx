"use client";

import Link from "next/link";
import { CountUp } from "@/components/ui/CountUp";
import { T } from "@/lib/i18n/T";
import { useHomeRates } from "@/hooks/useHomeRates";

export function FeaturedRatesSection() {
  const rates = useHomeRates();

  return (
    <section className="featured-rates" id="featured-rates">
      <div className="container-xl">
        <div className="section-heading text-center">
          <p className="section-kicker">
            <T k="home_featured_kicker">Our featured rates in Ontario</T>
          </p>
          <h2>
            <T k="home_featured_title">Rates start from</T>
          </h2>
        </div>
        <div className="home-link-panel rate-link-panel">
          <Link href="/contact-us/">
            <CountUp to={rates.twoYearFixed} decimals={2} suffix="%" />
            <span>
              <T k="home_rate_2yr_fixed">2-Year Fixed Rate Mortgage</T>
            </span>
            <i className="bi bi-arrow-right" />
          </Link>
          <Link href="/contact-us/">
            <CountUp to={rates.threeYearFixedHighRatio} decimals={2} suffix="%" />
            <span>
              <T k="home_rate_3yr_highratio">3-Year Fixed High-Ratio Mortgage</T>
            </span>
            <i className="bi bi-arrow-right" />
          </Link>
          <Link href="/contact-us/">
            <CountUp to={rates.fiveYearFixedHighRatio} decimals={2} suffix="%" />
            <span>
              <T k="home_rate_5yr_highratio">5-Year Fixed High-Ratio Mortgage</T>
            </span>
            <i className="bi bi-arrow-right" />
          </Link>
          <Link href="/contact-us/">
            <CountUp to={rates.fiveYearVariableHighRatio} decimals={2} suffix="%" />
            <span>
              <T k="home_rate_5yr_variable">5-Year Variable High-Ratio Mortgage</T>
            </span>
            <i className="bi bi-arrow-right" />
          </Link>
        </div>
      </div>
    </section>
  );
}
