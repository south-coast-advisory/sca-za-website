import type { Metadata } from "next";
import { site, founder } from "@/lib/site";
import type { Faq } from "@/content/faq";
import type { Term } from "@/content/glossary";

/** " | South Coast Advisory" — what the layout template appends. */
const BRAND_SUFFIX_LENGTH = 23;
const MAX_TITLE = 60;

/**
 * Google truncates titles at roughly 60 characters. Where a page's own title is
 * long enough that adding the brand would push it past that, we drop the suffix
 * rather than have the brand cut off mid-word — the domain shows in the result
 * anyway. Short titles keep the brand.
 */
function fitTitle(title: string): string | { absolute: string } {
  return title.length + BRAND_SUFFIX_LENGTH > MAX_TITLE ? { absolute: title } : title;
}

/** Section label on the share card, from the URL. */
function shareKicker(path: string): string {
  if (path === "/") return "Accountants · Amanzimtoti";
  if (path.startsWith("/services")) return "Services";
  if (path.startsWith("/xero")) return "Xero Silver Partner";
  if (path.startsWith("/resources/library")) return "Free guide";
  if (path.startsWith("/resources/ai")) return "AI for business owners";
  if (path.startsWith("/resources")) return "Resources";
  if (path.startsWith("/faq")) return "Questions answered";
  if (path.startsWith("/glossary")) return "Glossary";
  if (path.startsWith("/pricing")) return "Fees";
  if (path.startsWith("/about")) return "About the practice";
  if (path.startsWith("/contact")) return "Contact";
  if (path.startsWith("/review")) return "Client reviews";
  return "South Coast Advisory";
}

/** The page's own 1200×630 share card — see src/app/og/route.tsx. */
export function shareImage(title: string, path: string) {
  const qs = new URLSearchParams({ t: title, k: shareKicker(path) });
  return { url: `/og?${qs}`, width: 1200, height: 630, alt: `${title} — ${site.name}` };
}

export function pageMeta({
  title,
  description,
  path,
  image,
  cardTitle,
  /**
   * True where the route has its own generated opengraph-image file. Setting
   * images here would override it, so we leave them out and let Next's file
   * convention supply the picture.
   */
  generatedImage = false,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  /** Headline for the share card when it should differ from the <title>. */
  cardTitle?: string;
  generatedImage?: boolean;
}): Metadata {
  const url = `${site.url}${path}`;
  // WhatsApp and LinkedIn show og:title on its own, so it always carries the brand.
  const shareTitle = title.includes(site.name) ? title : `${title} | ${site.name}`;
  const card = image ? { url: image } : shareImage(cardTitle ?? title, path);
  if (description.length > 160) {
    console.warn(`[seo] description ${description.length} chars (max 160): ${path}`);
  }
  return {
    title: fitTitle(title),
    description,
    alternates: { canonical: url },
    openGraph: {
      title: shareTitle,
      description,
      url,
      siteName: site.name,
      locale: "en_ZA",
      type: "website",
      ...(generatedImage ? {} : { images: [card] }),
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      ...(generatedImage ? {} : { images: [card] }),
    },
  };
}

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: site.address.street,
  addressLocality: site.address.locality,
  addressRegion: site.address.region,
  postalCode: site.address.postalCode,
  addressCountry: site.address.country,
};

/** Site-wide organisation / local business entity. */
export const organisationSchema = {
  "@context": "https://schema.org",
  "@type": "AccountingService",
  "@id": `${site.url}/#organisation`,
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  telephone: site.phone,
  description: site.description,
  foundingDate: site.founded,
  address: postalAddress,
  geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
  openingHours: site.openingHours,
  areaServed: site.areasServed.map((name) => ({ "@type": "Place", name })),
  founder: {
    "@type": "Person",
    name: founder.name,
    jobTitle: founder.role,
    award: "SAIPA President's Award (2004)",
  },
  ...(() => {
    // The Google Business Profile URL is a sameAs like any other, and linking
    // the two entities helps Google connect the site to the map listing.
    const profiles = [...site.sameAs, site.google.profileUrl].filter(Boolean);
    return profiles.length ? { sameAs: profiles } : {};
  })(),
};

export const serviceSchema = (args: {
  name: string;
  description: string;
  path: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: args.name,
  description: args.description,
  url: `${site.url}${args.path}`,
  serviceType: args.name,
  provider: { "@id": `${site.url}/#organisation` },
  areaServed: site.areasServed.map((name) => ({ "@type": "Place", name })),
});

export const faqSchema = (faqs: Faq[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a.join(" ") },
  })),
});

export const glossarySchema = (terms: Term[]) => ({
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  name: "Accounting, tax and SARS glossary",
  url: `${site.url}/glossary`,
  hasDefinedTerm: terms.map((t) => ({
    "@type": "DefinedTerm",
    "@id": `${site.url}/glossary#${t.id}`,
    name: t.term,
    description: t.definition,
  })),
});

export const breadcrumbSchema = (trail: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: trail.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: `${site.url}${item.path}`,
  })),
});
