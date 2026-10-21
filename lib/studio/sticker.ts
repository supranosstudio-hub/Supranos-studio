import { STICKER_GEOMETRY } from "@/content/studio-stickers";

export type Support = (theta: number) => [number, number];

export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
export const easeBack = (t: number) => {
  const c = 1.9;
  return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2);
};
export const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function tween(
  dur: number,
  ease: (t: number) => number,
  fn: (e: number) => void,
  done?: () => void,
): () => void {
  const t0 = performance.now();
  let raf = 0;
  let alive = true;
  const step = (now: number) => {
    if (!alive) return;
    const t = Math.min(1, (now - t0) / dur);
    fn(ease(t));
    if (t < 1) raf = requestAnimationFrame(step);
    else done?.();
  };
  raf = requestAnimationFrame(step);
  return () => {
    alive = false;
    cancelAnimationFrame(raf);
  };
}

const L = 6000;
/** Half-plane polygon: points p with n·p on `side` of the fold line n·p = t. */
function halfPlane(nx: number, ny: number, t: number, side: 1 | -1): string {
  const ux = -ny;
  const uy = nx;
  const px = nx * t;
  const py = ny * t;
  const ax = px + ux * L;
  const ay = py + uy * L;
  const bx = px - ux * L;
  const by = py - uy * L;
  const cx = bx + side * nx * L;
  const cy = by + side * ny * L;
  const dx = ax + side * nx * L;
  const dy = ay + side * ny * L;
  const f = (n: number) => n.toFixed(1);
  return `polygon(${f(ax)}px ${f(ay)}px,${f(bx)}px ${f(by)}px,${f(cx)}px ${f(cy)}px,${f(dx)}px ${f(dy)}px)`;
}

/* ---------- live die-cut extents, so the fold can start from any side ---------- */

const supportCache = new Map<string, Promise<Support | null>>();

/** Convex hull (monotone chain) of opaque pixels, in source-image pixel units. */
function hullOf(points: [number, number][]): [number, number][] {
  const pts = [...points].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cross = (
    o: [number, number],
    a: [number, number],
    b: [number, number],
  ) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lower: [number, number][] = [];
  for (const p of pts) {
    while (
      lower.length >= 2 &&
      cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0
    )
      lower.pop();
    lower.push(p);
  }
  const upper: [number, number][] = [];
  for (const p of [...pts].reverse()) {
    while (
      upper.length >= 2 &&
      cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0
    )
      upper.pop();
    upper.push(p);
  }
  return lower.slice(0, -1).concat(upper.slice(0, -1));
}

/** Scans the sticker's alpha once and returns its min/max extent along any direction. */
export function loadSupport(key: string, src: string): Promise<Support | null> {
  const cached = supportCache.get(key);
  if (cached) return cached;
  const geo = STICKER_GEOMETRY[key];
  const job = new Promise<Support | null>((resolve) => {
    const img = new Image();
    img.onload = () => {
      try {
        const scale = 96 / geo.w;
        const cw = Math.max(8, Math.round(geo.w * scale));
        const ch = Math.max(8, Math.round(geo.h * scale));
        const canvas = document.createElement("canvas");
        canvas.width = cw;
        canvas.height = ch;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return resolve(null);
        ctx.drawImage(img, 0, 0, cw, ch);
        const data = ctx.getImageData(0, 0, cw, ch).data;
        const pts: [number, number][] = [];
        for (let y = 0; y < ch; y++) {
          for (let x = 0; x < cw; x++) {
            if (data[(y * cw + x) * 4 + 3] > 40) {
              pts.push(
                [(x / cw) * geo.w, (y / ch) * geo.h],
                [((x + 1) / cw) * geo.w, ((y + 1) / ch) * geo.h],
              );
            }
          }
        }
        if (pts.length < 3) return resolve(null);
        const hull = hullOf(pts);
        resolve((theta: number) => {
          const nx = Math.cos(theta);
          const ny = Math.sin(theta);
          let lo = Infinity;
          let hi = -Infinity;
          for (const [x, y] of hull) {
            const d = nx * x + ny * y;
            if (d < lo) lo = d;
            if (d > hi) hi = d;
          }
          return [lo, hi];
        });
      } catch {
        resolve(null);
      }
    };
    img.onerror = () => resolve(null);
    img.src = src;
  });
  supportCache.set(key, job);
  return job;
}

const TAU = Math.PI * 2;
const norm = (a: number) => ((a % TAU) + TAU) % TAU;
const shortest = (from: number, to: number) => {
  let d = norm(to) - norm(from);
  if (d > Math.PI) d -= TAU;
  if (d < -Math.PI) d += TAU;
  return d;
};

export interface HoloState {
  rx: number;
  ry: number;
  tx: number;
  ty: number;
  glare: number;
  holo: number;
  hx: number;
  hy: number;
  gx: number;
  gy: number;
}

export class Sticker {
  readonly el: HTMLElement;
  readonly key: string;
  readonly w: number;
  readonly h: number;
  private readonly front: HTMLElement;
  private readonly wrap: HTMLElement;
  private readonly flap: HTMLElement;
  readonly lift: HTMLElement;
  hover = false;
  busy = false;
  px = 0.5;
  py = 0.5;
  delta = 0;
  /** Fold direction in radians (screen space, y down). Follows the cursor while hovering. */
  theta: number;
  readonly phase: number;
  cur: HoloState;
  private stop: (() => void) | null = null;
  private support: Support | null = null;

  /** When false the sticker only tilts / shines on hover (no fold). */
  readonly peelEnabled: boolean;

  constructor(el: HTMLElement, defaultPeelDeg: number, peelEnabled = true) {
    this.el = el;
    this.peelEnabled = peelEnabled;
    this.key = el.dataset.key ?? "";
    const geo = STICKER_GEOMETRY[this.key];
    this.w = geo.w;
    this.h = geo.h;
    this.front = el.querySelector<HTMLElement>(".stk-front")!;
    this.wrap = el.querySelector<HTMLElement>(".stk-flapwrap")!;
    this.flap = el.querySelector<HTMLElement>(".stk-flap")!;
    this.lift = el.querySelector<HTMLElement>(".stk-lift")!;
    this.theta = (defaultPeelDeg * Math.PI) / 180;
    this.phase = [...this.key].reduce((a, ch) => a + ch.charCodeAt(0), 0) % 50;
    this.cur = {
      rx: 0,
      ry: 0,
      tx: 0,
      ty: 0,
      glare: 0,
      holo: 0.2,
      hx: this.phase + 30,
      hy: 50,
      gx: 30,
      gy: 20,
    };
    void loadSupport(this.key, `/images/studio/${this.key}.webp`).then((s) => {
      this.support = s;
    });
  }

  point(e: { clientX: number; clientY: number }) {
    const r = this.el.getBoundingClientRect();
    this.px = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    this.py = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
  }

  /** Angle from the sticker's centre to the pointer, in screen space. */
  private pointerAngle(): number | null {
    const dx = (this.px - 0.5) * this.el.offsetWidth;
    const dy = (this.py - 0.5) * this.el.offsetHeight;
    if (
      Math.hypot(dx, dy) <
      Math.min(this.el.offsetWidth, this.el.offsetHeight) * 0.06
    )
      return null;
    return Math.atan2(dy, dx);
  }

  /** Jump the fold direction to the pointer (no smoothing). */
  aimAtPointer() {
    const a = this.pointerAngle();
    if (a !== null) this.theta = a;
  }

  /** Ease the fold direction toward the pointer. Returns true while still turning. */
  steer(factor: number): boolean {
    const a = this.pointerAngle();
    if (a === null) return false;
    const d = shortest(this.theta, a);
    if (Math.abs(d) < 0.002) return false;
    this.theta = norm(this.theta + d * factor);
    return true;
  }

  private extent(theta: number): [number, number] {
    if (this.support) return this.support(theta);
    const geo = STICKER_GEOMETRY[this.key];
    const deg = Math.round((norm(theta) * 180) / Math.PI / 45) * 45;
    return geo.sup[String(deg % 360)];
  }

  paint() {
    const c = this.cur;
    const st = this.el.style;
    st.setProperty("--rx", c.rx.toFixed(2) + "deg");
    st.setProperty("--ry", c.ry.toFixed(2) + "deg");
    st.setProperty("--tx", c.tx.toFixed(1) + "px");
    st.setProperty("--ty", c.ty.toFixed(1) + "px");
    st.setProperty("--holo", c.holo.toFixed(3));
    st.setProperty("--glare", c.glare.toFixed(3));
    st.setProperty("--hx", c.hx.toFixed(1) + "%");
    st.setProperty("--hy", c.hy.toFixed(1) + "%");
    st.setProperty("--gx", c.gx.toFixed(1) + "%");
    st.setProperty("--gy", c.gy.toFixed(1) + "%");
  }

  setPeel(d: number) {
    this.delta = d;
    if (d < 0.4) {
      this.front.style.clipPath = "";
      this.wrap.style.visibility = "hidden";
      return;
    }
    const W = this.el.offsetWidth;
    const H = this.el.offsetHeight;
    const k = W / this.w;
    const nx = Math.cos(this.theta);
    const ny = Math.sin(this.theta);
    const t = this.extent(this.theta)[1] * k - d;
    this.front.style.clipPath = halfPlane(nx, ny, t, -1);
    this.flap.style.clipPath = halfPlane(nx, ny, t, 1);
    const a = 1 - 2 * nx * nx;
    const b = -2 * nx * ny;
    const dd = 1 - 2 * ny * ny;
    this.flap.style.transform = `matrix(${a.toFixed(5)},${b.toFixed(5)},${b.toFixed(5)},${dd.toFixed(5)},${(2 * t * nx).toFixed(2)},${(2 * t * ny).toFixed(2)})`;
    const ang = (Math.atan2(nx, -ny) * 180) / Math.PI;
    const o0 = Math.min(0, nx * W, ny * H, nx * W + ny * H);
    const p0 = t - o0;
    const crease = `linear-gradient(${ang.toFixed(1)}deg,#a9afbd ${p0.toFixed(1)}px,#dde1e9 ${(p0 + d * 0.28).toFixed(1)}px,#f3f4f7 ${(p0 + d * 0.7).toFixed(1)}px,#ffffff ${(p0 + d).toFixed(1)}px)`;
    const S = Math.max(12, d * 0.2);
    const stops = [
      "#ffb3c7",
      "#ffd6a5",
      "#fdffb6",
      "#caffbf",
      "#9bf6ff",
      "#a0c4ff",
      "#bdb2ff",
      "#ffc6ff",
      "#ffb3c7",
    ]
      .map((c, i) => `${c} ${(i * S).toFixed(1)}px`)
      .join(",");
    this.flap.style.backgroundImage = `repeating-linear-gradient(${(ang + 65).toFixed(1)}deg,${stops}),${crease}`;
    this.flap.style.backgroundBlendMode = "multiply,normal";
    this.flap.style.backgroundPosition = `${(d * 0.9).toFixed(1)}px ${(d * 0.35).toFixed(1)}px,0 0`;
    this.wrap.style.visibility = "visible";
  }

  private peelTo(
    target: number,
    dur: number,
    ease: (t: number) => number,
    done?: () => void,
  ) {
    this.stop?.();
    if (prefersReducedMotion()) {
      this.setPeel(0);
      this.stop = null;
      done?.();
      return;
    }
    const from = this.delta;
    this.stop = tween(
      dur,
      ease,
      (e) => this.setPeel(from + (target - from) * e),
      () => {
        this.stop = null;
        done?.();
      },
    );
  }

  hoverIn() {
    if (this.busy || !this.peelEnabled) return;
    this.aimAtPointer();
    this.peelTo(
      Math.min(this.el.offsetWidth, this.el.offsetHeight) * 0.14,
      520,
      easeBack,
    );
  }

  hoverOut() {
    if (this.busy || !this.peelEnabled) return;
    this.peelTo(0, 340, easeOut);
  }

  /** Full peel in the direction of the pointer, then hand over to `done` (navigation). */
  peelOff(done: () => void) {
    this.busy = true;
    this.el.classList.add("lifting");
    if (prefersReducedMotion()) {
      done();
      return;
    }
    this.aimAtPointer();
    const k = this.el.offsetWidth / this.w;
    const [smin, smax] = this.extent(this.theta);
    const full = (smax - smin) * k + 6;
    const nx = Math.cos(this.theta);
    const ny = Math.sin(this.theta);
    const from = this.delta;
    this.stop?.();
    this.lift.style.transition = "none";
    this.stop = tween(
      640,
      easeInOut,
      (e) => {
        this.setPeel(from + (full - from) * e);
        Object.assign(this.cur, {
          holo: 1,
          glare: Math.min(1, e * 2.4),
          hx: this.cur.hx + 3.2,
          hy: 30 + e * 40,
          gx: 15 + e * 70,
          gy: 20 + e * 30,
        });
        this.paint();
        const up = e * e;
        this.lift.style.transform = `translate(${(-nx * 16 * up).toFixed(1)}px,${(-ny * 16 * up - 26 * up).toFixed(1)}px) rotate(${(-5 * up).toFixed(2)}deg) scale(${(1 + 0.05 * up).toFixed(3)})`;
        this.lift.style.opacity =
          e < 0.72 ? "1" : (1 - (e - 0.72) / 0.28).toFixed(3);
      },
      () => {
        this.stop = null;
        done();
      },
    );
  }

  dispose() {
    this.stop?.();
    this.stop = null;
  }
}
