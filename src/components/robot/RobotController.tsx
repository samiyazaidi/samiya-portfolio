import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import type { RobotAction, RobotState } from "./RobotState";
import { RobotMascot } from "./RobotMascot";
import { useReducedMotionPreference } from "../../hooks/useReducedMotionPreference";
import { usePointerPosition } from "../../hooks/usePointerPosition";
import { useScrollProgress } from "../../hooks/useScrollProgress";
const RobotContext = createContext<(action: RobotAction) => void>(() => {});
export const useRobot = () => useContext(RobotContext);
export function RobotController({ children }: { children: ReactNode }) {
  const reduced = useReducedMotionPreference();
  const [state, setState] = useState<RobotState>("idle");
  const [point, setPoint] = useState({ x: 0, y: 0 });
  const [eyes, setEyes] = useState({ x: 0, y: 0 });
  const [ready, setReady] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const busy = useRef(false);
  const position = useRef(point);
  const pointer = usePointerPosition(!reduced);
  const lastY = useRef(0);
  const resetPosition = useRef<() => void>(() => {});
  const settle = useCallback(() => {
    busy.current = false;
    setState("rest");
    resetPosition.current();
    timer.current = setTimeout(() => setState("idle"), 450);
  }, []);
  const react = useCallback(
    (action: RobotAction) => {
      clearTimeout(timer.current);
      busy.current = true;
      setState(action.state);
      if (action.target && !reduced) {
        const rect = action.target.getBoundingClientRect();
        const mobile = innerWidth < 640;
        setPoint({
          x: mobile
            ? innerWidth - 86
            : Math.min(innerWidth - 100, Math.max(12, rect.right - 55)),
          y: Math.min(
            innerHeight - 130,
            Math.max(100, rect.top - (action.state === "peek" ? 64 : 95)),
          ),
        });
      }
      timer.current = setTimeout(settle, action.duration ?? 1500);
    },
    [reduced, settle],
  );
  const layout = useCallback(() => {
    const home = document
      .querySelector("[data-robot-home]")
      ?.getBoundingClientRect();
    if (!home) return;
    const isHome = home.bottom > 100 && home.top < innerHeight;
    const mobile = innerWidth < 640;
    const moved = Math.abs(scrollY - lastY.current) > 3;
    lastY.current = scrollY;
    if (busy.current) return;
    if (reduced) {
      setPoint({
        x: Math.min(innerWidth - 70, home.right - 65),
        y: home.bottom - 110,
      });
      setReady(isHome);
      return;
    }
    setReady(true);
    if (isHome) {
      setPoint({
        x: Math.min(
          innerWidth - (mobile ? 86 : 108),
          home.right - (mobile ? 86 : 108),
        ),
        y: Math.min(innerHeight - 130, Math.max(100, home.bottom - 125)),
      });
    } else {
      // Walk a section-relative route, not a fixed cursor or viewport attachment.
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("main > div > section"),
      );
      const active = sections.find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= innerHeight * 0.5 && rect.bottom > innerHeight * 0.5;
      });
      const rect = active?.getBoundingClientRect();
      const progress = rect
        ? Math.min(1, Math.max(0, (innerHeight * 0.5 - rect.top) / rect.height))
        : 0.5;
      setPoint({
        x:
          innerWidth -
          (mobile ? 86 : 118) +
          (mobile ? 0 : Math.sin(progress * Math.PI) * 10),
        y: Math.min(innerHeight - 135, innerHeight * (0.32 + progress * 0.38)),
      });
    }
    if (moved) {
      clearTimeout(timer.current);
      setState("walk");
      timer.current = setTimeout(settle, 420);
    }
  }, [reduced, settle]);
  useEffect(() => {
    resetPosition.current = layout;
  }, [layout]);
  useScrollProgress(layout);
  useEffect(() => {
    position.current = point;
  }, [point]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      layout();
      if (!reduced) react({ state: "wave", duration: 1400 });
    }, 600);
    return () => clearTimeout(timeout);
  }, [layout, react, reduced]);
  useEffect(() => {
    if (reduced || !matchMedia("(pointer: fine)").matches) return;
    const interval = setInterval(() => {
      const p = position.current;
      const dx = (pointer.current.x - p.x - 45) / 90;
      const dy = (pointer.current.y - p.y - 35) / 100;
      setEyes({
        x: Math.max(-3, Math.min(3, dx)),
        y: Math.max(-2, Math.min(2, dy)),
      });
      if (!busy.current) setState((s) => (s === "idle" ? "look" : s));
    }, 100);
    return () => clearInterval(interval);
  }, [pointer, reduced]);
  useEffect(() => () => clearTimeout(timer.current), []);
  return (
    <RobotContext.Provider value={react}>
      {children}
      <motion.div
        data-testid="robot"
        data-state={state}
        aria-hidden="true"
        initial={false}
        animate={{
          x: point.x,
          y: point.y,
          opacity: ready ? 1 : 0,
          clipPath:
            state === "peek" && !reduced
              ? "inset(0% 0% 44% 0%)"
              : "inset(0% 0% 0% 0%)",
        }}
        transition={{
          duration: reduced ? 0 : state === "walk" ? 0.32 : 0.55,
          ease: "easeOut",
        }}
        className="pointer-events-none fixed top-0 left-0 z-30 h-[94px] w-[78px] sm:h-[120px] sm:w-[100px]"
      >
        <RobotMascot
          state={state}
          eyes={reduced ? { x: 0, y: 0 } : eyes}
          reduced={reduced}
        />
      </motion.div>
    </RobotContext.Provider>
  );
}
