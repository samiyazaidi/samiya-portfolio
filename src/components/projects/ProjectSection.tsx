// import { ProjectCarousel } from "./ProjectCarousel";

// export function ProjectSection() {
//   return (
//     <section
//       id="projects"
//       aria-labelledby="projects-title"
//       className="relative overflow-hidden bg-secondary py-7 sm:py-8"
//     >
//       <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
//         <div className="mb-2 flex flex-wrap items-end justify-between gap-3">
//           <div>
//             <p className="mb-1.5 flex items-center gap-2 text-[9px] font-semibold tracking-[0.22em] text-accent-strong uppercase">
//               <span className="h-px w-6 bg-accent" />
//               Selected projects
//             </p>
//             <h2 id="projects-title" className="font-display text-3xl leading-[1.02] tracking-tight text-text-primary sm:text-4xl">
//               A few things I’ve <em className="font-normal text-dark-primary">built.</em>
//             </h2>
//           </div>
//           <p className="hidden max-w-xs pb-1 text-[11px] leading-relaxed text-text-secondary md:block">
//             Web, mobile, and connected products shaped around practical needs.
//           </p>
//         </div>
//         <ProjectCarousel />
//       </div>
//     </section>
//   );
// }

import { ProjectCarousel } from "./ProjectCarousel";

export function ProjectSection() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="relative overflow-hidden bg-secondary py-7 sm:py-8"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mb-2 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="mb-1.5 flex items-center gap-2 text-[9px] font-semibold tracking-[0.22em] text-accent-strong uppercase">
              <span className="h-px w-6 bg-accent" />
              Selected projects
            </p>
            <h2 id="projects-title" className="font-display text-3xl leading-[1.02] tracking-tight text-text-primary sm:text-4xl">
              A few things I’ve <em className="font-normal text-dark-primary">built.</em>
            </h2>
          </div>
          <p className="hidden max-w-xs pb-1 text-[11px] leading-relaxed text-text-secondary md:block">
            Web, mobile, and connected products shaped around practical needs.
          </p>
        </div>
        {/* Keep the existing carousel to preserve the original horizontal-scroll layout and card sizing. */}
        <ProjectCarousel />
      </div>
    </section>
  );
}
