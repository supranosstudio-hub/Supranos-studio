// Content for the supranos studio landing (/), project pages and About.
// The short lines, roles and About copy come from the studio design.
// The longer project descriptions are first-draft copy — edit freely.

export interface StudioProject {
  key: string;
  slug: string;
  name: string;
  path: string;
  line: string;
  /** External link for the CTA. Empty → "Link coming soon". */
  url: string;
  /** Extra external links shown beside the CTA (socials etc.). */
  links?: { label: string; url: string }[];
  /** In-site destination for the CTA (AVST lives at /avst). Used when there is no external url. */
  route?: string;
  rot: number;
  peel: number;
  spin: number;
  /** Board placement: offset (% of sticker) and optional tag position. */
  board: { dx: number; dy: number; tt?: string };
  about: string;
  facts: { k: string; v: string }[];
  points: string[];
}

export const STUDIO_PROJECTS: StudioProject[] = [
  {
    key: "thindam",
    slug: "thindam",
    name: "thindam",
    path: "./thindam",
    line: "A YouTube food channel.",
    url: "https://www.youtube.com/@Thindam",
    links: [
      { label: "Instagram", url: "https://www.instagram.com/thindamyt/" },
    ],
    rot: -6,
    peel: 45,
    spin: 4,
    board: { dx: -8, dy: 6 },
    about:
      "thindam is where the studio eats on camera: street food, home cooking and the places worth a detour, filmed the way friends would tell you about them over a plate.",
    facts: [
      { k: "Kind", v: "Video channel" },
      { k: "Where", v: "YouTube" },
      { k: "Made for", v: "People who plan trips around meals" },
    ],
    points: [
      "Honest first-bite reactions",
      "Places and recipes, not rankings",
      "Shot and edited in-house",
    ],
  },
  {
    key: "avst",
    slug: "avst",
    name: "AVST",
    path: "./avst",
    line: "A Tenglish AI comic.",
    url: "",
    route: "/avst",
    rot: 5,
    peel: 315,
    spin: -4,
    board: { dx: 6, dy: 14, tt: "72%" },
    about:
      "Aa Vesavi Selavulu Tarvata is a thirteen-episode sitcom webcomic set in Hyderabad: five people, two houses and one balcony crossing over forty days.",
    facts: [
      { k: "Kind", v: "Webcomic sitcom" },
      { k: "Season one", v: "13 episodes · 40 days" },
      { k: "Language", v: "Tenglish" },
    ],
    points: [
      "Made with AI, finished by hand",
      "Locked character sheets and environment plates",
      "Read the pilot online",
    ],
  },
  {
    key: "blurr",
    slug: "blurr",
    name: "blurr",
    path: "./blurr",
    line: "A phygital vault for your special drinking moments.",
    url: "",
    rot: 4,
    peel: 315,
    spin: 3,
    board: { dx: 12, dy: -4, tt: "68%" },
    about:
      "blurr keeps the nights that are easy to lose: a physical bottle or token paired with a private digital vault for the photos, notes and people behind a special pour.",
    facts: [
      { k: "Kind", v: "Phygital product" },
      { k: "Made for", v: "Celebrations, reunions and good bottles" },
      { k: "Privacy", v: "Private by default" },
    ],
    points: [
      "A physical object that opens a digital memory",
      "Add moments as the night happens",
      "Revisit them when the bottle is long empty",
    ],
  },
  {
    key: "rituaals",
    slug: "rituaals",
    name: "rituaals",
    path: "./rituaals",
    line: "Helps you organize a South Indian wedding.",
    url: "",
    rot: -3,
    peel: 135,
    spin: -3,
    board: { dx: -10, dy: 6 },
    about:
      "A South Indian wedding is a long list of ceremonies, people and muhurtams. rituaals gives families one place to plan the rituals, the timings and who is responsible for what.",
    facts: [
      { k: "Kind", v: "Planning tool" },
      { k: "Made for", v: "Couples and the families behind them" },
      { k: "Focus", v: "Ceremonies, timings, responsibilities" },
    ],
    points: [
      "Ritual-by-ritual checklists",
      "Shared plans for both families",
      "Reminders keyed to auspicious timings",
    ],
  },
  {
    key: "stickers",
    slug: "stickerbysupranos",
    name: "sticker by supranos",
    path: "./stickerbysupranos",
    line: "Generate stickers and put them on your laptop.",
    url: "",
    rot: -5,
    peel: 45,
    spin: 4,
    board: { dx: -4, dy: 4 },
    about:
      "Describe something small and personal and get a die-cut sticker back, ready to print and stick on your laptop. The same sticker system runs this very page.",
    facts: [
      { k: "Kind", v: "Generator" },
      { k: "Output", v: "Die-cut sticker art" },
      { k: "Made for", v: "Laptop lids and notebooks" },
    ],
    points: [
      "From a sentence to a sticker",
      "Clean die-cut outlines",
      "Built from the same peel-and-shine system as this site",
    ],
  },
  {
    key: "notsookay",
    slug: "thenotsookayclub",
    name: "the not so okay club.",
    path: "./thenotsookayclub",
    line: "Where we talk about emotions, and how they resonate at different stages.",
    url: "",
    rot: 6,
    peel: 45,
    spin: -4,
    board: { dx: 8, dy: -2 },
    about:
      "A gentle space for the feelings that rarely get a name. The club looks at how the same emotion lands differently at different stages of life, and makes it easier to say out loud.",
    facts: [
      { k: "Kind", v: "Community and writing" },
      { k: "Made for", v: "Anyone who is not so okay today" },
      { k: "Tone", v: "Warm, plain-spoken" },
    ],
    points: [
      "Conversations over lectures",
      "Emotions through different life stages",
      "No fixing, just company",
    ],
  },
];

export const STUDIO_ROLES: { t: string; k?: string }[] = [
  { t: "Independent studio" },
  { t: "Food on YouTube", k: "thindam" },
  { t: "Tenglish AI comics", k: "avst" },
  { t: "A vault for nights out", k: "blurr" },
  { t: "South Indian weddings", k: "rituaals" },
  { t: "Stickers for your laptop", k: "stickers" },
  { t: "Talking about feelings", k: "notsookay" },
];

export const STUDIO_ABOUT = {
  whoTitle: "Who made this?",
  who: "We were a group of friends first. Then we turned into an independent studio for small obsessions, running ideas that hold sentimental value for us personally. We design, build and ship them for the public.",
  keepTitle: "How to keep it going",
  keep: "Use what we make. Tell a friend. Write to us when something lands. That’s what keeps it going.",
  chai: "Let’s have chai?",
  mail: "supranos.studio@gmail.com",
  socials: [
    { label: "Instagram", url: "" },
    { label: "LinkedIn", url: "" },
  ],
  sign: "Designed and built by seven friends.",
};

export const STUDIO_TITLE = "Supranos";

/** Every sticker opens its project page; the CTA on that page leads onward. */
export function projectHref(p: StudioProject): string {
  return `/projects/${p.slug}`;
}
