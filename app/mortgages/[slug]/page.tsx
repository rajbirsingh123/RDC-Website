import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MortgagePageTemplate } from "@/components/mortgages/MortgagePageTemplate";
import { JsonLd } from "@/components/seo/JsonLd";
import { MORTGAGES, getMortgageData } from "@/data/mortgages";
import { absoluteUrl, breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo/site";

export function generateStaticParams() {
  return MORTGAGES.map((mortgage) => ({ slug: mortgage.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const data = getMortgageData(params.slug);
  if (!data) return {};
  const pageUrl = absoluteUrl(`/mortgages/${data.slug}/`);
  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: { canonical: pageUrl },
    openGraph: { title: data.metaTitle, description: data.metaDescription, url: pageUrl },
    twitter: { title: data.metaTitle, description: data.metaDescription },
  };
}

export default function MortgagePage({ params }: { params: { slug: string } }) {
  const data = getMortgageData(params.slug);
  if (!data) notFound();

  const pageUrl = `/mortgages/${data.slug}/`;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Mortgages", path: "/full-service-mortgage-solution/" },
            { name: data.breadcrumbName, path: pageUrl },
          ]),
          faqPageJsonLd(data.faq.map((item) => ({ question: item.question, answer: item.answer }))),
        ]}
      />
      <MortgagePageTemplate data={data} />
    </>
  );
}
