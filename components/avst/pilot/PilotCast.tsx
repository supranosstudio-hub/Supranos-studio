"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CAST, SATELLITES, type CastMember } from "@/content/avst";

const VIEWPORTS_PER_CHARACTER = 0.9;

function specRows(c: CastMember): [string, string][] {
  return [
    ["Age", String(c.age)],
    ["Works", c.job],
    ["Wiring", `${c.mbti} · ${c.sign}`],
    ["Home is", c.home],
    ["Flaw", c.flaw],
    ["Tell", c.tell],
    ["Carries", c.carries.join(" · ")],
  ];
}

export default function PilotCast() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const count = CAST.length;

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = trackRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
      setActive(Math.min(count - 1, Math.floor(progress * count)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [count]);

  const jumpTo = useCallback(
    (i: number) => {
      const el = trackRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY;
      const scrollable = el.offsetHeight - window.innerHeight;
      window.scrollTo({ top: top + ((i + 0.5) / count) * scrollable, behavior: "smooth" });
    },
    [count],
  );

  const current = CAST[active];

  return (
    <section id="cast" aria-label="Cast">
      <div ref={trackRef} style={{ height: `${Math.round(count * VIEWPORTS_PER_CHARACTER * 100)}svh` }} className="relative">
        <div className="sticky top-[60px] flex h-[calc(100svh-60px)] flex-col overflow-hidden px-[clamp(16px,4vw,64px)]">
          <div className="flex items-center justify-between gap-4 border-b border-avst-line">
            <div role="tablist" aria-label="Choose a character" className="flex overflow-x-auto py-3">
              {CAST.map((c, i) => (
                <button
                  key={c.id}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  onClick={() => jumpTo(i)}
                  className={`shrink-0 px-4 py-2.5 font-avst-mono text-[11px] uppercase tracking-[0.16em] transition ${
                    i === active ? "bg-avst-accent text-white" : "text-avst-ink-3 hover:text-avst-ink"
                  }`}
                >
                  {c.short}
                </button>
              ))}
            </div>
            <p className="hidden font-avst-mono text-[10px] uppercase tracking-[0.16em] text-avst-ink-3 lg:block">Scroll to change character</p>
          </div>

          <div className="grid min-h-0 flex-1 items-center gap-6 md:grid-cols-[1.1fr_1fr] md:gap-16">
            <div className="relative h-[34svh] self-end md:h-[78%]">
              {CAST.map((c, i) => (
                <figure
                  key={c.id}
                  aria-hidden={i !== active}
                  className={`absolute inset-x-0 bottom-0 flex h-full justify-center transition duration-500 ease-out motion-reduce:transition-none ${
                    i === active ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.img}
                    alt={`${c.short}, character turnaround`}
                    loading={i === 0 ? undefined : "lazy"}
                    decoding="async"
                    className="h-full w-auto object-contain grayscale contrast-[1.04] drop-shadow-[0_16px_20px_rgba(12,13,16,0.14)]"
                  />
                </figure>
              ))}
              <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-avst-line-hard" />
            </div>

            <div aria-live="polite" className="min-w-0 pb-6 md:pb-0">
              <p className="font-avst-mono text-[11px] uppercase tracking-[0.2em] text-avst-accent">{current.role}</p>
              <h2 className="mt-3 font-avst-display text-[clamp(2rem,4.6vw,3.6rem)] font-bold leading-[0.98] tracking-tight">{current.name}</h2>
              <p className="mt-4 max-w-[22rem] font-avst-body text-lg leading-relaxed text-avst-ink-2">{current.homeLine}</p>
              <p className="mt-3 font-avst-body text-lg italic">“{current.line}”</p>
              <dl className="mt-6 border-t border-avst-ink max-md:hidden">
                {specRows(current).map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-avst-line py-2.5">
                    <dt className="font-avst-mono text-[10px] uppercase tracking-[0.14em] text-avst-ink-3">{k}</dt>
                    <dd className="font-avst-body text-[0.98rem] text-avst-ink-2">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1180px] px-[clamp(16px,4vw,64px)] py-[clamp(48px,8vw,112px)]">
        <p className="font-avst-mono text-[11px] uppercase tracking-[0.2em] text-avst-accent">The colony</p>
        <h2 className="mt-3 font-avst-display text-[clamp(1.8rem,4vw,3rem)] font-semibold tracking-tight">Everybody else</h2>
        <ul className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5">
          {SATELLITES.map((s) => (
            <li key={s.id}>
              <article>
                <div className="aspect-[4/5] overflow-hidden bg-avst-paper-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.img} alt={s.name} loading="lazy" decoding="async" className="size-full object-cover" />
                </div>
                <h3 className="mt-3 font-avst-display text-base font-semibold">{s.name}</h3>
                <p className="mt-0.5 font-avst-mono text-[10px] uppercase tracking-[0.12em] text-avst-ink-3">{s.role}</p>
                <p className="mt-2 font-avst-body text-sm leading-snug text-avst-ink-2">{s.note}</p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
