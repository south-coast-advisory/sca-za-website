import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * AI crawlers are allowed deliberately: the FAQ and glossary exist to be cited
 * by AI Overviews, ChatGPT, Perplexity and Copilot. Blocking them would defeat
 * the point of writing them.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      { userAgent: ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended", "CCBot"], allow: "/" },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
