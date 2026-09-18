import { NextResponse } from "next/server";
import { docBySlug } from "@/content/documents";
import { signDownload } from "@/lib/download-token";
import { getServiceClient } from "@/lib/supabase";

export const runtime = "nodejs";

type Payload = {
  slug?: string;
  name?: string;
  email?: string;
  businessType?: string;
  consent?: boolean;
  marketing?: boolean;
  company?: string; // honeypot
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const doc = body.slug ? docBySlug(body.slug) : undefined;
  if (!doc) {
    return NextResponse.json({ ok: false, error: "Unknown document." }, { status: 404 });
  }

  // Bots get a polite nothing.
  if (body.company) {
    return NextResponse.json({ ok: true, url: "/resources/library" });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim().toLowerCase() ?? "";

  if (name.length < 2) {
    return NextResponse.json({ ok: false, error: "Please give us your name." }, { status: 400 });
  }
  if (!EMAIL.test(email)) {
    return NextResponse.json(
      { ok: false, error: "That email address does not look right." },
      { status: 400 },
    );
  }
  if (!body.consent) {
    return NextResponse.json(
      { ok: false, error: "Please tick the box so we may send this to you." },
      { status: 400 },
    );
  }

  // Record the request. A database that is not configured must not block the
  // download — the visitor kept their side of the bargain.
  const supabase = getServiceClient();
  if (supabase) {
    const { error } = await supabase.from("downloads").insert({
      document_slug: doc.slug,
      document_title: doc.title,
      name,
      email,
      business_type: body.businessType || null,
      consent_at: new Date().toISOString(),
      marketing_optin: Boolean(body.marketing),
    });
    if (error) console.error("download insert failed", error.message);
  } else {
    console.warn("Supabase not configured — download served but lead not captured");
  }

  const token = signDownload(doc.slug);
  return NextResponse.json({
    ok: true,
    url: `/api/documents/${doc.slug}/download?t=${encodeURIComponent(token)}`,
    title: doc.title,
  });
}
