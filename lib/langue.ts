/*
 * Les deux langues du site.
 *
 * Le français reste à la racine. C'est la contrainte qui commande tout
 * le reste : le site est indexé, ses épingles Pinterest et son plan
 * pointent vers /robes/uma, et déplacer le français sous /fr aurait
 * cassé chacun de ces liens. L'anglais s'installe donc à côté, sous
 * /en, et les deux se déclarent l'un l'autre par « hreflang ».
 *
 * Les segments d'adresse sont traduits, pas seulement préfixés :
 * « /en/robes/uma » ne dirait rien à personne, et Google lit les mots de
 * l'adresse. Les identifiants de robe, eux, sont des noms propres et ne
 * changent pas — Uma reste Uma.
 */

export type Langue = "fr" | "en";

export const LANGUES: Langue[] = ["fr", "en"];
export const DEFAUT: Langue = "fr";

/* Les rubriques. La clé est le segment français, tel qu'il est écrit
 * dans les adresses du site. */
export const SEGMENTS: Record<string, string> = {
  robes: "dresses",
  coupes: "silhouettes",
  morphologies: "body-shapes",
  createurs: "designers",
  showroom: "showroom",
  "a-propos": "about",
  "rendez-vous": "appointment",
  "trouver-ma-robe": "find-my-dress",
  "coups-de-coeur": "favourites",
};

/*
 * Les coupes. Le vocabulaire de la robe de mariée a ses termes établis
 * en anglais — « mermaid », « ball gown », « A-line » — et les employer
 * vaut mieux que traduire mot à mot : ce sont ceux que les mariées
 * tapent dans un moteur.
 */
export const COUPES_EN: Record<string, string> = {
  sirene: "mermaid",
  princesse: "ball-gown",
  fluide: "sheath",
  trapeze: "a-line",
  minimaliste: "minimalist",
  "deux-en-un": "two-in-one",
};

/* Les maisons ne se traduisent pas : ce sont des noms propres. */

const INVERSE = (table: Record<string, string>) =>
  Object.fromEntries(Object.entries(table).map(([a, b]) => [b, a]));

const SEGMENTS_FR = INVERSE(SEGMENTS);
const COUPES_FR = INVERSE(COUPES_EN);

/**
 * L'adresse d'une page dans une langue donnée, à partir de son adresse
 * française. C'est le français qui fait référence partout dans le code :
 * une seule table à tenir, et les liens s'écrivent comme avant.
 */
export function versLangue(adresseFr: string, langue: Langue): string {
  if (langue === "fr") return adresseFr;
  if (!adresseFr.startsWith("/")) return adresseFr;

  const [chemin, reste] = adresseFr.split(/(?=[?#])/, 2) as [string, string?];
  const morceaux = chemin.split("/").filter(Boolean);
  if (morceaux.length === 0) return "/en" + (reste ?? "");

  const [rubrique, ...suite] = morceaux;
  const traduite = SEGMENTS[rubrique];
  if (!traduite) return adresseFr;

  const queue =
    rubrique === "coupes" && suite[0] ? [COUPES_EN[suite[0]] ?? suite[0], ...suite.slice(1)] : suite;

  return "/en/" + [traduite, ...queue].join("/") + (reste ?? "");
}

/** L'inverse : l'adresse française d'une page anglaise. */
export function versFrancais(adresseEn: string): string {
  /* La requête est détachée avant de découper le chemin : sans cela,
   * « /en/favourites?robes=uma » cherchait une rubrique nommée
   * « favourites?robes=uma » et retombait sur l'accueil. */
  const [chemin, reste] = adresseEn.split(/(?=[?#])/, 2) as [string, string?];
  const morceaux = chemin.split("/").filter(Boolean);
  if (morceaux[0] !== "en") return adresseEn;
  const [, rubrique, ...suite] = morceaux;
  if (!rubrique) return "/" + (reste ?? "");
  const fr = SEGMENTS_FR[rubrique];
  if (!fr) return "/" + (reste ?? "");
  const queue =
    fr === "coupes" && suite[0] ? [COUPES_FR[suite[0]] ?? suite[0], ...suite.slice(1)] : suite;
  return "/" + [fr, ...queue].join("/") + (reste ?? "");
}

/** La langue que porte une adresse. */
export function langueDe(adresse: string): Langue {
  return adresse === "/en" || adresse.startsWith("/en/") ? "en" : "fr";
}

/** L'adresse de la même page dans l'autre langue. */
export function autreLangue(adresse: string): { langue: Langue; adresse: string } {
  return langueDe(adresse) === "en"
    ? { langue: "fr", adresse: versFrancais(adresse) }
    : { langue: "en", adresse: versLangue(adresse, "en") };
}
