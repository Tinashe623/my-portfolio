import AboutContent from "@/components/about/AboutContent";
import JsonLd from "@/components/seo/JsonLd";
import { listSkills, type SkillRow } from "@/lib/db";
import {
  SITE_URL,
  AUTHOR,
  PROFILE_IMAGE,
  SITE_DESCRIPTION,
} from "@/lib/site";

export const metadata = {
  title: "About",
  description:
    "Full-Stack Software Developer passionate about building scalable web applications with modern technologies.",
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: `${SITE_URL}/about`,
    siteName: "Tinashe Mundieta | Portfolio",
    title: `About | ${AUTHOR}`,
    description: SITE_DESCRIPTION,
    images: [{ url: PROFILE_IMAGE, width: 600, height: 600, alt: `${AUTHOR} profile photo` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `About | ${AUTHOR}`,
    description: SITE_DESCRIPTION,
    images: [PROFILE_IMAGE],
  },
};

const profileSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: `About ${AUTHOR}`,
  url: `${SITE_URL}/about`,
  mainEntity: {
    "@type": "Person",
    name: AUTHOR,
    url: SITE_URL,
    image: PROFILE_IMAGE,
    jobTitle: "Full-Stack Software Developer",
  },
};

export default async function AboutPage() {
  let skills: SkillRow[] = [];
  try {
    skills = (await listSkills())
      .filter((skill) => skill.featured)
      .sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error("Failed to load skills:", error);
  }

  return (
    <div>
      <JsonLd data={profileSchema} />
      <AboutContent skills={skills} />
    </div>
  );
}