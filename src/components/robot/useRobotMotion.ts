import type { RobotState } from "./RobotState";
export function useRobotMotion(state: RobotState, reduced: boolean) {
  if (reduced)
    return {
      body: { rotate: 0, y: 0 },
      leftArm: { rotate: 0 },
      rightArm: { rotate: 0 },
      leftLeg: { rotate: 0 },
      rightLeg: { rotate: 0 },
    };
  return {
    body: {
      rotate:
        state === "peek"
          ? -12
          : state === "inspect"
            ? 7
            : state === "celebrate"
              ? [0, -5, 5, 0]
              : 0,
      y:
        state === "celebrate" ? [0, -12, 0] : state === "walk" ? [0, -3, 0] : 0,
    },
    leftArm: {
      rotate:
        state === "walk"
          ? [16, -16, 16]
          : state === "celebrate"
            ? -130
            : state === "peek"
              ? -40
              : 0,
    },
    rightArm: {
      rotate:
        state === "wave"
          ? [-100, -135, -100, -135, -100]
          : state === "guide-carousel"
            ? -95
            : state === "guide-contact"
              ? -70
              : state === "skills"
                ? -110
                : state === "celebrate"
                  ? 125
                  : state === "walk"
                    ? [-16, 16, -16]
                    : 0,
    },
    leftLeg: { rotate: state === "walk" ? [16, -16, 16] : 0 },
    rightLeg: { rotate: state === "walk" ? [-16, 16, -16] : 0 },
  };
}
