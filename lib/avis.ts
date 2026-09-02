/*
 * Les avis des mariées.
 *
 * Ce fichier ne contient que ce qui est vérifiable. Rien n'y est écrit à
 * la place d'une cliente : un avis inventé est un faux, et un faux avis
 * sur un site marchand est un délit — pas une licence rédactionnelle.
 *
 * Il est vide aujourd'hui parce que la recherche n'a rien donné :
 * MADAMOON n'a d'avis publié ni sur Pages Jaunes, ni sur Mappy, ni sur
 * Mariages.net, et sa fiche Google n'est pas accessible depuis ici. Il
 * faut donc que la maison fournisse les textes, ou l'adresse de sa fiche.
 *
 * La section ne s'affiche pas tant que cette liste est vide. Mieux vaut
 * pas de section qu'une section garnie de rien.
 */

export type Avis = {
  /* Le prénom seul, comme sur la fiche d'origine. On ne complète jamais
   * un nom : c'est la donnée de quelqu'un d'autre. */
  prenom: string;
  /* Le mois et l'année, tels que publiés. */
  date: string;
  /* Le texte, mot pour mot. Ni corrigé, ni raccourci sans le dire. */
  texte: string;
  note: 1 | 2 | 3 | 4 | 5;
};

export const AVIS: Avis[] = [];

/*
 * La note d'ensemble.
 *
 * `source` et `url` ne sont pas décoratifs : une note que la visiteuse ne
 * peut pas aller vérifier ne vaut rien, et la loi française demande que
 * l'origine des avis soit indiquée (article L111-7-2 du code de la
 * consommation).
 */
export const NOTE: { moyenne: number; nombre: number; source: string; url: string } | null = null;

/*
 * La distinction que la maison souhaite mettre en avant — « la seule
 * maison notée cinq étoiles du 10e ».
 *
 * Laissée vide volontairement. C'est une allégation comparative : elle
 * engage la maison au titre de la publicité trompeuse (article L121-2 du
 * code de la consommation) et doit pouvoir être prouvée le jour où un
 * concurrent la conteste. Or la recherche a trouvé dans le même
 * arrondissement au moins deux boutiques de robes de mariée notées 5 sur
 * 5 — Anaïs Designs Paris et Blanc Couture Paris. Tant que l'écart n'est
 * pas établi, la phrase ne peut pas être publiée telle quelle.
 *
 * Une formulation vérifiable dirait la note et le nombre d'avis, sans
 * comparer : c'est ce que fait `NOTE`.
 */
export const DISTINCTION: string | null = null;
