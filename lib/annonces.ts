/*
 * Les annonces du bandeau.
 *
 * La bande blanche du haut — les maisons à gauche, les coordonnées à
 * droite — sert aussi à dire une nouvelle : une collection qui arrive,
 * une journée d'essayage, une fermeture. L'annonce descend sur elle en
 * rouge MADAMOON, reste quelques secondes, puis se retire et rend le
 * bandeau à ce qu'il était.
 *
 * Une seule fois par visite. Une bande qui reviendrait à chaque page
 * cesserait d'être une nouvelle pour devenir une gêne.
 *
 * Pour changer ce qui s'annonce : écrire ici, et rien d'autre. Vider la
 * liste éteint la mécanique — le bandeau reste blanc, sans un octet de
 * plus dans la page.
 */

export type Annonce = {
  fr: string;
  en: string;
  /* L'adresse s'écrit en français, comme partout : « Lien » la traduit
   * sur les pages anglaises. Sans adresse, la bande ne se clique pas. */
  href?: string;
};

export const ANNONCES: Annonce[] = [
  {
    fr: "Nouvelle collection Olya Mak — à essayer au showroom",
    en: "New Olya Mak collection — now in the showroom",
    href: "/createurs/olya-mak",
  },
];

/* Le temps que l'annonce laisse à la page avant de paraître : assez pour
 * que la visiteuse ait posé les yeux sur l'image, pas assez pour qu'elle
 * ait commencé à lire. */
export const ANNONCE_DELAI = 1400;

/* Ce qu'elle reste à l'écran. Six secondes : le temps de lire une ligne
 * de huit mots, deux fois. */
export const ANNONCE_DUREE = 6000;

/* Le temps qu'elle met à descendre, et à remonter. */
export const ANNONCE_GLISSE = 600;
