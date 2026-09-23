export type HomeRates = {
  updatedAt: string;
  threeYearFixed: number;
  fourYearFixed: number;
  fiveYearFixed: number;
  twoYearFixed: number;
  threeYearFixedHighRatio: number;
  fiveYearFixedHighRatio: number;
  fiveYearVariableHighRatio: number;
};

// Today's hardcoded homepage values, kept as the fallback so the site looks
// identical until a real provider is wired in below.
export const DEFAULT_RATES: HomeRates = {
  updatedAt: "2026-09-23",
  threeYearFixed: 3.9,
  fourYearFixed: 4.04,
  fiveYearFixed: 3.75,
  twoYearFixed: 3.99,
  threeYearFixedHighRatio: 3.64,
  fiveYearFixedHighRatio: 3.84,
  fiveYearVariableHighRatio: 3.4,
};

/**
 * Fetches the rates shown on the homepage. Swap the body below for a real
 * provider call once credentials/API docs are available — everything that
 * renders these numbers (see hooks/useHomeRates.ts) already re-renders
 * automatically whenever this resolves with new values.
 *
 * Note: this site builds with `output: "export"` (next.config.mjs), so there
 * is no Next.js server at runtime to hide API keys behind. Any provider call
 * here runs in the visitor's browser, which means:
 *   - only use a provider that allows browser/CORS requests, or proxy through
 *     a small serverless function you host elsewhere (e.g. Cloudflare Worker,
 *     Vercel/Netlify function) and fetch that instead of the provider directly
 *   - any API key referenced here must be a `NEXT_PUBLIC_...` env var, is
 *     baked into the JS bundle at build time, and is visible to anyone who
 *     views the page source — never put a secret/private key in it
 */
export async function fetchHomeRates(): Promise<HomeRates> {
  try {
    // Example shape once a provider is available:
    //
    // const res = await fetch(process.env.NEXT_PUBLIC_RATES_API_URL!, {
    //   headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_RATES_API_KEY}` },
    // });
    // if (!res.ok) throw new Error(`Rates API responded ${res.status}`);
    // const json = await res.json();
    // return {
    //   updatedAt: json.updatedAt,
    //   threeYearFixed: json.rates.find((r) => r.term === "3yr_fixed").rate,
    //   fourYearFixed: json.rates.find((r) => r.term === "4yr_fixed").rate,
    //   fiveYearFixed: json.rates.find((r) => r.term === "5yr_fixed").rate,
    //   twoYearFixed: json.rates.find((r) => r.term === "2yr_fixed").rate,
    //   threeYearFixedHighRatio: json.rates.find((r) => r.term === "3yr_fixed_hr").rate,
    //   fiveYearFixedHighRatio: json.rates.find((r) => r.term === "5yr_fixed_hr").rate,
    //   fiveYearVariableHighRatio: json.rates.find((r) => r.term === "5yr_variable_hr").rate,
    // };

    return DEFAULT_RATES;
  } catch {
    return DEFAULT_RATES;
  }
}

// Bank of Canada Valet API — free, official, no key required. These are
// "posted" rack rates from the six major chartered banks, NOT a negotiated
// broker rate, so they're shown separately as a market reference rather than
// mixed into RDC's own featured rates above.
// Docs: https://www.bankofcanada.ca/valet/docs
//
// There's no published "posted variable mortgage rate" series — variable
// mortgages are quoted as Prime rate minus a lender discount — so the
// variable tab shows the Prime rate itself (V80691311) as the reference.
const BOC_FIXED_SERIES = {
  oneYear: "V80691333",
  threeYear: "V80691334",
  fiveYear: "V80691335",
} as const;
const BOC_PRIME_SERIES = "V80691311";

export type PostedBankRates = {
  fixed: {
    asOfDate: string;
    oneYear: number;
    threeYear: number;
    fiveYear: number;
  };
  variable: {
    asOfDate: string;
    primeRate: number;
  };
};

export async function fetchPostedBankRates(): Promise<PostedBankRates | null> {
  try {
    // Fetched as two separate calls (rather than one bundled request) because
    // the fixed-rate series and the prime rate aren't always refreshed on the
    // same date — a bundled `recent=1` can silently omit a series that didn't
    // change on the very latest date.
    const [fixedRes, primeRes] = await Promise.all([
      fetch(`https://www.bankofcanada.ca/valet/observations/${Object.values(BOC_FIXED_SERIES).join(",")}/json?recent=1`),
      fetch(`https://www.bankofcanada.ca/valet/observations/${BOC_PRIME_SERIES}/json?recent=1`),
    ]);
    if (!fixedRes.ok || !primeRes.ok) throw new Error("Bank of Canada API request failed");

    const [fixedJson, primeJson] = await Promise.all([fixedRes.json(), primeRes.json()]);
    const fixedLatest = fixedJson?.observations?.[0];
    const primeLatest = primeJson?.observations?.[0];
    if (!fixedLatest || !primeLatest) throw new Error("Bank of Canada API returned no observations");

    return {
      fixed: {
        asOfDate: fixedLatest.d,
        oneYear: Number(fixedLatest[BOC_FIXED_SERIES.oneYear].v),
        threeYear: Number(fixedLatest[BOC_FIXED_SERIES.threeYear].v),
        fiveYear: Number(fixedLatest[BOC_FIXED_SERIES.fiveYear].v),
      },
      variable: {
        asOfDate: primeLatest.d,
        primeRate: Number(primeLatest[BOC_PRIME_SERIES].v),
      },
    };
  } catch {
    // No fallback here on purpose — showing a stale/fake "live bank rate" is
    // worse than not showing the block. The hook/component just hide it.
    return null;
  }
}

export type OntarioMortgageRates = {
  asOfDate: string;
  asOfLabel: string;
  sourceName: string;
  sourceUrl: string;
  fixed: {
    threeYearInsured: number;
    threeYearInsurable: number;
    threeYearUninsurable: number;
    fiveYearUninsurable: number;
  };
  variable: {
    fiveYearInsured: number;
    fiveYearInsurable: number;
    fiveYearUninsurable: number;
    fiveYearRental: number;
  };
};

export const DEFAULT_ONTARIO_MORTGAGE_RATES: OntarioMortgageRates = {
  asOfDate: "2026-09-23",
  asOfLabel: "September 23, 2026 at 11:48 AM ET",
  sourceName: "WOWA Ontario Mortgage Rates",
  sourceUrl: "https://wowa.ca/mortgage-rates-ontario",
  fixed: {
    threeYearInsured: 4.19,
    threeYearInsurable: 4.19,
    threeYearUninsurable: 4.19,
    fiveYearUninsurable: 4.34,
  },
  variable: {
    fiveYearInsured: 3.25,
    fiveYearInsurable: 3.3,
    fiveYearUninsurable: 3.55,
    fiveYearRental: 4.1,
  },
};

export async function fetchOntarioMortgageRates(): Promise<OntarioMortgageRates> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_ONTARIO_RATES_API_URL;
    if (!apiUrl) return DEFAULT_ONTARIO_MORTGAGE_RATES;

    const res = await fetch(apiUrl);
    if (!res.ok) throw new Error(`Ontario rates API responded ${res.status}`);

    const json = (await res.json()) as OntarioMortgageRates;
    if (!json?.fixed || !json?.variable || !json.sourceUrl) throw new Error("Ontario rates API returned invalid data");

    return json;
  } catch {
    return DEFAULT_ONTARIO_MORTGAGE_RATES;
  }
}
