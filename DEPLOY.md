# Deploying Royal Den Capital (GoDaddy domain + Netlify hosting)

This site is a static HTML/CSS/JS site (no server, no database, no build step) —
the whole thing lives in the `public/` folder. That makes it a great fit for a
free static host rather than traditional GoDaddy web hosting: faster, free
HTTPS, and a CDN, versus paying GoDaddy for hosting you don't need.

**The plan:** keep the domain registered at GoDaddy (don't move it), host the
files on Netlify (free), then point the GoDaddy domain at Netlify.

---

## Step 1 — Get the site live on Netlify

You don't need Git or a build step for this — Netlify lets you drag and drop
the folder straight in.

1. Go to [app.netlify.com](https://app.netlify.com) and sign up (free — email
   or GitHub login).
2. Once you're on the dashboard, go to **Sites** → drag the `public` folder
   (or the zip of it) onto the drop zone that says *"Drag and drop your site
   folder here."*
3. Netlify uploads it and gives you a live URL immediately, like
   `random-name-123.netlify.app`. Open it and click through the site to
   confirm everything works exactly like it did locally.
4. (Optional but recommended) Rename the site: **Site configuration → Change
   site name** → something like `royaldencapital` → gives you
   `royaldencapital.netlify.app` in the meantime, easier to recognize.

> Every time you want to publish a future change, come back to this same
> project and drag the updated `public` folder in again — it redeploys in
> seconds. (If later on you want it to auto-deploy whenever a file changes,
> that needs a GitHub repo connected instead — say the word and I'll set that
> up.)

---

## Step 2 — Point your GoDaddy domain at Netlify

Do **not** switch your GoDaddy nameservers — just add/edit a couple of DNS
records and leave the rest (especially any `MX` email records for
`info@royaldencapital.ca`) untouched.

1. In Netlify: **Site configuration → Domain management → Add a domain** →
   enter your domain (e.g. `royaldencapital.ca`). Netlify will show you the
   exact DNS records it needs — usually:
   - An **A record** for the root domain (`@`) → an IP Netlify shows you
   - A **CNAME record** for `www` → your `*.netlify.app` address
2. Log into **GoDaddy → My Products → DNS** for the domain.
3. Add/edit those two records to match what Netlify showed you. Leave any
   existing `MX`, `TXT`, or email-related records exactly as they are.
4. Save. DNS changes usually show up within 30–60 minutes, but can take up
   to 24–48 hours worldwide.
5. Back in Netlify, once it detects the DNS is pointed correctly, it
   auto-issues a free HTTPS certificate (Let's Encrypt) — no action needed,
   just wait a few minutes after DNS resolves.

---

## Step 3 — Verify

- Visit `https://royaldencapital.ca` (and `https://www.royaldencapital.ca`) —
  confirm the padlock/HTTPS is active and the homepage loads.
- Click through a few inner pages (About, Mortgages, Contact) to confirm
  relative links still resolve correctly.
- Test the contact form and calculators.

---

## Why not just use GoDaddy hosting?

You could — upload `public/` via GoDaddy's File Manager or FTP into a cPanel
hosting plan. It works, but: it costs extra on top of the domain, there's no
free automatic HTTPS on cheaper plans, no CDN, and every update is a manual
file re-upload with less visibility into what changed. Netlify's free tier
covers a small business site like this comfortably with none of that
overhead — that's why it's the recommended path here.
