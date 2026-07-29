/**
 * Cloudflare Turnstile.
 *
 * Nothing here activates until both halves are configured:
 *   NEXT_PUBLIC_TURNSTILE_SITE_KEY  — public, embedded in the page
 *   TURNSTILE_SECRET_KEY            — server only, never sent to the browser
 *
 * Until the inquiry form has a delivery endpoint there is no submission to
 * protect, so the widget stays unrendered rather than loading a third-party
 * script on every contact view. Wire `verifyTurnstile` into the delivery route
 * the moment one exists — a token collected and never verified is worse than
 * no token at all, because it looks like protection and is not.
 */

const VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export const TURNSTILE_SITE_KEY: string =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

/** True once a site key is present, i.e. the widget should render. */
export const turnstileConfigured = TURNSTILE_SITE_KEY.length > 0;

export interface TurnstileResult {
  success: boolean;
  /** Cloudflare's machine-readable reasons, useful in logs. */
  errorCodes: string[];
}

/**
 * Server-side check of a Turnstile token. Call this before accepting or
 * forwarding any inquiry; a failed or missing verification must reject the
 * submission rather than fall through.
 */
export async function verifyTurnstile(
  token: string | null | undefined,
  secret: string | undefined,
  remoteIp?: string | null,
): Promise<TurnstileResult> {
  if (!secret) {
    return { success: false, errorCodes: ["missing-secret-key"] };
  }
  if (!token) {
    return { success: false, errorCodes: ["missing-input-response"] };
  }

  const body = new FormData();
  body.append("secret", secret);
  body.append("response", token);
  if (remoteIp) body.append("remoteip", remoteIp);

  try {
    const response = await fetch(VERIFY_URL, { method: "POST", body });
    if (!response.ok) {
      return { success: false, errorCodes: [`http-${response.status}`] };
    }
    const data = (await response.json()) as {
      success?: boolean;
      "error-codes"?: string[];
    };
    return {
      success: data.success === true,
      errorCodes: data["error-codes"] ?? [],
    };
  } catch {
    return { success: false, errorCodes: ["verification-request-failed"] };
  }
}
