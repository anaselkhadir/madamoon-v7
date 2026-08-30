import type { MetadataRoute } from "next";

/* Ces deux fichiers sont écrits une fois, à la compilation : ils doivent
 * l'être aussi quand le site est exporté en fichiers statiques. */
export const dynamic = "force-static";
import { ROBES, SITE_URL } from "@/lib/madamoon";

const PAGES = ["", "/robes", "/trouver-ma-robe", "/showroom", "/a-propos", "/rendez-vous"];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...PAGES.map((p) => ({
      url: `${SITE_URL}${p}`,
      changeFrequency: "monthly" as const,
      priority: p === "" ? 1 : 0.8,
    })),
    ...ROBES.map((r) => ({
      url: `${SITE_URL}/robes/${r.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
