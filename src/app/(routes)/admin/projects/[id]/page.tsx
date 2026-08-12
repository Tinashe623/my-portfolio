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

const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(1, "Description is required"),
  content: z.string().optional(),
  image: z.string().optional(),
  tags: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  status: z.string().default("completed"),
  featured: z.boolean().default(false),
  liveUrl: z.string().optional(),
  codeUrl: z.string().optional(),
  clientName: z.string().optional(),
  testimonial: z.string().optional(),
  testimonialAuthor: z.string().optional(),
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string | null;
  image: string | null;
  tags: string;
  category: string;
  status: string;
  featured: boolean;
  liveUrl: string | null;
  codeUrl: string | null;
  clientName: string | null;
  testimonial: string | null;
  testimonialAuthor: string | null;
}

export default function EditProjectPage() {
  const params = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
  });

  useEffect(() => {
    if (params.id) {
      fetch(`/api/projects/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.project) {
            reset({
              ...data.project,
              tags: Array.isArray(data.project.tags)
                ? data.project.tags.join(", ")
                : data.project.tags,
            });
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [params.id, reset]);

  const onSubmit = async (data: ProjectFormData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const payload = {
        ...data,
        tags: data.tags
          ? data.tags.split(",").map((t) => t.trim()).filter(Boolean)
          : [],
      };

      const response = await fetch(`/api/projects/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        window.location.href = "/admin/projects";
      } else {
        const result = await response.json();
        setError(result.error || "Failed to update project");
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
        <Link href="/admin/projects" className="btn-outline text-sm py-2 px-4 flex items-center gap-2">
          <FaArrowLeft className="w-4 h-4" />
          Back
        </Link>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <GradientHeading className="pb-2">Edit Project</GradientHeading>
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
              <label htmlFor="description" className="block text-sm font-medium mb-2">
                Description *
              </label>
              <textarea
                id="description"
                rows={3}
                {...register("description")}
                className={`w-full px-4 py-3 rounded-lg bg-dark-800 border ${
                  errors.description ? "border-red-500" : "border-dark-700"
                } text-dark-100 placeholder-dark-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors resize-none`}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-400">{errors.description.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium mb-2">
                Content
              </label>
              <textarea
                id="content"
                rows={6}
                {...register("content")}
                className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-dark-700 text-dark-100 placeholder-dark-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="category" className="block text-sm font-medium mb-2">
                  Category *
                </label>
                <input
                  id="category"
                  type="text"
                  {...register("category")}
                  className={`w-full px-4 py-3 rounded-lg bg-dark-800 border ${
                    errors.category ? "border-red-500" : "border-dark-700"
                  } text-dark-100 placeholder-dark-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors`}
                />
                {errors.category && (
                  <p className="mt-1 text-sm text-red-400">{errors.category.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium mb-2">
                  Status
                </label>
                <select
                  id="status"
                  {...register("status")}
                  className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-dark-700 text-dark-100 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
                >
                  <option value="completed">Completed</option>
                  <option value="in-progress">In Progress</option>
                  <option value="featured">Featured</option>
                </select>
              </div>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="liveUrl" className="block text-sm font-medium mb-2">
                  Live URL
                </label>
                <input
                  id="liveUrl"
                  type="url"
                  {...register("liveUrl")}
                  className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-dark-700 text-dark-100 placeholder-dark-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="codeUrl" className="block text-sm font-medium mb-2">
                  Code URL
                </label>
                <input
                  id="codeUrl"
                  type="url"
                  {...register("codeUrl")}
                  className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-dark-700 text-dark-100 placeholder-dark-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  {...register("featured")}
                  className="w-4 h-4 rounded bg-dark-800 border-dark-700 text-brand-500 focus:ring-brand-500"
                />
                <span className="text-sm">Featured Project</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaSave className="w-4 h-4" />
              {isSubmitting ? "Saving..." : "Save Project"}
            </button>
          </form>
        </GlassCard>
      </>
    );
  }
