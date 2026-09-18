import Link from "next/link";
import { AnswerBlock, Breadcrumbs, CtaBand } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { services, stages } from "@/content/services";
import { breadcrumbSchema, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Accounting, Tax & Payroll Services, Amanzimtoti",
  description:
    "Bookkeeping, tax, payroll, company secretarial, valuations, advisory, HR and property administration for businesses on the KZN South Coast.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
      <section className="shell section">
        <Breadcrumbs trail={[{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]} />
        <h1>Accounting, tax and payroll, handled in Toti since 1980</h1>
        <p className="lede">
          Eight services, one team, one set of books. You are not handed between a bookkeeper, a tax
          consultant and a payroll bureau who never speak to each other.
        </p>
        <div style={{ marginTop: "var(--space-8)" }}>
          <AnswerBlock>
            South Coast Advisory provides bookkeeping and annual financial statements, tax returns
            and SARS representation, payroll and EMP submissions, CIPC company secretarial work,
            business valuations, virtual CFO advisory, HR administration and property management for
            businesses in Amanzimtoti and along the KZN South Coast.
          </AnswerBlock>
        </div>
      </section>

      {stages.map((stage) => {
        const list = services.filter((s) => s.stage === stage.id);
        if (!list.length) return null;
        return (
          <section key={stage.id} className="shell section-tight">
            <h2 style={{ fontSize: "var(--text-xl)" }}>{stage.title}</h2>
            <p style={{ color: "var(--color-copy-muted)", maxWidth: "62ch" }}>{stage.detail}</p>
            <div
              style={{
                display: "grid",
                gap: "var(--space-4)",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                marginTop: "var(--space-4)",
              }}
            >
              {list.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="card"
                  style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: "var(--space-2)", overflow: "hidden" }}
                >
                  <h3 style={{ fontSize: "var(--text-lg)", marginBottom: 0 }}>{s.nav}</h3>
                  <p style={{ margin: 0, fontSize: "var(--text-sm)", color: "var(--color-copy)" }}>
                    {s.h1}
                  </p>
                  <span className="card-cta">Read more</span>
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      <CtaBand />
    </>
  );
}
