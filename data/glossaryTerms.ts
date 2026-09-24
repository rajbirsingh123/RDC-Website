export interface GlossaryTerm {
  dtKey: string;
  dt: string;
  ddKey: string;
  dd: string;
  href?: string;
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  { dtKey: "gt_amort_dt", dt: "Amortization", ddKey: "gt_amort_dd", dd: "The total repayment period used to calculate mortgage payments. A longer amortization lowers payments but increases total interest." },
  { dtKey: "gt_appraisal_dt", dt: "Appraisal", ddKey: "gt_appraisal_dd", dd: "A professional estimate of property value ordered by the lender or broker to support the mortgage amount." },
  { dtKey: "gt_apr_dt", dt: "APR", ddKey: "gt_apr_dd", dd: "Annual percentage rate. A broader annual cost measure that can include interest and certain borrowing costs." },
  { dtKey: "gt_assumable_dt", dt: "Assumable Mortgage", ddKey: "gt_assumable_dd", dd: "A mortgage that may be transferred to a buyer if the lender and contract allow it." },
  { dtKey: "gt_bridge_dt", dt: "Bridge Financing", ddKey: "gt_bridge_dd", dd: "Short-term financing used when buying a new property before the sale proceeds from an existing property are available." },
  { dtKey: "gt_closedm_dt", dt: "Closed Mortgage", ddKey: "gt_closedm_dd", dd: "A mortgage with limits on extra payments and early payout. Breaking it can trigger a penalty." },
  { dtKey: "gt_closingcosts_dt", dt: "Closing Costs", ddKey: "gt_closingcosts_dd", dd: "Costs due at closing beyond down payment, such as land transfer tax, legal fees, title insurance, adjustments, appraisal, and insurance." },
  { dtKey: "gt_collateral_dt", dt: "Collateral Charge", ddKey: "gt_collateral_dd", dd: "A mortgage registration type that may secure more than the current mortgage balance and can affect switching costs." },
  { dtKey: "gt_commitment_dt", dt: "Commitment Letter", ddKey: "gt_commitment_dd", dd: "The lender's written approval terms, including rate, amount, payment, conditions, and expiry." },
  { dtKey: "gt_conventional_dt", dt: "Conventional Mortgage", ddKey: "gt_conventional_dd", dd: "A mortgage with 20% or more equity/down payment. It is usually uninsured." },
  { dtKey: "gt_debtcons_dt", dt: "Debt Consolidation", ddKey: "gt_debtcons_dd", dd: "Using mortgage financing to pay out higher-interest debts. It may lower monthly payments but can extend debt over a longer period.", href: "/mortgages/debt-consolidation/" },
  { dtKey: "gt_downpayment_dt", dt: "Down Payment", ddKey: "gt_downpayment_dd", dd: "The buyer's own contribution toward the purchase price. The mortgage covers the remaining eligible amount." },
  { dtKey: "gt_equity_dt", dt: "Equity", ddKey: "gt_equity_dd", dd: "The difference between market value and debts secured against the property.", href: "/mortgages/equity-takeout/" },
  { dtKey: "gt_fixedrate_dt", dt: "Fixed Rate", ddKey: "gt_fixedrate_dd", dd: "An interest rate that stays the same for the mortgage term." },
  { dtKey: "gt_gdsratio_dt", dt: "GDS Ratio", ddKey: "gt_gdsratio_dd", dd: "Gross Debt Service ratio. Housing costs divided by gross income." },
  { dtKey: "gt_heloc_dt", dt: "HELOC", ddKey: "gt_heloc_dd", dd: "Home equity line of credit. A revolving credit line secured by real estate.", href: "/mortgages/home-equity-line-credit/" },
  { dtKey: "gt_highratio_dt", dt: "High-Ratio Mortgage", ddKey: "gt_highratio_dd", dd: "A mortgage with less than 20% down payment, usually requiring mortgage loan insurance." },
  { dtKey: "gt_iad_dt", dt: "Interest Adjustment Date", ddKey: "gt_iad_dd", dd: "The date interest is adjusted before regular mortgage payments begin." },
  { dtKey: "gt_ltt_dt", dt: "Land Transfer Tax", ddKey: "gt_ltt_dd", dd: "A tax paid by the buyer when property ownership transfers." },
  { dtKey: "gt_ltv_dt", dt: "LTV Ratio", ddKey: "gt_ltv_dd", dd: "Loan-to-value ratio. Mortgage amount divided by property value or purchase price." },
  { dtKey: "gt_maturity_dt", dt: "Maturity Date", ddKey: "gt_maturity_dd", dd: "The end date of the current mortgage term." },
  { dtKey: "gt_mdi_dt", dt: "Mortgage Default Insurance", ddKey: "gt_mdi_dd", dd: "Insurance protecting the lender when a borrower has a smaller down payment. The borrower usually pays the premium." },
  { dtKey: "gt_term_dt", dt: "Mortgage Term", ddKey: "gt_term_dd", dd: "The length of the mortgage contract, including rate, payment, and conditions." },
  { dtKey: "gt_openm_dt", dt: "Open Mortgage", ddKey: "gt_openm_dd", dd: "A mortgage that allows extra payments or full payout without penalty, usually at a higher rate." },
  { dtKey: "gt_portability_dt", dt: "Portability", ddKey: "gt_portability_dd", dd: "A feature that may allow you to transfer a mortgage to another property, subject to lender approval." },
  { dtKey: "gt_preapproval_dt", dt: "Pre-Approval", ddKey: "gt_preapproval_dd", dd: "A preliminary review that estimates borrowing power before a live property approval." },
  { dtKey: "gt_prequalification_dt", dt: "Pre-Qualification", ddKey: "gt_prequalification_dd", dd: "An early, informal estimate of borrowing power based on self-reported income, debts, and down payment, without document verification or a credit check." },
  { dtKey: "gt_prepayment_dt", dt: "Prepayment Privilege", ddKey: "gt_prepayment_dd", dd: "The amount you can pay above regular payments without penalty." },
  { dtKey: "gt_prime_dt", dt: "Prime Rate", ddKey: "gt_prime_dd", dd: "A lender's reference rate used for variable-rate mortgages and lines of credit." },
  { dtKey: "gt_refinance_dt", dt: "Refinance", ddKey: "gt_refinance_dd", dd: "Changing or replacing a mortgage, often to access equity, consolidate debt, or change structure.", href: "/mortgages/refinance/" },
  { dtKey: "gt_renewal_dt", dt: "Renewal", ddKey: "gt_renewal_dd", dd: "Choosing a new term when the current mortgage term ends.", href: "/mortgages/mortgage-renewal/" },
  { dtKey: "gt_secondm_dt", dt: "Second Mortgage", ddKey: "gt_secondm_dd", dd: "A mortgage registered behind the first mortgage. It usually has a higher rate due to higher lender risk.", href: "/mortgages/equity-takeout/" },
  { dtKey: "gt_stresstest_dt", dt: "Stress Test", ddKey: "gt_stresstest_dd", dd: "A qualification test using a higher interest rate than the contract rate to assess affordability under pressure." },
  { dtKey: "gt_tdsratio_dt", dt: "TDS Ratio", ddKey: "gt_tdsratio_dd", dd: "Total Debt Service ratio. Housing costs plus other debt payments divided by gross income." },
  { dtKey: "gt_titleins_dt", dt: "Title Insurance", ddKey: "gt_titleins_dd", dd: "Insurance that protects against certain title and registration problems." },
  { dtKey: "gt_trigger_dt", dt: "Trigger Rate", ddKey: "gt_trigger_dd", dd: "For some variable-rate mortgages, the rate where the payment no longer covers all interest due." },
  { dtKey: "gt_variablerate_dt", dt: "Variable Rate", ddKey: "gt_variablerate_dd", dd: "A mortgage rate that can change when the lender's prime rate changes." },
];
