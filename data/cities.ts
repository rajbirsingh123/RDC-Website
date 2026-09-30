export interface CityFaqItem {
  question: string;
  answer: string;
}

export interface CityPageData {
  slug: string;
  name: string;
  region: string;
  metaTitle: string;
  metaDescription: string;
  heroLead: string;
  intro: string[];
  market: { heading: string; paragraphs: string[] };
  help: { heading: string; intro: string; items: string[] };
  faq: CityFaqItem[];
}

export const CITIES: CityPageData[] = [
  {
    slug: "oakville",
    name: "Oakville",
    region: "Halton Region",
    metaTitle: "Mortgage Broker in Oakville, ON | Royal Den Capital",
    metaDescription:
      "Local Oakville mortgage broker comparing banks, credit unions, and alternative lenders for purchases, renewals, refinancing, and HELOCs. Licensed Ontario brokerage based in Oakville.",
    heroLead:
      "Royal Den Capital is headquartered in Oakville, comparing lenders across the GTA to help local buyers, homeowners, and business owners secure the right mortgage.",
    intro: [
      "Oakville is home base for Royal Den Capital, so when we say we know the local market, we mean it literally — our office sits on Burnhamthorpe Road, minutes from the harbour, the Trafalgar and Third Line corridors, and the QEW that connects Oakville to Toronto and Hamilton. Whether your file involves a century home near downtown, a family property in Glen Abbey, a townhome in West Oak Trails, or a waterfront estate in Bronte, we structure financing around the property and the lender rules that actually apply to it.",
      "Working with an Oakville-based broker means faster answers and, when it helps, an in-person meeting instead of a phone tree. We combine that local access with the same lender network we use across Ontario: major banks, credit unions, monoline lenders, and alternative and private lenders, so an Oakville client is never limited to a single institution's rate sheet.",
    ],
    market: {
      heading: "The Oakville housing market",
      paragraphs: [
        "Oakville's housing stock spans several distinct pockets — established, tree-lined neighbourhoods close to the lake with older detached homes, newer master-planned communities like Rural Oakville and North Oakville with modern subdivisions and townhome clusters, and a growing base of mid- and high-rise condos near Kerr Village and the GO station corridor. That mix means the right mortgage structure is rarely one-size-fits-all: an older character home may need an appraisal-driven approach, a new-build purchase may involve a builder deposit structure and Tarion timelines, and a condo purchase brings its own status certificate review.",
        "Oakville also draws a wide range of borrowers, from first-time buyers stretching to get into the market, to move-up families needing bridge financing between a sale and a purchase, to established owners tapping equity for renovations or investment. We work through GDS/TDS qualification, the mortgage stress test, and available lender programs with each client so the numbers are clear before an offer goes in, not after.",
      ],
    },
    help: {
      heading: "How we help Oakville buyers, owners, and business owners",
      intro:
        "From a first purchase in Oakville to a renewal on a long-held family home, our team compares lender options and builds a plan around your goals.",
      items: [
        "First-time home buyer pre-approval and purchase financing",
        "Mortgage renewal review before your current term matures",
        "Refinancing and equity takeout for renovations or investments",
        "Home Equity Line of Credit (HELOC) for flexible access to equity",
        "Debt consolidation using home equity",
        "Commercial and business financing for Oakville business owners",
      ],
    },
    faq: [
      {
        question: "Does Royal Den Capital have a physical office in Oakville?",
        answer:
          "Yes. Our head office is at Unit 1, 2483 Burnhamthorpe Rd W in Oakville. We meet clients in person by appointment and also work virtually for clients who prefer phone, video, or email.",
      },
      {
        question: "Can you help with a mortgage for a new-build home in North Oakville?",
        answer:
          "Yes. New-build purchases involve builder deposit structures, Tarion warranty timelines, and sometimes a different qualification approach than a resale purchase. We walk Oakville buyers through those differences before they sign.",
      },
    ],
  },
  {
    slug: "mississauga",
    name: "Mississauga",
    region: "Peel Region",
    metaTitle: "Mortgage Broker in Mississauga, ON | Royal Den Capital",
    metaDescription:
      "Mississauga mortgage broker comparing top Canadian lenders for purchases, renewals, refinancing, HELOCs, and commercial mortgages. Serving Square One, Port Credit, Streetsville, and beyond.",
    heroLead:
      "Royal Den Capital compares lenders across Mississauga's condo towers, established neighbourhoods, and business corridors to help clients secure competitive financing.",
    intro: [
      "Mississauga is one of the largest and most diverse cities in the Greater Toronto Area, and its housing market reflects that scale. High-rise condo living around Square One and the City Centre sits alongside lower-rise, established neighbourhoods like Port Credit, Clarkson, and Streetsville, and newer subdivisions further north and east. Add a large base of self-employed residents, business owners, and newcomers to Canada, and Mississauga mortgage files often need more than a generic bank checklist.",
      "Royal Den Capital works with major banks, credit unions, and alternative and private lenders to build financing around the file in front of us, whether that's a first condo purchase, a growing family moving into a detached home, a renewal on a long-standing mortgage, or a commercial property tied to a Mississauga business.",
    ],
    market: {
      heading: "The Mississauga housing market",
      paragraphs: [
        "Condo qualification in Mississauga carries its own considerations: maintenance fees factor into debt-service ratios, and a status certificate review matters for both resale and pre-construction assignment purchases. Meanwhile, detached and semi-detached homes in neighbourhoods like Erin Mills, Meadowvale, and Lorne Park often involve larger mortgage amounts and, for move-up buyers, bridge financing between selling one property and closing on the next.",
        "Mississauga's proximity to Pearson International Airport and major employment corridors also means a steady flow of newcomer and relocation files. We support newcomer mortgage programs for clients with limited Canadian credit history, as well as self-employed and commission-income borrowers who need a lender that will look past a T4 to the full picture of their income.",
      ],
    },
    help: {
      heading: "How we help Mississauga clients",
      intro:
        "Condo, freehold, or commercial — we compare lender options so Mississauga clients see the trade-offs clearly before they commit.",
      items: [
        "First-time home buyer and condo purchase financing",
        "Newcomer to Canada mortgage programs",
        "Self-employed and alternative income qualification",
        "Mortgage renewal and lender-switch comparisons",
        "Refinancing, equity takeout, and debt consolidation",
        "Commercial mortgages for Mississauga business owners",
      ],
    },
    faq: [
      {
        question: "Can I qualify for a Mississauga mortgage if I'm newly self-employed?",
        answer:
          "Often, yes. Self-employed borrowers can qualify using two years of tax returns and business financials through traditional lenders, or through stated-income programs with alternative lenders if the business is newer. We review the file to find the best-fit lender.",
      },
      {
        question: "Do condo fees affect how much mortgage I can get in Mississauga?",
        answer:
          "Yes. Lenders generally include 50% of monthly condo fees in your housing cost calculation for GDS/TDS qualification, which can affect your maximum mortgage amount on a Mississauga condo purchase.",
      },
    ],
  },
  {
    slug: "burlington",
    name: "Burlington",
    region: "Halton Region",
    metaTitle: "Mortgage Broker in Burlington, ON | Royal Den Capital",
    metaDescription:
      "Burlington mortgage broker comparing lenders for purchases, renewals, refinancing, and HELOCs across Aldershot, Millcroft, Headon Forest, and the Burlington waterfront.",
    heroLead:
      "From lakeside properties to newer suburban subdivisions, Royal Den Capital compares lender options for Burlington buyers, owners, and business owners.",
    intro: [
      "Burlington sits where Halton Region meets the western tip of Lake Ontario, giving the city a mix of established, tree-lined streets near the waterfront and downtown, and newer subdivisions further north toward Headon Forest and Millcroft. The QEW, Highway 403, and Highway 407 interchange nearby make Burlington a common choice for buyers balancing commute access with a quieter, lake-adjacent lifestyle.",
      "That variety shows up in the mortgage files we see from Burlington: waterfront and character homes that may need a full appraisal and sometimes a private or alternative lender for unique properties, newer detached and townhome purchases in planned subdivisions, and long-time owners looking to renew, refinance, or access equity for renovations.",
    ],
    market: {
      heading: "The Burlington housing market",
      paragraphs: [
        "Burlington's downtown core and neighbourhoods like Aldershot and Roseland include a mix of older detached homes and infill development, which can mean a wider range of property conditions and values for appraisal purposes. Further from the lake, subdivisions built over the past two to three decades offer more standardized detached and townhome inventory that tends to move more predictably through underwriting.",
        "Burlington also attracts move-up buyers from Toronto and Mississauga seeking more space for the same budget, along with retirees and downsizers considering condos near the waterfront. We help both groups think through financing timing, bridge loans between a sale and purchase, and whether a fixed or variable rate fits their plans.",
      ],
    },
    help: {
      heading: "How we help Burlington buyers and homeowners",
      intro: "Whether you're buying near the lake or renewing a mortgage on a long-held family home, we compare lender options built around your file.",
      items: [
        "Purchase financing and pre-approval strategy",
        "Mortgage renewal and lender-switch reviews",
        "Refinancing and equity takeout for renovations",
        "Home Equity Line of Credit (HELOC)",
        "Bridge financing between a sale and a new purchase",
        "Financing for unique or higher-value waterfront properties",
      ],
    },
    faq: [
      {
        question: "Can you help finance an older or unique property in Burlington?",
        answer:
          "Yes. Character homes and unique waterfront properties sometimes need a more detailed appraisal or a lender comfortable with non-standard properties. We help position these files with the right lender.",
      },
      {
        question: "I'm selling my current home and buying in Burlington at the same time. Can you help?",
        answer:
          "Yes. Bridge financing can cover the gap between your sale closing and your purchase closing so you're not forced to align both dates perfectly. We can walk through whether it fits your specific timeline.",
      },
    ],
  },
  {
    slug: "milton",
    name: "Milton",
    region: "Halton Region",
    metaTitle: "Mortgage Broker in Milton, ON | Royal Den Capital",
    metaDescription:
      "Milton mortgage broker for new-build purchases, first-time buyers, renewals, and refinancing. Comparing lenders across Milton's rapidly growing Halton Region subdivisions.",
    heroLead:
      "Milton has been among Ontario's fastest-growing communities for years — Royal Den Capital helps buyers and owners navigate financing for new-build and resale homes alike.",
    intro: [
      "Milton has grown quickly over the past decade, and most of that growth has come in the form of new-build subdivisions stretching south and east from the older downtown core near the Niagara Escarpment. That means a large share of Milton mortgage files involve builder purchase agreements, staged deposits, and Tarion timelines rather than a straightforward resale closing, and many buyers are first-time buyers or young families drawn by newer housing stock at a relative value compared to Oakville or Mississauga.",
      "Royal Den Capital helps Milton clients plan financing well before closing, since new-build purchases can involve a longer runway between the initial agreement and the final mortgage funding, and rate holds, pre-approvals, and lender policies can change in that window.",
    ],
    market: {
      heading: "The Milton housing market",
      paragraphs: [
        "New subdivisions in Milton typically offer detached, semi-detached, and townhome product built over the last several years, which tends to qualify cleanly for standard lender programs. Downtown Milton and older pockets closer to the escarpment include a smaller supply of resale detached homes, sometimes on larger lots.",
        "Because Milton's GO train connects to Toronto, many buyers are commuters prioritizing more space and newer construction over a shorter commute — which shapes how we think about affordability, since we look at total monthly costs (including commuting) alongside the mortgage payment itself when helping clients set a realistic budget.",
      ],
    },
    help: {
      heading: "How we help Milton buyers and owners",
      intro: "From a new-build pre-approval to a mortgage renewal a few years later, we help Milton clients compare lender options at every stage.",
      items: [
        "New-build and pre-construction purchase financing",
        "First-time home buyer pre-approval",
        "Mortgage renewal and lender-switch comparisons",
        "Refinancing and equity takeout",
        "Purchase Plus Improvements for updating a resale home",
        "Construction financing for custom builds",
      ],
    },
    faq: [
      {
        question: "How early should I get a mortgage pre-approval for a new-build home in Milton?",
        answer:
          "As early as possible once you're seriously shopping. New-build closings can be months or years away, so we help you understand what a pre-approval covers now versus what will be reconfirmed closer to your actual closing date.",
      },
      {
        question: "Do new-build homes in Milton qualify differently than resale homes?",
        answer:
          "The core qualification rules (income, credit, down payment, stress test) are the same, but new-build purchases add builder deposit structures and Tarion warranty timelines that we walk clients through before they sign.",
      },
    ],
  },
  {
    slug: "brampton",
    name: "Brampton",
    region: "Peel Region",
    metaTitle: "Mortgage Broker in Brampton, ON | Royal Den Capital",
    metaDescription:
      "Brampton mortgage broker comparing lenders for purchases, renewals, refinancing, multigenerational homes, and newcomer mortgage programs across Peel Region.",
    heroLead:
      "Brampton's fast-growing, diverse community needs financing options that reflect real households — Royal Den Capital compares lenders to find the right fit.",
    intro: [
      "Brampton is one of the fastest-growing and most diverse cities in the Greater Toronto Area, with established neighbourhoods alongside rapidly expanding subdivisions in areas like Mount Pleasant and Springdale. Detached and semi-detached homes with secondary suites or in-law arrangements are common, reflecting the number of multigenerational households in the city, which can affect how income and household finances are structured for a mortgage application.",
      "Royal Den Capital works with Brampton clients across a wide range of scenarios: first-time buyers, newcomers to Canada building credit history, multigenerational households pooling income to qualify, and established owners renewing or refinancing. We compare lender programs designed for each of these situations rather than assuming one approach fits everyone.",
    ],
    market: {
      heading: "The Brampton housing market",
      paragraphs: [
        "Brampton's housing stock leans heavily toward detached and semi-detached homes, many built over the past two to three decades, with a growing supply of townhomes and condos closer to transit corridors like the Züm bus rapid transit lines and the Brampton GO station. Highway 410 and Highway 407 give quick access to surrounding employment areas, which matters for buyers weighing commute time against home size and price.",
        "Because many Brampton households include extended family or rental income from a basement apartment, we routinely work through how lenders treat co-borrower income, rental income, and non-traditional household structures when calculating what a client can qualify to borrow.",
      ],
    },
    help: {
      heading: "How we help Brampton buyers and homeowners",
      intro: "We help Brampton clients structure financing around how their household actually works, not a generic template.",
      items: [
        "First-time home buyer and multigenerational household financing",
        "Newcomer to Canada mortgage programs",
        "Mortgage renewal and lender-switch reviews",
        "Refinancing and equity takeout for renovations or debt consolidation",
        "Purchase Plus Improvements",
        "Commercial and business financing for Brampton business owners",
      ],
    },
    faq: [
      {
        question: "Can rental income from a basement apartment help me qualify for a Brampton mortgage?",
        answer:
          "In many cases, yes, subject to the lender's rules on rental income offset and documentation. We review the property and income details to see how a specific lender will treat it.",
      },
      {
        question: "Can multiple family members go on a mortgage together in Brampton?",
        answer:
          "Yes. Co-borrower and multigenerational applications are common. Lenders will review each applicant's income, credit, and debts, and we help structure the application to present the household's full financial picture clearly.",
      },
    ],
  },
  {
    slug: "hamilton",
    name: "Hamilton",
    region: "Hamilton–Wentworth",
    metaTitle: "Mortgage Broker in Hamilton, ON | Royal Den Capital",
    metaDescription:
      "Hamilton mortgage broker comparing lenders across downtown, the Mountain, Ancaster, Stoney Creek, and Waterdown for purchases, renewals, refinancing, and renovation financing.",
    heroLead:
      "From downtown lofts to Ancaster and Waterdown suburbs, Royal Den Capital compares lender options for Hamilton's varied housing market.",
    intro: [
      "Hamilton sits at the western end of Lake Ontario and has shifted over recent decades from a steel and industrial economy toward health sciences, education, and the arts, a change that shows up in its neighbourhoods. Downtown lofts and older character homes near James Street sit apart, physically and often in condition and value, from the escarpment (\"the Mountain\") and the suburban stretches of Ancaster, Waterdown, and Stoney Creek. That range means Hamilton mortgage files vary widely, from renovation financing on an older home to standard purchase financing on a newer suburban build.",
      "Hamilton has also drawn buyers priced out of Toronto, Oakville, and Mississauga, looking for more attainable entry points into the housing market without leaving the GTA commuter corridor entirely. Royal Den Capital compares lenders for these relocating buyers as well as long-time Hamilton residents renewing, refinancing, or accessing equity.",
    ],
    market: {
      heading: "The Hamilton housing market",
      paragraphs: [
        "Older housing stock in Hamilton's lower city and established neighbourhoods often needs renovation or repair financing, whether through a Purchase Plus Improvements mortgage at the time of buying or a refinance and equity takeout afterward. Lenders may also request more detail on a property's condition through the appraisal process for older homes.",
        "In contrast, Ancaster, Waterdown, and newer pockets of Stoney Creek offer more recently built detached and townhome product that tends to qualify more predictably, appealing to move-up buyers and families relocating from elsewhere in the GTA. We help clients weigh the trade-offs between an older home with renovation potential and a newer home with a higher purchase price but less immediate work.",
      ],
    },
    help: {
      heading: "How we help Hamilton buyers and homeowners",
      intro: "From renovation financing on an older Hamilton home to a standard purchase in Ancaster or Waterdown, we compare lender options for your situation.",
      items: [
        "First-time home buyer pre-approval and purchase financing",
        "Purchase Plus Improvements for older or fixer-upper homes",
        "Renovation financing and equity takeout",
        "Mortgage renewal and lender-switch comparisons",
        "Refinancing and debt consolidation",
        "Financing for relocating buyers moving from elsewhere in the GTA",
      ],
    },
    faq: [
      {
        question: "Can I roll renovation costs into my mortgage when buying an older Hamilton home?",
        answer:
          "Often, yes, through a Purchase Plus Improvements mortgage, which lets qualified renovation costs be added to the mortgage amount at closing so you're not paying for repairs out of pocket right after buying.",
      },
      {
        question: "Is it harder to get a mortgage on an older home in Hamilton's lower city?",
        answer:
          "Not necessarily, but lenders may look more closely at the property's condition through the appraisal. We help identify which lenders are comfortable with older housing stock and what documentation may be needed.",
      },
    ],
  },
];

export function getCityData(slug: string): CityPageData | undefined {
  return CITIES.find((city) => city.slug === slug);
}
