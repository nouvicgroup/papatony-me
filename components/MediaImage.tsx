/* eslint-disable @next/next/no-img-element */

interface MediaImageProps {
  alt: string;
  className?: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  src: string;
}

export function MediaImage({
  alt,
  className,
  priority = false,
  sizes,
  src,
}: MediaImageProps) {
  const classes = className ? `media-fill ${className}` : "media-fill";
  return (
    <img
      alt={alt}
      className={classes}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      loading={priority ? "eager" : "lazy"}
      sizes={sizes}
      src={src}
    />
  );
}
