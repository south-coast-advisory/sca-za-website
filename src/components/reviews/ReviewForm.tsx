"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  GENERAL_SUBJECT,
  MAX_VIDEO_SECONDS,
  emptyAnswers,
  reviewQuestions,
  reviewSubjects,
  videoPrompts,
} from "@/lib/review-form";
import { site } from "@/lib/site";

/* Review engine — ported from Lava-SA (write + record tabs, guided questions,
   in-browser recording), restyled on SCA's form standard. */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATING_WORDS = ["", "Poor", "Fair", "Good", "Very good", "Excellent"];

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width="32" height="32" aria-hidden="true">
      <path
        d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StarRating({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  const [hover, setHover] = useState(0);
  const shown = hover || value;
  return (
    <div className="review-stars" onMouseLeave={() => setHover(0)}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          className={shown >= n ? "is-on" : undefined}
          onClick={() => onChange(n)}
          onMouseEnter={() => setHover(n)}
          aria-label={`${n} star${n > 1 ? "s" : ""}`}
          aria-pressed={value === n}
        >
          <StarIcon filled={shown >= n} />
        </button>
      ))}
      <span className="review-stars__word">{shown ? RATING_WORDS[shown] : ""}</span>
    </div>
  );
}

function SubjectSelect({
  id,
  value,
  onChange,
  disabled,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
}) {
  return (
    <div className="field">
      <label htmlFor={id} className="review-label">
        What is your review about?
      </label>
      <select id={id} className="select" value={value} onChange={(e) => onChange(e.target.value)} disabled={disabled}>
        {reviewSubjects.map((s) => (
          <option key={s.label} value={s.label}>
            {s.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div hidden aria-hidden="true">
      <label htmlFor="review-website">Website</label>
      <input id="review-website" tabIndex={-1} autoComplete="off" value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function Done({ first, children }: { first: string; children: React.ReactNode }) {
  return (
    <div className="review-done" role="status">
      <svg viewBox="0 0 24 24" width="56" height="56" aria-hidden="true">
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M7.5 12.5l3 3 6-6.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <h2>Thank you{first ? `, ${first}` : ""}.</h2>
      {children}
    </div>
  );
}

function WrittenReview() {
  const [form, setForm] = useState({
    subject: GENERAL_SUBJECT,
    rating: 0,
    name: "",
    email: "",
    business: "",
    town: "",
    headline: "",
    answers: emptyAnswers(),
    permission: false,
  });
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [serverError, setServerError] = useState("");
  const [copied, setCopied] = useState(false);

  const set = (field: keyof typeof form, value: string | number | boolean) => {
    setForm((p) => ({ ...p, [field]: value }));
    setErrors((p) => ({ ...p, [field]: "" }));
  };
  const setAnswer = (id: string, value: string) => {
    setForm((p) => ({ ...p, answers: { ...p.answers, [id]: value } }));
    setErrors((p) => ({ ...p, [id]: "" }));
  };

  function validate() {
    const e: Record<string, string> = {};
    if (!form.rating) e.rating = "Please choose a star rating.";
    if (form.name.trim().length < 2) e.name = "Please give us your name.";
    if (!EMAIL.test(form.email.trim())) e.email = "Please enter a valid email.";
    if (!form.headline.trim()) e.headline = "Please give your review a headline.";
    for (const q of reviewQuestions) {
      const len = form.answers[q.id].trim().length;
      if (len < q.minLength) e[q.id] = len ? `A little more, please — at least ${q.minLength} characters.` : "Please answer this one.";
    }
    if (!form.permission) e.permission = "Please tick to let us publish your review.";
    setErrors(e);
    const first = Object.keys(e)[0];
    if (first) document.getElementById(`review-${first}`)?.focus();
    return !first;
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setServerError("");
    if (!validate()) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, website }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) {
        setServerError(json.error ?? "Something went wrong. Please try again.");
        setStatus("idle");
        return;
      }
      setStatus("done");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setServerError(`We could not send that. Please phone ${site.phoneDisplay}.`);
      setStatus("idle");
    }
  }

  if (status === "done") {
    const googleText = [form.headline, ...reviewQuestions.map((q) => form.answers[q.id].trim())].join("\n\n");
    return (
      <Done first={form.name.trim().split(" ")[0]}>
        <p>
          Neil reads every review himself. We will confirm it is from you before anything appears on
          the website.
        </p>
        {form.rating >= 4 && site.google.reviewUrl && (
          <div className="review-google">
            <p>
              <strong>Would you post it on Google too?</strong> It is how other South Coast businesses
              find us. Copy your words, then paste them on Google.
            </p>
            <div className="review-google__actions">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => navigator.clipboard?.writeText(googleText).then(() => setCopied(true))}
              >
                {copied ? "✓ Copied" : "Copy my review"}
              </button>
              <a className="btn btn-primary" href={site.google.reviewUrl} target="_blank" rel="noopener noreferrer">
                Open Google reviews
              </a>
            </div>
          </div>
        )}
        <Link href="/" className="card-cta">Back to the website</Link>
      </Done>
    );
  }

  const err = (k: string) => errors[k] && <p className="review-error">{errors[k]}</p>;

  return (
    <form className="review-form" onSubmit={submit} noValidate>
      <Honeypot value={website} onChange={setWebsite} />

      <div className="review-note">
        <strong>Specific beats glowing.</strong> A sentence about the problem we solved helps the next
        business owner far more than five stars on their own.
      </div>

      <SubjectSelect id="review-subject" value={form.subject} onChange={(v) => set("subject", v)} />

      <div className="field">
        <span className="review-label" id="review-rating-label">Overall rating *</span>
        <div id="review-rating" tabIndex={-1} aria-labelledby="review-rating-label">
          <StarRating value={form.rating} onChange={(n) => set("rating", n)} />
        </div>
        {err("rating")}
      </div>

      <div className="review-grid">
        {(
          [
            ["name", "Your name *", "text", "name"],
            ["email", "Email *", "email", "email"],
            ["business", "Business (optional)", "text", "organization"],
            ["town", "Town (optional)", "text", "address-level2"],
          ] as const
        ).map(([key, label, type, auto]) => (
          <div className="field" key={key}>
            <label className="sr-only" htmlFor={`review-${key}`}>{label}</label>
            <input
              id={`review-${key}`}
              className="input"
              type={type}
              autoComplete={auto}
              placeholder={label}
              value={form[key]}
              onChange={(e) => set(key, e.target.value)}
              aria-invalid={Boolean(errors[key]) || undefined}
            />
            {err(key)}
          </div>
        ))}
        <p className="review-hint" style={{ gridColumn: "1 / -1" }}>Your email is never published — we use it only to confirm the review is yours.</p>
      </div>

      <div className="field">
        <label className="sr-only" htmlFor="review-headline">Review headline</label>
        <input
          id="review-headline"
          className="input"
          placeholder="Review headline *"
          value={form.headline}
          onChange={(e) => set("headline", e.target.value)}
          aria-invalid={Boolean(errors.headline) || undefined}
        />
        {err("headline")}
      </div>

      <div className="review-questions">
        {reviewQuestions.map((q, i) => (
          <div className="field review-q" key={q.id}>
            <label htmlFor={`review-${q.id}`} className="review-label">
              {i + 1}. {q.label} *
            </label>
            {q.hint && <p className="review-hint">{q.hint}</p>}
            <textarea
              id={`review-${q.id}`}
              className="textarea"
              rows={q.rows}
              placeholder={q.placeholder}
              value={form.answers[q.id]}
              onChange={(e) => setAnswer(q.id, e.target.value)}
              aria-invalid={Boolean(errors[q.id]) || undefined}
            />
            {err(q.id)}
          </div>
        ))}
      </div>

      <label className="consent" htmlFor="review-permission">
        <input
          id="review-permission"
          type="checkbox"
          checked={form.permission}
          onChange={(e) => set("permission", e.target.checked)}
        />
        <span>
          This review is genuine, and South Coast Advisory may publish it with my name and business
          once they have confirmed it with me. See the <a href="/privacy">privacy notice</a>.
        </span>
      </label>
      {err("permission")}

      <button type="submit" className="btn btn-primary review-submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send my review"}
      </button>
      {serverError && <p role="alert" className="review-error">{serverError}</p>}
    </form>
  );
}

function VideoReview() {
  type Mode = "idle" | "recording" | "preview" | "uploading" | "done";
  const [mode, setMode] = useState<Mode>("idle");
  const [subject, setSubject] = useState(GENERAL_SUBJECT);
  const [seconds, setSeconds] = useState(0);
  const [blob, setBlob] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [permission, setPermission] = useState(false);
  const [website, setWebsite] = useState("");
  const [error, setError] = useState("");

  const liveRef = useRef<HTMLVideoElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(
    () => () => {
      if (timerRef.current) clearInterval(timerRef.current);
      streamRef.current?.getTracks().forEach((t) => t.stop());
    },
    [],
  );

  const pickFile = (file: File | undefined) => {
    if (!file) return;
    if (file.size > 200 * 1024 * 1024) {
      setError("That file is over 200 MB. A 90-second phone video is usually far smaller — try recording again.");
      return;
    }
    setError("");
    setBlob(file);
    setPreviewUrl(URL.createObjectURL(file));
    setMode("preview");
  };

  const stopRecording = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    recorderRef.current?.stop();
  };

  const startRecording = async () => {
    setError("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: true });
      streamRef.current = stream;
      if (liveRef.current) {
        liveRef.current.srcObject = stream;
        void liveRef.current.play();
      }
      chunksRef.current = [];
      const mimeType = ["video/webm;codecs=vp9,opus", "video/webm", "video/mp4"].find((t) =>
        MediaRecorder.isTypeSupported(t),
      );
      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      recorder.ondataavailable = (e) => e.data.size && chunksRef.current.push(e.data);
      recorder.onstop = () => {
        const recorded = new Blob(chunksRef.current, { type: recorder.mimeType });
        setBlob(recorded);
        setPreviewUrl(URL.createObjectURL(recorded));
        stream.getTracks().forEach((t) => t.stop());
        setMode("preview");
      };
      recorder.start(250);
      recorderRef.current = recorder;
      setSeconds(0);
      setMode("recording");
      timerRef.current = setInterval(() => {
        setSeconds((s) => {
          if (s + 1 >= MAX_VIDEO_SECONDS) stopRecording();
          return Math.min(s + 1, MAX_VIDEO_SECONDS);
        });
      }, 1000);
    } catch {
      setError("We could not open your camera. Allow camera access in your browser, or record on your phone and upload the file.");
    }
  };

  const retake = () => {
    setBlob(null);
    setPreviewUrl("");
    setSeconds(0);
    setError("");
    setMode("idle");
    if (fileRef.current) fileRef.current.value = "";
  };

  const upload = async () => {
    if (!blob) return;
    if (name.trim().length < 2) return setError("Please give us your name.");
    if (!EMAIL.test(email.trim())) return setError("Please enter a valid email.");
    if (!permission) return setError("Please tick to let us publish your video.");
    setError("");
    setMode("uploading");
    try {
      const ext = /mp4|quicktime/.test(blob.type) ? "mp4" : "webm";
      const sign = await fetch(`/api/reviews/video?${new URLSearchParams({ name, ext })}`);
      const signed = await sign.json().catch(() => ({}));
      if (!sign.ok || !signed.ok) throw new Error(signed.error ?? "Could not start the upload.");

      const put = await fetch(signed.signedUrl, {
        method: "PUT",
        body: blob,
        headers: { "Content-Type": blob.type || `video/${ext}` },
      });
      if (!put.ok) throw new Error("The upload did not finish. Please check your connection and try again.");

      const save = await fetch("/api/reviews/video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: signed.path, name, email, subject, permission, website }),
      });
      const saved = await save.json().catch(() => ({}));
      if (!save.ok || !saved.ok) throw new Error(saved.error ?? "Could not save your video.");
      setMode("done");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
      setMode("preview");
    }
  };

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  if (mode === "done") {
    return (
      <Done first={name.trim().split(" ")[0]}>
        <p>Your video is with us. Neil will watch it and confirm with you before it appears anywhere.</p>
        <Link href="/" className="card-cta">Back to the website</Link>
      </Done>
    );
  }

  const busy = mode === "recording" || mode === "uploading";

  return (
    <div className="review-form">
      <Honeypot value={website} onChange={setWebsite} />
      <SubjectSelect id="video-subject" value={subject} onChange={setSubject} disabled={busy} />

      {mode === "idle" && (
        <>
          <div className="review-note">
            <strong>Cover these in 30 to 90 seconds:</strong>
            <ol>
              {videoPrompts.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ol>
            Face a window, hold the phone steady and speak as you would to a friend.
          </div>

          <input
            ref={fileRef}
            id="video-file"
            type="file"
            accept="video/*"
            capture="user"
            className="sr-only"
            onChange={(e) => pickFile(e.target.files?.[0])}
          />
          <label htmlFor="video-file" className="review-drop">
            <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
              <path d="M15 10l5-3v10l-5-3M3 7h12v10H3z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            </svg>
            <span>
              <strong>Record on your phone, or choose a video</strong>
              <small>MP4, MOV or WebM · up to 90 seconds</small>
            </span>
          </label>

          <button type="button" className="btn btn-outline review-record" onClick={startRecording}>
            <span className="review-rec-dot" aria-hidden="true" /> Record with this computer&apos;s camera
          </button>
        </>
      )}

      {mode === "recording" && (
        <div className="review-stage">
          <video ref={liveRef} muted playsInline />
          <span className="review-rec-badge">
            <span className="review-rec-dot" aria-hidden="true" /> REC {fmt(seconds)} / {fmt(MAX_VIDEO_SECONDS)}
          </span>
          <span className="review-rec-bar" style={{ width: `${(seconds / MAX_VIDEO_SECONDS) * 100}%` }} />
          <button type="button" className="btn btn-primary review-submit" onClick={stopRecording}>
            Stop and preview
          </button>
        </div>
      )}

      {(mode === "preview" || mode === "uploading") && (
        <>
          <video className="review-preview" src={previewUrl} controls playsInline />
          <button type="button" className="review-retake" onClick={retake} disabled={mode === "uploading"}>
            ↺ Record or choose again
          </button>

          <div className="review-grid">
            <div className="field">
              <label className="sr-only" htmlFor="video-name">Your name</label>
              <input id="video-name" className="input" placeholder="Your name *" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="field">
              <label className="sr-only" htmlFor="video-email">Email</label>
              <input id="video-email" className="input" type="email" placeholder="Email *" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
          <label className="consent" htmlFor="video-permission">
            <input id="video-permission" type="checkbox" checked={permission} onChange={(e) => setPermission(e.target.checked)} />
            <span>
              South Coast Advisory may publish this video on its website and social media once they
              have confirmed it with me. See the <a href="/privacy">privacy notice</a>.
            </span>
          </label>
          <button type="button" className="btn btn-primary review-submit" onClick={upload} disabled={mode === "uploading"}>
            {mode === "uploading" ? "Uploading your video…" : "Send my video"}
          </button>
        </>
      )}

      {error && <p role="alert" className="review-error">{error}</p>}
    </div>
  );
}

export function ReviewForm() {
  const [tab, setTab] = useState<"write" | "video">("write");
  return (
    <>
      <div className="review-tabs" role="tablist" aria-label="How would you like to review us?">
        {(
          [
            ["write", "Write a review"],
            ["video", "Record a video"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            role="tab"
            id={`tab-${key}`}
            aria-selected={tab === key}
            aria-controls={`panel-${key}`}
            className={tab === key ? "is-active" : undefined}
            onClick={() => setTab(key)}
          >
            {label}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>
        {tab === "write" ? <WrittenReview /> : <VideoReview />}
      </div>
    </>
  );
}
