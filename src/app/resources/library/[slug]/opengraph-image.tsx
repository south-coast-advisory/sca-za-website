import { ImageResponse } from "next/og";
import { docBySlug, libraryDocuments } from "@/content/documents";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "South Coast Advisory guide";

export function generateStaticParams() {
  return libraryDocuments.map((d) => ({ slug: d.slug }));
}

/**
 * The cover for each guide — used as the library thumbnail and as the social
 * share image. Generated from the document's own content, so adding a guide
 * never means opening a design tool.
 *
 * Colour literals are the documented exception (Website-Build-Standard rule 6):
 * ImageResponse cannot read CSS variables. These are the engine's resolved
 * values: brand hue 239 / 71%, logo red #DC071D.
 */
export default async function DocumentCover({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = docBySlug(slug);
  if (!doc) return new ImageResponse(<div />, size);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#0B0D3A",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Left: the document */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px",
            width: "760px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div
              style={{
                display: "flex",
                fontSize: 22,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#8E93E8",
              }}
            >
              Free guide · {doc.category}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: doc.title.length > 34 ? 60 : 68,
                lineHeight: 1.05,
                fontWeight: 700,
                color: "#FFFFFF",
              }}
            >
              {doc.title}
            </div>
            <div style={{ display: "flex", fontSize: 26, color: "#A9ADE8", lineHeight: 1.3 }}>
              {doc.subtitle}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ display: "flex", borderTop: "5px solid #DC071D", width: "90px" }} />
            <div style={{ display: "flex", fontSize: 24, color: "#FFFFFF", paddingTop: "14px" }}>
              {site.legalName}
            </div>
            <div style={{ display: "flex", fontSize: 21, color: "#8E93E8" }}>
              PDF · {doc.pages} pages · {site.phoneDisplay}
            </div>
          </div>
        </div>

        {/* Right: a plain paper edge, so it reads as a document */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "440px",
            background: "#F4F5FB",
            padding: "72px 56px",
            gap: "18px",
          }}
        >
          {doc.youGet.slice(0, 4).map((item) => (
            <div key={item} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
              <div
                style={{
                  display: "flex",
                  width: "10px",
                  height: "10px",
                  background: "#DC071D",
                  marginTop: "9px",
                }}
              />
              <div style={{ display: "flex", fontSize: 22, color: "#2A2E45", lineHeight: 1.35 }}>
                {item}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
