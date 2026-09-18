import Link from "next/link";
import { AnswerBlock, Breadcrumbs, CtaBand, GlossaryLinks } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "SARS & CIPC Deadlines: The Recurring Calendar",
  description:
    "When EMP201, VAT201, EMP501, provisional tax and CIPC annual returns are due in South Africa, what happens if you miss one, and how the dates are worked out.",
  path: "/resources/sars-deadlines",
});

const trail = [
  { name: "Home", path: "/" },
  { name: "Resources", path: "/resources" },
  { name: "SARS deadlines", path: "/resources/sars-deadlines" },
];

/**
 * Recurring rules only. Filing-season opening and closing dates are announced
 * by SARS each year and deliberately are NOT printed here — a wrong date on an
 * accountant's website is worse than no date. See README-HANDOFF.md.
 */
const recurring = [
  {
    what: "EMP201 (PAYE, UIF, SDL)",
    when: "By the 7th of the month after the payroll month",
    detail:
      "Where the 7th falls on a weekend or public holiday, it moves to the last business day before it. Late payment attracts a penalty on the amount due, plus interest.",
    service: "/services/payroll",
  },
  {
    what: "VAT201",
    when: "By the 25th of the month after the tax period, or the last business day of that month when filing and paying on eFiling",
    detail:
      "Most smaller vendors file every two months on a category allocated by SARS; larger vendors file monthly. Your category is on your VAT registration, not a matter of choice.",
    service: "/services/tax",
  },
  {
    what: "EMP501 reconciliation",
    when: "Twice a year — an interim reconciliation after the August payroll, and an annual one after February",
    detail:
      "SARS announces the submission window for each. The annual one produces your employees' IRP5 certificates, so a late submission holds up every employee's own tax return.",
    service: "/services/payroll",
  },
  {
    what: "Provisional tax, first period (IRP6)",
    when: "Within six months of the start of the year of assessment — 31 August for a February year end",
    detail:
      "Based on an estimate of the full year's taxable income. Under-estimating carries penalties, so the estimate deserves real attention rather than a repeat of last year.",
    service: "/services/tax",
  },
  {
    what: "Provisional tax, second period (IRP6)",
    when: "By the last day of the year of assessment — the end of February for most taxpayers",
    detail:
      "This is where the accuracy rules bite hardest. Get the estimate within the required range or expect an under-estimation penalty.",
    service: "/services/tax",
  },
  {
    what: "Provisional tax, third (voluntary) payment",
    when: "Usually within six months after the year end — 30 September for a February year end",
    detail:
      "Optional, and it stops interest running on any shortfall. Worth making whenever the second estimate turned out low.",
    service: "/services/tax",
  },
  {
    what: "Company income tax return (ITR14)",
    when: "Within twelve months of the company's financial year end",
    detail:
      "The return is built from the annual financial statements, so the real deadline is whenever your books need to be finished — normally months earlier.",
    service: "/services/tax",
  },
  {
    what: "CIPC annual return",
    when: "Within 30 business days of the anniversary of the company's registration date",
    detail:
      "Separate from any SARS return, with a fee based on turnover. Companies that do not file are placed in deregistration, which can freeze bank accounts and contracts.",
    service: "/services/company-secretarial",
  },
  {
    what: "Beneficial ownership filing",
    when: "With the annual return each year",
    detail:
      "The register of the natural people who ultimately own or control the company, traced through any company or trust shareholders.",
    service: "/services/company-secretarial",
  },
  {
    what: "COIDA return of earnings (ROE)",
    when: "Annually, in the window the Compensation Fund announces",
    detail:
      "Declares actual and estimated employee earnings. A valid letter of good standing depends on it, and many contracts require that letter.",
    service: "/services/payroll",
  },
];

export default function DeadlinesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />

      <section className="shell section">
        <Breadcrumbs trail={trail} />
        <h1>The deadlines that repeat, every year</h1>
        <p className="lede">
          Filing-season dates change annually and SARS announces them. These do not — they are set
          by your payroll month, your VAT category and your own year end.
        </p>
        <div style={{ marginTop: "var(--space-8)" }}>
          <AnswerBlock>
            In South Africa the EMP201 is due by the 7th of the following month, VAT201 returns by
            the 25th or the last business day when filed on eFiling, EMP501 reconciliations twice a
            year, provisional tax within six months of the year start and again at year end, company
            tax returns within twelve months of year end, and the CIPC annual return within 30
            business days of the company&rsquo;s registration anniversary.
          </AnswerBlock>
        </div>
      </section>

      <section className="shell section-tight">
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>Return</th>
                <th>When it is due</th>
                <th>What to know</th>
              </tr>
            </thead>
            <tbody>
              {recurring.map((r) => (
                <tr key={r.what}>
                  <td style={{ fontWeight: 600, color: "var(--color-dark)" }}>
                    <Link href={r.service}>{r.what}</Link>
                  </td>
                  <td>{r.when}</td>
                  <td>{r.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ marginTop: "var(--space-6)", fontSize: "var(--text-sm)", color: "var(--color-copy-muted)" }}>
          Individual and provisional taxpayer filing season dates are announced by SARS each year and
          are not listed here on purpose, because a wrong date is worse than no date. Phone us and we
          will tell you the current one, or check sars.gov.za.
        </p>
      </section>

      <section className="surface">
        <div className="shell section">
          <h2>What happens when one is missed</h2>
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
                "Administrative penalties recur",
                "SARS charges a fixed monthly penalty for each outstanding return, every month, until it is filed. Filing stops the clock — that is always step one.",
              ],
              [
                "Interest runs separately",
                "Interest on unpaid tax is charged independently of penalties, and it is not negotiable in the way penalties sometimes are.",
              ],
              [
                "SARS can collect directly",
                "A third-party appointment instructs your bank or employer to pay a tax debt out of your funds, without negotiation. Early arrangements avoid this.",
              ],
            ].map(([title, body]) => (
              <div key={title} className="card">
                <h3 style={{ fontSize: "var(--text-lg)" }}>{title}</h3>
                <p style={{ marginBottom: 0, fontSize: "var(--text-sm)" }}>{body}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "var(--space-8)" }}>
            <GlossaryLinks
              ids={["admin-penalty", "emp201", "vat201", "provisional-tax", "annual-return", "third-party-appointment"]}
            />
          </div>
        </div>
      </section>

      <CtaBand
        title="Let us carry the calendar"
        body="Every client's deadlines sit in our diary, not their heads. That is most of what a monthly fee buys."
      />
    </>
  );
}
