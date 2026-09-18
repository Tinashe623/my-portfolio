"use client";

import GradientHeading from "@/components/common/GradientHeading";
import CertificateGrid, {
  type CertificateCardData,
} from "@/components/certificates/CertificateGrid";

interface CertificatesContentProps {
  certificates: CertificateCardData[];
}

export default function CertificatesContent({ certificates }: CertificatesContentProps) {
  return (
    <>
      <div className="text-center mb-16">
        <GradientHeading>Certificates</GradientHeading>
        <p className="mt-4 text-dark-400 max-w-2xl mx-auto text-balance">
          Professional certifications demonstrating my commitment to continuous learning
          and expertise in web development technologies.
        </p>
      </div>

      {certificates.length === 0 ? (
        <p className="text-center text-dark-400">No certificates available yet.</p>
      ) : (
        <CertificateGrid certificates={certificates} />
      )}

      <div className="mt-16 text-center">
        <p className="text-dark-400">
          Committed to continuous learning and professional development.
        </p>
      </div>
    </>
  );
}