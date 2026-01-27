"use client";

import { useEffect, useRef, useState } from "react";

type Options = {
  durationMs?: number; // 150..600 is typical
};

export function useAnimatedNumber(target: number, opts: Options = {}) {
  const { durationMs = 420 } = opts;

  const [value, setValue] = useState(target);
  const rafRef = useRef<number | null>(null);
  const fromRef = useRef(target);
  const startRef = useRef<number>(0);

  useEffect(() => {
    const from = fromRef.current;
    const to = target;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    // If jump is tiny, snap (prevents micro-jitters)
    if (Math.abs(to - from) < 0.01) {
      fromRef.current = to;
      setValue(to);
      return;
    }

    startRef.current = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - startRef.current) / durationMs);

      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      const next = from + (to - from) * eased;

      setValue(next);

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        fromRef.current = to;
        setValue(to);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, durationMs]);

  return value;
}
