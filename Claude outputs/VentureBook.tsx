"use client";

import { useState } from "react";
import type { Venture } from "@/lib/ventures";
import VentureRow from "@/components/home/VentureRow";
import Book3D from "@/components/home/Book3D";

interface VentureBookContent {
  venture: Venture;
  pages: Array<{
    title: string;
    location: string;
    imageSrc: string;
  }>;
}

interface VentureBookProps {
  ventures: Venture[];
  ventureBooks: Record<string, VentureBookContent>;
}

/**
 * VentureBook displays ventures as interactive 3D books when clicked.
 * Falls back to VentureRow for ventures without book content.
 *
 * Usage:
 * ```tsx
 * const ventureBooks = {
 *   umedia: {
 *     venture: VENTURES[0],
 *     pages: [
 *       { title: "Project 1", location: "Location", imageSrc: "/path.jpg" },
 *       { title: "Project 2", location: "Location", imageSrc: "/path.jpg" },
 *     ]
 *   }
 * };
 *
 * <VentureBook ventures={VENTURES} ventureBooks={ventureBooks} />
 * ```
 */
export default function VentureBook({
  ventures,
  ventureBooks,
}: VentureBookProps) {
  const [selectedVenture, setSelectedVenture] = useState<string | null>(null);
  const selected = selectedVenture
    ? ventureBooks[selectedVenture]
    : null;

  if (selected) {
    return (
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
        {/* Modal Container */}
        <div className="bg-paper rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
          {/* Close Button */}
          <div className="sticky top-0 z-10 flex justify-end p-4 bg-paper border-b border-line">
            <button
              onClick={() => setSelectedVenture(null)}
              className="p-2 text-muted hover:text-ink transition-colors"
              aria-label="close"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Venture Info */}
          <div className="px-6 sm:px-8 py-4 border-b border-line">
            <div className="flex items-baseline gap-4 mb-3">
              <span className="font-mono text-sm tracking-wide text-muted">
                {selected.venture.n}
              </span>
              <h2 className="font-display font-semibold lowercase text-2xl sm:text-3xl text-ink">
                {selected.venture.name}
              </h2>
              <span className="font-mono text-xs tracking-[0.14em] uppercase text-muted ml-auto">
                {selected.venture.cat}
              </span>
            </div>
            <p className="font-display text-sm sm:text-base text-muted max-w-[50ch]">
              {selected.venture.blurb}
            </p>
          </div>

          {/* 3D Book */}
          <div>
            <Book3D pages={selected.pages} height="400px" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-t border-ink">
      {ventures.map((v) => (
        <button
          key={v.n}
          onClick={() => {
            if (ventureBooks[v.name]) {
              setSelectedVenture(v.name);
            }
          }}
          className="w-full text-left hover:bg-paper/50 transition-colors"
          disabled={!ventureBooks[v.name]}
        >
          <VentureRow v={v} />
        </button>
      ))}
    </div>
  );
}
