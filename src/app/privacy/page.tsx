import { Breadcrumbs } from "@/components/Blocks";
import { site, founder, telHref } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Privacy Notice (POPIA)",
  description:
    "How South Coast Advisory collects, uses, shares and protects personal information under the Protection of Personal Information Act, and how to exercise your rights.",
  path: "/privacy",
});

/**
 * POPIA notice. Reviewed content, but NOT legal advice — Neil should have his
 * attorney read this before launch, and the PAIA manual must exist separately
 * (every private body needs one; there is no small-business exemption).
 */
const LAST_UPDATED = "18 September 2026";

export default function PrivacyPage() {
  return (
    <section className="shell-narrow section prose">
      <Breadcrumbs
        trail={[
          { name: "Home", path: "/" },
          { name: "Privacy", path: "/privacy" },
        ]}
      />
      <h1>Privacy notice</h1>
      <p className="lede">
        How {site.legalName} collects, uses and protects personal information under the Protection
        of Personal Information Act, 4 of 2013 (POPIA).
      </p>
      <p className="label">Last updated {LAST_UPDATED}</p>

      <h2>1. Who is responsible</h2>
      <p>
        {site.legalName} (&ldquo;SCA&rdquo;, &ldquo;we&rdquo;) is the responsible party for the
        personal information described in this notice. Our office is at {site.address.street},{" "}
        {site.address.locality}, {site.address.region} {site.address.postalCode}, South Africa, and
        our telephone number is <a href={telHref}>{site.phoneDisplay}</a>.
      </p>
      <p>
        Our Information Officer is {founder.name}. You may contact the Information Officer on the
        telephone number above about anything in this notice.
      </p>

      <h2>2. What we collect, and why</h2>
      <div className="table-wrap">
        <table className="data">
          <thead>
            <tr>
              <th>Information</th>
              <th>Where it comes from</th>
              <th>Why we process it</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Name, email address, telephone number, and what you type into a message field</td>
              <td>Forms on this website, which you complete voluntarily</td>
              <td>To answer your enquiry and arrange a consultation</td>
            </tr>
            <tr>
              <td>What you say to our voice assistant, and its replies</td>
              <td>The &ldquo;Ask Sandy&rdquo; assistant, only if you start a conversation with it</td>
              <td>To answer your question and to improve the answers we give</td>
            </tr>
            <tr>
              <td>Name, email address and business type when you request a document</td>
              <td>The resource library download form</td>
              <td>To send you the document and, if you agree separately, occasional updates</td>
            </tr>
            <tr>
              <td>Accounting, tax, payroll and company records</td>
              <td>You and your staff, once you engage us as your accountants</td>
              <td>To deliver the professional services you have engaged us for</td>
            </tr>
            <tr>
              <td>
                Technical information such as pages viewed, approximate location and device type
              </td>
              <td>Website analytics</td>
              <td>To understand which pages are useful and to keep the site working</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        We do not require you to give us personal information to browse this website. Where a form
        is marked as requiring consent, you give that consent by ticking the box, and you may
        withdraw it at any time.
      </p>

      <h2>3. Our lawful grounds</h2>
      <ul>
        <li>
          <strong>Consent</strong> — website enquiries, document downloads and optional updates.
        </li>
        <li>
          <strong>Performance of a contract</strong> — the accounting, tax, payroll and secretarial
          work we do for clients.
        </li>
        <li>
          <strong>Legal obligation</strong> — records we are required to keep under tax, company and
          anti-money-laundering legislation.
        </li>
        <li>
          <strong>Legitimate interests</strong> — keeping our website secure and understanding how it
          is used.
        </li>
      </ul>

      <h2>4. Who we share it with</h2>
      <p>
        We do not sell personal information, and we do not give it to third parties for their own
        marketing. We share it only with operators who process it on our instruction, and with
        authorities where the law requires it:
      </p>
      <ul>
        <li>
          <strong>SARS, CIPC, the UIF and the Compensation Fund</strong> — submissions we make on
          your behalf as your accountants.
        </li>
        <li>
          <strong>Our hosting and database providers</strong> — the website and the enquiry database
          run on hosted infrastructure with access restricted to the practice.
        </li>
        <li>
          <strong>Accounting and payroll platforms</strong> — including Xero and the payroll system
          we use to deliver your work.
        </li>
        <li>
          <strong>Our voice assistant provider</strong> — if you speak to Sandy, what you say is
          processed by a third-party artificial intelligence service to generate the reply.
        </li>
        <li>
          <strong>Analytics</strong> — aggregated website usage statistics.
        </li>
      </ul>

      <h2>5. Information sent outside South Africa</h2>
      <p>
        Some of the providers above process information on servers outside South Africa. Where that
        happens we rely on those providers being subject to laws or binding agreements that give
        personal information a level of protection substantially similar to POPIA, as section 72 of
        the Act requires. If you would rather not have your enquiry handled this way, phone us
        instead of using the forms.
      </p>

      <h2>6. How long we keep it</h2>
      <ul>
        <li>
          <strong>Enquiries that do not become client work</strong> — up to 24 months, then deleted.
        </li>
        <li>
          <strong>Voice assistant conversations</strong> — kept only as long as needed to answer and
          to check quality, and not linked to you unless you give us your details.
        </li>
        <li>
          <strong>Client records</strong> — for the periods required by tax and company legislation,
          which is generally five years from the submission of the relevant return, and seven years
          for certain company records. Some records are kept longer where litigation, an objection
          or an audit is running.
        </li>
      </ul>

      <h2>7. How we protect it</h2>
      <p>
        Access to client and enquiry information is limited to members of the practice who need it
        for their work. Our website database is not readable by the public, and transmission to and
        from this site is encrypted. We review these measures as our systems change, as section 19
        of POPIA requires.
      </p>
      <p>
        If personal information in our care is accessed by an unauthorised person, we will notify the
        Information Regulator and the people affected, as section 22 requires.
      </p>

      <h2>8. Your rights</h2>
      <ul>
        <li>Ask what personal information we hold about you, and request a copy</li>
        <li>Ask us to correct or delete information that is wrong, misleading or excessive</li>
        <li>Object to processing that relies on our legitimate interests</li>
        <li>Withdraw consent to being contacted, at any time</li>
        <li>Ask not to receive direct marketing, which we will action immediately</li>
        <li>Complain to the Information Regulator</li>
      </ul>
      <p>
        To exercise any of these, phone <a href={telHref}>{site.phoneDisplay}</a> and ask for the
        Information Officer. We may need to confirm your identity before we act, particularly where
        the request concerns client financial records.
      </p>

      <h2>9. Access to records (PAIA)</h2>
      <p>
        Our manual under the Promotion of Access to Information Act, 2 of 2000 sets out the records
        we hold and how to request access to them. It is available from the Information Officer on
        request, free of charge.
      </p>

      <h2>10. Cookies and analytics</h2>
      <p>
        This website uses only what it needs to work, plus analytics that tell us which pages are
        read. We do not use advertising trackers or sell audience data. Your browser settings let you
        block or delete cookies, and the site will still work if you do.
      </p>

      <h2>11. Complaints to the Information Regulator</h2>
      <p>
        You may complain to the Information Regulator of South Africa at any time. General enquiries:
        0800 017 160 or 010 023 5200. Email:{" "}
        <a href="mailto:enquiries@inforegulator.org.za">enquiries@inforegulator.org.za</a>. Website:{" "}
        <a href="https://inforegulator.org.za" rel="noopener noreferrer" target="_blank">
          inforegulator.org.za
        </a>
        . We would rather you raised it with us first, and we will always try to resolve it.
      </p>

      <h2>12. Changes to this notice</h2>
      <p>
        We update this notice when our processing changes or the law does. The date at the top tells
        you when it last changed.
      </p>

      <p style={{ fontSize: "var(--text-sm)", color: "var(--color-copy-muted)" }}>
        This notice explains our processing in plain language. It does not replace our PAIA manual,
        our engagement letters, or advice about your own obligations under POPIA — ask us if you need
        help with those.
      </p>
    </section>
  );
}
