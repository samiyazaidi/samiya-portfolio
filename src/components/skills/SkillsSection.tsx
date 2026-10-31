import { SkillsCarousel } from "./SkillsCarousel";

export function SkillsSection() {
  return (
    <section id="skills" className="border-y border-border/70 bg-primary py-5 sm:py-6">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="mb-1 flex items-center gap-2 text-[9px] font-semibold tracking-[0.22em] text-accent-strong uppercase">
              <span className="h-px w-6 bg-accent" />
              Tech stack & tools
            </p>
            <h2 className="font-display text-2xl leading-tight text-text-primary sm:text-3xl">
              Technologies I <em className="font-normal text-dark-primary">work with.</em>
            </h2>
          </div>
        </div>
        <SkillsCarousel />
      </div>
    </section>
  );
}
