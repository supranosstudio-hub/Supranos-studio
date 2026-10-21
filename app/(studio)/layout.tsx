import type { Metadata, Viewport } from "next";
import StudioHeader from "@/components/studio/StudioHeader";
import { STUDIO_TITLE } from "@/content/studio";
import "./studio.css";

const DESCRIPTION =
  "Supranos is an independent studio. Six projects, one sticker each: thindam, AVST, blurr, rituaals, sticker by supranos and the not so okay club.";

export const metadata: Metadata = {
  title: STUDIO_TITLE,
  description: DESCRIPTION,
  openGraph: { type: "website", title: STUDIO_TITLE, description: DESCRIPTION },
};

export const viewport: Viewport = { themeColor: "#92B5F2" };

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="sup js">
      <StudioHeader />
      <main>{children}</main>
      <footer className="foot">
        <span>&copy; 2026 Supranos</span>
        <nav aria-label="Elsewhere" />
      </footer>
    </div>
  );
}
