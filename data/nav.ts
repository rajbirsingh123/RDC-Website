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
  { href: "/mortgage-glossary/", labelKey: "common_nav_knowledge_hub", fallbackLabel: "Knowledge Hub" },
  { href: "/about-us/#story", labelKey: "common_nav_our_story", fallbackLabel: "Our Story" },
  { href: "/about-us/#why-rdc", labelKey: "common_nav_why_rdc", fallbackLabel: "Why RDC" },
];
