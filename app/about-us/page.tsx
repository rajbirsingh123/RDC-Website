import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { RevealMain } from "@/components/ui/RevealMain";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { T } from "@/lib/i18n/T";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo/site";
import { AboutContactForm } from "./AboutContactForm";

const FoundingStoryAnimation = dynamic(
  () => import("@/components/about/FoundingStoryAnimation").then((mod) => mod.FoundingStoryAnimation),
  { ssr: false }
);
const FoundingStoryVideo = dynamic(
  () => import("@/components/about/FoundingStoryVideo").then((mod) => mod.FoundingStoryVideo),
  { ssr: false }
);

const DESCRIPTION =
  "Learn about Royal Den Capital, a dedicated mortgage advisory and business funding team built on trust, professionalism, and client-first service across Canada.";

export const metadata: Metadata = {
  title: "About Us | Royal Den Capital",
  description: DESCRIPTION,
  alternates: { canonical: absoluteUrl("/about-us/") },
  openGraph: { title: "About Us | Royal Den Capital", description: DESCRIPTION, url: absoluteUrl("/about-us/") },
  twitter: { title: "About Us | Royal Den Capital", description: DESCRIPTION },
};

export default function AboutUsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "About Us", path: "/about-us/" }])} />
      <FoundingStoryAnimation />
      <FoundingStoryVideo />
      <RevealMain id="about-us">
        <section className="page-hero">
          <div className="container-xl text-center">
            <h1>
              <T k="au_h1">About Us</T>
            </h1>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb justify-content-center">
                <li className="breadcrumb-item">
                  <Link href="/">
                    <T k="au_bc_home">Home</T>
                  </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  <T k="au_bc_about">About Us</T>
                </li>
              </ol>
            </nav>
          </div>
        </section>

        <section className="about-section">
          <div className="container-xl">
            <div className="row align-items-center g-5">
              <div className="col-lg-6">
                <p className="section-kicker">
                  <T k="au_who_kicker">Royal Den Capital - Who We Are</T>
                </p>
                <h2>
                  <T k="au_who_h2">We are not just a service provider, we are your growth partners.</T>
                </h2>
                <p className="lead">
                  <T k="au_goal_lead">
                    Our Goal: We guide you through every step, explain every option, and negotiate on your behalf so
                    you receive the most competitive rates and terms available.
                  </T>
                </p>
                <p>
                  <T k="au_who_p">
                    Royal Den Capital is a dedicated mortgage advisory team built on trust, professionalism, and
                    client-first service. We work with major banks, credit unions, alternative lenders, and private
                    lenders across Canada to secure the right financing for every situation, from simple residential
                    purchases to complex commercial deals.
                  </T>
                </p>
                <p>
                  <strong style={{ color: "var(--rdc-ink)" }}>
                    <T k="au_promise_strong">Our Promise to You:</T>
                  </strong>
                  <T k="au_promise_rest">
                    {" "}
                    When you work with Royal Den Capital, you&apos;re not just getting a mortgage. You&apos;re
                    getting a partner committed to your financial growth, security, and future.
                  </T>
                </p>
                <Link className="btn btn-gold" href="/apply/">
                  <i className="bi bi-chat-left-text-fill" />{" "}
                  <span>
                    <T k="common_nav_lets_talk">Let&apos;s Talk</T>
                  </span>
                </Link>
              </div>
              <div className="col-lg-6">
                <div className="image-stat">
                  <img src="/assets/about-office.jpg" alt="Royal Den Capital advisors reviewing a client's financing options" />
                  <div className="stat-float">
                    <strong>25+</strong>
                    <span>
                      <T k="au_years_exp">Years of Experience</T>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="founding-story" id="story">
          <div className="container-xl">
            <div className="founding-story-banner-wrap">
              <span className="founding-story-banner-glow" aria-hidden="true" />
              <p className="founding-story-video-title">
                <T k="au_story_h2">
                  Real wealth isn&apos;t just what you earn. It&apos;s what you build, protect, and pass forward.
                </T>
              </p>
              <div className="founding-story-banner-frame">
                <video
                  className="founding-story-banner"
                  id="crestStoryVideo"
                  title="The Story Behind Our Crest"
                  controls
                  playsInline
                  preload="metadata"
                  width={1920}
                  height={1080}
                  aria-label="The story behind the Royal Den Capital crest"
                >
                  <source src="/assets/royal-den-crest-story.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </section>

        <section className="mortgage-services">
          <div className="container-xl">
            <div className="section-heading text-center">
              <p className="section-kicker">
                <T k="au_how_kicker">How It Works?</T>
              </p>
              <h2>
                <T k="au_how_h2">Turning homeownership into a straightforward journey.</T>
              </h2>
            </div>
            <div className="mortgage-grid">
              <article className="mortgage-service-card">
                <span className="card-number">01</span>
                <h3>
                  <T k="au_step1_h3">Apply Online</T>
                </h3>
                <p>
                  <T k="au_step1_p">
                    Complete our quick and secure online application in minutes. Tell us about your goals, property,
                    and financial details so we can get started right away.
                  </T>
                </p>
              </article>
              <article className="mortgage-service-card">
                <span className="card-number">02</span>
                <h3>
                  <T k="au_step2_h3">We Structure</T>
                </h3>
                <p>
                  <T k="au_step2_p">
                    Our mortgage experts review your information and design a customized loan solution tailored to
                    your needs, comparing options and optimizing terms.
                  </T>
                </p>
              </article>
              <article className="mortgage-service-card">
                <span className="card-number">03</span>
                <h3>
                  <T k="au_step3_h3">Get Funded</T>
                </h3>
                <p>
                  <T k="au_step3_p">
                    Once approved, we finalize the paperwork and move swiftly to closing. Funds are released, and
                    you&apos;re one step closer to your goals.
                  </T>
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="services-section">
          <div className="container-xl">
            <div className="section-heading text-center">
              <p className="section-kicker">
                <T k="au_getknow_kicker">Get to know us</T>
              </p>
              <h2>
                <T k="au_getknow_h2">What we help you build.</T>
              </h2>
            </div>
            <div className="row g-4">
              <div className="col-md-6 col-xl-3">
                <article className="service-card">
                  <i className="bi bi-briefcase-fill" />
                  <h3>
                    <T k="au_sv1_h3">Business Loan Advisory</T>
                  </h3>
                  <p>
                    <T k="au_sv1_p">
                      Funding solutions for payroll, equipment, and expansion, matched to lenders who understand your
                      industry.
                    </T>
                  </p>
                </article>
              </div>
              <div className="col-md-6 col-xl-3">
                <article className="service-card">
                  <i className="bi bi-house-heart-fill" />
                  <h3>
                    <T k="au_sv2_h3">Mortgage &amp; Refinancing</T>
                  </h3>
                  <p>
                    <T k="au_sv2_p">
                      Residential and commercial mortgage advice, from first purchase to refinancing and renewal.
                    </T>
                  </p>
                </article>
              </div>
              <div className="col-md-6 col-xl-3">
                <article className="service-card">
                  <i className="bi bi-pie-chart-fill" />
                  <h3>
                    <T k="au_sv3_h3">Investment &amp; Equity Planning</T>
                  </h3>
                  <p>
                    <T k="au_sv3_p">
                      Access to equity partners and investment structures that help you grow without giving up
                      control.
                    </T>
                  </p>
                </article>
              </div>
              <div className="col-md-6 col-xl-3">
                <article className="service-card">
                  <i className="bi bi-building-fill-check" />
                  <h3>
                    <T k="au_sv4_h3">Commercial Financing</T>
                  </h3>
                  <p>
                    <T k="au_sv4_p">
                      Lending options for business premises, income properties, mixed-use files, and expansion
                      projects.
                    </T>
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="services-section" id="why-rdc">
          <div className="container-xl">
            <div className="section-heading text-center">
              <p className="section-kicker">
                <T k="au_why_kicker">Why Royal Den Capital?</T>
              </p>
              <h2>
                <T k="au_why_h2">25+ years of mortgage strength, lender access, and client-first advice.</T>
              </h2>
              <p>
                <T k="au_why_p">
                  Royal Den Capital is built for clients who want more than a quick quote. We combine experience,
                  lender relationships, sharp rate comparison, and practical guidance to help you move with
                  confidence.
                </T>
              </p>
            </div>
            <div className="why-rdc-list">
              <section>
                <span>01</span>
                <div>
                  <h3>
                    <T k="au_w1_h3">25+ Years in the Business</T>
                  </h3>
                  <p>
                    <T k="au_w1_p">
                      Experience matters when the file is simple, and it matters even more when it is not. Our team
                      brings more than 25 years of market knowledge to help clients avoid guesswork and move through
                      financing with clarity.
                    </T>
                  </p>
                  <ul>
                    <li>
                      <T k="au_w1_li1">Guidance shaped by real market cycles, not generic scripts.</T>
                    </li>
                    <li>
                      <T k="au_w1_li2">Practical advice for purchases, renewals, refinances, and complex files.</T>
                    </li>
                  </ul>
                </div>
              </section>
              <section>
                <span>02</span>
                <div>
                  <h3>
                    <T k="au_w2_h3">Access to More Lenders</T>
                  </h3>
                  <p>
                    <T k="au_w2_p">
                      One lender can only show one lane. Royal Den Capital gives clients access to a wider network of
                      banks, credit unions, monoline lenders, alternative lenders, and private options so the file
                      has more ways to work.
                    </T>
                  </p>
                  <ul>
                    <li>
                      <T k="au_w2_li1">
                        More lender paths means more chances to match the client&rsquo;s real situation.
                      </T>
                    </li>
                    <li>
                      <T k="au_w2_li2">Useful for strong bankable files and files that need creative structuring.</T>
                    </li>
                  </ul>
                </div>
              </section>
              <section>
                <span>03</span>
                <div>
                  <h3>
                    <T k="au_w3_h3">Better Rate Shopping</T>
                  </h3>
                  <p>
                    <T k="au_w3_p">
                      We compare lender options with your full situation in mind, not just the lowest number on a
                      screen. The goal is a strong rate, fair terms, manageable payments, and no surprises hidden in
                      the fine print.
                    </T>
                  </p>
                  <ul>
                    <li>
                      <T k="au_w3_li1">Rates are compared alongside penalties, privileges, fees, and flexibility.</T>
                    </li>
                    <li>
                      <T k="au_w3_li2">Clients see the trade-offs before they commit.</T>
                    </li>
                  </ul>
                </div>
              </section>
              <section>
                <span>04</span>
                <div>
                  <h3>
                    <T k="au_w4_h3">Advice Built Around You</T>
                  </h3>
                  <p>
                    <T k="au_w4_p">
                      You are not just another application. We listen to your story, your timeline, your income, your
                      property, and your long-term goals, then build a mortgage strategy that fits the way you
                      actually live and work.
                    </T>
                  </p>
                  <ul>
                    <li>
                      <T k="au_w4_li1">Every recommendation starts with the client&rsquo;s goals and comfort level.</T>
                    </li>
                    <li>
                      <T k="au_w4_li2">We explain the plan in plain language, not lender jargon.</T>
                    </li>
                  </ul>
                </div>
              </section>
              <section>
                <span>05</span>
                <div>
                  <h3>
                    <T k="au_w5_h3">Solutions for Complex Files</T>
                  </h3>
                  <p>
                    <T k="au_w5_p">
                      Self-employed income, credit challenges, investment property, construction, commercial
                      financing, refinancing, or debt consolidation all need smart structuring. We know how to
                      position the file and find the right lending path.
                    </T>
                  </p>
                  <ul>
                    <li>
                      <T k="au_w5_li1">Strong support for non-standard income and unique property scenarios.</T>
                    </li>
                    <li>
                      <T k="au_w5_li2">Clear positioning before the file reaches underwriting.</T>
                    </li>
                  </ul>
                </div>
              </section>
              <section>
                <span>06</span>
                <div>
                  <h3>
                    <T k="au_w6_h3">One Stop for Every Mortgage Need</T>
                  </h3>
                  <p>
                    <T k="au_w6_p">
                      Purchase, renewal, refinance, HELOC, equity takeout, renovation funding, newcomer programs,
                      reverse mortgages, and commercial mortgages can all be handled under one roof with one
                      accountable team.
                    </T>
                  </p>
                  <ul>
                    <li>
                      <T k="au_w6_li1">One place for mortgage planning, lender comparison, and next-step guidance.</T>
                    </li>
                    <li>
                      <T k="au_w6_li2">Less confusion, fewer handoffs, and a cleaner client experience.</T>
                    </li>
                  </ul>
                </div>
              </section>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="container-xl text-center">
            <div className="cta-panel mx-auto">
              <h2>
                <T k="au_cta_h2">Ready to Grow With Confidence?</T>
              </h2>
              <p>
                <T k="au_cta_p">
                  At Royal Den Capital, we&apos;re with you every step of the way. Discover what it means to have a
                  team that genuinely cares, and has the expertise to deliver real results.
                </T>
              </p>
              <Link className="btn btn-gold btn-lg" href="/contact-us/">
                <T k="au_cta_btn">Discover more</T>
              </Link>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="container-xl">
            <div className="row g-5">
              <div className="col-lg-7">
                <div className="contact-form-panel">
                  <h2>
                    <T k="au_contact_title">Get in touch</T>
                  </h2>
                  <AboutContactForm />
                </div>
              </div>
              <div className="col-lg-5">
                <aside className="contact-card">
                  <p className="section-kicker">
                    <T k="au_card_kicker">Royal Den Capital - a corporate service</T>
                  </p>
                  <h2>
                    <T k="au_card_h2">Let&apos;s build your future together.</T>
                  </h2>
                  <p>
                    <T k="au_card_p">
                      Whether you&apos;re buying, investing, refinancing, or developing, we&apos;re here to guide you
                      with clarity and confidence.
                    </T>
                  </p>
                  <p>
                    <strong>
                      <T k="au_mission_strong">Our Mission:</T>
                    </strong>
                    <T k="au_mission_rest">
                      {" "}
                      To empower Canadians with smart mortgage strategies that build stability, wealth, and
                      long-term success, one property at a time.
                    </T>
                  </p>
                  <div className="contact-line">
                    <i className="bi bi-envelope-fill" />
                    <a href="mailto:info@royaldencapital.ca">info@royaldencapital.ca</a>
                  </div>
                  <div className="contact-line">
                    <i className="bi bi-telephone-fill" />
                    <a href="tel:19056091818">
                      <T k="au_phone_prefix">Phone: 905-609-1818</T>
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
