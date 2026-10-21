"use client";

import { useCallback, useEffect, useState } from "react";
import { SLICES } from "@/content/avst-pilot";

const ZOOM_ICON = (
  <svg viewBox="0 0 24 24" className="size-4 fill-none stroke-current" strokeWidth={1.6} aria-hidden="true">
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3M11 8v6M8 11h6" />
  </svg>
);

export default function PilotSlices() {
  const [active, setActive] = useState<(typeof SLICES.cards)[number] | null>(null);
  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active, close]);

  return (
    <section aria-label="Slice of life — moments from the season" className="overflow-hidden py-[clamp(56px,9vw,128px)]">
      <div className="mx-auto max-w-[1180px] px-[clamp(16px,4vw,64px)]">
        <p className="font-avst-mono text-[11px] uppercase tracking-[0.2em] text-avst-accent">{SLICES.kicker}</p>
        <h2 className="mt-4 max-w-[12ch] font-avst-display text-[clamp(2.2rem,6vw,4.6rem)] font-semibold leading-[0.95] tracking-tight">
          {SLICES.title}
        </h2>
        <p className="mt-6 max-w-[34rem] font-avst-body text-lg leading-relaxed text-avst-ink-2">
          {SLICES.sub} <em className="text-avst-accent">{SLICES.tap}</em>
        </p>
      </div>

      <div className="mt-12 [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
        <ul className="flex w-max animate-[avst-marquee-left_70s_linear_infinite] gap-4 hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]">
          {[0, 1].flatMap((rep) =>
            SLICES.cards.map((c) => (
              <li key={`${rep}-${c.src}`} aria-hidden={rep === 1 || undefined}>
                <button
                  type="button"
                  tabIndex={rep === 1 ? -1 : 0}
                  onClick={() => setActive(c)}
                  aria-label={`Read panel: ${c.alt}`}
                  className="group relative block aspect-[2/3] w-[clamp(220px,24vw,330px)] overflow-hidden bg-avst-paper-2 shadow-[0_20px_40px_-26px_rgba(12,13,16,0.5)]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.src} alt="" loading="lazy" decoding="async" draggable={false} className="size-full object-cover" />
                  <span className="absolute right-3 top-3 grid size-8 place-items-center rounded-full bg-avst-paper/90 text-avst-ink opacity-0 transition group-hover:opacity-100 max-md:opacity-100">
                    {ZOOM_ICON}
                  </span>
                </button>
              </li>
            )),
          )}
        </ul>
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
          onClick={close}
          className="fixed inset-0 z-[9500] grid place-items-center bg-avst-night/90 p-4"
        >
          <button type="button" onClick={close} className="absolute right-5 top-4 font-avst-mono text-[11px] uppercase tracking-[0.14em] text-white">
            Close
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={active.src} alt={active.alt} className="max-h-[88vh] max-w-full object-contain" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </section>
  );
}
