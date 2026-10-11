/*
 * Les descriptions, taillées pour ce que Google montre.
 *
 * Le moteur coupe vers cent soixante signes. Au-delà, ce n'est pas la
 * phrase de trop qui disparaît : c'est la fin, c'est-à-dire presque
 * toujours « Essayage privé sur rendez-vous » — la seule ligne qui
 * demande quelque chose à la lectrice.
 *
 * Les descriptions du site étaient bâties en trois morceaux : une tête
 * qui situe la page, une phrase du contenu, une queue qui appelle. La
 * phrase du milieu est la seule dont la longueur varie, et c'est elle
 * qui faisait déborder — deux cent vingt-deux signes sur la morphologie
 * en O, cent quatre-vingt-dix-huit chez Olya Mak.
 *
 * Elle n'entre donc que si l'ensemble tient, et seulement par sa
 * première phrase. Sinon elle saute, et la queue s'allonge d'un mot
 * pour que la description ne paraisse pas amputée. Une description
 * courte vaut mieux qu'une longue coupée au milieu d'un mot.
 */

/* Cent cinquante-huit, et non cent soixante : la limite de Google est
 * approximative, et dépend de la largeur des lettres. Deux signes de
 * marge coûtent moins qu'une coupure. */
const LIMITE = 158;

export function description(
  tete: string,
  milieu: string,
  queue: string,
  queueSeule: string,
): string {
  /* La première phrase seulement : le découpage se fait sur un point
   * suivi d'une espace, et ces textes n'ont ni abréviation ni décimale.
   * Un texte d'une seule phrase se rend lui-même. */
  const premiere = milieu.split(/(?<=\.)\s/)[0];
  const avec = `${tete} ${premiere} ${queue}`;
  return avec.length <= LIMITE ? avec : `${tete} ${queueSeule}`;
}
