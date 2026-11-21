/**
 * Everything the hub says and links to.
 *
 * The hub is the door to every site on ardmst.my.id and to the owner's profiles.
 * To add another site, add ONE entry to `LINKS`: the row, its note, its picture
 * (inline on every screen, and held by the pointer on a mouse) come from that entry.
 * Pictures are 640x400 WebP in `public/doors/`; `scripts/make-pictures.mjs` builds them.
 */

export const SITE = {
  name: "Ardmst",
  handle: "ardmst",
  fullName: "Rifkhi Ardi Mustaqim",
  domain: "ardmst.my.id",
  url: "https://ardmst.my.id",
  portfolio: "https://portofolio.ardmst.my.id",
  github: "https://github.com/Ardmst",
  linkedin: "https://linkedin.com/in/ardmst",
  email: "contact@ardmst.my.id",
  /** The invitation in the close opens a letter that already has its subject. */
  inquiry: "mailto:contact@ardmst.my.id?subject=Project%20inquiry",
  title: "Ardmst — every site by Rifkhi Ardi Mustaqim",
  description:
    "Rifkhi Ardi Mustaqim (ardmst) builds web apps and games in Indonesia. This page is the door to every site he runs: his portfolio, his tools, GitHub, LinkedIn and email.",
  /** The first screen's supporting text: two sentences, set on two lines where the screen is wide. */
  lead: ["Rifkhi Ardi Mustaqim builds web apps and games in Indonesia.", "Every site he runs starts here."],
} as const;

export type LinkItem = {
  /** The row's name, set in capitals at display size. Keep it to one or two words. */
  name: string;
  href: string;
  /**
   * One short line: what is behind the door. Say so when it needs a sign-in.
   * A no-break space (\u00a0) keeps two words on one line where the note wraps, and a
   * word joiner (\u2060) after a hyphen stops the line breaking there.
   */
  note: string;
  /** The destination's picture: a 640x400 (16:10) WebP in `public/doors/`. */
  picture: { src: string; alt: string };
  /** Opens in a new tab. For anything that is not part of these two sites. */
  newTab?: boolean;
};

export const LINKS: LinkItem[] = [
  {
    name: "Portfolio",
    href: SITE.portfolio,
    note: "The work, and\u00a0demos you can open",
    picture: {
      src: "/doors/portfolio.webp",
      alt: "Inside the portfolio: the pixel-art key art of Detektif Ekosistem beside the KicauScore live standings",
    },
  },
  {
    name: "Hermes",
    href: "https://hermes.ardmst.my.id",
    note: "Private assistant. Sign-\u2060in\u00a0required",
    picture: { src: "/doors/hermes.webp", alt: "The Hermes sign-in screen: a lock, the name and one password field" },
    newTab: true,
  },
  {
    name: "9Router",
    href: "https://router.ardmst.my.id",
    note: "AI gateway console. Sign-\u2060in\u00a0required",
    picture: { src: "/doors/router.webp", alt: "The 9Router sign-in screen: the name over one password field" },
    newTab: true,
  },
  {
    name: "GitHub",
    href: SITE.github,
    note: "Code and experiments",
    picture: {
      src: "/doors/github.webp",
      alt: "The GitHub profile of Ardmst: the avatar and name beside the first repositories",
    },
    newTab: true,
  },
  {
    name: "LinkedIn",
    href: SITE.linkedin,
    note: "The professional version",
    picture: {
      src: "/doors/linkedin.webp",
      alt: "Rifkhi Ardi Mustaqim, head and shoulders, in black and white under a tree",
    },
    newTab: true,
  },
  {
    name: "Email",
    href: `mailto:${SITE.email}`,
    note: SITE.email,
    picture: { src: "/doors/email.webp", alt: "Rifkhi Ardi Mustaqim, close up, in round glasses" },
  },
];
