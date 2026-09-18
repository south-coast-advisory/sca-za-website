import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";

export const runtime = "nodejs";

type Payload = {
  name?: string;
  business?: string;
  role?: string;
  town?: string;
  service?: string;
  yearsClient?: string;
  rating?: string | number;
  quote?: string;
  email?: string;
  phone?: string;
  consent?: boolean;
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

  if (body.company) return NextResponse.json({ ok: true });

  const name = body.name?.trim() ?? "";
  const quote = body.quote?.trim() ?? "";
  const email = body.email?.trim().toLowerCase() ?? "";
  const rating = Number(body.rating) || null;

  if (name.length < 2) {
    return NextResponse.json({ ok: false, error: "Please give us your name." }, { status: 400 });
  }
  if (quote.length < 20) {
    return NextResponse.json(
      { ok: false, error: "Could you give us a sentence or two more?" },
      { status: 400 },
    );
  }
  if (quote.length > 1200) {
    return NextResponse.json(
      { ok: false, error: "That is longer than we can publish — please trim it a little." },
      { status: 400 },
    );
  }
  if (!EMAIL.test(email)) {
    return NextResponse.json(
      { ok: false, error: "We need your email so we can check it really is you." },
      { status: 400 },
    );
  }
  if (!body.consent) {
    return NextResponse.json(
      { ok: false, error: "Please tick the box to let us publish this." },
      { status: 400 },
    );
  }

  const supabase = getServiceClient();
  if (!supabase) {
    return NextResponse.json(
      {
        ok: false,
        error: "Our form is not connected yet. Please phone 031 903 4787 — we would love to hear it.",
      },
      { status: 503 },
    );
  }

  const { error } = await supabase.from("testimonials").insert({
    name,
    business: body.business?.trim() || null,
    role: body.role?.trim() || null,
    town: body.town?.trim() || null,
    service: body.service || null,
    years_client: body.yearsClient || null,
    rating: rating && rating >= 1 && rating <= 5 ? rating : null,
    quote,
    contact_email: email,
    contact_phone: body.phone?.trim() || null,
    consent_publish_at: new Date().toISOString(),
    status: "pending",
  });

  if (error) {
    console.error("testimonial insert failed", error.message);
    return NextResponse.json(
      { ok: false, error: "We could not save that. Please phone 031 903 4787." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
