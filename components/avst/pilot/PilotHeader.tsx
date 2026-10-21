"use client";

import Link from "next/link";
import { useState } from "react";
import { NAV_LINKS } from "@/content/avst-pilot";

const linkCls = "font-avst-mono text-[11px] uppercase tracking-[0.16em] text-avst-ink-3 transition hover:text-avst-ink";

export default function PilotHeader() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-[1000] border-b border-avst-line bg-avst-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-[60px] max-w-[1320px] items-center justify-between px-[clamp(16px,4vw,64px)]">
        <Link href="#top" className="flex items-baseline gap-2" onClick={close}>
          <b className="font-avst-display text-[1.15rem] font-medium tracking-[0.28em]">AVST</b>
          <span className="font-avst-mono text-[9px] tracking-[0.16em] text-avst-ink-3">S01</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={linkCls}>
              {l.label}
            </Link>
          ))}
          <Link
            href="/avst/books"
            className="rounded-full bg-avst-accent px-4 py-2 font-avst-mono text-[11px] uppercase tracking-[0.16em] text-white transition hover:bg-avst-accent-2"
          >
            The Season
          </Link>
        </nav>

        <button
          type="button"
          aria-label="Menu"
          aria-expanded={open}
          aria-controls="pilot-nav-panel"
          onClick={() => setOpen((o) => !o)}
          className="grid size-10 place-items-center md:hidden"
        >
          <span className="relative block h-3 w-5">
            <i className={`absolute inset-x-0 top-0 h-px bg-avst-ink transition ${open ? "translate-y-[6px] rotate-45" : ""}`} />
            <i className={`absolute inset-x-0 top-[6px] h-px bg-avst-ink transition ${open ? "opacity-0" : ""}`} />
            <i className={`absolute inset-x-0 top-3 h-px bg-avst-ink transition ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      {open && (
        <nav id="pilot-nav-panel" aria-label="Primary" className="flex flex-col gap-1 border-t border-avst-line bg-avst-paper px-[clamp(16px,4vw,64px)] py-3 md:hidden">
          {[...NAV_LINKS, { href: "/avst/books", label: "The Season" }].map((l) => (
            <Link key={l.href} href={l.href} onClick={close} className={`${linkCls} py-3`}>
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
