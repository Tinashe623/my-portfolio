"use client";

/* eslint-disable @next/next/no-img-element -- admin preview of user-provided remote image */

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { FaSave, FaEye, FaEyeSlash } from "react-icons/fa";

const certificateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  issuer: z.string().min(1, "Issuer is required"),
  issueDate: z.string().min(1, "Issue date is required"),
  expiryDate: z.string().optional(),
  credentialId: z.string().optional(),
  credentialUrl: z.string().optional(),
  image: z.string().optional(),
  description: z.string().optional(),
  tags: z.string().optional(),
  verified: z.boolean().default(true),
});

type CertificateFormData = z.infer<typeof certificateSchema>;

interface CertificateFormProps {
  initialValues?: Record<string, unknown>;
  submitLabel: string;
  submittingLabel: string;
  onSubmit: (payload: Record<string, unknown>) => Promise<void>;
}

const inputClass = (hasError: boolean) =>
  `w-full px-4 py-3 rounded-lg bg-dark-800 border ${
    hasError ? "border-red-500" : "border-dark-700"
  } text-dark-100 placeholder-dark-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors`;

export default function CertificateForm({
  initialValues,
  submitLabel,
  submittingLabel,
  onSubmit,
}: CertificateFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CertificateFormData>({
    resolver: zodResolver(certificateSchema),
    defaultValues: {
      verified: true,
      ...(initialValues as Partial<CertificateFormData>),
      tags: Array.isArray(initialValues?.tags)
        ? (initialValues.tags as string[]).join(", ")
        : (initialValues?.tags as string | undefined) ?? "",
    },
  });

  const [showUrl, setShowUrl] = useState(false);

  const handleFormSubmit = async (data: CertificateFormData) => {
    await onSubmit({
      ...data,
      expiryDate: data.expiryDate || null,
      credentialId: data.credentialId || null,
      credentialUrl: data.credentialUrl || null,
      image: data.image || null,
      description: data.description || null,
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="slug" className="block text-sm font-medium mb-2">
            Slug *
          </label>
          <input
            id="slug"
            type="text"
            {...register("slug")}
            className={inputClass(Boolean(errors.slug))}
            placeholder="html5-certified"
          />
          {errors.slug && (
            <p className="mt-1 text-sm text-red-400">{errors.slug.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="issuer" className="block text-sm font-medium mb-2">
            Issuer *
          </label>
          <input
            id="issuer"
            type="text"
            {...register("issuer")}
            className={inputClass(Boolean(errors.issuer))}
            placeholder="W3Schools"
          />
          {errors.issuer && (
            <p className="mt-1 text-sm text-red-400">{errors.issuer.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="issueDate" className="block text-sm font-medium mb-2">
            Issue Date *
          </label>
          <input
            id="issueDate"
            type="date"
            {...register("issueDate")}
            className={inputClass(Boolean(errors.issueDate))}
          />
          {errors.issueDate && (
            <p className="mt-1 text-sm text-red-400">
              {errors.issueDate.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="expiryDate" className="block text-sm font-medium mb-2">
            Expiry Date (optional)
          </label>
          <input
            id="expiryDate"
            type="date"
            {...register("expiryDate")}
            className={inputClass(false)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="credentialId" className="block text-sm font-medium mb-2">
            Credential ID
          </label>
          <input
            id="credentialId"
            type="text"
            {...register("credentialId")}
            className={inputClass(false)}
            placeholder="w3html2024"
          />
        </div>

        <div>
          <label htmlFor="credentialUrl" className="block text-sm font-medium mb-2">
            Verification URL
          </label>
          <div className="relative">
            <input
              id="credentialUrl"
              type={showUrl ? "text" : "password"}
              {...register("credentialUrl")}
              className={`${inputClass(false)} pr-12`}
              placeholder="https://verify..."
            />
            <button
              type="button"
              onClick={() => setShowUrl((s) => !s)}
              aria-label={showUrl ? "Hide URL" : "Show URL"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-500 hover:text-dark-300"
            >
              {showUrl ? (
                <FaEyeSlash className="w-4 h-4" />
              ) : (
                <FaEye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
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
        {watch("image") && (
          <img
            src={watch("image") || ""}
            alt="Certificate preview"
            className="mt-3 h-40 w-full object-cover rounded-lg border border-dark-700"
          />
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-2">
          Description
        </label>
        <textarea
          id="description"
          rows={4}
          {...register("description")}
          className={`${inputClass(false)} resize-none`}
          placeholder="What this certification demonstrates"
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
          className={inputClass(false)}
          placeholder="HTML5, Frontend"
        />
      </div>

      <div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            {...register("verified")}
            className="w-4 h-4 rounded bg-dark-800 border-dark-700 text-brand-500 focus:ring-brand-500"
          />
          <span className="text-sm">Verified Certificate</span>
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