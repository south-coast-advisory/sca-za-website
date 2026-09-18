import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { NextResponse } from "next/server";
import { docBySlug } from "@/content/documents";
import { verifyDownload } from "@/lib/download-token";

export const runtime = "nodejs";

/**
 * Serves a gated PDF from private-documents/ — outside public/, so the only
 * way to it is a signed token issued after the form is completed.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const doc = docBySlug(slug);
  if (!doc) return new NextResponse("Not found", { status: 404 });

  const search = new URL(request.url).searchParams;
  const token = search.get("t");
  // ?view=1 opens the PDF in the browser instead of downloading it. Same token
  // requirement — it is only a convenience for previewing.
  const inline = search.get("view") === "1";
  if (!verifyDownload(slug, token)) {
    return NextResponse.redirect(new URL(`/resources/library/${slug}?expired=1`, request.url));
  }

  try {
    const file = await readFile(join(process.cwd(), "private-documents", `${slug}.pdf`));
    return new NextResponse(new Uint8Array(file), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `${inline ? "inline" : "attachment"}; filename="${slug}.pdf"`,
        "Cache-Control": "no-store",
      },
    });
  } catch {
    console.error(`Missing PDF for ${slug} — run: npm run build:docs`);
    return new NextResponse("That document is temporarily unavailable.", { status: 503 });
  }
}
