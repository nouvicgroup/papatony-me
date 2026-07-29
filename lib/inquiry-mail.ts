/**
 * Inquiry delivery via ZeptoMail.
 *
 * Configured entirely by environment; nothing here is hard-coded:
 *   ZEPTOMAIL_TOKEN     — Send Mail Token (ZeptoMail Agent → SMTP/API)
 *   INQUIRY_FROM_EMAIL  — a sender on a domain verified in ZeptoMail
 *   INQUIRY_TO_EMAIL    — where inquiries land
 *
 * When any of the three is missing, `deliverInquiry` reports
 * `delivered: false` rather than pretending. The UI surfaces that difference,
 * so the site never claims a message was sent when it was not.
 */

const SEND_URL = "https://api.zeptomail.com/v1.1/email";

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
  return Boolean(
    process.env.ZEPTOMAIL_TOKEN &&
      process.env.INQUIRY_FROM_EMAIL &&
      process.env.INQUIRY_TO_EMAIL,
  );
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function deliverInquiry(
  inquiry: Inquiry,
): Promise<DeliveryResult> {
  const token = process.env.ZEPTOMAIL_TOKEN;
  const from = process.env.INQUIRY_FROM_EMAIL;
  const to = process.env.INQUIRY_TO_EMAIL;
  if (!token || !from || !to) {
    return { delivered: false, reason: "not-configured" };
  }

  const rows: Array<[string, string]> = [
    ["Name", inquiry.name],
    ["Email", inquiry.email],
    ["Organisation", inquiry.organisation || "—"],
    ["About", inquiry.intention],
  ];
  const htmlbody =
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
    `${escapeHtml(inquiry.message)}</p>`;

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
        to: [{ email_address: { address: to } }],
        reply_to: [
          { address: inquiry.email, name: inquiry.name || inquiry.email },
        ],
        subject: `Inquiry — ${inquiry.intention} — ${inquiry.name}`,
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
