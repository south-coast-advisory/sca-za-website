import Link from "next/link";
import { notFound } from "next/navigation";
import { AnswerBlock, Breadcrumbs, CtaBand } from "@/components/Blocks";
import { DownloadForm } from "@/components/DownloadForm";
import { JsonLd } from "@/components/JsonLd";
import { docBySlug, libraryDocuments } from "@/content/documents";
import { documentIntros } from "@/content/document-intros";
import { breadcrumbSchema, pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return libraryDocuments.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = docBySlug(slug);
  if (!doc) return {};
  return pageMeta({
    title: doc.title,
    description: doc.metaDescription,
    path: `/resources/library/${doc.slug}`,
    generatedImage: true, // the cover in opengraph-image.tsx
  });
}

export default async function DocumentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = docBySlug(slug);
  if (!doc) notFound();

  const trail = [
    { name: "Home", path: "/" },
    { name: "Resources", path: "/resources" },
    { name: "Library", path: "/resources/library" },
    { name: doc.title, path: `/resources/library/${doc.slug}` },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "DigitalDocument",
    name: doc.title,
    description: doc.summary,
    url: `${site.url}/resources/library/${doc.slug}`,
    encodingFormat: "application/pdf",
    dateModified: doc.updated,
    inLanguage: "en-ZA",
    author: { "@id": `${site.url}/#organisation` },
    publisher: { "@id": `${site.url}/#organisation` },
    isAccessibleForFree: true,
  };

  const others = libraryDocuments.filter((d) => d.slug !== doc.slug).slice(0, 3);

  return (
    <>
      <JsonLd data={[schema, breadcrumbSchema(trail)]} />

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
            <p className="label">
              {doc.category} · PDF · {doc.pages} pages · Updated {doc.updated}
            </p>
            <h1>{doc.title}</h1>
            <p className="lede">{doc.subtitle}</p>
            <div style={{ marginTop: "var(--space-8)" }}>
              <AnswerBlock>{doc.summary}</AnswerBlock>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/resources/library/${doc.slug}/opengraph-image`}
              alt={`Cover of ${doc.title}`}
              width={1200}
              height={630}
              style={{
                width: "100%",
                height: "auto",
                marginTop: "var(--space-8)",
                border: "1px solid var(--color-border)",
              }}
            />
          </div>
          <DownloadForm slug={doc.slug} title={doc.title} />
        </div>
      </section>

      <section className="surface">
        <div className="shell section">
          <div
            style={{
              display: "grid",
              gap: "var(--space-12)",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            }}
          >
            <div>
              <h2>What you get</h2>
              <ul style={{ paddingLeft: "1.1rem", display: "grid", gap: "var(--space-2)" }}>
                {doc.youGet.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p style={{ marginTop: "var(--space-6)" }}>
                <strong>Who it is for:</strong> {doc.forWho}
              </p>
            </div>
            <div>
              <h2>What is inside</h2>
              <ol
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "grid",
                  gap: "var(--space-2)",
                  counterReset: "sec",
                }}
              >
                {doc.sections.map((s, i) => (
                  <li
                    key={s.heading}
                    style={{
                      display: "flex",
                      gap: "var(--space-3)",
                      borderBottom: "1px solid var(--color-border)",
                      paddingBottom: "var(--space-2)",
                    }}
                  >
                    <span className="label" style={{ color: "var(--color-secondary)" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{s.heading}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Long-form description: the part search engines and AI actually index */}
      {documentIntros[doc.slug] && (
        <section className="shell-narrow section prose">
          <h2>About this guide</h2>
          {documentIntros[doc.slug].map((para, i) => (
            <p key={i}>{para}</p>
          ))}

          <h2>What each section covers</h2>
          <dl style={{ margin: 0 }}>
            {doc.sections.map((section) => {
              const preview = section.blocks.find((b) => b.kind === "text" || b.kind === "note");
              return (
                <div key={section.heading} style={{ marginBottom: "var(--space-6)" }}>
                  <dt
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontWeight: 600,
                      color: "var(--color-dark)",
                      marginBottom: "var(--space-1)",
                    }}
                  >
                    {section.heading}
                  </dt>
                  <dd style={{ margin: 0, color: "var(--color-copy-muted)", fontSize: "var(--text-sm)" }}>
                    {preview && "text" in preview
                      ? preview.text
                      : section.blocks
                          .flatMap((b) =>
                            b.kind === "bullets" || b.kind === "checklist" ? b.items.slice(0, 3) : [],
                          )
                          .join(" · ")}
                  </dd>
                </div>
              );
            })}
          </dl>
        </section>
      )}

      {others.length > 0 && (
        <section className="shell section">
          <h2>Also in the library</h2>
          <div
            style={{
              display: "grid",
              gap: "var(--space-4)",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              marginTop: "var(--space-6)",
            }}
          >
            {others.map((d) => (
              <Link
                key={d.slug}
                href={`/resources/library/${d.slug}`}
                className="card"
                style={{ textDecoration: "none", display: "grid", gap: "var(--space-2)" }}
              >
                <span className="label">PDF · {d.pages} pages</span>
                <h3 style={{ fontSize: "var(--text-base)", marginBottom: 0 }}>{d.title}</h3>
                <p style={{ margin: 0, fontSize: "var(--text-sm)", color: "var(--color-copy)" }}>
                  {d.subtitle}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}
