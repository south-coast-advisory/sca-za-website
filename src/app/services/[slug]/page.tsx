import Link from "next/link";
import { notFound } from "next/navigation";
import { AnswerBlock, Breadcrumbs, CtaBand, FaqList, GlossaryLinks } from "@/components/Blocks";
import { LeadForm } from "@/components/LeadForm";
import { JsonLd } from "@/components/JsonLd";
import { faqsByIds } from "@/content/faq";
import { serviceBySlug, services } from "@/content/services";
import { breadcrumbSchema, faqSchema, pageMeta, serviceSchema } from "@/lib/seo";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) return {};
  return pageMeta({
    title: service.title,
    description: service.description,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) notFound();

  const faqs = faqsByIds(service.faqIds);
  const related = service.related
    .map((r) => serviceBySlug(r))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const trail = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.nav, path: `/services/${service.slug}` },
  ];

  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: service.nav,
            description: service.description,
            path: `/services/${service.slug}`,
          }),
          faqSchema(faqs),
          breadcrumbSchema(trail),
        ]}
      />

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
            <h1>{service.h1}</h1>
            <p className="lede">{service.description}</p>
            <div style={{ marginTop: "var(--space-8)" }}>
              <AnswerBlock>{service.answer}</AnswerBlock>
            </div>
          </div>
          <LeadForm
            source={`service-${service.slug}`}
            service={service.slug}
            heading={`Talk to us about ${service.nav.toLowerCase()}`}
            compact
          />
        </div>
      </section>

      <section className="surface">
        <div className="shell section">
          <div
            style={{
              display: "grid",
              gap: "var(--space-12)",
              gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
            }}
          >
            <div>
              <h2>What is included</h2>
              <ul style={{ paddingLeft: "1.1rem", display: "grid", gap: "var(--space-2)" }}>
                {service.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2>How it works</h2>
              <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "var(--space-4)" }}>
                {service.steps.map((s, i) => (
                  <li key={s.step}>
                    <span className="label" style={{ color: "var(--color-secondary)" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 style={{ fontSize: "var(--text-base)", margin: "var(--space-1) 0" }}>{s.step}</h3>
                    <p style={{ margin: 0, fontSize: "var(--text-sm)" }}>{s.detail}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {faqs.length > 0 && (
        <section className="shell section">
          <h2>Questions about {service.nav.toLowerCase()}</h2>
          <div style={{ marginTop: "var(--space-6)" }}>
            <FaqList items={faqs} />
          </div>
          <div style={{ marginTop: "var(--space-6)" }}>
            <GlossaryLinks ids={service.glossary} />
            {related.length > 0 && (
              <p style={{ fontSize: "var(--text-sm)" }}>
                <span className="label">Often needed with this: </span>
                {related.map((r, i) => (
                  <span key={r.slug}>
                    {i > 0 && " · "}
                    <Link href={`/services/${r.slug}`}>{r.nav}</Link>
                  </span>
                ))}
              </p>
            )}
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}
