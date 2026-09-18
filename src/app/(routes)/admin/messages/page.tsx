"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaCheck, FaTimes, FaReply, FaEnvelopeOpen } from "react-icons/fa";
import GlassCard from "@/components/common/GlassCard";
import GradientHeading from "@/components/common/GradientHeading";
import SkeletonLoader from "@/components/common/SkeletonLoader";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { useToast } from "@/components/common/Toast";

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  replied: boolean;
  createdAt: string;
}

export default function AdminMessagesPage() {
  const { success: toastSuccess, error: toastError } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleUpdate = async (
    id: string,
    patch: { read?: boolean; replied?: boolean }
  ) => {
    setUpdatingId(id);
    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });

      if (response.ok) {
        const { message } = await response.json();
        setMessages((prev) =>
          prev.map((m) => (m.id === message.id ? { ...m, ...message } : m))
        );
        if (patch.read === true) toastSuccess("Marked as read");
        if (patch.replied !== undefined) {
          toastSuccess(patch.replied ? "Marked as replied" : "Marked as not replied");
        }
      } else {
        const result = await response.json();
        toastError(result.error || "Failed to update message");
      }
    } catch {
      toastError("An error occurred. Please try again.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDeleteClick = (id: string) => {
    setDeleteTargetId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTargetId) return;

    setDeletingId(deleteTargetId);
    try {
      const response = await fetch("/api/contact", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: deleteTargetId }),
      });

      if (response.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== deleteTargetId));
        toastSuccess("Message deleted successfully");
      } else {
        const result = await response.json();
        toastError(result.error || "Failed to delete message");
      }
    } catch {
      toastError("An error occurred. Please try again.");
    } finally {
      setDeletingId(null);
      setDeleteTargetId(null);
    }
  };

  useEffect(() => {
    fetch("/api/contact")
      .then((res) => res.json())
      .then((data) => {
        setMessages(data.messages || []);
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
          <GradientHeading>Contact Messages</GradientHeading>
          <p className="mt-2 text-dark-400">View and manage contact form submissions</p>
        </motion.div>
      </div>

      {loading ? (
        <SkeletonLoader type="list" count={5} />
      ) : messages.length === 0 ? (
        <GlassCard className="p-12 text-center">
          <FaEnvelope className="w-12 h-12 text-dark-600 mx-auto mb-4" />
          <p className="text-dark-400">No messages yet. Messages will appear here when someone contacts you.</p>
        </GlassCard>
      ) : (
        <>
          <div className="space-y-4">
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
              >
                <GlassCard className={`p-6 ${!message.read ? "border-brand-500/30" : ""}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold">{message.name}</h3>
                        {!message.read && (
                          <span className="text-xs px-2 py-1 rounded-full bg-brand-500/10 text-brand-400">
                            New
                          </span>
                        )}
                        {message.replied && (
                          <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-400 flex items-center gap-1">
                            <FaCheck className="w-3 h-3" />
                            Replied
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-dark-400">{message.email}</p>
                    </div>
                    <span className="text-xs text-dark-500">
                      {new Date(message.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  {message.subject && (
                    <p className="text-sm font-medium mb-2">{message.subject}</p>
                  )}
                  <p className="text-dark-300 text-sm">{message.message}</p>
                  <div className="mt-4 flex flex-wrap items-center justify-end gap-2">
                    {!message.read && (
                      <button
                        onClick={() => handleUpdate(message.id, { read: true })}
                        disabled={updatingId === message.id}
                        className="flex items-center gap-1 text-xs py-1 px-3 rounded-lg text-brand-400 hover:text-brand-300 hover:bg-brand-500/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <FaEnvelopeOpen className="w-3 h-3" />
                        Mark as read
                      </button>
                    )}
                    <button
                      onClick={() =>
                        handleUpdate(message.id, { replied: !message.replied })
                      }
                      disabled={updatingId === message.id}
                      className={`flex items-center gap-1 text-xs py-1 px-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                        message.replied
                          ? "text-green-400 hover:text-green-300 hover:bg-green-500/10"
                          : "text-dark-300 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <FaReply className="w-3 h-3" />
                      {message.replied ? "Mark not replied" : "Mark replied"}
                    </button>
                    <button
                      onClick={() => handleDeleteClick(message.id)}
                      disabled={deletingId === message.id}
                      className="text-red-400 hover:text-red-300 text-xs py-1 px-3 flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FaTimes className="w-3 h-3" />
                      {deletingId === message.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </GlassCard>
            </motion.div>
          ))}
        </div>
        <ConfirmDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onConfirm={handleDeleteConfirm}
          message="This action cannot be undone. The message will be permanently removed from your inbox."
          confirmText="Delete"
          variant="danger"
        />
      </>
    )}
    </>
  );
}
