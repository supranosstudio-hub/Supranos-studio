"use client";

import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { PILOT_HERO, PILOT_PAGES } from "@/content/avst-pilot";

type ReadMode = "flip" | "scroll";
type FlipApi = {
  pageFlip: () => { flipNext: () => void; flipPrev: () => void };
};

const PAGE_RATIO = 910 / 1287;
/** Vertical space taken by the reader's top bar and footer controls. */
const CHROME_HEIGHT_PX = 190;
const MAX_PAGE_WIDTH_PX = 620;
const MIN_PAGE_WIDTH_PX = 220;

/** Largest page size that keeps the whole spread inside the viewport. */
function fitPageWidth(): number {
  const byHeight = (window.innerHeight - CHROME_HEIGHT_PX) * PAGE_RATIO;
  return Math.round(
    Math.max(MIN_PAGE_WIDTH_PX, Math.min(MAX_PAGE_WIDTH_PX, byHeight)),
  );
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
  const [pageWidth, setPageWidth] = useState(MAX_PAGE_WIDTH_PX);
  const [spreadView, setSpreadView] = useState(true);
  const total = SHEETS.length;
  // A closed book (cover / back) sits on one half of the spread; slide it to centre.
  const shift = !spreadView
    ? 0
    : page === 0
      ? -pageWidth / 2
      : page >= total - 1
        ? pageWidth / 2
        : 0;

  useEffect(() => {
    const onResize = () => {
      const width = fitPageWidth();
      setPageWidth(width);
      setSpreadView(window.innerWidth >= width * 2 + 48);
    };
    const frame = requestAnimationFrame(onResize);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
    };
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
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [onClose, flip]);

  const tab = (m: ReadMode) =>
    `px-3.5 py-1.5 font-avst-mono text-[11px] uppercase tracking-[0.14em] transition ${
      mode === m
        ? "bg-avst-ink text-avst-paper"
        : "text-avst-ink-3 hover:text-avst-ink"
    }`;

  return (
    <div
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
          <div className="grid min-h-0 flex-1 place-items-center overflow-hidden px-[clamp(12px,3vw,40px)]">
            <div
              style={{ transform: `translateX(${shift}px)` }}
              className="transition-transform duration-700 motion-reduce:transition-none"
            >
              <HTMLFlipBook
                className="mx-auto"
                style={{}}
                startPage={0}
                size="stretch"
                width={400}
                height={Math.round(400 / PAGE_RATIO)}
                minWidth={Math.min(260, pageWidth)}
                maxWidth={pageWidth}
                minHeight={Math.round(Math.min(260, pageWidth) / PAGE_RATIO)}
                maxHeight={Math.round(pageWidth / PAGE_RATIO)}
                drawShadow
                flippingTime={700}
                usePortrait
                startZIndex={0}
                autoSize
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
            Arrow keys, or swipe
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
