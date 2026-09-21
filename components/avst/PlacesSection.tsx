import { FLAT_PLACES } from "@/content/avst-extra";

export default function PlacesSection() {
  return (
    <section id="places-flat" className="night places" aria-label="Places">
      <div className="wrap">
        <div className="sec-head">
          <h2>
            The Flat is
            <br />a Character
          </h2>
          <p className="sub">
            Two houses, one staircase that stops at the first floor, a café with an L-shaped
            courtyard, and a balcony crossing that nobody has ever questioned. Twelve locked
            environment plates hold the geography still for thirteen episodes.
          </p>
        </div>
        <div className="place-grid" id="placeGrid">
          {FLAT_PLACES.map((p, i) => (
            <div key={p.title} className={`place${p.size !== "half" ? " " + p.size : ""} reveal in`} style={{ "--i": i % 4 } as React.CSSProperties}>
              <figure>
                <img src={p.img} alt={`Environment plate — ${p.title}`} loading="lazy" decoding="async" />
                <figcaption>
                  <h3>{p.title}</h3>
                  <p>{p.cap}</p>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
