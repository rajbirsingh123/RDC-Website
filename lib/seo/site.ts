export const SITE_URL = "https://royaldencapital.ca";
export const SITE_NAME = "Royal Den Capital";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/og-image.jpg`;

export const ORG_CONTACT = {
  phone: "+1-905-609-1818",
  phoneHref: "tel:19056091818",
  email: "info@royaldencapital.ca",
  license: "Lic No: M25002134, Mortgage Alliance ON Lic No. 10530",
};

export function absoluteUrl(path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${clean}`;
}

export function financialServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    telephone: ORG_CONTACT.phone,
    email: ORG_CONTACT.email,
    address: {
      "@type": "PostalAddress",
      addressCountry: "CA",
      addressRegion: "ON",
    },
    sameAs: ["https://instagram.com/royaldencapital"],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqPageJsonLd(faq: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
