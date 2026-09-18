import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";

export const runtime = "nodejs";

type Payload = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  service?: string;
  source?: string;
  consent?: boolean;
  company?: string; // honeypot — real people never fill this
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Silently accept bots so they do not retry, but store nothing.
  if (body.company) return NextResponse.json({ ok: true });

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim().toLowerCase() ?? "";
  const phone = body.phone?.trim() ?? "";

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
      { ok: false, error: "Please tick the box so we may contact you." },
      { status: 400 },
    );
  }

  const supabase = getServiceClient();
  if (!supabase) {
    // Not configured yet: do not pretend it was saved.
    return NextResponse.json(
      {
        ok: false,
        error: "Our form is not connected yet. Please phone 031 903 4787 and we will help right away.",
      },
      { status: 503 },
    );
  }

  const { error } = await supabase.from("leads").insert({
    name,
    email,
    phone: phone || null,
    message: body.message?.trim() || null,
    service: body.service || null,
    source: body.source || "website",
    consent_at: new Date().toISOString(),
  });

  if (error) {
    console.error("lead insert failed", error.message);
    return NextResponse.json(
      { ok: false, error: "We could not save that. Please phone 031 903 4787." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
