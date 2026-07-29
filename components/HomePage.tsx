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
    "eyebrow": "Cameroon · Property · Enterprise",
    "name": "Dr. Anthony Nkumbe",
    "known": "Known as Papa Tony",
    "headline": "Know the ground before you commit in Cameroon.",
    "leadFull": "You've got something in mind here — a property, a partner, a project. I help you find out whether it's real, who you'd actually be dealing with, and what it would take to move.",
    "leadShort": "Find out whether it's real, who you'd be dealing with, and what it takes to move.",
    "primary": "Start a conversation",
    "secondary": "See how I work",
    "heroAlt": "Anthony Nkumbe seated at a wood-panelled executive desk in a dark suit",
    "heroCaption": "Dr. Anthony Nkumbe",
    "heroCaptionMeta": "Cameroon",
    "recordKicker": "The record",
    "recordTitle": "What I do, and where.",
    "recordLead": "These are roles I hold now, not ones I used to. Results belong to the people I worked with, so you won't find numbers on this page I can't back up.",
    "roles": [
      [
        "Chief Executive",
        "Rainbow Group of Companies"
      ],
      [
        "Certified consultant, negotiator & facilitator",
        "Real estate"
      ],
      [
        "Low-cost building facilitator",
        "Multiple municipalities"
      ],
      [
        "Vice President",
        "CHEDE Union of Cooperatives"
      ],
      [
        "Executive member",
        "Africa Arise Business Consortium"
      ],
      [
        "Technical adviser",
        "Processing companies"
      ],
      [
        "Founder",
        "Eagles’ Family Assembly"
      ],
      [
        "Regional coordinator, West Africa",
        "Kingdom World for Jesus Int’l Church Fellowship"
      ]
    ],
    "provenance": "Dates, scale and outside references are still being confirmed. They'll appear here once they're verified, and not before.",
    "pendingLabel": "Coming, once verified",
    "pending": [
      "Specific projects, with dates and where they happened",
      "Results, confirmed by the people involved",
      "References, named and with permission"
    ],
    "mandateKicker": "What I can help with",
    "mandateTitle": "Four reasons people call me.",
    "mandateLead": "Whatever you bring, the first job is the same: work out what's actually there, who matters, and what still needs checking.",
    "pagerLabel": "What I can help with",
    "pillars": [
      {
        "number": "01",
        "title": "Buying or selling property",
        "text": "What the land or building really is, who controls it, and what you still need to check."
      },
      {
        "number": "02",
        "title": "Finding a local partner",
        "text": "What you actually need from a partner — then the right introductions."
      },
      {
        "number": "03",
        "title": "Reading the local picture",
        "text": "How things really work with municipalities, institutions and owners here."
      },
      {
        "number": "04",
        "title": "Building your people",
        "text": "Training and bringing leaders together, through my school and summits."
      }
    ],
    "enterpriseTitle": "Property, Land and Building Site. At the Center of the Project",
    "enterpriseBody": "Property consulting and negotiation, low-cost building schemes with municipalities, and advice to cooperatives and processing businesses.",
    "enterpriseLink": "More on the property work",
    "enterpriseAlt": "Construction site with reinforcement work in progress",
    "engagementKicker": "How it works",
    "engagementTitle": "How a conversation usually goes.",
    "steps": [
      [
        "You tell me what it is",
        "The property, the business, who's involved, your timing, and what a good outcome looks like for you."
      ],
      [
        "I separate fact from assumption",
        "What's actually known, what someone has assumed, and where you'll need a lawyer, a surveyor or an accountant."
      ],
      [
        "I bring in the right people",
        "A bounded conversation with the people who matter, everyone clear on who's who and what's being discussed."
      ],
      [
        "You decide the next step",
        "The legal, technical and financial checks stay yours. I'll point you to them; I won't do them for you."
      ]
    ],
    "engagementNote": "I'm a real estate consultant and investment facilitator. I'm not a financial adviser and not a wealth manager. I don't promise returns.",
    "engagementAlt": "Anthony Nkumbe explaining a point at a laptop during a working session",
    "operatorKicker": "Background",
    "operatorTitle": "I started with soil, not spreadsheets.",
    "operatorStory": [
      "I trained as an agronomist at FASA in Dschang. That's where the habit started — look at the actual land, the actual yield, the actual people, before deciding anything.",
      "Property, negotiation, building, cooperatives and investment came later. The job never really changed: work out what's there, read the room, find the right person to talk to."
    ],
    "credentialsLabel": "Where I trained",
    "credentials": [
      "Agronomy — FASA, University of Dschang",
      "Certified real estate consultant, negotiator, and facilitator",
      "Full Gospel Bible Institute",
      "Cornerstone University and Seminary",
      "Evangel Theological Seminary"
    ],
    "operatorLink": "Read the full profile",
    "operatorAlt": "Anthony Nkumbe standing at an office desk holding a portfolio",
    "institutionsKicker": "Leadership & ministry",
    "institutionsTitle": "I build the rooms where other leaders grow.",
    "institutionsBody": "I founded and run a school, and I convene the summits where entrepreneurs, ministers and leaders are trained.",
    "institutionsLink": "See what I lead",
    "platforms": [
      [
        "ESMEL",
        "A school for ministry, business and leadership"
      ],
      [
        "ELES",
        "A summit for leaders"
      ],
      [
        "MBS",
        "Business thinking for ministers"
      ]
    ],
    "ministryLine": "My faith isn't a separate compartment. Through Eagles’ Family Assembly I work on the same things — people who know who they are, handle money well, and don't forget the rural communities they came from.",
    "ministryLink": "Visit Eagles’ Family Assembly",
    "ministrySecondary": "More on the ministry",
    "legacyKicker": "Family & legacy",
    "legacyQuote": "Build people who can build beyond you.",
    "legacyBody": "My wife, Rev. Carine Nkumbe, and I have four children of our own, and a much wider family of adopted and spiritual sons and daughters. I measure the work by who can carry it without me.",
    "ctaKicker": "Before you get in touch",
    "ctaTitle": "Tell me what you're looking at.",
    "ctaBody": "A property, a business, an invitation to speak, a leadership programme, or something to do with the ministry. Say what it is and what you want to happen.",
    "cta": "Start a conversation",
    "ctaStatus": "The form can't send yet — there's no email or WhatsApp number published on the site. Until there is, it'll tell you so rather than pretend."
  },
  fr: {
    "eyebrow": "Cameroun · Immobilier · Entreprise",
    "name": "Dr Anthony Nkumbe",
    "known": "Connu sous le nom de Papa Tony",
    "headline": "Connaissez le terrain avant de vous engager au Cameroun.",
    "leadFull": "Vous avez quelque chose en tête ici : un bien, un partenaire, un projet. Je vous aide à savoir si c’est du solide, avec qui vous traiteriez réellement, et ce qu’il faudrait pour avancer.",
    "leadShort": "Savoir si c’est du solide, avec qui vous traiteriez, et ce qu’il faut pour avancer.",
    "primary": "Entamer l’échange",
    "secondary": "Ma façon de travailler",
    "heroAlt": "Anthony Nkumbe assis à un bureau de direction lambrissé, en costume sombre",
    "heroCaption": "Dr Anthony Nkumbe",
    "heroCaptionMeta": "Cameroun",
    "recordKicker": "Le parcours",
    "recordTitle": "Ce que je fais, et où.",
    "recordLead": "Ce sont des fonctions que j’exerce aujourd’hui, pas d’anciennes. Les résultats appartiennent à ceux avec qui j’ai travaillé : vous ne trouverez donc pas ici de chiffres que je ne peux pas étayer.",
    "roles": [
      [
        "Directeur général",
        "Rainbow Group of Companies"
      ],
      [
        "Consultant, négociateur & facilitateur certifié",
        "Immobilier"
      ],
      [
        "Facilitateur de logements à coût maîtrisé",
        "Plusieurs municipalités"
      ],
      [
        "Vice-président",
        "CHEDE Union of Cooperatives"
      ],
      [
        "Membre exécutif",
        "Africa Arise Business Consortium"
      ],
      [
        "Conseiller technique",
        "Unités de transformation"
      ],
      [
        "Fondateur",
        "Eagles’ Family Assembly"
      ],
      [
        "Coordonnateur régional, Afrique de l’Ouest",
        "Kingdom World for Jesus Int’l Church Fellowship"
      ]
    ],
    "provenance": "Les dates, l’ampleur et les références extérieures sont en cours de confirmation. Elles paraîtront ici une fois vérifiées, pas avant.",
    "pendingLabel": "À venir, après vérification",
    "pending": [
      "Des projets précis, avec dates et lieux",
      "Des résultats, confirmés par les personnes concernées",
      "Des références, nommées et avec autorisation"
    ],
    "mandateKicker": "Ce sur quoi je peux aider",
    "mandateTitle": "Quatre raisons de m’appeler.",
    "mandateLead": "Quel que soit le sujet, le premier travail est le même : établir ce qui existe vraiment, qui compte, et ce qu’il reste à vérifier.",
    "pagerLabel": "Ce sur quoi je peux aider",
    "pillars": [
      {
        "number": "01",
        "title": "Acheter ou vendre un bien",
        "text": "Ce qu’est vraiment le bien, qui le contrôle, et ce qu’il vous reste à vérifier."
      },
      {
        "number": "02",
        "title": "Trouver un partenaire local",
        "text": "Ce dont vous avez réellement besoin — puis les bonnes mises en relation."
      },
      {
        "number": "03",
        "title": "Lire le contexte local",
        "text": "Comment cela fonctionne vraiment avec les municipalités et les institutions."
      },
      {
        "number": "04",
        "title": "Former vos équipes",
        "text": "Former et rassembler des dirigeants, via mon école et mes sommets."
      }
    ],
    "enterpriseTitle": "Immobilier, foncier et chantier. Au centre du projet",
    "enterpriseBody": "Conseil et négociation immobilière, programmes de logements à coût maîtrisé avec les municipalités, et conseil aux coopératives et aux unités de transformation.",
    "enterpriseLink": "En savoir plus sur l’immobilier",
    "enterpriseAlt": "Chantier de construction avec travaux de ferraillage en cours",
    "engagementKicker": "Comment ça se passe",
    "engagementTitle": "Le déroulement habituel d’un échange.",
    "steps": [
      [
        "Vous m’exposez la situation",
        "Le bien, l’entreprise, les personnes concernées, votre calendrier, et ce qu’un bon résultat représenterait pour vous."
      ],
      [
        "Je sépare le fait de l’hypothèse",
        "Ce qui est avéré, ce qui n’est que supposé, et là où il vous faudra un avocat, un géomètre ou un comptable."
      ],
      [
        "Je réunis les bonnes personnes",
        "Un échange délimité avec ceux qui comptent, chacun sachant qui est qui et de quoi l’on parle."
      ],
      [
        "Vous décidez de la suite",
        "Les vérifications juridiques, techniques et financières restent les vôtres. Je vous y oriente ; je ne les fais pas à votre place."
      ]
    ],
    "engagementNote": "Je suis consultant immobilier et facilitateur d’investissement. Je ne suis ni conseiller financier ni gestionnaire de patrimoine. Je ne promets aucun rendement.",
    "engagementAlt": "Anthony Nkumbe expliquant un point devant un ordinateur portable pendant une séance de travail",
    "operatorKicker": "Parcours",
    "operatorTitle": "J’ai commencé par la terre, pas par les tableaux.",
    "operatorStory": [
      "Je me suis formé comme agronome à la FASA de Dschang. C’est là qu’est née l’habitude : regarder la terre réelle, le rendement réel, les gens réels, avant de décider quoi que ce soit.",
      "L’immobilier, la négociation, la construction, les coopératives et l’investissement sont venus ensuite. Le métier n’a pas vraiment changé : établir ce qui existe, lire le contexte, trouver le bon interlocuteur."
    ],
    "credentialsLabel": "Où je me suis formé",
    "credentials": [
      "Agronomie — FASA, Université de Dschang",
      "Consultant, négociateur et facilitateur immobilier certifié",
      "Full Gospel Bible Institute",
      "Cornerstone University and Seminary",
      "Evangel Theological Seminary"
    ],
    "operatorLink": "Lire le profil complet",
    "operatorAlt": "Anthony Nkumbe debout à un bureau, un porte-documents à la main",
    "institutionsKicker": "Leadership & ministère",
    "institutionsTitle": "Je crée les lieux où d’autres dirigeants grandissent.",
    "institutionsBody": "J’ai fondé et je dirige une école, et j’anime les sommets où se forment entrepreneurs, ministres et responsables.",
    "institutionsLink": "Voir ce que je dirige",
    "platforms": [
      [
        "ESMEL",
        "Une école de ministère, d’entreprise et de leadership"
      ],
      [
        "ELES",
        "Un sommet pour les dirigeants"
      ],
      [
        "MBS",
        "La réflexion économique pour les ministres"
      ]
    ],
    "ministryLine": "Ma foi n’est pas un compartiment à part. À travers Eagles’ Family Assembly, je travaille sur les mêmes choses : des personnes qui savent qui elles sont, qui gèrent bien l’argent, et qui n’oublient pas les campagnes d’où elles viennent.",
    "ministryLink": "Visiter Eagles’ Family Assembly",
    "ministrySecondary": "En savoir plus sur le ministère",
    "legacyKicker": "Famille & transmission",
    "legacyQuote": "Former des personnes capables de bâtir au-delà de vous.",
    "legacyBody": "Mon épouse, la Révérende Carine Nkumbe, et moi avons quatre enfants, et une famille bien plus large d’enfants adoptés ainsi que de fils et filles spirituels. Je mesure mon travail à ceux qui peuvent le porter sans moi.",
    "ctaKicker": "Avant de me contacter",
    "ctaTitle": "Dites-moi ce que vous avez en vue.",
    "ctaBody": "Un bien, une entreprise, une invitation à intervenir, un programme de leadership, ou quelque chose lié au ministère. Dites de quoi il s’agit et ce que vous souhaitez obtenir.",
    "cta": "Entamer l’échange",
    "ctaStatus": "Le formulaire ne peut pas encore envoyer — aucune adresse e-mail ni numéro WhatsApp n’est publié sur le site. Tant que ce ne sera pas le cas, il vous le dira au lieu de faire semblant."
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
