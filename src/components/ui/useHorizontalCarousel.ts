import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";
import { useReducedMotionPreference } from "../../hooks/useReducedMotionPreference";
export function useHorizontalCarousel() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionPreference();
  const [edges, setEdges] = useState({ start: true, end: false });
  const drag = useRef({
    down: false,
    x: 0,
    scroll: 0,
    moved: false,
    pointer: 0,
  });
  const [dragging, setDragging] = useState(false);
  const update = useCallback(() => {
    const el = ref.current;
    if (el)
      setEdges({
        start: el.scrollLeft < 3,
        end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 3,
      });
  }, []);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(update);
    observer.observe(el);
    el.addEventListener("scroll", update, { passive: true });
    update();
    return () => {
      observer.disconnect();
      el.removeEventListener("scroll", update);
    };
  }, [update]);
  const step = useCallback(
    (direction: number) => {
      const el = ref.current;
      if (!el) return;
      const card = el.firstElementChild as HTMLElement | null;
      el.scrollBy({
        left: direction * ((card?.offsetWidth ?? 280) + 16),
        behavior: reduced ? "instant" : "smooth",
      });
    },
    [reduced],
  );
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.altKey || event.metaKey || event.ctrlKey) return;
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      step(event.key === "ArrowRight" ? 1 : -1);
    }
    if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      ref.current?.scrollTo({
        left: event.key === "Home" ? 0 : ref.current.scrollWidth,
        behavior: reduced ? "instant" : "smooth",
      });
    }
  };
  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    drag.current = {
      down: true,
      x: event.clientX,
      scroll: event.currentTarget.scrollLeft,
      moved: false,
      pointer: event.pointerId,
    };
  };
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!drag.current.down) return;
    const diff = event.clientX - drag.current.x;
    if (Math.abs(diff) > 5 && !drag.current.moved) {
      drag.current.moved = true;
      setDragging(true);
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    if (drag.current.moved)
      event.currentTarget.scrollLeft = drag.current.scroll - diff;
  };
  const stop = (event: PointerEvent<HTMLDivElement>) => {
    drag.current.down = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
    setDragging(false);
  };
  return {
    ref,
    edges,
    step,
    dragging,
    handlers: {
      onKeyDown,
      onPointerDown,
      onPointerMove,
      onPointerUp: stop,
      onPointerCancel: stop,
      onPointerLeave: (event: PointerEvent<HTMLDivElement>) => {
        if (!drag.current.moved) stop(event);
      },
      onClickCapture: (event: React.MouseEvent) => {
        if (drag.current.moved) {
          event.preventDefault();
          event.stopPropagation();
          drag.current.moved = false;
        }
      },
    },
  };
}
