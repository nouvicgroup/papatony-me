"use client";

import { useEffect, useRef } from "react";
import { TURNSTILE_SITE_KEY, turnstileConfigured } from "@/lib/turnstile";

interface TurnstileWidgetProps {
  locale: string;
  onToken: (token: string) => void;
}

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        options: Record<string, unknown>,
      ) => string | undefined;
      remove: (id: string) => void;
    };
  }
}

const SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

/**
 * Renders nothing until a site key is configured, so no third-party script is
 * loaded while the form has no endpoint to protect. See lib/turnstile.ts.
 */
export function TurnstileWidget({ locale, onToken }: TurnstileWidgetProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | undefined>(undefined);
  const callback = useRef(onToken);

  // Keep the latest handler without re-rendering the widget.
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
        sitekey: TURNSTILE_SITE_KEY,
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

  if (!turnstileConfigured) return null;
  return <div className="turnstile" ref={hostRef} />;
}
