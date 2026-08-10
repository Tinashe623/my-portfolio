"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaHome, FaEnvelope, FaProjectDiagram, FaNewspaper, FaSignOutAlt } from "react-icons/fa";
import GlassCard from "@/components/common/GlassCard";
import GradientHeading from "@/components/common/GradientHeading";

export default function AdminDashboard() {
  const [stats] = useState([
    { label: "Projects", value: "6", icon: FaProjectDiagram, color: "text-brand-400" },
    { label: "Messages", value: "0", icon: FaEnvelope, color: "text-accent-400" },
    { label: "Blog Posts", value: "4", icon: FaNewspaper, color: "text-green-400" },
  ]);

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <GradientHeading>Admin Dashboard</GradientHeading>
          <p className="mt-2 text-dark-400">Manage your portfolio content</p>
        </motion.div>
        <div className="flex gap-4">
          <Link href="/" className="btn-outline text-sm py-2 px-4 flex items-center gap-2">
            <FaHome className="w-4 h-4" />
            View Site
          </Link>
          <form action="/api/auth/logout" method="POST">
            <button
              type="submit"
              className="btn-outline text-sm py-2 px-4 flex items-center gap-2 text-red-400 border-red-400/30 hover:bg-red-500/10"
            >
              <FaSignOutAlt className="w-4 h-4" />
              Logout
            </button>
          </form>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <GlassCard className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-dark-400 text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg bg-dark-800 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link href="/admin/projects">
            <GlassCard className="p-6 h-full cursor-pointer group">
              <div className="text-3xl mb-4 text-brand-400">
                <FaProjectDiagram />
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-brand-400 transition-colors">
                Manage Projects
              </h3>
              <p className="text-dark-400 text-sm">
                Add, edit, or remove portfolio projects
              </p>
            </GlassCard>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link href="/admin/messages">
            <GlassCard className="p-6 h-full cursor-pointer group">
              <div className="text-3xl mb-4 text-accent-400">
                <FaEnvelope />
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-accent-400 transition-colors">
                View Messages
              </h3>
              <p className="text-dark-400 text-sm">
                Read and manage contact form submissions
              </p>
            </GlassCard>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link href="/admin/blog">
            <GlassCard className="p-6 h-full cursor-pointer group">
              <div className="text-3xl mb-4 text-green-400">
                <FaNewspaper />
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-green-400 transition-colors">
                Manage Blog
              </h3>
              <p className="text-dark-400 text-sm">
                Create and edit blog posts
              </p>
            </GlassCard>
          </Link>
        </motion.div>
      </div>
    </>
  );
}
