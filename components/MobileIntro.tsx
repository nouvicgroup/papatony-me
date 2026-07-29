"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/site";

interface MobileIntroProps {
  locale: Locale;
}

const INTRO_KEY = "papatony-mobile-intro-v3-seen";

export function MobileIntro({ locale }: MobileIntroProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 760px)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let seen = false;
    try {
      seen = window.localStorage.getItem(INTRO_KEY) === "true";
    } catch {
      seen = false;
    }

    if (!mobile || reducedMotion || seen) return;
    const showTimer = window.setTimeout(() => setVisible(true), 0);
    const hideTimer = window.setTimeout(() => dismiss(), 2200);
    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  function dismiss() {
    try {
      window.localStorage.setItem(INTRO_KEY, "true");
    } catch {
      // Storage can be unavailable in private browsing; dismissal still works.
    }
    setVisible(false);
  }

  if (!visible) return null;

  const french = locale === "fr";
  return (
    <div
      className="mobile-intro"
      role="dialog"
      aria-modal="true"
      aria-label={french ? "Présentation de Papa Tony" : "Papa Tony introduction"}
    >
      <button type="button" onClick={dismiss}>
        {french ? "Passer" : "Skip"}
      </button>
      <div className="intro-identity">
        <span aria-hidden="true">PT</span>
        <p>{french ? "Anthony Nkumbe" : "Anthony Nkumbe"}</p>
        <strong>Papa Tony</strong>
        <small>
          {french
            ? "Entreprise · Leadership · Mission"
            : "Enterprise · Leadership · Purpose"}
        </small>
      </div>
      <div className="intro-progress" aria-hidden="true">
        <span />
      </div>
    </div>
  );
}
