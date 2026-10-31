import { ArrowLeft, ArrowRight } from "lucide-react";
import { skills } from "../../data/skills";
import { SkillTile } from "./SkillTile";
import { useHorizontalCarousel } from "../ui/useHorizontalCarousel";
import { IconButton } from "../ui/IconButton";

export function SkillsCarousel() {
  const { ref, edges, step, dragging, handlers } = useHorizontalCarousel();
  return (
    <div>
      <div
        ref={ref}
        {...handlers}
        tabIndex={0}
        role="region"
        aria-label="Technologies carousel; scroll or drag to browse skills"
        data-testid="skills-carousel"
        className={`flex touch-pan-x gap-2 overflow-x-auto overscroll-x-contain py-1.5 select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${dragging ? "cursor-grabbing" : "cursor-grab snap-x snap-mandatory"}`}
      >
        {skills.map((skill) => (
          <SkillTile key={skill.name} skill={skill} />
        ))}
      </div>
      <div className="mt-1 flex justify-end gap-1.5">
        <IconButton
          aria-label="Previous skills"
          disabled={edges.start}
          onClick={() => step(-1)}
          className="size-7 border-border bg-surface text-dark-primary hover:bg-tertiary"
        >
          <ArrowLeft size={12} />
        </IconButton>
        <IconButton
          aria-label="Next skills"
          disabled={edges.end}
          onClick={() => step(1)}
          className="size-7 border-border bg-surface text-dark-primary hover:bg-tertiary"
        >
          <ArrowRight size={12} />
        </IconButton>
      </div>
    </div>
  );
}
