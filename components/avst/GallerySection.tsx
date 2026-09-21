"use client";

import { AVST_GALLERY, AVST_CHIBI } from "@/content/avst-media";

function MarqueeRow({ dir, offset }: { dir: "left" | "right"; offset: number }) {
  const faces = AVST_CHIBI;
  if (!faces.length) return null;
  const row = [...faces.slice(offset), ...faces.slice(0, offset), ...faces.slice(offset), ...faces.slice(0, offset)];
  return (
    <div className="overflow-hidden py-3">
      <div
        className={`flex gap-8 w-max ${dir === "left" ? "animate-avst-marquee-left" : "animate-avst-marquee-right"}`}
      >
        {row.map((f, i) => (
          <a
            key={`${f.ci}-${i}`}
            href={`#cast`}
            className="flex flex-col items-center gap-1.5 shrink-0"
            aria-hidden={i >= faces.length ? "true" : undefined}
            tabIndex={i >= faces.length ? -1 : 0}
          >
            <img src={f.src} alt="" draggable={false} className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border border-white/15" />
            <span className="font-avst-mono text-[9px] tracking-[0.1em] uppercase text-avst-paper/70">{f.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

export default function GallerySection() {
  const lead = AVST_GALLERY.slice(0, 5);
  const rest = AVST_GALLERY.slice(5);

  return (
    <section id="gallery" aria-label="Gallery" className="bg-avst-night text-avst-paper py-[clamp(40px,7vw,90px)]">
      <div className="max-w-[1560px] mx-auto px-[clamp(18px,4.2vw,72px)]">
        <div className="flex items-baseline justify-between gap-8 pb-[26px] border-b border-white/15 mb-8">
          <h2 className="font-avst-display font-medium text-[clamp(26px,3.4vw,42px)] tracking-[-0.03em]">Gallery</h2>
          <span className="font-avst-mono text-[10.5px] tracking-[0.16em] uppercase text-white/50">plates from the season</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 px-[clamp(18px,4.2vw,72px)] max-w-[1560px] mx-auto">
        {lead.map((g, i) => (
          <figure key={g.k} className={i === 0 ? "col-span-2 row-span-2" : ""}>
            <img src={g.src} alt={g.t} width={g.w} height={g.h} loading="lazy" decoding="async" className="w-full h-full object-cover" />
            <figcaption className="mt-1.5">
              <b className="block text-[.8rem]">{g.t}</b>
              <span className="block text-[.7rem] text-white/50">{g.c}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      <MarqueeRow dir="left" offset={0} />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 px-[clamp(18px,4.2vw,72px)] max-w-[1560px] mx-auto mt-6">
        {rest.map((g) => (
          <figure key={g.k}>
            <img src={g.src} alt={g.t} width={g.w} height={g.h} loading="lazy" decoding="async" className="w-full h-full object-cover" />
            <figcaption className="mt-1.5">
              <b className="block text-[.8rem]">{g.t}</b>
              <span className="block text-[.7rem] text-white/50">{g.c}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      <MarqueeRow dir="right" offset={2} />

      <div className="max-w-[1560px] mx-auto px-[clamp(18px,4.2vw,72px)] mt-8">
        <p className="text-white/60 text-[.9rem]">Every panel started as an argument about what actually happened.</p>
      </div>
    </section>
  );
}
