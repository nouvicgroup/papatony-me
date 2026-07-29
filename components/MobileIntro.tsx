"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { BrandMark } from "@/components/Icons";
import { MediaImage } from "@/components/MediaImage";
import { MEDIA, type Locale } from "@/lib/site";

interface MobileIntroProps {
  locale: Locale;
}

const INTRO_KEY = "papatony-mobile-intro-v4-seen";
const SLIDE_MS = 2300;

const copy = {
  en: {
    label: "Papa Tony introduction",
    skip: "Skip",
    enter: "Enter",
    slides: [
      {
        eyebrow: "Cameroon · Property · Enterprise",
        title: "Papa Tony",
        name: "Dr. Anthony Nkumbe",
        body: "Purpose · Leadership · Property · Business",
      },
      {
        eyebrow: "What he does",
        title: "Property, enterprise, institutions.",
        body: "Certified real estate consulting and negotiation, low-cost building facilitation, cooperatives, and enterprise advisory.",
      },
      {
        eyebrow: "How it starts",
        title: "Bring the opportunity.",
        body: "Qualify it, meet the right local counterparts, and reach an informed next step.",
      },
    ],
  },
  fr: {
    label: "Présentation de Papa Tony",
    skip: "Passer",
    enter: "Entrer",
    slides: [
      {
        eyebrow: "Cameroun · Immobilier · Entreprise",
        title: "Papa Tony",
        name: "Dr Anthony Nkumbe",
        body: "Mission · Leadership · Immobilier · Affaires",
      },
      {
        eyebrow: "Son activité",
        title: "Immobilier, entreprise, institutions.",
        body: "Conseil et négociation immobilière certifiés, logements à coût maîtrisé, coopératives et conseil aux entreprises.",
      },
      {
        eyebrow: "Le point de départ",
        title: "Présentez l'opportunité.",
        body: "La qualifier, rencontrer les bons interlocuteurs locaux et définir une prochaine étape éclairée.",
      },
    ],
  },
};

export function MobileIntro({ locale }: MobileIntroProps) {
  const [visible, setVisible] = useState(false);
  const [slide, setSlide] = useState(0);
  const skipButtonRef = useRef<HTMLButtonElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const manualRef = useRef(false);
  const text = copy[locale];
  const total = text.slides.length;

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

    const showTimer = window.setTimeout(() => setVisible(true), 0);
    return () => window.clearTimeout(showTimer);
  }, []);

  // Auto-advance through the slides, then leave. Reduced motion holds on the
  // first slide so the sequence never moves on its own.
  useEffect(() => {
    if (!visible) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (manualRef.current) return;

    const timer = window.setTimeout(() => {
      if (slide + 1 >= total) {
        dismiss();
        return;
      }
      const next = slide + 1;
      const track = trackRef.current;
      const card = track?.children[next];
      if (track && card instanceof HTMLElement) {
        track.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
      }
      setSlide(next);
    }, SLIDE_MS);

    return () => window.clearTimeout(timer);
  }, [dismiss, slide, total, visible]);

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

  function handleScroll() {
    const track = trackRef.current;
    if (!track) return;
    const index = Math.round(track.scrollLeft / Math.max(track.clientWidth, 1));
    setSlide(Math.min(Math.max(index, 0), total - 1));
  }

  if (!visible) return null;

  return (
    <div
      className="mobile-intro"
      role="dialog"
      aria-modal="true"
      aria-label={text.label}
    >
      <div className="intro-media" aria-hidden="true">
        <MediaImage alt="" priority src={MEDIA.heroMobile} />
        <i />
      </div>

      <button ref={skipButtonRef} type="button" onClick={dismiss}>
        {text.skip}
      </button>

      <div
        className="intro-track"
        onPointerDown={() => {
          manualRef.current = true;
        }}
        onScroll={handleScroll}
        ref={trackRef}
      >
        {text.slides.map((item, index) => (
          <section key={item.title}>
            <div className="intro-identity">
              {index === 0 && (
                <span className="intro-mark">
                  <BrandMark />
                </span>
              )}
              <p>{index === 0 ? item.name : item.eyebrow}</p>
              <strong>
                {index === 0 ? (
                  <span className="logotype">
                    Papa<span>T</span>ony
                  </span>
                ) : (
                  item.title
                )}
              </strong>
              <small>{item.body}</small>
              {index === total - 1 && (
                <button
                  className="intro-enter"
                  onClick={dismiss}
                  type="button"
                >
                  {text.enter}
                  <span aria-hidden="true">↗</span>
                </button>
              )}
            </div>
          </section>
        ))}
      </div>

      <div className="intro-progress" aria-hidden="true">
        {text.slides.map((item, index) => (
          <span
            className={
              index === slide ? "running" : index < slide ? "done" : undefined
            }
            key={item.title}
          />
        ))}
      </div>
    </div>
  );
}
