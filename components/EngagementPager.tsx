"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/site";

export interface PagerItem {
  number: string;
  title: string;
  text: string;
}

interface EngagementPagerProps {
  items: PagerItem[];
  label: string;
  locale: Locale;
}

/**
 * Desktop renders a rule-separated editorial row. Below 760px the same markup
 * becomes a scroll-snap pager with position dots, so the section is swiped
 * rather than scrolled through as four stacked blocks.
 */
export function EngagementPager({ items, label, locale }: EngagementPagerProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const syncActive = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const index = Math.round(
      track.scrollLeft / Math.max(track.clientWidth * 0.82, 1),
    );
    setActive(Math.min(Math.max(index, 0), items.length - 1));
  }, [items.length]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener("scroll", syncActive, { passive: true });
    return () => track.removeEventListener("scroll", syncActive);
  }, [syncActive]);

  function goTo(index: number) {
    const track = trackRef.current;
    const card = track?.children[index];
    if (!(card instanceof HTMLElement)) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track?.scrollTo({
      left: card.offsetLeft - track.offsetLeft,
      behavior: reduced ? "auto" : "smooth",
    });
  }

  return (
    <div className="pager">
      <div className="pager-track" ref={trackRef} aria-label={label}>
        {items.map((item) => (
          <article key={item.number}>
            <span>{item.number}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
      <div className="pager-dots" role="tablist" aria-label={label}>
        {items.map((item, index) => (
          <button
            aria-controls={undefined}
            aria-label={
              locale === "fr"
                ? `Aller à « ${item.title} »`
                : `Go to “${item.title}”`
            }
            aria-selected={index === active}
            className={index === active ? "active" : undefined}
            key={item.number}
            onClick={() => goTo(index)}
            role="tab"
            type="button"
          />
        ))}
      </div>
    </div>
  );
}
