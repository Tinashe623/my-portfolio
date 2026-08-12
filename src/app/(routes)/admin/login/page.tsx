"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { FaLock, FaUser, FaKey } from "react-icons/fa";
import GlassCard from "@/components/common/GlassCard";
import GradientHeading from "@/components/common/GradientHeading";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function AdminLoginPage() {
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setError(null);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        window.location.href = "/admin";
      } else {
        const result = await response.json();
        setError(result.error || "Invalid credentials");
      }
    } catch {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <GradientHeading className="pb-2">Admin Login</GradientHeading>
          <p className="mt-2 text-dark-400">
            Sign in to access the admin dashboard
          </p>
        </div>

        <GlassCard className="p-8">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
               <div className="relative">
                 <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-400/70" />
                  <input
                    id="email"
                    type="email"
                    {...register("email")}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg bg-dark-800/80 border caret-dark-100 ${
                      errors.email ? "border-red-500" : "border-white/10"
                    } text-dark-100 placeholder-dark-500 focus:outline-none focus:border-brand-500 focus:bg-dark-800 transition-colors`}
                    placeholder="Enter your email"
                  />
               </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <FaKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-400/70" />
                  <input
                    id="password"
                    type="password"
                    {...register("password")}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg bg-dark-800/80 border caret-dark-100 ${
                      errors.password ? "border-red-500" : "border-white/10"
                    } text-dark-100 placeholder-dark-500 focus:outline-none focus:border-brand-500 focus:bg-dark-800 transition-colors`}
                    placeholder="Enter your password"
                  />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <FaLock className="w-4 h-4" />
              {isSubmitting ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </GlassCard>

        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-sm text-dark-400 hover:text-brand-400 transition-colors"
          >
            ← Back to Portfolio
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
