"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useState } from "react";
import { PILOT_CTA, PILOT_HERO } from "@/content/avst-pilot";
import { SHOW } from "@/content/avst";

const PilotReader = dynamic(() => import("./PilotReader"), { ssr: false });

export default function PilotHero() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <section id="stage" aria-label="The Pilot" className="grid place-items-center px-[clamp(16px,4vw,64px)] pb-16 pt-[clamp(32px,7vh,72px)]">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`Read ${PILOT_HERO.en}: ${PILOT_HERO.te}`}
          className="group relative block [perspective:880px]"
        >
          <span
            aria-hidden="true"
            className="absolute inset-[8%] -z-10 rounded-full bg-avst-paper-3 blur-3xl"
          />
          <span className="relative block w-[clamp(200px,24vw,300px)] [transform-style:preserve-3d] [transform:rotateY(-14deg)] transition-transform duration-700 ease-out group-hover:[transform:rotateY(-4deg)_translateY(-6px)] motion-reduce:transition-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PILOT_HERO.cover}
              alt=""
              width={706}
              height={1100}
              className="block h-auto w-full rounded-[2px] shadow-[28px_34px_60px_-22px_rgba(12,13,16,0.45)]"
            />
            <span aria-hidden="true" className="absolute inset-y-[1%] -right-[5px] w-[6px] bg-gradient-to-r from-avst-line-hard to-avst-paper-3 [transform:rotateY(90deg)]" />
          </span>
        </button>

        <div className="mt-12 max-w-[640px] text-center" aria-live="polite">
          <p className="font-avst-mono text-[10px] uppercase tracking-[0.2em] text-avst-accent">{SHOW.title}</p>
          <p className="mt-3 font-avst-mono text-[11px] uppercase tracking-[0.16em] text-avst-ink-3">{PILOT_HERO.eyebrow}</p>
          <p className="mt-1 font-avst-mono text-[12px] uppercase tracking-[0.1em] text-avst-ink-2">{PILOT_HERO.te}</p>
          <h1 className="mt-2 font-avst-display text-[clamp(2.6rem,6vw,4.4rem)] font-bold leading-none tracking-tight">{PILOT_HERO.en}</h1>
          <p className="mt-5 font-avst-body text-[clamp(1rem,1.5vw,1.2rem)] leading-relaxed text-avst-ink-2">
            {PILOT_HERO.log}{" "}
            <button type="button" onClick={() => setOpen(true)} className="text-avst-accent underline-offset-4 hover:underline">
              Click to read the pilot →
            </button>
          </p>
          <span aria-hidden="true" className="mx-auto mt-6 block h-1 w-8 bg-avst-accent" />
          <p className="mt-4 font-avst-mono text-[10px] uppercase tracking-[0.16em] text-avst-ink-3">{PILOT_HERO.hint}</p>
        </div>
      </section>

      <Link
        href="/avst/process"
        aria-label="About the studio — Supranos"
        className="group block bg-avst-paper-3/70 px-[clamp(16px,4vw,64px)] py-10"
      >
        <span className="mx-auto grid max-w-[1180px] items-center gap-4 md:grid-cols-[auto_1fr_auto] md:gap-10">
          <span className="font-avst-mono text-[10px] uppercase tracking-[0.18em] text-avst-ink-3">{PILOT_CTA.kicker}</span>
          <span className="font-avst-display text-[clamp(1.4rem,3vw,2.4rem)] font-semibold leading-tight text-avst-accent">
            {PILOT_CTA.title}{" "}
            <em className="font-normal italic text-avst-ink-3">— {PILOT_CTA.em}</em>
          </span>
          <span className="font-avst-mono text-[10px] uppercase tracking-[0.18em] text-avst-accent">
            {PILOT_CTA.arrow} <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </span>
        </span>
      </Link>

      {open && <PilotReader onClose={close} />}
    </>
  );
}
