// import { motion } from "framer-motion";
// import { ArrowRight } from "lucide-react";
// import { Link } from "react-router-dom";
// import type { Project } from "../../data/projects";
// import { useReducedMotionPreference } from "../../hooks/useReducedMotionPreference";
// import { useRobot } from "../robot/RobotController";
// import { Chip } from "../ui/Chip";
// import { ProjectPreview } from "./ProjectPreview";

// export function ProjectCard({ project }: { project: Project }) {
//   const robot = useRobot();
//   const reduced = useReducedMotionPreference();

//   return (
//     <motion.article
//       whileHover={reduced ? undefined : { y: -3 }}
//       className="h-full"
//       onPointerEnter={(event) => {
//         if (event.pointerType === "mouse") {
//           robot({ state: "peek", target: event.currentTarget, duration: 1000 });
//         }
//       }}
//     >
//       <Link
//         to={`/projects/${project.slug}`}
//         aria-label={`View case study: ${project.title}`}
//         onFocus={(event) => robot({ state: "inspect", target: event.currentTarget })}
//         className="group flex h-full min-h-[242px] flex-col overflow-hidden rounded-[17px] border border-border/75 bg-surface text-text-primary shadow-sm shadow-dark-secondary/10 transition-shadow hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-strong"
//       >
//         <ProjectPreview project={project} />
//         <div className="flex flex-1 flex-col p-3">
//           <h3 className="font-display text-[19px] leading-tight text-dark-primary sm:text-[20px]">
//             {project.title}
//           </h3>
//           <p className="mt-1 text-[9px] font-medium tracking-wide text-text-secondary uppercase">
//             {project.category}
//           </p>
//           <p className="mt-2 line-clamp-3 text-[10px] leading-[1.55] text-text-secondary">
//             {project.description}
//           </p>
//           {project.stack.length > 0 && (
//             <div className="mt-auto flex flex-wrap gap-1 pt-2.5">
//               {project.stack.map((name) => (
//                 <Chip key={name} name={name} />
//               ))}
//             </div>
//           )}
//           <span className="mt-3 inline-flex items-center gap-1 self-start text-[11px] font-semibold text-accent-strong transition-colors group-hover:text-dark-primary">
//             View case study <ArrowRight size={13} aria-hidden="true" />
//           </span>
//         </div>
//       </Link>
//     </motion.article>
//   );
// }
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronUp, Plus } from "lucide-react";
import type { Project } from "../../data/projects";
import { useReducedMotionPreference } from "../../hooks/useReducedMotionPreference";
import { useRobot } from "../robot/RobotController";
import { Chip } from "../ui/Chip";
import { ProjectPreview } from "./ProjectPreview";

/** Compact carousel card. The plus button expands copy downward in place. */
export function ProjectCard({ project }: { project: Project }) {
  const robot = useRobot();
  const reduced = useReducedMotionPreference();
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.article
      layout
      transition={{ layout: { duration: reduced ? 0 : 0.22, ease: "easeOut" } }}
      whileHover={reduced ? undefined : { y: -3 }}
      className="group flex h-full min-h-[242px] w-full flex-col overflow-hidden rounded-[17px] border border-border/75 bg-surface text-text-primary shadow-sm shadow-dark-secondary/10 transition-shadow hover:shadow-md"
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") {
          robot({ state: "peek", target: event.currentTarget, duration: 1000 });
        }
      }}
    >
      <ProjectPreview project={project} />

      <div className="flex flex-1 flex-col p-3">
        <div className="flex min-w-0 items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="h-[2.35em] line-clamp-2 overflow-hidden font-display text-[19px] leading-tight text-dark-primary sm:text-[20px]">
              {project.title}
            </h3>
            <p className="mt-1 text-[9px] font-medium tracking-wide text-text-secondary uppercase">
              {project.category}
            </p>
          </div>
          {project.featured && (
            <span className="mt-0.5 shrink-0 rounded-full border border-accent/30 bg-accent/10 px-2 py-1 text-[8px] font-semibold tracking-wide text-accent-strong">
              Featured
            </span>
          )}
        </div>

        <div className="mt-2 flex items-start gap-1.5">
          <p
            className={`min-w-0 flex-1 text-[10px] leading-[1.55] text-text-secondary ${
              expanded ? "" : "line-clamp-2"
            }`}
          >
            {project.description}
          </p>
          <button
            type="button"
            aria-label={expanded ? `Show less about ${project.title}` : `Show more about ${project.title}`}
            aria-expanded={expanded}
            onClick={() => setExpanded((value) => !value)}
            onFocus={(event) => robot({ state: "inspect", target: event.currentTarget })}
            className="-mt-1 flex size-7 shrink-0 items-center justify-center rounded-full border border-border/75 bg-secondary text-dark-primary shadow-sm transition hover:border-accent/50 hover:bg-accent/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-strong"
          >
            {expanded ? <ChevronUp size={15} aria-hidden="true" /> : <Plus size={15} aria-hidden="true" />}
          </button>
        </div>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="expanded-description"
              initial={reduced ? false : { height: 0, opacity: 0, y: -3 }}
              animate={{ height: "auto", opacity: 1, y: 0 }}
              exit={reduced ? undefined : { height: 0, opacity: 0, y: -3 }}
              transition={{ duration: reduced ? 0 : 0.22, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <p className="mt-2 border-t border-border/60 pt-2 text-[10px] leading-[1.65] text-text-secondary">
                {project.expandedDescription || project.overview}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {project.stack.length > 0 && (
          <div className="mt-auto flex h-[64px] shrink-0 flex-wrap content-start gap-1 overflow-hidden pt-2.5">
            {project.stack.map((name) => (
              <Chip key={name} name={name} />
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
}
