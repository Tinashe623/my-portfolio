"use client";

/* eslint-disable @next/next/no-img-element -- admin preview of user-provided remote image */

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaSave } from "react-icons/fa";

const testimonialSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  company: z.string().min(1, "Company is required"),
  content: z.string().min(1, "Testimonial is required"),
  avatar: z.string().optional(),
  rating: z.coerce.number().int().min(1).max(5).default(5),
  featured: z.boolean().default(false),
});

type TestimonialFormData = z.infer<typeof testimonialSchema>;

interface TestimonialFormProps {
  initialValues?: Record<string, unknown>;
  submitLabel: string;
  submittingLabel: string;
  onSubmit: (payload: Record<string, unknown>) => Promise<void>;
}

const inputClass = (hasError: boolean) =>
  `w-full px-4 py-3 rounded-lg bg-dark-800 border ${
    hasError ? "border-red-500" : "border-dark-700"
  } text-dark-100 placeholder-dark-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors`;

export default function TestimonialForm({
  initialValues,
  submitLabel,
  submittingLabel,
  onSubmit,
}: TestimonialFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TestimonialFormData>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      rating: 5,
      featured: false,
      ...(initialValues as Partial<TestimonialFormData>),
    },
  });

  const handleFormSubmit = async (data: TestimonialFormData) => {
    await onSubmit({
      ...data,
      avatar: data.avatar || null,
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Name *
        </label>
        <input
          id="name"
          type="text"
          {...register("name")}
          className={inputClass(Boolean(errors.name))}
          placeholder="George Mundieta"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="role" className="block text-sm font-medium mb-2">
            Role *
          </label>
          <input
            id="role"
            type="text"
            {...register("role")}
            className={inputClass(Boolean(errors.role))}
            placeholder="Director"
          />
          {errors.role && (
            <p className="mt-1 text-sm text-red-400">{errors.role.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium mb-2">
            Company *
          </label>
          <input
            id="company"
            type="text"
            {...register("company")}
            className={inputClass(Boolean(errors.company))}
            placeholder="GMP Electrical"
          />
          {errors.company && (
            <p className="mt-1 text-sm text-red-400">{errors.company.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium mb-2">
          Testimonial *
        </label>
        <textarea
          id="content"
          rows={5}
          {...register("content")}
          className={`${inputClass(Boolean(errors.content))} resize-none`}
          placeholder="What they said about working with you"
        />
        {errors.content && (
          <p className="mt-1 text-sm text-red-400">{errors.content.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="avatar" className="block text-sm font-medium mb-2">
          Avatar URL (optional)
        </label>
        <input
          id="avatar"
          type="url"
          {...register("avatar")}
          className={inputClass(false)}
          placeholder="https://..."
        />
        {watch("avatar") && (
          <img
            src={watch("avatar") || ""}
            alt="Avatar preview"
            className="mt-3 h-16 w-16 rounded-full object-cover border border-dark-700"
          />
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div>
          <label htmlFor="rating" className="block text-sm font-medium mb-2">
            Rating
          </label>
          <select
            id="rating"
            {...register("rating")}
            className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-dark-700 text-dark-100 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
          >
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>
                {n} star{n === 1 ? "" : "s"}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="flex items-center gap-2 cursor-pointer pt-8">
            <input
              type="checkbox"
              {...register("featured")}
              className="w-4 h-4 rounded bg-dark-800 border-dark-700 text-brand-500 focus:ring-brand-500"
            />
            <span className="text-sm">Featured Testimonial</span>
          </label>
        </div>
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