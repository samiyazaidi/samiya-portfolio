import { BriefcaseBusiness } from "lucide-react";
import type { Experience } from "../../data/experience";

export function ExperienceItem({ item }: { item: Experience }) {
  return (
    <article className="rounded-xl border border-border/70 bg-primary p-4">
      <div className="flex items-start gap-3">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-dark-primary">
          <BriefcaseBusiness size={15} />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-[20px] leading-tight text-dark-primary">
            {item.company}
          </h3>
          {item.role && (
            <p className="mt-1 text-[11px] font-semibold text-text-primary">{item.role}</p>
          )}
          {item.dates && (
            <p className="mt-1 text-[9px] text-text-secondary">{item.dates}</p>
          )}
          {item.description && (
            <p className="mt-2 text-[10px] leading-[1.7] text-text-secondary">
              {item.description}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
