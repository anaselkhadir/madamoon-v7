import type { Categorie } from "@/lib/madamoon";

/*
 * Les six silhouettes MADAMOON.
 *
 * Chacune a son ancre, sa ligne courte — celle qui se pose dans l'image —
 * et la robe qui la représente le mieux en photographie. Rien n'est
 * inventé : les descriptions viennent de ce que la coupe fait réellement.
 */

export type Silhouette = {
  nom: Categorie;
  /* Sert d'ancre dans le catalogue et d'adresse à sa page. */
  ancre: string;
  note: string;
  /* Le modèle qui sert d'image à la famille. */
  robe: string;
  vue: number;
  /* La robe qui ouvre la page de la silhouette : son film s'il en existe
   * un, sa photographie sinon. Distincte de `robe`, qui n'est qu'une
   * vignette : ici il faut un modèle filmé quand le catalogue en a un. */
  ouverture?: { robe: string; vue: number };
};

export const SILHOUETTES: Silhouette[] = [
  {
    nom: "Sirène",
    ancre: "sirene",
    note: "Féminine et sensuelle",
    robe: "uma",
    vue: 1,
    ouverture: { robe: "ariel", vue: 1 },
  },
  {
    nom: "Princesse",
    ancre: "princesse",
    note: "Raffinée et solennelle",
    robe: "addison",
    vue: 1,
    ouverture: { robe: "addison", vue: 1 },
  },
  { nom: "Fluide", ancre: "fluide", note: "Souple et légère", robe: "adularia", vue: 1 },
  {
    nom: "Trapèze",
    ancre: "trapeze",
    note: "Juste et intemporelle",
    robe: "solana",
    vue: 1,
    ouverture: { robe: "solana", vue: 1 },
  },
  {
    nom: "Minimaliste",
    ancre: "minimaliste",
    note: "Nette et silencieuse",
    robe: "amaryllis",
    vue: 1,
  },
  {
    nom: "Deux en un",
    ancre: "deux-en-un",
    note: "Deux allures, une robe",
    robe: "tessa",
    vue: 1,
    ouverture: { robe: "tessa", vue: 1 },
  },
];

export function silhouette(nom: Categorie): Silhouette {
  return SILHOUETTES.find((s) => s.nom === nom) ?? SILHOUETTES[0];
}

export function silhouetteParAncre(ancre: string): Silhouette | undefined {
  return SILHOUETTES.find((s) => s.ancre === ancre);
}
