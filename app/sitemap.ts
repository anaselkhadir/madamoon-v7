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
 * Chaque page est déclarée dans les deux langues, et chacune des deux
 * entrées porte la liste complète des langues. C'est la forme que Google
 * demande : une entrée par adresse, et non une seule pour le français
 * avec l'anglais en annexe — une page qui ne figure nulle part en
 * « loc » n'est pas soumise, elle n'est au mieux que découverte par les
 * liens du site.
 *
 * « x-default » désigne le français : c'est la version servie à qui ne
 * demande ni l'une ni l'autre.
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
  "/faq",
];

/* Les deux entrées d'une page : la française et l'anglaise. */
function entree(adresseFr: string, priority: number) {
  /* La barre oblique finale, parce que c'est ainsi que le site est
   * servi : l'export statique écrit des dossiers, et « /robes » renvoie
   * une redirection vers « /robes/ ». Un plan de site qui n'annonce que
   * des redirections fait perdre un aller-retour à chaque adresse, et la
   * Search Console le signale. */
  const barre = (a: string) => `${SITE_URL}${a === "/" || a === "" ? "" : a}/`;
  const fr = barre(adresseFr);
  const en = barre(versLangue(adresseFr || "/", "en"));
  const langues = { fr, en, "x-default": fr };
  return [
    { url: fr, changeFrequency: "monthly" as const, priority, alternates: { languages: langues } },
    {
      url: en,
      changeFrequency: "monthly" as const,
      /* L'anglais vient après : la maison est parisienne, et ses mariées
       * cherchent en français. */
      priority: Math.round((priority - 0.1) * 10) / 10,
      alternates: { languages: langues },
    },
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...PAGES.flatMap((p) => entree(p, p === "" ? 1 : 0.8)),
    ...CREATEURS.flatMap((c) => entree(`/createurs/${c.slug}`, 0.7)),
    ...COUPES.flatMap((s) => entree(`/coupes/${s.ancre}`, 0.7)),
    ...MORPHOLOGIES.flatMap((m) => entree(`/morphologies/${m.lettre.toLowerCase()}`, 0.7)),
    ...ROBES.flatMap((r) => entree(`/robes/${r.slug}`, 0.6)),
  ];
}
