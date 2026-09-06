import { MAISON, SITE_URL } from "@/lib/madamoon";
import { SCENES } from "@/lib/medias";

/*
 * Le balisage de la maison.
 *
 * Une seule entité pour tout le site, et une seule adresse pour la
 * désigner : ID_MAISON. Le gabarit en publie la description complète sur
 * chaque page ; l'accueil y raccroche la note et les avis en reprenant le
 * même « @id ». Deux nœuds de même identité se fondent en un seul chez
 * les moteurs — deux nœuds sans identité commune font deux commerces.
 *
 * Le lien avec la fiche Google du showroom passe par trois choses, et
 * c'est leur concordance qui compte plus que chacune prise à part :
 * l'adresse de la fiche dans « sameAs » et « hasMap », les coordonnées
 * relevées sur cette même fiche, et un nom, une adresse postale et un
 * téléphone identiques au mot près à ceux qui y figurent.
 */

/* Relevé sur la fiche Google de la maison. Le drapeau « !9m1!1b1 » de
 * l'adresse d'origine n'ouvre que l'onglet des avis : il n'a rien à faire
 * dans une adresse de lieu. */
export const FICHE_GOOGLE = {
  lieu:
    "https://www.google.com/maps/place/MADAMOON/@48.8813531,2.3656125,17z/" +
    "data=!4m8!3m7!1s0x47e66fa814c9c5bd:0x5bd1799a0050134!8m2!3d48.8813531!" +
    "4d2.3656125!16s%2Fg%2F11ldhgkrrv",
  /* L'identifiant interne du lieu chez Google, tiré de la même adresse. */
  cid: "413512689370071348",
  latitude: 48.8813531,
  longitude: 2.3656125,
} as const;

export const ID_MAISON = `${SITE_URL}/#maison`;

/* Le plancher tarifaire, tiré de la seule valeur écrite dans le site :
 * « 1 500 € ». On ne le recopie pas, on le lit. */
export const PRIX_PLANCHER = Number(MAISON.prixDepart.replace(/[^\d]/g, ""));

/*
 * L'offre d'une robe.
 *
 * Une robe sur mesure n'a pas de prix fixe : elle en a un plancher, celui
 * qu'affiche déjà sa fiche. C'est donc une offre agrégée, avec un prix
 * bas et pas de prix haut — dire « 1 500 € » tout court serait un prix
 * ferme, ce qu'aucune de ces robes n'a.
 *
 * Le vendeur est la maison elle-même, désignée par son identité : c'est
 * ce qui dit qu'aucune de ces robes ne se trouve ailleurs.
 */
export function offreRobe(slug: string) {
  return {
    "@type": "AggregateOffer",
    lowPrice: PRIX_PLANCHER,
    priceCurrency: "EUR",
    availability: "https://schema.org/InStoreOnly",
    itemCondition: "https://schema.org/NewCondition",
    url: `${SITE_URL}/robes/${slug}`,
    seller: { "@id": ID_MAISON },
    offeredBy: { "@id": ID_MAISON },
    areaServed: { "@type": "City", name: "Paris" },
  };
}

const image = (nom: keyof typeof SCENES) => {
  const m = SCENES[nom];
  return `${SITE_URL}/scenes/${m.name}-${m.widths[m.widths.length - 1]}.webp`;
};

/*
 * Les horaires, sous leur forme lisible par une machine.
 *
 * Les mêmes que ceux affichés au pied de page, écrits ici en heures
 * pleines. La mention « sur rendez-vous uniquement » les accompagne
 * partout où ils paraissent : ce sont des heures d'ouverture, pas des
 * heures où l'on entre sans avoir écrit.
 */
const HORAIRES = [
  { jours: ["Monday"], ouvre: "12:00", ferme: "21:00" },
  {
    jours: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    ouvre: "10:00",
    ferme: "19:00",
  },
];

export const MAISON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "BridalShop",
  "@id": ID_MAISON,
  name: MAISON.nom,
  description: MAISON.baseline,
  url: SITE_URL,
  telephone: MAISON.telephone,
  email: MAISON.email,
  /*
   * Le prix se dit, il ne se code pas en symboles.
   *
   * « €€€ » est une échelle sans définition : elle prétend situer la
   * maison sans rien affirmer de vérifiable, et elle contredisait le
   * « à partir de 1 500 € » affiché sur chaque fiche. Le plancher, lui,
   * est connu — c'est celui-là qu'on déclare, en toutes lettres pour la
   * lecture et en nombre juste en dessous pour la machine.
   */
  priceRange: `À partir de ${MAISON.prixDepart}`,
  currenciesAccepted: "EUR",
  makesOffer: {
    "@type": "Offer",
    itemOffered: {
      "@type": "Product",
      name: "Robe de mariée, confection sur mesure",
    },
    priceSpecification: {
      "@type": "PriceSpecification",
      minPrice: PRIX_PLANCHER,
      priceCurrency: "EUR",
    },
    availability: "https://schema.org/InStoreOnly",
    seller: { "@id": ID_MAISON },
  },
  image: [image("seuil"), image("showroom")],
  logo: `${SITE_URL}/marque/logo-encre.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: MAISON.adresse,
    postalCode: MAISON.codePostal,
    addressLocality: MAISON.ville,
    addressRegion: "Île-de-France",
    addressCountry: "FR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: FICHE_GOOGLE.latitude,
    longitude: FICHE_GOOGLE.longitude,
  },
  hasMap: FICHE_GOOGLE.lieu,
  identifier: {
    "@type": "PropertyValue",
    propertyID: "Google Maps CID",
    value: FICHE_GOOGLE.cid,
  },
  openingHoursSpecification: HORAIRES.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: h.jours,
    opens: h.ouvre,
    closes: h.ferme,
  })),
  publicAccess: false,
  availableLanguage: ["fr", "en"],
  areaServed: { "@type": "City", name: "Paris" },
  /* La fiche Google est déclarée au même titre que les réseaux : c'est
   * elle qui rattache le site au lieu. */
  sameAs: [...MAISON.reseaux.map((r) => r.href), FICHE_GOOGLE.lieu],
  potentialAction: {
    "@type": "ReserveAction",
    name: "Prendre rendez-vous",
    target: {
      "@type": "EntryPoint",
      urlTemplate: MAISON.reservation,
      actionPlatform: [
        "http://schema.org/DesktopWebPlatform",
        "http://schema.org/MobileWebPlatform",
      ],
    },
    result: { "@type": "Reservation", name: "Essayage privé" },
  },
};

/*
 * L'épingle d'une robe.
 *
 * Pinterest lit les balises Open Graph de type « product » pour fabriquer
 * une épingle enrichie : le nom, le prix, la disponibilité et le lien
 * reviennent alors sous la photographie, et suivent l'épingle partout où
 * elle est repartagée.
 *
 * Le prix déclaré est le plancher, le même que partout ailleurs. La
 * description le dit en toutes lettres — « à partir de » — parce qu'une
 * épingle n'affiche qu'un nombre, et qu'un nombre seul se lirait comme un
 * prix ferme. Une robe sur mesure n'en a pas.
 *
 * L'image est le plus grand JPEG disponible : Pinterest préfère ce format
 * à l'AVIF et au WebP, et il lui faut six cents pixels de large au
 * minimum. Les hauteurs sont recalculées depuis le rapport de la source —
 * une épingle sans dimensions déclarées est recadrée à l'aveugle.
 */
export type EpingleRobe = {
  titre: string;
  description: string;
  url: string;
  image?: { url: string; largeur: number; hauteur: number; alt: string };
  marque?: string;
  reference: string;
  prix: number;
};

export function epingleRobe(o: {
  slug: string;
  nom: string;
  ligne: string;
  regard: string;
  createur?: string;
  media?: { name: string; w: number; h: number; jpgw: number[] };
  alt: string;
}): EpingleRobe {
  const large = o.media ? Math.max(...o.media.jpgw) : 0;
  return {
    titre: `Robe de mariée ${o.nom} — ${o.ligne}`,
    description: `${o.regard} Sur mesure, retouches incluses, à partir de ${MAISON.prixDepart}. À essayer sur rendez-vous au showroom MADAMOON, Paris 10e.`,
    url: `${SITE_URL}/robes/${o.slug}`,
    image: o.media
      ? {
          url: `${SITE_URL}/robes/${o.media.name}-${large}.jpg`,
          largeur: large,
          hauteur: Math.round((large * o.media.h) / o.media.w),
          alt: o.alt,
        }
      : undefined,
    marque: o.createur,
    reference: o.slug,
    prix: PRIX_PLANCHER,
  };
}
