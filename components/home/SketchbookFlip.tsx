"use client";

import { useEffect, useRef } from "react";

interface SketchbookPage {
  title: string;
  place: string;
  file: string;
  url?: string;
}

interface SketchbookFlipProps {
  pages: SketchbookPage[];
  basePath?: string;
  /** width / height of the page box. AVST portraits are ~0.36. */
  ratio?: number;
}

/**
 * Single-page curl port of Meng To's sketchbook turn.
 * Each page is one portrait sheet. Turning "next" curls the current page
 * from the left spine, revealing the next page beneath; "prev" swings the
 * previous page back in. The leaf is a chain of N nested strips whose
 * tangent sweeps an arc, so the paper bends instead of pivoting flat.
 */
export default function SketchbookFlip({ pages, basePath = "/images", ratio = 0.36 }: SketchbookFlipProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const PAGES = pages.map((p) => ({ ...p, url: p.url || `${basePath}/${p.file}` }));
    const M = PAGES.length;
    if (!M) return;

    const q = <T extends HTMLElement>(sel: string) => root.querySelector(sel) as T;
    const stage = q<HTMLDivElement>(".sb-stage");
    const sb3d = q<HTMLDivElement>(".sb-3d");
    const book = q<HTMLDivElement>(".sb-book");
    const capBox = q<HTMLDivElement>(".sb-captions");
    const hint = q<HTMLParagraphElement>(".sb-hint");
    const leftBtn = q<HTMLButtonElement>(".sb-arrow.left");
    const rightBtn = q<HTMLButtonElement>(".sb-arrow.right");
    const zInBtn = q<HTMLButtonElement>(".sb-zin");
    const zOutBtn = q<HTMLButtonElement>(".sb-zout");
    const zRead = q<HTMLSpanElement>(".sb-zread");
    const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const N = 18;
    const BETA = 0.6;
    let idx = 0;
    let turn: { dir: "next" | "prev"; from: number; to: number; t: number } | null = null;
    let strips: HTMLElement[] = [];

    const el = (t: string, c?: string) => {
      const e = document.createElement(t);
      if (c) e.className = c;
      return e;
    };

    // The turning leaf: N nested strips, front shows the page, back is paper.
    const buildCurl = (dir: "next" | "prev", from: number, to: number) => {
      strips = [];
      const c = el("div", "curl " + dir);
      c.style.setProperty("--n", String(N));
      const leafPage = dir === "next" ? from : to; // the sheet that physically turns
      let host: HTMLElement = c;
      for (let i = 0; i < N; i++) {
        const s = el("div", "strip");
        const f = el("div", "face front");
        f.style.backgroundImage = `url(${PAGES[leafPage].url})`;
        f.style.backgroundPositionX = `calc(-1 * ${i} * var(--bw) / ${N})`;
        const b = el("div", "face back");
        f.appendChild(el("div", "sh"));
        f.appendChild(el("div", "gl"));
        s.appendChild(f);
        s.appendChild(b);
        if (i === N - 1) s.classList.add("edge");
        host.appendChild(s);
        host = s;
        strips.push(s);
      }
      return c;
    };

    const applyTurn = (t: number) => {
      const beta = BETA * Math.sin(Math.PI * t);
      const D = 180 / Math.PI;
      const ttRad = Math.PI * t + beta;
      const tdRad = (2 * beta) / N;
      sb3d.style.setProperty("--tt", (ttRad * D).toFixed(2) + "deg");
      sb3d.style.setProperty("--td", (tdRad * D).toFixed(3) + "deg");
      sb3d.style.setProperty("--shade", Math.sin(Math.PI * t).toFixed(3));
      fadeCaption(t);
      for (let i = 0; i < strips.length; i++) {
        const l1 = Math.abs(Math.cos(ttRad - i * tdRad));
        const l2 = Math.abs(Math.cos(ttRad - (i + 1) * tdRad));
        const st = strips[i].style;
        st.setProperty("--lit", l1.toFixed(3));
        st.setProperty("--a1", ((1 - l1) * 0.62).toFixed(3));
        st.setProperty("--a2", ((1 - l2) * 0.62).toFixed(3));
      }
    };

    const fullEl = (i: number) => {
      const f = el("div", "sb-full");
      const im = new Image();
      im.src = PAGES[i].url;
      im.alt = PAGES[i].title;
      im.draggable = false;
      f.appendChild(im);
      return f;
    };

    const paint = () => {
      book.textContent = "";
      if (!turn) {
        book.appendChild(fullEl(idx));
        sb3d.style.setProperty("--shade", "0");
      } else {
        // base = the page revealed underneath the turning leaf
        const baseIdx = turn.dir === "next" ? turn.to : turn.from;
        book.appendChild(fullEl(baseIdx));
        book.appendChild(buildCurl(turn.dir, turn.from, turn.to));
        applyTurn(turn.t);
      }
      const a = el("button", "sb-zone sb-prev"),
        b = el("button", "sb-zone sb-next");
      a.setAttribute("aria-label", "previous page");
      b.setAttribute("aria-label", "next page");
      book.appendChild(a);
      book.appendChild(b);
      layout();
      caption();
    };

    let capOut: HTMLElement | null = null,
      capIn: HTMLElement | null = null;
    const caption = () => {
      capBox.textContent = "";
      capOut = capIn = null;
      if (turn) {
        capOut = el("p", "sb-caption live");
        capOut.textContent = PAGES[turn.from].title;
        capBox.appendChild(capOut);
        capIn = el("p", "sb-caption live");
        capIn.textContent = PAGES[turn.to].title;
        capBox.appendChild(capIn);
        fadeCaption(turn.t);
      } else {
        const p = el("p", "sb-caption");
        p.textContent = PAGES[idx].title;
        capBox.appendChild(p);
        const sub = el("p", "sb-place");
        sub.textContent = PAGES[idx].place;
        capBox.appendChild(sub);
      }
    };
    const fadeCaption = (t: number) => {
      if (!capOut || !capIn) return;
      const out = 1 - Math.max(0, Math.min(1, (t - 0.1) / 0.28));
      const inn = Math.max(0, Math.min(1, (t - 0.56) / 0.3));
      capOut.style.opacity = out.toFixed(3);
      capIn.style.opacity = inn.toFixed(3);
    };
    const layout = () => {
      sb3d.style.setProperty("--bw", book.clientWidth + "px");
    };

    /* spring loop */
    type Spring = { v: number; target: number; done?: () => void; k: number; c: number };
    let spring: Spring | null = null;
    let raf: number | null = null,
      last = 0;
    const animateTo = (target: number, onDone?: () => void, stiff?: number, damp?: number) => {
      spring = { v: 0, target, done: onDone, k: stiff || 170, c: damp || 26 };
      kick();
    };
    const tick = (now: number) => {
      raf = null;
      const dt = Math.min(0.032, (now - last) / 1000 || 0.016);
      last = now;
      if (spring && turn) {
        const s = spring;
        const x = turn.t - s.target;
        s.v += (-s.k * x - s.c * s.v) * dt;
        turn.t += s.v * dt;
        if (Math.abs(turn.t - s.target) < 0.002 && Math.abs(s.v) < 0.02) {
          turn.t = s.target;
          spring = null;
          applyTurn(turn.t);
          s.done && s.done();
        } else applyTurn(turn.t);
      }
      const moved = viewSpring();
      if ((spring || moved) && raf === null) raf = requestAnimationFrame(tick);
    };
    const kick = () => {
      if (raf === null) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };

    /* tilt + zoom */
    const TILT_X = 4.5,
      TILT_Y = 7,
      ZOOM_MIN = 0.9,
      ZOOM_MAX = 1.5;
    const view = { rx: 0, ry: 0, z: 1, trx: 0, try_: 0, tz: 1 };
    const applyView = () => {
      sb3d.style.setProperty("--rx", view.rx.toFixed(2) + "deg");
      sb3d.style.setProperty("--ry", view.ry.toFixed(2) + "deg");
      sb3d.style.setProperty("--zoom", view.z.toFixed(3));
    };
    const viewSpring = () => {
      const e = 0.14;
      let moved = false;
      const pairs: [keyof typeof view, keyof typeof view][] = [
        ["rx", "trx"],
        ["ry", "try_"],
        ["z", "tz"],
      ];
      for (const [k, t] of pairs) {
        const d = (view[t] as number) - (view[k] as number);
        if (Math.abs(d) > 0.0006) {
          (view[k] as number) += d * e;
          moved = true;
        } else (view[k] as number) = view[t] as number;
      }
      if (moved) applyView();
      return moved;
    };
    const setView = (rx: number, ry: number, z: number) => {
      view.trx = Math.max(-TILT_X, Math.min(TILT_X, rx));
      view.try_ = Math.max(-TILT_Y, Math.min(TILT_Y, ry));
      view.tz = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, z));
      kick();
      syncZoom();
    };
    const tiltTo = (cx: number, cy: number) => {
      if (drag) return;
      const r = book.getBoundingClientRect();
      if (!r.width) return;
      const nx = Math.max(-1, Math.min(1, (cx - (r.left + r.width / 2)) / (r.width * 1.4)));
      const ny = Math.max(-1, Math.min(1, (cy - (r.top + r.height / 2)) / (r.height * 0.9)));
      setView(-ny * TILT_X, nx * TILT_Y, view.tz);
    };

    /* pointer / turn control */
    let drag: { dir: "next" | "prev"; x0: number; w: number; moved: number; vel: number; tPrev: number } | null = null;
    const hideHint = () => hint && hint.classList.add("gone");
    const startTurn = (dir: "next" | "prev", t: number) => {
      spring = null;
      if (turn) {
        idx = turn.to;
        turn = null;
      }
      const from = idx;
      turn = { dir, from, to: dir === "next" ? (from + 1) % M : (from - 1 + M) % M, t: t || 0 };
      paint();
    };
    const commit = () => {
      if (!turn) return;
      if (REDUCED) {
        idx = turn.to;
        turn = null;
        paint();
        return;
      }
      const tref = turn;
      animateTo(1, () => {
        idx = tref.to;
        turn = null;
        paint();
      });
    };
    const cancel = () => {
      if (!turn) return;
      animateTo(0, () => {
        turn = null;
        paint();
      });
    };
    const step = (dir: "next" | "prev") => {
      if (turn) {
        idx = turn.to;
        turn = null;
      }
      startTurn(dir, 0);
      commit();
    };

    const onPointerMoveWin = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      tiltTo(e.clientX, e.clientY);
    };
    const onPointerOut = (e: PointerEvent) => {
      if (!e.relatedTarget) setView(0, 0, view.tz);
    };
    const onBlur = () => setView(0, 0, view.tz);
    const onStageDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      e.preventDefault();
      const onBook = (e.target as HTMLElement).closest(".sb-zone");
      stage.setPointerCapture(e.pointerId);
      hideHint();
      if (!onBook) return;
      const r = book.getBoundingClientRect();
      const dir = (e.clientX - r.left) / r.width > 0.5 ? "next" : "prev";
      startTurn(dir, 0);
      drag = { dir, x0: e.clientX, w: r.width, moved: 0, vel: 0, tPrev: performance.now() };
    };
    const onStageMove = (e: PointerEvent) => {
      if (!drag) return;
      const dx = e.clientX - drag.x0;
      drag.moved = Math.max(drag.moved, Math.abs(dx));
      const raw = (drag.dir === "next" ? -dx : dx) / (drag.w * 0.9);
      const t = Math.max(0, Math.min(1, raw));
      const now = performance.now();
      drag.vel = (t - (turn ? turn.t : 0)) / Math.max(0.001, (now - drag.tPrev) / 1000);
      drag.tPrev = now;
      if (turn) {
        turn.t = t;
        applyTurn(t);
      }
    };
    const endDrag = () => {
      if (!drag) return;
      const d = drag;
      drag = null;
      if (!turn) return;
      if (d.moved < 6) {
        commit();
        return;
      }
      const go = turn.t > 0.42 || d.vel > 1.1;
      if (go) commit();
      else cancel();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      e.preventDefault();
      hideHint();
      step(e.key === "ArrowRight" ? "next" : "prev");
    };
    const onResize = () => layout();
    const syncZoom = () => {
      if (zRead) zRead.textContent = Math.round(view.tz * 100) + "%";
      if (zOutBtn) zOutBtn.disabled = view.tz <= ZOOM_MIN + 0.001;
      if (zInBtn) zInBtn.disabled = view.tz >= ZOOM_MAX - 0.001;
    };
    const onLeft = () => {
      hideHint();
      step("prev");
    };
    const onRight = () => {
      hideHint();
      step("next");
    };
    const onZin = () => {
      setView(view.trx, view.try_, view.tz * 1.16);
      hideHint();
    };
    const onZout = () => {
      setView(view.trx, view.try_, view.tz / 1.16);
      hideHint();
    };
    const onDblClick = () => setView(view.trx, view.try_, 1);
    const preventDefault = (e: Event) => e.preventDefault();

    window.addEventListener("pointermove", onPointerMoveWin, { passive: true });
    window.addEventListener("pointerout", onPointerOut);
    window.addEventListener("blur", onBlur);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    stage.addEventListener("pointerdown", onStageDown);
    stage.addEventListener("pointermove", onStageMove);
    stage.addEventListener("pointerup", endDrag);
    stage.addEventListener("pointercancel", endDrag);
    stage.addEventListener("dragstart", preventDefault);
    stage.addEventListener("selectstart", preventDefault);
    stage.addEventListener("dblclick", onDblClick);
    leftBtn && leftBtn.addEventListener("click", onLeft);
    rightBtn && rightBtn.addEventListener("click", onRight);
    zInBtn && zInBtn.addEventListener("click", onZin);
    zOutBtn && zOutBtn.addEventListener("click", onZout);

    idx = 0;
    paint();
    applyView();
    syncZoom();
    Promise.all(
      PAGES.map((p) => {
        const im = new Image();
        im.src = p.url;
        return im.decode ? im.decode().catch(() => {}) : Promise.resolve();
      })
    ).then(() => layout());

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMoveWin);
      window.removeEventListener("pointerout", onPointerOut);
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      stage.removeEventListener("pointerdown", onStageDown);
      stage.removeEventListener("pointermove", onStageMove);
      stage.removeEventListener("pointerup", endDrag);
      stage.removeEventListener("pointercancel", endDrag);
      stage.removeEventListener("dragstart", preventDefault);
      stage.removeEventListener("selectstart", preventDefault);
      stage.removeEventListener("dblclick", onDblClick);
      leftBtn && leftBtn.removeEventListener("click", onLeft);
      rightBtn && rightBtn.removeEventListener("click", onRight);
      zInBtn && zInBtn.removeEventListener("click", onZin);
      zOutBtn && zOutBtn.removeEventListener("click", onZout);
    };
  }, [pages, basePath, ratio]);

  return (
    <div ref={rootRef} className="sbf" style={{ ["--par" as string]: String(ratio) }}>
      <style>{`
        .sbf{ --paper:#ece7dc; --ink:#2b2721; --ink-soft:rgba(43,39,33,.58); --ink-faint:rgba(43,39,33,.36); --par:0.36;
          width:100%; display:grid; justify-items:center; gap:20px; background:var(--paper); color:var(--ink); padding:24px 0; }
        .sbf .sb-stage{ display:flex; align-items:center; justify-content:center; gap:clamp(10px,3vw,28px); width:100%; position:relative; touch-action:pan-y; padding-inline:clamp(12px,4vw,48px); }
        .sbf .sb-arrow{ flex:none; display:inline-flex; align-items:center; justify-content:center; padding:6px 2px; border:0; background:transparent; color:var(--ink-faint); cursor:pointer; transition:color .2s; z-index:8; }
        .sbf .sb-arrow:hover{ color:var(--ink); }

        .sbf .sb-3d{ --rx:0deg; --ry:0deg; --zoom:1; --tt:0deg; --td:0deg; --shade:0; --bw:0px;
          position:relative; display:flex; justify-content:center; flex:1 1; min-width:0; max-width:820px; perspective:1600px; perspective-origin:50% 46%; }
        .sbf .sb-tilt{ position:relative; transform-style:preserve-3d;
          transform:rotateX(var(--rx)) rotateY(var(--ry)) scale(var(--zoom)); will-change:transform; }
        .sbf .sb-book{ position:relative; height:min(72vh,560px); width:calc(min(72vh,560px) * var(--par)); transform-style:preserve-3d; z-index:1;
          background:var(--paper); border-radius:2px; box-shadow:0 22px 50px rgba(58,44,26,.22); }

        .sbf .sb-cast{ position:absolute; pointer-events:none; z-index:0; }
        .sbf .sb-cast.ambient{ left:-14%; right:-14%; top:20%; bottom:-4%; filter:blur(26px); opacity:calc(1 - var(--shade,0)*.42);
          background:radial-gradient(50% 50% at 50% 58%, rgba(58,44,26,.30) 0%, rgba(58,44,26,.16) 42%, rgba(58,44,26,0) 76%); }
        .sbf .sb-cast.contact{ left:-6%; right:-6%; top:78%; bottom:-8%; filter:blur(10px); opacity:calc(1 - var(--shade,0)*.5);
          background:radial-gradient(50% 50% at 50% 30%, rgba(44,32,14,.34) 0%, rgba(44,32,14,0) 74%); }
        .sbf .sb-cast.hair{ display:none; }

        .sbf .sb-full{ position:absolute; inset:0; }
        .sbf .sb-full img{ width:100%; height:100%; object-fit:fill; display:block; }

        /* the turning leaf, anchored at the left spine */
        .sbf .curl{ position:absolute; top:0; left:0; height:100%; width:var(--bw); transform-style:preserve-3d; transform-origin:left center; z-index:6; }
        .sbf .curl.next{ transform:rotateY(calc(-1 * var(--tt,0deg))); }
        .sbf .curl.prev{ transform:rotateY(calc(-180deg + var(--tt,0deg))); }
        .sbf .strip{ position:absolute; top:0; height:100%; width:calc(var(--bw) / var(--n)); transform-style:preserve-3d; transform-origin:left center; }
        .sbf .curl>.strip{ left:0; }
        .sbf .strip .strip{ left:100%; transform:rotateY(var(--td,0deg)); }
        .sbf .face{ position:absolute; top:0; bottom:0; left:0; right:-1.1px; backface-visibility:hidden; -webkit-backface-visibility:hidden;
          background-repeat:no-repeat; background-size:var(--bw) 100%; }
        .sbf .face.back{ transform:rotateY(180deg); background:var(--paper); box-shadow:inset 0 0 40px rgba(58,44,26,.12); }
        .sbf .face .sh{ position:absolute; inset:0; pointer-events:none;
          background:linear-gradient(90deg, rgba(58,43,20,var(--a1,0)), rgba(58,43,20,var(--a2,0))); }
        .sbf .face .gl{ position:absolute; inset:0; pointer-events:none; background:#fffaf0;
          opacity:calc(var(--shade,0) * var(--lit,1) * var(--lit,1) * .18); }

        .sbf .sb-zone{ position:absolute; top:0; bottom:0; border:0; background:transparent; cursor:grab; z-index:60; -webkit-tap-highlight-color:transparent; }
        .sbf .sb-zone:active{ cursor:grabbing; }
        .sbf .sb-prev{ left:0; width:50%; }
        .sbf .sb-next{ right:0; width:50%; }

        .sbf .sb-captions{ display:grid; justify-items:center; gap:4px; text-align:center; }
        .sbf .sb-captions>.sb-caption{ grid-area:1/1; }
        .sbf .sb-caption{ margin:0; font-style:italic; font-size:18px; font-family:Georgia,serif; color:var(--ink); animation:sb-cap-in .5s ease both; }
        .sbf .sb-caption.live{ animation:none; }
        .sbf .sb-place{ margin:0; font-size:11px; letter-spacing:.16em; text-transform:uppercase; color:var(--ink-faint); }
        @keyframes sb-cap-in{ 0%{opacity:0} }

        .sbf .sb-tools{ display:flex; align-items:center; gap:6px; border:1px solid rgba(43,39,33,.14); border-radius:999px; padding:5px 7px;
          background:rgba(250,246,238,.62); -webkit-backdrop-filter:blur(8px); backdrop-filter:blur(8px); }
        .sbf .tool{ width:28px; height:28px; display:inline-flex; align-items:center; justify-content:center; border:0; border-radius:50%;
          background:transparent; color:var(--ink-soft); cursor:pointer; transition:background-color .18s, color .18s; }
        .sbf .tool:hover{ background:rgba(255,252,244,.9); color:var(--ink); }
        .sbf .tool:disabled{ opacity:.32; cursor:default; background:transparent; }
        .sbf .tool svg{ width:15px; height:15px; display:block; }
        .sbf .sb-zread{ font-size:11px; letter-spacing:.1em; color:var(--ink-faint); min-width:40px; text-align:center; font-variant-numeric:tabular-nums; }
        .sbf .sb-hint{ margin:0; font-size:11px; letter-spacing:.14em; text-transform:uppercase; color:var(--ink-faint); transition:opacity .4s ease; }
        .sbf .sb-hint.gone{ opacity:0; }
      `}</style>

      <div className="sb-stage">
        <button className="sb-arrow left" aria-label="previous page" type="button">
          <svg viewBox="0 0 14 44" width="14" height="44" fill="none">
            <polyline points="11,3 3,22 11,41" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="sb-3d">
          <div className="sb-tilt">
            <div className="sb-cast ambient" aria-hidden="true" />
            <div className="sb-cast contact" aria-hidden="true" />
            <div className="sb-book" />
          </div>
        </div>
        <button className="sb-arrow right" aria-label="next page" type="button">
          <svg viewBox="0 0 14 44" width="14" height="44" fill="none">
            <polyline points="3,3 11,22 3,41" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="sb-captions" />

      <div className="sb-tools" role="group" aria-label="view controls">
        <button className="tool sb-zout" aria-label="zoom out" type="button">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <circle cx="8.6" cy="8.6" r="5.6" />
            <path d="M12.8 12.8 17.4 17.4M6.2 8.6h4.8" />
          </svg>
        </button>
        <span className="sb-zread">100%</span>
        <button className="tool sb-zin" aria-label="zoom in" type="button">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <circle cx="8.6" cy="8.6" r="5.6" />
            <path d="M12.8 12.8 17.4 17.4M6.2 8.6h4.8M8.6 6.2v4.8" />
          </svg>
        </button>
      </div>

      <p className="sb-hint">Drag the page to turn · or use the arrows</p>
    </div>
  );
}
