"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import GlassCard from "@/components/common/GlassCard";
import GradientHeading from "@/components/common/GradientHeading";
import { FaExternalLinkAlt, FaGithub, FaArrowLeft } from "react-icons/fa";

const projects = [
  {
    id: 1,
    title: "GMP Electrical",
    slug: "gmp-electrical",
    description:
      "Professional business website for GMP Electrical built with React, Vite, TypeScript, and Chakra UI. Features responsive design, service showcase, and contact integration.",
    longDescription:
      "GMP Electrical is a professional business website designed to showcase electrical and solar services. Built with React, Vite, TypeScript, and Chakra UI, it features a responsive design, service showcase, and contact integration. The site emphasizes clean UI and performance.",
    image: "/images/projects/gmp-preview.webp",
    tags: ["React", "Vite", "TypeScript", "Chakra UI"],
    category: "Frontend",
    status: "completed",
    featured: true,
    liveUrl: "https://gmp-electrical-solutions.vercel.app/",
    codeUrl: "https://github.com/Tinashe623/gmp-electrical-solutions",
  },
  {
    id: 2,
    title: "Tarie Cakes",
    slug: "tarie-cakes",
    description:
      "Custom bakery storefront built with React + Vite + TypeScript + Chakra UI. Includes product catalog, ordering flow, and responsive mobile-first design.",
    longDescription:
      "Tarie Cakes is a custom bakery storefront featuring a product catalog, ordering flow, and responsive mobile-first design. Built with React, Vite, TypeScript, and Chakra UI, it provides a warm, inviting UI with smooth animations.",
    image: "/images/projects/tarie-cakes-preview.webp",
    tags: ["React", "Vite", "TypeScript", "Chakra UI"],
    category: "Frontend",
    status: "completed",
    featured: true,
    liveUrl: "https://tarie-cakes.vercel.app",
    codeUrl: "https://github.com/Tinashe623/Cake-store-project",
  },
  {
    id: 3,
    title: "St James Zongoro Primary",
    slug: "st-james-zongoro-primary",
    description:
      "School website built with React, Vite, TypeScript, and Chakra UI. Designed for accessibility, fast load times, and easy content updates.",
    longDescription:
      "Official school website for St James Zongoro Primary School with admissions, events, and information portal. Built with React, Vite, TypeScript, and Chakra UI, designed for accessibility, fast load times, and easy content updates.",
    image: "/images/projects/st-james-zongoro-preview.webp",
    tags: ["React", "Vite", "TypeScript", "Chakra UI"],
    category: "Frontend",
    status: "completed",
    featured: false,
    liveUrl: "https://zongoro-primary.vercel.app/",
    codeUrl: "https://github.com/Tinashe623/zongoro-primary",
  },
  {
    id: 4,
    title: "Personal Portfolio",
    slug: "personal-portfolio",
    description:
      "This portfolio website built with Next.js, TypeScript, Tailwind CSS, Prisma, and PostgreSQL. A full-stack application with admin dashboard and blog.",
    longDescription:
      "Modern, aesthetically driven professional portfolio showcasing projects and skills with premium glassmorphism design. Built with Next.js, TypeScript, Tailwind CSS, Prisma, and PostgreSQL. A full-stack application with admin dashboard and blog.",
    image: "/images/projects/temp-preview.webp",
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    category: "Full-Stack",
    status: "completed",
    featured: true,
    liveUrl: "https://tinashe-mundieta.vercel.app",
    codeUrl: "https://github.com/Tinashe623/my-portfolio",
  },
];

export default function ProjectPage() {
  const params = useParams();
  const slug = params.slug as string;
  const project = projects.find((p) => p.slug === slug);

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
              ) : (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
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
                {project.longDescription}
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
