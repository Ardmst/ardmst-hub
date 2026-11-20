"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { initBiro, initMonument, initRise, initSheet, initTheme } from "@/lib/sheet-kit";

/**
 * Mounts the shared "sheet and biro" kit (src/lib/sheet-kit.js, a verbatim copy of the
 * workspace's shared/sheet-kit.js). This is the page's only client component: it renders
 * nothing and every init returns its own cleanup.
 */
export function SheetKit() {
  const pathname = usePathname();

  // Once for the whole visit: none of these depends on the page that is showing.
  useEffect(() => {
    const offs = [initTheme(), initRise(), initSheet(), initBiro()];
    return () => offs.forEach((off) => off());
  }, []);

  // Per page: the monument's letters belong to the page that is showing.
  useEffect(() => initMonument(), [pathname]);

  return null;
}
