/**
 * Consultation booking — the schedule and slot rules, shared by the booking
 * page and the API. Ported from CRM Solutions' discovery-call engine
 * (lib/server/discovery-bookings.ts), adapted for one South African practice.
 *
 * Change Neil's availability HERE and nowhere else.
 */

export const BOOKING = {
  /** Minutes per consultation. */
  durationMinutes: 20,
  /** First and last start times (24h, SAST). */
  dayStart: "09:00",
  lastStart: "15:40",
  /** No slot starts inside this window. */
  lunch: { from: "12:30", to: "13:30" },
  /** getUTCDay() on a SAST date: 1 = Monday … 5 = Friday. */
  weekdays: [1, 2, 3, 4, 5],
  /** How far ahead a client can book, in working days. */
  horizonDays: 15,
  /** Nothing can be booked closer than this to now. */
  minNoticeHours: 3,
  /** How the consultation happens. "phone" = Neil phones the client. */
  format: "phone" as const,
} as const;

export const SA_OFFSET = "+02:00";
export const SA_TZ = "Africa/Johannesburg";

/**
 * South African public holidays (Public Holidays Act 36 of 1994): fixed dates,
 * Good Friday and Family Day from Easter, and the Sunday rule. One-off declared
 * holidays (an election day) go in EXTRA_HOLIDAYS as "YYYY-MM-DD".
 */
const FIXED_HOLIDAYS = ["01-01", "03-21", "04-27", "05-01", "06-16", "08-09", "09-24", "12-16", "12-25", "12-26"];
const EXTRA_HOLIDAYS: string[] = [];
/** Days the practice is closed beyond public holidays (e.g. the December shutdown). */
export const CLOSED_DAYS: string[] = [];

function easterSunday(year: number) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const h = (19 * a + b - Math.floor(b / 4) - Math.floor((b - Math.floor((b + 8) / 25) + 1) / 3) + 15) % 30;
  const l = (32 + 2 * (b % 4) + 2 * Math.floor(c / 4) - h - (c % 4)) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(Date.UTC(year, month - 1, day, 12));
}

const iso = (d: Date) => d.toISOString().slice(0, 10);
const shiftDays = (d: Date, days: number) => new Date(d.getTime() + days * 86_400_000);

function publicHolidays(year: number) {
  const easter = easterSunday(year);
  const set = new Set([iso(shiftDays(easter, -2)), iso(shiftDays(easter, 1))]);
  for (const md of FIXED_HOLIDAYS) {
    const day = new Date(`${year}-${md}T12:00:00Z`);
    set.add(iso(day));
    if (day.getUTCDay() === 0) set.add(iso(shiftDays(day, 1)));
  }
  for (const extra of EXTRA_HOLIDAYS) if (extra.startsWith(`${year}-`)) set.add(extra);
  return set;
}

const isClosed = (date: string) => publicHolidays(Number(date.slice(0, 4))).has(date) || CLOSED_DAYS.includes(date);

const toMinutes = (t: string) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3, 5));
const toTime = (m: number) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;

/** Every start time in a working day, e.g. 09:00, 09:20 … 15:40, lunch removed. */
export const DAILY_SLOTS: string[] = (() => {
  const out: string[] = [];
  const lunchFrom = toMinutes(BOOKING.lunch.from);
  const lunchTo = toMinutes(BOOKING.lunch.to);
  for (let m = toMinutes(BOOKING.dayStart); m <= toMinutes(BOOKING.lastStart); m += BOOKING.durationMinutes) {
    const end = m + BOOKING.durationMinutes;
    if (m < lunchTo && end > lunchFrom) continue;
    out.push(toTime(m));
  }
  return out;
})();

export const slotStart = (date: string, time: string) => new Date(`${date}T${time}:00${SA_OFFSET}`);

/** Today's date in South Africa, as YYYY-MM-DD. */
export const saToday = (now = new Date()) =>
  new Intl.DateTimeFormat("en-CA", { timeZone: SA_TZ, year: "numeric", month: "2-digit", day: "2-digit" }).format(now);

/** The next bookable working days. */
export function bookableDates(now = new Date()): string[] {
  const dates: string[] = [];
  let cursor = new Date(`${saToday(now)}T12:00:00Z`);
  while (dates.length < BOOKING.horizonDays) {
    const date = iso(cursor);
    if ((BOOKING.weekdays as readonly number[]).includes(cursor.getUTCDay()) && !isClosed(date)) dates.push(date);
    cursor = shiftDays(cursor, 1);
  }
  return dates;
}

/** True if this date/time is a slot a client may book right now. */
export function isBookable(date: string, time: string, now = new Date()) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !DAILY_SLOTS.includes(time)) return false;
  if (!bookableDates(now).includes(date)) return false;
  return slotStart(date, time).getTime() - now.getTime() >= BOOKING.minNoticeHours * 3_600_000;
}

/** "Thursday 15 October 2026 at 10:20" in SAST. */
export function formatSlot(startIso: string) {
  const d = new Date(startIso);
  const day = new Intl.DateTimeFormat("en-ZA", { timeZone: SA_TZ, weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(d);
  const time = new Intl.DateTimeFormat("en-ZA", { timeZone: SA_TZ, hour: "2-digit", minute: "2-digit", hour12: false }).format(d);
  return `${day} at ${time}`;
}

/** Google Calendar "add event" link for the client's confirmation. */
export function googleCalendarUrl(startIso: string, title: string, details: string) {
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const start = new Date(startIso);
  const end = new Date(start.getTime() + BOOKING.durationMinutes * 60_000);
  const qs = new URLSearchParams({ action: "TEMPLATE", text: title, dates: `${fmt(start)}/${fmt(end)}`, details, ctz: SA_TZ });
  return `https://calendar.google.com/calendar/render?${qs}`;
}

/** An .ics invite, attached to both confirmation emails. */
export function icsInvite(opts: { uid: string; startIso: string; title: string; description: string; location: string; organizerEmail?: string }) {
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const start = new Date(opts.startIso);
  const end = new Date(start.getTime() + BOOKING.durationMinutes * 60_000);
  const esc = (s: string) => s.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/[,;]/g, (c) => `\\${c}`);
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//South Coast Advisory//Consultation//EN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${opts.uid}@sca-za.co.za`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${esc(opts.title)}`,
    `DESCRIPTION:${esc(opts.description)}`,
    `LOCATION:${esc(opts.location)}`,
    ...(opts.organizerEmail ? [`ORGANIZER;CN=South Coast Advisory:mailto:${opts.organizerEmail}`] : []),
    "BEGIN:VALARM",
    "TRIGGER:-PT30M",
    "ACTION:DISPLAY",
    "DESCRIPTION:Consultation with South Coast Advisory",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}
