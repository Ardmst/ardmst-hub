// Builds every raster picture the hub serves, from the workspace's source media.
//
//   node scripts/make-pictures.mjs
//
// Sources live outside this repo (the workspace root is the parent folder):
//   ../portofolio/public/profile.jpg            the owner's portrait (1000x1250)
//   ../media/hub/*.png                          public first screens, captured headless, GET only
//   ../media/detektif, ../media/kicaumania      project pictures, used for the Portfolio row
// Output: public/portrait-*.webp, public/doors/*.webp (640x400, 16:10) and src/app/apple-icon.png.
//
// The 9Router capture is cropped above the line that prints the tool's default password:
// that line must never be published here.
import { mkdir, stat } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const media = resolve(root, "..", "media");
const out = (...p) => join(root, ...p);

const DOOR = { width: 640, height: 400 };

async function save(image, file, quality = 80) {
  await mkdir(dirname(file), { recursive: true });
  await image.webp({ quality, effort: 6 }).toFile(file);
  const meta = await sharp(file).metadata();
  const { size } = await stat(file);
  console.log(`${file.replace(root, ".")}  ${meta.width}x${meta.height}  ${(size / 1024).toFixed(1)} kB`);
}

/** A 16:10 door picture cut from `src` at `box` (in source pixels). */
const door = (src, box) => sharp(src).extract(box).resize(DOOR.width, DOOR.height, { fit: "cover" });

// ---- the portrait: the 4:5 frame on the first screen -------------------------------------
// Cropped inside the photograph's dark vignette so the frame holds the person, not the border.
const portrait = resolve(root, "..", "portofolio", "public", "profile.jpg");
const PORTRAIT_BOX = { left: 120, top: 190, width: 760, height: 950 };
for (const width of [480, 800]) {
  await save(
    sharp(portrait).extract(PORTRAIT_BOX).resize(width, Math.round(width * 1.25)),
    out("public", `portrait-${width}.webp`),
    width === 800 ? 78 : 80,
  );
}

// ---- the doors ------------------------------------------------------------------------------

// Portfolio: the two pieces of work a visitor finds inside, side by side.
// (Stand-in until the new portfolio's own first screen can be captured.)
const half = { width: DOOR.width / 2, height: DOOR.height };
const keyart = await sharp(join(media, "detektif", "detektif-art-menu-keyart.webp"))
  .extract({ left: 96, top: 0, width: 576, height: 720 })
  .resize(half.width, half.height, { kernel: "nearest" })
  .toBuffer();
const standings = await sharp(join(media, "kicaumania", "kicaumania-scoreboard-live-desktop.webp"))
  .extract({ left: 112, top: 322, width: 462, height: 578 })
  .resize(half.width, half.height)
  .toBuffer();
await save(
  sharp({ create: { width: DOOR.width, height: DOOR.height, channels: 3, background: "#ffffff" } }).composite([
    { input: keyart, left: 0, top: 0 },
    { input: standings, left: half.width, top: 0 },
  ]),
  out("public", "doors", "portfolio.webp"),
  82,
);

// Hermes: the public sign-in screen, cut to the card.
await save(
  door(join(media, "hub", "hermes-signin.png"), { left: 794, top: 436, width: 972, height: 608 }),
  out("public", "doors", "hermes.webp"),
);

// 9Router: the public sign-in screen, title to button. The crop ends above the default-password line.
await save(
  door(join(media, "hub", "router-signin.png"), { left: 792, top: 410, width: 976, height: 610 }),
  out("public", "doors", "router.webp"),
);

// GitHub: the public profile, avatar and name beside the first repositories.
await save(
  door(join(media, "hub", "github-profile.png"), { left: 0, top: 140, width: 1600, height: 1000 }),
  out("public", "doors", "github.webp"),
);

// LinkedIn: the whole width of the photograph, the person in his setting.
// Email: only the face, forehead to chin, so the two rows do not show the same picture twice.
await save(door(portrait, { left: 0, top: 262, width: 1000, height: 625 }), out("public", "doors", "linkedin.webp"));
await save(door(portrait, { left: 246, top: 462, width: 480, height: 300 }), out("public", "doors", "email.webp"), 84);

// ---- apple-icon.png: the existing shield on the page's white, 180x180 ------------------------
const shield = await sharp(out("src", "app", "icon.svg"), { density: 300 }).resize(132, 132).png().toBuffer();
await sharp({ create: { width: 180, height: 180, channels: 3, background: "#ffffff" } })
  .composite([{ input: shield, left: 24, top: 24 }])
  .png({ compressionLevel: 9 })
  .toFile(out("src", "app", "apple-icon.png"));
console.log("./src/app/apple-icon.png  180x180");
