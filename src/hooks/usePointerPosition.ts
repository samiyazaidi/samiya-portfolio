import { useEffect, useRef } from "react";
export function usePointerPosition(enabled: boolean) {
  const position = useRef({ x: 0, y: 0 });
  useEffect(() => {
    if (!enabled || !window.matchMedia("(pointer: fine)").matches) return;
    const move = (event: PointerEvent) => {
      position.current = { x: event.clientX, y: event.clientY };
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [enabled]);
  return position;
}
