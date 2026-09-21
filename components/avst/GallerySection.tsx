import { AVST_GALLERY, AVST_CHIBI } from "@/content/avst-media";

function MarqRow({ dir, offset }: { dir: "left" | "right"; offset: number }) {
  const faces = AVST_CHIBI;
  if (!faces.length) return null;
  const SETS = 6;
  const row: typeof faces = [];
  for (let s = 0; s < SETS; s++) {
    faces.forEach((_, i) => row.push(faces[(i + offset) % faces.length]));
  }
  return (
    <div className="marq" data-dir={dir} aria-hidden={dir === "right" ? true : undefined}>
      <div className="marq__row" style={{ "--sets": SETS } as React.CSSProperties}>
        {row.map((f, i) => (
          <a key={`${f.ci}-${i}`} className="marq__face" href={`#/cast/${f.ci}`}>
            <span className="marq__bob">
              <img className="marq__img" src={f.src} alt="" draggable={false} />
            </span>
            <span className="marq__name">{f.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

export default function GallerySection() {
  const lead = AVST_GALLERY.slice(0, 5);
  const rest = AVST_GALLERY.slice(5);

  return (
    <section className="sec sec--night" id="gallery" aria-label="Gallery">
      <div className="page">
        <div className="sec-head sec-head--night">
          <h2>Gallery</h2>
          <span>plates from the season</span>
        </div>
      </div>

      <div className="gal" id="gal">
        {lead.map((g, i) => (
          <figure key={g.k} className={`plate${i === 0 ? " plate--lead" : ""}`}>
            <div className="plate__img">
              <img src={g.src} alt={g.t} loading="lazy" decoding="async" width={g.w} height={g.h} />
            </div>
            <figcaption className="plate__cap">
              <b>{g.t}</b>
              <span>{g.c}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      <MarqRow dir="left" offset={0} />

      <div className="gal gal--b" id="gal-b">
        {rest.map((g) => (
          <figure key={g.k} className="plate">
            <div className="plate__img">
              <img src={g.src} alt={g.t} loading="lazy" decoding="async" width={g.w} height={g.h} />
            </div>
            <figcaption className="plate__cap">
              <b>{g.t}</b>
              <span>{g.c}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      <MarqRow dir="right" offset={2} />

      <div className="page">
        <p className="gal__note">Every panel started as an argument about what actually happened.</p>
      </div>
    </section>
  );
}
