import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import NavigationLoader from "@/components/common/NavigationLoader";
import JsonLd from "@/components/seo/JsonLd";
import {
  SITE_URL,
  SITE_NAME,
  AUTHOR,
  SITE_DESCRIPTION,
  SOCIALS,
  OG_IMAGE,
  OG_IMAGE_ALT,
  PROFILE_IMAGE,
} from "@/lib/site";

const outfit = localFont({
  src: "./fonts/outfit-var.woff2",
  variable: "--font-outfit",
  display: "swap",
  weight: "100 900",
});
const jakarta = localFont({
  src: "./fonts/jakarta-var.woff2",
  variable: "--font-jakarta",
  display: "swap",
  weight: "400 800",
});

const defaultImage = [
  { url: OG_IMAGE, width: 1200, height: 630, alt: OG_IMAGE_ALT },
  { url: PROFILE_IMAGE, width: 600, height: 600, alt: `${AUTHOR} profile photo` },
];

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${AUTHOR} | Full-Stack Software Developer`,
    template: "%s | Tinashe Mundieta",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Tinashe Mundieta",
    "Full-Stack Developer",
    "Software Developer",
    "Next.js",
    "Prisma",
    "PostgreSQL",
    "React",
    "TypeScript",
    "Node.js",
    "Web Developer",
    "Zimbabwe",
    "Harare",
  ],
  authors: [{ name: AUTHOR }],
  creator: AUTHOR,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: `${AUTHOR} | Full-Stack Software Developer`,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    images: defaultImage,
  },
  twitter: {
    card: "summary_large_image",
    title: `${AUTHOR} | Full-Stack Software Developer`,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  author: {
    "@type": "Person",
    name: AUTHOR,
    url: SITE_URL,
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: AUTHOR,
  url: SITE_URL,
  image: PROFILE_IMAGE,
  jobTitle: "Full-Stack Software Developer",
  email: "mailto:tinashemundieta36@gmail.com",
  sameAs: [SOCIALS.github, SOCIALS.linkedin],
  knowsAbout: [
    "Next.js",
    "React",
    "TypeScript",
    "Prisma",
    "PostgreSQL",
    "Node.js",
    "Full-Stack Development",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Harare",
    addressCountry: "ZW",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${outfit.variable} ${jakarta.variable}`}
    >
      <body className="font-body antialiased bg-dark-900 text-dark-100">
        <JsonLd data={[websiteSchema, personSchema]} />
        <NavigationLoader />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
