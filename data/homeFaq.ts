export interface FaqItem {
  id: string;
  questionKey: string;
  question: string;
  answerKey: string;
  answer: string;
}

export const HOME_FAQ: FaqItem[] = [
  {
    id: "hf1",
    questionKey: "home_faq1_q",
    question: "How much mortgage can I afford?",
    answerKey: "home_faq1_a",
    answer:
      "Lenders generally look at two ratios: your Gross Debt Service (GDS) ratio, housing costs as a share of income, usually capped around 39%, and your Total Debt Service (TDS) ratio, all debt payments as a share of income, usually capped around 44%. Your exact limit depends on income, debts, credit, and the mortgage stress test rate.",
  },
  {
    id: "hf2",
    questionKey: "home_faq2_q",
    question: "What's the difference between pre-qualification and pre-approval?",
    answerKey: "home_faq2_a",
    answer:
      "Pre-qualification is a quick, informal estimate based on numbers you provide. Pre-approval is a more thorough review where a lender verifies your income, credit, and debts and typically holds a rate for 60 to 120 days, giving you a firmer number to shop with.",
  },
  {
    id: "hf3",
    questionKey: "home_faq3_q",
    question: "How much down payment do I need?",
    answerKey: "home_faq3_a",
    answer:
      "In Canada, the minimum is 5% on the first $500,000 of the purchase price and 10% on the portion between $500,000 and $999,999. Homes at $1,000,000 or more require at least 20% down. Any down payment under 20% requires mortgage default insurance.",
  },
  {
    id: "hf4",
    questionKey: "home_faq4_q",
    question: "What is the mortgage stress test?",
    answerKey: "home_faq4_a",
    answer:
      "Federally regulated lenders must qualify you at the higher of your contract rate plus 2%, or the Bank of Canada's benchmark qualifying rate, even if your actual rate is lower. It's designed to confirm you could still afford payments if rates rise.",
  },
  {
    id: "hf5",
    questionKey: "home_faq5_q",
    question: "What credit score do I need to qualify?",
    answerKey: "home_faq5_a",
    answer:
      "Most traditional lenders look for a score of 680 or higher for the best rates. Below that, you may still qualify through alternative or private lenders, often with a larger down payment or a slightly higher rate, which we can help you access.",
  },
  {
    id: "hf6",
    questionKey: "home_faq6_q",
    question: "What's the difference between a mortgage broker and a bank?",
    answerKey: "home_faq6_a",
    answer:
      "A bank can only offer you its own mortgage products. As a licensed mortgage broker, Royal Den Capital compares rates and terms across major banks, credit unions, alternative, and private lenders on your behalf, at no direct cost to you in most cases, since we're paid by the lender.",
  },
  {
    id: "hf7",
    questionKey: "home_faq7_q",
    question: "Can self-employed applicants or newcomers to Canada qualify?",
    answerKey: "home_faq7_a",
    answer:
      "Yes. Self-employed borrowers can qualify using two years of tax returns and business financials, or through stated-income programs with alternative lenders. Newcomers with limited Canadian credit history can qualify through dedicated newcomer mortgage programs, often with as little as 5-10% down.",
  },
  {
    id: "hf8",
    questionKey: "home_faq8_q",
    question: "How long does mortgage approval take?",
    answerKey: "home_faq8_a",
    answer:
      "A pre-approval can often be turned around within 24-48 hours once your documents are in. Full approval after a signed offer, once appraisal and underwriting are complete, usually takes about 5-10 business days, though complex commercial or business files can take longer.",
  },
];
