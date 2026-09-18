"use client";

import GlassCard from "@/components/common/GlassCard";
import GradientHeading from "@/components/common/GradientHeading";
import { FaDownload, FaExternalLinkAlt, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export default function ResumePage() {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <GradientHeading>Resume</GradientHeading>
          <p className="mt-4 text-dark-400 max-w-2xl mx-auto text-balance">
            Full-Stack Software Developer with expertise in Next.js, Prisma, and PostgreSQL.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <GlassCard className="p-6 h-full lg:col-span-1">
              <div className="text-center mb-6">
                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-4xl font-bold text-white mb-4">
                  TM
                </div>
                <h3 className="text-xl font-bold">Tinashe Mundieta</h3>
                <p className="text-brand-400">Full-Stack Software Developer</p>
                <p className="text-dark-400 text-sm mt-1">Harare, Zimbabwe</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <FaEnvelope className="text-brand-400" />
                  <a
                    href="mailto:tinashemundieta36@gmail.com"
                    className="text-dark-300 hover:text-brand-400 transition-colors"
                  >
                    tinashemundieta36@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <FaPhone className="text-brand-400" />
                  <a
                    href="tel:+263779941427"
                    className="text-dark-300 hover:text-brand-400 transition-colors"
                  >
                    +263 779 941 427
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <FaMapMarkerAlt className="text-brand-400" />
                  <span className="text-dark-300">Harare, Zimbabwe</span>
                </div>
              </div>
            </GlassCard>

          <GlassCard className="p-6 md:p-8 lg:col-span-2">
            <h3 className="text-2xl font-bold font-heading mb-6 text-dark-100">
              Professional Summary
            </h3>
              <div className="space-y-4 text-dark-300 leading-relaxed">
                <p>
                  Full-Stack Software Developer specializing in Next.js, Prisma, and
                  PostgreSQL. Experienced in building scalable web applications from
                  database design to polished user interfaces.
                </p>
                <p>
                  Proficient in modern frontend technologies including React, TypeScript,
                  and Tailwind CSS. Skilled in backend development with Node.js, API
                  design, and database optimization.
                </p>
                <p>
                  Passionate about clean code, best practices, and delivering exceptional
                  user experiences. Open to freelance and full-time opportunities
                  worldwide.
                </p>
              </div>

              <div className="mt-8">
                <h4 className="text-xl font-bold mb-4">Technical Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Next.js",
                    "React",
                    "TypeScript",
                    "Node.js",
                    "Prisma",
                    "PostgreSQL",
                    "Tailwind CSS",
                    "Git",
                    "Docker",
                    "REST APIs",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-full bg-dark-800 text-dark-300 text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </GlassCard>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/Tinashe_Mundieta_CV.pdf"
            download
            className="btn-primary inline-flex items-center justify-center gap-2"
          >
            <FaDownload className="w-4 h-4" />
            Download CV
          </a>
          <button
            onClick={() => window.open("/Tinashe_Mundieta_CV.pdf", "_blank")}
            className="btn-outline inline-flex items-center justify-center gap-2"
          >
            <FaExternalLinkAlt className="w-4 h-4" />
            View in New Tab
          </button>
        </div>
      </div>
    </div>
  );
}
