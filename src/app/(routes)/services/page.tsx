import type { Metadata } from "next";
import ServicesContent from "@/components/services/ServicesContent";
import { SITE_URL, SITE_DESCRIPTION, OG_IMAGE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web development services including full-stack development with Next.js, API development, database design, and application maintenance.",
  alternates: { canonical: `${SITE_URL}/services` },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${SITE_URL}/services`,
    siteName: "Tinashe Mundieta | Portfolio",
    title: "Services | Tinashe Mundieta",
    description:
      "Web development services including full-stack development with Next.js, API development, database design, and application maintenance.",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | Tinashe Mundieta",
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default function ServicesPage() {
  return <ServicesContent />;
}