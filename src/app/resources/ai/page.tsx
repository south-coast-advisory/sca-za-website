import Link from "next/link";
import { AnswerBlock, Breadcrumbs, CtaBand } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { tutorials } from "@/content/tutorials";
import { breadcrumbSchema, pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "AI for South African Business Owners",
  description:
    "Honest tutorials on using AI in a South African business: where it helps, what you must never paste into a chatbot, and prompts that actually work.",
  path: "/resources/ai",
});

const trail = [
  { name: "Home", path: "/" },
  { name: "Resources", path: "/resources" },
  { name: "AI for business", path: "/resources/ai" },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "AI tutorials for South African business owners",
  url: `${site.url}/resources/ai`,
  hasPart: tutorials.map((t) => ({
    "@type": "HowTo",
    name: t.title,
    description: t.summary,
    url: `${site.url}/resources/ai/${t.slug}`,
    totalTime: `PT${t.minutes}M`,
  })),
};

export default function AiHubPage() {
  return (
    <>
      <JsonLd data={[schema, breadcrumbSchema(trail)]} />

      <section className="shell section">
        <Breadcrumbs trail={trail} />
        <h1>AI, for people who run a business</h1>
        <p className="lede">
          Your staff are already using these tools. Most of the advice online is written by people
          selling something. This is what we tell our own clients.
        </p>
        <div style={{ marginTop: "var(--space-8)" }}>
          <AnswerBlock>
            AI tools are genuinely useful to a small business for drafting, summarising and
            explaining, and unreliable for arithmetic, current South African tax figures and
            anything requiring judgement about your circumstances. The greatest practical risk is
            staff pasting confidential and personal information into public chatbots, which remains
            your responsibility under POPIA.
          </AnswerBlock>
        </div>
        <p style={{ marginTop: "var(--space-6)", fontSize: "var(--text-sm)", color: "var(--color-copy-muted)" }}>
          We are accountants, not an AI company. We publish this because clients are already pasting
          their figures into chatbots, and nobody has told them where the line is.
        </p>
      </section>

      <section className="shell section-tight">
        <div
          style={{
            display: "grid",
            gap: "var(--space-4)",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          }}
        >
          {tutorials.map((t) => (
            <Link
              key={t.slug}
              href={`/resources/ai/${t.slug}`}
              className="card"
              style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: "var(--space-2)", overflow: "hidden" }}
            >
              <span className="label">
                {t.level} · {t.minutes} min read
              </span>
              <h2 style={{ fontSize: "var(--text-lg)", marginBottom: 0 }}>{t.title}</h2>
              <p style={{ margin: 0, fontSize: "var(--text-sm)", color: "var(--color-copy)" }}>
                {t.subtitle}
              </p>
              <span className="card-cta">Read it</span>
            </Link>
          ))}
        </div>
      </section>

      <CtaBand
        title="Want this delivered to your team?"
        body="We run a short, plain-language session for staff on using these tools without creating a POPIA problem. Ask us about it."
      />
    </>
  );
}
