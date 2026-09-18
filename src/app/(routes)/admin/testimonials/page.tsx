"use client";

/* eslint-disable @next/next/no-img-element -- admin preview of testimonial avatars */

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaPlus, FaEdit, FaTrash, FaQuoteLeft, FaStar } from "react-icons/fa";
import GlassCard from "@/components/common/GlassCard";
import GradientHeading from "@/components/common/GradientHeading";
import SkeletonLoader from "@/components/common/SkeletonLoader";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { useToast } from "@/components/common/Toast";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string | null;
  rating: number;
  featured: boolean;
  createdAt: string;
}

export default function AdminTestimonialsPage() {
  const { success: toastSuccess, error: toastError } = useToast();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDeleteClick = (id: string) => {
    setDeleteTargetId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTargetId) return;

    setDeletingId(deleteTargetId);
    try {
      const response = await fetch(`/api/testimonials/${deleteTargetId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTestimonials((prev) => prev.filter((t) => t.id !== deleteTargetId));
        toastSuccess("Testimonial deleted successfully");
      } else {
        const result = await response.json();
        toastError(result.error || "Failed to delete testimonial");
      }
    } catch {
      toastError("An error occurred. Please try again.");
    } finally {
      setDeletingId(null);
      setDeleteTargetId(null);
    }
  };

  useEffect(() => {
    fetch("/api/testimonials")
      .then((res) => res.json())
      .then((data) => {
        setTestimonials(data.testimonials || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <GradientHeading className="pb-2">Manage Testimonials</GradientHeading>
          <p className="mt-2 text-dark-400">Client testimonials shown on your home page</p>
        </motion.div>
        <div className="flex gap-4">
          <Link href="/admin/testimonials/new" className="btn-primary text-sm py-2 px-4 flex items-center gap-2">
            <FaPlus className="w-4 h-4" />
            New Testimonial
          </Link>
        </div>
      </div>

      {loading ? (
        <SkeletonLoader type="card" count={4} />
      ) : testimonials.length === 0 ? (
        <GlassCard className="p-12 text-center">
          <FaQuoteLeft className="w-12 h-12 text-dark-600 mx-auto mb-4" />
          <p className="text-dark-400 mb-4">No testimonials yet. Add your first one!</p>
          <Link href="/admin/testimonials/new" className="btn-primary">
            Add Testimonial
          </Link>
        </GlassCard>
      ) : (
        <div className="space-y-4">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
            >
              <GlassCard className="p-6">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-grow min-w-[200px]">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      {t.avatar ? (
                        <img
                          src={t.avatar}
                          alt={t.name}
                          className="w-8 h-8 rounded-full object-cover border border-dark-700"
                        />
                      ) : (
                        <span className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-white text-[10px] font-bold">
                          {t.name
                            .split(" ")
                            .map((n) => n[0])
                            .filter(Boolean)
                            .slice(0, 2)
                            .join("")
                            .toUpperCase()}
                        </span>
                      )}
                      <h3 className="font-semibold">{t.name}</h3>
                      {t.featured && (
                        <span className="text-xs px-2 py-1 rounded-full bg-brand-500/10 text-brand-400">
                          Featured
                        </span>
                      )}
                      <span className="flex items-center gap-0.5 text-yellow-400">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <FaStar key={i} className="w-3 h-3" />
                        ))}
                      </span>
                    </div>
                    <p className="text-xs text-dark-500 mb-3">
                      {t.role} at {t.company}
                    </p>
                    <p className="text-sm text-dark-400 line-clamp-2">{t.content}</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Link
                      href={`/admin/testimonials/${t.id}`}
                      className="btn-outline text-xs py-1 px-3 flex items-center gap-1"
                    >
                      <FaEdit className="w-3 h-3" />
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteClick(t.id)}
                      disabled={deletingId === t.id}
                      className="text-red-400 hover:text-red-300 text-xs py-1 px-3 flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FaTrash className="w-3 h-3" />
                      {deletingId === t.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      )}

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        message="This action cannot be undone. The testimonial will be permanently removed."
        confirmText="Delete"
        variant="danger"
      />
    </>
  );
}