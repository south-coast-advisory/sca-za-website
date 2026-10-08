import { NextResponse, type NextRequest } from "next/server";
import { getServiceClient } from "@/lib/supabase";
import { notify } from "@/lib/notify";
import { subjectSlug } from "@/lib/review-form";

export const runtime = "nodejs";

/**
 * Video reviews, in two steps so the file never passes through this server:
 *   GET  → a signed upload URL into the private `review-videos` bucket
 *   POST → after the browser has uploaded, record who it is from
 *
 * The bucket is private: an unapproved video is never publicly reachable.
 * Neil gets a 7-day viewing link by email. Bucket + columns come from
 * supabase/migrations/20261008_review_engine.sql.
 */
const BUCKET = "review-videos";
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PATH = /^reviews\/\d{13}-[a-z0-9-]{1,40}\.(webm|mp4)$/;
const UNAVAILABLE =
  "Video upload is not switched on yet. Please write your review instead, or phone us and we will arrange it.";

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40) || "client";

export async function GET(req: NextRequest) {
  const supabase = getServiceClient();
  if (!supabase) return NextResponse.json({ ok: false, error: UNAVAILABLE }, { status: 503 });

  const name = req.nextUrl.searchParams.get("name") ?? "client";
  const ext = req.nextUrl.searchParams.get("ext") === "mp4" ? "mp4" : "webm";
  const path = `reviews/${Date.now()}-${slugify(name)}.${ext}`;

  const { data, error } = await supabase.storage.from(BUCKET).createSignedUploadUrl(path);
  if (error || !data) {
    console.error("video signed URL failed:", error?.message);
    return NextResponse.json({ ok: false, error: UNAVAILABLE }, { status: 503 });
  }
  return NextResponse.json({ ok: true, signedUrl: data.signedUrl, path });
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
  if (body.website) return NextResponse.json({ ok: true });

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();
  const path = String(body.path ?? "");
  const subject = String(body.subject ?? "").trim() || "The practice overall";

  if (name.length < 2) return NextResponse.json({ ok: false, error: "Please give us your name." }, { status: 400 });
  if (!EMAIL.test(email)) return NextResponse.json({ ok: false, error: "Please enter a valid email." }, { status: 400 });
  if (!PATH.test(path)) return NextResponse.json({ ok: false, error: "Upload not recognised." }, { status: 400 });
  if (!body.permission) {
    return NextResponse.json({ ok: false, error: "Please tick the box to let us publish this." }, { status: 400 });
  }

  const supabase = getServiceClient();
  if (!supabase) return NextResponse.json({ ok: false, error: UNAVAILABLE }, { status: 503 });

  const base = {
    name,
    service: subject,
    quote: "Video review",
    contact_email: email,
    consent_publish_at: new Date().toISOString(),
    status: "pending",
  };
  let { error } = await supabase.from("testimonials").insert({
    ...base,
    review_type: "video",
    video_path: path,
    service_slug: subjectSlug(subject),
  });
  if (error) {
    console.error("video review insert failed, retrying core columns:", error.message);
    ({ error } = await supabase.from("testimonials").insert({ ...base, quote: `Video review: ${path}` }));
  }
  if (error) console.error("video review insert failed:", error.message);

  const { data: view } = await supabase.storage.from(BUCKET).createSignedUrl(path, 60 * 60 * 24 * 7);
  await notify({
    subject: `Video review from ${name} — awaiting approval`,
    rows: [
      ["About", subject],
      ["Name", name],
      ["Email", email],
      ["Watch (link valid 7 days)", view?.signedUrl ?? path],
      ["Next step", "Watch it, confirm with the client, then set status = approved in Supabase."],
    ],
    replyTo: email,
  });

  // The video itself is safely in storage even if the row failed; the email names its path.
  return NextResponse.json({ ok: true });
}
