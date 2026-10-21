import StickerView from "@/components/studio/StickerView";
import { STUDIO_PROJECTS } from "@/content/studio";

export default function StudioHome() {
  return (
    <section className="view board" aria-label="Projects">
      {STUDIO_PROJECTS.map((p) => (
        <div className="cell" key={p.key}>
          <StickerView project={p} placement />
        </div>
      ))}
    </section>
  );
}
