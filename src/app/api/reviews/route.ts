import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";
import { notify } from "@/lib/notify";
import { buildAnswers, compileReview, reviewQuestions, subjectSlug } from "@/lib/review-form";
import { site } from "@/lib/site";
import { clientIp, verifyTurnstile } from "@/lib/turnstile";

export const runtime = "nodejs";

type Payload = {
  name?: string;
  email?: string;
  business?: string;
  town?: string;
  subject?: string;
  rating?: number | string;
  headline?: string;
  answers?: Record<string, string>;
  permission?: boolean;
  website?: string; // honeypot
  turnstileToken?: string;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const fail = (error: string, status = 400) => NextResponse.json({ ok: false, error }, { status });

/**
 * Written reviews. Same rule as enquiries: a client who has taken the trouble
 * to write one must never be told it failed. It is stored (status pending,
 * nothing published until Neil approves) AND emailed; either one is enough.
 */
export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return fail("Invalid request.");
  }
  if (body.website) return NextResponse.json({ ok: true });
  const human = await verifyTurnstile(body.turnstileToken, clientIp(request));
  if (!human.ok) return fail(human.error ?? "Please complete the security check.");

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim().toLowerCase() ?? "";
  const headline = body.headline?.trim() ?? "";
  const rating = Number(body.rating);
  const answers = body.answers ?? {};

  if (name.length < 2) return fail("Please give us your name.");
  if (!EMAIL.test(email)) return fail("We need your email so we can check it really is you.");
  if (!(rating >= 1 && rating <= 5)) return fail("Please choose a star rating.");
  if (!headline) return fail("Please give your review a headline.");
  for (const q of reviewQuestions) {
    if ((answers[q.id]?.trim().length ?? 0) < q.minLength) {
      return fail("Please answer each question in a little more detail.");
    }
  }
  if (!body.permission) return fail("Please tick the box to let us publish this.");

  const subject = body.subject?.trim() || "The practice overall";
  const quote = compileReview(answers);
  const base = {
    name,
    business: body.business?.trim() || null,
    town: body.town?.trim() || null,
    service: subject,
    rating,
    quote,
    contact_email: email,
    consent_publish_at: new Date().toISOString(),
    status: "pending",
  };

  const supabase = getServiceClient();
  let stored = false;
  if (supabase) {
    let { error } = await supabase.from("testimonials").insert({
      ...base,
      headline,
      answers_json: buildAnswers(answers),
      review_type: "written",
      service_slug: subjectSlug(subject),
    });
    // Until the review-engine migration has run, the new columns do not exist.
    // Keep the review rather than lose it: store the core fields only.
    if (error) {
      console.error("review insert failed, retrying core columns:", error.message);
      ({ error } = await supabase.from("testimonials").insert({ ...base, quote: `${headline}\n\n${quote}` }));
    }
    if (error) console.error("review insert failed:", error.message);
    else stored = true;
  }

  const emailed = await notify({
    subject: `${"★".repeat(rating)} review from ${name}${stored ? " — awaiting approval" : " (NOT saved to database)"}`,
    rows: [
      ["Headline", headline],
      ["Rating", `${rating} out of 5`],
      ["About", subject],
      ["Name", name],
      ["Business", body.business?.trim() ?? ""],
      ["Town", body.town?.trim() ?? ""],
      ["Email", email],
      stored
        ? ["Next step", "Confirm with the client, then set status = approved in Supabase."]
        : ["Warning", "The database was unreachable — this email is the only record."],
    ],
    body: quote,
    replyTo: email,
  });

  if (!stored && !emailed) {
    console.error("review lost: database and email both unavailable");
    return fail(`We could not save that. Please phone ${site.phoneDisplay}.`, 500);
  }
  return NextResponse.json({ ok: true });
}
