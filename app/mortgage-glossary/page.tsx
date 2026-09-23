import type { Metadata } from "next";
import Link from "next/link";
import { RevealMain } from "@/components/ui/RevealMain";
import { JsonLd } from "@/components/seo/JsonLd";
import { T } from "@/lib/i18n/T";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo/site";
import { GLOSSARY_TERMS } from "@/data/glossaryTerms";

const DESCRIPTION =
  "A plain-language guide to Canadian mortgages, from pre-approval to renewal, with the key terms, rules, costs, and decisions explained in one place.";

export const metadata: Metadata = {
  title: "Mortgage Glossary & Knowledge Hub | Royal Den Capital",
  description: DESCRIPTION,
  alternates: { canonical: absoluteUrl("/mortgage-glossary/") },
  openGraph: { title: "Mortgage Glossary & Knowledge Hub | Royal Den Capital", description: DESCRIPTION, url: absoluteUrl("/mortgage-glossary/") },
  twitter: { title: "Mortgage Glossary & Knowledge Hub | Royal Den Capital", description: DESCRIPTION },
};

const INDEX_LINKS: Array<{ href: string; key: string; fallback: string }> = [
  { href: "#start", key: "gl_idx_start", fallback: "Start Here" },
  { href: "#process", key: "gl_idx_process", fallback: "Buying Process" },
  { href: "#qualification", key: "gl_idx_qualification", fallback: "Qualification" },
  { href: "#down-payment", key: "gl_idx_downpayment", fallback: "Down Payment" },
  { href: "#products", key: "gl_idx_products", fallback: "Mortgage Types" },
  { href: "#rates", key: "gl_idx_rates", fallback: "Rates & Payments" },
  { href: "#costs", key: "gl_idx_costs", fallback: "Costs" },
  { href: "#renewal-refinance", key: "gl_idx_renewal", fallback: "Renewal & Refinance" },
  { href: "#broker", key: "gl_idx_broker", fallback: "Working With a Broker" },
  { href: "#glossary", key: "gl_idx_glossary", fallback: "Glossary" },
  { href: "#sources", key: "gl_idx_sources", fallback: "Sources" },
];

const FLOW_STEPS = [
  { n: 1, tKey: "gl_flow_1_t", t: "Budget", dKey: "gl_flow_1_d", d: "Income, debts, down payment, comfort level" },
  { n: 2, tKey: "gl_flow_2_t", t: "Pre-Approval", dKey: "gl_flow_2_d", d: "Rate hold, maximum range, document review" },
  { n: 3, tKey: "gl_flow_3_t", t: "Offer", dKey: "gl_flow_3_d", d: "Property, conditions, deposit, closing date" },
  { n: 4, tKey: "gl_flow_4_t", t: "Approval", dKey: "gl_flow_4_d", d: "Lender review, appraisal, conditions" },
  { n: 5, tKey: "gl_flow_5_t", t: "Closing", dKey: "gl_flow_5_d", d: "Lawyer, funds, title, keys" },
  { n: 6, tKey: "gl_flow_6_t", t: "Renewal", dKey: "gl_flow_6_d", d: "Review rate, term, lender, strategy" },
];

const THREE_NUMBERS = [
  { strongKey: "gl_num1_strong", strong: "Purchase price or property value:", restKey: "gl_num1_rest", rest: " The price being paid for a purchase, or the estimated market value when refinancing." },
  { strongKey: "gl_num2_strong", strong: "Mortgage amount:", restKey: "gl_num2_rest", rest: " The amount borrowed after down payment, equity, insurance premium, refinance funds, or debt consolidation are factored in." },
  { strongKey: "gl_num3_strong", strong: "Payment comfort:", restKey: "gl_num3_rest", rest: " The amount your household can manage after mortgage payment, property tax, utilities, insurance, maintenance, and normal living costs." },
];

const PROCESS_STEPS = [
  { hKey: "gl_step1_h3", h: "Prepare your file", pKey: "gl_step1_p", p: "Before shopping seriously, organize income documents, down payment history, debt information, credit details, and an honest monthly budget. A stronger file creates more lender options.", items: [
    { key: "gl_step1_li1", text: "Employment letter, pay stubs, T4s, NOAs, business financials if self-employed." },
    { key: "gl_step1_li2", text: "Bank statements showing down payment source and deposit history." },
    { key: "gl_step1_li3", text: "Details for debts, loans, leases, support payments, and existing properties." },
  ] },
  { hKey: "gl_step1b_h3", h: "Get pre-qualified", pKey: "gl_step1b_p", p: "A pre-qualification is a quick, informal estimate of how much you may be able to borrow, based on the numbers you provide. It is a helpful starting point but is not verified, so it is not a guarantee of approval." },
  { hKey: "gl_step2_h3", h: "Get pre-approved", pKey: "gl_step2_p", p: "A pre-approval estimates how much you may qualify for before you make an offer. It can include a rate hold, but it is not a final approval because the property and updated documents still need lender review." },
  { hKey: "gl_step3_h3", h: "Make an offer with the right conditions", pKey: "gl_step3_p", p: "When possible, protect yourself with financing, inspection, insurance, and legal review conditions. The right conditions give time to confirm the property and mortgage approval." },
  { hKey: "gl_step4_h3", h: "Submit the live deal", pKey: "gl_step4_p", p: "The lender reviews the borrower, property, down payment, appraisal if needed, and purchase contract. They may issue a commitment with conditions that must be satisfied before closing." },
  { hKey: "gl_step5_h3", h: "Close with your lawyer", pKey: "gl_step5_p", p: "Your lawyer or notary registers the mortgage, handles title, receives lender funds, collects your remaining down payment and closing costs, and completes the property transfer." },
];

const QUAL_AREAS = [
  { strongKey: "gl_area1_strong", strong: "Income:", restKey: "gl_area1_rest", rest: " Salary, hourly income, overtime, bonus, commission, pension, business income, rental income, or other accepted sources." },
  { strongKey: "gl_area2_strong", strong: "Credit:", restKey: "gl_area2_rest", rest: " Score, repayment history, credit limits, late payments, collections, bankruptcies, consumer proposals, and overall borrowing habits." },
  { strongKey: "gl_area3_strong", strong: "Debt:", restKey: "gl_area3_rest", rest: " Credit cards, lines of credit, car loans, leases, student loans, support payments, existing mortgages, and property costs." },
  { strongKey: "gl_area4_strong", strong: "Down payment or equity:", restKey: "gl_area4_rest", rest: " Amount, source, history, gift letter if applicable, and whether the funds are eligible for the program." },
  { strongKey: "gl_area5_strong", strong: "Property:", restKey: "gl_area5_rest", rest: " Location, condition, value, type, zoning, marketability, appraisal, taxes, condo fees, and intended use." },
];

const DP_TABLE = [
  { priceKey: "gl_tr1_price", price: "$500,000 or less", minKey: "gl_tr1_min", min: "5% of the purchase price", insKey: "gl_tr1_ins", ins: "Mortgage loan insurance is typically required if down payment is under 20%." },
  { priceKey: "gl_tr2_price", price: "More than $500,000 and less than $1.5 million", minKey: "gl_tr2_min", min: "5% on the first $500,000, plus 10% on the amount above $500,000", insKey: "gl_tr2_ins", ins: "Insurance is typically required if down payment is under 20%, subject to insurer and lender rules." },
  { priceKey: "gl_tr3_price", price: "$1.5 million or more", minKey: "gl_tr3_min", min: "20% of the purchase price", insKey: "gl_tr3_ins", ins: "Generally uninsured because the minimum down payment is 20%." },
];

const DP_SOURCES = [
  { key: "gl_dpsrc_li1", text: "Personal savings or investments." },
  { key: "gl_dpsrc_li2", text: "Gift from eligible family, usually with a signed gift letter." },
  { key: "gl_dpsrc_li3", text: "RRSP Home Buyers' Plan funds if eligible." },
  { key: "gl_dpsrc_li4", text: "Sale of another property." },
  { key: "gl_dpsrc_li5", text: "Borrowed funds only if the lender allows them and includes the repayment in qualification." },
];

const SPECIAL_SCENARIOS = [
  { strongKey: "gl_sp1_strong", strong: "HELOC:", restKey: "gl_sp1_rest", rest: " A revolving home equity line of credit secured by real estate. Useful for flexible borrowing, but it can create long-term debt if not managed carefully." },
  { strongKey: "gl_sp2_strong", strong: "Second mortgage:", restKey: "gl_sp2_rest", rest: " A mortgage registered behind the first mortgage. Often higher rate because the lender takes more risk." },
  { strongKey: "gl_sp3_strong", strong: "Bridge financing:", restKey: "gl_sp3_rest", rest: " Short-term financing that helps when a new purchase closes before the sale of the existing home closes." },
  { strongKey: "gl_sp4_strong", strong: "Construction financing:", restKey: "gl_sp4_rest", rest: " Funds are usually released in stages as construction progresses and inspections or appraisals confirm progress." },
  { strongKey: "gl_sp5_strong", strong: "Commercial mortgage:", restKey: "gl_sp5_rest", rest: " Financing for commercial or mixed-use properties, often underwritten with more focus on property income, business strength, and risk." },
  { strongKey: "gl_sp6_strong", strong: "Reverse mortgage:", restKey: "gl_sp6_rest", rest: " A loan secured against home equity, typically for older homeowners, where repayment is usually deferred until sale, move, or death. Suitability and cost should be reviewed carefully." },
];

const TERM_AMORT = [
  { strongKey: "gl_term_strong", strong: "Term:", restKey: "gl_term_rest", rest: " The length of your current mortgage contract. Common terms range from a few months to five years or longer." },
  { strongKey: "gl_amort_strong", strong: "Amortization:", restKey: "gl_amort_rest", rest: " The total time planned to repay the mortgage in full. Longer amortization lowers the payment but increases total interest over time." },
  { strongKey: "gl_renewal_strong", strong: "Renewal:", restKey: "gl_renewal_rest", rest: " At the end of each term, you renew, switch lenders, refinance, or pay off the balance." },
];

const COST_ITEMS = [
  { strongKey: "gl_c1_strong", strong: "Land transfer tax:", restKey: "gl_c1_rest", rest: " A provincial tax paid on closing. Some cities may have additional municipal land transfer tax. First-time buyer rebates may apply if eligible." },
  { strongKey: "gl_c2_strong", strong: "Legal fees and disbursements:", restKey: "gl_c2_rest", rest: " Lawyer or notary work for title, registration, searches, adjustments, and closing." },
  { strongKey: "gl_c3_strong", strong: "Title insurance:", restKey: "gl_c3_rest", rest: " Often arranged through the lawyer to protect against certain title defects, fraud, or registration issues." },
  { strongKey: "gl_c4_strong", strong: "Home inspection:", restKey: "gl_c4_rest", rest: " Optional but useful for understanding the property's condition before firming up an offer." },
  { strongKey: "gl_c5_strong", strong: "Appraisal:", restKey: "gl_c5_rest", rest: " A lender may require an appraisal to confirm property value and marketability." },
  { strongKey: "gl_c6_strong", strong: "Property tax and utility adjustments:", restKey: "gl_c6_rest", rest: " The buyer may reimburse the seller for prepaid costs from closing date onward." },
  { strongKey: "gl_c7_strong", strong: "Insurance:", restKey: "gl_c7_rest", rest: " Lenders usually require proof of property insurance before closing." },
  { strongKey: "gl_c8_strong", strong: "Moving and setup:", restKey: "gl_c8_rest", rest: " Movers, utility deposits, immediate repairs, furnishings, locks, and maintenance tools." },
];

const RENEWAL_TIPS = [
  { key: "gl_rr_li1", text: "Start reviewing options a few months before maturity." },
  { key: "gl_rr_li2", text: "Compare rate, payment, prepayment privileges, penalties, portability, and service." },
  { key: "gl_rr_li3", text: "Ask whether switching lenders creates setup, discharge, appraisal, legal, or registration costs." },
  { key: "gl_rr_li4", text: "If you already have mortgage loan insurance, ask for the insurance certificate details before switching." },
];

const BROKER_QUESTIONS = [
  { key: "gl_q1", text: "Are you licensed with FSRA, and what is your licence level?" },
  { key: "gl_q2", text: "Who do you represent in this transaction: me, the lender, or both?" },
  { key: "gl_q3", text: "How are you paid, and are there any broker or lender fees?" },
  { key: "gl_q4", text: "Which lenders are being considered, and why?" },
  { key: "gl_q5", text: "What are the risks, penalties, restrictions, and total cost of borrowing?" },
  { key: "gl_q6", text: "What documents do you need, and how will my information be used?" },
  { key: "gl_q7", text: "What conditions must be satisfied before closing?" },
];

const BROKER_DOCS = [
  { key: "gl_d1", text: "Government ID" },
  { key: "gl_d2", text: "Employment letter" },
  { key: "gl_d3", text: "Recent pay stubs" },
  { key: "gl_d4", text: "T4s and notices of assessment" },
  { key: "gl_d5", text: "Business financials if self-employed" },
  { key: "gl_d6", text: "Bank statements for down payment" },
  { key: "gl_d7", text: "Gift letter if applicable" },
  { key: "gl_d8", text: "Purchase agreement and MLS listing" },
  { key: "gl_d9", text: "Property tax bill" },
  { key: "gl_d10", text: "Mortgage statement for refinance or switch" },
  { key: "gl_d11", text: "Condo status certificate if applicable" },
  { key: "gl_d12", text: "Lawyer contact information" },
];

const SOURCES = [
  { href: "https://www.canada.ca/en/financial-consumer-agency/services/mortgages/down-payment.html", text: "Canada.ca - Down payment requirements" },
  { href: "https://www.canada.ca/en/financial-consumer-agency/services/mortgages/preparing-mortgage.html", text: "Canada.ca - Preparing to get a mortgage" },
  { href: "https://www.canada.ca/en/financial-consumer-agency/services/mortgages/choose-mortgage.html", text: "Canada.ca - Choosing a mortgage" },
  { href: "https://www.canada.ca/en/financial-consumer-agency/services/mortgages/renew-mortgage.html", text: "Canada.ca - Renewing your mortgage" },
  { href: "https://www.canada.ca/en/financial-consumer-agency/services/rights-responsibilities/rights-mortgages/applying-for-mortgage.html", text: "Canada.ca - Mortgage rights and disclosures" },
  { href: "https://www.cmhc-schl.gc.ca/consumers/home-buying/mortgage-loan-insurance-for-consumers/what-is-mortgage-loan-insurance", text: "CMHC - Mortgage loan insurance" },
  { href: "https://www.osfi-bsif.gc.ca/en/supervision/financial-institutions/banks/minimum-qualifying-rate-uninsured-mortgages", text: "OSFI - Minimum qualifying rate for uninsured mortgages" },
  { href: "https://www.fsrao.ca/consumers/mortgage-brokering/working-mortgage-professional", text: "FSRA - Working with a mortgage professional in Ontario" },
];

const CTA_HELP_ITEMS = [
  { key: "gl_cta_li1", text: "Purchase approval and pre-approval strategy." },
  { key: "gl_cta_li2", text: "Renewal offers and lender switching options." },
  { key: "gl_cta_li3", text: "Refinance, HELOC, equity takeout, and debt consolidation scenarios." },
  { key: "gl_cta_li4", text: "Self-employed, newcomer, private, alternative, and complex files." },
];

function ListItem({ strongKey, strong, restKey, rest }: { strongKey: string; strong: string; restKey: string; rest: string }) {
  return (
    <li>
      <strong>
        <T k={strongKey}>{strong}</T>
      </strong>
      <span>
        <T k={restKey}>{rest}</T>
      </span>
    </li>
  );
}

export default function MortgageGlossaryPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Mortgage Glossary", path: "/mortgage-glossary/" }])} />
      <RevealMain>
        <section className="page-hero knowledge-hero">
          <div className="container-xl text-center">
            <h1>
              <T k="gl_h1">Knowledge Hub</T>
            </h1>
            <p className="hero-lead mx-auto">
              <T k="gl_lead">
                A plain-language guide to Canadian mortgages, from pre-approval to renewal, with the key terms, rules,
                costs, and decisions explained in one place.
              </T>
            </p>
          </div>
        </section>

        <section className="knowledge-section">
          <div className="container-xl">
            <div className="knowledge-layout">
              <aside className="knowledge-index" aria-label="Mortgage knowledge sections">
                <strong>
                  <T k="gl_idx_on_page">On this page</T>
                </strong>
                {INDEX_LINKS.map((link) => (
                  <a href={link.href} key={link.href}>
                    <T k={link.key}>{link.fallback}</T>
                  </a>
                ))}
              </aside>

              <div className="knowledge-content">
                <section id="start" className="knowledge-block">
                  <p className="section-kicker">
                    <T k="gl_start_kicker">Start Here</T>
                  </p>
                  <h2>
                    <T k="gl_start_h2">What a mortgage really is</T>
                  </h2>
                  <p>
                    <T k="gl_start_p1">
                      A mortgage is a loan secured by real estate. You borrow money to buy, refinance, or access
                      equity in a property, and the lender registers a legal charge against that property until the
                      loan is paid, transferred, discharged, or replaced.
                    </T>
                  </p>
                  <p>
                    <T k="gl_start_p2">
                      Most clients focus first on the interest rate. The better starting point is the full structure:
                      loan amount, down payment, amortization, term, payment frequency, prepayment flexibility,
                      penalties, lender conditions, closing costs, and the plan for renewal.
                    </T>
                  </p>

                  <div className="knowledge-flow" aria-label="Mortgage journey from budget to renewal">
                    {FLOW_STEPS.map((step) => (
                      <div key={step.n}>
                        <span>{step.n}</span>
                        <strong>
                          <T k={step.tKey}>{step.t}</T>
                        </strong>
                        <small>
                          <T k={step.dKey}>{step.d}</T>
                        </small>
                      </div>
                    ))}
                  </div>

                  <h3>
                    <T k="gl_three_numbers_h3">Three numbers shape most mortgage decisions</T>
                  </h3>
                  <ul className="knowledge-list">
                    {THREE_NUMBERS.map((item) => (
                      <ListItem key={item.strongKey} strongKey={item.strongKey} strong={item.strong} restKey={item.restKey} rest={item.rest} />
                    ))}
                  </ul>
                </section>

                <section id="process" className="knowledge-block">
                  <p className="section-kicker">
                    <T k="gl_process_kicker">Buying Process</T>
                  </p>
                  <h2>
                    <T k="gl_process_h2">How the mortgage process works</T>
                  </h2>
                  <ol className="knowledge-steps">
                    {PROCESS_STEPS.map((step) => (
                      <li key={step.hKey}>
                        <h3>
                          <T k={step.hKey}>{step.h}</T>
                        </h3>
                        <p>
                          <T k={step.pKey}>{step.p}</T>
                        </p>
                        {step.items && (
                          <ul>
                            {step.items.map((item) => (
                              <li key={item.key}>
                                <T k={item.key}>{item.text}</T>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ol>
                </section>

                <section id="qualification" className="knowledge-block">
                  <p className="section-kicker">
                    <T k="gl_qual_kicker">Qualification</T>
                  </p>
                  <h2>
                    <T k="gl_qual_h2">How lenders decide what you can borrow</T>
                  </h2>
                  <p>
                    <T k="gl_qual_p">
                      Mortgage qualification is a risk review. Lenders look at whether you can repay the mortgage,
                      whether the property is acceptable security, and whether the full story makes sense.
                    </T>
                  </p>

                  <h3>
                    <T k="gl_qual_h3">The lender looks at five major areas</T>
                  </h3>
                  <ul className="knowledge-list">
                    {QUAL_AREAS.map((item) => (
                      <ListItem key={item.strongKey} strongKey={item.strongKey} strong={item.strong} restKey={item.restKey} rest={item.rest} />
                    ))}
                  </ul>

                  <div className="formula-panel">
                    <h3>
                      <T k="gl_dsr_h3">Debt-service ratios in plain language</T>
                    </h3>
                    <dl>
                      <div>
                        <dt>
                          <T k="gl_gds_dt">GDS</T>
                        </dt>
                        <dd>
                          <T k="gl_gds_dd">
                            Gross Debt Service compares housing costs to gross income. Housing costs usually include
                            mortgage payment, property tax, heating, and 50% of condo fees if applicable.
                          </T>
                        </dd>
                      </div>
                      <div>
                        <dt>
                          <T k="gl_tds_dt">TDS</T>
                        </dt>
                        <dd>
                          <T k="gl_tds_dd">Total Debt Service compares housing costs plus other debt payments to gross income.</T>
                        </dd>
                      </div>
                      <div>
                        <dt>
                          <T k="gl_guide_dt">Common guideposts</T>
                        </dt>
                        <dd>
                          <T k="gl_guide_dd">
                            FCAC describes 39% for GDS and 44% for TDS as common affordability limits. Some lenders
                            and products may use different rules.
                          </T>
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <h3>
                    <T k="gl_stress_h3">Stress test</T>
                  </h3>
                  <p>
                    <T k="gl_stress_p">
                      For federally regulated lenders, borrowers are generally tested at a qualifying rate higher
                      than the contract rate. OSFI lists the current uninsured mortgage qualifying rate as the
                      greater of the contract rate plus 2% or 5.25%. This helps test whether the borrower could
                      handle higher payments or financial pressure.
                    </T>
                  </p>

                  <div className="knowledge-diagram" aria-label="Mortgage stress test formula">
                    <strong>
                      <T k="gl_qr_strong">Qualifying Rate</T>
                    </strong>
                    <span>=</span>
                    <em>
                      <T k="gl_qr_higher">Higher of</T>
                    </em>
                    <div>
                      <T k="gl_qr_contract">Contract Rate + 2%</T>
                    </div>
                    <div>
                      <T k="gl_qr_floor">5.25% Floor</T>
                    </div>
                  </div>
                </section>

                <section id="down-payment" className="knowledge-block">
                  <p className="section-kicker">
                    <T k="gl_dp_kicker">Down Payment</T>
                  </p>
                  <h2>
                    <T k="gl_dp_h2">Down payment rules and mortgage insurance</T>
                  </h2>
                  <p>
                    <T k="gl_dp_p">
                      Your down payment affects the mortgage amount, insurance requirement, lender options, and
                      closing cash needed. In Canada, the minimum down payment depends on the purchase price.
                    </T>
                  </p>

                  <div className="knowledge-table-wrap">
                    <table className="knowledge-table">
                      <thead>
                        <tr>
                          <th>
                            <T k="gl_th_price">Purchase Price</T>
                          </th>
                          <th>
                            <T k="gl_th_min">Minimum Down Payment</T>
                          </th>
                          <th>
                            <T k="gl_th_ins">Common Insurance Result</T>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {DP_TABLE.map((row) => (
                          <tr key={row.priceKey}>
                            <td>
                              <T k={row.priceKey}>{row.price}</T>
                            </td>
                            <td>
                              <T k={row.minKey}>{row.min}</T>
                            </td>
                            <td>
                              <T k={row.insKey}>{row.ins}</T>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <h3>
                    <T k="gl_dpsrc_h3">Where down payment can come from</T>
                  </h3>
                  <ul className="knowledge-list">
                    {DP_SOURCES.map((item) => (
                      <li key={item.key}>
                        <T k={item.key}>{item.text}</T>
                      </li>
                    ))}
                  </ul>

                  <h3>
                    <T k="gl_mli_h3">Mortgage loan insurance</T>
                  </h3>
                  <p>
                    <T k="gl_mli_p">
                      Mortgage loan insurance is usually required when the down payment is less than 20%. It
                      protects the lender if the borrower defaults, but it can help buyers qualify with a smaller
                      down payment. The premium is commonly added to the mortgage amount, which increases the loan
                      and payment.
                    </T>
                  </p>
                </section>

                <section id="products" className="knowledge-block">
                  <p className="section-kicker">
                    <T k="gl_prod_kicker">Mortgage Types</T>
                  </p>
                  <h2>
                    <T k="gl_prod_h2">Choosing the right mortgage structure</T>
                  </h2>
                  <p>
                    <T k="gl_prod_p">
                      The best mortgage is not always the lowest posted rate. The right structure depends on how long
                      you expect to keep the property, whether you may move, whether income is stable, how much
                      payment risk you can handle, and whether you plan to make extra payments.
                    </T>
                  </p>

                  <div className="comparison-list">
                    <section>
                      <h3>
                        <T k="gl_fv_h3">Fixed vs. variable</T>
                      </h3>
                      <dl>
                        <div>
                          <dt>
                            <T k="gl_fixed_dt">Fixed rate</T>
                          </dt>
                          <dd>
                            <T k="gl_fixed_dd">The rate stays the same for the term. This gives payment predictability and easier budgeting.</T>
                          </dd>
                        </div>
                        <div>
                          <dt>
                            <T k="gl_variable_dt">Variable rate</T>
                          </dt>
                          <dd>
                            <T k="gl_variable_dd">
                              The rate can move with the lender&apos;s prime rate. Payments may change, or the payment
                              may stay fixed while the principal-interest split changes, depending on the product.
                            </T>
                          </dd>
                        </div>
                      </dl>
                    </section>
                    <section>
                      <h3>
                        <T k="gl_oc_h3">Open vs. closed</T>
                      </h3>
                      <dl>
                        <div>
                          <dt>
                            <T k="gl_open_dt">Open mortgage</T>
                          </dt>
                          <dd>
                            <T k="gl_open_dd">More flexible for paying down or paying off the mortgage, usually at a higher interest rate.</T>
                          </dd>
                        </div>
                        <div>
                          <dt>
                            <T k="gl_closed_dt">Closed mortgage</T>
                          </dt>
                          <dd>
                            <T k="gl_closed_dd">
                              Usually lower rate than open, but extra payments are limited by prepayment privileges
                              and penalties may apply if broken early.
                            </T>
                          </dd>
                        </div>
                      </dl>
                    </section>
                    <section>
                      <h3>
                        <T k="gl_iiu_h3">Insured, insurable, uninsured</T>
                      </h3>
                      <dl>
                        <div>
                          <dt>
                            <T k="gl_insured_dt">Insured</T>
                          </dt>
                          <dd>
                            <T k="gl_insured_dd">Mortgage loan insurance is paid because the down payment is below 20%.</T>
                          </dd>
                        </div>
                        <div>
                          <dt>
                            <T k="gl_insurable_dt">Insurable</T>
                          </dt>
                          <dd>
                            <T k="gl_insurable_dd">The borrower has 20% or more down, but the file still meets insurer-style criteria.</T>
                          </dd>
                        </div>
                        <div>
                          <dt>
                            <T k="gl_uninsured_dt">Uninsured</T>
                          </dt>
                          <dd>
                            <T k="gl_uninsured_dd">
                              No mortgage loan insurance. Common with 20% or more down, refinances, higher-value
                              purchases, or products outside insurer rules.
                            </T>
                          </dd>
                        </div>
                      </dl>
                    </section>
                  </div>

                  <h3>
                    <T k="gl_special_h3">Special mortgage and lending scenarios</T>
                  </h3>
                  <ul className="knowledge-list">
                    {SPECIAL_SCENARIOS.map((item) => (
                      <ListItem key={item.strongKey} strongKey={item.strongKey} strong={item.strong} restKey={item.restKey} rest={item.rest} />
                    ))}
                  </ul>
                </section>

                <section id="rates" className="knowledge-block">
                  <p className="section-kicker">
                    <T k="gl_rates_kicker">Rates &amp; Payments</T>
                  </p>
                  <h2>
                    <T k="gl_rates_h2">What affects your mortgage payment</T>
                  </h2>
                  <p>
                    <T k="gl_rates_p">
                      Your payment is shaped by the amount borrowed, interest rate, amortization, payment frequency,
                      and whether mortgage insurance or fees are added to the loan.
                    </T>
                  </p>

                  <div className="payment-map" aria-label="Factors that affect mortgage payment">
                    <strong>
                      <T k="gl_pm_strong">Mortgage Payment</T>
                    </strong>
                    <span>
                      <T k="gl_pm_loan">Loan Amount</T>
                    </span>
                    <span>
                      <T k="gl_pm_rate">Interest Rate</T>
                    </span>
                    <span>
                      <T k="gl_pm_amort">Amortization</T>
                    </span>
                    <span>
                      <T k="gl_pm_freq">Payment Frequency</T>
                    </span>
                    <span>
                      <T k="gl_pm_ins">Insurance Premium</T>
                    </span>
                  </div>

                  <h3>
                    <T k="gl_ta_h3">Term vs. amortization</T>
                  </h3>
                  <ul className="knowledge-list">
                    {TERM_AMORT.map((item) => (
                      <ListItem key={item.strongKey} strongKey={item.strongKey} strong={item.strong} restKey={item.restKey} rest={item.rest} />
                    ))}
                  </ul>

                  <h3>
                    <T k="gl_freq_h3">Payment frequency</T>
                  </h3>
                  <p>
                    <T k="gl_freq_p">
                      Monthly, semi-monthly, bi-weekly, accelerated bi-weekly, weekly, and accelerated weekly payments
                      can affect budgeting and interest over time. Accelerated options may reduce the balance faster
                      because you pay a little more each year.
                    </T>
                  </p>
                </section>

                <section id="costs" className="knowledge-block">
                  <p className="section-kicker">
                    <T k="gl_costs_kicker">Costs</T>
                  </p>
                  <h2>
                    <T k="gl_costs_h2">Costs to plan for beyond the down payment</T>
                  </h2>
                  <p>
                    <T k="gl_costs_p">
                      Many buyers budget for the down payment but forget cash needed at closing and after moving in.
                      Keep a separate cushion for closing costs, moving costs, repairs, and the first few months of
                      ownership.
                    </T>
                  </p>

                  <ul className="knowledge-list">
                    {COST_ITEMS.map((item) => (
                      <ListItem key={item.strongKey} strongKey={item.strongKey} strong={item.strong} restKey={item.restKey} rest={item.rest} />
                    ))}
                  </ul>
                </section>

                <section id="renewal-refinance" className="knowledge-block">
                  <p className="section-kicker">
                    <T k="gl_rr_kicker">Renewal &amp; Refinance</T>
                  </p>
                  <h2>
                    <T k="gl_rr_h2">What to do when you already own the property</T>
                  </h2>

                  <h3>
                    <T k="gl_rr_renewal_h3">Mortgage renewal</T>
                  </h3>
                  <p>
                    <T k="gl_rr_renewal_p">
                      Renewal happens when your mortgage term ends. You can accept your current lender&apos;s offer,
                      negotiate, switch lenders, change term, change payment frequency, or adjust strategy. Do not
                      treat the first renewal letter as the final answer.
                    </T>
                  </p>
                  <ul className="knowledge-list">
                    {RENEWAL_TIPS.map((item) => (
                      <li key={item.key}>
                        <T k={item.key}>{item.text}</T>
                      </li>
                    ))}
                  </ul>

                  <h3>
                    <T k="gl_rr_refi_h3">Refinance</T>
                  </h3>
                  <p>
                    <T k="gl_rr_refi_p">
                      Refinancing means replacing or changing the mortgage before or at maturity, usually to access
                      equity, consolidate debt, change amortization, remove/add a borrower, or improve structure. A
                      refinance normally requires qualification and may involve appraisal, legal work, and penalties
                      if done before the term ends.
                    </T>
                  </p>

                  <h3>
                    <T k="gl_rr_penalty_h3">Prepayment penalties</T>
                  </h3>
                  <p>
                    <T k="gl_rr_penalty_p">
                      A lender may charge a penalty if you break a closed mortgage, pay more than allowed, transfer
                      the mortgage before the term ends, or repay the full balance early. Open mortgages usually
                      allow repayment without penalty but often carry higher rates.
                    </T>
                  </p>

                  <div className="decision-tree" aria-label="Renewal and refinance decision tree">
                    <div className="tree-root">
                      <T k="gl_tree_root">Mortgage coming up?</T>
                    </div>
                    <div className="tree-branches">
                      <div>
                        <strong>
                          <T k="gl_tree_renew_t">Renew</T>
                        </strong>
                        <span>
                          <T k="gl_tree_renew_d">Same loan amount, new term</T>
                        </span>
                      </div>
                      <div>
                        <strong>
                          <T k="gl_tree_switch_t">Switch</T>
                        </strong>
                        <span>
                          <T k="gl_tree_switch_d">Move same mortgage to another lender</T>
                        </span>
                      </div>
                      <div>
                        <strong>
                          <T k="gl_tree_refi_t">Refinance</T>
                        </strong>
                        <span>
                          <T k="gl_tree_refi_d">Change amount, amortization, ownership, or debt plan</T>
                        </span>
                      </div>
                    </div>
                  </div>
                </section>

                <section id="broker" className="knowledge-block">
                  <p className="section-kicker">
                    <T k="gl_broker_kicker">Working With a Broker</T>
                  </p>
                  <h2>
                    <T k="gl_broker_h2">What a licensed mortgage professional should help you understand</T>
                  </h2>
                  <p>
                    <T k="gl_broker_p">
                      In Ontario, mortgage brokerages, brokers, agents, and administrators are regulated by FSRA
                      unless exempt. A licensed mortgage professional can compare lender options, collect documents,
                      explain terms and risks, and guide the file through approval and closing.
                    </T>
                  </p>

                  <h3>
                    <T k="gl_q_h3">Questions to ask before you proceed</T>
                  </h3>
                  <ul className="knowledge-list">
                    {BROKER_QUESTIONS.map((item) => (
                      <li key={item.key}>
                        <T k={item.key}>{item.text}</T>
                      </li>
                    ))}
                  </ul>

                  <h3>
                    <T k="gl_docs_h3">Documents clients are often asked for</T>
                  </h3>
                  <ul className="two-column-list">
                    {BROKER_DOCS.map((item) => (
                      <li key={item.key}>
                        <T k={item.key}>{item.text}</T>
                      </li>
                    ))}
                  </ul>
                </section>

                <section id="glossary" className="knowledge-block">
                  <p className="section-kicker">
                    <T k="gl_glossary_kicker">Glossary</T>
                  </p>
                  <h2>
                    <T k="gl_glossary_h2">Mortgage terms explained clearly</T>
                  </h2>
                  <dl className="glossary-list">
                    {GLOSSARY_TERMS.map((term) => (
                      <div key={term.dtKey}>
                        <dt>
                          <T k={term.dtKey}>{term.dt}</T>
                        </dt>
                        <dd>
                          <T k={term.ddKey}>{term.dd}</T>
                        </dd>
                      </div>
                    ))}
                  </dl>
                </section>

                <section id="sources" className="knowledge-block sources-block">
                  <p className="section-kicker">
                    <T k="gl_sources_kicker">Source-Based Guidance</T>
                  </p>
                  <h2>
                    <T k="gl_sources_h2">Where this guide is grounded</T>
                  </h2>
                  <p>
                    <T k="gl_sources_p">
                      This page is written for client education and is not legal, tax, or lending approval advice.
                      Rules, lender policies, rates, and qualification standards can change. Always confirm the final
                      answer for your file before making a binding decision.
                    </T>
                  </p>
                  <ul className="source-list">
                    {SOURCES.map((source) => (
                      <li key={source.href}>
                        <a href={source.href} target="_blank" rel="noopener noreferrer">
                          {source.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>
          </div>
        </section>

        <section className="business-support knowledge-cta">
          <div className="container-xl">
            <div className="row align-items-center g-5">
              <div className="col-lg-7">
                <h2>
                  <T k="gl_cta_h2">Still have questions about your exact mortgage situation?</T>
                </h2>
                <p>
                  <T k="gl_cta_p">
                    Every file has details that a general guide cannot fully answer. Royal Den Capital can help
                    compare lender paths, explain trade-offs, and prepare a cleaner plan before you make a decision.
                  </T>
                </p>
                <Link className="btn btn-gold btn-lg" href="/apply/">
                  <T k="common_nav_lets_talk">Let&apos;s Talk</T>
                </Link>
              </div>
              <div className="col-lg-5">
                <div className="knowledge-help-list">
                  <h3>
                    <T k="gl_cta_review_h3">We can help you review:</T>
                  </h3>
                  <ul>
                    {CTA_HELP_ITEMS.map((item) => (
                      <li key={item.key}>
                        <T k={item.key}>{item.text}</T>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </RevealMain>

      <section className="newsletter-band">
        <div className="container-xl d-flex flex-wrap align-items-center justify-content-between gap-4">
          <div>
            <h2>$2 Billion in Residential &amp; $2 Billion in Commercial Mortgage Closings.</h2>
            <p>Sign up for mortgage tips, rate updates, and funding insights from Royal Den Capital.</p>
          </div>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
