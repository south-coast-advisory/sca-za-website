import { renderCard } from "../../card";

export const runtime = "nodejs";

/** A page's own share card: /og/<section label>/<title>. See ../../card.tsx. */
export async function GET(_request: Request, { params }: { params: Promise<{ kicker: string; title: string }> }) {
  const { kicker, title } = await params;
  return renderCard(decodeURIComponent(title), decodeURIComponent(kicker));
}
