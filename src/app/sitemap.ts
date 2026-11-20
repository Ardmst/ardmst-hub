import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/** One page. The date is the build's, which is when the page last changed. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${SITE.url}/`, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}
