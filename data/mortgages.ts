import type { FaqItem } from "@/data/homeFaq";

export interface MortgageNavItem {
  slug: string;
  labelKey: string;
  fallbackLabel: string;
}

/** Canonical "Mortgage Services" dropdown order (matches the original homepage nav). */
export const MORTGAGE_NAV_ITEMS: MortgageNavItem[] = [
  { slug: "refinance", labelKey: "common_mortgage_refinance", fallbackLabel: "Refinance" },
  { slug: "equity-takeout", labelKey: "common_mortgage_equity_takeout", fallbackLabel: "Equity Takeout" },
  { slug: "renovation-finance", labelKey: "common_mortgage_finance_renovation", fallbackLabel: "Finance a Renovation" },
  { slug: "home-equity-line-credit", labelKey: "common_mortgage_equity_line", fallbackLabel: "Equity Line of Credit" },
  { slug: "first-home-buyers", labelKey: "common_mortgage_first_time_buyer", fallbackLabel: "First Time Home Buyer" },
  { slug: "debt-consolidation", labelKey: "common_mortgage_debt_consolidation", fallbackLabel: "Debt Consolidation" },
  { slug: "mortgage-renewal", labelKey: "common_mortgage_renewal", fallbackLabel: "Mortgage Renewal" },
  { slug: "reverse-mortgage", labelKey: "common_mortgage_reverse", fallbackLabel: "Reverse Mortgage" },
  { slug: "second-home", labelKey: "common_mortgage_second_home", fallbackLabel: "Second Home" },
  { slug: "new-to-canada-mortgage", labelKey: "common_mortgage_new_to_canada", fallbackLabel: "New to Canada" },
  { slug: "commercial-mortgages", labelKey: "common_mortgage_commercial", fallbackLabel: "Commercial" },
  { slug: "construction-financing", labelKey: "common_mortgage_construction_financing", fallbackLabel: "Construction Financing" },
  { slug: "purchase-improvement", labelKey: "common_mortgage_purchase_improvements", fallbackLabel: "Purchase Plus Improvements" },
  { slug: "co-equity-homeownership-ourboro", labelKey: "common_mortgage_co_equity", fallbackLabel: "Co-Equity Homeownership" },
];

export function mortgageHref(slug: string): string {
  return `/mortgages/${slug}/`;
}

/** A translatable string: an i18n key plus the English fallback text (mirrors data-i18n="key">fallback<). */
export interface I18nText {
  key: string;
  fallback: string;
}

/** One "Royal Den Approach" card (span index 01/02/03 + heading + body). */
export interface MortgageApproachCard {
  heading: I18nText;
  body: I18nText;
}

/** One card in the commercial-mortgages-only "Commercial Financing Options" feature grid. */
export interface MortgageFeatureCard {
  icon: string;
  heading: I18nText;
  body: I18nText;
}

/** Full per-page content for a /mortgages/<slug>/ detail page. */
export interface MortgagePageData {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  /** Name used for this page in the BreadcrumbList JSON-LD (not always identical to the H1). */
  breadcrumbName: string;
  hasHeroBlueprintScene: boolean;
  hero: {
    kicker: I18nText;
    h1: I18nText;
    lead: I18nText;
    image: { src: string; alt: string };
  };
  intro: {
    isThisForMe: I18nText;
    whatIsItFor: I18nText;
  };
  approach: {
    title: I18nText;
    desc: I18nText;
    cards: [MortgageApproachCard, MortgageApproachCard, MortgageApproachCard];
  };
  /** Only commercial-mortgages has this extra "Commercial Financing Options" section. */
  featureSection?: {
    kicker: I18nText;
    title: I18nText;
    intro: I18nText;
    cards: MortgageFeatureCard[];
  };
  cta: {
    h2: I18nText;
    p: I18nText;
  };
  /** Other mortgage slugs linked from the "Related Mortgage Options" section, in source order. */
  relatedSlugs: string[];
  faqTitle: I18nText;
  /** Matches the legacy accordion element id (e.g. "mrfFaqAccordion"), kept for id/anchor stability. */
  faqAccordionId: string;
  faq: FaqItem[];
}

export const MORTGAGES: MortgagePageData[] = [
  {
    slug: "refinance",
    metaTitle: "Refinance Your Mortgage | Royal Den Capital",
    metaDescription:
      "Use a new mortgage structure to access equity, consolidate debt, renovate, or improve your monthly cash flow.",
    breadcrumbName: "Refinance",
    hasHeroBlueprintScene: true,
    hero: {
      kicker: { key: "mrf_kicker", fallback: "Refinance" },
      h1: { key: "mrf_h1", fallback: "Refinance Your Mortgage" },
      lead: {
        key: "mrf_lead",
        fallback:
          "Use a new mortgage structure to access equity, consolidate debt, renovate, or improve your monthly cash flow.",
      },
      image: { src: "/assets/mortgages/refinance.jpg", alt: "Homeowner reviewing mortgage documents at a table" },
    },
    intro: {
      isThisForMe: {
        key: "mrf_is1",
        fallback:
          "You already own property and want to revisit your mortgage because your needs, debt, equity, or payment goals have changed.",
      },
      whatIsItFor: {
        key: "mrf_wf1",
        fallback:
          "Replacing or restructuring your mortgage to access usable equity, change terms, reduce high-interest debt, or fund a major goal.",
      },
    },
    approach: {
      title: {
        key: "mrf_approach_title",
        fallback: "A refinance strategy built around your numbers, not a rate chase.",
      },
      desc: {
        key: "mrf_approach_desc",
        fallback:
          "We start by reviewing your current mortgage, penalty costs, and what you're trying to solve, whether that's a lower rate, extra cash, or a shorter path to being debt-free. From there we compare lenders and lay out the real trade-offs so you can decide with confidence.",
      },
      cards: [
        {
          heading: { key: "mrf_c1h", fallback: "Use your equity with purpose" },
          body: {
            key: "mrf_c1p",
            fallback:
              "As your home value grows and your balance falls, equity can become a useful financing tool. Royal Den Capital helps you understand how much equity may be available and whether using it makes sense for your full financial picture.",
          },
        },
        {
          heading: { key: "mrf_c2h", fallback: "Compare refinance options before you break" },
          body: {
            key: "mrf_c2p",
            fallback:
              "A refinance can help, but it may involve penalties, legal costs, appraisal fees, or a new rate. We compare those costs against the benefit so you can make the decision with clear numbers.",
          },
        },
        {
          heading: { key: "mrf_c3h", fallback: "More than one lender path" },
          body: {
            key: "mrf_c3p",
            fallback:
              "Some files fit a major bank, while others are better suited to credit unions, alternative lenders, private lenders, or a short-term strategy. We help match the structure to the situation, not the other way around.",
          },
        },
      ],
    },
    cta: {
      h2: { key: "mrf_cta_h2", fallback: "Considering refinancing your mortgage?" },
      p: {
        key: "mrf_cta_p",
        fallback:
          "Let Royal Den Capital review your current mortgage, equity, debts, and goals so you can see whether refinancing is the right next move.",
      },
    },
    relatedSlugs: ["renovation-finance", "first-home-buyers", "mortgage-renewal", "second-home", "commercial-mortgages", "purchase-improvement"],
    faqTitle: { key: "mrf_faq_title", fallback: "Refinance Your Mortgage FAQs" },
    faqAccordionId: "mrfFaqAccordion",
    faq: [
      {
        id: "mrfFaq1",
        questionKey: "mrf_faq1_q",
        question: "What does it mean to refinance a mortgage?",
        answerKey: "mrf_faq1_a",
        answer:
          "Refinancing means replacing your current mortgage with a new one, usually to access equity, change your rate or term, or consolidate debt. It typically requires a new appraisal and may involve legal and discharge costs.",
      },
      {
        id: "mrfFaq2",
        questionKey: "mrf_faq2_q",
        question: "Is there a penalty to refinance before my term ends?",
        answerKey: "mrf_faq2_a",
        answer:
          "If you refinance before your current term matures, your existing lender will usually charge a prepayment penalty, calculated as the higher of three months' interest or an interest rate differential (IRD). We help weigh that cost against the benefit before you commit.",
      },
    ],
  },
  {
    slug: "equity-takeout",
    metaTitle: "Equity Takeout Mortgage | Royal Den Capital",
    metaDescription:
      "Access some of the value built into your property for renovations, investments, education, debt payouts, or other major needs.",
    breadcrumbName: "Equity Takeout",
    hasHeroBlueprintScene: false,
    hero: {
      kicker: { key: "meq_kicker", fallback: "Use Your Equity" },
      h1: { key: "meq_h1", fallback: "Equity Takeout Mortgage" },
      lead: {
        key: "meq_lead",
        fallback:
          "Access some of the value built into your property for renovations, investments, education, debt payouts, or other major needs.",
      },
      image: { src: "/assets/mortgages/equity-takeout.jpg", alt: "Financial planning with home equity and savings" },
    },
    intro: {
      isThisForMe: {
        key: "meq_is1",
        fallback: "You are a homeowner with equity and want to convert part of that equity into accessible funds.",
      },
      whatIsItFor: {
        key: "meq_wf1",
        fallback: "Borrowing against home equity through a refinance, second mortgage, HELOC, or other secured structure.",
      },
    },
    approach: {
      title: { key: "meq_approach_title", fallback: "A clear read on how much equity you can put to work." },
      desc: {
        key: "meq_approach_desc",
        fallback:
          "We review your home's current value, outstanding balance, and what you want the funds for, then map out how much equity is realistically available and which lender structure makes the most sense for your goal.",
      },
      cards: [
        {
          heading: { key: "meq_c1h", fallback: "Put equity to work" },
          body: {
            key: "meq_c1p",
            fallback:
              "As your mortgage balance drops and your property value changes, equity may be available for goals beyond the current home.",
          },
        },
        {
          heading: { key: "meq_c2h", fallback: "Choose the right access method" },
          body: {
            key: "meq_c2p",
            fallback:
              "Some clients need a lump sum. Others need flexible access over time. We compare fixed borrowing, variable options, and line-of-credit structures.",
          },
        },
        {
          heading: { key: "meq_c3h", fallback: "Look at the full financial picture" },
          body: {
            key: "meq_c3p",
            fallback:
              "Royal Den Capital reviews the purpose, cost, rate, repayment plan, and risk before recommending an equity takeout strategy.",
          },
        },
      ],
    },
    cta: {
      h2: { key: "meq_cta_h2", fallback: "Want to access extra cash from your property?" },
      p: {
        key: "meq_cta_p",
        fallback: "Let us help you decide whether an equity takeout fits your plans and cash flow.",
      },
    },
    relatedSlugs: ["refinance", "renovation-finance", "first-home-buyers", "mortgage-renewal", "second-home", "commercial-mortgages"],
    faqTitle: { key: "meq_faq_title", fallback: "Equity Takeout FAQs" },
    faqAccordionId: "meqFaqAccordion",
    faq: [
      {
        id: "meqFaq1",
        questionKey: "meq_faq1_q",
        question: "How much equity can I take out of my home?",
        answerKey: "meq_faq1_a",
        answer:
          "Most lenders allow you to borrow up to 80% of your home's appraised value, minus what you still owe. The exact amount depends on the lender, your income, credit, and the property itself.",
      },
      {
        id: "meqFaq2",
        questionKey: "meq_faq2_q",
        question: "What can equity takeout funds be used for?",
        answerKey: "meq_faq2_a",
        answer:
          "Common uses include renovations, investments, education costs, debt payout, or a down payment on another property. Because it's secured against your home, it's usually a lower-cost way to borrow than unsecured credit.",
      },
    ],
  },
  {
    slug: "renovation-finance",
    metaTitle: "Renovation Finance | Royal Den Capital",
    metaDescription:
      "Turn home equity into practical renovation funding without putting the whole project on high-interest credit.",
    breadcrumbName: "Renovation Finance",
    hasHeroBlueprintScene: false,
    hero: {
      kicker: { key: "mrn_kicker", fallback: "Renovation Finance" },
      h1: { key: "mrn_h1", fallback: "Renovation Finance" },
      lead: {
        key: "mrn_lead",
        fallback:
          "Turn home equity into practical renovation funding without putting the whole project on high-interest credit.",
      },
      image: { src: "/assets/mortgages/renovation-finance.jpg", alt: "Renovation plans and tools on a work table" },
    },
    intro: {
      isThisForMe: {
        key: "mrn_is1",
        fallback: "You own a home, have usable equity, and want to update the property while keeping repayment organized.",
      },
      whatIsItFor: {
        key: "mrn_wf1",
        fallback:
          "Funding kitchens, bathrooms, basements, additions, flooring, accessibility upgrades, or energy improvements through a mortgage-based solution.",
      },
    },
    approach: {
      title: { key: "mrn_approach_title", fallback: "Renovation funding matched to your project, not the other way around." },
      desc: {
        key: "mrn_approach_desc",
        fallback:
          "We look at your project scope, timeline, and available equity, then compare HELOCs, refinances, and purchase-plus-improvements options so the financing fits how the work will actually be paid out.",
      },
      cards: [
        {
          heading: { key: "mrn_c1h", fallback: "Renovate and roll costs into a plan" },
          body: {
            key: "mrn_c1p",
            fallback:
              "Instead of juggling credit cards, store financing, or unsecured lines of credit, renovation financing may allow funds to be included in a broader mortgage strategy.",
          },
        },
        {
          heading: { key: "mrn_c2h", fallback: "Know your project numbers first" },
          body: {
            key: "mrn_c2p",
            fallback:
              "Lenders may want quotes, scope details, timelines, and property information. We help you organize the renovation plan before submitting the file.",
          },
        },
        {
          heading: { key: "mrn_c3h", fallback: "Protect the payment you can live with" },
          body: {
            key: "mrn_c3p",
            fallback:
              "A beautiful renovation should still fit your cash flow. We compare refinance, HELOC, and second mortgage options so the funding method supports the way you live.",
          },
        },
      ],
    },
    cta: {
      h2: { key: "mrn_cta_h2", fallback: "What do your renovation plans look like?" },
      p: {
        key: "mrn_cta_p",
        fallback: "Tell us what you want to build, repair, or upgrade, and we will help you explore the cleanest way to finance it.",
      },
    },
    relatedSlugs: ["refinance", "first-home-buyers", "mortgage-renewal", "second-home", "commercial-mortgages", "purchase-improvement"],
    faqTitle: { key: "mrn_faq_title", fallback: "Renovation Finance FAQs" },
    faqAccordionId: "mrnFaqAccordion",
    faq: [
      {
        id: "mrnFaq1",
        questionKey: "mrn_faq1_q",
        question: "Can I finance a renovation without refinancing my whole mortgage?",
        answerKey: "mrn_faq1_a",
        answer:
          "Yes. Options include a HELOC, a refinance that blends your renovation costs into the mortgage, or a purchase-plus-improvements mortgage if you're buying and renovating at the same time.",
      },
      {
        id: "mrnFaq2",
        questionKey: "mrn_faq2_q",
        question: "Do lenders require quotes or plans before approving renovation funds?",
        answerKey: "mrn_faq2_a",
        answer:
          "Most lenders want contractor quotes, a project scope, and sometimes an as-improved appraisal, since funds are often released in stages tied to project progress.",
      },
    ],
  },
  {
    slug: "home-equity-line-credit",
    metaTitle: "Home Equity Line of Credit | Royal Den Capital",
    metaDescription: "Use your home equity through a flexible secured line of credit you can draw from as needed.",
    breadcrumbName: "Home Equity Line of Credit",
    hasHeroBlueprintScene: false,
    hero: {
      kicker: { key: "mhe_kicker", fallback: "HELOC" },
      h1: { key: "mhe_h1", fallback: "Home Equity Line of Credit" },
      lead: {
        key: "mhe_lead",
        fallback: "Use your home equity through a flexible secured line of credit you can draw from as needed.",
      },
      image: { src: "/assets/mortgages/home-equity-line-credit.jpg", alt: "Line of credit and home finance paperwork" },
    },
    intro: {
      isThisForMe: {
        key: "mhe_is1",
        fallback: "You own a home, have available equity, and want flexible access rather than a single lump-sum loan.",
      },
      whatIsItFor: {
        key: "mhe_wf1",
        fallback:
          "Creating a revolving secured line of credit for renovations, investments, education, debt management, emergency costs, or planned expenses.",
      },
    },
    approach: {
      title: { key: "mhe_approach_title", fallback: "A HELOC structured for flexibility, not just approval." },
      desc: {
        key: "mhe_approach_desc",
        fallback:
          "We look at your equity, how you plan to draw on it, and how it fits alongside any existing mortgage, then compare lender terms so you get a line of credit that's easy to manage rather than one that just clears underwriting.",
      },
      cards: [
        {
          heading: { key: "mhe_c1h", fallback: "When to consider a HELOC" },
          body: {
            key: "mhe_c1p",
            fallback:
              "A HELOC can be useful when you do not know exactly how much you will need or when expenses will happen over time.",
          },
        },
        {
          heading: { key: "mhe_c2h", fallback: "How it works" },
          body: {
            key: "mhe_c2p",
            fallback: "You can borrow, repay, and borrow again up to the approved limit, paying interest only on the amount you use.",
          },
        },
        {
          heading: { key: "mhe_c3h", fallback: "Flexibility with discipline" },
          body: {
            key: "mhe_c3p",
            fallback: "Because access is ongoing, the right limit, rate, and repayment plan matter. We help structure the HELOC responsibly.",
          },
        },
      ],
    },
    cta: {
      h2: { key: "mhe_cta_h2", fallback: "Could a HELOC fit your plans?" },
      p: { key: "mhe_cta_p", fallback: "Royal Den Capital can help compare HELOC options and lender requirements." },
    },
    relatedSlugs: ["refinance", "renovation-finance", "first-home-buyers", "mortgage-renewal", "second-home", "commercial-mortgages"],
    faqTitle: { key: "mhe_faq_title", fallback: "Home Equity Line of Credit FAQs" },
    faqAccordionId: "mheFaqAccordion",
    faq: [
      {
        id: "mheFaq1",
        questionKey: "mhe_faq1_q",
        question: "How is a HELOC different from a regular mortgage?",
        answerKey: "mhe_faq1_a",
        answer:
          "A HELOC is a revolving line of credit secured against your home equity. You can draw funds as needed and only pay interest on what you use, unlike a mortgage where you receive the full amount up front on a fixed repayment schedule.",
      },
      {
        id: "mheFaq2",
        questionKey: "mhe_faq2_q",
        question: "How much HELOC can I qualify for?",
        answerKey: "mhe_faq2_a",
        answer:
          "Combined with any existing mortgage balance, most lenders cap total secured borrowing at 65% to 80% of your home's appraised value, depending on the lender and structure.",
      },
    ],
  },
  {
    slug: "first-home-buyers",
    metaTitle: "First Time Home Buyers | Royal Den Capital",
    metaDescription: "Buy your first home with a clearer budget, lender strategy, and understanding of available buyer programs.",
    breadcrumbName: "First Time Home Buyers",
    hasHeroBlueprintScene: false,
    hero: {
      kicker: { key: "mfh_kicker", fallback: "First Home" },
      h1: { key: "mfh_h1", fallback: "First Time Home Buyers" },
      lead: {
        key: "mfh_lead",
        fallback: "Buy your first home with a clearer budget, lender strategy, and understanding of available buyer programs.",
      },
      image: { src: "/assets/mortgages/first-home-buyers.jpg", alt: "Family receiving keys to a first home" },
    },
    intro: {
      isThisForMe: {
        key: "mfh_is1",
        fallback: "You are preparing to buy your first property, whether you are employed, self-employed, new to Canada, or building credit.",
      },
      whatIsItFor: {
        key: "mfh_wf1",
        fallback: "Getting pre-approved, understanding down payment requirements, comparing rates, and preparing for closing costs.",
      },
    },
    approach: {
      title: { key: "mfh_approach_title", fallback: "A first-purchase plan built around what you can comfortably afford." },
      desc: {
        key: "mfh_approach_desc",
        fallback:
          "We start with your income, savings, and target neighbourhoods, then walk through affordability, available buyer programs, and pre-approval, so you're shopping with a real number in hand, not a guess.",
      },
      cards: [
        {
          heading: { key: "mfh_c1h", fallback: "Start with a real pre-approval" },
          body: {
            key: "mfh_c1p",
            fallback:
              "A strong pre-approval gives you a better sense of budget, documents, lender options, and rate holds before you make an offer.",
          },
        },
        {
          heading: { key: "mfh_c2h", fallback: "Understand the moving parts" },
          body: {
            key: "mfh_c2p",
            fallback:
              "Your income, down payment, debt levels, credit use, rate type, term, amortization, and available savings all shape what you can qualify for.",
          },
        },
        {
          heading: { key: "mfh_c3h", fallback: "Guidance from first conversation to closing" },
          body: {
            key: "mfh_c3p",
            fallback:
              "Royal Den Capital helps explain buyer incentives, land transfer tax considerations, insurance premiums, and lender conditions so your first purchase feels manageable.",
          },
        },
      ],
    },
    cta: {
      h2: { key: "mfh_cta_h2", fallback: "Ready to buy your first home?" },
      p: {
        key: "mfh_cta_p",
        fallback: "Let us help you organize your documents, understand your numbers, and move forward with confidence.",
      },
    },
    relatedSlugs: ["refinance", "renovation-finance", "mortgage-renewal", "second-home", "commercial-mortgages", "purchase-improvement"],
    faqTitle: { key: "mfh_faq_title", fallback: "First Time Home Buyers FAQs" },
    faqAccordionId: "mfhFaqAccordion",
    faq: [
      {
        id: "mfhFaq1",
        questionKey: "mfh_faq1_q",
        question: "What programs are available to first-time home buyers in Canada?",
        answerKey: "mfh_faq1_a",
        answer:
          "Options can include the Home Buyers' Plan (RRSP withdrawal), the First Home Savings Account (FHSA), and land transfer tax rebates in some provinces. Eligibility and amounts vary, so we review what applies to your situation.",
      },
      {
        id: "mfhFaq2",
        questionKey: "mfh_faq2_q",
        question: "How much do I need for a down payment on my first home?",
        answerKey: "mfh_faq2_a",
        answer:
          "The minimum is 5% on the first $500,000 of the purchase price and 10% on the portion between $500,000 and $999,999; homes at $1,000,000 or more require at least 20% down. Anything under 20% requires mortgage default insurance.",
      },
    ],
  },
  {
    slug: "debt-consolidation",
    metaTitle: "Debt Consolidation Mortgage | Royal Den Capital",
    metaDescription: "Use home equity to combine high-interest debt into one clearer payment strategy.",
    breadcrumbName: "Debt Consolidation",
    hasHeroBlueprintScene: false,
    hero: {
      kicker: { key: "mdc_kicker", fallback: "Consolidate and Save" },
      h1: { key: "mdc_h1", fallback: "Debt Consolidation Mortgage" },
      lead: { key: "mdc_lead", fallback: "Use home equity to combine high-interest debt into one clearer payment strategy." },
      image: { src: "/assets/mortgages/debt-consolidation.jpg", alt: "Debt consolidation planning and calculator" },
    },
    intro: {
      isThisForMe: {
        key: "mdc_is1",
        fallback: "You own a home, have equity, and carry high-interest credit cards, loans, or lines of credit.",
      },
      whatIsItFor: {
        key: "mdc_wf1",
        fallback: "Paying out expensive unsecured debts through a mortgage-backed structure with a more organized payment plan.",
      },
    },
    approach: {
      title: { key: "mdc_approach_title", fallback: "A consolidation plan that actually lowers your monthly cost." },
      desc: {
        key: "mdc_approach_desc",
        fallback:
          "We review your current debts, interest rates, and home equity, then model out whether rolling high-interest balances into your mortgage genuinely improves your cash flow before recommending it.",
      },
      cards: [
        {
          heading: { key: "mdc_c1h", fallback: "Good debt versus expensive debt" },
          body: {
            key: "mdc_c1p",
            fallback:
              "Mortgage-backed borrowing is secured by property and often priced differently than credit cards or unsecured loans. Consolidation may reduce interest pressure and simplify payments.",
          },
        },
        {
          heading: { key: "mdc_c2h", fallback: "One larger plan instead of many balances" },
          body: {
            key: "mdc_c2p",
            fallback: "The goal is not only to pay off debts, but to create a structure that is easier to manage and less likely to repeat the same cycle.",
          },
        },
        {
          heading: { key: "mdc_c3h", fallback: "We model the before and after" },
          body: {
            key: "mdc_c3p",
            fallback:
              "Royal Den Capital compares current payments, new mortgage costs, penalties, fees, and savings potential before recommending a consolidation strategy.",
          },
        },
      ],
    },
    cta: {
      h2: { key: "mdc_cta_h2", fallback: "Need help with debt consolidation?" },
      p: {
        key: "mdc_cta_p",
        fallback: "We can review your balances, equity, and payments to see what a responsible consolidation plan could look like.",
      },
    },
    relatedSlugs: ["refinance", "renovation-finance", "first-home-buyers", "mortgage-renewal", "second-home", "commercial-mortgages"],
    faqTitle: { key: "mdc_faq_title", fallback: "Debt Consolidation Mortgage FAQs" },
    faqAccordionId: "mdcFaqAccordion",
    faq: [
      {
        id: "mdcFaq1",
        questionKey: "mdc_faq1_q",
        question: "How does mortgage debt consolidation work?",
        answerKey: "mdc_faq1_a",
        answer:
          "You refinance your mortgage, or add a HELOC, to pay off higher-interest debts such as credit cards or loans, rolling them into one payment, usually at a lower blended interest rate than unsecured credit.",
      },
      {
        id: "mdcFaq2",
        questionKey: "mdc_faq2_q",
        question: "Will consolidating debt into my mortgage hurt my credit?",
        answerKey: "mdc_faq2_a",
        answer:
          "Paying down high-interest balances can improve your credit utilization over time. The refinance itself involves a credit check, but responsibly managed, consolidation is generally a credit-positive move long-term.",
      },
    ],
  },
  {
    slug: "mortgage-renewal",
    metaTitle: "Mortgage Renewal | Royal Den Capital",
    metaDescription: "Your renewal is more than paperwork. It is a chance to compare lenders, rates, terms, and your next financial move.",
    breadcrumbName: "Mortgage Renewal",
    hasHeroBlueprintScene: true,
    hero: {
      kicker: { key: "mmr_kicker", fallback: "Renewal" },
      h1: { key: "mmr_h1", fallback: "Mortgage Renewal" },
      lead: {
        key: "mmr_lead",
        fallback: "Your renewal is more than paperwork. It is a chance to compare lenders, rates, terms, and your next financial move.",
      },
      image: { src: "/assets/mortgages/mortgage-renewal.jpg", alt: "Mortgage renewal paperwork and pen" },
    },
    intro: {
      isThisForMe: {
        key: "mmr_is1",
        fallback: "Your mortgage term is ending soon, or you received a renewal offer and want to know whether it is competitive.",
      },
      whatIsItFor: {
        key: "mmr_wf1",
        fallback: "Extending your mortgage into a new term while exploring opportunities to improve your rate, payment, lender, or structure.",
      },
    },
    approach: {
      title: { key: "mmr_approach_title", fallback: "A renewal review that starts before your letter arrives." },
      desc: {
        key: "mmr_approach_desc",
        fallback:
          "We look at your current rate, remaining balance, and anything that's changed in your situation since you last signed, then shop your renewal across multiple lenders instead of assuming your existing one has the best offer. You get a clear comparison before you commit to anything.",
      },
      cards: [
        {
          heading: { key: "mmr_c1h", fallback: "Do not sign automatically" },
          body: {
            key: "mmr_c1p",
            fallback: "The first renewal offer is not always the best available option. We benchmark your offer against the market before you commit.",
          },
        },
        {
          heading: { key: "mmr_c2h", fallback: "Renewal can solve more than rate" },
          body: {
            key: "mmr_c2p",
            fallback: "A renewal can also be the right time to consolidate debt, adjust payment frequency, change lender type, or prepare for future borrowing.",
          },
        },
        {
          heading: { key: "mmr_c3h", fallback: "Negotiate with more leverage" },
          body: {
            key: "mmr_c3p",
            fallback: "We review your payment history, property value, remaining balance, and current goals so lenders see the full strength of your file.",
          },
        },
      ],
    },
    cta: {
      h2: { key: "mmr_cta_h2", fallback: "Renewing in the next few months?" },
      p: { key: "mmr_cta_p", fallback: "Send us your renewal offer and we will help you understand whether there is a better path." },
    },
    relatedSlugs: ["refinance", "renovation-finance", "first-home-buyers", "second-home", "commercial-mortgages", "purchase-improvement"],
    faqTitle: { key: "mmr_faq_title", fallback: "Mortgage Renewal FAQs" },
    faqAccordionId: "mmrFaqAccordion",
    faq: [
      {
        id: "mmrFaq1",
        questionKey: "mmr_faq1_q",
        question: "Do I have to renew with my current lender?",
        answerKey: "mmr_faq1_a",
        answer:
          "No. At renewal you're free to switch lenders, and can often do so without penalty since your term has matured. Comparing offers at renewal, rather than signing the first renewal letter that arrives, is usually where the savings are.",
      },
      {
        id: "mmrFaq2",
        questionKey: "mmr_faq2_q",
        question: "How far in advance should I start looking at renewal options?",
        answerKey: "mmr_faq2_a",
        answer:
          "Most lenders send a renewal offer 30 to 120 days before maturity. Starting the comparison 3 to 4 months ahead gives enough time to review rates, lock one in, and switch lenders if a better option turns up.",
      },
    ],
  },
  {
    slug: "reverse-mortgage",
    metaTitle: "Reverse Mortgage | Royal Den Capital",
    metaDescription: "A reverse mortgage may help eligible homeowners access home equity without regular monthly mortgage payments.",
    breadcrumbName: "Reverse Mortgage",
    hasHeroBlueprintScene: false,
    hero: {
      kicker: { key: "mrv_kicker", fallback: "55+ Home Equity" },
      h1: { key: "mrv_h1", fallback: "Reverse Mortgage" },
      lead: {
        key: "mrv_lead",
        fallback: "A reverse mortgage may help eligible homeowners access home equity without regular monthly mortgage payments.",
      },
      image: { src: "/assets/mortgages/reverse-mortgage.jpg", alt: "Older homeowner reviewing financial plans at home" },
    },
    intro: {
      isThisForMe: {
        key: "mrv_is1",
        fallback: "You are 55 or older, own your home, and want to explore equity as a source of retirement cash flow.",
      },
      whatIsItFor: {
        key: "mrv_wf1",
        fallback:
          "Accessing a portion of home equity while staying in the home, with repayment typically deferred until sale, move-out, or estate settlement.",
      },
    },
    approach: {
      title: { key: "mrv_approach_title", fallback: "A reverse mortgage explained in plain terms, not fine print." },
      desc: {
        key: "mrv_approach_desc",
        fallback:
          "We walk through your age, home value, and goals, then explain exactly how much you may qualify for, how interest accrues, and what it means for your estate, so you can decide with the full picture, not just a headline number.",
      },
      cards: [
        {
          heading: { key: "mrv_c1h", fallback: "How reverse mortgages work" },
          body: {
            key: "mrv_c1p",
            fallback: "A reverse mortgage is based primarily on home equity and age. Unlike a traditional mortgage, there are usually no required monthly payments.",
          },
        },
        {
          heading: { key: "mrv_c2h", fallback: "Understand the trade-offs" },
          body: {
            key: "mrv_c2p",
            fallback: "Interest accrues over time and the loan can reduce estate equity. Loan-to-value limits and property details affect how much may be available.",
          },
        },
        {
          heading: { key: "mrv_c3h", fallback: "Advice before action" },
          body: {
            key: "mrv_c3p",
            fallback: "Royal Den Capital helps compare reverse mortgages with alternatives like downsizing, HELOCs, refinance options, or family planning discussions.",
          },
        },
      ],
    },
    cta: {
      h2: { key: "mrv_cta_h2", fallback: "Interested in learning more about reverse mortgages?" },
      p: { key: "mrv_cta_p", fallback: "We can help you understand whether this option fits your retirement and estate goals." },
    },
    relatedSlugs: ["refinance", "renovation-finance", "first-home-buyers", "mortgage-renewal", "second-home", "commercial-mortgages"],
    faqTitle: { key: "mrv_faq_title", fallback: "Reverse Mortgage FAQs" },
    faqAccordionId: "mrvFaqAccordion",
    faq: [
      {
        id: "mrvFaq1",
        questionKey: "mrv_faq1_q",
        question: "Who is eligible for a reverse mortgage?",
        answerKey: "mrv_faq1_a",
        answer:
          "In Canada, reverse mortgages are generally available to homeowners aged 55 and older, based on age, home value, and location. No regular mortgage payments are required while you live in the home.",
      },
      {
        id: "mrvFaq2",
        questionKey: "mrv_faq2_q",
        question: "Does a reverse mortgage mean I no longer own my home?",
        answerKey: "mrv_faq2_a",
        answer: "No. You keep title to your home. The loan, plus accumulated interest, is repaid when you sell, move out, or the last borrower passes away.",
      },
    ],
  },
  {
    slug: "second-home",
    metaTitle: "Second Home Financing | Royal Den Capital",
    metaDescription: "Explore financing for a cottage, condo, family property, rental, or next home with a structure that fits your equity and income.",
    breadcrumbName: "Second Home Financing",
    hasHeroBlueprintScene: false,
    hero: {
      kicker: { key: "msh_kicker", fallback: "Second Home" },
      h1: { key: "msh_h1", fallback: "Second Home Financing" },
      lead: {
        key: "msh_lead",
        fallback: "Explore financing for a cottage, condo, family property, rental, or next home with a structure that fits your equity and income.",
      },
      image: { src: "/assets/mortgages/second-home.jpg", alt: "Second home exterior with front porch" },
    },
    intro: {
      isThisForMe: {
        key: "msh_is1",
        fallback: "You own or are buying property and want to finance another home for personal use, family use, or investment.",
      },
      whatIsItFor: {
        key: "msh_wf1",
        fallback: "Purchasing a second property using savings, equity from your current home, rental income, or a new mortgage strategy.",
      },
    },
    approach: {
      title: { key: "msh_approach_title", fallback: "Financing that accounts for how the property will actually be used." },
      desc: {
        key: "msh_approach_desc",
        fallback:
          "We review whether the property is a part-time residence, rental, or investment, then compare lender rules and down payment requirements so the mortgage is structured correctly from the start.",
      },
      cards: [
        {
          heading: { key: "msh_c1h", fallback: "A home away from home" },
          body: {
            key: "msh_c1p",
            fallback: "A second home can support family needs, lifestyle goals, student housing, retirement plans, or long-term wealth building.",
          },
        },
        {
          heading: { key: "msh_c2h", fallback: "Several funding routes" },
          body: {
            key: "msh_c2p",
            fallback: "You may use cash savings, refinance existing equity, arrange a HELOC, or qualify for a separate mortgage on the new property.",
          },
        },
        {
          heading: { key: "msh_c3h", fallback: "Plan for lender expectations" },
          body: {
            key: "msh_c3p",
            fallback: "Down payment, property type, occupancy, rental income, and total debt all matter. We help identify lenders that understand your intended use.",
          },
        },
      ],
    },
    cta: {
      h2: { key: "msh_cta_h2", fallback: "Thinking about a second property?" },
      p: { key: "msh_cta_p", fallback: "Royal Den Capital can help compare the financing options before you make the next move." },
    },
    relatedSlugs: ["refinance", "renovation-finance", "first-home-buyers", "mortgage-renewal", "commercial-mortgages", "purchase-improvement"],
    faqTitle: { key: "msh_faq_title", fallback: "Second Home Financing FAQs" },
    faqAccordionId: "mshFaqAccordion",
    faq: [
      {
        id: "mshFaq1",
        questionKey: "msh_faq1_q",
        question: "Do I need a bigger down payment for a second home?",
        answerKey: "msh_faq1_a",
        answer:
          "It depends on how the property is used. A second home you'll occupy part-time can sometimes qualify like an owner-occupied property, while a purely rental or investment property usually requires a larger down payment, often 20% or more.",
      },
      {
        id: "mshFaq2",
        questionKey: "msh_faq2_q",
        question: "Can I use equity from my primary home to buy a second property?",
        answerKey: "msh_faq2_a",
        answer: "Yes, many buyers use a refinance or HELOC on their primary residence to fund the down payment on a second home or rental property.",
      },
    ],
  },
  {
    slug: "new-to-canada-mortgage",
    metaTitle: "New to Canada Mortgage | Royal Den Capital",
    metaDescription: "Build a home-buying plan in Canada even if your Canadian credit history is still new.",
    breadcrumbName: "New to Canada Mortgage",
    hasHeroBlueprintScene: false,
    hero: {
      kicker: { key: "mnc_kicker", fallback: "Newcomer Financing" },
      h1: { key: "mnc_h1", fallback: "New to Canada Mortgage" },
      lead: { key: "mnc_lead", fallback: "Build a home-buying plan in Canada even if your Canadian credit history is still new." },
      image: { src: "/assets/mortgages/new-to-canada-mortgage.jpg", alt: "Newcomer family planning finances in Canada" },
    },
    intro: {
      isThisForMe: {
        key: "mnc_is1",
        fallback: "You recently moved to Canada and want to buy a home with limited Canadian credit history or newer employment documentation.",
      },
      whatIsItFor: {
        key: "mnc_wf1",
        fallback:
          "Finding lenders that understand newcomer income, savings, international references, work permits, permanent residency, and alternative documentation.",
      },
    },
    approach: {
      title: { key: "mnc_approach_title", fallback: "A mortgage path built for a shorter Canadian credit history." },
      desc: {
        key: "mnc_approach_desc",
        fallback:
          "We look at your employment, foreign credit history, and down payment, then match you with lenders who work with newcomer files, so a limited Canadian credit history doesn't automatically limit your options.",
      },
      cards: [
        {
          heading: { key: "mnc_c1h", fallback: "Starting fresh does not mean starting from zero" },
          body: {
            key: "mnc_c1p",
            fallback: "Some lenders have newcomer programs that can consider international credit, bank statements, employment letters, and strong down payment history.",
          },
        },
        {
          heading: { key: "mnc_c2h", fallback: "Prepare the right documents" },
          body: {
            key: "mnc_c2p",
            fallback: "We help you organize ID, income, immigration status, down payment proof, credit references, and property details before the lender review.",
          },
        },
        {
          heading: { key: "mnc_c3h", fallback: "Choose a lender that understands your file" },
          body: {
            key: "mnc_c3p",
            fallback: "Royal Den Capital compares traditional and alternative options so your application is positioned properly from the start.",
          },
        },
      ],
    },
    cta: {
      h2: { key: "mnc_cta_h2", fallback: "New to Canada and ready to buy?" },
      p: { key: "mnc_cta_p", fallback: "Let us help you understand what lenders need and how to prepare for approval." },
    },
    relatedSlugs: ["refinance", "renovation-finance", "first-home-buyers", "mortgage-renewal", "second-home", "commercial-mortgages"],
    faqTitle: { key: "mnc_faq_title", fallback: "New to Canada Mortgage FAQs" },
    faqAccordionId: "mncFaqAccordion",
    faq: [
      {
        id: "mncFaq1",
        questionKey: "mnc_faq1_q",
        question: "Can I get a mortgage in Canada with no Canadian credit history?",
        answerKey: "mnc_faq1_a",
        answer:
          "Yes. Several lenders offer newcomer programs that consider foreign credit history, employment letters, and larger down payments in place of a long Canadian credit file.",
      },
      {
        id: "mncFaq2",
        questionKey: "mnc_faq2_q",
        question: "How much down payment do newcomers typically need?",
        answerKey: "mnc_faq2_a",
        answer:
          "It depends on residency status and credit history. Some newcomer programs allow as little as 5% to 10% down, while limited credit history may require 20% or more with certain lenders.",
      },
    ],
  },
  {
    slug: "commercial-mortgages",
    metaTitle: "Commercial Mortgages | Royal Den Capital",
    metaDescription: "Finance a property for business use, investment, expansion, or income generation with commercial lending guidance.",
    breadcrumbName: "Commercial Mortgages",
    hasHeroBlueprintScene: false,
    hero: {
      kicker: { key: "mcm_kicker", fallback: "Commercial Lending" },
      h1: { key: "mcm_h1", fallback: "Commercial Mortgages" },
      lead: {
        key: "mcm_lead",
        fallback: "Finance a property for business use, investment, expansion, or income generation with commercial lending guidance.",
      },
      image: { src: "/assets/mortgages/commercial-mortgages.jpg", alt: "Commercial office building exterior" },
    },
    intro: {
      isThisForMe: {
        key: "mcm_is1",
        fallback: "You are buying, refinancing, or expanding through commercial real estate in Canada.",
      },
      whatIsItFor: {
        key: "mcm_wf1",
        fallback: "Financing office, retail, industrial, mixed-use, multi-unit, hospitality, care, or other income-producing properties.",
      },
    },
    featureSection: {
      kicker: { key: "mcm_sol_kicker", fallback: "Commercial Financing Options" },
      title: { key: "mcm_sol_title", fallback: "Commercial lending solutions we arrange" },
      intro: {
        key: "mcm_sol_intro",
        fallback: "From everyday cash flow to long-term real estate, we help match the right financing to each stage of your business.",
      },
      cards: [
        {
          icon: "bi-cash-coin",
          heading: { key: "mcm_sol1_h", fallback: "Commercial Operating Lines" },
          body: {
            key: "mcm_sol1_p",
            fallback:
              "A revolving line of credit that flexes with your business cycle — draw funds to cover payroll, inventory, or payables, then repay as receivables come in. Because it's demand-based rather than fixed-term, it's built for ongoing cash flow, not a one-time purchase.",
          },
        },
        {
          icon: "bi-tools",
          heading: { key: "mcm_sol2_h", fallback: "Equipment Lease Lines" },
          body: {
            key: "mcm_sol2_p",
            fallback:
              "Bank-offered capital lease financing that spreads the cost of vehicles, machinery, or technology over the life of the asset instead of one upfront payment. This keeps working capital free for operations while you build equity in equipment you'll eventually own.",
          },
        },
        {
          icon: "bi-building",
          heading: { key: "mcm_sol3_h", fallback: "Commercial Mortgages" },
          body: {
            key: "mcm_sol3_p",
            fallback:
              "Purpose-built financing for income-producing investment properties such as retail, office, industrial, or multi-unit buildings. Loan size and terms are shaped by the property's net operating income, lease agreements, and debt service coverage, not just personal credit.",
          },
        },
        {
          icon: "bi-shop",
          heading: { key: "mcm_sol4_h", fallback: "Commercial Term Loans" },
          body: {
            key: "mcm_sol4_p",
            fallback:
              "Fixed-term financing for businesses purchasing or refinancing the premises they operate from — clinics, retail stores, warehouses, and similar owner-occupied properties. Structured around the business's financials and the property's value, it supports long-term stability over short-term needs.",
          },
        },
      ],
    },
    approach: {
      title: { key: "mcm_approach_title", fallback: "Commercial financing built around your property's numbers." },
      desc: {
        key: "mcm_approach_desc",
        fallback:
          "We review the property's income potential, your business financials, and your goals, then compare commercial lenders so the structure, term, and rate match how the property performs, not a standard residential template.",
      },
      cards: [
        {
          heading: { key: "mcm_c1h", fallback: "Commercial lending is different" },
          body: {
            key: "mcm_c1p",
            fallback:
              "Commercial mortgages are shaped by property type, business financials, net operating income, leases, debt service coverage, and the lender’s appetite.",
          },
        },
        {
          heading: { key: "mcm_c2h", fallback: "Structure matters" },
          body: {
            key: "mcm_c2p",
            fallback: "The right commercial loan should support cash flow, reduce friction, and fit the long-term business plan rather than simply closing the transaction.",
          },
        },
        {
          heading: { key: "mcm_c3h", fallback: "Access experienced lender matching" },
          body: {
            key: "mcm_c3p",
            fallback: "Royal Den Capital helps package the file, compare lender niches, and negotiate terms with the bigger investment picture in mind.",
          },
        },
      ],
    },
    cta: {
      h2: { key: "mcm_cta_h2", fallback: "Need commercial lending advice?" },
      p: { key: "mcm_cta_p", fallback: "Talk to Royal Den Capital about your property, business model, and financing goals." },
    },
    relatedSlugs: ["refinance", "renovation-finance", "first-home-buyers", "mortgage-renewal", "second-home", "purchase-improvement"],
    faqTitle: { key: "mcm_faq_title", fallback: "Commercial Mortgages FAQs" },
    faqAccordionId: "mcmFaqAccordion",
    faq: [
      {
        id: "mcmFaq1",
        questionKey: "mcm_faq1_q",
        question: "What can a commercial mortgage be used for?",
        answerKey: "mcm_faq1_a",
        answer:
          "Common uses include purchasing an owner-occupied business property, an investment or income-generating building, or refinancing existing commercial real estate.",
      },
      {
        id: "mcmFaq2",
        questionKey: "mcm_faq2_q",
        question: "How is a commercial mortgage different from a residential one?",
        answerKey: "mcm_faq2_a",
        answer:
          "Commercial mortgages are typically assessed on the property's income potential and the business's financials, not just personal credit, and often come with shorter terms, larger down payments, and more varied rate structures than residential mortgages.",
      },
    ],
  },
  {
    slug: "construction-financing",
    metaTitle: "Construction Financing | Royal Den Capital",
    metaDescription: "Finance a new build, major rebuild, or custom construction project with staged advances as the work progresses.",
    breadcrumbName: "Construction Financing",
    hasHeroBlueprintScene: true,
    hero: {
      kicker: { key: "mcf_kicker", fallback: "Build From the Ground Up" },
      h1: { key: "mcf_h1", fallback: "Construction Financing" },
      lead: {
        key: "mcf_lead",
        fallback: "Finance a new build, major rebuild, or custom construction project with staged advances as the work progresses.",
      },
      image: { src: "/assets/mortgages/construction-financing.jpg", alt: "Residential construction site framing a new home" },
    },
    intro: {
      isThisForMe: {
        key: "mcf_is1",
        fallback: "You are building on land, replacing an existing home, or completing a major construction project.",
      },
      whatIsItFor: {
        key: "mcf_wf1",
        fallback: "Funding construction through staged draws tied to progress, inspections, appraisals, and lender-approved budgets.",
      },
    },
    approach: {
      title: { key: "mcf_approach_title", fallback: "Staged financing that matches how your build actually progresses." },
      desc: {
        key: "mcf_approach_desc",
        fallback:
          "We review your plans, contract, and draw schedule, then structure a construction mortgage so funds are released as milestones are met, with a clear path to your permanent mortgage once the build is complete.",
      },
      cards: [
        {
          heading: { key: "mcf_c1h", fallback: "Construction financing is staged" },
          body: {
            key: "mcf_c1p",
            fallback: "Unlike a regular mortgage, funds are usually released in draws as the project reaches lender-approved milestones.",
          },
        },
        {
          heading: { key: "mcf_c2h", fallback: "Plan before you build" },
          body: {
            key: "mcf_c2p",
            fallback: "Budgets, permits, land details, contracts, timelines, and contingency planning all affect approval and draw timing.",
          },
        },
        {
          heading: { key: "mcf_c3h", fallback: "Guidance through complexity" },
          body: {
            key: "mcf_c3p",
            fallback:
              "Royal Den Capital helps you understand lender requirements, documentation, draw schedules, and how the construction loan transitions once the project is complete.",
          },
        },
      ],
    },
    cta: {
      h2: { key: "mcf_cta_h2", fallback: "Planning a build or major rebuild?" },
      p: { key: "mcf_cta_p", fallback: "Talk to us before construction starts so the financing plan matches the project plan." },
    },
    relatedSlugs: ["refinance", "renovation-finance", "first-home-buyers", "mortgage-renewal", "second-home", "commercial-mortgages"],
    faqTitle: { key: "mcf_faq_title", fallback: "Construction Financing FAQs" },
    faqAccordionId: "mcfFaqAccordion",
    faq: [
      {
        id: "mcfFaq1",
        questionKey: "mcf_faq1_q",
        question: "How is construction financing different from a regular mortgage?",
        answerKey: "mcf_faq1_a",
        answer:
          "Construction financing releases funds in staged advances as the build progresses, rather than one lump sum, and interest is usually charged only on the amount drawn until the home is complete and the mortgage converts.",
      },
      {
        id: "mcfFaq2",
        questionKey: "mcf_faq2_q",
        question: "What do I need to qualify for construction financing?",
        answerKey: "mcf_faq2_a",
        answer: "Lenders typically want building plans, a fixed-price contract or cost breakdown, permits, and confirmation of land ownership before approving staged draws.",
      },
    ],
  },
  {
    slug: "purchase-improvement",
    metaTitle: "Purchase Plus Improvements | Royal Den Capital",
    metaDescription: "Buy a property that needs work and include planned improvements in one coordinated mortgage strategy.",
    breadcrumbName: "Purchase Plus Improvements",
    hasHeroBlueprintScene: false,
    hero: {
      kicker: { key: "mpi_kicker", fallback: "Buy and Improve" },
      h1: { key: "mpi_h1", fallback: "Purchase Plus Improvements" },
      lead: { key: "mpi_lead", fallback: "Buy a property that needs work and include planned improvements in one coordinated mortgage strategy." },
      image: { src: "/assets/mortgages/purchase-improvement.jpg", alt: "Home improvement plans and measuring tape" },
    },
    intro: {
      isThisForMe: {
        key: "mpi_is1",
        fallback: "You want to purchase a home and complete renovations soon after closing.",
      },
      whatIsItFor: {
        key: "mpi_wf1",
        fallback: "Combining a property purchase and eligible renovation funds into one lender-approved plan.",
      },
    },
    approach: {
      title: { key: "mpi_approach_title", fallback: "One mortgage for the purchase and the improvements you already have planned." },
      desc: {
        key: "mpi_approach_desc",
        fallback:
          "We review the property, your renovation scope, and contractor estimates, then structure a purchase-plus-improvements mortgage so the funds release in step with the work instead of leaving you to finance it separately.",
      },
      cards: [
        {
          heading: { key: "mpi_c1h", fallback: "Buy with a vision" },
          body: {
            key: "mpi_c1p",
            fallback: "The best property may need updates before it becomes the right home. Purchase plus improvement financing can help bridge that gap.",
          },
        },
        {
          heading: { key: "mpi_c2h", fallback: "Quotes and scope are important" },
          body: {
            key: "mpi_c2p",
            fallback: "Lenders typically need contractor quotes and a clear outline of the work before approving improvement funds.",
          },
        },
        {
          heading: { key: "mpi_c3h", fallback: "One plan, one direction" },
          body: {
            key: "mpi_c3p",
            fallback: "We coordinate the mortgage and improvement request together so you are not trying to solve the renovation after closing.",
          },
        },
      ],
    },
    cta: {
      h2: { key: "mpi_cta_h2", fallback: "Have a purchase and improvement plan?" },
      p: {
        key: "mpi_cta_p",
        fallback: "Share the property and renovation scope with us, and we will help you understand what financing may be available.",
      },
    },
    relatedSlugs: ["refinance", "renovation-finance", "first-home-buyers", "mortgage-renewal", "second-home", "commercial-mortgages"],
    faqTitle: { key: "mpi_faq_title", fallback: "Purchase Plus Improvements FAQs" },
    faqAccordionId: "mpiFaqAccordion",
    faq: [
      {
        id: "mpiFaq1",
        questionKey: "mpi_faq1_q",
        question: "What is a purchase plus improvements mortgage?",
        answerKey: "mpi_faq1_a",
        answer:
          "It lets you roll the cost of planned renovations into your purchase mortgage, so you can buy a property that needs work and fund the improvements at the same closing rather than through a separate loan afterward.",
      },
      {
        id: "mpiFaq2",
        questionKey: "mpi_faq2_q",
        question: "How much extra can I borrow for improvements?",
        answerKey: "mpi_faq2_a",
        answer:
          "Most lenders cap improvement funds at around 10% to 20% of the property's as-improved value, and funds are typically released after the work is completed and inspected.",
      },
    ],
  },
  {
    slug: "co-equity-homeownership-ourboro",
    metaTitle: "Co-Equity Homeownership | Royal Den Capital",
    metaDescription: "Explore co-equity pathways that may help qualified buyers enter the market sooner with aligned ownership support.",
    breadcrumbName: "Co-Equity Homeownership",
    hasHeroBlueprintScene: false,
    hero: {
      kicker: { key: "mce_kicker", fallback: "Shared Equity" },
      h1: { key: "mce_h1", fallback: "Co-Equity Homeownership" },
      lead: {
        key: "mce_lead",
        fallback: "Explore co-equity pathways that may help qualified buyers enter the market sooner with aligned ownership support.",
      },
      image: { src: "/assets/mortgages/co-equity-homeownership-ourboro.jpg", alt: "Modern home exterior representing shared ownership" },
    },
    intro: {
      isThisForMe: {
        key: "mce_is1",
        fallback: "You can afford ongoing ownership costs but may need support with the down payment or equity contribution to buy the right home.",
      },
      whatIsItFor: {
        key: "mce_wf1",
        fallback: "Using a shared-equity model where a partner contributes capital and participates in future value changes according to the agreement.",
      },
    },
    approach: {
      title: { key: "mce_approach_title", fallback: "A co-equity path that can lower what you need to qualify today." },
      desc: {
        key: "mce_approach_desc",
        fallback:
          "We review your down payment gap and long-term plans, then explain how a co-equity partner's contribution affects your mortgage size, monthly payment, and what's owed when you sell or refinance.",
      },
      cards: [
        {
          heading: { key: "mce_c1h", fallback: "A different path into ownership" },
          body: {
            key: "mce_c1p",
            fallback: "Co-equity can help some buyers purchase sooner by sharing part of the ownership economics with an aligned capital partner.",
          },
        },
        {
          heading: { key: "mce_c2h", fallback: "Know how the split works" },
          body: {
            key: "mce_c2p",
            fallback: "Equity shares, buyout rights, sale timelines, maintenance expectations, and future appreciation should be understood before signing.",
          },
        },
        {
          heading: { key: "mce_c3h", fallback: "Mortgage advice still matters" },
          body: {
            key: "mce_c3p",
            fallback: "Royal Den Capital helps you compare the mortgage side of the transaction so the shared-equity structure works with lender requirements.",
          },
        },
      ],
    },
    cta: {
      h2: { key: "mce_cta_h2", fallback: "Curious about co-equity homeownership?" },
      p: { key: "mce_cta_p", fallback: "We can help you understand how shared-equity financing may fit into your home-buying plan." },
    },
    relatedSlugs: ["refinance", "renovation-finance", "first-home-buyers", "mortgage-renewal", "second-home", "commercial-mortgages"],
    faqTitle: { key: "mce_faq_title", fallback: "Co-Equity Homeownership FAQs" },
    faqAccordionId: "mceFaqAccordion",
    faq: [
      {
        id: "mceFaq1",
        questionKey: "mce_faq1_q",
        question: "How does co-equity homeownership work?",
        answerKey: "mce_faq1_a",
        answer:
          "A co-equity partner contributes a portion of your down payment or purchase price in exchange for a share of the property's future value, which can reduce the mortgage you need to qualify for today.",
      },
      {
        id: "mceFaq2",
        questionKey: "mce_faq2_q",
        question: "Do I have to buy out the co-equity partner eventually?",
        answerKey: "mce_faq2_a",
        answer:
          "Most co-equity arrangements are settled when you sell, refinance, or reach the end of the agreement term, at which point the partner receives their share of the property's change in value alongside their original contribution.",
      },
    ],
  },
];

export function getMortgageData(slug: string): MortgagePageData | undefined {
  return MORTGAGES.find((m) => m.slug === slug);
}
