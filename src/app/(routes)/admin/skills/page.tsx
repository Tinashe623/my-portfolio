"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaPlus, FaEdit, FaTrash, FaCogs } from "react-icons/fa";
import GlassCard from "@/components/common/GlassCard";
import GradientHeading from "@/components/common/GradientHeading";
import SkeletonLoader from "@/components/common/SkeletonLoader";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { useToast } from "@/components/common/Toast";

interface Skill {
  id: string;
  name: string;
  category: string;
  level: string;
  icon: string | null;
  featured: boolean;
  order: number;
}

export default function AdminSkillsPage() {
  const { success: toastSuccess, error: toastError } = useToast();
  const [skills, setSkills] = useState<Skill[]>([]);
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
      const response = await fetch(`/api/skills/${deleteTargetId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setSkills((prev) => prev.filter((s) => s.id !== deleteTargetId));
        toastSuccess("Skill deleted successfully");
      } else {
        const result = await response.json();
        toastError(result.error || "Failed to delete skill");
      }
    } catch {
      toastError("An error occurred. Please try again.");
    } finally {
      setDeletingId(null);
      setDeleteTargetId(null);
    }
  };

  useEffect(() => {
    fetch("/api/skills")
      .then((res) => res.json())
      .then((data) => {
        setSkills(data.skills || []);
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
          <GradientHeading className="pb-2">Manage Skills</GradientHeading>
          <p className="mt-2 text-dark-400">Add, edit, or remove skills shown on your profile</p>
        </motion.div>
        <div className="flex gap-4">
          <Link href="/admin/skills/new" className="btn-primary text-sm py-2 px-4 flex items-center gap-2">
            <FaPlus className="w-4 h-4" />
            New Skill
          </Link>
        </div>
      </div>

      {loading ? (
        <SkeletonLoader type="card" count={6} />
      ) : skills.length === 0 ? (
        <GlassCard className="p-12 text-center">
          <FaCogs className="w-12 h-12 text-dark-600 mx-auto mb-4" />
          <p className="text-dark-400 mb-4">No skills yet. Add your first one!</p>
          <Link href="/admin/skills/new" className="btn-primary">
            Add Skill
          </Link>
        </GlassCard>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
            >
              <GlassCard className="p-5 h-full flex items-start justify-between gap-3">
                <div className="flex-grow min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="font-semibold truncate">{skill.name}</h3>
                    {skill.featured && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-400">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-dark-500 mb-3 flex-wrap">
                    <span>{skill.category}</span>
                    <span>•</span>
                    <span className="capitalize">{skill.level}</span>
                    <span>•</span>
                    <span>Order {skill.order}</span>
                  </div>
                  <p className="text-xs text-dark-500 truncate">
                    {skill.icon ?? "No icon"}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Link
                    href={`/admin/skills/${skill.id}`}
                    className="btn-outline text-xs py-1 px-3 flex items-center gap-1"
                  >
                    <FaEdit className="w-3 h-3" />
                  </Link>
                  <button
                    onClick={() => handleDeleteClick(skill.id)}
                    disabled={deletingId === skill.id}
                    className="text-red-400 hover:text-red-300 text-xs py-1 px-3 flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaTrash className="w-3 h-3" />
                  </button>
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
        message="This action cannot be undone. The skill will be permanently removed."
        confirmText="Delete"
        variant="danger"
      />
    </>
  );
}