import { motion } from "framer-motion";
import { useRobot } from "../robot/RobotController";

export function HangingLamp({
  on,
  toggle,
}: {
  on: boolean;
  toggle: () => void;
}) {
  const robot = useRobot();

  return (
    <button
      type="button"
      aria-label={`Turn desk lamp ${on ? "off" : "on"}`}
      aria-pressed={on}
      title={`Desk lamp is ${on ? "on" : "off"}. Click to ${on ? "turn it off" : "turn it on"}.`}
      onClick={() => {
        toggle();
        robot({ state: "inspect", duration: 900 });
      }}
      className="group absolute top-0 right-[4%] z-10 h-[47%] w-[26%] cursor-pointer rounded-b-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-strong"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 110 210"
        className="h-full w-full overflow-visible transition-transform duration-300 group-hover:scale-[1.025]"
      >
        <defs>
          <radialGradient id="lamp-glow">
            <stop offset="0%" stopColor="#FFF0B7" stopOpacity=".98" />
            <stop offset=".28" stopColor="#FFD77E" stopOpacity=".66" />
            <stop offset="1" stopColor="#FFC65E" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="lamp-beam" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFE7A2" stopOpacity=".78" />
            <stop offset=".55" stopColor="#FFD17B" stopOpacity=".25" />
            <stop offset="100%" stopColor="#FFD17B" stopOpacity="0" />
          </linearGradient>
          <filter id="lamp-bulb-blur" x="-200%" y="-200%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>

        <path d="M55 0v80" stroke="var(--color-dark-primary)" strokeWidth="2" />

        {/* The glow and light cone become clearly visible when the lamp is on. */}
        <motion.ellipse
          cx="55"
          cy="151"
          rx="53"
          ry="70"
          fill="url(#lamp-glow)"
          animate={{ opacity: on ? 1 : 0 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
        />
        <motion.path
          d="M27 111 7 194Q55 219 103 194L83 111Z"
          fill="url(#lamp-beam)"
          animate={{ opacity: on ? 0.95 : 0 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
        />

        <motion.circle
          cx="55"
          cy="108"
          r="13"
          fill="#FFF0B7"
          filter="url(#lamp-bulb-blur)"
          animate={{ opacity: on ? 0.9 : 0 }}
          transition={{ duration: 0.35 }}
        />
        <motion.circle
          cx="55"
          cy="112"
          r="8"
          animate={{
            fill: on ? "#FFF3C7" : "var(--color-tertiary)",
            opacity: on ? 1 : 0.48,
          }}
          transition={{ duration: 0.35 }}
        />

        <motion.path
          d="M26 109Q31 78 55 78T84 109Z"
          animate={{
            fill: on ? "#395f7e" : "var(--color-dark-primary)",
          }}
          transition={{ duration: 0.4 }}
        />
        <path
          d="M26 109Q55 119 84 109"
          fill="var(--color-tertiary)"
          stroke="var(--color-dark-primary)"
          strokeWidth="1.5"
        />
        <path d="M75 110v35" stroke="var(--color-dark-primary)" strokeWidth="1" />
        <motion.circle
          cx="75"
          cy="149"
          r="4"
          animate={{
            fill: on ? "#FFE8A6" : "var(--color-text-secondary)",
            opacity: on ? 1 : 0.55,
          }}
          transition={{ duration: 0.3 }}
        />
        <motion.circle
          cx="75"
          cy="149"
          r="8"
          fill="none"
          stroke="#FFE5A1"
          strokeWidth="1.2"
          animate={{ opacity: on ? [0.1, 0.8, 0.1] : 0, scale: on ? [0.92, 1.18, 0.92] : 0.92 }}
          transition={{ duration: 2.4, repeat: on ? Infinity : 0, ease: "easeInOut" }}
        />
      </svg>
      <span className="sr-only">{on ? "Lamp on" : "Lamp off"}</span>
    </button>
  );
}
