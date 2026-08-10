import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import NavigationLoader from "@/components/common/NavigationLoader";

export const metadata: Metadata = {
  title: {
    default: "Tinashe Mundieta | Full-Stack Software Developer",
    template: "%s | Tinashe Mundieta",
  },
  description:
    "Full-Stack Software Developer specializing in Next.js, Prisma, PostgreSQL, React, and TypeScript. Building scalable web applications and digital solutions from Harare, Zimbabwe.",
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
  authors: [{ name: "Tinashe Mundieta" }],
  creator: "Tinashe Mundieta",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tinashe-mundieta.vercel.app",
    title: "Tinashe Mundieta | Full-Stack Software Developer",
    description:
      "Full-Stack Software Developer specializing in Next.js, Prisma, PostgreSQL, React, and TypeScript.",
    siteName: "Tinashe Mundieta Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tinashe Mundieta | Full-Stack Software Developer",
    description:
      "Full-Stack Software Developer specializing in Next.js, Prisma, PostgreSQL, React, and TypeScript.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400..600&family=Outfit:wght@300..700&family=Plus+Jakarta+Sans:wght@300..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased bg-dark-900 text-dark-100">
        <NavigationLoader />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
