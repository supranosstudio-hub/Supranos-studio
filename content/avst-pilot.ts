// Copy and asset lists for the /avst pilot landing page.
// Characters, places and the DNA columns live in avst.ts / avst-extra.ts.

const img = (n: string) => `/images/avst/img${n}.jpg`;

export const PILOT_HERO = {
  eyebrow: "The Pilot · Week 1 · Day 1",
  te: "Intlo Dheyyam, Naaku Em Bhayyam",
  en: "The Pilot",
  log: "Anudeep lands in the city thrilled, is quietly deflated by the sleepy colony he is actually moving into, and survives one long night — this sets the tone for what is about to come.",
  hint: "Click the book to read the pilot",
  cover: img("032"),
};

export const PILOT_CTA = {
  kicker: "Made with AI · by hand",
  title: "Want to build your own comic?",
  em: "Steal our workflow",
  arrow: "How we built it",
};

/** Nine pilot pages, read as five spreads. */
export const PILOT_PAGES = ["062", "063", "064", "065", "066", "067", "068", "069", "070"].map(img);

export type WallTile =
  | { kind: "art"; w: number; h: number; src: string; title: string; cap: string }
  | { kind: "card"; w: number; h: number; k: string; body: string; em?: string; tail?: string; note?: string }
  | { kind: "stat"; value: string; label: string }
  | { kind: "cta"; w: number; h: number }
  | { kind: "marquee" };

export const WALL_TILES: WallTile[] = [
  { kind: "art", w: 3, h: 4, src: img("092"), title: "Vellostha!", cap: "Vol. 01 — the pilot" },
  { kind: "art", w: 3, h: 3, src: img("032"), title: "Vellostha", cap: "The poster. Everyone walking somewhere, nobody together." },
  { kind: "card", w: 2, h: 2, k: "The thesis", body: "Everyone is fine after he leaves. ", em: "That is the moving part." },
  { kind: "art", w: 3, h: 2, src: img("072"), title: "Pray for visa", cap: "Three of them, one folder, and a lamp." },
  { kind: "stat", value: "01", label: "Episode" },
  { kind: "art", w: 2, h: 2, src: img("073"), title: "Emaina parledu", cap: "The chai stall. He checks the watch; she does not." },
  { kind: "stat", value: "64", label: "Panels" },
  { kind: "marquee" },
  { kind: "art", w: 3, h: 2, src: img("074"), title: "Vellostha!", cap: "Nobody is thinking about the departure." },
  { kind: "card", w: 2, h: 2, k: "The season", body: "Five people share two houses and one balcony crossing for forty days. One of them is leaving. The season is the forty days." },
  { kind: "art", w: 3, h: 2, src: img("075"), title: "The last day", cap: "Day forty. The escalator is silent." },
  { kind: "art", w: 2, h: 2, src: img("076"), title: "~Sigh", cap: "Jay, on the roof, at the wrong hour." },
  { kind: "cta", w: 2, h: 2 },
  { kind: "art", w: 2, h: 2, src: img("077"), title: "Aish & Bujji", cap: "The cat picks the lap." },
  { kind: "stat", value: "40", label: "Days" },
  { kind: "stat", value: "~$80", label: "Total spent" },
  { kind: "card", w: 3, h: 1, k: "The whole experiment", body: "Thirteen episodes’ worth of pipeline, characters, environments and generations — built for ", em: "about eighty dollars", tail: " in tool credits." },
  { kind: "card", w: 2, h: 2, k: "The refrain", body: "“Idi temporary. 2 years anthe.”", note: "Said with conviction in episode one." },
  { kind: "art", w: 3, h: 3, src: img("086"), title: "The huddle", cap: "Five heads over the camera. The whole cast in one frame." },
  { kind: "art", w: 3, h: 2, src: img("087"), title: "Pani puri", cap: "Charminar behind, Muddamma serving. Nobody counting plates." },
  { kind: "art", w: 2, h: 3, src: img("088"), title: "Why god, why?!", cap: "The dropped cone. The purest tragedy in the season." },
  { kind: "card", w: 3, h: 2, k: "Finding home", body: "Everyone in the flat is chasing a different version of home — ", em: "future, peace, family, belonging, recognition.", tail: " The ghost is just the hook." },
  { kind: "card", w: 3, h: 2, k: "The spine", body: "Anudeep swears the city is temporary. Two years, then he’s gone. Life keeps happening anyway — and every episode chips at the belief." },
  { kind: "card", w: 3, h: 2, k: "The refrain", body: "“Idi temporary. 2 years anthe.” He says it less and less. ", em: "By the finale he doesn’t say it at all." },
];

export const SLICES = {
  kicker: "Between the plot",
  title: "Slices of an ordinary life",
  sub: "The season isn’t built on twists. It’s built on small days — wings, cats, dropped cones, a roommate you wake at your peril.",
  tap: "Tap any panel to read it.",
  cards: [
    { src: img("098"), alt: "Gone in a snap" },
    { src: img("099"), alt: "The icebreaker" },
    { src: img("100"), alt: "Why god, why?!" },
    { src: img("101"), alt: "Aish & Bujji" },
    { src: img("073"), alt: "Emaina parledu" },
    { src: img("076"), alt: "~Sigh" },
    { src: img("087"), alt: "One more plate" },
  ],
};

export const POSTERS = {
  kicker: "The wall of posters",
  title: "Every cover, one place",
  hint: "Scroll sideways →",
  items: [
    { src: img("092"), alt: "Vellostha poster — Look up" },
    { src: img("096"), alt: "Vellostha poster — The ensemble" },
    { src: img("095"), alt: "Vellostha poster — Three panels" },
    { src: img("094"), alt: "Vellostha poster — Vol. 01" },
    { src: img("097"), alt: "Vellostha poster — The makers" },
  ],
};

export const TEASER = {
  poster: img("090"),
  /** Set once the teaser file is added to /public/video — until then the poster shows. */
  video: undefined as string | undefined,
  title: "Vellostha!",
  em: "the comic release teaser",
  kicker: "A Supranos Production · Vol. 01",
};

export const COFFEE = {
  title: "Tell us your thoughts",
  avatar: img("091"),
  lines: ["Read the whole thing? Tell us what you thought."],
  emailLead: "Email us at: ",
  email: "hello@supranos.studio",
  mailto: "mailto:hello@supranos.studio?subject=Vellostha%20%E2%80%94%20thoughts%20on%20the%20pilot",
};

export const FILM = {
  poster: img("089"),
  video: "/video/footer.mp4",
  line: "Everyone was searching for a different home. He just kept the camera running — ",
  em: "so none of it would be lost.",
  tag: "kicha_cam_01 · 00:05:04",
};

export const MASCOT_LINES = [
  "Idi temporary.",
  "2 years anthe.",
  "Ee okka chotu.",
  "Emaina parledu.",
  "Nuvu repu vasta anavu kada.",
];

export const NAV_LINKS = [
  { href: "#stage", label: "Read" },
  { href: "#cast", label: "Cast" },
  { href: "/avst/about", label: "About" },
];

export const FOOTER_LINKS = [
  { label: "All thirteen episodes", href: "/avst/books" },
  { label: "Read Episode One", href: "#stage" },
  { label: "Cast & model sheets", href: "#cast" },
  { label: "Environment plates", href: "#places" },
  { label: "How it is built", href: "#built" },
];
