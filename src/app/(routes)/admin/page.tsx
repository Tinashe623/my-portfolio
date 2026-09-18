"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaEnvelope,
  FaProjectDiagram,
  FaNewspaper,
  FaArrowRight,
} from "react-icons/fa";
import GlassCard from "@/components/common/GlassCard";
import GradientHeading from "@/components/common/GradientHeading";
import SkeletonLoader from "@/components/common/SkeletonLoader";

interface AdminStats {
  projects: number;
  blogPosts: number;
  published: number;
  drafts: number;
  messages: number;
  unread: number;
}

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

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const loadStats = useCallback(() => {
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.projects === "number") {
          setStats(data);
        }
      })
      .catch(() => setStats(null));
  }, []);

  useEffect(() => {
    loadStats();
    fetch("/api/contact")
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.messages)) {
          setMessages(data.messages.slice(0, 5));
        }
      })
      .catch(() => setMessages([]));
  }, [loadStats]);

  const statCards = [
    {
      label: "Projects",
      value: stats?.projects,
      icon: FaProjectDiagram,
      color: "text-brand-400",
      href: "/admin/projects",
    },
    {
      label: "Messages",
      value: stats?.messages,
      hint:
        stats && stats.unread > 0
          ? `${stats.unread} unread`
          : "All messages read",
      icon: FaEnvelope,
      color: "text-accent-400",
      href: "/admin/messages",
    },
    {
      label: "Blog Posts",
      value: stats?.blogPosts,
      hint: stats ? `${stats.published} published · ${stats.drafts} drafts` : undefined,
      icon: FaNewspaper,
      color: "text-green-400",
      href: "/admin/blog",
    },
  ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <GradientHeading>Admin Dashboard</GradientHeading>
        <p className="mt-2 text-dark-400">Manage your portfolio content</p>
      </motion.div>

      {stats === null ? (
        <div className="mb-12">
          <SkeletonLoader type="card" count={3} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={stat.href} className="block h-full group">
                  <GlassCard className="p-6 h-full">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-dark-400 text-sm mb-1">{stat.label}</p>
                        <p className="text-3xl font-bold">
                          {stat.value === undefined ? "—" : stat.value}
                        </p>
                        {stat.hint && (
                          <p className="text-xs mt-1 text-dark-500 group-hover:text-accent-400 transition-colors">
                            {stat.hint}
                          </p>
                        )}
                      </div>
                      <div className={`p-3 rounded-lg bg-dark-800 ${stat.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>
                    <div className="mt-4 text-xs font-medium text-brand-400 inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      Manage {stat.label.toLowerCase()}
                      <FaArrowRight className="w-3 h-3" />
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <GlassCard className="p-6 h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Recent Messages</h3>
              <Link
                href="/admin/messages"
                className="text-sm text-brand-400 hover:text-brand-300 transition-colors flex items-center gap-1"
              >
                View all
                <FaArrowRight className="w-3 h-3" />
              </Link>
            </div>
            {messages.length === 0 ? (
              <p className="text-dark-400 text-sm py-6 text-center">
                No messages yet.
              </p>
            ) : (
              <ul className="divide-y divide-white/5">
                {messages.map((message) => (
                  <li key={message.id} className="py-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-sm truncate">
                            {message.name}
                          </span>
                          {!message.read && (
                            <span className="w-2 h-2 rounded-full bg-brand-400 shrink-0" />
                          )}
                          {message.replied && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-green-500/10 text-green-400">
                              Replied
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-dark-400 truncate">
                          {message.subject || message.message}
                        </p>
                      </div>
                      <span className="text-xs text-dark-500 shrink-0">
                        {formatDate(message.createdAt)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col gap-6"
        >
          <Link href="/admin/projects/new" className="block group">
            <GlassCard className="p-6 h-full cursor-pointer group">
              <div className="text-3xl mb-4 text-brand-400">
                <FaProjectDiagram />
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-brand-400 transition-colors">
                Add a Project
              </h3>
              <p className="text-dark-400 text-sm">
                Show off your latest work with a new portfolio entry
              </p>
            </GlassCard>
          </Link>

          <Link href="/admin/blog/new" className="block group">
            <GlassCard className="p-6 h-full cursor-pointer group">
              <div className="text-3xl mb-4 text-green-400">
                <FaNewspaper />
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-green-400 transition-colors">
                Write a Post
              </h3>
              <p className="text-dark-400 text-sm">
                Draft a new blog article to share with your audience
              </p>
            </GlassCard>
          </Link>
        </motion.div>
      </div>
    </>
  );
}