import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import GlassCard from "@/components/common/GlassCard";
import GradientHeading from "@/components/common/GradientHeading";
import JsonLd from "@/components/seo/JsonLd";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { listProjects, type ProjectRow } from "@/lib/db";
import { SITE_URL, SITE_NAME, OG_IMAGE } from "@/lib/site";


export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Portfolio",
    description:
      "A selection of frontend and full-stack projects showcasing expertise in React, TypeScript, Next.js, Prisma, and PostgreSQL.",
    alternates: { canonical: `${SITE_URL}/portfolio` },
    openGraph: {
      title: "Portfolio",
      description:
        "A selection of frontend and full-stack projects showcasing expertise in React, TypeScript, Next.js, Prisma, and PostgreSQL.",
      url: `${SITE_URL}/portfolio`,
      siteName: SITE_NAME,
      type: "website",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: "Portfolio | Tinashe Mundieta",
      description:
        "A selection of frontend and full-stack projects showcasing expertise in React, TypeScript, Next.js, Prisma, and PostgreSQL.",
      images: [OG_IMAGE],
    },
  };
}

export default async function PortfolioPage() {
  let projects: ProjectRow[] = [];
  try {
    projects = await listProjects();
  } catch (error) {
    console.error("Failed to load projects:", error);
  }

  if (projects.length === 0) {
    return (
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <GradientHeading>Portfolio</GradientHeading>
          <p className="mt-4 text-dark-400">No projects found. Check back later!</p>
        </div>
      </div>
    );
  }

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Portfolio | Tinashe Mundieta",
    url: `${SITE_URL}/portfolio`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: project.title,
        url: `${SITE_URL}/portfolio/${project.slug}`,
      })),
    },
  };

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <JsonLd data={collectionSchema} />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <GradientHeading>Portfolio</GradientHeading>
          <p className="mt-4 text-dark-400 max-w-2xl mx-auto text-balance">
            A selection of frontend and full-stack projects showcasing my expertise
            in React, TypeScript, Next.js, Prisma, and PostgreSQL.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <GlassCard
              key={project.id}
              className="overflow-hidden h-full flex flex-col group"
            >
                <Link href={`/portfolio/${project.slug}`} className="block">
                  <div className="relative h-48 bg-dark-800 overflow-hidden">
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
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
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
                    {project.status === "in-progress" && project.slug !== "personal-portfolio" && (
                      <span className="absolute top-4 right-4 bg-yellow-500/20 text-yellow-400 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                        <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                        Coming Soon
                      </span>
                    )}
                    {project.featured && (
                      <span className="absolute top-4 left-4 bg-brand-500/20 text-brand-400 text-xs font-bold px-3 py-1 rounded-full">
                        Featured
                      </span>
                    )}
                  </div>
                </Link>

                <div className="p-6 flex-grow flex flex-col">
                  <Link href={`/portfolio/${project.slug}`} className="block mb-2">
                    <span className="text-xs text-brand-400 font-medium">{project.category}</span>
                    <h3 className="text-xl font-bold group-hover:text-brand-400 transition-colors">
                      {project.title}
                    </h3>
                  </Link>
                  <p className="text-dark-400 text-sm mb-4 flex-grow">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded-full bg-dark-800 text-dark-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary text-sm py-2 px-4 flex items-center gap-2"
                      >
                        <FaExternalLinkAlt className="w-3 h-3" />
                        Live Demo
                      </a>
                    )}
                    {project.codeUrl && (
                      <a
                        href={project.codeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline text-sm py-2 px-4 flex items-center gap-2"
                      >
                        <FaGithub className="w-3 h-3" />
                        Code
                      </a>
                    )}
                  </div>
                </div>
              </GlassCard>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-dark-400 mb-6">
            Interested in working together? Let&apos;s discuss your project.
          </p>
          <Link href="/contact" className="btn-primary">
            Start a Project
          </Link>
        </div>
      </div>
    </div>
  );
}