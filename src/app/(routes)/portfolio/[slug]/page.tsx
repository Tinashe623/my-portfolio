import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import GlassCard from "@/components/common/GlassCard";
import JsonLd from "@/components/seo/JsonLd";
import { FaExternalLinkAlt, FaGithub, FaArrowLeft } from "react-icons/fa";
import { findProjectBySlug, listProjects, type ProjectRow } from "@/lib/db";
import { SITE_URL, AUTHOR, SITE_NAME, OG_IMAGE } from "@/lib/site";


export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const projects = await listProjects();
    return projects.map((project) => ({ slug: project.slug }));
  } catch (error) {
    console.error("Failed to generate static params for portfolio:", error);
    return [];
  }
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  let project: ProjectRow | null = null;
  try {
    project = await findProjectBySlug(slug);
  } catch (error) {
    console.error("Failed to load project for metadata:", error);
  }

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `${SITE_URL}/portfolio/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
      url: `${SITE_URL}/portfolio/${project.slug}`,
      siteName: SITE_NAME,
      images: project.image
        ? [{ url: project.image, alt: project.title }]
        : [{ url: OG_IMAGE, width: 1200, height: 630, alt: project.title }],
      tags: project.tags,
    },
    twitter: {
      title: project.title,
      description: project.description,
      images: project.image ? [project.image] : [OG_IMAGE],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  let project: ProjectRow | null = null;
  try {
    project = await findProjectBySlug(slug);
  } catch (error) {
    console.error("Failed to load project:", error);
  }

  if (!project) {
    notFound();
  }

  const longDescription = project.content || project.description;

  const projectUrl = `${SITE_URL}/portfolio/${project.slug}`;

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: longDescription,
    url: projectUrl,
    image: project.image ?? undefined,
    keywords: project.tags.join(", "),
    dateCreated: project.createdAt,
    dateModified: project.updatedAt,
    author: {
      "@type": "Person",
      name: AUTHOR,
      url: SITE_URL,
    },
    creator: {
      "@type": "Person",
      name: AUTHOR,
      url: SITE_URL,
    },
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Portfolio",
        item: `${SITE_URL}/portfolio`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: project.title,
        item: projectUrl,
      },
    ],
  };

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <JsonLd data={[projectSchema, breadcrumbSchema]} />
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-dark-400 hover:text-brand-400 transition-colors mb-6"
          >
            <FaArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>
        </div>

        <div>
          <GlassCard className="overflow-hidden">
            <div className="relative h-64 md:h-96 bg-dark-800 overflow-hidden">
              {project.slug === "personal-portfolio" ? (
                <div className="terminal-thumbnail">
                  <div className="terminal-dots">
                    <div className="terminal-dot"></div>
                    <div className="terminal-dot"></div>
                    <div className="terminal-dot"></div>
                  </div>
                  <div className="terminal-content">
                    <div className="terminal-line">
                      <span className="terminal-prompt">$</span>
                      <span className="terminal-text">npm create next-app</span>
                    </div>
                    <div className="terminal-line">
                      <span className="terminal-prompt">$</span>
                      <span className="terminal-text">npx prisma migrate</span>
                    </div>
                    <div className="terminal-line">
                      <span className="terminal-prompt">$</span>
                      <span className="terminal-text">npm run dev</span>
                      <span className="terminal-cursor"></span>
                    </div>
                  </div>
                  <div className="terminal-particles">
                    <div className="terminal-particle">{ }</div>
                    <div className="terminal-particle">&lt;/&gt;</div>
                    <div className="terminal-particle">{ }</div>
                    <div className="terminal-particle">&lt;/&gt;</div>
                    <div className="terminal-particle">{ }</div>
                  </div>
                </div>
              ) : project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="project-placeholder">
                  <div className="project-placeholder-grid" />
                  <div className="project-placeholder-shapes">
                    <div className="project-placeholder-shape" />
                    <div className="project-placeholder-shape" />
                    <div className="project-placeholder-shape" />
                    <div className="project-placeholder-shape" />
                    <div className="project-placeholder-shape" />
                  </div>
                  <div className="project-placeholder-dots">
                    <div className="project-placeholder-dot" />
                    <div className="project-placeholder-dot" />
                    <div className="project-placeholder-dot" />
                    <div className="project-placeholder-dot" />
                    <div className="project-placeholder-dot" />
                    <div className="project-placeholder-dot" />
                    <div className="project-placeholder-dot" />
                    <div className="project-placeholder-dot" />
                  </div>
                  <div className="project-placeholder-content">
                    <div className="project-placeholder-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                    </div>
                    <span className="project-placeholder-label">Coming Soon</span>
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                <span className="text-xs text-brand-400 font-medium mb-2 block">
                  {project.category}
                </span>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                  {project.title}
                </h1>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full bg-brand-500/10 text-brand-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 md:p-10">
              <p className="text-dark-400 text-lg mb-8 leading-relaxed">
                {longDescription}
              </p>

              <div className="flex flex-wrap gap-4">
                {project.liveUrl && project.liveUrl !== "#" && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-sm py-3 px-6 inline-flex items-center gap-2"
                  >
                    <FaExternalLinkAlt className="w-4 h-4" />
                    Live Demo
                  </a>
                )}
                {project.codeUrl && project.codeUrl !== "#" && (
                  <a
                    href={project.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline text-sm py-3 px-6 inline-flex items-center gap-2"
                  >
                    <FaGithub className="w-4 h-4" />
                    View Code
                  </a>
                )}
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}