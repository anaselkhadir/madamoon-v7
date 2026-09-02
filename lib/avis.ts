/*
 * Les avis des mariées.
 *
 * Relevés sur la fiche Google de la maison le 2 septembre 2026 : 5,0 de
 * moyenne sur 200 avis. Rien n'est écrit ici à la place d'une cliente —
 * un faux avis sur un site marchand est un délit, pas une licence
 * rédactionnelle.
 *
 * `texte` est l'avis entier, mot pour mot, tel que publié. `extrait` est
 * le passage montré sur la page : toujours d'un seul tenant, jamais
 * recollé, et suivi de crochets pour dire qu'il en manque. Le balisage
 * schema.org, lui, porte l'avis complet — c'est le texte que l'on
 * déclare, pas la coupe que l'on affiche.
 */

export type Avis = {
  /* Le nom tel qu'il figure sur la fiche. On ne le complète ni ne
   * l'abrège : c'est la donnée de quelqu'un d'autre. */
  auteur: string;
  /* Le mois de la visite, comme l'indique Google. */
  date: string;
  texte: string;
  extrait?: string;
  note: 1 | 2 | 3 | 4 | 5;
};

export const AVIS: Avis[] = [
  {
    auteur: "Éloïse Marty",
    date: "Mars 2026",
    note: 5,
    texte:
      "Les robes chez MADAMOON sont simplement sublimes ! J'ai visité 2 autres magasins avant celui-ci et j'ai vu une vraie différence dans la qualité des tissus et le rendu général des robes ! Loin des robes lourdes, ce sont des robes qu'on n'a pas envie d'enlever (même pour les robes « princesse » et volumineuses). Encore merci Mouna pour votre accueil, vous avez visé juste dans le choix des robes et du voile, c'était parfait ! Et pour finir, les robes sont faites sur mesure une fois le modèle choisi et la boutique est sublime ! Je recommande totalement !",
    extrait:
      "J'ai visité 2 autres magasins avant celui-ci et j'ai vu une vraie différence dans la qualité des tissus et le rendu général des robes ! Loin des robes lourdes, ce sont des robes qu'on n'a pas envie d'enlever.",
  },
  {
    auteur: "Maissa Gharbi",
    date: "Février 2026",
    note: 5,
    texte:
      "Une magnifique expérience pour le choix de ma robe de mariée. Mouna est d'une grande gentillesse, très patiente et toujours à l'écoute. Elle a tout de suite compris ce que je recherchais et m'a proposé une robe élégante, unique et parfaitement adaptée à mes envies. J'ai également beaucoup apprécié l'expérience privée et personnalisée, qui a rendu ce moment encore plus spécial. Je recommande cette boutique les yeux fermés !",
    extrait:
      "Elle a tout de suite compris ce que je recherchais et m'a proposé une robe élégante, unique et parfaitement adaptée à mes envies. J'ai également beaucoup apprécié l'expérience privée et personnalisée.",
  },
  {
    auteur: "Alexandra Gattesco",
    date: "Juin 2026",
    note: 5,
    texte:
      "Quel enchantement lorsque Mouna nous a ouvert à mes demoiselles d'honneur et moi les portes de son magasin. En plus d'être de bon conseil, sa bonne humeur est contagieuse. Je suis tombée enceinte entre la prise de mesure initiale et le jour de mon mariage et elle a été réactive dans la gestion des retouches de ma robe sur mesure. Un grand merci pour ça ! À bientôt j'espère !",
    extrait:
      "Je suis tombée enceinte entre la prise de mesure initiale et le jour de mon mariage, et elle a été réactive dans la gestion des retouches de ma robe sur mesure.",
  },
];

/*
 * La note d'ensemble.
 *
 * `source` et `url` ne sont pas décoratifs : une note que la visiteuse ne
 * peut pas aller vérifier ne vaut rien, et l'article L111-7-2 du code de
 * la consommation demande que l'origine des avis soit indiquée.
 */
export const NOTE = {
  moyenne: 5,
  nombre: 200,
  source: "Google",
  url: "https://www.google.com/maps/place/MADAMOON/@48.8813531,2.3656125,17z/data=!4m8!3m7!1s0x47e66fa814c9c5bd:0x5bd1799a0050134!8m2!3d48.8813531!4d2.3656125!9m1!1b1!16s%2Fg%2F11ldhgkrrv",
};

/*
 * Ce que l'on met en avant.
 *
 * La maison voulait « la seule boutique cinq étoiles du 10e ». C'est une
 * allégation comparative : elle l'engage au titre de la publicité
 * trompeuse, et devrait se prouver le jour où un concurrent la conteste —
 * or il existe dans le même arrondissement d'autres boutiques de robes de
 * mariée notées 5 sur 5, avec bien moins d'avis.
 *
 * Deux cents avis sans une seule note en dessous de cinq, voilà le fait
 * remarquable, et il se vérifie d'un clic. On dit donc cela, qui est plus
 * fort parce que c'est vrai.
 */
export const DISTINCTION = "Deux cents avis, pas un en dessous de cinq étoiles.";
