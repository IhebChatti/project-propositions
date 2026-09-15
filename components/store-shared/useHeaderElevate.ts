"use client";

import { useEffect, useState } from "react";

/** Adds `store-header-elevated` after scrolling past threshold. */
export function useHeaderElevate(threshold = 12) {
  const [elevated, setElevated] = useState(false);

  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return elevated;
}
