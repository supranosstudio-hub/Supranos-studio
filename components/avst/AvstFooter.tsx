import { FOOTER } from "@/content/avst-extra";

export default function AvstFooter() {
  return (
    <footer className="bg-avst-night text-avst-paper">
      <div className="max-w-[1560px] mx-auto px-[clamp(18px,4.2vw,72px)] py-16">
        <div className="grid sm:grid-cols-3 gap-10 pb-10 border-b border-white/15">
          <div>
            <p className="font-avst-display font-medium text-[1.4rem] leading-[1.15] whitespace-pre-line">
              {FOOTER.mark}
            </p>
            <p className="font-avst-mono text-[10px] tracking-[0.1em] uppercase text-white/50 mt-3">
              {FOOTER.markNote}
            </p>
          </div>
          <div>
            <h4 className="font-avst-mono text-[10px] tracking-[0.14em] uppercase text-white/50 mb-3">Season One</h4>
            <ul className="space-y-2">
              {FOOTER.seasonLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-white/80 hover:text-white text-[.92rem]">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-avst-mono text-[10px] tracking-[0.14em] uppercase text-white/50 mb-3">Made by</h4>
            <ul className="space-y-2 text-white/80 text-[.92rem]">
              <li>
                Written &amp; directed by
                <br />
                Supranos
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 pt-6">
          <span className="font-avst-mono text-[10px] tracking-[0.1em] uppercase text-white/50">
            © {new Date().getFullYear()} — All artwork and scripts
          </span>
          <span className="font-avst-mono text-[10px] tracking-[0.1em] uppercase text-white/50">
            Hyderabad · Forty days
          </span>
        </div>
      </div>
    </footer>
  );
}
