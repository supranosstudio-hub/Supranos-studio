import type { Metadata } from "next";
import AvstNav from "@/components/avst/AvstNav";

export const metadata: Metadata = {
  title: "Aa Vesavi Selavulu Tarvata — Supranos",
  description:
    "AVST (Aa Vesavi Selavulu Tarvata) — an AI-generated Tanglish slice-of-life sitcom, by Supranos.",
};

export default function AvstLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-avst-paper text-avst-ink font-avst-body min-h-dvh">
      <AvstNav />
      {children}
    </div>
  );
}
