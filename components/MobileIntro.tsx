"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/site";

interface MobileIntroProps {
  locale: Locale;
}

const INTRO_KEY = "papatony-mobile-intro-v4-seen";

export function MobileIntro({ locale }: MobileIntroProps) {
  const [visible, setVisible] = useState(false);
  const skipButtonRef = useRef<HTMLButtonElement>(null);

  const dismiss = useCallback(() => {
    try {
      window.localStorage.setItem(INTRO_KEY, "true");
    } catch {
      // Storage can be unavailable; the current dismissal still succeeds.
    }
    setVisible(false);
  }, []);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 760px)").matches;
    if (!mobile) return;

    let seen = false;
    try {
      seen = window.localStorage.getItem(INTRO_KEY) === "true";
    } catch {
      seen = false;
    }
    if (seen) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const showTimer = window.setTimeout(() => setVisible(true), 0);
    const dismissTimer = reducedMotion
      ? undefined
      : window.setTimeout(dismiss, 2400);
    return () => {
      window.clearTimeout(showTimer);
      if (dismissTimer) window.clearTimeout(dismissTimer);
    };
  }, [dismiss]);

  useEffect(() => {
    if (!visible) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    skipButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") dismiss();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dismiss, visible]);

  if (!visible) return null;

  const french = locale === "fr";

  return (
    <div
      className="mobile-intro"
      role="dialog"
      aria-modal="true"
      aria-label={french ? "Présentation de Papa Tony" : "Papa Tony introduction"}
    >
      <button ref={skipButtonRef} type="button" onClick={dismiss}>
        {french ? "Passer" : "Skip"}
      </button>
      <div className="intro-geometry" aria-hidden="true">
        <i />
        <i />
      </div>
      <div className="intro-identity">
        <span aria-hidden="true">PT</span>
        <p>Anthony Nkumbe</p>
        <strong>Papa Tony</strong>
        <small>
          {french
            ? "Cameroun · Entreprise · Leadership · Mission"
            : "Cameroon · Enterprise · Leadership · Purpose"}
        </small>
      </div>
      <div className="intro-progress" aria-hidden="true">
        <span />
      </div>
    </div>
  );
}
