import Link from "next/link";
import { AnswerBlock, Breadcrumbs, CtaBand } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Free Accounting & SARS Resources",
  description:
    "Checklists, templates and plain-English answers for South African business owners: SARS deadlines, payroll compliance, Xero migration and month-end close.",
  path: "/resources",
});

const trail = [
  { name: "Home", path: "/" },
  { name: "Resources", path: "/resources" },
];

/**
 * Phase 4 builds the gated library against the Supabase `documents` table.
 * Until the documents exist, this page ships only what is genuinely available —
 * no "coming soon" cards, which read as an unfinished site.
 */
const live = [
  {
    href: "/resources/library",
    title: "Free guides and checklists",
    detail:
      "Six PDF guides written by this practice: SARS deadlines, moving to Xero, month-end close, payroll compliance, VAT registration and record keeping.",
  },
  {
    href: "/resources/ai",
    title: "AI for business owners",
    detail:
      "Where AI genuinely helps a small business, what you must never paste into a chatbot, prompts that work, and what it can and cannot do with your books.",
  },
  {
    href: "/resources/sars-deadlines",
    title: "SARS and CIPC deadline calendar",
    detail:
      "The returns that repeat every year — EMP201, VAT201, EMP501, provisional tax, CIPC annual returns — and what happens when one is missed.",
  },
  {
    href: "/faq",
    title: "Questions, answered properly",
    detail:
      "Provisional tax, VAT registration, EMP201 penalties, CIPC annual returns and what an accountant actually costs.",
  },
  {
    href: "/glossary",
    title: "Accounting and SARS glossary",
    detail:
      "Every term you will meet in your own books, defined for South African rules and linked to the service it belongs to.",
  },
  {
    href: "/xero",
    title: "Moving to Xero",
    detail: "What migration involves, how long it takes, and when you should not bother.",
  },
  {
    href: "/pricing",
    title: "How we quote",
    detail: "What drives an accounting fee up or down, so you can judge before you phone.",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />

      <section className="shell section">
        <Breadcrumbs trail={trail} />
        <h1>Resources for South African business owners</h1>
        <p className="lede">
          Everything here is written by the practice, for owners who would rather understand the
          rules than be managed by them.
        </p>
        <div style={{ marginTop: "var(--space-8)" }}>
          <AnswerBlock>
            South Coast Advisory publishes free guidance for South African business owners covering
            SARS deadlines and penalties, VAT and provisional tax, payroll submissions, CIPC
            compliance and moving accounting software to Xero.
          </AnswerBlock>
        </div>
      </section>

      <section className="shell section-tight">
        <div
          style={{
            display: "grid",
            gap: "var(--space-4)",
            gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
          }}
        >
          {live.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className="card"
              style={{ textDecoration: "none", display: "grid", gap: "var(--space-2)" }}
            >
              <h2 style={{ fontSize: "var(--text-lg)", marginBottom: 0 }}>{r.title}</h2>
              <p style={{ margin: 0, fontSize: "var(--text-sm)", color: "var(--color-copy)" }}>
                {r.detail}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <CtaBand
        title="Want something specific?"
        body="Tell us what you are trying to work out and we will point you at the right answer, or write it."
      />
    </>
  );
}
