import { useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { navigation } from "../../data/portfolio";
import { CVButton } from "../ui/Button";
import { QuickLinksPopover } from "./QuickLinksPopover";
import { MobileNavigation } from "./MobileNavigation";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);

  return (
    <header className="relative z-40 bg-linear-to-r from-dark-primary via-dark-secondary to-dark-tertiary text-primary">
      <div className="mx-auto flex min-h-[68px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-8 lg:px-10">
        <a
          href="#home"
          aria-label="Samiya home"
          className="font-display text-4xl tracking-[-0.07em] text-on-dark focus-visible:outline-accent-strong"
        >
          Samiya<span className="text-tertiary">.</span>
        </a>
        <nav aria-label="Main navigation" className="hidden items-center gap-5 lg:flex">
          {navigation.map((item) => (
            <a
              key={item.id}
              className="rounded-sm text-[11px] text-text-tertiary transition hover:text-tertiary focus-visible:outline-accent-strong"
              href={`#${item.id}`}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <QuickLinksPopover />
          <CVButton compact alwaysShow />
          <button
            type="button"
            ref={toggle}
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close navigation" : "Open navigation"}
            className="rounded-full p-2 text-dark-primary focus-visible:outline-accent-strong lg:hidden"
          >
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>
      <MobileNavigation
        open={open}
        onClose={() => setOpen(false)}
        onReturnFocus={() => toggle.current?.focus()}
      />
<svg
  aria-hidden="true"
  viewBox="0 0 1440 26"
  preserveAspectRatio="none"
  className="pointer-events-none absolute top-full h-5 w-full"
>
  <defs>
    <linearGradient
      id="headerWaveGradient"
      x1="0%"
      y1="0%"
      x2="100%"
      y2="0%"
    >
      <stop offset="0%" stopColor="var(--color-dark-primary)" />
      <stop offset="50%" stopColor="var(--color-dark-secondary)" />
      <stop offset="100%" stopColor="var(--color-dark-tertiary)" />
    </linearGradient>
  </defs>

  <path
    d="M0 0H1440V3C1100 32 1060 20 720 9S250 35 0 11Z"
    fill="url(#headerWaveGradient)"
  />
</svg>
      <svg
        aria-hidden
        viewBox="0 0 1440 30"
        preserveAspectRatio="none"
        className="pointer-events-none absolute left-0 top-full z-10 h-7 w-full overflow-visible"
      >
        <path
          d="M0 11 C150 -1 250 22 405 16 S650 -2 735 14 S1000 28 1124 10 S1320 4 1440 17"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="1.15"
          opacity=".78"
        />
        <path
          d="M0 18 C185 4 300 30 470 20 S700 5 846 20 S1140 32 1440 8"
          fill="none"
          stroke="var(--color-tertiary)"
          strokeWidth="1"
        />
        <circle cx="735" cy="14" r="3" fill="var(--color-accent-strong)" />
      </svg>
    </header>
  );
}
