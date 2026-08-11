"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import GlassCard from "@/components/common/GlassCard";
import GradientHeading from "@/components/common/GradientHeading";
import LoadingSpinner from "@/components/common/LoadingSpinner";

const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  excerpt: z.string().optional(),
  content: z.string().min(1, "Content is required"),
  coverImage: z.string().optional(),
  tags: z.string().optional(),
  published: z.boolean().default(false),
  publishedAt: z.string().optional(),
});

type BlogFormData = z.infer<typeof blogSchema>;

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  tags: string;
  published: boolean;
  publishedAt: string | null;
}

export default function EditBlogPage() {
  const params = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
  });

  useEffect(() => {
    if (params.id) {
      fetch(`/api/blog/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.post) {
            reset({
              ...data.post,
              tags: Array.isArray(data.post.tags)
                ? data.post.tags.join(", ")
                : data.post.tags,
            });
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [params.id, reset]);

  const onSubmit = async (data: BlogFormData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const payload = {
        ...data,
        tags: data.tags
          ? data.tags.split(",").map((t) => t.trim()).filter(Boolean)
          : [],
      };

      const response = await fetch(`/api/blog/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        window.location.href = "/admin/blog";
      } else {
        const result = await response.json();
        setError(result.error || "Failed to update blog post");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/blog" className="btn-outline text-sm py-2 px-4 flex items-center gap-2">
          <FaArrowLeft className="w-4 h-4" />
          Back
        </Link>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <GradientHeading className="pb-2">Edit Blog Post</GradientHeading>
        </motion.div>
      </div>

      <GlassCard className="p-6 md:p-8">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-2">
                Title *
              </label>
              <input
                id="title"
                type="text"
                {...register("title")}
                className={`w-full px-4 py-3 rounded-lg bg-dark-800 border ${
                  errors.title ? "border-red-500" : "border-dark-700"
                } text-dark-100 placeholder-dark-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors`}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-400">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="slug" className="block text-sm font-medium mb-2">
                Slug *
              </label>
              <input
                id="slug"
                type="text"
                {...register("slug")}
                className={`w-full px-4 py-3 rounded-lg bg-dark-800 border ${
                  errors.slug ? "border-red-500" : "border-dark-700"
                } text-dark-100 placeholder-dark-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors`}
              />
              {errors.slug && (
                <p className="mt-1 text-sm text-red-400">{errors.slug.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium mb-2">
                Excerpt
              </label>
              <textarea
                id="excerpt"
                rows={3}
                {...register("excerpt")}
                className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-dark-700 text-dark-100 placeholder-dark-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors resize-none"
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium mb-2">
                Content *
              </label>
              <textarea
                id="content"
                rows={12}
                {...register("content")}
                className={`w-full px-4 py-3 rounded-lg bg-dark-800 border ${
                  errors.content ? "border-red-500" : "border-dark-700"
                } text-dark-100 placeholder-dark-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors resize-none font-mono text-sm`}
              />
              {errors.content && (
                <p className="mt-1 text-sm text-red-400">{errors.content.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="coverImage" className="block text-sm font-medium mb-2">
                Cover Image URL
              </label>
              <input
                id="coverImage"
                type="url"
                {...register("coverImage")}
                className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-dark-700 text-dark-100 placeholder-dark-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="tags" className="block text-sm font-medium mb-2">
                Tags (comma-separated)
              </label>
              <input
                id="tags"
                type="text"
                {...register("tags")}
                className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-dark-700 text-dark-100 placeholder-dark-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  {...register("published")}
                  className="w-4 h-4 rounded bg-dark-800 border-dark-700 text-brand-500 focus:ring-brand-500"
                />
                <span className="text-sm">Published</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaSave className="w-4 h-4" />
              {isSubmitting ? "Saving..." : "Save Post"}
            </button>
          </form>
        </GlassCard>
      </>
    );
  }
