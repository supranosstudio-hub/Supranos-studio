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
    <div
      role="presentation"
      className={`fixed inset-0 z-[10001] bg-[#0c0d10] grid place-items-center transition-[opacity,visibility] duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${
        gone ? "opacity-0 invisible pointer-events-none" : "opacity-100 visible"
      }`}
    >
      <div className="text-center p-6">
        <div className="font-avst-display font-semibold leading-[.98] tracking-[-0.03em] text-[clamp(2.4rem,9vw,6.5rem)] text-white flex flex-col gap-[.05em]">
          {WORDS.map((w, i) => (
            <span
              key={w.text}
              className={`transition-[opacity,transform,filter] duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${
                i < shown
                  ? "opacity-100 translate-y-0 blur-0"
                  : "opacity-0 translate-y-[0.4em] blur-[6px]"
              } ${w.accent ? "text-[#7fa0ec] italic font-normal" : ""}`}
            >
              {w.text}
            </span>
          ))}
        </div>
        <div className="w-[min(220px,60vw)] h-[2px] bg-white/15 mx-auto mt-[clamp(28px,5vw,52px)] overflow-hidden">
          <span
            className="block h-full bg-gradient-to-r from-[#1b4dc4] to-[#7fa0ec] transition-[width] duration-300"
            style={{ width: `${Math.round((shown / WORDS.length) * 100)}%` }}
          />
        </div>
      </div>
      <button
        type="button"
        onClick={dismiss}
        className="fixed bottom-[26px] right-[26px] z-[10002] font-avst-mono text-[.6rem] tracking-[0.16em] uppercase text-white/50 hover:text-white bg-transparent border-0 cursor-pointer"
      >
        Skip intro
      </button>
    </div>
  );
}
