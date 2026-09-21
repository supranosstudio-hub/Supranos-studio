import { DNA_COLUMNS, REFRAIN_TEXT, REFRAIN_LEGEND, CLOSER_LINE } from "@/content/avst-extra";

export default function DnaSection() {
  return (
    <>
      <section id="dna" aria-label="The work" className="bg-avst-paper py-[clamp(52px,8vw,110px)]">
        <div className="max-w-[1560px] mx-auto px-[clamp(18px,4.2vw,72px)]">
          <div className="mb-10 max-w-[720px]">
            <h2 className="font-avst-display font-medium text-[clamp(1.8rem,4.5vw,3rem)] leading-[1.02] tracking-[-0.02em] mb-4">
              How It
              <br />Is Built
            </h2>
            <p className="text-avst-ink-2 leading-[1.6]">
              A sitcom&rsquo;s jokes land because the reader already knows how each person will
              react. Everything below exists to protect that.
            </p>
          </div>

          <div className="grid md:grid-cols-3 border-t border-avst-line-hard">
            {DNA_COLUMNS.map((col) => (
              <div key={col.h} className="border-avst-line-hard border-b md:border-b-0 md:border-r last:border-r-0 py-8 md:py-10 px-0 md:px-8 first:pl-0">
                <h3 className="font-avst-display font-medium text-[1.2rem] mb-4">{col.h}</h3>
                {col.quote && (
                  <p className="italic text-[1.02rem] leading-[1.5] mb-4 text-avst-ink">
                    {col.quote}
                  </p>
                )}
                {col.body.map((p, i) => (
                  <p key={i} className="text-avst-ink-2 leading-[1.6] mb-3 text-[.95rem]">
                    {p}
                  </p>
                ))}
                {col.tail && (
                  <p className="text-avst-ink-2 leading-[1.6] text-[.95rem]">
                    <strong className="text-avst-ink">The bookend rule: </strong>
                    {col.tail.replace("The bookend rule: ", "")}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-14 pt-10 border-t border-avst-line-hard">
            <h3 className="font-avst-display font-medium text-[1.3rem] mb-4">The Refrain, Disappearing</h3>
            <p className="max-w-[75ch] text-avst-ink-2 leading-[1.65] text-[.98rem] mb-6">{REFRAIN_TEXT}</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {REFRAIN_LEGEND.map((l) => (
                <span key={l} className="font-avst-mono text-[10px] tracking-[0.1em] uppercase text-avst-ink-3">
                  {l}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Closing" className="bg-avst-night text-avst-paper py-[clamp(70px,12vw,150px)] text-center">
        <div className="max-w-[1560px] mx-auto px-[clamp(18px,4.2vw,72px)]">
          <p className="max-w-[20ch] mx-auto font-avst-display uppercase text-[clamp(1.9rem,6.2vw,5.4rem)] leading-[.94] tracking-[-0.03em]">
            {CLOSER_LINE.pre}
            <em className="italic text-avst-accent not-uppercase normal-case">{CLOSER_LINE.em}</em>
            <br />
            {CLOSER_LINE.post}
          </p>
          <p className="font-avst-mono text-[10px] tracking-[0.16em] uppercase text-white/50 mt-8">
            {CLOSER_LINE.attr}
          </p>
        </div>
      </section>
    </>
  );
}
