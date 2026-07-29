import { MEDIA } from "@/lib/site";

interface HeroPortraitProps {
  alt: string;
}

/**
 * Two approved portraits with different compositions: a seated wood-panelled
 * office frame for the wide desktop panel, and a standing marble-wall portrait
 * whose 2:3 crop suits the phone hero.
 */
export function HeroPortrait({ alt }: HeroPortraitProps) {
  return (
    <picture className="hero-picture">
      <source media="(max-width: 760px)" srcSet={MEDIA.heroMobile} />
      <img
        alt={alt}
        className="media-fill hero-image"
        decoding="async"
        fetchPriority="high"
        src={MEDIA.heroDesktop}
      />
    </picture>
  );
}
