import {
  DNA_COLUMNS,
  REFRAIN_LEGEND,
  REFRAIN_TEXT,
} from "@/content/avst-extra";
import { EPISODES } from "@/content/avst";

const EMPHASIS = [
  "The bookend rule:",
  "64 story panels. 16 pages, four to a page.",
  "Friction (01–04), Synergy (05–08), and The Ending, Arriving Slowly (09–13)",
  "The hidden spine:",
  "Hirayasumi",
];
const EMPHASIS_RE = new RegExp(
  `(${EMPHASIS.map((e) => e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
);
const MAX_LEVEL = 5;

function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(EMPHASIS_RE).map((part, i) =>
        EMPHASIS.includes(part) ? (
          <strong key={i} className="font-semibold text-avst-ink">
            {part}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  );
}

function refrainParts() {
  const [quote, rest] = REFRAIN_TEXT.split(" — ");
  const cut = rest.lastIndexOf("The disappearance");
  return { quote, body: rest.slice(0, cut), punch: rest.slice(cut) };
}

export default function PilotBuilt() {
  const refrain = refrainParts();

  return (
    <section
      id="built"
      aria-label="The work"
      className="bg-avst-paper-2 px-[clamp(16px,4vw,64px)] py-[clamp(56px,9vw,128px)]"
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="grid gap-6 md:grid-cols-[1fr_28rem] md:items-end">
          <h2 className="font-avst-display text-[clamp(2.2rem,6vw,4.6rem)] font-semibold uppercase leading-[0.95] tracking-tight">
            How It
            <br />
            Is Built
          </h2>
          <p className="font-avst-body text-[1.05rem] leading-relaxed text-avst-ink-2">
            A sitcom’s jokes land because the reader already knows how each
            person will react. Everything below exists to protect that.
          </p>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {DNA_COLUMNS.map((col) => (
            <div key={col.h} className="border-t border-avst-ink pt-5">
              <h3 className="font-avst-mono text-[11px] uppercase tracking-[0.18em] text-avst-accent">
                {col.h}
              </h3>
              {col.quote && (
                <p className="mt-4 font-avst-body text-xl italic leading-snug">
                  {col.quote}
                </p>
              )}
              {(col.quote ? col.body.slice(1) : col.body).map((p) => (
                <p
                  key={p}
                  className="mt-4 font-avst-body leading-relaxed text-avst-ink-2"
                >
                  <Rich text={p} />
                </p>
              ))}
              {col.tail && (
                <p className="mt-4 font-avst-body leading-relaxed text-avst-ink-2">
                  <Rich text={col.tail} />
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-20">
          <h3 className="font-avst-display text-[clamp(1.6rem,3vw,2.4rem)] font-semibold tracking-tight">
            The Refrain, Disappearing
          </h3>
          <p className="mt-4 max-w-[46rem] font-avst-body text-lg leading-relaxed text-avst-ink-2">
            <em>{refrain.quote}</em> — {refrain.body}
            <strong className="font-semibold text-avst-ink">
              {refrain.punch}
            </strong>
          </p>
          <div className="mt-8 overflow-x-auto">
            <div
              role="img"
              aria-label="Chart: the refrain's strength falls from full conviction in episode one to complete absence by episode thirteen"
              className="grid h-40 min-w-[480px] grid-cols-13 items-end gap-[clamp(4px,0.7vw,10px)]"
            >
              {EPISODES.map((e) => (
                <div
                  key={e.n}
                  className="flex h-full flex-col justify-end gap-1.5"
                >
                  <i
                    style={{
                      height: `${Math.max(2, (e.refrainLevel / MAX_LEVEL) * 100)}%`,
                    }}
                    className="block bg-avst-accent"
                  />
                  <span className="text-center font-avst-mono text-[9px] text-avst-ink-3">
                    {String(e.n).padStart(2, "0")}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
            {REFRAIN_LEGEND.map((l) => (
              <li
                key={l}
                className="font-avst-mono text-[10px] uppercase tracking-[0.12em] text-avst-ink-3"
              >
                {l}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
