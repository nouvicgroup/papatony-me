/**
 * Inquiry delivery via ZeptoMail.
 *
 * Configured by environment; nothing secret is hard-coded:
 *   ZEPTOMAIL_TOKEN     — Send Mail Token (ZeptoMail Agent → SMTP/API)
 *   INQUIRY_FROM_EMAIL  — a sender on a domain verified in ZeptoMail
 *   INQUIRY_TO_EMAIL    — where inquiries land (defaults to hello@papatony.me)
 *
 * Two messages go out per inquiry: the notification to the site owner, then
 * an acknowledgment to the person who wrote. Delivery is judged on the owner
 * notification alone — the acknowledgment is best-effort, because a failure
 * there must not make the site claim the inquiry never arrived.
 *
 * When token or sender is missing, `deliverInquiry` reports
 * `delivered: false` rather than pretending. The UI surfaces that difference,
 * so the site never claims a message was sent when it was not.
 */

const SEND_URL = "https://api.zeptomail.com/v1.1/email";
const DEFAULT_TO_EMAIL = "hello@papatony.me";

export interface Inquiry {
  name: string;
  email: string;
  organisation: string;
  intention: string;
  message: string;
}

export interface DeliveryResult {
  delivered: boolean;
  reason?: string;
}

export function mailConfigured(): boolean {
  return Boolean(process.env.ZEPTOMAIL_TOKEN && process.env.INQUIRY_FROM_EMAIL);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

interface Recipient {
  address: string;
  name?: string;
}

async function send(
  token: string,
  from: string,
  to: Recipient,
  subject: string,
  htmlbody: string,
  replyTo?: Recipient,
): Promise<DeliveryResult> {
  try {
    const response = await fetch(SEND_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Zoho-enczapikey ${token}`,
      },
      body: JSON.stringify({
        from: { address: from, name: "PapaTony.me" },
        to: [{ email_address: to }],
        ...(replyTo ? { reply_to: [replyTo] } : {}),
        subject,
        htmlbody,
      }),
    });
    if (!response.ok) {
      return { delivered: false, reason: `zeptomail-${response.status}` };
    }
    return { delivered: true };
  } catch {
    return { delivered: false, reason: "zeptomail-request-failed" };
  }
}

function ownerNotificationBody(inquiry: Inquiry): string {
  const rows: Array<[string, string]> = [
    ["Name", inquiry.name],
    ["Email", inquiry.email],
    ["Organisation", inquiry.organisation || "—"],
    ["About", inquiry.intention],
  ];
  return (
    `<table style="font-family:system-ui,sans-serif;font-size:14px">` +
    rows
      .map(
        ([label, value]) =>
          `<tr><td style="padding:4px 16px 4px 0;color:#667"><strong>${label}</strong></td>` +
          `<td style="padding:4px 0">${escapeHtml(value)}</td></tr>`,
      )
      .join("") +
    `</table><hr style="border:0;border-top:1px solid #ddd;margin:18px 0">` +
    `<p style="font-family:system-ui,sans-serif;font-size:14px;white-space:pre-wrap">` +
    `${escapeHtml(inquiry.message)}</p>`
  );
}

function acknowledgmentBody(inquiry: Inquiry): string {
  const firstName = inquiry.name.split(/\s+/)[0] || inquiry.name;
  return (
    `<div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.6;color:#222">` +
    `<p>Hello ${escapeHtml(firstName)},</p>` +
    `<p>Your message about “${escapeHtml(inquiry.intention)}” has reached me. ` +
    `I read every inquiry personally and will reply to this address once I have.</p>` +
    `<p>If anything changes in the meantime, reply directly to this email.</p>` +
    `<p style="color:#667">Papa Tony<br>` +
    `<a href="https://papatony.me" style="color:#667">papatony.me</a></p>` +
    `<hr style="border:0;border-top:1px solid #ddd;margin:18px 0">` +
    `<p style="font-size:13px;color:#667">Votre message au sujet de « ${escapeHtml(inquiry.intention)} » ` +
    `m’est bien parvenu. Je lis chaque demande personnellement et vous répondrai à cette adresse.</p>` +
    `</div>`
  );
}

export async function deliverInquiry(
  inquiry: Inquiry,
): Promise<DeliveryResult> {
  const token = process.env.ZEPTOMAIL_TOKEN;
  const from = process.env.INQUIRY_FROM_EMAIL;
  const to = process.env.INQUIRY_TO_EMAIL || DEFAULT_TO_EMAIL;
  if (!token || !from) {
    return { delivered: false, reason: "not-configured" };
  }

  const notification = await send(
    token,
    from,
    { address: to },
    `Inquiry — ${inquiry.intention} — ${inquiry.name}`,
    ownerNotificationBody(inquiry),
    { address: inquiry.email, name: inquiry.name || inquiry.email },
  );
  if (!notification.delivered) {
    return notification;
  }

  const acknowledgment = await send(
    token,
    from,
    { address: inquiry.email, name: inquiry.name || inquiry.email },
    "Your message has reached me — Papa Tony",
    acknowledgmentBody(inquiry),
    { address: to },
  );
  if (!acknowledgment.delivered) {
    // The owner has the inquiry; log and move on rather than fail the send.
    console.warn("inquiry acknowledgment failed", acknowledgment.reason);
  }

  return { delivered: true };
}
