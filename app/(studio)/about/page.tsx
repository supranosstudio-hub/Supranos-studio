import type { Metadata } from "next";
import AboutContent from "@/components/studio/AboutContent";
import { STUDIO_TITLE } from "@/content/studio";

export const metadata: Metadata = { title: `About · ${STUDIO_TITLE}` };

export default function AboutPage() {
  return <AboutContent />;
}
