"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type MouseEvent } from "react";
import { STUDIO_ROLES } from "@/content/studio";
import { prefersReducedMotion } from "@/lib/studio/sticker";
import { isInView } from "@/lib/studio/stickerFx";

const SWAP_MS = 480;
const WIGGLE_MS = 760;

const CYCLE_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20.5 11.5A8.5 8.5 0 0 0 5.6 6.6L3.5 8.7" />
    <path d="M3.5 4v4.7h4.7" />
    <path d="M3.5 12.5a8.5 8.5 0 0 0 14.9 4.9l2.1-2.1" />
    <path d="M20.5 20v-4.7h-4.7" />
  </svg>
);

export default function StudioHeader() {
  const pathname = usePathname();
  const boxRef = useRef<HTMLSpanElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  // The role line cycles on click: the old line slides up, the new one in, the box resizes,
  // and the matching sticker on the board wiggles.
  useEffect(() => {
    const box = boxRef.current;
    const btn = btnRef.current;
    if (!box || !btn) return;
    let i = 0;
    let spin = 0;
    let busy = false;
    const timers: number[] = [];
    const fit = (el: Element | null) => {
      if (el) box.style.width = (el as HTMLElement).offsetWidth + "px";
    };
    fit(box.firstElementChild);
    document.fonts?.ready.then(() => fit(box.lastElementChild));

    const onClick = () => {
      if (busy) return;
      busy = true;
      i = (i + 1) % STUDIO_ROLES.length;
      spin += 180;
      btn.style.setProperty("--spin", spin + "deg");
      const cur = box.firstElementChild as HTMLElement;
      const nxt = document.createElement("span");
      nxt.textContent = STUDIO_ROLES[i].t;
      nxt.className = "enter";
      box.appendChild(nxt);
      fit(nxt);
      requestAnimationFrame(() => {
        cur.classList.add("leave");
        nxt.classList.remove("enter");
      });
      timers.push(
        window.setTimeout(() => {
          cur.remove();
          busy = false;
        }, prefersReducedMotion() ? 0 : SWAP_MS),
      );
      const key = STUDIO_ROLES[i].k;
      if (key && !prefersReducedMotion()) {
        const el = document.querySelector<HTMLElement>(`.board .stk[data-key="${key}"]`);
        if (el && isInView(el)) {
          el.classList.remove("wiggle");
          void el.offsetWidth;
          el.classList.add("wiggle");
          timers.push(window.setTimeout(() => el.classList.remove("wiggle"), WIGGLE_MS));
        }
      }
    };
    const onResize = () => fit(box.lastElementChild);
    btn.addEventListener("click", onClick);
    window.addEventListener("resize", onResize);
    return () => {
      btn.removeEventListener("click", onClick);
      window.removeEventListener("resize", onResize);
      timers.forEach(clearTimeout);
    };
  }, []);

  const onBrand = (e: MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
    }
  };

  return (
    <header className="bar">
      <Link className="brand" href="/" aria-label="Supranos, all projects" onClick={onBrand}>
        Supranos
      </Link>
      <div className="role">
        <span className="role-box" ref={boxRef} aria-live="polite">
          <span>{STUDIO_ROLES[0].t}</span>
        </span>
        <button className="cycle" type="button" ref={btnRef} aria-label="Show another line">
          {CYCLE_ICON}
        </button>
      </div>
      <Link className="more" href="/about" aria-current={pathname === "/about" ? "page" : undefined}>
        Learn more
      </Link>
    </header>
  );
}
