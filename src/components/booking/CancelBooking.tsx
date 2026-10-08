"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { site, telHref } from "@/lib/site";

/** Cancel from the private link in the confirmation email, then rebook. */
export function CancelBooking({ token }: { token: string }) {
  const [state, setState] = useState<{ when?: string; status?: string; error?: string; busy?: boolean }>({});

  useEffect(() => {
    fetch(`/api/bookings/cancel?token=${encodeURIComponent(token)}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((j) => setState(j.ok ? { when: j.when, status: j.status } : { error: j.error }))
      .catch(() => setState({ error: "We could not load that booking." }));
  }, [token]);

  async function cancel() {
    setState((s) => ({ ...s, busy: true }));
    const j = await fetch("/api/bookings/cancel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then((r) => r.json())
      .catch(() => ({ ok: false, error: "We could not cancel it." }));
    setState(j.ok ? { when: j.when, status: j.status } : { error: j.error });
  }

  if (state.error)
    return (
      <p className="lede">
        {state.error} Please phone <a href={telHref}>{site.phoneDisplay}</a>.
      </p>
    );
  if (!state.when) return <p className="lede">Loading your booking…</p>;
  if (state.status === "cancelled")
    return (
      <div style={{ display: "grid", gap: "var(--space-4)", justifyItems: "start" }}>
        <p className="lede">Your consultation on {state.when} is cancelled. The time is free again.</p>
        <Link className="btn btn-primary" href="/book">
          Choose another time
        </Link>
      </div>
    );
  return (
    <div style={{ display: "grid", gap: "var(--space-4)", justifyItems: "start" }}>
      <p className="lede">Your consultation is booked for <strong>{state.when}</strong>.</p>
      <p>To move it, cancel this one and choose a new time.</p>
      <div style={{ display: "flex", gap: "var(--space-3)", flexWrap: "wrap" }}>
        <button type="button" className="btn btn-primary" onClick={cancel} disabled={state.busy}>
          {state.busy ? "Cancelling…" : "Cancel this booking"}
        </button>
        <Link className="btn btn-outline" href="/">
          Keep it
        </Link>
      </div>
    </div>
  );
}
