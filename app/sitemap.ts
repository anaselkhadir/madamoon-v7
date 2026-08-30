import type { MetadataRoute } from "next";
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
