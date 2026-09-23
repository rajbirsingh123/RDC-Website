"use client";

import { useState } from "react";
import type { ChangeEvent } from "react";
import { T, useT } from "@/lib/i18n/T";
import {
  buildAmortizationRows,
  estimateLandTransferTax,
  estimateMortgageInsurance,
  formatMoney,
  formatPercentValue,
  mortgagePayment,
  paymentFrequencyDetails,
  percentFormatter,
  type PaymentFrequency,
} from "@/lib/mortgageMath";
import { AmortizationTable } from "./AmortizationTable";

const TERM_OPTIONS: Array<{ value: number; key: string; fallback: string }> = [
  { value: 1, key: "pc_1yr", fallback: "1 Year" },
  { value: 2, key: "pc_2yr", fallback: "2 Years" },
  { value: 3, key: "pc_3yr", fallback: "3 Years" },
  { value: 4, key: "pc_4yr", fallback: "4 Years" },
  { value: 5, key: "pc_5yr", fallback: "5 Years" },
];

const AMORTIZATION_OPTIONS: Array<{ value: number; key: string; fallback: string }> = [
  { value: 15, key: "pc_15yr", fallback: "15 Years" },
  { value: 20, key: "pc_20yr", fallback: "20 Years" },
  { value: 25, key: "pc_25yr", fallback: "25 Years" },
  { value: 30, key: "pc_30yr", fallback: "30 Years" },
];

const FREQUENCY_OPTIONS: Array<{ value: PaymentFrequency; key: string; fallback: string }> = [
  { value: "monthly", key: "pc_monthly12", fallback: "Monthly (12x per year)" },
  { value: "semi-monthly", key: "pc_semimonthly", fallback: "Semi-Monthly" },
  { value: "biweekly", key: "pc_biweekly", fallback: "Bi-Weekly" },
  { value: "accelerated-biweekly", key: "pc_accel_biweekly", fallback: "Accelerated Bi-Weekly" },
  { value: "weekly", key: "pc_weekly", fallback: "Weekly" },
  { value: "accelerated-weekly", key: "pc_accel_weekly", fallback: "Accelerated Weekly" },
];

const PROVINCE_OPTIONS: Array<{ value: string; key: string; fallback: string }> = [
  { value: "ON", key: "pc_prov_on", fallback: "Ontario" },
  { value: "AB", key: "pc_prov_ab", fallback: "Alberta" },
  { value: "BC", key: "pc_prov_bc", fallback: "British Columbia" },
  { value: "MB", key: "pc_prov_mb", fallback: "Manitoba" },
  { value: "NB", key: "pc_prov_nb", fallback: "New Brunswick" },
  { value: "NL", key: "pc_prov_nl", fallback: "Newfoundland and Labrador" },
  { value: "NS", key: "pc_prov_ns", fallback: "Nova Scotia" },
  { value: "PE", key: "pc_prov_pe", fallback: "Prince Edward Island" },
  { value: "QC", key: "pc_prov_qc", fallback: "Quebec" },
  { value: "SK", key: "pc_prov_sk", fallback: "Saskatchewan" },
];

const toNumber = (value: string) => Number(value) || 0;
const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
const round1 = (value: number) => Math.round(value * 10) / 10;

/**
 * Ported from the legacy site's advanced payment calculator (script.js
 * `updateAdvancedPaymentCalculator`). Same inputs/outputs/defaults; the math
 * itself lives in lib/mortgageMath.ts (verbatim port) — this component only
 * wires the controlled form state to it and re-derives results every render,
 * which is the React equivalent of the old input/change listener.
 */
export function PaymentCalculator() {
  const t = useT();

  const [propertyValue, setPropertyValue] = useState(500000);
  const [downPayment, setDownPayment] = useState(100000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(5);
  const [term, setTerm] = useState(5);
  const [amortization, setAmortization] = useState(25);
  const [frequency, setFrequency] = useState<PaymentFrequency>("monthly");
  const [province, setProvince] = useState("ON");
  const [isToronto, setIsToronto] = useState(false);

  // Property value drives the down payment $/% pair the same way the legacy
  // handler does: clamp the existing $ amount to the new home price, then
  // recompute the % field from that clamped amount.
  const handlePropertyValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    const homePrice = Math.max(toNumber(event.target.value), 0);
    const clampedDown = clamp(downPayment, 0, homePrice);
    setPropertyValue(homePrice);
    setDownPayment(clampedDown);
    setDownPaymentPercent(homePrice > 0 ? round1((clampedDown / homePrice) * 100) : 0);
  };

  // Editing the $ field recomputes the % field (rounded to 1 decimal, same as
  // the legacy `Number.isInteger(...) ? String(...) : toFixed(1)` display rule).
  const handleDownPaymentChange = (event: ChangeEvent<HTMLInputElement>) => {
    const clamped = clamp(toNumber(event.target.value), 0, propertyValue);
    setDownPayment(clamped);
    setDownPaymentPercent(propertyValue > 0 ? round1((clamped / propertyValue) * 100) : 0);
  };

  // Editing the % field is the reverse direction: it drives the $ field, and
  // (matching the legacy code) keeps the typed percent's own precision rather
  // than rounding it — only the derived $ amount gets rounded to a whole dollar.
  const handleDownPaymentPercentChange = (event: ChangeEvent<HTMLInputElement>) => {
    const clampedPct = clamp(toNumber(event.target.value), 0, 100);
    const newDown = Math.round(Math.min(propertyValue * (clampedPct / 100), propertyValue));
    setDownPaymentPercent(clampedPct);
    setDownPayment(newDown);
  };

  const handleInterestRateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInterestRate(Math.max(toNumber(event.target.value), 0));
  };

  // ---- Derive results every render (equivalent to the old recompute call) ----
  const homePrice = Math.max(propertyValue, 0);
  const annualRate = Math.max(interestRate, 0);
  const termYears = term || 5;
  const amortizationYears = amortization || 25;

  const baseLoan = Math.max(homePrice - downPayment, 0);
  const insurance = estimateMortgageInsurance(homePrice, downPayment);
  const totalLoan = baseLoan + insurance;
  const monthlyPrincipalInterest = mortgagePayment(totalLoan, annualRate, amortizationYears, 12);
  const frequencyInfo = paymentFrequencyDetails(frequency, monthlyPrincipalInterest);
  const numberOfPayments = Math.round(amortizationYears * frequencyInfo.periods);
  const amortizationResult = buildAmortizationRows(
    totalLoan,
    annualRate,
    amortizationYears,
    termYears,
    frequency,
    frequencyInfo.payment
  );
  const totalPaid = amortizationResult.rows.reduce((sum, row) => sum + row.payment, 0);
  const totalInterest = Math.max(totalPaid - totalLoan, 0);
  const ltt = estimateLandTransferTax(homePrice, province, isToronto);
  const downPct = homePrice > 0 ? downPayment / homePrice : 0;

  return (
    <>
      <div className="advanced-calc-layout">
      <form className="calculator-card advanced-calc-form calc-input-card" id="paymentCalculatorForm">
        <div className="calc-form-header">
          <h3>
            <T k="pc_details_h3">Mortgage Details</T>
          </h3>
        </div>
        <div className="calc-field-grid">
          <div className="field-full">
            <label className="form-label" htmlFor="paymentPropertyValue">
              <T k="pc_property_value">Property Value</T>
            </label>
            <input
              id="paymentPropertyValue"
              className="form-control form-control-lg"
              type="number"
              min={0}
              step={1000}
              value={propertyValue}
              onChange={handlePropertyValueChange}
            />
          </div>
          <div>
            <label className="form-label" htmlFor="paymentDownPayment">
              <T k="pc_down_payment">Down Payment</T>
            </label>
            <input
              id="paymentDownPayment"
              className="form-control form-control-lg"
              type="number"
              min={0}
              step={1000}
              value={downPayment}
              onChange={handleDownPaymentChange}
            />
          </div>
          <div>
            <label className="form-label" htmlFor="paymentDownPaymentPercent">
              <T k="pc_down_payment_pct">Down Payment %</T>
            </label>
            <input
              id="paymentDownPaymentPercent"
              className="form-control form-control-lg"
              type="number"
              min={0}
              max={100}
              step={0.1}
              value={downPaymentPercent}
              onChange={handleDownPaymentPercentChange}
            />
          </div>
          <div className="field-full">
            <label className="form-label" htmlFor="paymentInterestRate">
              <T k="pc_interest_rate">Interest Rate</T>
            </label>
            <input
              id="paymentInterestRate"
              className="form-control form-control-lg"
              type="number"
              min={0}
              step={0.01}
              value={interestRate}
              onChange={handleInterestRateChange}
            />
          </div>
          <div>
            <label className="form-label" htmlFor="paymentTerm">
              <T k="pc_term">Mortgage Term</T>
            </label>
            <select
              id="paymentTerm"
              className="form-select form-select-lg"
              value={term}
              onChange={(event) => setTerm(toNumber(event.target.value))}
            >
              {TERM_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {t(option.key, option.fallback)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="form-label" htmlFor="paymentRateType">
              <T k="pc_rate_type">Rate Type</T>
            </label>
            {/* Decorative in the original too: script.js never reads #paymentRateType,
                so it has no effect on the calculation there or here. */}
            <select id="paymentRateType" className="form-select form-select-lg" defaultValue="fixed">
              <option value="fixed">{t("pc_fixed", "Fixed")}</option>
              <option value="variable">{t("pc_variable", "Variable")}</option>
            </select>
          </div>
          <div>
            <label className="form-label" htmlFor="paymentAmortization">
              <T k="pc_amortization">Amortization</T>
            </label>
            <select
              id="paymentAmortization"
              className="form-select form-select-lg"
              value={amortization}
              onChange={(event) => setAmortization(toNumber(event.target.value))}
            >
              {AMORTIZATION_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {t(option.key, option.fallback)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="form-label" htmlFor="paymentFrequency">
              <T k="pc_freq">Payment Frequency</T>
            </label>
            <select
              id="paymentFrequency"
              className="form-select form-select-lg"
              value={frequency}
              onChange={(event) => setFrequency(event.target.value as PaymentFrequency)}
            >
              {FREQUENCY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {t(option.key, option.fallback)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <h3 className="calc-subhead">
          <T k="pc_location_h3">Location Details</T>
        </h3>
        <div className="calc-field-grid">
          <div>
            <label className="form-label" htmlFor="paymentProvince">
              <T k="pc_province">Province</T>
            </label>
            <select
              id="paymentProvince"
              className="form-select form-select-lg"
              value={province}
              onChange={(event) => setProvince(event.target.value)}
            >
              {PROVINCE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {t(option.key, option.fallback)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="form-label" aria-hidden="true">
              &nbsp;
            </label>
            <label className="calc-check">
              <input
                id="paymentToronto"
                type="checkbox"
                checked={isToronto}
                onChange={(event) => setIsToronto(event.target.checked)}
              />
              <span>
                <T k="pc_toronto">City of Toronto property</T>
              </span>
            </label>
          </div>
        </div>
      </form>

      <aside className="calc-summary-card">
        <h2>
          <T k="pc_summary_h2">Mortgage Summary</T>
        </h2>
        <h3>
          <T k="pc_estpayment_h3">Estimated Payment</T>
        </h3>
        <p className="summary-intro">
          <T k="pc_summary_intro">
            The following items show your expected payment schedule over the full amortization period.
          </T>
        </p>
        <div className="summary-hero">
          <output id="paymentCalcPayment">{formatMoney(frequencyInfo.payment)}</output>
          <small id="paymentCalcFrequency">
            <T k={frequencyInfo.labelKey}>{frequencyInfo.fallbackLabel}</T>
          </small>
        </div>
        <div className="summary-pair">
          <div>
            <span>
              <T k="pc_principal_interest">Principal &amp; Interest</T>
            </span>
            <strong id="paymentCalcPrincipalInterest">{formatMoney(frequencyInfo.payment)}</strong>
          </div>
          <div>
            <span>
              <T k="pc_mortgage_insurance">Mortgage Insurance</T>
            </span>
            <strong id="paymentCalcInsurance">{formatMoney(insurance)}</strong>
          </div>
        </div>
        <h3>
          <T k="pc_details_h3b">Mortgage details</T>
        </h3>
        <dl className="summary-list">
          <div>
            <dt>
              <T k="pc_home_price">Home Price</T>
            </dt>
            <dd id="paymentCalcHomePrice">{formatMoney(homePrice)}</dd>
          </div>
          <div>
            <dt>
              <T k="pc_dt_rate">Interest Rate</T>
            </dt>
            <dd id="paymentCalcRate">{formatPercentValue(annualRate)}</dd>
          </div>
          <div>
            <dt>
              <T k="pc_dt_down">Down Payment</T>
            </dt>
            <dd id="paymentCalcDown">
              {formatMoney(downPayment)} ({percentFormatter.format(downPct)})
            </dd>
          </div>
          <div>
            <dt>
              <T k="pc_dt_term">Mortgage Term</T>
            </dt>
            <dd id="paymentCalcTerm">
              {termYears} {termYears === 1 ? t("calc_unit_year", "Year") : t("calc_unit_years", "Years")}
            </dd>
          </div>
          <div>
            <dt>
              <T k="pc_total_loan_cost">Total Loan Cost</T>
            </dt>
            <dd id="paymentCalcLoanCost">{formatMoney(totalPaid)}</dd>
          </div>
          <div>
            <dt>
              <T k="pc_dt_amort">Amortization Period</T>
            </dt>
            <dd id="paymentCalcAmortization">
              {amortizationYears} {t("calc_unit_years", "Years")}
            </dd>
          </div>
          <div>
            <dt>
              <T k="pc_loan_amount">Loan Amount</T>
            </dt>
            <dd id="paymentCalcLoanAmount">{formatMoney(totalLoan)}</dd>
          </div>
          <div>
            <dt>
              <T k="pc_total_interest">Total Interest Cost</T>
            </dt>
            <dd id="paymentCalcInterest">{formatMoney(totalInterest)}</dd>
          </div>
          <div>
            <dt>
              <T k="pc_num_payments">No. of Payments</T>
            </dt>
            <dd id="paymentCalcCount">{numberOfPayments}</dd>
          </div>
          <div>
            <dt>
              <T k="pc_ltt">Land Transfer Tax</T>
            </dt>
            <dd id="paymentCalcLtt">{formatMoney(ltt)}</dd>
          </div>
        </dl>
      </aside>
      </div>

      <div className="calculator-card breakdown-card">
        <div className="calc-form-header">
          <h3>
            <T k="pc_breakdown_h3">Payments Breakdown</T>
          </h3>
          <span>
            <T k="pc_term_note">Term totals are highlighted at renewal.</T>
          </span>
        </div>
        <div className="table-responsive">
          <AmortizationTable amortization={amortizationResult} termYears={termYears} />
        </div>
        <p className="calc-note">
          <T k="pc_note">
            Estimates are for illustration only. Final payment, insurance, land transfer tax, rates, and lender
            conditions must be confirmed by a licensed mortgage professional and lawyer.
          </T>
        </p>
      </div>
    </>
  );
}
