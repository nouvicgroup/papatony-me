/**
 * Cloudflare Turnstile.
 *
 * The site key is public by design and ships in the page. The secret is read
 * from `TURNSTILE_SECRET` in the server environment and must never appear in
 * source, in the client bundle, or in logs.
 *
 * Verification is server-side only: browser → /api/inquiry → siteverify.
 * Never call siteverify from the browser.
 */

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/** Public site key for the widget created in the Cloudflare dashboard. */
export const DEFAULT_TURNSTILE_SITE_KEY = "0x4AAAAAAEA2E1BXMoAtEPd7";

/** Server-side: the live value, overridable per environment. */
export function serverSiteKey(): string {
  return process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || DEFAULT_TURNSTILE_SITE_KEY;
}

/**
 * Client-side: the layout injects the server's value on `window`, so staging
 * and test environments can swap the widget without a rebuild.
 */
export function siteKey(): string {
  if (typeof window !== "undefined") {
    const injected = (window as { __TURNSTILE_SITE_KEY__?: string })
      .__TURNSTILE_SITE_KEY__;
    if (injected) return injected;
  }
  return DEFAULT_TURNSTILE_SITE_KEY;
}

/** Telemetry marker required on every cf-turnstile div. */
export const TURNSTILE_ACTION = "turnstile-spin-v2";

export const turnstileConfigured = true;

export interface TurnstileResult {
  success: boolean;
  /** Cloudflare's machine-readable reasons, useful in server logs. */
  errorCodes: string[];
}

/**
 * Canonical server-side siteverify. Fails closed: any network error, non-2xx,
 * non-JSON body or missing secret returns `success: false`, so the caller
 * rejects rather than falling through.
 */
export async function verifyTurnstile(
  token: string | null | undefined,
  secret: string | undefined,
  remoteIp?: string | null,
): Promise<TurnstileResult> {
  if (!secret) {
    return { success: false, errorCodes: ["missing-input-secret"] };
  }
  if (!token) {
    return { success: false, errorCodes: ["missing-input-response"] };
  }

  const body = new URLSearchParams({ secret, response: token });
  if (remoteIp) body.append("remoteip", remoteIp);

  try {
    const response = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
    if (!response.ok) {
      return { success: false, errorCodes: [`siteverify-${response.status}`] };
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
    return { success: false, errorCodes: ["siteverify-request-failed"] };
  }
}
