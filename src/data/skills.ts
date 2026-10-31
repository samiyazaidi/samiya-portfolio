import {
  SiReact,
  SiExpo,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiNestjs,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiPrisma,
  SiTailwindcss,
  SiDocker,
  SiGit,
  SiNextdotjs,
  SiExpress,
  SiHtml5,
  SiPhp,
  SiPython,
  SiGithub,
  SiPostman,
  SiSwagger,
  SiFilezilla,
  SiJira,
  SiLinear,
  SiFigma,
  SiVercel,
  SiRailway,
  SiCss,
} from "react-icons/si";

import {
  FiKey,
  FiShield,
  FiLock,
  FiDatabase,
  FiCode,
  FiLayers,
  FiRepeat,
  FiGitBranch,
  FiCloud,
  FiPenTool,
  FiCheckCircle,
} from "react-icons/fi";

import type { IconType } from "react-icons";
import { FaJava } from "react-icons/fa";
import { VscVscode } from "react-icons/vsc";

export interface Skill {
  name: string;
  category: string;
  icon: IconType;
  color: string;
}

export const skills: Skill[] = [
  // Frontend
  { name: "React", category: "Frontend", icon: SiReact, color: "#61DAFB" },
  { name: "React Native", category: "Mobile", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", category: "Frontend", icon: SiNextdotjs, color: "#000000" },
  { name: "HTML5", category: "Frontend", icon: SiHtml5, color: "#E34F26" },
  { name: "CSS3", category: "Frontend", icon: SiCss, color: "#1572B6" },
  { name: "Tailwind CSS", category: "Styling", icon: SiTailwindcss, color: "#06B6D4" },

  // Languages
  { name: "TypeScript", category: "Language", icon: SiTypescript, color: "#3178C6" },
  { name: "JavaScript", category: "Language", icon: SiJavascript, color: "#F7DF1E" },
  { name: "Python", category: "Language", icon: SiPython, color: "#3776AB" },
  { name: "Java", category: "Language", icon: FaJava , color: "#007396" },
  { name: "PHP", category: "Language", icon: SiPhp, color: "#777BB4" },

  // Mobile development and build tools
  { name: "Expo", category: "Mobile", icon: SiExpo, color: "#000020" },
  { name: "Expo EAS Build", category: "Build Tools", icon: SiExpo, color: "#000020" },

  // Backend
  { name: "Node.js", category: "Backend", icon: SiNodedotjs, color: "#5FA04E" },
  { name: "Express", category: "Backend", icon: SiExpress, color: "#000000" },
  { name: "NestJS", category: "Backend", icon: SiNestjs, color: "#E0234E" },

  // Databases and ORM
  { name: "MySQL", category: "Database", icon: SiMysql, color: "#4479A1" },
  { name: "PostgreSQL", category: "Database", icon: SiPostgresql, color: "#4169E1" },
  { name: "MongoDB", category: "Database", icon: SiMongodb, color: "#47A248" },
  { name: "Prisma", category: "Data Layer", icon: SiPrisma, color: "#2D3748" },
  { name: "TypeORM", category: "Data Layer", icon: FiDatabase, color: "#142F4D" },

  // Authentication and security
  { name: "JWT", category: "Authentication & Security", icon: FiKey, color: "#142F4D" },
  { name: "OAuth 2.0", category: "Authentication & Security", icon: FiShield, color: "#4285F4" },
  { name: "RBAC", category: "Authentication & Security", icon: FiLock, color: "#142F4D" },
  { name: "Session Management", category: "Authentication & Security", icon: FiShield, color: "#64748B" },

  // Version control
  { name: "Git", category: "Version Control", icon: SiGit, color: "#F05032" },
  { name: "GitHub", category: "Version Control", icon: SiGithub, color: "#181717" },

  // Development tools and API testing
  { name: "VS Code", category: "Development Tools", icon: VscVscode, color: "#007ACC" },
  { name: "Postman", category: "API Tools", icon: SiPostman, color: "#FF6C37" },
  { name: "Swagger", category: "API Tools", icon: SiSwagger, color: "#85EA2D" },
  { name: "Playwright", category: "Testing", icon: FiCheckCircle, color: "#2EAD33" },
  { name: "FileZilla", category: "Development Tools", icon: SiFilezilla, color: "#BF0000" },

  // Project management
  { name: "Jira", category: "Project Management", icon: SiJira, color: "#0052CC" },
  { name: "Linear", category: "Project Management", icon: SiLinear, color: "#5E6AD2" },

  // Design tools
  { name: "Figma", category: "Design Tools", icon: SiFigma, color: "#F24E1E" },
  { name: "Canva", category: "Design Tools", icon: FiPenTool, color: "#00C4CC" },

  // Deployment and infrastructure
  { name: "AWS EC2", category: "Cloud & Infrastructure", icon: FiCloud, color: "#FF9900" },
  { name: "Docker", category: "Deployment", icon: SiDocker, color: "#2496ED" },
  { name: "Vercel", category: "Deployment", icon: SiVercel, color: "#000000" },
  { name: "Railway", category: "Deployment", icon: SiRailway, color: "#0B0D0E" },

  // APIs and development practices
  { name: "RESTful APIs", category: "API & Development", icon: FiCode, color: "#142F4D" },
  { name: "SaaS Development", category: "Development Practices", icon: FiLayers, color: "#64748B" },
  { name: "Agile Development", category: "Development Practices", icon: FiRepeat, color: "#0D9488" },
  { name: "CI/CD Pipeline", category: "DevOps", icon: FiGitBranch, color: "#64748B" },
];

export const skillByName = Object.fromEntries(
  skills.map((skill) => [skill.name, skill]),
) as Record<string, Skill>;