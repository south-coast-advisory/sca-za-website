"use client";

import { useState } from "react";
import { site, telHref } from "@/lib/site";

type Props = {
  source: string;
  service?: string;
  compact?: boolean;
  heading?: string;
};

export function LeadForm({ source, service, compact = false, heading }: Props) {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setState("sending");
    setError("");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, consent: data.consent === "on", source, service }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setError(json.error ?? "Something went wrong.");
        setState("error");
        return;
      }
      form.reset();
      setState("sent");
    } catch {
      setError(`We could not send that. Please phone ${site.phoneDisplay}.`);
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div className="card" style={{ background: "var(--color-surface)" }}>
        <h3>Thank you, we have it.</h3>
        <p style={{ marginBottom: 0 }}>
          Neil or a member of the team will be in touch within one working day. If it is urgent,
          phone <a href={telHref}>{site.phoneDisplay}</a>.
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
      <div>
        <h3 style={{ marginBottom: "var(--space-1)" }}>{heading ?? "Book a free 20-minute call"}</h3>
        <p style={{ fontSize: "var(--text-sm)", color: "var(--color-copy-muted)", margin: 0 }}>
          Tell us where your business is and we will tell you what we would do first. No charge, no
          obligation.
        </p>
      </div>

      <div className="field">
        <label htmlFor={`${source}-name`}>Your name</label>
        <input id={`${source}-name`} name="name" className="input" required autoComplete="name" />
      </div>

      <div
        style={{
          display: "grid",
          gap: "var(--space-4)",
          gridTemplateColumns: compact ? "1fr" : "repeat(auto-fit, minmax(190px, 1fr))",
        }}
      >
        <div className="field">
          <label htmlFor={`${source}-email`}>Email</label>
          <input
            id={`${source}-email`}
            name="email"
            type="email"
            className="input"
            required
            autoComplete="email"
          />
        </div>
        <div className="field">
          <label htmlFor={`${source}-phone`}>Phone</label>
          <input id={`${source}-phone`} name="phone" type="tel" className="input" autoComplete="tel" />
        </div>
      </div>

      <div className="field">
        <label htmlFor={`${source}-message`}>What do you need help with?</label>
        <textarea id={`${source}-message`} name="message" rows={3} className="textarea" />
      </div>

      {/* Honeypot — hidden from people, irresistible to bots */}
      <div hidden aria-hidden="true">
        <label htmlFor={`${source}-company`}>Company</label>
        <input id={`${source}-company`} name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="consent" htmlFor={`${source}-consent`}>
        <input id={`${source}-consent`} name="consent" type="checkbox" required />
        <span>
          I agree that South Coast Advisory may contact me about my enquiry and store these details,
          as set out in the <a href="/privacy">privacy notice</a>.
        </span>
      </label>

      <button type="submit" className="btn btn-primary" disabled={state === "sending"}>
        {state === "sending" ? "Sending…" : "Book my call"}
      </button>

      {state === "error" && (
        <p role="alert" style={{ color: "var(--color-secondary)", fontSize: "var(--text-sm)", margin: 0 }}>
          {error}
        </p>
      )}

      <p style={{ fontSize: "var(--text-xs)", color: "var(--color-copy-muted)", margin: 0 }}>
        Prefer to talk? Phone <a href={telHref}>{site.phoneDisplay}</a>. We are in Amanzimtoti,
        weekdays.
      </p>
    </form>
  );
}
