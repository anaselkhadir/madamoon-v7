import type { NomScene } from "@/lib/medias";

/*
 * Les robes dont la maison possède un film.
 *
 * Sept modèles seulement : quand le film n'existe pas, la fiche n'en
 * invente pas. Chaque extrait est muet, court, en boucle.
 */
export const FILMS: Record<string, { src: string; affiche: NomScene }> = {
  zina: { src: "/film/hero-desktop.mp4", affiche: "hero-affiche" },
  addison: { src: "/film/escalier.mp4", affiche: "escalier-affiche" },
  meredith: { src: "/film/meredith.mp4", affiche: "film-meredith" },
  tessa: { src: "/film/tessa.mp4", affiche: "film-tessa" },
  ariel: { src: "/film/ariel.mp4", affiche: "film-ariel" },
  venus: { src: "/film/venus.mp4", affiche: "film-venus" },
  solana: { src: "/film/solana.mp4", affiche: "film-solana" },
  montana: { src: "/film/montana.mp4", affiche: "film-montana" },
};
