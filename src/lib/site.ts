export const SITE = {
  name: "Ardmst",
  handle: "ardmst",
  fullName: "Rifkhi Ardi Mustaqim",
  role: "Fullstack Developer & Game Creator",
  domain: "ardmst.my.id",
  url: "https://ardmst.my.id",
  location: "Indonesia",
  email: "contact@ardmst.my.id",
  availability: "Open for freelance",
} as const;

export type LinkItem = {
  title: string;
  href: string;
  description: string;
  badge: string;
  accent?: boolean;
  external?: boolean;
};

// ponytail: flat array, add CMS/Supabase when >20 links or need reordering without deploy.
export const LINKS: LinkItem[] = [
  {
    title: "Portfolio",
    href: "https://portofolio.ardmst.my.id",
    description: "Selected work — web apps, games & interface systems.",
    badge: "primary",
    accent: true,
    external: true,
  },
  {
    title: "GitHub",
    href: "https://github.com/Ardmst",
    description: "Code, experiments and open source.",
    badge: "github",
    external: true,
  },
  {
    title: "LinkedIn",
    href: "https://linkedin.com/in/ardmst",
    description: "Professional profile & updates.",
    badge: "linkedin",
    external: true,
  },
  {
    title: "Email",
    href: "mailto:contact@ardmst.my.id",
    description: "contact@ardmst.my.id — fastest way to reach me.",
    badge: "contact",
  },
  // Extensible slots — flip `disabled` or point to real URLs when live.
  {
    title: "Hermes API",
    href: "https://hermes.ardmst.my.id",
    description: "Private service — VPS only (not on Vercel).",
    badge: "soon",
    external: true,
  },
  {
    title: "Game Demos",
    href: "#",
    description: "Playable builds — coming soon.",
    badge: "soon",
  },
];
