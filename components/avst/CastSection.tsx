"use client";

import { useState } from "react";
import { CAST, SATELLITES } from "@/content/avst";

const WASH: Record<string, string> = {
  anudeep: "--wash-blue",
  suraj: "--wash-peach",
  kicha: "--wash-rose",
  aishwarya: "--wash-sage",
  jay: "--wash-blue",
};

function SpecRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="castspec__row">
      <dt>{k}</dt>
      <dd>{v}</dd>
    </div>
  );
}

export default function CastSection() {
  const [active, setActive] = useState(0);
  const c = CAST[active];

  return (
    <section className="sec" id="cast" aria-label="Cast">
      <div className="casttrack" id="casttrack">
        <div className="caststage">
          <div className="castbar">
            <div className="castnav" role="tablist" aria-label="Choose a character">
              {CAST.map((m, i) => (
                <button
                  key={m.id}
                  type="button"
                  className="castnav__btn"
                  role="tab"
                  aria-current={i === active}
                  onClick={() => setActive(i)}
                >
                  {m.short}
                </button>
              ))}
            </div>
            <p className="castscroll">Choose a character</p>
          </div>

          <div className="castfloor" id="castfloor">
            <div className="castglow" style={{ "--wash": `var(${WASH[c.id] || "--wash-blue"})` } as React.CSSProperties} />
            {CAST.map((m, i) => (
              <figure
                key={m.id}
                className="castfig"
                style={{ display: i === active ? undefined : "none" }}
              >
                <img src={m.img} alt={`${m.short}, character turnaround`} loading={i ? "lazy" : undefined} decoding="async" />
              </figure>
            ))}
          </div>

          <div className="castinfo">
            <div className="castinfo__l">
              <p className="eyebrow castinfo__role">{c.role}</p>
              <h2 className="castinfo__name">{c.name}</h2>
              <p className="castinfo__home">{c.homeLine}</p>
              <p className="castinfo__line">“{c.line}”</p>
            </div>
            <dl className="castspec">
              <SpecRow k="Age" v={String(c.age)} />
              <SpecRow k="Works" v={c.job} />
              <SpecRow k="Wiring" v={`${c.mbti} · ${c.sign}`} />
              <SpecRow k="Home is" v={c.home} />
              <SpecRow k="Flaw" v={c.flaw} />
              <SpecRow k="Tell" v={c.tell} />
              <SpecRow k="Carries" v={c.carries.join(" · ")} />
            </dl>
          </div>
        </div>
      </div>

      <div className="page">
        <div className="sect">
          <span className="sect__n">The colony</span>
          <h2 className="sect__t">Everybody else</h2>
          <span className="sect__r" />
        </div>
        <div className="colony" id="colony">
          {SATELLITES.map((s) => (
            <article key={s.id} className="colony__card">
              <div className="colony__img">
                <img src={s.img} alt={s.name} loading="lazy" decoding="async" />
              </div>
              <div className="colony__body">
                <h3 className="colony__name">{s.name}</h3>
                <p className="colony__role">{s.role}</p>
                <p className="colony__note">{s.note}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
