"use client";

import { useEffect, useRef, useState } from "react";

interface Book3DProps {
  pages: Array<{
    title: string;
    location: string;
    imageSrc: string;
  }>;
  height?: string;
}

export default function Book3D({ pages, height = "520px" }: Book3DProps) {
  const tiltRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [zoom, setZoom] = useState(100);

  const pageAspectRatio = 1760 / 1240;

  // 3D tilt tracking on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!tiltRef.current) return;

      const rect = tiltRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;

      // Tilt angle based on distance from center (max 8 degrees)
      const maxAngle = 8;
      const ry = (distX / (rect.width / 2)) * maxAngle;
      const rx = (distY / (rect.height / 2)) * maxAngle * -1;

      setTilt({ rx, ry });
    };

    const handleMouseLeave = () => {
      setTilt({ rx: 0, ry: 0 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const goToPage = (index: number) => {
    const newIndex = (index + pages.length) % pages.length;
    setCurrentPage(newIndex);
  };

  const page = pages[currentPage];

  return (
    <div className="w-full bg-paper text-ink">
      {/* Book 3D Container */}
      <div
        className="flex items-center justify-center gap-4 sm:gap-6 md:gap-8 py-8 sm:py-12 px-4"
        style={{ height, perspective: "1750px", perspectiveOrigin: "50% 46%" }}
      >
        {/* Left Arrow */}
        <button
          onClick={() => goToPage(currentPage - 1)}
          className="flex-none inline-flex items-center justify-center px-2 py-3 text-muted hover:text-ink transition-colors z-10 cursor-grab active:cursor-grabbing"
          aria-label="previous page"
        >
          <svg viewBox="0 0 14 44" width="14" height="44" fill="none">
            <polyline
              points="11,3 3,22 11,41"
              stroke="currentColor"
              strokeWidth="1.1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* 3D Book */}
        <div
          ref={tiltRef}
          className="flex-1 min-w-0 max-w-[900px]"
          style={{
            perspective: "1750px",
            perspectiveOrigin: "50% 46%",
          }}
        >
          <div
            ref={bookRef}
            className="relative w-full transition-transform duration-100 ease-out"
            style={{
              aspectRatio: pageAspectRatio,
              transformStyle: "preserve-3d",
              transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(${zoom / 100})`,
              willChange: "transform",
            }}
          >
            {/* Shadow layers */}
            <div
              className="absolute inset-0 pointer-events-none z-0"
              style={{
                left: "5%",
                right: "5%",
                top: "27%",
                bottom: "2%",
                background: `radial-gradient(50% 50% at 50% 58%,
                  rgba(58, 44, 26, 0.34) 0%,
                  rgba(58, 44, 26, 0.19) 40%,
                  rgba(58, 44, 26, 0) 74%)`,
                filter: "blur(26px)",
                opacity: 0.5,
              }}
            />

            {/* Book Content */}
            <div className="absolute inset-0 w-full h-full bg-avst-paper overflow-hidden rounded-sm shadow-lg">
              {page.imageSrc ? (
                <img
                  src={page.imageSrc}
                  alt={page.title}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-avst-paper-2 to-avst-paper-3">
                  <div className="text-center px-8">
                    <h2 className="font-serif italic text-2xl sm:text-3xl mb-2">
                      {page.title}
                    </h2>
                    <p className="text-muted text-sm sm:text-base">{page.location}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Gloss overlay for 3D effect */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
                           radial-gradient(circle at 70% 80%, rgba(255, 255, 255, 0.08) 0%, transparent 50%)`,
              }}
            />
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => goToPage(currentPage + 1)}
          className="flex-none inline-flex items-center justify-center px-2 py-3 text-muted hover:text-ink transition-colors z-10 cursor-grab active:cursor-grabbing"
          aria-label="next page"
        >
          <svg viewBox="0 0 14 44" width="14" height="44" fill="none">
            <polyline
              points="3,3 11,22 3,41"
              stroke="currentColor"
              strokeWidth="1.1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Page Info & Controls */}
      <div className="flex flex-col items-center gap-6 px-4 py-6">
        {/* Page Title & Location */}
        <div className="text-center">
          <p className="font-mono text-xs sm:text-sm tracking-widest uppercase text-muted mb-2">
            {`${currentPage + 1} of ${pages.length}`}
          </p>
          <h3 className="font-serif italic text-lg sm:text-xl font-normal mb-1">
            {page.title}
          </h3>
          <p className="font-mono text-xs sm:text-sm tracking-wide uppercase text-muted">
            {page.location}
          </p>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-full border border-line bg-paper/80 backdrop-blur-sm">
          <button
            onClick={() => setZoom(Math.max(50, zoom - 10))}
            disabled={zoom <= 50}
            className="p-1.5 text-muted hover:text-ink disabled:opacity-30 transition-colors"
            aria-label="zoom out"
          >
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-4 h-4">
              <circle cx="8.6" cy="8.6" r="5.6" />
              <path d="M12.8 12.8 17.4 17.4M6.2 8.6h4.8" />
            </svg>
          </button>

          <span className="font-mono text-xs w-12 text-center text-muted">
            {zoom}%
          </span>

          <button
            onClick={() => setZoom(Math.min(200, zoom + 10))}
            disabled={zoom >= 200}
            className="p-1.5 text-muted hover:text-ink disabled:opacity-30 transition-colors"
            aria-label="zoom in"
          >
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-4 h-4">
              <circle cx="8.6" cy="8.6" r="5.6" />
              <path d="M12.8 12.8 17.4 17.4M6.2 8.6h4.8M8.6 6.2v4.8" />
            </svg>
          </button>
        </div>

        {/* Hint */}
        <p className="font-mono text-[11px] sm:text-xs tracking-widest uppercase text-muted/60">
          Hover over the book to tilt · Use arrows to turn pages
        </p>
      </div>
    </div>
  );
}
