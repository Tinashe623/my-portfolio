"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaSave } from "react-icons/fa";

const skillSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  level: z.enum(["beginner", "intermediate", "advanced"]).default("intermediate"),
  icon: z.string().optional(),
  description: z.string().optional(),
  featured: z.boolean().default(true),
  order: z.coerce.number().int().min(0).default(0),
});

type SkillFormData = z.infer<typeof skillSchema>;

interface SkillFormProps {
  initialValues?: Record<string, unknown>;
  submitLabel: string;
  submittingLabel: string;
  onSubmit: (payload: Record<string, unknown>) => Promise<void>;
}

const inputClass = (hasError: boolean) =>
  `w-full px-4 py-3 rounded-lg bg-dark-800 border ${
    hasError ? "border-red-500" : "border-dark-700"
  } text-dark-100 placeholder-dark-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors`;

export default function SkillForm({
  initialValues,
  submitLabel,
  submittingLabel,
  onSubmit,
}: SkillFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SkillFormData>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      level: "intermediate",
      featured: true,
      order: 0,
      ...(initialValues as Partial<SkillFormData>),
    },
  });

  const handleFormSubmit = async (data: SkillFormData) => {
    await onSubmit({
      ...data,
      icon: data.icon || null,
      description: data.description || null,
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Name *
          </label>
          <input
            id="name"
            type="text"
            {...register("name")}
            className={inputClass(Boolean(errors.name))}
            placeholder="Next.js"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium mb-2">
            Category *
          </label>
          <input
            id="category"
            type="text"
            {...register("category")}
            className={inputClass(Boolean(errors.category))}
            placeholder="frontend"
          />
          {errors.category && (
            <p className="mt-1 text-sm text-red-400">{errors.category.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="level" className="block text-sm font-medium mb-2">
            Level
          </label>
          <select
            id="level"
            {...register("level")}
            className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-dark-700 text-dark-100 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <div>
          <label htmlFor="order" className="block text-sm font-medium mb-2">
            Display Order
          </label>
          <input
            id="order"
            type="number"
            min="0"
            {...register("order")}
            className={inputClass(false)}
          />
        </div>
      </div>

      <div>
        <label htmlFor="icon" className="block text-sm font-medium mb-2">
          Icon (optional)
        </label>
        <input
          id="icon"
          type="text"
          {...register("icon")}
          className={inputClass(false)}
          placeholder="nextdotjs, react, typescript, nodejs, prisma, postgresql, javascript, tailwindcss, docker, git, linux, windows"
        />
        <p className="mt-1 text-xs text-dark-500">
          Use one of the supported icon names shown in the placeholder.
        </p>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-2">
          Description (optional)
        </label>
        <textarea
          id="description"
          rows={3}
          {...register("description")}
          className={`${inputClass(false)} resize-none`}
          placeholder="A short note about this skill"
        />
      </div>

      <div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            {...register("featured")}
            className="w-4 h-4 rounded bg-dark-800 border-dark-700 text-brand-500 focus:ring-brand-500"
          />
          <span className="text-sm">Featured on public profile</span>
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