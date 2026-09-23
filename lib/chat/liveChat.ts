/* Live chat assistant logic ported verbatim from public/script.js's
   initLiveChatAssistant (regex intent matching, qualification flow) —
   only the DOM-building/state-storage wrapper changed for React. */

export interface ChatMessage {
  sender: "user" | "bot";
  text: string;
  time: string;
}

export interface Qualification {
  name: string;
  email: string;
  phone: string;
  need: string;
  timeline: string;
}

export const QUICK_REPLIES = [
  "I want to buy",
  "I need refinance",
  "Renewal help",
  "What down payment?",
  "Current rates",
  "Talk to expert",
];

const QUALIFICATION_ORDER: Array<keyof Qualification> = ["need", "timeline", "name", "phone", "email"];

const PROMPTS: Record<keyof Qualification, string> = {
  need: "To send this to the right expert, what are you looking for: purchase, refinance, renewal, equity takeout, commercial, or something else?",
  timeline: "What is your timeline: ASAP, 30-60 days, 3+ months, or just exploring?",
  name: "What is your name?",
  phone: "What phone number should the mortgage expert use?",
  email: "What email should we include with the chat transcript?",
};

export function getMissingQualificationField(qualification: Qualification): keyof Qualification | undefined {
  return QUALIFICATION_ORDER.find((field) => !qualification[field]);
}

export function promptFor(field: keyof Qualification): string {
  return PROMPTS[field];
}

export function getBotReply(rawText: string): string {
  const text = rawText.toLowerCase();
  if (/\b(rate|rates|interest)\b/.test(text)) {
    return "Rates change often and depend on credit, down payment, property type, mortgage size, term, and insurer rules. I can qualify you first, then send the chat to an expert for accurate options.";
  }
  if (/\b(down|deposit|minimum)\b/.test(text)) {
    return "For many owner-occupied purchases in Canada, minimum down payment can start at 5% for the first $500k, then 10% on the portion above $500k, with 20% usually needed at $1M+. Exact rules depend on the file.";
  }
  if (/\b(pre.?approval|approve|approval|qualify|qualified)\b/.test(text)) {
    return "A pre-approval usually reviews income, credit, debts, down payment, and property goals. It helps estimate budget and hold a rate when available.";
  }
  if (/\b(refinance|equity|debt|consolidation)\b/.test(text)) {
    return "Refinancing can help access equity, consolidate higher-interest debt, or restructure payments. An expert will need your property value, mortgage balance, income picture, and goal.";
  }
  if (/\b(renew|renewal|maturity|matures)\b/.test(text)) {
    return "For renewals, it is smart to compare options before signing the lender's offer. Share your maturity date and current balance so an expert can review choices.";
  }
  if (/\b(first|buy|purchase|buyer|home)\b/.test(text)) {
    return "For a purchase, the key first details are budget, down payment, income, debts, credit range, and timeline. I can collect those basics and pass the chat to a mortgage expert.";
  }
  if (/\b(commercial|business|construction|private|bridge)\b/.test(text)) {
    return "Commercial and specialized financing depends heavily on the property, use, cash flow, borrower profile, and exit plan. That should go to an expert after a few qualifying details.";
  }
  if (/\b(call|phone|email|contact|expert|agent|human|transfer|advisor|broker)\b/.test(text)) {
    return "Absolutely. I can transfer this full chat to a Royal Den Capital expert. I just need a few details first.";
  }
  if (/\b(hello|hi|hey|start)\b/.test(text)) {
    return "Hi, I can answer basic mortgage questions and collect the first details for an expert. What can I help with today?";
  }
  return "That is a good question for a mortgage expert. I can collect your basic details and transfer this whole chat so you do not have to repeat yourself.";
}

/** Need inferred from the message text, same triggers as getBotReply. */
export function inferNeedFromText(rawText: string): string | null {
  const text = rawText.toLowerCase();
  if (/\b(refinance|equity|debt|consolidation)\b/.test(text)) return "Refinance / equity / debt consolidation";
  if (/\b(renew|renewal|maturity|matures)\b/.test(text)) return "Mortgage renewal";
  if (/\b(first|buy|purchase|buyer|home)\b/.test(text)) return "Home purchase";
  if (/\b(commercial|business|construction|private|bridge)\b/.test(text)) return "Commercial or specialized financing";
  return null;
}

export function shouldPromptAfterReply(userText: string, reply: string): boolean {
  return /expert|transfer|human|agent|advisor|broker|random|question/i.test(userText) || /good question for a mortgage expert/i.test(reply);
}
