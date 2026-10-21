import { FLAT_PLACES } from "@/content/avst-extra";

const SIZE_CLS = { wide: "md:col-span-6", half: "md:col-span-3", third: "md:col-span-2" } as const;

export default function PilotPlaces() {
  return (
    <section id="places" aria-label="Places" className="bg-avst-night px-[clamp(16px,4vw,64px)] py-[clamp(56px,9vw,128px)] text-white">
      <div className="mx-auto max-w-[1320px]">
        <div className="grid gap-6 md:grid-cols-[1fr_28rem] md:items-end">
          <h2 className="font-avst-display text-[clamp(2.2rem,6vw,4.6rem)] font-semibold uppercase leading-[0.95] tracking-tight">
            The Flat is
            <br />a Character
          </h2>
          <p className="font-avst-body text-[1.05rem] leading-relaxed text-white/70">
            Two houses, one staircase that stops at the first floor, a café with an L-shaped courtyard, and a balcony crossing that nobody has
            ever questioned. Twelve locked environment plates hold the geography still for thirteen episodes.
          </p>
        </div>
        <ul className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-6">
          {FLAT_PLACES.map((p) => (
            <li key={p.img} className={SIZE_CLS[p.size]}>
              <figure className="relative aspect-[16/10] overflow-hidden border border-white/12 bg-black md:aspect-auto md:h-full md:min-h-[300px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.img} alt={`Environment plate — ${p.title}`} loading="lazy" decoding="async" className="size-full object-cover" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-5 pt-16">
                  <h3 className="font-avst-display text-lg font-medium uppercase tracking-wide">{p.title}</h3>
                  <p className="mt-1 max-w-[30rem] font-avst-body text-sm leading-snug text-white/75">{p.cap}</p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
