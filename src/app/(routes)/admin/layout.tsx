"use client";

import { usePathname } from "next/navigation";
import { ToastProvider } from "@/components/common/Toast";
import AdminNav from "@/components/admin/AdminNav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLogin = pathname === "/admin/login";

  return (
    <ToastProvider>
      <div className="min-h-screen">
        {!isLogin && <AdminNav />}
        <div className={isLogin ? "px-4" : "pt-20 md:pt-28 px-4 sm:px-6 lg:px-8 pb-16"}>
          <div className="max-w-7xl mx-auto">{children}</div>
        </div>
      </div>
    </ToastProvider>
  );
}