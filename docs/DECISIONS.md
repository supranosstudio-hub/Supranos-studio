# Decisions

- 2026-10-21 — `/avst` is a native rebuild of the pilot page (components in `components/avst/pilot/`, copy in `content/avst-pilot.ts`), replacing the old shelf design and the 2,600-line `avst-legacy.css`. Reason: one design system (Tailwind + tokens) instead of an embedded prototype stylesheet.
- 2026-10-21 — The landing's pearl palette is applied by re-pointing the `--avst-*` tokens inside `.avst-pearl` (globals.css), so `/avst/about|books|process` keep the cream palette.
- 2026-10-21 — The landing shows only the Telugu show title "Aa Vesavi Selavulu Tarvata"; English subtitles are not displayed.
- 2026-10-21 — Reader uses `react-pageflip` (Flip) plus a vertical Scroll mode over the 9 pilot pages.
- 2026-10-21 — `/` is the studio sticker board (route group `app/(studio)`), rebuilt from the Supranos design. Its stylesheet (`app/(studio)/studio.css`) is scoped under `.sup` so the sticker peel/holo/mask effects keep their exact CSS without leaking into other routes; behaviour lives in `lib/studio/` and `components/studio/`.
- 2026-10-21 — Sticker fold direction follows the cursor (alpha-scanned die-cut extents), not a fixed corner per sticker. AVST's sticker opens `/avst`; other projects open `/projects/[slug]`.
- 2026-10-21 — Removed the previous home page and its unused components (`MorphText`, `components/home/*`, `lib/ventures.ts`).
- 2026-10-21 — Google Analytics 4 (gtag.js) is loaded once from the root layout via `next/script` (`components/GoogleAnalytics.tsx`), covering all routes. Measurement ID defaults to the production ID and can be overridden with `NEXT_PUBLIC_GA_ID`.
