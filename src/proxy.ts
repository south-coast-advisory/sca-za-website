import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Keeps every address except the real one out of search results.
 *
 * The site is reachable at sca-za.netlify.app long before DNS is cut over, and
 * a publicly crawlable copy of the whole site on a second domain is duplicate
 * content. Canonical tags already point at the real domain, but a canonical is
 * a hint — X-Robots-Tag is an instruction.
 *
 * This removes itself: once sca-za.com resolves here, the host matches
 * NEXT_PUBLIC_SITE_URL and no header is added.
 *
 * Note: Next 16 renamed the `middleware` file convention to `proxy`.
 */
const SITE_HOST = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sca-za.com")
  .replace(/^https?:\/\//, "")
  .replace(/\/$/, "")
  .toLowerCase();

export function proxy(request: NextRequest) {
  const response = NextResponse.next();
  const host = request.headers.get("host")?.toLowerCase() ?? "";

  // Allow the canonical host and the apex it redirects from.
  const isRealSite = host === SITE_HOST || host === SITE_HOST.replace(/^www\./, "");

  if (!isRealSite) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return response;
}

export const config = {
  // Everything except Next's own assets and the favicon.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
