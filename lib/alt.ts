import { CATEGORIES, MAISON, type Robe } from "@/lib/madamoon";

/*
 * Les descriptions d'images.
 *
 * Elles étaient écrites à la main, page par page. Une même robe recevait
 * donc trois descriptions différentes selon l'endroit où on la
 * rencontrait, et certaines ne la nommaient pas. Elles sont maintenant
 * calculées à partir de la donnée : une robe, une description, partout.
 *
 * Ce qu'une description doit dire, dans cet ordre : ce que c'est, ce
 * qu'on y voit, de qui c'est, et où on peut l'essayer. Le lieu compte —
 * une boutique de quartier se cherche autant par son adresse que par son
 * catalogue.
 *
 * Ce qu'elle ne doit pas faire : décrire un angle de prise de vue. On
 * n'écrit pas « vue de dos » sur une photographie qu'on n'a pas
 * regardée ; une description fausse est pire qu'une description vague,
 * pour une lectrice d'écran comme pour un moteur.
 *
 * La longueur se tient sous cent trente caractères. Au-delà, les
 * lecteurs d'écran fatiguent et les moteurs coupent.
 */

const LIEU = `showroom ${MAISON.nom} ${MAISON.ville} ${MAISON.codePostal.slice(-2)}e`;

/*
 * La description d'une robe.
 *
 * `vue` numérote les photographies d'un même modèle : c'est un fait
 * vérifiable, contrairement à l'angle. Sans elle, les quatre vues d'Uma
 * partageraient la même description, et un moteur n'en indexerait qu'une.
 */
export function altRobe(robe: Robe, vue = 1): string {
  /* Seule la première lettre passe en bas de casse. Tout mettre en
   * minuscules abîmait les sigles : « dentelle 3D » devenait « 3d ». */
  const ligne = robe.ligne.charAt(0).toLowerCase() + robe.ligne.slice(1);

  /* La ligne du catalogue nomme presque toujours une coupe. Quand elle
   * n'en nomme aucune — « satin col bénitier » —, on ajoute celle du
   * catalogue : c'est le mot que l'on cherche. On ne l'ajoute jamais si
   * une coupe est déjà citée, sous peine d'écrire « deux en un, sirène »
   * sur Tessa, qui est les deux à la fois. */
  const nommee = CATEGORIES.some((c) => ligne.toLowerCase().includes(c.toLowerCase()));
  const debut = nommee ? ligne : `${robe.categorie.toLowerCase()}, ${ligne}`;

  const qui = robe.createur ? `${robe.nom} par ${robe.createur}` : `modèle ${robe.nom}`;
  const rang = vue > 1 ? `, vue ${vue}` : "";
  return `Robe de mariée ${debut} — ${qui}${rang}, ${LIEU}`;
}

/*
 * La description d'une famille de coupe, quand l'image illustre la coupe
 * et non un modèle précis.
 */
export function altCoupe(coupe: string, precision?: string): string {
  const fin = precision ? ` ${precision}` : "";
  return `Robe de mariée ${coupe.toLowerCase()}${fin} — ${LIEU}`;
}

/* La description d'une photographie de lieu ou d'ambiance. */
export function altScene(quoi: string): string {
  return `${quoi} — ${LIEU}`;
}
