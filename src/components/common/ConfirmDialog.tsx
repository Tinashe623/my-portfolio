"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FaExclamationTriangle, FaTimes } from "react-icons/fa";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info";
}

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
  variant = "danger",
}: ConfirmDialogProps) {
  const variantStyles = {
    danger: {
      iconBg: "bg-red-500/15",
      iconColor: "text-red-400",
      borderColor: "border-red-500/30",
      buttonBg: "bg-red-500 hover:bg-red-600",
      buttonShadow: "shadow-red-500/30",
    },
    warning: {
      iconBg: "bg-yellow-500/15",
      iconColor: "text-yellow-400",
      borderColor: "border-yellow-500/30",
      buttonBg: "bg-yellow-500 hover:bg-yellow-600",
      buttonShadow: "shadow-yellow-500/30",
    },
    info: {
      iconBg: "bg-brand-500/15",
      iconColor: "text-brand-400",
      borderColor: "border-brand-500/30",
      buttonBg: "bg-brand-500 hover:bg-brand-600",
      buttonShadow: "shadow-brand-500/30",
    },
  };

  const styles = variantStyles[variant];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`relative w-full max-w-md rounded-2xl bg-dark-800/90 backdrop-blur-xl border ${styles.borderColor} shadow-2xl overflow-hidden`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

            <div className="relative z-10 p-6 md:p-8">
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full ${styles.iconBg} flex items-center justify-center`}>
                    <FaExclamationTriangle className={`w-5 h-5 ${styles.iconColor}`} />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white pr-8">
                    {title}
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-1 rounded-lg text-dark-400 hover:text-white hover:bg-white/10 transition-all"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>

              <p className="text-dark-300 text-sm md:text-base leading-relaxed mb-8 pl-16">
                {message}
              </p>

              <div className="flex items-center justify-end gap-3 pl-16">
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-dark-300 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-all"
                >
                  {cancelText}
                </button>
                <button
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold text-white ${styles.buttonBg} ${styles.buttonShadow} shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5`}
                >
                  {confirmText}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
