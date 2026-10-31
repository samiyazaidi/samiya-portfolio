import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navigation } from "../../data/portfolio";
export function MobileNavigation({
  open,
  onClose,
  onReturnFocus,
}: {
  open: boolean;
  onClose: () => void;
  onReturnFocus: () => void;
}) {
  const panel = useRef<HTMLElement>(null);
  useEffect(() => {
    if (open) panel.current?.querySelector("a")?.focus();
  }, [open]);
  return (
    <AnimatePresence>
      {open && (
        <motion.nav
          ref={panel}
          id="mobile-navigation"
          aria-label="Mobile navigation"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              onClose();
              onReturnFocus();
            }
          }}
          className="overflow-hidden border-t border-border px-6 lg:hidden"
        >
          <div className="grid grid-cols-2 gap-1 py-4">
            {navigation.map((item) => (
              <a
                className="rounded-lg px-3 py-3 text-sm text-text-secondary hover:bg-secondary hover:text-dark-primary focus-visible:outline-accent-strong"
                href={`#${item.id}`}
                key={item.id}
                onClick={onClose}
              >
                {item.label}
              </a>
            ))}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
