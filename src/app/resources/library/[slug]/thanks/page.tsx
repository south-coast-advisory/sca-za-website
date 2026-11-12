import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { AnswerBlock, Breadcrumbs, CtaBand } from "@/components/Blocks";
import { StartDownload } from "@/components/StartDownload";
import { docBySlug, libraryDocuments } from "@/content/documents";
import { documentFollowups } from "@/content/document-followups";
import { pageMeta } from "@/lib/seo";
import { site, telHref } from "@/lib/site";

const TOKEN = /^[0-9]+\.[A-Za-z0-9_-]+$/;

export function generateStaticParams() {
  return libraryDocuments.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = docBySlug(slug);
  if (!doc) return {};
  return {
    ...pageMeta({
      title: "Your guide is downloading",
      description: `Your copy of ${doc.title} is downloading. Book a call with Neil if you want the practice to take the next step.`,
      path: `/resources/library/${doc.slug}/thanks`,
    }),
    robots: { index: false, follow: true },
  };
}

export default async function DownloadThanksPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ t?: string }>;
}) {
  const { slug } = await params;
  const { t } = await searchParams;
  const doc = docBySlug(slug);
  if (!doc) notFound();

  const follow = documentFollowups[doc.slug];
  const token = t && TOKEN.test(t) ? t : null;
  const href = token ? `/api/documents/${doc.slug}/download?t=${encodeURIComponent(token)}` : null;
  const others = libraryDocuments.filter((d) => d.slug !== doc.slug).slice(0, 3);

  const trail = [
    { name: "Home", path: "/" },
    { name: "Resources", path: "/resources" },
    { name: "Library", path: "/resources/library" },
    { name: doc.title, path: `/resources/library/${doc.slug}` },
    { name: "Thank you", path: `/resources/library/${doc.slug}/thanks` },
  ];

  return (
    <>
      <section className="shell section">
        <Breadcrumbs trail={trail} />
        <p className="label">Thank you · {doc.category}</p>
        <h1>Your copy is downloading</h1>
        <p className="lede">{doc.title} is yours to keep. The useful part starts when someone looks at your own numbers.</p>
        <StartDownload href={href} title={doc.title} />

        <div
          style={{
            display: "grid",
            gap: "var(--space-8)",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
            alignItems: "start",
            marginTop: "var(--space-12)",
          }}
        >
          <div>
            {follow && (
              <div style={{ marginBottom: "var(--space-8)" }}>
                <AnswerBlock>{follow.next}</AnswerBlock>
              </div>
            )}
            {follow && (
              <>
                <h2>Have this ready</h2>
                <ul style={{ paddingLeft: "1.1rem", display: "grid", gap: "var(--space-2)" }}>
                  {follow.bring.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p style={{ marginBottom: 0 }}>
                  Then book the call, or phone and ask for Neil. The team at the practice prepares
                  from whatever you can send ahead.
                </p>
              </>
            )}
          </div>

          <div className="card" style={{ background: "var(--color-surface)", display: "grid", gap: "var(--space-4)" }}>
            <div>
              <h2 style={{ fontSize: "var(--text-xl)", marginBottom: "var(--space-2)" }}>Talk to Neil</h2>
              <p style={{ margin: 0 }}>
                A free 20-minute consultation on what this guide means for your business, and what
                to fix first. No pitch, and no obligation to stay.
              </p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)" }}>
              <Link href={site.cta.href} className="btn btn-primary">
                {site.cta.label}
              </Link>
              <a href={telHref} className="btn btn-outline">
                Phone {site.phoneDisplay}
              </a>
            </div>
            <p style={{ margin: 0, fontSize: "var(--text-sm)", color: "var(--color-copy-muted)" }}>
              {site.address.street}, {site.address.locality}. Weekdays, 08:00 to 16:30. Ask for Neil.
            </p>
          </div>
        </div>
      </section>

      {others.length > 0 && (
        <section className="surface">
          <div className="shell section">
            <h2>While you have it open</h2>
            <p>Three more from the same shelf. Each one is free, the same way this one was.</p>
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
                  <p style={{ margin: 0, fontSize: "var(--text-sm)", color: "var(--color-copy)" }}>{d.subtitle}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand
        title="Bring the guide. Bring the question it left you with."
        body="Neil and the team will tell you what applies to your business, and what you can ignore."
      />
    </>
  );
}
