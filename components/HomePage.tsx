import Link from "next/link";
import { MediaImage } from "@/components/MediaImage";
import {
  LEGACY_IMAGE_SRC,
  localizedPath,
  SITE_URL,
  type Locale,
} from "@/lib/site";

interface HomePageProps {
  locale: Locale;
}

const content = {
  en: {
    eyebrow: "Cameroon · Africa · Global diaspora",
    name: "Anthony Nkumbe",
    known: "Known as Papa Tony",
    headline: "Building trusted pathways between diaspora ambition and African opportunity.",
    lead:
      "Apostle Dr. Anthony Nkumbe is a faith-led entrepreneur, certified real estate consultant, investment facilitator, institution builder, and ministry founder based in Cameroon.",
    primary: "Discuss an opportunity",
    secondary: "Explore his work",
    heroAlt:
      "Anthony Nkumbe seated at an executive desk in a black suit",
    rolesLabel: "Working across",
    roles: [
      "Property facilitation",
      "Enterprise partnerships",
      "Institution building",
      "Leadership formation",
    ],
    pillarsKicker: "A connected body of work",
    pillarsTitle: "People, property, enterprise, and purpose.",
    pillarsLead:
      "Papa Tony's work sits where relationships, local knowledge, leadership, and practical opportunity meet.",
    pillars: [
      {
        number: "01",
        title: "Property",
        text: "Real estate consulting and facilitation shaped by local context, responsible process, and clear expectations.",
      },
      {
        number: "02",
        title: "Enterprise",
        text: "Conversations that connect ideas, operators, cooperatives, institutions, and suitable partners.",
      },
      {
        number: "03",
        title: "Leadership",
        text: "Platforms that convene and equip leaders across business, ministry, and public life.",
      },
      {
        number: "04",
        title: "Purpose",
        text: "A faith-led commitment to stewardship, service, human development, and generational value.",
      },
    ],
    enterpriseKicker: "Property & enterprise",
    enterpriseTitle: "Local intelligence. Cross-border perspective.",
    enterpriseBody:
      "From real estate consulting to enterprise and investment facilitation, the work begins with understanding the opportunity, the people around it, and the conditions required for responsible progress.",
    enterprisePoints: [
      "Certified real estate consulting, negotiation, and facilitation",
      "Low-cost building facilitation for municipal contexts",
      "Enterprise, cooperative, and processing-sector advisory",
      "Investment introductions and cross-border partnership conversations",
    ],
    enterpriseLink: "Explore enterprise work",
    enterpriseAlt:
      "Anthony Nkumbe reviewing plans at an active construction site",
    leadershipKicker: "Leadership platforms",
    leadershipTitle: "Institutions designed to multiply capacity.",
    leadershipBody:
      "Papa Tony has founded, led, and convened platforms where entrepreneurship, ministry formation, business leadership, and regional collaboration can develop.",
    leadershipLink: "See the leadership record",
    platforms: [
      ["ESMEL", "Ministry, entrepreneurship, and leadership formation"],
      ["ELES", "Leadership empowerment and convening"],
      ["MBS", "Business dialogue for ministers and leaders"],
    ],
    ministryKicker: "Ministry foundation",
    ministryTitle: "Faith expressed through identity, stewardship, and service.",
    ministryBody:
      "Through Eagles' Family Assembly, Papa Tony carries a mandate to recover the world with the Word—raising people whose faith is expressed through responsible leadership, economic maturity, rural impact, and purposeful service.",
    ministryLink: "Visit Eagles’ Family Assembly",
    ministrySecondary: "Read the ministry foundation",
    ministryAlt:
      "Anthony Nkumbe speaking during a ministry gathering",
    legacyKicker: "Family & legacy",
    legacyTitle: "The work is personal before it becomes public.",
    legacyBody:
      "Papa Tony and Rev. Carine Nkumbe are parents to four biological children and a wider family of adopted and spiritual sons and daughters. Their shared legacy is measured not only in institutions, but in people strengthened to carry responsibility.",
    legacyQuote:
      "Build people who can build beyond you.",
    legacyAlt:
      "Papa Tony and Rev. Carine Nkumbe with their family",
    ctaKicker: "A serious conversation begins with context",
    ctaTitle: "Bring the opportunity. Clarify the fit.",
    ctaBody:
      "For property, enterprise, institutional leadership, speaking, or ministry inquiries, share the context and the outcome you are working toward.",
    cta: "Discuss an opportunity",
  },
  fr: {
    eyebrow: "Cameroun · Afrique · Diaspora mondiale",
    name: "Anthony Nkumbe",
    known: "Connu sous le nom de Papa Tony",
    headline:
      "Créer des passerelles de confiance entre l'ambition de la diaspora et les opportunités africaines.",
    lead:
      "L'Apôtre Dr Anthony Nkumbe est un entrepreneur guidé par la foi, consultant immobilier certifié, facilitateur d'investissement, bâtisseur d'institutions et fondateur de ministère basé au Cameroun.",
    primary: "Échanger sur une opportunité",
    secondary: "Découvrir son action",
    heroAlt:
      "Anthony Nkumbe assis à un bureau de direction, vêtu d'un costume noir",
    rolesLabel: "Domaines d'action",
    roles: [
      "Facilitation immobilière",
      "Partenariats d'entreprise",
      "Construction institutionnelle",
      "Formation des leaders",
    ],
    pillarsKicker: "Un même écosystème d'action",
    pillarsTitle: "Les personnes, le foncier, l'entreprise et la mission.",
    pillarsLead:
      "L'action de Papa Tony se situe au croisement des relations, de la connaissance du terrain, du leadership et des opportunités concrètes.",
    pillars: [
      {
        number: "01",
        title: "Immobilier",
        text: "Conseil et facilitation immobilière fondés sur le contexte local, une démarche responsable et des attentes claires.",
      },
      {
        number: "02",
        title: "Entreprise",
        text: "Des échanges qui rapprochent idées, opérateurs, coopératives, institutions et partenaires pertinents.",
      },
      {
        number: "03",
        title: "Leadership",
        text: "Des plateformes qui rassemblent et forment les leaders dans les affaires, le ministère et la vie publique.",
      },
      {
        number: "04",
        title: "Mission",
        text: "Un engagement guidé par la foi en faveur de l'intendance, du service, du développement humain et de la transmission.",
      },
    ],
    enterpriseKicker: "Immobilier & entreprise",
    enterpriseTitle: "Ancrage local. Perspective transfrontalière.",
    enterpriseBody:
      "Du conseil immobilier à la facilitation d'entreprises et d'investissements, le travail commence par une lecture juste de l'opportunité, des acteurs concernés et des conditions nécessaires à une avancée responsable.",
    enterprisePoints: [
      "Conseil, négociation et facilitation immobilière certifiés",
      "Facilitation de logements à coût maîtrisé en contexte municipal",
      "Conseil auprès d'entreprises, de coopératives et d'unités de transformation",
      "Mises en relation et échanges sur des partenariats transfrontaliers",
    ],
    enterpriseLink: "Explorer l'activité entrepreneuriale",
    enterpriseAlt:
      "Anthony Nkumbe consultant des plans sur un chantier en activité",
    leadershipKicker: "Plateformes de leadership",
    leadershipTitle: "Des institutions qui développent les capacités.",
    leadershipBody:
      "Papa Tony a fondé, dirigé et convoqué des plateformes où peuvent progresser l'entrepreneuriat, la formation au ministère, le leadership d'affaires et la collaboration régionale.",
    leadershipLink: "Voir le parcours institutionnel",
    platforms: [
      ["ESMEL", "Formation au ministère, à l'entrepreneuriat et au leadership"],
      ["ELES", "Renforcement et rassemblement des leaders"],
      ["MBS", "Dialogue économique pour ministres et responsables"],
    ],
    ministryKicker: "Fondement ministériel",
    ministryTitle: "Une foi vécue par l'identité, l'intendance et le service.",
    ministryBody:
      "À travers Eagles' Family Assembly, Papa Tony porte le mandat de « récupérer le monde par la Parole » et de former des personnes dont la foi s'exprime dans le leadership responsable, la maturité économique, l'impact rural et le service.",
    ministryLink: "Visiter Eagles’ Family Assembly",
    ministrySecondary: "Découvrir le fondement ministériel",
    ministryAlt:
      "Anthony Nkumbe prenant la parole lors d'un rassemblement ministériel",
    legacyKicker: "Famille & transmission",
    legacyTitle: "L'œuvre est personnelle avant d'être publique.",
    legacyBody:
      "Papa Tony et la Révérende Carine Nkumbe sont parents de quatre enfants biologiques et accompagnent une famille élargie d'enfants adoptés ainsi que de fils et filles spirituels. Leur héritage se lit autant dans les personnes fortifiées que dans les institutions.",
    legacyQuote:
      "Former des personnes capables de bâtir au-delà de vous.",
    legacyAlt:
      "Papa Tony et la Révérende Carine Nkumbe avec leur famille",
    ctaKicker: "Une conversation sérieuse commence par le contexte",
    ctaTitle: "Présentez l'opportunité. Vérifions l'adéquation.",
    ctaBody:
      "Pour toute demande liée à l'immobilier, l'entreprise, le leadership institutionnel, une intervention ou le ministère, partagez le contexte et le résultat recherché.",
    cta: "Échanger sur une opportunité",
  },
};

export function HomePage({ locale }: HomePageProps) {
  const text = content[locale];
  const profileSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${SITE_URL}${localizedPath(locale, "home")}#profile`,
    url: `${SITE_URL}${localizedPath(locale, "home")}`,
    inLanguage: locale,
    mainEntity: { "@id": `${SITE_URL}/#anthony-nkumbe` },
  };

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema) }}
      />
      <section className="home-hero">
        <div className="hero-copy">
          <p className="eyebrow">{text.eyebrow}</p>
          <p className="hero-name">{text.name}</p>
          <p className="hero-known">{text.known}</p>
          <h1>{text.headline}</h1>
          <p className="hero-lead">{text.lead}</p>
          <div className="hero-actions">
            <Link
              className="button button-primary"
              href={localizedPath(locale, "contact")}
            >
              {text.primary}
              <span aria-hidden="true">↗</span>
            </Link>
            <a className="text-link" href="#work">
              {text.secondary}
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
        <div className="hero-portrait">
          <MediaImage
            className="hero-image hero-image-desktop"
            src="/media/hero-desktop.webp"
            alt={text.heroAlt}
            fill
            priority
            sizes="(max-width: 760px) 0px, 52vw"
          />
          <MediaImage
            className="hero-image hero-image-mobile"
            src="/media/hero-mobile.webp"
            alt={text.heroAlt}
            fill
            priority
            sizes="(max-width: 760px) 100vw, 0px"
          />
          <div className="hero-image-shade" aria-hidden="true" />
          <div className="portrait-caption">
            <span>Anthony Nkumbe</span>
            <small>Cameroon</small>
          </div>
        </div>
      </section>

      <section className="roles-rail" aria-label={text.rolesLabel}>
        <p>{text.rolesLabel}</p>
        {text.roles.map((role, index) => (
          <span key={role}>
            <b>{String(index + 1).padStart(2, "0")}</b>
            {role}
          </span>
        ))}
      </section>

      <section className="editorial-section pillars-section" id="work">
        <div className="section-heading split-heading">
          <div>
            <p className="kicker">{text.pillarsKicker}</p>
            <h2>{text.pillarsTitle}</h2>
          </div>
          <p>{text.pillarsLead}</p>
        </div>
        <div className="pillar-grid">
          {text.pillars.map((pillar) => (
            <article key={pillar.number}>
              <span>{pillar.number}</span>
              <h3>{pillar.title}</h3>
              <p>{pillar.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="feature-band enterprise-feature">
        <div className="feature-image">
          <MediaImage
            src="/media/enterprise-construction.webp"
            alt={text.enterpriseAlt}
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
          />
          <small>
            {locale === "fr"
              ? "Image éditoriale — ne représente pas un projet précis"
              : "Editorial image — not a documented project"}
          </small>
        </div>
        <div className="feature-copy">
          <p className="kicker">{text.enterpriseKicker}</p>
          <h2>{text.enterpriseTitle}</h2>
          <p>{text.enterpriseBody}</p>
          <ul className="proof-list">
            {text.enterprisePoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <Link
            className="text-link"
            href={localizedPath(locale, "enterprise")}
          >
            {text.enterpriseLink}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className="editorial-section leadership-preview">
        <div className="leadership-intro">
          <p className="kicker">{text.leadershipKicker}</p>
          <h2>{text.leadershipTitle}</h2>
          <div>
            <p>{text.leadershipBody}</p>
            <Link
              className="text-link"
              href={localizedPath(locale, "leadership")}
            >
              {text.leadershipLink}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        <div className="platform-grid">
          {text.platforms.map(([name, description], index) => (
            <article key={name}>
              <div className="platform-logo">
                <MediaImage
                  src={
                    index === 0
                      ? "/media/esmel.jpeg"
                      : index === 1
                        ? "/media/eles.jpeg"
                        : "/media/mbs.jpeg"
                  }
                  alt={`${name} institutional mark`}
                  fill
                  sizes="(max-width: 760px) 30vw, 14vw"
                />
              </div>
              <span>{name}</span>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="feature-band ministry-feature">
        <div className="feature-copy">
          <p className="kicker">{text.ministryKicker}</p>
          <h2>{text.ministryTitle}</h2>
          <p>{text.ministryBody}</p>
          <div className="link-row">
            <a
              className="button button-light"
              href="https://eaglesfamily.org"
              target="_blank"
              rel="noreferrer"
            >
              {text.ministryLink}
              <span aria-hidden="true">↗</span>
            </a>
            <Link
              className="text-link"
              href={localizedPath(locale, "ministry")}
            >
              {text.ministrySecondary}
            </Link>
          </div>
        </div>
        <div className="feature-image">
          <MediaImage
            src="/media/ministry-photo.webp"
            alt={text.ministryAlt}
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
          />
        </div>
      </section>

      <section className="legacy-section">
        <div className="legacy-visual">
          {LEGACY_IMAGE_SRC ? (
            <MediaImage
              src={LEGACY_IMAGE_SRC}
              alt={text.legacyAlt}
              fill
              sizes="(max-width: 900px) 100vw, 42vw"
            />
          ) : (
            <div className="legacy-fallback" aria-hidden="true">
              <span>PT</span>
              <i />
              <span>CN</span>
            </div>
          )}
        </div>
        <div className="legacy-copy">
          <p className="kicker">{text.legacyKicker}</p>
          <h2>{text.legacyTitle}</h2>
          <p>{text.legacyBody}</p>
          <blockquote>“{text.legacyQuote}”</blockquote>
        </div>
      </section>

      <section className="closing-cta">
        <p className="kicker">{text.ctaKicker}</p>
        <h2>{text.ctaTitle}</h2>
        <p>{text.ctaBody}</p>
        <Link
          className="button button-light"
          href={localizedPath(locale, "contact")}
        >
          {text.cta}
          <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </main>
  );
}
