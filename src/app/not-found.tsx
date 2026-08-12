import { Metadata } from "next";
import GlassCard from "@/components/common/GlassCard";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="text-9xl font-bold gradient-text mb-4">404</div>
        <h1 className="text-3xl font-bold font-heading mb-4">Page Not Found</h1>
        <p className="text-dark-400 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <a href="/home" className="btn-primary">
          Back to Home
        </a>
      </div>
    </div>
  );
}
