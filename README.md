# Royal Den Capital

Standalone static website project for Royal Den Capital. Content and structure are mirrored from the live site at
`https://royalden1.enterprisewebcloud.website/` (a WordPress + Elementor build), rebuilt as clean static HTML/CSS/JS,
and cross-checked against `Royal Den Capital-summary.docx` for business details (phone, email, address, licenses).

## Run

```bash
npm run start
```

Then open `http://localhost:8090/`.

You can also open `public/index.html` directly in a browser.

## Structure

- `public/index.html` - homepage: hero, rate comparisons, featured rates, lending partners, about, feature
  highlights (fast approvals / no hidden fees / transparency / $1M+ approvals), 8-service grid (Business Loans,
  Equity Financing, Venture Capital, SBA Loans, Home Mortgage, Refinancing & Equity, Pre-Approval, Debt
  Consolidation), why-choose-us, fixed/variable rate explainer, a real mortgage calculator (monthly payment, CMHC-style
  insurance estimate, Ontario land transfer tax estimate, total interest), an 8-question FAQ, goal/promise panel,
  contact form, newsletter band
- `public/full-service-mortgage-solution/index.html` - the deep mortgage education page: 12 mortgage/loan types,
  each with a "best for" tag and an expandable "Learn more" panel (how it works + good-to-know facts, e.g. RRSP
  Home Buyers' Plan, FHSA, CMHC insured-mortgage rules, Tarion deposit protection), a Fixed vs. Variable comparison
  table, Open vs. Closed explainer, the 6-step mortgage process (pre-approval through closing), a
  required-documents checklist, businesses supported by industry, and a 6-question mortgage FAQ
- `public/about-us/index.html` - about page: who we are, how it works, value grid, team, why-us list, contact form
- `public/mortgage-glossary/index.html` - full 30-term mortgage glossary, including stress test, GDS/TDS ratios,
  LTV, portability, and assumability
- `public/contact-us/index.html` - contact page with form, head office details, and office hours
- `public/styles.css` - website styling (Bootstrap 5 + custom design system)
- `public/script.js` - mortgage calculator math (payment, CMHC-style premium schedule, Ontario LTT brackets),
  contact/newsletter form mailto handoff, and live chat button
- `public/assets/` - real photos and logos downloaded from the live site (lending partner logos, hero imagery,
  Royal Den Capital shield logo), plus a couple of original supporting icons
- `src/content.md` - business content notes sourced from the provided summary document

## Content sourcing

The mortgage education content (fixed vs. variable, open vs. closed, the approval process, required documents,
FAQs, glossary terms, and the calculator's CMHC premium/land transfer tax formulas) is original writing based on
standard, publicly published Canadian mortgage rules and industry practice, the kind of structure and depth you'd
see on RBC's and other banks' mortgage learning pages, not copied text from any specific site. All numeric
schedules (CMHC premium tiers, Ontario LTT brackets, stress test mechanics) are general facts, not brand-specific
figures, and every calculator result carries an "estimate only, confirm with your advisor" disclaimer.

## Design system notes

- All card components (`.mortgage-service-card`, `.service-card`, `.rate-card`, `.feature-card`, `.team-card`,
  `.goal-grid article`, `.industry-grid article`, `.doc-checklist li`) have a fully visible default state (white
  background, soft shadow, border) so they read correctly on touch devices with no hover. Lift/shadow/border-accent
  enhancements are scoped to `@media (hover: hover) and (pointer: fine)` so they only ever add polish on
  mouse/trackpad, never gate visibility on touch.
- A lightweight scroll-reveal (`.reveal` / `.is-visible`, driven by `script.js`'s `initScrollReveal`) fades cards
  and headings in as they enter view. Anything already near the initial viewport on load reveals immediately
  (no delay), so nothing above the fold is ever blank. It fully respects `prefers-reduced-motion`.

## Notes

- The "Meet our team" section on the About page (Oscar Andrews, Jamie Williams, Zoe Mitchell, Charles Bernardi)
  reproduces placeholder demo names still present on the live site's team widget — swap in real staff bios and
  photos when available.
- Facebook and LinkedIn footer icons point to `#` because the live site's own icons are unconfigured (only
  Instagram has a real link: `instagram.com/royaldencapital`).
- Service pages for "Business Loans", "Equity Financing", "Venture Capital", and "SBA Loans" link to
  `/full-service-mortgage-solution/` since the live site's own buttons to those slugs are hidden template links
  with no built-out destination page.
