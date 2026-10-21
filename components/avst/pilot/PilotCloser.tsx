import { CLOSER_LINE } from "@/content/avst-extra";

export default function PilotCloser() {
  return (
    <section aria-label="Closing" className="px-[clamp(16px,4vw,64px)] py-[clamp(96px,18vw,240px)] text-center">
      <p className="mx-auto max-w-[18ch] font-avst-display text-[clamp(2rem,6.2vw,5.4rem)] font-normal uppercase leading-[0.98] tracking-tight text-avst-ink-2 sm:max-w-[20ch]">
        {CLOSER_LINE.pre}
        <em className="font-medium normal-case text-avst-accent">{CLOSER_LINE.em}</em>
        <br />
        {CLOSER_LINE.post.trim()}
      </p>
      <p className="mt-10 font-avst-mono text-[11px] uppercase tracking-[0.2em] text-avst-ink">{CLOSER_LINE.attr}</p>
    </section>
  );
}
