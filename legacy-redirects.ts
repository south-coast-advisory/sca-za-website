/**
 * Permanent redirects from the old site's .html URLs to the new structure.
 * Sources: live nav of www.sca-za.com (crawled 16 Sep 2026). sca-za.co.za
 * already 301s to the matching .com path, so these cover both domains.
 *
 * Add to this list, never remove from it: an old URL that stops redirecting
 * is a 404 for every link and bookmark pointing at it.
 */
export const LEGACY_REDIRECTS = [
  { source: "/index.html", destination: "/", permanent: true },
  { source: "/about-us.html", destination: "/about", permanent: true },
  { source: "/about-us/our-purpose-and-approach.html", destination: "/about", permanent: true },
  { source: "/contact-us.html", destination: "/contact", permanent: true },
  { source: "/xero-accounting.html", destination: "/xero", permanent: true },

  // Services
  { source: "/accounting-and-finance.html", destination: "/services/accounting-bookkeeping", permanent: true },
  { source: "/accounting-services.html", destination: "/services/accounting-bookkeeping", permanent: true },
  { source: "/bookkeeping-and-accounting.html", destination: "/services/accounting-bookkeeping", permanent: true },
  { source: "/tax-services.html", destination: "/services/tax", permanent: true },
  { source: "/payroll-management.html", destination: "/services/payroll", permanent: true },
  { source: "/secretarial-services.html", destination: "/services/company-secretarial", permanent: true },
  { source: "/management-consultation.html", destination: "/services/advisory-cfo", permanent: true },
  { source: "/business-valuations.html", destination: "/services/business-valuations", permanent: true },
  { source: "/human-resources.html", destination: "/services/hr", permanent: true },
  { source: "/property-management.html", destination: "/services/property-management", permanent: true },

  // Legal
  { source: "/legal/privacy-policy.html", destination: "/privacy", permanent: true },
  { source: "/legal/terms-and-conditions.html", destination: "/terms", permanent: true },

  // Old client-area stubs that were never finished. Send them somewhere useful
  // rather than leaving four dead pages in Google's index.
  { source: "/login.html", destination: "/contact", permanent: true },
  { source: "/logout.html", destination: "/", permanent: true },
  { source: "/my-account.html", destination: "/contact", permanent: true },
];
