import type { Metadata } from "next";
import { RevealMain } from "@/components/ui/RevealMain";
import { PaymentCalculator } from "@/components/calculators/PaymentCalculator";
import { JsonLd } from "@/components/seo/JsonLd";
import { T } from "@/lib/i18n/T";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo/site";

const DESCRIPTION =
  "Estimate mortgage payments, insurance, loan amount, interest cost, and yearly amortization with Royal Den Capital's mortgage payment calculator.";
const PAGE_URL = absoluteUrl("/mortgage-payment-calculator/");

export const metadata: Metadata = {
  title: "Mortgage Payment Calculator | Royal Den Capital",
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { title: "Mortgage Payment Calculator | Royal Den Capital", description: DESCRIPTION, url: PAGE_URL },
  twitter: { title: "Mortgage Payment Calculator | Royal Den Capital", description: DESCRIPTION },
};

const BREADCRUMB_JSON_LD = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Mortgage Payment Calculator", path: "/mortgage-payment-calculator/" },
]);

export default function MortgagePaymentCalculatorPage() {
  return (
    <>
      <JsonLd data={BREADCRUMB_JSON_LD} />
      <RevealMain id="calculator-page">
        <section className="calculator-clean-hero">
          <div className="container-xl">
            <h1>
              <T k="pc_h1">Mortgage Payment Calculator</T>
            </h1>
            <p>
              <T k="pc_lead">
                Whether you&apos;re purchasing your first home, renewing your mortgage, planning a renovation, or
                consolidating debt, it all starts with a clear payment plan built around your goals.
              </T>
            </p>
          </div>
        </section>

        <section className="advanced-calculator-section">
          <div className="container-xl">
            <PaymentCalculator />
          </div>
        </section>
      </RevealMain>
    </>
  );
}
