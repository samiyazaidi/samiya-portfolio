import { portfolio } from "../../data/portfolio";
import { services } from "../../data/services";
import { ServiceCard } from "./ServiceCard";

export function WhatIDoSection() {
  return (
    <section id="capabilities" className="relative overflow-hidden bg-primary py-8 sm:py-10">
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-28 size-80 rounded-full bg-tertiary/55 blur-[1px]" />
      <div aria-hidden className="pointer-events-none absolute -right-10 -top-14 size-56 rounded-full border border-accent/25" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-6 px-5 sm:px-8 lg:grid-cols-[1.13fr_.87fr] lg:items-stretch lg:gap-7 lg:px-10">
        <div className="min-w-0 py-1">
          <p className="mb-2 flex items-center gap-2 text-[9px] font-semibold tracking-[0.22em] text-accent-strong uppercase">
            <span className="h-px w-6 bg-accent" />
            What I do
          </p>
          <h2 className="font-display text-3xl leading-[1.05] tracking-tight text-text-primary sm:text-4xl">
            From Idea to Impact
          </h2>
          <p className="mt-2 max-w-xl text-xs leading-relaxed text-text-secondary sm:text-[13px]">
            I contribute across the full product lifecycle — from crafting intuitive interfaces to building robust backends and supporting deployment.
          </p>

          <div className="relative mt-3 inline-flex items-center gap-3">
            <svg aria-hidden viewBox="0 0 68 18" className="h-5 w-16 shrink-0 text-accent-strong">
              <path d="M1 14 C16 1 30 19 45 8 S60 3 67 6" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
              <circle cx="45" cy="8" r="2.4" fill="currentColor" />
            </svg>
            <p className="font-display text-lg italic leading-none text-dark-primary sm:text-xl">
              Built to work. Built to last.
            </p>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2.5 xl:grid-cols-4">
            {services.map((service, index) => (
              <ServiceCard key={service.title} service={service} index={index}  />
            ))}
          </div>
        </div>

        <aside id="about" className="relative isolate flex min-h-[260px] scroll-mt-28 flex-col justify-center overflow-hidden rounded-[26px] bg-linear-to-br from-dark-primary via-dark-primary to-dark-secondary p-6 text-on-dark shadow-lg shadow-dark-secondary/20 sm:p-7 lg:min-h-full lg:p-8">
          <div aria-hidden className="pointer-events-none absolute -right-10 -top-14 z-0 size-60 rounded-full border border-on-dark/15" />
          <div aria-hidden className="pointer-events-none absolute -right-2 -top-5 z-0 size-40 rounded-full border border-on-dark/10" />
          <svg aria-hidden viewBox="0 0 420 220" className="pointer-events-none absolute -right-5 bottom-0 z-0 h-40 w-[85%] opacity-70">
            <path d="M-10 175 C82 205 100 115 174 139 S268 203 338 127 S404 77 446 90" fill="none" stroke="var(--color-accent-soft)" strokeWidth="1.1" />
            <path d="M208 218 C255 169 276 170 313 185 S375 204 434 154" fill="none" stroke="var(--color-on-dark)" strokeWidth=".8" opacity=".5" />
            <g fill="var(--color-accent-soft)" opacity=".7">
              <ellipse cx="348" cy="128" rx="5" ry="11" transform="rotate(-28 348 128)" />
              <ellipse cx="370" cy="146" rx="4" ry="10" transform="rotate(32 370 146)" />
              <ellipse cx="388" cy="116" rx="4" ry="9" transform="rotate(-22 388 116)" />
              <ellipse cx="400" cy="148" rx="5" ry="11" transform="rotate(35 400 148)" />
            </g>
          </svg>
          <div className="relative z-10">
            <p className="mb-3 text-[9px] font-semibold tracking-[0.22em] text-on-dark-muted uppercase">About me</p>
            <h2 className="max-w-lg font-display text-3xl leading-[1.02] tracking-tight sm:text-4xl">
              More Than Just Code
            </h2>
            <p className="mt-4 max-w-xl text-xs leading-[1.85] text-on-dark-muted sm:text-[13px]">
              {portfolio.about}
            </p>
            <a href="#experience" className="mt-5 inline-flex min-h-10 w-fit items-center gap-3 rounded-full bg-accent px-4 py-2 text-[11px] font-semibold text-on-dark transition hover:bg-accent-strong focus-visible:outline-on-dark">
              See my journey <span aria-hidden>↗</span>
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}
