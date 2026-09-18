"use client";

import { useState } from "react";
import { services } from "@/content/services";
import { site, telHref } from "@/lib/site";

const YEARS = ["Less than a year", "1 to 3 years", "3 to 10 years", "More than 10 years", "Decades"];

export function TestimonialForm() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setState("sending");
    setError("");

    try {
      const res = await fetch("/api/testimonial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, consent: data.consent === "on" }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setError(json.error ?? "Something went wrong.");
        setState("error");
        return;
      }
      form.reset();
      setState("done");
    } catch {
      setError(`We could not send that. Please phone ${site.phoneDisplay}.`);
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="card" style={{ background: "var(--color-surface)" }}>
        <h3>Thank you — that means a great deal</h3>
        <p>
          Neil reads every one of these. We will check in with you before anything appears on the
          website, so nothing is published that you are not completely happy with.
        </p>
        <p style={{ marginBottom: 0, fontSize: "var(--text-sm)", color: "var(--color-copy-muted)" }}>
          If you would also be willing to leave this as a Google review, it helps other South Coast
          businesses find us. Ask us for the link, or phone <a href={telHref}>{site.phoneDisplay}</a>.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="card"
      style={{ background: "var(--color-surface)", display: "grid", gap: "var(--space-4)" }}
    >
      <div className="field">
        <label htmlFor="t-quote">In your own words, how have we helped?</label>
        <textarea
          id="t-quote"
          name="quote"
          rows={6}
          className="textarea"
          required
          minLength={20}
          maxLength={1200}
          placeholder="What was going on before, what we did, and what changed. A few honest sentences are worth more than a paragraph of praise."
        />
      </div>

      <div
        style={{
          display: "grid",
          gap: "var(--space-4)",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))",
        }}
      >
        <div className="field">
          <label htmlFor="t-name">Your name</label>
          <input id="t-name" name="name" className="input" required autoComplete="name" />
        </div>
        <div className="field">
          <label htmlFor="t-business">Business name</label>
          <input id="t-business" name="business" className="input" autoComplete="organization" />
        </div>
        <div className="field">
          <label htmlFor="t-role">Your role</label>
          <input id="t-role" name="role" className="input" placeholder="Owner, director, trustee" />
        </div>
        <div className="field">
          <label htmlFor="t-town">Town</label>
          <input id="t-town" name="town" className="input" placeholder="Amanzimtoti" />
        </div>
        <div className="field">
          <label htmlFor="t-service">Which service?</label>
          <select id="t-service" name="service" className="select" defaultValue="">
            <option value="">All of it</option>
            {services.map((s) => (
              <option key={s.slug} value={s.nav}>
                {s.nav}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="t-years">How long have we worked together?</label>
          <select id="t-years" name="yearsClient" className="select" defaultValue="">
            <option value="">Rather not say</option>
            {YEARS.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="field">
        <label htmlFor="t-rating">Out of five, how would you rate us? (for us, not for publication)</label>
        <select id="t-rating" name="rating" className="select" defaultValue="">
          <option value="">Rather not say</option>
          {[5, 4, 3, 2, 1].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      <div
        style={{
          display: "grid",
          gap: "var(--space-4)",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))",
        }}
      >
        <div className="field">
          <label htmlFor="t-email">Your email</label>
          <input id="t-email" name="email" type="email" className="input" required autoComplete="email" />
        </div>
        <div className="field">
          <label htmlFor="t-phone">Phone (optional)</label>
          <input id="t-phone" name="phone" type="tel" className="input" autoComplete="tel" />
        </div>
      </div>

      <div hidden aria-hidden="true">
        <label htmlFor="t-company">Company</label>
        <input id="t-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="consent" htmlFor="t-consent">
        <input id="t-consent" name="consent" type="checkbox" required />
        <span>
          I am happy for South Coast Advisory to publish this on their website with my name and
          business name. I understand I can ask for it to be removed at any time.
        </span>
      </label>

      <button type="submit" className="btn btn-primary" disabled={state === "sending"}>
        {state === "sending" ? "Sending…" : "Send it to Neil"}
      </button>

      {state === "error" && (
        <p role="alert" style={{ color: "var(--color-secondary)", fontSize: "var(--text-sm)", margin: 0 }}>
          {error}
        </p>
      )}

      <p style={{ fontSize: "var(--text-xs)", color: "var(--color-copy-muted)", margin: 0 }}>
        Your email and phone number are only so we can confirm it really is you. They are never
        published. See our <a href="/privacy">privacy notice</a>.
      </p>
    </form>
  );
}
