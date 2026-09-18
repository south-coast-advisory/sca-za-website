import { Breadcrumbs } from "@/components/Blocks";
import { LeadForm } from "@/components/LeadForm";
import { JsonLd } from "@/components/JsonLd";
import { site, telHref } from "@/lib/site";
import { breadcrumbSchema, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Contact Us, Amanzimtoti",
  description:
    "Phone South Coast Advisory on 031 903 4787, or book a free 20-minute call. Our office is at 22 Rosslyn Road, Amanzimtoti, KwaZulu-Natal.",
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
            <h1>Talk to us</h1>
            <p className="lede">
              Twenty minutes, no charge. Tell us what is going on and we will tell you what we would
              do first — even if that turns out not to involve us.
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
