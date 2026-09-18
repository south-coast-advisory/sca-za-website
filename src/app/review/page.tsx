import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Blocks";
import { site, telHref } from "@/lib/site";

/**
 * /review — the short link that goes on emails, invoices, WhatsApp messages and
 * a card at reception. It redirects straight to the Google review box once the
 * profile link is configured.
 *
 * noindex: this is a utility redirect, not a page we want in search results.
 */
export const metadata: Metadata = {
  title: "Leave us a review",
  robots: { index: false, follow: true },
};

export default function ReviewPage() {
  if (site.google.reviewUrl) {
    redirect(site.google.reviewUrl);
  }

  return (
    <section className="shell-narrow section prose">
      <Breadcrumbs
        trail={[
          { name: "Home", path: "/" },
          { name: "Leave a review", path: "/review" },
        ]}
      />
      <h1>Thank you for reviewing us</h1>
      <p className="lede">
        A review from someone who has actually worked with us is worth more than anything we can
        write about ourselves. It takes about two minutes.
      </p>

      <h2>On Google</h2>
      <p>
        Search for <strong>{site.legalName}</strong> on Google or Google Maps, then choose{" "}
        <strong>Write a review</strong> on our listing. You will need to be signed in to a Google
        account, which most people already are on their phone.
      </p>

      <h2>What is useful to say</h2>
      <ul>
        <li>What you needed help with — bookkeeping, tax, payroll, a SARS problem, moving to Xero</li>
        <li>What difference it made to your business</li>
        <li>Anything that surprised you, good or bad</li>
      </ul>
      <p>
        Honest beats glowing. A review that mentions a specific problem we solved helps the next
        business owner far more than five stars on their own.
      </p>

      <h2>Would you rather not use Google?</h2>
      <p>
        You can <Link href="/share-your-experience">send your comments to us directly</Link> instead,
        and we will not publish anything without showing you the wording first. Or phone{" "}
        <a href={telHref}>{site.phoneDisplay}</a> and tell us — we will write it up and send it to
        you to approve.
      </p>
    </section>
  );
}
