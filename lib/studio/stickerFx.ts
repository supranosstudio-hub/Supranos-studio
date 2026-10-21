import { Sticker, prefersReducedMotion } from "./sticker";

/**
 * Shared behaviour for every sticker on screen: slap-on entrance, scroll-linked
 * tilt, holographic foil energy and pointer parallax. One set of window listeners
 * is shared and reference-counted across mounted stickers.
 */

const SETTLE_MS = 820;
const STAGGER_MS = 120;
const FOLD_STEER = 0.22;

const registry = new WeakMap<HTMLElement, Sticker>();
const inView = new Set<HTMLElement>();
let mounted = 0;
let observer: IntersectionObserver | null = null;
let tickPending = false;

const holo = { idle: 0.2, energy: 0, y: 0, t: 0, raf: 0, last: 0 };

export const isInView = (el: Element) => inView.has(el as HTMLElement);
export const stickerOf = (el: HTMLElement) => registry.get(el);

function slap(el: HTMLElement) {
  el.classList.add("in");
  window.setTimeout(() => el.classList.add("settled"), SETTLE_MS);
}

function tiltFrame() {
  if (tickPending || prefersReducedMotion()) return;
  tickPending = true;
  requestAnimationFrame(() => {
    tickPending = false;
    const vh = window.innerHeight;
    inView.forEach((el) => {
      if (!el.isConnected) {
        inView.delete(el);
        return;
      }
      const r = el.getBoundingClientRect();
      const c = Math.max(-1, Math.min(1, (r.top + r.height / 2 - vh / 2) / vh));
      const spin = Number(el.dataset.spin ?? 4);
      el.querySelector<HTMLElement>(".stk-tilt")?.style.setProperty(
        "--sr",
        (c * spin).toFixed(2) + "deg",
      );
    });
  });
}

export function holoKick() {
  if (!holo.raf && !prefersReducedMotion())
    holo.raf = requestAnimationFrame(holoFrame);
}

function holoFrame(now: number) {
  holo.raf = 0;
  const f = Math.min(4, (now - (holo.last || now - 16.7)) / 16.7);
  holo.last = now;
  holo.energy = holo.energy > 0.005 ? holo.energy * Math.pow(0.94, f) : 0;
  const vh = window.innerHeight;
  let again = holo.energy > 0;

  inView.forEach((el) => {
    const s = registry.get(el);
    if (!s || s.busy || !el.isConnected) return;
    const r = el.getBoundingClientRect();
    const p = (r.top + r.height / 2) / vh;
    const target = s.hover
      ? {
          rx: (0.5 - s.py) * 14,
          ry: (s.px - 0.5) * 16,
          tx: (s.px - 0.5) * 10,
          ty: (s.py - 0.5) * 10,
          glare: 1,
          holo: 1,
          hx: s.phase + 10 + s.px * 80,
          hy: 15 + s.py * 70,
          gx: s.px * 100,
          gy: s.py * 100,
        }
      : {
          rx: 0,
          ry: 0,
          tx: 0,
          ty: 0,
          glare: 0,
          holo: holo.idle + holo.energy * (1 - holo.idle),
          hx: s.phase + p * 90,
          hy: 25 + p * 50,
          gx: 30,
          gy: 20,
        };
    const c = s.cur as unknown as Record<string, number>;
    let moving = false;
    for (const k of Object.keys(target) as (keyof typeof target)[]) {
      const d = target[k] - c[k];
      if (Math.abs(d) > 0.01) {
        const rate = k === "hx" || k === "hy" || k === "holo" ? 0.22 : 0.16;
        c[k] += d * (1 - Math.pow(1 - rate, f));
        moving = true;
      } else c[k] = target[k];
    }
    s.paint();

    // The fold follows the cursor: turn it toward the pointer and redraw the peel.
    if (s.hover && s.delta > 0 && s.steer(1 - Math.pow(1 - FOLD_STEER, f))) {
      s.setPeel(s.delta);
      moving = true;
    }
    if (moving) again = true;
  });

  if (again) holo.raf = requestAnimationFrame(holoFrame);
  else holo.last = 0;
}

function onScroll() {
  const now = performance.now();
  const y = window.scrollY;
  const v = Math.abs(y - holo.y) / Math.max(8, now - holo.t);
  holo.y = y;
  holo.t = now;
  holo.energy = Math.min(1, Math.max(holo.energy, 0.4 + v * 0.7));
  tiltFrame();
  holoKick();
}

function onResize() {
  tiltFrame();
  inView.forEach((el) => {
    const s = registry.get(el);
    if (s && s.delta > 0 && !s.busy) s.setPeel(s.delta);
  });
}

function getObserver(): IntersectionObserver | null {
  if (observer || !("IntersectionObserver" in window)) return observer;
  observer = new IntersectionObserver(
    (entries) => {
      let i = 0;
      entries.forEach((en) => {
        const el = en.target as HTMLElement;
        if (en.isIntersecting) {
          inView.add(el);
          if (!el.classList.contains("in"))
            window.setTimeout(() => slap(el), i++ * STAGGER_MS);
        } else inView.delete(el);
      });
      tiltFrame();
      holoKick();
    },
    { rootMargin: "0px 0px -6% 0px", threshold: 0.18 },
  );
  return observer;
}

/** Wires one sticker element. Returns its controller and a cleanup function. */
export function mountSticker(
  el: HTMLElement,
  defaultPeelDeg: number,
  peel = true,
): { sticker: Sticker; cleanup: () => void } {
  const sticker = new Sticker(el, defaultPeelDeg, peel);
  registry.set(el, sticker);
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");

  const enter = (e: PointerEvent) => {
    if (e.pointerType !== "mouse" || !canHover.matches) return;
    sticker.hover = !prefersReducedMotion();
    sticker.point(e);
    sticker.hoverIn();
    holoKick();
  };
  const move = (e: PointerEvent) => {
    if (!sticker.hover) return;
    sticker.point(e);
    holoKick();
  };
  const leave = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    sticker.hover = false;
    sticker.hoverOut();
    holoKick();
  };
  const focus = () => {
    if (el.matches(":focus-visible")) sticker.hoverIn();
  };
  const blur = () => sticker.hoverOut();
  el.addEventListener("pointerenter", enter);
  el.addEventListener("pointermove", move);
  el.addEventListener("pointerleave", leave);
  el.addEventListener("focus", focus);
  el.addEventListener("blur", blur);

  if (mounted++ === 0) {
    holo.y = window.scrollY;
    holo.t = performance.now();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
  }

  const settleNow =
    prefersReducedMotion() ||
    !("IntersectionObserver" in window) ||
    el.classList.contains("mini");
  if (settleNow) el.classList.add("in", "settled");
  else getObserver()?.observe(el);

  return {
    sticker,
    cleanup() {
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      el.removeEventListener("focus", focus);
      el.removeEventListener("blur", blur);
      observer?.unobserve(el);
      inView.delete(el);
      sticker.dispose();
      registry.delete(el);
      if (--mounted === 0) {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onResize);
        cancelAnimationFrame(holo.raf);
        holo.raf = 0;
        observer?.disconnect();
        observer = null;
      }
    },
  };
}
