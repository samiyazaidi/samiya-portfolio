import { ArrowUp } from "lucide-react";
import { portfolio } from "../../data/portfolio";
import { links } from "../../data/links";
import { safeDestination } from "../../lib/placeholders";
import { professionalIcons } from "./QuickLinksPopover";

// const footerNavigation = [
//   { id: "home", label: "Home" },
//   { id: "about", label: "About" },
//   { id: "projects", label: "Projects" },
//   { id: "skills", label: "Skills" },
//   { id: "experience", label: "Experience" },
//   { id: "education", label: "Education" },
//   { id: "contact", label: "Contact" },
// ];

export function SiteFooter() {
  return (
    <footer className="bg-dark-secondary text-on-dark-muted">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-5 py-3 sm:py-4 lg:py-5">
          {/* <a
            href="#home"
            aria-label={`${portfolio.name} — back to home`}
            className="font-display text-2xl leading-none tracking-[-0.075em] text-on-dark transition hover:text-on-dark focus-visible:outline-accent sm:text-5xl"
          >
            {portfolio.name}<span>.</span>
          </a> */}
          <div>
          <p className="text-xs font-medium text-on-dark-muted/90 sm:text-sm">
            © {new Date().getFullYear()} {portfolio.name}. Thoughtfully built.
          </p>
          </div>
          {/* <nav
            aria-label="Footer navigation"
            className="order-3 flex basis-full flex-wrap items-center justify-center gap-x-5 gap-y-3 md:order-none md:basis-auto md:gap-x-6 lg:gap-x-7"
          >
            {footerNavigation.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-xs font-medium text-on-dark-muted/90 transition-colors hover:text-on-dark focus-visible:outline-accent sm:text-sm"
              >
                {item.label}
              </a>
            ))}
          </nav> */}
                    {/* <p className="text-xs font-medium text-on-dark-muted/90 sm:text-sm md:text-center">
            Web. Mobile. The details in between.
          </p> */}
          <div className="flex items-center gap-4 md:justify-center sm:gap-5">
            {links.professional.map((link) => {
              const Icon = professionalIcons[link.id as keyof typeof professionalIcons];
              if (!Icon) return null;

              const href = safeDestination(link.href);
              const className =
                "inline-flex size-6 items-center justify-center text-on-dark-muted/65 transition-colors hover:text-on-dark focus-visible:outline-accent";

              if (!href) {
                return (
                  <span
                    key={link.id}
                    aria-label={`${link.label} not configured`}
                    title={`${link.label} not configured`}
                    className={`${className} cursor-default`}
                  >
                    <Icon aria-hidden="true" size={20} />
                  </span>
                );
              }

              return (
                <a
                  key={link.id}
                  href={href}
                  aria-label={link.label}
                  title={link.label}
                  target={href.startsWith("https:") ? "_blank" : undefined}
                  rel={href.startsWith("https:") ? "noopener noreferrer" : undefined}
                  className={className}
                >
                  <Icon aria-hidden="true" size={20} />
                </a>
              );
            })}
          </div>
<div>
          <a
            href="#home"
            aria-label="Back to top"
            className="ml-auto flex size-12 shrink-0 items-center justify-center rounded-full border border-on-dark/30 text-on-dark-muted transition hover:border-on-dark/70 hover:bg-on-dark/5 hover:text-on-dark focus-visible:outline-accent sm:size-[60px]"
          >
            <ArrowUp size={22} strokeWidth={1.8} aria-hidden="true" />
          </a>
        </div>
        </div>

        {/* <div className="grid grid-cols-1 items-center gap-5 border-t border-on-dark/15 py-6 sm:py-7 md:grid-cols-[1fr_auto_1fr] md:gap-6"> */}




          
        </div>
      {/* </div> */}
    </footer>
  );
}
