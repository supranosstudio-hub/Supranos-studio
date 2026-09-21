"use client";

import { useState } from "react";
import { CAST, SATELLITES } from "@/content/avst";

const WASH: Record<string, string> = {
  anudeep: "bg-[#4a6fe6]",
  suraj: "bg-[#e6a15a]",
  kicha: "bg-[#e65a8a]",
  aishwarya: "bg-[#7fae6b]",
  jay: "bg-[#4a6fe6]",
};

function Spec({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4 py-2.5 border-b border-avst-line">
      <dt className="font-avst-mono text-[10px] tracking-[0.14em] uppercase text-avst-ink-3">{k}</dt>
      <dd className="text-[.9rem] text-avst-ink-2 text-right">{v}</dd>
    </div>
  );
}

export default function CastSection() {
  const [active, setActive] = useState(0);
  const c = CAST[active];

  return (
    <section id="cast" aria-label="Cast" className="px-[clamp(16px,4vw,64px)] py-[clamp(40px,7vw,90px)]">
      <div className="max-w-[1180px] mx-auto">
        <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="Choose a character">
          {CAST.map((m, i) => (
            <button
              key={m.id}
              type="button"
              role="tab"
              aria-current={i === active}
              onClick={() => setActive(i)}
              className={`font-avst-mono text-[10px] tracking-[0.12em] uppercase px-3 py-2 border ${
                i === active ? "bg-avst-ink text-avst-paper border-avst-ink" : "border-avst-line-hard text-avst-ink-2"
              }`}
            >
              {m.short}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-[minmax(0,360px)_1fr] gap-8 md:gap-14 items-start mb-16">
          <div className={`relative aspect-[3/4] w-full overflow-hidden ${WASH[c.id] || "bg-avst-line"} bg-opacity-20`}>
            <img src={c.img} alt={`${c.short}, character turnaround`} className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <div>
            <p className="font-avst-mono text-[10px] tracking-[0.14em] uppercase text-avst-ink-3 mb-2">{c.role}</p>
            <h2 className="font-avst-display font-semibold text-[clamp(1.8rem,4.5vw,3rem)] leading-[1.02] tracking-[-0.02em] mb-2">
              {c.name}
            </h2>
            <p className="text-avst-ink-2 mb-3">{c.homeLine}</p>
            <p className="italic text-[1.1rem] mb-6">“{c.line}”</p>
            <dl>
              <Spec k="Age" v={String(c.age)} />
              <Spec k="Works" v={c.job} />
              <Spec k="Wiring" v={`${c.mbti} · ${c.sign}`} />
              <Spec k="Home is" v={c.home} />
              <Spec k="Flaw" v={c.flaw} />
              <Spec k="Tell" v={c.tell} />
              <Spec k="Carries" v={c.carries.join(" · ")} />
            </dl>
          </div>
        </div>

        <div className="flex items-baseline justify-between gap-8 pb-6 border-b border-avst-line-hard mb-6">
          <div>
            <span className="block font-avst-mono text-[10px] tracking-[0.14em] uppercase text-avst-ink-3">The colony</span>
            <h2 className="font-avst-display font-medium text-[clamp(22px,3vw,32px)] tracking-[-0.02em]">Everybody else</h2>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SATELLITES.map((s) => (
            <article key={s.id} className="border border-avst-line-hard">
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img src={s.img} alt={s.name} loading="lazy" decoding="async" className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-avst-display font-medium text-[1.05rem]">{s.name}</h3>
                <p className="font-avst-mono text-[10px] tracking-[0.1em] uppercase text-avst-ink-3 mt-1">{s.role}</p>
                <p className="text-[.85rem] text-avst-ink-2 mt-2 leading-[1.5]">{s.note}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
