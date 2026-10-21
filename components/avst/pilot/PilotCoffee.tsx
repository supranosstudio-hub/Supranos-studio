import { COFFEE } from "@/content/avst-pilot";

const BUBBLE = "rounded-3xl bg-white/[0.07] px-5 py-3.5 font-avst-body text-[clamp(1rem,1.5vw,1.25rem)] text-white/90";

function Avatar() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={COFFEE.avatar} alt="" loading="lazy" className="size-14 shrink-0 rounded-full bg-white object-cover" />
  );
}

export default function PilotCoffee() {
  return (
    <section aria-label="Contact — let us have coffee" className="bg-avst-night px-[clamp(16px,4vw,64px)] pb-[clamp(56px,9vw,128px)] text-white">
      <div className="mx-auto max-w-[1180px]">
        <h2 className="font-avst-display text-[clamp(1.8rem,4vw,3rem)] font-semibold tracking-tight">{COFFEE.title}</h2>
        <div className="mt-8 max-w-[900px] space-y-4 rounded-[28px] border border-white/12 bg-white/[0.03] p-[clamp(16px,3vw,40px)]">
          {COFFEE.lines.map((l) => (
            <div key={l} className="flex items-end gap-3">
              <Avatar />
              <p className={BUBBLE}>{l}</p>
            </div>
          ))}
          <div className="flex items-end gap-3">
            <Avatar />
            <p className={BUBBLE}>
              {COFFEE.emailLead}
              <a href={COFFEE.mailto} className="text-avst-accent-soft underline-offset-4 hover:underline">
                {COFFEE.email}
              </a>
            </p>
            <a
              href={COFFEE.mailto}
              aria-label="Email us"
              className="grid size-14 shrink-0 place-items-center rounded-full border border-white/20 transition hover:bg-white/10"
            >
              <svg viewBox="0 0 24 24" className="size-5 fill-none stroke-current" strokeWidth={1.6} aria-hidden="true">
                <path d="M4 6h16v12H4z" />
                <path d="m4 7 8 6 8-6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
