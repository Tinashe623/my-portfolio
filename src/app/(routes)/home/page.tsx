import type { Metadata } from "next";
import HomeContent from "@/components/home/HomeContent";
import JsonLd from "@/components/seo/JsonLd";
import { listTestimonials, type TestimonialRow } from "@/lib/db";
import {
  SITE_URL,
  SITE_NAME,
  AUTHOR,
  SITE_DESCRIPTION,
  PROFILE_IMAGE,
  OG_IMAGE,
  OG_IMAGE_ALT,
} from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `${AUTHOR} | Full-Stack Software Developer` },
  description: SITE_DESCRIPTION,
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${AUTHOR} | Full-Stack Software Developer`,
    description: SITE_DESCRIPTION,
    images: [
      { url: OG_IMAGE, width: 1200, height: 630, alt: OG_IMAGE_ALT },
      { url: PROFILE_IMAGE, width: 600, height: 600, alt: `${AUTHOR} profile photo` },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${AUTHOR} | Full-Stack Software Developer`,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

const profileSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: `${AUTHOR} - Portfolio`,
  url: SITE_URL,
  mainEntity: {
    "@id": `${SITE_URL}/#person`,
    "@type": "Person",
    name: AUTHOR,
    url: SITE_URL,
    image: PROFILE_IMAGE,
    jobTitle: "Full-Stack Software Developer",
  },
};

export default async function HomePage() {
  let testimonials: TestimonialRow[] = [];
  try {
    testimonials = (await listTestimonials())
      .filter((t) => t.featured)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 6);
  } catch (error) {
    console.error("Failed to load testimonials:", error);
  }

  return (
    <>
      <JsonLd data={profileSchema} />
      <HomeContent testimonials={testimonials} />
    </>
  );
}