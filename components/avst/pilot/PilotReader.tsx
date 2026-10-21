"use client";

import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { PILOT_HERO, PILOT_PAGES } from "@/content/avst-pilot";

type ReadMode = "flip" | "scroll";
type FlipApi = {
  pageFlip: () => { flipNext: () => void; flipPrev: () => void };
};

const PAGE_RATIO = 910 / 1287;
const STAGE_PAD_PX = 16;
/** Below this page width the book falls back to one page at a time. */
const MIN_SPREAD_PAGE_WIDTH_PX = 240;

interface BookLayout {
  pageWidth: number;
  pageHeight: number;
  spread: boolean;
}

/** Biggest page that fits the stage, as a two-page spread whenever it fits. */
function fitBook(stageWidth: number, stageHeight: number): BookLayout | null {
  const width = stageWidth - STAGE_PAD_PX * 2;
  const height = stageHeight - STAGE_PAD_PX * 2;
  if (width <= 0 || height <= 0) return null;
  const byHeight = height * PAGE_RATIO;
  const spreadWidth = Math.floor(Math.min(width / 2, byHeight));
  const spread = spreadWidth >= MIN_SPREAD_PAGE_WIDTH_PX;
  const pageWidth = Math.floor(spread ? spreadWidth : Math.min(width, byHeight));
  return { pageWidth, pageHeight: Math.round(pageWidth / PAGE_RATIO), spread };
}

/** The cover first, then the nine story pages. */
const SHEETS = [
  { src: PILOT_HERO.cover, alt: "Cover" },
  ...PILOT_PAGES.map((src, i) => ({ src, alt: `Page ${i + 1}` })),
];

const FlipPage = forwardRef<HTMLDivElement, { src: string; alt: string }>(
  function FlipPage({ src, alt }, ref) {
    return (
      <div ref={ref} className="bg-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          draggable={false}
          className="block h-full w-full object-cover"
        />
      </div>
    );
  },
);

const iconBtn =
  "grid size-11 place-items-center rounded-full border border-avst-line-hard bg-avst-paper font-avst-mono text-sm text-avst-ink transition hover:bg-avst-ink hover:text-avst-paper disabled:opacity-25 disabled:hover:bg-avst-paper disabled:hover:text-avst-ink";

interface PilotReaderProps {
  onClose: () => void;
}

export default function PilotReader({ onClose }: PilotReaderProps) {
  const [mode, setMode] = useState<ReadMode>("flip");
  const [page, setPage] = useState(0);
  const bookRef = useRef<FlipApi | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState<BookLayout | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  // Client-only component (loaded with ssr: false), so `document` is safe here.
  const [canFullscreen] = useState(() => document.fullscreenEnabled === true);
  const total = SHEETS.length;
  const pageWidth = layout?.pageWidth ?? 0;
  // A closed book (cover / back) sits on one half of the spread; slide it to centre.
  const shift = !layout?.spread
    ? 0
    : page === 0
      ? -pageWidth / 2
      : page >= total - 1
        ? pageWidth / 2
        : 0;

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const measure = () => setLayout(fitBook(stage.clientWidth, stage.clientHeight));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    return () => observer.disconnect();
  }, [mode]);

  useEffect(() => {
    const onChange = () => setIsFullscreen(document.fullscreenElement !== null);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void rootRef.current?.requestFullscreen().catch(() => undefined);
  }, []);

  const flip = useCallback((dir: 1 | -1) => {
    const api = bookRef.current?.pageFlip();
    if (dir === 1) api?.flipNext();
    else api?.flipPrev();
  }, []);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") flip(1);
      else if (e.key === "ArrowLeft") flip(-1);
      else if (e.key === "f" || e.key === "F") toggleFullscreen();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [onClose, flip, toggleFullscreen]);

  const tab = (m: ReadMode) =>
    `px-3.5 py-1.5 font-avst-mono text-[11px] uppercase tracking-[0.14em] transition ${
      mode === m
        ? "bg-avst-ink text-avst-paper"
        : "text-avst-ink-3 hover:text-avst-ink"
    }`;

  return (
    <div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${PILOT_HERO.te} — ${PILOT_HERO.en}`}
      className="fixed inset-0 z-[9600] flex flex-col bg-avst-paper text-avst-ink"
    >
      <div className="flex items-center justify-between gap-4 px-[clamp(16px,3vw,40px)] py-3">
        <p className="min-w-0 truncate font-avst-mono text-[11px] uppercase tracking-[0.14em] text-avst-ink-3">
          {PILOT_HERO.te} — {PILOT_HERO.en}
        </p>
        <div className="flex items-center gap-3">
          <div
            role="group"
            aria-label="Reading mode"
            className="flex overflow-hidden rounded-full border border-avst-line-hard"
          >
            <button
              type="button"
              aria-pressed={mode === "flip"}
              className={tab("flip")}
              onClick={() => setMode("flip")}
            >
              Flip
            </button>
            <button
              type="button"
              aria-pressed={mode === "scroll"}
              className={tab("scroll")}
              onClick={() => setMode("scroll")}
            >
              Scroll
            </button>
          </div>
          {canFullscreen && (
            <button
              type="button"
              aria-pressed={isFullscreen}
              onClick={toggleFullscreen}
              className="font-avst-mono text-[11px] uppercase tracking-[0.14em] text-avst-ink hover:text-avst-accent"
            >
              {isFullscreen ? "Exit full screen" : "Full screen"}
            </button>
          )}
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="font-avst-mono text-[11px] uppercase tracking-[0.14em] text-avst-ink hover:text-avst-accent"
          >
            Close the book
          </button>
        </div>
      </div>

      {mode === "flip" ? (
        <>
          <div
            ref={stageRef}
            className="grid min-h-0 flex-1 place-items-center overflow-hidden"
          >
            {layout && (
              <div
                style={{ transform: `translateX(${shift}px)` }}
                className="transition-transform duration-700 motion-reduce:transition-none"
              >
                <HTMLFlipBook
                  key={`${layout.pageWidth}-${layout.spread}`}
                  className="mx-auto"
                  style={{}}
                  startPage={page}
                  size="fixed"
                  width={layout.pageWidth}
                  height={layout.pageHeight}
                  minWidth={layout.pageWidth}
                  maxWidth={layout.pageWidth}
                  minHeight={layout.pageHeight}
                  maxHeight={layout.pageHeight}
                  drawShadow
                  flippingTime={700}
                  usePortrait={!layout.spread}
                  startZIndex={0}
                  autoSize={false}
                  maxShadowOpacity={0.35}
                  showCover
                  mobileScrollSupport
                  clickEventForward
                  useMouseEvents
                  swipeDistance={30}
                  showPageCorners
                  disableFlipByClick={false}
                  ref={bookRef}
                  onFlip={(e) => setPage(e.data)}
                >
                  {SHEETS.map((sheet) => (
                    <FlipPage key={sheet.src} src={sheet.src} alt={sheet.alt} />
                  ))}
                </HTMLFlipBook>
              </div>
            )}
          </div>
          <div className="flex items-center justify-center gap-5 px-4 py-4">
            <button
              type="button"
              aria-label="Previous page"
              className={iconBtn}
              disabled={page === 0}
              onClick={() => flip(-1)}
            >
              ←
            </button>
            <span
              aria-live="polite"
              className="min-w-36 text-center font-avst-mono text-[11px] uppercase tracking-[0.14em] text-avst-ink-3"
            >
              {page === 0 ? "The cover" : `Page ${page} of ${total - 1}`}
            </span>
            <button
              type="button"
              aria-label="Next page"
              className={iconBtn}
              disabled={page >= total - 1}
              onClick={() => flip(1)}
            >
              →
            </button>
          </div>
          <p className="pb-4 text-center font-avst-mono text-[10px] uppercase tracking-[0.14em] text-avst-ink-3">
            Arrow keys or swipe · F for full screen
          </p>
        </>
      ) : (
        <div className="min-h-0 flex-1 overflow-y-auto">
          <ol className="mx-auto flex max-w-[640px] flex-col gap-4 px-4 pb-16">
            {SHEETS.map((sheet) => (
              <li key={sheet.src}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={sheet.src}
                  alt={sheet.alt}
                  loading="lazy"
                  className="block w-full bg-white shadow-[0_30px_70px_-34px_rgba(12,13,16,0.55)]"
                />
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
