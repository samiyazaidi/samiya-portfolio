import { useReducedMotion } from "framer-motion";
export function useReducedMotionPreference() {
  return useReducedMotion() ?? false;
}
