import type { Categorie } from "@/lib/madamoon";

/*
 * Le vocabulaire de la maison, en anglais.
 *
 * Ce n'est pas une traduction mot à mot : la robe de mariée a ses termes
 * établis dans chaque langue, et une mariée anglophone cherche une
 * « mermaid » ou une « ball gown », jamais une « sirène » ni une « robe
 * princesse ». Employer les mots du métier vaut mieux que rester fidèle
 * au français.
 *
 * Le registre, lui, ne change pas : des phrases courtes, du concret,
 * aucune promesse. Ce qui se dit en français « Le satin, la ligne, rien
 * d'autre » ne devient pas « Timeless elegance redefined ».
 *
 * Les clés sont celles du français : une coupe ajoutée au catalogue
 * réclame sa ligne ici, et le manque se voit au typage.
 */

export const COUPE_NOM: Record<Categorie, string> = {
  Sirène: "Mermaid",
  Princesse: "Ball gown",
  Fluide: "Sheath",
  Trapèze: "A-line",
  Minimaliste: "Minimalist",
  "Deux en un": "Two-in-one",
};

export const COUPE_PLURIEL: Record<Categorie, string> = {
  Sirène: "mermaid dresses",
  Princesse: "ball gowns",
  Fluide: "sheath dresses",
  Trapèze: "A-line dresses",
  Minimaliste: "minimalist dresses",
  "Deux en un": "two-in-one dresses",
};

/* L'apposition : ce qui s'écrit après « catalogue ». En français elle
 * s'accorde ou non selon la coupe ; en anglais elle ne bouge pas. */
export const COUPE_APPOSITION: Record<Categorie, string> = {
  Sirène: "mermaid",
  Princesse: "ball gown",
  Fluide: "sheath",
  Trapèze: "A-line",
  Minimaliste: "minimalist",
  "Deux en un": "two-in-one",
};

export const COUPE_NOTE: Record<Categorie, string> = {
  Sirène: "Feminine and sensual",
  Princesse: "Refined and stately",
  Fluide: "Soft and light",
  Trapèze: "True and timeless",
  Minimaliste: "Clean and pared back",
  "Deux en un": "Two looks, one dress",
};

export const FAMILLE: Record<Categorie, string> = {
  Sirène: "Fitted through the thigh, then flared. It draws the waist and the hips.",
  Fluide: "A soft fall that follows the movement naturally.",
  Trapèze: "A fitted bodice, a skirt that opens in an A. The most universal cut.",
  Princesse: "A worked bodice and a skirt that owns its volume. The ceremonial gown.",
  Minimaliste: "Satin, line, nothing else. Everything rests on the cut.",
  "Deux en un": "One dress, two looks: an overskirt or a train that comes away.",
};

/* Les maisons gardent leur nom : ce sont des noms propres. Seule la
 * phrase qui les présente se traduit. */
/* Les noms de maison sont des noms propres : ils ne se traduisent pas.
 * « Autres créateurs » n'en est pas un — c'est une rubrique. */
export const CREATEUR_NOM: Record<string, string> = {
  "autres-createurs": "Other designers",
};

export const CREATEUR_NOTE: Record<string, string> = {
  "watters-designs":
    "Worked lace, illusion backs, light falls. The house of Uma and Pendant.",
  "casablanca-bridal":
    "Mikado, duchess satin, clean lines. Constructed dresses, made for the light.",
  "olya-mak":
    "Draping, sheerness, restrained sensuality. Dresses that move with the woman wearing them.",
  "monica-loretti":
    "The Italian school: true proportions, dense embroidery, bodice craft.",
  "autres-createurs":
    "Small ateliers, found one by one. Rare pieces, often unique, not seen elsewhere in Paris.",
};

export const CREATEUR_ORIGINE: Record<string, string> = {
  "watters-designs": "Dallas",
  "casablanca-bridal": "Newport Beach",
  "olya-mak": "Lviv",
  "monica-loretti": "Rome",
  "autres-createurs": "Small ateliers",
};

export const MAISON_EN = {
  baseline: "Bridal boutique in Paris",
  pays: "France",
  horaires: [
    { jour: "Monday", heures: "12pm — 9pm" },
    { jour: "Tuesday — Saturday", heures: "10am — 7pm" },
  ],
  mentionHoraires: "By appointment only",
  /* Le prix reste en euros : c'est la monnaie de la boutique. */
  prixDepart: "€1,500",
};

/* La distinction que la maison met en avant, telle qu'elle se dit en
 * anglais. Le rang « 10e arrondissement » ne se traduit pas : c'est une
 * adresse parisienne, et une mariée qui vient l'a déjà lue ainsi. */
export const DISTINCTION_EN =
  "The only wedding dress boutique rated 5 stars in the 10th arrondissement.";

/* Les quatre signatures de la maison : ce que la mariée trouve en
 * poussant la porte. Le prix vient de MAISON_EN, jamais recopié. */
export const SIGNATURES_EN: { titre: string; texte: string }[] = [
  {
    titre: "Private fitting",
    texte: "The showroom is yours alone for an hour. Do come with someone.",
  },
  {
    titre: "Made to measure",
    texte: "Every dress is made in the atelier, to your own measurements.",
  },
  {
    titre: "Alterations included",
    texte: "Our seamstresses adjust your dress until the very last fitting.",
  },
  {
    titre: `From ${MAISON_EN.prixDepart}`,
    texte: "For a made-to-measure dress, alterations included.",
  },
];
