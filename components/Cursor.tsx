"use client";

import { useEffect, useRef } from "react";

/**
 * Site-wide custom cursor ring. Desktop / fine-pointer only (CSS hides it on
 * touch devices), purely decorative and non-interactive (pointer-events:none),
 * so it never affects layout or hit-testing on any screen size.
 *
 * Hoverable elements opt in with `data-cursor="label"`.
 */
export default function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!ring || !label || reduce || !fine) return;

    let tx = 0, ty = 0, cx = 0, cy = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const tick = () => {
      cx += (tx - cx) * 0.22;
      cy += (ty - cy) * 0.22;
      ring.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);

    const onEnter = (e: Event) => {
      const t = e.currentTarget as HTMLElement;
      ring.classList.add("big");
      label.textContent = t.getAttribute("data-cursor") || "view";
    };
    const onLeave = () => ring.classList.remove("big");

    const attach = () => {
      const targets = document.querySelectorAll<HTMLElement>("[data-cursor]");
      targets.forEach((t) => {
        t.addEventListener("mouseenter", onEnter);
        t.addEventListener("mouseleave", onLeave);
      });
      return targets;
    };
    let targets = attach();

    // re-scan on navigation between client-routed pages
    const mo = new MutationObserver(() => {
      targets.forEach((t) => {
        t.removeEventListener("mouseenter", onEnter);
        t.removeEventListener("mouseleave", onLeave);
      });
      targets = attach();
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      mo.disconnect();
      targets.forEach((t) => {
        t.removeEventListener("mouseenter", onEnter);
        t.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <div ref={ringRef} className="cursor-ring" aria-hidden="true">
      <span ref={labelRef} className="cursor-label">view</span>
    </div>
  );
}
