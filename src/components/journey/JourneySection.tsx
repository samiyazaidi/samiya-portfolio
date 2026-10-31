import { GraduationCap } from "lucide-react";
import { experience } from "../../data/experience";
import { education } from "../../data/education";
import { ContactForm } from "../contact/ContactForm";

export function JourneySection() {
  return (
    <section className="relative isolate overflow-hidden bg-secondary px-5 py-7 sm:px-8 sm:py-9 lg:px-10">
      <div aria-hidden className="pointer-events-none absolute -bottom-28 left-[34%] z-0 size-72 rounded-full border border-accent/20" />
      <div aria-hidden className="pointer-events-none absolute -bottom-20 left-[39%] z-0 size-56 rounded-full bg-tertiary/35" />
      <svg aria-hidden viewBox="0 0 1440 85" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 top-0 z-0 h-20 w-full text-accent/35">
        <path d="M0 20 C150 78 260 7 415 33 S700 92 850 37 S1190 1 1440 52" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="415" cy="33" r="3" fill="var(--color-accent-strong)" />
        <circle cx="850" cy="37" r="3" fill="var(--color-accent-strong)" />
      </svg>

      <div className="relative z-10 mx-auto grid max-w-7xl items-start gap-6 md:grid-cols-2 xl:grid-cols-[1fr_1fr_2fr] xl:gap-5">
        <section id="experience" aria-labelledby="experience-title" className="scroll-mt-28 min-w-0 py-2">
          <p className="mb-1.5 text-[9px] font-semibold tracking-[0.22em] text-accent-strong uppercase">Work experience</p>
          <h2 id="experience-title" className="mb-5 font-display text-3xl leading-[1.02] text-dark-primary sm:text-[34px]">Professional Journey</h2>
          <div className="space-y-4">
            {experience.map((item, index) => (
              <article key={`${item.company}-${item.dates}`} className="relative pl-8">
                {index !== experience.length - 1 && (
                  <span aria-hidden className="absolute left-[7px] top-4 bottom-[-20px] border-l border-dashed border-accent/80" />
                )}
                <span aria-hidden className="absolute left-0 top-1 flex size-[15px] items-center justify-center rounded-full border-[3px] border-dark-primary bg-primary ring-[4px] ring-tertiary" />
                {item.dates && <p className="text-[10px] font-medium tracking-wide text-accent-strong">{item.dates}</p>}
                <h3 className="mt-0.5 font-sans text-[12px] font-semibold leading-snug text-text-primary">{item.company}</h3>
                <p className="mt-0.5 text-[10px] text-text-secondary">{item.role}</p>
                {item.description && <p className="mt-1.5 max-w-sm text-[10px] leading-[1.6] text-text-secondary">{item.description}</p>}
              </article>
            ))}
          </div>
        </section>

        <section id="education" aria-labelledby="education-title" className="scroll-mt-28 min-w-0 border-t border-border/70 py-5 md:border-t-0 md:border-l md:pl-5 xl:border-l xl:pl-5">
          <p className="mb-1.5 text-[9px] font-semibold tracking-[0.22em] text-accent-strong uppercase">Education</p>
          <h2 id="education-title" className="mb-5 font-display text-3xl leading-[1.02] text-dark-primary sm:text-[34px]">Academic Background</h2>
          <div className="space-y-5">
            {education.map((item, index) => (
              <article key={item.degree} className="relative flex gap-3 pl-1">
                {index !== education.length - 1 && (
                  <span aria-hidden className="absolute left-[22px] top-[47px] bottom-[-21px] border-l border-dashed border-accent/80" />
                )}
                <span className="relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full bg-tertiary text-on-dark ring-4 ring-secondary">
                  <GraduationCap size={20} strokeWidth={1.6} />
                </span>
                <div className="min-w-0 pt-1">
                  {item.dates && <p className="text-[10px] font-medium text-accent-strong">{item.dates}</p>}
                  <h3 className="mt-0.5 font-sans text-[12px] font-semibold leading-snug text-text-primary">{item.abbreviation} — {item.degree}</h3>
                  <p className="mt-1 text-[10px] text-text-secondary">{item.institution}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" aria-labelledby="contact-title" className="scroll-mt-28 relative min-w-0 overflow-hidden rounded-[25px] bg-linear-to-br from-dark-primary via-dark-primary to-dark-secondary p-5 text-on-dark shadow-lg shadow-dark-secondary/20 sm:p-6 md:col-span-2 xl:col-span-1 lg:self-center">
          <div aria-hidden className="pointer-events-none absolute -right-14 -top-20 z-0 size-64 rounded-full border border-on-dark/10" />
          <div aria-hidden className="pointer-events-none absolute -right-7 -top-9 z-0 size-44 rounded-full border border-on-dark/10" />
          <div className="relative z-10">
            <p className="mb-1.5 text-[9px] font-semibold tracking-[0.22em] text-on-dark-muted uppercase">Let’s connect</p>
            <h2 id="contact-title" className="font-display text-3xl leading-[1.03] sm:text-[34px]">Have an idea or opportunity?</h2>
            <p className="mt-2 max-w-lg text-[11px] leading-relaxed text-on-dark-muted sm:text-xs">
              Open to thoughtful teams, interesting projects and meaningful collaborations.
            </p>
            <ContactForm />
          </div>
        </section>
      </div>
    </section>
  );
}
