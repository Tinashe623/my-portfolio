"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function NavigationLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-dark-900/80 backdrop-blur-sm">
      <div className="h-full bg-gradient-to-r from-brand-500 to-accent-500 animate-pulse" />
    </div>
  );
}
