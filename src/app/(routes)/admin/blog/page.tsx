"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowLeft, FaNewspaper, FaEdit, FaTrash } from "react-icons/fa";
import GlassCard from "@/components/common/GlassCard";
import GradientHeading from "@/components/common/GradientHeading";
import SkeletonLoader from "@/components/common/SkeletonLoader";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
}

export default function AdminBlogPage() {
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

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <GradientHeading>Manage Blog</GradientHeading>
          <p className="mt-2 text-dark-400">Create and manage blog posts</p>
        </motion.div>
        <div className="flex gap-4">
          <Link href="/admin" className="btn-outline text-sm py-2 px-4 flex items-center gap-2">
            <FaArrowLeft className="w-4 h-4" />
            Dashboard
          </Link>
          <Link href="/admin/blog/new" className="btn-primary text-sm py-2 px-4 flex items-center gap-2">
            <FaNewspaper className="w-4 h-4" />
            New Post
          </Link>
        </div>
      </div>

      {loading ? (
        <SkeletonLoader type="list" count={4} />
      ) : posts.length === 0 ? (
        <GlassCard className="p-12 text-center">
          <FaNewspaper className="w-12 h-12 text-dark-600 mx-auto mb-4" />
          <p className="text-dark-400 mb-4">No blog posts yet. Create your first post!</p>
          <Link href="/admin/blog/new" className="btn-primary">
            Create Post
          </Link>
        </GlassCard>
      ) : (
        <div className="space-y-4">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
            >
              <GlassCard className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold">{post.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        post.published
                          ? "bg-green-500/10 text-green-400"
                          : "bg-yellow-500/10 text-yellow-400"
                      }`}>
                        {post.published ? "Published" : "Draft"}
                      </span>
                    </div>
                    <p className="text-sm text-dark-400 mb-2">/{post.slug}</p>
                    {post.publishedAt && (
                      <p className="text-xs text-dark-500">
                        Published: {new Date(post.publishedAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/blog/${post.id}`}
                      className="btn-outline text-xs py-1 px-3 flex items-center gap-1"
                    >
                      <FaEdit className="w-3 h-3" />
                      Edit
                    </Link>
                    <button className="text-red-400 hover:text-red-300 text-xs py-1 px-3 flex items-center gap-1">
                      <FaTrash className="w-3 h-3" />
                      Delete
                    </button>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      )}
    </>
  );
}
