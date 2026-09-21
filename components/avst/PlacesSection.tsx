import { FLAT_PLACES } from "@/content/avst-extra";

const SPAN: Record<string, string> = {
  wide: "col-span-6",
  half: "col-span-6 sm:col-span-3",
  third: "col-span-6 sm:col-span-2",
};

export default function PlacesSection() {
  return (
    <section id="places" aria-label="Places" className="bg-avst-night text-avst-paper py-[clamp(52px,8vw,110px)]">
      <div className="max-w-[1560px] mx-auto px-[clamp(18px,4.2vw,72px)]">
        <div className="mb-10 max-w-[720px]">
          <h2 className="font-avst-display font-medium text-[clamp(1.8rem,4.5vw,3rem)] leading-[1.02] tracking-[-0.02em] mb-4">
            The Flat is
            <br />a Character
          </h2>
          <p className="text-white/60 leading-[1.6]">
            Two houses, one staircase that stops at the first floor, a café with an L-shaped
            courtyard, and a balcony crossing that nobody has ever questioned. Twelve locked
            environment plates hold the geography still for thirteen episodes.
          </p>
        </div>
        <div className="grid grid-cols-6 gap-3">
          {FLAT_PLACES.map((p) => (
            <figure key={p.title} className={`relative overflow-hidden border border-white/15 ${SPAN[p.size]}`}>
              <img
                src={p.img}
                alt={`Environment plate — ${p.title}`}
                loading="lazy"
                decoding="async"
                className={`w-full object-cover ${p.size === "wide" ? "aspect-[24/10]" : "aspect-[16/10]"}`}
              />
              <figcaption className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/10 to-transparent">
                <h3 className="text-[#EDE5D6] uppercase font-normal text-[clamp(1rem,1.7vw,1.4rem)] tracking-[-0.01em]">
                  {p.title}
                </h3>
                <p className="text-[#A79C8B] text-[.9rem] leading-[1.45] max-w-[52ch] mt-1.5">{p.cap}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
