import type { ReactNode } from "react";
import { ArrowUpRight, Download } from "lucide-react";
import { links } from "../../data/links";
import { safeDestination } from "../../lib/placeholders";

export const buttonClass =
  "inline-flex min-h-11 items-center justify-center gap-3 rounded-full px-5 py-3 text-[12px] font-semibold transition duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0";

export function Button({
  href,
  children,
  light = false,
}: {
  href: string;
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <a
      href={href}
      className={`${buttonClass} ${light ? "bg-primary text-dark-primary hover:bg-accent-soft" : "bg-dark-primary text-on-dark hover:bg-dark-secondary"}`}
    >
      {children}
      <ArrowUpRight size={16} />
    </a>
  );
}

export function CVButton({
  compact = false,
  light = false,
  alwaysShow = false,
}: {
  compact?: boolean;
  light?: boolean;
  alwaysShow?: boolean;
}) {
  const configuredDestination = safeDestination(links.cv, true);
  if (!configuredDestination && !alwaysShow) return null;
  const destination = configuredDestination ?? `${import.meta.env.BASE_URL}Samiya_Zaidi-FullStack_Developer.pdf`;
  const classes = `${buttonClass} ${compact ? "min-h-10 px-3 py-2 text-[11px] sm:px-4" : ""} ${light ? "border border-on-dark/35 text-on-dark hover:bg-on-dark/10 focus-visible:outline-on-dark" : "border border-accent/50 bg-surface text-dark-primary hover:bg-secondary"}`;

  return (
    <a  href={destination} className={classes} download="Samiya_Zaidi-FullStack_Developer.pdf" aria-label="Download CV">
      <span className={compact ? "hidden whitespace-nowrap sm:inline" : "whitespace-nowrap"}>Download CV</span>
      <Download size={14} />
    </a>
  );
}
