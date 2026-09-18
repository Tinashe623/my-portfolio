"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import GlassCard from "@/components/common/GlassCard";
import GradientHeading from "@/components/common/GradientHeading";
import ProjectForm from "@/components/admin/ProjectForm";
import { useToast } from "@/components/common/Toast";

export default function NewProjectPage() {
  const router = useRouter();
  const toast = useToast().success;
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (payload: Record<string, unknown>) => {
    setError(null);
    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast("Project created successfully");
        router.push("/admin/projects");
      } else {
        const result = await response.json();
        setError(result.error || "Failed to create project");
      }
    } catch {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/projects" className="btn-outline text-sm py-2 px-4 flex items-center gap-2">
          <FaArrowLeft className="w-4 h-4" />
          Back
        </Link>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <GradientHeading>New Project</GradientHeading>
        </motion.div>
      </div>

      <GlassCard className="p-6 md:p-8">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400"
          >
            {error}
          </motion.div>
        )}

        <ProjectForm
          submitLabel="Create Project"
          submittingLabel="Creating..."
          onSubmit={onSubmit}
        />
      </GlassCard>
    </>
  );
}