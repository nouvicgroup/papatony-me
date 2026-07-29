"use client";

import { useEffect, useRef } from "react";
import { TURNSTILE_ACTION, siteKey, turnstileConfigured } from "@/lib/turnstile";

interface TurnstileWidgetProps {
  locale: string;
  onToken: (token: string) => void;
  /** Bump to force a fresh token — Turnstile tokens are single-use. */
  resetSignal?: number;
}

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        options: Record<string, unknown>,
      ) => string | undefined;
      reset: (id?: string) => void;
      remove: (id: string) => void;
    };
  }
}

const SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

/**
 * The div keeps the canonical `cf-turnstile` class and `data-action` so the
 * integration is attributable, but rendering is explicit: the widget mounts
 * inside a bottom sheet that does not exist at page load, which auto-render
 * would never scan.
 */
export function TurnstileWidget({
  locale,
  onToken,
  resetSignal = 0,
}: TurnstileWidgetProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | undefined>(undefined);
  const callback = useRef(onToken);

  useEffect(() => {
    callback.current = onToken;
  }, [onToken]);

  useEffect(() => {
    if (!turnstileConfigured) return;

    let cancelled = false;

    function render() {
      const host = hostRef.current;
      if (cancelled || !window.turnstile || !host || widgetId.current) return;
      widgetId.current = window.turnstile.render(host, {
        sitekey: siteKey(),
        action: TURNSTILE_ACTION,
        language: locale,
        theme: "dark",
        callback: (token: string) => callback.current(token),
        "error-callback": () => callback.current(""),
        "expired-callback": () => callback.current(""),
      });
    }

    if (window.turnstile) {
      render();
    } else {
      const existing = document.querySelector<HTMLScriptElement>(
        `script[src="${SCRIPT_SRC}"]`,
      );
      if (existing) {
        existing.addEventListener("load", render);
      } else {
        const script = document.createElement("script");
        script.src = SCRIPT_SRC;
        script.async = true;
        script.defer = true;
        script.addEventListener("load", render);
        document.head.appendChild(script);
      }
    }

    return () => {
      cancelled = true;
      if (widgetId.current && window.turnstile) {
        window.turnstile.remove(widgetId.current);
        widgetId.current = undefined;
      }
    };
  }, [locale]);

  // Tokens are redeemed once. After a rejected submit the DOM still holds the
  // spent token, so a retry would be refused as timeout-or-duplicate.
  useEffect(() => {
    if (!resetSignal || !widgetId.current || !window.turnstile) return;
    window.turnstile.reset(widgetId.current);
    callback.current("");
  }, [resetSignal]);

  if (!turnstileConfigured) return null;
  return (
    <div
      className="turnstile cf-turnstile"
      data-action={TURNSTILE_ACTION}
      data-sitekey={siteKey()}
      ref={hostRef}
    />
  );
}
