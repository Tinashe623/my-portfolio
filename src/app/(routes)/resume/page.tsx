import type { Metadata } from "next";
import ResumeContent from "@/components/resume/ResumeContent";
import { SITE_URL, AUTHOR, OG_IMAGE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Resume",
  description:
    `Professional resume and CV of ${AUTHOR}. Education, experience, and skills covering full-stack development with Next.js, React, TypeScript, Prisma, and PostgreSQL.`,
  alternates: { canonical: `${SITE_URL}/resume` },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: `${SITE_URL}/resume`,
    siteName: "Tinashe Mundieta | Portfolio",
    title: `Resume | ${AUTHOR}`,
    description:
      "Professional resume and CV covering full-stack development experience and skills.",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `Resume | ${AUTHOR}`,
    description: "Professional resume and CV of Tinashe Mundieta.",
    images: [OG_IMAGE],
  },
};

export default function ResumePage() {
  return <ResumeContent />;
}