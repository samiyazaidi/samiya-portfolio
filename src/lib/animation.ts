export const ease = [0.22, 1, 0.36, 1] as const;
export const reveal = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
};
