import Link from "next/link";
import { Breadcrumbs } from "@/components/Blocks";
import { site, telHref } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Terms of Use",
  description: `The terms on which ${site.legalName} makes this website, its guidance content and its voice assistant available.`,
  path: "/terms",
});

const LAST_UPDATED = "18 September 2026";

export default function TermsPage() {
  return (
    <section className="shell-narrow section prose">
      <Breadcrumbs
        trail={[
          { name: "Home", path: "/" },
          { name: "Terms", path: "/terms" },
        ]}
      />
      <h1>Terms of use</h1>
      <p className="lede">
        These terms govern your use of this website. By using it you accept them. If you do not
        accept them, please do not use the site.
      </p>
      <p className="label">Last updated {LAST_UPDATED}</p>

      <h2>1. Who we are</h2>
      <p>
        This website is operated by {site.legalName}, an accounting practice with its office at{" "}
        {site.address.street}, {site.address.locality}, {site.address.region}{" "}
        {site.address.postalCode}, South Africa. You can reach us on{" "}
        <a href={telHref}>{site.phoneDisplay}</a>.
      </p>

      <h2>2. General information, not advice</h2>
      <p>
        Everything published here — service pages, frequently asked questions, the glossary,
        downloadable documents and anything our voice assistant says — is general information about
        accounting, tax and related matters in South Africa. It is not advice for your particular
        circumstances, and it does not take into account your business, your figures or your history
        with SARS.
      </p>
      <p>
        Do not act, or decide not to act, on anything on this site without speaking to us or to
        another suitably qualified professional first.
      </p>

      <h2>3. Rules and figures change</h2>
      <p>
        Tax rates, thresholds, filing dates, CIPC fees and software prices change, usually with the
        annual Budget or at the supplier&rsquo;s discretion. We review this content and date the
        pages that carry figures, but legislation can change between reviews. Always confirm a
        current figure with us before relying on it.
      </p>

      <h2>4. No client relationship until we are engaged</h2>
      <p>
        Sending an enquiry, downloading a document or speaking to our voice assistant does not make
        you our client and does not create a professional relationship. We take clients on by issuing
        an engagement letter that sets out the work, the fee and the responsibilities on both sides.
        The relationship begins when that letter is accepted.
      </p>

      <h2>5. Our voice assistant</h2>
      <p>
        &ldquo;Sandy&rdquo; is an artificial intelligence assistant, not a person, and it will tell
        you so. It answers general questions about our services, about Xero and about South African
        accounting and tax terms, drawn from the published content on this site.
      </p>
      <ul>
        <li>It does not give tax, financial or legal advice for your circumstances.</li>
        <li>
          It cannot access your records, your SARS profile, your invoices or any account with us.
        </li>
        <li>
          It may be wrong or out of date. Where an answer matters, confirm it with a person here.
        </li>
        <li>
          Please do not give it your identity number, tax number, passwords or banking details. If
          you do, ask us to delete the conversation.
        </li>
      </ul>
      <p>
        How conversations are handled is set out in our{" "}
        <Link href="/privacy">privacy notice</Link>.
      </p>

      <h2>6. Downloadable documents</h2>
      <p>
        Templates and checklists we make available are provided as a starting point for your own use.
        They are not a substitute for professional or legal advice, and they may need to be adapted
        to your business. You may use them in your own business. You may not resell them or
        republish them as your own.
      </p>

      <h2>7. Our content</h2>
      <p>
        The text, structure, design and materials on this site belong to {site.legalName} or are used
        with permission. You may quote a short passage with attribution and a link back. You may not
        republish whole pages, or use our content to train a commercial product, without our written
        permission.
      </p>
      <p>
        Third-party names and logos, including Xero, belong to their owners and are used to describe
        the software we work with.
      </p>

      <h2>8. Links to other sites</h2>
      <p>
        Where we link to SARS, CIPC, Xero or other third parties, we do so for convenience. We do not
        control those sites and we are not responsible for their content or their handling of your
        information.
      </p>

      <h2>9. Availability</h2>
      <p>
        We try to keep this site available and correct, but we do not guarantee that it will be
        uninterrupted, error-free or free of anything harmful. We may change or remove content at any
        time.
      </p>

      <h2>10. Liability</h2>
      <p>
        To the extent the law allows, {site.legalName} is not liable for any loss or damage arising
        from your use of this website or from reliance on its general information. Nothing in these
        terms limits liability that cannot lawfully be limited, and nothing here affects the
        obligations we owe you under a signed engagement letter, which are governed by that letter
        and by the rules of our professional bodies.
      </p>

      <h2>11. Your privacy</h2>
      <p>
        Our <Link href="/privacy">privacy notice</Link> explains what personal information we collect
        through this site and what we do with it.
      </p>

      <h2>12. Governing law</h2>
      <p>
        These terms are governed by the law of the Republic of South Africa, and the South African
        courts have jurisdiction over any dispute arising from them.
      </p>

      <h2>13. Changes to these terms</h2>
      <p>
        We may update these terms. The date at the top shows when they last changed, and the version
        in force is the one published here when you use the site.
      </p>

      <h2>Questions</h2>
      <p>
        Phone <a href={telHref}>{site.phoneDisplay}</a>, or visit us at {site.address.street},{" "}
        {site.address.locality}.
      </p>
    </section>
  );
}
