"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { EPISODES, MOVEMENTS, SHOW } from "@/content/avst";
import { AVST_COVERS } from "@/content/avst-media";

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

/* A single typeset page, matching the legacy reader's page vocabulary. */
interface Page {
  cover?: boolean;
  title?: boolean;
  quote?: boolean;
  close?: boolean;
  tint?: boolean;
  kicker?: string;
  big?: string;
  h?: string;
  sub?: string;
  movement?: string;
  week?: string;
  lead?: string;
  title2?: string;
  body?: string[];
  list?: string[];
  note?: string;
  q?: string;
  link?: string;
  linkText?: string;
}

/* Ported verbatim from the legacy reader's readerPages(ep). */
function readerPages(epN: number): Page[] {
  const ep = EPISODES.find((e) => e.n === epN)!;
  const movement = MOVEMENTS.find((m) => m.id === ep.mv);
  const next = EPISODES.find((e) => e.n === ep.n + 1);
  const mvLabel = movement ? `${movement.n} · ${movement.name}` : "";
  return [
    { cover: true },
    { title: true, big: pad2(ep.n), h: ep.te, sub: ep.en, movement: mvLabel, week: ep.week },
    { kicker: "The story", body: [ep.logline] },
    { kicker: "What stays", lead: ep.reveal, tint: true },
    { kicker: "What passes", body: [ep.problem], note: "Gone again by the last page." },
    { kicker: "Underneath", lead: ep.felt, note: ep.focus ? `Kept on ${ep.focus}.` : "" },
    { kicker: "On the spine", title2: "Somebody is filming", body: [ep.spine] },
    {
      quote: true,
      kicker: "The refrain",
      q: ep.refrainNote ? ep.refrainNote.replace(/[“”"]/g, "").trim() : "Idi temporary",
      note: ep.refrainNote
        ? `Episode ${pad2(ep.n)} — ${ep.refrain.toLowerCase()}.`
        : "Not spoken this episode. Nobody notices.",
    },
    { kicker: "Carries over", list: ep.runners, note: `Bookend — ${ep.bookend.toLowerCase()}.` },
    {
      close: true,
      kicker: next ? "Next volume" : "End of season",
      big: next ? pad2(next.n) : "—",
      h: next ? next.te : "Repu",
      sub: next ? next.en : "Alone.",
    },
  ];
}

function FaceContent({ pg, epN, coverUrl }: { pg: Page; epN: number; coverUrl?: string }) {
  const ep = EPISODES.find((e) => e.n === epN)!;
  const movement = MOVEMENTS.find((m) => m.id === ep.mv);
  const foot = (
    <div className="br-foot">
      <span>{ep.en}</span>
      <span>{pad2(ep.n)} / 13</span>
    </div>
  );

  if (pg.cover) {
    return (
      <>
        <div className="br-cover__top">
          <span className="br-kicker">Supranos</span>
          <span className="br-kicker">Vol. {movement?.n}</span>
        </div>
        <div
          className="br-cover__win"
          style={coverUrl ? { backgroundImage: `url(${coverUrl})` } : undefined}
        />
        <div className="br-cover__foot">
          <h2 className="br-cover__te">{ep.te}</h2>
          <p className="br-cover__en">{ep.en}</p>
        </div>
      </>
    );
  }
  if (pg.title) {
    return (
      <>
        <p className="br-kicker">Episode {pg.big} of thirteen</p>
        <div className="br-title">
          <p className="br-title__no">{pg.big}</p>
          <h2 className="br-title__h">{pg.h}</h2>
          <p className="br-title__sub">{pg.sub}</p>
        </div>
        <div className="br-title__meta">
          <span>{pg.movement}</span>
          <span>{pg.week}</span>
        </div>
      </>
    );
  }
  if (pg.quote) {
    return (
      <>
        <p className="br-kicker">{pg.kicker}</p>
        <blockquote className="br-quote">&ldquo;{pg.q}&rdquo;</blockquote>
        {pg.note ? <p className="br-quote__note">{pg.note}</p> : null}
        {foot}
      </>
    );
  }
  if (pg.close) {
    return (
      <>
        <p className="br-kicker">{pg.kicker}</p>
        <div className="br-close">
          <p className="br-title__no">{pg.big}</p>
          <h2 className="br-title__h">{pg.h}</h2>
          <p className="br-title__sub">{pg.sub}</p>
        </div>
        {foot}
      </>
    );
  }
  // ordinary leaf
  return (
    <>
      <p className="br-kicker">{pg.kicker}</p>
      <div className="br-mid">
        {pg.lead ? <p className="br-lead">{pg.lead}</p> : null}
        {pg.title2 ? <h3 className="br-h2">{pg.title2}</h3> : null}
        {(pg.body || []).map((t, i) => (
          <p className="br-body" key={i}>
            {t}
          </p>
        ))}
        {pg.list ? (
          <ul className="br-list">
            {pg.list.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        ) : null}
        {pg.note ? <p className="br-note">{pg.note}</p> : null}
      </div>
      {foot}
    </>
  );
}

function faceClass(pg: Page, side: "front" | "back") {
  return [
    "br-face",
    `br-face--${side}`,
    pg.cover && "br-face--cover",
    pg.title && "br-face--title",
    pg.quote && "br-face--quote",
    pg.close && "br-face--close",
    pg.tint && "br-face--tint",
  ]
    .filter(Boolean)
    .join(" ");
}

export default function BookReader({ n, onClose }: { n: number; onClose: () => void }) {
  const ep = EPISODES.find((e) => e.n === n)!;
  const movement = MOVEMENTS.find((m) => m.id === ep.mv);
  const coverUrl = AVST_COVERS[n];
  const pages = useMemo(() => readerPages(n), [n]);
  const K = pages.length;

  const [turned, setTurned] = useState(0);
  const [reading, setReading] = useState(false);

  const go = useCallback(
    (dir: number) => {
      setTurned((t) => Math.max(0, Math.min(K - 1, t + dir)));
    },
    [K]
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") {
        setReading(true);
        setTurned((t) => Math.min(K - 1, t + 1));
      } else if (e.key === "ArrowLeft") setTurned((t) => Math.max(0, t - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [K, onClose]);

  const countLabel = turned === 0 ? "The cover" : turned >= K - 1 ? "The last page" : `Page ${turned + 1} of ${K}`;

  const startReading = () => {
    setReading(true);
    if (turned === 0) setTurned(1);
  };

  return (
    <div className="bookreader" role="dialog" aria-modal="true" aria-label={`Reading ${ep.te}`}>
      <style>{`
        .bookreader{ --paper:#f4efe4; --paper-2:#ece7dc; --ink:#2b2721; --ink-2:rgba(43,39,33,.72); --ink-3:rgba(43,39,33,.46);
          --line:rgba(43,39,33,.16); --accent:#1b4dc4; --board:${movement?.board || "#c9b79a"};
          position:fixed; inset:0; z-index:2000; display:grid; grid-template-rows:1fr auto;
          background:rgba(24,20,16,.72); -webkit-backdrop-filter:blur(10px); backdrop-filter:blur(10px);
          font-family:Georgia,'Times New Roman',serif; color:var(--ink); animation:br-in .3s ease both; }
        @keyframes br-in{ from{opacity:0} }
        .bookreader__scrim{ position:absolute; inset:0; z-index:0; border:0; background:transparent; cursor:zoom-out; }
        .bookreader__close{ position:absolute; top:18px; right:18px; z-index:9; width:40px; height:40px; border-radius:50%;
          border:1px solid rgba(255,255,255,.24); background:rgba(0,0,0,.25); color:#fff; cursor:pointer; font-size:18px;
          display:inline-flex; align-items:center; justify-content:center; }
        .bookreader__close:hover{ background:rgba(0,0,0,.5); }

        .br-stage{ position:relative; z-index:1; display:flex; align-items:center; justify-content:center; gap:clamp(20px,4vw,64px);
          padding:clamp(20px,5vh,64px) clamp(16px,4vw,56px) 0; min-height:0; flex-wrap:wrap; }

        /* summary panel */
        .br-sum{ max-width:340px; color:#f3eee3; }
        .br-sum__vol{ display:flex; justify-content:space-between; font-size:11px; letter-spacing:.16em; text-transform:uppercase; color:rgba(255,255,255,.55); margin:0 0 14px; }
        .br-sum__te{ font-size:clamp(1.8rem,3vw,2.6rem); line-height:1.02; margin:0 0 6px; color:#fff; }
        .br-sum__en{ font-size:12px; letter-spacing:.14em; text-transform:uppercase; color:rgba(255,255,255,.55); margin:0 0 16px; }
        .br-sum__log{ font-size:1rem; line-height:1.6; color:rgba(255,255,255,.82); margin:0 0 18px; }
        .br-sum__spec{ margin:0 0 20px; border-top:1px solid rgba(255,255,255,.18); }
        .br-sum__row{ display:grid; grid-template-columns:6.5em 1fr; gap:12px; padding:8px 0; border-bottom:1px solid rgba(255,255,255,.12); }
        .br-sum__row dt{ font-size:10px; letter-spacing:.14em; text-transform:uppercase; color:rgba(255,255,255,.5); font-family:ui-monospace,monospace; }
        .br-sum__row dd{ margin:0; font-size:.92rem; color:rgba(255,255,255,.85); }
        .br-sum__cta{ display:inline-block; padding:11px 22px; background:var(--accent); color:#fff; border:0; cursor:pointer;
          font-family:ui-monospace,monospace; font-size:12px; letter-spacing:.1em; text-transform:uppercase; }
        .br-sum__cta:hover{ filter:brightness(1.1); }
        @media (max-width:820px){ .br-sum{ display:none; } }

        /* the book */
        .br-book{ position:relative; height:min(74vh,620px); width:calc(min(74vh,620px) * 0.72);
          perspective:2200px; transform-style:preserve-3d; }
        .br-leaf{ position:absolute; inset:0; transform-style:preserve-3d; transform-origin:left center;
          transition:transform .9s cubic-bezier(.2,.7,.2,1); }
        .br-leaf.is-turned{ transform:rotateY(-178deg); }
        .br-face{ position:absolute; inset:0; -webkit-backface-visibility:hidden; backface-visibility:hidden; overflow:hidden;
          background:var(--paper); border:1px solid var(--line); border-radius:2px 6px 6px 2px;
          box-shadow:0 24px 50px -20px rgba(20,14,8,.7), inset 1px 0 0 rgba(255,255,255,.4);
          padding:clamp(20px,3vw,34px); display:flex; flex-direction:column; }
        .br-face--back{ transform:rotateY(180deg); border-radius:6px 2px 2px 6px; }
        .br-face--blank{ background:var(--paper-2); box-shadow:inset 0 0 30px rgba(58,44,26,.08); }
        .br-face--tint{ background:linear-gradient(160deg,#f0ead9,#e7dcc4); }

        .br-kicker{ font-family:ui-monospace,monospace; font-size:10px; letter-spacing:.2em; text-transform:uppercase; color:var(--ink-3); margin:0 0 auto; }
        .br-foot{ display:flex; justify-content:space-between; font-family:ui-monospace,monospace; font-size:9.5px; letter-spacing:.12em; text-transform:uppercase; color:var(--ink-3); margin-top:auto; padding-top:14px; }
        .br-mid{ margin:22px 0 auto; }
        .br-lead{ font-size:clamp(1.15rem,1.9vw,1.5rem); line-height:1.35; margin:0 0 14px; color:var(--ink); }
        .br-h2{ font-size:1rem; letter-spacing:.02em; margin:0 0 10px; }
        .br-body{ font-size:1rem; line-height:1.62; color:var(--ink-2); margin:0 0 12px; }
        .br-list{ margin:0; padding-left:18px; }
        .br-list li{ font-size:.98rem; line-height:1.5; color:var(--ink-2); margin:0 0 8px; }
        .br-note{ font-size:.82rem; font-style:italic; color:var(--ink-3); margin:14px 0 0; }

        /* cover face */
        .br-face--cover{ background:linear-gradient(165deg,var(--board),color-mix(in srgb,var(--board) 72%, #000)); color:#fff; }
        .br-cover__top{ display:flex; justify-content:space-between; }
        .br-face--cover .br-kicker{ color:rgba(255,255,255,.7); }
        .br-cover__win{ flex:1; margin:16px 0; background:rgba(0,0,0,.2) center/cover no-repeat; border-radius:2px; box-shadow:inset 0 0 0 1px rgba(255,255,255,.15); }
        .br-cover__te{ font-size:clamp(1.5rem,2.4vw,2.1rem); line-height:1.02; margin:0 0 4px; }
        .br-cover__en{ font-family:ui-monospace,monospace; font-size:10px; letter-spacing:.16em; text-transform:uppercase; color:rgba(255,255,255,.7); margin:0; }

        /* title face */
        .br-title{ margin:auto 0; }
        .br-title__no{ font-size:clamp(3rem,6vw,5rem); line-height:.9; color:var(--ink-3); margin:0; }
        .br-title__h{ font-size:clamp(1.8rem,3vw,2.6rem); line-height:1.02; margin:8px 0; }
        .br-title__sub{ font-family:ui-monospace,monospace; font-size:11px; letter-spacing:.14em; text-transform:uppercase; color:var(--ink-3); margin:0; }
        .br-title__meta{ display:flex; justify-content:space-between; font-family:ui-monospace,monospace; font-size:10px; letter-spacing:.12em; text-transform:uppercase; color:var(--ink-3); margin-top:auto; }

        /* quote face */
        .br-quote{ font-size:clamp(1.5rem,2.6vw,2.1rem); font-style:italic; line-height:1.3; margin:auto 0 0; color:var(--ink); }
        .br-quote__note{ font-size:.85rem; color:var(--ink-3); margin:14px 0 auto; }

        /* nav */
        .br-nav{ position:relative; z-index:2; display:flex; align-items:center; justify-content:center; gap:20px; padding:18px; color:#f3eee3; }
        .br-nav button{ background:transparent; border:1px solid rgba(255,255,255,.28); color:#fff; width:44px; height:44px; border-radius:50%; cursor:pointer; font-size:18px; }
        .br-nav button:hover:not(:disabled){ background:rgba(255,255,255,.14); }
        .br-nav button:disabled{ opacity:.3; cursor:default; }
        .br-nav__count{ font-family:ui-monospace,monospace; font-size:11px; letter-spacing:.16em; text-transform:uppercase; min-width:130px; text-align:center; color:rgba(255,255,255,.7); }
      `}</style>

      <button className="bookreader__scrim" aria-label="Close reader" onClick={onClose} />
      <button className="bookreader__close" aria-label="Close" onClick={onClose}>
        &times;
      </button>

      <div className="br-stage">
        <div className="br-sum">
          <p className="br-sum__vol">
            <span>Volume {movement?.n}</span>
            <b>{pad2(ep.n)} / 13</b>
          </p>
          <h2 className="br-sum__te">{ep.te}</h2>
          <p className="br-sum__en">{ep.en}</p>
          <p className="br-sum__log">{ep.logline}</p>
          <dl className="br-sum__spec">
            <div className="br-sum__row">
              <dt>Movement</dt>
              <dd>
                {movement?.n} · {movement?.name}
              </dd>
            </div>
            <div className="br-sum__row">
              <dt>When</dt>
              <dd>{ep.week}</dd>
            </div>
            <div className="br-sum__row">
              <dt>Format</dt>
              <dd>{SHOW.format}</dd>
            </div>
            <div className="br-sum__row">
              <dt>Theme</dt>
              <dd>{ep.felt}</dd>
            </div>
          </dl>
          <button className="br-sum__cta" onClick={startReading}>
            Open the book &rarr;
          </button>
        </div>

        <div className="br-book" onClick={() => !reading && startReading()}>
          {pages.map((pg, i) => {
            const isTurned = i < turned;
            const z = isTurned ? i + 1 : K - i;
            return (
              <div className={`br-leaf${isTurned ? " is-turned" : ""}`} key={i} style={{ zIndex: z }}>
                <div className={faceClass(pg, "front")}>
                  <FaceContent pg={pg} epN={n} coverUrl={coverUrl} />
                </div>
                <div className="br-face br-face--back br-face--blank" />
              </div>
            );
          })}
        </div>
      </div>

      <div className="br-nav">
        <button aria-label="previous page" onClick={() => go(-1)} disabled={turned === 0}>
          &larr;
        </button>
        <span className="br-nav__count">{countLabel}</span>
        <button
          aria-label="next page"
          onClick={() => {
            setReading(true);
            go(1);
          }}
          disabled={turned >= K - 1}
        >
          &rarr;
        </button>
      </div>
    </div>
  );
}
