import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotionPreference } from "../../hooks/useReducedMotionPreference";
export function WelcomeAnimation() {
  const reduced = useReducedMotionPreference();
  const [first] = useState(() => {
    try {
      const seen = sessionStorage.getItem("samiya-welcome");
      return !seen;
    } catch {
      return true;
    }
  });
  useEffect(() => {
    try {
      sessionStorage.setItem("samiya-welcome", "seen");
    } catch {
      /* Storage is optional. */
    }
  }, []);
  const animate = first && !reduced;
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="text-xs tracking-[0.08em] text-text-secondary">Hello, I’m</span>
      <svg
        role="img"
        aria-label="Samiya"
        viewBox="0 0 140 60"
        className="h-12 w-28 overflow-visible"
      >
        <title>Samiya — signature</title>
        <motion.text
          initial={animate ? { opacity: 0, y: 4 } : { opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          x="72"
          y="38"
          textAnchor="middle"
          fontFamily="'Segoe Script', 'Brush Script MT', cursive"
          fontSize="19"
          fontStyle="italic"
          fill="var(--color-dark-primary)"
        >
          Samiya Zaidi
        </motion.text>
      </svg>
      <span className="h-px w-12 bg-tertiary" />
    </div>
  );
}
