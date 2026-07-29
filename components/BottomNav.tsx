"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localizedPath, type Locale, type PageKey } from "@/lib/site";

interface BottomNavProps {
  locale: Locale;
}

interface Tab {
  key: PageKey;
  label: string;
  symbol: string;
}

const tabs: Record<Locale, Tab[]> = {
  en: [
    { key: "home", label: "Home", symbol: "⌂" },
    { key: "enterprise", label: "Enterprise", symbol: "◫" },
    { key: "leadership", label: "Leadership", symbol: "◎" },
    { key: "ministry", label: "Ministry", symbol: "✦" },
    { key: "contact", label: "Connect", symbol: "↗" },
  ],
  fr: [
    { key: "home", label: "Accueil", symbol: "⌂" },
    { key: "enterprise", label: "Entreprise", symbol: "◫" },
    { key: "leadership", label: "Leadership", symbol: "◎" },
    { key: "ministry", label: "Ministère", symbol: "✦" },
    { key: "contact", label: "Contact", symbol: "↗" },
  ],
};

export function BottomNav({ locale }: BottomNavProps) {
  const pathname = usePathname();

  return (
    <nav
      className="bottom-nav"
      aria-label={locale === "fr" ? "Navigation mobile" : "Mobile navigation"}
    >
      {tabs[locale].map((tab) => {
        const href = localizedPath(locale, tab.key);
        const active =
          tab.key === "home"
            ? pathname === href
            : pathname === href || pathname.startsWith(`${href}/`);

        return (
          <Link
            key={tab.key}
            href={href}
            className={active ? "bottom-nav-item active" : "bottom-nav-item"}
            aria-current={active ? "page" : undefined}
          >
            <span className="bottom-nav-symbol" aria-hidden="true">
              {tab.symbol}
            </span>
            <span>{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
