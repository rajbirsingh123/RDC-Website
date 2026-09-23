import type { Metadata } from "next";
import { RevealMain } from "@/components/ui/RevealMain";
import { AffordabilityCalculator } from "@/components/calculators/AffordabilityCalculator";
import { JsonLd } from "@/components/seo/JsonLd";
import { T } from "@/lib/i18n/T";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo/site";

const DESCRIPTION =
  "Estimate your mortgage affordability, maximum home price, monthly payment, mortgage insurance, and monthly housing expenses with Royal Den Capital.";
const PAGE_URL = absoluteUrl("/mortgage-affordability-calculator/");

export const metadata: Metadata = {
  title: "Mortgage Affordability Calculator | Royal Den Capital",
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Mortgage Affordability Calculator | Royal Den Capital",
    description: DESCRIPTION,
    url: PAGE_URL,
  },
  twitter: { title: "Mortgage Affordability Calculator | Royal Den Capital", description: DESCRIPTION },
};

const BREADCRUMB_JSON_LD = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Mortgage Affordability Calculator", path: "/mortgage-affordability-calculator/" },
]);

export default function MortgageAffordabilityCalculatorPage() {
  return (
    <>
      <JsonLd data={BREADCRUMB_JSON_LD} />
      <RevealMain id="calculator-page">
        <section className="calculator-clean-hero">
          <div className="container-xl">
            <h1>
              <T k="ac_h1">Mortgage Affordability Calculator</T>
            </h1>
            <p>
              <T k="ac_lead">
                Use income, debt, and housing costs to estimate a practical home price before you start shopping or
                submit a full mortgage application.
              </T>
            </p>
          </div>
        </section>

        <section className="advanced-calculator-section">
          <div className="container-xl">
            <AffordabilityCalculator />
          </div>
        </section>
      </RevealMain>
    </>
  );
}
