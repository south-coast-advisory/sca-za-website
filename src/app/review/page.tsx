import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Blocks";
import { ReviewForm } from "@/components/reviews/ReviewForm";
import { founder } from "@/lib/site";

/**
 * /review — the link that goes on emails, invoices, WhatsApp messages and a
 * card at reception. Written or video review, guided questions, moderated
 * before anything is published. Clients who rate 4–5 stars are offered the
 * Google review box afterwards, once the profile link is set in site.ts.
 *
 * noindex: a form for existing clients, not a page to rank.
 */
export const metadata: Metadata = {
  title: "Review South Coast Advisory",
  description: "Clients of South Coast Advisory: share a written or video review. Nothing is published until we have confirmed it with you.",
  robots: { index: false, follow: true },
};

const steps = [
  [`${founder.name.split(" ")[0]} reads it himself`, "Every review, written or video, goes to him first."],
  ["We confirm it with you", "Nothing appears on the website until you have approved the wording."],
  ["You stay in control", "Ask us to take it down at any time, no explanation needed."],
] as const;

export default function ReviewPage() {
  return (
    <>
      <section className="review-hero">
        <div className="shell-narrow">
          <Breadcrumbs
            trail={[
              { name: "Home", path: "/" },
              { name: "Leave a review", path: "/review" },
            ]}
          />
          <div className="review-hero__stars" aria-hidden="true">★★★★★</div>
          <h1>How did we do?</h1>
          <p className="lede">
            If we have looked after your books, your tax or your payroll, a few honest sentences
            — or a 90-second video — help the next South Coast business owner decide.
          </p>
        </div>
      </section>

      <section className="review-body">
        <div className="shell-narrow">
          <div className="review-card">
            <ReviewForm />
          </div>

          <ol className="review-steps">
            {steps.map(([title, body], i) => (
              <li key={title}>
                <span className="review-steps__n">{i + 1}</span>
                <strong>{title}</strong>
                <span>{body}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
