import { MAISON } from "@/lib/madamoon";

/*
 * Les pages des questions.
 *
 * La FAQ donne une réponse courte à chaque question ; chacune a aussi sa
 * page, où elle se développe. La réponse courte n'est pas recopiée ici :
 * elle vient de « faq(langue) », la table que servent la FAQ, Élise et le
 * balisage. Cette table-ci ne porte que ce que la page dédiée ajoute.
 *
 * Rien n'y est inventé. Les engagements — délais, acompte, retouches,
 * prix de départ, horaires — sont ceux que le site écrit déjà ailleurs :
 * dans la FAQ, dans le parcours de la mariée, dans les signatures de la
 * maison et sur les fiches. Ce qui relève du conseil est écrit comme un
 * conseil, jamais comme une règle de la boutique. Ce que le site ne dit
 * pas — le montant de l'acompte, les moyens de paiement, l'accès en
 * transports — n'est pas écrit : la page renvoie à la boutique.
 *
 * L'ordre est celui de la FAQ. L'adresse de chaque page porte les mots
 * qu'une mariée tape dans un moteur, et non le rang de la question : une
 * question qu'on déplace ne doit pas changer d'adresse.
 */

export type Article = {
  /* L'adresse, sous /faq/. La même dans les deux langues, comme « faq ». */
  slug: string;
  /* La balise de description, taillée pour Google : 158 signes au plus. */
  description: string;
  /* La phrase d'ouverture, sous le titre. */
  chapo: string;
  /* « ordonnee » numérote la liste : seulement quand l'ordre est vrai —
   * une suite d'étapes, pas une énumération. */
  sections: { titre: string; texte: string[]; liste?: string[]; ordonnee?: boolean }[];
  /* Trois ou quatre lignes, pour qui ne lit pas tout. */
  aRetenir: string[];
  /* Les pages du site qui prolongent la réponse. Adresses françaises :
   * le lien les traduit sur une page anglaise. */
  liens: { href: string; label: string }[];
};

/* Les adresses, dans l'ordre de la FAQ. Les deux langues les partagent. */
export const SLUGS_QUESTIONS = [
  "quand-choisir-sa-robe-de-mariee",
  "deroulement-essayage-robe-de-mariee",
  "etapes-robe-de-mariee-sur-mesure",
  "paiement-robe-de-mariee",
  "prix-robe-de-mariee-sur-mesure",
  "venir-accompagnee-essayage",
  "adresse-horaires-showroom",
] as const;

const ADRESSE = `${MAISON.adresse}, ${MAISON.codePostal} ${MAISON.ville}`;

export const ARTICLES: Article[] = [
  /* ————————————————————————————————————————— le délai ————— */
  {
    slug: SLUGS_QUESTIONS[0],
    description:
      "Robe de mariée : prévoyez votre essayage huit à neuf mois avant le mariage. Pourquoi ce délai, et que faire s'il vous reste moins de temps.",
    chapo:
      "Huit à neuf mois avant la date : c'est le moment que la boutique conseille pour un premier essayage. Voici ce que ce délai recouvre, et comment faire si votre mariage est plus proche.",
    sections: [
      {
        titre: "Pourquoi huit à neuf mois",
        texte: [
          "Chez MADAMOON, une robe ne se décroche pas d'un portant. Une fois choisie, elle est confectionnée à l'atelier selon vos mensurations, puis essayée et ajustée sur place par les couturières de la boutique.",
          "Chacune de ces étapes a besoin de son temps : le choix, la confection, le deuxième essayage, les retouches, l'essayage final. Commencer tôt, c'est laisser à chacune la place qu'elle demande — et arriver aux dernières semaines sans courir.",
        ],
      },
      {
        titre: "Ce que couvre ce délai",
        texte: ["Entre le premier rendez-vous et le jour où vous repartez avec votre robe :"],
        ordonnee: true,
        liste: [
          "le premier essayage, au showroom privatisé pour vous ;",
          "la prise de mensurations, le jour même où vous choisissez ;",
          "la confection de votre robe à l'atelier ;",
          "un deuxième essayage quand elle est prête ;",
          "les retouches, faites sur place par nos couturières ;",
          "l'essayage final, puis le retrait.",
        ],
      },
      {
        titre: "S'il vous reste moins de temps",
        texte: [
          "Pas de panique. Dites-le dès la prise de rendez-vous, en précisant la date du mariage : la boutique trouve presque toujours une solution.",
          "Un conseil, dans ce cas : arrivez avec une idée des coupes qui vous attirent. Le catalogue et les pages consacrées aux coupes et aux morphologies sont faits pour cela — l'essayage n'en sera que plus efficace.",
        ],
      },
      {
        titre: "Préparer ce premier rendez-vous",
        texte: [
          "Parcourez les robes en ligne et gardez celles qui vous arrêtent dans vos coups de cœur. Si vous hésitez sur la coupe, Élise, la conseillère du site, part de votre morphologie et vous oriente en quelques questions.",
        ],
      },
    ],
    aRetenir: [
      "Premier essayage : idéalement huit à neuf mois avant le mariage.",
      "Ce délai couvre le choix, la confection et les retouches.",
      "Moins de temps ? Dites-le en réservant : une solution se trouve presque toujours.",
    ],
    liens: [
      { href: "/robes", label: "Voir toutes les robes" },
      { href: "/trouver-ma-robe", label: "Trouver ma robe avec Élise" },
      { href: "/morphologies", label: "Les morphologies" },
    ],
  },

  /* ——————————————————————————————————————— l'essayage ————— */
  {
    slug: SLUGS_QUESTIONS[1],
    description:
      "Essayage de robe de mariée chez MADAMOON : le showroom privatisé une heure, vos proches avec vous, sans maquillage. Gratuit, sur rendez-vous, Paris 10e.",
    chapo:
      "Une heure, un showroom rien que pour vous, vos proches autour de vous : l'essayage chez MADAMOON est un rendez-vous privé. Voici comment il se déroule.",
    sections: [
      {
        titre: "Un showroom privatisé pour vous",
        texte: [
          "Dès que vous avez réservé, le showroom est privatisé pour vous pendant une heure. Pas d'autre cliente, pas d'attente entre deux cabines : l'heure est à vous, et à vous seule.",
          "Le lieu fait partie du moment — un écrin du XIXᵉ siècle, rue du Faubourg Saint-Martin, pensé pour que l'essayage soit une expérience à partager, et non une course.",
        ],
      },
      {
        titre: "Comment se passe l'heure",
        texte: [
          "Le rendez-vous commence par une conversation. Avant de vous faire essayer quoi que ce soit, la boutique cherche à comprendre qui vous êtes, ce que vous aimez et ce que vous voulez transmettre le jour de votre mariage.",
          "Viennent ensuite les conseils — la coupe, la silhouette, la matière — puis les essayages. L'idée n'est pas d'enchaîner les robes, mais de vous mener jusqu'à celle dans laquelle vous vous reconnaissez.",
        ],
      },
      {
        titre: "Venir sans maquillage",
        texte: [
          "Pour préserver les robes, la boutique vous demande de venir sans maquillage : le fond de teint et le rouge à lèvres marquent la dentelle et le satin, et ces robes sont essayées par d'autres mariées après vous. Nous sommes certaines que vous êtes belle au naturel.",
          "Un conseil pratique : une lingerie simple, de couleur chair, vous aidera à juger le tombé de chaque robe.",
        ],
      },
      {
        titre: "Préparer votre visite",
        texte: [
          "Si des modèles vous ont plu sur le site, dites-le au moment de réserver : ils seront préparés pour votre venue. Vos coups de cœur se gardent en ligne, d'un clic sur le cœur de chaque robe.",
          "L'essayage est gratuit, et il a lieu sur rendez-vous uniquement.",
        ],
      },
    ],
    aRetenir: [
      "Une heure, le showroom privatisé pour vous.",
      "Vos proches sont les bienvenus.",
      "Venez sans maquillage, pour préserver les robes.",
      "Gratuit, sur rendez-vous uniquement.",
    ],
    liens: [
      { href: "/showroom", label: "Découvrir le showroom" },
      { href: "/coups-de-coeur", label: "Mes coups de cœur" },
      { href: "/rendez-vous", label: "Prendre rendez-vous" },
    ],
  },

  /* ———————————————————————————————————————— les étapes ————— */
  {
    slug: SLUGS_QUESTIONS[2],
    description:
      "Robe de mariée sur mesure : essayage, mensurations, confection à l'atelier, essayages, retouches incluses, retrait. Les étapes chez MADAMOON, Paris 10e.",
    chapo:
      "Du premier essayage au retrait, une robe sur mesure passe par huit temps. Les voici dans l'ordre, avec ce qui se passe à chacun.",
    sections: [
      {
        titre: "Les huit temps de votre robe",
        texte: [],
        ordonnee: true,
        liste: [
          "Le rendez-vous — vous réservez votre premier essayage, idéalement huit à neuf mois avant le mariage.",
          "L'essayage privé — une heure au showroom, privatisé pour vous et vos proches.",
          "Les mensurations — une fois votre choix fait, elles sont prises le jour même, pour lancer la confection.",
          "La confection — votre robe est réalisée à l'atelier, à vos mesures : matières nobles, finitions à la main.",
          "Le deuxième essayage — quand votre robe est prête, vous venez l'essayer en boutique.",
          "Les retouches — s'il faut ajuster, nos couturières s'en chargent, sur place.",
          "L'essayage final — il valide le tombé, la longueur, l'aisance.",
          "Le retrait — vous repartez avec votre robe, parfaitement ajustée.",
        ],
      },
      {
        titre: "Sur mesure ou semi-mesure",
        texte: [
          "La plupart des robes de la boutique sont confectionnées sur mesure, à partir de vos mensurations.",
          "Les robes Watters Designs sont en semi-mesure : la robe est réalisée sur un patron de la maison, puis ajustée à votre silhouette. Chaque fiche du site indique de quelle façon la robe est confectionnée. Dans les deux cas, les retouches sont incluses.",
        ],
      },
      {
        titre: "Les retouches, comprises",
        texte: [
          "Les retouches font partie de la confection : elles ne s'ajoutent pas au prix. Elles sont faites sur place, par les couturières de la boutique, qui ajustent votre robe jusqu'au dernier essayage.",
        ],
      },
      {
        titre: "Quand régler",
        texte: [
          "Le paiement suit les étapes : un acompte le jour des mensurations, le solde le jour des retouches.",
        ],
      },
    ],
    aRetenir: [
      "Mensurations prises le jour même du choix.",
      "Confection à l'atelier, à vos mesures — semi-mesure chez Watters Designs.",
      "Retouches incluses, faites sur place.",
      "Un essayage final avant de repartir avec votre robe.",
    ],
    liens: [
      { href: "/robes", label: "Voir toutes les robes" },
      { href: "/createurs/watters-designs", label: "Watters Designs" },
      { href: "/rendez-vous", label: "Prendre rendez-vous" },
    ],
  },

  /* ——————————————————————————————————————— le paiement ————— */
  {
    slug: SLUGS_QUESTIONS[3],
    description:
      "Paiement d'une robe de mariée chez MADAMOON : un acompte le jour des mensurations, le solde le jour des retouches. Les retouches sont incluses.",
    chapo:
      "Deux versements, à deux moments précis du parcours : un acompte quand la confection commence, le solde quand votre robe est ajustée.",
    sections: [
      {
        titre: "L'acompte, le jour des mensurations",
        texte: [
          "Une fois votre robe choisie, la boutique prend vos mensurations le jour même. C'est ce jour-là que l'acompte est versé : il lance la confection de votre robe à l'atelier, à vos mesures.",
        ],
      },
      {
        titre: "Le solde, le jour des retouches",
        texte: [
          "Quand votre robe est prête, vous venez l'essayer en boutique. S'il faut l'ajuster, un rendez-vous de retouches est prévu avec l'une des couturières, sur place. Le solde est réglé ce jour-là.",
        ],
      },
      {
        titre: "Ce que comprend le prix",
        texte: [
          "Le prix d'une robe sur mesure comprend sa confection et ses retouches : les ajustements faits par nos couturières ne s'ajoutent pas à la facture. Les accessoires vendus séparément — un voile, des gants — se règlent à part.",
        ],
      },
      {
        titre: "Les détails, avec la boutique",
        texte: [
          "Le montant de l'acompte et les moyens de paiement se précisent avec la boutique, au moment où vous choisissez votre robe. N'hésitez pas à poser la question lors de votre rendez-vous, ou à appeler le showroom avant.",
        ],
      },
    ],
    aRetenir: [
      "Un acompte, le jour des mensurations.",
      "Le solde, le jour des retouches.",
      "Les retouches sont comprises dans le prix.",
    ],
    liens: [
      { href: "/rendez-vous", label: "Prendre rendez-vous" },
      { href: "/robes", label: "Voir toutes les robes" },
    ],
  },

  /* ————————————————————————————————————————— le prix ————— */
  {
    slug: SLUGS_QUESTIONS[4],
    description:
      "Prix d'une robe de mariée sur mesure chez MADAMOON : à partir de 1 500 €, retouches comprises. Ce qui fait varier le prix, et comment le connaître.",
    chapo:
      "Une robe de mariée sur mesure chez MADAMOON commence à 1 500 €, retouches comprises. Voici ce que recouvre ce prix, et pourquoi il varie d'une robe à l'autre.",
    sections: [
      {
        titre: "À partir de 1 500 €",
        texte: [
          "C'est le prix de départ d'une robe confectionnée sur mesure à la boutique. Il comprend la confection à l'atelier, selon vos mensurations, et les retouches faites sur place par nos couturières jusqu'au dernier essayage.",
        ],
      },
      {
        titre: "Ce qui fait varier le prix",
        texte: [
          "D'une robe à l'autre, le prix dépend d'abord du modèle et de la maison qui l'a dessiné, puis de ce qui le compose : la matière — satin, crêpe, tulle, dentelle de Chantilly —, la densité des broderies, l'ampleur de la jupe, la longueur de la traîne.",
          "Certaines robes s'accompagnent de pièces vendues séparément, comme un voile ou des gants. Elles se choisissent à part, et ne sont pas comprises dans le prix de la robe.",
        ],
      },
      {
        titre: "Une robe sur mesure n'a pas d'étiquette",
        texte: [
          "Son prix se précise avec vous, selon le modèle et ce que vous en faites. La boutique préfère en parler de vive voix, robe par robe, plutôt que d'annoncer un chiffre qui ne correspondrait pas à la vôtre.",
        ],
      },
      {
        titre: "Connaître le prix d'un modèle",
        texte: [
          "Contactez directement la boutique en lui indiquant les modèles qui vous intéressent, ou demandez-le pendant votre essayage. Vous pouvez garder ces modèles dans vos coups de cœur, sur le site, pour les retrouver facilement.",
        ],
      },
    ],
    aRetenir: [
      "À partir de 1 500 € pour une robe sur mesure.",
      "Confection et retouches comprises.",
      "Le prix varie selon le modèle, la maison et les matières.",
      "Pour un modèle précis : contactez la boutique.",
    ],
    liens: [
      { href: "/robes", label: "Voir toutes les robes" },
      { href: "/coups-de-coeur", label: "Mes coups de cœur" },
      { href: "/rendez-vous", label: "Prendre rendez-vous" },
    ],
  },

  /* ————————————————————————————————— venir accompagnée ————— */
  {
    slug: SLUGS_QUESTIONS[5],
    description:
      "Venir accompagnée à son essayage de robe de mariée : oui, et c'est conseillé. Le showroom MADAMOON est privatisé pour vous et vos proches. Paris 10e.",
    chapo:
      "Oui — et c'est même conseillé. Le showroom est privatisé pour vous : votre famille et vos amies sont les bienvenues pendant toute la durée de l'essayage.",
    sections: [
      {
        titre: "Un moment à partager",
        texte: [
          "Choisir sa robe de mariée se vit rarement seule. Parce que le showroom est privatisé pour vous pendant une heure, vos proches ne sont pas des spectatrices debout dans une allée : elles sont chez vous, le temps de l'essayage.",
          "La boutique l'a voulu ainsi — un cadre pensé pour faire de l'essayage une expérience à partager avec les personnes qui comptent.",
        ],
      },
      {
        titre: "Qui emmener",
        texte: [
          "Un conseil : venez avec celles dont l'avis compte vraiment pour vous, et dont le regard vous aide à voir clair. Une mère, une sœur, une amie qui vous connaît bien.",
          "Si vous venez à plusieurs, précisez-le au moment de réserver : la boutique pourra préparer votre venue.",
        ],
      },
      {
        titre: "Votre regard d'abord",
        texte: [
          "Les avis de vos proches sont précieux, mais c'est vous qui porterez la robe. La conseillère est là pour vous aider à faire la part des choses — et à reconnaître la robe dans laquelle vous vous sentez vous-même.",
        ],
      },
    ],
    aRetenir: [
      "Oui, et c'est conseillé.",
      "Le showroom est privatisé pour vous et vos proches.",
      "Si vous venez à plusieurs, dites-le en réservant.",
    ],
    liens: [
      { href: "/showroom", label: "Découvrir le showroom" },
      { href: "/rendez-vous", label: "Prendre rendez-vous" },
    ],
  },

  /* ————————————————————————————————————— le showroom ————— */
  {
    slug: SLUGS_QUESTIONS[6],
    description: `Le showroom MADAMOON : ${ADRESSE}. Essayages sur rendez-vous, le lundi de 12h à 21h, du mardi au samedi de 10h à 19h.`,
    chapo: `Le showroom MADAMOON est au ${ADRESSE}. Les essayages y ont lieu sur rendez-vous uniquement.`,
    sections: [
      {
        titre: "L'adresse",
        texte: [
          `${ADRESSE}, dans le 10ᵉ arrondissement. Le showroom occupe un élégant écrin du XIXᵉ siècle : un cadre hors du temps, pensé pour l'essayage d'une robe de mariée.`,
        ],
      },
      {
        titre: "Les horaires",
        texte: ["Les essayages ont lieu sur rendez-vous uniquement :"],
        liste: ["le lundi, de 12h à 21h ;", "du mardi au samedi, de 10h à 19h."],
      },
      {
        titre: "Pourquoi sur rendez-vous",
        texte: [
          "Parce que le showroom est privatisé pour chaque mariée, pendant une heure. Un rendez-vous, c'est la garantie d'avoir le lieu, les robes et l'attention de la boutique pour vous seule — sans attente, et sans croiser une autre cliente en cabine.",
        ],
      },
      {
        titre: "Nous joindre",
        texte: [
          `Par téléphone au ${MAISON.telephone}, ou par courriel à ${MAISON.email}. Pour l'itinéraire, la fiche de la boutique sur Google Maps vous guide jusqu'à la porte.`,
        ],
      },
    ],
    aRetenir: [
      ADRESSE,
      "Lundi : 12h – 21h. Mardi au samedi : 10h – 19h.",
      "Sur rendez-vous uniquement.",
    ],
    liens: [
      { href: "/showroom", label: "Découvrir le showroom" },
      { href: "/rendez-vous", label: "Prendre rendez-vous" },
    ],
  },
];

/** L'article d'une adresse, et son rang dans la FAQ. */
export function questionParSlug(slug: string) {
  const i = ARTICLES.findIndex((q) => q.slug === slug);
  return i < 0 ? undefined : { article: ARTICLES[i], rang: i };
}
