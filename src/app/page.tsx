import Link from "next/link";
import { LeadForm } from "@/components/LeadForm";
import { AnswerBlock, CtaBand, FaqList, ProofRow } from "@/components/Blocks";
import { Testimonials } from "@/components/Testimonials";
import { JsonLd } from "@/components/JsonLd";
import { faqsByIds } from "@/content/faq";
import { services, stages } from "@/content/services";
import { founder, site } from "@/lib/site";
import { faqSchema, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  // Short enough that the brand suffix survives; Xero terms are targeted by /xero.
  title: "Accountants in Amanzimtoti",
  description:
    "Accounting, tax, payroll and Xero support for KZN South Coast businesses. In Amanzimtoti since 1980, and a Xero Silver Partner. Book a free 20-minute call.",
  path: "/",
});

/** Re-check for newly approved testimonials hourly. */
export const revalidate = 3600;

const homeFaqs = faqsByIds([
  "accountant-cost",
  "switch-accountant",
  "xero-what-is-partner",
  "where-are-you",
  "shoebox",
  "provisional-tax-who",
]);

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema(homeFaqs)} />

      {/* ── Hero: where am I / what do I get / why care / what next ── */}
      <section className="shell section">
        <div className="hero-grid">
          <div className="hero-copy">
            <h1>Accountants and Xero partner in Amanzimtoti since 1980</h1>
            <p className="lede">
              We keep the books current, the returns filed and SARS satisfied for owner-managed
              businesses along the KZN South Coast — so you can spend your time on the part of the
              business that earns.
            </p>
          </div>
          <div className="hero-form">
            <LeadForm source="home-hero" compact />
          </div>
          <div className="hero-proof">
            <ProofRow />
          </div>
        </div>
      </section>

      {/* ── Self-selection by stage ── */}
      <section className="surface">
        <div className="shell section">
          <h2>Where is your business right now?</h2>
          <p className="lede">
            The right service depends less on your industry than on your stage. Start where you
            recognise yourself.
          </p>
          <div
            style={{
              display: "grid",
              gap: "var(--space-4)",
              gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
              marginTop: "var(--space-8)",
            }}
          >
            {stages.map((stage) => {
              const first = services.find((s) => s.stage === stage.id);
              return (
                <div key={stage.id} className="card" style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
                  <h3 style={{ marginBottom: 0 }}>{stage.title}</h3>
                  <p style={{ fontSize: "var(--text-sm)", marginBottom: "var(--space-2)" }}>
                    {stage.detail}
                  </p>
                  {first && (
                    <Link href={`/services/${first.slug}`} className="card-cta">
                      {first.nav}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Xero: the differentiator ── */}
      <section className="shell section">
        <div
          style={{
            display: "grid",
            gap: "var(--space-12)",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            alignItems: "center",
          }}
        >
          <div>
            <p className="label">Xero Silver Partner</p>
            <h2>Your books and our books are the same file</h2>
            <AnswerBlock>
              South Coast Advisory is a Xero Silver Partner based in Amanzimtoti. We migrate
              businesses from Pastel, Sage and QuickBooks to Xero, set up bank feeds and payroll,
              train your team, and then work in the same live file you do — so nobody is emailing
              backups or reconciling two versions of the truth.
            </AnswerBlock>
            <p style={{ marginTop: "var(--space-6)" }}>
              <Link href="/xero" className="btn btn-outline">
                How we move you to Xero
              </Link>
            </p>
          </div>
          <ul style={{ display: "grid", gap: "var(--space-4)", listStyle: "none", margin: 0, padding: 0 }}>
            {[
              ["Bank feeds reconcile daily", "Your position is current, not six weeks old."],
              ["VAT and month-end stop being a scramble", "The work is already done when the deadline arrives."],
              ["We see what you see", "Questions get answered from live data, on the phone."],
            ].map(([title, body]) => (
              <li key={title} className="card">
                <h3 style={{ fontSize: "var(--text-lg)", marginBottom: "var(--space-1)" }}>{title}</h3>
                <p style={{ marginBottom: 0, fontSize: "var(--text-sm)" }}>{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Founder: credentials carry this, not a photograph ── */}
      <section className="wash">
        <div className="shell section">
          <div style={{ width: "min(100%, 60ch)", marginInline: "auto", textAlign: "center" }}>
            <p className="label">Who you will be dealing with</p>
            <h2>{founder.name}</h2>
            <p>
              Neil qualified through articles while studying after hours, and started this practice
              in Amanzimtoti in {site.founded}. He is a member of SAICA, a past president of SAIPA,
              and served three years on the Financial Management Accounting Committee of the
              International Federation of Accountants.
            </p>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: "var(--space-6) 0",
                fontSize: "var(--text-sm)",
                display: "grid",
                gap: "var(--space-2)",
              }}
            >
              <li>SAIPA President&rsquo;s Award, 2004</li>
              <li>SAIPA membership number 115 — very nearly a founder member</li>
              <li>{site.yearsTrading} years advising businesses on this coast</li>
            </ul>
            <Link href="/about" style={{ fontWeight: 600 }}>
              More about the practice →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Proof, once real testimonials are approved ── */}
      <Testimonials limit={3} />

      {/* ── Services index ── */}
      <section className="shell section">
        <h2>What we do</h2>
        <div
          style={{
            display: "grid",
            gap: "var(--space-4)",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            marginTop: "var(--space-6)",
          }}
        >
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="card"
              style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: "var(--space-2)" }}
            >
              <h3 style={{ marginBottom: 0, fontSize: "var(--text-lg)" }}>{s.nav}</h3>
              <p style={{ margin: 0, fontSize: "var(--text-sm)", color: "var(--color-copy)" }}>
                {s.h1}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="surface">
        <div className="shell section">
          <h2>Questions we are asked most</h2>
          <div style={{ marginTop: "var(--space-6)" }}>
            <FaqList items={homeFaqs} />
          </div>
          <p style={{ marginTop: "var(--space-6)" }}>
            <Link href="/faq" style={{ fontWeight: 600 }}>
              All questions →
            </Link>{" "}
            <Link href="/glossary" style={{ fontWeight: 600, marginLeft: "var(--space-4)" }}>
              Accounting and SARS glossary →
            </Link>
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
