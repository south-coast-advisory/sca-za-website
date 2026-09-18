"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { site, telHref } from "@/lib/site";

/**
 * Sandy — the voice assistant.
 *
 * Follows the three-state voice-agent standard (Second Brain
 * Website-Build-Standard.md):
 *   1. a designed launcher bar, never a bare round button;
 *   2. a branded panel that explains itself before asking for the microphone;
 *   3. a slim live pill — the panel closes the moment she connects, so the
 *      page under discussion is visible while you talk about it.
 *
 * Renders nothing unless /api/voice/token says she is enabled, the microphone
 * is only opened on an explicit press, and the API key never reaches the
 * browser: the session runs on a one-use ephemeral token minted server-side.
 */

type Status = "idle" | "connecting" | "live" | "error";

const MIC_RATE = 16000; // Live API expects 16 kHz PCM in
const OUT_RATE = 24000; // and returns 24 kHz PCM

function encodePcm(samples: Float32Array): string {
  const buffer = new ArrayBuffer(samples.length * 2);
  const view = new DataView(buffer);
  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(i * 2, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }
  let binary = "";
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

function decodePcm(base64: string): Float32Array<ArrayBuffer> {
  const binary = atob(base64);
  const length = binary.length / 2;
  const out = new Float32Array(length);
  const view = new DataView(new ArrayBuffer(2));
  for (let i = 0; i < length; i++) {
    view.setUint8(0, binary.charCodeAt(i * 2));
    view.setUint8(1, binary.charCodeAt(i * 2 + 1));
    out[i] = view.getInt16(0, true) / 0x8000;
  }
  return out;
}

/** Worklet source, injected as a Blob so there is no extra file to deploy. */
const WORKLET = `
class Capture extends AudioWorkletProcessor {
  process(inputs) {
    const input = inputs[0][0];
    if (input) this.port.postMessage(new Float32Array(input));
    return true;
  }
}
registerProcessor('capture', Capture);
`;

const MicIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <rect x="9" y="2" width="6" height="12" rx="3" />
    <path d="M5 11a7 7 0 0 0 14 0M12 18v4" />
  </svg>
);

const MutedIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <path d="M9 9V5a3 3 0 0 1 6 0v4M5 11a7 7 0 0 0 11 5M12 18v4M3 3l18 18" />
  </svg>
);

export function Sandy() {
  const [enabled, setEnabled] = useState(false);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [muted, setMuted] = useState(false);
  const [error, setError] = useState("");

  const sessionRef = useRef<{ close: () => void; sendRealtimeInput: (x: unknown) => void } | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const inCtxRef = useRef<AudioContext | null>(null);
  const outCtxRef = useRef<AudioContext | null>(null);
  const playHeadRef = useRef(0);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/voice/token")
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        if (!cancelled && j?.enabled) setEnabled(true);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const stop = useCallback(() => {
    sessionRef.current?.close();
    sessionRef.current = null;
    micStreamRef.current?.getTracks().forEach((t) => t.stop());
    micStreamRef.current = null;
    inCtxRef.current?.close().catch(() => {});
    inCtxRef.current = null;
    outCtxRef.current?.close().catch(() => {});
    outCtxRef.current = null;
    playHeadRef.current = 0;
    setMuted(false);
    setStatus("idle");
  }, []);

  useEffect(() => stop, [stop]);

  const play = useCallback((base64: string) => {
    const ctx = outCtxRef.current;
    if (!ctx) return;
    const samples = decodePcm(base64);
    const buffer = ctx.createBuffer(1, samples.length, OUT_RATE);
    buffer.copyToChannel(samples, 0);
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);
    const startAt = Math.max(ctx.currentTime, playHeadRef.current);
    source.start(startAt);
    playHeadRef.current = startAt + buffer.duration;
  }, []);

  /** Mute stops the microphone at the track, so nothing is transmitted. */
  const toggleMute = useCallback(() => {
    const track = micStreamRef.current?.getAudioTracks()[0];
    if (!track) return;
    track.enabled = !track.enabled;
    setMuted(!track.enabled);
  }, []);

  const start = useCallback(async () => {
    setStatus("connecting");
    setError("");
    try {
      const res = await fetch("/api/voice/token");
      const payload = await res.json().catch(() => null);
      if (!res.ok || !payload?.enabled) throw new Error("unavailable");
      const { token, model, systemInstruction, greeting } = payload;

      const { GoogleGenAI, Modality } = await import("@google/genai");
      const ai = new GoogleGenAI({ apiKey: token });

      const outCtx = new AudioContext({ sampleRate: OUT_RATE });
      outCtxRef.current = outCtx;

      const session = await ai.live.connect({
        model,
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction,
          inputAudioTranscription: {},
          outputAudioTranscription: {},
        },
        callbacks: {
          onopen: () => {
            setStatus("live");
            // The panel steps aside the moment she is listening.
            setOpen(false);
          },
          onmessage: (message) => {
            const content = (message as { serverContent?: unknown }).serverContent as
              | { modelTurn?: { parts?: { inlineData?: { data?: string } }[] } }
              | undefined;
            const audio = content?.modelTurn?.parts?.find((p) => p.inlineData?.data)?.inlineData?.data;
            if (audio) play(audio);
          },
          onerror: () => {
            setError("The connection dropped. Please try again, or phone us.");
            setStatus("error");
            setOpen(true);
          },
          onclose: () => setStatus("idle"),
        },
      });
      sessionRef.current = session as unknown as typeof sessionRef.current;

      (session as unknown as { sendClientContent: (x: unknown) => void }).sendClientContent({
        turns: [{ role: "user", parts: [{ text: `Greet the caller with exactly: "${greeting}"` }] }],
        turnComplete: true,
      });

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { channelCount: 1, echoCancellation: true, noiseSuppression: true },
      });
      micStreamRef.current = stream;

      const inCtx = new AudioContext({ sampleRate: MIC_RATE });
      inCtxRef.current = inCtx;
      const blobUrl = URL.createObjectURL(new Blob([WORKLET], { type: "application/javascript" }));
      await inCtx.audioWorklet.addModule(blobUrl);
      URL.revokeObjectURL(blobUrl);

      const node = new AudioWorkletNode(inCtx, "capture");
      node.port.onmessage = (event: MessageEvent<Float32Array>) => {
        sessionRef.current?.sendRealtimeInput({
          audio: { data: encodePcm(event.data), mimeType: `audio/pcm;rate=${MIC_RATE}` },
        });
      };
      inCtx.createMediaStreamSource(stream).connect(node);
      const mute = inCtx.createGain();
      mute.gain.value = 0;
      node.connect(mute).connect(inCtx.destination);
    } catch (e) {
      setError(
        e instanceof DOMException && e.name === "NotAllowedError"
          ? "I need permission to use your microphone. You can also just phone us."
          : "Sandy could not connect. Please phone us instead.",
      );
      setStatus("error");
      setOpen(true);
      stop();
    }
  }, [play, stop]);

  if (!enabled) return null;

  // ── 3. Live: the panel is gone, only this pill remains ────────────
  if (status === "live") {
    return (
      <div className="sandy-pill" role="status" aria-live="polite">
        <span className="sandy-pill__dot">{muted ? <MutedIcon /> : <MicIcon size={15} />}</span>
        <span className="sandy-pill__status">
          {muted ? "Muted — Sandy is waiting" : "Sandy is listening…"}
        </span>
        <button type="button" className="sandy-pill__btn" onClick={toggleMute}>
          {muted ? "Unmute" : "Mute"}
        </button>
        <button type="button" className="sandy-pill__btn sandy-pill__btn--end" onClick={stop}>
          End call
        </button>
      </div>
    );
  }

  return (
    <>
      {/* ── 1. Launcher ──────────────────────────────────────────────── */}
      {!open && (
        <button type="button" className="sandy-launch" onClick={() => setOpen(true)}>
          <span className="sandy-launch__icon">
            <MicIcon size={17} />
          </span>
          <span>
            <span className="sandy-launch__title">Ask Sandy</span>
            <span className="sandy-launch__sub">Xero, tax &amp; payroll — answered aloud</span>
          </span>
        </button>
      )}

      {/* ── 2. Panel ─────────────────────────────────────────────────── */}
      {open && (
        <div className="sandy-overlay" onClick={() => setOpen(false)}>
          <div
            className="sandy-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Ask Sandy, our AI assistant"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sandy-panel__head">
              <button
                type="button"
                className="sandy-panel__close"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                  <path d="M5 5l14 14M19 5L5 19" />
                </svg>
              </button>
              <p className="sandy-panel__eyebrow">{site.legalName}</p>
              <p className="sandy-panel__title">Ask Sandy</p>
              <p className="sandy-panel__sub">Your SCA-ZA 24/7 AI voice assistant</p>
            </div>

            <div className="sandy-panel__body">
              {/* The microphone is the control — no separate button to press. */}
              <button
                type="button"
                className="sandy-orb"
                onClick={start}
                disabled={status === "connecting"}
                aria-label="Start talking to Sandy"
              >
                <span />
                <span />
                <span className="sandy-orb__core">
                  <MicIcon size={24} />
                </span>
              </button>

              <p className={`sandy-orb__caption${status === "error" ? " sandy-panel__error" : ""}`}>
                {status === "error"
                  ? error
                  : status === "connecting"
                    ? "Connecting — allow the microphone when asked"
                    : "Tap the microphone to start talking"}
              </p>

              <div className="sandy-panel__points">
                <p>
                  <strong>Ask Sandy about anything on this site</strong>
                </p>
                <ul>
                  <li>Moving your business to Xero</li>
                  <li>When a tax return is due</li>
                  <li>What a business term means</li>
                </ul>
                <p>
                  <strong>She does not give financial or tax advice.</strong>
                </p>
              </div>
            </div>

            <div className="sandy-panel__foot">
              <span>Rather speak to a person?</span>
              <a href={telHref} style={{ fontWeight: 600 }}>
                {site.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
