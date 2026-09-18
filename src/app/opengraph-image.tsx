import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.legalName} — accountants and Xero partner in Amanzimtoti`;

/**
 * Social share card, drawn at build time. Colours are the engine's values
 * resolved to literals here because ImageResponse cannot read CSS variables —
 * this is the documented exception in Website-Build-Standard.md rule 6.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0B0D3A",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#8E93E8",
            }}
          >
            {site.address.locality} · KwaZulu-Natal
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 78,
              lineHeight: 1.05,
              fontWeight: 700,
              color: "#FFFFFF",
              maxWidth: "900px",
            }}
          >
            Accountants and Xero partner since 1980
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ display: "flex", fontSize: 40, fontWeight: 700, color: "#FFFFFF" }}>
              {site.legalName}
            </div>
            <div style={{ display: "flex", fontSize: 30, color: "#8E93E8" }}>
              {site.phoneDisplay} · sca-za.com
            </div>
          </div>
          <div
            style={{
              display: "flex",
              borderTop: "6px solid #DC071D",
              paddingTop: "16px",
              fontSize: 28,
              color: "#FFFFFF",
            }}
          >
            Xero Silver Partner
          </div>
        </div>
      </div>
    ),
    size,
  );
}
