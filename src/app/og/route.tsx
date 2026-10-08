import { renderCard } from "./card";

export const runtime = "nodejs";

/** The default card: /og. Page cards live at /og/<label>/<title>. */
export async function GET() {
  return renderCard();
}
