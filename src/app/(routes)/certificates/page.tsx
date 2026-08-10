"use client";

import { motion } from "framer-motion";
import GlassCard from "@/components/common/GlassCard";
import GradientHeading from "@/components/common/GradientHeading";
import { FaExternalLinkAlt, FaCheckCircle } from "react-icons/fa";

const certificates = [
  {
    id: 1,
    title: "HTML5 Certified",
    issuer: "W3Schools",
    issueDate: "2024-04-03",
    credentialId: "w3html2024",
    credentialUrl: "https://www.w3schools.com/cert/certificate.aspx",
    tags: ["HTML5", "Frontend"],
    image: "/images/projects/temp-preview.webp",
  },
  {
    id: 2,
    title: "CSS Certified",
    issuer: "W3Schools",
    issueDate: "2024-04-27",
    credentialId: "w3css2024",
    credentialUrl: "https://www.w3schools.com/cert/certificate.aspx",
    tags: ["CSS3", "Frontend"],
    image: "/images/projects/todo-preview.webp",
  },
  {
    id: 3,
    title: "JavaScript Certified",
    issuer: "W3Schools",
    issueDate: "2024-10-19",
    credentialId: "w3js2024",
    credentialUrl: "https://www.w3schools.com/cert/certificate.aspx",
    tags: ["JavaScript", "Frontend"],
    image: "/images/projects/clock-preview.webp",
  },
  {
    id: 4,
    title: "Frontend Development",
    issuer: "W3Schools",
    issueDate: "2024-10-19",
    credentialId: "w3frontend2024",
    credentialUrl: "https://www.w3schools.com/cert/certificate.aspx",
    tags: ["Frontend", "Full-Stack"],
    image: "/images/projects/gmp-preview.webp",
  },
];

export default function CertificatesPage() {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <GradientHeading>Certificates</GradientHeading>
          <p className="mt-4 text-dark-400 max-w-2xl mx-auto text-balance">
            Professional certifications demonstrating my commitment to continuous learning
            and expertise in web development technologies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <GlassCard className="overflow-hidden h-full flex flex-col">
                <div className="relative h-48 bg-dark-800 overflow-hidden">
                  {cert.image ? (
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-dark-600">
                      Certificate Image
                    </div>
                  )}
                </div>

                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold">{cert.title}</h3>
                    <span className="flex items-center gap-1 text-green-400 text-sm">
                      <FaCheckCircle className="w-4 h-4" />
                      Verified
                    </span>
                  </div>

                  <p className="text-dark-400 text-sm mb-2">
                    Issued by <span className="text-brand-400">{cert.issuer}</span>
                  </p>
                  <p className="text-dark-500 text-sm mb-4">
                    Issued: {new Date(cert.issueDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {cert.tags.map((tag) => (
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
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-dark-400">
            Committed to continuous learning and professional development.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
