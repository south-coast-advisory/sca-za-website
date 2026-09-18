import Link from "next/link";
import { AnswerBlock, Breadcrumbs, CtaBand, FaqList } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { faqsByIds } from "@/content/faq";
import { plans, planPromotion, PRICES_AS_AT, PRICE_CHANGE_NOTE } from "@/content/xero";
import { breadcrumbSchema, faqSchema, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Xero Pricing in South Africa, Explained",
  description:
    "What Xero costs in South Africa: Starter, Standard and Premium plans in rand, what each includes, and what a Xero partner adds on top. Updated September 2026.",
  path: "/xero/pricing",
});

const trail = [
  { name: "Home", path: "/" },
  { name: "Xero", path: "/xero" },
  { name: "Pricing", path: "/xero/pricing" },
];

const xeroFaqs = faqsByIds(["xero-cost", "xero-payroll", "xero-why-switch"]);

export default function XeroPricingPage() {
  return (
    <>
      <JsonLd data={[faqSchema(xeroFaqs), breadcrumbSchema(trail)]} />

      <section className="shell section">
        <Breadcrumbs trail={trail} />
        <h1>What Xero costs in South Africa</h1>
        <p className="lede">
          Xero publishes its prices, so we do too. What follows is the subscription you pay Xero.
          Our fee for running your books is separate, and is on our{" "}
          <Link href="/pricing">pricing page</Link>.
        </p>
        <div style={{ marginTop: "var(--space-8)" }}>
          <AnswerBlock>
            Xero has three plans in South Africa: Starter at R450 a month, Standard at R795 and
            Premium at R1 095, as at {PRICES_AS_AT}. Most trading businesses need Standard, which
            has unlimited invoices and bills. Multi-currency only comes with Premium. South African
            payroll is handled by an integrated payroll system, not by Xero itself.
          </AnswerBlock>
        </div>
      </section>

      <section className="surface">
        <div className="shell section">
          <h2>The three plans</h2>
          <div className="table-wrap" style={{ marginTop: "var(--space-6)" }}>
            <table className="data">
              <thead>
                <tr>
                  <th>Plan</th>
                  <th>Per month</th>
                  <th>Who it suits</th>
                  <th>Includes</th>
                  <th>Watch out for</th>
                </tr>
              </thead>
              <tbody>
                {plans.map((p) => (
                  <tr key={p.name}>
                    <td style={{ fontWeight: 600, color: "var(--color-dark)" }}>{p.name}</td>
                    <td className="mono" style={{ whiteSpace: "nowrap", fontWeight: 600 }}>
                      {p.monthly}
                    </td>
                    <td>{p.suits}</td>
                    <td>
                      <ul style={{ margin: 0, paddingLeft: "1rem" }}>
                        {p.includes.map((i) => (
                          <li key={i}>{i}</li>
                        ))}
                      </ul>
                    </td>
                    <td>
                      <ul style={{ margin: 0, paddingLeft: "1rem" }}>
                        {p.limits.map((i) => (
                          <li key={i}>{i}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ marginTop: "var(--space-4)", fontSize: "var(--text-sm)", color: "var(--color-copy-muted)" }}>
            Prices as published by Xero on {PRICES_AS_AT}, in South African rand, excluding any
            add-ons. {planPromotion} {PRICE_CHANGE_NOTE}
          </p>
        </div>
      </section>

      <section className="shell section">
        <h2>What a partner adds</h2>
        <div
          style={{
            display: "grid",
            gap: "var(--space-4)",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            marginTop: "var(--space-6)",
          }}
        >
          {[
            [
              "Partner-rate subscriptions",
              "As a Xero partner we can carry the subscription for you at partner rates and bill it with your monthly fee, or you can pay Xero directly. Your choice.",
            ],
            [
              "Set up so the reports mean something",
              "The plan is the cheap part. The value is a chart of accounts built around how your business actually earns, which is what makes the reports worth reading.",
            ],
            [
              "One number to phone",
              "When something looks wrong, you phone us, not an overseas support queue. Partner practices have a direct line to Xero support.",
            ],
          ].map(([title, body]) => (
            <div key={title} className="card">
              <h3 style={{ fontSize: "var(--text-lg)" }}>{title}</h3>
              <p style={{ marginBottom: 0, fontSize: "var(--text-sm)" }}>{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="surface">
        <div className="shell section">
          <h2>Questions about cost</h2>
          <FaqList items={xeroFaqs} />
        </div>
      </section>

      <CtaBand
        title="Not sure which plan you need?"
        body="Tell us how you invoice and we will tell you which plan fits, in twenty minutes and at no charge."
      />
    </>
  );
}
