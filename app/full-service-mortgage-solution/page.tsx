import type { Metadata } from "next";
import Link from "next/link";
import { RevealMain } from "@/components/ui/RevealMain";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { T } from "@/lib/i18n/T";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo/site";

const DESCRIPTION =
  "Full service mortgage solutions from Royal Den Capital for buyers, refinancing, renovation financing, renewals, investments, HELOCs, newcomers, bridge financing, and business expansion.";

export const metadata: Metadata = {
  title: "Full Service Mortgage Solution | Royal Den Capital",
  description: DESCRIPTION,
  alternates: { canonical: absoluteUrl("/full-service-mortgage-solution/") },
  openGraph: { title: "Full Service Mortgage Solution | Royal Den Capital", description: DESCRIPTION, url: absoluteUrl("/full-service-mortgage-solution/") },
  twitter: { title: "Full Service Mortgage Solution | Royal Den Capital", description: DESCRIPTION },
};

const INDEX_LINKS = [
  { href: "#mortgage-options", key: "fsms_idx_options", fallback: "Mortgage options" },
  { href: "#fixed-variable", key: "fsms_idx_fixed_variable", fallback: "Fixed vs. variable" },
  { href: "#open-closed", key: "fsms_idx_open_closed", fallback: "Open vs. closed" },
  { href: "#documents", key: "fsms_idx_documents", fallback: "Documents" },
  { href: "#tools", key: "fsms_idx_tools", fallback: "Tools and links" },
];

const MORTGAGE_OPTIONS = [
  { id: "first-time-buyer", href: "/mortgages/first-home-buyers/", titleKey: "common_mortgage_first_time_buyer", title: "First Time Home Buyer", descKey: "fsms_first_time_desc", desc: "For buyers entering the market for the first time. Confirm down payment source, income stability, credit history, purchase budget, and whether they may qualify for first-time buyer programs or rebates." },
  { id: "second-home", href: "/mortgages/second-home/", titleKey: "fsms_second_home_title", title: "Second Home or Next Home", descKey: "fsms_second_home_desc", desc: "For clients moving up, downsizing, or buying a vacation/secondary property. Review sale timing, bridge financing needs, porting options, and total carrying costs." },
  { id: "refinance", href: "/mortgages/refinance/", titleKey: "common_mortgage_refinance", title: "Refinance", descKey: "fsms_refinance_desc", desc: "For homeowners replacing an existing mortgage to access equity, consolidate debt, change lenders, or improve cash flow. Check current balance, maturity date, penalty estimate, property value, and debt payout list." },
  { id: "renovation-finance", href: "/mortgages/renovation-finance/", titleKey: "footer_renovation_finance", title: "Renovation Finance", descKey: "fsms_renovation_desc", desc: "For homeowners or buyers funding repairs and upgrades. Confirm renovation budget, contractor estimates, equity position, and whether a refinance, HELOC, second mortgage, or purchase-plus-improvement route fits best." },
  { id: "renewal", href: "/mortgages/mortgage-renewal/", titleKey: "common_mortgage_renewal", title: "Mortgage Renewal", descKey: "fsms_renewal_desc", desc: "For clients approaching maturity. Ask for the renewal offer, current lender, remaining balance, maturity date, payment comfort, and goals for the next term." },
  { id: "equity-takeout", href: "/mortgages/equity-takeout/", titleKey: "common_mortgage_equity_takeout", title: "Equity Takeout", descKey: "fsms_equity_takeout_desc", desc: "For clients who want cash from home equity without necessarily selling. Clarify use of funds, current mortgage details, property value, credit profile, and whether repayment is temporary or long term." },
  { id: "heloc", href: "/mortgages/home-equity-line-credit/", titleKey: "fsms_heloc_title", title: "Home Equity Line of Credit", descKey: "fsms_heloc_desc", desc: "For flexible access to equity over time. Useful for ongoing projects, emergency liquidity, investment opportunities, or staged expenses." },
  { id: "debt-consolidation", href: "/mortgages/debt-consolidation/", titleKey: "common_mortgage_debt_consolidation", title: "Debt Consolidation", descKey: "fsms_debt_desc", desc: "For clients carrying high-interest credit cards, loans, or lines of credit. Collect balances, monthly payments, interest rates, and payout statements where available." },
  { id: "reverse-mortgage", href: "/mortgages/reverse-mortgage/", titleKey: "common_mortgage_reverse", title: "Reverse Mortgage", descKey: "fsms_reverse_desc", desc: "For older homeowners who want to access equity while staying in the property. Confirm age, ownership, property type, current mortgage balance, and long-term plans." },
  { id: "new-to-canada", href: "/mortgages/new-to-canada-mortgage/", titleKey: "fsms_newcomer_title", title: "New to Canada Mortgage", descKey: "fsms_newcomer_desc", desc: "For newcomers with limited Canadian credit history. Review residency status, employment, down payment source, international credit references, and bank statements." },
  { id: "construction-financing", href: "/mortgages/construction-financing/", titleKey: "common_mortgage_construction_financing", title: "Construction Financing", descKey: "fsms_construction_desc", desc: "For custom builds, major construction, and staged funding. Collect land details, permits, budget, builder information, draw schedule, and appraisal expectations." },
  { id: "commercial", href: "/mortgages/commercial-mortgages/", titleKey: "footer_commercial_mortgages", title: "Commercial Mortgages", descKey: "fsms_commercial_desc", desc: "For owner-occupied or income-producing commercial property. Review business financials, lease income, property type, environmental needs, and down payment strength." },
  { id: "purchase-plus-improvements", href: "/mortgages/purchase-improvement/", titleKey: "common_mortgage_purchase_improvements", title: "Purchase Plus Improvements", descKey: "fsms_purchase_improve_desc", desc: "For buyers purchasing a home that needs upgrades right away. Confirm accepted purchase price, improvement quote, down payment, lender rules, and completion timing." },
  { id: "co-equity", href: "/mortgages/co-equity-homeownership-ourboro/", titleKey: "common_mortgage_co_equity", title: "Co-Equity Homeownership", descKey: "fsms_co_equity_desc", desc: "For buyers exploring shared-equity support to improve affordability. Review eligibility, contribution expectations, future sale rules, and long-term ownership goals." },
];

const DOCS = [
  { key: "fsms_doc1", text: "Government-issued photo ID." },
  { key: "fsms_doc2", text: "Recent pay stubs, employment letter, T4s, NOAs, or business financials if self-employed." },
  { key: "fsms_doc3", text: "Proof of down payment or equity source, including bank statements, gift letter, or sale agreement." },
  { key: "fsms_doc4", text: "Current mortgage statement and renewal offer for refinance or renewal files." },
  { key: "fsms_doc5", text: "Property details, accepted offer, MLS listing, appraisal, tax bill, or lease details where applicable." },
  { key: "fsms_doc6", text: "Debt list with balances, monthly payments, and payout statements for consolidation files." },
];

const TOOL_LINKS = [
  { href: "/mortgage-payment-calculator/", key: "common_calc_payment", fallback: "Mortgage Payment Calculator" },
  { href: "/mortgage-affordability-calculator/", key: "common_calc_affordability", fallback: "Mortgage Affordability Calculator" },
  { href: "/mortgage-glossary/", key: "common_nav_knowledge_hub", fallback: "Knowledge Hub" },
  { href: "/apply/", key: "fsms_tool_client_app", fallback: "Start a Client Application" },
];

const AGENT_NOTES = [
  { strongKey: "fsms_note1_strong", strong: "Do not quote final approval from a quick estimate.", restKey: "fsms_note1_rest", rest: " Always confirm lender guidelines, insurer rules, property type, and documents before presenting certainty." },
  { strongKey: "fsms_note2_strong", strong: "Penalty matters.", restKey: "fsms_note2_rest", rest: " For refinance and early switch files, estimate the prepayment charge before comparing savings." },
  { strongKey: "fsms_note3_strong", strong: "Property use matters.", restKey: "fsms_note3_rest", rest: " Owner-occupied, rental, vacation, commercial, and construction files are assessed differently." },
  { strongKey: "fsms_note4_strong", strong: "Down payment source matters.", restKey: "fsms_note4_rest", rest: " Lenders need a clean paper trail for savings, gifts, sale proceeds, borrowed funds, or equity." },
];

export default function FullServiceMortgageSolutionPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Mortgage Solution", path: "/full-service-mortgage-solution/" }])} />
      <RevealMain className="mortgage-info-page">
        <section className="mortgage-info-hero">
          <div className="container-xl">
            <p className="section-kicker">
              <T k="fsms_hero_kicker">Mortgage Information</T>
            </p>
            <h1>
              <T k="fsms_hero_title">Mortgage solutions, explained simply.</T>
            </h1>
            <p className="mortgage-info-lead">
              <T k="fsms_hero_lead">
                Use this page as a quick reference for agents and clients. It outlines the main mortgage paths, when
                each one fits, what to collect, and where to go next.
              </T>
            </p>
            <div className="mortgage-info-actions">
              <Link className="btn btn-gold btn-lg" href="/apply/">
                <T k="fsms_start_app">Start an Application</T>
              </Link>
              <Link className="btn btn-outline-primary btn-lg" href="/mortgage-payment-calculator/">
                <T k="fsms_mortgage_calc">Mortgage Calculator</T>
              </Link>
            </div>
          </div>
        </section>

        <section className="mortgage-info-section">
          <div className="container-xl">
            <div className="mortgage-info-layout">
              <aside className="mortgage-info-index" aria-label="Mortgage page sections">
                <strong>
                  <T k="fsms_on_this_page">On this page</T>
                </strong>
                {INDEX_LINKS.map((link) => (
                  <a href={link.href} key={link.href}>
                    <T k={link.key}>{link.fallback}</T>
                  </a>
                ))}
              </aside>

              <div className="mortgage-info-content">
                <section id="mortgage-options" className="info-block">
                  <p className="section-kicker">
                    <T k="fsms_options_kicker">Mortgage Options</T>
                  </p>
                  <p>
                    <T k="fsms_options_desc">
                      Most mortgage conversations become easier once the agent can identify the client&apos;s
                      situation. Use the list below to route clients to the right solution page and collect the
                      right context before submitting a file.
                    </T>
                  </p>

                  <div className="info-link-list">
                    {MORTGAGE_OPTIONS.map((option) => (
                      <article id={option.id} key={option.id}>
                        <h3>
                          <Link href={option.href}>
                            <T k={option.titleKey}>{option.title}</T>
                          </Link>
                        </h3>
                        <p>
                          <T k={option.descKey}>{option.desc}</T>
                        </p>
                      </article>
                    ))}
                  </div>
                </section>

                <section id="fixed-variable" className="info-block">
                  <p className="section-kicker">
                    <T k="fsms_rate_kicker">Rate Structure</T>
                  </p>
                  <h2>
                    <T k="fsms_rate_title">Fixed vs. variable.</T>
                  </h2>
                  <div className="simple-compare">
                    <div>
                      <h3>
                        <T k="fsms_fixed_rate_h3">Fixed rate</T>
                      </h3>
                      <p>
                        <T k="fsms_fixed_rate_p">
                          The interest rate stays the same for the full term. This is easier for clients who want
                          predictable payments and budget certainty.
                        </T>
                      </p>
                      <ul>
                        <li>
                          <T k="fsms_fixed_li1">Best for stable monthly planning.</T>
                        </li>
                        <li>
                          <T k="fsms_fixed_li2">Common choice for first-time buyers and risk-sensitive clients.</T>
                        </li>
                        <li>
                          <T k="fsms_fixed_li3">
                            Breaking early can have a larger penalty because of interest rate differential
                            calculations.
                          </T>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3>
                        <T k="fsms_variable_rate_h3">Variable rate</T>
                      </h3>
                      <p>
                        <T k="fsms_variable_rate_p">
                          The rate changes when the lender&apos;s prime rate changes. It can save money if rates
                          fall, but payments or interest allocation may move.
                        </T>
                      </p>
                      <ul>
                        <li>
                          <T k="fsms_var_li1">Best for clients comfortable with rate movement.</T>
                        </li>
                        <li>
                          <T k="fsms_var_li2">Often has a simpler three-month-interest style penalty.</T>
                        </li>
                        <li>
                          <T k="fsms_var_li3">Agent should explain payment stress and trigger-rate risk where applicable.</T>
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section id="open-closed" className="info-block">
                  <p className="section-kicker">
                    <T k="fsms_openclosed_kicker">Payment Flexibility</T>
                  </p>
                  <h2>
                    <T k="fsms_openclosed_title">Open vs. closed.</T>
                  </h2>
                  <p>
                    <T k="fsms_openclosed_desc">
                      A mortgage is usually either open or closed. This affects how much the client can repay early
                      without a penalty.
                    </T>
                  </p>
                  <dl className="info-definitions">
                    <div>
                      <dt>
                        <T k="fsms_open_dt">Open mortgage</T>
                      </dt>
                      <dd>
                        <T k="fsms_open_dd">
                          Allows full repayment at any time with no prepayment charge. Rates are usually higher.
                          Useful when the client expects to sell, receive a payout, or repay quickly.
                        </T>
                      </dd>
                    </div>
                    <div>
                      <dt>
                        <T k="fsms_closed_dt">Closed mortgage</T>
                      </dt>
                      <dd>
                        <T k="fsms_closed_dd">
                          Usually has a lower rate, but limits extra payments. Most clients choose closed terms
                          because they plan to hold the mortgage for the term.
                        </T>
                      </dd>
                    </div>
                  </dl>
                </section>

                <section id="documents" className="info-block">
                  <p className="section-kicker">
                    <T k="fsms_docs_kicker">Documents</T>
                  </p>
                  <h2>
                    <T k="fsms_docs_title">What to ask for first.</T>
                  </h2>
                  <ul className="info-checklist">
                    {DOCS.map((doc) => (
                      <li key={doc.key}>
                        <T k={doc.key}>{doc.text}</T>
                      </li>
                    ))}
                  </ul>
                </section>

                <section id="tools" className="info-block">
                  <p className="section-kicker">
                    <T k="fsms_tools_kicker">Tools and Links</T>
                  </p>
                  <h2>
                    <T k="fsms_tools_title">Useful next steps.</T>
                  </h2>
                  <div className="resource-links">
                    {TOOL_LINKS.map((link) => (
                      <Link href={link.href} key={link.href}>
                        <T k={link.key}>{link.fallback}</T>
                      </Link>
                    ))}
                  </div>
                </section>

                <section className="info-block">
                  <p className="section-kicker">
                    <T k="fsms_notes_kicker">Quick Notes</T>
                  </p>
                  <h2>
                    <T k="fsms_notes_title">Common reminders for agents.</T>
                  </h2>
                  <div className="agent-notes">
                    {AGENT_NOTES.map((note) => (
                      <p key={note.strongKey}>
                        <strong>
                          <T k={note.strongKey}>{note.strong}</T>
                        </strong>
                        <span>
                          <T k={note.restKey}>{note.rest}</T>
                        </span>
                      </p>
                    ))}
                  </div>
                </section>
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
