import type { Metadata } from "next";
import Link from "next/link";
import audit from "@/data/seo-audit.json";
import { faqs } from "@/content/faq";
import { terms } from "@/content/glossary";
import { libraryDocuments } from "@/content/documents";
import { services } from "@/content/services";
import { tutorials } from "@/content/tutorials";
import { founder, site } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

/**
 * A one-screen overview of the website for Neil: what it has, how a client
 * finds and books the practice, how it scores for search, and what is left
 * before launch. House pattern from the Gas Safety /site-info page.
 * Not in the navigation or the sitemap; share the link directly.
 * SEO numbers come from scripts/seo-audit.mjs — rerun it after changes.
 */
// Shared by link on WhatsApp, so it carries its own title, description and
// card; still kept out of search results.
export const metadata: Metadata = {
  ...pageMeta({
    title: "Website overview",
    description:
      "Everything the new South Coast Advisory website does, how it scores on Google, the ranking guarantee, and what is left before launch.",
    path: "/site-info",
    cardTitle: "The South Coast Advisory website at a glance",
  }),
  robots: { index: false, follow: false },
};

const features = [
  {
    title: "A consultation form on every key page",
    line: "Name, email, the pressure point. Every enquiry is emailed to the practice even if the database is down.",
    href: "/contact",
  },
  {
    title: `${services.length} service pages`,
    line: "Each states the deliverables, the process, the SARS or CIPC terms involved, and the questions clients ask.",
    href: "/services",
  },
  {
    title: "Xero Silver Partner hub",
    line: "Migration in four steps, South African specifics, and Xero's published plan prices explained.",
    href: "/xero",
  },
  {
    title: `${libraryDocuments.length} free PDF guides`,
    line: "Deadline calendar, Xero migration, VAT, payroll and more. Each download captures a name and email: a lead.",
    href: "/resources/library",
  },
  {
    title: "Review engine",
    line: "Written reviews with guided questions, or a 90-second video. Nothing is published until the practice approves it.",
    href: "/review",
  },
  {
    title: "Sandy, the voice assistant",
    line: "Answers accounting, SARS and Xero questions out loud on every page, then offers the consultation.",
    href: "/",
  },
  {
    title: "SARS and CIPC deadline calendar",
    line: "The filing dates that repeat every year, by payroll month, VAT category and year-end.",
    href: "/resources/sars-deadlines",
  },
  {
    title: `${faqs.length} answers and ${terms.length} glossary terms`,
    line: "Written to be quoted by Google and AI assistants, which is where many searches now end.",
    href: "/faq",
  },
  {
    title: "Every old link still works",
    line: "All 24 addresses from the old sca-za.com forward to the matching new page, so existing rankings carry over.",
    href: "/about-us.html",
  },
];

const steps = [
  ["Find", "Searches “accountant Amanzimtoti” or “Xero partner South Coast”, or downloads a free guide."],
  ["Book", "Requests the free 20-minute consultation by form, by phone from the header, or through Sandy."],
  ["Onboard", "The practice reviews the SARS profile, CIPC record and books, then quotes the monthly service."],
  ["Refer", "A review on the site and on Google brings the next South Coast business owner."],
];

/** The phrases the ranking guarantee is measured on. Local intent, real volume. */
const guaranteeKeywords = [
  "accountant Amanzimtoti",
  "accountants Amanzimtoti",
  "tax practitioner Amanzimtoti",
  "bookkeeping Amanzimtoti",
  "payroll services Amanzimtoti",
  "Xero partner KZN South Coast",
  "Xero accountant South Coast",
  "business valuations Durban South",
];

const aiQuestions = [
  "Who is a good accountant in Amanzimtoti?",
  "Is there a Xero partner on the KZN South Coast?",
  "Who can help me with SARS on the South Coast?",
];

const guaranteeTerms = [
  ["Page one on Google", "Within six months of launch, the site ranks on the first page of Google for the phrases listed here."],
  ["Named by AI search", "Within six months, ChatGPT, Google's AI Overviews and Perplexity name South Coast Advisory when asked the questions listed here."],
  ["A report by the 5th", "Each month: where every phrase ranks, what each AI assistant answered, enquiries received, and the SEO score."],
  ["If we fall short", "We keep working on the site, at no extra charge, until every target is met."],
] as const;

const fromNeil = [
  "Current fees for the four service packages (only a 2020 price list exists)",
  "The first client reviews: send happy clients the /review link",
  "Team names and photographs",
  "The email address enquiries should go to",
  "Confirmation that the Xero partner tier is still Silver",
  "Access to the Google Business Profile, for the review link",
];

const switchOn = [
  "Restore the database and switch on video reviews",
  "Point sca-za.com to the new site (email stays exactly where it is)",
  "Google Search Console and Bing Webmaster Tools",
  "Confirm the hero video licence",
];

export default function SiteInfoPage() {
  const updated = new Date(audit.auditedAt).toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" });
  const stats = [
    [String(audit.total), "pages"],
    [String(services.length), "service pages"],
    [String(libraryDocuments.length), "free PDF guides"],
    [String(faqs.length), "questions answered"],
    [String(tutorials.length), "AI tutorials"],
    [`${audit.score}/100`, "SEO score"],
  ];

  return (
    <>
      <header className="si-hero">
        <div className="shell">
          <p className="label">Website overview · {updated}</p>
          <h1>The South Coast Advisory website at a glance</h1>
          <p className="lede">
            Built to turn searches for an accountant on the KZN South Coast into consultations
            with {founder.name.split(" ")[0]}, and to prove {site.yearsTrading} years of standing
            to people who have never met him.
          </p>
          <dl className="si-stats">
            {stats.map(([n, l]) => (
              <div key={l}>
                <dt>{n}</dt>
                <dd>{l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <section className="shell section">
        <p className="label">What the website does</p>
        <div className="si-grid">
          {features.map((f, i) => (
            <Link key={f.title} href={f.href} className="si-tile">
              <span className="si-tile__n">{String(i + 1).padStart(2, "0")}</span>
              <strong>{f.title}</strong>
              <span className="si-tile__line">{f.line}</span>
              <span className="si-tile__see">See it →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="surface">
        <div className="shell section">
          <p className="label">How a client finds and books the practice</p>
          <ol className="si-steps">
            {steps.map(([t, b], i) => (
              <li key={t}>
                <span className="si-steps__n">{i + 1}</span>
                <strong>{t}</strong>
                <span>{b}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="shell section si-seo">
        <div>
          <p className="label">Found on Google and AI assistants</p>
          <p className="si-score">
            {audit.score}
            <span>/100</span>
          </p>
          <p>
            Average SEO score over all {audit.total} pages, measured against the basics Google, Bing
            and AI assistants read.
          </p>
          <p className="si-note">
            What would raise rankings further: real client reviews on Google, and the Business
            Profile linked to the site.
          </p>
        </div>
        <div className="si-seo__cols">
          <div>
            <p className="si-subhead">By section</p>
            <ul className="si-bars">
              {audit.sections.map((s) => (
                <li key={s.name}>
                  <span>{s.name}</span>
                  <span className="si-num">{s.score}</span>
                  <span className="si-bar">
                    <span style={{ width: `${s.score}%` }} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="si-subhead">Checks passed</p>
            <ul className="si-checks">
              {audit.checks.map((c) => (
                <li key={c.label}>
                  <span>{c.label}</span>
                  <span className={c.passed === audit.total ? "si-num is-all" : "si-num"}>
                    {c.passed === audit.total ? "All" : `${c.passed}/${audit.total}`}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="surface" id="guarantee">
        <div className="shell section si-guarantee">
          <div className="si-guarantee__head">
            <span className="si-seal" aria-hidden="true">
              <span>Ranking</span>
              <strong>Guarantee</strong>
              <span>6 months</span>
            </span>
            <div>
              <p className="label">Our guarantee</p>
              <p className="si-guarantee__title">Found on Google and named by AI search, or we keep working</p>
              <p>
                A website only earns its place if the people looking for an accountant on the South
                Coast find it. So the targets are written down, measured every month, and ours to meet.
              </p>
            </div>
          </div>

          <ol className="si-guarantee__terms">
            {guaranteeTerms.map(([t, b]) => (
              <li key={t}>
                <strong>{t}</strong>
                <span>{b}</span>
              </li>
            ))}
          </ol>

          <div className="si-guarantee__lists">
            <div>
              <p className="si-subhead">Google: the phrases measured</p>
              <ul className="si-pills">
                {guaranteeKeywords.map((k) => (
                  <li key={k}>{k}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="si-subhead">AI search: the questions asked</p>
              <ul className="si-checks">
                {aiQuestions.map((q) => (
                  <li key={q}>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="si-guarantee__fine">
            <strong>What it covers, and what it does not.</strong> The guarantee is about being found:
            rankings and AI answers. It does not promise a number of enquiries, clients or revenue,
            because those also depend on fees, reviews and how each enquiry is followed up. The six
            months run from the day sca-za.com points to the new site, and assume the Google Business
            Profile is linked and client reviews are being collected. Rankings are measured from a
            neutral, signed-out search in the Durban area.
          </p>
        </div>
      </section>

      <section className="ink">
        <div className="shell section si-launch">
          <div>
            <p className="label">Before launch: from Neil</p>
            <ul>
              {fromNeil.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="label">Before launch: switched on by us</p>
            <ul>
              {switchOn.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
