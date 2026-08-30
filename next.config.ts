import type { NextConfig } from "next";

/*
 * Deux cibles, un seul code.
 *
 * En développement et pour un hébergement Node, la configuration reste
 * nue : le site tourne tel quel.
 *
 * Avec PAGES=1, il est exporté en fichiers statiques pour GitHub Pages,
 * qui sert le site depuis un sous-dossier — d'où le chemin de base. Les
 * liens Next le prennent en compte tout seuls ; les images et les vidéos
 * écrites à la main passent par media() (voir lib/chemin.ts).
 *
 * Cette version est un aperçu, pas le site public : elle est interdite
 * d'indexation pour ne jamais concurrencer madamoon.fr.
 */

const pages = process.env.PAGES === "1";
const base = process.env.BASE_PATH ?? "/madamoon-v7";

const nextConfig: NextConfig = {
  ...(pages
    ? {
        output: "export" as const,
        basePath: base,
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {}),
  env: {
    NEXT_PUBLIC_BASE: pages ? base : "",
    NEXT_PUBLIC_APERCU: pages ? "1" : "",
  },
};

export default nextConfig;
