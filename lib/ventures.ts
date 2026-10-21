export interface Venture {
  n: string;
  name: string;
  blurb: string;
  cat: string;
  href: string;
  cursor: string;
}

export const VENTURES: Venture[] = [
  { n: "01", name: "umedia", blurb: "a media project.", cat: "media", href: "#", cursor: "soon" },
  { n: "02", name: "thindam", blurb: "food, in the making.", cat: "food", href: "#", cursor: "soon" },
  {
    n: "03",
    name: "avst",
    blurb: "an ai-generated sitcom set in hyderabad.",
    cat: "sitcom",
    href: "/avst",
    cursor: "read",
  },
  { n: "04", name: "blurr", blurb: "a phygital vault for the bottles from every night out.", cat: "vault", href: "#", cursor: "soon" },
  { n: "05", name: "rituuuals", blurb: "ritual over convenience.", cat: "ritual", href: "#", cursor: "soon" },
  { n: "06", name: "ev report", blurb: "a report on electric mobility.", cat: "mobility", href: "#", cursor: "soon" },
];
