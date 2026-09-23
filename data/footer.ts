export interface FooterLink {
  href: string;
  labelKey: string;
  fallbackLabel: string;
}

/** Full services list — used on the "full" footer variant. */
export const FOOTER_SERVICES_FULL: FooterLink[] = [
  { href: "/full-service-mortgage-solution/", labelKey: "common_nav_mortgage_services", fallbackLabel: "Mortgage Services" },
  { href: "/full-service-mortgage-solution/", labelKey: "footer_business_loans", fallbackLabel: "Business Loans" },
  { href: "/full-service-mortgage-solution/", labelKey: "footer_equity_financing", fallbackLabel: "Equity Financing" },
  { href: "/full-service-mortgage-solution/", labelKey: "footer_venture_capital", fallbackLabel: "Venture Capital" },
  { href: "/full-service-mortgage-solution/", labelKey: "footer_sba_loans", fallbackLabel: "SBA Loans" },
  { href: "/full-service-mortgage-solution/", labelKey: "home_service_home_mortgage", fallbackLabel: "Home Mortgage" },
  { href: "/full-service-mortgage-solution/", labelKey: "home_service_refinancing_equity", fallbackLabel: "Refinancing & Equity" },
  { href: "/full-service-mortgage-solution/", labelKey: "home_service_preapproval", fallbackLabel: "Mortgage Pre-Approval" },
  { href: "/full-service-mortgage-solution/", labelKey: "common_mortgage_debt_consolidation", fallbackLabel: "Debt Consolidation" },
  { href: "/mortgages/home-equity-line-credit/", labelKey: "home_service_line_of_credit", fallbackLabel: "Line of Credit" },
];

/** Short services list — used on the "short" footer variant (careers, events, all mortgage subpages). */
export const FOOTER_SERVICES_SHORT: FooterLink[] = [
  { href: "/mortgages/refinance/", labelKey: "common_mortgage_refinance", fallbackLabel: "Refinance" },
  { href: "/mortgages/renovation-finance/", labelKey: "footer_renovation_finance", fallbackLabel: "Renovation Finance" },
  { href: "/mortgages/first-home-buyers/", labelKey: "footer_first_home_buyers", fallbackLabel: "First Home Buyers" },
  { href: "/mortgages/commercial-mortgages/", labelKey: "footer_commercial_mortgages", fallbackLabel: "Commercial Mortgages" },
];

export const FOOTER_LINKS: FooterLink[] = [
  { href: "/", labelKey: "common_nav_home", fallbackLabel: "Home" },
  { href: "/events/", labelKey: "", fallbackLabel: "Events" },
  { href: "/full-service-mortgage-solution/", labelKey: "common_nav_mortgages", fallbackLabel: "Mortgage Solution" },
  { href: "/mortgage-glossary/", labelKey: "common_mortgage_glossary", fallbackLabel: "Mortgage Glossary" },
  { href: "/about-us/", labelKey: "common_nav_about_us", fallbackLabel: "About Us" },
  { href: "/contact-us/", labelKey: "common_nav_contact_us", fallbackLabel: "Contact Us" },
];
