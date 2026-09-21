"use client";

import { EPISODES, MOVEMENTS, SHOW } from "@/content/avst";
import { AVST_COVERS } from "@/content/avst-media";

function pad2(n: number) {
  return String(n).padStart(2, "0");
}
function dayOf(n: number) {
  return Math.min(40, Math.round(((n - 1) / 12) * 39) + 1);
}

function Beat({ k, v, cls }: { k: string; v: string; cls?: string }) {
  return (
    <div className={`beat ${cls || ""}`}>
      <p className="beat__k">{k}</p>
      <p className="beat__v">{v}</p>
    </div>
  );
}
function Spec({ k, v }: { k: string; v: string }) {
  return (
    <div className="spec__row">
      <dt>{k}</dt>
      <dd>{v}</dd>
    </div>
  );
}

export default function EpisodeFile({
  n,
  onSelect,
}: {
  n: number;
  onSelect: (n: number) => void;
}) {
  const ep = EPISODES.find((e) => e.n === n);
  if (!ep) {
    return <p className="pagehead__sub">No such episode.</p>;
  }
  const movement = MOVEMENTS.find((m) => m.id === ep.mv);
  const prev = EPISODES.find((e) => e.n === n - 1);
  const next = EPISODES.find((e) => e.n === n + 1);
  const cover = AVST_COVERS[ep.n];

  return (
    <div className="file">
      <div className="file__cover">
        <div
          className="file__win"
          style={
            {
              "--board": movement?.board,
              backgroundImage: cover ? `url(${cover})` : undefined,
              backgroundSize: "cover",
              backgroundPosition: "center",
            } as React.CSSProperties
          }
        />
        <button className="file__open" type="button" disabled title="Coming with the book reader">
          Open the book →
        </button>
        <p className="eyebrow">
          Movement {movement?.n} · {movement?.name}
        </p>
      </div>
      <div>
        <p className="eyebrow">
          Episode {pad2(ep.n)} of 13 &nbsp;·&nbsp; {ep.week}
          {ep.tentpole ? (
            <>
              {" "}
              &nbsp;·&nbsp; <span style={{ color: "var(--sodium)" }}>Festival tentpole</span>
            </>
          ) : null}
          {ep.finale ? (
            <>
              {" "}
              &nbsp;·&nbsp; <span style={{ color: "var(--sodium)" }}>Finale</span>
            </>
          ) : null}
        </p>
        <h1 className="file__te">{ep.te}</h1>
        <p className="file__en">{ep.en}</p>
        <p className="file__log">{ep.logline}</p>
        <div className="beats">
          <Beat k="Permanent reveal" v={ep.reveal} />
          <Beat k="Temporary problem" v={ep.problem} />
          <Beat k="The felt thing" v={ep.felt} />
          <Beat k="Focus" v={ep.focus} />
          <Beat k="Spine beat" v={ep.spine} cls="beat--wide" />
          <Beat
            k="“Idi temporary”"
            v={ep.refrainNote ? `${ep.refrain} — ${ep.refrainNote}` : ep.refrain}
            cls="beat--wide beat--holi"
          />
        </div>
        <dl className="spec">
          <Spec k="Panels" v={SHOW.format} />
          <Spec k="Bookend" v={ep.bookend} />
          <Spec k="Day" v={`Day ${pad2(dayOf(ep.n))} of 40`} />
          <Spec k="Runners" v={ep.runners.join(" · ")} />
        </dl>
        <nav className="pager">
          {prev ? (
            <a className="pager__a" href={`#/ep/${prev.n}`} onClick={(e) => { e.preventDefault(); onSelect(prev.n); }}>
              <span className="pager__k">← Previous</span>
              <span className="pager__t">{prev.te}</span>
            </a>
          ) : (
            <span />
          )}
          {next ? (
            <a
              className="pager__a pager__a--next"
              href={`#/ep/${next.n}`}
              onClick={(e) => { e.preventDefault(); onSelect(next.n); }}
            >
              <span className="pager__k">Next →</span>
              <span className="pager__t">{next.te}</span>
            </a>
          ) : (
            <span />
          )}
        </nav>
      </div>
    </div>
  );
}
