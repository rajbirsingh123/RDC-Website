"use client";

import { useState } from "react";
import type { ChangeEvent } from "react";
import { T, useT } from "@/lib/i18n/T";
import { computeAffordability, formatMoney, formatPercentValue } from "@/lib/mortgageMath";

const AMORTIZATION_OPTIONS: Array<{ value: number; key: string; fallback: string }> = [
  { value: 15, key: "ac_15yr", fallback: "15 Years" },
  { value: 20, key: "ac_20yr", fallback: "20 Years" },
  { value: 25, key: "ac_25yr", fallback: "25 Years" },
  { value: 30, key: "ac_30yr", fallback: "30 Years" },
];

const toNumber = (value: string) => Number(value) || 0;

/**
 * Ported from the legacy site's affordability calculator (script.js
 * `updateAffordabilityCalculator`). Same inputs/outputs/defaults; the GDS/TDS
 * math lives in lib/mortgageMath.ts's `computeAffordability` (verbatim port)
 * — this component only wires the controlled form state to it and re-derives
 * results every render, the React equivalent of the old input/change listener.
 */
export function AffordabilityCalculator() {
  const t = useT();

  const [applicantIncome, setApplicantIncome] = useState(120000);
  const [coApplicantIncome, setCoApplicantIncome] = useState(60000);
  const [monthlyDebt, setMonthlyDebt] = useState(650);
  const [heating, setHeating] = useState(150);
  const [amortizationYears, setAmortizationYears] = useState(25);
  const [interestRate, setInterestRate] = useState(5);
  const [annualPropertyTax, setAnnualPropertyTax] = useState(4800);
  const [condoFees, setCondoFees] = useState(0);
  const [downPayment, setDownPayment] = useState(80000);

  const handleNumberChange = (setter: (value: number) => void) => (event: ChangeEvent<HTMLInputElement>) =>
    setter(toNumber(event.target.value));

  const result = computeAffordability({
    applicantIncome,
    coApplicantIncome,
    monthlyDebt,
    heating,
    amortizationYears: amortizationYears || 25,
    annualRate: interestRate,
    annualPropertyTax,
    condoFees,
    downPayment,
  });

  const {
    maxHomePrice,
    maxMonthlyMortgage,
    totalMonthlyExpenses,
    paymentWithInsurance,
    baseLoan,
    loanWithInsurance,
    housingExpenses,
    paymentCount,
  } = result;

  return (
    <div className="advanced-calc-layout">
      <form className="calculator-card advanced-calc-form calc-input-card" id="affordabilityCalculatorForm">
        <div className="calc-form-header">
          <h3>
            <T k="ac_income_h3">Annual Incomes</T>
          </h3>
        </div>
        <div className="calc-field-grid">
          <div>
            <label className="form-label" htmlFor="affordApplicantIncome">
              <T k="ac_applicant">Applicant*</T>
            </label>
            <input
              id="affordApplicantIncome"
              className="form-control form-control-lg"
              type="number"
              min={0}
              step={1000}
              value={applicantIncome}
              onChange={handleNumberChange(setApplicantIncome)}
            />
          </div>
          <div>
            <label className="form-label" htmlFor="affordCoApplicantIncome">
              <T k="ac_coapplicant">Co-Applicant</T>
            </label>
            <input
              id="affordCoApplicantIncome"
              className="form-control form-control-lg"
              type="number"
              min={0}
              step={1000}
              value={coApplicantIncome}
              onChange={handleNumberChange(setCoApplicantIncome)}
            />
          </div>
        </div>

        <h3 className="calc-subhead">
          <T k="ac_expenses_h3">Monthly Expenses</T>
        </h3>
        <div className="calc-field-grid">
          <div>
            <label className="form-label" htmlFor="affordMonthlyDebt">
              <T k="ac_monthly_debt">Monthly Debt Payments</T>
            </label>
            <input
              id="affordMonthlyDebt"
              className="form-control form-control-lg"
              type="number"
              min={0}
              step={25}
              value={monthlyDebt}
              onChange={handleNumberChange(setMonthlyDebt)}
            />
          </div>
          <div>
            <label className="form-label" htmlFor="affordHeating">
              <T k="ac_heating">Monthly Heating Cost</T>
            </label>
            <input
              id="affordHeating"
              className="form-control form-control-lg"
              type="number"
              min={0}
              step={10}
              value={heating}
              onChange={handleNumberChange(setHeating)}
            />
          </div>
        </div>

        <h3 className="calc-subhead">
          <T k="ac_mortgage_info_h3">Mortgage Info</T>
        </h3>
        <div className="calc-field-grid">
          <div>
            <label className="form-label" htmlFor="affordAmortization">
              <T k="ac_amortization">Amortization</T>
            </label>
            <select
              id="affordAmortization"
              className="form-select form-select-lg"
              value={amortizationYears}
              onChange={(event) => setAmortizationYears(toNumber(event.target.value))}
            >
              {AMORTIZATION_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {t(option.key, option.fallback)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="form-label" htmlFor="affordInterestRate">
              <T k="ac_interest_rate">Interest Rate*</T>
            </label>
            <input
              id="affordInterestRate"
              className="form-control form-control-lg"
              type="number"
              min={0}
              step={0.01}
              value={interestRate}
              onChange={handleNumberChange(setInterestRate)}
            />
          </div>
        </div>

        <h3 className="calc-subhead">
          <T k="ac_addl_h3">Additional Housing Costs</T>
        </h3>
        <div className="calc-field-grid">
          <div>
            <label className="form-label" htmlFor="affordPropertyTax">
              <T k="ac_property_tax">Annual Property Tax</T>
            </label>
            <input
              id="affordPropertyTax"
              className="form-control form-control-lg"
              type="number"
              min={0}
              step={100}
              value={annualPropertyTax}
              onChange={handleNumberChange(setAnnualPropertyTax)}
            />
          </div>
          <div>
            <label className="form-label" htmlFor="affordCondoFees">
              <T k="ac_condo_fees">Monthly Condo Fees</T>
            </label>
            <input
              id="affordCondoFees"
              className="form-control form-control-lg"
              type="number"
              min={0}
              step={25}
              value={condoFees}
              onChange={handleNumberChange(setCondoFees)}
            />
          </div>
          <div className="field-full">
            <label className="form-label" htmlFor="affordDownPayment">
              <T k="ac_avail_down">Available Down Payment</T>
            </label>
            <input
              id="affordDownPayment"
              className="form-control form-control-lg"
              type="number"
              min={0}
              step={1000}
              value={downPayment}
              onChange={handleNumberChange(setDownPayment)}
            />
          </div>
        </div>
      </form>

      <aside className="calc-summary-card">
        <h2>
          <T k="ac_summary_h2">What Can I Afford?</T>
        </h2>
        <p className="summary-intro" id="affordScenarioText">
          {maxHomePrice > 0 ? (
            <T k="calc_afford_fits">
              Based on the information provided, this scenario should fit within common affordability guidelines.
            </T>
          ) : (
            <T k="calc_afford_short">
              Based on the information provided, the current inputs do not leave enough room for a mortgage payment.
            </T>
          )}
        </p>
        <div className="summary-hero">
          <span>
            <T k="ac_max_home_price">Max. Home Price</T>
          </span>
          <output id="affordMaxHomePrice">{formatMoney(maxHomePrice)}</output>
        </div>
        <div className="summary-pair">
          <div>
            <span>
              <T k="ac_max_monthly_payment">Max Monthly Mortgage Payment</T>
            </span>
            <strong id="affordMaxPayment">{formatMoney(maxMonthlyMortgage)}</strong>
          </div>
          <div>
            <span>
              <T k="ac_total_est_expenses">Total Estimated Monthly Expenses</T>
            </span>
            <strong id="affordTotalExpenses">{formatMoney(totalMonthlyExpenses)}</strong>
          </div>
        </div>
        <dl className="summary-list">
          <div>
            <dt>
              <T k="ac_monthly_mortgage">Monthly Mortgage</T>
            </dt>
            <dd id="affordMonthlyMortgage">{formatMoney(paymentWithInsurance)}</dd>
          </div>
          <div>
            <dt>
              <T k="ac_dt_rate">Interest Rate</T>
            </dt>
            <dd id="affordRate">{formatPercentValue(interestRate)}</dd>
          </div>
          <div>
            <dt>
              <T k="ac_dt_loan_amount">Loan Amount</T>
            </dt>
            <dd id="affordLoanAmount">{formatMoney(baseLoan)}</dd>
          </div>
          <div>
            <dt>
              <T k="ac_dt_term">Mortgage Term</T>
            </dt>
            <dd>
              <T k="ac_dt_term_val">5 Years</T>
            </dd>
          </div>
          <div>
            <dt>
              <T k="ac_dt_freq">Payment Frequency</T>
            </dt>
            <dd>
              <T k="ac_dt_freq_val">Monthly</T>
            </dd>
          </div>
          <div>
            <dt>
              <T k="ac_dt_amort_period">Amortization Period</T>
            </dt>
            <dd id="affordAmortizationOut">
              {amortizationYears || 25} {t("calc_unit_years", "Years")}
            </dd>
          </div>
          <div>
            <dt>
              <T k="ac_dt_num_payments">No. of Payments</T>
            </dt>
            <dd id="affordPaymentCount">{paymentCount}</dd>
          </div>
        </dl>
        <h3>
          <T k="ac_mdi_h3">Mortgage Default Insurance</T>
        </h3>
        <dl className="summary-list">
          <div>
            <dt>
              <T k="ac_max_mortgage_ins">Max Mortgage + Insurance</T>
            </dt>
            <dd id="affordMortgageWithInsurance">{formatMoney(loanWithInsurance)}</dd>
          </div>
          <div>
            <dt>
              <T k="ac_payment_after_ins">Payment After Insurance</T>
            </dt>
            <dd id="affordPaymentWithInsurance">{formatMoney(paymentWithInsurance)}</dd>
          </div>
        </dl>
        <h3>
          <T k="ac_est_expenses_h3">Estimated Monthly Expenses</T>
        </h3>
        <dl className="summary-list">
          <div>
            <dt>
              <T k="ac_exp_mortgage">Monthly Mortgage Payment</T>
            </dt>
            <dd id="affordExpenseMortgage">{formatMoney(paymentWithInsurance)}</dd>
          </div>
          <div>
            <dt>
              <T k="ac_exp_debt">Monthly Debt Payments</T>
            </dt>
            <dd id="affordExpenseDebt">{formatMoney(monthlyDebt)}</dd>
          </div>
          <div>
            <dt>
              <T k="ac_exp_housing">Additional Housing Expenses</T>
            </dt>
            <dd id="affordHousingExpenses">{formatMoney(housingExpenses)}</dd>
          </div>
        </dl>
      </aside>
    </div>
  );
}
