import { TEASER } from "@/content/avst-pilot";

export default function PilotTeaser() {
  return (
    <section aria-label="Vellostha — comic release teaser" className="bg-avst-night text-white">
      <div className="relative mx-auto aspect-video max-h-[80svh] w-full max-w-[1600px] overflow-hidden">
        {TEASER.video ? (
          <video autoPlay muted loop playsInline preload="metadata" poster={TEASER.poster} className="size-full object-cover">
            <source src={TEASER.video} type="video/mp4" />
          </video>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={TEASER.poster} alt="" className="size-full object-cover" />
        )}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-[clamp(16px,4vw,56px)] pt-24">
          <p className="font-avst-display text-[clamp(1.4rem,3vw,2.4rem)] font-semibold">
            {TEASER.title} — <em className="font-avst-body font-normal text-avst-accent-soft">{TEASER.em}</em>
          </p>
          <span className="mt-2 block font-avst-mono text-[10px] uppercase tracking-[0.18em] text-white/60">{TEASER.kicker}</span>
        </div>
      </div>
    </section>
  );
}
