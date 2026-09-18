import Image from "next/image";
import { AnswerBlock, Breadcrumbs, CtaBand } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { founder, site } from "@/lib/site";
import { breadcrumbSchema, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "About the Practice, Amanzimtoti",
  description:
    "South Coast Advisory has advised businesses from Amanzimtoti since 1980. Led by Neil Oberholzer, past president of SAIPA and member of SAICA.",
  path: "/about",
});

const trail = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
];

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: founder.name,
  jobTitle: founder.role,
  worksFor: { "@id": `${site.url}/#organisation` },
  award: "SAIPA President's Award (2004)",
  memberOf: [
    { "@type": "Organization", name: "South African Institute of Chartered Accountants" },
    { "@type": "Organization", name: "South African Institute of Professional Accountants" },
  ],
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={[personSchema, breadcrumbSchema(trail)]} />

      <section className="shell section">
        <Breadcrumbs trail={trail} />
        <h1>A practice on this coast since 1980</h1>
        <p className="lede">
          Forty-six years in one town means our clients&rsquo; businesses, and often their
          children&rsquo;s businesses, have been through every SARS regime, every recession and every
          change of accounting software with us.
        </p>
        <div style={{ marginTop: "var(--space-8)" }}>
          <AnswerBlock>
            South Coast Advisory (Pty) Ltd is an accounting practice in Amanzimtoti, KwaZulu-Natal,
            established in 1980 by Neil Oberholzer, a member of SAICA and a past president of SAIPA.
            The practice serves owner-managed businesses, body corporates and individuals along the
            KZN South Coast, and is a Xero Silver Partner.
          </AnswerBlock>
        </div>
      </section>

      <section className="surface">
        <div className="shell section">
          <div
            style={{
              display: "grid",
              gap: "var(--space-12)",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
              alignItems: "start",
            }}
          >
            <Image
              src={founder.photo}
              alt={`${founder.name}, ${founder.role}`}
              width={500}
              height={500}
              style={{ width: "100%", height: "auto" }}
            />
            <div>
              <p className="label">{founder.role}</p>
              <h2>{founder.name}</h2>
              <p>
                Neil started articles in Kimberley and completed them in Johannesburg, studying after
                hours at Wits for six years and finishing through Unisa. He came out of a corporate
                career, including a spell as national administration manager for a national furniture
                group, and opened his own practice in Amanzimtoti in 1980.
              </p>
              <p>
                He spent thirteen post-qualification years with SAIPA, holds membership number 115,
                and served as its president. On the international side he sat for three years on
                IFAC&rsquo;s Financial Management Accounting Committee, and secured full IFAC
                membership for SAIPA.
              </p>
              <ul style={{ paddingLeft: "1.1rem" }}>
                {founder.credentials.map((c) => (
                  <li key={c} style={{ marginBottom: "var(--space-2)" }}>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="shell section">
        <h2>How we work</h2>
        <div
          style={{
            display: "grid",
            gap: "var(--space-4)",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            marginTop: "var(--space-6)",
          }}
        >
          {[
            [
              "One team, one set of books",
              "Bookkeeping, tax, payroll and secretarial work happen in the same practice, so nothing is lost between providers.",
            ],
            [
              "Cloud first, in person when it counts",
              "Your books live in Xero. Most of the year that means phone and email; when a decision matters, you sit across a desk from us.",
            ],
            [
              "We tell you when you don't need us",
              "If a service will not earn its fee for your business, we will say so. A client who trusts the advice stays for decades.",
            ],
          ].map(([title, body]) => (
            <div key={title} className="card">
              <h3 style={{ fontSize: "var(--text-lg)" }}>{title}</h3>
              <p style={{ marginBottom: 0, fontSize: "var(--text-sm)" }}>{body}</p>
            </div>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
