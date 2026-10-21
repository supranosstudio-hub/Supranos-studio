"use client";

import { useState } from "react";
import BookReader from "@/components/avst/BookReader";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { EPISODES } from "@/content/avst";
import { AVST_COVERS } from "@/content/avst-media";

export default function AvstBooksPage() {
  const [readerEp, setReaderEp] = useState<number | null>(null);
  return (
    <main className="px-[clamp(16px,4vw,64px)] py-[clamp(56px,10vw,120px)]">
      <div className="max-w-[1180px] mx-auto">
        <Reveal>
          <div className="font-avst-mono text-[.66rem] tracking-[0.18em] uppercase text-avst-ink-3 mb-5">The Shelf &middot; Season One</div>
        </Reveal>
        <Reveal>
          <h1 className="font-avst-display font-semibold text-[clamp(2rem,5vw,3.2rem)] leading-[1.05] tracking-[-0.02em] mb-6 max-w-[16ch]">
            All thirteen covers, one shelf.
          </h1>
        </Reveal>
        <Reveal>
          <p className="text-avst-ink-2 leading-relaxed max-w-[60ch] mb-12">
            Only the pilot (Episode 1) is open to read right now — the rest of the season is held
            back until it&apos;s ready.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6">
          {EPISODES.map((ep) => {
            const unlocked = ep.n === 1;
            const cover = AVST_COVERS[ep.n];
            return (
              <Reveal key={ep.n} delay={ep.n * 0.02}>
                <div className={unlocked ? "" : "opacity-60"}>
                  {unlocked ? (
                    <button type="button" onClick={() => setReaderEp(ep.n)} data-cursor="read" className="group block w-full text-left">
                      <span className="relative block aspect-[3/4] bg-avst-paper-2 border border-avst-line-hard overflow-hidden">
                        {cover && (
                          <Image
                            src={cover}
                            alt={`Episode ${ep.n} cover`}
                            fill
                            sizes="(max-width: 768px) 30vw, 180px"
                            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                          />
                        )}
                      </span>
                    </button>
                  ) : (
                    <span className="relative flex items-center justify-center aspect-[3/4] bg-avst-paper-3 border border-dashed border-avst-line-hard">
                      <span className="font-avst-mono text-[9px] tracking-[.1em] uppercase text-avst-ink-3 text-center px-2">Coming</span>
                    </span>
                  )}
                  <div className="mt-2">
                    <div className="font-avst-mono text-[10px] tracking-[.1em] uppercase text-avst-ink-2">
                      Ep {String(ep.n).padStart(2, "0")}
                    </div>
                    <div className="font-avst-display text-[13px] leading-snug mt-0.5">{ep.en}</div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <div className="mt-14 flex flex-wrap gap-4 font-avst-mono text-[.7rem] tracking-[0.14em] uppercase">
            <Link href="/avst" className="text-avst-accent">&larr; Back to the pilot</Link>
            <Link href="/" className="text-avst-ink-3">&larr; Back to supranos</Link>
          </div>
        </Reveal>
      </div>
    {readerEp !== null ? <BookReader n={readerEp} onClose={() => setReaderEp(null)} /> : null}
      </main>
  );
}
