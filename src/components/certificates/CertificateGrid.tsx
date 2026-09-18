"use client";

/* eslint-disable @next/next/no-img-element -- admin-provided remote certificate images */

import GlassCard from "@/components/common/GlassCard";
import { FaExternalLinkAlt, FaCheckCircle, FaCertificate } from "react-icons/fa";

export interface CertificateCardData {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string | null;
  credentialUrl?: string | null;
  image?: string | null;
  description?: string | null;
  tags: string[];
  verified: boolean;
}

interface CertificateGridProps {
  certificates: CertificateCardData[];
}

export default function CertificateGrid({
  certificates,
}: CertificateGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
      {certificates.map((cert) => (
        <GlassCard
          key={cert.id}
          className="overflow-hidden h-full flex flex-col"
        >
            <div className="relative h-48 bg-dark-800 flex items-center justify-center">
              {cert.image ? (
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <FaCertificate className="w-16 h-16 text-brand-400 opacity-80" />
              )}
            </div>

            <div className="p-6 flex-grow flex flex-col">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold">{cert.title}</h3>
                {cert.verified ? (
                  <span className="flex items-center gap-1 text-green-400 text-sm">
                    <FaCheckCircle className="w-4 h-4" />
                    Verified
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-yellow-500 text-sm">
                    <FaCheckCircle className="w-4 h-4" />
                    Unverified
                  </span>
                )}
              </div>

              <p className="text-dark-400 text-sm mb-2">
                Issued by <span className="text-brand-400">{cert.issuer}</span>
              </p>
              <p className="text-dark-500 text-sm mb-4">
                Issued:{" "}
                {new Date(cert.issueDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>

              {cert.description && (
                <p className="text-dark-400 text-sm mb-4">{cert.description}</p>
              )}

              <div className="flex flex-wrap gap-2 mb-4">
                {(cert.tags ?? []).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded-full bg-brand-500/10 text-brand-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline text-sm py-2 px-4 inline-flex items-center gap-2 mt-auto"
                >
                  <FaExternalLinkAlt className="w-3 h-3" />
                  Verify Certificate
                </a>
              )}
            </div>
          </GlassCard>
      ))}
    </div>
  );
}