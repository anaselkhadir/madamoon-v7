/*
 * Les règles de la langue qui ne se voient qu'une fois écrites.
 *
 * Un nom de robe est une donnée : on ne peut pas savoir en l'écrivant
 * s'il commencera par une voyelle. « La fiche de Uma » se lisait donc
 * sur seize pages du site, et « les coupes de Olya Mak » sur deux
 * autres. Une maison de couture française ne peut pas écrire cela.
 */

/* Voyelles et h muet : devant eux, la préposition s'élide. Aucun nom du
 * catalogue ne porte de h aspiré — Héra et Hélène s'élident, comme
 * l'usage le veut. */
const ELIDE = /^[aàâäeéèêëiîïoôöuùûüyhAÀÂÄEÉÈÊËIÎÏOÔÖUÙÛÜYH]/;

/**
 * « de » devant un nom : rend « de Tessa » mais « d'Uma ».
 *
 * L'apostrophe est la courbe typographique, celle du reste du site.
 */
export function de(nom: string): string {
  return ELIDE.test(nom) ? `d’${nom}` : `de ${nom}`;
}
