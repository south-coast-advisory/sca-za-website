/**
 * SEO audit of every page in the sitemap, scored out of 100 against the basics
 * search engines and AI assistants read. Results feed the /site-info page.
 * Ported from the Gas Safety (GSI) site so every project is measured the same way.
 *
 *   node scripts/seo-audit.mjs [base]      (default base http://localhost:3000)
 *
 * Output: src/data/seo-audit.json. Run with the dev server up, after changes.
 */
import fs from "node:fs";
import path from "node:path";

const base = process.argv[2] ?? "http://localhost:3000";
const DOMAIN = "https://www.sca-za.com";

const CHECKS = [
  { id: "title", label: "Title 30–65 characters", points: 15 },
  { id: "description", label: "Description 70–165 characters", points: 15 },
  { id: "h1", label: "Exactly one H1", points: 10 },
  { id: "canonical", label: "Canonical URL", points: 10 },
  { id: "share", label: "Share image", points: 10 },
  { id: "schema", label: "Structured data", points: 10 },
  { id: "alt", label: "Images described", points: 10 },
  { id: "words", label: "250+ words of content", points: 10 },
  { id: "h2", label: "Sub-headings", points: 5 },
  { id: "links", label: "10+ internal links", points: 5 },
];

const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");

function audit(url, html) {
  const title = decode(/<title>([^<]*)<\/title>/.exec(html)?.[1] ?? "");
  const description = decode(/<meta name="description" content="([^"]*)"/.exec(html)?.[1] ?? "");
  const main = /<main[\s\S]*?<\/main>/.exec(html)?.[0] ?? html;
  const text = main.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ");
  const words = text.split(/\s+/).filter((w) => /[a-z]/i.test(w)).length;
  const imgs = [...main.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]);
  const canonical = /<link rel="canonical" href="([^"]*)"/.exec(html)?.[1];

  const pass = {
    title: title.length >= 30 && title.length <= 65,
    description: description.length >= 70 && description.length <= 165,
    h1: (main.match(/<h1\b/g) ?? []).length === 1,
    canonical: canonical === `${DOMAIN}${url}` || (url === "/" && canonical === DOMAIN),
    share: /<meta property="og:image"/.test(html),
    schema: /application\/ld\+json/.test(html),
    alt: imgs.every((i) => /\balt="/.test(i)),
    words: words >= 250,
    h2: /<h2\b/.test(main),
    links: new Set([...html.matchAll(/href="(\/[^"#?]*)/g)].map((m) => m[1])).size >= 10,
  };
  const score = CHECKS.reduce((n, c) => n + (pass[c.id] ? c.points : 0), 0);
  return {
    url,
    title,
    score,
    words,
    failed: CHECKS.filter((c) => !pass[c.id]).map((c) =>
      c.id === "title" ? `Title ${title.length} characters` : c.id === "description" ? `Description ${description.length} characters` : c.id === "words" ? `${words} words` : c.label,
    ),
  };
}

const section = (url) =>
  url === "/"
    ? "Home"
    : url.startsWith("/services")
      ? "Services"
      : url.startsWith("/xero")
        ? "Xero"
        : url.startsWith("/resources/library")
          ? "Guides"
          : url.startsWith("/resources/ai")
            ? "AI tutorials"
            : url.startsWith("/resources") || url === "/faq" || url === "/glossary"
              ? "Resources & answers"
              : "Practice & policies";

/** The dev server can drop a request while it recompiles; try again. */
async function get(url, tries = 4) {
  for (let i = 1; ; i++) {
    try {
      return await fetch(url);
    } catch (err) {
      if (i >= tries) throw err;
      await new Promise((r) => setTimeout(r, 1500 * i));
    }
  }
}

const sitemap = await (await get(`${base}/sitemap.xml`)).text();
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(DOMAIN, "") || "/");

const pages = [];
for (const url of urls) {
  const res = await get(`${base}${url}`);
  pages.push({ ...audit(url, await res.text()), section: section(url), status: res.status });
}

const avg = (xs) => Math.round(xs.reduce((n, p) => n + p.score, 0) / xs.length);
const sections = [...new Set(pages.map((p) => p.section))].map((name) => {
  const ps = pages.filter((p) => p.section === name);
  return { name, pages: ps.length, score: avg(ps) };
});
const checks = CHECKS.map((c) => ({
  label: c.label,
  points: c.points,
  passed: pages.filter(
    (p) =>
      !p.failed.some(
        (f) => f === c.label || (c.id === "title" && f.startsWith("Title")) || (c.id === "description" && f.startsWith("Description")) || (c.id === "words" && f.endsWith(" words")),
      ),
  ).length,
}));

const result = { auditedAt: new Date().toISOString(), total: pages.length, score: avg(pages), sections, checks, pages: pages.sort((a, b) => a.score - b.score) };
const out = path.join(process.cwd(), "src/data/seo-audit.json");
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, JSON.stringify(result, null, 1));
console.log(`Score ${result.score}/100 over ${pages.length} pages`);
for (const s of sections) console.log(`  ${s.name.padEnd(22)} ${s.score}  (${s.pages})`);
for (const c of checks) console.log(`  ${c.label.padEnd(32)} ${c.passed}/${pages.length}`);
for (const p of pages.filter((p) => p.score < 100)) console.log(`  ${p.score}  ${p.url}  — ${p.failed.join("; ")}`);
