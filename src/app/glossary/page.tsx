import Link from "next/link";
import { Breadcrumbs, CtaBand } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { alphabet, termsSorted, termById } from "@/content/glossary";
import { serviceBySlug } from "@/content/services";
import { breadcrumbSchema, glossarySchema, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Accounting, Tax & SARS Glossary (South Africa)",
  description:
    "Plain-English definitions of South African accounting, tax and payroll terms: EMP201, EMP501, IRP5, provisional tax, VAT201, CIPC annual returns, EBITDA and more.",
  path: "/glossary",
});

const trail = [
  { name: "Home", path: "/" },
  { name: "Glossary", path: "/glossary" },
];

export default function GlossaryPage() {
  return (
    <>
      <JsonLd data={[glossarySchema(termsSorted), breadcrumbSchema(trail)]} />

      <section className="shell section">
        <Breadcrumbs trail={trail} />
        <h1>Accounting and SARS glossary</h1>
        <p className="lede">
          {termsSorted.length} terms defined for South African rules, not imported from an American
          textbook. Every definition says what the term is and why it matters to you.
        </p>
        <nav aria-label="Jump to letter" style={{ marginTop: "var(--space-6)" }}>
          <ul
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "var(--space-2)",
              listStyle: "none",
              margin: 0,
              padding: 0,
              fontFamily: "var(--font-mono)",
            }}
          >
            {alphabet.map((letter) => (
              <li key={letter}>
                <a
                  href={`#letter-${letter}`}
                  style={{
                    display: "inline-block",
                    minWidth: "2rem",
                    textAlign: "center",
                    padding: "0.3rem 0.4rem",
                    border: "1px solid var(--color-border)",
                    textDecoration: "none",
                  }}
                >
                  {letter}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      <section className="shell section-tight">
        <dl style={{ margin: 0, display: "grid", gap: "var(--space-8)" }}>
          {alphabet.map((letter) => (
            <div key={letter} id={`letter-${letter}`}>
              <p
                className="label"
                style={{
                  borderBottom: "1px solid var(--color-border)",
                  paddingBottom: "var(--space-2)",
                  color: "var(--color-secondary)",
                }}
              >
                {letter}
              </p>
              <div style={{ display: "grid", gap: "var(--space-6)", marginTop: "var(--space-6)" }}>
                {termsSorted
                  .filter((t) => t.letter === letter)
                  .map((t) => {
                    const service = t.service ? serviceBySlug(t.service) : undefined;
                    return (
                      <div
                        key={t.id}
                        id={t.id}
                        style={{
                          display: "grid",
                          gap: "var(--space-2)",
                          gridTemplateColumns: "minmax(0, 200px) minmax(0, 1.8fr)",
                          alignItems: "start",
                          scrollMarginTop: "90px",
                        }}
                        className="glossary-row"
                      >
                        <dt style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--color-dark)" }}>
                          {t.term}
                          {t.also && (
                            <span
                              style={{
                                display: "block",
                                fontWeight: 400,
                                fontSize: "var(--text-xs)",
                                color: "var(--color-copy-muted)",
                              }}
                            >
                              {t.also}
                            </span>
                          )}
                        </dt>
                        <dd style={{ margin: 0 }}>
                          <p style={{ marginBottom: t.matters ? "var(--space-2)" : 0 }}>{t.definition}</p>
                          {t.matters && (
                            <p style={{ fontSize: "var(--text-sm)", color: "var(--color-copy-muted)" }}>
                              <strong>Why it matters:</strong> {t.matters}
                            </p>
                          )}
                          <p style={{ fontSize: "var(--text-sm)", margin: 0 }}>
                            {service && <Link href={`/services/${service.slug}`}>{service.nav}</Link>}
                            {t.related?.length ? (
                              <>
                                {service && " · "}
                                {t.related.map((r, i) => {
                                  const rel = termById(r);
                                  if (!rel) return null;
                                  return (
                                    <span key={r}>
                                      {i > 0 && " · "}
                                      <Link href={`#${rel.id}`}>{rel.term}</Link>
                                    </span>
                                  );
                                })}
                              </>
                            ) : null}
                          </p>
                        </dd>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </dl>
      </section>

      <CtaBand
        title="A term you cannot find?"
        body="Phone and ask. We would rather explain it once than have you guess."
      />
    </>
  );
}
