"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import GlassCard from "@/components/common/GlassCard";
import GradientHeading from "@/components/common/GradientHeading";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import SkillForm from "@/components/admin/SkillForm";
import { useToast } from "@/components/common/Toast";

export default function EditSkillPage() {
  const params = useParams();
  const router = useRouter();
  const toast = useToast().success;
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    if (params.id) {
      fetch(`/api/skills/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.skill) setInitialValues(data.skill);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [params.id]);

  const onSubmit = async (payload: Record<string, unknown>) => {
    setError(null);
    try {
      const response = await fetch(`/api/skills/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast("Skill saved successfully");
        router.push("/admin/skills");
      } else {
        const result = await response.json();
        setError(result.error || "Failed to update skill");
      }
    } catch {
      setError("An error occurred. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/skills" className="btn-outline text-sm py-2 px-4 flex items-center gap-2">
          <FaArrowLeft className="w-4 h-4" />
          Back
        </Link>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <GradientHeading className="pb-2">Edit Skill</GradientHeading>
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

        {initialValues && (
          <SkillForm
            initialValues={initialValues}
            submitLabel="Save Skill"
            submittingLabel="Saving..."
            onSubmit={onSubmit}
          />
        )}
      </GlassCard>
    </>
  );
}