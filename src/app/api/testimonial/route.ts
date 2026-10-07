import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";
import { notify } from "@/lib/notify";

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

  // A client who has taken the trouble to write a testimonial must never be
  // told it failed. Store it and email it; either one succeeding is enough.
  const supabase = getServiceClient();
  let stored = false;

  if (supabase) {
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
    if (error) console.error("testimonial insert failed:", error.message);
    else stored = true;
  }

  const emailed = await notify({
    subject: stored
      ? `Testimonial from ${name} — awaiting approval`
      : `Testimonial from ${name} (NOT saved to database)`,
    rows: [
      ["Name", name],
      ["Business", body.business?.trim() ?? ""],
      ["Role", body.role?.trim() ?? ""],
      ["Town", body.town?.trim() ?? ""],
      ["Service", body.service ?? ""],
      ["Client for", body.yearsClient ?? ""],
      ["Rating", rating ? `${rating} out of 5` : ""],
      ["Email", email],
      ["Phone", body.phone?.trim() ?? ""],
      ...(stored
        ? ([["Next step", "Approve it in Supabase after confirming with the client."]] as [string, string][])
        : ([["Warning", "The database was unreachable — this email is the only record."]] as [string, string][])),
    ],
    body: quote,
    replyTo: email,
  });

  if (!stored && !emailed) {
    console.error("testimonial lost: database and email both unavailable");
    return NextResponse.json(
      { ok: false, error: "We could not save that. Please phone 031 903 4787." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
