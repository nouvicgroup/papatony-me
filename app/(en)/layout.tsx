import type { Metadata } from "next";
import { LocaleShell } from "@/components/LocaleShell";
import {
  personSchema,
  rootMetadata,
  websiteSchema,
} from "@/lib/site";
import { serverSiteKey } from "@/lib/turnstile";
import "../globals.css";

export const metadata: Metadata = rootMetadata;

export default function EnglishLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__TURNSTILE_SITE_KEY__=${JSON.stringify(serverSiteKey())}`,
          }}
        />
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <LocaleShell locale="en">{children}</LocaleShell>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
