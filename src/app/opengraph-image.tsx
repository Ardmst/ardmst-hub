import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

/**
 * The share picture, in the theme: the white dot-grid sheet, the sentence in EB Garamond
 * and ARDMST in black Bebas Neue from margin to margin, standing on the bottom edge.
 * Rendered once at build time. The two faces are read from the @fontsource packages
 * (devDependencies, SIL Open Font License), the same faces next/font serves to the page.
 */

export const alt = "ARDMST: every site by Rifkhi Ardi Mustaqim";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const face = (pkg: string, file: string) => readFile(join(process.cwd(), "node_modules", "@fontsource", pkg, "files", file));

const MARGIN = 56;
// ARDMST in Bebas Neue at -0.035em has 2.285em of ink, starting 0.0125em in (see site.css): this size runs it from margin to margin.
const NAME = Math.floor((size.width - 2 * MARGIN) / 2.285);
const DOTS = `url("data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><circle cx="14" cy="14" r="1.3" fill="#1f1f1f" fill-opacity="0.22"/></svg>',
)}")`;

export default async function OpengraphImage() {
  const [bebas, garamond] = await Promise.all([
    face("bebas-neue", "bebas-neue-latin-400-normal.woff"),
    face("eb-garamond", "eb-garamond-latin-500-normal.woff"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#ffffff",
          backgroundImage: DOTS,
          backgroundSize: "28px 28px",
          color: "#1f1f1f",
          padding: `${MARGIN - 12}px ${MARGIN}px 0`,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "EB Garamond", fontSize: 34 }}>
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.25 }}>
            <span>{SITE.fullName} builds web apps and games.</span>
            <span>Every site he runs starts here.</span>
          </div>
          <span style={{ color: "#0b57d0" }}>{SITE.domain}</span>
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: "Bebas Neue",
            fontSize: NAME,
            lineHeight: 0.8,
            letterSpacing: -0.035 * NAME,
            marginBottom: MARGIN - NAME * 0.1,
            marginLeft: -0.0125 * NAME,
          }}
        >
          ARDMST
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Bebas Neue", data: bebas, weight: 400, style: "normal" },
        { name: "EB Garamond", data: garamond, weight: 500, style: "normal" },
      ],
    },
  );
}
