import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { SITE } from "@/lib/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: "Ardmst — Rifkhi Ardi Mustaqim",
  description: "Rifkhi Ardi Mustaqim — Fullstack Developer & Game Creator. Portfolio, links and contact at ardmst.my.id.",
  keywords: ["Ardmst", "Rifkhi Ardi Mustaqim", "Fullstack Developer", "Game Creator", "Portfolio"],
  authors: [{ name: SITE.fullName }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: SITE.name,
    title: "Ardmst — Rifkhi Ardi Mustaqim",
    description: "Fullstack Developer & Game Creator — portfolio, GitHub, contact and more.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ardmst — Rifkhi Ardi Mustaqim",
    description: "Fullstack Developer & Game Creator — portfolio, GitHub, contact and more.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#09090B", colorScheme: "dark" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${grotesk.variable} ${jetbrains.variable} dark`} suppressHydrationWarning>
      <body className="min-h-dvh bg-void font-sans antialiased selection:bg-accent/35">
        {children}
      </body>
    </html>
  );
}
