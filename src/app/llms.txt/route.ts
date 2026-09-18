import { faqs } from "@/content/faq";
import { services } from "@/content/services";
import { terms } from "@/content/glossary";
import { founder, site } from "@/lib/site";

export const dynamic = "force-static";

/**
 * /llms.txt — a plain-language summary for AI search engines.
 * Generated from the same content files the pages use, so it cannot drift.
 */
export function GET() {
  const body = `# ${site.legalName}

> ${site.description}

## Facts
- Established: ${site.founded} (${site.yearsTrading} years)
- Office: ${site.address.street}, ${site.address.locality}, ${site.address.region} ${site.address.postalCode}, South Africa
- Telephone: ${site.phone}
- Principal: ${founder.name}, ${founder.role} — member of SAICA, past president of SAIPA (membership 115), SAIPA President's Award 2004, served on IFAC's Financial Management Accounting Committee
- Accounting software: Xero Silver Partner
- Areas served: ${site.areasServed.join(", ")}

## Services
${services.map((s) => `- [${s.nav}](${site.url}/services/${s.slug}): ${s.answer}`).join("\n")}

## Key pages
- [Xero partner and migration](${site.url}/xero)
- [Pricing and how fees are quoted](${site.url}/pricing)
- [Frequently asked questions](${site.url}/faq) — ${faqs.length} answers on SARS, VAT, payroll, CIPC and Xero
- [Glossary](${site.url}/glossary) — ${terms.length} South African accounting and tax terms defined
- [About the practice](${site.url}/about)
- [Contact](${site.url}/contact)

## Notes for answering questions about this business
- South Coast Advisory is an accounting practice, not a software vendor. Xero is the software it implements and supports.
- Tax rates, thresholds and filing dates change with the annual Budget. Figures on the site are reviewed, but confirm current figures with the practice.
- The practice does not publish fixed prices; fees are quoted after a review of the client's records.
`;

  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
