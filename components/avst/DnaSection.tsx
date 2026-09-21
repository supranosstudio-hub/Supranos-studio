export default function DnaSection() {
  return (
    <>
      <section id="dna-built" className="dna" aria-label="The work">
        <div className="wrap">
          <div className="sec-head">
            <h2>
              How It
              <br />Is Built
            </h2>
            <p className="sub">
              A sitcom&rsquo;s jokes land because the reader already knows how each person will
              react. Everything below exists to protect that.
            </p>
          </div>

          <div className="dna-cols">
            <div className="dna-col reveal in" style={{ "--i": 0 } as React.CSSProperties}>
              <h3>The rule</h3>
              <p className="quote">
                Every episode permanently reveals one small new thing about a character, while
                temporarily creating one new problem.
              </p>
              <p>
                The permanent reveal makes the characters grow. The temporary problem keeps the
                premise intact. No episode is a pure gag reel.
              </p>
              <p>
                <strong>The bookend rule:</strong> an episode gets a cold open or an end gag.
                Never both. Post-credit stingers run three to five panels and are never a joke —
                because there is never a joke after a feeling.
              </p>
            </div>

            <div className="dna-col reveal in" style={{ "--i": 1 } as React.CSSProperties}>
              <h3>The look</h3>
              <p>
                Watercolour-manga on cream paper. Single-pass washes, muted warm earth palette,
                loose hand-drawn linework with visible pen wobble, small restrained eyes, and
                generous negative space kept clear for lettering.
              </p>
              <p>
                Anchored to <strong>Hirayasumi</strong>. A second, flatter lo-fi register — thick
                uniform outlines, solid fills, grain — carries the wordless emotional beats.
              </p>
              <p>
                Ten locked character sheets. Twelve locked environment plates. Nothing is
                generated without both attached; drift is the default failure mode.
              </p>
            </div>

            <div className="dna-col reveal in" style={{ "--i": 2 } as React.CSSProperties}>
              <h3>The shape</h3>
              <p>
                <strong>64 story panels. 16 pages, four to a page.</strong> Cold opens run five
                panels, end gags four to five, stingers four — all outside the count.
              </p>
              <p>
                Three movements across forty days: <strong>Friction</strong> (01–04),{" "}
                <strong>Synergy</strong> (05–08), and <strong>The Ending, Arriving Slowly</strong>{" "}
                (09–13). From Episode 9 the season runs cold-open only, and the reader should feel
                the rhythm change without being told.
              </p>
              <p>
                <strong>The hidden spine:</strong> Kicha has been filming all of it since week
                one. The series title is the title of his film.
              </p>
            </div>
          </div>

          <div className="refrain reveal in">
            <h3>The Refrain, Disappearing</h3>
            <p className="rsub">
              <em>&ldquo;Idi temporary. 2 years anthe.&rdquo;</em> — He says it with full
              conviction in Episode 1, flatly to a mop in Episode 2, and in anger in Episode 3.
              Then less. Then as a question. Then somebody else says it for him. By the finale he
              does not say it at all, and nobody notices — because the only person who could have
              is the one who stopped saying it. <strong>The disappearance of the line is the whole
              season.</strong>
            </p>
            <div
              className="rchart"
              id="rchart"
              role="img"
              aria-label="Chart: the refrain's strength falls from full conviction in episode one to complete absence by episode thirteen"
            />
            <div className="rlegend">
              <span className="meta">01 — Full conviction</span>
              <span className="meta">04 — First omission</span>
              <span className="meta">08 — Said by somebody else</span>
              <span className="meta">11 — Retired</span>
              <span className="meta">13 — Never said</span>
            </div>
          </div>

          <div className="refs" id="refsRow" />
          <div style={{ paddingBottom: "clamp(40px,6vw,86px)" }} />
        </div>
      </section>

      <section className="night closer" aria-label="Closing">
        <div className="wrap">
          <p className="big">
            &ldquo;This is temporary,&rdquo; he kept saying — <em>until he stopped.</em>
            <br />
            out loud.
          </p>
          <p className="attr meta">Season One · Thirteen episodes · In production</p>
        </div>
      </section>
    </>
  );
}
