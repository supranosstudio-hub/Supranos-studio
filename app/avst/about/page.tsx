import Link from "next/link";
import Reveal from "@/components/Reveal";
import { SHOW } from "@/content/avst";

export default function AvstAboutPage() {
  return (
    <main className="px-[clamp(16px,4vw,64px)] py-[clamp(56px,10vw,120px)]">
      <div className="max-w-[760px] mx-auto">
        <Reveal>
          <div className="font-avst-mono text-[.66rem] tracking-[0.18em] uppercase text-avst-ink-3 mb-5">
            About &middot; {SHOW.title}
          </div>
        </Reveal>
        <Reveal>
          <h1 className="font-avst-display font-semibold text-[clamp(2rem,5vw,3.2rem)] leading-[1.05] tracking-[-0.02em] mb-6">
            {SHOW.titleEn}
          </h1>
        </Reveal>
        <Reveal>
          <p className="text-avst-ink-2 leading-relaxed mb-4">{SHOW.logline}</p>
        </Reveal>
        <Reveal>
          <p className="text-avst-ink-2 leading-relaxed mb-4 italic">&ldquo;{SHOW.thesis}&rdquo;</p>
        </Reveal>
        <Reveal>
          <p className="text-avst-ink-2 leading-relaxed">
            Set over {SHOW.days} days in {SHOW.place}, told across {SHOW.episodes} episodes at{" "}
            {SHOW.format}. The rest of this page — a longer about, credits, and press — is still
            being written.
          </p>
        </Reveal>
        <Reveal>
          <div className="mt-10 flex flex-wrap gap-4 font-avst-mono text-[.7rem] tracking-[0.14em] uppercase">
            <Link href="/avst" className="text-avst-accent">&larr; Back to the pilot</Link>
            <Link href="/" className="text-avst-ink-3">&larr; Back to supranos</Link>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
