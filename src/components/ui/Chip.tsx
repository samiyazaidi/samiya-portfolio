import { skillByName } from "../../data/skills";
export function Chip({ name }: { name: string }) {
  const Icon = skillByName[name]?.icon;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-2.5 py-1.5 text-[10px] leading-none text-text-secondary">
      {Icon && <Icon aria-hidden size={11} className="text-dark-primary" />} {name}
    </span>
  );
}
