import { motion } from "framer-motion";
import { services } from "../../data/services";
import { useReducedMotionPreference } from "../../hooks/useReducedMotionPreference";

export function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) {
  const Icon = service.icon;
  const reduced = useReducedMotionPreference();

  return (
    <motion.article
      initial={reduced ? false : { y: 8, opacity: 0.85 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.3, delay: reduced ? 0 : index * 0.035 }}
      whileHover={reduced ? undefined : { y: -2 }}
      className="min-w-0 rounded-xl border border-border/75 bg-surface/90 p-3 transition-colors hover:border-accent/60 hover:bg-surface sm:p-3.5"
    >
      <span className="mb-3 flex size-8 items-center justify-center rounded-lg bg-tertiary text-on-dark">
        <Icon aria-hidden="true" size={16} strokeWidth={1.7} />
      </span>
      <h3 className="font-display text-[16px] leading-[1.05] text-dark-primary sm:text-[17px]">
        {service.title}
      </h3>
      <p className="mt-2 text-[10px] leading-[1.6] text-text-secondary sm:text-[10.5px]">
        {service.description}
      </p>
    </motion.article>
  );
}
