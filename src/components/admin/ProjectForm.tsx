"use client";

/* eslint-disable @next/next/no-img-element -- admin preview of user-provided remote image */

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaSave } from "react-icons/fa";

const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(1, "Description is required"),
  content: z.string().optional(),
  image: z.string().optional(),
  tags: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  status: z.enum(["completed", "in-progress", "featured"]).default("completed"),
  featured: z.boolean().default(false),
  liveUrl: z.string().optional(),
  codeUrl: z.string().optional(),
  clientName: z.string().optional(),
  testimonial: z.string().optional(),
  testimonialAuthor: z.string().optional(),
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface ProjectFormProps {
  initialValues?: Record<string, unknown>;
  submitLabel: string;
  submittingLabel: string;
  onSubmit: (payload: Record<string, unknown>) => Promise<void>;
}

const inputClass = (hasError: boolean) =>
  `w-full px-4 py-3 rounded-lg bg-dark-800 border ${
    hasError ? "border-red-500" : "border-dark-700"
  } text-dark-100 placeholder-dark-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors`;

export default function ProjectForm({
  initialValues,
  submitLabel,
  submittingLabel,
  onSubmit,
}: ProjectFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      status: "completed",
      featured: false,
      ...(initialValues as Partial<ProjectFormData>),
      tags: Array.isArray(initialValues?.tags)
        ? (initialValues.tags as string[]).join(", ")
        : (initialValues?.tags as string | undefined) ?? "",
    },
  });

  const imageValue = watch("image");

  const handleFormSubmit = async (data: ProjectFormData) => {
    await onSubmit({
      ...data,
      tags: data.tags
        ? data.tags.split(",").map((t) => t.trim()).filter(Boolean)
        : [],
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-2">
          Title *
        </label>
        <input
          id="title"
          type="text"
          {...register("title")}
          className={inputClass(Boolean(errors.title))}
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
          className={inputClass(Boolean(errors.slug))}
          placeholder="my-project"
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
          className={`${inputClass(Boolean(errors.description))} resize-none`}
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
          className={`${inputClass(false)} resize-none`}
          placeholder="Detailed write-up shown on the project page"
        />
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium mb-2">
          Image URL
        </label>
        <input
          id="image"
          type="url"
          {...register("image")}
          className={inputClass(false)}
          placeholder="https://..."
        />
        {imageValue && (
          <img
            src={imageValue}
            alt="Project preview"
            className="mt-3 h-40 w-full object-cover rounded-lg border border-dark-700"
          />
        )}
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
            className={inputClass(Boolean(errors.category))}
            placeholder="Full-Stack"
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
          className={inputClass(false)}
          placeholder="Next.js, Prisma, PostgreSQL"
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
            className={inputClass(false)}
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
            className={inputClass(false)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="clientName" className="block text-sm font-medium mb-2">
            Client Name
          </label>
          <input
            id="clientName"
            type="text"
            {...register("clientName")}
            className={inputClass(false)}
          />
        </div>

        <div>
          <label htmlFor="testimonialAuthor" className="block text-sm font-medium mb-2">
            Testimonial Author
          </label>
          <input
            id="testimonialAuthor"
            type="text"
            {...register("testimonialAuthor")}
            className={inputClass(false)}
            placeholder="Name / role of the person"
          />
        </div>
      </div>

      <div>
        <label htmlFor="testimonial" className="block text-sm font-medium mb-2">
          Testimonial
        </label>
        <textarea
          id="testimonial"
          rows={3}
          {...register("testimonial")}
          className={`${inputClass(false)} resize-none`}
          placeholder="What the client said about working with you"
        />
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
        {isSubmitting ? submittingLabel : submitLabel}
      </button>
    </form>
  );
}