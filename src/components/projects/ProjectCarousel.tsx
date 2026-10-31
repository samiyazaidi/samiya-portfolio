import { ArrowLeft, ArrowRight } from "lucide-react";
import { projects } from "../../data/projects";
import { ProjectCard } from "./ProjectCard";
import { IconButton } from "../ui/IconButton";
import { useHorizontalCarousel } from "../ui/useHorizontalCarousel";
import { useRobot } from "../robot/RobotController";

export function ProjectCarousel() {
  const { ref, edges, step, dragging, handlers } = useHorizontalCarousel();
  const robot = useRobot();

  return (
    <div>
      <div className="mb-1 flex items-center justify-end gap-2">
        <span className="mr-1 hidden text-[10px] text-text-secondary sm:inline">Drag or scroll to explore</span>
        <IconButton
          aria-label="Previous project"
          disabled={edges.start}
          onClick={() => {
            step(-1);
            robot({ state: "guide-carousel" });
          }}
          className="size-8 border-border bg-surface text-dark-primary hover:bg-tertiary disabled:opacity-35"
        >
          <ArrowLeft size={14} />
        </IconButton>
        <IconButton
          aria-label="Next project"
          disabled={edges.end}
          onClick={() => {
            step(1);
            robot({ state: "guide-carousel" });
          }}
          className="size-8 border-border bg-surface text-dark-primary hover:bg-tertiary disabled:opacity-35"
        >
          <ArrowRight size={14} />
        </IconButton>
      </div>
      <div
        ref={ref}
        {...handlers}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Featured projects; drag or use the previous and next buttons to browse"
        data-testid="project-carousel"
        className={`flex touch-pan-x gap-3 overflow-x-auto overscroll-x-contain px-1 pt-1 pb-3 select-none [scrollbar-color:var(--color-accent)_var(--color-secondary)] [scrollbar-width:thin] focus-visible:outline-accent-strong ${dragging ? "cursor-grabbing snap-none" : "cursor-grab snap-x snap-mandatory"}`}
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${projects.length}`}
            className="w-[min(78vw,286px)] shrink-0 snap-start sm:w-[min(40vw,270px)] lg:w-[min(26vw,270px)] xl:w-[min(18vw,220px)]"
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </div>
  );
}
