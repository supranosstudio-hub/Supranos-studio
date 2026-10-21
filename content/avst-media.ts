// Auto-extracted from the original AVST reader prototype.
// Edit this file directly to change season content — no backend involved.

export const AVST_COVERS: Record<number, string> = {
  1: "/images/avst/img019.jpg",
  2: "/images/avst/img020.jpg",
  3: "/images/avst/img021.jpg",
  4: "/images/avst/img022.jpg",
  5: "/images/avst/img023.jpg",
  6: "/images/avst/img024.jpg",
  7: "/images/avst/img025.jpg",
  8: "/images/avst/img026.jpg",
  9: "/images/avst/img027.jpg",
  10: "/images/avst/img028.jpg",
  11: "/images/avst/img029.jpg",
  12: "/images/avst/img030.jpg",
  13: "/images/avst/img031.jpg",
};

export interface ChibiSet { ci: number; name: string; role: string; px: string[]; src: string }

export const AVST_CHIBI: ChibiSet[] = [
  { ci: 0, name: "Anudeep", role: "The one who is leaving",
    px: [
      "/images/avst/img033.png",
      "/images/avst/img034.png",
      "/images/avst/img035.png",
    ],
    src: "/images/avst/img036.png" },
  { ci: 1, name: "Suraj", role: "The one who fills the room",
    px: [
      "/images/avst/img037.png",
      "/images/avst/img038.png",
      "/images/avst/img039.png",
    ],
    src: "/images/avst/img040.png" },
  { ci: 2, name: "Kicha", role: "The one holding the camera",
    px: [
      "/images/avst/img041.png",
      "/images/avst/img042.png",
      "/images/avst/img043.png",
    ],
    src: "/images/avst/img044.png" },
  { ci: 3, name: "Aishwarya", role: "Comes over the railing",
    px: [
      "/images/avst/img045.png",
      "/images/avst/img046.png",
      "/images/avst/img047.png",
    ],
    src: "/images/avst/img048.png" },
  { ci: 4, name: "Jay", role: "The one who stays",
    px: [
      "/images/avst/img049.png",
      "/images/avst/img050.png",
      "/images/avst/img051.png",
    ],
    src: "/images/avst/img052.png" },
];

export interface GalleryItem { k: string; t: string; c: string; w: number; h: number; src: string }

export const AVST_GALLERY: GalleryItem[] = [
  { k: "altar", t: "The morning after", c: "Nobody says the prayer out loud.", w: 880, h: 733, src: "/images/avst/img053.jpg" },
  { k: "up1", t: "The colony at night", c: "Eleven floors, four of them still awake.", w: 880, h: 454, src: "/images/avst/img054.jpg" },
  { k: "up2", t: "What he sees", c: "The city, reflected, going past.", w: 880, h: 454, src: "/images/avst/img055.jpg" },
  { k: "up3", t: "The last train", c: "The one he keeps not taking.", w: 880, h: 454, src: "/images/avst/img056.jpg" },
  { k: "up4", t: "The front room", c: "Where the plan gets argued about.", w: 880, h: 454, src: "/images/avst/img057.jpg" },
  { k: "up5", t: "Kosmo Kopi Tiam", c: "Three shops under one iron shade.", w: 880, h: 454, src: "/images/avst/img058.jpg" },
  { k: "up6", t: "The kitchen, 1 a.m.", c: "Somebody is always awake.", w: 880, h: 454, src: "/images/avst/img059.jpg" },
  { k: "up7", t: "Intlo dheyyam", c: "A cat, a neighbour, and a man with a torch.", w: 880, h: 454, src: "/images/avst/img060.jpg" },
  { k: "up0", t: "The five of them", c: "Before anybody left.", w: 880, h: 454, src: "/images/avst/img061.jpg" },
];

