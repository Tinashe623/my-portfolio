"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import GlassCard from "@/components/common/GlassCard";
import GradientHeading from "@/components/common/GradientHeading";
import { FaExternalLinkAlt, FaGithub, FaLock } from "react-icons/fa";

const projects = [
  {
    id: 1,
    title: "GMP Electrical",
    description:
      "Professional business website for GMP Electrical built with React, Vite, TypeScript, and Chakra UI. Features responsive design, service showcase, and contact integration.",
    image: "/images/projects/gmp-preview.webp",
    tags: ["React", "Vite", "TypeScript", "Chakra UI"],
    category: "Frontend",
    status: "completed",
    featured: true,
    liveUrl: "#",
    codeUrl: "#",
  },
  {
    id: 2,
    title: "Tarie Cakes",
    description:
      "Custom bakery storefront built with React + Vite + TypeScript + Chakra UI. Includes product catalog, ordering flow, and responsive mobile-first design.",
    image: "/images/projects/tarie-cakes-preview.webp",
    tags: ["React", "Vite", "TypeScript", "Chakra UI"],
    category: "Frontend",
    status: "completed",
    featured: true,
    liveUrl: "#",
    codeUrl: "#",
  },
  {
    id: 3,
    title: "St James Zongoro Primary",
    description:
      "School website built with React, Vite, TypeScript, and Chakra UI. Designed for accessibility, fast load times, and easy content updates.",
    image: "/images/projects/st-james-zongoro-preview.webp",
    tags: ["React", "Vite", "TypeScript", "Chakra UI"],
    category: "Frontend",
    status: "completed",
    featured: false,
    liveUrl: "#",
    codeUrl: "#",
  },
  {
    id: 4,
    title: "Reigns Hydraulics",
    description:
      "Corporate site for Reigns Hydraulics built with React + Vite + TypeScript + Chakra UI. Focused on performance, SEO, and clean UI.",
    image: "/images/projects/reigns-preview.webp",
    tags: ["React", "Vite", "TypeScript", "Chakra UI"],
    category: "Frontend",
    status: "completed",
    featured: false,
    liveUrl: "#",
    codeUrl: "#",
  },
  {
    id: 5,
    title: "Exquisite Rubble Removal",
    description:
      "Service business website built with React, Vite, TypeScript, and Chakra UI. Features quote requests, gallery, and responsive layout.",
    image: "/images/projects/rubble-removal-preview.webp",
    tags: ["React", "Vite", "TypeScript", "Chakra UI"],
    category: "Frontend",
    status: "completed",
    featured: false,
    liveUrl: "#",
    codeUrl: "#",
  },
  {
    id: 6,
    title: "Personal Portfolio",
    description:
      "This portfolio website built with Next.js, TypeScript, Tailwind CSS, Prisma, and PostgreSQL. A full-stack application with admin dashboard and blog.",
    image: "/images/projects/temp-preview.webp",
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    category: "Full-Stack",
    status: "completed",
    featured: true,
    liveUrl: "#",
    codeUrl: "#",
  },
  {
    id: 7,
    title: "Inventory Management System",
    description:
      "Full-stack inventory management system with barcode scanning, stock alerts, and reporting dashboard. Coming soon.",
    image: "/images/projects/clock-preview.webp",
    tags: ["Next.js", "Prisma", "PostgreSQL", "PWA"],
    category: "Full-Stack",
    status: "in-progress",
    featured: false,
    liveUrl: "#",
    codeUrl: "#",
  },
];

export default function PortfolioPage() {
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
                <div className="relative h-48 bg-dark-800 overflow-hidden">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-dark-600">
                      No Image
                    </div>
                  )}
                  {project.status === "in-progress" && (
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

                <div className="p-6 flex-grow flex flex-col">
                  <span className="text-xs text-brand-400 font-medium mb-2">{project.category}</span>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-brand-400 transition-colors">
                    {project.title}
                  </h3>
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
