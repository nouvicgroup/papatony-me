import Link from "next/link";
import type { Locale } from "@/lib/site";

interface NotFoundPageProps {
  locale: Locale;
}

export function NotFoundPage({ locale }: NotFoundPageProps) {
  const french = locale === "fr";
  return (
    <main id="main-content" className="not-found">
      <p className="kicker">
        {french ? "404 · Page introuvable" : "404 · Page not found"}
      </p>
      <h1>
        {french
          ? "Cette passerelle n'existe pas."
          : "This pathway does not exist."}
      </h1>
      <p>
        {french
          ? "La page a peut-être été déplacée ou l'adresse est incomplète. Revenez au profil officiel de Papa Tony."
          : "The page may have moved, or the address may be incomplete. Return to the official Papa Tony profile."}
      </p>
      <Link className="button button-primary" href={french ? "/fr" : "/"}>
        {french ? "Retour à l'accueil" : "Return home"}
        <span aria-hidden="true">→</span>
      </Link>
    </main>
  );
}
