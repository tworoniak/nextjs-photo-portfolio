export type Service = {
  id: string;
  title: string;
  description: string;
  highlights: string[];
};

export const services: Service[] = [
  {
    id: "concert",
    title: "Concert Photography",
    description:
      "High-energy live music coverage for venues, promoters, bands, and publications. Three-song rule and beyond.",
    highlights: [
      "Pit access and full-set coverage",
      "Same-day or next-day turnaround available",
      "Web and print-ready delivery",
    ],
  },
  {
    id: "editorial",
    title: "Editorial & Promotional",
    description:
      "Artist portraits, press shots, and promotional imagery for musicians, labels, and publications.",
    highlights: [
      "Studio and on-location sessions",
      "Retouching and color grading included",
      "Full usage rights for press and digital",
    ],
  },
  {
    id: "event",
    title: "Event Coverage",
    description:
      "Comprehensive photography for festivals, showcases, album releases, and industry events.",
    highlights: [
      "Multi-stage and multi-artist events",
      "Candid and editorial coverage",
      "Large batch delivery with online gallery",
    ],
  },
  {
    id: "licensing",
    title: "Licensing & Publication",
    description:
      "License existing images from the archive for editorial, commercial, or promotional use.",
    highlights: [
      "Extensive archive of live music photography",
      "Flexible licensing terms",
      "Fast turnaround for publication deadlines",
    ],
  },
];
