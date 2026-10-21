/**
 * Example: How to integrate Book3D component into your Supranos home page
 *
 * This shows how to replace the ventures section with clickable 3D books.
 * Copy and paste the relevant parts into your existing app/page.tsx
 */

import Link from "next/link";
import Reveal from "@/components/Reveal";
import MorphText from "@/components/MorphText";
import VentureRow from "@/components/home/VentureRow";
import VentureBook from "@/components/home/VentureBook";
import Clock from "@/components/home/Clock";
import { VENTURES } from "@/lib/ventures";

// ============================================================================
// OPTION 1: Simple Book for AVST Section (Replace the gradient placeholder)
// ============================================================================

import Book3D from "@/components/home/Book3D";

const avstBookPages = [
  {
    title: "AVST Episode 1",
    location: "Hyderabad, Telangana",
    imageSrc: "/images/avst-episode-01.jpg", // Replace with actual image path
  },
  {
    title: "AVST Episode 2",
    location: "Hyderabad, Telangana",
    imageSrc: "/images/avst-episode-02.jpg",
  },
  {
    title: "AVST Episode 3",
    location: "Hyderabad, Telangana",
    imageSrc: "/images/avst-episode-03.jpg",
  },
  {
    title: "AVST Set Design",
    location: "Studio Production",
    imageSrc: "/images/avst-set.jpg",
  },
];

// ============================================================================
// OPTION 2: Interactive Venture Books (Click venture → Open 3D book modal)
// ============================================================================

interface VentureBookContent {
  venture: typeof VENTURES[0];
  pages: Array<{
    title: string;
    location: string;
    imageSrc: string;
  }>;
}

const ventureBooks: Record<string, VentureBookContent> = {
  umedia: {
    venture: VENTURES[0],
    pages: [
      {
        title: "UMedia Visual 1",
        location: "Studio, Doha",
        imageSrc: "/images/umedia-01.jpg",
      },
      {
        title: "UMedia Visual 2",
        location: "Production",
        imageSrc: "/images/umedia-02.jpg",
      },
      {
        title: "UMedia Visual 3",
        location: "Digital Assets",
        imageSrc: "/images/umedia-03.jpg",
      },
    ],
  },
  avst: {
    venture: VENTURES[2],
    pages: [
      {
        title: "AVST Episode 1",
        location: "Hyderabad, Telangana",
        imageSrc: "/images/avst-ep-01.jpg",
      },
      {
        title: "AVST Episode 2",
        location: "Hyderabad, Telangana",
        imageSrc: "/images/avst-ep-02.jpg",
      },
      {
        title: "AVST Character Design",
        location: "Production",
        imageSrc: "/images/avst-design.jpg",
      },
    ],
  },
  // Add more ventures as needed:
  // blurr: { venture: VENTURES[3], pages: [...] },
  // rituuuals: { venture: VENTURES[4], pages: [...] },
};

// ============================================================================
// PAGE COMPONENT
// ============================================================================

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

        {/* ====================================================================
            OPTION 1: Simple Book for a section (e.g., AVST showcase)
            ==================================================================== */}
        <section className="px-[clamp(18px,6vw,110px)] py-[clamp(40px,8vw,120px)]">
          <Reveal><p className="font-mono text-xs tracking-[0.2em] uppercase text-muted mb-6 sm:mb-10">AVST Series</p></Reveal>
          <Reveal>
            <p className="font-display font-medium lowercase leading-[1.12] tracking-[-0.015em] max-w-[24ch] mb-8 sm:mb-16 text-[clamp(22px,6vw,42px)]">
              browse the episodes
            </p>
          </Reveal>
          <Book3D pages={avstBookPages} height="520px" />
        </section>

        {/* ====================================================================
            OPTION 2: Interactive ventures with 3D books (click → modal)
            ==================================================================== */}
        <section id="ventures" className="px-[clamp(18px,6vw,110px)] py-[clamp(40px,8vw,120px)]">
          <Reveal><p className="font-mono text-xs tracking-[0.2em] uppercase text-muted mb-6 sm:mb-10">The index / six ventures</p></Reveal>
          <Reveal>
            <VentureBook ventures={VENTURES} ventureBooks={ventureBooks} />
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
              hello@supranos.studio
              <span className="text-xl">→</span>
            </a>
          </Reveal>
        </section>
      </main>
    </div>
  );
}
