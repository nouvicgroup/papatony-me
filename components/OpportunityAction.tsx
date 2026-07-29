"use client";

import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { InquiryForm } from "@/components/InquiryForm";
import { localizedPath, type Locale } from "@/lib/site";

interface OpportunityActionProps {
  className?: string;
  label: string;
  locale: Locale;
}

const copy = {
  en: {
    title: "Start an opportunity brief",
    lead: "Enough context to judge whether a useful conversation is possible.",
    close: "Close",
    dialog: "Opportunity brief",
  },
  fr: {
    title: "Présenter une opportunité",
    lead: "Assez de contexte pour évaluer l'utilité d'un échange.",
    close: "Fermer",
    dialog: "Présentation d'opportunité",
  },
};

/**
 * Stays a real link to /contact — it navigates on desktop and without
 * JavaScript. On phones the click is intercepted and the inquiry opens as a
 * bottom sheet instead, which is the app-like path to the same honest form.
 */
export function OpportunityAction({
  className,
  label,
  locale,
}: OpportunityActionProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLAnchorElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const text = copy[locale];

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) {
      return;
    }
    if (!window.matchMedia("(max-width: 760px)").matches) return;
    event.preventDefault();
    setOpen(true);
  }

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [close, open]);

  return (
    <>
      <a
        className={className}
        href={localizedPath(locale, "contact")}
        onClick={handleClick}
        ref={triggerRef}
      >
        {label}
        <span aria-hidden="true">↗</span>
      </a>
      {open &&
        /* Portalled to <body>: the mobile screen-transition animation on <main>
           makes it a containing block, which would otherwise size this fixed
           overlay to the whole document instead of the viewport. */
        createPortal(
          <div className="inquiry-sheet-scrim" onClick={close}>
            <div
              aria-label={text.dialog}
              aria-modal="true"
              className="inquiry-sheet"
              onClick={(event) => event.stopPropagation()}
              role="dialog"
            >
              <div className="inquiry-sheet-grip" aria-hidden="true" />
              <div className="inquiry-sheet-head">
                <div>
                  <h2>{text.title}</h2>
                  <p>{text.lead}</p>
                </div>
                <button onClick={close} ref={closeRef} type="button">
                  {text.close}
                </button>
              </div>
              <div className="inquiry-sheet-body">
                <InquiryForm locale={locale} />
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
