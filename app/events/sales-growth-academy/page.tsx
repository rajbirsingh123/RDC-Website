import type { Metadata } from "next";
import Link from "next/link";
import { EventDetailMain } from "@/components/events/EventDetailMain";
import { CountUp } from "@/components/ui/CountUp";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo/site";

const DESCRIPTION =
  "Royal Den Capital and Cashly hosted the Sales Growth Academy on August 29 at our GTA Office — sales training, lender insight, and growth-minded culture for mortgage professionals.";

export const metadata: Metadata = {
  title: "Sales Growth Academy Recap | Royal Den Capital",
  description: DESCRIPTION,
  alternates: { canonical: absoluteUrl("/events/sales-growth-academy/") },
  openGraph: {
    title: "Sales Growth Academy Recap | Royal Den Capital",
    description: DESCRIPTION,
    url: absoluteUrl("/events/sales-growth-academy/"),
    images: [{ url: absoluteUrl("/assets/events-sales-growth-academy-og.jpg") }],
  },
  twitter: { title: "Sales Growth Academy Recap | Royal Den Capital", description: DESCRIPTION },
};

const EVENT_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Sales Growth Academy",
  description:
    "Royal Den Capital partnered with Cashly to host the Sales Growth Academy, a half-day session for mortgage professionals covering sales training, lender insight, and growth-minded culture.",
  startDate: "2026-08-29T13:00:00-04:00",
  endDate: "2026-08-29T18:00:00-04:00",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  image: [absoluteUrl("/assets/events-sales-growth-academy-og.jpg")],
  location: {
    "@type": "Place",
    name: "Royal Den Capital",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Unit 1, 2483 Burnhamthorpe Rd W",
      addressLocality: "Oakville",
      addressRegion: "ON",
      postalCode: "L6M 4H1",
      addressCountry: "CA",
    },
  },
  organizer: [{ "@id": `${absoluteUrl("/")}#organization` }, { "@type": "Organization", name: "Cashly", url: "https://cashlytechservices.com" }],
};

const TIMELINE = [
  { time: "1:00 PM", h: "Doors Open & Welcome", p: "Guests checked in and settled in ahead of opening remarks from RDC and Cashly leadership." },
  { time: "Early Afternoon", h: "Sales Growth Training", p: "A hands-on session on structuring conversations, handling objections, and closing with confidence." },
  { time: "Mid-Afternoon", h: "RDC × Cashly Partnership Address", p: "Leadership from both sides spoke on where lending expertise meets modern growth tools." },
  { time: "Late Afternoon", h: "Roundtable & Networking", p: "Smaller group conversations gave attendees room to ask questions and trade notes with peers." },
  { time: "6:00 PM", h: "Closing Remarks & Next Steps", p: "The academy wrapped with a look at what's next for RDC's growth-minded community." },
];

export default function SalesGrowthAcademyPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Events", path: "/events/" },
            { name: "Sales Growth Academy", path: "/events/sales-growth-academy/" },
          ]),
          EVENT_JSON_LD,
        ]}
      />
      <EventDetailMain id="events">
        <section className="event-hero">
          <video
            className="event-hero-bg-blur"
            poster="/assets/events-sales-growth-academy-invite-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          >
            <source src="/assets/events-sales-growth-academy-invite.mp4" type="video/mp4" />
          </video>
          <video
            className="event-hero-bg"
            poster="/assets/events-sales-growth-academy-invite-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Royal Den Capital, in partnership with Cashly, presents the Sales Growth Academy"
          >
            <source src="/assets/events-sales-growth-academy-invite.mp4" type="video/mp4" />
          </video>
          <div className="event-hero-overlay" aria-hidden="true" />
          <div className="container-xl">
            <div className="event-hero-copy">
              <ol className="breadcrumb justify-content-center">
                <li className="breadcrumb-item">
                  <Link href="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link href="/events/">Events</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Sales Growth Academy
                </li>
              </ol>
              <p className="section-kicker">RDC × Cashly Present</p>
              <h1>Sales Growth Academy</h1>
              <p className="event-hero-lead">The story of one afternoon that raised the bar.</p>

              <div className="event-glass-card">
                <h2 className="event-glass-card-title">Relive the Day</h2>
                <div className="event-glass-card-row" aria-label="Sales Growth Academy highlights">
                  <span>
                    <i className="bi bi-calendar-event-fill" />
                    Aug 29 · 1–6 PM
                  </span>
                  <span className="event-glass-divider" aria-hidden="true" />
                  <span>
                    <i className="bi bi-geo-alt-fill" />
                    GTA Office
                  </span>
                  <span className="event-glass-divider" aria-hidden="true" />
                  <span>
                    <i className="bi bi-people-fill" />
                    RDC × Cashly leadership
                  </span>
                </div>
              </div>
              <span className="event-scroll-cue">
                <i className="bi bi-chevron-double-down" /> Scroll to relive the day
              </span>
            </div>
          </div>
          <div className="hero-wave" aria-hidden="true">
            <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
              <path d="M0,32 C240,80 480,0 720,24 C960,48 1200,88 1440,40 L1440,80 L0,80 Z" fill="#ffffff" />
            </svg>
          </div>
        </section>

        <section className="event-story-section">
          <div className="container-xl">
            <div className="row g-5 align-items-center">
              <div className="col-lg-7">
                <span className="event-chapter-label" data-chapter-index="1" data-chapter-name="The Why">
                  Chapter One — The Why
                </span>
                <h2>Why RDC built the Sales Growth Academy</h2>
                <p className="lead">
                  Royal Den Capital has spent more than 25 years helping mortgage professionals close with
                  confidence. Partnering with Cashly, we built a half-day academy to hand that experience straight
                  to the people doing the selling.
                </p>
                <p>
                  Cashly joined as our growth and technology partner for the day, pairing RDC&apos;s lending
                  expertise with a sharper, more modern lens on building a mortgage business — from the pitch to
                  the pipeline.
                </p>
                <div className="event-point-row" aria-label="What the academy covered">
                  <span>
                    <i className="bi bi-graph-up-arrow" /> Practical sales training
                  </span>
                  <span>
                    <i className="bi bi-bank" /> Market &amp; lender insight
                  </span>
                  <span>
                    <i className="bi bi-people-fill" /> Growth-minded team culture
                  </span>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="career-teaser-points" style={{ margin: 0 }}>
                  <span>
                    <i className="bi bi-check-circle-fill" /> Hosted at RDC&apos;s GTA Office
                  </span>
                  <span>
                    <i className="bi bi-check-circle-fill" /> Led jointly by RDC and Cashly leadership
                  </span>
                  <span>
                    <i className="bi bi-check-circle-fill" /> Built for agents who take performance seriously
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="event-gallery-section">
          <div className="container-xl">
            <div className="section-heading text-center">
              <span className="event-chapter-label" data-chapter-index="2" data-chapter-name="Inside the Room">
                Chapter Two — Inside the Room
              </span>
              <h2>Six hours, one room, a lot of momentum.</h2>
              <p>
                From the first coffee to the last handshake, the afternoon moved fast — new faces, sharper pitches,
                and conversations that kept going well past the agenda.
              </p>
            </div>
            <div className="event-photo-grid">
              <div className="event-photo-card">
                <img src="/assets/rdc-growth-event-room.jpeg" alt="Royal Den Capital event room set up for the Sales Growth Academy" loading="lazy" />
                <span className="event-photo-caption">The room fills in ahead of the RDC × Cashly welcome.</span>
              </div>
              <div className="event-photo-card">
                <img src="/assets/rdc-growth-event-training.jpeg" alt="Mortgage professionals attending Sales Growth Academy training" loading="lazy" />
                <span className="event-photo-caption">Hands-on training carried the middle stretch of the afternoon.</span>
              </div>
            </div>
          </div>
        </section>

        <section className="event-timeline-section">
          <div className="container-xl">
            <div className="section-heading text-center">
              <span className="event-chapter-label" data-chapter-index="3" data-chapter-name="How the Afternoon Unfolded">
                Chapter Three — How the Afternoon Unfolded
              </span>
              <h2>From welcome to wrap, in five moves.</h2>
            </div>
            <div className="event-timeline">
              {TIMELINE.map((item) => (
                <div className="event-timeline-item" key={item.time}>
                  <span className="event-timeline-time">{item.time}</span>
                  <h3>{item.h}</h3>
                  <p>{item.p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="event-speakers-section">
          <div className="container-xl">
            <div className="section-heading text-center">
              <span className="event-chapter-label" data-chapter-index="4" data-chapter-name="Leadership on Stage">
                Chapter Four — Leadership on Stage
              </span>
              <h2>Two teams, one message: sell with confidence.</h2>
              <p>
                Sales Growth Academy was led jointly by Royal Den Capital and Cashly leadership, pairing 25+ years
                of mortgage and lending experience with a growth and technology point of view.
              </p>
            </div>
            <div className="event-speaker-grid">
              <div className="event-speaker-card">
                <div className="event-speaker-icon">
                  <i className="bi bi-bank2" />
                </div>
                <h3>Royal Den Capital Leadership</h3>
                <p>Brought the lending playbook — how to structure files, read the market, and build a mortgage business that lasts.</p>
                <Link href="/about-us/">
                  More on RDC <i className="bi bi-arrow-right" />
                </Link>
              </div>
              <div className="event-speaker-card">
                <div className="event-speaker-icon">
                  <i className="bi bi-graph-up-arrow" />
                </div>
                <h3>Cashly Leadership</h3>
                <p>Brought the growth and technology lens — sharper tools and sharper positioning for agents building their pipeline.</p>
                <a href="https://cashlytechservices.com" target="_blank" rel="noopener noreferrer">
                  Visit Cashly <i className="bi bi-arrow-right" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="event-stats-section">
          <div className="container-xl">
            <div className="section-heading text-center">
              <span className="event-chapter-label" data-chapter-index="5" data-chapter-name="The Track Record">
                Chapter Five — The Track Record Behind the Training
              </span>
              <h2>Why the training carries weight.</h2>
              <p>Sales Growth Academy is backed by the same track record Royal Den Capital brings to every client file.</p>
            </div>
            <div className="event-stat-grid">
              <div className="event-stat-card">
                <CountUp to={25} suffix="+" />
                <span>Years of Mortgage &amp; Lending Experience</span>
              </div>
              <div className="event-stat-card">
                <strong>
                  $<CountUp to={4} suffix="B" as="span" />
                </strong>
                <span>Funded in Residential &amp; Commercial Mortgages</span>
              </div>
              <div className="event-stat-card">
                <CountUp to={95} suffix="%" />
                <span>Client Approval Rate</span>
              </div>
            </div>
          </div>
        </section>

        <section className="newsletter-band" id="stay-in-loop">
          <div className="container-xl d-flex flex-wrap align-items-center justify-content-between gap-4">
            <div>
              <h2>Want in on the next Sales Growth Academy?</h2>
              <p>Be the first to know when RDC and Cashly announce the next session — training, lender insight, and a room full of people who take growth seriously.</p>
            </div>
            <form className="newsletter-form" action="https://formsubmit.co/info@royaldencapital.ca" method="POST">
              <input type="hidden" name="_subject" value="Sales Growth Academy - notify me next time" />
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

        <section className="contact-section">
          <div className="container-xl text-center">
            <p className="section-kicker">Keep Exploring</p>
            <h2>More from Royal Den Capital</h2>
            <div className="contact-quick-links">
              <Link href="/events/">
                All Events <i className="bi bi-grid-fill" />
              </Link>
              <Link href="/careers/">
                <i className="bi bi-briefcase-fill" /> Explore Careers at RDC
              </Link>
              <Link href="/apply/">
                <i className="bi bi-chat-dots-fill" /> Let&apos;s Talk
              </Link>
              <a href="https://instagram.com/royaldencapital" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-instagram" /> More from the day on Instagram
              </a>
            </div>
          </div>
        </section>
      </EventDetailMain>
    </>
  );
}
