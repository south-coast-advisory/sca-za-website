/**
 * Single source of truth for business facts (NAP, claims, credentials).
 * Every fact here must be verifiable. Items marked VERIFY in README-HANDOFF.md
 * need Neil's confirmation before launch.
 */

export const site = {
  name: "South Coast Advisory",
  legalName: "South Coast Advisory (Pty) Ltd",
  shortName: "SCA",
  /**
   * The public home of the site. Every canonical URL, the sitemap, the schema
   * and llms.txt are built from this, so it is the single place the primary
   * domain is decided.
   *
   * Set NEXT_PUBLIC_SITE_URL in the host's environment variables to change it
   * without touching code — e.g. to stage on sca-za.co.za before cutting
   * sca-za.com over. No trailing slash.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://www.sca-za.com",
  tagline: "Accountants and Xero partner in Amanzimtoti since 1980",
  description:
    "South Coast Advisory is an accounting practice in Amanzimtoti, KwaZulu-Natal, and a Xero Silver Partner. We handle bookkeeping, tax, payroll, company secretarial work and business valuations for businesses on the KZN South Coast.",
  founded: "1980",
  yearsTrading: new Date().getFullYear() - 1980,
  phone: "+27 31 903 4787",
  phoneDisplay: "031 903 4787",
  whatsapp: "", // VERIFY: confirm a WhatsApp business number
  email: "", // VERIFY: which mailbox should form notifications and the public address use?
  address: {
    street: "Suite 3, First Floor, 22 Rosslyn Road",
    locality: "Amanzimtoti",
    region: "KwaZulu-Natal",
    postalCode: "4125",
    country: "ZA",
  },
  // VERIFY: exact coordinates of the office entrance before the map goes live.
  geo: { lat: -30.0517, lng: 30.8797 },
  openingHours: "Mo-Fr 08:00-16:30", // VERIFY
  areasServed: [
    "Amanzimtoti",
    "Kingsburgh",
    "Warner Beach",
    "Doonside",
    "Illovo",
    "Umkomaas",
    "Scottburgh",
    "Umbogintwini",
    "Isipingo",
    "Durban South",
  ],
  sameAs: [] as string[], // VERIFY: Google Business Profile, Facebook, LinkedIn URLs

  /**
   * Google Business Profile.
   *
   * `reviewUrl` is the direct "write a review" link. Get it from the Google
   * Business Profile dashboard: Read reviews → Get more reviews → copy link.
   * It looks like https://g.page/r/XXXXXXXXXXXX/review
   *
   * Until this is set, /review explains how to leave a review by hand instead
   * of sending people to a dead link.
   */
  google: {
    reviewUrl: "", // VERIFY: paste the short review link from GBP
    profileUrl: "", // VERIFY: the public maps listing
  },
  cta: {
    label: "Book a free 20-minute call",
    href: "/contact",
  },
} as const;

export const founder = {
  name: "Neil Oberholzer",
  role: "Managing Director",
  credentials: [
    "Member of the South African Institute of Chartered Accountants",
    "Past President of the South African Institute of Professional Accountants (SAIPA), membership number 115",
    "Served three years on the Financial Management Accounting Committee of the International Federation of Accountants (IFAC)",
    "Awarded the SAIPA President's Award in 2004 for his contribution to the accountancy profession in South Africa",
    "Established the practice in Amanzimtoti in 1980",
  ],
  photo: "/team/neil-oberholzer.jpg",
} as const;

/** Proof shown in the hero. Every item must be independently checkable. */
export const proofPoints = [
  { value: "Xero", label: "Silver Partner" }, // VERIFY: confirm current partner tier
  { value: `${new Date().getFullYear() - 1980} years`, label: "in Amanzimtoti" },
  { value: "SAICA", label: "member practice" },
  { value: "SAIPA", label: "past president" },
] as const;

export const nav = [
  { label: "Xero", href: "/xero" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const telHref = `tel:${site.phone.replace(/\s/g, "")}`;
