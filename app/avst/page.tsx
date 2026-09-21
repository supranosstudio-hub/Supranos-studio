import Reveal from "@/components/Reveal";
import WordIntro from "@/components/avst/WordIntro";
import EpisodesSection from "@/components/avst/EpisodesSection";
import GallerySection from "@/components/avst/GallerySection";
import CastSection from "@/components/avst/CastSection";
import PlacesSection from "@/components/avst/PlacesSection";
import DnaSection from "@/components/avst/DnaSection";
import AvstFooter from "@/components/avst/AvstFooter";
import { SHOW } from "@/content/avst";

export default function AvstPage() {
  return (
    <>
      <WordIntro />
      <main id="main">
        {/* verbatim SHOW data, standing in for the shelf readout intro */}
        <section className="px-[clamp(16px,4vw,64px)] pt-[clamp(40px,7vw,90px)] pb-[clamp(20px,4vw,40px)]">
          <div className="max-w-[1180px] mx-auto">
            <Reveal>
              <div className="font-avst-mono text-[10px] sm:text-[.66rem] tracking-[0.18em] uppercase text-avst-ink-3 mb-5">
                {SHOW.season} · {SHOW.title}
              </div>
            </Reveal>
            <Reveal>
              <h1 className="font-avst-display font-semibold leading-[0.98] tracking-[-0.025em] max-w-[16ch] text-[clamp(2rem,9vw,5rem)] mb-6">
                {SHOW.titleEn}
              </h1>
            </Reveal>
            <Reveal>
              <p className="text-[clamp(1rem,3vw,1.35rem)] leading-[1.55] max-w-[60ch] text-avst-ink-2">
                {SHOW.logline}
              </p>
            </Reveal>
          </div>
        </section>

        <EpisodesSection />
        <GallerySection />
        <CastSection />
        <PlacesSection />
        <DnaSection />
      </main>
      <AvstFooter />
    </>
  );
}
