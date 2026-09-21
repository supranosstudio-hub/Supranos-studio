"use client";

import { EPISODES, SHOW, type Episode } from "@/content/avst";
import { AVST_COVERS } from "@/content/avst-media";

function pad2(n: number) {
  return String(n).padStart(2, "0");
}
function dayOf(n: number) {
  // 40 days across 13 episodes, spread roughly evenly like the original.
  return Math.min(40, Math.round(((n - 1) / 12) * 39) + 1);
}

function Beat({ k, v, wide, holi }: { k: string; v: string; wide?: boolean; holi?: boolean }) {
  return (
    <div
      className={`border border-avst-line-hard p-4 ${wide ? "sm:col-span-2" : ""} ${
        holi ? "bg-avst-accent-soft" : ""
      }`}
    >
      <p className="font-avst-mono text-[10px] tracking-[0.14em] uppercase text-avst-ink-3 mb-1.5">
        {k}
      </p>
      <p className="text-[.95rem] leading-[1.5] text-avst-ink-2">{v}</p>
    </div>
  );
}

function Spec({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4 py-2.5 border-b border-avst-line">
      <dt className="font-avst-mono text-[10px] tracking-[0.14em] uppercase text-avst-ink-3">{k}</dt>
      <dd className="text-[.9rem] text-avst-ink-2 text-right">{v}</dd>
    </div>
  );
}

export default function EpisodeFile({
  n,
  onSelect,
}: {
  n: number;
  onSelect: (n: number) => void;
}) {
  const ep = EPISODES.find((e) => e.n === n);
  if (!ep) return null;
  const prev = EPISODES.find((e) => e.n === n - 1);
  const next = EPISODES.find((e) => e.n === n + 1);
  const cover = AVST_COVERS[ep.n];

  return (
    <div className="grid md:grid-cols-[minmax(0,340px)_1fr] gap-8 md:gap-14">
      <div>
        <div
          className="aspect-[3/4] w-full bg-cover bg-center border border-avst-line-hard"
          style={cover ? { backgroundImage: `url(${cover})` } : undefined}
        />
        <p className="font-avst-mono text-[10px] tracking-[0.14em] uppercase text-avst-ink-3 mt-3">
          Movement {ep.mv} — {pad2(ep.n)}
        </p>
      </div>
      <div>
        <p className="font-avst-mono text-[10px] tracking-[0.14em] uppercase text-avst-ink-3 mb-2">
          Episode {pad2(ep.n)} of 13 &middot; {ep.week}
          {ep.tentpole ? <span className="text-avst-accent"> &middot; Festival tentpole</span> : null}
          {ep.finale ? <span className="text-avst-accent"> &middot; Finale</span> : null}
        </p>
        <h1 className="font-avst-display font-semibold text-[clamp(1.8rem,4.5vw,3rem)] leading-[1.02] tracking-[-0.02em] mb-2">
          {ep.te}
        </h1>
        <p className="text-avst-ink-2 text-[1.05rem] mb-3">{ep.en}</p>
        <p className="max-w-[62ch] text-avst-ink-2 leading-[1.6] mb-6">{ep.logline}</p>

        <div className="grid sm:grid-cols-2 gap-3 mb-6">
          <Beat k="Permanent reveal" v={ep.reveal} />
          <Beat k="Temporary problem" v={ep.problem} />
          <Beat k="The felt thing" v={ep.felt} />
          <Beat k="Focus" v={ep.focus} />
          <Beat k="Spine beat" v={ep.spine} wide />
          <Beat
            k="“Idi temporary”"
            v={ep.refrainNote ? `${ep.refrain} — ${ep.refrainNote}` : ep.refrain}
            wide
            holi
          />
        </div>

        <dl className="mb-8">
          <Spec k="Panels" v={SHOW.format} />
          <Spec k="Bookend" v={ep.bookend} />
          <Spec k="Day" v={`Day ${pad2(dayOf(ep.n))} of 40`} />
          <Spec k="Runners" v={ep.runners.join(" · ")} />
        </dl>

        <nav className="flex items-center justify-between border-t border-avst-line-hard pt-5">
          {prev ? (
            <button
              type="button"
              onClick={() => onSelect(prev.n)}
              className="text-left"
            >
              <span className="block font-avst-mono text-[10px] tracking-[0.14em] uppercase text-avst-ink-3">
                ← Previous
              </span>
              <span className="block text-[.95rem]">{prev.te}</span>
            </button>
          ) : (
            <span />
          )}
          {next ? (
            <button
              type="button"
              onClick={() => onSelect(next.n)}
              className="text-right"
            >
              <span className="block font-avst-mono text-[10px] tracking-[0.14em] uppercase text-avst-ink-3">
                Next →
              </span>
              <span className="block text-[.95rem]">{next.te}</span>
            </button>
          ) : (
            <span />
          )}
        </nav>
      </div>
    </div>
  );
}
