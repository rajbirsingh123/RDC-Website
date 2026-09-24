import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/site";
import { MORTGAGES } from "@/data/mortgages";

const STATIC_ROUTES: Array<{ path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }> = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/full-service-mortgage-solution/", changeFrequency: "weekly", priority: 0.9 },
  { path: "/mortgage-payment-calculator/", changeFrequency: "monthly", priority: 0.8 },
  { path: "/mortgage-affordability-calculator/", changeFrequency: "monthly", priority: 0.8 },
  { path: "/mortgage-glossary/", changeFrequency: "monthly", priority: 0.7 },
  { path: "/about-us/", changeFrequency: "monthly", priority: 0.6 },
  { path: "/contact-us/", changeFrequency: "monthly", priority: 0.6 },
  { path: "/apply/", changeFrequency: "monthly", priority: 0.7 },
  { path: "/careers/", changeFrequency: "monthly", priority: 0.5 },
  { path: "/events/", changeFrequency: "monthly", priority: 0.6 },
  { path: "/events/sales-growth-academy/", changeFrequency: "yearly", priority: 0.5 },
  { path: "/privacy-policy/", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms-and-conditions/", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const mortgageEntries: MetadataRoute.Sitemap = MORTGAGES.map((mortgage) => ({
    url: `${SITE_URL}/mortgages/${mortgage.slug}/`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...mortgageEntries];
}
