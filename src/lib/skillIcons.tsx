import {
  FaCode,
  FaDatabase,
  FaFlask,
  FaGitAlt,
  FaLinux,
  FaNodeJs,
  FaReact,
  FaWindows,
} from "react-icons/fa";
import {
  SiDocker,
  SiJavascript,
  SiNextdotjs,
  SiPostgresql,
  SiPrisma,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

export const SKILL_ICON_MAP: Record<string, { icon: typeof FaCode; color: string }> = {
  nextdotjs: { icon: SiNextdotjs, color: "text-white" },
  react: { icon: FaReact, color: "text-[#61dafb]" },
  typescript: { icon: SiTypescript, color: "text-[#3178c6]" },
  nodejs: { icon: FaNodeJs, color: "text-[#339933]" },
  prisma: { icon: SiPrisma, color: "text-white" },
  postgresql: { icon: SiPostgresql, color: "text-[#336791]" },
  javascript: { icon: SiJavascript, color: "text-[#f7df1e]" },
  tailwindcss: { icon: SiTailwindcss, color: "text-[#06b6d4]" },
  docker: { icon: SiDocker, color: "text-[#2496ed]" },
  git: { icon: FaGitAlt, color: "text-[#f05032]" },
  linux: { icon: FaLinux, color: "text-[#fcc624]" },
  windows: { icon: FaWindows, color: "text-[#0078d4]" },
  express: { icon: FaCode, color: "text-white" },
  restapi: { icon: FaDatabase, color: "text-[#06b6d4]" },
  testing: { icon: FaFlask, color: "text-[#f7df1e]" },
};

export function getSkillIcon(name: string): { icon: typeof FaCode; color: string } {
  const key = name.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  return SKILL_ICON_MAP[key] ?? { icon: FaCode, color: "text-white" };
}