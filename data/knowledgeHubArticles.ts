export interface KnowledgeArticleSource {
  href: string;
  text: string;
}

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string };

export interface KnowledgeArticleFaqItem {
  question: string;
  answer: string;
}

export interface KnowledgeHubArticle {
  slug: string;
  title: string;
  metaDescription: string;
  /** One or two sentence teaser shown on the /knowledge-hub/ index card. */
  excerpt: string;
  category: string;
  author: string;
  authorRole: string;
  /** ISO date, e.g. "2026-09-15". */
  datePublished: string;
  dateModified?: string;
  readTime: string;
  body: ArticleBlock[];
  sources: KnowledgeArticleSource[];
  faq?: KnowledgeArticleFaqItem[];
}

export const KNOWLEDGE_HUB_ARTICLES: KnowledgeHubArticle[] = [
  {
    slug: "mortgage-stress-test-explained",
    title: "The Canadian Mortgage Stress Test, Explained",
    metaDescription:
      "How the OSFI mortgage stress test works, who it applies to, why lenders use a higher qualifying rate, and how it affects how much home you can afford in Canada.",
    excerpt:
      "Every federally regulated mortgage in Canada is qualified at a higher \"stress test\" rate than the rate you'll actually pay. Here's how that rate is set and what it means for your budget.",
    category: "Qualification",
    author: "Royal Den Capital Team",
    authorRole: "Licensed Mortgage Brokerage",
    datePublished: "2026-09-15",
    readTime: "7 min read",
    body: [
      {
        type: "p",
        text: "If you've started shopping for a mortgage in Canada, you've probably heard the phrase \"stress test\" and wondered why it applies to you when you're not the one under stress — your finances are. The mortgage stress test isn't a medical exam or a pass/fail credit check. It's a qualification rule that requires federally regulated lenders to confirm you could still afford your payments if interest rates were higher than the rate you're actually being offered. It sounds like a technicality, but it can meaningfully change how much you're approved to borrow, so it's worth understanding before you start house hunting.",
      },
      {
        type: "h2",
        text: "What the stress test actually is",
      },
      {
        type: "p",
        text: "The stress test is a minimum qualifying rate set by the Office of the Superintendent of Financial Institutions (OSFI), the federal regulator that oversees banks and federally regulated lenders in Canada. Instead of qualifying you at the interest rate on your actual mortgage contract, your lender must test whether you could afford your payments at a higher rate. If you can't comfortably qualify at that higher rate, the lender will reduce the amount you're approved to borrow, even if you could technically make payments at your real, lower contract rate.",
      },
      {
        type: "p",
        text: "The idea behind the rule is straightforward: interest rates move over time, and a household that can only barely afford payments at today's rate could be in real trouble if rates rise before their next renewal. By testing affordability at a higher rate up front, the stress test is meant to build in a cushion so borrowers aren't stretched to their absolute limit from day one.",
      },
      {
        type: "h2",
        text: "How the qualifying rate is calculated",
      },
      {
        type: "p",
        text: "For an uninsured mortgage (generally, one with a down payment of 20% or more), OSFI's minimum qualifying rate is the higher of two numbers: your actual contract rate plus 2 percentage points, or a fixed floor rate. That floor has historically sat at 5.25%, though it's a policy figure OSFI can adjust, so it's worth confirming the current number with your broker or lender rather than assuming it never changes.",
      },
      {
        type: "p",
        text: "In practice, that means if your lender offers you a contract rate of 4.5%, your stress test rate would be the higher of 6.5% (4.5% + 2%) or the floor. Insured mortgages (those with mortgage loan insurance because the down payment is under 20%) are also stress tested, generally using a similar approach set by the insurer and regulator rules that apply to insured lending.",
      },
      {
        type: "h3",
        text: "A simplified example",
      },
      {
        type: "p",
        text: "Say a lender offers you a 5-year fixed rate of 4.75%. Your stress test rate would be calculated as 4.75% + 2% = 6.75%. Since that's higher than the 5.25% floor, 6.75% becomes the rate your lender uses to calculate your Gross Debt Service (GDS) and Total Debt Service (TDS) ratios; the two affordability ratios that determine how much you can borrow, not the 4.75% you'll actually pay.",
      },
      {
        type: "h2",
        text: "Who the stress test applies to",
      },
      {
        type: "p",
        text: "The stress test applies to mortgages from federally regulated lenders, which includes most major banks and many other institutions. It generally applies to purchases, refinances, and switches between lenders at renewal (since a lender switch is treated as a new mortgage application). It typically does not apply if you simply renew with your existing lender without changing the loan amount, since that's treated as a continuation of your existing mortgage rather than a new qualification.",
      },
      {
        type: "p",
        text: "Some credit unions and provincially regulated lenders are not required to follow OSFI's federal stress test rules, though many choose to apply a similar affordability buffer of their own. Private and alternative lenders often use their own qualification approach entirely, which is one reason working with a broker who has access to multiple lender types can matter for borderline files.",
      },
      {
        type: "h2",
        text: "How the stress test affects how much you can afford",
      },
      {
        type: "p",
        text: "Because the stress test uses a higher rate to calculate your GDS and TDS ratios, it directly reduces the maximum mortgage amount many borrowers qualify for compared to what they could technically afford at their real contract rate. For some buyers, especially those with tight debt-service ratios or significant existing debt, this can mean qualifying for a smaller home than they expected, or needing a larger down payment to bring the mortgage amount back within the lender's limits.",
      },
      {
        type: "ul",
        items: [
          "It does not change the interest rate you actually pay, only the rate used to test affordability.",
          "It applies at initial qualification (purchase, refinance, or lender switch), not to every monthly payment going forward.",
          "It can reduce your maximum approved mortgage amount even if your income and credit are strong.",
          "Working with a broker who compares multiple lenders can help identify options if one lender's stress-tested number doesn't work for your file.",
        ],
      },
      {
        type: "h2",
        text: "Practical ways to plan around it",
      },
      {
        type: "p",
        text: "The most useful thing you can do is get a real pre-approval, not just an online calculator estimate, before you start shopping seriously. A pre-approval from a licensed mortgage professional will apply the actual stress test math to your real income, debts, and credit profile, so the number you're working with reflects what a lender would actually approve rather than a rough guess.",
      },
      {
        type: "p",
        text: "If your stress-tested number comes in lower than you hoped, a few common adjustments can help: paying down existing debt to improve your TDS ratio, increasing your down payment to lower the mortgage amount you need to qualify for, adding a co-signer or co-borrower to combine income, or, in some cases, looking at lenders with different qualification approaches. A broker can walk through which of these actually moves the number for your specific situation instead of guessing.",
      },
    ],
    sources: [
      {
        href: "https://www.osfi-bsif.gc.ca/en/supervision/financial-institutions/banks/minimum-qualifying-rate-uninsured-mortgages",
        text: "OSFI — Minimum qualifying rate for uninsured mortgages",
      },
      {
        href: "https://www.canada.ca/en/financial-consumer-agency/services/mortgages/mortgage-stress-test.html",
        text: "Canada.ca — Mortgage stress test",
      },
      {
        href: "https://www.cmhc-schl.gc.ca/consumers/home-buying/mortgage-loan-insurance-for-consumers/what-is-mortgage-loan-insurance",
        text: "CMHC — Mortgage loan insurance",
      },
    ],
    faq: [
      {
        question: "Does the stress test apply when I renew my mortgage?",
        answer:
          "If you renew with your existing lender without changing the loan amount, the stress test generally does not apply since it's treated as a continuation of your existing mortgage. If you switch to a new lender at renewal, it's typically treated as a new application and the stress test applies.",
      },
      {
        question: "Is the stress test rate the rate I'll actually pay?",
        answer:
          "No. The stress test rate is only used to test affordability during qualification. You pay your actual contract rate, which is usually lower than the stress test rate.",
      },
      {
        question: "Can a mortgage broker help if I don't pass the stress test with my bank?",
        answer:
          "Often, yes. A broker can compare multiple lenders, including credit unions and alternative lenders that may use different qualification approaches, to find an option that fits your file.",
      },
    ],
  },
  {
    slug: "cmhc-mortgage-loan-insurance-explained",
    title: "CMHC Mortgage Loan Insurance: How Default Insurance Works",
    metaDescription:
      "How CMHC mortgage loan insurance works in Canada: when it's required, who provides it, how the premium is calculated, and how it affects your mortgage.",
    excerpt:
      "If your down payment is under 20%, your mortgage almost certainly needs default insurance. Here's what CMHC and other approved insurers actually do, and how the premium affects your loan.",
    category: "Down Payment",
    author: "Royal Den Capital Team",
    authorRole: "Licensed Mortgage Brokerage",
    datePublished: "2026-08-20",
    readTime: "7 min read",
    body: [
      {
        type: "p",
        text: "When you hear the word 'insurance' attached to your mortgage, it's natural to assume it's there to protect you if something goes wrong. Mortgage loan insurance in Canada works differently: it protects the lender, not the borrower, and it exists specifically to make certain low-down-payment mortgages possible in the first place. If your down payment is below 20% of the purchase price, understanding how this insurance works, who provides it, what it costs, and what it actually covers is one of the more useful pieces of financial literacy for a Canadian home buyer, and it's a topic that comes up in almost every high-ratio purchase conversation we have with clients.",
      },
      {
        type: "h2",
        text: "What mortgage loan insurance actually is",
      },
      {
        type: "p",
        text: "Mortgage loan insurance, often called mortgage default insurance, is a policy that a lender arranges (and the borrower ultimately pays for) to protect the lender against the risk that a borrower stops making payments and the eventual sale of the property doesn't fully recover the outstanding loan balance. Without this insurance, most federally regulated lenders would require a down payment of at least 20% before approving a mortgage, because a smaller down payment leaves less of a cushion if the lender ever needs to sell the property after a default. Insurance closes that gap by shifting the extra risk from the lender to the insurer, which is precisely what allows lenders to responsibly offer mortgages with down payments as low as 5%.",
      },
      {
        type: "p",
        text: "It's worth being clear about the direction this protection runs, because it's the single most misunderstood part of the product. If a borrower defaults and the lender has to pursue foreclosure or power of sale on the property, the insurer compensates the lender for its loss, not the homeowner. In many cases the insurer can still pursue the borrower for any shortfall between what the property sold for and what was owed. Mortgage loan insurance is a tool that expands who can qualify for a mortgage with a smaller down payment; it is not a safety net for the borrower's own finances, and it shouldn't be confused with mortgage life or disability insurance, which is a separate, optional product that does protect you personally.",
      },
      {
        type: "h2",
        text: "When mortgage loan insurance is required",
      },
      {
        type: "p",
        text: "In Canada, mortgage loan insurance is generally required whenever your down payment is less than 20% of the purchase price, a situation commonly described as a 'high-ratio' mortgage. This rule applies broadly across the country and connects directly to the minimum down payment tiers that determine how much you need to put down in the first place. Those tiers are based on the purchase price of the home, and the minimum required down payment climbs in steps as the price increases, which means the insurance question and the down payment question really need to be answered together rather than separately.",
      },
      {
        type: "ul",
        items: [
          "On a purchase price of $500,000 or less, the minimum down payment is 5% of the price.",
          "On the portion of the price between $500,000 and $999,999, the minimum down payment is 10% of that portion, in addition to the 5% required on the first $500,000.",
          "On a purchase price of $1,000,000 or more, the minimum down payment is 20% of the price, which generally means the mortgage is arranged as an uninsured mortgage rather than an insured one.",
        ],
      },
      {
        type: "p",
        text: "The practical takeaway is that insurance eligibility is tied directly to price and down payment size, not simply to a borrower's personal preference. A buyer putting 10% down on a $650,000 home will need mortgage loan insurance; a buyer putting 25% down on that same home will not, and will instead have an uninsured mortgage with a different qualification process. Insured mortgages also come with additional insurer conditions around amortization length, property type, condition, and, for insured purchases specifically, a maximum purchase price threshold, so not every transaction remains eligible for insurance even when the down payment is technically under 20%.",
      },
      {
        type: "h2",
        text: "Who actually provides the insurance",
      },
      {
        type: "p",
        text: "In Canada, mortgage loan insurance is provided by CMHC, the Canada Mortgage and Housing Corporation, which is a federal Crown corporation, as well as by other approved private mortgage insurers that operate under similar federal oversight. Regardless of which insurer ends up backing a particular mortgage, the borrower experience is largely the same: the lender arranges the insurance as part of underwriting your file, the premium is calculated using a standard, published framework, and the resulting cost is passed on to you as part of the loan. You typically won't shop for mortgage insurance the way you shop for a lender or a rate; your broker or lender selects the insurer as part of structuring the deal, based on which one is the best fit for your specific file.",
      },
      {
        type: "h2",
        text: "How the premium is calculated",
      },
      {
        type: "p",
        text: "The premium for mortgage loan insurance is calculated as a percentage of the total mortgage amount, and that percentage is tiered based on your loan-to-value ratio, which is simply your mortgage amount divided by the property's value. The lower your down payment (and therefore the higher your loan-to-value ratio), the higher the percentage applied to your premium. A borrower putting down an amount close to the 20% threshold pays a meaningfully lower premium rate than a borrower putting down closer to the 5% minimum, because the insurer is taking on proportionally more risk when the equity cushion in the home is smaller. Because these percentage tiers and exact rates can be adjusted by insurers over time, it's best to confirm the current premium schedule with your broker rather than relying on a figure you saw somewhere that may already be out of date.",
      },
      {
        type: "h3",
        text: "How the premium is usually paid",
      },
      {
        type: "p",
        text: "Rather than requiring you to pay the premium out of pocket on closing day, most insured mortgages allow the premium to be added directly to the mortgage principal and amortized along with the rest of the loan. This is convenient because it avoids an extra lump-sum cost when you're already covering land transfer tax, legal fees, and other closing costs, but it does mean you're borrowing more than simply the price of the home minus your down payment, and you'll pay interest on that premium amount over the full life of the mortgage. Provincial sales tax on the premium, where applicable, generally cannot be added to the loan and must be paid separately at closing, so it's worth budgeting for that as a distinct cash cost rather than assuming it's rolled in automatically.",
      },
      {
        type: "h2",
        text: "What the insurance protects, and what it doesn't",
      },
      {
        type: "p",
        text: "It bears repeating because it's the most commonly misunderstood part of this product: mortgage loan insurance protects the lender's financial interest in the loan, not your equity, your credit, or your ability to keep your home if your personal circumstances change. It does not pause or reduce your payments if you lose your job or face a medical issue, and it does not forgive any shortfall between what the property eventually sells for and what you owe if you default; the insurer may still pursue you for that gap through the courts. If you want protection for yourself and your family, such as coverage that helps pay off or pay down the mortgage if you become disabled or pass away, that is an entirely separate, optional product usually called mortgage life or disability insurance.",
      },
      {
        type: "quote",
        text: "Mortgage loan insurance makes low-down-payment homeownership possible. It doesn't replace the need for your own financial cushion.",
      },
      {
        type: "h2",
        text: "Amortization limits on insured mortgages",
      },
      {
        type: "p",
        text: "Insured mortgages are also subject to a maximum amortization period set by insurer and regulatory rules, which has generally been shorter than what's sometimes available on uninsured mortgages. This matters because a longer amortization spreads your principal repayment over more years, lowering your monthly payment but increasing the total interest paid over the life of the loan; a shorter maximum amortization on an insured mortgage typically means your payments will be somewhat higher than they might be on an equivalent uninsured loan with a longer amortization schedule. Some newer construction and first-time buyer scenarios have had access to extended amortization options under specific program rules from time to time, so it's worth asking your broker whether your particular purchase might qualify for anything beyond the standard maximum before you assume the shorter timeline applies.",
      },
      {
        type: "p",
        text: "The interaction between amortization limits, premium tiers, and the down payment tiers described earlier is exactly the kind of detail that benefits from a broker running your actual numbers rather than relying on a general rule of thumb. Two buyers with the same purchase price and a similar income can end up with meaningfully different monthly payments and total borrowing costs depending on exactly where their down payment falls relative to these thresholds, which is why small adjustments to a down payment can sometimes make a bigger difference than they first appear to.",
      },
      {
        type: "h2",
        text: "Putting it together for your own purchase",
      },
      {
        type: "p",
        text: "If you're planning a purchase with less than 20% down, the practical next step isn't to memorize premium tables, it's to have your file reviewed against the current tiers and rules so you know your real numbers before you start touring homes. A broker can show you what happens to your payment if you adjust your down payment even slightly, since crossing certain thresholds, like $500,000 or the 20% mark, can change both your insurance premium and your qualifying calculations at the same time. Understanding this ahead of time turns mortgage loan insurance from a mysterious line item on your closing statement into a predictable, plannable part of your purchase, and it puts you in a stronger position to compare offers once you know exactly what each one actually costs.",
      },
    ],
    sources: [
      {
        href: "https://www.cmhc-schl.gc.ca/consumers/home-buying/mortgage-loan-insurance-for-consumers/what-is-mortgage-loan-insurance",
        text: "CMHC — Mortgage loan insurance",
      },
      {
        href: "https://www.canada.ca/en/financial-consumer-agency/services/mortgages/down-payment.html",
        text: "Canada.ca — Down payment requirements",
      },
      {
        href: "https://www.osfi-bsif.gc.ca/en/supervision/financial-institutions/banks/minimum-qualifying-rate-uninsured-mortgages",
        text: "OSFI — Minimum qualifying rate for uninsured mortgages",
      },
    ],
    faq: [
      {
        question: "Does mortgage loan insurance protect me if I lose my job?",
        answer:
          "No. Mortgage loan insurance protects the lender if you default; it does not pause your payments or forgive your debt. Personal protection against job loss, disability, or death comes from separate, optional insurance products.",
      },
      {
        question: "Can I avoid mortgage loan insurance entirely?",
        answer:
          "Yes, by putting down 20% or more of the purchase price, your mortgage is generally considered uninsured and default insurance is not required, though lenders may apply different qualification criteria for uninsured mortgages.",
      },
      {
        question: "Does the insurance premium get added to my mortgage automatically?",
        answer:
          "In most cases, yes, the premium can be added to your mortgage principal and paid off over your amortization. Provincial sales tax on the premium, where it applies, is usually a separate closing cost paid up front.",
      },
    ],
  },
  {
    slug: "first-time-home-buyer-programs-canada",
    title: "First-Time Home Buyer Programs and Incentives in Canada",
    metaDescription:
      "A plain-language guide to the RRSP Home Buyers' Plan, the FHSA, land transfer tax rebates, and other tools first-time buyers in Canada can use to get into a home.",
    excerpt:
      "From the RRSP Home Buyers' Plan to the First Home Savings Account and land transfer tax rebates, first-time buyers have several tools available. Here's how they fit together.",
    category: "First-Time Buyers",
    author: "Royal Den Capital Team",
    authorRole: "Licensed Mortgage Brokerage",
    datePublished: "2026-08-27",
    readTime: "7 min read",
    body: [
      {
        type: "p",
        text: "Buying your first home in Canada usually means learning a new vocabulary almost overnight: down payment tiers, stress tests, closing costs, and a handful of government programs with acronyms that sound more complicated than they actually are. The good news is that several of the tools designed specifically for first-time buyers can meaningfully reduce how much cash you need up front or how much tax you pay along the way. Understanding what each one does, and how they can be combined, is one of the most valuable things a first-time buyer can do before they start house hunting in earnest.",
      },
      {
        type: "h2",
        text: "The RRSP Home Buyers' Plan",
      },
      {
        type: "p",
        text: "The Home Buyers' Plan, commonly shortened to the HBP, allows eligible first-time buyers to withdraw funds from their Registered Retirement Savings Plan to put toward a down payment without paying tax on that withdrawal at the time. Normally, taking money out of an RRSP triggers immediate income tax, but the HBP creates an exception specifically for a qualifying home purchase. The catch, and it's an important one, is that the withdrawal isn't free money: it has to be repaid back into your RRSP over a set number of years, and if you miss a scheduled repayment, the missed portion is added to your taxable income for that year instead. Because the repayment plan runs for well over a decade, it's worth building the annual repayment into your household budget from the start rather than treating it as a future problem.",
      },
      {
        type: "p",
        text: "To use the HBP, you generally need to be considered a first-time buyer under the program's definition, which typically means you (and, in many cases, your spouse or common-law partner) haven't owned and lived in a home as your principal residence within a specific recent period. There are also rules about how long funds need to sit in the RRSP before they can be withdrawn under the plan and how the withdrawal needs to be used, so it's worth confirming your specific eligibility with a tax professional or the Canada Revenue Agency before assuming you qualify.",
      },
      {
        type: "h2",
        text: "The First Home Savings Account",
      },
      {
        type: "p",
        text: "The First Home Savings Account, or FHSA, is a newer registered account designed specifically to help first-time buyers save for a home. It combines features of both an RRSP and a Tax-Free Savings Account: contributions are generally tax-deductible the way RRSP contributions are, but qualifying withdrawals used toward a first home purchase, along with any growth on your investments inside the account, come out completely tax-free, similar to a TFSA. Unlike the Home Buyers' Plan, funds withdrawn from an FHSA for a qualifying purchase don't need to be repaid, which makes it a genuinely different kind of tool rather than a loan against your own future retirement savings.",
      },
      {
        type: "p",
        text: "Because the FHSA has its own annual and lifetime contribution limits, and because it can potentially be used together with the Home Buyers' Plan on the same purchase, first-time buyers who are still a few years out from buying often benefit from opening an FHSA early and contributing steadily, even in small amounts, rather than waiting until they're ready to buy to think about it. The earlier the account is opened, the more time your contribution room has to build and the more time any investment growth inside the account has to compound tax-free.",
      },
      {
        type: "h2",
        text: "Land transfer tax rebates",
      },
      {
        type: "p",
        text: "Land transfer tax is a provincial tax paid on closing when you take ownership of a property, and in Ontario it applies to most residential purchases. First-time buyers in Ontario may be eligible for a provincial land transfer tax rebate that reduces or eliminates the tax owed, up to a set maximum amount, provided they meet the program's eligibility conditions, which generally focus on whether you or your spouse have previously owned a home anywhere in the world. On top of the provincial rebate, some municipalities layer on their own municipal land transfer tax with a separate first-time buyer rebate of its own; Toronto is the most well-known example, since it charges an additional municipal land transfer tax alongside the provincial one and offers its own rebate for qualifying first-time buyers.",
      },
      {
        type: "p",
        text: "Because these rebates are usually applied directly at closing by your real estate lawyer rather than claimed later, it's important that your lawyer knows you intend to claim first-time buyer status well before your closing date, so the paperwork and eligibility confirmation can be handled correctly. Missing this step can mean paying the full tax up front and having to pursue a rebate afterward, which is a more complicated process than having it applied correctly the first time.",
      },
      {
        type: "h2",
        text: "Extended amortization for eligible first-time and new-build purchases",
      },
      {
        type: "p",
        text: "From time to time, federal housing policy has extended eligibility for longer amortization periods, beyond the standard maximum typically available on insured mortgages, to specific groups such as first-time buyers or buyers of newly constructed homes. A longer amortization spreads your mortgage principal over more years, which lowers your monthly payment and can help a qualifying buyer stretch their affordability a little further, though it also means paying more interest in total over the life of the loan. Because eligibility rules for extended amortization options can change and don't apply to every purchase, this is very much a case where it pays to ask your broker directly whether your specific purchase, property type, and buyer status might qualify, rather than assuming a longer amortization is or isn't available to you.",
      },
      {
        type: "h2",
        text: "Practical qualification tips for first-time buyers",
      },
      {
        type: "p",
        text: "Beyond the specific programs, first-time buyers tend to benefit from a handful of practical habits well before they apply for a mortgage. Building or strengthening a credit history matters, since lenders want to see a track record of on-time payments across a credit card or two, and buyers who are new to credit sometimes need a few months of deliberate, responsible use before their file looks its strongest. If part of your down payment is coming from family, a signed gift letter confirming the funds are a true gift and not a loan is something most lenders will require, so it's worth arranging that documentation early rather than scrambling for it once you're under a firming deadline on an offer.",
      },
      {
        type: "p",
        text: "Getting a real pre-approval, rather than relying on an online calculator, is arguably the single most useful step a first-time buyer can take before they start touring homes seriously. A proper pre-approval applies the actual stress test math and lender qualification rules to your real income, debts, and down payment sources, which means the number you're working with is grounded in what a lender would actually approve rather than a rough estimate that might be meaningfully higher or lower than reality.",
      },
      {
        type: "ul",
        items: [
          "Open an FHSA as early as possible, even with modest contributions, to build tax-advantaged room ahead of your purchase.",
          "Confirm HBP eligibility and repayment obligations with a tax professional before withdrawing RRSP funds.",
          "Ask your lawyer to confirm first-time buyer land transfer tax rebate eligibility well before your closing date.",
          "Start building a credit history months, not weeks, before you plan to apply for a mortgage.",
          "Get a documented pre-approval instead of relying on an online affordability estimate.",
        ],
      },
      {
        type: "h3",
        text: "A note on rules outside Ontario",
      },
      {
        type: "p",
        text: "Land transfer tax rules, first-time buyer rebates, and any municipal add-on taxes vary by province and by municipality, so a buyer purchasing outside Ontario, or outside Toronto specifically, should confirm the local rules that apply to their own transaction rather than assuming what applies in one province or city applies everywhere. The federal programs, such as the Home Buyers' Plan and the FHSA, apply consistently across Canada, but the provincial and municipal layer, including land transfer tax itself, is where the details genuinely change depending on where you're buying, which is another reason a local real estate lawyer and mortgage broker are worth involving early rather than relying on general information found online.",
      },
      {
        type: "h2",
        text: "Bringing the pieces together",
      },
      {
        type: "p",
        text: "None of these programs are mutually exclusive, and for many first-time buyers the real opportunity is in combining them thoughtfully: using an FHSA and the Home Buyers' Plan together to boost a down payment, timing a purchase to make the most of available land transfer tax rebates, and building a clean, well-documented file so a pre-approval reflects your strongest possible position. Because eligibility rules, limits, and thresholds for these programs can be adjusted by governments over time, the most reliable approach is to have a broker or advisor confirm the current details against your specific purchase before you rely on any of them in your budget.",
      },
    ],
    sources: [
      {
        href: "https://www.canada.ca/en/financial-consumer-agency/services/mortgages/preparing-mortgage.html",
        text: "Canada.ca — Preparing to get a mortgage",
      },
      {
        href: "https://www.canada.ca/en/financial-consumer-agency/services/mortgages/down-payment.html",
        text: "Canada.ca — Down payment requirements",
      },
      {
        href: "https://www.cmhc-schl.gc.ca/consumers/home-buying/mortgage-loan-insurance-for-consumers/what-is-mortgage-loan-insurance",
        text: "CMHC — Mortgage loan insurance",
      },
      {
        href: "https://www.fsrao.ca/consumers/mortgage-brokering/working-mortgage-professional",
        text: "FSRA — Working with a mortgage professional in Ontario",
      },
    ],
    faq: [
      {
        question: "Can I use the Home Buyers' Plan and the FHSA on the same purchase?",
        answer:
          "In general, both can be used toward the same qualifying first home purchase, though each has its own rules, limits, and eligibility conditions. Confirm the current rules with a tax professional before relying on both.",
      },
      {
        question: "Do I have to repay money I withdraw from an FHSA?",
        answer:
          "No. Unlike the RRSP Home Buyers' Plan, a qualifying withdrawal from a First Home Savings Account for a first home purchase does not need to be repaid.",
      },
      {
        question: "Does every municipality offer a land transfer tax rebate for first-time buyers?",
        answer:
          "No. Ontario offers a provincial rebate for eligible first-time buyers, and some municipalities, such as Toronto, add their own municipal land transfer tax with a separate rebate. Most municipalities do not levy an additional municipal tax at all.",
      },
    ],
  },
  {
    slug: "mortgage-renewal-guide",
    title: "Mortgage Renewal: How to Avoid Overpaying When Your Term Ends",
    metaDescription:
      "Your mortgage renewal letter isn't the final offer. Learn how to shop your renewal, compare switching costs, and avoid overpaying when your term matures.",
    excerpt:
      "The rate on your renewal letter is a starting point, not a final offer. Here's how to shop your renewal properly and avoid quietly overpaying for years.",
    category: "Renewal & Refinance",
    author: "Royal Den Capital Team",
    authorRole: "Licensed Mortgage Brokerage",
    datePublished: "2026-09-03",
    readTime: "7 min read",
    body: [
      {
        type: "p",
        text: "Every mortgage term eventually comes to an end, and when it does, your lender will send you a renewal letter with a proposed new rate and term. For a lot of homeowners, that letter feels like the final word: sign it, and move on with life. In reality, it's just an opening offer, and treating it as the only option available to you is one of the most common and most expensive mistakes Canadian homeowners make. A mortgage renewal is a genuine decision point, not a formality, and a little bit of shopping around at this stage can save thousands of dollars over the life of your next term.",
      },
      {
        type: "h2",
        text: "What actually happens at renewal",
      },
      {
        type: "p",
        text: "When your mortgage term matures, usually after a period of one to five years depending on what you originally chose, your existing agreement ends and you need a new one, either with your current lender or a different one. Unlike your original purchase, a straightforward renewal with your existing lender, where the loan amount and property don't change, is generally not subject to the same full stress test that applies to a new purchase or a lender switch, since it's treated as a continuation of your existing mortgage rather than a brand-new application. That said, your lender still sets a proposed rate for the new term, and that proposed rate is where the real negotiation begins.",
      },
      {
        type: "h2",
        text: "Why the first offer isn't necessarily the best one",
      },
      {
        type: "p",
        text: "Lenders count on inertia. Many homeowners simply sign whatever renewal rate shows up in the mail or their online banking portal because it feels easier than shopping around, and lenders price some of their renewal offers with that behaviour in mind. The rate offered to an existing customer at renewal is not automatically the lowest rate that lender is willing to give, and it's often noticeably higher than the rate a new customer might get walking in the door, or the rate you could get by asking your existing lender to match a competing offer. This doesn't mean every renewal letter is a bad deal, but it does mean you shouldn't assume it's the best deal available without checking.",
      },
      {
        type: "h2",
        text: "How far ahead to start shopping",
      },
      {
        type: "p",
        text: "A good rule of thumb is to start actively comparing options three to four months before your maturity date. Most lenders allow you to lock in a renewal rate in advance, and many will also honour a rate drop if rates fall further before your actual renewal date, so locking in early rarely costs you the ability to benefit from a better rate later. Starting early also gives you time to gather updated documents, address anything on your credit report, and properly compare offers instead of rushing a decision in the final days before your term matures, which is when homeowners are most likely to simply accept whatever is put in front of them.",
      },
      {
        type: "h2",
        text: "Switching lenders versus renewing in place",
      },
      {
        type: "p",
        text: "Switching your mortgage to a new lender at renewal is a legitimate, and sometimes very worthwhile, option, but it's not without cost or friction. A lender switch is typically treated as a new mortgage application, which usually means it is subject to the stress test, updated income and credit verification, and a new set of lender conditions, even though the property and loan amount may be staying the same. If your income, employment, or credit situation has changed since you last qualified, it's worth confirming with a broker that you'd still qualify with a new lender before assuming a switch is straightforward.",
      },
      {
        type: "h3",
        text: "Costs that can come with switching",
      },
      {
        type: "p",
        text: "Switching lenders can involve discharge fees from your current lender, legal fees to register the new mortgage, and sometimes an appraisal fee, depending on the new lender's requirements. Some lenders offer to cover certain switch-related costs as an incentive to win your business, which can make a switch effectively free from a cash-outlay perspective, but it's important to compare the full picture rather than just the advertised rate. A slightly lower rate that comes with several hundred dollars of fees you have to pay yourself might not actually beat a marginally higher rate at your existing lender with no switching costs at all, so the comparison needs to be done on total cost, not headline rate alone.",
      },
      {
        type: "h2",
        text: "How to actually compare renewal offers",
      },
      {
        type: "p",
        text: "Rate is the number everyone focuses on first, but it's only one piece of what makes a mortgage offer good or bad for your situation. Prepayment privileges, meaning how much extra principal you're allowed to pay down each year without penalty, can matter a lot if you expect a bonus, inheritance, or simply plan to make extra payments. Portability, which is whether you can transfer your mortgage to a new property if you move during the term without breaking it and paying a penalty, matters if there's any chance you'll sell before the term ends. And the penalty structure itself, meaning what you'd owe if you needed to break the mortgage early for any reason, is worth understanding up front rather than discovering it only when you actually need to break the term.",
      },
      {
        type: "ul",
        items: [
          "Compare the actual rate, not just the discount being advertised off a posted rate.",
          "Check prepayment privileges: how much extra principal can you pay down annually without penalty.",
          "Confirm portability if there's any chance you'll move before the new term ends.",
          "Understand the penalty calculation method before you need it, not after.",
          "Ask whether the new lender or your existing lender will cover any switching costs.",
        ],
      },
      {
        type: "h2",
        text: "What changes if your situation has changed",
      },
      {
        type: "p",
        text: "A renewal is also a natural moment to reassess your broader mortgage strategy, not just the rate. If your income has grown, you may want to explore shortening your amortization to pay off the mortgage faster, or increasing your payment frequency to save on interest over time. If your household has taken on new debt, changed employment, or if your credit has been affected by anything since your last mortgage was arranged, it's worth having an honest conversation with a broker about how that might affect your options with a new lender, so there are no surprises partway through a switch application. Renewal is also a reasonable point to consider whether a refinance to consolidate higher-interest debt or access equity for a specific purpose makes sense, since you're already reassessing your mortgage structure anyway.",
      },
      {
        type: "h3",
        text: "Blend-and-extend as an alternative to waiting",
      },
      {
        type: "p",
        text: "If rates have dropped since you arranged your current mortgage but your term isn't up yet, some lenders will offer a blend-and-extend option instead of making you wait until maturity or pay a full penalty to break your term. This typically combines your existing rate with the lender's current rate, weighted by how much time is left on your term versus the new term being added, resulting in a blended rate that's lower than your original rate without the cost of fully breaking the mortgage. It's not available from every lender and the math is worth having a broker confirm against a straightforward wait-and-renew approach, but it's a useful option to at least ask about if you're watching rates fall while you're still mid-term.",
      },
      {
        type: "h2",
        text: "Preparing for a renewal conversation",
      },
      {
        type: "p",
        text: "Even though a straightforward renewal doesn't require the full document package of a new purchase, showing up to a renewal comparison with your current mortgage statement, a recent property tax bill, and a general sense of your current income and any changes to your debts will help a broker give you an accurate comparison much faster. It's also worth pulling your own credit report before you start shopping, since your credit standing affects the rates and terms lenders are willing to offer, and it's far better to spot and address an error or an issue on your report before a lender does, rather than being surprised by it partway through a switch application.",
      },
      {
        type: "h2",
        text: "Making the most of your renewal window",
      },
      {
        type: "p",
        text: "The single most effective thing you can do at renewal is simply not treat the letter from your existing lender as your only option. Getting a comparison from a broker who can check multiple lenders costs you nothing and takes a fraction of the time it took to originally buy your home, and it puts you in a position to either confirm your current lender's offer is genuinely competitive or find something better. Given how much interest accumulates over a multi-year term, even a modest improvement in rate or terms at renewal can be worth a meaningful amount of money by the time your next renewal comes around.",
      },
    ],
    sources: [
      {
        href: "https://www.canada.ca/en/financial-consumer-agency/services/mortgages/renew-mortgage.html",
        text: "Canada.ca — Renewing your mortgage",
      },
      {
        href: "https://www.canada.ca/en/financial-consumer-agency/services/mortgages/choose-mortgage.html",
        text: "Canada.ca — Choosing a mortgage",
      },
      {
        href: "https://www.osfi-bsif.gc.ca/en/supervision/financial-institutions/banks/minimum-qualifying-rate-uninsured-mortgages",
        text: "OSFI — Minimum qualifying rate for uninsured mortgages",
      },
    ],
    faq: [
      {
        question: "Does the stress test apply when I renew my mortgage?",
        answer:
          "If you renew with your existing lender without changing the loan amount, the stress test generally does not apply. If you switch to a new lender at renewal, it's typically treated as a new application and the stress test usually applies.",
      },
      {
        question: "How early should I start comparing renewal offers?",
        answer:
          "Around three to four months before your maturity date is a reasonable window. It gives you time to compare lenders, lock in a rate, and still benefit if rates drop further before your term actually matures.",
      },
      {
        question: "Is switching lenders at renewal always worth the fees?",
        answer:
          "Not always. It depends on the rate difference, any fees involved, and whether the new lender covers switching costs. Comparing total cost over the term, not just the headline rate, is the right way to decide.",
      },
    ],
  },
  {
    slug: "fixed-vs-variable-mortgage-rates",
    title: "Fixed vs. Variable Mortgage Rates: How to Choose",
    metaDescription:
      "Fixed or variable mortgage rate? Here's how each works, how the Bank of Canada policy rate affects variable rates, and a framework for choosing.",
    excerpt:
      "Fixed and variable rates solve different problems: one buys certainty, the other bets on the future cost of borrowing. Here's a framework for deciding which fits you.",
    category: "Rate Strategy",
    author: "Royal Den Capital Team",
    authorRole: "Licensed Mortgage Brokerage",
    datePublished: "2026-09-10",
    readTime: "6 min read",
    body: [
      {
        type: "p",
        text: "Of all the decisions you'll make when arranging a mortgage, choosing between a fixed and a variable rate tends to generate the most debate, and for good reason: it's a genuine trade-off between certainty and flexibility, with real money on either side depending on how rates move over your term. There's no universally correct answer, despite what confident opinions online might suggest. The right choice depends on your own finances, your tolerance for payment changes, and how long you expect to hold the mortgage, not on which option happened to perform better for someone else in a different rate environment.",
      },
      {
        type: "h2",
        text: "How a fixed rate works",
      },
      {
        type: "p",
        text: "With a fixed-rate mortgage, your interest rate is locked in for the entire term, whether that's one year or five, and your regular payment amount stays the same for that whole period, provided your payment frequency doesn't change. This gives you complete predictability: you know exactly what your mortgage payment will be every month for the length of the term, which makes budgeting straightforward and removes any anxiety about rates moving against you during that window. The trade-off is that if rates fall significantly after you lock in, you don't benefit from that decrease until your term ends and you renew, unless you're willing to break your mortgage early and pay a penalty to do so.",
      },
      {
        type: "h2",
        text: "How a variable rate works",
      },
      {
        type: "p",
        text: "A variable-rate mortgage has an interest rate that moves in line with the lender's prime rate, which itself generally moves in response to changes in the Bank of Canada's overnight policy rate. Depending on the specific product, a change in the underlying rate can show up in one of two ways: either your payment amount itself changes up or down to reflect the new rate, or your payment stays fixed while the portion of each payment going toward interest versus principal shifts, meaning more of your payment goes to interest when rates rise and more goes to principal when rates fall. It's important to know which version of variable your specific product uses, since the practical impact on your monthly budget is quite different between the two.",
      },
      {
        type: "h3",
        text: "The historical trade-off in plain terms",
      },
      {
        type: "p",
        text: "Over long stretches of history, variable rates have often, though not always, worked out to be less expensive over the life of a mortgage than locking into a fixed rate at the same point in time, largely because variable rates tend to start lower and rates spend more time moving gradually than moving sharply. That said, this is a general historical pattern, not a guarantee, and there have been periods where rates rose meaningfully during a variable-rate term, increasing either payments or the interest portion of payments for borrowers who had chosen that route. Anyone considering a variable rate should plan around the possibility of an increase, not just the possibility of savings, since the whole point of the product is that the rate genuinely can move in either direction.",
      },
      {
        type: "h2",
        text: "How the Bank of Canada's policy rate fits in",
      },
      {
        type: "p",
        text: "The Bank of Canada sets a policy interest rate, often called the overnight rate, as part of its mandate to manage inflation and support the broader economy. When the Bank of Canada raises or lowers this rate, commercial lenders generally adjust their own prime rate in the same direction within a short period, and since variable mortgage rates are set relative to prime, this is the mechanism that ultimately moves your variable rate. Fixed mortgage rates are influenced by a different, though related, set of factors, largely tied to bond market yields and lenders' expectations about where rates are headed over the specific term length being offered, which is why fixed and variable rates don't always move in perfect lockstep with each other.",
      },
      {
        type: "h2",
        text: "Who tends to prefer which option",
      },
      {
        type: "p",
        text: "Homeowners who value predictability above all else, who are on a tight household budget with little room to absorb a higher payment, or who simply find the idea of a fluctuating rate stressful, often lean toward fixed-rate mortgages, and there's nothing wrong with prioritizing peace of mind over a potential savings advantage. On the other hand, borrowers with more flexibility in their budget, a longer time horizon, or a higher tolerance for uncertainty in exchange for potentially lower overall interest costs, sometimes lean toward variable rates. Neither group is right or wrong; they're simply weighing the same trade-off differently based on their own circumstances.",
      },
      {
        type: "h2",
        text: "Hybrid and combination options",
      },
      {
        type: "p",
        text: "Some lenders offer hybrid or combination mortgages that split your loan into two portions, one at a fixed rate and one at a variable rate, each amortized separately but paid together. This can appeal to borrowers who want some of the certainty of a fixed rate alongside some of the potential upside of a variable rate, without having to choose entirely one way or the other. These products add a layer of complexity, since you're effectively managing two mortgage components instead of one, so it's worth having a broker walk through exactly how the split works, how each portion renews, and what happens if you need to break the mortgage early, before deciding a hybrid structure is the right fit.",
      },
      {
        type: "h3",
        text: "Breaking a mortgage early: penalty differences",
      },
      {
        type: "p",
        text: "Rate type also affects what happens if you need to break your mortgage before the term ends, whether because you're selling, refinancing with a different lender, or simply want to take advantage of a much lower rate elsewhere. Variable-rate mortgages generally use a simpler penalty calculation, commonly a set number of months of interest, which tends to be more predictable and, in many cases, smaller than the alternative. Fixed-rate mortgages typically use the greater of that same months-of-interest calculation or an interest rate differential, sometimes called an IRD, which compares your existing rate to the lender's current rate for a similar remaining term and can produce a significantly larger penalty, particularly if rates have dropped since you signed your fixed-rate contract. This is a real, practical difference that's easy to overlook when comparing fixed and variable purely on their advertised rates, and it's worth asking any lender directly how their specific penalty is calculated before you sign, especially if there's a reasonable chance you might need to break the mortgage during the term.",
      },
      {
        type: "h2",
        text: "A framework for making the decision",
      },
      {
        type: "p",
        text: "Rather than trying to predict where interest rates are headed, which is genuinely difficult even for professional economists, it's more productive to base your decision on your own risk tolerance and financial situation. Start by asking how your monthly budget would handle a meaningful increase in your payment or in the interest portion of your payment; if the honest answer is 'not well,' that's a strong signal toward a fixed rate regardless of what rates might do. Next, consider how long you expect to keep this specific mortgage, since a shorter time horizon reduces your exposure to rate movement either way. Finally, think about how much mental bandwidth you want to spend thinking about interest rates during your term; if you'd rather set it and not think about it again until renewal, fixed offers that peace of mind directly.",
      },
      {
        type: "ul",
        items: [
          "If a higher payment would strain your budget, a fixed rate removes that risk entirely.",
          "If you have flexibility to absorb a payment increase, a variable rate keeps more options open.",
          "A shorter expected time horizon in the home reduces your exposure either way.",
          "A hybrid or combination mortgage can split the difference, at the cost of added complexity.",
          "Neither option is inherently 'smarter'; the right one depends on your own numbers and comfort level.",
        ],
      },
      {
        type: "p",
        text: "Whichever way you lean, the most useful step before committing is running both scenarios against your actual budget with real numbers, rather than deciding based on a general feeling about where rates might go. A broker can show you what your payment looks like under a fixed rate versus a variable rate today, and can also walk through what a plausible rate increase would do to a variable payment, so you're choosing with a clear picture of both outcomes rather than a guess.",
      },
    ],
    sources: [
      {
        href: "https://www.canada.ca/en/financial-consumer-agency/services/mortgages/choose-mortgage.html",
        text: "Canada.ca — Choosing a mortgage",
      },
      {
        href: "https://www.canada.ca/en/financial-consumer-agency/services/mortgages/preparing-mortgage.html",
        text: "Canada.ca — Preparing to get a mortgage",
      },
      {
        href: "https://www.osfi-bsif.gc.ca/en/supervision/financial-institutions/banks/minimum-qualifying-rate-uninsured-mortgages",
        text: "OSFI — Minimum qualifying rate for uninsured mortgages",
      },
    ],
    faq: [
      {
        question: "Is a variable rate always cheaper than a fixed rate?",
        answer:
          "Not always, though it has often worked out that way historically over full mortgage terms. Variable rates can move higher during your term, so the outcome depends on how rates actually behave, not just on historical averages.",
      },
      {
        question: "Does the Bank of Canada set my mortgage rate directly?",
        answer:
          "No. The Bank of Canada sets a policy rate that influences lenders' prime rate, which in turn affects variable mortgage rates. Fixed rates are influenced more by bond market conditions than by the policy rate directly.",
      },
      {
        question: "Can I switch from variable to fixed partway through my term?",
        answer:
          "Many variable-rate mortgages allow you to convert to a fixed rate during the term, though the rate you'd get and any conditions depend on your lender and product. Ask about this option before choosing your mortgage.",
      },
    ],
  },
  {
    slug: "heloc-vs-refinance",
    title: "HELOC vs. Refinance: Which Is Right for Accessing Home Equity",
    metaDescription:
      "HELOC or refinance to access home equity? Compare how each works, qualification differences, and which fits renovations, debt consolidation, or investing.",
    excerpt:
      "A HELOC and a refinance both unlock equity in your home, but they work very differently. Here's how to decide which one actually fits your goal.",
    category: "Home Equity",
    author: "Royal Den Capital Team",
    authorRole: "Licensed Mortgage Brokerage",
    datePublished: "2026-09-17",
    readTime: "6 min read",
    body: [
      {
        type: "p",
        text: "If you've built up equity in your home, meaning the property is worth more than what you still owe on your mortgage, you have options for putting that equity to work, whether that's funding a renovation, consolidating higher-interest debt, or covering a major expense. Two of the most common tools for accessing home equity are a home equity line of credit, or HELOC, and a refinance that includes an equity takeout. They can accomplish similar goals, but they work in fundamentally different ways, and picking the wrong one for your situation can end up costing you more than necessary or leaving you with less flexibility than you wanted.",
      },
      {
        type: "h2",
        text: "How a HELOC works",
      },
      {
        type: "p",
        text: "A home equity line of credit is a revolving credit facility secured against your home, similar in structure to a credit card but with a much larger limit and a much lower interest rate, because your property backs the debt. You're approved for a maximum credit limit based on your available equity, and you can draw on it, pay it back, and draw on it again, as many times as you like, up to that limit, for as long as the HELOC remains open. Interest is generally charged only on the amount you've actually drawn, not on your full available limit, and many HELOCs allow interest-only payments, meaning your minimum required payment can be just the interest owed for that period, with principal repayment left up to you.",
      },
      {
        type: "p",
        text: "HELOC rates are typically variable, moving with the lender's prime rate, which means your interest cost can rise or fall over time depending on broader rate conditions. Because a HELOC is a line of credit rather than a fixed loan, it's particularly well suited to expenses that happen in stages or that you can't fully predict up front, like a renovation with a rolling series of contractor payments, or as a standing emergency fund that you only pay interest on if you actually use it.",
      },
      {
        type: "h2",
        text: "How a refinance with equity takeout works",
      },
      {
        type: "p",
        text: "A refinance, by contrast, replaces your existing mortgage entirely with a new one, typically at a new rate and sometimes a new amortization, and can include taking out additional funds beyond what you currently owe, up to the equity available in your home and subject to standard qualification limits. Unlike a HELOC, a refinance gives you the additional funds as a single lump sum at closing, and that amount is rolled into your regular mortgage, repaid through fixed principal-and-interest payments over your amortization period, the same way your original mortgage was. There's no ongoing ability to redraw funds the way there is with a HELOC; once the funds are advanced, the refinance behaves exactly like a standard mortgage from that point forward.",
      },
      {
        type: "p",
        text: "Because a refinance replaces your existing mortgage, it also means your entire loan, not just the new funds, is subject to whatever rate you negotiate on the new mortgage. If your current mortgage has a lower rate than what's currently available, refinancing the whole balance to access a relatively small amount of additional equity might mean paying a higher rate on your entire loan, not just the new portion, which is an important cost to weigh against the convenience of a single combined payment.",
      },
      {
        type: "h2",
        text: "Comparing the two for common goals",
      },
      {
        type: "h3",
        text: "Renovations",
      },
      {
        type: "p",
        text: "For renovations, a HELOC's draw-as-needed structure is often a natural fit, since contractor payments tend to happen in stages rather than all at once, and paying interest only on funds you've actually drawn can reduce carrying costs compared to borrowing the full renovation budget up front through a refinance. That said, if you have a clearly defined renovation budget and prefer the predictability of fixed payments over the life of the project, folding the funds into a refinance at a fixed rate is a completely reasonable alternative, particularly if current rates are attractive relative to your existing mortgage.",
      },
      {
        type: "h3",
        text: "Debt consolidation",
      },
      {
        type: "p",
        text: "Using home equity to pay off higher-interest debt, such as credit cards or unsecured lines of credit, can meaningfully reduce your total interest costs, since mortgage-secured borrowing rates are typically far lower than unsecured consumer debt rates. A refinance is often preferred here because it converts the consolidated debt into a fixed, amortizing payment with a clear payoff date, which can help borrowers who struggled with revolving debt in the first place avoid simply refilling a line of credit once it's paid down. A HELOC can also be used for consolidation, but because it remains revolving credit, it requires more discipline to actually pay down rather than treating the newly freed-up limit as available spending power again.",
      },
      {
        type: "h3",
        text: "Investment purposes",
      },
      {
        type: "p",
        text: "Some homeowners use home equity to fund an investment property down payment or other investment opportunities, and here the flexibility of a HELOC is often valuable, since real estate and investment opportunities don't always arrive on a predictable schedule, and having standing access to funds without needing to requalify each time can be a real advantage. This use case carries more risk than renovations or debt consolidation, since you're borrowing against your home to invest elsewhere, so it deserves a more careful conversation about your risk tolerance and overall financial plan before proceeding.",
      },
      {
        type: "h2",
        text: "Readvanceable mortgages: combining the two",
      },
      {
        type: "p",
        text: "Some lenders offer a readvanceable mortgage, which pairs a standard amortizing mortgage with a HELOC on the same property, structured so that as you pay down the mortgage principal, the available credit limit on the attached HELOC automatically increases by roughly the same amount. This gives homeowners ongoing access to their growing equity without needing to apply for a new HELOC or refinance every time they want to tap into it, which can be convenient for borrowers who expect to use home equity repeatedly over time, for example to fund a series of investment purchases or ongoing renovation projects. It's a more advanced structure than a standalone HELOC or refinance, and it's worth understanding the combined loan-to-value limits and how the two components interact before choosing it over a simpler product.",
      },
      {
        type: "p",
        text: "Whichever structure you use, it's worth pausing to consider the basic risk involved in borrowing against your home in the first place: both a HELOC and a refinance increase your total secured debt and reduce the equity cushion you have if property values were to soften or your income situation were to change. This doesn't mean either product is a bad idea, home equity is one of the more affordable ways to borrow precisely because it's secured, but it does mean the decision deserves the same seriousness as your original mortgage, including an honest look at whether you have a realistic repayment plan for the funds you're taking out, not just a plan for how you'll spend them.",
      },
      {
        type: "h2",
        text: "Qualification differences",
      },
      {
        type: "p",
        text: "Both a HELOC and a refinance require you to qualify, including passing the relevant stress test at federally regulated lenders, based on your income, debts, and credit. HELOCs are typically capped at a lower percentage of your home's value than a full refinance can reach, since lenders view revolving, interest-only-eligible credit as carrying somewhat more risk than a fully amortizing loan. Because both products involve borrowing against your home, neither is a decision to make casually; both increase your total secured debt and reduce your equity cushion, so it's worth being honest with yourself about whether the underlying purpose for the funds justifies taking on more debt against your largest asset.",
      },
      {
        type: "ul",
        items: [
          "Choose a HELOC when your expense happens in stages or is hard to predict, and you want to pay interest only on what you draw.",
          "Choose a refinance when you want a lump sum, fixed payments, and a clear payoff timeline.",
          "For debt consolidation, a refinance's fixed structure often supports better follow-through than revolving credit.",
          "For investment purposes, a HELOC's standing availability can be valuable, but carries added risk worth discussing carefully.",
        ],
      },
      {
        type: "h2",
        text: "Choosing between them",
      },
      {
        type: "p",
        text: "The right choice comes down to how predictable your funding need is, how disciplined you are with revolving credit, and how your current mortgage rate compares to what's available today. A broker can model both scenarios side by side using your actual numbers, including what a HELOC's interest-only payment would look like versus a refinance's fully amortizing payment, so you're comparing real costs rather than guessing which structure sounds better in theory.",
      },
    ],
    sources: [
      {
        href: "https://www.canada.ca/en/financial-consumer-agency/services/mortgages/choose-mortgage.html",
        text: "Canada.ca — Choosing a mortgage",
      },
      {
        href: "https://www.canada.ca/en/financial-consumer-agency/services/mortgages/down-payment.html",
        text: "Canada.ca — Down payment requirements",
      },
      {
        href: "https://www.osfi-bsif.gc.ca/en/supervision/financial-institutions/banks/minimum-qualifying-rate-uninsured-mortgages",
        text: "OSFI — Minimum qualifying rate for uninsured mortgages",
      },
    ],
    faq: [
      {
        question: "Do I need to requalify every time I draw on a HELOC?",
        answer:
          "No. Once a HELOC is approved and set up, you can generally draw and repay funds up to your credit limit without requalifying each time, unlike a refinance, which is a new qualification event.",
      },
      {
        question: "Is a HELOC riskier than a refinance?",
        answer:
          "Not inherently riskier, but it works differently: HELOC rates are typically variable and interest-only payments are often allowed, which means the balance may not shrink unless you actively pay down principal, so it requires more discipline.",
      },
      {
        question: "Can I have both a mortgage and a HELOC on the same property?",
        answer:
          "Yes, many homeowners hold a traditional mortgage and a HELOC secured against the same property at the same time, provided their combined borrowing stays within the lender's maximum loan-to-value limits.",
      },
    ],
  },
  {
    slug: "self-employed-mortgage-guide",
    title: "Self-Employed Mortgage Guide: How to Qualify in Canada",
    metaDescription:
      "How self-employed borrowers qualify for a mortgage in Canada: income averaging, add-backs, stated-income options, required documents, and tips to qualify.",
    excerpt:
      "Self-employed income is real income, but lenders assess it differently. Here's how qualification actually works, and how to put your strongest file forward.",
    category: "Self-Employed",
    author: "Royal Den Capital Team",
    authorRole: "Licensed Mortgage Brokerage",
    datePublished: "2026-09-22",
    readTime: "6 min read",
    body: [
      {
        type: "p",
        text: "Being self-employed shouldn't disqualify you from getting a competitive mortgage, but it does change how a lender evaluates your income, and understanding that difference before you apply can save you a lot of frustration. Employees typically show a lender a T4 and a couple of pay stubs and the income conversation is largely settled. Self-employed borrowers, whether operating as a sole proprietor, through a corporation, or as a contractor, generally need to demonstrate income in a way that accounts for the fact that their reported taxable income and their actual cash flow don't always match, largely because of legitimate business deductions that lower taxable income on paper.",
      },
      {
        type: "h2",
        text: "How lenders typically assess self-employed income",
      },
      {
        type: "p",
        text: "Most traditional lenders look at your line 150 income, or net income, from your two most recent years of Notices of Assessment, and typically average the two years together to arrive at a qualifying income figure. If your business income has grown year over year, this averaging approach can understate your current earning power, since it blends a stronger recent year with an older, weaker one. If your income has declined, the average may not fully reflect the lower figure either, so it's worth understanding exactly how a specific lender calculates the average before assuming you know your qualifying number.",
      },
      {
        type: "h2",
        text: "Add-backs and why they matter",
      },
      {
        type: "p",
        text: "Because self-employed individuals often deduct legitimate business expenses that reduce their taxable income without reducing their actual cash available to service a mortgage, some lenders allow certain non-cash or one-time deductions to be added back to your reported income for qualification purposes. Common examples can include things like a portion of vehicle expenses claimed for business use, or certain one-time business costs that won't recur. Add-back policies vary significantly from lender to lender, and not every lender offers them at all, which is one of the clearest examples of why shopping a self-employed file across multiple lenders, rather than applying with just one, can make a meaningful difference to your approved amount.",
      },
      {
        type: "h2",
        text: "Stated-income and alternative lender programs",
      },
      {
        type: "p",
        text: "For business owners who are newer to self-employment, whose two-year averaged income doesn't reflect their true earning capacity, or whose tax filings are structured in a way that makes traditional income verification difficult, some lenders offer stated-income or alternative documentation programs. These programs generally rely less on line 150 figures and more on other evidence of cash flow, such as business bank statements, GST filings, or an accountant's letter confirming reasonable income for the business and industry. These programs typically require mortgage loan insurance eligibility rules of their own, a larger down payment, and often come with a modestly higher interest rate than a fully documented, traditionally qualified mortgage, reflecting the additional risk the lender is taking on by relying on less conventional verification.",
      },
      {
        type: "h2",
        text: "The down payment and rate trade-off",
      },
      {
        type: "p",
        text: "It's common for self-employed borrowers, particularly those using a stated-income or alternative program, to face a choice between putting down a larger down payment to access better rate options, or accepting a somewhat higher rate in exchange for a smaller down payment or more flexible income documentation. Neither path is universally better; it depends on how much cash you have available, how much of a rate premium you'd be paying, and how long you expect to hold the mortgage before your situation strengthens enough to qualify for more conventional terms at a future renewal or refinance.",
      },
      {
        type: "h2",
        text: "Documentation checklist for self-employed borrowers",
      },
      {
        type: "p",
        text: "Because self-employed files generally require more documentation than an employee's file, it pays to gather everything in advance rather than scrambling once you've found a property and are working against a financing deadline. A well-prepared self-employed file typically includes recent Notices of Assessment, complete T1 General tax returns for at least the past two years, business financial statements if you operate through a corporation, recent GST or HST filing confirmations showing the business is in good standing, and business bank statements covering a recent period to demonstrate consistent cash flow.",
      },
      {
        type: "ul",
        items: [
          "Two years of Notices of Assessment (and proof of any amounts owing paid in full).",
          "Complete T1 General tax returns for the past two years, all pages.",
          "Business financial statements, or a letter from your accountant, for incorporated businesses.",
          "Recent GST/HST filing confirmations showing the business is registered and in good standing.",
          "Business and personal bank statements covering a recent period, typically several months.",
          "Articles of incorporation or business licence, and confirmation of your ownership percentage.",
        ],
      },
      {
        type: "h2",
        text: "Tips to strengthen a self-employed mortgage file",
      },
      {
        type: "p",
        text: "A few practical habits go a long way toward making a self-employed file look as strong as possible to a lender. Keeping business and personal finances clearly separated, ideally through a dedicated business bank account, makes it much easier for a lender or broker to demonstrate consistent income patterns. Working with an accountant who understands that you may need to qualify for a mortgage in the near future can also help, since there's sometimes a trade-off between minimizing taxable income for tax purposes and maximizing reported income for mortgage qualification purposes, and it's worth having that conversation with your accountant before tax season rather than after.",
      },
      {
        type: "p",
        text: "Keeping GST or HST filings and any business debts current is another detail that matters more than many self-employed borrowers expect, since outstanding tax balances or a lapsed GST filing status can complicate or delay an approval even when your actual income supports the mortgage you're applying for. Finally, maintaining a track record of at least two years of self-employment income, where possible, opens up access to a wider range of lenders and programs than being in your first year of business, so if you can time a purchase to fall after you've filed a second year of returns, it's often worth the wait from a financing standpoint.",
      },
      {
        type: "h2",
        text: "Corporations versus sole proprietorships",
      },
      {
        type: "p",
        text: "How your business is structured also affects how a lender reviews your file. A sole proprietor's business income flows directly onto their personal tax return, which is generally more straightforward for a lender to review, since the line 150 figure on your Notice of Assessment already reflects your business results. An incorporated business owner, by contrast, may pay themselves a mix of salary and dividends, or may leave income inside the corporation rather than paying it out personally to manage overall tax, which means a lender may need to look beyond your personal Notice of Assessment to the corporation's own financial statements to get a full picture of the business's health and your access to its income. Neither structure is better or worse for mortgage qualification in general, but each requires a somewhat different documentation approach, so it helps to flag your business structure early when speaking with a broker.",
      },
      {
        type: "h3",
        text: "If your most recent year was weaker",
      },
      {
        type: "p",
        text: "Business income naturally fluctuates, and a single weaker year, whether due to a slow season, a one-time business investment, or broader economic conditions, doesn't have to derail a mortgage application. Because most traditional lenders average two years of income, a weaker recent year is partially offset by a stronger prior year in the calculation, though it will still pull your average down somewhat. If you can reasonably explain a weaker year, for example a documented one-time expense or an investment in the business that reduced net income but didn't reduce actual cash flow, a broker can sometimes present that context to a lender or identify a lender whose add-back policy accounts for exactly that kind of situation, rather than simply accepting a lower qualifying number at face value.",
      },
      {
        type: "h2",
        text: "Working with a broker on a self-employed file",
      },
      {
        type: "p",
        text: "Because self-employed income assessment varies so much from one lender to the next, working with a broker who regularly places self-employed files is often the single biggest advantage available to you. A broker can identify which lenders offer favourable add-back policies for your specific type of business, which stated-income programs might fit if your averaged income understates your real earnings, and how to package your documentation so the underwriter sees the strongest, most accurate picture of your finances from the very first submission, rather than having to go back and forth requesting additional information.",
      },
    ],
    sources: [
      {
        href: "https://www.canada.ca/en/financial-consumer-agency/services/mortgages/preparing-mortgage.html",
        text: "Canada.ca — Preparing to get a mortgage",
      },
      {
        href: "https://www.cmhc-schl.gc.ca/consumers/home-buying/mortgage-loan-insurance-for-consumers/what-is-mortgage-loan-insurance",
        text: "CMHC — Mortgage loan insurance",
      },
      {
        href: "https://www.fsrao.ca/consumers/mortgage-brokering/working-mortgage-professional",
        text: "FSRA — Working with a mortgage professional in Ontario",
      },
    ],
    faq: [
      {
        question: "How do lenders calculate income for self-employed borrowers?",
        answer:
          "Most lenders average your net income (line 150) from your two most recent Notices of Assessment. Some lenders allow certain add-backs for non-cash or one-time business deductions, which can increase your qualifying income.",
      },
      {
        question: "Can I get a mortgage if I've only been self-employed for one year?",
        answer:
          "It's possible through stated-income or alternative lender programs, though these often require a larger down payment and may come with a higher rate than a fully documented, traditionally qualified mortgage.",
      },
      {
        question: "Does keeping GST filings current really affect my mortgage approval?",
        answer:
          "Yes, it can. Outstanding tax balances or a lapsed GST/HST filing status can raise questions during underwriting and delay or complicate your approval, even when your income otherwise supports the mortgage.",
      },
    ],
  },
  {
    slug: "newcomer-mortgage-guide-canada",
    title: "New to Canada? A Newcomer's Guide to Getting a Mortgage",
    metaDescription:
      "How newcomers to Canada can qualify for a mortgage with limited Canadian credit history, typical down payment expectations, and how a broker can help.",
    excerpt:
      "Limited Canadian credit history doesn't mean you can't get a mortgage. Here's how newcomer programs work, what documentation helps, and what to expect.",
    category: "Newcomers",
    author: "Royal Den Capital Team",
    authorRole: "Licensed Mortgage Brokerage",
    datePublished: "2026-09-25",
    readTime: "6 min read",
    body: [
      {
        type: "p",
        text: "Moving to a new country is a significant undertaking on its own, and figuring out how to buy a home once you've arrived adds another layer of complexity, particularly because Canadian lenders rely heavily on Canadian credit history to assess risk, and that's exactly the thing a newcomer usually doesn't have yet. The good news is that Canadian lenders are well aware that skilled, financially responsible people arrive in the country every year without a Canadian credit file, and a range of newcomer-specific mortgage programs and underwriting approaches exist specifically to bridge that gap.",
      },
      {
        type: "h2",
        text: "Why Canadian credit history matters so much",
      },
      {
        type: "p",
        text: "Canadian lenders typically rely on a credit score and credit history from Canadian credit bureaus to gauge how reliably a borrower repays debt, since it's one of the most consistent predictors available to them. A newcomer who has never held a Canadian credit card, loan, or line of credit simply won't have a score yet, through no fault of their own, and a thin or non-existent Canadian credit file can look, on paper, similar to a file with a genuinely weak credit history, even though the underlying situation is completely different. Newcomer mortgage programs exist precisely to help lenders distinguish between the two.",
      },
      {
        type: "h2",
        text: "How newcomer mortgage programs work",
      },
      {
        type: "p",
        text: "A number of lenders in Canada offer newcomer or 'new to Canada' mortgage programs that are specifically designed to qualify borrowers using alternative evidence of creditworthiness rather than requiring a fully built Canadian credit history. These programs generally look at how recently you arrived in Canada, since most have a window, often measured in years since landing, during which you remain eligible for newcomer-specific underwriting. They also tend to focus more heavily on stable, verifiable employment income and a solid down payment as offsetting factors for the lack of a Canadian credit score, rather than treating the absence of Canadian credit history as a red flag on its own.",
      },
      {
        type: "h2",
        text: "Alternative credit history documentation",
      },
      {
        type: "p",
        text: "Since a Canadian credit bureau file may not exist yet, lenders participating in newcomer programs often accept alternative documentation to demonstrate financial responsibility. An international credit report or reference letter from a bank in your country of origin, showing a history of credit accounts in good standing, can carry real weight with some lenders. Closer to home, a consistent record of on-time rent payments, ideally documented through bank statements or a letter from a landlord or property manager, and a track record of on-time utility bill payments, can also help build a picture of reliability even without a formal Canadian credit score.",
      },
      {
        type: "p",
        text: "Building at least some Canadian credit history as early as possible after arriving is still worth doing in parallel, even if you plan to use a newcomer program for your first mortgage. Opening a Canadian bank account, obtaining a secured or newcomer-specific credit card, and using it responsibly for a few months can start to establish a track record that broadens your lender options and may improve your terms, even on a newcomer application, and will certainly help when it comes time to renew or refinance down the road.",
      },
      {
        type: "h2",
        text: "Typical down payment expectations for newcomers",
      },
      {
        type: "p",
        text: "Down payment requirements for newcomers generally follow the same tiered rules that apply to any Canadian buyer, based on purchase price, but newcomer programs sometimes carry their own minimum down payment expectations on top of those standard tiers, particularly for borrowers with very limited Canadian credit history or income documentation. It's common for newcomer programs to expect a somewhat larger down payment than the bare minimum, both to reduce the lender's risk and to demonstrate the borrower's own financial discipline and savings ability, though the exact expectation varies meaningfully by lender and by how much alternative documentation the borrower can provide.",
      },
      {
        type: "h3",
        text: "What credit unions and alternative lenders can offer",
      },
      {
        type: "p",
        text: "Beyond the major banks, some credit unions and alternative lenders are also worth considering for a newcomer file, since they sometimes apply more flexible underwriting to borrowers with a strong income and down payment but a thin Canadian credit history. Because credit unions are often provincially regulated rather than federally regulated, their specific qualification approach, including whether the standard stress test applies, can differ from a bank's, which is another reason it's worth having a broker compare across lender types rather than assuming the big banks are your only option as a newcomer.",
      },
      {
        type: "h2",
        text: "Permanent residents versus work permit holders",
      },
      {
        type: "p",
        text: "Your immigration status affects which lenders and programs are available to you. Permanent residents are generally treated most similarly to Canadian citizens for mortgage purposes, with the broadest range of lender options, including many standard newcomer programs. Non-permanent residents, such as those on a valid work permit, can often still qualify for a mortgage, but typically face a more limited set of lenders willing to work with their status, may need a larger down payment, and should expect closer scrutiny of the validity, remaining duration, and renewability of their work permit as part of the application. It's worth having this conversation with a broker early, since it directly shapes which lenders are even worth approaching.",
      },
      {
        type: "ul",
        items: [
          "Confirm how recently you landed in Canada, since most newcomer programs have an eligibility window.",
          "Gather international credit references or bank letters from your country of origin if available.",
          "Document rent and utility payment history through bank statements or a landlord letter.",
          "Open a Canadian bank account and start building local credit history as early as possible.",
          "Clarify how your immigration status (permanent resident vs. work permit) affects your lender options.",
        ],
      },
      {
        type: "h2",
        text: "Getting pre-approved before you start house hunting",
      },
      {
        type: "p",
        text: "For newcomers even more than for most buyers, a real pre-approval before you start touring homes is worth the extra effort, because it tells you up front which lenders are actually willing to work with your specific immigration status, arrival date, and documentation, rather than finding out partway through a firm purchase offer that a particular lender isn't a fit. A pre-approval process for a newcomer file often takes a little longer than a standard one, simply because there's more alternative documentation to gather and review, so starting early gives you room to collect international credit references, employment confirmation, and immigration documents without being rushed by a closing deadline on a specific property.",
      },
      {
        type: "h2",
        text: "Using a co-signer or family support",
      },
      {
        type: "p",
        text: "Some newcomers strengthen their application by adding a co-signer, often a family member who is already a Canadian citizen or permanent resident with an established credit history and income. A co-signer's income and credit history are considered alongside your own, which can help offset a limited Canadian credit file or a shorter employment history in Canada, and can sometimes open up lender options that wouldn't otherwise be available. A co-signer takes on full legal responsibility for the mortgage alongside you, so it's a decision that should be made carefully and with a clear understanding on both sides of what that commitment actually means, ideally with independent advice for the co-signer as well as for you.",
      },
      {
        type: "h2",
        text: "How a broker helps newcomers compare lenders",
      },
      {
        type: "p",
        text: "Not every lender offers a newcomer program, and among those that do, the specific rules around eligibility windows, acceptable alternative documentation, minimum down payment, and pricing can vary considerably. A mortgage broker who regularly works with newcomer clients can quickly identify which lenders are actually a fit for your specific immigration status, arrival date, income situation, and down payment, rather than you having to approach individual banks one at a time and learn the eligibility rules through trial and error. This matters even more for newcomers than for many other borrowers, since the difference between a lender that understands your file and one that doesn't can be the difference between an approval and a decline for what is, in reality, a perfectly financeable purchase.",
      },
      {
        type: "p",
        text: "If you've recently arrived in Canada and are starting to think about homeownership, the most useful first step is a conversation that lays out exactly where your file stands today, what documentation you already have access to, and which lenders and programs are realistically available to you right now versus which options might open up after another few months of building a Canadian financial footprint. Starting that conversation early gives you time to strengthen your file before you're under pressure from a firm offer deadline, which is a far better position to buy from than starting the process only after you've already found a home.",
      },
    ],
    sources: [
      {
        href: "https://www.canada.ca/en/financial-consumer-agency/services/mortgages/preparing-mortgage.html",
        text: "Canada.ca — Preparing to get a mortgage",
      },
      {
        href: "https://www.canada.ca/en/financial-consumer-agency/services/mortgages/down-payment.html",
        text: "Canada.ca — Down payment requirements",
      },
      {
        href: "https://www.cmhc-schl.gc.ca/consumers/home-buying/mortgage-loan-insurance-for-consumers/what-is-mortgage-loan-insurance",
        text: "CMHC — Mortgage loan insurance",
      },
      {
        href: "https://www.fsrao.ca/consumers/mortgage-brokering/working-mortgage-professional",
        text: "FSRA — Working with a mortgage professional in Ontario",
      },
    ],
    faq: [
      {
        question: "Can I get a mortgage in Canada with no Canadian credit history?",
        answer:
          "Yes, through newcomer-specific mortgage programs that many lenders offer. These programs typically rely on alternative documentation, such as international credit references, rent history, and stable income, in place of a Canadian credit score.",
      },
      {
        question: "Do newcomers need a bigger down payment?",
        answer:
          "Standard down payment tiers apply based on purchase price, but newcomer programs sometimes expect a somewhat larger down payment than the bare minimum, particularly with limited Canadian credit history or documentation.",
      },
      {
        question: "Does my immigration status affect which lenders I can use?",
        answer:
          "Yes. Permanent residents generally have access to the broadest range of lenders and programs. Work permit holders can often still qualify, but typically with a more limited set of lenders and closer review of their permit status.",
      },
    ],
  },
];

export function getKnowledgeHubArticle(slug: string): KnowledgeHubArticle | undefined {
  return KNOWLEDGE_HUB_ARTICLES.find((article) => article.slug === slug);
}
