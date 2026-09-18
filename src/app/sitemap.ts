import type { MetadataRoute } from "next";
import { libraryDocuments } from "@/content/documents";
import { services } from "@/content/services";
import { tutorials } from "@/content/tutorials";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const core: { path: string; priority: number; freq: "weekly" | "monthly" | "yearly" }[] = [
    { path: "/", priority: 1, freq: "weekly" },
    { path: "/xero", priority: 0.9, freq: "monthly" },
    { path: "/xero/pricing", priority: 0.8, freq: "monthly" },
    { path: "/services", priority: 0.8, freq: "monthly" },
    { path: "/pricing", priority: 0.8, freq: "monthly" },
    { path: "/resources", priority: 0.6, freq: "monthly" },
    { path: "/resources/sars-deadlines", priority: 0.7, freq: "monthly" },
    { path: "/resources/library", priority: 0.8, freq: "monthly" },
    { path: "/resources/ai", priority: 0.7, freq: "monthly" },
    { path: "/share-your-experience", priority: 0.4, freq: "yearly" },
    { path: "/faq", priority: 0.7, freq: "monthly" },
    { path: "/glossary", priority: 0.7, freq: "monthly" },
    { path: "/about", priority: 0.6, freq: "yearly" },
    { path: "/contact", priority: 0.8, freq: "yearly" },
    { path: "/privacy", priority: 0.2, freq: "yearly" },
    { path: "/terms", priority: 0.2, freq: "yearly" },
  ];

  return [
    ...core.map((c) => ({
      url: `${site.url}${c.path}`,
      lastModified: now,
      changeFrequency: c.freq,
      priority: c.priority,
    })),
    ...services.map((s) => ({
      url: `${site.url}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...libraryDocuments.map((d) => ({
      url: `${site.url}/resources/library/${d.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    ...tutorials.map((t) => ({
      url: `${site.url}/resources/ai/${t.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
