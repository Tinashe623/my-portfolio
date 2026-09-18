import type { Metadata } from "next";
import ContactContent from "@/components/contact/ContactContent";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_URL, AUTHOR, OG_IMAGE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Tinashe Mundieta for web development projects, freelance work, or collaboration opportunities.",
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${SITE_URL}/contact`,
    siteName: "Tinashe Mundieta | Portfolio",
    title: `Contact | ${AUTHOR}`,
    description:
      "Get in touch with Tinashe Mundieta for web development projects, freelance work, or collaboration opportunities.",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact | ${AUTHOR}`,
    description: "Get in touch with Tinashe Mundieta.",
    images: [OG_IMAGE],
  },
};

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Tinashe Mundieta",
  url: `${SITE_URL}/contact`,
  about: AUTHOR,
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={contactSchema} />
      <ContactContent />
    </>
  );
}