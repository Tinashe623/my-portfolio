"use client";

import GlassCard from "@/components/common/GlassCard";
import GradientHeading from "@/components/common/GradientHeading";
import { getSkillIcon } from "@/lib/skillIcons";
import type { SkillRow } from "@/lib/db";

interface AboutContentProps {
  skills: SkillRow[];
}

const timeline = [
  {
    year: "2023",
    title: "Started Learning",
    description:
      "Began my journey into web development with HTML, CSS, and JavaScript fundamentals.",
  },
  {
    year: "2024",
    title: "First React Projects",
    description:
      "Built multiple React applications and learned modern frontend development practices.",
  },
  {
    year: "2025",
    title: "Full-Stack Development",
    description:
      "Expanded into backend development with Node.js, Prisma, and PostgreSQL. Built full-stack applications.",
  },
  {
    year: "Present",
    title: "Professional Developer",
    description:
      "Specializing in Next.js, Prisma, and PostgreSQL. Open to freelance and full-time opportunities worldwide.",
  },
];

const values = [
  {
    title: "Innovation",
    description:
      "Embracing new technologies and finding creative solutions to complex problems.",
    icon: "💡",
  },
  {
    title: "Reliability",
    description:
      "Delivering consistent, maintainable code that stands the test of time.",
    icon: "🔒",
  },
  {
    title: "Quality",
    description:
      "Writing clean, well-tested code with attention to detail and best practices.",
    icon: "⭐",
  },
  {
    title: "Collaboration",
    description:
      "Working effectively with teams and clients to achieve shared goals.",
    icon: "🤝",
  },
];

export default function AboutContent({ skills }: AboutContentProps) {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <GradientHeading>About Me</GradientHeading>
          <p className="mt-4 text-dark-400 max-w-2xl mx-auto text-balance">
            Full-Stack Software Developer passionate about building scalable web
            applications with modern technologies.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <GlassCard className="p-8 h-full">
            <h3 className="text-2xl font-bold font-heading mb-4 text-dark-100">
              Who I Am
            </h3>
              <p className="text-dark-300 leading-relaxed mb-6">
                I&apos;m Tinashe Mundieta, a Full-Stack Software Developer based in
                Harare, Zimbabwe. I specialize in building modern web applications
                using Next.js, Prisma, and PostgreSQL. My journey started with
                frontend development and has evolved into full-stack expertise.
              </p>
              <p className="text-dark-300 leading-relaxed">
                I&apos;m passionate about clean code, scalable architecture, and
                creating exceptional user experiences. When I&apos;m not coding, I&apos;m
                exploring new technologies and contributing to open-source projects.
              </p>
            </GlassCard>

          <GlassCard className="p-8 h-full">
            <h3 className="text-2xl font-bold font-heading mb-4 text-dark-100">
              What I Do
            </h3>
              <ul className="space-y-4">
                {[
                  "Build full-stack web applications with Next.js and React",
                  "Design and implement database schemas with Prisma ORM",
                  "Create RESTful APIs and integrate with PostgreSQL",
                  "Develop responsive UIs with Tailwind CSS and modern design patterns",
                  "Implement authentication, authorization, and security best practices",
                  "Optimize application performance and scalability",
                  "Write clean, maintainable, and well-tested code",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-brand-400 mt-1">✓</span>
                    <span className="text-dark-300">{item}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
        </div>

        <div className="mb-20">
          <GradientHeading className="text-center mb-12">
            Career Timeline
          </GradientHeading>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-brand-500/50 to-accent-500/50" />
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div
                  key={item.year}
                  className={`relative flex flex-col md:flex-row ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="w-full md:w-1/2 px-4">
                    <GlassCard className="p-4 md:p-6">
                      <span className="text-brand-400 font-bold text-sm">
                        {item.year}
                      </span>
                      <h4 className="text-lg md:text-xl font-bold mt-2 mb-2">
                        {item.title}
                      </h4>
                      <p className="text-dark-400 text-sm">{item.description}</p>
                    </GlassCard>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-brand-500 rounded-full border-4 border-dark-900 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-20">
          <GradientHeading className="text-center mb-12">
            Skills & Technologies
          </GradientHeading>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {skills.map((skill) => {
              const { icon: Icon, color } = getSkillIcon(skill.icon ?? "");
              return (
                <GlassCard
                  key={skill.id}
                  className="p-4 text-center group cursor-pointer"
                >
                  <Icon
                    className={`w-8 h-8 mx-auto mb-2 transition-transform group-hover:scale-110 ${color}`}
                  />
                  <span className="text-xs text-dark-300">{skill.name}</span>
                </GlassCard>
              );
            })}
          </div>
        </div>

        <div>
          <GradientHeading className="text-center mb-12">
            Core Values
          </GradientHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <GlassCard key={value.title} className="p-6 text-center h-full">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h4 className="text-lg font-bold mb-2">{value.title}</h4>
                <p className="text-dark-400 text-sm">{value.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}