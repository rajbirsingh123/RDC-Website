import type { Metadata } from "next";
import Link from "next/link";
import { RevealMain } from "@/components/ui/RevealMain";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { CareerForm } from "@/components/forms/CareerForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { T, THtml } from "@/lib/i18n/T";
import { absoluteUrl, breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo/site";
import type { FaqItem } from "@/data/homeFaq";

const DESCRIPTION =
  "Join Royal Den Capital in Oakville as a commission-based mortgage professional. Apply for mortgage agent and broker opportunities.";

export const metadata: Metadata = {
  title: "Careers | Royal Den Capital",
  description: DESCRIPTION,
  alternates: { canonical: absoluteUrl("/careers/") },
  openGraph: { title: "Careers | Royal Den Capital", description: DESCRIPTION, url: absoluteUrl("/careers/") },
  twitter: { title: "Careers | Royal Den Capital", description: DESCRIPTION },
};

const CAREER_FAQ: FaqItem[] = [
  {
    id: "One",
    questionKey: "cr_faq1_q",
    question: "Is this a salaried role?",
    answerKey: "cr_faq1_a",
    answer:
      "No. This is a commission-based opportunity for people who are comfortable developing business and earning through funded mortgage files.",
  },
  {
    id: "Two",
    questionKey: "cr_faq2_q",
    question: "Do I need to be licensed already?",
    answerKey: "cr_faq2_a",
    answer:
      "Licensed agents and brokers are encouraged to apply. If you are actively completing licensing, you can still introduce yourself and share your timeline.",
  },
  {
    id: "Three",
    questionKey: "cr_faq3_q",
    question: "What should I include in my application?",
    answerKey: "cr_faq3_a",
    answer:
      "Share your licensing status, mortgage or sales experience, target market, and why you want to build your career with Royal Den Capital.",
  },
];

export default function CareersPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Careers", path: "/careers/" }]),
          faqPageJsonLd([
            {
              question: "Do I need to be licensed already?",
              answer:
                "No. This is a commission-based opportunity for people who are comfortable developing business and earning through funded mortgage files.",
            },
            {
              question: "What should I include in my application?",
              answer:
                "Licensed agents and brokers are encouraged to apply. If you are actively completing licensing, you can still introduce yourself and share your timeline.",
            },
          ]),
        ]}
      />
      <RevealMain id="careers-page">
        <section className="careers-hero">
          <div className="container-xl">
            <div className="row align-items-center g-5">
              <div className="col-lg-7">
                <p className="section-kicker">
                  <T k="cr_kicker">Careers at Royal Den Capital</T>
                </p>
                <h1>
                  <T k="cr_h1">Build your mortgage career with us.</T>
                </h1>
                <p className="careers-lead">
                  <T k="cr_lead">
                    We are looking for driven mortgage professionals who want access to more lenders, stronger
                    guidance, and a commission-based opportunity with room to grow.
                  </T>
                </p>
                <div className="careers-facts">
                  <span>
                    <i className="bi bi-geo-alt-fill" /> <span><T k="cr_fact1">Oakville office</T></span>
                  </span>
                  <span>
                    <i className="bi bi-cash-stack" /> <span><T k="cr_fact2">Commission-based</T></span>
                  </span>
                  <span>
                    <i className="bi bi-bank2" /> <span><T k="cr_fact3">More lender access</T></span>
                  </span>
                </div>
                <div className="d-flex flex-wrap gap-3">
                  <a className="btn btn-gold btn-lg" href="#career-apply">
                    <T k="cr_apply_now">Apply Now</T>
                  </a>
                  <a className="btn btn-light btn-lg" href="#career-role">
                    <T k="cr_view_role">View Role</T>
                  </a>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="career-callout">
                  <h2>
                    <T k="cr_who_h2">Who fits here?</T>
                  </h2>
                  <ul>
                    <li>
                      <T k="cr_who_li1">Licensed or aspiring mortgage agents.</T>
                    </li>
                    <li>
                      <T k="cr_who_li2">Self-motivated people who can build relationships.</T>
                    </li>
                    <li>
                      <T k="cr_who_li3">Professionals who want commission upside, not a fixed salary path.</T>
                    </li>
                    <li>
                      <T k="cr_who_li4">Agents who value structure, lender access, and file support.</T>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="career-info-section">
          <div className="container-xl">
            <div className="section-heading text-center">
              <p className="section-kicker">
                <T k="cr_why_kicker">Why Join RDC</T>
              </p>
              <h2>
                <T k="cr_why_h2">A brokerage environment built for closers.</T>
              </h2>
              <p>
                <T k="cr_why_p">
                  We keep the promise simple: clear support, serious lender options, practical mentoring, and a team
                  that wants every file positioned properly.
                </T>
              </p>
            </div>
            <div className="career-benefit-list">
              <section>
                <h3>
                  <T k="cr_b1_h3">More Lender Paths</T>
                </h3>
                <p>
                  <T k="cr_b1_p">
                    Clients do not all fit the same box. You will work with a wider lending network so purchase,
                    refinance, renewal, equity, and complex files have more possible routes.
                  </T>
                </p>
              </section>
              <section>
                <h3>
                  <T k="cr_b2_h3">Commission-Based Earning Potential</T>
                </h3>
                <p>
                  <T k="cr_b2_p">
                    This is a commission-based opportunity for people who want their income tied to production,
                    relationship building, and client service.
                  </T>
                </p>
              </section>
              <section>
                <h3>
                  <T k="cr_b3_h3">Guidance from Experienced Leadership</T>
                </h3>
                <p>
                  <T k="cr_b3_p">
                    With more than 25 years of mortgage and lending experience behind the brand, agents can learn how
                    to structure files, ask better questions, and avoid common approval mistakes.
                  </T>
                </p>
              </section>
              <section>
                <h3>
                  <T k="cr_b4_h3">Oakville Team Presence</T>
                </h3>
                <p>
                  <T k="cr_b4_p">
                    Royal Den Capital operates from Oakville, giving agents a professional base for collaboration,
                    client conversations, and file support.
                  </T>
                </p>
              </section>
            </div>
          </div>
        </section>

        <section className="career-growth-section">
          <div className="container-xl">
            <div className="row align-items-center g-5">
              <div className="col-lg-6">
                <div className="career-event-gallery">
                  <figure className="career-event-main">
                    <img
                      src="/assets/rdc-growth-event-room.jpeg"
                      alt="Professional event room prepared for a Royal Den Capital sales and growth session"
                    />
                    <figcaption>
                      <T k="cr_gallery_cap1">Professional rooms for serious sales and market conversations.</T>
                    </figcaption>
                  </figure>
                  <figure className="career-event-support">
                    <img
                      src="/assets/rdc-growth-event-training.jpeg"
                      alt="Royal Den Capital training event with mortgage professionals attending a presentation"
                    />
                    <figcaption>
                      <T k="cr_gallery_cap2">
                        Live mortgage training with agents, lenders, and growth-minded professionals.
                      </T>
                    </figcaption>
                  </figure>
                  <div className="career-event-badge">
                    <strong>
                      <T k="cr_growth_room">Growth Room</T>
                    </strong>
                    <span>
                      <T k="cr_growth_tagline">Training. Sales. Network.</T>
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <p className="section-kicker">
                  <T k="cr_growth_kicker">Sales, Training &amp; Growth</T>
                </p>
                <h2>
                  <T k="cr_growth_h2">Join a team that invests in ambition.</T>
                </h2>
                <p className="career-growth-lead">
                  <T k="cr_growth_lead">
                    RDC is built for people who want more than a desk and a licence. Our environment brings agents
                    into professional rooms, real conversations, lender education, market insight, and sales
                    momentum.
                  </T>
                </p>
                <div className="career-growth-points">
                  <div>
                    <i className="bi bi-megaphone-fill" />
                    <span>
                      <T k="cr_gp1">Sharpen your sales conversations with practical mortgage training.</T>
                    </span>
                  </div>
                  <div>
                    <i className="bi bi-people-fill" />
                    <span>
                      <T k="cr_gp2">Build relationships around people who are serious about growth.</T>
                    </span>
                  </div>
                  <div>
                    <i className="bi bi-graph-up-arrow" />
                    <span>
                      <T k="cr_gp3">
                        Learn how to turn client questions into stronger files and better follow-up.
                      </T>
                    </span>
                  </div>
                </div>
                <a className="btn btn-gold btn-lg" href="#career-apply">
                  <T k="cr_growth_btn">Start Your Career Conversation</T>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="career-process-section">
          <div className="container-xl">
            <div className="row g-4 align-items-stretch">
              <div className="col-lg-4">
                <div className="career-process-intro">
                  <p className="section-kicker">
                    <T k="cr_how_kicker">How We Work</T>
                  </p>
                  <h2>
                    <T k="cr_how_h2">Support where it matters most.</T>
                  </h2>
                  <p>
                    <T k="cr_how_p">
                      RDC is built for mortgage professionals who want structure without losing the independence that
                      makes commission-based work rewarding.
                    </T>
                  </p>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="career-process-grid">
                  <article>
                    <span>01</span>
                    <h3>
                      <T k="cr_p1_h3">Client Intake</T>
                    </h3>
                    <p>
                      <T k="cr_p1_p">
                        Ask the right questions early, collect clean documents, and understand the client&apos;s
                        goal before choosing a lender path.
                      </T>
                    </p>
                  </article>
                  <article>
                    <span>02</span>
                    <h3>
                      <T k="cr_p2_h3">File Structuring</T>
                    </h3>
                    <p>
                      <T k="cr_p2_p">
                        Learn how income, credit, property type, equity, and timing affect approvals across bank,
                        alternative, and private lending options.
                      </T>
                    </p>
                  </article>
                  <article>
                    <span>03</span>
                    <h3>
                      <T k="cr_p3_h3">Lender Positioning</T>
                    </h3>
                    <p>
                      <T k="cr_p3_p">
                        Compare options, prepare stronger submissions, and communicate clearly so clients understand
                        the plan and trade-offs.
                      </T>
                    </p>
                  </article>
                  <article>
                    <span>04</span>
                    <h3>
                      <T k="cr_p4_h3">Relationship Growth</T>
                    </h3>
                    <p>
                      <T k="cr_p4_p">
                        Build a repeatable referral rhythm with clients, realtors, builders, accountants, business
                        owners, and community contacts.
                      </T>
                    </p>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="career-role-section" id="career-role">
          <div className="container-xl">
            <div className="row g-5 align-items-start">
              <div className="col-lg-5">
                <p className="section-kicker">
                  <T k="cr_role_kicker">Open Opportunity</T>
                </p>
                <h2>
                  <T k="cr_role_h2">Mortgage Agent / Broker</T>
                </h2>
                <p>
                  <T k="cr_role_p">
                    This opportunity is best for people who are comfortable with commission-based work, proactive
                    prospecting, and client-first advice.
                  </T>
                </p>
                <dl className="career-role-details">
                  <div>
                    <dt>
                      <T k="cr_dt_location">Location</T>
                    </dt>
                    <dd>
                      <T k="cr_dd_location">Oakville, Ontario</T>
                    </dd>
                  </div>
                  <div>
                    <dt>
                      <T k="cr_dt_comp">Compensation</T>
                    </dt>
                    <dd>
                      <T k="cr_dd_comp">Commission-based only</T>
                    </dd>
                  </div>
                  <div>
                    <dt>
                      <T k="cr_dt_style">Work style</T>
                    </dt>
                    <dd>
                      <T k="cr_dd_style">Relationship-driven, client-facing, performance-focused</T>
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="col-lg-7">
                <div className="career-requirements">
                  <h3>
                    <T k="cr_look_h3">What we look for</T>
                  </h3>
                  <ul>
                    <li>
                      <T k="cr_look_li1">Mortgage agent licence or active path toward licensing.</T>
                    </li>
                    <li>
                      <T k="cr_look_li2">Strong communication and follow-up habits.</T>
                    </li>
                    <li>
                      <T k="cr_look_li3">
                        Comfort discussing rates, payments, documents, timelines, and client goals.
                      </T>
                    </li>
                    <li>
                      <T k="cr_look_li4">Ability to prospect, network, and build referral relationships.</T>
                    </li>
                    <li>
                      <T k="cr_look_li5">Professional discipline with confidential client information.</T>
                    </li>
                  </ul>
                  <h3>
                    <T k="cr_workon_h3">What you can work on</T>
                  </h3>
                  <ul>
                    <li>
                      <T k="cr_wo_li1">Purchase and pre-approval files.</T>
                    </li>
                    <li>
                      <T k="cr_wo_li2">Refinances, renewals, HELOCs, and equity takeout.</T>
                    </li>
                    <li>
                      <T k="cr_wo_li3">New-to-Canada, self-employed, and alternative lending scenarios.</T>
                    </li>
                    <li>
                      <T k="cr_wo_li4">Commercial and construction opportunities as experience grows.</T>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="career-fit-section">
          <div className="container-xl">
            <div className="section-heading text-center">
              <p className="section-kicker">
                <T k="cr_std_kicker">The RDC Standard</T>
              </p>
              <h2>
                <T k="cr_std_h2">Independent work, professional expectations.</T>
              </h2>
              <p>
                <T k="cr_std_p">
                  Commission-based mortgage work rewards initiative. We look for people who follow through, protect
                  client trust, and keep files moving with care.
                </T>
              </p>
            </div>
            <div className="career-standard-grid">
              <article>
                <i className="bi bi-person-check-fill" />
                <h3>
                  <T k="cr_s1_h3">Own the Follow-Up</T>
                </h3>
                <p>
                  <T k="cr_s1_p">
                    Clients and referral partners should always know what is happening next, what is missing, and
                    when they will hear from you.
                  </T>
                </p>
              </article>
              <article>
                <i className="bi bi-file-earmark-lock2-fill" />
                <h3>
                  <T k="cr_s2_h3">Respect the File</T>
                </h3>
                <p>
                  <T k="cr_s2_p">
                    Mortgage advice depends on private financial details. We expect careful handling of documents,
                    notes, lender conditions, and client conversations.
                  </T>
                </p>
              </article>
              <article>
                <i className="bi bi-graph-up-arrow" />
                <h3>
                  <T k="cr_s3_h3">Build Your Market</T>
                </h3>
                <p>
                  <T k="cr_s3_p">
                    The strongest agents create opportunity through networking, referrals, local presence, and
                    consistent client education.
                  </T>
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="career-faq-section">
          <div className="container-xl">
            <div className="row g-5 align-items-start">
              <div className="col-lg-4">
                <p className="section-kicker">
                  <T k="cr_faq_kicker">Career Questions</T>
                </p>
                <h2>
                  <T k="cr_faq_h2">Before you apply.</T>
                </h2>
                <p>
                  <T k="cr_faq_p">Use this quick overview to decide whether the opportunity matches the way you want to work.</T>
                </p>
              </div>
              <div className="col-lg-8">
                <FaqAccordion id="careerFaq" items={CAREER_FAQ} />
              </div>
            </div>
          </div>
        </section>

        <section className="career-apply-section" id="career-apply">
          <div className="container-xl">
            <div className="career-apply-layout">
              <div>
                <p className="section-kicker">
                  <T k="cr_applyby_kicker">Apply by Email</T>
                </p>
                <h2>
                  <T k="cr_applyby_h2">Send your career interest to Royal Den Capital.</T>
                </h2>
                <p>
                  <THtml
                    k="cr_applyby_p_html"
                    html='Complete the short form and your email app will open with the application details addressed to <a href="mailto:info@royaldencapital.ca">info@royaldencapital.ca</a>.'
                  />
                </p>
              </div>
              <CareerForm />
            </div>
          </div>
        </section>
      </RevealMain>
    </>
  );
}
