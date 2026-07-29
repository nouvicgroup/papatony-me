import Link from "next/link";
import { InquiryForm } from "@/components/InquiryForm";
import { MediaImage } from "@/components/MediaImage";
import {
  localizedPath,
  MEDIA,
  SITE_URL,
  type Locale,
  type PageKey,
} from "@/lib/site";

interface StandardPageProps {
  locale: Locale;
  page: Exclude<PageKey, "home">;
}

const enterprise = {
  en: {
    kicker: "Property & enterprise",
    title: "Opportunity needs more than capital. It needs context.",
    lead:
      "I work where property, enterprise, local relationships and cross-border partnership meet — helping serious people understand the terrain before they decide how to proceed.",
    imageAlt:
      "Anthony Nkumbe seated at a bright office desk",
    domainsTitle: "Areas of engagement",
    domains: [
      [
        "Real estate consulting",
        "Structured conversations around property interests, local process, negotiation, and responsible facilitation in Cameroon.",
      ],
      [
        "Building facilitation",
        "Engagement around low-cost building approaches and municipal contexts, without presenting a one-size-fits-all solution.",
      ],
      [
        "Enterprise partnerships",
        "Connecting suitable operators, institutions, cooperatives, and partners around a clearly defined commercial need.",
      ],
      [
        "Investment facilitation",
        "Preparing introductions and discussions between opportunity owners and prospective capital partners. No investment outcomes are promised.",
      ],
    ],
    approachKicker: "Working approach",
    approachTitle: "Clarity before commitment.",
    approach: [
      [
        "01 · Define",
        "Clarify the asset, enterprise, geography, decision makers, timeline, and intended outcome.",
      ],
      [
        "02 · Examine",
        "Identify what is known, what still requires verification, and where local professional advice is needed.",
      ],
      [
        "03 · Connect",
        "Bring relevant parties into a bounded conversation with clear roles and expectations.",
      ],
      [
        "04 · Advance",
        "Agree practical next steps while preserving independent legal, technical, and financial diligence.",
      ],
    ],
    note:
      "I am a real estate consultant and investment facilitator, not a financial adviser or wealth manager. Every opportunity needs independent due diligence.",
    ctaTitle: "Have a property or enterprise conversation in mind?",
    cta: "Share the context",
  },
  fr: {
    kicker: "Immobilier & entreprise",
    title:
      "Une opportunité exige plus que du capital. Elle exige une lecture du terrain.",
    lead:
      "J’interviens là où se croisent l’immobilier, l’entreprise, les relations locales et les partenariats transfrontaliers, pour aider des interlocuteurs sérieux à comprendre le terrain avant de décider.",
    imageAlt: "Anthony Nkumbe assis à un bureau lumineux",
    domainsTitle: "Domaines d'intervention",
    domains: [
      [
        "Conseil immobilier",
        "Échanges structurés autour des intérêts immobiliers, des procédures locales, de la négociation et d'une facilitation responsable au Cameroun.",
      ],
      [
        "Facilitation de construction",
        "Réflexion sur des approches de construction à coût maîtrisé et sur les contextes municipaux, sans solution uniforme.",
      ],
      [
        "Partenariats d'entreprise",
        "Mise en relation d'opérateurs, d'institutions, de coopératives et de partenaires adaptés à un besoin commercial clairement défini.",
      ],
      [
        "Facilitation d'investissement",
        "Préparation de mises en relation entre porteurs d'opportunités et partenaires financiers potentiels, sans garantie de résultat.",
      ],
    ],
    approachKicker: "Méthode de travail",
    approachTitle: "Clarifier avant de s'engager.",
    approach: [
      [
        "01 · Définir",
        "Préciser l'actif, l'entreprise, la zone, les décideurs, le calendrier et le résultat attendu.",
      ],
      [
        "02 · Examiner",
        "Distinguer ce qui est établi, ce qui reste à vérifier et les domaines nécessitant un avis professionnel local.",
      ],
      [
        "03 · Relier",
        "Réunir les parties pertinentes dans un échange délimité, avec des rôles et des attentes clairs.",
      ],
      [
        "04 · Avancer",
        "Convenir des prochaines étapes tout en maintenant les diligences juridiques, techniques et financières indépendantes.",
      ],
    ],
    note:
      "Je suis consultant immobilier et facilitateur d’investissement, et non conseiller financier ou gestionnaire de patrimoine. Toute opportunité exige une diligence indépendante.",
    ctaTitle: "Vous souhaitez parler d'un projet immobilier ou d'entreprise ?",
    cta: "Présenter le contexte",
  },
};

const leadership = {
  en: {
    kicker: "Leadership & institutions",
    title: "Convening people around formation, enterprise, and service.",
    lead:
      "I have founded and led institutions built to strengthen people, organise shared purpose, and turn conviction into something that lasts.",
    imageAlt:
      "Anthony Nkumbe in a formal portrait at a leadership conference",
    recordTitle: "An institutional record",
    roles: [
      ["Founder", "Eagles’ Family Assembly"],
      [
        "President",
        "Eagles’ School of Ministry, Entrepreneurship and Leadership (ESMEL)",
      ],
      ["Convener", "Eagles Leadership Empowerment Summit (ELES)"],
      ["Convener", "Ministers Business Summit (MBS)"],
      ["President", "Eagle Apostolic College"],
      ["President", "Bakossi All Ministers Association (BAMA)"],
    ],
    platformsTitle: "Selected platforms",
    platforms: [
      [
        "ESMEL",
        "A formation platform connecting ministry, entrepreneurship, and leadership.",
        "/media/esmel.jpeg",
      ],
      [
        "ELES",
        "A summit designed to empower leaders and widen the quality of leadership conversation.",
        "/media/eles.jpeg",
      ],
      [
        "MBS",
        "A business summit bringing economic and enterprise thinking into ministerial leadership.",
        "/media/mbs.jpeg",
      ],
    ],
    principle:
      "I treat leadership as stewardship: creating the conditions in which other people become capable, responsible and useful.",
    ctaTitle: "Planning an institutional or leadership engagement?",
    cta: "Start a conversation",
  },
  fr: {
    kicker: "Leadership & institutions",
    title:
      "Rassembler les personnes autour de la formation, de l'entreprise et du service.",
    lead:
      "J’ai fondé et dirigé des institutions destinées à fortifier les personnes, organiser une mission commune et transformer les convictions en structures durables.",
    imageAlt:
      "Portrait officiel d'Anthony Nkumbe lors d'une rencontre de leadership",
    recordTitle: "Un parcours institutionnel",
    roles: [
      ["Fondateur", "Eagles’ Family Assembly"],
      [
        "Président",
        "Eagles’ School of Ministry, Entrepreneurship and Leadership (ESMEL)",
      ],
      ["Convocateur", "Eagles Leadership Empowerment Summit (ELES)"],
      ["Convocateur", "Ministers Business Summit (MBS)"],
      ["Président", "Eagle Apostolic College"],
      ["Président", "Bakossi All Ministers Association (BAMA)"],
    ],
    platformsTitle: "Quelques plateformes",
    platforms: [
      [
        "ESMEL",
        "Une plateforme de formation qui relie ministère, entrepreneuriat et leadership.",
        "/media/esmel.jpeg",
      ],
      [
        "ELES",
        "Un sommet conçu pour renforcer les leaders et élever la qualité du dialogue.",
        "/media/eles.jpeg",
      ],
      [
        "MBS",
        "Un sommet qui intègre la réflexion économique et entrepreneuriale au leadership ministériel.",
        "/media/mbs.jpeg",
      ],
    ],
    principle:
      "Je comprends le leadership comme une intendance : créer les conditions où d’autres deviennent capables, responsables et utiles.",
    ctaTitle:
      "Vous préparez une rencontre institutionnelle ou de leadership ?",
    cta: "Engager la conversation",
  },
};

const about = {
  en: {
    kicker: "Official profile",
    title: "A builder shaped by land, faith, enterprise, and people.",
    lead:
      "I am Apostle Dr. Anthony Nkumbe — most people call me Papa Tony. I work from Cameroon as an entrepreneur, certified real estate consultant, institutional leader and ministry founder.",
    imageAlt: "Official headshot of Anthony Nkumbe in a black suit",
    storyTitle: "One integrated life",
    story: [
      "I trained as an agronomist at FASA, University of Dschang. My professional formation began with land, production, systems and the realities of local development.",
      "The work later widened into real estate consulting, negotiation, building facilitation, enterprise advice, cooperatives and investment conversations. Across all of it my role is the same: a connector and facilitator, helping people define an opportunity, understand the context, and reach the right counterpart.",
      "Faith is the foundation, not a separate public identity. As founder of Eagles’ Family Assembly and convener of several leadership platforms, I have spent decades forming people around identity, stewardship, enterprise, responsibility and service.",
    ],
    formationTitle: "Formation & professional grounding",
    formation: [
      "Agronomy training, FASA — University of Dschang",
      "Certified real estate consultant, negotiator, and facilitator",
      "Full Gospel Bible Institute",
      "Cornerstone University and Seminary",
      "Evangel Theological Seminary",
    ],
    familyTitle: "Family & generational responsibility",
    family:
      "I am married to Rev. Carine Nkumbe. We are parents to four biological children, and parental and spiritual figures to a wider family of adopted children, sons and daughters. Family portraits will only be added with specific approval.",
    cta: "Discuss an opportunity",
  },
  fr: {
    kicker: "Profil officiel",
    title:
      "Un bâtisseur façonné par la terre, la foi, l'entreprise et les personnes.",
    lead:
      "Je suis l’Apôtre Dr Anthony Nkumbe — on m’appelle Papa Tony. Je travaille depuis le Cameroun comme entrepreneur, consultant immobilier certifié, dirigeant institutionnel et fondateur de ministère.",
    imageAlt: "Portrait officiel d'Anthony Nkumbe en costume noir",
    storyTitle: "Une vie cohérente",
    story: [
      "Je me suis formé comme agronome à la FASA de l’Université de Dschang. Mon parcours a commencé au contact de la terre, de la production, des systèmes et des réalités du développement local.",
      "Son activité s'est ensuite étendue au conseil immobilier, à la négociation, à la facilitation de construction, au conseil aux entreprises, aux coopératives et aux échanges d'investissement. Son rôle reste celui d'un connecteur et d'un facilitateur.",
      "La foi est le fondement, non une identité publique séparée. Fondateur d’Eagles’ Family Assembly et convocateur de plateformes de leadership, je forme depuis des décennies des personnes autour de l’identité, l’intendance, l’entreprise, la responsabilité et le service.",
    ],
    formationTitle: "Formation & ancrage professionnel",
    formation: [
      "Formation en agronomie, FASA — Université de Dschang",
      "Consultant, négociateur et facilitateur immobilier certifié",
      "Full Gospel Bible Institute",
      "Cornerstone University and Seminary",
      "Evangel Theological Seminary",
    ],
    familyTitle: "Famille & responsabilité générationnelle",
    family:
      "Je suis marié à la Révérende Carine Nkumbe. Nous sommes parents de quatre enfants biologiques et accompagnons une famille élargie d’enfants adoptés ainsi que de fils et filles spirituels. Les portraits familiaux ne seront ajoutés qu’après validation.",
    cta: "Échanger sur une opportunité",
  },
};

const ministry = {
  en: {
    kicker: "Ministry foundation",
    title: "Faith that forms people for responsibility.",
    lead:
      "I founded Eagles’ Family Assembly around one mandate: recovering the world with the Word. Here I set out the parts of it that shape the rest of my work.",
    imageAlt:
      "Anthony Nkumbe speaking into a microphone at a ministry gathering",
    mandateTitle: "A fourfold emphasis",
    mandates: [
      [
        "Urban ministry with rural impact",
        "Carrying training, resources, and spiritual leadership beyond urban centres into communities often left outside the main flow of opportunity.",
      ],
      [
        "Heritage and sonship awareness",
        "Helping people understand identity, inheritance, responsibility, and the disciplines required to carry what they receive.",
      ],
      [
        "An economically sustainable and investing church",
        "Forming a community that understands stewardship, giving, investment, productive work, and life beyond survival.",
      ],
      [
        "Mentoring and empowering the called",
        "Creating patient pathways through which emerging leaders can be formed, tested, strengthened, and released to serve.",
      ],
    ],
    boundary:
      "This site does not duplicate the Eagles’ Family Assembly website. Church information, media, services and the full ministry story stay on the ministry’s own site.",
    external: "Explore Eagles’ Family Assembly",
    leadership: "See leadership platforms",
  },
  fr: {
    kicker: "Fondement ministériel",
    title: "Une foi qui forme des personnes responsables.",
    lead:
      "J’ai fondé Eagles’ Family Assembly autour d’un mandat : récupérer le monde par la Parole. J’en présente ici ce qui éclaire le reste de mon travail.",
    imageAlt:
      "Anthony Nkumbe prenant la parole lors d'un rassemblement ministériel",
    mandateTitle: "Quatre axes essentiels",
    mandates: [
      [
        "Un ministère urbain à impact rural",
        "Porter formation, ressources et leadership spirituel au-delà des centres urbains, vers les communautés souvent éloignées des opportunités.",
      ],
      [
        "Conscience de l'héritage et de la filiation",
        "Aider chacun à comprendre son identité, son héritage, sa responsabilité et les disciplines nécessaires pour bien transmettre.",
      ],
      [
        "Une Église économiquement durable et investisseuse",
        "Former une communauté qui comprend l'intendance, le don, l'investissement, le travail productif et une vie au-delà de la survie.",
      ],
      [
        "Mentorer et équiper ceux qui sont appelés",
        "Créer des parcours patients où les leaders émergents sont formés, éprouvés, fortifiés et envoyés pour servir.",
      ],
    ],
    boundary:
      "Ce site ne reproduit pas celui d’Eagles’ Family Assembly. Les informations propres à l’Église, ses médias, ses rencontres et son histoire complète restent sur le site du ministère.",
    external: "Découvrir Eagles’ Family Assembly",
    leadership: "Voir les plateformes de leadership",
  },
};

const contact = {
  en: {
    kicker: "Get in touch",
    title: "Tell me what you're looking at.",
    lead: "Enough detail for me to say whether I'm the right person to help. Property, business, an invitation to speak, leadership or ministry \u2014 all fine.",
    sidebarTitle: "What to include",
    sidebar: [
      "What it is, in one sentence",
      "Where it is, and who is involved",
      "What you want to happen",
      "Any dates you are working to",
    ],
    status:
      "Nothing can be sent from this page yet \u2014 no email address or WhatsApp number has been published. The form will say so rather than pretend.",
  },
  fr: {
    kicker: "Le contacter",
    title: "Dites-moi ce que vous avez en vue.",
    lead: "Assez de d\u00e9tails pour qu\u2019il dise s\u2019il est la bonne personne. Un bien, une entreprise, une invitation \u00e0 intervenir, le leadership ou le minist\u00e8re \u2014 tout convient.",
    sidebarTitle: "\u00c0 pr\u00e9ciser",
    sidebar: [
      "De quoi il s\u2019agit, en une phrase",
      "O\u00f9 cela se passe, et qui est concern\u00e9",
      "Ce que vous souhaitez obtenir",
      "Les \u00e9ch\u00e9ances \u00e9ventuelles",
    ],
    status:
      "Rien ne peut encore \u00eatre envoy\u00e9 depuis cette page \u2014 aucune adresse e-mail ni num\u00e9ro WhatsApp n\u2019est publi\u00e9. Le formulaire vous le dira au lieu de faire semblant.",
  },
};

const privacy = {
  en: {
    kicker: "Privacy",
    title: "A simple, respectful inquiry experience.",
    updated: "Last updated: July 29, 2026",
    sections: [
      [
        "Information you provide",
        "When contact delivery is activated, the inquiry form may collect your name, email address, organisation, inquiry type, and message. Do not submit confidential financial, legal, identity, or health information.",
      ],
      [
        "How it will be used",
        "Information submitted through the inquiry channel will be used only to assess and respond to the stated request, maintain necessary correspondence, and protect the website from misuse.",
      ],
      [
        "Current form status",
        "The website does not currently transmit or store inquiry form content. It validates entries locally and displays an honest delivery-unavailable message until an official destination is configured.",
      ],
      [
        "Third-party links",
        "This website links to EaglesFamily.org. External sites operate under their own privacy practices and are responsible for their own content.",
      ],
    ],
  },
  fr: {
    kicker: "Confidentialité",
    title: "Une prise de contact simple et respectueuse.",
    updated: "Dernière mise à jour : 29 juillet 2026",
    sections: [
      [
        "Informations communiquées",
        "Lorsque l'envoi sera activé, le formulaire pourra recueillir votre nom, adresse e-mail, organisation, type de demande et message. N'y transmettez pas de données financières, juridiques, médicales ou d'identité confidentielles.",
      ],
      [
        "Utilisation prévue",
        "Les informations transmises serviront uniquement à examiner la demande, y répondre, conserver les échanges nécessaires et protéger le site contre les abus.",
      ],
      [
        "État actuel du formulaire",
        "Le site ne transmet ni ne stocke actuellement le contenu du formulaire. Les saisies sont validées localement et un message transparent indique que l'envoi reste indisponible.",
      ],
      [
        "Liens externes",
        "Ce site renvoie vers EaglesFamily.org. Les sites externes appliquent leurs propres règles de confidentialité et restent responsables de leur contenu.",
      ],
    ],
  },
};

export function StandardPage({ locale, page }: StandardPageProps) {
  if (page === "enterprise") {
    const text = enterprise[locale];
    return (
      <main id="main-content">
        <section className="page-hero page-hero-image">
          <div>
            <p className="kicker">{text.kicker}</p>
            <h1>{text.title}</h1>
            <p>{text.lead}</p>
          </div>
          <div className="page-hero-media portrait-media">
            <MediaImage
              src={MEDIA.enterprisePortrait}
              alt={text.imageAlt}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 42vw"
            />
          </div>
        </section>
        <section className="editorial-section">
          <p className="kicker">01</p>
          <h2 className="section-title">{text.domainsTitle}</h2>
          <div className="domain-grid">
            {text.domains.map(([title, description], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="dark-section">
          <p className="kicker">{text.approachKicker}</p>
          <h2>{text.approachTitle}</h2>
          <div className="process-grid">
            {text.approach.map(([title, description]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
          <p className="disclaimer">{text.note}</p>
        </section>
        <section className="inline-cta">
          <h2>{text.ctaTitle}</h2>
          <Link
            className="button button-primary"
            href={localizedPath(locale, "contact")}
          >
            {text.cta}
            <span aria-hidden="true">↗</span>
          </Link>
        </section>
      </main>
    );
  }

  if (page === "leadership") {
    const text = leadership[locale];
    return (
      <main id="main-content">
        <section className="page-hero page-hero-image">
          <div>
            <p className="kicker">{text.kicker}</p>
            <h1>{text.title}</h1>
            <p>{text.lead}</p>
          </div>
          <div className="page-hero-media portrait-media">
            <MediaImage
              src={MEDIA.leadership}
              alt={text.imageAlt}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 42vw"
            />
          </div>
        </section>
        <section className="editorial-section record-section">
          <p className="kicker">01</p>
          <h2 className="section-title">{text.recordTitle}</h2>
          <div className="record-list">
            {text.roles.map(([role, institution], index) => (
              <article key={institution}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{role}</p>
                <h3>{institution}</h3>
              </article>
            ))}
          </div>
        </section>
        <section className="platform-section">
          <p className="kicker">02</p>
          <h2>{text.platformsTitle}</h2>
          <div className="platform-detail-grid">
            {text.platforms.map(([name, description, image]) => (
              <article key={name}>
                <div>
                  <MediaImage
                    src={image}
                    alt={`${name} institutional mark`}
                    fill
                    sizes="(max-width: 760px) 60vw, 20vw"
                  />
                </div>
                <h3>{name}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
          <blockquote>“{text.principle}”</blockquote>
        </section>
        <section className="inline-cta">
          <h2>{text.ctaTitle}</h2>
          <Link
            className="button button-primary"
            href={localizedPath(locale, "contact")}
          >
            {text.cta}
            <span aria-hidden="true">↗</span>
          </Link>
        </section>
      </main>
    );
  }

  if (page === "about") {
    const text = about[locale];
    const profileSchema = {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "@id": `${SITE_URL}${localizedPath(locale, "about")}#profile`,
      url: `${SITE_URL}${localizedPath(locale, "about")}`,
      inLanguage: locale,
      mainEntity: { "@id": `${SITE_URL}/#anthony-nkumbe` },
    };
    return (
      <main id="main-content">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema) }}
        />
        <section className="page-hero page-hero-image about-hero">
          <div>
            <p className="kicker">{text.kicker}</p>
            <h1>{text.title}</h1>
            <p>{text.lead}</p>
          </div>
          <div className="page-hero-media portrait-media">
            <MediaImage
              src={MEDIA.headshot}
              alt={text.imageAlt}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 38vw"
            />
          </div>
        </section>
        <section className="biography-section">
          <aside>
            <span>Anthony</span>
            <strong>Nkumbe</strong>
            <small>Papa Tony</small>
          </aside>
          <article>
            <h2>{text.storyTitle}</h2>
            {text.story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </article>
        </section>
        <section className="formation-section">
          <div>
            <h2>{text.formationTitle}</h2>
          </div>
          <ul>
            {text.formation.map((item, index) => (
              <li key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {item}
              </li>
            ))}
          </ul>
        </section>
        <section className="family-note">
          <h2>{text.familyTitle}</h2>
          <p>{text.family}</p>
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

  if (page === "ministry") {
    const text = ministry[locale];
    return (
      <main id="main-content">
        <section className="page-hero ministry-page-hero">
          <div>
            <p className="kicker">{text.kicker}</p>
            <h1>{text.title}</h1>
            <p>{text.lead}</p>
            <a
              className="button button-light"
              href="https://eaglesfamily.org"
              target="_blank"
              rel="noreferrer"
            >
              {text.external}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="page-hero-media">
            <MediaImage
              src={MEDIA.ministry}
              alt={text.imageAlt}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 46vw"
            />
          </div>
        </section>
        <section className="editorial-section">
          <p className="kicker">01</p>
          <h2 className="section-title">{text.mandateTitle}</h2>
          <div className="mandate-grid">
            {text.mandates.map(([title, description], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="ministry-boundary">
          <div className="ministry-mark">
            <MediaImage
              src="/media/eagles-family-assembly.jpeg"
              alt="Eagles' Family Assembly institutional mark"
              fill
              sizes="180px"
            />
          </div>
          <div>
            <p>{text.boundary}</p>
            <div className="link-row">
              <a
                className="button button-primary"
                href="https://eaglesfamily.org"
                target="_blank"
                rel="noreferrer"
              >
                {text.external}
                <span aria-hidden="true">↗</span>
              </a>
              <Link
                className="text-link"
                href={localizedPath(locale, "leadership")}
              >
                {text.leadership}
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (page === "contact") {
    const text = contact[locale];
    return (
      <main id="main-content" className="contact-page">
        <section className="contact-intro">
          <p className="kicker">{text.kicker}</p>
          <h1>{text.title}</h1>
          <p>{text.lead}</p>
        </section>
        <section className="contact-layout">
          <aside>
            <h2>{text.sidebarTitle}</h2>
            <ul>
              {text.sidebar.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="contact-status">{text.status}</p>
          </aside>
          <InquiryForm locale={locale} />
        </section>
      </main>
    );
  }

  const text = privacy[locale];
  return (
    <main id="main-content" className="privacy-page">
      <section className="privacy-intro">
        <p className="kicker">{text.kicker}</p>
        <h1>{text.title}</h1>
        <small>{text.updated}</small>
      </section>
      <section className="privacy-content">
        {text.sections.map(([title, body], index) => (
          <article key={title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h2>{title}</h2>
              <p>{body}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
