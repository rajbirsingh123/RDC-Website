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

/** Cities with a dedicated /mortgage-broker/<slug>/ local landing page — also used as the
 *  sitewide areaServed list so the Organization entity names every market it serves. */
export const SERVICE_AREA_CITIES: Array<{ name: string; slug: string }> = [
  { name: "Oakville", slug: "oakville" },
  { name: "Mississauga", slug: "mississauga" },
  { name: "Burlington", slug: "burlington" },
  { name: "Milton", slug: "milton" },
  { name: "Brampton", slug: "brampton" },
  { name: "Hamilton", slug: "hamilton" },
];

export function financialServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["FinancialService", "MortgageBroker"],
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    telephone: ORG_CONTACT.phone,
    email: ORG_CONTACT.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Unit 1, 2483 Burnhamthorpe Rd W",
      addressLocality: "Oakville",
      addressRegion: "ON",
      postalCode: "L6M 4H1",
      addressCountry: "CA",
    },
    identifier: [
      {
        "@type": "PropertyValue",
        propertyID: "FSRA Mortgage Agent Licence",
        value: "M25002134",
      },
      {
        "@type": "PropertyValue",
        propertyID: "Mortgage Alliance Brokerage Licence (Ontario)",
        value: "10530",
      },
    ],
    areaServed: [
      { "@type": "State", name: "Ontario" },
      ...SERVICE_AREA_CITIES.map((city) => ({ "@type": "City", name: city.name, containedInPlace: { "@type": "State", name: "Ontario" } })),
    ],
    sameAs: [
      "https://instagram.com/royaldencapital",
      "https://www.linkedin.com/in/royal-den-capital-57753943a/",
      "https://www.mortgagealliance.com/en/",
    ],
  };
}

/** Per-city "Service" JSON-LD for a /mortgage-broker/<slug>/ landing page — points back at the
 *  single canonical Organization entity (@id #organization) rather than duplicating org data. */
export function mortgageBrokerServiceJsonLd(cityName: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Mortgage Brokerage",
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "City", name: cityName, containedInPlace: { "@type": "State", name: "Ontario" } },
    name: `Mortgage Broker in ${cityName}, Ontario`,
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
