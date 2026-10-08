"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Turnstile, turnstileSiteKey } from "@/components/Turnstile";
import { SA_OFFSET } from "@/lib/booking";
import { founder, site, telHref } from "@/lib/site";

/* Consultation booking engine — flow from CRM Solutions' discovery-call engine
   (pick a day → pick a time → details → confirmed with calendar links),
   restyled on SCA's form standard. Schedule rules live in lib/booking.ts. */

type Availability = { dates: string[]; slots: string[]; booked: string[]; durationMinutes: number };
type Confirmed = { when: string; phone: string; confirmed: boolean; emailed: boolean; googleCalendarUrl: string };

const startIso = (date: string, time: string) => new Date(`${date}T${time}:00${SA_OFFSET}`).toISOString();
const dayParts = (date: string) => {
  const d = new Date(`${date}T12:00:00${SA_OFFSET}`);
  const f = (o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat("en-ZA", { timeZone: "Africa/Johannesburg", ...o }).format(d);
  return { weekday: f({ weekday: "short" }), day: f({ day: "numeric" }), month: f({ month: "short" }), long: f({ weekday: "long", day: "numeric", month: "long" }) };
};
const firstName = founder.name.split(" ")[0];

export function BookingWizard() {
  const [availability, setAvailability] = useState<Availability | null>(null);
  const [loadError, setLoadError] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", business: "", topic: "", consent: false });
  const [website, setWebsite] = useState("");
  const [token, setToken] = useState("");
  const [status, setStatus] = useState<"idle" | "sending">("idle");
  const [error, setError] = useState("");
  const [done, setDone] = useState<Confirmed | null>(null);

  const load = () =>
    fetch("/api/bookings", { cache: "no-store" })
      .then((r) => r.json())
      .then((j) => {
        if (!j.ok) throw new Error();
        setAvailability(j);
        setDate((d) => d || j.dates.find((dt: string) => j.slots.some((t: string) => !j.booked.includes(startIso(dt, t)))) || "");
      })
      .catch(() => setLoadError(`The calendar did not load. Please phone ${site.phoneDisplay} to book.`));

  useEffect(() => {
    void load();
  }, []);

  const booked = useMemo(() => new Set(availability?.booked ?? []), [availability]);
  const freeOn = (d: string) => (availability?.slots ?? []).filter((t) => !booked.has(startIso(d, t)));
  const slotsToday = availability && date ? availability.slots : [];

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    if (!date || !time) return setError("Choose a day and a time first.");
    if (turnstileSiteKey() && !token) return setError("Please complete the security check.");
    setStatus("sending");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, time, ...form, turnstileToken: token, website }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok || !j.ok) {
        setError(j.error ?? "Something went wrong. Please try again.");
        if (res.status === 409) {
          setTime("");
          void load();
        }
        setStatus("idle");
        return;
      }
      setDone(j.booking);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError(`We could not send that. Please phone ${site.phoneDisplay}.`);
      setStatus("idle");
    }
  }

  if (done) {
    return (
      <div className="booking-done" role="status">
        <svg viewBox="0 0 24 24" width="56" height="56" aria-hidden="true">
          <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path d="M7.5 12.5l3 3 6-6.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p className="label">{done.confirmed ? "Booked" : "Request received"}</p>
        <h2>{done.when}</h2>
        <p>
          {firstName} will phone you on <strong>{done.phone}</strong>.{" "}
          {done.emailed
            ? "A confirmation with a calendar invite is on its way to your inbox."
            : "We will email you to confirm the time."}
        </p>
        <div className="booking-done__actions">
          <a className="btn btn-primary" href={done.googleCalendarUrl} target="_blank" rel="noopener noreferrer">
            Add to Google Calendar
          </a>
          <Link className="btn btn-outline" href="/contact#what-to-bring">
            What to have ready
          </Link>
        </div>
      </div>
    );
  }

  const selected = date && time ? `${dayParts(date).long} at ${time}` : "";

  return (
    <div className="booking">
      <aside className="booking__aside">
        <p className="label">Free consultation</p>
        <h2 className="booking__title">{availability?.durationMinutes ?? 20} minutes with {firstName}</h2>
        <ul className="booking__facts">
          <li>
            <strong>By phone.</strong> {firstName} calls you at the time you choose.
          </li>
          <li>
            <strong>No charge,</strong> no obligation.
          </li>
          <li>
            <strong>Covers</strong> compliance, cash flow and reporting, and what to fix first.
          </li>
        </ul>
        <div className={selected ? "booking__pick is-set" : "booking__pick"}>
          <span className="label">Your time</span>
          <strong>{selected || "Choose a day and time"}</strong>
        </div>
        <p className="booking__alt">
          Prefer to talk now? <a href={telHref}>{site.phoneDisplay}</a>
        </p>
      </aside>

      <form className="booking__main" onSubmit={submit} noValidate>
        <div hidden aria-hidden="true">
          <label htmlFor="booking-website">Website</label>
          <input id="booking-website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
        </div>

        <fieldset className="booking__step">
          <legend>
            <span className="booking__n">1</span> Choose a day
          </legend>
          {loadError && <p role="alert" className="review-error">{loadError}</p>}
          {!availability && !loadError && <p className="booking__loading">Loading the calendar…</p>}
          {availability && (
            <div className="booking__days">
              {availability.dates.map((d) => {
                const p = dayParts(d);
                const free = freeOn(d).length;
                return (
                  <button
                    key={d}
                    type="button"
                    className={d === date ? "booking__day is-on" : "booking__day"}
                    onClick={() => {
                      setDate(d);
                      setTime("");
                    }}
                    disabled={!free}
                    aria-pressed={d === date}
                    aria-label={`${p.long}, ${free ? `${free} times free` : "fully booked"}`}
                  >
                    <span>{p.weekday}</span>
                    <strong>{p.day}</strong>
                    <span>{p.month}</span>
                  </button>
                );
              })}
            </div>
          )}
        </fieldset>

        <fieldset className="booking__step" disabled={!date}>
          <legend>
            <span className="booking__n">2</span> Choose a time <small>South African time</small>
          </legend>
          <div className="booking__times">
            {slotsToday.map((t) => {
              const taken = booked.has(startIso(date, t));
              return (
                <button
                  key={t}
                  type="button"
                  className={t === time ? "booking__time is-on" : "booking__time"}
                  disabled={taken}
                  onClick={() => setTime(t)}
                  aria-pressed={t === time}
                  aria-label={taken ? `${t}, taken` : t}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </fieldset>

        <fieldset className="booking__step" disabled={!time}>
          <legend>
            <span className="booking__n">3</span> Your details
          </legend>
          <div className="review-grid">
            {(
              [
                ["name", "Your name *", "text", "name"],
                ["phone", "Phone number *", "tel", "tel"],
                ["email", "Email *", "email", "email"],
                ["business", "Business (optional)", "text", "organization"],
              ] as const
            ).map(([key, label, type, auto]) => (
              <div className="field" key={key}>
                <label className="sr-only" htmlFor={`booking-${key}`}>{label}</label>
                <input
                  id={`booking-${key}`}
                  className="input"
                  type={type}
                  autoComplete={auto}
                  placeholder={label}
                  value={form[key]}
                  onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                />
              </div>
            ))}
          </div>
          <div className="field">
            <label className="sr-only" htmlFor="booking-topic">Where is the pressure?</label>
            <textarea
              id="booking-topic"
              className="textarea"
              rows={3}
              placeholder="Where is the pressure? Tax, cash flow, reporting…"
              value={form.topic}
              onChange={(e) => setForm((f) => ({ ...f, topic: e.target.value }))}
            />
          </div>
          <label className="consent" htmlFor="booking-consent">
            <input
              id="booking-consent"
              type="checkbox"
              checked={form.consent}
              onChange={(e) => setForm((f) => ({ ...f, consent: e.target.checked }))}
            />
            <span>
              South Coast Advisory may contact me about this booking and store these details, as set
              out in the <a href="/privacy">privacy notice</a>.
            </span>
          </label>
          <Turnstile onToken={setToken} />
          <button type="submit" className="btn btn-primary review-submit" disabled={status === "sending" || !time}>
            {status === "sending" ? "Booking…" : selected ? `Confirm ${selected}` : "Confirm booking"}
          </button>
          {error && <p role="alert" className="review-error">{error}</p>}
        </fieldset>
      </form>
    </div>
  );
}
