import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";
import { notify } from "@/lib/notify";
import { clientIp, verifyTurnstile } from "@/lib/turnstile";
import {
  BOOKING,
  DAILY_SLOTS,
  bookableDates,
  formatSlot,
  googleCalendarUrl,
  icsInvite,
  isBookable,
  slotStart,
} from "@/lib/booking";
import { founder, site } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Consultation bookings. Pattern from CRM Solutions' discovery-call engine:
 *   GET  → bookable dates, the daily slots, and which slots are already taken
 *   POST → book one slot; a unique index on start_at makes double-booking
 *          impossible even when two people click at the same moment.
 * Table: supabase/migrations/20261008_consultation_bookings.sql.
 *
 * Like enquiries, a booking is emailed as well as stored. If the table is not
 * there yet, the booking still reaches Neil by email and the client is told
 * the time will be confirmed.
 */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const fail = (error: string, status = 400) =>
  NextResponse.json({ ok: false, error }, { status, headers: { "Cache-Control": "no-store" } });

export async function GET() {
  const dates = bookableDates();
  const booked: string[] = [];
  const supabase = getServiceClient();
  if (supabase) {
    const from = slotStart(dates[0], "00:00").toISOString();
    const { data, error } = await supabase
      .from("consultation_bookings")
      .select("start_at")
      .eq("status", "confirmed")
      .gte("start_at", from);
    if (error) console.error("bookings: availability query failed:", error.message);
    for (const row of data ?? []) booked.push(new Date(row.start_at as string).toISOString());
  }
  const now = Date.now();
  const minStart = now + BOOKING.minNoticeHours * 3_600_000;
  // Too-soon slots are reported as taken so the page never offers them.
  for (const d of dates) for (const t of DAILY_SLOTS) {
    const s = slotStart(d, t);
    if (s.getTime() < minStart) booked.push(s.toISOString());
  }
  return NextResponse.json(
    { ok: true, dates, slots: DAILY_SLOTS, booked, durationMinutes: BOOKING.durationMinutes, format: BOOKING.format },
    { headers: { "Cache-Control": "no-store" } },
  );
}

type Payload = {
  date?: string;
  time?: string;
  name?: string;
  email?: string;
  phone?: string;
  business?: string;
  topic?: string;
  consent?: boolean;
  turnstileToken?: string;
  website?: string; // honeypot
};

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return fail("Invalid request.");
  }
  if (body.website) return NextResponse.json({ ok: true, booking: null });

  const date = body.date ?? "";
  const time = body.time ?? "";
  const name = body.name?.trim().slice(0, 120) ?? "";
  const email = body.email?.trim().toLowerCase().slice(0, 200) ?? "";
  const phone = body.phone?.trim().slice(0, 40) ?? "";
  const business = body.business?.trim().slice(0, 160) ?? "";
  const topic = body.topic?.trim().slice(0, 1500) ?? "";

  if (!isBookable(date, time)) return fail("That time is no longer available. Please choose another.", 409);
  if (name.length < 2) return fail("Please give us your name.");
  if (!EMAIL.test(email)) return fail("Please enter a valid email address.");
  if (phone.replace(/\D/g, "").length < 9) return fail("Please give a phone number Neil can call you on.");
  if (!body.consent) return fail("Please tick the box so we may contact you about the booking.");

  const human = await verifyTurnstile(body.turnstileToken, clientIp(request));
  if (!human.ok) return fail(human.error ?? "Please complete the security check.");

  const startIso = slotStart(date, time).toISOString();
  const when = formatSlot(startIso);
  const cancelToken = crypto.randomUUID();
  const supabase = getServiceClient();

  let stored = false;
  if (supabase) {
    const { error } = await supabase.from("consultation_bookings").insert({
      start_at: startIso,
      duration_minutes: BOOKING.durationMinutes,
      format: BOOKING.format,
      name,
      email,
      phone,
      business: business || null,
      topic: topic || null,
      consent_at: new Date().toISOString(),
      cancel_token: cancelToken,
      status: "confirmed",
    });
    if (error?.code === "23505") return fail("Someone has just booked that time. Please choose another.", 409);
    if (error) console.error("booking insert failed:", error.message);
    else stored = true;
  }

  const title = `Consultation with ${site.name}`;
  const firstName = founder.name.split(" ")[0];
  const how = `${firstName} will phone you on ${phone}.`;
  const ics = icsInvite({
    uid: cancelToken,
    startIso,
    title,
    description: `Free ${BOOKING.durationMinutes}-minute consultation. ${how}${topic ? `\n\nAbout: ${topic}` : ""}`,
    location: `Phone call — ${phone}`,
  });
  const manageUrl = `${process.env.URL || site.url}/book/cancel?token=${cancelToken}`;

  const toPractice = await notify({
    subject: `Consultation booked: ${name}, ${when}${stored ? "" : " (NOT saved to database)"}`,
    rows: [
      ["When", `${when} (${BOOKING.durationMinutes} min)`],
      ["Phone", phone],
      ["Name", name],
      ["Business", business],
      ["Email", email],
      ...(stored ? [] : ([["Warning", "Database unavailable — check this slot is free before confirming."]] as [string, string][])),
    ],
    body: topic || undefined,
    replyTo: email,
    attachments: [{ filename: "consultation.ics", content: ics, contentType: "text/calendar" }],
  });

  const toClient = await notify({
    to: email,
    subject: `Your consultation with ${site.name}: ${when}`,
    rows: [
      ["When", `${when} (South African time)`],
      ["How", how],
      ["Length", `${BOOKING.durationMinutes} minutes, no charge`],
      ["Bring if you have them", "Latest management accounts or trial balance, and any SARS letters"],
      ["Need to change it?", manageUrl],
    ],
    replyTo: process.env.NOTIFY_TO_EMAIL,
    attachments: [{ filename: "consultation.ics", content: ics, contentType: "text/calendar" }],
    footer: `${site.legalName} · ${site.address.street}, ${site.address.locality} · ${site.phoneDisplay}`,
  });

  if (!stored && !toPractice) {
    console.error("booking lost: database and email both unavailable");
    return fail(`We could not save that booking. Please phone ${site.phoneDisplay}.`, 500);
  }

  return NextResponse.json(
    {
      ok: true,
      booking: {
        when,
        startIso,
        phone,
        confirmed: stored,
        emailed: toClient,
        googleCalendarUrl: googleCalendarUrl(startIso, title, `${how}\n\n${site.phoneDisplay}`),
      },
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
