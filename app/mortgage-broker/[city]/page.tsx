import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CityPageTemplate } from "@/components/cities/CityPageTemplate";
import { JsonLd } from "@/components/seo/JsonLd";
import { CITIES, getCityData } from "@/data/cities";
import { DEFAULT_OG_IMAGE, absoluteUrl, breadcrumbJsonLd, faqPageJsonLd, mortgageBrokerServiceJsonLd } from "@/lib/seo/site";

export function generateStaticParams() {
  return CITIES.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({ params }: { params: { city: string } }): Promise<Metadata> {
  const data = getCityData(params.city);
  if (!data) return {};
  const pageUrl = absoluteUrl(`/mortgage-broker/${data.slug}/`);
  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: { canonical: pageUrl },
    openGraph: { title: data.metaTitle, description: data.metaDescription, url: pageUrl, images: [DEFAULT_OG_IMAGE] },
    twitter: { title: data.metaTitle, description: data.metaDescription, images: [DEFAULT_OG_IMAGE] },
  };
}

export default function CityMortgageBrokerPage({ params }: { params: { city: string } }) {
  const data = getCityData(params.city);
  if (!data) notFound();

  const pageUrl = `/mortgage-broker/${data.slug}/`;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: `Mortgage Broker in ${data.name}`, path: pageUrl }]),
          mortgageBrokerServiceJsonLd(data.name),
          faqPageJsonLd(data.faq),
        ]}
      />
      <CityPageTemplate data={data} />
    </>
  );
}
