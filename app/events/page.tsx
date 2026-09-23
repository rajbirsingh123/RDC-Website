import type { Metadata } from "next";
import Link from "next/link";
import { RevealMain } from "@/components/ui/RevealMain";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo/site";

const DESCRIPTION =
  "Training sessions, growth academies, and community moments from Royal Den Capital and our partners — see what's been happening and what's next.";

export const metadata: Metadata = {
  title: "Events | Royal Den Capital",
  description: DESCRIPTION,
  alternates: { canonical: absoluteUrl("/events/") },
  openGraph: {
    title: "Events | Royal Den Capital",
    description: DESCRIPTION,
    url: absoluteUrl("/events/"),
    images: [{ url: absoluteUrl("/assets/events-sales-growth-academy-og.jpg") }],
  },
  twitter: { title: "Events | Royal Den Capital", description: DESCRIPTION },
};

export default function EventsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Events", path: "/events/" }])} />
      <RevealMain id="events" className="events-page events-hub-page">
        <section className="events-hub-hero">
          <div className="events-hub-hero-slideshow" aria-hidden="true">
            <img src="/assets/rdc-growth-event-training.jpeg" alt="" loading="eager" />
            <img src="/assets/rdc-growth-event-room.jpeg" alt="" loading="eager" />
          </div>
          <div className="events-hub-hero-overlay" aria-hidden="true" />
          <div className="container-xl">
            <p className="section-kicker">Royal Den Capital</p>
            <h1>Events</h1>
            <p className="events-hub-lead">Training sessions, growth academies, and community moments from RDC and our partners.</p>
            <div className="careers-facts" aria-label="What RDC events cover">
              <span>
                <i className="bi bi-graph-up-arrow" /> Sales Training
              </span>
              <span>
                <i className="bi bi-bank" /> Lender Insight
              </span>
              <span>
                <i className="bi bi-people-fill" /> Growth Culture
              </span>
            </div>
          </div>
          <div className="hero-wave" aria-hidden="true">
            <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
              <path d="M0,32 C240,80 480,0 720,24 C960,48 1200,88 1440,40 L1440,80 L0,80 Z" fill="#f4f7fb" />
            </svg>
          </div>
        </section>

        <section className="events-hub-section">
          <div className="container-xl">
            <div className="section-heading text-center">
              <p className="section-kicker">Latest Event</p>
              <h2>The most recent gathering</h2>
            </div>

            <article className="event-featured">
              <Link className="event-featured-media" href="/events/sales-growth-academy/">
                <img
                  src="/assets/rdc-growth-event-training.jpeg"
                  alt="Mortgage professionals attending the Royal Den Capital Sales Growth Academy training session"
                  loading="lazy"
                  style={{ objectPosition: "center 64%" }}
                />
                <span className="event-featured-badge">Recap</span>
              </Link>
              <div className="event-featured-body">
                <span className="event-featured-date">
                  <i className="bi bi-calendar-event-fill" /> Aug 29, 2026 · GTA Office
                </span>
                <h3>
                  <Link href="/events/sales-growth-academy/">Sales Growth Academy</Link>
                </h3>
                <p>RDC and Cashly brought mortgage professionals together for six hours of sales training, lender insight, and growth-minded conversation.</p>
                <div className="event-featured-points">
                  <span>
                    <i className="bi bi-graph-up-arrow" /> Sales Growth Training
                  </span>
                  <span>
                    <i className="bi bi-bank" /> RDC × Cashly Partnership Address
                  </span>
                  <span>
                    <i className="bi bi-people-fill" /> Roundtable &amp; Networking
                  </span>
                </div>
                <Link className="btn btn-gold" href="/events/sales-growth-academy/">
                  View Full Recap <i className="bi bi-arrow-right" />
                </Link>
              </div>
            </article>

            <div className="event-more-teaser">
              <i className="bi bi-calendar-plus" />
              <h3>More events are coming</h3>
              <p>Want to be first in line? Drop your email below and we&apos;ll let you know the moment the next session is announced.</p>
            </div>
          </div>
        </section>

        <section className="newsletter-band" id="stay-in-loop">
          <div className="container-xl d-flex flex-wrap align-items-center justify-content-between gap-4">
            <div>
              <h2>Want to know about the next event?</h2>
              <p>Be the first to hear when RDC and our partners announce the next training session or growth academy.</p>
            </div>
            <form className="newsletter-form" action="https://formsubmit.co/info@royaldencapital.ca" method="POST">
              <input type="hidden" name="_subject" value="RDC Events - notify me next time" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />
              <input className="form-control form-control-lg" type="text" name="name" placeholder="Name" required />
              <input className="form-control form-control-lg" type="email" name="email" placeholder="Email" required />
              <button className="btn btn-gold btn-lg" type="submit">
                Notify Me
              </button>
            </form>
          </div>
        </section>
      </RevealMain>
    </>
  );
}
