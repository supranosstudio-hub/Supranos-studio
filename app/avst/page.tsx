import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import {
  SHOW, MOVEMENTS, EPISODES, CAST, PLACES, RULES, INFLUENCES,
} from "@/content/avst";
import { AVST_COVERS } from "@/content/avst-media";

export default function AvstPage() {
  const pilot = EPISODES[0];

  return (
    <main>
      {/* hero */}
      <section className="px-[clamp(16px,4vw,64px)] pt-[clamp(48px,9vw,120px)] pb-[clamp(28px,5vw,60px)]">
        <div className="max-w-[1180px] mx-auto">
          <Reveal>
            <div className="font-avst-mono text-[10px] sm:text-[.66rem] tracking-[0.18em] uppercase text-avst-ink-3 mb-5">
              {SHOW.season} · {SHOW.title}
            </div>
          </Reveal>
          <Reveal>
            <h1 className="font-avst-display font-semibold leading-[0.98] tracking-[-0.025em] max-w-[16ch] text-[clamp(2rem,9vw,5rem)] mb-6">
              {SHOW.titleEn}
            </h1>
          </Reveal>
          <Reveal>
            <p className="text-[clamp(1rem,3vw,1.35rem)] leading-[1.55] max-w-[60ch] text-avst-ink-2">
              {SHOW.logline}{" "}
              <span className="italic text-avst-ink">
                {SHOW.days} days, {SHOW.episodes} episodes, {SHOW.format}.
              </span>
            </p>
          </Reveal>
          <Reveal>
            <div className="flex flex-wrap gap-3 sm:gap-4 mt-8">
              <span className="border border-avst-line-hard px-3.5 py-3 font-avst-mono text-[10px] sm:text-[.66rem] tracking-[0.14em] uppercase text-avst-ink-2">
                Goal 01 &middot; <b className="text-avst-accent">Direct a sitcom</b>
              </span>
              <span className="border border-avst-line-hard px-3.5 py-3 font-avst-mono text-[10px] sm:text-[.66rem] tracking-[0.14em] uppercase text-avst-ink-2">
                Goal 02 &middot; <b className="text-avst-accent">Draw like a comic artist</b>
              </span>
              <span className="border border-avst-line-hard px-3.5 py-3 font-avst-mono text-[10px] sm:text-[.66rem] tracking-[0.14em] uppercase text-avst-ink-2">
                Goal 03 &middot; <b className="text-avst-accent">Publish a book</b>
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* the pilot */}
      <section className="px-[clamp(16px,4vw,64px)] py-[clamp(32px,6vw,72px)] border-t border-avst-line">
        <div className="max-w-[1180px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-8 lg:gap-16 items-start">
          <Reveal>
            <div className="relative w-full max-w-[360px] mx-auto lg:mx-0 aspect-[3/4] bg-avst-paper-2 border border-avst-line-hard">
              <Image
                src={AVST_COVERS[1]}
                alt={`Cover — Episode 1, ${pilot.en}`}
                fill
                sizes="(max-width: 1024px) 80vw, 360px"
                className="object-contain"
              />
            </div>
          </Reveal>
          <Reveal>
            <div className="font-avst-mono text-[.7rem] tracking-[0.2em] text-avst-accent mb-3">Episode 01 &middot; The Pilot</div>
            <h2 className="font-avst-display font-semibold text-[clamp(1.5rem,4vw,2.4rem)] leading-tight tracking-tight mb-2">
              {pilot.en} <em className="italic font-normal text-avst-ink-3">({pilot.te})</em>
            </h2>
            <p className="text-avst-ink-2 leading-relaxed mb-6 max-w-[60ch]">{pilot.logline}</p>
            <div className="flex flex-wrap gap-3">
              <a
                href="/legacy/avst-pilot-original.html"
                data-cursor="read"
                className="inline-flex items-center gap-2 bg-avst-ink text-avst-lime px-5 py-3 font-avst-mono text-[.68rem] tracking-[0.14em] uppercase hover:bg-avst-accent transition-colors"
              >
                Read the pilot &rarr;
              </a>
              <Link
                href="/avst/process"
                data-cursor="open"
                className="inline-flex items-center gap-2 border border-avst-line-hard px-5 py-3 font-avst-mono text-[.68rem] tracking-[0.14em] uppercase text-avst-ink-2 hover:border-avst-accent hover:text-avst-accent transition-colors"
              >
                How we built it &rarr;
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* season shelf */}
      <section className="px-[clamp(16px,4vw,64px)] py-[clamp(32px,6vw,72px)] border-t border-avst-line bg-avst-paper-2">
        <div className="max-w-[1180px] mx-auto">
          <Reveal>
            <div className="font-avst-mono text-[.66rem] tracking-[0.18em] uppercase text-avst-ink-3 mb-3">The shelf</div>
            <h2 className="font-avst-display font-semibold text-[clamp(1.6rem,3.4vw,2.4rem)] mb-8">
              Season one, <em className="italic font-normal text-avst-ink-3">thirteen episodes</em>
            </h2>
          </Reveal>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-3 sm:gap-4">
            {EPISODES.map((ep) => {
              const unlocked = ep.n === 1;
              const cover = AVST_COVERS[ep.n];
              return (
                <Reveal key={ep.n} delay={ep.n * 0.02}>
                  {unlocked ? (
                    <a
                      href="/legacy/avst-pilot-original.html"
                      data-cursor="read"
                      className="group block"
                    >
                      <span className="relative block aspect-[3/4] bg-avst-paper border border-avst-line-hard overflow-hidden">
                        {cover && (
                          <Image
                            src={cover}
                            alt={`Episode ${ep.n} cover`}
                            fill
                            sizes="140px"
                            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                          />
                        )}
                      </span>
                      <span className="block mt-2 font-avst-mono text-[10px] tracking-[.1em] uppercase text-avst-ink-2">
                        Ep {String(ep.n).padStart(2, "0")}
                      </span>
                    </a>
                  ) : (
                    <div className="block opacity-60">
                      <span className="relative flex items-center justify-center aspect-[3/4] bg-avst-paper-3 border border-dashed border-avst-line-hard">
                        <span className="font-avst-mono text-[9px] tracking-[.1em] uppercase text-avst-ink-3 text-center px-2">
                          Coming
                        </span>
                      </span>
                      <span className="block mt-2 font-avst-mono text-[10px] tracking-[.1em] uppercase text-avst-ink-3">
                        Ep {String(ep.n).padStart(2, "0")}
                      </span>
                    </div>
                  )}
                </Reveal>
              );
            })}
          </div>
          <Reveal>
            <p className="mt-8 text-avst-ink-2 max-w-[60ch]">
              Only the pilot ships for now — the rest of the season is held back.{" "}
              <Link href="/avst/books" className="text-avst-accent underline underline-offset-2">
                See what&apos;s planned for the shelf &rarr;
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      {/* cast */}
      <section id="cast" className="px-[clamp(16px,4vw,64px)] py-[clamp(32px,6vw,72px)] border-t border-avst-line">
        <div className="max-w-[1180px] mx-auto">
          <Reveal>
            <div className="font-avst-mono text-[.66rem] tracking-[0.18em] uppercase text-avst-ink-3 mb-3">The cast</div>
            <h2 className="font-avst-display font-semibold text-[clamp(1.6rem,3.4vw,2.4rem)] mb-8">
              Five people, <em className="italic font-normal text-avst-ink-3">forty days</em>
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {CAST.map((c) => (
              <Reveal key={c.id}>
                <div className="border border-avst-line-hard bg-avst-paper">
                  <div className="relative aspect-square bg-avst-paper-2">
                    <Image src={c.img} alt={c.name} fill sizes="(max-width: 640px) 45vw, 200px" className="object-contain" />
                  </div>
                  <div className="p-3 sm:p-4">
                    <div className="font-avst-display font-semibold text-[15px] sm:text-[17px] leading-tight" style={{ color: c.accent }}>
                      {c.short}
                    </div>
                    <div className="font-avst-mono text-[9px] sm:text-[10px] uppercase tracking-[.08em] text-avst-ink-3 mt-1">
                      {c.mbti} &middot; {c.role}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* places */}
      <section id="places" className="px-[clamp(16px,4vw,64px)] py-[clamp(32px,6vw,72px)] border-t border-avst-line bg-avst-paper-2">
        <div className="max-w-[1180px] mx-auto">
          <Reveal>
            <div className="font-avst-mono text-[.66rem] tracking-[0.18em] uppercase text-avst-ink-3 mb-3">The world</div>
            <h2 className="font-avst-display font-semibold text-[clamp(1.6rem,3.4vw,2.4rem)] mb-8">
              Two houses, <em className="italic font-normal text-avst-ink-3">one balcony crossing</em>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {PLACES.map((p) => (
              <Reveal key={p.id}>
                <div>
                  <div className="relative aspect-[4/3] bg-avst-paper border border-avst-line-hard mb-3">
                    <Image src={p.img} alt={p.name} fill sizes="(max-width: 640px) 90vw, 25vw" className="object-cover" />
                  </div>
                  <h3 className="font-avst-display font-semibold text-[15px]">{p.name}</h3>
                  <p className="text-avst-ink-2 text-sm leading-snug mt-1">{p.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DNA / rules */}
      <section id="dna" className="px-[clamp(16px,4vw,64px)] py-[clamp(32px,6vw,72px)] border-t border-avst-line">
        <div className="max-w-[1180px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <Reveal>
            <div>
              <div className="font-avst-mono text-[.66rem] tracking-[0.18em] uppercase text-avst-ink-3 mb-3">The rules</div>
              <h2 className="font-avst-display font-semibold text-[clamp(1.4rem,3vw,2rem)] mb-6">
                How every episode <em className="italic font-normal text-avst-ink-3">is built</em>
              </h2>
              <dl className="space-y-4">
                {RULES.map((r) => (
                  <div key={r.k} className="border-l-2 border-avst-accent pl-4">
                    <dt className="font-avst-display font-semibold text-[15px]">{r.k}</dt>
                    <dd className="text-avst-ink-2 text-sm leading-snug mt-1">{r.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
          <Reveal>
            <div>
              <div className="font-avst-mono text-[.66rem] tracking-[0.18em] uppercase text-avst-ink-3 mb-3">The look</div>
              <h2 className="font-avst-display font-semibold text-[clamp(1.4rem,3vw,2rem)] mb-6">
                The art <em className="italic font-normal text-avst-ink-3">direction</em>
              </h2>
              <p className="text-avst-ink-2 leading-relaxed mb-4">{SHOW.style}</p>
              <p className="font-avst-mono text-[.72rem] text-avst-ink-3 mb-6">Style reference: {SHOW.styleRef}</p>
              <div className="font-avst-mono text-[.66rem] tracking-[0.18em] uppercase text-avst-ink-3 mb-2">Influences</div>
              <div className="flex flex-wrap gap-2">
                {INFLUENCES.map((i) => (
                  <span key={i} className="border border-avst-line-hard px-2.5 py-1.5 text-xs font-avst-mono text-avst-ink-2">
                    {i}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* movements */}
      <section className="px-[clamp(16px,4vw,64px)] py-[clamp(32px,6vw,72px)] border-t border-avst-line bg-avst-night text-avst-lime">
        <div className="max-w-[1180px] mx-auto">
          <Reveal>
            <div className="font-avst-mono text-[.66rem] tracking-[0.18em] uppercase text-avst-lime-2 mb-6">The shape of the season</div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {MOVEMENTS.map((m) => (
              <Reveal key={m.id}>
                <div>
                  <div className="font-avst-mono text-avst-accent-soft text-sm mb-2">{m.n}</div>
                  <h3 className="font-avst-display font-semibold text-xl mb-2">{m.name}</h3>
                  <p className="text-avst-lime-2 text-sm leading-relaxed">{m.note}</p>
                  <p className="font-avst-mono text-[10px] text-avst-lime-2 mt-3 tracking-wide">
                    Episodes {m.eps.join(", ")}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <footer className="px-[clamp(16px,4vw,64px)] py-8 border-t border-avst-line">
        <div className="max-w-[1180px] mx-auto flex flex-wrap justify-between gap-4 items-baseline font-avst-mono text-[10px] text-avst-ink-3 tracking-wide">
          <span>Supranos &middot; {SHOW.title}</span>
          <Link href="/" className="hover:text-avst-accent transition">Back to supranos &rarr;</Link>
        </div>
      </footer>
    </main>
  );
}
