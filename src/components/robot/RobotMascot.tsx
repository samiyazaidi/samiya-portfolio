import { motion } from "framer-motion";
import type { RobotState } from "./RobotState";
import { RobotFace } from "./RobotFace";
import { useRobotMotion } from "./useRobotMotion";
export function RobotMascot({
  state,
  eyes,
  reduced,
}: {
  state: RobotState;
  eyes: { x: number; y: number };
  reduced: boolean;
}) {
  const pose = useRobotMotion(state, reduced);
  const transition = {
    duration: state === "wave" ? 1.1 : 0.5,
    ease: "easeInOut" as const,
  };
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 120"
      className="h-full w-full overflow-visible"
    >
      <ellipse cx="50" cy="115" rx="25" ry="3" fill="var(--color-dark-secondary)" opacity=".12" />
      <motion.g
        animate={pose.body}
        transition={transition}
        style={{ transformOrigin: "50px 90px" }}
      >
        <motion.g
          animate={pose.leftLeg}
          transition={transition}
          style={{ transformOrigin: "40px 86px" }}
        >
          <path
            d="M40 85 37 103"
            stroke="var(--color-dark-primary)"
            strokeWidth="9"
            strokeLinecap="round"
          />
          <rect
            x="26"
            y="101"
            width="20"
            height="10"
            rx="5"
            fill="var(--color-secondary)"
            stroke="var(--color-text-secondary)"
            strokeWidth="1.5"
          />
        </motion.g>
        <motion.g
          animate={pose.rightLeg}
          transition={transition}
          style={{ transformOrigin: "60px 86px" }}
        >
          <path
            d="m60 85 3 18"
            stroke="var(--color-dark-primary)"
            strokeWidth="9"
            strokeLinecap="round"
          />
          <rect
            x="54"
            y="101"
            width="20"
            height="10"
            rx="5"
            fill="var(--color-secondary)"
            stroke="var(--color-text-secondary)"
            strokeWidth="1.5"
          />
        </motion.g>
        <rect
          x="27"
          y="56"
          width="46"
          height="35"
          rx="15"
          fill="var(--color-primary)"
          stroke="var(--color-text-secondary)"
          strokeWidth="1.5"
        />
        <rect x="41" y="65" width="18" height="10" rx="4" fill="var(--color-tertiary)" />
        <path
          d="m47 68-3 2 3 2m6-4 3 2-3 2"
          stroke="var(--color-dark-primary)"
          strokeWidth="1"
          fill="none"
        />
        <circle cx="50" cy="82" r="2" fill="var(--color-text-secondary)" />
        <motion.g
          animate={pose.leftArm}
          transition={transition}
          style={{ transformOrigin: "26px 62px" }}
        >
          <path
            d="m26 62-10 17 5 9"
            stroke="var(--color-text-secondary)"
            strokeWidth="7"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="21" cy="89" r="5" fill="var(--color-secondary)" stroke="var(--color-dark-primary)" />
        </motion.g>
        <motion.g
          animate={pose.rightArm}
          transition={transition}
          style={{ transformOrigin: "74px 62px" }}
        >
          <path
            d="m74 62 10 17-5 9"
            stroke="var(--color-text-secondary)"
            strokeWidth="7"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="79" cy="89" r="5" fill="var(--color-secondary)" stroke="var(--color-dark-primary)" />
        </motion.g>
        <motion.g
          animate={{ rotate: reduced ? 0 : eyes.x * 1.5 }}
          style={{ transformOrigin: "50px 53px" }}
          transition={{ duration: 0.3 }}
        >
          <path d="M50 16V8" stroke="var(--color-dark-primary)" strokeWidth="2" />
          <circle cx="50" cy="6" r="3" fill="var(--color-tertiary)" />
          <rect
            x="20"
            y="16"
            width="60"
            height="41"
            rx="18"
            fill="var(--color-primary)"
            stroke="var(--color-text-secondary)"
            strokeWidth="1.5"
          />
          <rect x="16" y="29" width="5" height="13" rx="2" fill="var(--color-dark-primary)" />
          <rect x="79" y="29" width="5" height="13" rx="2" fill="var(--color-dark-primary)" />
          <RobotFace eyes={eyes} />
        </motion.g>
      </motion.g>
    </svg>
  );
}
