import { Breadcrumbs } from "@/components/Blocks";
import { TestimonialForm } from "@/components/TestimonialForm";
import { ReviewCta } from "@/components/ReviewCta";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, pageMeta } from "@/lib/seo";
import { founder, site, telHref } from "@/lib/site";

export const metadata = pageMeta({
  title: "Tell Us How We Are Doing",
  description:
    "Are you a South Coast Advisory client? Share your experience of working with us. Nothing is published without your permission.",
  path: "/share-your-experience",
});

const trail = [
  { name: "Home", path: "/" },
  { name: "Share your experience", path: "/share-your-experience" },
];

export default function ShareExperiencePage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />

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
            <h1>Tell us how we are doing</h1>
            <p className="lede">
              If we have looked after your books, your payroll or your tax, we would be grateful for
              a few honest sentences about it.
            </p>

            <h2 style={{ fontSize: "var(--text-xl)", marginTop: "var(--space-12)" }}>
              Why we are asking
            </h2>
            <p>
              A business owner deciding who to trust with their finances wants one thing: to hear
              from someone like them who has already done it. After {site.yearsTrading} years we
              have plenty of those people. We have simply never asked them.
            </p>

            <h2 style={{ fontSize: "var(--text-xl)" }}>What happens next</h2>
            <ul style={{ paddingLeft: "1.1rem" }}>
              <li style={{ marginBottom: "var(--space-2)" }}>
                {founder.name} reads it himself.
              </li>
              <li style={{ marginBottom: "var(--space-2)" }}>
                We contact you to confirm it really came from you.
              </li>
              <li style={{ marginBottom: "var(--space-2)" }}>
                Nothing appears on the website until you have said yes to the exact wording.
              </li>
              <li style={{ marginBottom: "var(--space-2)" }}>
                You can ask us to take it down at any time, no explanation needed.
              </li>
            </ul>

            <h2 style={{ fontSize: "var(--text-xl)" }}>What helps most</h2>
            <p>
              Specifics beat compliments. What was the problem before, what did we do, and what is
              different now? A sentence about a SARS mess we untangled is worth more to the next
              reader than a paragraph saying we are nice people — although we will take that too.
            </p>

            <p style={{ fontSize: "var(--text-sm)", color: "var(--color-copy-muted)" }}>
              Would rather say it over the phone? Call{" "}
              <a href={telHref}>{site.phoneDisplay}</a> and we will write it up and send it to you to
              approve.
            </p>
          </div>

          <div style={{ display: "grid", gap: "var(--space-6)" }}>
            <TestimonialForm />
            <ReviewCta
              heading="Or leave it on Google"
              body="A Google review does something this page cannot: it helps businesses on the South Coast find us in the first place. If you have two minutes, it is the most useful thing you can do for us."
            />
          </div>
        </div>
      </section>
    </>
  );
}
