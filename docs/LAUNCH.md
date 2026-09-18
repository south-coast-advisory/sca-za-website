# Launch runbook — sca-za.com

Do these in order. Nothing here touches the live site until **Phase 5**, so you
can stop at the end of Phase 4 and sit on a fully working preview for as long as
you like.

**The one rule: email lives at GoDaddy and must not break.** Phase 5 is written
to leave the MX records alone entirely.

---

## Phase 0 — Accounts and decisions (Ignatius)

- [ ] **GitHub account for SCA** — which account owns this repo? Per our rule,
      every project has its own account and its own Chrome profile.
- [ ] **Git identity for this repo** — name and email to appear on commits.
      Currently inherited from Star Aesthetic, which must be changed before the
      first commit (see Phase 1).
- [ ] **Vercel account** — log in with the SCA GitHub account.
- [ ] **Supabase account** — free tier is enough to start.
- [ ] **Google Business Profile** — claim it. This can run in parallel; it does
      not block launch, but it is the highest-value item on the list.

---

## Phase 1 — Repository

```bash
cd "C:\Users\ignat\Local Sites\sca-za\nextjs"

# Repo-local identity: never inherit another project's
git config user.name  "SCA-ZA"
git config user.email "you@example.com"

git add -A
git commit -m "South Coast Advisory website"
```

Then create an empty repo on GitHub under the SCA account and:

```bash
git remote add origin https://github.com/<account>/<repo>.git
git push -u origin main
```

**Push from the Chrome profile that carries the SCA GitHub login.** If the push
asks for credentials, stop rather than switching accounts.

Checks before pushing:

- [ ] `private-documents/` **is** committed (7 PDFs — they ship with the deploy)
- [ ] `.env.local` is **not** committed (`.gitignore` covers it)
- [ ] `.env.example` **is** committed (documents the variables, holds no secrets)

---

## Phase 2 — Supabase

1. Create a project. Region: choose the closest available to South Africa.
2. SQL Editor → paste all of `supabase/schema.sql` → Run.
3. Confirm three tables exist: `leads`, `downloads`, `testimonials`.
4. Settings → API, copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY`

> The service role key bypasses row level security. It belongs only in Vercel's
> environment variables and `.env.local`. If it ever appears in browser code or
> a commit, rotate it immediately.

---

## Phase 3 — Netlify

**Why Netlify and not Vercel:** Vercel's free Hobby plan is non-commercial only
— their terms name "being paid to create or host the site" as commercial use, so
a client's business site would require Pro at $20 per month per member. Netlify's
free plan permits commercial client sites (you simply may not resell the hosting
itself). The repo works on either; `netlify.toml` configures Netlify.

1. Netlify → **Add new site** → **Import an existing project** → GitHub →
   authorise → choose `sca-za-website`.
2. Build settings are read from `netlify.toml` — leave them as detected:
   - Build command: `npm run build`
   - Publish directory: `.next`
3. **Site configuration → Environment variables**, add:

   | Variable | Value |
   |---|---|
   | `NEXT_PUBLIC_SUPABASE_URL` | from Supabase |
   | `SUPABASE_SERVICE_ROLE_KEY` | from Supabase |
   | `DOWNLOAD_SECRET` | any long random string — generate one, do not reuse a password |
   | `NEXT_PUBLIC_SITE_URL` | the domain the site will finally live on, e.g. `https://www.sca-za.com` |
   | `GEMINI_API_KEY` | optional; leave out until Sandy is tested |

4. Deploy. You get a `*.netlify.app` URL. **The site is now live but nobody knows
   it exists** — no DNS has changed, and deploy previews carry a `noindex`
   header so they cannot compete with the real site in Google.

> `NEXT_PUBLIC_SITE_URL` decides every canonical URL, the sitemap and the schema.
> Set it to the domain you intend to keep, even while testing on the
> `.netlify.app` URL — that way Google is never told the temporary address is
> the real one.

---

## Phase 4 — Verify on the preview URL

Run the audit against the deployed site:

```bash
node scripts/audit-site.mjs https://<site>.netlify.app
```

Expect **0 errors**. Then by hand:

- [ ] Submit the home page form → a row appears in Supabase `leads`
- [ ] Download a guide → a row appears in `downloads`, and the PDF actually opens
- [ ] Submit a testimonial → a row appears in `testimonials` with `status = pending`
- [ ] `/resources/library` — all seven covers render
- [ ] Old URL redirects: `/xero-accounting.html` → `/xero`, `/about-us.html` → `/about`
- [ ] `/sitemap.xml`, `/robots.txt`, `/llms.txt` all load
- [ ] On a real phone: the hero form is visible without scrolling, the menu opens
- [ ] Nothing in the footer or nav 404s

Fix anything here **before** touching DNS.

---

## Phase 5 — DNS cutover (the careful bit)

### Recommended: leave DNS at GoDaddy, point only the website at Vercel

This is the lower-risk route precisely because email stays where it is: you do
not touch a single MX record.

**Before you change anything:**

1. [ ] In GoDaddy DNS, screenshot **every** record. All of them.
2. [ ] Note the current MX records, the SPF `TXT` (`v=spf1…`), any DKIM
      (`selector._domainkey`) and DMARC records.
3. [ ] Lower the TTL on the `A` and `www` records to 600 seconds, and wait a few
      hours. This makes a rollback take minutes instead of a day.
4. [ ] Take a full backup of the existing site and its database.

**The change itself**, in GoDaddy DNS:

| Record | Host | Points to |
|---|---|---|
| `A` | `@` | the IP Netlify shows you for the apex domain |
| `CNAME` | `www` | the target Netlify shows you (usually `<site>.netlify.app`) |

Use whatever values the Netlify dashboard displays when you add the domain —
do not copy values from an old tutorial.

**Do not touch:** MX records, SPF, DKIM, DMARC, or any `autodiscover` /
`autoconfig` records. Email continues to work throughout.

In Netlify: **Domain management → Add a domain** → add `sca-za.com` and
`www.sca-za.com`, and set the primary. The primary must match
`NEXT_PUBLIC_SITE_URL`, or your canonicals will point somewhere other than the
address people actually land on.

### Staging on sca-za.co.za first (optional, and low risk)

`sca-za.co.za` currently 301s to `sca-za.com`. If you want to test on a real
domain before touching the live site, point `sca-za.co.za` at Netlify instead —
the `.com` site carries on untouched at GoDaddy. When you are satisfied, cut
`.com` over and return `.co.za` to redirecting.

Keep `NEXT_PUBLIC_SITE_URL` set to `https://www.sca-za.com` throughout, so no
canonical ever advertises the staging domain.

**On which domain should be primary:** keep `sca-za.com`. It is the older
domain, every legacy `.html` URL belongs to it, and `.co.za` already consolidates
into it. Reversing that would restart the authority-building on the newer
domain for no gain.

**Within 30 minutes of cutover:**

- [ ] `https://www.sca-za.com` serves the new site over HTTPS
- [ ] Send yourself an email **to** an @sca-za.com address, and send one **from**
      it. Do this before you celebrate.
- [ ] `https://www.sca-za.co.za/xero-accounting.html` still redirects correctly
- [ ] Run the audit script against the live domain

### Rollback

Change the `A` and `CNAME` records back to the old host's values. With a 600
second TTL this takes minutes. Email is unaffected because it was never touched.

---

## Phase 6 — After launch

Same day:

- [ ] **Google Search Console** — add both `sca-za.com` and `www.sca-za.com`,
      verify by DNS TXT, submit `/sitemap.xml`
- [ ] Keep the old `sca-za.co.za` property in Search Console and use **Change of
      Address** if you have not already
- [ ] **Bing Webmaster Tools** — import from Search Console, submit the sitemap
- [ ] **Google Analytics 4** — create the property, add the tag, mark the
      consultation form as a conversion
- [ ] Update the website link on the **Google Business Profile** and the **Xero
      advisor directory**

First week:

- [ ] Work through `docs/backlink-plan.md`, Tier 1
- [ ] Start `docs/google-reviews-playbook.md` — ask three clients
- [ ] Send the first testimonial emails (`docs/testimonial-request-email.md`)
- [ ] Watch Search Console coverage for anything unexpectedly excluded

First month:

- [ ] Check which pages are getting impressions, and write to those gaps
- [ ] Approve and publish the first testimonials
- [ ] Decide on Sandy: add `GEMINI_API_KEY` and test properly before exposing her

---

## Still outstanding from Neil

These do not block launch, but the site is weaker without them:

| Item | Where it goes |
|---|---|
| 2026 prices | `/pricing` currently explains how fees are quoted, with no figures |
| Testimonials | The engine is built and shows nothing until approved |
| Team names and photos | Only Neil appears |
| Enquiry email address | `site.email` is empty |
| Xero tier confirmation | "Silver Partner" appears in several places |
| Google review link | `site.google.reviewUrl` in `src/lib/site.ts` |
| Office coordinates and hours | Currently approximate |
| Legal review of the privacy notice and terms, and a PAIA manual | Required of every private body |
