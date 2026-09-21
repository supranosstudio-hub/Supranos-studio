"use client";

import { useEffect, useState } from "react";

const WORDS = [
  { text: "Aa" },
  { text: "Vesavi" },
  { text: "Selavulu" },
  { text: "Tarvata.", accent: true },
];

export default function WordIntro() {
  const [visible, setVisible] = useState(false);
  const [shown, setShown] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("avst_wl_seen")) return;
    } catch {}
    setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible || gone) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const step = reduce ? 260 : 520;
    if (shown >= WORDS.length) {
      const t = setTimeout(dismiss, reduce ? 300 : 700);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setShown((s) => s + 1), step);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, shown, gone]);

  function dismiss() {
    if (gone) return;
    setGone(true);
    try {
      sessionStorage.setItem("avst_wl_seen", "1");
    } catch {}
    setTimeout(() => setVisible(false), 800);
  }

  if (!visible) return null;

  return (
    <div id="wl" role="presentation" className={gone ? "gone" : ""}>
      <div id="wl__stage">
        <div id="wl__words">
          {WORDS.map((w, i) => (
            <span key={w.text} className={`w${i < shown ? " on" : ""}${w.accent ? " accent" : ""}`}>
              {w.text}
            </span>
          ))}
        </div>
        <div id="wl__bar">
          <i style={{ width: `${Math.round((shown / WORDS.length) * 100)}%` }} />
        </div>
      </div>
      <button id="wl__skip" type="button" onClick={dismiss}>
        Skip intro
      </button>
    </div>
  );
}
