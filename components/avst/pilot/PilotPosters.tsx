import { POSTERS } from "@/content/avst-pilot";

export default function PilotPosters() {
  return (
    <section aria-label="Posters" className="py-[clamp(56px,9vw,128px)]">
      <div className="mx-auto max-w-[1180px] px-[clamp(16px,4vw,64px)]">
        <p className="font-avst-mono text-[11px] uppercase tracking-[0.2em] text-avst-accent">{POSTERS.kicker}</p>
        <h2 className="mt-4 font-avst-display text-[clamp(2rem,5vw,3.6rem)] font-semibold leading-none tracking-tight">{POSTERS.title}</h2>
      </div>
      <ul className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-[clamp(16px,4vw,64px)] pb-4">
        {POSTERS.items.map((p) => (
          <li key={p.src} className="shrink-0 snap-start">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.src} alt={p.alt} loading="lazy" decoding="async" className="h-[clamp(320px,58vh,560px)] w-auto shadow-[0_24px_50px_-28px_rgba(12,13,16,0.55)]" />
          </li>
        ))}
      </ul>
      <p className="mt-4 px-[clamp(16px,4vw,64px)] font-avst-mono text-[10px] uppercase tracking-[0.16em] text-avst-ink-3">{POSTERS.hint}</p>
    </section>
  );
}
