import Link from "next/link";
import { AnswerBlock, Breadcrumbs, CtaBand, FaqList } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { faqsByIds } from "@/content/faq";
import { breadcrumbSchema, faqSchema, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "What Accounting Costs, and How We Quote",
  description:
    "How South Coast Advisory prices monthly accounting, tax, payroll and advisory work for KZN South Coast businesses, and what drives the fee up or down.",
  path: "/pricing",
});

const trail = [
  { name: "Home", path: "/" },
  { name: "Pricing", path: "/pricing" },
];

/**
 * NOTE FOR BUILD: package prices are pending Neil's 2026 figures
 * (the only price list on file is Pricelist_SCA_120620.xlsx from 2020).
 * Do not invent numbers. When the figures arrive, add `priceFrom` to each
 * package below and add Offer/priceSpecification to the schema.
 */
const packages = [
  {
    name: "Starting out",
    who: "Newly registered companies and sole proprietors finding their feet.",
    includes: [
      "Company and SARS registrations",
      "Xero set up properly from day one",
      "Annual financial statements and tax return",
      "CIPC annual return",
    ],
  },
  {
    name: "Monthly books",
    who: "Trading businesses with staff, VAT and a steady flow of paperwork.",
    includes: [
      "Monthly bookkeeping and bank reconciliation",
      "VAT201 returns",
      "Payroll, EMP201 and EMP501",
      "Annual financial statements and tax returns",
    ],
  },
  {
    name: "Books and advice",
    who: "Established businesses where the decisions have become expensive.",
    includes: [
      "Everything in Monthly books",
      "Monthly management accounts with commentary",
      "13-week cash flow forecast",
      "Quarterly review with the managing director",
    ],
  },
  {
    name: "Project work",
    who: "A valuation, a catch-up, a Xero migration or a CIPC clean-up.",
    includes: [
      "Scoped and quoted as a fixed fee",
      "Agreed before any work starts",
      "Billed separately from any monthly fee",
    ],
  },
];

export default function PricingPage() {
  return (
    <>
      <JsonLd data={[faqSchema(faqsByIds(["accountant-cost"])), breadcrumbSchema(trail)]} />

      <section className="shell section">
        <Breadcrumbs trail={trail} />
        <h1>What this costs, and what drives the number</h1>
        <p className="lede">
          Most accountants will not discuss fees until you are in the room. We would rather tell you
          how we price, so you can work out whether we are in your range before you phone.
        </p>
        <div style={{ marginTop: "var(--space-8)" }}>
          <AnswerBlock>
            South Coast Advisory quotes a fixed monthly fee after a short review of your records.
            The fee is driven by transaction volume, whether you are VAT registered, how many
            employees are on payroll and how current your books are. Catch-up work on old records is
            quoted separately so you can see exactly what the clean-up costs.
          </AnswerBlock>
        </div>
      </section>

      <section className="surface">
        <div className="shell section">
          <h2>How the work is packaged</h2>
          <div
            style={{
              display: "grid",
              gap: "var(--space-4)",
              gridTemplateColumns: "repeat(auto-fit, minmax(255px, 1fr))",
              marginTop: "var(--space-6)",
            }}
          >
            {packages.map((p) => (
              <div key={p.name} className="card" style={{ display: "grid", gap: "var(--space-3)", alignContent: "start" }}>
                <h3 style={{ fontSize: "var(--text-lg)", marginBottom: 0 }}>{p.name}</h3>
                <p style={{ margin: 0, fontSize: "var(--text-sm)", color: "var(--color-copy-muted)" }}>
                  {p.who}
                </p>
                <ul style={{ paddingLeft: "1.1rem", margin: 0, fontSize: "var(--text-sm)" }}>
                  {p.includes.map((i) => (
                    <li key={i} style={{ marginBottom: "var(--space-1)" }}>
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="shell section">
        <h2>What makes a fee go up or down</h2>
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>Factor</th>
                <th>Lower fee</th>
                <th>Higher fee</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Transaction volume</td>
                <td>One bank account, few transactions</td>
                <td>Several accounts, card machines, high volume</td>
              </tr>
              <tr>
                <td>VAT</td>
                <td>Not registered</td>
                <td>Registered, with mixed-rate supplies</td>
              </tr>
              <tr>
                <td>Payroll</td>
                <td>No employees</td>
                <td>Several employees, benefits, commission structures</td>
              </tr>
              <tr>
                <td>State of records</td>
                <td>Current and reconciled in Xero</td>
                <td>Years behind, or in boxes</td>
              </tr>
              <tr>
                <td>Reporting</td>
                <td>Annual statements only</td>
                <td>Monthly management accounts and forecasting</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={{ marginTop: "var(--space-6)" }}>
          <Link href="/contact" className="btn btn-primary">
            Get a fixed quote
          </Link>
        </p>
      </section>

      <section className="surface">
        <div className="shell section">
          <h2>Fee questions</h2>
          <FaqList items={faqsByIds(["accountant-cost", "shoebox", "switch-accountant"])} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
