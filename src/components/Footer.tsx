import Link from "next/link";
import { services } from "@/content/services";
import { site, telHref } from "@/lib/site";

const col = { display: "grid", gap: "var(--space-2)", listStyle: "none", margin: 0, padding: 0 };
// Colour comes from .footer-band in globals.css, not from inline styles.
const linkStyle = { fontSize: "var(--text-sm)" };

export function Footer() {
  return (
    <footer className="footer-band" style={{ marginTop: "var(--space-24)" }}>
      <div className="shell section-tight">
        <div
          style={{
            display: "grid",
            gap: "var(--space-8)",
            gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
          }}
        >
          <div>
            <p style={{ fontWeight: 600, marginBottom: "var(--space-2)" }}>
              {site.legalName}
            </p>
            <p style={{ fontSize: "var(--text-sm)" }}>
              {site.address.street}
              <br />
              {site.address.locality}, {site.address.region} {site.address.postalCode}
            </p>
            <p style={{ fontSize: "var(--text-sm)" }}>
              <a href={telHref} style={{ fontWeight: 600 }}>
                {site.phoneDisplay}
              </a>
            </p>
          </div>

          <div>
            <p className="label">Services</p>
            <ul style={col}>
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} style={linkStyle}>{s.nav}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label">Xero</p>
            <ul style={col}>
              <li><Link href="/xero" style={linkStyle}>Xero Silver Partner</Link></li>
              <li><Link href="/xero#migrate" style={linkStyle}>Moving to Xero</Link></li>
              <li><Link href="/pricing" style={linkStyle}>Pricing</Link></li>
              <li><Link href="/resources/library" style={linkStyle}>Free guides</Link></li>
              <li><Link href="/resources/sars-deadlines" style={linkStyle}>SARS deadlines</Link></li>
              <li><Link href="/faq" style={linkStyle}>FAQ</Link></li>
              <li><Link href="/glossary" style={linkStyle}>Glossary</Link></li>
              <li><Link href="/share-your-experience" style={linkStyle}>Client feedback</Link></li>
              <li><Link href="/review" style={linkStyle}>Leave a Google review</Link></li>
            </ul>
          </div>

          <div>
            <p className="label">Areas served</p>
            <p style={{ fontSize: "var(--text-sm)" }}>{site.areasServed.join(" · ")}</p>
          </div>
        </div>

        <div
          style={{
            marginTop: "var(--space-8)",
            paddingTop: "var(--space-6)",
            borderTop: "1px solid var(--color-footer-line)",
            display: "flex",
            flexWrap: "wrap",
            gap: "var(--space-4)",
            justifyContent: "space-between",
            fontSize: "var(--text-xs)",
          }}
        >
          <p style={{ margin: 0 }}>
            © {new Date().getFullYear()} {site.legalName}. Established {site.founded}.
          </p>
          <p style={{ margin: 0, display: "flex", gap: "var(--space-4)" }}>
            <Link href="/privacy" style={linkStyle}>Privacy &amp; POPIA</Link>
            <Link href="/terms" style={linkStyle}>Terms</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
