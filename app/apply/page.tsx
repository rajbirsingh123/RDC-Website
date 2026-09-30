import type { Metadata } from "next";
import { ApplyWizard } from "@/components/forms/ApplyWizard";
import { JsonLd } from "@/components/seo/JsonLd";
import { DEFAULT_OG_IMAGE, absoluteUrl, breadcrumbJsonLd } from "@/lib/seo/site";

const DESCRIPTION = "Answer a few quick questions and Royal Den Capital will follow up with financing options built around your goals.";

export const metadata: Metadata = {
  title: "Apply Now | Royal Den Capital",
  description: DESCRIPTION,
  alternates: { canonical: absoluteUrl("/apply/") },
  openGraph: { title: "Apply Now | Royal Den Capital", description: DESCRIPTION, url: absoluteUrl("/apply/"), images: [DEFAULT_OG_IMAGE] },
  twitter: { title: "Apply Now | Royal Den Capital", description: DESCRIPTION, images: [DEFAULT_OG_IMAGE] },
};

export default function ApplyPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Apply", path: "/apply/" }])} />
      <main>
        <section className="apply-section">
          <div className="container-xl">
            <ApplyWizard />
          </div>
        </section>
      </main>
    </>
  );
}
