import Link from "next/link";
import { AnswerBlock, Breadcrumbs, CtaBand, FaqList, GlossaryLinks } from "@/components/Blocks";
import { LeadForm } from "@/components/LeadForm";
import { JsonLd } from "@/components/JsonLd";
import { faqsByIds } from "@/content/faq";
import {
  features,
  migratingFrom,
  migrationSteps,
  partnerFacts,
  plans,
  PRICES_AS_AT,
  southAfricanFacts,
} from "@/content/xero";
import { breadcrumbSchema, faqSchema, pageMeta, serviceSchema } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Xero Partner, KZN South Coast",
  description:
    "A Xero Silver Partner in Amanzimtoti. We move businesses from Pastel, Sage and QuickBooks to Xero, connect SA bank feeds and payroll, and train your team.",
  path: "/xero",
});

const xeroFaqs = faqsByIds([
  "xero-what-is-partner",
  "xero-why-switch",
  "xero-migration-time",
  "xero-cost",
  "xero-payroll",
]);

const trail = [
  { name: "Home", path: "/" },
  { name: "Xero", path: "/xero" },
];

export default function XeroPage() {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: "Xero migration, setup and support",
            description:
              "Xero Silver Partner in Amanzimtoti providing migration from Pastel, Sage and QuickBooks, setup, South African payroll integration, training and ongoing support.",
            path: "/xero",
          }),
          faqSchema(xeroFaqs),
          breadcrumbSchema(trail),
        ]}
      />

      <section className="shell section">
        <Breadcrumbs trail={trail} />
        <div
          style={{
            display: "grid",
            gap: "var(--space-12)",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
            alignItems: "start",
          }}
        >
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/xero/logo-xero-blue.svg"
              alt="Xero"
              width={96}
              height={96}
              style={{ width: "66px", height: "auto", marginBottom: "var(--space-4)" }}
            />
            <h1>The South Coast&rsquo;s Xero partner</h1>
            <p className="lede">
              Moving to Xero is not really a software project. It is the point at which you stop
              finding out how the business did two months after the fact.
            </p>
            <div style={{ marginTop: "var(--space-8)" }}>
              <AnswerBlock>
                A Xero partner is an accounting practice certified by Xero and working in it every
                day. South Coast Advisory migrates businesses from Pastel, Sage and QuickBooks to
                Xero, connects South African bank feeds and payroll, trains the team, and then works
                in the same live file as the client from our office in Amanzimtoti.
              </AnswerBlock>
            </div>
          </div>
          <LeadForm source="xero-hero" service="xero" heading="Book a free Xero call" compact />
        </div>
      </section>

      {/* ── The product itself ── */}
      <section className="shell section-tight">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/xero/xero-hero.webp"
          alt="Bank statements, receipts, an overdue invoice and a tax return being handed across a desk towards a laptop running Xero."
          width={1800}
          height={743}
          loading="lazy"
          style={{ width: "100%", height: "auto" }}
        />
        <p
          style={{
            marginTop: "var(--space-3)",
            fontSize: "var(--text-xs)",
            color: "var(--color-copy-muted)",
          }}
        >
          Everything that lands on your desk, in one place. Xero imagery, supplied by Xero.
        </p>
      </section>

      {/* ── What partner status actually means ── */}
      <section className="surface">
        <div className="shell section">
          <h2>What &ldquo;Silver Partner&rdquo; actually means</h2>
          <p className="lede">
            Partner status is earned through client work, not bought. Here is the plain version.
          </p>
          <ul
            style={{
              display: "grid",
              gap: "var(--space-4)",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              listStyle: "none",
              margin: "var(--space-8) 0 0",
              padding: 0,
            }}
          >
            {partnerFacts.map((fact) => (
              <li key={fact} className="card">
                <p style={{ marginBottom: 0, fontSize: "var(--text-sm)" }}>{fact}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Migration ── */}
      <section className="shell section" id="migrate">
        <h2>Moving to Xero, in four steps</h2>
        <p className="lede">
          A straightforward small business is usually live in two to three weeks. Most of that is
          waiting for banks to approve feeds, not working.
        </p>
        <ol
          style={{
            display: "grid",
            gap: "var(--space-4)",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            listStyle: "none",
            margin: "var(--space-8) 0 0",
            padding: 0,
          }}
        >
          {migrationSteps.map((s, i) => (
            <li key={s.title} className="card">
              <span
                className="label"
                style={{ color: "var(--color-secondary)", display: "block", marginBottom: "var(--space-2)" }}
              >
                Step {i + 1}
              </span>
              <h3 style={{ fontSize: "var(--text-lg)" }}>{s.title}</h3>
              <p style={{ marginBottom: 0, fontSize: "var(--text-sm)" }}>{s.detail}</p>
            </li>
          ))}
        </ol>

        <h3 style={{ marginTop: "var(--space-12)" }}>Coming from another system?</h3>
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>Moving from</th>
                <th>What to expect</th>
              </tr>
            </thead>
            <tbody>
              {migratingFrom.map((m) => (
                <tr key={m.from}>
                  <td style={{ fontWeight: 600, color: "var(--color-dark)", whiteSpace: "nowrap" }}>
                    {m.from}
                  </td>
                  <td>{m.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── South African specifics ── */}
      <section className="wash">
        <div className="shell section">
          <h2>Xero in South Africa, specifically</h2>
          <p className="lede">
            Most Xero material is written for Britain or Australia. These are the answers for here.
          </p>
          <div style={{ marginTop: "var(--space-6)" }}>
            {southAfricanFacts.map((f) => (
              <details key={f.q} className="faq-item">
                <summary>{f.q}</summary>
                <div className="faq-body">
                  <p>{f.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features, with Xero's own product icons ── */}
      <section className="shell section">
        <h2>What you actually get in Xero</h2>
        <p className="lede">
          The features that matter to an owner-managed South African business, in plain terms.
        </p>
        <div
          style={{
            display: "grid",
            gap: "var(--space-6)",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            marginTop: "var(--space-8)",
          }}
        >
          {features.map((f) => (
            /* Reversed Xero tile: the words lead, the picture supports. */
            <div
              key={f.name}
              className="card"
              style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}
            >
              <div style={{ padding: "var(--space-6) var(--space-6) var(--space-4)", flex: 1 }}>
                <h3 style={{ fontSize: "var(--text-base)", marginBottom: "var(--space-1)" }}>{f.name}</h3>
                <p style={{ margin: 0, fontSize: "var(--text-sm)", color: "var(--color-copy-muted)" }}>
                  {f.detail}
                </p>
              </div>
              {f.icon && (
                /* Fixed ratio panel so every tile in the grid lines up, whatever
                   the individual artwork's dimensions are. */
                <div className="card-media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/xero/${f.icon}`}
                    alt={`Xero ${f.name.toLowerCase()}`}
                    loading="lazy"
                    width={299}
                    height={157}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Pricing teaser ── */}
      <section className="surface">
        <div className="shell section">
          <div
            style={{
              display: "grid",
              gap: "var(--space-8)",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
              alignItems: "center",
            }}
          >
            <div>
              <h2>What it costs</h2>
              <p>
                Xero&rsquo;s South African plans run from {plans[0].monthly} to{" "}
                {plans[plans.length - 1].monthly} a month, as at {PRICES_AS_AT}. Most trading
                businesses need the {plans[1].name} plan.
              </p>
              <Link href="/xero/pricing" className="btn btn-outline">
                Compare the three plans
              </Link>
            </div>
            <div className="card">
              <p className="label">Our fee is separate</p>
              <p style={{ marginBottom: 0, fontSize: "var(--text-sm)" }}>
                The subscription above goes to Xero. What we charge to run your books is quoted as a
                fixed monthly fee after a short review — see{" "}
                <Link href="/pricing">how we quote</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="shell section">
        <h2>Xero questions</h2>
        <div style={{ marginTop: "var(--space-6)" }}>
          <FaqList items={xeroFaqs} />
        </div>
        <div style={{ marginTop: "var(--space-6)" }}>
          <GlossaryLinks
            ids={["bank-feed", "bank-reconciliation", "chart-of-accounts", "cloud-accounting", "vat201", "two-factor"]}
          />
          <p style={{ fontSize: "var(--text-sm)" }}>
            Already on Xero and just need the work done?{" "}
            <Link href="/services/accounting-bookkeeping">See monthly bookkeeping →</Link>
          </p>
        </div>
      </section>

      <CtaBand
        title="Find out whether Xero is right for you"
        body="Twenty minutes on the phone is usually enough to tell. If it is not right for your business, we will say so."
      />
    </>
  );
}
