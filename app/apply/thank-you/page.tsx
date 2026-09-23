import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { T } from "@/lib/i18n/T";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo/site";

const DESCRIPTION = "Thanks for applying to Royal Den Capital -- an advisor will follow up shortly.";

export const metadata: Metadata = {
  title: "Thank You | Royal Den Capital",
  description: DESCRIPTION,
  robots: { index: false, follow: true },
  alternates: { canonical: absoluteUrl("/apply/thank-you/") },
  openGraph: { title: "Thank You | Royal Den Capital", description: DESCRIPTION, url: absoluteUrl("/apply/thank-you/") },
  twitter: { title: "Thank You | Royal Den Capital", description: DESCRIPTION },
};

export default function ApplyThankYouPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Apply Now", path: "/apply/" },
          { name: "Thank You", path: "/apply/thank-you/" },
        ])}
      />
      <main>
        <section className="apply-section">
          <div className="container-xl">
            <div className="apply-wizard text-center">
              <i className="bi bi-check-circle-fill" style={{ fontSize: 56, color: "var(--rdc-blue)" }} />
              <h1 style={{ marginTop: 18 }}>
                <T k="ty_h1">Thanks &ndash; you&apos;re all set.</T>
              </h1>
              <p className="apply-step-lead" style={{ marginTop: 10 }}>
                <T k="ty_lead">Your information has been sent to our team. A Royal Den Capital advisor will follow up with you shortly.</T>
              </p>
              <div className="d-flex flex-wrap justify-content-center gap-3" style={{ marginTop: 26 }}>
                <Link className="btn btn-gold" href="/">
                  <T k="ty_back_home">Back to Home</T>
                </Link>
                <Link className="btn btn-outline-primary" href="/full-service-mortgage-solution/">
                  <T k="ty_explore">Explore Mortgage Options</T>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
