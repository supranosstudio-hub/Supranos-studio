"use client";

import Link from "next/link";
import { Fragment, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { AVATARS_SVG, FRIENDS_SVG } from "@/content/studio-art";
import { STUDIO_ABOUT, STUDIO_PROJECTS, projectHref } from "@/content/studio";
import { prefersReducedMotion } from "@/lib/studio/sticker";

const COPY_RESET_MS = 1600;
const TIP_HIDE_TOUCH_MS = 2200;

function Sep() {
  return (
    <>
      {" "}
      <span className="sep" aria-hidden="true">
        •
      </span>{" "}
    </>
  );
}

export default function AboutContent() {
  const A = STUDIO_ABOUT;
  const tipRef = useRef<HTMLSpanElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const tipFor = useRef<Element | null>(null);
  const tipTimer = useRef<number>(0);
  const [copyLabel, setCopyLabel] = useState("Copy");
  const liveSocials = A.socials.filter((s) => s.url);

  // Friends' pencil wobble only runs while on screen.
  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;
    const observers: IntersectionObserver[] = [];
    root.querySelectorAll<SVGSVGElement>("svg.friends-art, svg.avatars").forEach((svg) => {
      if (typeof svg.pauseAnimations !== "function") return;
      svg.pauseAnimations();
      if (prefersReducedMotion() || !("IntersectionObserver" in window)) return;
      const io = new IntersectionObserver(([e]) => (e.isIntersecting ? svg.unpauseAnimations() : svg.pauseAnimations()));
      io.observe(svg);
      observers.push(io);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const hideTip = () => {
    if (!tipFor.current) return;
    tipRef.current?.classList.remove("on");
    pageRef.current?.querySelectorAll(".friend.hop").forEach((x) => x.classList.remove("hop"));
    tipFor.current = null;
  };

  useEffect(() => {
    window.addEventListener("scroll", hideTip, { passive: true });
    return () => {
      window.removeEventListener("scroll", hideTip);
      clearTimeout(tipTimer.current);
    };
  }, []);

  const showTip = (g: Element) => {
    const name = g.getAttribute("data-name");
    const tip = tipRef.current;
    if (!name || !tip) return;
    hideTip();
    const r = (g.querySelector(".hd") ?? g).getBoundingClientRect();
    tip.textContent = name;
    tip.style.left = r.left + r.width / 2 + "px";
    tip.style.top = r.top - 6 + "px";
    tip.classList.add("on");
    tipFor.current = g;
    if (!prefersReducedMotion()) {
      const i = g.getAttribute("data-i");
      pageRef.current?.querySelectorAll(`.friend[data-i="${i}"]`).forEach((x) => x.classList.add("hop"));
    }
  };

  const friendOf = (t: EventTarget | null) => (t instanceof Element ? t.closest(".friend") : null);

  const onSpotlight = (e: ReactPointerEvent<HTMLHeadingElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", (e.clientX - r.left).toFixed(0) + "px");
    e.currentTarget.style.setProperty("--my", (e.clientY - r.top).toFixed(0) + "px");
  };

  const copyMail = async () => {
    let label = "Press Ctrl+C";
    try {
      await navigator.clipboard.writeText(A.mail);
      label = "Copied";
    } catch {
      /* clipboard unavailable: fall back to the hint */
    }
    setCopyLabel(label);
    window.setTimeout(() => setCopyLabel("Copy"), COPY_RESET_MS);
  };

  return (
    <div
      ref={pageRef}
      onPointerOver={(e) => {
        const g = friendOf(e.target);
        if (!g) return;
        if (g !== tipFor.current) showTip(g);
        if (e.pointerType !== "mouse") {
          clearTimeout(tipTimer.current);
          tipTimer.current = window.setTimeout(hideTip, TIP_HIDE_TOUCH_MS);
        }
      }}
      onPointerOut={(e) => {
        const g = friendOf(e.target);
        if (g && e.pointerType === "mouse" && !(e.relatedTarget instanceof Node && g.contains(e.relatedTarget))) hideTip();
      }}
      onFocus={(e) => {
        const g = friendOf(e.target);
        if (g) showTip(g);
      }}
      onBlur={(e) => {
        if (friendOf(e.target)) hideTip();
      }}
    >
      <article className="about view fade">
        <section className="about-who">
          <h1 className="grad" onPointerMove={onSpotlight} tabIndex={-1}>
            {A.whoTitle}
          </h1>
          <p className="about-lede">{A.who}</p>
        </section>
        <section className="about-keep" aria-labelledby="keep-h">
          <h2 id="keep-h">{A.keepTitle}</h2>
          <p className="about-lede">{A.keep}</p>
          <div className="chai">
            <div className="chai-top">
              <span dangerouslySetInnerHTML={{ __html: AVATARS_SVG }} />
              <h3>{A.chai}</h3>
            </div>
            <dl className="chai-rows">
              <div>
                <dt>Mail</dt>
                <dd>
                  <a href={`mailto:${A.mail}`}>{A.mail}</a>
                  <button className="copy" type="button" onClick={copyMail}>
                    {copyLabel}
                  </button>
                </dd>
              </div>
              {liveSocials.length > 0 && (
                <div>
                  <dt>Socials</dt>
                  <dd>
                    {liveSocials.map((s, i) => (
                      <Fragment key={s.label}>
                        {i > 0 && <Sep />}
                        <a href={s.url} target="_blank" rel="noopener noreferrer">
                          {s.label}
                        </a>
                      </Fragment>
                    ))}
                  </dd>
                </div>
              )}
              <div>
                <dt>Projects</dt>
                <dd>
                  {STUDIO_PROJECTS.map((p, i) => (
                    <Fragment key={p.key}>
                      {i > 0 && <Sep />}
                      <Link href={projectHref(p)}>{p.name}</Link>
                    </Fragment>
                  ))}
                </dd>
              </div>
            </dl>
            <p className="chai-sign">{A.sign}</p>
          </div>
        </section>
      </article>
      <figure className="friends" dangerouslySetInnerHTML={{ __html: FRIENDS_SVG }} />
      <span ref={tipRef} className="ftip" aria-hidden="true" />
    </div>
  );
}
