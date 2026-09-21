import type { Metadata } from "next";

// Self-hosted fonts (via @fontsource, bundled at build time — no runtime
// fetch to Google Fonts or any external CDN, so this keeps working even
// on networks that block font/CDN hosts).
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "@fontsource/space-mono/400.css";
import "@fontsource/space-mono/700.css";
import "@fontsource/bricolage-grotesque/400.css";
import "@fontsource/bricolage-grotesque/500.css";
import "@fontsource/bricolage-grotesque/600.css";
import "@fontsource/bricolage-grotesque/800.css";
import "@fontsource/newsreader/400.css";
import "@fontsource/newsreader/400-italic.css";
import "@fontsource/newsreader/500.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";

import "./globals.css";
import Cursor from "@/components/Cursor";

export const metadata: Metadata = {
  title: "supranos — independent studio",
  description:
    "Supranos is an independent studio. Six ongoing experiments, designed, built and shipped in public from Doha.",
  metadataBase: new URL("https://supranos.studio"),
  openGraph: {
    title: "supranos",
    description: "An independent studio. Six ongoing experiments, built in public from Doha.",
    type: "website",
    url: "https://supranos.studio/",
  },
  twitter: {
    card: "summary_large_image",
    title: "supranos",
    description: "An independent studio, building in public from Doha.",
  },
  icons: {
    icon:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%2317150F'/%3E%3Ctext x='6.5' y='23' font-family='monospace' font-size='18' fill='%23F4F1EA'%3Es%3C/text%3E%3Ccircle cx='22' cy='21' r='2.3' fill='%232436E6'/%3E%3C/svg%3E",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh antialiased overflow-x-hidden">
        <Cursor />
        {children}
      </body>
    </html>
  );
}
