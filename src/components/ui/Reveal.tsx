import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useReducedMotionPreference } from "../../hooks/useReducedMotionPreference";
import { reveal } from "../../lib/animation";
// Progressive enhancement: content stays rendered if animation/JS is unavailable after prerendering.
export function Reveal({ children }: { children: ReactNode }) {
  const reduced = useReducedMotionPreference();
  return (
    <motion.div
      initial={reduced ? false : { y: 20 }}
      whileInView={reduced ? undefined : "visible"}
      viewport={{ once: true, amount: 0.08 }}
      variants={reveal}
    >
      {children}
    </motion.div>
  );
}
