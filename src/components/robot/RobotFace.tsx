import { motion } from "framer-motion";
export function RobotFace({ eyes }: { eyes: { x: number; y: number } }) {
  return (
    <g>
      <rect x="27" y="22" width="46" height="29" rx="12" fill="var(--color-dark-secondary)" />
      <motion.g
        animate={{ x: eyes.x, y: eyes.y }}
        transition={{ duration: 0.2 }}
      >
        <circle cx="41" cy="34" r="2.3" fill="var(--color-primary)" />
        <circle cx="59" cy="34" r="2.3" fill="var(--color-primary)" />
        <path
          d="M44 41 Q50 45 56 41"
          fill="none"
          stroke="var(--color-accent-soft)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </motion.g>
    </g>
  );
}
