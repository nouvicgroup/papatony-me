import Link from "next/link";
import { localizedPath, type Locale } from "@/lib/site";

interface SiteFooterProps {
  locale: Locale;
}

export function SiteFooter({ locale }: SiteFooterProps) {
  const french = locale === "fr";
  return (
    <footer className="site-footer">
      <div>
        <Link className="footer-brand" href={localizedPath(locale, "home")}>
          Papa Tony
        </Link>
        <p>
          {french
            ? "Mission · Leadership · Immobilier · Affaires"
            : "Purpose · Leadership · Property · Business"}
        </p>
      </div>
      <div className="footer-links">
        <Link href={localizedPath(locale, "about")}>
          {french ? "À propos" : "About"}
        </Link>
        <Link href={localizedPath(locale, "privacy")}>
          {french ? "Confidentialité" : "Privacy"}
        </Link>
        <a href="https://eaglesfamily.org" rel="noreferrer">
          Eagles’ Family Assembly
        </a>
      </div>
      <small>
        © {new Date().getFullYear()} Anthony Nkumbe.{" "}
        {french ? "Tous droits réservés." : "All rights reserved."}
      </small>
    </footer>
  );
}
