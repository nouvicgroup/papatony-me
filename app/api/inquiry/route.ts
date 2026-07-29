import { deliverInquiry, mailConfigured } from "@/lib/inquiry-mail";
import { verifyTurnstile } from "@/lib/turnstile";

const LIMITS: Record<string, number> = {
  name: 120,
  email: 200,
  organisation: 160,
  intention: 80,
  message: 4000,
};

function field(form: FormData, key: string): string {
  return String(form.get(key) ?? "")
    .trim()
    .slice(0, LIMITS[key] ?? 200);
}

/**
 * Verifies the Turnstile token, then delivers the inquiry.
 *
 * The gate is unconditional; delivery is not. Until ZeptoMail and a
 * destination address are configured the response reports `delivered: false`
 * so the UI can say plainly that nothing was sent.
 */
export async function POST(request: Request): Promise<Response> {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return Response.json({ error: "bad-request" }, { status: 400 });
  }

  const clientIp =
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    null;

  const result = await verifyTurnstile(
    String(form.get("cf-turnstile-response") ?? "") || null,
    process.env.TURNSTILE_SECRET,
    clientIp,
  );

  if (!result.success) {
    // Fail closed. Codes stay in server logs, never in the response.
    console.warn("turnstile verification failed", result.errorCodes);
    return Response.json({ error: "forbidden" }, { status: 403 });
  }

  const inquiry = {
    name: field(form, "name"),
    email: field(form, "email"),
    organisation: field(form, "organisation"),
    intention: field(form, "intention"),
    message: field(form, "message"),
  };

  if (!inquiry.name || !inquiry.email || !inquiry.intention || !inquiry.message) {
    return Response.json({ error: "incomplete" }, { status: 422 });
  }

  if (!mailConfigured()) {
    return Response.json({ verified: true, delivered: false });
  }

  const delivery = await deliverInquiry(inquiry);
  if (!delivery.delivered) {
    console.error("inquiry delivery failed", delivery.reason);
    return Response.json({ verified: true, delivered: false });
  }

  return Response.json({ verified: true, delivered: true });
}
