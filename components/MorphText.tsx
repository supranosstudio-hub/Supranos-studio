"use client";

import { useEffect, useMemo, useState } from "react";

/**
 * Crossfades through a list of words/phrases in place. A hidden sizer
 * (the longest phrase, rendered in normal flow) reserves the box's width
 * and height so the swap never causes layout shift, clipping or overlap
 * at any viewport size — the visible words are absolutely positioned on
 * top of that reserved space.
 */
export default function MorphText({
  words,
  intervalMs = 2600,
  className,
}: {
  words: string[];
  intervalMs?: number;
  className?: string;
}) {
  const [idx, setIdx] = useState(0);
  const longest = useMemo(
    () => words.reduce((a, b) => (b.length > a.length ? b : a), words[0] ?? ""),
    [words],
  );

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || words.length < 2) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % words.length), intervalMs);
    return () => clearInterval(id);
  }, [words, intervalMs]);

  return (
    <span className={`morph-wrap ${className ?? ""}`}>
      <span className="morph-sizer" aria-hidden="true">
        {longest}
      </span>
      {words.map((w, i) => (
        <span key={w} className={`morph-word ${i === idx ? "on" : ""}`}>
          {w}
        </span>
      ))}
    </span>
  );
}
