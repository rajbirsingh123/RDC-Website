# Royal Den Capital

Royal Den Capital's marketing site, built with Next.js (App Router, static export) and deployed to GitHub Pages
with a GoDaddy-registered custom domain (`royaldencapital.ca`). Content and structure are mirrored from the
original static HTML/CSS/JS build (kept for reference under `legacy-site/`), rebuilt in React for a cleaner
architecture while preserving the same design, copy, calculators, and EN/FR/PA translations.

## Run

```bash
npm install
npm run dev
```

Then open `http://localhost:3000/`.

```bash
npm run build     # static export to out/
npm run serve:out # preview the exported output
```

## Structure

- `app/` — Next.js App Router pages. Each route mirrors the original site's URL (e.g. `app/mortgages/[slug]/page.tsx`
  serves all 13 `/mortgages/<slug>/` pages from one template + `data/mortgages.ts`).
- `components/` — shared layout (`Header`, `Footer`), calculators, forms, the live chat widget, cookie banner, and
  page-specific pieces (mortgage hero animation, homepage hero).
- `lib/` — `mortgageMath.ts` (mortgage/tax formulas, ported verbatim from the old site's calculator logic),
  `i18n/` (the EN/FR/PA translation system — a React context + `translations.ts`, ported from the old site's
  `assets/i18n-data.js`), `seo/` (shared metadata/JSON-LD helpers).
- `data/` — nav/footer link lists and the 13 mortgage subpages' content.
- `public/` — real static assets (images, video) plus `CNAME`, `robots.txt`, `sitemap.xml`, `llms.txt` — copied
  as-is into the build output, same as before.
- `legacy-site/` — the previous static HTML/CSS/JS build, kept for reference during/after the React migration.
  Not part of the deployed site.

## Content sourcing

The mortgage education content (fixed vs. variable, open vs. closed, the approval process, required documents,
FAQs, glossary terms, and the calculators' CMHC premium/land transfer tax formulas) is original writing based on
standard, publicly published Canadian mortgage rules and industry practice, the kind of structure and depth you'd
see on RBC's and other banks' mortgage learning pages, not copied text from any specific site. All numeric
schedules (CMHC premium tiers, Ontario LTT brackets, stress test mechanics) are general facts, not brand-specific
figures, and every calculator result carries an "estimate only, confirm with your advisor" disclaimer.

## Deployment

GitHub Actions (`.github/workflows/deploy-pages.yml`) builds the Next.js static export (`npm run build` → `out/`)
and publishes it to GitHub Pages on every push to `main`. The GoDaddy domain's DNS already points at GitHub
Pages — nothing about hosting/DNS changed when the site moved from static HTML to Next.js, only the build step.

## Notes

- The "Meet our team" section on the About page (Oscar Andrews, Jamie Williams, Zoe Mitchell, Charles Bernardi)
  reproduces placeholder demo names still present on the live site's team widget — swap in real staff bios and
  photos when available.
- Facebook and LinkedIn footer icons point to `#` because the live site's own icons are unconfigured (only
  Instagram has a real link: `instagram.com/royaldencapital`).
- Service pages for "Business Loans", "Equity Financing", "Venture Capital", and "SBA Loans" link to
  `/full-service-mortgage-solution/` since the live site's own buttons to those slugs are hidden template links
  with no built-out destination page.
