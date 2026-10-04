export interface NavLink {
  href: string;
  labelKey?: string;
  fallbackLabel: string;
}

export const CALCULATOR_LINKS: NavLink[] = [
  { href: "/mortgage-payment-calculator/", labelKey: "common_calc_payment", fallbackLabel: "Mortgage Payment Calculator" },
  { href: "/mortgage-affordability-calculator/", labelKey: "common_calc_affordability", fallbackLabel: "Mortgage Affordability Calculator" },
];

export const ABOUT_LINKS: NavLink[] = [
  { href: "/careers/", labelKey: "common_nav_careers", fallbackLabel: "Careers" },
  { href: "/contact-us/", labelKey: "common_nav_contact_us", fallbackLabel: "Contact Us" },
  { href: "/mortgage-glossary/", labelKey: "common_mortgage_glossary", fallbackLabel: "Mortgage Glossary" },
  { href: "/knowledge-hub/", labelKey: "common_nav_knowledge_hub", fallbackLabel: "Knowledge Hub" },
  { href: "/about-us/#story", labelKey: "common_nav_our_story", fallbackLabel: "Our Story" },
  { href: "/about-us/#why-rdc", labelKey: "common_nav_why_rdc", fallbackLabel: "Why RD Capital" },
];

/** /mortgage-broker/<slug>/ local landing pages — shown in the footer's "Areas We Serve" list. */
export const SERVICE_AREA_LINKS: NavLink[] = [
  { href: "/mortgage-broker/oakville/", labelKey: "common_area_oakville", fallbackLabel: "Oakville" },
  { href: "/mortgage-broker/mississauga/", labelKey: "common_area_mississauga", fallbackLabel: "Mississauga" },
  { href: "/mortgage-broker/burlington/", labelKey: "common_area_burlington", fallbackLabel: "Burlington" },
  { href: "/mortgage-broker/milton/", labelKey: "common_area_milton", fallbackLabel: "Milton" },
  { href: "/mortgage-broker/brampton/", labelKey: "common_area_brampton", fallbackLabel: "Brampton" },
  { href: "/mortgage-broker/hamilton/", labelKey: "common_area_hamilton", fallbackLabel: "Hamilton" },
  { href: "/mortgage-broker/vaughan/", labelKey: "common_area_vaughan", fallbackLabel: "Vaughan" },
  { href: "/mortgage-broker/richmond-hill/", labelKey: "common_area_richmond_hill", fallbackLabel: "Richmond Hill" },
  { href: "/mortgage-broker/markham/", labelKey: "common_area_markham", fallbackLabel: "Markham" },
];
