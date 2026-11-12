"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { site } from "@/lib/site";

export function DownloadForm({ slug }: { slug: string; title: string }) {
  const router = useRouter();
  const [state, setState] = useState<"idle" | "sending" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setState("sending");
    setError("");

    try {
      const res = await fetch("/api/documents/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          name: data.name,
          email: data.email,
          businessType: data.businessType,
          consent: data.consent === "on",
          marketing: data.marketing === "on",
          company: data.company,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok || typeof json.url !== "string") {
        setError(json.error ?? "Something went wrong.");
        setState("error");
        return;
      }
      // A honeypot hit returns a plain library URL. Real readers get a signed
      // link, and the thank-you page starts the file so the marketing stays on screen.
      const download = new URL(json.url, window.location.origin);
      const token = download.pathname.includes("/download") ? download.searchParams.get("t") : null;
      if (!token) {
        window.location.href = json.url;
        return;
      }
      router.push(`/resources/library/${slug}/thanks?t=${encodeURIComponent(token)}`);
    } catch {
      setError(`We could not send that. Please phone ${site.phoneDisplay}.`);
      setState("error");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="card"
      style={{ background: "var(--color-surface)", display: "grid", gap: "var(--space-4)" }}
    >
      <div>
        <h3 style={{ marginBottom: "var(--space-1)" }}>Get the PDF</h3>
        <p style={{ fontSize: "var(--text-sm)", color: "var(--color-copy-muted)", margin: 0 }}>
          Free, and yours to keep. We ask who you are so we know what our readers need.
        </p>
      </div>

      <div className="field">
        <label className="sr-only" htmlFor={`${slug}-name`}>Your name</label>
        <input id={`${slug}-name`} name="name" className="input" required autoComplete="name"  placeholder="Name *"/>
      </div>

      <div className="field">
        <label className="sr-only" htmlFor={`${slug}-email`}>Email</label>
        <input
          id={`${slug}-email`}
          name="email"
          type="email"
          className="input"
          required
          autoComplete="email"
         placeholder="Email *"/>
      </div>

      <div className="field">
        <label className="sr-only" htmlFor={`${slug}-type`}>What business or work do you do?</label>
        <input
          id={`${slug}-type`}
          name="businessType"
          className="input"
          maxLength={160}
          placeholder="What business or work do you do?"
        />
      </div>

      <div hidden aria-hidden="true">
        <label className="sr-only" htmlFor={`${slug}-company`}>Company</label>
        <input id={`${slug}-company`} name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="consent" htmlFor={`${slug}-consent`}>
        <input id={`${slug}-consent`} name="consent" type="checkbox" required />
        <span>
          Send me this document and store my details, as set out in the{" "}
          <a href="/privacy">privacy notice</a>.
        </span>
      </label>

      <label className="consent" htmlFor={`${slug}-marketing`}>
        <input id={`${slug}-marketing`} name="marketing" type="checkbox" />
        <span>
          Optional: email me when SARS deadlines change or a new guide is published. No more than
          once a month, and you can stop any time.
        </span>
      </label>

      <button type="submit" className="btn btn-primary" disabled={state === "sending"}>
        {state === "sending" ? "Preparing…" : "Download the PDF"}
      </button>

      {state === "error" && (
        <p role="alert" style={{ color: "var(--color-secondary)", fontSize: "var(--text-sm)", margin: 0 }}>
          {error}
        </p>
      )}
    </form>
  );
}
