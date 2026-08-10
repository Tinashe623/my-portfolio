"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowLeft, FaEnvelope, FaCheck, FaTimes } from "react-icons/fa";
import GlassCard from "@/components/common/GlassCard";
import GradientHeading from "@/components/common/GradientHeading";
import SkeletonLoader from "@/components/common/SkeletonLoader";

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
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

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
      <div className="flex items-center justify-between mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <GradientHeading>Contact Messages</GradientHeading>
          <p className="mt-2 text-dark-400">View and manage contact form submissions</p>
        </motion.div>
        <Link href="/admin" className="btn-outline text-sm py-2 px-4 flex items-center gap-2">
          <FaArrowLeft className="w-4 h-4" />
          Dashboard
        </Link>
      </div>

      {loading ? (
        <SkeletonLoader type="list" count={5} />
      ) : messages.length === 0 ? (
        <GlassCard className="p-12 text-center">
          <FaEnvelope className="w-12 h-12 text-dark-600 mx-auto mb-4" />
          <p className="text-dark-400">No messages yet. Messages will appear here when someone contacts you.</p>
        </GlassCard>
      ) : (
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
              </GlassCard>
            </motion.div>
          ))}
        </div>
      )}
    </>
  );
}
