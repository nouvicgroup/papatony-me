import Link from "next/link";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { localizedPath, type Locale } from "@/lib/site";

interface SiteHeaderProps {
  locale: Locale;
}

const labels = {
  en: {
    enterprise: "Enterprise",
    leadership: "Leadership",
    about: "About",
    ministry: "Ministry",
    contact: "Discuss an opportunity",
    home: "Papa Tony home",
  },
  fr: {
    enterprise: "Entreprise",
    leadership: "Leadership",
    about: "À propos",
    ministry: "Ministère",
    contact: "Échanger sur une opportunité",
    home: "Accueil Papa Tony",
  },
};

export function SiteHeader({ locale }: SiteHeaderProps) {
  const copy = labels[locale];
  return (
    <header className="site-header">
      <Link
        className="wordmark"
        href={localizedPath(locale, "home")}
        aria-label={copy.home}
      >
        <span className="wordmark-mark" aria-hidden="true">
          PT
        </span>
        <span className="wordmark-copy">
          <strong>Papa Tony</strong>
          <small>Anthony Nkumbe</small>
        </span>
      </Link>
      <nav className="desktop-nav" aria-label="Primary navigation">
        <Link href={localizedPath(locale, "enterprise")}>{copy.enterprise}</Link>
        <Link href={localizedPath(locale, "leadership")}>{copy.leadership}</Link>
        <Link href={localizedPath(locale, "about")}>{copy.about}</Link>
        <Link href={localizedPath(locale, "ministry")}>{copy.ministry}</Link>
      </nav>
      <div className="header-actions">
        <LanguageSwitch locale={locale} />
        <Link className="header-cta" href={localizedPath(locale, "contact")}>
          {copy.contact}
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </header>
  );
}
