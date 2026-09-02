import type { MetadataRoute } from "next";

/* Ces deux fichiers sont écrits une fois, à la compilation : ils doivent
 * l'être aussi quand le site est exporté en fichiers statiques. */
export const dynamic = "force-static";
import { CREATEURS, MORPHOLOGIES, ROBES, SITE_URL } from "@/lib/madamoon";
import { COUPES } from "@/lib/coupes";

const PAGES = ["", "/robes", "/coupes", "/morphologies", "/trouver-ma-robe", "/showroom", "/a-propos", "/rendez-vous"];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...PAGES.map((p) => ({
      url: `${SITE_URL}${p}`,
      changeFrequency: "monthly" as const,
      priority: p === "" ? 1 : 0.8,
    })),
    ...CREATEURS.map((c) => ({
      url: `${SITE_URL}/createurs/${c.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...COUPES.map((s) => ({
      url: `${SITE_URL}/coupes/${s.ancre}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...MORPHOLOGIES.map((m) => ({
      url: `${SITE_URL}/morphologies/${m.lettre.toLowerCase()}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...ROBES.map((r) => ({
      url: `${SITE_URL}/robes/${r.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
