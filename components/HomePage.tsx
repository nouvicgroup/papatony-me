import Link from "next/link";
import { EngagementPager } from "@/components/EngagementPager";
import { HeroPortrait } from "@/components/HeroPortrait";
import { MediaImage } from "@/components/MediaImage";
import { OpportunityAction } from "@/components/OpportunityAction";
import { localizedPath, MEDIA, SITE_URL, type Locale } from "@/lib/site";

interface HomePageProps {
  locale: Locale;
}

const content = {
  en: {
    eyebrow: "Cameroon · Property · Enterprise",
    name: "Dr. Anthony Nkumbe",
    known: "Known as Papa Tony",
    headline: "Cameroon opportunity, assessed on the ground.",
    leadFull:
      "Founders, property owners, investors, and institutions arrive with an interest in Cameroon. Anthony Nkumbe helps them qualify it, meet the right local counterparts, and reach an informed next step.",
    leadShort:
      "Qualify an opportunity in Cameroon, meet the right counterparts, reach an informed next step.",
    primary: "Start an opportunity brief",
    secondary: "How engagement works",
    heroAlt:
      "Anthony Nkumbe seated at a wood-panelled executive desk in a dark suit",
    heroCaption: "Dr. Anthony Nkumbe",
    heroCaptionMeta: "Cameroon",

    recordKicker: "The record",
    recordTitle: "Roles held, not results claimed.",
    recordLead:
      "Standing here comes from positions currently held across enterprise, property, cooperatives, and institutions. Outcomes belong to the parties involved and are not advertised on this page.",
    roles: [
      ["Chief Executive", "Rainbow Group of Companies"],
      ["Certified consultant, negotiator & facilitator", "Real estate"],
      ["Low-cost building facilitator", "Multiple municipalities"],
      ["Vice President", "CHEDE Union of Cooperatives"],
      ["Executive member", "Africa Arise Business Consortium"],
      ["Technical adviser", "Processing companies"],
      ["Founder", "Eagles’ Family Assembly"],
      [
        "Regional coordinator, West Africa",
        "Kingdom World for Jesus Int’l Church Fellowship",
      ],
    ],
    provenance:
      "Roles as stated by Dr. Anthony Nkumbe. Dates, scale, and independent references are being documented and will be published here as each one is confirmed.",
    pendingLabel: "Still to be published",
    pending: [
      "Named engagements with dates, role, and geography",
      "Measurable results confirmed by the parties involved",
      "Attributed references, published with permission",
    ],

    mandateKicker: "Where he is useful",
    mandateTitle: "Four ways an engagement usually starts.",
    mandateLead:
      "Each one begins by defining the opportunity, testing the context, and identifying the people and diligence required to proceed responsibly.",
    pagerLabel: "Ways to engage",
    pillars: [
      {
        number: "01",
        title: "Qualify a property opportunity",
        text: "Clarify property interests, local process, decision makers, negotiation needs, and the independent diligence still required.",
      },
      {
        number: "02",
        title: "Structure an enterprise partnership",
        text: "Frame the commercial need before connecting operators, cooperatives, institutions, and suitable prospective partners.",
      },
      {
        number: "03",
        title: "Navigate local context",
        text: "Bring grounded Cameroon perspective to cross-border conversations involving municipalities, institutions, and enterprise leaders.",
      },
      {
        number: "04",
        title: "Develop leadership capacity",
        text: "Convene and equip leaders through platforms connecting enterprise, institution building, responsible service, and purpose.",
      },
    ],
    enterpriseTitle: "Property, Land and Building Site. At the Center of the Project",
    enterpriseBody:
      "Certified real estate consulting, negotiation and facilitation, low-cost building work in municipal contexts, and enterprise advisory across cooperatives and processing.",
    enterpriseLink: "Explore enterprise work",
    enterpriseAlt: "Construction site with reinforcement work in progress",

    engagementKicker: "How engagement works",
    engagementTitle: "Clarity before commitment.",
    steps: [
      [
        "Define",
        "Clarify the asset, enterprise, geography, decision makers, timeline, and intended outcome.",
      ],
      [
        "Examine",
        "Separate what is known from what still requires verification, and name where local professional advice is needed.",
      ],
      [
        "Connect",
        "Bring the relevant parties into a bounded conversation with clear roles and expectations.",
      ],
      [
        "Advance",
        "Agree practical next steps while independent legal, technical, and financial diligence stays with you.",
      ],
    ],
    engagementNote:
      "Papa Tony works as a real estate consultant and investment facilitator — not as a financial adviser or wealth manager. No investment outcome is promised.",
    engagementAlt:
      "Anthony Nkumbe explaining a point at a laptop during a working session",

    operatorKicker: "The operator",
    operatorTitle: "Trained on land. Built through institutions.",
    operatorStory: [
      "Papa Tony trained as an agronomist at FASA, University of Dschang — a formation that began with land, production, and the practical realities of local development.",
      "The work widened into real estate consulting, negotiation, building facilitation, cooperatives, and investment conversations. The role stayed the same throughout: define the opportunity, read the context, reach the right counterpart.",
    ],
    credentialsLabel: "Formation",
    credentials: [
      "Agronomy — FASA, University of Dschang",
      "Certified real estate consultant, negotiator, and facilitator",
      "Full Gospel Bible Institute",
      "Cornerstone University and Seminary",
      "Evangel Theological Seminary",
    ],
    operatorLink: "Read the official profile",
    operatorAlt:
      "Anthony Nkumbe standing at an office desk holding a portfolio",

    institutionsKicker: "Leadership & ministry",
    institutionsTitle: "Platforms that turn conviction into capacity.",
    institutionsBody:
      "Papa Tony founds, leads, and convenes platforms where entrepreneurship, leadership formation, and regional collaboration can develop.",
    institutionsLink: "See the leadership record",
    platforms: [
      ["ESMEL", "Ministry, entrepreneurship, and leadership formation"],
      ["ELES", "Leadership empowerment and convening"],
      ["MBS", "Business dialogue for ministers and leaders"],
    ],
    ministryLine:
      "Faith is the foundation rather than a separate identity. Through Eagles’ Family Assembly he carries a mandate to recover the world with the Word, expressed as identity, stewardship, rural impact, and service.",
    ministryLink: "Visit Eagles’ Family Assembly",
    ministrySecondary: "Read the ministry foundation",

    legacyKicker: "Family & legacy",
    legacyQuote: "Build people who can build beyond you.",
    legacyBody:
      "Papa Tony and Rev. Carine Nkumbe are parents to four biological children and to a wider family of adopted and spiritual sons and daughters. The measure they use is people strengthened to carry responsibility.",

    ctaKicker: "A serious conversation begins with context",
    ctaTitle: "Bring the opportunity. Clarify the fit.",
    ctaBody:
      "For property, enterprise, institutional leadership, speaking, or ministry inquiries, share the context and the outcome you are working toward.",
    cta: "Discuss an opportunity",
    ctaStatus:
      "Online delivery of the inquiry form is not connected yet. The official destination channel will be published here once it is confirmed.",
  },
  fr: {
    eyebrow: "Cameroun · Immobilier · Entreprise",
    name: "Dr Anthony Nkumbe",
    known: "Connu sous le nom de Papa Tony",
    headline: "Les opportunités camerounaises, évaluées sur le terrain.",
    leadFull:
      "Entrepreneurs, propriétaires, investisseurs et institutions arrivent avec un intérêt pour le Cameroun. Anthony Nkumbe les aide à le qualifier, à rencontrer les bons interlocuteurs locaux et à définir une prochaine étape éclairée.",
    leadShort:
      "Qualifier une opportunité au Cameroun, rencontrer les bons interlocuteurs, avancer de façon éclairée.",
    primary: "Présenter une opportunité",
    secondary: "Le déroulement d'un échange",
    heroAlt:
      "Anthony Nkumbe assis à un bureau de direction lambrissé, en costume sombre",
    heroCaption: "Dr Anthony Nkumbe",
    heroCaptionMeta: "Cameroun",

    recordKicker: "Le parcours",
    recordTitle: "Des fonctions exercées, pas des résultats revendiqués.",
    recordLead:
      "L'autorité vient ici des fonctions actuellement exercées dans l'entreprise, l'immobilier, les coopératives et les institutions. Les résultats appartiennent aux parties concernées et ne sont pas affichés sur cette page.",
    roles: [
      ["Directeur général", "Rainbow Group of Companies"],
      ["Consultant, négociateur & facilitateur certifié", "Immobilier"],
      ["Facilitateur de logements à coût maîtrisé", "Plusieurs municipalités"],
      ["Vice-président", "CHEDE Union of Cooperatives"],
      ["Membre exécutif", "Africa Arise Business Consortium"],
      ["Conseiller technique", "Unités de transformation"],
      ["Fondateur", "Eagles’ Family Assembly"],
      [
        "Coordonnateur régional, Afrique de l'Ouest",
        "Kingdom World for Jesus Int’l Church Fellowship",
      ],
    ],
    provenance:
      "Fonctions telles que déclarées par le Dr Anthony Nkumbe. Les dates, l'ampleur et les références indépendantes sont en cours de documentation et seront publiées ici au fur et à mesure de leur confirmation.",
    pendingLabel: "Reste à publier",
    pending: [
      "Des missions nommées, avec dates, rôle et zone géographique",
      "Des résultats mesurables confirmés par les parties concernées",
      "Des références attribuées, publiées avec autorisation",
    ],

    mandateKicker: "Là où il est utile",
    mandateTitle: "Quatre façons d'entamer un échange.",
    mandateLead:
      "Chacune commence par définir l'opportunité, lire le contexte et identifier les acteurs et les diligences nécessaires pour avancer sérieusement.",
    pagerLabel: "Modes d'engagement",
    pillars: [
      {
        number: "01",
        title: "Qualifier une opportunité immobilière",
        text: "Clarifier le bien, les procédures locales, les décideurs, la négociation et les diligences indépendantes encore nécessaires.",
      },
      {
        number: "02",
        title: "Structurer un partenariat d'entreprise",
        text: "Définir le besoin commercial avant de rapprocher opérateurs, coopératives, institutions et partenaires potentiels pertinents.",
      },
      {
        number: "03",
        title: "Lire le contexte local",
        text: "Apporter une perspective camerounaise concrète aux échanges transfrontaliers avec municipalités, institutions et dirigeants.",
      },
      {
        number: "04",
        title: "Développer les capacités de leadership",
        text: "Rassembler et former des leaders autour de l'entreprise, de la construction institutionnelle, du service responsable et de la mission.",
      },
    ],
    enterpriseTitle: "Immobilier, foncier et chantier. Au centre du projet",
    enterpriseBody:
      "Conseil, négociation et facilitation immobilière certifiés, logements à coût maîtrisé en contexte municipal, et conseil aux entreprises, coopératives et unités de transformation.",
    enterpriseLink: "Explorer l'activité entrepreneuriale",
    enterpriseAlt: "Chantier de construction avec travaux de ferraillage en cours",

    engagementKicker: "Le déroulement d'un échange",
    engagementTitle: "Clarifier avant de s'engager.",
    steps: [
      [
        "Définir",
        "Préciser l'actif, l'entreprise, la zone, les décideurs, le calendrier et le résultat attendu.",
      ],
      [
        "Examiner",
        "Distinguer ce qui est établi de ce qui reste à vérifier, et nommer les domaines nécessitant un avis professionnel local.",
      ],
      [
        "Relier",
        "Réunir les parties pertinentes dans un échange délimité, avec des rôles et des attentes clairs.",
      ],
      [
        "Avancer",
        "Convenir des prochaines étapes, les diligences juridiques, techniques et financières indépendantes restant à votre charge.",
      ],
    ],
    engagementNote:
      "Papa Tony intervient comme consultant immobilier et facilitateur d'investissement, et non comme conseiller financier ou gestionnaire de patrimoine. Aucun résultat d'investissement n'est promis.",
    engagementAlt:
      "Anthony Nkumbe expliquant un point devant un ordinateur portable pendant une séance de travail",

    operatorKicker: "L'homme de terrain",
    operatorTitle: "Formé par la terre. Bâti par les institutions.",
    operatorStory: [
      "Papa Tony s'est formé comme agronome à la FASA de l'Université de Dschang — une formation partie de la terre, de la production et des réalités concrètes du développement local.",
      "L'activité s'est ensuite étendue au conseil immobilier, à la négociation, à la facilitation de construction, aux coopératives et aux échanges d'investissement. Le rôle est resté le même : définir l'opportunité, lire le contexte, trouver le bon interlocuteur.",
    ],
    credentialsLabel: "Formation",
    credentials: [
      "Agronomie — FASA, Université de Dschang",
      "Consultant, négociateur et facilitateur immobilier certifié",
      "Full Gospel Bible Institute",
      "Cornerstone University and Seminary",
      "Evangel Theological Seminary",
    ],
    operatorLink: "Lire le profil officiel",
    operatorAlt:
      "Anthony Nkumbe debout à un bureau, un porte-documents à la main",

    institutionsKicker: "Leadership & ministère",
    institutionsTitle: "Des plateformes qui transforment la conviction en capacité.",
    institutionsBody:
      "Papa Tony fonde, dirige et convoque des plateformes où progressent l'entrepreneuriat, la formation au leadership et la collaboration régionale.",
    institutionsLink: "Voir le parcours institutionnel",
    platforms: [
      ["ESMEL", "Formation au ministère, à l'entrepreneuriat et au leadership"],
      ["ELES", "Renforcement et rassemblement des leaders"],
      ["MBS", "Dialogue économique pour ministres et responsables"],
    ],
    ministryLine:
      "La foi est le fondement, non une identité séparée. À travers Eagles' Family Assembly, il porte le mandat de « récupérer le monde par la Parole », vécu comme identité, intendance, impact rural et service.",
    ministryLink: "Visiter Eagles’ Family Assembly",
    ministrySecondary: "Découvrir le fondement ministériel",

    legacyKicker: "Famille & transmission",
    legacyQuote: "Former des personnes capables de bâtir au-delà de vous.",
    legacyBody:
      "Papa Tony et la Révérende Carine Nkumbe sont parents de quatre enfants biologiques et d'une famille élargie d'enfants adoptés ainsi que de fils et filles spirituels. Leur mesure : des personnes fortifiées pour porter des responsabilités.",

    ctaKicker: "Une conversation sérieuse commence par le contexte",
    ctaTitle: "Présentez l'opportunité. Vérifions l'adéquation.",
    ctaBody:
      "Pour toute demande liée à l'immobilier, l'entreprise, le leadership institutionnel, une intervention ou le ministère, partagez le contexte et le résultat recherché.",
    cta: "Échanger sur une opportunité",
    ctaStatus:
      "L'envoi en ligne du formulaire n'est pas encore connecté. Le canal de contact officiel sera publié ici dès sa confirmation.",
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

      {/* 1 — Proposition */}
      <section className="home-hero">
        <div className="hero-copy">
          <p className="eyebrow">{text.eyebrow}</p>
          <p className="hero-name">{text.name}</p>
          <p className="hero-known">{text.known}</p>
          <h1>{text.headline}</h1>
          <p className="hero-lead">
            <span className="lead-full">{text.leadFull}</span>
            <span className="lead-short">{text.leadShort}</span>
          </p>
          <div className="hero-actions">
            <OpportunityAction
              className="button button-primary"
              label={text.primary}
              locale={locale}
            />
            <a className="text-link" href="#engagement">
              {text.secondary}
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
        <div className="hero-portrait">
          <HeroPortrait alt={text.heroAlt} />
          <div className="hero-image-shade" aria-hidden="true" />
          <div className="portrait-caption">
            <span>{text.heroCaption}</span>
            <small>{text.heroCaptionMeta}</small>
          </div>
        </div>
      </section>

      {/* 2 — Verified role rail */}
      <section className="record-band" id="record">
        <div className="record-head">
          <div>
            <p className="kicker">{text.recordKicker}</p>
            <h2>{text.recordTitle}</h2>
          </div>
          <p>{text.recordLead}</p>
        </div>
        <ul className="role-rail">
          {text.roles.map(([role, org]) => (
            <li key={`${role}-${org}`}>
              <b>{role}</b>
              <span>{org}</span>
            </li>
          ))}
        </ul>
        <div className="record-provenance">
          <p>{text.provenance}</p>
          <div>
            <p className="micro-label">{text.pendingLabel}</p>
            <ul>
              {text.pending.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 3 — Responsibilities */}
      <section className="editorial-section mandate-section">
        <div className="section-heading split-heading">
          <div>
            <p className="kicker">{text.mandateKicker}</p>
            <h2>{text.mandateTitle}</h2>
          </div>
          <p>{text.mandateLead}</p>
        </div>
        <EngagementPager
          items={text.pillars}
          label={text.pagerLabel}
          locale={locale}
        />
      </section>

      <section className="wide-band">
        <div className="wide-band-media">
          <MediaImage
            src={MEDIA.enterprise}
            alt={text.enterpriseAlt}
            sizes="(max-width: 900px) 100vw, 55vw"
          />
        </div>
        <div className="wide-band-copy">
          <h2>{text.enterpriseTitle}</h2>
          <p>{text.enterpriseBody}</p>
          <Link className="text-link" href={localizedPath(locale, "enterprise")}>
            {text.enterpriseLink}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* 4 — How engagement works */}
      <section className="engagement-section" id="engagement">
        <div className="engagement-copy">
          <p className="kicker">{text.engagementKicker}</p>
          <h2>{text.engagementTitle}</h2>
          <ol className="step-list">
            {text.steps.map(([title, body], index) => (
              <li key={title}>
                <b>{String(index + 1).padStart(2, "0")}</b>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="disclaimer">{text.engagementNote}</p>
        </div>
        <div className="engagement-media">
          <MediaImage
            src={MEDIA.workingSession}
            alt={text.engagementAlt}
            sizes="(max-width: 900px) 100vw, 38vw"
          />
        </div>
      </section>

      {/* 5 — Operator story & credentials */}
      <section className="operator-section">
        <div className="operator-media">
          <MediaImage
            src={MEDIA.operatorStanding}
            alt={text.operatorAlt}
            sizes="(max-width: 900px) 60vw, 26vw"
          />
        </div>
        <div className="operator-copy">
          <p className="kicker">{text.operatorKicker}</p>
          <h2>{text.operatorTitle}</h2>
          {text.operatorStory.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p className="micro-label">{text.credentialsLabel}</p>
          <ul className="credential-list">
            {text.credentials.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <Link className="text-link" href={localizedPath(locale, "about")}>
            {text.operatorLink}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* 6 — Leadership & ministry, compact */}
      <section className="institutions-section">
        <div className="institutions-head">
          <div>
            <p className="kicker">{text.institutionsKicker}</p>
            <h2>{text.institutionsTitle}</h2>
            <p>{text.institutionsBody}</p>
            <Link
              className="text-link"
              href={localizedPath(locale, "leadership")}
            >
              {text.institutionsLink}
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
                  sizes="(max-width: 760px) 30vw, 14vw"
                />
              </div>
              <span>{name}</span>
              <p>{description}</p>
            </article>
          ))}
        </div>
        <div className="ministry-line">
          <p>{text.ministryLine}</p>
          <div className="link-row">
            <a
              className="text-link"
              href="https://eaglesfamily.org"
              target="_blank"
              rel="noreferrer"
            >
              {text.ministryLink}
              <span aria-hidden="true">↗</span>
            </a>
            <Link className="text-link" href={localizedPath(locale, "ministry")}>
              {text.ministrySecondary}
            </Link>
          </div>
        </div>
      </section>

      {/* 7a — Legacy, text only: no approved Rev. Carine portrait exists */}
      <section className="legacy-note">
        <p className="kicker">{text.legacyKicker}</p>
        <blockquote>“{text.legacyQuote}”</blockquote>
        <p>{text.legacyBody}</p>
      </section>

      {/* 7b — Action */}
      <section className="closing-cta">
        <p className="kicker">{text.ctaKicker}</p>
        <h2>{text.ctaTitle}</h2>
        <p>{text.ctaBody}</p>
        <OpportunityAction
          className="button button-light"
          label={text.cta}
          locale={locale}
        />
        <small className="cta-status">{text.ctaStatus}</small>
      </section>
    </main>
  );
}
