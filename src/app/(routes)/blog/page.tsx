"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import GlassCard from "@/components/common/GlassCard";
import GradientHeading from "@/components/common/GradientHeading";
import { FaCalendar, FaTag, FaArrowRight } from "react-icons/fa";

const blogPosts = [
  {
    id: 1,
    title: "Getting Started with Next.js 14 and Server Actions",
    excerpt:
      "Learn how to build modern web applications with Next.js 14, exploring Server Actions, App Router, and the latest features.",
    date: "2025-01-15",
    tags: ["Next.js", "React", "Full-Stack"],
    readTime: "8 min read",
  },
  {
    id: 2,
    title: "Prisma + PostgreSQL: A Perfect Match for Modern Apps",
    excerpt:
      "Discover why Prisma and PostgreSQL are the go-to stack for building scalable database-backed applications.",
    date: "2025-01-08",
    tags: ["Prisma", "PostgreSQL", "Database"],
    readTime: "6 min read",
  },
  {
    id: 3,
    title: "Building Type-Safe APIs with Zod and Next.js",
    excerpt:
      "How to implement runtime validation and type safety in your Next.js applications using Zod schemas.",
    date: "2024-12-20",
    tags: ["TypeScript", "Zod", "API"],
    readTime: "5 min read",
  },
  {
    id: 4,
    title: "Deploying Full-Stack Apps to Vercel with PostgreSQL",
    excerpt:
      "A step-by-step guide to deploying your Next.js + Prisma + PostgreSQL application to Vercel with a Neon database.",
    date: "2024-12-10",
    tags: ["Vercel", "Deployment", "PostgreSQL"],
    readTime: "7 min read",
  },
];

export default function BlogPage() {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <GradientHeading>Blog</GradientHeading>
          <p className="mt-4 text-dark-400 max-w-2xl mx-auto text-balance">
            Thoughts, tutorials, and insights on full-stack development with Next.js,
            Prisma, PostgreSQL, and modern web technologies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <GlassCard className="p-6 md:p-8 h-full flex flex-col group cursor-pointer">
                <div className="flex items-center gap-4 text-sm text-dark-500 mb-4">
                  <span className="flex items-center gap-1">
                    <FaCalendar className="w-4 h-4" />
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="text-xl font-bold mb-3 group-hover:text-brand-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-dark-400 text-sm mb-6 flex-grow">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded-full bg-dark-800 text-dark-300 flex items-center gap-1"
                      >
                        <FaTag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-brand-400 group-hover:translate-x-1 transition-transform">
                    <FaArrowRight className="w-4 h-4" />
                  </span>
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
          <p className="text-dark-400">
            More articles coming soon. Check back later for the latest insights on full-stack development.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
