import type { ReactNode } from "react";
export function SectionHeading({
  eyebrow,
  title,
  children,
  dark = false,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  dark?: boolean;
}) {
  return (
    <div className="mb-9 flex flex-wrap items-end justify-between gap-6">
      <div className="max-w-2xl">
        <p
          className={`mb-3 flex items-center gap-3 text-[10px] font-semibold tracking-[0.22em] uppercase ${dark ? "text-on-dark-muted" : "text-text-secondary"}`}
        >
          <span className={`h-px w-7 ${dark ? "bg-accent-soft" : "bg-accent"}`} />
          {eyebrow}
        </p>
        <h2 className="font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.5rem]">
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}
