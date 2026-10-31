import { AppWindow, Database, Smartphone, ServerCog } from "lucide-react";

export const services = [
  {
    icon: AppWindow,
    title: "Web Development",
    label: "WEB",
    description: "Responsive, accessible interfaces built around real workflows.",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    label: "MOBILE",
    description: "Cross-platform apps with React Native and Expo.",
  },
  {
    icon: ServerCog,
    title: "Backend & APIs",
    label: "BACKEND",
    description: "Secure APIs, authentication, and reliable server-side systems.",
  },
  {
    icon: Database,
    title: "Database & Deployment",
    label: "DATA & DELIVERY",
    description: "Thoughtful data models and dependable releases.",
  },
] as const;
