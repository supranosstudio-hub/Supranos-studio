import Link from "next/link";
import Reveal from "@/components/Reveal";
import MorphText from "@/components/MorphText";
import VentureRow from "@/components/home/VentureRow";
import Clock from "@/components/home/Clock";
import { VENTURES } from "@/lib/ventures";


export default function Home() {
  return (
    <div className="bg-paper text-ink font-display">
      <nav className="sticky top-0 z-100 flex items-center justify-between h-16 px-[clamp(18px,6vw,110px)] bg-paper border-b border-line">
        <a href="#top" data-cursor="top" className="font-display font-bold text-[19px] tracking-tight">
          supranos<span className="text-accent">.</span>
        </a>
        <ul className="flex gap-4 sm:gap-6 md:gap-8 list-none font-mono text-[11px] sm:text-[12.5px]">
          <li><a href="#ventures" className="opacity-75 hover:opacity-100 hover:text-accent transition">ventures</a></li>
          <li><a href="#ethos" className="opacity-75 hover:opacity-100 hover:text-accent transition">ethos</a></li>
          <li><a href="#contact" className="opacity-75 hover:opacity-100 hover:text-accent transition">contact</a></li>
        </ul>
      </nav>

      <main id="top">
        <header className="px-[clamp(18px,6vw,110px)] pt-[clamp(56px,11vw,150px)] pb-[clamp(40px,7vw,96px)]">
          <Reveal>
            <h1 className="font-display font-medium lowercase leading-[1.03] tracking-[-0.022em] max-w-[19ch] text-[clamp(28px,8.5vw,72px)]">
              an independent studio for{" "}
              <span className="font-serif italic font-normal">small obsessions</span>. six things
              designed, built and shipped in{" "}
              <span className="gradient-text">public</span>, from doha.
            </h1>
          </Reveal>
        </header>

        <Reveal>
          <div
            className="relative h-[clamp(180px,40vw,520px)] mx-[clamp(18px,6vw,110px)] my-[clamp(32px,6vw,80px)] overflow-hidden"
            style={{
              background:
                "radial-gradient(120% 140% at 12% 8%, #E6E1D4 0%, rgba(230,225,212,0) 55%), radial-gradient(120% 120% at 88% 92%, #C9CCE8 0%, rgba(201,204,232,0) 55%), linear-gradient(120deg,#EDE9DF,#DCD7CB)",
            }}
            role="img"
            aria-label="Studio visual placeholder"
          >
            <span className="absolute left-4 bottom-3 font-mono text-[11px] tracking-[0.1em] text-muted">
              fig.01 / studio
            </span>
            <svg
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[clamp(50px,9vw,120px)] h-[clamp(50px,9vw,120px)] text-ink opacity-50"
              viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round"
            >
              <circle cx="24" cy="24" r="15" />
              <path d="M24 9v30M9 24h30" />
              <circle cx="24" cy="24" r="5" />
            </svg>
          </div>
        </Reveal>

        <section id="ethos" className="px-[clamp(18px,6vw,110px)] py-[clamp(40px,8vw,120px)]">
          <Reveal><p className="font-mono text-xs tracking-[0.2em] uppercase text-muted mb-6 sm:mb-10">Ethos</p></Reveal>
          <Reveal>
            <p className="font-display font-medium lowercase leading-[1.12] tracking-[-0.015em] max-w-[24ch] mb-8 sm:mb-16 text-[clamp(22px,6vw,42px)]">
              the same appetite behind a bottle wall and an ai sitcom.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              { h: "Design", p: "Systems before screens. Every venture starts as a design problem: the interface, the tokens, the edge cases, resolved before a line of production code is written." },
              { h: "Build", p: "Design that doesn't ship is a mood board. We build to production, in real code, so the idea survives contact with reality." },
              { h: "Publish", p: "We work in the open. Each build is documented as it happens, the missteps included, because the process is half the product." },
            ].map((c) => (
              <Reveal key={c.h}>
                <div>
                  <h3 className="font-serif italic font-normal text-[clamp(22px,5vw,34px)] mb-4 leading-none">{c.h}</h3>
                  <p className="text-[15px] leading-[1.62] max-w-[38ch]">{c.p}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="ventures" className="px-[clamp(18px,6vw,110px)] py-[clamp(40px,8vw,120px)]">
          <Reveal><p className="font-mono text-xs tracking-[0.2em] uppercase text-muted mb-6 sm:mb-10">The index / six ventures</p></Reveal>
          <Reveal>
            <div className="border-t border-ink">
              {VENTURES.map((v) => (
                <VentureRow key={v.n} v={v} />
              ))}
            </div>
          </Reveal>
        </section>

        <section className="px-[clamp(18px,6vw,110px)] py-[clamp(40px,8vw,120px)]">
          <Reveal>
            <h2 className="font-display font-medium lowercase leading-[0.95] tracking-[-0.03em] text-[clamp(30px,8vw,72px)]">
              design, code and curiosity,{" "}
              <span className="font-serif italic font-normal">in service of the idea.</span>
            </h2>
          </Reveal>
        </section>

        <section id="contact" className="px-[clamp(18px,6vw,110px)] py-[clamp(40px,8vw,120px)]">
          <Reveal><p className="font-mono text-xs tracking-[0.2em] uppercase text-muted mb-6">Contact</p></Reveal>
          <Reveal>
            <p className="font-display font-medium lowercase leading-[0.95] tracking-[-0.03em] mb-6 sm:mb-12 text-[clamp(28px,9vw,96px)] max-w-full overflow-hidden">
              <MorphText words={["say hello", "let's talk", "get in touch"]} />
            </p>
          </Reveal>
          <Reveal>
            <a
              href="mailto:hello@supranos.studio"
              data-cursor="write"
              className="font-serif italic text-[clamp(17px,4.2vw,40px)] text-accent inline-flex flex-wrap items-center gap-2 hover:gap-4 transition-all break-words max-w-full"
            >
              hello@supranos.studio &rarr;
            </a>
          </Reveal>
        </section>
      </main>

      <footer className="px-[clamp(18px,6vw,110px)] pt-[clamp(28px,5vw,64px)] pb-[clamp(24px,4vw,44px)] border-t border-ink">
        <div className="flex flex-wrap gap-6 justify-between items-start mb-10 sm:mb-16">
          <div className="flex gap-5 font-mono text-[12.5px]">
            <a href="#" className="opacity-75 hover:opacity-100 hover:text-accent transition">LinkedIn</a>
            <a href="#" className="opacity-75 hover:opacity-100 hover:text-accent transition">Instagram</a>
            <a href="#" className="opacity-75 hover:opacity-100 hover:text-accent transition">Read</a>
          </div>
          <div className="font-mono text-[12.5px] leading-[1.9]">
            <span className="block text-muted uppercase tracking-[0.14em] text-[11px] mb-1.5">Studio</span>
            Doha, Qatar<br />
            <Clock /> local
          </div>
        </div>
        <div className="flex flex-wrap justify-between items-center gap-3 font-mono text-[11px] text-muted tracking-[0.06em]">
          <span>&copy; 2026 supranos</span>
          <span>built in public</span>
        </div>
      </footer>
    </div>
  );
}
