export const robotStates = [
  "idle",
  "look",
  "walk",
  "peek",
  "inspect",
  "skills",
  "guide-carousel",
  "guide-contact",
  "wave",
  "celebrate",
  "rest",
] as const;
export type RobotState = (typeof robotStates)[number];
export interface RobotAction {
  state: RobotState;
  target?: HTMLElement;
  duration?: number;
}
