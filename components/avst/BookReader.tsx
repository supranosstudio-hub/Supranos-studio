"use client";

import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { EPISODES, MOVEMENTS, SHOW } from "@/content/avst";
import { AVST_COVERS } from "@/content/avst-media";

/* ────────────────────────────────────────────────────────────────────────
   Customisation — a custom backdrop, per-page background art, and per-page
   music. Pass these as props from where you open the reader, or edit the
   defaults. Keys are the page index (0 = cover). Drop audio/images in
   /public and reference them as "/audio/xyz.mp3" / "/images/xyz.jpg".
   ──────────────────────────────────────────────────────────────────────── */
const DEFAULT_BACKGROUND =
  "radial-gradient(1200px 820px at 50% -10%, #3a2d1e 0%, #221a12 55%, #14100b 100%)";

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

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
}

/* Ported from the legacy reader's readerPages(ep). */
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

function pageClass(pg: Page) {
  return [
    "br-page",
    pg.cover && "br-page--cover",
    pg.title && "br-page--title",
    pg.quote && "br-page--quote",
    pg.close && "br-page--close",
    pg.tint && "br-page--tint",
  ]
    .filter(Boolean)
    .join(" ");
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
        <div className="br-cover__win" style={coverUrl ? { backgroundImage: `url(${coverUrl})` } : undefined} />
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

/* Each page must forward its ref — react-pageflip attaches to it. */
const FlipPage = forwardRef<
  HTMLDivElement,
  { pg: Page; epN: number; coverUrl?: string; bg?: string }
>(function FlipPage({ pg, epN, coverUrl, bg }, ref) {
  return (
    <div
      className={pageClass(pg)}
      ref={ref}
      style={bg ? { backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
    >
      <div className="br-page__inner">
        <FaceContent pg={pg} epN={epN} coverUrl={coverUrl} />
      </div>
    </div>
  );
});

type FlipApi = { pageFlip: () => { flipNext: () => void; flipPrev: () => void } };

interface BookReaderProps {
  n: number;
  onClose: () => void;
  /** Reader backdrop — any CSS background value (gradient or `url(...)`). */
  background?: string;
  /** page index → background image url */
  pageBackgrounds?: Record<number, string>;
  /** page index → audio file url (played, looped, while that page shows) */
  pageAudio?: Record<number, string>;
}

export default function BookReader({
  n,
  onClose,
  background = DEFAULT_BACKGROUND,
  pageBackgrounds = {},
  pageAudio = {},
}: BookReaderProps) {
  const ep = EPISODES.find((e) => e.n === n)!;
  const movement = MOVEMENTS.find((m) => m.id === ep.mv);
  const coverUrl = AVST_COVERS[n];
  const pages = useMemo(() => readerPages(n), [n]);
  const K = pages.length;

  const bookRef = useRef<FlipApi | null>(null);
  const [page, setPage] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [muted, setMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") bookRef.current?.pageFlip()?.flipNext();
      else if (e.key === "ArrowLeft") bookRef.current?.pageFlip()?.flipPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  // per-page music
  useEffect(() => {
    const src = pageAudio[page];
    const a = audioRef.current;
    if (!src || muted) {
      a?.pause();
      return;
    }
    const el = a ?? new Audio();
    if (!el.src.endsWith(src)) el.src = src;
    el.loop = true;
    el.volume = 0.5;
    el.play().catch(() => {});
    audioRef.current = el;
  }, [page, muted, pageAudio]);

  useEffect(
    () => () => {
      audioRef.current?.pause();
      audioRef.current = null;
    },
    []
  );

  const countLabel = page === 0 ? "The cover" : page >= K - 1 ? "The last page" : `Page ${page + 1} of ${K}`;
  const hasAudio = Object.keys(pageAudio).length > 0;

  return (
    <div className="bookreader" role="dialog" aria-modal="true" aria-label={`Reading ${ep.te}`} style={{ background }}>
      <style>{`
        .bookreader{ --paper:#f4efe4; --paper-2:#ece7dc; --ink:#2b2721; --ink-2:rgba(43,39,33,.72); --ink-3:rgba(43,39,33,.46);
          --line:rgba(43,39,33,.16); --accent:#1b4dc4; --board:${movement?.board || "#c9b79a"};
          position:fixed; inset:0; z-index:2000; display:grid; grid-template-rows:auto 1fr auto;
          font-family:Georgia,'Times New Roman',serif; color:var(--ink); animation:br-in .3s ease both; }
        @keyframes br-in{ from{opacity:0} }
        .bookreader__bar{ position:relative; z-index:3; display:flex; align-items:center; justify-content:space-between; gap:16px;
          padding:16px clamp(16px,4vw,40px); color:#f3eee3; }
        .bookreader__meta{ display:flex; align-items:baseline; gap:12px; min-width:0; }
        .bookreader__meta b{ font-size:clamp(1rem,2vw,1.3rem); font-weight:600; }
        .bookreader__meta span{ font-family:ui-monospace,monospace; font-size:10px; letter-spacing:.16em; text-transform:uppercase; color:rgba(255,255,255,.55); }
        .bookreader__tools{ display:flex; align-items:center; gap:10px; }
        .br-icon{ width:40px; height:40px; border-radius:50%; border:1px solid rgba(255,255,255,.24); background:rgba(0,0,0,.25); color:#fff; cursor:pointer; display:inline-flex; align-items:center; justify-content:center; font-size:16px; }
        .br-icon:hover{ background:rgba(0,0,0,.5); }

        .br-stage{ position:relative; z-index:1; display:flex; align-items:center; justify-content:center; padding:clamp(8px,2vh,24px) clamp(12px,4vw,48px); min-height:0; }
        .br-flip{ margin:0 auto; }

        .br-page{ width:100%; height:100%; background:var(--paper); overflow:hidden;
          box-shadow:inset 0 0 0 1px var(--line); }
        .br-page__inner{ width:100%; height:100%; padding:clamp(20px,3.2vw,36px); display:flex; flex-direction:column; box-sizing:border-box; }
        .br-page--tint .br-page__inner, .br-page--tint{ background:linear-gradient(160deg,#f0ead9,#e7dcc4); }

        .br-kicker{ font-family:ui-monospace,monospace; font-size:10px; letter-spacing:.2em; text-transform:uppercase; color:var(--ink-3); margin:0 0 auto; }
        .br-foot{ display:flex; justify-content:space-between; font-family:ui-monospace,monospace; font-size:9.5px; letter-spacing:.12em; text-transform:uppercase; color:var(--ink-3); margin-top:auto; padding-top:14px; }
        .br-mid{ margin:22px 0 auto; }
        .br-lead{ font-size:clamp(1.15rem,1.9vw,1.5rem); line-height:1.35; margin:0 0 14px; color:var(--ink); }
        .br-h2{ font-size:1rem; letter-spacing:.02em; margin:0 0 10px; }
        .br-body{ font-size:1rem; line-height:1.62; color:var(--ink-2); margin:0 0 12px; }
        .br-list{ margin:0; padding-left:18px; }
        .br-list li{ font-size:.98rem; line-height:1.5; color:var(--ink-2); margin:0 0 8px; }
        .br-note{ font-size:.82rem; font-style:italic; color:var(--ink-3); margin:14px 0 0; }

        .br-page--cover{ background:linear-gradient(165deg,var(--board),color-mix(in srgb,var(--board) 70%, #000)); color:#fff; }
        .br-cover__top{ display:flex; justify-content:space-between; }
        .br-page--cover .br-kicker{ color:rgba(255,255,255,.7); margin:0; }
        .br-cover__win{ flex:1; margin:16px 0; background:rgba(0,0,0,.2) center/cover no-repeat; box-shadow:inset 0 0 0 1px rgba(255,255,255,.15); }
        .br-cover__te{ font-size:clamp(1.5rem,2.4vw,2.1rem); line-height:1.02; margin:0 0 4px; }
        .br-cover__en{ font-family:ui-monospace,monospace; font-size:10px; letter-spacing:.16em; text-transform:uppercase; color:rgba(255,255,255,.7); margin:0; }

        .br-title{ margin:auto 0; }
        .br-title__no{ font-size:clamp(3rem,6vw,5rem); line-height:.9; color:var(--ink-3); margin:0; }
        .br-title__h{ font-size:clamp(1.8rem,3vw,2.6rem); line-height:1.02; margin:8px 0; }
        .br-title__sub{ font-family:ui-monospace,monospace; font-size:11px; letter-spacing:.14em; text-transform:uppercase; color:var(--ink-3); margin:0; }
        .br-title__meta{ display:flex; justify-content:space-between; font-family:ui-monospace,monospace; font-size:10px; letter-spacing:.12em; text-transform:uppercase; color:var(--ink-3); margin-top:auto; }

        .br-quote{ font-size:clamp(1.5rem,2.6vw,2.1rem); font-style:italic; line-height:1.3; margin:auto 0 0; color:var(--ink); }
        .br-quote__note{ font-size:.85rem; color:var(--ink-3); margin:14px 0 auto; }

        .br-nav{ position:relative; z-index:3; display:flex; align-items:center; justify-content:center; gap:20px; padding:16px; color:#f3eee3; }
        .br-nav button{ background:transparent; border:1px solid rgba(255,255,255,.28); color:#fff; width:44px; height:44px; border-radius:50%; cursor:pointer; font-size:18px; }
        .br-nav button:hover{ background:rgba(255,255,255,.14); }
        .br-nav__count{ font-family:ui-monospace,monospace; font-size:11px; letter-spacing:.16em; text-transform:uppercase; min-width:140px; text-align:center; color:rgba(255,255,255,.7); }
      `}</style>

      <div className="bookreader__bar">
        <div className="bookreader__meta">
          <b>{ep.te}</b>
          <span>
            {pad2(ep.n)} / 13 · {movement?.name}
          </span>
        </div>
        <div className="bookreader__tools">
          {hasAudio ? (
            <button className="br-icon" aria-label={muted ? "unmute" : "mute"} onClick={() => setMuted((m) => !m)}>
              {muted ? "\u{1F507}" : "\u{1F50A}"}
            </button>
          ) : null}
          <button className="br-icon" aria-label="Close" onClick={onClose}>
            &times;
          </button>
        </div>
      </div>

      <div className="br-stage">
        {mounted ? (
          <HTMLFlipBook
            className="br-flip"
            style={{}}
            startPage={0}
            size="stretch"
            width={400}
            height={560}
            minWidth={300}
            maxWidth={560}
            minHeight={420}
            maxHeight={760}
            drawShadow={true}
            flippingTime={800}
            usePortrait={true}
            startZIndex={0}
            autoSize={true}
            maxShadowOpacity={0.5}
            showCover={true}
            mobileScrollSupport={true}
            clickEventForward={true}
            useMouseEvents={true}
            swipeDistance={30}
            showPageCorners={true}
            disableFlipByClick={false}
            ref={bookRef}
            onFlip={(e) => setPage(e.data)}
          >
            {pages.map((pg, i) => (
              <FlipPage key={i} pg={pg} epN={n} coverUrl={coverUrl} bg={pageBackgrounds[i]} />
            ))}
          </HTMLFlipBook>
        ) : null}
      </div>

      <div className="br-nav">
        <button aria-label="previous page" onClick={() => bookRef.current?.pageFlip()?.flipPrev()}>
          &larr;
        </button>
        <span className="br-nav__count">{countLabel}</span>
        <button aria-label="next page" onClick={() => bookRef.current?.pageFlip()?.flipNext()}>
          &rarr;
        </button>
      </div>
    </div>
  );
}
