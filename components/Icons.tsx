/**
 * Line icon set for navigation and interface affordances, replacing the
 * prototype Unicode symbols (⌂ ◫ ◎ ✦ ↗). All icons share a 24×24 grid, a 1.9
 * stroke, and `currentColor`, so they inherit tab state without extra rules.
 */

interface IconProps {
  className?: string;
}

const base = {
  "aria-hidden": true as const,
  fill: "none",
  focusable: "false" as const,
  height: 24,
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  strokeWidth: 1.9,
  viewBox: "0 0 24 24",
  width: 24,
  xmlns: "http://www.w3.org/2000/svg",
};

export function IconHome({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3.6 10.4 12 3.8l8.4 6.6" />
      <path d="M5.6 12v7.4a.8.8 0 0 0 .8.8h11.2a.8.8 0 0 0 .8-.8V12" />
      <path d="M9.9 20.2v-5.1h4.2v5.1" />
    </svg>
  );
}

export function IconEnterprise({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3.4 20.4h17.2" />
      <path d="M5.6 20.2V6.3l7-2.5v16.4" />
      <path d="M12.6 9.7h5.8v10.5" />
      <path d="M8.3 8.6v1.7M8.3 12.6v1.7M15.5 12.6v1.7" />
    </svg>
  );
}

export function IconLeadership({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="5.6" r="2.4" />
      <circle cx="5.2" cy="17.6" r="2.4" />
      <circle cx="18.8" cy="17.6" r="2.4" />
      <path d="M10.7 7.7 6.5 15.5M13.3 7.7l4.2 7.8M7.6 17.6h8.8" />
    </svg>
  );
}

export function IconMinistry({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 6.7v13" />
      <path d="M12 6.7C10.4 5.3 8.3 4.6 5.4 4.6a.8.8 0 0 0-.8.8v11.4c2.9 0 5 .7 6.6 2.1" />
      <path d="M12 6.7c1.6-1.4 3.7-2.1 6.6-2.1a.8.8 0 0 1 .8.8v11.4c-2.9 0-5 .7-6.6 2.1" />
    </svg>
  );
}

export function IconConnect({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M20.6 3.9 3.7 10.2a.5.5 0 0 0 0 .95l7.05 2.5 2.5 7.05a.5.5 0 0 0 .95 0Z" />
      <path d="m10.75 13.65 4.4-4.4" />
    </svg>
  );
}

/**
 * Brand glyph for the PapaT logotype: the "T" standing clear of a plinth.
 * It reads at once as the letter and as a marker set on a base — carrying the
 * structure/institution idea of the wordmark without illustrating anything.
 * Solid shapes rather than strokes, so the silhouette survives at 16px as a
 * favicon and at 20px in the header lockup.
 */
export function BrandMark({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      focusable="false"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect height="3.4" rx="1.7" width="17.6" x="3.2" y="5.6" />
      <rect height="12" rx="1.7" width="3.4" x="10.3" y="5.6" />
      <rect height="2.8" rx="1.4" width="11.6" x="6.2" y="19.2" />
    </svg>
  );
}
