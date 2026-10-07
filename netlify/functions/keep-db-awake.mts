import type { Config } from "@netlify/functions";

/**
 * Keeps the Supabase project awake.
 *
 * Free Supabase projects are paused after about a week without traffic. On 7 October 2026 that
 * happened quietly here: the enquiry form returned "We could not save that" and any visitor who
 * tried to book a call simply left. This runs every day, reads one count through the site's own
 * health endpoint, and shouts in the function log if it fails.
 *
 * Standard house pattern for any project on a free database tier.
 */
export default async () => {
  const base = process.env.SITE_URL ?? process.env.URL ?? "https://sca-za.netlify.app";
  const started = Date.now();
  try {
    const res = await fetch(`${base}/api/health/db`, { headers: { "User-Agent": "sca-za-keepalive" } });
    const body = await res.json().catch(() => ({}));
    console.log(`keep-db-awake: ${res.status} in ${Date.now() - started}ms`, JSON.stringify(body));
    return new Response(JSON.stringify({ ok: res.ok, status: res.status, body }), {
      status: res.ok ? 200 : 503,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("keep-db-awake failed:", err);
    return new Response(JSON.stringify({ ok: false, error: String(err) }), { status: 503 });
  }
};

// 06:10 South African time (UTC+2) — the database is awake before anyone opens the site.
export const config: Config = { schedule: "10 4 * * *" };
