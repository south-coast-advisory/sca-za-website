import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { sandySystemInstruction, SANDY_GREETING } from "@/content/sandy";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Live API model. See ai.google.dev/gemini-api/docs/models. */
export const SANDY_MODEL = "gemini-3.8-live";

/**
 * Issues a short-lived ephemeral token so the browser can open a Live API
 * session WITHOUT ever seeing GEMINI_API_KEY.
 *
 * Returns 503 when no key is configured — the widget then hides itself, so the
 * site works perfectly with Sandy switched off.
 */
export async function GET() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ enabled: false }, { status: 503 });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const now = Date.now();

    const token = await ai.authTokens.create({
      config: {
        uses: 1,
        expireTime: new Date(now + 30 * 60 * 1000).toISOString(),
        newSessionExpireTime: new Date(now + 60 * 1000).toISOString(),
      },
    });

    return NextResponse.json(
      {
        enabled: true,
        token: token.name,
        model: SANDY_MODEL,
        greeting: SANDY_GREETING,
        systemInstruction: sandySystemInstruction(),
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("Sandy token failed", error);
    return NextResponse.json({ enabled: false, error: "unavailable" }, { status: 503 });
  }
}
