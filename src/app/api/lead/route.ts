import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";
import { notify } from "@/lib/notify";
import { clientIp, verifyTurnstile } from "@/lib/turnstile";

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
  turnstileToken?: string;
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

  const human = await verifyTurnstile(body.turnstileToken, clientIp(request));
  if (!human.ok) return NextResponse.json({ ok: false, error: human.error }, { status: 400 });

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

  // Two independent attempts: store it, and send it. An enquiry survives either
  // one working. The database being asleep must never lose a lead again.
  const supabase = getServiceClient();
  let stored = false;

  if (supabase) {
    const { error } = await supabase.from("leads").insert({
      name,
      email,
      phone: phone || null,
      message: body.message?.trim() || null,
      service: body.service || null,
      source: body.source || "website",
      consent_at: new Date().toISOString(),
    });
    if (error) console.error("lead insert failed:", error.message);
    else stored = true;
  }

  const emailed = await notify({
    subject: stored ? `Website enquiry — ${name}` : `Website enquiry — ${name} (NOT saved to database)`,
    rows: [
      ["Name", name],
      ["Email", email],
      ["Phone", phone],
      ["Service", body.service ?? ""],
      ["Page", body.source ?? "website"],
      ...(stored ? [] : ([["Warning", "The database was unreachable — this email is the only record."]] as [string, string][])),
    ],
    body: body.message?.trim(),
    replyTo: email,
  });

  if (!stored && !emailed) {
    // Nothing captured it. Say so honestly rather than claiming success.
    console.error("lead lost: database and email both unavailable");
    return NextResponse.json(
      { ok: false, error: "We could not save that. Please phone 031 903 4787." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
