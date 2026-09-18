"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaGitAlt,
  FaAws,
  FaLinux,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiPrisma,
  SiPostgresql,
  SiTypescript,
  SiTailwindcss,
  SiDocker,
} from "react-icons/si";
import GlassCard from "@/components/common/GlassCard";
import GradientHeading from "@/components/common/GradientHeading";
import TestimonialsSection, {
  type Testimonial,
} from "@/components/home/TestimonialsSection";

interface HomeContentProps {
  testimonials: Testimonial[];
}

const roles = [
  "Full-Stack Developer",
  "Next.js Specialist",
  "Prisma Expert",
  "PostgreSQL Architect",
  "React Developer",
  "TypeScript Enthusiast",
];

const stats = [
  { value: "3+", label: "Years Experience" },
  { value: "10+", label: "Projects Completed" },
  { value: "98%", label: "Certified Clients" },
  { value: "Remote", label: "Worldwide Availability" },
];

const techStack = [
  { icon: SiNextdotjs, name: "Next.js", color: "text-white" },
  { icon: SiPrisma, name: "Prisma", color: "text-white" },
  { icon: SiPostgresql, name: "PostgreSQL", color: "text-[#336791]" },
  { icon: SiTypescript, name: "TypeScript", color: "text-[#3178c6]" },
  { icon: FaReact, name: "React", color: "text-[#61dafb]" },
  { icon: FaNodeJs, name: "Node.js", color: "text-[#339933]" },
  { icon: SiTailwindcss, name: "Tailwind", color: "text-[#06b6d4]" },
  { icon: FaDatabase, name: "Databases", color: "text-accent-400" },
  { icon: SiDocker, name: "Docker", color: "text-[#2496ed]" },
  { icon: FaGitAlt, name: "Git", color: "text-[#f05032]" },
  { icon: FaAws, name: "AWS", color: "text-[#ff9900]" },
  { icon: FaLinux, name: "Linux", color: "text-[#fcc624]" },
];

export default function HomeContent({ testimonials }: HomeContentProps) {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 via-transparent to-accent-500/10 pointer-events-none" />

      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/hero.webp"
            alt="Hero background"
            fill
            priority
            className="object-cover opacity-40"
            sizes="(max-width: 768px) 100vw, 1280px"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-900/60 via-dark-900/40 to-dark-900/80" />
        </div>
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-2 rounded-full glass-card text-sm text-brand-400 font-medium mb-8">
              Available for freelance &amp; full-time work
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold font-heading mb-6 leading-tight"
          >
            Hi, I&apos;m{" "}
            <span className="gradient-text">Tinashe Mundieta</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl sm:text-2xl md:text-3xl text-dark-400 mb-8 h-12"
          >
            <span className="text-dark-200">I build </span>
            <span className="gradient-text font-semibold">
              {roles[0]}
            </span>
            <span className="text-dark-200"> solutions</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-dark-400 max-w-2xl mx-auto mb-10 text-balance"
          >
            Specializing in Next.js, Prisma, and PostgreSQL to build scalable,
            performant, and maintainable web applications. From database design to
            polished UI, I deliver end-to-end solutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link href="/portfolio" className="btn-primary">
              View My Work
            </Link>
            <Link href="/contact" className="btn-outline">
              Get In Touch
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          >
            {stats.map((stat, index) => (
              <GlassCard key={index} className="p-4 md:p-6 text-center">
                <div className="text-2xl md:text-3xl font-bold gradient-text mb-1">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-dark-400">{stat.label}</div>
              </GlassCard>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <GradientHeading>Tech Stack</GradientHeading>
            <p className="mt-4 text-dark-400 max-w-2xl mx-auto">
              My go-to technologies for building modern, scalable applications
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {techStack.map((tech) => (
              <GlassCard
                key={tech.name}
                className="p-4 md:p-6 text-center group cursor-pointer"
              >
                <tech.icon
                  className={`w-8 h-8 md:w-10 md:h-10 mx-auto mb-3 transition-transform group-hover:scale-110 ${tech.color}`}
                />
                <span className="text-xs md:text-sm text-dark-300 font-medium">
                  {tech.name}
                </span>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection initialTestimonials={testimonials} />
    </div>
  );
}
