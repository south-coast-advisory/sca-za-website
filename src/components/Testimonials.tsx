import Link from "next/link";
import { getApprovedTestimonials } from "@/lib/testimonials";

/**
 * Renders nothing at all until real, approved testimonials exist. An empty
 * section is better than a fabricated one — and the moment Neil's clients
 * start replying, this fills itself in.
 */
export async function Testimonials({
  limit = 3,
  heading = "What clients say",
}: {
  limit?: number;
  heading?: string;
}) {
  const testimonials = await getApprovedTestimonials(limit);
  if (testimonials.length === 0) return null;

  return (
    <section className="wash">
      <div className="shell section">
        <h2>{heading}</h2>
        <div
          style={{
            display: "grid",
            gap: "var(--space-4)",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            marginTop: "var(--space-8)",
          }}
        >
          {testimonials.map((t) => (
            <figure
              key={t.id}
              className="card"
              style={{ margin: 0, display: "grid", gap: "var(--space-4)", alignContent: "start" }}
            >
              <blockquote
                style={{
                  margin: 0,
                  borderLeft: "3px solid var(--color-secondary)",
                  paddingLeft: "var(--space-4)",
                  color: "var(--color-dark)",
                }}
              >
                {t.quote}
              </blockquote>
              <figcaption style={{ fontSize: "var(--text-sm)", color: "var(--color-copy-muted)" }}>
                <strong style={{ color: "var(--color-dark)", display: "block" }}>{t.name}</strong>
                {[t.role, t.business].filter(Boolean).join(", ")}
                {t.town && <span style={{ display: "block" }}>{t.town}</span>}
                {t.years_client && (
                  <span style={{ display: "block" }}>Client for {t.years_client}</span>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
        <p style={{ marginTop: "var(--space-6)", fontSize: "var(--text-sm)" }}>
          <Link href="/share-your-experience">Are you a client? Tell us how we are doing →</Link>
        </p>
      </div>
    </section>
  );
}
