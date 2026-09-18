"use client";

import { motion } from "framer-motion";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function GlassCard({ children, className = "", onClick }: GlassCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-xl
        bg-dark-800/40 backdrop-blur-xl
        border border-white/10
        shadow-lg shadow-black/20
        transition-all duration-300
        hover:bg-dark-800/60 hover:border-white/20 hover:shadow-xl hover:shadow-black/30
        ${className}
      `}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
