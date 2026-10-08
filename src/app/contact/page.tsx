import { Breadcrumbs } from "@/components/Blocks";
import { LeadForm } from "@/components/LeadForm";
import { JsonLd } from "@/components/JsonLd";
import { site, telHref } from "@/lib/site";
import { breadcrumbSchema, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Contact Us, Amanzimtoti",
  description:
    "Phone South Coast Advisory on 031 903 4787, or book a free 20-minute consultation. Our office is at 22 Rosslyn Road, Amanzimtoti, KwaZulu-Natal.",
  path: "/contact",
});

const trail = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
];

const mapQuery = encodeURIComponent(
  `${site.address.street}, ${site.address.locality}, ${site.address.postalCode}`,
);

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />

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
            <h1>Talk to an accountant in Amanzimtoti</h1>
            <p className="lede">
              A free 20-minute consultation. Tell us your stage of growth and where the constraint
              sits — a SARS backlog, tight cash flow, books that lag the business, or a sale on the
              horizon. We will tell you what to fix first, and whether we are the right firm to do it.
            </p>

            <div style={{ marginTop: "var(--space-8)", display: "grid", gap: "var(--space-6)" }}>
              <div>
                <p className="label">Phone</p>
                <p style={{ fontSize: "var(--text-xl)", marginBottom: 0 }}>
                  <a href={telHref} style={{ fontWeight: 600 }}>
                    {site.phoneDisplay}
                  </a>
                </p>
              </div>
              <div>
                <p className="label">Office</p>
                <p style={{ marginBottom: 0 }}>
                  {site.address.street}
                  <br />
                  {site.address.locality}
                  <br />
                  {site.address.region} {site.address.postalCode}
                </p>
              </div>
              <div>
                <p className="label">Hours</p>
                <p style={{ marginBottom: 0 }}>Monday to Friday, 08:00 to 16:30</p>
              </div>
              <div>
                <p className="label">Areas we serve</p>
                <p style={{ marginBottom: 0, fontSize: "var(--text-sm)" }}>
                  {site.areasServed.join(" · ")}
                </p>
              </div>
            </div>
          </div>

          <LeadForm source="contact-page" />
        </div>
      </section>

      <section className="surface">
        <div className="shell section-tight">
          <h2>What to bring to the consultation</h2>
          <p className="lede">
            None of it is required. Each item lets us say something specific about your position in
            twenty minutes rather than in general terms.
          </p>
          <ul
            style={{
              display: "grid",
              gap: "var(--space-4)",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 1fr))",
              listStyle: "none",
              margin: "var(--space-6) 0 0",
              padding: 0,
            }}
          >
            {[
              ["Latest management accounts or trial balance", "Shows how current the books are and where the margins sit."],
              ["Last annual financial statements", "The year-end position, and how the business is structured."],
              ["SARS correspondence", "Any verification, audit letter, penalty or outstanding return on eFiling."],
              ["VAT and payroll status", "Your VAT category, the last VAT201 and EMP201, and current headcount."],
              ["CIPC record", "Whether annual returns and the beneficial ownership filing are up to date."],
              ["The decision in front of you", "Funding, a hire, a new branch, moving to Xero, or selling the business."],
            ].map(([title, body]) => (
              <li key={title} className="card">
                <h3 style={{ fontSize: "var(--text-lg)", marginBottom: "var(--space-1)" }}>{title}</h3>
                <p style={{ marginBottom: 0, fontSize: "var(--text-sm)" }}>{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="shell section-tight">
        <div style={{ border: "1px solid var(--color-border)" }}>
          <iframe
            title={`Map to ${site.legalName}`}
            src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
            width="100%"
            height="380"
            style={{ border: 0, display: "block" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  );
}
