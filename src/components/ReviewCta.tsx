import Link from "next/link";
import { site } from "@/lib/site";

/**
 * The Google review ask. Reviews drive the local map pack, which is where most
 * accountant leads actually come from — so this belongs wherever a client is
 * already feeling well served.
 */
export function ReviewCta({
  heading = "Already a client?",
  body = "A Google review is the single most useful thing you can do for us. It takes two minutes and it is how other South Coast businesses find us.",
}: {
  heading?: string;
  body?: string;
}) {
  return (
    <div
      className="card"
      style={{
        display: "grid",
        gap: "var(--space-3)",
        borderLeft: "3px solid var(--color-secondary)",
        alignContent: "start",
      }}
    >
      <h3 style={{ fontSize: "var(--text-lg)", marginBottom: 0 }}>{heading}</h3>
      <p style={{ margin: 0, fontSize: "var(--text-sm)" }}>{body}</p>
      <div style={{ display: "flex", gap: "var(--space-3)", flexWrap: "wrap" }}>
        <Link href="/review" className="btn btn-primary">
          Review us on Google
        </Link>
        <Link href="/share-your-experience" className="btn btn-outline">
          Send it to us instead
        </Link>
      </div>
      {/* Build-time reminder only. Never shown to visitors in production. */}
      {!site.google.reviewUrl && process.env.NODE_ENV === "development" && (
        <p style={{ margin: 0, fontSize: "var(--text-xs)", color: "var(--color-copy-muted)" }}>
          Setup note (dev only): add the Google review link in <code>src/lib/site.ts</code>.
        </p>
      )}
    </div>
  );
}
