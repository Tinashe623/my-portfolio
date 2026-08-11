"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import GlassCard from "@/components/common/GlassCard";
import GradientHeading from "@/components/common/GradientHeading";
import { FaCalendar, FaTag, FaArrowRight } from "react-icons/fa";
import LoadingSpinner from "@/components/common/LoadingSpinner";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  tags: string[];
  published: boolean;
  publishedAt?: string;
  createdAt: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blog")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.posts || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <LoadingSpinner size="lg" variant="glass" label="Loading articles..." />
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <GradientHeading className="pb-2">Blog</GradientHeading>
          <p className="mt-4 text-dark-400">No articles published yet. Check back later!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <GradientHeading className="pb-2">Blog</GradientHeading>
          <p className="mt-4 text-dark-400 max-w-2xl mx-auto text-balance">
            Thoughts, tutorials, and insights on full-stack development with Next.js,
            Prisma, PostgreSQL, and modern web technologies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={`/blog/${post.slug}`}>
                <GlassCard className="p-6 md:p-8 h-full flex flex-col group cursor-pointer">
                  <div className="flex items-center gap-4 text-sm text-dark-500 mb-4">
                    {post.publishedAt && (
                      <span className="flex items-center gap-1">
                        <FaCalendar className="w-4 h-4" />
                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    )}
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
              </Link>
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
