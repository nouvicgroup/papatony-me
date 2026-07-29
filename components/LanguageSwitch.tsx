"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/site";

interface LanguageSwitchProps {
  locale: Locale;
}

export function LanguageSwitch({ locale }: LanguageSwitchProps) {
  const pathname = usePathname();
  const alternatePath =
    locale === "fr"
      ? pathname.replace(/^\/fr(?=\/|$)/, "") || "/"
      : `/fr${pathname === "/" ? "" : pathname}`;
  const label = locale === "fr" ? "English" : "Français";

  return (
    <Link
      className="language-switch"
      href={alternatePath}
      hrefLang={locale === "fr" ? "en" : "fr"}
      lang={locale === "fr" ? "en" : "fr"}
      aria-label={`${label} version`}
    >
      {locale === "fr" ? "EN" : "FR"}
    </Link>
  );
}
