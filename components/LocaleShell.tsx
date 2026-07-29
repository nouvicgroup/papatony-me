import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import type { Locale } from "@/lib/site";

interface LocaleShellProps {
  children: React.ReactNode;
  locale: Locale;
}

export function LocaleShell({ children, locale }: LocaleShellProps) {
  return (
    <>
      <SiteHeader locale={locale} />
      {children}
      <SiteFooter locale={locale} />
    </>
  );
}
