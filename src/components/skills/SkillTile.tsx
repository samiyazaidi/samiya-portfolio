import { motion } from "framer-motion";
import type { Skill } from "../../data/skills";
import { useRobot } from "../robot/RobotController";
import { useReducedMotionPreference } from "../../hooks/useReducedMotionPreference";

export function SkillTile({ skill }: { skill: Skill }) {
  const robot = useRobot();
  const reduced = useReducedMotionPreference();
  const Icon = skill.icon;

  return (
    <motion.button
      type="button"
      aria-label={`${skill.name}, ${skill.category}`}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse")
          robot({ state: "skills", target: event.currentTarget });
      }}
      onFocus={(event) => robot({ state: "skills", target: event.currentTarget })}
      onClick={(event) => robot({ state: "skills", target: event.currentTarget, duration: 1000 })}
      whileHover={reduced ? undefined : { y: -2 }}
      whileTap={reduced ? undefined : { scale: 0.98 }}
      className="flex h-10 shrink-0 snap-start items-center gap-2 rounded-xl border border-border/80 bg-surface px-3 text-text-primary shadow-sm shadow-dark-secondary/10 transition-colors hover:border-accent/60 hover:bg-secondary"
    >
      <Icon aria-hidden size={17} className="shrink-0" style={{ color: skill.color }} />
      <span className="whitespace-nowrap text-[10px] font-semibold sm:text-[11px]">{skill.name}</span>
    </motion.button>
  );
}
