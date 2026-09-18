import Link from "next/link";
import { site, telHref, proofPoints } from "@/lib/site";
import type { Faq } from "@/content/faq";
import { termsByIds } from "@/content/glossary";

/** The proof strip that sits directly under a hero. */
export function ProofRow() {
  return (
    <ul
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        gap: "var(--space-4)",
        listStyle: "none",
        margin: 0,
        padding: 0,
      }}
    >
      {proofPoints.map((p) => (
        <li
          key={p.label}
          style={{
            borderTop: "2px solid var(--color-secondary)",
            paddingTop: "var(--space-3)",
          }}
        >
          <span
            style={{
              display: "block",
              fontFamily: "var(--font-heading)",
              fontWeight: 600,
              fontSize: "var(--text-lg)",
              color: "var(--color-dark)",
            }}
          >
            {p.value}
          </span>
          <span style={{ fontSize: "var(--text-sm)", color: "var(--color-copy-muted)" }}>
            {p.label}
          </span>
        </li>
      ))}
    </ul>
  );
}

/** The quotable passage. One per page, near the top. */
export function AnswerBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="answer">
      <p>{children}</p>
    </div>
  );
}

export function Breadcrumbs({ trail }: { trail: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" style={{ marginBottom: "var(--space-6)" }}>
      <ol
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "var(--space-2)",
          listStyle: "none",
          margin: 0,
          padding: 0,
          fontSize: "var(--text-xs)",
          fontFamily: "var(--font-mono)",
          color: "var(--color-copy-muted)",
        }}
      >
        {trail.map((item, i) => (
          <li key={item.path} style={{ display: "flex", gap: "var(--space-2)" }}>
            {i > 0 && <span aria-hidden="true">/</span>}
            {i === trail.length - 1 ? (
              <span>{item.name}</span>
            ) : (
              <Link href={item.path} style={{ color: "inherit" }}>
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div>
      {items.map((f) => (
        <details key={f.id} id={f.id} className="faq-item">
          <summary>{f.q}</summary>
          <div className="faq-body">
            {f.a.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}

export function GlossaryLinks({ ids }: { ids: string[] }) {
  const items = termsByIds(ids);
  if (!items.length) return null;
  return (
    <p style={{ fontSize: "var(--text-sm)" }}>
      <span className="label">In plain English: </span>
      {items.map((t, i) => (
        <span key={t.id}>
          {i > 0 && " · "}
          <Link href={`/glossary#${t.id}`}>{t.term}</Link>
        </span>
      ))}
    </p>
  );
}

/** The single repeated call to action. Same job everywhere. */
export function CtaBand({
  title = "Let's start with a conversation",
  body = "Twenty minutes, no charge. Bring your last set of figures, or none at all.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="ink">
      <div className="shell section-tight">
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "var(--space-8)",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ maxWidth: "48ch" }}>
            <h2 style={{ marginBottom: "var(--space-2)" }}>{title}</h2>
            <p style={{ marginBottom: 0 }}>{body}</p>
          </div>
          <div style={{ display: "flex", gap: "var(--space-3)", flexWrap: "wrap" }}>
            <Link href={site.cta.href} className="btn btn-on-dark">
              {site.cta.label}
            </Link>
            <a
              href={telHref}
              className="btn"
              style={{ color: "var(--color-on-dark)", borderColor: "var(--color-on-dark-border)" }}
            >
              {site.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
