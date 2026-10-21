import Script from "next/script";

/** Google Analytics 4 measurement ID. Override per environment with NEXT_PUBLIC_GA_ID. */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-41S5YLJEZL";

/**
 * Google tag (gtag.js), loaded once from the root layout so every route
 * (studio board, project pages, About and all /avst pages) is tracked.
 * Client-side route changes are picked up by GA4's built-in history tracking.
 */
export default function GoogleAnalytics() {
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-41S5YLJEZL');`}
      </Script>
    </>
  );
}
