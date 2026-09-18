import { Breadcrumbs, CtaBand, FaqList } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { faqGroups, faqs, faqsInGroup } from "@/content/faq";
import { breadcrumbSchema, faqSchema, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Accounting, Tax & SARS Questions Answered",
  description:
    "Straight answers on provisional tax, VAT registration, EMP201 and EMP501, CIPC annual returns, Xero migration and what an accountant costs in South Africa.",
  path: "/faq",
});

const trail = [
  { name: "Home", path: "/" },
  { name: "FAQ", path: "/faq" },
];

export default function FaqPage() {
  return (
    <>
      <JsonLd data={[faqSchema(faqs), breadcrumbSchema(trail)]} />

      <section className="shell section">
        <Breadcrumbs trail={trail} />
        <h1>Questions, answered properly</h1>
        <p className="lede">
          {faqs.length} questions we are actually asked, answered the way we would answer them on
          the phone. Where a rule changes with the Budget, we say so rather than printing a figure
          that goes stale.
        </p>
        <nav aria-label="FAQ sections" style={{ marginTop: "var(--space-8)" }}>
          <ul
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "var(--space-3)",
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
          >
            {faqGroups.map((g) => (
              <li key={g}>
                <a
                  href={`#${g.replace(/\s+/g, "-").toLowerCase()}`}
                  className="btn btn-outline"
                  style={{ padding: "0.5rem 0.9rem" }}
                >
                  {g}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      {faqGroups.map((group, i) => {
        const items = faqsInGroup(group);
        if (!items.length) return null;
        return (
          <section
            key={group}
            id={group.replace(/\s+/g, "-").toLowerCase()}
            className={i % 2 === 1 ? "surface" : undefined}
          >
            <div className="shell section-tight">
              <h2 style={{ fontSize: "var(--text-xl)" }}>{group}</h2>
              <FaqList items={items} />
            </div>
          </section>
        );
      })}

      <CtaBand
        title="Still not sure?"
        body="Ask us directly. Twenty minutes on the phone beats an hour of reading."
      />
    </>
  );
}
