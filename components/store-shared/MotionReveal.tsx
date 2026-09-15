"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Stagger index for scroll reveals (ms) */
  delayMs?: number;
  /** Play on mount (hero) instead of waiting for scroll */
  immediate?: boolean;
};

/**
 * Fades/slides content in once visible. Respects prefers-reduced-motion via CSS.
 */
export default function MotionReveal({
  children,
  className = "",
  delayMs = 0,
  immediate = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(immediate);

  useEffect(() => {
    if (immediate) {
      const t = window.setTimeout(() => setVisible(true), 40);
      return () => window.clearTimeout(t);
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [immediate]);

  return (
    <div
      ref={ref}
      className={`motion-reveal${visible ? " motion-reveal--in" : ""} ${className}`.trim()}
      style={{ "--motion-delay": `${delayMs}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
