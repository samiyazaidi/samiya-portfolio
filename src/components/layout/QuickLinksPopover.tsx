import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp, LayoutGrid, Mail, Phone, X } from "lucide-react";
import { SiGithub as Github } from "react-icons/si";
import { FaLinkedinIn as Linkedin } from "react-icons/fa6";
import { links } from "../../data/links";
import { safeDestination } from "../../lib/placeholders";
import {
  CONTACT_EMAIL,
  confirmPhoneClick,
  getPhoneHref,
} from "../../utils/contactActions";
export const professionalIcons = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
  phone: Phone,
};

function getLinkDetail(id: string, value: string, href: string | null) {
  if (value.trim()) return value;
  if (!href) return "Not configured";
  if (id === "email") return href.replace(/^mailto:/i, "");
  if (id === "phone") return href.replace(/^tel:/i, "");
  return "Open profile";
}

export function QuickLinksPopover() {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

const professionalLinks = useMemo(
  () =>
    links.professional.map((link) => ({
      ...link,
      destination:
        link.id === "email"
          ? `mailto:${CONTACT_EMAIL}`
          : link.id === "phone"
            ? getPhoneHref(link.value)
            : safeDestination(link.href),
    })),
  [],
);

  useEffect(() => {
    if (!open) return;

    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    };

    document.addEventListener("pointerdown", closeOnOutsidePointer);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePointer);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <div ref={root} className="relative z-50">
      <button
        ref={trigger}
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-controls="quick-links-popover"
        className={`inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-5 text-sm font-semibold transition-colors focus-visible:outline-accent-strong ${
          open
            ? "bg-primary text-dark-primary"
            : "bg-dark-primary text-on-dark hover:bg-dark-secondary"
        }`}
      >
        <span>Quick Links</span>
        {open ? (
          <ChevronUp size={18} aria-hidden="true" />
        ) : (
          <LayoutGrid size={17} aria-hidden="true" />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.section
            id="quick-links-popover"
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.985 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            role="region"
            aria-label="Quick links and contact destinations"
            className="absolute right-0 top-[calc(100%+14px)] z-[60] w-[min(465px,calc(100vw-32px))] origin-top-right rounded-[26px] border border-accent/25 bg-surface p-5 text-text-primary shadow-2xl shadow-dark-secondary/20 sm:p-7"
          >
            <div className="mb-5 flex items-center justify-between gap-4">
              <h2 className="font-display text-3xl leading-tight text-dark-primary sm:text-[34px]">
                A little closer.
              </h2>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  trigger.current?.focus();
                }}
                aria-label="Close Quick Links"
                className="flex size-9 shrink-0 items-center justify-center rounded-full text-dark-primary transition hover:bg-secondary focus-visible:outline-accent-strong"
              >
                <X size={21} strokeWidth={1.8} aria-hidden="true" />
              </button>
            </div>

            <div className="space-y-1.5">
              {professionalLinks.map((link) => {
                const Icon = professionalIcons[link.id as keyof typeof professionalIcons];
                if (!Icon) return null;

                const detail = getLinkDetail(link.id, link.value, link.destination);
                const rowClassName =
                  "flex min-h-[76px] items-center gap-4 rounded-2xl bg-secondary px-4 py-3.5 transition-colors sm:px-5";
                const contents = (
                  <>
                    <span className="flex size-7 shrink-0 items-center justify-center text-accent-strong">
                      <Icon size={23} aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-base font-semibold leading-5 text-accent-strong">
                        {link.label}
                      </span>
                      <span className="mt-1 block break-words text-sm leading-5 text-accent-strong/75">
                        {detail}
                      </span>
                    </span>
                  </>
                );

                if (!link.destination) {
                  return (
                    <div
                      key={link.id}
                      className={`${rowClassName} cursor-default`}
                      aria-label={`${link.label}: ${detail}`}
                    >
                      {contents}
                    </div>
                  );
                }

                return (
                 <a
                  key={link.id}
                  href={link.destination}
                  onClick={(event) => {
                    if (link.id === "phone") {
                      confirmPhoneClick(event, link.value);
                    }
                  }}
                  target={
                    link.destination.startsWith("https:")
                      ? "_blank"
                      : undefined
                  }
                  rel={
                    link.destination.startsWith("https:")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className={`${rowClassName} hover:bg-tertiary/60 focus-visible:outline-accent-strong`}
                >
                  {contents}
                </a>
                );
              })}
            </div>


          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
 