"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandMark } from "@/components/Icons";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import {
  localizedPath,
  pageFromPathname,
  type Locale,
  type PageKey,
} from "@/lib/site";

interface SiteHeaderProps {
  locale: Locale;
}

const labels = {
  en: {
    enterprise: "Enterprise",
    leadership: "Leadership",
    about: "About",
    ministry: "Ministry",
    contact: "Start a conversation",
    home: "Papa Tony home",
  },
  fr: {
    enterprise: "Entreprise",
    leadership: "Leadership",
    about: "À propos",
    ministry: "Ministère",
    contact: "Engager la conversation",
    home: "Accueil Papa Tony",
  },
};

/** Short titles for the mobile screen bar; the home screen shows none. */
const screenTitles: Record<Locale, Partial<Record<PageKey, string>>> = {
  en: {
    enterprise: "Property & enterprise",
    leadership: "Leadership",
    about: "Official profile",
    ministry: "Ministry",
    contact: "Get in touch",
    privacy: "Privacy",
  },
  fr: {
    enterprise: "Immobilier & entreprise",
    leadership: "Leadership",
    about: "Profil officiel",
    ministry: "Ministère",
    contact: "Prendre contact",
    privacy: "Confidentialité",
  },
};

export function SiteHeader({ locale }: SiteHeaderProps) {
  const copy = labels[locale];
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems: Array<[PageKey, string]> = [
    ["enterprise", copy.enterprise],
    ["leadership", copy.leadership],
    ["about", copy.about],
    ["ministry", copy.ministry],
  ];

  const currentPage = pageFromPathname(locale, pathname);
  const screenTitle = currentPage ? screenTitles[locale][currentPage] : undefined;

  useEffect(() => {
    if (!menuOpen) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  function isActive(key: PageKey) {
    const href = localizedPath(locale, key);
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className={menuOpen ? "site-header menu-open" : "site-header"}>
      <Link
        className="wordmark"
        href={localizedPath(locale, "home")}
        aria-label={copy.home}
        onClick={() => setMenuOpen(false)}
      >
        <span className="wordmark-mark">
          <BrandMark />
        </span>
        <span className="wordmark-copy">
          <strong className="logotype">
            Papa<span>T</span>ony
          </strong>
          <small>Dr. Anthony Nkumbe</small>
        </span>
      </Link>
      {screenTitle && (
        <p className="screen-title" aria-hidden="true">
          {screenTitle}
        </p>
      )}
      <nav
        className="desktop-nav"
        id="primary-navigation"
        aria-label={locale === "fr" ? "Navigation principale" : "Primary navigation"}
      >
        {navItems.map(([key, label]) => (
          <Link
            key={key}
            href={localizedPath(locale, key)}
            aria-current={isActive(key) ? "page" : undefined}
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </Link>
        ))}
        <Link
          className="mobile-menu-cta"
          href={localizedPath(locale, "contact")}
          aria-current={isActive("contact") ? "page" : undefined}
          onClick={() => setMenuOpen(false)}
        >
          {copy.contact}
          <span aria-hidden="true">↗</span>
        </Link>
      </nav>
      <div className="header-actions">
        <LanguageSwitch locale={locale} />
        <Link className="header-cta" href={localizedPath(locale, "contact")}>
          {copy.contact}
          <span aria-hidden="true">↗</span>
        </Link>
        <button
          className="menu-toggle"
          type="button"
          aria-controls="primary-navigation"
          aria-expanded={menuOpen}
          aria-label={
            menuOpen
              ? locale === "fr"
                ? "Fermer le menu"
                : "Close menu"
              : locale === "fr"
                ? "Ouvrir le menu"
                : "Open menu"
          }
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
