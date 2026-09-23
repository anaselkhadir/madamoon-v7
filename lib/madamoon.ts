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
  /* La photographie de sa vignette sur l'accueil, choisie par la maison.
   * Sans « vue », elle vient de VIGNETTES_CREATEURS ; sans vignette, c'est
   * celle de l'ouverture. */
  vignette?: { robe: string; vue?: number };
};

export const CREATEURS: Createur[] = [
  {
    nom: "Watters Designs",
    slug: "watters-designs",
    origine: "Dallas",
    note: "Dentelles travaillées, dos illusion, tombés légers. La maison d'Uma et de Pendant.",
    ouverture: { robe: "uma", vue: 2 },
    vignette: { robe: "pendant" },
  },
  {
    nom: "Casablanca Bridal",
    slug: "casablanca-bridal",
    origine: "Newport Beach",
    note: "Satin de soie, dentelle française… des robes faites pour la lumière.",
    /* Meredith plutôt que Tessa : Tessa est le seul film « deux en un »
     * du catalogue, et la page de cette coupe en a plus besoin. */
    ouverture: { robe: "meredith", vue: 1 },
    vignette: { robe: "ariel" },
  },
  {
    nom: "Olya Mak",
    slug: "olya-mak",
    origine: "Lviv",
    note: "Le drapé, la transparence, la sensualité retenue. Des robes qui bougent avec celle qui les porte.",
    /* Le film de Seraphina, envoyé par la maison pour sa page. */
    ouverture: { robe: "seraphina", vue: 1 },
    vignette: { robe: "seraphina", vue: 3 },
  },
  {
    nom: "Monica Loretti",
    slug: "monica-loretti",
    origine: "Rome",
    note: "L'école italienne : proportions justes, broderies denses, matières nobles.",
    /* Monica porte le nom de la maison sur une place romaine : son
     * origine, dans l'image. */
    ouverture: { robe: "monica", vue: 1 },
  },
  /*
   * Les petits ateliers, réunis sous un seul nom.
   *
   * Ce n'est pas une maison : c'est le reste du catalogue, celui que la
   * boutique trouve un par un et ne veut pas désigner à la concurrence.
   * Il lui fallait pourtant une page — sans elle, un tiers des robes
   * n'appartenait à rien et n'apparaissait dans aucun classement par
   * créateur.
   *
   * Elle vient en dernier : la barre du haut ne montre que les quatre
   * premières, et ce sont des maisons nommées.
   */
  {
    nom: "Autres créateurs",
    slug: "autres-createurs",
    origine: "Petits ateliers indépendants",
    note: "Des ateliers européens indépendants, avec des modèles exclusifs.",
    ouverture: { robe: "hera", vue: 1 },
  },
];

export function createurParSlug(slug: string): Createur | undefined {
  return CREATEURS.find((c) => c.slug === slug);
}

/* Une robe ne connaît sa maison que par son nom : c'est de lui qu'on
 * remonte à sa page. */
export function createurParNom(nom: string | undefined): Createur | undefined {
  return nom ? CREATEURS.find((c) => c.nom === nom) : undefined;
}

/* Le filtre de la maison : sur sa page, on ne montre que ses robes. */
/* Le nom sous lequel se rangent les robes sans maison. */
export const AUTRES_CREATEURS = "Autres créateurs";

/* La maison qui travaille en demi-mesure : la robe part d'un patron
 * maison et s'ajuste, là où les autres taillent pour une seule mariée.
 * La fiche le dit, plutôt que de laisser croire au sur-mesure. */
export const SEMI_MESURE = "Watters Designs";

export function robesDe(nom: string): Robe[] {
  if (nom === AUTRES_CREATEURS) return ROBES.filter((r) => !r.createur);
  return ROBES.filter((r) => r.createur === nom);
}

/* Les coupes que la maison travaille, dans l'ordre du catalogue. */
export function coupesDe(nom: string): Categorie[] {
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
  const siennes = coupesDe(nom);
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
  | "Deux en un";

export const CATEGORIES: Categorie[] = [
  "Sirène",
  "Fluide",
  "Trapèze",
  "Princesse",
  "Deux en un",
];

/* Ce que chaque famille de coupe veut dire, en boutique. */
export const FAMILLES: Record<Categorie, string> = {
  Sirène: "Ajustée jusqu'aux cuisses, puis évasée. Elle dessine la taille et les hanches.",
  Fluide: "Un tombé souple qui suit naturellement le mouvement.",
  Trapèze: "Un buste ajusté, une jupe qui s'ouvre en A. La coupe la plus universelle.",
  Princesse: "Un corset travaillé et un volume de jupe assumé.",
  "Deux en un": "Une robe, deux allures : une surjupe ou une traîne qui se détache.",
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
  /* La vue qui représente la robe quand une seule image la montre —
   * tuile, partage, catalogue. La première par défaut. Tessa est une
   * deux-en-un : sa vue avec surjupe dit mieux ce qu'elle est. */
  couverture?: number;
  createur?: string;
  /* Les morphologies que cette robe sert en premier. Relevé sur les
   * fiches produit de la cliente, jamais déduit d'une photographie :
   * c'est elle qui fait essayer les robes, pas nous. */
  morphos?: Lettre[];
};

export const ROBES: Robe[] = [
  {
    slug: "uma",
    nom: "Uma",
    ligne: "Sirène en dentelle, dos illusion",
    categorie: "Sirène",
    regard: "Une dentelle fine et un dos transparent fermé par une ligne de jolis boutons couleur ivoire.",
    vues: 9,
    /* La photographie de face : la première est de dos. */
    couverture: 2,
    createur: "Watters Designs",
    morphos: ["V", "H", "8", "X"],
  },
  {
    slug: "pendant",
    nom: "Pendant",
    ligne: "Trapèze en dentelle, avec des manches longues",
    categorie: "Trapèze",
    regard:
      "Une robe de mariée où le romantisme rencontre la majesté. Son décolleté épaules dénudées dévoile délicatement le haut du buste, tandis que ses longues manches en dentelle apportent une touche de sophistication et de féminité.",
    vues: 47,
    /* La photographie de face : la première est de dos. */
    couverture: 2,
    createur: "Watters Designs",
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "adularia",
    nom: "Adularia",
    ligne: "Fluide en charmeuse",
    categorie: "Fluide",
    regard:
      "L'élégance minimaliste avec une allure résolument moderne. Confectionnée dans une délicate étoffe charmeuse, elle épouse harmonieusement la silhouette tout en offrant un tombé fluide et sophistiqué.",
    vues: 4,
    createur: "Watters Designs",
  },
  {
    slug: "trinity",
    nom: "Trinity",
    ligne: "En mikado ou en jacquard, épaules dénudées",
    categorie: "Princesse",
    regard:
      "Une coupe flatteuse avec une touche de glamour grâce à sa fente sur le côté.",
    vues: 11,
    createur: "Watters Designs",
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "amaryllis",
    nom: "Amaryllis",
    ligne: "Coupe droite ou sirène en charmeuse, boutons sur le côté",
    categorie: "Sirène",
    regard:
      "Une création moderne et audacieuse avec une file de boutons sur le côté. Les bretelles d'Amaryllis se portent sur les épaules pour la version classique, ou sur les bras si vous préférez les bretelles tombantes.",
    vues: 5,
    createur: "Watters Designs",
    morphos: ["V", "H", "8", "X"],
  },
  {
    slug: "aster",
    nom: "Aster",
    ligne: "Dentelle de Chantilly, satin et manches amovibles",
    categorie: "Trapèze",
    regard: "Des manches longues en dentelle qui se portent — ou non — sur un bustier droit.",
    vues: 6,
    /* La photographie de face : la première est de dos. */
    couverture: 2,
    createur: "Watters Designs",
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "fern",
    nom: "Fern",
    ligne: "Mikado brodé de fleurs de perles",
    categorie: "Princesse",
    regard: "Une robe de mariée raffinée, audacieuse et résolument unique.",
    vues: 3,
    createur: "Watters Designs",
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "charlize",
    nom: "Charlize",
    ligne: "Satin mat et dentelle de Chantilly",
    categorie: "Sirène",
    regard:
      "Un corset transparent — ou doublé, si vous n'appréciez pas la transparence — et une jolie fente qui s'ouvre sur une jupe en dentelle de Chantilly.",
    vues: 10,
    createur: "Casablanca Bridal",
    morphos: ["V", "H", "8", "X"],
  },
  {
    slug: "tessa",
    nom: "Tessa",
    ligne: "Sirène, surjupe détachable",
    categorie: "Deux en un",
    regard:
      "Une robe de mariée au charme vintage-chic, un corset structuré et des bretelles amovibles pour un autre look.",
    vues: 13,
    couverture: 3,
    createur: "Casablanca Bridal",
    morphos: ["V", "H", "8", "X"],
  },
  {
    slug: "meredith",
    nom: "Meredith",
    ligne: "Sirène, dentelle en relief pour un look sophistiqué",
    categorie: "Sirène",
    regard:
      "Décolleté en cœur, une ligne féminine et romantique qui sublime le buste avec élégance.",
    vues: 8,
    createur: "Casablanca Bridal",
    morphos: ["V", "H", "8", "X"],
  },
  {
    slug: "clover",
    nom: "Clover",
    ligne: "Robe courte florale et surjupe",
    categorie: "Deux en un",
    regard: "Une robe courte brodée de fleurs de couleur, et une surjupe longue à volonté.",
    vues: 6,
    createur: "Casablanca Bridal",
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "solana",
    nom: "Solana",
    ligne: "Trapèze, appliqués de dentelle et sequins mats",
    categorie: "Trapèze",
    regard:
      "Une somptueuse robe de mariée princesse ou trapèze, en tulle et dentelle florale, avec veste asymétrique amovible, décolleté en cœur et longue traîne.",
    vues: 8,
    createur: "Casablanca Bridal",
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "venus",
    nom: "Venus",
    ligne: "Sirène en satin mat, traîne majestueuse et dos en dentelle",
    categorie: "Sirène",
    regard:
      "Son décolleté graphique, souligné par de fines bretelles ornées de perles, apporte une touche de modernité et de raffinement. Son corsage structuré par des baleines discrètes dessine harmonieusement la silhouette, tandis que son dos en tulle illusion dévoile une transparence subtile et sophistiquée.",
    vues: 8,
    createur: "Casablanca Bridal",
    morphos: ["H", "8", "X"],
  },
  {
    slug: "ariel",
    nom: "Ariel",
    ligne: "Sirène en satin mat, pétales de mousseline posés à la main",
    categorie: "Sirène",
    regard:
      "Une robe de mariée sirène en satin mat : décolleté en cœur, pétales floraux en relief, corset apparent dans le dos et bretelles amovibles.",
    vues: 10,
    createur: "Casablanca Bridal",
    morphos: ["V", "H", "8", "X"],
  },
  {
    slug: "addison",
    nom: "Addison",
    ligne: "Satin de soie, bretelles tombantes amovibles",
    categorie: "Princesse",
    regard:
      "De romantiques motifs floraux appliqués à la main, en mousseline, apportent un relief poétique à la robe Addison. Sa jupe épurée est dotée de poches bien pratiques et d'une infinité de boutons qui court jusqu'au bout de la traîne.",
    vues: 7,
    createur: "Casablanca Bridal",
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "montana",
    nom: "Montana",
    ligne: "Sirène en satin mat, manches longues en dentelle et dos illusion",
    categorie: "Sirène",
    regard:
      "Une robe de mariée minimaliste et élégante, qui sublime la silhouette avec une sophistication intemporelle.",
    vues: 4,
    createur: "Casablanca Bridal",
    morphos: ["A", "H", "8", "X"],
  },
  {
    slug: "zina",
    nom: "Zina",
    ligne: "Sirène à fente, fleurs 3D optionnelles",
    categorie: "Sirène",
    regard:
      "Une robe de mariée sirène en georgette stretch et satin mat, ornée de fleurs 3D faites main, avec fente centrale et corset à laçage. Une robe spectaculaire, qui célèbre la féminité avec audace et sophistication.",
    vues: 9,
    createur: "Casablanca Bridal",
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "sienna",
    nom: "Sienna",
    ligne: "Princesse ou trapèze en dentelle",
    categorie: "Trapèze",
    regard:
      "Le bustier, avec son décolleté en cœur subtilement revisité, met en valeur le buste avec féminité, tandis que sa jupe ample apporte un volume généreux et une silhouette digne des plus beaux contes de fées.",
    vues: 4,
    createur: "Casablanca Bridal",
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "amandine",
    nom: "Amandine",
    ligne: "Princesse en dentelle, décolleté plongeant",
    categorie: "Princesse",
    regard:
      "Une robe de mariée digne des plus beaux lieux de mariage. Sa dentelle arbore des motifs d'un style royal, tandis que son encolure en V lui donne une allure moderne.",
    vues: 3,
  },
  {
    slug: "charlotte",
    nom: "Charlotte",
    ligne: "Princesse ou trapèze en dentelle Caterina",
    categorie: "Trapèze",
    regard:
      "Robe bustier au décolleté en cœur, corset en taille basque et dentelle Caterina : le rêve de la mariée romantique et élégante. Elle existe aussi sans le décolleté plongeant, pour une version plus couvrante.",
    vues: 4,
    createur: "Watters Designs",
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "dove",
    nom: "Dove",
    ligne: "Tombé fluide en satin mat, décolleté drapé et épaules dénudées",
    categorie: "Fluide",
    regard:
      "La robe de mariée qui réunit l'élégance intemporelle et le confort absolu. Avec son dos ouvert et sa ligne infinie de boutons jusqu'à la traîne, Dove promet une allure poétique et pure.",
    vues: 6,
    createur: "Casablanca Bridal",
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "finell",
    nom: "Finell",
    ligne: "Bustier cœur en satin, jupe trapèze",
    categorie: "Trapèze",
    regard:
      "Un décolleté inoubliable, grâce à cette encolure en cœur sculptée. Finell offre un corset qui marque la taille, des coutures structurées et une élégante jupe trapèze à traîne chapelle.",
    vues: 6,
    createur: "Watters Designs",
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "ryle",
    nom: "Ryle",
    ligne: "Fluide, manches ballon",
    categorie: "Fluide",
    regard:
      "Des manches ballon, un décolleté en V profond et un tombé à couper le souffle, dans une délicate étoffe de charmeuse.",
    vues: 6,
    createur: "Watters Designs",
    morphos: ["A", "V", "H", "8", "X"],
  },
  {
    slug: "shiloh",
    nom: "Shiloh",
    ligne: "Sirène en dentelle de Chantilly, jupe en crêpe et fente centrale",
    categorie: "Sirène",
    regard:
      "Une robe au caractère affirmé : Shiloh a été imaginée pour la mariée moderne, en quête d'une allure chic et singulière.",
    vues: 8,
    createur: "Casablanca Bridal",
    morphos: ["A", "8", "X"],
  },
  {
    slug: "carrie",
    nom: "Carrie",
    ligne: "Trapèze pailletée, fines bretelles et corset perlé à la main",
    categorie: "Trapèze",
    regard:
      "Un rêve de conte de fées. Carrie sublime toutes les silhouettes par son allure féerique et ses détails délicatement scintillants. Son corsage brodé de perles révèle de magnifiques motifs de feuilles et de lianes, portés par de fines doubles bretelles spaghetti. La jupe volumineuse se compose de plusieurs couches de tulle pailleté, léger et aérien, qui donnent à la silhouette une dimension spectaculaire.",
    vues: 8,
    createur: "Casablanca Bridal",
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "maribel",
    nom: "Maribel",
    ligne: "Fluide minimaliste en mousseline stretch, corsage brodé à la main",
    categorie: "Fluide",
    regard:
      "Une robe de mariée moderne : décolleté en V, corsage brodé et perlé à la main, jupe fluide en mousseline, fente et traîne légère.",
    vues: 3,
    createur: "Casablanca Bridal",
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "summer",
    nom: "Summer",
    ligne: "Sirène en dentelle d'Alençon, décolleté en V et longue traîne",
    categorie: "Sirène",
    regard:
      "La beauté de la dentelle française dans une silhouette féminine et raffinée. Sa coupe sirène évasée épouse délicatement les courbes avant de s'ouvrir avec élégance, pour une allure à la fois romantique et glamour.",
    vues: 5,
    /* La photographie de face : la première est de dos. */
    couverture: 3,
    createur: "Casablanca Bridal",
    morphos: ["V", "8", "X"],
  },
  {
    slug: "gabriel",
    nom: "Gabriel",
    ligne: "Courte, jupe transparente amovible",
    categorie: "Deux en un",
    regard: "Une robe courte délicatement perlée, une jupe transparente en dessous.",
    vues: 7,
    createur: "Watters Designs",
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "emerald",
    nom: "Emerald",
    ligne: "Trapèze, corsage perlé, décolleté en V et jupe de tulle ou de satin",
    categorie: "Trapèze",
    regard:
      "Sa silhouette trapèze met harmonieusement en valeur les courbes, tandis que son corsage illusion dévoile de somptueux détails de broderies et de perles aux motifs délicatement entrelacés. Ses fines bretelles spaghetti et son décolleté en V classique soulignent le buste avec féminité. À l'arrière, le dos en V prolonge cette ligne élégante et apporte une touche de sensualité subtile.",
    vues: 1,
    createur: "Casablanca Bridal",
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "alicia",
    nom: "Alicia",
    ligne: "Trapèze ou volume princesse, épaules dégagées et fente",
    categorie: "Trapèze",
    regard:
      "Alicia est une magnifique robe de mariée en dentelle et tulle : une légèreté appréciable, et un look féerique et mémorable.",
    vues: 3,
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "lovia",
    nom: "Lovia",
    ligne: "Trapèze ou volume princesse, dentelle délicate, corset à encolure en V et fente",
    categorie: "Trapèze",
    regard:
      "Avec ses bretelles fines ornées de toutes petites perles, son corset qui marque bien la taille et son décolleté en V, Lovia est parfaite pour un look sensuel, inspiré par la nature.",
    vues: 3,
    morphos: ["O", "A", "V", "H", "8", "X"],
    /* La photographie de face : la première est de dos. */
    couverture: 2,
  },
  {
    slug: "angel",
    nom: "Angel",
    ligne: "Trapèze, perles et paillettes",
    categorie: "Trapèze",
    regard:
      "Angel est idéale pour la mariée pétillante, qui aime les paillettes. Son décolleté et son dos en V créent un parfait équilibre sur ce corset qui souligne la taille. La jupe simple contraste avec le haut, perlé à la main.",
    vues: 2,
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "dolores",
    nom: "Dolores",
    ligne: "Trapèze ou princesse en tulle, col carré",
    categorie: "Trapèze",
    regard:
      "Confectionnée en tulle, dentelle et perles, elle se caractérise par son encolure carrée, qui flatte le buste. Son dos transparent en dentelle est joliment orné de boutons, jusqu'au bas du corset.",
    vues: 2,
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "livia",
    nom: "Livia",
    ligne: "Princesse en mikado, décolleté en V",
    categorie: "Princesse",
    regard: "Un V franc, une taille marquée, une jupe qui tient toute seule.",
    vues: 2,
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "riviera",
    nom: "Riviera",
    ligne: "Sirène en crêpe, manches bouffantes",
    categorie: "Sirène",
    regard: "Un bustier corseté et des manches courtes en organza, portées sur l'épaule.",
    vues: 2,
    /* La photographie de face : la première est de dos. */
    couverture: 2,
    createur: "Watters Designs",
    morphos: ["V", "H", "8", "X"],
  },
  {
    slug: "kensington",
    nom: "Kensington",
    ligne: "Princesse en mikado, épaules dénudées",
    categorie: "Princesse",
    regard:
      "Cette robe de mariée princesse se distingue par son corsage entièrement orné de somptueuses broderies de perles argentées, qui se prolongent délicatement le long des manches tombant sur les épaules. Sa jupe spectaculaire, confectionnée entièrement en mikado, apporte structure et volume à la silhouette, tandis que sa traîne de deux mètres crée une allure grandiose.",
    vues: 4,
    createur: "Casablanca Bridal",
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "nirali",
    nom: "Nirali",
    ligne: "Trapèze à taille basse, fleurs à l'encolure",
    categorie: "Trapèze",
    regard: "Des fleurs faites main, posées une à une le long de l'encolure droite.",
    vues: 1,
    createur: "Watters Designs",
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "calla",
    nom: "Calla",
    ligne: "Trapèze en dentelle sur tulle souple",
    categorie: "Trapèze",
    regard: "La dentelle court sur le bustier corseté et s'arrête net à l'encolure ronde.",
    vues: 1,
    createur: "Watters Designs",
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "fortune",
    nom: "Fortune",
    ligne: "Trapèze en crêpe et organza",
    categorie: "Trapèze",
    regard: "Un bustier sans bretelles, et la jupe qui s'ouvre d'un seul mouvement.",
    vues: 1,
    createur: "Watters Designs",
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "siddalee",
    nom: "Siddalee",
    ligne: "Sirène à motifs floraux, longue traîne",
    categorie: "Sirène",
    regard: "Une bretelle amovible sur l'épaule, et une traîne qui n'en finit pas.",
    vues: 1,
    createur: "Watters Designs",
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "mitra",
    nom: "Mitra",
    ligne: "Princesse à taille basse, rubans de velours",
    categorie: "Princesse",
    regard: "Des rubans de velours posés à la naissance des drapés de la jupe.",
    vues: 1,
    createur: "Watters Designs",
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "ember",
    nom: "Ember",
    ligne: "Princesse en dupion, bustier corseté",
    categorie: "Princesse",
    regard: "Un décolleté cœur entaillé d'un V, et la taille descendue très bas.",
    vues: 1,
    createur: "Watters Designs",
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "rowan",
    nom: "Rowan",
    ligne: "Sirène en charmeuse, corset transparent",
    categorie: "Sirène",
    regard: "Un corset brodé que l'on voit à travers, sous une encolure drapée.",
    vues: 1,
    createur: "Watters Designs",
    morphos: ["V", "H", "8", "X"],
  },
  {
    slug: "clover-perles",
    nom: "Clover avec ou sans perles",
    ligne: "Princesse en dentelle Caterina, perles à l'encolure",
    categorie: "Princesse",
    regard: "Une encolure carrée soulignée de perles, et la taille descendue sur la jupe.",
    vues: 8,
    createur: "Watters Designs",
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "marie",
    nom: "Marie",
    ligne: "Fluide, ligne intemporelle",
    categorie: "Fluide",
    regard: "Rien qui accroche : la robe tombe, et c'est tout ce qu'elle fait.",
    vues: 2,
    createur: "Monica Loretti",
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "mathilda",
    nom: "Mathilda",
    ligne: "Fluide à taille haute",
    categorie: "Fluide",
    regard: "Une coupe pensée pour être portée enceinte sans rien changer à la ligne.",
    vues: 2,
    createur: "Monica Loretti",
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "murielle",
    nom: "Murielle",
    ligne: "Mousseline, dentelle florale et manches illusion",
    categorie: "Fluide",
    regard: "Un dos en V profond, et une fente qui ouvre la mousseline à chaque pas.",
    vues: 3,
    createur: "Monica Loretti",
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "agnessa",
    nom: "Agnessa",
    ligne: "Fluide, décolleté et dos spectaculaires en V",
    categorie: "Fluide",
    regard:
      "Un corset perlé à la main, combiné à une jupe de tulle fluide : Agnessa est idéale pour une allure naturellement glamour.",
    vues: 2,
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "mira",
    nom: "Mira",
    ligne: "Sirène en crêpe, fente haute",
    categorie: "Sirène",
    regard: "Des appliques de dentelle perlées qui accrochent la lumière au moindre geste.",
    vues: 6,
    createur: "Monica Loretti",
    morphos: ["V", "H", "8", "X"],
  },
  {
    slug: "monica",
    nom: "Monica",
    ligne: "Jacquard floral, ceinture large",
    categorie: "Trapèze",
    regard: "Une ceinture large qui marque la taille, et la jupe qui s'ouvre en dessous.",
    vues: 5,
    createur: "Monica Loretti",
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "milan",
    nom: "Milan",
    ligne: "Crêpe léger, fente moderne",
    categorie: "Fluide",
    regard: "Aucun ornement : une ligne nette, et la fente pour seule audace.",
    vues: 4,
    createur: "Monica Loretti",
    morphos: ["H", "8", "X"],
  },
  {
    slug: "chastity",
    nom: "Chastity",
    ligne: "Dentelle et manches longues, volume amovible",
    categorie: "Deux en un",
    regard: "Un col haut, de la dentelle jusqu'aux poignets, et le volume qui part des hanches.",
    vues: 4,
    createur: "Olya Mak",
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "river",
    nom: "River",
    ligne: "Courte, ligne sculptée",
    categorie: "Trapèze",
    regard: "Une coupe qui tient toute seule, sans un pli de trop.",
    vues: 2,
    createur: "Olya Mak",
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "seraphina",
    nom: "Seraphina",
    ligne: "Princesse en dentelle brodée main",
    categorie: "Princesse",
    regard: "Chaque fleur de dentelle est posée à la main sur un bustier transparent.",
    vues: 4,
    createur: "Olya Mak",
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "elin",
    nom: "Elin",
    ligne: "Courte en crêpe, pour la mairie",
    categorie: "Sirène",
    regard: "Faite pour la cérémonie civile : nette, légère, sans traîne.",
    vues: 2,
    createur: "Olya Mak",
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  /* Les deux robes que la maison a fournies en dernier. Le classeur ne
   * leur donne pas de créateur — « Autre » — et les annonce pour toutes
   * les morphologies. Héra y porte deux coupes, « Trapèze, princesse » ;
   * le site n'en range qu'une par robe, et c'est la première qui la
   * décrit le mieux : la jupe part de la taille sans structure. */
  {
    slug: "hera",
    nom: "Héra",
    ligne: "Trapèze en satin, fente devant",
    categorie: "Trapèze",
    regard: "Un décolleté Bardot qui dégage les épaules, et une fente qui ouvre la jupe sur le devant.",
    vues: 3,
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "helene",
    nom: "Hélène",
    ligne: "Mousseline fluide, corset perlé",
    categorie: "Fluide",
    regard: "Un corset de dentelle à fleurs en relief, sur une jupe de mousseline qui ne pèse rien.",
    vues: 2,
    /* La photographie de face : la première est de dos. */
    couverture: 2,
    morphos: ["O", "A", "V", "H", "8", "X"],
  }
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
      "Tout commence par la réservation de votre premier essayage privé. Prévoyez idéalement huit à neuf mois avant la date du mariage. Si vous disposez de moins de temps, dites-le nous : nous trouvons presque toujours une solution.",
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
      "Votre robe est réalisée à vos mesures. Matières nobles, finitions à la main : le temps de l'atelier est le temps qu'il faut.",
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
  /* La robe qui ouvre sa page : son film s'il en existe un. Chaque
   * morphologie en reçoit un différent — le catalogue en compte sept. */
  ouverture: { robe: string; vue: number };
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
    ouverture: { robe: "montana", vue: 1 },
    nom: "Morphologie en O",
    silhouette: "Des courbes généreuses, une poitrine et un ventre marqués.",
    objectif: "Allonger la ligne et mettre la poitrine en valeur.",
    coupes: [
      "Les tombés fluides, qui glissent sans marquer.",
      "Les trapèzes, qui structurent le buste et libèrent le reste.",
      "Les décolletés en V ou en cœur.",
    ],
    premieres: ["Fluide", "Trapèze"],
    secondes: ["Princesse", "Sirène"],
    conseil:
      "Les tombés fluides et les coupes trapèze allongent joliment la ligne. Un décolleté en V ou en cœur met la poitrine en valeur.",
  },
  {
    lettre: "A",
    ouverture: { robe: "solana", vue: 1 },
    nom: "Morphologie en A",
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
    ouverture: { robe: "addison", vue: 1 },
    nom: "Morphologie en V",
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
    ouverture: { robe: "ariel", vue: 1 },
    nom: "Morphologie en H",
    silhouette: "Une ligne droite, une taille peu marquée.",
    objectif: "Créer de la courbe, sans la forcer.",
    coupes: [
      "Les modèles cintrés à la taille, ou portés avec une ceinture.",
      "Les sirènes légères, qui dessinent sans serrer.",
      "Les coupes empire, qui allongent.",
    ],
    premieres: ["Fluide", "Sirène"],
    secondes: ["Trapèze", "Princesse"],
    conseil:
      "Les modèles cintrés à la taille et les sirènes légères dessinent des courbes tout en allongeant la ligne.",
  },
  {
    lettre: "8",
    /* Le film de Seraphina, envoyé par la maison pour sa page. */
    ouverture: { robe: "seraphina", vue: 1 },
    nom: "Morphologie en 8",
    silhouette: "Des épaules et des hanches équilibrées, une taille marquée.",
    objectif: "Sublimer une harmonie qui existe déjà.",
    coupes: [
      "Les sirènes et les fourreaux, qui épousent la ligne.",
      "Les bustiers cœur et les encolures en V.",
      "Tout ce qui se cintre à la taille.",
    ],
    premieres: ["Sirène", "Fluide"],
    secondes: ["Princesse", "Trapèze"],
    conseil:
      "Les sirènes et les fourreaux épousent les courbes ; un bustier cœur ou une encolure en V accentue l'équilibre naturel.",
  },
  {
    lettre: "X",
    ouverture: { robe: "meredith", vue: 1 },
    nom: "Morphologie en X",
    silhouette: "Des proportions équilibrées, des courbes douces, une taille fine.",
    objectif: "Valoriser sans en faire trop.",
    coupes: [
      "Bonne nouvelle : presque toutes les coupes vous vont.",
      "Princesse, sirène, fluide ou trapèze — laissez le style du mariage décider.",
    ],
    premieres: ["Sirène", "Princesse", "Fluide"],
    secondes: ["Trapèze", "Deux en un"],
    conseil:
      "Bonne nouvelle : presque toutes les coupes vous vont. Laissez le style de votre mariage guider le choix.",
  },
];

/* L'adresse d'une morphologie : sa lettre, en minuscule. */
export function morphologieParSlug(slug: string): Morphologie | undefined {
  return MORPHOLOGIES.find((m) => m.lettre === slug.toUpperCase());
}

/*
 * Les maisons que l'accueil nomme.
 *
 * La boutique travaille aussi de petits ateliers qu'elle a mis des
 * années à trouver. Les nommer en vitrine, c'est les désigner à la
 * concurrence : leurs robes restent au catalogue, mais l'accueil les
 * réunit sous « Autres créateurs ».
 *
 * La liste est une donnée, pas une règle de tri : elle se change ici,
 * et nulle part ailleurs.
 */
export const MAISONS_EN_VEDETTE = [
  "casablanca-bridal",
  "watters-designs",
  "monica-loretti",
  "olya-mak",
];

export const estEnVedette = (slug: string) => MAISONS_EN_VEDETTE.includes(slug);

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
      intro: "Les coupes qui peuvent particulièrement vous mettre en valeur.",
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

/*
 * Ce qu'une maison peut offrir à une morphologie.
 *
 * « premieres » : ses robes dans les coupes que l'on conseille d'abord.
 * « secondes » : celles qui valent l'essai. Une maison qui n'a ni l'une
 * ni l'autre n'est pas cachée — elle est simplement dernière au
 * classement, et on le dit.
 */
export type OffreMaison = {
  createur: Createur;
  premieres: Robe[];
  secondes: Robe[];
};

export function offreMaison(nom: string, lettre: string): OffreMaison | undefined {
  const createur = CREATEURS.find((c) => c.nom === nom);
  const m = morphologie(lettre);
  if (!createur || !m) return undefined;
  const siennes = robesDe(nom);
  return {
    createur,
    premieres: siennes.filter((r) => m.premieres.includes(r.categorie)),
    secondes: siennes.filter((r) => m.secondes.includes(r.categorie)),
  };
}

/*
 * Les maisons classées par ce qu'elles savent offrir à cette morphologie.
 *
 * D'abord le nombre de robes dans les coupes conseillées en premier,
 * ensuite celles qui valent l'essai. À égalité, l'ordre du catalogue —
 * jamais l'alphabet, qui avantagerait toujours les mêmes.
 */
export function maisonsPour(lettre: string): OffreMaison[] {
  return CREATEURS.map((c) => offreMaison(c.nom, lettre))
    .filter((o): o is OffreMaison => Boolean(o))
    .sort((x, y) => y.premieres.length - x.premieres.length || y.secondes.length - x.secondes.length);
}

/* ————————————————————————————————————————————— La FAQ ————— */

export const FAQ = [
  {
    q: "Combien de temps prévoir avant le mariage ?",
    r: "Prévoyez votre rendez-vous d'essayage idéalement huit à neuf mois avant la date du mariage. Pas de panique si vous disposez de moins de temps : nous pourrons toujours vous proposer des solutions. Prenez simplement rendez-vous, nous nous occupons du reste.",
  },
  {
    q: "Comment se passent les essayages au showroom ?",
    r: "Dès que vous avez pris rendez-vous, le showroom est privatisé pour vous pendant une heure. Vous pouvez venir accompagnée de votre famille ou de vos amies. Afin de mieux préserver nos robes de mariée, merci de vous présenter sans maquillage : nous sommes certaines que vous êtes belle au naturel.",
  },
  {
    q: "Quelles sont les étapes d'une confection sur mesure ?",
    r: "La première étape est la prise de votre premier rendez-vous d'essayage. Une fois l'essayage terminé et votre choix réalisé, nous prenons le jour même vos mensurations pour initier la confection à l'atelier. Quand votre robe est prête, vous venez l'essayer en boutique pour vérifier s'il y a besoin d'ajustement. Si oui, un rendez-vous retouches est prévu avec une de nos couturières sur place. Enfin, vous retirez votre robe après l'essayage final.",
  },
  {
    q: "Comment se passe le paiement ?",
    r: "Un acompte est payé le jour de la prise des mensurations. Le solde restant est payé le jour des retouches.",
  },
  {
    q: "Quelle est la fourchette de prix pour une robe sur mesure ?",
    r: "Pour une confection sur mesure, les prix commencent à partir de 1 500 €. Nous vous invitons à nous contacter directement pour avoir plus de précisions sur les modèles qui vous intéressent.",
  },
  {
    q: "Puis-je venir accompagnée ?",
    r: "Oui, et c'est même conseillé. Le showroom est privatisé : votre famille et vos amies sont les bienvenues pendant toute la durée de l'essayage.",
  },
  {
    q: "Où se trouve le showroom MADAMOON ?",
    r: `Au ${MAISON.adresse}, ${MAISON.codePostal} ${MAISON.ville}. Les essayages ont lieu sur rendez-vous uniquement : lundi de 12h à 21h, du mardi au samedi de 10h à 19h.`,
  },
] as const;

/* ————————————————————————————————— Élise, conseillère ————— */

export const AI_ENDPOINT =
  "https://pfbyviktmtjnexvodehg.supabase.co/functions/v1/conseillere-madamoon";
export const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmYnl2aWt0bXRqbmV4dm9kZWhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI2NzY4OTYsImV4cCI6MjA5ODI1Mjg5Nn0.IZ0bCe7DuOmCXt1e2CQQQUelsjE4NI3njRV9eN-OKtw";
