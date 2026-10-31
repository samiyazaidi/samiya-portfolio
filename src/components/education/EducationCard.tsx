import { GraduationCap } from "lucide-react";
import { education } from "../../data/education";

export function EducationCard({ item }: { item: (typeof education)[number] }) {
  return (
    <article className="flex items-start gap-3 rounded-xl border border-border/70 bg-primary p-4">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-dark-primary">
        <GraduationCap size={16} strokeWidth={1.5} />
      </span>
      <div className="min-w-0">
        {item.dates && (
          <p className="mb-1 text-[9px] font-medium tracking-wide text-text-secondary">
            {item.dates}
          </p>
        )}
        <h3 className="font-display text-[19px] leading-tight text-dark-primary">
          {item.abbreviation}
        </h3>
        <p className="mt-1 text-[10px] leading-relaxed text-text-primary">{item.degree}</p>
        <p className="mt-1 text-[9px] text-text-secondary">{item.institution}</p>
      </div>
    </article>
  );
}
