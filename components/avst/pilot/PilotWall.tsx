import Link from "next/link";
import { AVST_CHIBI } from "@/content/avst-media";
import { WALL_TILES, type WallTile } from "@/content/avst-pilot";

const SPAN = "md:[grid-column:span_var(--w)] md:[grid-row:span_var(--h)]";
const PANEL = "border border-white/12 bg-white/[0.04]";
const KICKER = "font-avst-mono text-[10px] uppercase tracking-[0.18em] text-white/50";
const BODY = "font-avst-body text-[clamp(0.95rem,1.25vw,1.2rem)] leading-snug text-white/90";

function Em({ children }: { children: React.ReactNode }) {
  return <em className="text-avst-accent-soft">{children}</em>;
}

function Tile({ tile }: { tile: WallTile }) {
  switch (tile.kind) {
    case "art":
      return (
        <figure
          style={{ "--w": tile.w, "--h": tile.h, "--ar": `${tile.w}/${tile.h}` } as React.CSSProperties}
          className={`group relative overflow-hidden bg-black max-md:col-span-2 max-md:aspect-(--ar) ${SPAN}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={tile.src} alt={`${tile.title} — ${tile.cap}`} loading="lazy" decoding="async" className="size-full object-cover" />
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100">
            <b className="block font-avst-display text-sm text-white">{tile.title}</b>
            <span className="font-avst-body text-xs text-white/75">{tile.cap}</span>
          </figcaption>
        </figure>
      );
    case "card":
      return (
        <div
          style={{ "--w": tile.w, "--h": tile.h } as React.CSSProperties}
          className={`flex flex-col justify-between gap-6 p-5 max-md:col-span-2 ${PANEL} ${SPAN}`}
        >
          <span className={KICKER}>{tile.k}</span>
          <div>
            <p className={BODY}>
              {tile.body}
              {tile.em && <Em>{tile.em}</Em>}
              {tile.tail}
            </p>
            {tile.note && <p className="mt-2 font-avst-body text-xs text-white/55">{tile.note}</p>}
          </div>
        </div>
      );
    case "stat":
      return (
        <div className={`flex flex-col items-center justify-center gap-1 md:[grid-column:span_1] md:[grid-row:span_1] max-md:aspect-square ${PANEL}`}>
          <b className="font-avst-display text-[clamp(1.4rem,2.6vw,2.4rem)] font-semibold leading-none text-white">{tile.value}</b>
          <span className={KICKER}>{tile.label}</span>
        </div>
      );
    case "cta":
      return (
        <Link
          href="#stage"
          style={{ "--w": tile.w, "--h": tile.h } as React.CSSProperties}
          className={`flex flex-col justify-between bg-avst-accent p-5 text-white transition hover:bg-avst-accent-2 max-md:col-span-2 ${SPAN}`}
        >
          <span className="font-avst-mono text-[10px] uppercase tracking-[0.18em] text-white/70">Start here</span>
          <p className="font-avst-display text-[clamp(1.2rem,2vw,1.8rem)] font-semibold leading-tight">
            Read the pilot <i aria-hidden="true">→</i>
          </p>
          <span className="font-avst-mono text-[10px] uppercase tracking-[0.14em] text-white/70">Nine pages, in full</span>
        </Link>
      );
    case "marquee":
      return (
        <div
          aria-hidden="true"
          style={{ "--w": 8, "--h": 2 } as React.CSSProperties}
          className={`relative flex items-center overflow-hidden max-md:col-span-2 max-md:h-24 ${PANEL} ${SPAN}`}
        >
          <div className="flex w-max animate-avst-marquee-left items-center gap-10 pr-10">
            {[0, 1, 2, 3].flatMap((rep) =>
              AVST_CHIBI.map((c) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={`${rep}-${c.ci}`} src={c.src} alt="" loading="lazy" className="h-[70%] max-h-24 w-auto md:h-24" />
              )),
            )}
          </div>
        </div>
      );
  }
}

export default function PilotWall() {
  return (
    <section aria-label="The season at a glance" className="bg-avst-night px-[clamp(16px,3.5vw,56px)] py-[clamp(48px,8vw,120px)] text-white">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-3 md:grid-cols-8 md:auto-rows-[clamp(64px,7.4vw,112px)] md:[grid-auto-flow:dense]">
        {WALL_TILES.map((t, i) => (
          <Tile key={i} tile={t} />
        ))}
      </div>
    </section>
  );
}
