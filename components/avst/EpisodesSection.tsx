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

  return (
    <>
    <section className="sec sec--shelf" id="home" aria-label="Episode shelf">
      <div className="shelfview" data-view={view}>
        <div className="shelfview__bar">
          <div className="filters" role="group" aria-label="Filter by movement">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                className="filter"
                aria-pressed={filter === f.id}
                onClick={() => setFilter(f.id)}
              >
                {f.name}
              </button>
            ))}
          </div>
          <div className="viewtoggle" role="group" aria-label="View">
            <button
              type="button"
              className="viewtoggle__btn"
              aria-pressed={view === "grid"}
              onClick={() => setView("grid")}
            >
              Grid
            </button>
            <button
              type="button"
              className="viewtoggle__btn"
              aria-pressed={view === "list"}
              onClick={() => setView("list")}
            >
              List
            </button>
          </div>
        </div>

        <div className="browse">
          <div className="grid" hidden={view !== "grid"}>
            {EPISODES.filter((ep) => filter === "all" || ep.mv === filter).map((ep) => {
              const cover = AVST_COVERS[ep.n];
              return (
                <a
                  key={ep.n}
                  className="cell"
                  href={`#/ep/${ep.n}`}
                  data-mv={ep.mv}
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenEp(ep.n);
                  }}
                >
                  <div className="cell__win">
                    {cover && (
                      <img src={cover} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    )}
                  </div>
                  <p className="cell__no">
                    <span>EP {pad2(ep.n)}</span>
                    <i>{ep.week}</i>
                  </p>
                  <h3 className="cell__te">{ep.te}</h3>
                  <p className="cell__en">{ep.en}</p>
                  <p className="cell__tag">
                    {MOVEMENTS.find((m) => m.id === ep.mv)?.name} · {ep.bookend}
                  </p>
                </a>
              );
            })}
          </div>

          <div className="listing" hidden={view !== "list"}>
            {EPISODES.filter((ep) => filter === "all" || ep.mv === filter).map((ep) => (
              <a
                key={ep.n}
                className="lrow"
                href={`#/ep/${ep.n}`}
                data-mv={ep.mv}
                onClick={(e) => {
                  e.preventDefault();
                  setOpenEp(ep.n);
                }}
              >
                <span className="lrow__no">{pad2(ep.n)}</span>
                <span className="lrow__main">
                  <span className="lrow__te">{ep.te}</span>
                  <span className="lrow__en">{ep.en}</span>
                </span>
                <span className="lrow__wk">{ep.week}</span>
                <span className="lrow__arrow" aria-hidden="true">
                  →
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

    </section>

      {openEp !== null && (
        <section className="sec" id="epfile" aria-label="Episode file">
          <div className="page" id="epbody">
            <EpisodeFile n={openEp} onSelect={setOpenEp} />
          </div>
        </section>
      )}
    </>
  );
}
