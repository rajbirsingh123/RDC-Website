"use client";

import type { ReactNode } from "react";
import { T, useT } from "@/lib/i18n/T";
import { formatMoney, type AmortizationResult } from "@/lib/mortgageMath";

/**
 * Renders the yearly amortization breakdown from `buildAmortizationRows`, with
 * a "Term Total" row inserted at the term-year boundary — same insertion point
 * as the original `updateAdvancedPaymentCalculator` in script.js:
 * `rows.splice(Math.max(termYears, 1), 0, termTotalRow)`.
 */
export function AmortizationTable({
  amortization,
  termYears,
}: {
  amortization: AmortizationResult;
  termYears: number;
}) {
  const t = useT();

  const rows: ReactNode[] = amortization.rows.map((row) => (
    <tr key={row.label}>
      <th scope="row">{row.label}</th>
      <td>{formatMoney(row.payment, 2)}</td>
      <td>{formatMoney(row.principal, 2)}</td>
      <td>{formatMoney(row.interest, 2)}</td>
      <td>{formatMoney(row.balance, 2)}</td>
    </tr>
  ));

  rows.splice(
    Math.max(termYears, 1),
    0,
    <tr className="term-total" key="term-total">
      <th scope="row">{t("calc_term_total", "Term Total")}</th>
      <td>{formatMoney(amortization.term.payment, 2)}</td>
      <td>{formatMoney(amortization.term.principal, 2)}</td>
      <td>{formatMoney(amortization.term.interest, 2)}</td>
      <td>{formatMoney(amortization.term.balance, 2)}</td>
    </tr>
  );

  return (
    <table className="compare-table calc-breakdown-table">
      <thead>
        <tr>
          <th scope="col">
            <T k="pc_th_year">Year</T>
          </th>
          <th scope="col">
            <T k="pc_th_total">Total Payment</T>
          </th>
          <th scope="col">
            <T k="pc_th_principal">Principal Paid</T>
          </th>
          <th scope="col">
            <T k="pc_th_interest">Interest Paid</T>
          </th>
          <th scope="col">
            <T k="pc_th_balance">Balance</T>
          </th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}
