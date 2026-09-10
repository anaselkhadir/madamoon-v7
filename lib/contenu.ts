import type { Langue } from "@/lib/langue";
import type { Categorie, Createur, Morphologie, Robe } from "@/lib/madamoon";
import { MAISON } from "@/lib/madamoon";
import { PLURIEL, type Coupe } from "@/lib/coupes";
import {
  COUPE_NOM,
  COUPE_NOTE,
  COUPE_PLURIEL,
  CREATEUR_NOTE,
  CREATEUR_ORIGINE,
  FAMILLE,
  MAISON_EN,
} from "@/lib/en/taxonomie";
import {
  MORPHO_NOM,
  MORPHO_OBJECTIF,
  MORPHO_SILHOUETTE,
} from "@/lib/en/morphologies";

/*
 * Le contenu, dans la langue demandée.
 *
 * Les données du site restent françaises et font autorité : ce sont
 * elles que la cliente relit, elles qui portent les identifiants, elles
 * qui décident de ce qui existe. L'anglais est une table à côté, rangée
 * par les mêmes clés.
 *
 * Tout passe par ici plutôt que par des « si anglais » disséminés dans
 * les composants : le jour où une coupe est ajoutée, il n'y a qu'un
 * endroit où le manque apparaît.
 */

export const coupeNom = (c: Coupe | Categorie, l: Langue) => {
  const nom = typeof c === "string" ? c : c.nom;
  return l === "fr" ? nom : COUPE_NOM[nom as Categorie] ?? nom;
};

export const coupeNote = (c: Coupe, l: Langue) =>
  l === "fr" ? c.note : COUPE_NOTE[c.nom as Categorie] ?? c.note;

export const coupePluriel = (cat: Categorie, l: Langue) =>
  l === "fr" ? PLURIEL[cat] : COUPE_PLURIEL[cat];

export const familleTexte = (cat: Categorie, l: Langue, fr: string) =>
  l === "fr" ? fr : FAMILLE[cat] ?? fr;

export const createurNote = (c: Createur, l: Langue) =>
  l === "fr" ? c.note : CREATEUR_NOTE[c.slug] ?? c.note;

export const createurOrigine = (c: Createur, l: Langue) =>
  l === "fr" ? c.origine : CREATEUR_ORIGINE[c.slug] ?? c.origine;

export const morphoNom = (m: Morphologie, l: Langue) =>
  l === "fr" ? m.nom : MORPHO_NOM[m.lettre] ?? m.nom;

export const morphoSilhouette = (m: Morphologie, l: Langue) =>
  l === "fr" ? m.silhouette : MORPHO_SILHOUETTE[m.lettre] ?? m.silhouette;

export const morphoObjectif = (m: Morphologie, l: Langue) =>
  l === "fr" ? m.objectif : MORPHO_OBJECTIF[m.lettre] ?? m.objectif;

/* La maison : seules les mentions se traduisent, jamais l'adresse ni le
 * numéro. */
export const maison = (l: Langue) =>
  l === "fr"
    ? MAISON
    : { ...MAISON, ...MAISON_EN };

/* Les robes : la ligne et le regard viennent des fiches. Tant que la
 * table anglaise n'est pas écrite, on rend le français plutôt que rien
 * — une fiche vide serait pire qu'une fiche à traduire. */
export const robeLigne = (r: Robe, l: Langue) =>
  l === "fr" ? r.ligne : ROBE_EN[r.slug]?.ligne ?? r.ligne;

export const robeRegard = (r: Robe, l: Langue) =>
  l === "fr" ? r.regard : ROBE_EN[r.slug]?.regard ?? r.regard;

/* Rempli à l'étape suivante, fiche par fiche. */
export const ROBE_EN: Record<string, { ligne: string; regard: string }> = {};
