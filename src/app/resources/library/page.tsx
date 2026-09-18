import Link from "next/link";
import { AnswerBlock, Breadcrumbs, CtaBand } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { libraryDocuments, docCategories } from "@/content/documents";
import { breadcrumbSchema, pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Free Guides, Checklists & Templates",
  description:
    "Free PDF guides for South African business owners: SARS and CIPC deadlines, Xero migration, month-end close, payroll compliance, VAT registration and record keeping.",
  path: "/resources/library",
});

const trail = [
  { name: "Home", path: "/" },
  { name: "Resources", path: "/resources" },
  { name: "Library", path: "/resources/library" },
];

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "South Coast Advisory resource library",
  url: `${site.url}/resources/library`,
  hasPart: libraryDocuments.map((d) => ({
    "@type": "DigitalDocument",
    name: d.title,
    description: d.summary,
    url: `${site.url}/resources/library/${d.slug}`,
    encodingFormat: "application/pdf",
    dateModified: d.updated,
    author: { "@id": `${site.url}/#organisation` },
  })),
};

export default function LibraryPage() {
  return (
    <>
      <JsonLd data={[collectionSchema, breadcrumbSchema(trail)]} />

      <section className="shell section">
        <Breadcrumbs trail={trail} />
        <h1>Guides, checklists and templates</h1>
        <p className="lede">
          Written by this practice, for South African rules. Free, and yours to keep — we ask for
          your name and email so we know who our readers are.
        </p>
        <div style={{ marginTop: "var(--space-8)" }}>
          <AnswerBlock>
            South Coast Advisory publishes {libraryDocuments.length} free PDF guides for South
            African business owners, covering SARS and CIPC deadlines, migrating to Xero, the
            month-end close, employer payroll compliance, whether to register for VAT, and how long
            business records must be kept.
          </AnswerBlock>
        </div>
      </section>

      {docCategories.map((category, i) => {
        const docs = libraryDocuments.filter((d) => d.category === category);
        return (
          <section key={category} className={i % 2 === 1 ? "surface" : undefined}>
            <div className="shell section-tight">
              <h2 style={{ fontSize: "var(--text-xl)" }}>{category}</h2>
              <div
                style={{
                  display: "grid",
                  gap: "var(--space-4)",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  marginTop: "var(--space-4)",
                }}
              >
                {docs.map((d) => (
                  <Link
                    key={d.slug}
                    href={`/resources/library/${d.slug}`}
                    className="card"
                    style={{
                      textDecoration: "none",
                      padding: 0,
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/resources/library/${d.slug}/opengraph-image`}
                      alt=""
                      width={1200}
                      height={630}
                      loading="lazy"
                      style={{ width: "100%", height: "auto", display: "block" }}
                    />
                    <div
                      style={{
                        padding: "var(--space-4) var(--space-6) var(--space-6)",
                        display: "flex",
                        flexDirection: "column",
                        gap: "var(--space-2)",
                        flex: 1,
                      }}
                    >
                      <span className="label">
                        PDF · {d.pages} pages · {d.updated}
                      </span>
                      <h3 style={{ fontSize: "var(--text-lg)", marginBottom: 0 }}>{d.title}</h3>
                      <p style={{ margin: 0, fontSize: "var(--text-sm)", color: "var(--color-copy)" }}>
                        {d.subtitle}
                      </p>
                      <span className="card-cta">Get the PDF</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <CtaBand
        title="Would you rather we just did it?"
        body="Every checklist here is work we do for clients every month. Twenty minutes to find out what that would cost."
      />
    </>
  );
}
