"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
  FaTimes,
} from "react-icons/fa";

type ToastType = "success" | "error" | "info";

interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  toast: (message: string, type?: ToastType) => void;
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const TOAST_STYLES: Record<
  ToastType,
  { icon: ReactNode; iconColor: string; borderColor: string }
> = {
  success: {
    icon: <FaCheckCircle />,
    iconColor: "text-green-400",
    borderColor: "border-green-500/30",
  },
  error: {
    icon: <FaExclamationCircle />,
    iconColor: "text-red-400",
    borderColor: "border-red-500/30",
  },
  info: {
    icon: <FaInfoCircle />,
    iconColor: "text-brand-400",
    borderColor: "border-brand-500/30",
  },
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (message: string, type: ToastType = "info") => {
      const id = Date.now() + Math.random();
      setToasts((prev) => [...prev, { id, message, type }]);
      window.setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4000);
    },
    []
  );

  const success = useCallback((message: string) => toast(message, "success"), [toast]);
  const error = useCallback((message: string) => toast(message, "error"), [toast]);
  const info = useCallback((message: string) => toast(message, "info"), [toast]);

  return (
    <ToastContext.Provider value={{ toast, success, error, info }}>
      {children}
      <div className="fixed top-4 right-4 z-[100] flex w-full max-w-sm flex-col gap-3 px-4 pointer-events-none">
        <AnimatePresence>
          {toasts.map((item) => {
            const styles = TOAST_STYLES[item.type];
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 24 }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                className={`pointer-events-auto relative overflow-hidden rounded-xl border ${styles.borderColor} bg-dark-800/90 backdrop-blur-xl shadow-xl shadow-black/30`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                <div className="relative z-10 flex items-start gap-3 p-4">
                  <span className={`mt-0.5 text-lg ${styles.iconColor}`}>
                    {styles.icon}
                  </span>
                  <p className="flex-grow text-sm text-dark-100 leading-relaxed">
                    {item.message}
                  </p>
                  <button
                    onClick={() => dismiss(item.id)}
                    className="p-1 rounded-lg text-dark-400 hover:text-white hover:bg-white/10 transition-all"
                    aria-label="Dismiss notification"
                  >
                    <FaTimes className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
}