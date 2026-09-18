"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaAward,
  FaEnvelope,
  FaGlobe,
  FaHome,
  FaNewspaper,
  FaProjectDiagram,
  FaQuoteLeft,
  FaSignOutAlt,
  FaTools,
} from "react-icons/fa";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: FaHome },
  { href: "/admin/projects", label: "Projects", icon: FaProjectDiagram },
  { href: "/admin/certificates", label: "Certificates", icon: FaAward },
  { href: "/admin/skills", label: "Skills", icon: FaTools },
  { href: "/admin/testimonials", label: "Testimonials", icon: FaQuoteLeft },
  { href: "/admin/messages", label: "Messages", icon: FaEnvelope },
  { href: "/admin/blog", label: "Blog", icon: FaNewspaper },
];

export default function AdminNav() {
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch {
      // ignore logout errors
    } finally {
      window.location.href = "/admin/login";
    }
  };

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <header className="fixed top-0 inset-x-0 z-40 border-b border-white/10 bg-dark-900/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-16">
          <Link
            href="/admin"
            className="flex items-center gap-2 shrink-0"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-accent-500 text-white text-sm font-bold">
              TM
            </span>
            <span className="hidden sm:flex flex-col leading-tight">
              <span className="text-sm font-bold">Tinashe Mundieta</span>
              <span className="text-xs text-dark-400">Admin</span>
            </span>
          </Link>

          <nav className="flex items-center gap-1 overflow-x-auto md:gap-2">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                    active
                      ? "bg-brand-500/15 text-brand-400"
                      : "text-dark-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-dark-300 hover:text-white hover:bg-white/5 transition-all"
            >
              <FaGlobe className="w-4 h-4" />
              <span className="hidden md:inline">View Site</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
            >
              <FaSignOutAlt className="w-4 h-4" />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}