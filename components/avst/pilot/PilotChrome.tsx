"use client";

import { useEffect, useRef, useState } from "react";
import { AVST_CHIBI } from "@/content/avst-media";
import { MASCOT_LINES } from "@/content/avst-pilot";

const HOP_EVERY_PX = 240;
const HOP_MS = 520;
const LINE_MS = 2600;
const SHOW_DELAY_MS = 2200;

const FRAMES = AVST_CHIBI.map((c) => c.src);
const STAGES = AVST_CHIBI[0].px;

/** Scroll progress bar + the little jumper that hops as you read. */
export default function PilotChrome() {
  const barRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [facingLeft, setFacingLeft] = useState(false);
  const [hopping, setHopping] = useState(false);
  const [frame, setFrame] = useState(0);
  const [pixelStage, setPixelStage] = useState<string | null>(null);
  const [line, setLine] = useState<string | null>(null);
  const lineIndex = useRef(0);
  const hoppingRef = useRef(false);
  const lineTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const hop = (dir: number) => {
    setFacingLeft(dir < 0);
    if (hoppingRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    hoppingRef.current = true;
    setHopping(true);
    setTimeout(() => {
      hoppingRef.current = false;
      setHopping(false);
      setFrame((f) => (f + 1) % FRAMES.length);
    }, HOP_MS);
  };

  useEffect(() => {
    const show = setTimeout(() => setVisible(true), SHOW_DELAY_MS);
    let lastY = window.scrollY;
    let travelled = 0;
    let queued = false;

    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        const y = window.scrollY;
        const dy = y - lastY;
        lastY = y;
        travelled += Math.abs(dy);
        const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        const progress = Math.min(1, Math.max(0, y / max));
        if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
        setPixelStage(progress < 0.25 ? STAGES[0] : progress < 0.5 ? (STAGES[1] ?? STAGES[0]) : progress < 0.75 ? (STAGES[2] ?? STAGES[0]) : null);
        if (travelled > HOP_EVERY_PX) {
          travelled = 0;
          hop(dy);
        }
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(show);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const speak = () => {
    setLine(MASCOT_LINES[lineIndex.current++ % MASCOT_LINES.length]);
    clearTimeout(lineTimer.current);
    lineTimer.current = setTimeout(() => setLine(null), LINE_MS);
    hop(1);
  };

  const showPixels = pixelStage !== null && !hopping;

  return (
    <>
      <div aria-hidden="true" className="fixed inset-x-0 top-0 z-[1100] h-[2px]">
        <div ref={barRef} className="h-full origin-left scale-x-0 bg-gradient-to-r from-avst-accent to-avst-accent-soft" />
      </div>

      <button
        type="button"
        onClick={speak}
        aria-label="The jumper — tap for a line"
        className={`fixed bottom-3.5 left-2.5 z-[760] size-[50px] transition-opacity duration-500 sm:left-[18px] sm:size-16 ${
          visible ? "opacity-100" : "pointer-events-none opacity-0"
        } ${hopping ? "animate-[avst-hop_0.52s_ease-out]" : ""}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={showPixels ? pixelStage : FRAMES[frame]}
          alt=""
          draggable={false}
          style={{ imageRendering: showPixels ? "pixelated" : "auto" }}
          className={`size-full object-contain ${facingLeft ? "" : "-scale-x-100"}`}
        />
        <span
          aria-live="polite"
          className={`pointer-events-none absolute bottom-5 left-[70px] whitespace-nowrap rounded-full bg-avst-ink px-3 py-1.5 font-avst-mono text-[9px] uppercase tracking-[0.13em] text-white transition ${
            line ? "translate-x-0 opacity-100" : "-translate-x-1.5 opacity-0"
          }`}
        >
          {line}
        </span>
      </button>
    </>
  );
}
