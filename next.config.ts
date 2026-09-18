import type { NextConfig } from "next";
import { LEGACY_REDIRECTS } from "./legacy-redirects";

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
          ...(process.env.VERCEL_ENV === "production"
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
