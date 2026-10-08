/**
 * Cloudflare Turnstile — server-side check. Same contract as Lava-SA's
 * lib/security/turnstile.ts: until both keys are set in Netlify, the check is
 * skipped (logged) so forms keep working; once set, a token is required.
 *
 *   NEXT_PUBLIC_TURNSTILE_SITE_KEY   public, used by the widget
 *   TURNSTILE_SECRET_KEY             secret, used here only
 */
export const turnstileEnabled = () =>
  Boolean(process.env.TURNSTILE_SECRET_KEY?.trim() && process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim());

export async function verifyTurnstile(token: unknown, ip?: string | null): Promise<{ ok: boolean; error?: string }> {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (!secret || !turnstileEnabled()) return { ok: true };
  if (typeof token !== "string" || !token.trim()) return { ok: false, error: "Please complete the security check." };

  const body = new URLSearchParams({ secret, response: token.trim() });
  if (ip) body.set("remoteip", ip);
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
      signal: AbortSignal.timeout(8_000),
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success ? { ok: true } : { ok: false, error: "The security check failed. Please try again." };
  } catch {
    // Cloudflare unreachable: do not lose a real enquiry over it.
    console.error("turnstile: verification unreachable, allowing submission");
    return { ok: true };
  }
}

export const clientIp = (req: Request) =>
  req.headers.get("x-nf-client-connection-ip") ?? req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
