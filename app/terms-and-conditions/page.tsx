import type { Metadata } from "next";
import Link from "next/link";
import { RevealMain } from "@/components/ui/RevealMain";
import { JsonLd } from "@/components/seo/JsonLd";
import { T, THtml } from "@/lib/i18n/T";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo/site";

const DESCRIPTION = "The rules and disclosures that govern your use of the Royal Den Capital website.";

export const metadata: Metadata = {
  title: "Terms & Conditions | Royal Den Capital",
  description: DESCRIPTION,
  alternates: { canonical: absoluteUrl("/terms-and-conditions/") },
  openGraph: { title: "Terms & Conditions | Royal Den Capital", description: DESCRIPTION, url: absoluteUrl("/terms-and-conditions/") },
  twitter: { title: "Terms & Conditions | Royal Den Capital", description: DESCRIPTION },
};

export default function TermsAndConditionsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Terms & Conditions", path: "/terms-and-conditions/" }])} />
      <RevealMain>
        <section className="page-hero">
          <div className="container-xl text-center">
            <h1>
              <T k="tc_h1">Terms &amp; Conditions</T>
            </h1>
            <p className="hero-lead mx-auto">
              <T k="tc_lead">The rules and disclosures that govern your use of this website.</T>
            </p>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb justify-content-center">
                <li className="breadcrumb-item">
                  <Link href="/">
                    <T k="legal_bc_home">Home</T>
                  </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  <T k="tc_h1">Terms &amp; Conditions</T>
                </li>
              </ol>
            </nav>
          </div>
        </section>

        <section className="legal-section">
          <div className="container-xl">
            <div className="legal-content">
              <p
                className="legal-lang-notice"
                style={{ background: "rgba(13,92,184,0.08)", border: "1px solid rgba(13,92,184,0.2)", borderRadius: 8, padding: "14px 18px", fontWeight: 600 }}
              >
                <T k="legal_translation_notice">
                  This page is also available in French and Punjabi for your convenience. If there is any discrepancy
                  between language versions, the English version governs.
                </T>
              </p>
              <p className="legal-updated">
                <T k="legal_updated_jan2026">Last updated: January 2026</T>
              </p>

              <p>
                <T k="tc_intro">
                  Welcome to the Royal Den Capital website. By accessing or using this site, you agree to the terms and
                  conditions set out below. Please read them carefully. If you do not agree with any part of these
                  terms, please do not use this website.
                </T>
              </p>

              <h2>
                <T k="tc_s1_h2">1. About Royal Den Capital</T>
              </h2>
              <p>
                <T k="tc_s1_p2">
                  References to &quot;Royal Den Capital,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;
                  throughout this website and these terms mean Royal Den Capital Ltd., independently owned and
                  operated as a member of the Mortgage Alliance network.
                </T>
              </p>

              <h2>
                <T k="tc_s2_h2">2. Nature of Our Services</T>
              </h2>
              <p>
                <T k="tc_s2_p">
                  Royal Den Capital operates as a licensed mortgage brokerage. We compare mortgage and financing
                  options across banks, credit unions, alternative lenders, and private lenders on your behalf; we are
                  not a lender ourselves, and we do not guarantee approval, rate, or terms from any lender. All
                  financing remains subject to that lender&apos;s own underwriting, credit, and property approval
                  requirements.
                </T>
              </p>

              <h2>
                <T k="tc_s3_h2">3. Website Content Is Informational Only</T>
              </h2>
              <p>
                <T k="tc_s3_p">
                  Content on this website, including the mortgage glossary, FAQs, process guides, and educational
                  articles, is provided for general informational purposes only and does not constitute financial,
                  legal, or tax advice. Speak with a licensed advisor, lawyer, or accountant about your specific
                  situation before making financial decisions.
                </T>
              </p>

              <h2>
                <T k="tc_s4_h2">4. Rates and Approvals</T>
              </h2>
              <p>
                <T k="tc_s4_p">
                  Rates displayed on this site are for illustration purposes and are subject to change without
                  notice. They do not constitute a rate hold or lender commitment until confirmed in writing by that
                  lender. Approval is never guaranteed and remains subject to standard lending criteria, including
                  income verification, credit approval, and property appraisal (on approved credit, OAC). Final terms
                  are set by the lender, not by Royal Den Capital.
                </T>
              </p>

              <h2>
                <T k="tc_s5_h2">5. Calculators and Estimates</T>
              </h2>
              <p>
                <T k="tc_s5_p">
                  The mortgage payment, affordability, insurance premium, and land transfer tax figures produced by
                  the calculators on this site are illustrative estimates only and may not reflect your actual costs.
                  Insurance premiums and land transfer tax are set by insurers and by provincial or municipal
                  governments and may change at any time.
                </T>
              </p>

              <h2>
                <T k="tc_s6_h2">6. How We&apos;re Compensated</T>
              </h2>
              <p>
                <T k="tc_s6_p">
                  As a licensed mortgage brokerage, Royal Den Capital may receive compensation (finder&apos;s fees or
                  commissions) from lenders for mortgages we place. This does not add to your rate or cost and does
                  not affect the impartiality of the advice you receive.
                </T>
              </p>

              <h2>
                <T k="tc_s7_h2">7. Intellectual Property</T>
              </h2>
              <p>
                <T k="tc_s7_p">
                  The text, graphics, logos, and design of this website are the property of Royal Den Capital or its
                  licensors and are protected by applicable copyright and trademark law. You may view and print pages
                  for your own personal, non-commercial use, but may not reproduce, republish, or distribute this
                  content without our prior written permission.
                </T>
              </p>

              <h2>
                <T k="tc_s8_h2">8. Third-Party Links</T>
              </h2>
              <p>
                <T k="tc_s8_p">
                  This site may link to lender, partner, or industry websites that we do not control. We are not
                  responsible for the content, accuracy, or privacy practices of any third-party site, and a link
                  does not imply our endorsement of it.
                </T>
              </p>

              <h2>
                <T k="tc_s9_h2">9. Limitation of Liability</T>
              </h2>
              <p>
                <T k="tc_s9_p">
                  This website and its content are provided &quot;as is,&quot; without warranties of any kind,
                  express or implied. To the fullest extent permitted by law, Royal Den Capital is not liable for any
                  direct, indirect, incidental, or consequential loss arising from your use of, or reliance on, this
                  website or its content, including calculator estimates and rate information.
                </T>
              </p>

              <h2>
                <T k="tc_s10_h2">10. Changes to These Terms</T>
              </h2>
              <p>
                <T k="tc_s10_p">
                  We may update these terms and conditions from time to time to reflect changes in our services or
                  applicable law. The &quot;last updated&quot; date at the top of this page reflects the most recent
                  revision. Continued use of this website after changes are posted constitutes acceptance of the
                  updated terms.
                </T>
              </p>

              <h2>
                <T k="tc_s11_h2">11. Governing Law</T>
              </h2>
              <p>
                <T k="tc_s11_p">
                  These terms are governed by the laws of the Province of Ontario and the federal laws of Canada
                  applicable within it, without regard to conflict-of-law principles.
                </T>
              </p>

              <h2>
                <T k="tc_s12_h2">12. Contact Us</T>
              </h2>
              <p>
                <T k="tc_s12_p_intro">Questions about these terms and conditions can be directed to:</T>
              </p>
              <div className="legal-info-box">
                <dl>
                  <div>
                    <dt>
                      <T k="legal_label_email">Email</T>
                    </dt>
                    <dd>
                      <a href="mailto:info@royaldencapital.ca">info@royaldencapital.ca</a>
                    </dd>
                  </div>
                  <div>
                    <dt>
                      <T k="legal_label_phone">Phone</T>
                    </dt>
                    <dd>
                      <a href="tel:19056091818">905-609-1818</a>
                    </dd>
                  </div>
                  <div>
                    <dt>
                      <T k="legal_label_mail">Mail</T>
                    </dt>
                    <dd>Unit 1, 2483 Burnhamthorpe Rd W, Oakville, ON L6M 4H1, Canada</dd>
                  </div>
                </dl>
              </div>

              <p>
                <THtml k="tc_seealso" html='See also our <a href="/privacy-policy/">Privacy Policy</a> for how we handle your personal information.' />
              </p>
            </div>
          </div>
        </section>
      </RevealMain>
    </>
  );
}
