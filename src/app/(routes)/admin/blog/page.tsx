"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaNewspaper, FaEdit, FaTrash } from "react-icons/fa";
import GlassCard from "@/components/common/GlassCard";
import GradientHeading from "@/components/common/GradientHeading";
import SkeletonLoader from "@/components/common/SkeletonLoader";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { useToast } from "@/components/common/Toast";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: string | null;
  tags: string[];
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function AdminBlogPage() {
  const { success: toastSuccess, error: toastError } = useToast();
  const [posts, setPosts] = useState<BlogPost[]>([]);
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
      const response = await fetch(`/api/blog/${deleteTargetId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setPosts((prev) => prev.filter((p) => p.id !== deleteTargetId));
        toastSuccess("Blog post deleted successfully");
      } else {
        const result = await response.json();
        toastError(result.error || "Failed to delete blog post");
      }
    } catch {
      toastError("An error occurred. Please try again.");
    } finally {
      setDeletingId(null);
      setDeleteTargetId(null);
    }
  };

  const handleTogglePublish = async (post: BlogPost) => {
    try {
      const response = await fetch(`/api/blog/${post.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !post.published }),
      });

      if (response.ok) {
        const { post: updated } = await response.json();
        setPosts((prev) =>
          prev.map((p) => (p.id === updated.id ? { ...p, ...updated } : p))
        );
        toastSuccess(updated.published ? "Post published" : "Post saved as draft");
      } else {
        const result = await response.json();
        toastError(result.error || "Failed to update post");
      }
    } catch {
      toastError("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    fetch("/api/admin/blog")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.posts || []);
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
          <GradientHeading className="pb-2">Manage Blog</GradientHeading>
          <p className="mt-2 text-dark-400">Create and manage blog posts</p>
        </motion.div>
        <div className="flex gap-4">
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
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-grow min-w-[200px]">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="font-semibold">{post.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        post.published
                          ? "bg-green-500/10 text-green-400"
                          : "bg-yellow-500/10 text-yellow-400"
                      }`}>
                        {post.published ? "Published" : "Draft"}
                      </span>
                      {post.tags.length > 0 && (
                        <span className="text-xs text-dark-500 hidden sm:inline">
                          {post.tags.slice(0, 3).join(", ")}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-dark-400 mb-2">/{post.slug}</p>
                    <p className="text-xs text-dark-500">
                      {post.publishedAt
                        ? `${post.published ? "Published" : "Scheduled"}: ${new Date(post.publishedAt).toLocaleDateString()}`
                        : "No publish date"}
                    </p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <button
                      onClick={() => handleTogglePublish(post)}
                      className="btn-outline text-xs py-1 px-3"
                    >
                      {post.published ? "Unpublish" : "Publish"}
                    </button>
                    {post.published && (
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline text-xs py-1 px-3"
                      >
                        View
                      </Link>
                    )}
                    <Link
                      href={`/admin/blog/${post.id}`}
                      className="btn-outline text-xs py-1 px-3 flex items-center gap-1"
                    >
                      <FaEdit className="w-3 h-3" />
                      Edit
                    </Link>
                     <button
                       onClick={() => handleDeleteClick(post.id)}
                       disabled={deletingId === post.id}
                       className="text-red-400 hover:text-red-300 text-xs py-1 px-3 flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                     >
                       <FaTrash className="w-3 h-3" />
                       {deletingId === post.id ? "Deleting..." : "Delete"}
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
    message="This action cannot be undone. The blog post will be permanently removed."
    confirmText="Delete"
    variant="danger"
  />
    </>
  );
}
