import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import localFont from "next/font/local";
import { SheetKit } from "@/components/SheetKit";
import { SITE } from "@/lib/site";
import "@/styles/theme.css";
import "@/styles/sheet-kit.css";
import "@/styles/site.css";

/**
 * theme.css and sheet-kit.css are verbatim copies of the workspace's shared files
 * (one look for ardmst.my.id and portofolio.ardmst.my.id). This site's own rules are
 * in site.css, loaded last.
 */

/**
 * Bebas Neue, self-hosted from the @fontsource package (the same file Google Fonts serves)
 * instead of next/font/google, for one reason: the face declares 0.95em of ascent and
 * 0.35em of descent around capitals that are 0.7em tall, so every line of it carries an
 * invisible box a quarter of an em above its letters. At 600px that box lay over the
 * sentence and the button standing on the name and took their clicks. The overrides cut
 * the box to the letters (0.7em up, 0.1em down). The baseline does not move: the box is
 * trimmed equally about its centre.
 */
const bebasNeue = localFont({
  src: "../../node_modules/@fontsource/bebas-neue/files/bebas-neue-latin-400-normal.woff2",
  weight: "400",
  style: "normal",
  variable: "--font-display",
  display: "swap",
  declarations: [
    { prop: "ascent-override", value: "70%" },
    { prop: "descent-override", value: "10%" },
    { prop: "line-gap-override", value: "0%" },
  ],
});

/** EB Garamond, upright only: nothing on this page is set in italic, and a preloaded italic would cost 48 kB. */
const garamond = EB_Garamond({
  subsets: ["latin"],
  style: ["normal"],
  variable: "--font-text",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: SITE.title,
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.fullName, url: SITE.url }],
  creator: SITE.fullName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
};

// No theme-color: the visitor can turn the sheet dark, and a fixed white browser bar would
// sit over a dark page. theme.css sets color-scheme with the theme instead.

/**
 * Runs before first paint: marks the document as scripted (`js`), so entrances only hide
 * content when script really runs, and applies a stored dark theme without a flash.
 * The OS preference is deliberately not followed.
 */
const HEAD = `(function(d){d.classList.add('js');try{if(localStorage.getItem('ardmst-theme')==='dark')d.dataset.theme='dark'}catch(e){}})(document.documentElement)`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${garamond.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: HEAD }} />
      </head>
      <body>
        {children}
        <SheetKit />
      </body>
    </html>
  );
}
