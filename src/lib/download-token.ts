import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Short-lived signed tokens for gated downloads.
 *
 * The point is not secrecy — the documents are free. The point is that a link
 * cannot be passed around or guessed, so every download is attached to a real
 * form submission. Ten minutes is plenty for a browser to follow a link.
 */
const TTL_MS = 10 * 60 * 1000;

function secret(): string {
  return (
    process.env.DOWNLOAD_SECRET ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    "sca-dev-only-secret-set-DOWNLOAD_SECRET-in-production"
  );
}

export function signDownload(slug: string, expiresAt = Date.now() + TTL_MS): string {
  const payload = `${slug}.${expiresAt}`;
  const mac = createHmac("sha256", secret()).update(payload).digest("base64url");
  return `${expiresAt}.${mac}`;
}

export function verifyDownload(slug: string, token: string | null): boolean {
  if (!token) return false;
  const [expiresRaw, mac] = token.split(".");
  const expiresAt = Number(expiresRaw);
  if (!expiresAt || !mac || Date.now() > expiresAt) return false;

  const expected = createHmac("sha256", secret()).update(`${slug}.${expiresAt}`).digest("base64url");
  const a = Buffer.from(mac);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}
