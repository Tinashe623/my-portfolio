"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import GlassCard from "@/components/common/GlassCard";
import GradientHeading from "@/components/common/GradientHeading";
import { FaExternalLinkAlt, FaGithub, FaArrowLeft } from "react-icons/fa";
import LoadingSpinner from "@/components/common/LoadingSpinner";

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  content?: string;
  image?: string;
  tags: string[];
  category: string;
  status: string;
  featured: boolean;
  liveUrl?: string;
  codeUrl?: string;
}

export default function ProjectPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        const found = (data.projects || []).find((p: Project) => p.slug === slug);
        setProject(found || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <LoadingSpinner size="lg" variant="glass" label="Loading project..." />
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <GradientHeading>Project Not Found</GradientHeading>
          <p className="mt-4 text-dark-400">The project you are looking for does not exist.</p>
          <Link href="/portfolio" className="btn-primary mt-8 inline-flex items-center gap-2">
            <FaArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  const longDescription = project.content || project.description;

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-dark-400 hover:text-brand-400 transition-colors mb-6"
          >
            <FaArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
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
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
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
        </motion.div>
      </div>
    </div>
  );
}
