import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/health/db — a real read against the database.
 *
 * Two jobs: it reports whether the data layer is alive, and the traffic itself keeps the
 * Supabase project from being paused for inactivity. Free projects sleep after about a week,
 * which is what silently broke the enquiry form here in early October 2026 — the same failure
 * Yasuke Safety hit on 7 October. A scheduled job hits this daily.
 */
export async function GET() {
  const started = Date.now();
  const supabase = getServiceClient();

  if (!supabase) {
    return NextResponse.json(
      { ok: false, error: "Supabase is not configured on this deploy." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }

  try {
    // Smallest possible read: a count, no rows returned, no writes, no side effects.
    const { count, error } = await supabase
      .from("leads")
      .select("id", { count: "exact", head: true });

    if (error) throw new Error(error.message);

    return NextResponse.json(
      { ok: true, store: "supabase", leads: count ?? 0, ms: Date.now() - started },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (err) {
    console.error("health/db failed:", err);
    return NextResponse.json(
      { ok: false, store: "supabase", error: String(err).slice(0, 300), ms: Date.now() - started },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
