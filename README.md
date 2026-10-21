# Supranos Studio

The Supranos studio site, and the AVST (*Aa Vesavi Selavulu Tarvata*) sitcom
site, as one static Next.js app. No backend, no database, no paid services —
content lives in the repo and the whole thing exports to plain static files.

## Stack

- **Next.js (App Router) + TypeScript**, built with `output: "export"` — the
  `npm run build` output in `out/` is plain HTML/CSS/JS with no server
  required.
- **Tailwind CSS v4** for styling. Raw CSS is used only where Tailwind can't
  express something directly (keyframe animations, the CSS-variable design
  tokens, a couple of pseudo-element/mask tricks) — see `app/globals.css`.
- **Framer Motion** for scroll-reveal and page transitions.
- **Self-hosted fonts** via `@fontsource/*` packages (bundled at build time,
  no runtime call to Google Fonts or any CDN — this also means the site
  still builds on networks that block font CDNs).
- **next/image** in `unoptimized` mode (required for static export) — images
  are pre-sized real files under `public/images/`, not embedded base64.

## Structure

```
app/
  (studio)/                the supranos sticker board (/), /about, /projects/[slug]
  avst/                    the AVST sitcom section
    page.tsx               pilot / season landing
    process/page.tsx       "how we built it"
    about/page.tsx
    books/page.tsx
components/                shared + page-specific React components
content/avst.ts            episode, cast, places, rules, influences data
content/avst-media.ts      cover / chibi / gallery image manifests
content/studio.ts          studio board: projects, roles, About copy
content/avst-pilot.ts      copy + asset lists for the /avst pilot landing
components/avst/pilot/     the /avst landing sections (Tailwind, no legacy CSS)
public/video/footer.mp4    footer film loop (teaser.mp4 not added yet — poster shows)
lib/ventures.ts            the studio's venture list (home page)
public/images/avst/        AVST images (extracted from the original
                            prototype's inline base64 data)
public/legacy/              the original hand-built AVST reader prototype,
                            kept as a fallback / full-fidelity reference
legacy-static/              the previous plain-HTML site (pre-Next.js),
                            kept for history — not part of the live build
```

## Editing content

Season/character/place data is plain TypeScript in `content/avst.ts` and
`content/avst-media.ts` — edit those files directly, no CMS or database
involved. Images referenced there live under `public/images/avst/`.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # writes static files to ./out
```

## Deploying (free)

`out/` after `npm run build` is a plain static site. Any of these work at no
cost:

- **GitHub Pages** — push `out/` to a `gh-pages` branch (or use the
  `actions/deploy-pages` GitHub Action).
- **Netlify** / **Cloudflare Pages** — free tier, point the build command at
  `npm run build` and the publish directory at `out`.
- **Vercel free tier** — works with this repo as-is (Next.js static export
  deploys automatically); just don't add server-only features later without
  reconsidering `output: "export"`.

No database, no serverless functions, and no paid infrastructure are
required for anything currently in this repo.
