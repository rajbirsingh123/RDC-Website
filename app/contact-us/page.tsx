import type { Metadata } from "next";
import Link from "next/link";
import { RevealMain } from "@/components/ui/RevealMain";
import { LeadForm, type LeadFormFieldKeys, type LeadFormOption } from "@/components/forms/LeadForm";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { T, THtml } from "@/lib/i18n/T";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo/site";

const DESCRIPTION =
  "Contact Royal Den Capital for a free mortgage or business funding consultation. Call 905-609-1818 or email info@royaldencapital.ca.";

export const metadata: Metadata = {
  title: "Contact Us | Royal Den Capital",
  description: DESCRIPTION,
  alternates: { canonical: absoluteUrl("/contact-us/") },
  openGraph: { title: "Contact Us | Royal Den Capital", description: DESCRIPTION, url: absoluteUrl("/contact-us/") },
  twitter: { title: "Contact Us | Royal Den Capital", description: DESCRIPTION },
};

/** contact-us's form uses the same field set as the homepage's lead form (name/email/phone/
 * services/subject/message) but different i18n keys ("cu_form_*"/"cu_opt_*") and a different
 * services dropdown list — so it reuses <LeadForm/> via its fieldKeys/needOptions override props
 * instead of duplicating the whole component. */
const CONTACT_FIELD_KEYS: LeadFormFieldKeys = {
  name: { key: "cu_form_name", fallback: "Your Name" },
  email: { key: "cu_form_email", fallback: "Your Email" },
  phone: { key: "cu_form_phone", fallback: "Your Phone" },
  services: { key: "cu_form_services", fallback: "Services Required" },
  subject: { key: "cu_form_subject", fallback: "Subject" },
  message: { key: "cu_form_message", fallback: "Your message (optional)" },
  submit: { key: "cu_form_send", fallback: "Send" },
};

const CONTACT_NEED_OPTIONS: LeadFormOption[] = [
  { key: "cu_opt_select", fallback: "Select an option" },
  { key: "cu_opt_purchase", fallback: "Purchase / First Time Buyer" },
  { key: "cu_opt_refinance", fallback: "Refinance" },
  { key: "cu_opt_renewal", fallback: "Mortgage Renewal" },
  { key: "cu_opt_heloc", fallback: "Home Equity / HELOC" },
  { key: "cu_opt_debt", fallback: "Debt Consolidation" },
  { key: "cu_opt_reno", fallback: "Renovation Finance" },
  { key: "cu_opt_newcomer", fallback: "New to Canada Mortgage" },
  { key: "cu_opt_commercial", fallback: "Commercial Mortgage" },
  { key: "cu_opt_construction", fallback: "Construction Financing" },
  { key: "cu_opt_other", fallback: "Other" },
];

export default function ContactUsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Contact Us", path: "/contact-us/" }])} />
      <RevealMain id="contact-us">
        <section className="page-hero contact-hero">
          <div className="container-xl text-center">
            <h1>
              <T k="cu_h1">Contact Us</T>
            </h1>
            <p className="hero-lead mx-auto">
              <T k="cu_lead">
                Talk to Royal Den Capital about mortgages, refinancing, renewals, equity access, or commercial
                lending support.
              </T>
            </p>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb justify-content-center">
                <li className="breadcrumb-item">
                  <Link href="/">
                    <T k="cu_bc_home">Home</T>
                  </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  <T k="cu_bc_contact">Contact Us</T>
                </li>
              </ol>
            </nav>
          </div>
        </section>

        <section className="simple-page-section" style={{ paddingBottom: 0 }}>
          <div className="container-xl text-center">
            <p className="section-kicker">
              <T k="cu_expert_kicker">Expert Advice with a Client-First Mindset</T>
            </p>
            <h2>
              <T k="cu_expert_h2">Your next mortgage conversation starts here.</T>
            </h2>
            <p className="mx-auto" style={{ maxWidth: 760 }}>
              <T k="cu_expert_p">
                Whether you are buying, renewing, refinancing, using home equity, or exploring a commercial file, our
                team can help you understand the options and next steps clearly.
              </T>
            </p>
            <div className="contact-quick-links" aria-label="Quick contact options">
              <a href="tel:19056091818">
                <i className="bi bi-telephone-fill" />
                <span>905-609-1818</span>
              </a>
              <a href="mailto:info@royaldencapital.ca">
                <i className="bi bi-envelope-fill" />
                <span>info@royaldencapital.ca</span>
              </a>
              <Link href="/apply/">
                <i className="bi bi-file-earmark-text-fill" />
                <span>
                  <T k="cu_start_app">Start Application</T>
                </span>
              </Link>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="container-xl">
            <div className="row g-5">
              <div className="col-lg-7">
                <div className="contact-form-panel">
                  <p className="section-kicker">
                    <T k="cu_send_kicker">Send a Message</T>
                  </p>
                  <h2>
                    <T k="cu_send_h2">Tell us what you need help with.</T>
                  </h2>
                  <p className="contact-form-intro">
                    <T k="cu_send_intro">
                      Share a few details and the Royal Den Capital team will follow up with the most relevant next
                      steps.
                    </T>
                  </p>
                  <LeadForm fieldKeys={CONTACT_FIELD_KEYS} needOptions={CONTACT_NEED_OPTIONS} />
                </div>
              </div>
              <div className="col-lg-5">
                <aside className="contact-card">
                  <p className="section-kicker">
                    <T k="cu_visit_kicker">Visit or Contact</T>
                  </p>
                  <h2>
                    <T k="cu_headoffice_h2">Head Office</T>
                  </h2>
                  <div className="contact-line">
                    <i className="bi bi-geo-alt-fill" />
                    <a
                      href="https://www.google.com/maps/place/Unit+1,+2483+Burnhamthorpe+Rd+W,+Oakville,+ON+L6M+4H1/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Unit 1, 2483 Burnhamthorpe Rd W
                      <br />
                      Oakville ON L6M 4H1
                    </a>
                  </div>
                  <div className="contact-line">
                    <i className="bi bi-envelope-fill" />
                    <div>
                      <span className="d-block fw-bold">
                        <T k="cu_email_support">Email Support</T>
                      </span>
                      <a href="mailto:info@royaldencapital.ca">info@royaldencapital.ca</a>
                    </div>
                  </div>
                  <div className="contact-line">
                    <i className="bi bi-telephone-fill" />
                    <div>
                      <span className="d-block fw-bold">
                        <T k="common_nav_lets_talk">Let&apos;s Talk</T>
                      </span>
                      <a href="tel:19056091818">905-609-1818</a>
                    </div>
                  </div>
                  <div className="contact-line">
                    <i className="bi bi-clock-fill" />
                    <div>
                      <span className="d-block fw-bold">
                        <T k="cu_office_hours_label">Office Hours</T>
                      </span>
                      <span>
                        <T k="cu_office_hours_val">Mon - Fri, 10:00 AM - 06:00 PM</T>
                      </span>
                    </div>
                  </div>
                  <div className="contact-map">
                    <iframe
                      title="Royal Den Capital office map"
                      src="https://www.google.com/maps?q=Unit%201-2483%20Burnhamthorpe%20Rd%20W%2C%20Oakville%2C%20ON%20L6M%204H1&output=embed"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                  <a
                    className="map-link"
                    href="https://www.google.com/maps/place/Unit+1,+2483+Burnhamthorpe+Rd+W,+Oakville,+ON+L6M+4H1/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <THtml k="cu_open_maps" html='Open in Google Maps <i class="bi bi-box-arrow-up-right"></i>' />
                  </a>
                </aside>
              </div>
            </div>
          </div>
        </section>

        <section className="contact-next-steps">
          <div className="container-xl">
            <div className="section-heading text-center">
              <p className="section-kicker">
                <T k="cu_before_kicker">Before We Connect</T>
              </p>
              <h2>
                <T k="cu_before_h2">Helpful details to have ready.</T>
              </h2>
            </div>
            <div className="contact-step-list">
              <div>
                <strong>
                  <T k="cu_s1_strong">1. Your goal</T>
                </strong>
                <span>
                  <T k="cu_s1_span">Purchase, refinance, renewal, equity access, renovation, or commercial financing.</T>
                </span>
              </div>
              <div>
                <strong>
                  <T k="cu_s2_strong">2. Key numbers</T>
                </strong>
                <span>
                  <T k="cu_s2_span">
                    Purchase price, current mortgage balance, income range, down payment, or target loan amount.
                  </T>
                </span>
              </div>
              <div>
                <strong>
                  <T k="cu_s3_strong">3. Timeline</T>
                </strong>
                <span>
                  <T k="cu_s3_span">
                    Let us know if you are planning ahead, actively shopping, renewing soon, or working with a firm
                    deadline.
                  </T>
                </span>
              </div>
            </div>
          </div>
        </section>
      </RevealMain>

      <section className="newsletter-band">
        <div className="container-xl d-flex flex-wrap align-items-center justify-content-between gap-4">
          <div>
            <h2>$2 Billion in Residential &amp; $2 Billion in Commercial Mortgage Closings.</h2>
            <p>
              <T k="home_newsletter_desc">Sign up for mortgage tips, rate updates, and funding insights from Royal Den Capital.</T>
            </p>
          </div>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
