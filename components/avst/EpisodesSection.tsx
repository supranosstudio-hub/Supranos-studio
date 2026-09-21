"use client";

import { useMemo, useState } from "react";
import { EPISODES, MOVEMENTS } from "@/content/avst";
import { AVST_COVERS } from "@/content/avst-media";
import EpisodeFile from "./EpisodeFile";

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

export default function EpisodesSection() {
  const [filter, setFilter] = useState<string>("all");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [openEp, setOpenEp] = useState<number | null>(null);

  const filters = useMemo(
    () => [{ id: "all", name: "All thirteen" }, ...MOVEMENTS.map((m) => ({ id: m.id, name: `${m.n} · ${m.name}` }))],
    []
  );

  const episodes = useMemo(
    () => EPISODES.filter((ep) => filter === "all" || ep.mv === filter),
    [filter]
  );

  return (
    <section id="home" aria-label="Episode shelf" className="px-[clamp(16px,4vw,64px)] py-[clamp(28px,5vw,60px)]">
      <div className="max-w-[1180px] mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by movement">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                aria-pressed={filter === f.id}
                className={`font-avst-mono text-[10px] tracking-[0.12em] uppercase px-3 py-2 border ${
                  filter === f.id
                    ? "bg-avst-ink text-avst-paper border-avst-ink"
                    : "border-avst-line-hard text-avst-ink-2"
                }`}
              >
                {f.name}
              </button>
            ))}
          </div>
          <div className="flex gap-2" role="group" aria-label="View">
            {(["grid", "list"] as const).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setView(v)}
                aria-pressed={view === v}
                className={`font-avst-mono text-[10px] tracking-[0.12em] uppercase px-3 py-2 border ${
                  view === v
                    ? "bg-avst-ink text-avst-paper border-avst-ink"
                    : "border-avst-line-hard text-avst-ink-2"
                }`}
              >
                {v === "grid" ? "Grid" : "List"}
              </button>
            ))}
          </div>
        </div>

        {view === "grid" ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {episodes.map((ep) => {
              const cover = AVST_COVERS[ep.n];
              return (
                <button
                  key={ep.n}
                  type="button"
                  onClick={() => setOpenEp(ep.n)}
                  className="text-left group"
                >
                  <div
                    className="aspect-[3/4] w-full bg-cover bg-center border border-avst-line-hard mb-2 transition-transform group-hover:-translate-y-1"
                    style={cover ? { backgroundImage: `url(${cover})` } : undefined}
                  />
                  <p className="font-avst-mono text-[9px] tracking-[0.14em] uppercase text-avst-ink-3">
                    <span>EP {pad2(ep.n)}</span> <i className="not-italic">{ep.week}</i>
                  </p>
                  <h3 className="font-avst-display font-medium text-[.98rem] leading-[1.15] mt-0.5">{ep.te}</h3>
                  <p className="text-[.8rem] text-avst-ink-2 leading-[1.3]">{ep.en}</p>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="divide-y divide-avst-line border-t border-b border-avst-line">
            {episodes.map((ep) => (
              <button
                key={ep.n}
                type="button"
                onClick={() => setOpenEp(ep.n)}
                className="w-full flex items-center gap-4 py-4 text-left"
              >
                <span className="font-avst-mono text-[.8rem] text-avst-ink-3 w-8">{pad2(ep.n)}</span>
                <span className="flex-1">
                  <span className="block font-avst-display text-[1.05rem]">{ep.te}</span>
                  <span className="block text-[.85rem] text-avst-ink-2">{ep.en}</span>
                </span>
                <span className="hidden sm:block font-avst-mono text-[.72rem] text-avst-ink-3">{ep.week}</span>
                <span aria-hidden="true">→</span>
              </button>
            ))}
          </div>
        )}

        {openEp !== null && (
          <div id="epfile" className="mt-14 pt-10 border-t border-avst-line-hard">
            <EpisodeFile n={openEp} onSelect={setOpenEp} />
          </div>
        )}
      </div>
    </section>
  );
}
