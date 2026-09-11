import type { MetadataRoute } from "next";

/* Ces deux fichiers sont écrits une fois, à la compilation : ils doivent
 * l'être aussi quand le site est exporté en fichiers statiques. */
export const dynamic = "force-static";
import { CREATEURS, MORPHOLOGIES, ROBES, SITE_URL } from "@/lib/madamoon";
import { COUPES } from "@/lib/coupes";
import { versLangue } from "@/lib/langue";

/*
 * Le plan du site, dans les deux langues.
 *
 * Chaque adresse française est déclarée une fois, avec sa jumelle
 * anglaise en « alternates ». C'est la forme que Google attend : une
 * entrée par page, et les langues rattachées à elle plutôt que deux
 * entrées qui s'ignorent.
 *
 * Les coups de cœur n'y figurent pas. Cette page n'existe que dans le
 * navigateur de la visiteuse, et elle porte « noindex » : l'annoncer
 * serait se contredire.
 */

const PAGES = [
  "",
  "/robes",
  "/coupes",
  "/morphologies",
  "/trouver-ma-robe",
  "/showroom",
  "/a-propos",
  "/rendez-vous",
];

/* Une entrée bilingue : l'adresse française, et les deux langues. */
function entree(adresseFr: string, priority: number) {
  const fr = `${SITE_URL}${adresseFr}`;
  const en = `${SITE_URL}${versLangue(adresseFr || "/", "en")}`;
  return {
    url: fr,
    changeFrequency: "monthly" as const,
    priority,
    alternates: { languages: { fr, en } },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...PAGES.map((p) => entree(p, p === "" ? 1 : 0.8)),
    ...CREATEURS.map((c) => entree(`/createurs/${c.slug}`, 0.7)),
    ...COUPES.map((s) => entree(`/coupes/${s.ancre}`, 0.7)),
    ...MORPHOLOGIES.map((m) => entree(`/morphologies/${m.lettre.toLowerCase()}`, 0.7)),
    ...ROBES.map((r) => entree(`/robes/${r.slug}`, 0.6)),
  ];
}
