import Link from "next/link";
import { HeroBlueprintScene } from "@/components/mortgages/HeroBlueprintScene";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { RevealMain } from "@/components/ui/RevealMain";
import { T } from "@/lib/i18n/T";
import { MORTGAGE_NAV_ITEMS, mortgageHref, type MortgagePageData } from "@/data/mortgages";

/** Shared structure for every /mortgages/<slug>/ detail page, rendered from one MortgagePageData entry. */
export function MortgagePageTemplate({ data }: { data: MortgagePageData }) {
  const relatedItems = data.relatedSlugs
    .map((slug) => MORTGAGE_NAV_ITEMS.find((item) => item.slug === slug))
    .filter((item): item is (typeof MORTGAGE_NAV_ITEMS)[number] => Boolean(item));

  return (
    <RevealMain id="mortgage-detail-page">
      <section className="mortgage-detail-hero">
        {data.hasHeroBlueprintScene ? <HeroBlueprintScene variant="compact" /> : null}
        <div className="container-xl">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <p className="section-kicker">
                <T k={data.hero.kicker.key}>{data.hero.kicker.fallback}</T>
              </p>
              <h1>
                <T k={data.hero.h1.key}>{data.hero.h1.fallback}</T>
              </h1>
              <p className="hero-lead">
                <T k={data.hero.lead.key}>{data.hero.lead.fallback}</T>
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Link className="btn btn-gold btn-lg" href="/apply/">
                  <i className="bi bi-chat-dots-fill" />{" "}
                  <span>
                    <T k="common_nav_lets_talk">Let&apos;s Talk</T>
                  </span>
                </Link>
                <Link className="btn btn-outline-primary btn-lg" href="/mortgage-payment-calculator/">
                  <i className="bi bi-calculator-fill" />{" "}
                  <span>
                    <T k="mp_calculate_payments">Calculate Payments</T>
                  </span>
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <img className="mortgage-detail-image" src={data.hero.image.src} alt={data.hero.image.alt} loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <section className="mortgage-detail-intro">
        <div className="container-xl">
          <div className="detail-two-up">
            <article>
              <span>
                <T k="mp_is_this_for_me">Is this for me?</T>
              </span>
              <p>
                <T k={data.intro.isThisForMe.key}>{data.intro.isThisForMe.fallback}</T>
              </p>
            </article>
            <article>
              <span>
                <T k="mp_what_is_it_for">What is it for?</T>
              </span>
              <p>
                <T k={data.intro.whatIsItFor.key}>{data.intro.whatIsItFor.fallback}</T>
              </p>
            </article>
          </div>
        </div>
      </section>

      {data.featureSection ? (
        <section className="feature-section">
          <div className="container-xl">
            <div className="section-heading text-center">
              <p className="section-kicker">
                <T k={data.featureSection.kicker.key}>{data.featureSection.kicker.fallback}</T>
              </p>
              <h2>
                <T k={data.featureSection.title.key}>{data.featureSection.title.fallback}</T>
              </h2>
              <p>
                <T k={data.featureSection.intro.key}>{data.featureSection.intro.fallback}</T>
              </p>
            </div>
            <div className="feature-grid">
              {data.featureSection.cards.map((card) => (
                <article className="feature-card" key={card.heading.key}>
                  <i className={`bi ${card.icon}`} />
                  <h3>
                    <T k={card.heading.key}>{card.heading.fallback}</T>
                  </h3>
                  <p>
                    <T k={card.body.key}>{card.body.fallback}</T>
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="mortgage-detail-content">
        <div className="container-xl">
          <div className="row g-5 align-items-start">
            <div className="col-lg-5">
              <p className="section-kicker">
                <T k="mp_kicker_approach">Royal Den Approach</T>
              </p>
              <h2>
                <T k={data.approach.title.key}>{data.approach.title.fallback}</T>
              </h2>
              <p>
                <T k={data.approach.desc.key}>{data.approach.desc.fallback}</T>
              </p>
            </div>
            <div className="col-lg-7">
              <div className="mortgage-detail-grid">
                {data.approach.cards.map((card, index) => (
                  <article className="mortgage-detail-card" key={card.heading.key}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3>
                      <T k={card.heading.key}>{card.heading.fallback}</T>
                    </h3>
                    <p>
                      <T k={card.body.key}>{card.body.fallback}</T>
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mortgage-detail-cta">
        <div className="container-xl">
          <div className="detail-cta-panel">
            <div>
              <p className="section-kicker">
                <T k="mp_next_step">Next Step</T>
              </p>
              <h2>
                <T k={data.cta.h2.key}>{data.cta.h2.fallback}</T>
              </h2>
              <p>
                <T k={data.cta.p.key}>{data.cta.p.fallback}</T>
              </p>
            </div>
            <Link className="btn btn-gold btn-lg" href="/apply/">
              <T k="common_nav_lets_talk">Let&apos;s Talk</T>
            </Link>
          </div>
        </div>
      </section>

      <section className="related-mortgages">
        <div className="container-xl">
          <div className="section-heading text-center">
            <p className="section-kicker">
              <T k="mp_explore_more">Explore More</T>
            </p>
            <h2>
              <T k="mp_related_options">Related Mortgage Options</T>
            </h2>
          </div>
          <div className="related-mortgage-links">
            {relatedItems.map((item) => (
              <Link href={mortgageHref(item.slug)} key={item.slug}>
                <span>
                  <T k={item.labelKey}>{item.fallbackLabel}</T>
                </span>
                <i className="bi bi-arrow-right" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mortgage-detail-faq">
        <div className="container-xl">
          <div className="section-heading text-center">
            <p className="section-kicker">
              <T k="mp_faq_kicker">Common Questions</T>
            </p>
            <h2>
              <T k={data.faqTitle.key}>{data.faqTitle.fallback}</T>
            </h2>
          </div>
          <FaqAccordion id={data.faqAccordionId} items={data.faq} maxWidth={920} />
        </div>
      </section>
    </RevealMain>
  );
}
