# ardmst-hub — ardmst.my.id

The door to every site by Rifkhi Ardi Mustaqim (ardmst): his portfolio, his private tools,
GitHub, LinkedIn and email. One static page. Project demos are not shown here; they live in
the portfolio (`portofolio.ardmst.my.id`).

## Stack

Next.js 15 (App Router), React 19, plain CSS. No Tailwind, no animation library, no icon library.
The page is a server component and is prerendered; the only client code is the shared
"sheet and biro" kit (about 5 kB), mounted by `src/components/SheetKit.tsx`.

## Where things are

| Path | What |
|---|---|
| `src/lib/site.ts` | All copy and the list of doors (`LINKS`). |
| `src/app/page.tsx` | The page: first screen, doors, close. |
| `src/app/layout.tsx` | Fonts, metadata, the head script (`js` class, stored theme). |
| `src/styles/theme.css`, `sheet-kit.css` | Shared with the portfolio. Verbatim copies of `../shared/`: do not edit here. |
| `src/lib/sheet-kit.js`, `.d.ts` | The shared interaction kit. Verbatim copy: do not edit here. |
| `src/styles/site.css` | This site's own rules. |
| `src/app/opengraph-image.tsx`, `robots.ts`, `sitemap.ts`, `icon.svg`, `apple-icon.png` | Share picture, crawler files, icons. |
| `scripts/make-pictures.mjs` | Builds the portrait, the door pictures and `apple-icon.png`. |

## Add another site

Add one entry to `LINKS` in `src/lib/site.ts`:

```ts
{
  name: "Portfolio",                       // one or two words, set in capitals
  href: "https://portofolio.ardmst.my.id",
  note: "The work, and demos you can open", // say so when it needs a sign-in
  picture: { src: "/doors/portfolio.webp", alt: "What the picture shows" },
  newTab: true,                            // for anything outside these two sites
}
```

The picture is a 640x400 (16:10) WebP in `public/doors/`. It is shown in the row on every
screen and, on a mouse, held larger by the pointer. To build one from a screenshot, add a
line to `scripts/make-pictures.mjs` and run `npm run pictures`. The script reads its sources
from the workspace folders beside this repo (`../media/`, `../portofolio/public/profile.jpg`);
the built pictures are committed, so the site builds without them.

Never publish a picture that shows a credential. The 9Router sign-in screen prints its default
password; the picture here is cropped above that line.

## The name is fitted by measurement

ARDMST runs from margin to margin. `site.css` sizes it as `box width / --name-fit`, where
`--name-fit: 2.285` is the width of the word's ink in em (Bebas Neue, letter-spacing -0.035em),
and pulls it left by `--name-left: 0.0125em`, the first letter's side bearing. Both were measured
by drawing the word on a canvas and scanning the pixels. A different word or face needs new numbers.

Bebas Neue is loaded with `next/font/local` from `@fontsource/bebas-neue`, with its ascent and
descent overridden to the capitals (70% and 10%). The face declares a much taller box than its
letters; at 600px that invisible box covered the sentence and the button above the name and
took their clicks. The override does not move any baseline.

## Commands

```
npm install
npm run dev        # http://localhost:3000
npm run build      # static output
npm run start
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
npm run pictures   # rebuild public/doors/*, public/portrait-*, src/app/apple-icon.png
```

No environment variables are needed.

## Deploy

Vercel project `ardmst-hub`, domain `ardmst.my.id` (Cloudflare CNAME to `cname.vercel-dns.com`).
`vercel.json` sets `X-Content-Type-Options`, `X-Frame-Options: DENY` and `Referrer-Policy`.
The portfolio is a second Vercel project on `portofolio.ardmst.my.id`. Hermes and 9Router run
on the VPS and are only linked from here.
