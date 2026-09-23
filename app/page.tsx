import type { Metadata } from "next";
import Link from "next/link";
import { HomeHero } from "@/components/home/HomeHero";
import { RatesIntroSection } from "@/components/home/RatesIntroSection";
import { RevealMain } from "@/components/ui/RevealMain";
import { CountUp } from "@/components/ui/CountUp";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { LeadForm } from "@/components/forms/LeadForm";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { T, THtml } from "@/lib/i18n/T";
import { HOME_FAQ } from "@/data/homeFaq";
import { absoluteUrl, faqPageJsonLd, financialServiceJsonLd, websiteJsonLd } from "@/lib/seo/site";

const DESCRIPTION =
  "Ontario mortgage broker comparing Canada's top lenders for better rates and faster approvals — home purchases, renewals, refinancing, and business financing.";

export const metadata: Metadata = {
  title: "Mortgage Broker in Ontario | Royal Den Capital",
  description: DESCRIPTION,
  alternates: { canonical: absoluteUrl("/") },
  openGraph: { title: "Mortgage Broker in Ontario | Royal Den Capital", description: DESCRIPTION, url: absoluteUrl("/") },
  twitter: { title: "Mortgage Broker in Ontario | Royal Den Capital", description: DESCRIPTION },
};

const HOME_ORGANIZATION_JSON_LD = {
  ...financialServiceJsonLd(),
  alternateName: "Royal Den Capital Ltd.",
  logo: absoluteUrl("/assets/rdc-logo.png"),
  image: absoluteUrl("/assets/og-image.jpg"),
  description: DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Unit 1, 2483 Burnhamthorpe Rd W",
    addressLocality: "Oakville",
    addressRegion: "ON",
    postalCode: "L6M 4H1",
    addressCountry: "CA",
  },
  areaServed: { "@type": "State", name: "Ontario" },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "10:00",
    closes: "18:00",
  },
  sameAs: ["https://instagram.com/royaldencapital", "https://www.mortgagealliance.com/en/"],
  priceRange: "$$",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Mortgage and Financing Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mortgage Refinancing", url: absoluteUrl("/mortgages/refinance/") } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mortgage Renewal", url: absoluteUrl("/mortgages/mortgage-renewal/") } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "First Time Home Buyer Mortgages", url: absoluteUrl("/mortgages/first-home-buyers/") } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Equity Takeout", url: absoluteUrl("/mortgages/equity-takeout/") } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Home Equity Line of Credit", url: absoluteUrl("/mortgages/home-equity-line-credit/") } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Debt Consolidation Mortgage", url: absoluteUrl("/mortgages/debt-consolidation/") } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Renovation Financing", url: absoluteUrl("/mortgages/renovation-finance/") } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Purchase Plus Improvements", url: absoluteUrl("/mortgages/purchase-improvement/") } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Construction Financing", url: absoluteUrl("/mortgages/construction-financing/") } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Reverse Mortgage", url: absoluteUrl("/mortgages/reverse-mortgage/") } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "New to Canada Mortgages", url: absoluteUrl("/mortgages/new-to-canada-mortgage/") } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Second Home Financing", url: absoluteUrl("/mortgages/second-home/") } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Co-Equity Homeownership", url: absoluteUrl("/mortgages/co-equity-homeownership-ourboro/") } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Commercial Mortgages", url: absoluteUrl("/mortgages/commercial-mortgages/") } },
    ],
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={[HOME_ORGANIZATION_JSON_LD, websiteJsonLd(), faqPageJsonLd(HOME_FAQ.map((f) => ({ question: f.question, answer: f.answer })))]} />
      <RevealMain id="home">
        <HomeHero />

        <RatesIntroSection />

        <section className="funding-band">
          <div className="container-xl">
            <div className="row g-4 align-items-center text-center text-lg-start">
              <div className="col-lg-4">
                <img src="/assets/rdc-logo.png" alt="" className="band-logo" />
              </div>
              <div className="col-lg-6">
                <p className="funding-total">
                  <T k="home_funding_total">$4 Billion in Funded Deals</T>
                </p>
                <h2>
                  <T k="home_funding_title">$2 Billion in Residential &amp; $2 Billion in Commercial Mortgages</T>
                </h2>
              </div>
              <div className="col-lg-2">
                <Link href="/contact-us/" className="btn btn-dark w-100">
                  <T k="home_contact_us_btn">Contact us</T>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="partners-section">
          <div className="container-xl">
            <div className="section-heading text-center">
              <p className="section-kicker">
                <T k="home_partners_kicker">Empowering growth through trusted capital</T>
              </p>
              <h2>
                <T k="home_partners_title">Lending Partners</T>
              </h2>
            </div>
            <div className="partner-strip marquee">
              <div className="marquee-track">
                <img src="/assets/partner-3.png" alt="Scotiabank" />
                <img src="/assets/partner-4.png" alt="TD Bank" />
                <img src="/assets/rbc.svg" alt="RBC Royal Bank" />
                <img src="/assets/bmo.svg" alt="BMO" />
                <img src="/assets/cibc.svg" alt="CIBC" />
                <img src="/assets/national-bank.svg" alt="National Bank of Canada" />
                <img src="/assets/partner-1.png" alt="Home Trust" />
                <img src="/assets/partner-2.png" alt="Oppono Lending Company" />
                <img src="/assets/partner-5.png" alt="Hosper Mortgage" />
                <img src="/assets/partner-6.png" alt="Atrium" />
                <img src="/assets/partner-3.png" alt="" aria-hidden="true" />
                <img src="/assets/partner-4.png" alt="" aria-hidden="true" />
                <img src="/assets/rbc.svg" alt="" aria-hidden="true" />
                <img src="/assets/bmo.svg" alt="" aria-hidden="true" />
                <img src="/assets/cibc.svg" alt="" aria-hidden="true" />
                <img src="/assets/national-bank.svg" alt="" aria-hidden="true" />
                <img src="/assets/partner-1.png" alt="" aria-hidden="true" />
                <img src="/assets/partner-2.png" alt="" aria-hidden="true" />
                <img src="/assets/partner-5.png" alt="" aria-hidden="true" />
                <img src="/assets/partner-6.png" alt="" aria-hidden="true" />
              </div>
            </div>
          </div>
        </section>

        <section className="services-section" id="mortgages">
          <div className="container-xl">
            <div className="section-heading text-center">
              <p className="section-kicker">
                <T k="home_services_kicker">Explore business loans, venture capital, and equity solutions all in one place</T>
              </p>
              <h2>
                <T k="home_services_title">Royal Den Capital Services</T>
              </h2>
            </div>
            <div className="service-link-grid">
              <Link href="/full-service-mortgage-solution/">
                <i className="bi bi-briefcase-fill" />
                <span>Business Loans</span>
              </Link>
              <Link href="/full-service-mortgage-solution/">
                <i className="bi bi-pie-chart-fill" />
                <span>Equity Financing</span>
              </Link>
              <Link href="/full-service-mortgage-solution/">
                <i className="bi bi-rocket-takeoff-fill" />
                <span>Venture Capital</span>
              </Link>
              <Link href="/full-service-mortgage-solution/">
                <i className="bi bi-bank" />
                <span>SBA Loans</span>
              </Link>
              <Link href="/full-service-mortgage-solution/">
                <i className="bi bi-house-heart-fill" />
                <span>
                  <T k="home_service_home_mortgage">Home Mortgage</T>
                </span>
              </Link>
              <Link href="/full-service-mortgage-solution/">
                <i className="bi bi-cash-coin" />
                <span>
                  <T k="home_service_refinancing_equity">Refinancing &amp; Equity</T>
                </span>
              </Link>
              <Link href="/full-service-mortgage-solution/">
                <i className="bi bi-house-check-fill" />
                <span>
                  <T k="home_service_preapproval">Mortgage Pre-Approval</T>
                </span>
              </Link>
              <Link href="/full-service-mortgage-solution/">
                <i className="bi bi-layers-fill" />
                <span>Debt Consolidation</span>
              </Link>
              <Link href="/mortgages/home-equity-line-credit/">
                <i className="bi bi-credit-card-2-front-fill" />
                <span>
                  <T k="home_service_line_of_credit">Line of Credit</T>
                </span>
              </Link>
              <Link href="/mortgages/commercial-mortgages/">
                <i className="bi bi-building" />
                <span>
                  <T k="home_service_commercial_mortgages">Commercial Mortgages</T>
                </span>
              </Link>
              <Link href="/mortgages/first-home-buyers/">
                <i className="bi bi-key-fill" />
                <span>
                  <T k="home_service_first_time_buyer">First Time Home Buyer</T>
                </span>
              </Link>
              <Link href="/mortgages/construction-financing/">
                <i className="bi bi-tools" />
                <span>
                  <T k="home_service_construction_financing">Construction Financing</T>
                </span>
              </Link>
            </div>
          </div>
        </section>

        <section className="why-section">
          <div className="container-xl">
            <div className="row align-items-center g-5">
              <div className="col-lg-6">
                <div className="image-stat image-stat-left">
                  <img src="/assets/why-office.jpg" alt="Royal Den Capital consultation space" />
                  <div className="stat-float">
                    <CountUp to={95} suffix="%" />
                    <span>
                      <T k="home_approval_rate">Approval Rate</T>
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <p className="section-kicker">
                  <T k="home_why_kicker">Why Choose Royal Den Capital?</T>
                </p>
                <h2>
                  <T k="home_why_title">More lenders. Better options. Advice built around your file.</T>
                </h2>
                <p>
                  <T k="home_why_desc">
                    For more than 25 years, Royal Den Capital has helped clients compare lender options, secure
                    competitive rates, and build mortgage strategies that fit real life.
                  </T>
                </p>
                <ul className="check-list">
                  <li>
                    <T k="home_why_li1">25+ years of mortgage and lending experience</T>
                  </li>
                  <li>
                    <T k="home_why_li2">Access to a broad network of lenders, banks, and alternative options</T>
                  </li>
                  <li>
                    <T k="home_why_li3">Competitive rate shopping with terms explained clearly</T>
                  </li>
                  <li>
                    <T k="home_why_li4">Smart solutions for purchases, renewals, refinances, and complex files</T>
                  </li>
                  <li>
                    <T k="home_why_li5">One accountable team from first question to final funding</T>
                  </li>
                </ul>
                <Link href="/apply/" className="btn btn-gold">
                  <i className="bi bi-send-fill" /> <T k="common_nav_lets_talk">Let&apos;s Talk</T>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="rate-types">
          <div className="container-xl">
            <div className="section-heading text-center">
              <p className="section-kicker">
                <T k="home_ratetypes_kicker">Mortgage Interest Rates</T>
              </p>
              <h2>
                <T k="home_ratetypes_title">Choose the rate that fits your lifestyle.</T>
              </h2>
              <p>
                <T k="home_ratetypes_desc">
                  Choose stability or flexibility with fixed and variable rate options, designed to match your comfort
                  level, financial goals, and changing market conditions.
                </T>
              </p>
            </div>
            <div className="home-link-panel rate-type-links">
              <Link href="/full-service-mortgage-solution/#fixed-variable">
                <strong>
                  <T k="home_fixed_rate">Fixed Rate</T>
                </strong>
                <span>
                  <T k="home_fixed_rate_desc">Stable payments and predictable budgeting</T>
                </span>
                <i className="bi bi-arrow-right" />
              </Link>
              <Link href="/full-service-mortgage-solution/#fixed-variable">
                <strong>
                  <T k="home_variable_rate">Variable Rate</T>
                </strong>
                <span>
                  <T k="home_variable_rate_desc">Flexibility if rates move lower</T>
                </span>
                <i className="bi bi-arrow-right" />
              </Link>
            </div>
            <p className="text-center mt-4" style={{ color: "rgba(255,255,255,.7)", maxWidth: 820, marginLeft: "auto", marginRight: "auto" }}>
              <THtml
                k="home_ratetypes_footer"
                html='Not sure which fits your plans? See the full <a href="/full-service-mortgage-solution/#fixed-variable" style="color:var(--rdc-gold);font-weight:800;">fixed vs. variable comparison</a> on our Mortgage Solution page.'
              />
            </p>
          </div>
        </section>

        <section className="mortgage-services">
          <div className="container-xl">
            <div className="section-heading text-center">
              <p className="section-kicker">
                <T k="home_faq_kicker">Common Questions</T>
              </p>
              <h2>
                <T k="home_faq_title">Mortgage &amp; funding FAQs</T>
              </h2>
              <p>
                <T k="home_faq_desc">Quick answers to the questions we hear most from home buyers and business owners.</T>
              </p>
            </div>
            <FaqAccordion id="homeFaqAccordion" items={HOME_FAQ} maxWidth={920} />
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="container-xl">
            <div className="row g-5">
              <div className="col-lg-7">
                <div className="contact-form-panel">
                  <h2>
                    <T k="home_contact_title">Get in touch</T>
                  </h2>
                  <LeadForm />
                </div>
              </div>
              <div className="col-lg-5">
                <aside className="contact-card">
                  <p className="section-kicker">
                    <T k="home_contact_kicker">We&apos;re here to help</T>
                  </p>
                  <h2>
                    <T k="home_funding_closings_title">$2 Billion in Residential &amp; $2 Billion in Commercial Mortgage Closings.</T>
                  </h2>
                  <div className="contact-line">
                    <i className="bi bi-envelope-fill" />
                    <a href="mailto:info@royaldencapital.ca">info@royaldencapital.ca</a>
                  </div>
                  <div className="contact-line">
                    <i className="bi bi-telephone-fill" />
                    <a href="tel:19056091818">
                      <T k="home_phone_prefix">Phone: 905-609-1818</T>
                    </a>
                  </div>
                  <div className="contact-line">
                    <i className="bi bi-geo-alt-fill" />
                    <a
                      href="https://www.google.com/maps/place/Unit+1,+2483+Burnhamthorpe+Rd+W,+Oakville,+ON+L6M+4H1/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Unit 1, 2483 Burnhamthorpe Rd W, Oakville ON L6M 4H1
                    </a>
                  </div>
                </aside>
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
