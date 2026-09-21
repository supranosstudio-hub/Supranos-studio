// Extra AVST content extracted from the "#mmport" section of the original
// avst-pilot-process-5_2.html reader — this is the block that actually
// renders for Places / The Work (DNA) / Closer / Footer on the live page.

export interface FlatPlace {
  img: string;
  title: string;
  size: "wide" | "half" | "third";
  cap: string;
}

export const FLAT_PLACES: FlatPlace[] = [
  {
    img: "/images/avst/img078.jpg",
    title: "The two houses",
    size: "wide",
    cap: "Two slabs, one staircase that stops at the first floor, and a mumty on the roof. The entire geography of the season fits in one elevation.",
  },
  {
    img: "/images/avst/img079.jpg",
    title: "Boys HQ — the hall",
    size: "half",
    cap: "Nine named camera setups. Suraj sits left of the sofa, Kicha right. Fixed, all season.",
  },
  {
    img: "/images/avst/img080.jpg",
    title: "The balconies",
    size: "half",
    cap: "Aishwarya's crossing. She has never once used the stairs and nobody has ever asked her to.",
  },
  {
    img: "/images/avst/img081.jpg",
    title: "Anudeep's room",
    size: "third",
    cap: "A mattress that was going to be temporary.",
  },
  {
    img: "/images/avst/img082.jpg",
    title: "Suraj & Kicha's room",
    size: "third",
    cap: "One brain cell, two beds, zero follow-through.",
  },
  {
    img: "/images/avst/img083.jpg",
    title: "Upstairs — Jay's",
    size: "third",
    cap: "Where the ghost lives. Rent-free, and alone, and awake at the wrong hours.",
  },
  {
    img: "/images/avst/img084.jpg",
    title: "Kosmo Kopi Tiam — inside",
    size: "half",
    cap: "The bench order is canon. So is the tab, and the pickle tumbler nobody moves.",
  },
  {
    img: "/images/avst/img085.jpg",
    title: "Kosmo Kopi Tiam — outside",
    size: "half",
    cap: "An L-shaped complex, shade in the afternoon, and every argument the flat has ever finished.",
  },
];

export const DNA_COLUMNS = [
  {
    h: "The rule",
    body: [
      "Every episode permanently reveals one small new thing about a character, while temporarily creating one new problem.",
      "The permanent reveal makes the characters grow. The temporary problem keeps the premise intact. No episode is a pure gag reel.",
    ],
    quote:
      "Every episode permanently reveals one small new thing about a character, while temporarily creating one new problem.",
    tail: "The bookend rule: an episode gets a cold open or an end gag. Never both. Post-credit stingers run three to five panels and are never a joke — because there is never a joke after a feeling.",
  },
  {
    h: "The look",
    body: [
      "Watercolour-manga on cream paper. Single-pass washes, muted warm earth palette, loose hand-drawn linework with visible pen wobble, small restrained eyes, and generous negative space kept clear for lettering.",
      "Anchored to Hirayasumi. A second, flatter lo-fi register — thick uniform outlines, solid fills, grain — carries the wordless emotional beats.",
      "Ten locked character sheets. Twelve locked environment plates. Nothing is generated without both attached; drift is the default failure mode.",
    ],
  },
  {
    h: "The shape",
    body: [
      "64 story panels. 16 pages, four to a page. Cold opens run five panels, end gags four to five, stingers four — all outside the count.",
      "Three movements across forty days: Friction (01–04), Synergy (05–08), and The Ending, Arriving Slowly (09–13). From Episode 9 the season runs cold-open only, and the reader should feel the rhythm change without being told.",
      "The hidden spine: Kicha has been filming all of it since week one. The series title is the title of his film.",
    ],
  },
];

export const REFRAIN_TEXT =
  "“Idi temporary. 2 years anthe.” — He says it with full conviction in Episode 1, flatly to a mop in Episode 2, and in anger in Episode 3. Then less. Then as a question. Then somebody else says it for him. By the finale he does not say it at all, and nobody notices — because the only person who could have is the one who stopped saying it. The disappearance of the line is the whole season.";

export const REFRAIN_LEGEND = [
  "01 — Full conviction",
  "04 — First omission",
  "08 — Said by somebody else",
  "11 — Retired",
  "13 — Never said",
];

export const CLOSER_LINE = {
  pre: "“This is temporary,” he kept saying — ",
  em: "until he stopped.",
  post: " out loud.",
  attr: "Season One · Thirteen episodes · In production",
};

export const FOOTER = {
  mark: "Aa Vesavi\nSelavulu Tarvata",
  markNote: "Days after my last summer holidays",
  seasonLinks: [
    { label: "All thirteen episodes", href: "#home" },
    { label: "Read Episode One", href: "#/ep/1" },
    { label: "Cast & model sheets", href: "#cast" },
    { label: "Environment plates", href: "#places" },
    { label: "How it is built", href: "#dna" },
  ],
  madeBy: [
    { text: "Written & directed by", sub: "Supranos" },
  ],
};
