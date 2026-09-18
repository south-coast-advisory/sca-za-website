import type { NextConfig } from "next";
import { LEGACY_REDIRECTS } from "./legacy-redirects";

/**
 * True only for a real production deploy.
 *
 * Netlify sets CONTEXT ("production" | "deploy-preview" | "branch-deploy").
 * Vercel sets VERCEL_ENV. Anything else — a preview, a branch build, a local
 * production build — is treated as not-production, so it gets a noindex header
 * instead of HSTS. A preview deploy competing with the real site in Google is
 * a genuine risk, and this is the cheapest way to prevent it.
 */
function isProductionDeploy(): boolean {
  const context = process.env.CONTEXT ?? process.env.VERCEL_ENV;
  return context === "production";
}

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(self), geolocation=()" },
          ...(isProductionDeploy()
            ? [{ key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" }]
            : [{ key: "X-Robots-Tag", value: "noindex, nofollow" }]),
        ],
      },
    ];
  },

  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },

  /**
   * The gated PDFs live outside public/, so Next would not otherwise ship them
   * to the serverless function that serves them. Without this, downloads work
   * locally and 503 on Vercel.
   */
  outputFileTracingIncludes: {
    "/api/documents/[slug]/download": ["./private-documents/**"],
  },

  /** Legacy .html URLs from sca-za.com and sca-za.co.za → new clean URLs. */
  async redirects() {
    return LEGACY_REDIRECTS;
  },
};

export default nextConfig;
