"use client";

import Link from "next/link";
import { useState } from "react";

const LINKS = [
  { href: "/avst", label: "The Pilot" },
  { href: "/avst/process", label: "How We Built It" },
  { href: "/avst/about", label: "About" },
  { href: "/avst/books", label: "The Shelf" },
];

export default function AvstNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-100 bg-avst-paper/90 backdrop-blur-md border-b border-avst-line">
      <nav className="max-w-[1180px] mx-auto flex items-center gap-4 px-[clamp(16px,4vw,64px)] h-[60px]">
        <Link
          href="/"
          data-cursor="home"
          className="font-avst-mono text-[11px] tracking-[0.16em] uppercase text-avst-ink-3 hover:text-avst-ink transition flex items-center gap-2"
        >
          <i className="block w-[22px] h-px bg-current" aria-hidden="true" />
          Supranos
        </Link>
        <span className="ml-auto font-avst-display font-semibold text-[1.05rem]">AVST</span>
        <ul className="hidden md:flex gap-5">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="font-avst-mono text-[11px] tracking-[0.14em] uppercase text-avst-ink-3 hover:text-avst-accent transition"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <button
          className="md:hidden font-avst-mono text-[11px] tracking-[0.14em] uppercase text-avst-ink-3 border border-avst-line-hard rounded px-3 py-1.5"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="avst-mobile-menu"
        >
          Menu
        </button>
      </nav>
      {open && (
        <ul id="avst-mobile-menu" className="md:hidden flex flex-col border-t border-avst-line px-[clamp(16px,4vw,64px)] py-3 gap-3 bg-avst-paper">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="block font-avst-mono text-[12px] tracking-[0.14em] uppercase text-avst-ink-2 py-1"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
