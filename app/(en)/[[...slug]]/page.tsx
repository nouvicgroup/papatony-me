import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomePage } from "@/components/HomePage";
import { StandardPage } from "@/components/StandardPage";
import { createPageMetadata, resolvePage } from "@/lib/site";

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = resolvePage(slug);
  return page ? createPageMetadata("en", page) : {};
}

export default async function EnglishPage({ params }: PageProps) {
  const { slug } = await params;
  const page = resolvePage(slug);
  if (!page) notFound();
  return page === "home" ? (
    <HomePage locale="en" />
  ) : (
    <StandardPage locale="en" page={page} />
  );
}
