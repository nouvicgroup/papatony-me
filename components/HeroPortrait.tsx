interface HeroPortraitProps {
  alt: string;
}

export function HeroPortrait({ alt }: HeroPortraitProps) {
  return (
    <picture className="hero-picture">
      <source
        media="(max-width: 760px)"
        srcSet="/media/hero-mobile.webp"
      />
      <img
        alt={alt}
        className="media-fill hero-image"
        decoding="async"
        fetchPriority="high"
        src="/media/hero-desktop.webp"
      />
    </picture>
  );
}
