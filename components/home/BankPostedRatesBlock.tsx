"use client";

import { useState } from "react";
import { CountUp } from "@/components/ui/CountUp";
import { useBankPostedRates } from "@/hooks/useBankPostedRates";

function formatAsOfDate(isoDate: string) {
  return new Date(`${isoDate}T00:00:00`).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function calculateMonthlyPayment(principal: number, annualRate: number, amortizationYears: number) {
  const monthlyRate = annualRate / 100 / 12;
  const totalPayments = amortizationYears * 12;

  if (monthlyRate === 0) return principal / totalPayments;
  return (principal * monthlyRate * (1 + monthlyRate) ** totalPayments) / ((1 + monthlyRate) ** totalPayments - 1);
}

export function BankPostedRatesBlock() {
  const postedRates = useBankPostedRates();
  const [rateType, setRateType] = useState<"fixed" | "variable">("fixed");

  if (!postedRates) return null;

  const asOfDate = rateType === "fixed" ? postedRates.fixed.asOfDate : postedRates.variable.asOfDate;
  const featuredRate = rateType === "fixed" ? postedRates.fixed.fiveYear : postedRates.variable.primeRate;
  const featuredLabel = rateType === "fixed" ? "5-Year Conventional" : "Prime Rate";
  const exampleDiscount = rateType === "fixed" ? 1.75 : 1.25;
  const exampleMortgage = 500000;
  const exampleTermYears = 5;
  const exampleNegotiatedRate = Math.max(featuredRate - exampleDiscount, 0);
  const postedPayment = calculateMonthlyPayment(exampleMortgage, featuredRate, 25);
  const negotiatedPayment = calculateMonthlyPayment(exampleMortgage, exampleNegotiatedRate, 25);
  const estimatedMonthlySavings = Math.max(postedPayment - negotiatedPayment, 0);
  const estimatedTermSavings = estimatedMonthlySavings * 12 * exampleTermYears;

  return (
    <div className="bank-posted-rates">
      <div className="bank-posted-rates-layout">
        <div className="bank-posted-rates-content">
          <p className="section-kicker">Live Market Data</p>
          <h3>Bank of Canada posted mortgage rates</h3>
          <p>
            Posted mortgage-rate references from Canada&apos;s major chartered banks, published by the Bank of Canada.
            These national benchmark rates are shown for Ontario borrowers as market context.
          </p>

          <div className="rate-type-toggle" role="tablist" aria-label="Rate type">
            <button type="button" role="tab" aria-selected={rateType === "fixed"} className={rateType === "fixed" ? "active" : ""} onClick={() => setRateType("fixed")}>
              Fixed
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={rateType === "variable"}
              className={rateType === "variable" ? "active" : ""}
              onClick={() => setRateType("variable")}
            >
              Variable
            </button>
          </div>

          {rateType === "fixed" ? (
            <div className="rate-comparison">
              <div>
                <span>1-Year Conventional</span>
                <CountUp to={postedRates.fixed.oneYear} decimals={2} suffix="%" />
              </div>
              <div>
                <span>3-Year Conventional</span>
                <CountUp to={postedRates.fixed.threeYear} decimals={2} suffix="%" />
              </div>
              <div>
                <span>5-Year Conventional</span>
                <CountUp to={postedRates.fixed.fiveYear} decimals={2} suffix="%" />
              </div>
            </div>
          ) : (
            <div className="rate-comparison rate-comparison--single">
              <div>
                <span>Prime Rate</span>
                <CountUp to={postedRates.variable.primeRate} decimals={2} suffix="%" />
              </div>
            </div>
          )}

          <p className="bank-posted-rates-caption">
            {rateType === "variable" && "Variable mortgage rates are typically quoted as Prime rate minus a lender discount. "}
            Canada-wide data as of {formatAsOfDate(asOfDate)} · Source:{" "}
            <a
              href="https://www.bankofcanada.ca/rates/banking-and-financial-statistics/posted-interest-rates-offered-by-chartered-banks/"
              target="_blank"
              rel="noreferrer"
            >
              Bank of Canada
            </a>
          </p>
        </div>

        <div className="bank-posted-rates-visual">
          <div
            className="rate-savings-card bpr-savings-card is-visible"
            role="img"
            aria-label={`Example RDC lender comparison: an illustrative negotiated rate of ${exampleNegotiatedRate.toFixed(
              2
            )}% versus the live ${featuredLabel} Bank of Canada reference rate of ${featuredRate.toFixed(2)}%. Estimated savings are about $${Math.round(
              estimatedMonthlySavings
            ).toLocaleString()} per month on a $${exampleMortgage.toLocaleString()} mortgage.`}
          >
            <div className="rsc-top">
              <div className="rsc-lender">
                <img src="/assets/rdc-logo.png" alt="" aria-hidden="true" />
                <span>RDC&apos;s Lenders</span>
              </div>
              <div className="rsc-save-bubble">
                <span className="rsc-save-label">Est. Save</span>
                <strong className="rsc-save-amount">
                  $<CountUp to={Math.round(estimatedMonthlySavings)} as="span" />
                  /mo
                </strong>
              </div>
            </div>
            <div className="rsc-new-rate">
              <CountUp to={exampleNegotiatedRate} decimals={2} suffix="%" />
            </div>
            <div className="rsc-photo">
              <img className="rsc-photo-before" src="/assets/rate-savings-home.jpg" alt="" aria-hidden="true" loading="lazy" />
              <div className="rsc-photo-after">
                <img src="/assets/rate-savings-home.jpg" alt="" aria-hidden="true" loading="lazy" />
              </div>
              <div className="rsc-divider" aria-hidden="true" />
            </div>
            <div className="rsc-old-rate">
              <span>Bank of Canada Posted Reference</span>
              <strong>
                {featuredRate.toFixed(2)}%<i className="rsc-strike" aria-hidden="true" />
              </strong>
            </div>
            <div className="rsc-formula" aria-hidden="true">
              <div className="rsc-formula-chip">
                <i className="bi bi-house-door-fill" />
                <span>${Math.round(exampleMortgage / 1000)}K</span>
                <small>Mortgage</small>
              </div>
              <span className="rsc-formula-op">
                <i className="bi bi-arrow-right" />
              </span>
              <div className="rsc-formula-chip">
                <i className="bi bi-graph-down-arrow" />
                <span>{exampleDiscount.toFixed(2)}%</span>
                <small>Rate Gap</small>
              </div>
              <span className="rsc-formula-op">
                <i className="bi bi-arrow-right" />
              </span>
              <div className="rsc-formula-chip">
                <i className="bi bi-calendar3" />
                <span>{exampleTermYears} Years</span>
                <small>Term</small>
              </div>
              <span className="rsc-formula-op">
                <i className="bi bi-arrow-right" />
              </span>
              <div className="rsc-formula-chip rsc-formula-chip--result">
                <i className="bi bi-piggy-bank-fill" />
                <span>~${Math.round(estimatedTermSavings / 1000)}K</span>
                <small>Saved</small>
              </div>
            </div>
            <p className="rsc-caption">
              Uses live Bank of Canada data as of {formatAsOfDate(asOfDate)} and an example RDC negotiated discount.
              Actual rates and savings depend on your file.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
