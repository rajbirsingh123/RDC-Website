/* Mortgage/tax math ported verbatim from the static site's public/script.js.
   Formulas and numeric tiers are unchanged from the live site — only the
   wrapper (module exports, types, i18n label keys instead of a global t())
   was adapted for React. Estimates only; not financial advice. */

export const moneyFormatter = new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
  maximumFractionDigits: 0,
});

export const percentFormatter = new Intl.NumberFormat("en-CA", {
  style: "percent",
  maximumFractionDigits: 1,
});

export function formatMoney(value: number, maximumFractionDigits = 0): string {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits,
  }).format(Number.isFinite(value) ? value : 0);
}

export function formatPercentValue(value: number): string {
  return `${(Number.isFinite(value) ? value : 0).toFixed(2).replace(/\.00$/, "")}%`;
}

/** Ontario land transfer tax: published marginal-rate brackets. Estimate only. */
export function ontarioLandTransferTax(price: number): number {
  const brackets: Array<[number, number]> = [
    [55000, 0.005],
    [250000, 0.01],
    [400000, 0.015],
    [2000000, 0.02],
    [Infinity, 0.025],
  ];
  let tax = 0;
  let prevCap = 0;
  for (const [cap, rate] of brackets) {
    if (price > prevCap) {
      tax += (Math.min(price, cap) - prevCap) * rate;
    }
    prevCap = cap;
  }
  return tax;
}

/** CMHC-style mortgage default insurance premium schedule, by loan-to-value. Estimate only. */
export function insurancePremiumRate(loanToValuePct: number): number | null {
  if (loanToValuePct <= 65) return 0.006;
  if (loanToValuePct <= 75) return 0.006;
  if (loanToValuePct <= 80) return 0.01;
  if (loanToValuePct <= 85) return 0.017;
  if (loanToValuePct <= 90) return 0.024;
  if (loanToValuePct <= 95) return 0.04;
  return null;
}

export interface BasicMortgageSummary {
  monthly: number;
  downPct: number;
  loanToValuePct: number;
  totalInterest: number;
  ltt: number;
  principal: number;
}

/** Homepage's simple calculator: price/down/rate/years -> monthly payment + estimates. */
export function computeBasicMortgageSummary(
  price: number,
  down: number,
  annualRate: number,
  years: number
): BasicMortgageSummary {
  const principal = Math.max(price - down, 0);
  const months = Math.max(years * 12, 1);
  const monthlyRate = annualRate / 100 / 12;

  let monthly = principal / months;
  if (monthlyRate > 0) {
    monthly =
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, months))) /
      (Math.pow(1 + monthlyRate, months) - 1);
  }

  const downPct = price > 0 ? down / price : 0;
  const loanToValuePct = price > 0 ? (principal / price) * 100 : 0;
  const totalInterest = Math.max(monthly * months - principal, 0);
  const ltt = ontarioLandTransferTax(price);

  return { monthly, downPct, loanToValuePct, totalInterest, ltt, principal };
}

export type PaymentFrequency =
  | "monthly"
  | "semi-monthly"
  | "biweekly"
  | "accelerated-biweekly"
  | "weekly"
  | "accelerated-weekly";

export interface FrequencyDetail {
  labelKey: string;
  fallbackLabel: string;
  periods: number;
  payment: number;
}

export function paymentFrequencyDetails(
  frequency: PaymentFrequency | string,
  monthlyPayment: number
): FrequencyDetail {
  const details: Record<PaymentFrequency, FrequencyDetail> = {
    monthly: { labelKey: "calc_freq_monthly", fallbackLabel: "Monthly", periods: 12, payment: monthlyPayment },
    "semi-monthly": {
      labelKey: "calc_freq_semimonthly",
      fallbackLabel: "Semi-Monthly",
      periods: 24,
      payment: monthlyPayment / 2,
    },
    biweekly: {
      labelKey: "calc_freq_biweekly",
      fallbackLabel: "Bi-Weekly",
      periods: 26,
      payment: (monthlyPayment * 12) / 26,
    },
    "accelerated-biweekly": {
      labelKey: "calc_freq_accel_biweekly",
      fallbackLabel: "Accelerated Bi-Weekly",
      periods: 26,
      payment: monthlyPayment / 2,
    },
    weekly: {
      labelKey: "calc_freq_weekly",
      fallbackLabel: "Weekly",
      periods: 52,
      payment: (monthlyPayment * 12) / 52,
    },
    "accelerated-weekly": {
      labelKey: "calc_freq_accel_weekly",
      fallbackLabel: "Accelerated Weekly",
      periods: 52,
      payment: monthlyPayment / 4,
    },
  };
  return details[frequency as PaymentFrequency] ?? details.monthly;
}

export function mortgagePayment(
  principal: number,
  annualRate: number,
  years: number,
  periodsPerYear = 12
): number {
  const totalPayments = Math.max(Math.round(years * periodsPerYear), 1);
  const periodicRate = annualRate / 100 / periodsPerYear;
  if (principal <= 0) return 0;
  if (periodicRate <= 0) return principal / totalPayments;
  return (
    (principal * (periodicRate * Math.pow(1 + periodicRate, totalPayments))) /
    (Math.pow(1 + periodicRate, totalPayments) - 1)
  );
}

export function loanPrincipalFromPayment(
  paymentAmount: number,
  annualRate: number,
  years: number,
  periodsPerYear = 12
): number {
  const totalPayments = Math.max(Math.round(years * periodsPerYear), 1);
  const periodicRate = annualRate / 100 / periodsPerYear;
  if (paymentAmount <= 0) return 0;
  if (periodicRate <= 0) return paymentAmount * totalPayments;
  return (paymentAmount * (1 - Math.pow(1 + periodicRate, -totalPayments))) / periodicRate;
}

export function estimateMortgageInsurance(homePrice: number, downPayment: number): number {
  const baseLoan = Math.max(homePrice - downPayment, 0);
  const loanToValuePct = homePrice > 0 ? (baseLoan / homePrice) * 100 : 0;
  const downPct = homePrice > 0 ? downPayment / homePrice : 0;
  if (baseLoan <= 0 || downPct >= 0.2) return 0;
  const rate = insurancePremiumRate(loanToValuePct);
  return rate === null ? 0 : baseLoan * rate;
}

export function estimateLandTransferTax(price: number, province: string, isToronto: boolean): number {
  if (province !== "ON") return 0;
  const ontarioTax = ontarioLandTransferTax(price);
  return ontarioTax + (isToronto ? ontarioTax : 0);
}

export interface AmortizationYearRow {
  label: string;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export interface AmortizationResult {
  rows: AmortizationYearRow[];
  term: { payment: number; principal: number; interest: number; balance: number };
}

export function buildAmortizationRows(
  principal: number,
  annualRate: number,
  years: number,
  termYears: number,
  frequency: PaymentFrequency | string,
  paymentAmount: number
): AmortizationResult {
  const frequencyInfo = paymentFrequencyDetails(frequency, paymentAmount);
  const periodsPerYear = frequencyInfo.periods;
  const periodicRate = annualRate / 100 / periodsPerYear;
  const totalPayments = Math.max(Math.round(years * periodsPerYear), 1);
  const termPaymentLimit = Math.round(termYears * periodsPerYear);
  const startYear = new Date().getFullYear();
  let balance = principal;
  const yearlyRows: AmortizationYearRow[] = [];
  let yearPayment = 0;
  let yearPrincipal = 0;
  let yearInterest = 0;
  let termPayment = 0;
  let termPrincipal = 0;
  let termInterest = 0;
  let termBalance = principal;

  for (let i = 1; i <= totalPayments && balance > 0.01; i += 1) {
    const interestPaid = balance * periodicRate;
    const principalPaid = Math.min(paymentAmount - interestPaid, balance);
    balance = Math.max(balance - principalPaid, 0);
    yearPayment += principalPaid + interestPaid;
    yearPrincipal += principalPaid;
    yearInterest += interestPaid;
    if (i <= termPaymentLimit) {
      termPayment += principalPaid + interestPaid;
      termPrincipal += principalPaid;
      termInterest += interestPaid;
      termBalance = balance;
    }

    if (i % periodsPerYear === 0 || i === totalPayments || balance <= 0.01) {
      yearlyRows.push({
        label: String(startYear + yearlyRows.length),
        payment: yearPayment,
        principal: yearPrincipal,
        interest: yearInterest,
        balance,
      });
      yearPayment = 0;
      yearPrincipal = 0;
      yearInterest = 0;
    }
  }

  return {
    rows: yearlyRows,
    term: { payment: termPayment, principal: termPrincipal, interest: termInterest, balance: termBalance },
  };
}

/** Down payment tiers: 5% to $500k, 10% on the portion $500k-$1.5M, 20% above. */
export function minimumDownPayment(price: number): number {
  if (price <= 500000) return price * 0.05;
  if (price <= 1500000) return 25000 + (price - 500000) * 0.1;
  return price * 0.2;
}

/** Binary search for the highest home price affordable at a given max loan + down payment. */
export function homePriceFromAffordableLoan(maxLoanWithInsurance: number, availableDownPayment: number): number {
  let low = 0;
  let high = 3000000;
  for (let i = 0; i < 48; i += 1) {
    const mid = (low + high) / 2;
    const requiredDown = minimumDownPayment(mid);
    if (availableDownPayment < requiredDown) {
      high = mid;
      continue;
    }
    const baseLoan = Math.max(mid - availableDownPayment, 0);
    const insuredLoan = baseLoan + estimateMortgageInsurance(mid, availableDownPayment);
    if (insuredLoan <= maxLoanWithInsurance) {
      low = mid;
    } else {
      high = mid;
    }
  }
  return low;
}

export interface AffordabilityResult {
  maxHomePrice: number;
  maxMonthlyMortgage: number;
  totalMonthlyExpenses: number;
  paymentWithInsurance: number;
  baseLoan: number;
  loanWithInsurance: number;
  housingExpenses: number;
  paymentCount: number;
}

/** GDS 39% / TDS 44% ratio-based affordability calculator. */
export function computeAffordability(input: {
  applicantIncome: number;
  coApplicantIncome: number;
  monthlyDebt: number;
  heating: number;
  amortizationYears: number;
  annualRate: number;
  annualPropertyTax: number;
  condoFees: number;
  downPayment: number;
}): AffordabilityResult {
  const {
    applicantIncome,
    coApplicantIncome,
    monthlyDebt,
    heating,
    amortizationYears,
    annualRate,
    annualPropertyTax,
    condoFees,
    downPayment,
  } = input;
  const propertyTax = annualPropertyTax / 12;
  const grossMonthlyIncome = (applicantIncome + coApplicantIncome) / 12;
  const housingExpenses = propertyTax + heating + condoFees * 0.5;
  const maxByGds = grossMonthlyIncome * 0.39 - housingExpenses;
  const maxByTds = grossMonthlyIncome * 0.44 - monthlyDebt - housingExpenses;
  const maxMonthlyMortgage = Math.max(Math.min(maxByGds, maxByTds), 0);
  const maxLoanWithInsurance = loanPrincipalFromPayment(maxMonthlyMortgage, annualRate, amortizationYears, 12);
  const maxHomePrice = homePriceFromAffordableLoan(maxLoanWithInsurance, downPayment);
  const baseLoan = Math.max(maxHomePrice - downPayment, 0);
  const insurance = estimateMortgageInsurance(maxHomePrice, downPayment);
  const loanWithInsurance = baseLoan + insurance;
  const paymentWithInsurance = mortgagePayment(loanWithInsurance, annualRate, amortizationYears, 12);
  const totalMonthlyExpenses = paymentWithInsurance + monthlyDebt + housingExpenses;
  const paymentCount = amortizationYears * 12;

  return {
    maxHomePrice,
    maxMonthlyMortgage,
    totalMonthlyExpenses,
    paymentWithInsurance,
    baseLoan,
    loanWithInsurance,
    housingExpenses,
    paymentCount,
  };
}
