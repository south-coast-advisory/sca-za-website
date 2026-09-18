# South Coast Advisory — build handoff

Last updated 18 Sep 2026. Plan: `../planning/sca-website-blueprint.html`
(https://claude.ai/artifact/NYRXp7Z46ynbjsWe1vYkaJ).

## Stack

Next.js 16 (App Router, TypeScript) · Tailwind v4 + the Second Brain colour
engine · Supabase for leads · Gemini Live for the voice assistant · Vercel ·
GitHub.

## Run it

```bash
npm run dev
```

Port 3000 is often taken by another project on this machine, so the preview may
start on a different port — the terminal prints it.

## Routes

| Route | What it is |
|---|---|
| `/` | Hero with form, stage self-selection, Xero, Neil, services, FAQ |
| `/xero` | Xero pillar: partner status, product visual, 4-step migration, moving from Pastel/Sage/QuickBooks, SA specifics, 22 features with Xero's icons |
| `/xero/pricing` | Starter/Standard/Premium in rand, dated, plus what a partner adds |
| `/services` + 8 service pages | From `src/content/services.ts` |
| `/pricing` | How fees are quoted, 4 packages, fee-driver table |
| `/faq` | 31 questions in 8 groups, FAQPage schema |
| `/glossary` | 117 South African terms, DefinedTerm schema, anchor per term |
| `/resources` | Hub |
| `/resources/sars-deadlines` | The recurring SARS/CIPC calendar |
| `/resources/library` + 6 document pages | The gated guide library |
| `/share-your-experience` | Client testimonial submission |
| `/about`, `/contact` | Neil's credentials; phone, address, map, form |
| `/privacy`, `/terms` | Full POPIA notice and terms of use |
| `/sitemap.xml`, `/robots.txt`, `/llms.txt`, `/opengraph-image` | Generated from the content files |
| `/api/lead` | Form handler → Supabase `leads` |
| `/api/voice/token` | Mints Sandy's ephemeral Gemini token |

Content lives in `src/content/*.ts`; business facts in `src/lib/site.ts`. Change
a fact once and every page, the schema, `/llms.txt` and Sandy all update.

## Sandy, the voice assistant

- **Model:** `gemini-3.8-live` (Gemini Live API), via `@google/genai`.
- **Security:** the browser never sees `GEMINI_API_KEY`. `/api/voice/token`
  mints a one-use ephemeral token that expires in 30 minutes.
- **Grounding:** `src/content/sandy.ts` assembles her knowledge from the site's
  own services, FAQ, glossary and Xero files, so she cannot contradict the
  pages. Her instruction forbids advice on a caller's own tax affairs, quoting
  fees, and stating any rate or threshold not in the material.
- **Xero training:** `src/content/xero.ts` holds partner tiers, all three ZA
  plans with prices, SA bank feeds, VAT and payroll specifics, migration steps
  and 22 features — all sourced from xero.com on 18 Sep 2026.
- **Switching her on:** set `GEMINI_API_KEY` in `.env.local` and Vercel. Until
  then the widget renders nothing at all and the site is complete without it.
- **Untested against the live API.** The code is written to the current docs but
  has never held a real session, because there is no key yet. Budget an hour to
  test microphone capture and audio playback end to end before launch.

## The colour engine

`src/app/globals.css`. Retheme by changing `--brand-h` / `--brand-s` only.
Sampled from the logo: blue `#1F23B8` = hue 239, saturation 71%; the logo red
`#DC071D` is the single highlight. No hard-coded hex anywhere outside the master
block, with one documented exception: `opengraph-image.tsx`, because the image
renderer cannot read CSS variables.

## Images — current policy

Deliberately sparse, and this is the reason: the rule is no stock photography
(RULES.md gate H5). Two "office" photos in the client archive turned out to be
stock pictures of hands on a laptop, so they were deleted rather than shipped.

**In use:** the SCA logo, Neil's portrait, Xero's product icons and one Xero
product screen.

**Still needed — one half-day shoot:** Neil (a current portrait), the team at
work, the building exterior for Google Business Profile, and a real desk or
screen shot from the practice. Real photographs of these people will do more for
conversion than any other single change.

**Licensing to confirm:** the Xero icons and product screen come from Xero's own
material in the client archive. As a Xero partner SCA may use Xero brand assets
within Xero's brand guidelines — Neil should pull the current partner badge and
assets from the Xero Partner Hub and confirm usage with his account manager.

## Before launch — needs Neil

1. **Xero partner tier** — confirm still Silver (`src/lib/site.ts`).
2. **Prices** — the only price list on file is from 2020, so `/pricing` carries
   no rand figures for SCA's own services yet.
3. **Testimonials** — none on the site, because none are approved. Biggest gap.
4. **Team** — only Neil appears. Candida removed throughout.
5. **Email address** — `site.email` is empty; which mailbox takes enquiries?
6. **Google Business Profile / Facebook / LinkedIn URLs** → `site.sameAs`.
7. **Office coordinates and hours** — currently approximate.
8. **Legal review** — the privacy notice and terms are carefully written but are
   not legal advice. Neil's attorney should read them, and the practice needs a
   **PAIA manual**, which every private body must have. The privacy page already
   promises one on request.
9. **Information Officer** — POPIA requires registration with the Information
   Regulator. The notice names Neil as Information Officer.

### Re-check every February, after the Budget

Entries in `src/content/faq.ts` and `src/content/glossary-more.ts` marked
`verify: true`, plus `PRICES_AS_AT` in `src/content/xero.ts`. **Xero has
announced a price increase from 1 November 2026 — update the plan table then.**
`/resources/sars-deadlines` deliberately omits annual filing-season dates.

## Supabase

1. Run `supabase/schema.sql` in the SQL editor.
2. Create a **private** bucket named `documents` (for the library, phase 4).
3. Copy `.env.example` to `.env.local`; set the same values in Vercel.

RLS is on with no anon policy: only the server route can write. Until the env
vars exist the form tells visitors to phone rather than pretending to save.

## Deploy

Push to GitHub from SCA's own Chrome profile, import in Vercel, set the env
vars. Point `sca-za.com` at Vercel only after the GoDaddy email MX records are
confirmed in the new DNS zone. `legacy-redirects.ts` maps every old `.html` URL
to its new home — add to that list, never remove from it.

## The document library

Six guides, written for South African rules and tied to services SCA sells:
SARS & CIPC deadlines, the Xero migration checklist, the month-end close, the
payroll compliance pack, whether to register for VAT, and record retention.

- **Content:** `src/content/documents.ts` and `documents-2.ts` (structured data,
  not prose files) — so a document and its web page cannot disagree.
- **PDFs:** `npm run build:docs` renders them with pdfkit into
  `private-documents/`. **Commit that folder** — it ships with the deploy.
  Re-run after any content edit.
- **Gating:** `/api/documents/request` records the lead in Supabase and returns
  a 10-minute HMAC-signed link; `/api/documents/[slug]/download` verifies it and
  streams the file. The PDFs are outside `public/` on purpose — in `public/`
  they would be ungated and the lead magnet pointless.
- **Set `DOWNLOAD_SECRET`** in production (any long random string).
- `outputFileTracingIncludes` in `next.config.ts` makes sure the PDFs reach the
  Vercel function. Without it, downloads work locally and 503 in production.

Tested end to end: a valid request returns a real PDF, a missing consent tick is
refused, and a forged token is rejected. **The PDFs themselves have not been
reviewed on screen** — the browser pane here cannot display them. Open one from
`private-documents/` before launch and check it reads the way you want.

## Testimonials

- Clients submit at `/share-your-experience`. The form records explicit,
  separate consent to publish their name and business.
- Everything arrives as `status = 'pending'` in the `testimonials` table.
  **Nothing reaches the website until someone sets it to `approved`** in the
  Supabase table editor, after confirming with the client.
- `src/components/Testimonials.tsx` renders on the home page and shows *nothing
  at all* while there are no approved rows, so the site never fakes proof. It
  fills itself in within the hour once rows are approved.
- `docs/testimonial-request-email.md` has the email for Neil to send, who to ask
  first, and the approval steps.

## Google reviews and backlinks

The two things the website cannot do for itself, both documented for Neil:

- **`docs/google-reviews-playbook.md`** — claim the profile, get the short review
  link, WhatsApp and email scripts, where to put the link (signature, invoices, a
  QR card at reception), how to reply to good and bad reviews, and the rules that
  keep reviews from being removed (never incentivise, never review-gate).
- **`docs/backlink-plan.md`** — the exact NAP block to paste everywhere, then
  four tiers: Google Business Profile and the Xero advisor directory first, then
  SA directories that already rank for "accountant Amanzimtoti", then local and
  relational links (chamber, sponsorships, client footers), then content
  outreach.

On the site: `/review` is the short link for emails and invoices — it redirects
straight to the Google review box once `site.google.reviewUrl` is set, and until
then explains how to leave one by hand. `ReviewCta` appears beside the
testimonial form. The Google profile URL is added to the organisation schema's
`sameAs` automatically once configured.
- **Deliberately no Review or AggregateRating schema.** Self-serving review
  markup on your own site breaches Google's guidelines and can earn a manual
  action. Star ratings belong on Google Business Profile, where they also help
  local rankings.

## Not built yet

- **Email delivery of documents** — the download is served immediately after the
  form. When an email provider is chosen (Resend or similar), also email the
  link and start the three-email follow-up sequence.
- **Area pages** (phase 5) — only with genuinely local content.
- **Client portal** — vault, document requests, job status, invoices from Xero.
- **Insights/blog**.

### On the Dial an Accountant document library

The old library's documents were reviewed. They are generic legal and HR
templates — lease agreements, SWOT worksheets, a Companies Act 2008 summary, CV
guides — most 15+ years old, none specific to SCA's services, and several now
legally out of date. Re-hosting them would put SCA's name on stale legal
templates, which is a liability for a practice that sells accuracy.

The mechanism was sound and worth rebuilding; the content is not worth porting.
Six new documents tied to actual services will outperform forty stale ones.
