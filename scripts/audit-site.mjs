/**
 * Pre-launch audit. Crawls every URL in the sitemap plus every internal link
 * found on those pages, and reports anything that would embarrass us on launch
 * day: dead links, duplicate or missing metadata, missing or multiple H1s,
 * images without alt text, and invalid JSON-LD.
 *
 *   node scripts/audit-site.mjs http://localhost:PORT
 */
const base = process.argv[2] || "http://localhost:3000";

const get = async (url) => {
  const res = await fetch(url, { redirect: "manual" });
  const type = res.headers.get("content-type") ?? "";
  // Keep the body for anything textual — HTML pages, sitemap.xml, robots.txt.
  const textual = /html|xml|text|json/.test(type);
  const body = res.status < 400 && textual ? await res.text() : "";
  return { status: res.status, body, location: res.headers.get("location") };
};

const pick = (html, re) => {
  const m = html.match(re);
  return m ? m[1].trim() : null;
};

const sitemapUrls = async () => {
  const { body } = await get(`${base}/sitemap.xml`);
  return [...body.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => m[1].replace(/^https:\/\/www\.sca-za\.com/, base));
};

const issues = [];
const note = (level, page, message) => issues.push({ level, page, message });

const pages = new Map();
const linkSources = new Map();

const urls = await sitemapUrls();
console.log(`Sitemap lists ${urls.length} URLs\n`);

// 1. Fetch every sitemap page
for (const url of urls) {
  const path = url.replace(base, "") || "/";
  const { status, body } = await get(url);
  pages.set(path, { status, body });
  if (status !== 200) note("ERROR", path, `returns ${status}`);
}

// 2. Metadata, headings, images, schema
const titles = new Map();
const descriptions = new Map();

for (const [path, { status, body }] of pages) {
  if (status !== 200 || !body) continue;

  const title = pick(body, /<title>([^<]*)<\/title>/);
  const desc = pick(body, /<meta name="description" content="([^"]*)"/);
  const canonical = pick(body, /<link rel="canonical" href="([^"]*)"/);

  if (!title) note("ERROR", path, "no <title>");
  else {
    if (title.length > 65) note("WARN", path, `title ${title.length} chars: ${title}`);
    if (titles.has(title)) note("ERROR", path, `duplicate title with ${titles.get(title)}`);
    titles.set(title, path);
  }

  if (!desc) note("ERROR", path, "no meta description");
  else {
    if (desc.length > 165) note("WARN", path, `description ${desc.length} chars`);
    if (descriptions.has(desc)) note("ERROR", path, `duplicate description with ${descriptions.get(desc)}`);
    descriptions.set(desc, path);
  }

  if (!canonical) note("WARN", path, "no canonical");

  const h1s = [...body.matchAll(/<h1[^>]*>(.*?)<\/h1>/gs)];
  if (h1s.length === 0) note("ERROR", path, "no H1");
  if (h1s.length > 1) note("ERROR", path, `${h1s.length} H1s`);

  // Images without alt (alt="" is fine — decorative)
  for (const img of body.matchAll(/<img\b[^>]*>/g)) {
    if (!/\balt=/.test(img[0])) note("ERROR", path, `img without alt: ${img[0].slice(0, 90)}`);
  }

  // JSON-LD must parse
  for (const block of body.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
    try {
      const data = JSON.parse(block[1]);
      if (!data["@type"]) note("WARN", path, "JSON-LD without @type");
    } catch {
      note("ERROR", path, "JSON-LD does not parse");
    }
  }

  // Collect internal links
  for (const a of body.matchAll(/href="(\/[^"#?]*)"/g)) {
    const href = a[1].replace(/\/$/, "") || "/";
    if (href.startsWith("/_next") || href.startsWith("/api")) continue;
    if (!linkSources.has(href)) linkSources.set(href, new Set());
    linkSources.get(href).add(path);
  }
}

// 3. Every internal link must resolve
console.log(`Checking ${linkSources.size} distinct internal links\n`);
for (const [href, sources] of linkSources) {
  if (pages.has(href) && pages.get(href).status === 200) continue;
  const { status } = await get(`${base}${href}`);
  if (status >= 400) {
    note("ERROR", href, `broken link (${status}), linked from: ${[...sources].join(", ")}`);
  }
}

// 4. The files that must exist
for (const file of ["/robots.txt", "/llms.txt", "/sitemap.xml", "/opengraph-image"]) {
  const { status } = await get(`${base}${file}`);
  if (status !== 200) note("ERROR", file, `returns ${status}`);
}

// Report
const errors = issues.filter((i) => i.level === "ERROR");
const warns = issues.filter((i) => i.level === "WARN");

console.log(`${errors.length} errors, ${warns.length} warnings\n`);
for (const i of [...errors, ...warns]) {
  console.log(`${i.level.padEnd(5)} ${i.page.padEnd(48)} ${i.message}`);
}
if (!issues.length) console.log("Clean.");
