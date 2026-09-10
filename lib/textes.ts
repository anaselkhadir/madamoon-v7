import type { Langue } from "@/lib/langue";

/*
 * Les mots de l'interface, dans les deux langues.
 *
 * Les deux colonnes se lisent l'une en face de l'autre : c'est ainsi
 * qu'on voit qu'une phrase a dérivé. Le type est celui du français —
 * une clé ajoutée d'un côté manque de l'autre à la compilation, et non
 * en production.
 *
 * L'anglais garde le registre du français : des phrases courtes, du
 * concret, aucune promesse. « Le satin, la ligne, rien d'autre » ne
 * devient pas « Timeless elegance redefined ». Le vocabulaire du métier,
 * en revanche, est celui de la langue d'arrivée : une mariée
 * anglophone cherche une « mermaid », jamais une « sirène ».
 */

const FR = {
  barre: {
    menu: "Menu",
    fermer: "Fermer",
    principale: "Principale",
    accueil: "MADAMOON, accueil",
    rendezvous: "Rendez-vous",
    robes: "Robes de mariée",
    coupes: "Coupes",
    morphologies: "Morphologies",
    showroom: "Showroom",
    maison: "La maison",
    catalogue: "Le catalogue",
    sections: "Les sections",
    classer: "Classer les robes",
    parCreateur: "Par créateur",
    parCoupe: "Par coupe",
    parMaison: "Par maison",
    autresModeles: "Autres modèles",
    toutesRobes: "Toutes les robes",
    catalogueEntier: "Le catalogue entier",
    sixCoupes: "Les six coupes",
    sixMorphologies: "Les six morphologies",
  },
  raccourcis: {
    toutesRobes: "Toutes les robes",
    lesCoupes: "Les coupes",
    lesMorphologies: "Les morphologies",
    trouverMaRobe: "Trouver ma robe",
    leShowroom: "Le showroom",
    laMaison: "La maison",
    prendreRendezvous: "Prendre rendez-vous",
  },
  hero: {
    titre: "Vous vous mariez bientôt ?",
    accroche: "Robes de mariée, essayage privé — Paris 10",
    trouverMaRobe: "Trouver ma robe",
    prendreRendezvous: "Prendre rendez-vous",
    alt: "Une mariée en robe de dentelle",
    pause: "Mettre la vidéo en pause",
    reprendre: "Reprendre la vidéo",
  },
  bandeau: {
    essayage: "Essayage privé",
    surMesure: "Confection sur mesure",
    retouches: "Retouches incluses",
    aPartirDe: "À partir de",
  },
  silhouette: {
    legende: "La silhouette",
    titre: "Avant la robe, la ligne.",
    texte:
      "Six silhouettes, et pour chacune les coupes qui l’allongent, l’équilibrent ou la révèlent.",
    lien: "Les six morphologies",
    precedentes: "Voir les morphologies précédentes",
    suivantes: "Voir les morphologies suivantes",
  },
  coupes: {
    legende: "Les coupes",
    titre: "Une même femme, six lignes.",
    texte: "C’est la coupe qui décide de la ligne, bien avant la taille.",
    lien: "Toutes les coupes",
    presentee: "Coupe présentée",
    les: "Les",
  },
  createurs: {
    legende: "Les créateurs",
    titre: "Cinq maisons. Aucune par hasard.",
    suite: "retenues une robe à la fois.",
  },
  avis: {
    legende: "Ce qu’elles en disent",
    sur: "Sur",
    avisGoogle: "avis Google",
    lesAvis: "Les",
  },
  showroom: {
    legende: "Le showroom — Paris 10",
    titre: "Poussez la porte",
    lien: "Découvrir le showroom",
    alt: "L’entrée du showroom MADAMOON, rue du Faubourg Saint-Martin",
  },
  panier: {
    vide: "Vos coups de cœur, vide pour l’instant",
    pleinUn: "Vos coups de cœur, 1 robe",
    plein: (n: number) => `Vos coups de cœur, ${n} robes`,
  },
  carte: {
    legende: "Votre essayage privé",
    bouton: "Prendre rendez-vous",
  },
  gabarit: {
    allerAuContenu: "Aller au contenu",
  },
  pied: {
    coupes: "Coupes",
    createurs: "Créateurs",
    showroom: "Le showroom",
    robeDeMariee: "Robe de mariée",
    rendezvous: "Prendre rendez-vous",
    droits: "Boutique de robes de mariée à Paris",
  },
};

/* Pas de « as const » : c'est la forme qu'on veut contraindre, pas les
 * mots. Figés en types littéraux, le français aurait interdit à
 * l'anglais d'être autre chose que du français. */
type Textes = typeof FR;

const EN: Textes = {
  barre: {
    menu: "Menu",
    fermer: "Close",
    principale: "Main",
    accueil: "MADAMOON, home",
    rendezvous: "Appointment",
    robes: "Wedding dresses",
    coupes: "Silhouettes",
    morphologies: "Body shapes",
    showroom: "Showroom",
    maison: "The house",
    catalogue: "The catalogue",
    sections: "Sections",
    classer: "Sort the dresses",
    parCreateur: "By designer",
    parCoupe: "By silhouette",
    parMaison: "By house",
    autresModeles: "Other dresses",
    toutesRobes: "All dresses",
    catalogueEntier: "The whole catalogue",
    sixCoupes: "The six silhouettes",
    sixMorphologies: "The six body shapes",
  },
  raccourcis: {
    toutesRobes: "All dresses",
    lesCoupes: "The silhouettes",
    lesMorphologies: "The body shapes",
    trouverMaRobe: "Find my dress",
    leShowroom: "The showroom",
    laMaison: "The house",
    prendreRendezvous: "Book an appointment",
  },
  hero: {
    titre: "Getting married soon?",
    accroche: "Wedding dresses, private fittings — Paris 10",
    trouverMaRobe: "Find my dress",
    prendreRendezvous: "Book an appointment",
    alt: "A bride in a lace dress",
    pause: "Pause the video",
    reprendre: "Resume the video",
  },
  bandeau: {
    essayage: "Private fitting",
    surMesure: "Made to measure",
    retouches: "Alterations included",
    aPartirDe: "From",
  },
  silhouette: {
    legende: "The line",
    titre: "Before the dress, the line.",
    texte:
      "Six body shapes, and for each the cuts that lengthen, balance or reveal it.",
    lien: "The six body shapes",
    precedentes: "See the previous body shapes",
    suivantes: "See the next body shapes",
  },
  coupes: {
    legende: "The silhouettes",
    titre: "One woman, six lines.",
    texte: "It is the cut that decides the line, long before the size.",
    lien: "All silhouettes",
    presentee: "Silhouette shown",
    les: "All",
  },
  createurs: {
    legende: "The designers",
    titre: "Five houses. None by chance.",
    suite: "chosen one dress at a time.",
  },
  avis: {
    legende: "What they say",
    sur: "From",
    avisGoogle: "Google reviews",
    lesAvis: "The",
  },
  showroom: {
    legende: "The showroom — Paris 10",
    titre: "Push the door open",
    lien: "See the showroom",
    alt: "The entrance to the MADAMOON showroom, rue du Faubourg Saint-Martin",
  },
  panier: {
    vide: "Your favourites, empty for now",
    pleinUn: "Your favourites, 1 dress",
    plein: (n: number) => `Your favourites, ${n} dresses`,
  },
  carte: {
    legende: "Your private fitting",
    bouton: "Book an appointment",
  },
  gabarit: {
    allerAuContenu: "Skip to content",
  },
  pied: {
    coupes: "Silhouettes",
    createurs: "Designers",
    showroom: "The showroom",
    robeDeMariee: "Wedding dress",
    rendezvous: "Book an appointment",
    droits: "Bridal boutique in Paris",
  },
};

const TABLES: Record<Langue, Textes> = { fr: FR, en: EN };

/** Les mots d'une langue. */
export function t(langue: Langue): Textes {
  return TABLES[langue];
}
