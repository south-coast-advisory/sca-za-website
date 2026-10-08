import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const runtime = "nodejs";

/**
 * Share card for WhatsApp, LinkedIn, Facebook and X: 1200 × 630, one per page,
 * built from the page's own title. pageMeta() points every page here as
 * /og?t=<title>&k=<section label>, so a new page gets a branded card with no
 * design work.
 *
 * Colour literals are the documented exception (Website-Build-Standard rule 6):
 * ImageResponse cannot read CSS variables. Resolved engine values:
 * navy = --brand-900 hsl(230 52% 26%), red = accent hsl(354 94% 45%).
 */
const NAVY = "#222D62";
const RED = "#DC071D";
const MUTED = "#C9CEEB";

const asset = (p: string) => readFile(path.join(process.cwd(), "public", p));
// IBM Plex Sans, the site's heading face (OFL), shipped beside this route.
const font = (w: number) => readFile(path.join(process.cwd(), "src", "app", "og", `ibm-plex-sans-${w}.woff`));

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = (searchParams.get("t") || site.tagline).slice(0, 110);
  const kicker = (searchParams.get("k") || "Accountants · Amanzimtoti").slice(0, 40);

  // Background = the hero video's poster, blurred under the navy wash, baked into
  // one small JPEG (public/brand/og-background.jpg) so the card stays well under
  // WhatsApp's image size limit.
  const [logo, photo, bold, medium] = await Promise.all([
    asset("brand/logo-white.svg"),
    asset("brand/og-background.jpg"),
    font(700),
    font(500),
  ]);
  const logoSrc = `data:image/svg+xml;base64,${logo.toString("base64")}`;
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;
  const titleSize = title.length > 70 ? 54 : title.length > 45 ? 64 : 74;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: NAVY, fontFamily: "Plex" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photoSrc} alt="" width={1200} height={630} style={{ position: "absolute", top: 0, left: 0 }} />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            padding: "64px 72px",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} alt="" height={92} width={466} />

          <div style={{ display: "flex", flexDirection: "column", gap: "22px", maxWidth: "940px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "14px", color: MUTED, fontSize: 24, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase" }}>
              <div style={{ width: 18, height: 18, background: RED, display: "flex" }} />
              {kicker}
            </div>
            <div style={{ display: "flex", color: "#FFFFFF", fontSize: titleSize, fontWeight: 700, lineHeight: 1.08 }}>
              {title}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: 26, fontWeight: 500, color: "#FFFFFF" }}>
            <div style={{ display: "flex" }}>{site.phoneDisplay} · sca-za.com</div>
            <div style={{ display: "flex", borderTop: `5px solid ${RED}`, paddingTop: "12px" }}>
              Xero Silver Partner · Since {site.founded}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Plex", data: bold, weight: 700, style: "normal" },
        { name: "Plex", data: medium, weight: 500, style: "normal" },
      ],
      headers: { "Cache-Control": "public, max-age=86400, s-maxage=31536000, stale-while-revalidate=86400" },
    },
  );
}
