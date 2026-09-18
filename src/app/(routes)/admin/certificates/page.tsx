"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaPlus, FaEdit, FaTrash, FaExternalLinkAlt, FaCertificate } from "react-icons/fa";
import GlassCard from "@/components/common/GlassCard";
import GradientHeading from "@/components/common/GradientHeading";
import SkeletonLoader from "@/components/common/SkeletonLoader";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { useToast } from "@/components/common/Toast";

interface Certificate {
  id: string;
  title: string;
  slug: string;
  issuer: string;
  issueDate: string;
  credentialUrl: string | null;
  tags: string[];
  verified: boolean;
  createdAt: string;
}

export default function AdminCertificatesPage() {
  const { success: toastSuccess, error: toastError } = useToast();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
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
      const response = await fetch(`/api/certificates/${deleteTargetId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setCertificates((prev) => prev.filter((c) => c.id !== deleteTargetId));
        toastSuccess("Certificate deleted successfully");
      } else {
        const result = await response.json();
        toastError(result.error || "Failed to delete certificate");
      }
    } catch {
      toastError("An error occurred. Please try again.");
    } finally {
      setDeletingId(null);
      setDeleteTargetId(null);
    }
  };

  useEffect(() => {
    fetch("/api/certificates")
      .then((res) => res.json())
      .then((data) => {
        setCertificates(data.certificates || []);
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
          <GradientHeading className="pb-2">Manage Certificates</GradientHeading>
          <p className="mt-2 text-dark-400">Add, edit, or remove certifications</p>
        </motion.div>
        <div className="flex gap-4">
          <Link href="/admin/certificates/new" className="btn-primary text-sm py-2 px-4 flex items-center gap-2">
            <FaPlus className="w-4 h-4" />
            New Certificate
          </Link>
        </div>
      </div>

      {loading ? (
        <SkeletonLoader type="card" count={6} />
      ) : certificates.length === 0 ? (
        <GlassCard className="p-12 text-center">
          <FaCertificate className="w-12 h-12 text-dark-600 mx-auto mb-4" />
          <p className="text-dark-400 mb-4">No certificates yet. Add your first one!</p>
          <Link href="/admin/certificates/new" className="btn-primary">
            Add Certificate
          </Link>
        </GlassCard>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <GlassCard className="p-6 h-full flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs px-2 py-1 rounded-full bg-brand-500/10 text-brand-400">
                    {cert.issuer}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      cert.verified
                        ? "bg-green-500/10 text-green-400"
                        : "bg-yellow-500/10 text-yellow-400"
                    }`}
                  >
                    {cert.verified ? "Verified" : "Unverified"}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2">{cert.title}</h3>
                <p className="text-dark-500 text-xs mb-4">
                  Issued:{" "}
                  {new Date(cert.issueDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <div className="flex gap-2 mt-auto">
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline text-xs py-1 px-3 flex items-center gap-1"
                    >
                      <FaExternalLinkAlt className="w-3 h-3" />
                      Verify
                    </a>
                  )}
                  <Link
                    href={`/admin/certificates/${cert.id}`}
                    className="btn-outline text-xs py-1 px-3 flex items-center gap-1"
                  >
                    <FaEdit className="w-3 h-3" />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDeleteClick(cert.id)}
                    disabled={deletingId === cert.id}
                    className="text-red-400 hover:text-red-300 text-xs py-1 px-3 flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaTrash className="w-3 h-3" />
                    {deletingId === cert.id ? "Deleting..." : "Delete"}
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
        message="This action cannot be undone. The certificate will be permanently removed."
        confirmText="Delete"
        variant="danger"
      />
    </>
  );
}