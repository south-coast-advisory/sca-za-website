import Link from "next/link";
import { notFound } from "next/navigation";
import { AnswerBlock, Breadcrumbs, CtaBand } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { tutorialBySlug, tutorials } from "@/content/tutorials";
import { breadcrumbSchema, pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return tutorials.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tutorial = tutorialBySlug(slug);
  if (!tutorial) return {};
  return pageMeta({
    title: tutorial.title,
    description: tutorial.metaDescription,
    path: `/resources/ai/${tutorial.slug}`,
  });
}

export default async function TutorialPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tutorial = tutorialBySlug(slug);
  if (!tutorial) notFound();

  const trail = [
    { name: "Home", path: "/" },
    { name: "Resources", path: "/resources" },
    { name: "AI for business", path: "/resources/ai" },
    { name: tutorial.title, path: `/resources/ai/${tutorial.slug}` },
  ];

  const howTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: tutorial.title,
    description: tutorial.summary,
    url: `${site.url}/resources/ai/${tutorial.slug}`,
    totalTime: `PT${tutorial.minutes}M`,
    publisher: { "@id": `${site.url}/#organisation` },
    step: tutorial.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.detail,
    })),
  };

  const related = (tutorial.related ?? [])
    .map((r) => tutorialBySlug(r))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  return (
    <>
      <JsonLd data={[howTo, breadcrumbSchema(trail)]} />

      <section className="shell-narrow section">
        <Breadcrumbs trail={trail} />
        <p className="label">
          {tutorial.level} · {tutorial.minutes} min read
        </p>
        <h1>{tutorial.title}</h1>
        <p className="lede">{tutorial.subtitle}</p>
        <div style={{ marginTop: "var(--space-8)" }}>
          <AnswerBlock>{tutorial.answer}</AnswerBlock>
        </div>
        <p style={{ marginTop: "var(--space-6)", fontSize: "var(--text-sm)", color: "var(--color-copy-muted)" }}>
          <strong>Who this is for:</strong> {tutorial.forWho}
        </p>
      </section>

      <section className="shell-narrow section-tight prose">
        {tutorial.steps.map((step, i) => (
          <div key={step.title} style={{ marginBottom: "var(--space-12)" }}>
            <span className="label" style={{ color: "var(--color-secondary)" }}>
              Step {String(i + 1).padStart(2, "0")}
            </span>
            <h2 style={{ fontSize: "var(--text-xl)", marginTop: "var(--space-2)" }}>{step.title}</h2>
            <p>{step.detail}</p>
            {step.prompt && (
              <div
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  padding: "var(--space-4) var(--space-6)",
                }}
              >
                <p className="label" style={{ marginBottom: "var(--space-2)" }}>
                  Try this prompt
                </p>
                <p
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--text-sm)",
                    lineHeight: 1.7,
                    color: "var(--color-dark)",
                  }}
                >
                  {step.prompt}
                </p>
              </div>
            )}
          </div>
        ))}

        {tutorial.cautions && tutorial.cautions.length > 0 && (
          <div
            style={{
              borderLeft: "3px solid var(--color-secondary)",
              background: "var(--color-surface)",
              padding: "var(--space-6)",
            }}
          >
            <h2 style={{ fontSize: "var(--text-lg)", marginTop: 0 }}>Before you do this</h2>
            <ul style={{ margin: 0, paddingLeft: "1.1rem" }}>
              {tutorial.cautions.map((c) => (
                <li key={c} style={{ marginBottom: "var(--space-2)" }}>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        )}

        {related.length > 0 && (
          <p style={{ marginTop: "var(--space-12)", fontSize: "var(--text-sm)" }}>
            <span className="label">Read next: </span>
            {related.map((r, i) => (
              <span key={r.slug}>
                {i > 0 && " · "}
                <Link href={`/resources/ai/${r.slug}`}>{r.title}</Link>
              </span>
            ))}
          </p>
        )}
      </section>

      <CtaBand
        title="Rather talk to a person about your numbers?"
        body="No chatbot can see your books, or take responsibility for what is filed. We do both."
      />
    </>
  );
}
