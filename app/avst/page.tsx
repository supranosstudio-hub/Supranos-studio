import "./avst-legacy.css";
import WordIntro from "@/components/avst/WordIntro";
import EpisodesSection from "@/components/avst/EpisodesSection";
import GallerySection from "@/components/avst/GallerySection";
import CastSection from "@/components/avst/CastSection";
import PlacesSection from "@/components/avst/PlacesSection";
import DnaSection from "@/components/avst/DnaSection";
import AvstFooter from "@/components/avst/AvstFooter";

export default function AvstPage() {
  return (
    <div className="avst-legacy">
      <WordIntro />
      <a className="skip" href="#home">
        Skip to content
      </a>
      <main id="main">
        <EpisodesSection />
        <GallerySection />
        <CastSection />
      </main>
      <div id="mmport">
        <main>
          <PlacesSection />
          <DnaSection />
        </main>
        <AvstFooter />
      </div>
    </div>
  );
}
