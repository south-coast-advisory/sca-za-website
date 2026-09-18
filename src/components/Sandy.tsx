"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { site, telHref } from "@/lib/site";

/**
 * Sandy — the voice assistant.
 *
 * Design rules this follows:
 *  - It renders NOTHING unless /api/voice/token says Sandy is enabled, so the
 *    site is complete without a Gemini key.
 *  - The microphone is only opened after the visitor presses "Talk to Sandy".
 *  - The API key never reaches the browser: we connect with a one-use
 *    ephemeral token minted server-side.
 *  - She is labelled as AI everywhere she appears (POPIA and plain honesty).
 */

type Status = "idle" | "connecting" | "live" | "error";
type Line = { who: "you" | "sandy"; text: string };

const MIC_RATE = 16000; // Live API expects 16 kHz PCM in
const OUT_RATE = 24000; // and returns 24 kHz PCM

/** Float samples → base64 16-bit PCM, which is what the Live API accepts. */
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

export function Sandy() {
  const [enabled, setEnabled] = useState(false);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [lines, setLines] = useState<Line[]>([]);
  const [error, setError] = useState("");

  const sessionRef = useRef<{ close: () => void; sendRealtimeInput: (x: unknown) => void } | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const inCtxRef = useRef<AudioContext | null>(null);
  const outCtxRef = useRef<AudioContext | null>(null);
  const playHeadRef = useRef(0);

  // Is Sandy configured on this deployment?
  useEffect(() => {
    let cancelled = false;
    fetch("/api/voice/token", { method: "GET" })
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

  const start = useCallback(async () => {
    setStatus("connecting");
    setError("");
    try {
      const res = await fetch("/api/voice/token");
      if (!res.ok) throw new Error("Sandy is not available right now.");
      const { token, model, systemInstruction, greeting } = await res.json();

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
          onopen: () => setStatus("live"),
          onmessage: (message) => {
            const content = (message as { serverContent?: unknown }).serverContent as
              | {
                  modelTurn?: { parts?: { inlineData?: { data?: string } }[] };
                  inputTranscription?: { text?: string };
                  outputTranscription?: { text?: string };
                }
              | undefined;

            const audio = content?.modelTurn?.parts?.find((p) => p.inlineData?.data)?.inlineData?.data;
            if (audio) play(audio);

            const said = content?.inputTranscription?.text;
            const replied = content?.outputTranscription?.text;
            if (said) setLines((l) => appendTo(l, "you", said));
            if (replied) setLines((l) => appendTo(l, "sandy", replied));
          },
          onerror: () => {
            setError("The connection dropped. Please try again, or phone us.");
            setStatus("error");
          },
          onclose: () => setStatus("idle"),
        },
      });
      sessionRef.current = session as unknown as typeof sessionRef.current;

      // Greet first so the visitor knows who they are talking to.
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
      // Keep the worklet pulling without echoing the mic into the speakers.
      const mute = inCtx.createGain();
      mute.gain.value = 0;
      node.connect(mute).connect(inCtx.destination);
    } catch (e) {
      const message =
        e instanceof DOMException && e.name === "NotAllowedError"
          ? "I need permission to use your microphone. You can also just phone us."
          : "Sandy could not connect. Please phone us instead.";
      setError(message);
      setStatus("error");
      stop();
    }
  }, [play, stop]);

  if (!enabled) return null;

  return (
    <>
      <button
        type="button"
        className="sandy-launch"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="sandy-panel"
      >
        {open ? "Close" : "Ask Sandy"}
      </button>

      {open && (
        <div id="sandy-panel" className="sandy-panel" role="dialog" aria-label="Ask Sandy, our AI assistant">
          <div className="sandy-head">
            <div>
              <strong>Sandy</strong>
              <span className="sandy-tag">AI assistant</span>
            </div>
            <p>
              Ask about our services, Xero, or any accounting term. Sandy is an AI, not a person, and
              does not give advice on your own tax affairs.
            </p>
          </div>

          <div className="sandy-body">
            {lines.length === 0 && status !== "live" && (
              <p className="sandy-hint">
                Press talk and ask something like &ldquo;what does moving to Xero involve?&rdquo;
              </p>
            )}
            {lines.map((line, i) => (
              <p key={i} className={line.who === "you" ? "sandy-you" : "sandy-said"}>
                <span className="label">{line.who === "you" ? "You" : "Sandy"}</span>
                {line.text}
              </p>
            ))}
            {status === "live" && lines.length === 0 && <p className="sandy-hint">Listening…</p>}
            {error && (
              <p role="alert" className="sandy-error">
                {error}
              </p>
            )}
          </div>

          <div className="sandy-actions">
            {status === "live" ? (
              <button type="button" className="btn btn-outline" onClick={stop}>
                End conversation
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary"
                onClick={start}
                disabled={status === "connecting"}
              >
                {status === "connecting" ? "Connecting…" : "Talk to Sandy"}
              </button>
            )}
            <a href={telHref} className="btn btn-outline">
              {site.phoneDisplay}
            </a>
          </div>
        </div>
      )}
    </>
  );
}

/** Live transcription arrives in fragments; append to the current speaker's line. */
function appendTo(lines: Line[], who: Line["who"], text: string): Line[] {
  const last = lines[lines.length - 1];
  if (last && last.who === who) {
    return [...lines.slice(0, -1), { who, text: last.text + text }];
  }
  return [...lines, { who, text }];
}
