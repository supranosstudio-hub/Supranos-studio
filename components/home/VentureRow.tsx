"use client";

import Link from "next/link";
import type { Venture } from "@/lib/ventures";

export default function VentureRow({ v }: { v: Venture }) {
  return (
    <Link
      href={v.href}
      data-cursor={v.cursor}
      className="venture-row group grid grid-cols-[2rem_1fr_1.2rem] sm:grid-cols-[3.4rem_1fr_auto_1.6rem] items-baseline gap-x-3 sm:gap-x-7 gap-y-2 py-5 sm:py-7 border-b border-line [grid-template-areas:'n_name_arw'_'.__cat_cat'] sm:[grid-template-areas:'n_name_cat_arw'] transition-[padding] duration-300 hover:pl-1.5 sm:hover:pl-4"
    >
      <span className="[grid-area:n] font-mono text-[13px] text-muted tracking-wide self-start sm:self-center">
        {v.n}
      </span>
      <span className="[grid-area:name] flex flex-col gap-1.5 min-w-0">
        <span
          className="font-display font-semibold lowercase leading-[0.98] tracking-tight
            text-[clamp(26px,9vw,58px)] transition-colors duration-300 group-hover:text-accent break-words"
        >
          {v.name}
        </span>
        <span className="font-display text-[13px] sm:text-[15px] text-muted max-w-[44ch] leading-snug">
          {v.blurb}
        </span>
      </span>
      <span className="[grid-area:cat] font-mono text-[11px] sm:text-xs tracking-[0.14em] uppercase text-muted whitespace-nowrap self-start sm:self-center justify-self-start">
        {v.cat}
      </span>
      <span className="[grid-area:arw] font-mono text-lg text-muted text-right self-start sm:self-center transition-all duration-300 group-hover:text-accent group-hover:translate-x-2">
        &rarr;
      </span>
    </Link>
  );
}
