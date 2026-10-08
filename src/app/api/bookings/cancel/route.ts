import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";
import { notify } from "@/lib/notify";
import { formatSlot } from "@/lib/booking";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const reply = (body: object, status = 200) => NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

/** Look up a booking by its private token (from the confirmation email). */
async function find(token: string) {
  const supabase = getServiceClient();
  if (!supabase || !UUID.test(token)) return { supabase, booking: null };
  const { data } = await supabase
    .from("consultation_bookings")
    .select("id,start_at,name,phone,email,status")
    .eq("cancel_token", token)
    .maybeSingle();
  return { supabase, booking: data };
}

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token") ?? "";
  const { booking } = await find(token);
  if (!booking) return reply({ ok: false, error: "We could not find that booking." }, 404);
  return reply({ ok: true, when: formatSlot(booking.start_at), status: booking.status });
}

/** Cancelling frees the slot at once (the unique index only covers confirmed bookings). */
export async function POST(request: Request) {
  const { token } = (await request.json().catch(() => ({}))) as { token?: string };
  const { supabase, booking } = await find(token ?? "");
  if (!supabase || !booking) return reply({ ok: false, error: "We could not find that booking." }, 404);
  if (booking.status !== "confirmed") return reply({ ok: true, when: formatSlot(booking.start_at), status: booking.status });

  const { error } = await supabase
    .from("consultation_bookings")
    .update({ status: "cancelled", cancelled_at: new Date().toISOString() })
    .eq("id", booking.id);
  if (error) return reply({ ok: false, error: "Could not cancel. Please phone us." }, 500);

  const when = formatSlot(booking.start_at);
  await notify({
    subject: `Consultation cancelled: ${booking.name}, ${when}`,
    rows: [
      ["Was", when],
      ["Name", booking.name],
      ["Phone", booking.phone],
      ["Email", booking.email],
    ],
    replyTo: booking.email,
  });
  return reply({ ok: true, when, status: "cancelled" });
}
