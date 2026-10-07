/**
 * Email notifications via Resend.
 *
 * Why this exists: on 7 October 2026 the free Supabase project was paused for
 * inactivity and the enquiry form returned an error for days. Every enquiry in
 * that window was lost — no row, no email, no trace. A database is a store, not
 * a delivery mechanism; the email is what actually reaches Neil.
 *
 * So enquiries are emailed ALWAYS, not only when the database fails. If the
 * database is down the email is the only record, and the visitor is told their
 * message went through, because it did.
 *
 * Without RESEND_API_KEY this does nothing and says so — the caller decides what
 * that means. Keys belong to SCA's own Resend account, never another project's.
 */

const escapeHtml = (s: string) =>
  s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

export type Notification = {
  subject: string;
  /** Label / value pairs, rendered as a simple table. */
  rows: [string, string][];
  /** Free text under the table — the visitor's own message. */
  body?: string;
  /** Set so Neil can hit reply and answer the person directly. */
  replyTo?: string;
};

/** Email-safe HTML. Inline hex is deliberate: email clients ignore CSS variables. */
function render(n: Notification): string {
  const rows = n.rows
    .filter(([, v]) => v)
    .map(
      ([label, value], i) =>
        `<tr style="background:${i % 2 ? "#f4f5f8" : "#ffffff"}">` +
        `<td style="padding:8px 10px;border-bottom:1px solid #e3e6ec;color:#6b7280;white-space:nowrap">${escapeHtml(label)}</td>` +
        `<td style="padding:8px 10px;border-bottom:1px solid #e3e6ec;color:#1b2233"><strong>${escapeHtml(value)}</strong></td></tr>`,
    )
    .join("");

  const body = n.body
    ? `<p style="margin:16px 0 0;padding:14px;background:#f4f5f8;border-left:3px solid #3d53c2;font-size:15px;line-height:1.55;color:#3a4150;white-space:pre-wrap">${escapeHtml(n.body)}</p>`
    : "";

  return `<!doctype html><html><body style="margin:0;background:#f4f5f8;font-family:Arial,Helvetica,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:24px">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:4px;overflow:hidden">
<tr><td style="background:#3d53c2;padding:16px 24px;color:#ffffff;font-weight:700;letter-spacing:1px">SOUTH COAST ADVISORY</td></tr>
<tr><td style="padding:24px">
<p style="margin:0 0 16px;font-size:16px;color:#1b2233"><strong>${escapeHtml(n.subject)}</strong></p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px">${rows}</table>
${body}
<p style="margin:24px 0 0;font-size:12px;color:#7a8190">Sent by sca-za.com. Reply to this email to answer them directly.</p>
</td></tr></table></td></tr></table></body></html>`;
}

const renderText = (n: Notification) =>
  [
    n.subject,
    "",
    ...n.rows.filter(([, v]) => v).map(([label, value]) => `${label}: ${value}`),
    n.body ? `\n${n.body}` : "",
  ].join("\n");

/**
 * Returns true only if Resend accepted the message. Never throws: a failed
 * notification must not take the form down with it.
 */
export async function notify(n: Notification): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_TO_EMAIL;
  if (!key || !to) return false;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.NOTIFY_FROM_EMAIL ?? "South Coast Advisory <website@sca-za.com>",
        to: [to],
        ...(n.replyTo ? { reply_to: n.replyTo } : {}),
        subject: n.subject,
        html: render(n),
        text: renderText(n),
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error(`notify: Resend ${res.status}`, (await res.text()).slice(0, 200));
      return false;
    }
    return true;
  } catch (err) {
    console.error("notify failed:", String(err).slice(0, 200));
    return false;
  }
}

export const notifyConfigured = () =>
  Boolean(process.env.RESEND_API_KEY && process.env.NOTIFY_TO_EMAIL);
