import Link from "next/link";
import Reveal from "@/components/Reveal";

const CHAPTERS = [
  {
    n: "01 — Where it started",
    h: "A profession nobody believed in",
    body: [
      "A decade ago one of us told his sister he wanted to be a cinematographer. She said that wasn't even a profession. But the pull was never the job title — it was the passion to make something that is felt, not measured or merely seen.",
      "Over time we became designers. How different is that from cinematics, really? It's all vision and direction — except this time we realised we wanted to direct whatever came next. Doing anything at scale costs like hell in production, so in the meantime we experimented on social media and with whatever we could make alongside like-minded friends. When AI turned up as a way to project ideas instead of keeping them at a distance, we jumped in.",
    ],
    aside: "Three goals, one toolkit: direct a sitcom, draw like a comic artist, publish a book.",
  },
  {
    n: "02 — The pitch",
    h: "A premise, some quirks, a moodboard",
    body: [
      "How did we start? One of us wrote what it should be about. Gave the characters their quirks. Mapped how the story should flow. Built a title and concepts on top of that, then a moodboard around the vision.",
      "Then we pitched it to a friend, Sumith, who was already actively playing with content creation. The moment he heard it, he hopped on with his own expertise — and that's when it stopped being one person's idea.",
    ],
  },
  {
    n: "03 — Two labs, two models",
    h: "Decoding the characters from both sides",
    body: [
      "Sumith changed the horizon. He wrote a ton of prompts to generate characters and decode them through his own interpretation. While one of us was generating on Gemini, he was running the same ideas through ChatGPT — two labs, two models, the same cast being pulled into focus in parallel.",
      "We kept iterating until the designs converged. Once we were close to what we wanted each character to look like, we finalised the art-style prompt and locked it.",
    ],
  },
  {
    n: "04 — The trial run",
    h: "Six hours for one intro",
    body: [
      "By now we were impatient. We wanted a trial run — to know whether we could actually pull this off or not. Around the same time, Sumith ran a single shot, a single prompt, to get the whole story out in one go.",
      "So we spent a complete day writing and editing prompts to get the pictures for the pilot episode. Just getting the intro scene established took six-plus hours — along with the assembly in Figma, which we used to add frames and adjust the text and images. It worked.",
    ],
  },
  {
    n: "05 — The crew",
    h: "Fanboys who grew up on anime and manga",
    body: [
      "The friends came in one by one. From being fanboys, to visiting Japan, to actually bringing the culture into the work — that's always been an adventure. Sreekar, Ambi, Shan, Anand — each of them landed with the same energy.",
      "What we hadn't said out loud until then was how much we all have a thing for anime and manga. That shared thread is really what held the group together.",
    ],
  },
  {
    n: "06 — The chibi break-through",
    h: "The expressions the panels lived on",
    body: [
      "As the pilot came along, we felt a ton of expressions were missing — the ones that were subtle, but important for the frames. Sumith started building expression sheets to check each character's range.",
      "But to actually beat around the comic-book expression — the exaggerated, readable kind — we landed on chibi-style expressions. Sumith led those sheets too, and that's what finally gave the panels the range they needed.",
    ],
  },
  {
    n: "07 — When one prompt broke",
    h: "Consistency and composition, the new walls",
    body: [
      "As Sumith pushed toward a stable daily rhythm in the story, he started hitting roadblocks — either the characters weren't consistent, or the scene composition was off. A single prompt to “put it all out” wasn't good enough: consistency and composition kept failing.",
      "So the tasks split cleanly. One of us set up the prompts. Sumith worked on making the artwork unique and in-line with the style.",
    ],
  },
  {
    n: "08 — Splitting the work",
    h: "Agreeing on an order, not a timeline",
    body: [
      "Eventually we sat down and talked through how we actually move forward with generating the comic. The first realisation was just how much work is ahead — episodes, then characters, then environments, then props, then the generations themselves.",
      "Episodes: one of us takes the writing and reviews it thoroughly before anything is treated as final. The generation side: the other takes the Higgsfield side — learning it properly before writing the character art-style specifically for it.",
    ],
    aside: "The sequence: write and review episodes → learn the tool and write the art-style → generate characters, environments and props together → set up voice-prompting → start planning the generations.",
  },
  {
    n: "09 — The tool chain, honestly",
    h: "What each tool was actually good at",
    body: [
      "We wrote prompts with Claude, generated characters with Higgsfield — a ChatGPT base character, then Seedream 5.0 for the full character sheet. Scene and environment construction was an absolute time-killer, even though the model and flow were the same.",
      "Google Flow gives you consistency between characters; ChatGPT is good at maintaining the artist look. We combined both for the outcome. And because we wanted panels to be exact, we did the assembly ourselves in Figma, dialogue boxes and all.",
    ],
  },
];

const TOOLS = [
  { tool: "Claude", note: "Wrote the prompts, and let a prompt carry the @name tag." },
  { tool: "Google Flow", note: "Great at consistency between characters. Only lets you add a character at a time." },
  { tool: "Higgsfield", note: "You can add elements for character, objects and environment. Generating one after another ate time and credits." },
  { tool: "ChatGPT", note: "Good at holding the artist look. Doesn't remember as it goes; its context mapping is different." },
  { tool: "Seedream 5.0", note: "Built the full character sheet from a ChatGPT base character." },
];

const CHECKLIST = [
  "Review the script first. Never generate art around a page that's still shifting.",
  "Lock characters before scenes. Consistency is cheaper to enforce early than to fix later.",
  "Draw an outline for environments. The single biggest time-saver on the hardest part.",
  "Panel-by-panel beats batch. Batches drift on detail; one panel at a time holds.",
  "Combine tools for their strengths. Flow for consistency, ChatGPT for the artist look.",
  "Voice-prompt the volume. Talking prompts beats typing them across a whole cast.",
];

export default function ProcessPage() {
  return (
    <main>
      <section className="px-[clamp(16px,4vw,64px)] pt-[clamp(44px,9vw,120px)] pb-[clamp(24px,5vw,60px)]">
        <div className="max-w-[1180px] mx-auto">
          <Reveal>
            <div className="font-avst-mono text-[10px] sm:text-[.66rem] tracking-[0.18em] uppercase text-avst-ink-3 mb-5">
              The Making Of &middot; Aa Vesavi Selavulu Tarvata
            </div>
          </Reveal>
          <Reveal>
            <h1 className="font-avst-display font-semibold text-[clamp(2rem,7vw,5rem)] leading-[0.98] tracking-[-0.025em] max-w-[16ch] mb-6">
              How we built the first Tanglish AI comic
            </h1>
          </Reveal>
          <Reveal>
            <p className="text-[clamp(1.05rem,2vw,1.35rem)] leading-[1.55] max-w-[60ch] text-avst-ink-2">
              A decade ago one of us told his sister he wanted to be a cinematographer. She said
              that wasn&apos;t a profession. What we were really chasing was the thing you feel but
              can&apos;t measure — <b className="font-semibold text-avst-ink">vision and direction</b>.
              We became designers instead. Same instinct, different tools. When AI made it possible
              to <em className="italic text-avst-accent">project</em> ideas instead of only
              describing them, we jumped in.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-[clamp(16px,4vw,64px)] pb-[clamp(48px,8vw,120px)]">
        <div className="max-w-[1180px] mx-auto">
          {CHAPTERS.map((c) => (
            <Reveal key={c.n}>
              <div className="grid grid-cols-1 md:grid-cols-[0.9fr_1.4fr] gap-6 md:gap-14 py-9 md:py-14 border-t border-avst-line">
                <div>
                  <div className="font-avst-mono text-[.7rem] tracking-[0.2em] text-avst-accent mb-3">{c.n}</div>
                  <h2 className="font-avst-display font-semibold text-[clamp(1.3rem,3vw,2.2rem)] leading-tight tracking-tight">
                    {c.h}
                  </h2>
                </div>
                <div>
                  {c.body.map((p, i) => (
                    <p key={i} className="mb-4 leading-relaxed text-avst-ink-2">{p}</p>
                  ))}
                  {c.aside && (
                    <p className="font-avst-mono text-[.72rem] leading-relaxed tracking-wide text-avst-ink-3 border-l-2 border-avst-accent pl-4 mt-2">
                      {c.aside}
                    </p>
                  )}
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal>
            <div className="py-9 md:py-14 border-t border-avst-line">
              <div className="font-avst-mono text-[.7rem] tracking-[0.2em] text-avst-accent mb-3">The tool chain</div>
              <div className="overflow-x-auto -mx-[clamp(16px,4vw,64px)] px-[clamp(16px,4vw,64px)]">
                <table className="w-full border-collapse text-sm min-w-[480px]">
                  <thead>
                    <tr>
                      <th className="text-left font-avst-mono text-[10px] tracking-[.14em] uppercase text-avst-ink-3 font-normal py-3 border-b border-avst-line">Tool</th>
                      <th className="text-left font-avst-mono text-[10px] tracking-[.14em] uppercase text-avst-ink-3 font-normal py-3 border-b border-avst-line">What it did — and its catch</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TOOLS.map((t) => (
                      <tr key={t.tool}>
                        <td className="font-avst-display font-semibold whitespace-nowrap pr-6 py-3 border-b border-avst-line align-top">{t.tool}</td>
                        <td className="py-3 border-b border-avst-line align-top text-avst-ink-2">{t.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-[clamp(16px,4vw,64px)] py-[clamp(32px,6vw,72px)] border-t border-avst-line bg-avst-paper-2">
        <div className="max-w-[1180px] mx-auto">
          <Reveal>
            <div className="font-avst-mono text-[.66rem] tracking-[0.18em] uppercase text-avst-ink-3 mb-3">What actually helped</div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
            {CHECKLIST.map((item) => {
              const [bold, ...rest] = item.split(". ");
              return (
                <Reveal key={item}>
                  <div className="flex items-start gap-3">
                    <span
                      className="mt-1 flex-none w-[18px] h-[18px] rounded-full bg-avst-accent"
                      style={{
                        WebkitMaskImage:
                          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='m5 13 4 4L19 7' fill='none' stroke='white' stroke-width='2.5'/%3E%3C/svg%3E\")",
                        WebkitMaskSize: "14px",
                        WebkitMaskRepeat: "no-repeat",
                        WebkitMaskPosition: "center",
                        maskImage:
                          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='m5 13 4 4L19 7' fill='none' stroke='white' stroke-width='2.5'/%3E%3C/svg%3E\")",
                        maskSize: "14px",
                        maskRepeat: "no-repeat",
                        maskPosition: "center",
                      }}
                    />
                    <p className="text-avst-ink-2 leading-snug">
                      <b className="text-avst-ink font-semibold">{bold}.</b> {rest.join(". ")}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-[clamp(16px,4vw,64px)] py-[clamp(48px,10vw,120px)] bg-avst-night text-avst-lime">
        <div className="max-w-[900px] mx-auto">
          <Reveal>
            <div className="font-avst-mono text-[.66rem] tracking-[0.18em] uppercase text-avst-lime-2 mb-5">The honest conclusion</div>
          </Reveal>
          <Reveal>
            <blockquote className="font-avst-display font-semibold text-[clamp(1.5rem,5vw,2.8rem)] leading-[1.12] tracking-tight text-white">
              AI does a lot that used to take forever. You still burn the time —{" "}
              <em className="italic font-normal gradient-text-avst">it just moves to prompting and generating.</em>
            </blockquote>
          </Reveal>
          <Reveal>
            <p className="mt-6 text-avst-lime-2 max-w-[60ch] leading-relaxed">
              With real hands-on skills you&apos;d see progress in real time and could quote a hard
              timeline. Here you burn and burn for a few drops. We came away with huge respect for
              the pencillists who did all of this by hand, one panel at a time.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-avst-line">
        <a href="/avst" data-cursor="read" className="block p-[clamp(24px,4vw,52px)] border-b sm:border-b-0 sm:border-r border-avst-line hover:bg-avst-paper-2 transition">
          <span className="font-avst-mono text-[10px] tracking-[.18em] uppercase text-avst-ink-3">Read it</span>
          <div className="font-avst-display font-semibold text-[clamp(1.2rem,2.4vw,1.8rem)] mt-2">Open the pilot &rarr;</div>
        </a>
        <Link href="/avst/books" data-cursor="open" className="block p-[clamp(24px,4vw,52px)] hover:bg-avst-paper-2 transition">
          <span className="font-avst-mono text-[10px] tracking-[.18em] uppercase text-avst-ink-3">The whole season</span>
          <div className="font-avst-display font-semibold text-[clamp(1.2rem,2.4vw,1.8rem)] mt-2">See all thirteen &rarr;</div>
        </Link>
      </div>

      <footer className="px-[clamp(16px,4vw,64px)] py-8 bg-avst-night text-avst-lime">
        <div className="max-w-[1180px] mx-auto flex flex-wrap justify-between gap-3 font-avst-mono text-[10px] tracking-wide">
          <span>Supranos &middot; Aa Vesavi Selavulu Tarvata</span>
          <Link href="/avst" className="text-avst-lime-2 hover:text-avst-accent-soft transition">Back to the pilot &rarr;</Link>
        </div>
      </footer>
    </main>
  );
}
