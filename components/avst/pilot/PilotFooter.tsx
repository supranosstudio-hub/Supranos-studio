import Link from "next/link";
import { FILM, FOOTER_LINKS } from "@/content/avst-pilot";
import { FOOTER } from "@/content/avst-extra";
import { SHOW } from "@/content/avst";

const COL_HEAD = "font-avst-mono text-[10px] uppercase tracking-[0.18em] text-white/50";
const LINK = "font-avst-body text-white/85 transition hover:text-white";

export default function PilotFooter() {
  const [markTop, markBottom] = FOOTER.mark.split("\n");

  return (
    <footer className="relative isolate overflow-hidden bg-avst-night text-white">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={FILM.poster}
        aria-hidden="true"
        className="absolute inset-0 -z-20 size-full object-cover"
      >
        <source src={FILM.video} type="video/mp4" />
      </video>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-avst-night via-black/30 to-black/60" />

      <div className="mx-auto max-w-[1320px] px-[clamp(16px,4vw,64px)] pb-8 pt-[clamp(120px,16vw,220px)]">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <p className="max-w-[24rem] font-avst-body text-[clamp(1.4rem,2.4vw,2.2rem)] font-semibold leading-tight">
            {FILM.line}
            <em className="font-normal text-avst-accent-soft">{FILM.em}</em>
          </p>
          <span className="font-avst-mono text-[10px] uppercase tracking-[0.18em] text-white/70">{FILM.tag}</span>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <p className="font-avst-display text-[clamp(1.6rem,3vw,2.4rem)] font-semibold uppercase leading-none tracking-tight">
              {markTop}
              <br />
              {markBottom}
            </p>
          </div>
          <div>
            <h4 className={COL_HEAD}>Season One</h4>
            <ul className="mt-4 space-y-2">
              {FOOTER_LINKS.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className={LINK}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className={COL_HEAD}>Made by</h4>
            <p className={`mt-4 ${LINK}`}>
              {FOOTER.madeBy[0].text}
              <br />
              {FOOTER.madeBy[0].sub}
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap justify-between gap-3 font-avst-mono text-[10px] uppercase tracking-[0.16em] text-white/60">
          <span>© {new Date().getFullYear()} — All artwork and scripts</span>
          <span>
            {SHOW.place} · Forty days
          </span>
        </div>
      </div>
    </footer>
  );
}
