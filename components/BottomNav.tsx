"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType } from "react";
import {
  IconConnect,
  IconEnterprise,
  IconHome,
  IconLeadership,
  IconMinistry,
} from "@/components/Icons";
import { localizedPath, type Locale, type PageKey } from "@/lib/site";

interface BottomNavProps {
  locale: Locale;
}

interface Tab {
  key: PageKey;
  label: string;
  Icon: ComponentType<{ className?: string }>;
}

const icons: Record<string, ComponentType<{ className?: string }>> = {
  home: IconHome,
  enterprise: IconEnterprise,
  leadership: IconLeadership,
  ministry: IconMinistry,
  contact: IconConnect,
};

const labels: Record<Locale, Record<string, string>> = {
  en: {
    home: "Home",
    enterprise: "Enterprise",
    leadership: "Leadership",
    ministry: "Ministry",
    contact: "Connect",
  },
  fr: {
    home: "Accueil",
    enterprise: "Entreprise",
    leadership: "Leadership",
    ministry: "Ministère",
    contact: "Contact",
  },
};

const order: PageKey[] = [
  "home",
  "enterprise",
  "leadership",
  "ministry",
  "contact",
];

export function BottomNav({ locale }: BottomNavProps) {
  const pathname = usePathname();
  const tabs: Tab[] = order.map((key) => ({
    key,
    label: labels[locale][key],
    Icon: icons[key],
  }));

  return (
    <nav
      className="bottom-nav"
      aria-label={locale === "fr" ? "Navigation mobile" : "Mobile navigation"}
    >
      {tabs.map(({ key, label, Icon }) => {
        const href = localizedPath(locale, key);
        const active =
          key === "home"
            ? pathname === href
            : pathname === href || pathname.startsWith(`${href}/`);

        return (
          <Link
            key={key}
            href={href}
            className={active ? "bottom-nav-item active" : "bottom-nav-item"}
            aria-current={active ? "page" : undefined}
          >
            <span className="bottom-nav-symbol">
              <Icon />
            </span>
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
