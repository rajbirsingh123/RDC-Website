import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { T } from "@/lib/i18n/T";
import { DEFAULT_OG_IMAGE, absoluteUrl, breadcrumbJsonLd } from "@/lib/seo/site";

const DESCRIPTION = "Thanks for applying to Royal Den Capital -- our team will review your application and follow up.";

export const metadata: Metadata = {
  title: "Thank You | Royal Den Capital",
  description: DESCRIPTION,
  robots: { index: false, follow: true },
  alternates: { canonical: absoluteUrl("/careers/thank-you/") },
  openGraph: { title: "Thank You | Royal Den Capital", description: DESCRIPTION, url: absoluteUrl("/careers/thank-you/"), images: [DEFAULT_OG_IMAGE] },
  twitter: { title: "Thank You | Royal Den Capital", description: DESCRIPTION, images: [DEFAULT_OG_IMAGE] },
};

export default function CareersThankYouPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Careers", path: "/careers/" },
          { name: "Thank You", path: "/careers/thank-you/" },
        ])}
      />
      <main>
        <section className="apply-section">
          <div className="container-xl">
            <div className="apply-wizard text-center">
              <i className="bi bi-check-circle-fill" style={{ fontSize: 56, color: "var(--rdc-blue)" }} />
              <h1 style={{ marginTop: 18 }}>
                <T k="crty_h1">Thanks for applying.</T>
              </h1>
              <p className="apply-step-lead" style={{ marginTop: 10 }}>
                <T k="crty_lead">Your application has been sent to our team. We&apos;ll review it and follow up if there&apos;s a fit.</T>
              </p>
              <div className="d-flex flex-wrap justify-content-center gap-3" style={{ marginTop: 26 }}>
                <Link className="btn btn-gold" href="/">
                  <T k="crty_back_home">Back to Home</T>
                </Link>
                <Link className="btn btn-outline-primary" href="/careers/">
                  <T k="crty_back_careers">Back to Careers</T>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
