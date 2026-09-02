/*
 * MADAMOON — la matière du site.
 *
 * Tout ce qui suit vient de la maison : coordonnées, créateurs, catalogue,
 * parcours sur mesure, morphologies, FAQ. Rien n'est inventé. Quand une
 * information manque, elle est absente — jamais remplacée par un
 * approximatif.
 */

export const MAISON = {
  nom: "MADAMOON",
  baseline: "Boutique de robes de mariée à Paris",
  adresse: "234, rue du Faubourg Saint-Martin",
  codePostal: "75010",
  ville: "Paris",
  pays: "France",
  telephone: "+33 6 41 24 38 47",
  telephoneHref: "tel:+33641243847",
  email: "contact@madamoon.fr",
  emailHref: "mailto:contact@madamoon.fr",
  horaires: [
    { jour: "Lundi", heures: "12h — 21h" },
    { jour: "Mardi — samedi", heures: "10h — 19h" },
  ],
  mentionHoraires: "Sur rendez-vous uniquement",
  prixDepart: "1 500 €",
  reservation: "https://madamoon.fr/prise-de-rendez-vous/",
  reseaux: [
    { label: "Instagram", href: "https://www.instagram.com/madamoon.paris/" },
    { label: "TikTok", href: "https://www.tiktok.com/@madamoon.paris" },
    { label: "Facebook", href: "https://www.facebook.com/profile.php?id=100094615813297" },
  ],
} as const;

export const SITE_URL = "https://madamoon.fr";

/* Les maisons dont MADAMOON présente les collections. */
export type Createur = {
  nom: string;
  /* L'adresse de sa page. Écrite, jamais dérivée : une URL ne doit pas
   * changer parce qu'on a corrigé une majuscule dans un nom. */
  slug: string;
  origine: string;
  note: string;
  /* La robe qui ouvre sa page : son film s'il en existe un, sa
   * photographie sinon. */
  ouverture: { robe: string; vue: number };
};

export const CREATEURS: Createur[] = [
  {
    nom: "Watters Designs",
    slug: "watters-designs",
    origine: "Dallas",
    note: "Dentelles travaillées, dos illusion, tombés légers. La maison d'Uma et de Pendant.",
    ouverture: { robe: "uma", vue: 1 },
  },
  {
    nom: "Casablanca Bridal",
    slug: "casablanca-bridal",
    origine: "Californie",
    note: "Le mikado, le satin duchesse, les lignes nettes. Des robes construites, faites pour la lumière.",
    ouverture: { robe: "tessa", vue: 1 },
  },
  {
    nom: "Olya Mak",
    slug: "olya-mak",
    origine: "Barcelone",
    note: "Le drapé, la transparence, la sensualité retenue. Des robes qui bougent avec celle qui les porte.",
    ouverture: { robe: "venus", vue: 1 },
  },
  {
    nom: "Angeola Biarritz",
    slug: "angeola-biarritz",
    origine: "Biarritz",
    note: "La dentelle française et le romantisme atlantique, dans des coupes contemporaines.",
    ouverture: { robe: "sienna", vue: 1 },
  },
  {
    nom: "Monica Loretti",
    slug: "monica-loretti",
    origine: "Italie",
    note: "L'école italienne : proportions justes, broderies denses, savoir-faire de bustier.",
    ouverture: { robe: "lorette", vue: 1 },
  },
];

export function createurParSlug(slug: string): Createur | undefined {
  return CREATEURS.find((c) => c.slug === slug);
}

/* Le filtre de la maison : sur sa page, on ne montre que ses robes. */
export function robesDe(nom: string): Robe[] {
  return ROBES.filter((r) => r.createur === nom);
}

/* Les silhouettes que la maison travaille, dans l'ordre du catalogue. */
export function silhouettesDe(nom: string): Categorie[] {
  const siennes = new Set(robesDe(nom).map((r) => r.categorie));
  return CATEGORIES.filter((c) => siennes.has(c));
}

/*
 * Les morphologies auxquelles ses coupes répondent en premier.
 *
 * On ne retient qu'une morphologie dont l'une des deux recommandations
 * principales figure au catalogue de la maison : le conseil doit pouvoir
 * s'essayer sur place, sinon il ne vaut rien.
 */
export function morphologiesDe(nom: string): Morphologie[] {
  const siennes = silhouettesDe(nom);
  return MORPHOLOGIES.filter((m) => m.premieres.some((c) => siennes.includes(c)));
}

/* Les engagements de la maison. */
export const SIGNATURES = [
  {
    titre: "Essayage privé",
    texte: "Le showroom est privatisé pour vous pendant une heure. Venez accompagnée.",
  },
  {
    titre: "Confection sur mesure",
    texte: "Chaque robe est réalisée à l'atelier, selon vos mensurations.",
  },
  {
    titre: "Retouches incluses",
    texte: "Nos couturières ajustent votre robe jusqu'au dernier essayage.",
  },
  {
    titre: `À partir de ${MAISON.prixDepart}`,
    texte: "Pour une confection sur mesure, retouches comprises.",
  },
] as const;

/* ————————————————————————————————————— Le catalogue ————— */

export type Categorie =
  | "Sirène"
  | "Fluide"
  | "Trapèze"
  | "Princesse"
  | "Minimaliste"
  | "Deux en un";

export const CATEGORIES: Categorie[] = [
  "Sirène",
  "Fluide",
  "Trapèze",
  "Princesse",
  "Minimaliste",
  "Deux en un",
];

/* Ce que chaque famille de coupe veut dire, en boutique. */
export const FAMILLES: Record<Categorie, string> = {
  Sirène: "Ajustée jusqu'aux genoux, puis évasée. Elle dessine la taille et les hanches.",
  Fluide: "Un tombé souple, sans structure apparente. Elle suit le mouvement.",
  Trapèze: "Un buste ajusté, une jupe qui s'ouvre en A. La coupe la plus universelle.",
  Princesse: "Un bustier travaillé et un volume de jupe assumé. La robe d'apparat.",
  Minimaliste: "Le satin, la ligne, rien d'autre. Tout se joue dans la coupe.",
  "Deux en un": "Une robe, deux allures : une surjupe ou une traîne qui se détache.",
};

export type Robe = {
  slug: string;
  nom: string;
  /* La ligne du catalogue MADAMOON. */
  ligne: string;
  categorie: Categorie;
  /* Ce que l'on remarque en premier — décrit d'après la photographie. */
  regard: string;
  /* Nombre de vues disponibles dans /public/robes. */
  vues: number;
  createur?: string;
};

export const ROBES: Robe[] = [
  {
    slug: "uma",
    nom: "Uma",
    ligne: "Sirène en dentelle, dos illusion",
    categorie: "Sirène",
    regard: "Un dos entier de dentelle fermé par une ligne de boutons, jusqu'à la nuque.",
    vues: 4,
    createur: "Watters Designs",
  },
  {
    slug: "pendant",
    nom: "Pendant",
    ligne: "Trapèze en dentelle et tulle",
    categorie: "Trapèze",
    regard: "Un voile immense qui prend la lumière et double le volume de la robe.",
    vues: 4,
    createur: "Watters Designs",
  },
  {
    slug: "adularia",
    nom: "Adularia",
    ligne: "Fluide en charmeuse",
    categorie: "Fluide",
    regard: "Une manche ample, un décolleté croisé, la souplesse du satin lavé.",
    vues: 3,
    createur: "Watters Designs",
  },
  {
    slug: "trinity",
    nom: "Trinity",
    ligne: "Mikado plissé, épaules dénudées",
    categorie: "Princesse",
    regard: "Un pli creux au centre de la jupe et deux nœuds de mikado sur les épaules.",
    vues: 3,
  },
  {
    slug: "amaryllis",
    nom: "Amaryllis",
    ligne: "Satin col bénitier, dos boutonné",
    categorie: "Minimaliste",
    regard: "Le drapé du col bénitier, et une file de boutons couverts le long du dos.",
    vues: 3,
  },
  {
    slug: "aster",
    nom: "Aster",
    ligne: "Mikado et manches de dentelle",
    categorie: "Princesse",
    regard: "Des manches longues en dentelle qui se portent — ou non — sur un bustier droit.",
    vues: 3,
  },
  {
    slug: "fern",
    nom: "Fern",
    ligne: "Broderie végétale sur mikado",
    categorie: "Princesse",
    regard: "Un bustier brodé feuille à feuille sur une jupe de mikado parfaitement lisse.",
    vues: 3,
  },
  {
    slug: "charlize",
    nom: "Charlize",
    ligne: "Sirène corset, fente haute",
    categorie: "Sirène",
    regard: "Un corset apparent, une fente haute et des gants de dentelle en option.",
    vues: 3,
    createur: "Casablanca Bridal",
  },
  {
    slug: "tessa",
    nom: "Tessa",
    ligne: "Sirène, surjupe détachable",
    categorie: "Deux en un",
    regard: "Des fleurs de tissu sur une bretelle asymétrique, et une jupe qui s'enlève.",
    vues: 3,
    createur: "Casablanca Bridal",
  },
  {
    slug: "addison",
    nom: "Addison",
    ligne: "Princesse en mikado, épaules dénudées",
    categorie: "Princesse",
    regard: "Le volume net du mikado ivoire, et de vraies poches.",
    vues: 3,
    createur: "Casablanca Bridal",
  },
  {
    slug: "meredith",
    nom: "Meredith",
    ligne: "Sirène en dentelle 3D, manches longues",
    categorie: "Sirène",
    regard: "Des fleurs en relief posées une à une, jusqu'au bas de la traîne.",
    vues: 3,
    createur: "Casablanca Bridal",
  },
  {
    slug: "clover",
    nom: "Clover",
    ligne: "Robe courte florale et surjupe",
    categorie: "Deux en un",
    regard: "Une robe courte brodée de fleurs de couleur, et une surjupe longue à volonté.",
    vues: 3,
    createur: "Casablanca Bridal",
  },
  {
    slug: "solana",
    nom: "Solana",
    ligne: "Trapèze en dentelle, veste amovible",
    categorie: "Trapèze",
    regard: "Une épaule asymétrique et une petite veste de dentelle qui change tout.",
    vues: 3,
    createur: "Olya Mak",
  },
  {
    slug: "venus",
    nom: "Venus",
    ligne: "Sirène en crêpe, traîne de dentelle",
    categorie: "Sirène",
    regard: "Un crêpe mat sur le corps, une traîne de dentelle qui s'ouvre au sol.",
    vues: 3,
    createur: "Olya Mak",
  },
  {
    slug: "ariel",
    nom: "Ariel",
    ligne: "Sirène brodée, cape amovible",
    categorie: "Sirène",
    regard: "Un corset transparent brodé, et une cape de tulle qui suit la marche.",
    vues: 3,
    createur: "Olya Mak",
  },
  {
    slug: "montana",
    nom: "Montana",
    ligne: "Sirène en crêpe, manches de dentelle",
    categorie: "Sirène",
    regard: "Une encolure carrée très nette, et des manches de dentelle transparentes.",
    vues: 3,
    createur: "Olya Mak",
  },
  {
    slug: "zina",
    nom: "Zina",
    ligne: "Drapé de satin, laçage dos",
    categorie: "Fluide",
    regard: "Un drapé qui tourne autour du corps, fermé au dos par un laçage.",
    vues: 3,
    createur: "Angeola Biarritz",
  },
  {
    slug: "sienna",
    nom: "Sienna",
    ligne: "Trapèze, dentelle sur nude",
    categorie: "Trapèze",
    regard: "Une dentelle blush posée sur un fond nude : la couleur de la peau, en plus doux.",
    vues: 3,
    createur: "Angeola Biarritz",
  },
  {
    slug: "amandine",
    nom: "Amandine",
    ligne: "Princesse en dentelle",
    categorie: "Princesse",
    regard: "Une dentelle dense sur un tulle blush, et des bretelles fines sur l'épaule.",
    vues: 3,
    createur: "Monica Loretti",
  },
  {
    slug: "lorette",
    nom: "Lorette",
    ligne: "Sirène brodée, signature de la maison",
    categorie: "Sirène",
    regard: "Une broderie continue du bustier au bas de la traîne.",
    vues: 2,
    createur: "Monica Loretti",
  },
  {
    slug: "charlotte",
    nom: "Charlotte",
    ligne: "Trapèze en tulle pailleté",
    categorie: "Trapèze",
    regard: "Un bustier plongeant et un tulle qui accroche la lumière sans briller.",
    vues: 3,
  },
  {
    slug: "dove",
    nom: "Dove",
    ligne: "Satin, minimalisme absolu",
    categorie: "Minimaliste",
    regard: "Un satin ivoire, un dos nu, un voile — et rien de plus.",
    vues: 3,
  },
  {
    slug: "finell",
    nom: "Finell",
    ligne: "Coupe nette en mikado ivoire",
    categorie: "Minimaliste",
    regard: "Un bustier cœur et une jupe qui tombe droit, sans un pli de trop.",
    vues: 3,
  },
  {
    slug: "ryle",
    nom: "Ryle",
    ligne: "Fluide, manches ballon",
    categorie: "Fluide",
    regard: "Des manches ballon en satin et un décolleté en V très profond.",
    vues: 3,
  },
  {
    slug: "shiloh",
    nom: "Shiloh",
    ligne: "Sirène en crêpe, dos ouvert",
    categorie: "Sirène",
    regard: "Un dos entièrement ouvert entre deux manches de dentelle.",
    vues: 3,
  },
  {
    slug: "carrie",
    nom: "Carrie",
    ligne: "Trapèze pailleté, bretelles fines",
    categorie: "Trapèze",
    regard: "Un tulle scintillant et un décolleté plongeant maintenu par deux fils.",
    vues: 3,
  },
  {
    slug: "kensington",
    nom: "Kensington",
    ligne: "Princesse en mikado, épaules dénudées",
    categorie: "Princesse",
    regard: "Un buste brodé et une jupe de mikado qui garde sa forme toute la soirée.",
    vues: 3,
  },
  {
    slug: "maribel",
    nom: "Maribel",
    ligne: "Fluide, dentelle et fente",
    categorie: "Fluide",
    regard: "Un buste de dentelle sur une jupe de crêpe fendue.",
    vues: 3,
  },
  {
    slug: "arden",
    nom: "Arden",
    ligne: "Sirène en dentelle romantique",
    categorie: "Sirène",
    regard: "Une dentelle graphique et un dos plongeant jusqu'à la taille.",
    vues: 3,
  },
  {
    slug: "summer",
    nom: "Summer",
    ligne: "Sirène en dentelle, esprit bohème",
    categorie: "Sirène",
    regard: "Une dentelle florale et une traîne large qui se déploie au sol.",
    vues: 3,
  },
  {
    slug: "gabriel",
    nom: "Gabriel",
    ligne: "Courte, jupe transparente amovible",
    categorie: "Deux en un",
    regard: "Une robe courte en plumetis, une jupe transparente par-dessus.",
    vues: 3,
  },
  {
    slug: "emerald",
    nom: "Emerald",
    ligne: "Bustier et tulle, pièce de caractère",
    categorie: "Princesse",
    regard: "Un bustier structuré sur des mètres de tulle plissé.",
    vues: 1,
  },
  {
    slug: "alicia",
    nom: "Alicia",
    ligne: "Trapèze, épaules dénudées",
    categorie: "Trapèze",
    regard: "Une dentelle appliquée qui s'efface vers le bas de la jupe.",
    vues: 3,
  },
  {
    slug: "lovia",
    nom: "Lovia",
    ligne: "Trapèze, dentelle délicate",
    categorie: "Trapèze",
    regard: "Un tulle blush très clair, une fente discrète.",
    vues: 3,
  },
  {
    slug: "angel",
    nom: "Angel",
    ligne: "Trapèze en tulle, voile et légèreté",
    categorie: "Trapèze",
    regard: "Un buste brodé sur une jupe de tulle presque immatérielle.",
    vues: 2,
  },
  {
    slug: "agnessa",
    nom: "Agnessa",
    ligne: "Fluide, silhouette longiligne",
    categorie: "Fluide",
    regard: "Un décolleté en V profond sur une jupe de tulle nude.",
    vues: 2,
  },
  {
    slug: "camille",
    nom: "Camille",
    ligne: "Trapèze en dentelle, manches longues",
    categorie: "Trapèze",
    regard: "Une dentelle sur les épaules et un bas de jupe bordé au sol.",
    vues: 2,
  },
  {
    slug: "dolores",
    nom: "Dolores",
    ligne: "Trapèze, tulle blush",
    categorie: "Trapèze",
    regard: "Un dégradé de rosé très pâle du bustier jusqu'au sol.",
    vues: 2,
  },
  {
    slug: "livia",
    nom: "Livia",
    ligne: "Princesse en mikado, décolleté en V",
    categorie: "Princesse",
    regard: "Un V franc, une taille marquée, une jupe qui tient toute seule.",
    vues: 2,
  },
  {
    slug: "riviera",
    nom: "Riviera",
    ligne: "Sirène en crêpe, manches bouffantes",
    categorie: "Sirène",
    regard: "Un bustier corseté et des manches courtes en organza, portées sur l'épaule.",
    vues: 2,
  },
];

export function robeParSlug(slug: string): Robe | undefined {
  return ROBES.find((r) => r.slug === slug);
}

/* ————————————————————————————————— Le parcours sur mesure ————— */

export const PARCOURS = [
  {
    n: "01",
    titre: "Le rendez-vous",
    texte:
      "Tout commence par la réservation de votre premier essayage privé. Prévoyez idéalement huit à neuf mois avant la date du mariage. Si vous disposez de moins de temps, dites-le nous : nous trouvons presque toujours une solution.",
  },
  {
    n: "02",
    titre: "L'essayage privé",
    texte:
      "Le showroom est privatisé pour vous pendant une heure. Vous pouvez venir accompagnée de votre famille ou de vos amies. Afin de préserver nos robes, nous vous demandons de venir sans maquillage — nous sommes certaines que vous êtes belle au naturel.",
  },
  {
    n: "03",
    titre: "Les mensurations",
    texte:
      "Une fois votre choix fait, nous prenons vos mensurations le jour même pour lancer la confection à l'atelier. Un acompte est versé ce jour-là.",
  },
  {
    n: "04",
    titre: "La confection",
    texte:
      "Votre robe est réalisée à vos mesures. Matières nobles, finitions à la main : le temps de l'atelier est le temps qu'il faut.",
  },
  {
    n: "05",
    titre: "Le deuxième essayage",
    texte:
      "Quand votre robe est prête, vous venez l'essayer en boutique pour vérifier s'il y a besoin d'ajustements.",
  },
  {
    n: "06",
    titre: "Les retouches",
    texte:
      "Nos couturières ajustent chaque détail, sur place. Les retouches sont incluses dans la confection sur mesure. Le solde est réglé ce jour-là.",
  },
  {
    n: "07",
    titre: "L'essayage final",
    texte:
      "Un dernier essayage valide le tombé, la longueur, l'aisance. Votre robe est exactement celle que vous aviez imaginée.",
  },
  {
    n: "08",
    titre: "Le retrait",
    texte: "Vous repartez avec votre robe, parfaitement ajustée.",
  },
] as const;

/* ——————————————————————————————————— Les silhouettes ————— */

export type Lettre = "O" | "A" | "V" | "H" | "8" | "X";

export type Morphologie = {
  lettre: Lettre;
  nom: string;
  silhouette: string;
  objectif: string;
  coupes: string[];
  /* Ce que l'on conseille en premier. */
  premieres: Categorie[];
  /* Ce qui vaut vraiment l'essai. */
  secondes: Categorie[];
  conseil: string;
};

/*
 * Une morphologie n'exclut jamais une robe : elle ouvre des pistes.
 * Rien n'est « à éviter » — c'est un conseil de style, pas une règle.
 */
export const MORPHOLOGIES: Morphologie[] = [
  {
    lettre: "O",
    nom: "Silhouette en O",
    silhouette: "Des courbes généreuses, une poitrine et un ventre marqués.",
    objectif: "Allonger la ligne et mettre la poitrine en valeur.",
    coupes: [
      "Les tombés fluides, qui glissent sans marquer.",
      "Les trapèzes, qui structurent le buste et libèrent le reste.",
      "Les décolletés en V ou en cœur.",
    ],
    premieres: ["Fluide", "Trapèze"],
    secondes: ["Minimaliste", "Princesse"],
    conseil:
      "Les tombés fluides et les coupes trapèze allongent joliment la silhouette. Un décolleté en V ou en cœur met la poitrine en valeur.",
  },
  {
    lettre: "A",
    nom: "Silhouette en A",
    silhouette: "Des épaules plus étroites que les hanches, une taille bien dessinée.",
    objectif: "Ramener le regard vers le haut du corps.",
    coupes: [
      "Un bustier travaillé, riche en détails.",
      "Une jupe évasée qui équilibre les hanches.",
      "Les encolures bateau ou les bustiers droits, qui élargissent l'épaule.",
    ],
    premieres: ["Princesse", "Trapèze"],
    secondes: ["Fluide", "Deux en un"],
    conseil:
      "Un bustier travaillé et une jupe évasée équilibrent les hanches. Les encolures bateau élargissent joliment les épaules.",
  },
  {
    lettre: "V",
    nom: "Silhouette en V",
    silhouette: "Des épaules larges, des hanches plus étroites.",
    objectif: "Adoucir le haut et donner du volume au bas.",
    coupes: [
      "Les jupes amples, en A ou en princesse.",
      "Les structures légères, peu construites aux épaules.",
      "Les décolletés en V, croisés ou asymétriques.",
    ],
    premieres: ["Fluide", "Princesse"],
    secondes: ["Trapèze", "Deux en un"],
    conseil:
      "Les jupes volumineuses et les décolletés en V ou croisés adoucissent la ligne des épaules.",
  },
  {
    lettre: "H",
    nom: "Silhouette en H",
    silhouette: "Une ligne droite, une taille peu marquée.",
    objectif: "Créer de la courbe, sans la forcer.",
    coupes: [
      "Les modèles cintrés à la taille, ou portés avec une ceinture.",
      "Les sirènes légères, qui dessinent sans serrer.",
      "Les coupes empire, qui allongent.",
    ],
    premieres: ["Fluide", "Sirène"],
    secondes: ["Minimaliste", "Trapèze"],
    conseil:
      "Les modèles cintrés à la taille et les sirènes légères dessinent des courbes tout en allongeant la silhouette.",
  },
  {
    lettre: "8",
    nom: "Silhouette en 8",
    silhouette: "Des épaules et des hanches équilibrées, une taille marquée.",
    objectif: "Sublimer une harmonie qui existe déjà.",
    coupes: [
      "Les sirènes et les fourreaux, qui épousent la ligne.",
      "Les bustiers cœur et les encolures en V.",
      "Tout ce qui se cintre à la taille.",
    ],
    premieres: ["Sirène", "Minimaliste"],
    secondes: ["Princesse", "Fluide"],
    conseil:
      "Les sirènes et les fourreaux épousent les courbes ; un bustier cœur ou une encolure en V accentue l'équilibre naturel.",
  },
  {
    lettre: "X",
    nom: "Silhouette en X",
    silhouette: "Une silhouette équilibrée, des courbes douces, une taille fine.",
    objectif: "Valoriser sans en faire trop.",
    coupes: [
      "Bonne nouvelle : presque toutes les coupes vous vont.",
      "Princesse, sirène, fluide ou minimaliste — laissez le style du mariage décider.",
    ],
    premieres: ["Sirène", "Princesse", "Fluide"],
    secondes: ["Minimaliste", "Trapèze"],
    conseil:
      "Bonne nouvelle : presque toutes les coupes vous vont. Laissez le style de votre mariage guider le choix.",
  },
];

export function morphologie(lettre: string): Morphologie | undefined {
  return MORPHOLOGIES.find((m) => m.lettre === lettre);
}

export type Suggestion = { titre: string; intro: string; robes: Robe[] };

/* Trois familles, jamais un verdict. */
export function suggerer(lettre: string): Suggestion[] {
  const m = morphologie(lettre);
  if (!m) return [];

  const premieres = ROBES.filter((r) => m.premieres.includes(r.categorie));
  const secondes = ROBES.filter((r) => m.secondes.includes(r.categorie));
  const reste = ROBES.filter(
    (r) => !m.premieres.includes(r.categorie) && !m.secondes.includes(r.categorie)
  );

  return [
    {
      titre: "Nos recommandations",
      intro: "Les silhouettes qui peuvent particulièrement vous mettre en valeur.",
      robes: premieres.slice(0, 6),
    },
    {
      titre: "Vous pourriez aussi aimer",
      intro: "D'autres modèles à essayer, selon vos envies et le style du mariage.",
      robes: secondes.slice(0, 4),
    },
    {
      titre: "À découvrir",
      intro: "Le reste de la sélection. En boutique, tout se tente.",
      robes: reste.slice(0, 4),
    },
  ].filter((s) => s.robes.length > 0);
}

/* ————————————————————————————————————————————— La FAQ ————— */

export const FAQ = [
  {
    q: "Combien de temps prévoir avant le mariage ?",
    r: "Prévoyez votre rendez-vous d'essayage idéalement huit à neuf mois avant la date du mariage. Pas de panique si vous disposez de moins de temps : nous pourrons toujours vous proposer des solutions. Prenez simplement rendez-vous, nous nous occupons du reste.",
  },
  {
    q: "Comment se passent les essayages au showroom ?",
    r: "Dès que vous avez pris rendez-vous, le showroom est privatisé pour vous pendant une heure. Vous pouvez venir accompagnée de votre famille ou de vos amies. Afin de mieux préserver nos robes de mariée, merci de vous présenter sans maquillage : nous sommes certaines que vous êtes belle au naturel.",
  },
  {
    q: "Quelles sont les étapes d'une confection sur mesure ?",
    r: "La première étape est la prise de votre premier rendez-vous d'essayage. Une fois l'essayage terminé et votre choix réalisé, nous prenons le jour même vos mensurations pour initier la confection à l'atelier. Quand votre robe est prête, vous venez l'essayer en boutique pour vérifier s'il y a besoin d'ajustement. Si oui, un rendez-vous retouches est prévu avec une de nos couturières sur place. Enfin, vous retirez votre robe après l'essayage final.",
  },
  {
    q: "Comment se passe le paiement ?",
    r: "Un acompte est payé le jour de la prise des mensurations. Le solde restant est payé le jour des retouches.",
  },
  {
    q: "Quelle est la fourchette de prix pour une robe sur mesure ?",
    r: "Pour une confection sur mesure, les prix commencent à partir de 1 500 €. Nous vous invitons à nous contacter directement pour avoir plus de précisions sur les modèles qui vous intéressent.",
  },
  {
    q: "Puis-je venir accompagnée ?",
    r: "Oui, et c'est même conseillé. Le showroom est privatisé : votre famille et vos amies sont les bienvenues pendant toute la durée de l'essayage.",
  },
  {
    q: "Où se trouve le showroom MADAMOON ?",
    r: `Au ${MAISON.adresse}, ${MAISON.codePostal} ${MAISON.ville}. Les essayages ont lieu sur rendez-vous uniquement : lundi de 12h à 21h, du mardi au samedi de 10h à 19h.`,
  },
] as const;

/* ————————————————————————————————— Élise, conseillère ————— */

export const AI_ENDPOINT =
  "https://pfbyviktmtjnexvodehg.supabase.co/functions/v1/conseillere-madamoon";
export const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmYnl2aWt0bXRqbmV4dm9kZWhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI2NzY4OTYsImV4cCI6MjA5ODI1Mjg5Nn0.IZ0bCe7DuOmCXt1e2CQQQUelsjE4NI3njRV9eN-OKtw";
