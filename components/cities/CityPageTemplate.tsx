import Link from "next/link";
import { RevealMain } from "@/components/ui/RevealMain";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import type { CityPageData } from "@/data/cities";

export function CityPageTemplate({ data }: { data: CityPageData }) {
  const faqItems = data.faq.map((item, index) => ({
    id: `city-${data.slug}-faq${index + 1}`,
    questionKey: `city_${data.slug}_faq${index + 1}_q`,
    question: item.question,
    answerKey: `city_${data.slug}_faq${index + 1}_a`,
    answer: item.answer,
  }));

  return (
    <RevealMain id={`city-${data.slug}`}>
      <section className="page-hero">
        <div className="container-xl text-center">
          <p className="section-kicker">
            Mortgage Broker · {data.region}
          </p>
          <h1>Mortgage Broker in {data.name}, Ontario</h1>
          <p className="hero-lead mx-auto">{data.heroLead}</p>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center">
              <li className="breadcrumb-item">
                <Link href="/">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {data.name}
              </li>
            </ol>
          </nav>
        </div>
      </section>

      <section className="simple-page-section">
        <div className="container-xl">
          <div className="mx-auto" style={{ maxWidth: 860 }}>
            {data.intro.map((paragraph, index) => (
              <p key={index} className={index === 0 ? "lead" : undefined}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="services-section">
        <div className="container-xl">
          <div className="section-heading text-center">
            <h2>{data.market.heading}</h2>
          </div>
          <div className="mx-auto" style={{ maxWidth: 860 }}>
            {data.market.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="why-section">
        <div className="container-xl">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <p className="section-kicker">Local Support</p>
              <h2>{data.help.heading}</h2>
              <p>{data.help.intro}</p>
              <ul className="check-list">
                {data.help.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link className="btn btn-gold" href="/apply/">
                <i className="bi bi-chat-left-text-fill" /> <span>Let&apos;s Talk</span>
              </Link>
            </div>
            <div className="col-lg-6">
              <div className="contact-card" style={{ position: "static" }}>
                <p className="section-kicker">Royal Den Capital</p>
                <h2>Talk to a licensed Ontario mortgage broker</h2>
                <p>
                  Compare lender options for your {data.name} property with a brokerage licensed across Ontario
                  (Mortgage Alliance Lic. No. 10530, FSRA Mortgage Agent Lic. No. M25002134).
                </p>
                <div className="contact-line">
                  <i className="bi bi-telephone-fill" />
                  <a href="tel:19056091818">905-609-1818</a>
                </div>
                <div className="contact-line">
                  <i className="bi bi-envelope-fill" />
                  <a href="mailto:info@royaldencapital.ca">info@royaldencapital.ca</a>
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
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="simple-page-section">
        <div className="container-xl">
          <div className="section-heading text-center">
            <h2>{data.name} mortgage questions</h2>
          </div>
          <FaqAccordion id={`cityFaq-${data.slug}`} items={faqItems} maxWidth={860} />
        </div>
      </section>

      <section className="cta-section">
        <div className="container-xl text-center">
          <div className="cta-panel mx-auto">
            <h2>Ready to compare mortgage options in {data.name}?</h2>
            <p>
              Tell us about your purchase, renewal, or refinance goals and we&apos;ll compare lender options built
              around your file.
            </p>
            <Link className="btn btn-gold btn-lg" href="/apply/">
              Start Your Application
            </Link>
          </div>
        </div>
      </section>

      <section className="newsletter-band">
        <div className="container-xl d-flex flex-wrap align-items-center justify-content-between gap-4">
          <div>
            <h2>$2 Billion in Residential &amp; $2 Billion in Commercial Mortgage Closings.</h2>
            <p>Sign up for mortgage tips, rate updates, and funding insights from Royal Den Capital.</p>
          </div>
          <NewsletterForm />
        </div>
      </section>
    </RevealMain>
  );
}
