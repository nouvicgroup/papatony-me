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
  mark: string;
}

const tabs: Record<Locale, Tab[]> = {
  en: [
    { key: "home", label: "Home", mark: "H" },
    { key: "enterprise", label: "Enterprise", mark: "E" },
    { key: "leadership", label: "Leadership", mark: "L" },
    { key: "ministry", label: "Ministry", mark: "M" },
    { key: "contact", label: "Connect", mark: "C" },
  ],
  fr: [
    { key: "home", label: "Accueil", mark: "A" },
    { key: "enterprise", label: "Entreprise", mark: "E" },
    { key: "leadership", label: "Leadership", mark: "L" },
    { key: "ministry", label: "Ministère", mark: "M" },
    { key: "contact", label: "Contact", mark: "C" },
  ],
};

export function BottomNav({ locale }: BottomNavProps) {
  const pathname = usePathname();

  return (
    <nav className="bottom-nav" aria-label="Mobile navigation">
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
            <span className="bottom-nav-mark" aria-hidden="true">
              {tab.mark}
            </span>
            <span>{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
