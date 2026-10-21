import type { Metadata } from "next";
import WordIntro from "@/components/avst/WordIntro";
import PilotBuilt from "@/components/avst/pilot/PilotBuilt";
import PilotCast from "@/components/avst/pilot/PilotCast";
import PilotChrome from "@/components/avst/pilot/PilotChrome";
import PilotCloser from "@/components/avst/pilot/PilotCloser";
import PilotCoffee from "@/components/avst/pilot/PilotCoffee";
import PilotFooter from "@/components/avst/pilot/PilotFooter";
import PilotHeader from "@/components/avst/pilot/PilotHeader";
import PilotHero from "@/components/avst/pilot/PilotHero";
import PilotPlaces from "@/components/avst/pilot/PilotPlaces";
import PilotPosters from "@/components/avst/pilot/PilotPosters";
import PilotSlices from "@/components/avst/pilot/PilotSlices";
import PilotTeaser from "@/components/avst/pilot/PilotTeaser";
import PilotWall from "@/components/avst/pilot/PilotWall";

export const metadata: Metadata = {
  title: "Aa Vesavi Selavulu Tarvata — The Pilot",
  description: "A thirteen-episode Hyderabad sitcom webcomic. Five people, two houses, forty days. Read the pilot.",
};

export default function AvstPage() {
  return (
    <div id="top" className="avst-pearl relative bg-avst-paper text-avst-ink">
      <WordIntro />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[2000] focus:bg-avst-ink focus:px-3 focus:py-2 focus:text-avst-paper"
      >
        Skip to content
      </a>
      <PilotChrome />
      <PilotHeader />
      <main id="main">
        <PilotHero />
        <PilotWall />
        <PilotSlices />
        <PilotPosters />
        <PilotCast />
        <PilotPlaces />
        <PilotBuilt />
        <PilotTeaser />
        <PilotCoffee />
        <PilotCloser />
      </main>
      <PilotFooter />
    </div>
  );
}
