"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import GlassCard from "@/components/common/GlassCard";
import GradientHeading from "@/components/common/GradientHeading";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import LoadingSpinner from "@/components/common/LoadingSpinner";

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  image?: string;
  tags: string[];
  category: string;
  status: string;
  featured: boolean;
  liveUrl?: string;
  codeUrl?: string;
}

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data.projects || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <LoadingSpinner size="lg" variant="glass" label="Loading projects..." />
        </div>
      </div>
    );
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

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <GradientHeading>Portfolio</GradientHeading>
          <p className="mt-4 text-dark-400 max-w-2xl mx-auto text-balance">
            A selection of frontend and full-stack projects showcasing my expertise
            in React, TypeScript, Next.js, Prisma, and PostgreSQL.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <GlassCard className="overflow-hidden h-full flex flex-col group">
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
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-dark-400 mb-6">
            Interested in working together? Let&apos;s discuss your project.
          </p>
          <Link href="/contact" className="btn-primary">
            Start a Project
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
