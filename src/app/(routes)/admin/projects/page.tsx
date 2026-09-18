"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaPlus, FaEdit, FaTrash, FaExternalLinkAlt } from "react-icons/fa";
import GlassCard from "@/components/common/GlassCard";
import GradientHeading from "@/components/common/GradientHeading";
import SkeletonLoader from "@/components/common/SkeletonLoader";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { useToast } from "@/components/common/Toast";

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  status: string;
  featured: boolean;
  createdAt: string;
}

export default function AdminProjectsPage() {
  const { success: toastSuccess, error: toastError } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
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
      const response = await fetch(`/api/projects/${deleteTargetId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== deleteTargetId));
        toastSuccess("Project deleted successfully");
      } else {
        const result = await response.json();
        toastError(result.error || "Failed to delete project");
      }
    } catch {
      toastError("An error occurred. Please try again.");
    } finally {
      setDeletingId(null);
      setDeleteTargetId(null);
    }
  };

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data.projects || []);
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
          <GradientHeading className="pb-2">Manage Projects</GradientHeading>
          <p className="mt-2 text-dark-400">Add, edit, or remove portfolio projects</p>
        </motion.div>
        <div className="flex gap-4">
          <Link href="/admin/projects/new" className="btn-primary text-sm py-2 px-4 flex items-center gap-2">
            <FaPlus className="w-4 h-4" />
            New Project
          </Link>
        </div>
      </div>

      {loading ? (
        <SkeletonLoader type="card" count={6} />
      ) : projects.length === 0 ? (
        <GlassCard className="p-12 text-center">
          <p className="text-dark-400 mb-4">No projects yet. Create your first project!</p>
          <Link href="/admin/projects/new" className="btn-primary">
            Add Project
          </Link>
        </GlassCard>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <GlassCard className="p-6 h-full flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs px-2 py-1 rounded-full bg-brand-500/10 text-brand-400">
                    {project.category}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    project.status === "completed"
                      ? "bg-green-500/10 text-green-400"
                      : "bg-yellow-500/10 text-yellow-400"
                  }`}>
                    {project.status}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2">{project.title}</h3>
                <p className="text-dark-400 text-sm mb-4 flex-grow line-clamp-2">
                  {project.description || project.slug}
                </p>
                <div className="flex gap-2">
                  <Link
                    href={`/portfolio/${project.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline text-xs py-1 px-3 flex items-center gap-1"
                  >
                    <FaExternalLinkAlt className="w-3 h-3" />
                    View
                  </Link>
                  <Link
                    href={`/admin/projects/${project.id}`}
                    className="btn-outline text-xs py-1 px-3 flex items-center gap-1"
                  >
                    <FaEdit className="w-3 h-3" />
                    Edit
                  </Link>
                   <button
                     onClick={() => handleDeleteClick(project.id)}
                     disabled={deletingId === project.id}
                     className="text-red-400 hover:text-red-300 text-xs py-1 px-3 flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                   >
                     <FaTrash className="w-3 h-3" />
                     {deletingId === project.id ? "Deleting..." : "Delete"}
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
    message="This action cannot be undone. The project will be permanently removed from your portfolio."
    confirmText="Delete"
    variant="danger"
  />
    </>
  );
}
