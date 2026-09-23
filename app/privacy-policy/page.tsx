import type { Metadata } from "next";
import Link from "next/link";
import { RevealMain } from "@/components/ui/RevealMain";
import { JsonLd } from "@/components/seo/JsonLd";
import { T, THtml } from "@/lib/i18n/T";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo/site";

const DESCRIPTION = "How Royal Den Capital collects, uses, and protects your personal information when you use this website.";

export const metadata: Metadata = {
  title: "Privacy Policy | Royal Den Capital",
  description: DESCRIPTION,
  alternates: { canonical: absoluteUrl("/privacy-policy/") },
  openGraph: { title: "Privacy Policy | Royal Den Capital", description: DESCRIPTION, url: absoluteUrl("/privacy-policy/") },
  twitter: { title: "Privacy Policy | Royal Den Capital", description: DESCRIPTION },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Privacy Policy", path: "/privacy-policy/" }])} />
      <RevealMain>
        <section className="page-hero">
          <div className="container-xl text-center">
            <h1>
              <T k="pp_h1">Privacy Policy</T>
            </h1>
            <p className="hero-lead mx-auto">
              <T k="pp_lead">How we collect, use, and protect your information on this website.</T>
            </p>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb justify-content-center">
                <li className="breadcrumb-item">
                  <Link href="/">
                    <T k="legal_bc_home">Home</T>
                  </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  <T k="pp_h1">Privacy Policy</T>
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
                <T k="pp_intro">
                  This Privacy Policy describes how Royal Den Capital Ltd. (&quot;Royal Den Capital,&quot; &quot;we,&quot;
                  &quot;us,&quot; or &quot;our&quot;) collects, uses, and discloses information when you visit
                  royaldencapital.ca (the &quot;Site&quot;). By using the Site, you agree to the collection and use of
                  information as described in this policy.
                </T>
              </p>

              <h2>
                <T k="pp_s1_h2">1. Who We Are</T>
              </h2>
              <div className="legal-info-box">
                <dl>
                  <div>
                    <dt>
                      <T k="legal_label_legal_name">Legal Name</T>
                    </dt>
                    <dd>Royal Den Capital Ltd.</dd>
                  </div>
                  <div>
                    <dt>
                      <T k="legal_label_address">Address</T>
                    </dt>
                    <dd>Unit 1, 2483 Burnhamthorpe Rd W, Oakville, ON L6M 4H1, Canada</dd>
                  </div>
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
                </dl>
              </div>

              <h2>
                <T k="pp_s2_h2">2. Information We Collect</T>
              </h2>
              <p>
                <THtml
                  k="pp_s2_p1"
                  html="<strong>Information you give us directly.</strong> When you submit our contact form, newsletter sign-up, or Live Chat assistant, we ask for information such as your name, email address, phone number, the service you're interested in, timeline, and any message you include. This site has no user accounts or logins &ndash; there's nothing to register for."
                />
              </p>
              <p>
                <THtml
                  k="pp_s2_p2"
                  html="<strong>Usage data.</strong> Like most websites, our hosting and content-delivery providers may automatically log basic technical information such as your IP address, browser type, device type, pages visited, and the date and time of your visit."
                />
              </p>
              <p>
                <THtml
                  k="pp_s2_p3"
                  html="<strong>Cookies.</strong> We use a single cookie-preference setting, stored in your browser (not on our servers), to remember your choice from the cookie banner shown on your first visit. This site does not run third-party advertising or analytics trackers."
                />
              </p>

              <h2>
                <T k="pp_s3_h2">3. How We Use Your Information</T>
              </h2>
              <ul>
                <li>
                  <T k="pp_s3_li1">To respond to your enquiries and provide the mortgage or financing information you&apos;ve requested.</T>
                </li>
                <li>
                  <T k="pp_s3_li2">To send you rate updates, mortgage tips, or funding insights if you&apos;ve signed up for our newsletter.</T>
                </li>
                <li>
                  <T k="pp_s3_li3">To maintain, secure, and improve the Site.</T>
                </li>
                <li>
                  <T k="pp_s3_li4">To meet legal, regulatory, and licensing obligations as a mortgage brokerage.</T>
                </li>
              </ul>

              <h2>
                <T k="pp_s4_h2">4. How Contact &amp; Newsletter Forms Work</T>
              </h2>
              <p>
                <THtml
                  k="pp_s4_p"
                  html='When you submit the contact form, newsletter sign-up, or Live Chat transfer on this Site, your browser opens a pre-filled email addressed to <a href="mailto:info@royaldencapital.ca">info@royaldencapital.ca</a> through your own email application. Chat messages may be kept temporarily in your browser session so you can move between pages without losing the conversation. The transfer email is sent directly from your device to our inbox &ndash; it is not stored in a database on this website or passed through a third-party form-processing service.'
                />
              </p>

              <h2>
                <T k="pp_s5_h2">5. Mortgage Calculators</T>
              </h2>
              <p>
                <T k="pp_s5_p">
                  The figures you enter into our mortgage payment and affordability calculators are processed entirely in
                  your own browser to produce an estimate. That input is never transmitted to or stored on our servers.
                </T>
              </p>

              <h2>
                <T k="pp_s6_h2">6. Sharing Your Information</T>
              </h2>
              <p>
                <T k="pp_s6_p_intro">We do not sell your personal information. We may share it only:</T>
              </p>
              <ul>
                <li>
                  <T k="pp_s6_li1">With lenders or partners you&apos;ve asked us to connect you with, to pursue a mortgage or financing enquiry on your behalf.</T>
                </li>
                <li>
                  <T k="pp_s6_li2">With service providers who help us run this Site (for example, our web hosting provider), bound to keep your information confidential.</T>
                </li>
                <li>
                  <T k="pp_s6_li3">If required by law, regulation, or a valid request from a court or government authority.</T>
                </li>
                <li>
                  <T k="pp_s6_li4">In connection with a merger, acquisition, or sale of business assets, in which case we&apos;ll take reasonable steps to notify you.</T>
                </li>
              </ul>

              <h2>
                <T k="pp_s7_h2">7. Data Retention</T>
              </h2>
              <p>
                <T k="pp_s7_p">
                  We keep enquiry and newsletter information only as long as reasonably necessary to respond to you,
                  maintain our business records, and meet our regulatory and licensing obligations as a mortgage broker.
                  You can ask us to delete information you&apos;ve sent us at any time (see Section 9).
                </T>
              </p>

              <h2>
                <T k="pp_s8_h2">8. Security</T>
              </h2>
              <p>
                <T k="pp_s8_p">
                  We take reasonable steps to protect the information sent to us, but no method of transmission over the
                  internet or email is 100% secure, and we cannot guarantee absolute security.
                </T>
              </p>

              <h2>
                <T k="pp_s9_h2">9. Your Rights &amp; Choices</T>
              </h2>
              <p>
                <THtml
                  k="pp_s9_p"
                  html='You may ask us to access, correct, or delete personal information you&apos;ve provided to us, or to stop receiving newsletter emails, at any time by contacting <a href="mailto:info@royaldencapital.ca">info@royaldencapital.ca</a>. We may need to retain certain information where we have a legal or regulatory obligation to do so.'
                />
              </p>

              <h2>
                <T k="pp_s10_h2">10. Children&apos;s Privacy</T>
              </h2>
              <p>
                <T k="pp_s10_p">
                  This Site is not directed at children under 13, and we do not knowingly collect personal information
                  from anyone under 13. If you believe a child has provided us with personal information, please
                  contact us and we will remove it.
                </T>
              </p>

              <h2>
                <T k="pp_s11_h2">11. Links to Other Websites</T>
              </h2>
              <p>
                <T k="pp_s11_p">
                  This Site may link to lender or partner websites we don&apos;t control, including the Mortgage
                  Alliance network. We are not responsible for the content or privacy practices of any third-party
                  site, and encourage you to review their policies directly.
                </T>
              </p>

              <h2>
                <T k="pp_s12_h2">12. Changes to This Policy</T>
              </h2>
              <p>
                <T k="pp_s12_p">
                  We may update this Privacy Policy from time to time. Any changes will be posted on this page with a
                  revised &quot;Last updated&quot; date. We encourage you to review this page periodically.
                </T>
              </p>

              <h2>
                <T k="pp_s13_h2">13. Governing Law</T>
              </h2>
              <p>
                <T k="pp_s13_p">
                  This Privacy Policy is governed by the laws of the Province of Ontario and the federal laws of Canada
                  applicable within it.
                </T>
              </p>

              <h2>
                <T k="pp_s14_h2">14. Contact Us</T>
              </h2>
              <p>
                <T k="pp_s14_p_intro">Questions about this Privacy Policy or your personal information can be directed to:</T>
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
                <THtml
                  k="pp_seealso"
                  html='See also our <a href="/terms-and-conditions/">Terms &amp; Conditions</a> for the rules governing your use of this website.'
                />
              </p>
            </div>
          </div>
        </section>
      </RevealMain>
    </>
  );
}
