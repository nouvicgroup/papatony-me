import type { Metadata } from "next";

export const SITE_URL = "https://papatony.me";
export const SITE_NAME = "Papa Tony";
export const SITE_DESCRIPTION =
  "Anthony Nkumbe helps diaspora founders, property owners, investors, and institutions qualify opportunities and navigate informed next steps in Cameroon.";
export const LEGACY_IMAGE_SRC: string | null = null;

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Enterprise, Leadership & Purpose`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
  },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  inLanguage: ["en", "fr"],
};

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#anthony-nkumbe`,
  name: "Anthony Nkumbe",
  alternateName: "Papa Tony",
  honorificPrefix: "Apostle Dr.",
  url: SITE_URL,
  image: `${SITE_URL}/media/official-headshot.webp`,
  jobTitle: [
    "Entrepreneur",
    "Certified Real Estate Consultant",
    "Investment Facilitator",
    "Institution Builder",
    "Ministry Founder",
  ],
  worksFor: {
    "@type": "Organization",
    name: "Rainbow Group of Companies",
  },
  founder: {
    "@type": "Organization",
    name: "Eagles' Family Assembly",
    url: "https://eaglesfamily.org",
  },
  homeLocation: {
    "@type": "Country",
    name: "Cameroon",
  },
};

export type Locale = "en" | "fr";
export type PageKey =
  | "home"
  | "enterprise"
  | "leadership"
  | "about"
  | "ministry"
  | "contact"
  | "privacy";

interface PageSeo {
  title: string;
  description: string;
}

const seo: Record<Locale, Record<PageKey, PageSeo>> = {
  en: {
    home: {
      title: "Anthony Nkumbe | Papa Tony",
      description:
        "Navigate property and enterprise opportunities in Cameroon with Anthony Nkumbe's local judgment, cross-border perspective, and institutional experience.",
    },
    enterprise: {
      title: "Property & Enterprise",
      description:
        "Explore Papa Tony's work in Cameroon property facilitation, real estate consulting, enterprise partnerships, cooperatives, and investment facilitation.",
    },
    leadership: {
      title: "Leadership & Institutions",
      description:
        "Leadership platforms and institutions convened by Anthony Nkumbe across entrepreneurship, ministry formation, business, and regional collaboration.",
    },
    about: {
      title: "About Anthony Nkumbe",
      description:
        "Read the official profile of Apostle Dr. Anthony Nkumbe, known as Papa Tony: agronomist, entrepreneur, real estate consultant, institution builder, husband, father, and mentor.",
    },
    ministry: {
      title: "Ministry Foundation",
      description:
        "The faith and ministry foundation behind Papa Tony's leadership, including Eagles' Family Assembly and its focus on identity, stewardship, rural impact, and mentoring.",
    },
    contact: {
      title: "Discuss an Opportunity",
      description:
        "Start a professional inquiry with Papa Tony concerning property, enterprise, institutional leadership, speaking, collaboration, or ministry.",
    },
    privacy: {
      title: "Privacy",
      description:
        "Privacy information for PapaTony.me and its professional inquiry experience.",
    },
  },
  fr: {
    home: {
      title: "Anthony Nkumbe | Papa Tony",
      description:
        "Abordez les opportunités immobilières et entrepreneuriales au Cameroun avec le jugement local, la perspective transfrontalière et l'expérience institutionnelle d'Anthony Nkumbe.",
    },
    enterprise: {
      title: "Immobilier & Entreprise",
      description:
        "Découvrez le travail de Papa Tony dans la facilitation immobilière au Cameroun, le conseil, les partenariats d'entreprise, les coopératives et l'investissement.",
    },
    leadership: {
      title: "Leadership & Institutions",
      description:
        "Les plateformes et institutions portées par Anthony Nkumbe autour de l'entrepreneuriat, la formation, les affaires et la collaboration régionale.",
    },
    about: {
      title: "À propos d'Anthony Nkumbe",
      description:
        "Profil officiel de l'Apôtre Dr Anthony Nkumbe, dit Papa Tony : agronome, entrepreneur, consultant immobilier, bâtisseur d'institutions, époux, père et mentor.",
    },
    ministry: {
      title: "Fondement ministériel",
      description:
        "La foi et le ministère au fondement du leadership de Papa Tony, notamment Eagles' Family Assembly et son action pour l'identité, l'intendance, les zones rurales et le mentorat.",
    },
    contact: {
      title: "Échanger sur une opportunité",
      description:
        "Adressez une demande professionnelle à Papa Tony concernant l'immobilier, l'entreprise, le leadership institutionnel, une intervention, une collaboration ou le ministère.",
    },
    privacy: {
      title: "Confidentialité",
      description:
        "Informations de confidentialité relatives à PapaTony.me et à son formulaire de prise de contact professionnelle.",
    },
  },
};

export const pagePath: Record<PageKey, string> = {
  home: "",
  enterprise: "enterprise",
  leadership: "leadership",
  about: "about",
  ministry: "ministry",
  contact: "contact",
  privacy: "privacy",
};

export function localizedPath(locale: Locale, key: PageKey): string {
  const suffix = pagePath[key];
  if (locale === "fr") return suffix ? `/fr/${suffix}` : "/fr";
  return suffix ? `/${suffix}` : "/";
}

export function resolvePage(slug?: string[]): PageKey | null {
  if (!slug || slug.length === 0) return "home";
  if (slug.length !== 1) return null;
  const match = Object.entries(pagePath).find(([, path]) => path === slug[0]);
  return match ? (match[0] as PageKey) : null;
}

export function createPageMetadata(
  locale: Locale,
  key: PageKey,
): Metadata {
  const current = seo[locale][key];
  const canonical = localizedPath(locale, key);
  return {
    title: current.title,
    description: current.description,
    alternates: {
      canonical,
      languages: {
        en: localizedPath("en", key),
        fr: localizedPath("fr", key),
        "x-default": localizedPath("en", key),
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "fr" ? "fr_CM" : "en_CM",
      alternateLocale: locale === "fr" ? ["en_CM"] : ["fr_CM"],
      url: canonical,
      title: current.title,
      description: current.description,
      siteName: SITE_NAME,
      images: [
        {
          url: "/og-v2.jpg",
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} — ${current.title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: current.title,
      description: current.description,
      images: ["/og-v2.jpg"],
    },
  };
}
