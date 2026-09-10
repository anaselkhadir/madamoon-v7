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
  theme: {
    versSombre: "Passer en mode sombre",
    versClair: "Revenir en mode clair",
    intitule: "Apparence",
    sombre: "Sombre",
    clair: "Clair",
  },
  fiche: {
    laFiche: "La fiche",
    silhouettes: "Les silhouettes qu’elle sert",
    coupe: "La coupe",
    maison: "La maison",
    confection: "La confection",
    surMesure: "Sur mesure, retouches incluses",
    aPartirDe: "À partir de",
    essayer: "L’essayer au showroom",
    memeFamille: "Dans la même famille",
    toutesLes: (pluriel: string) => `Toutes les ${pluriel}`,
    toutesSilhouettes:
      "Elle va à toutes les silhouettes — c’est rare, et c’est ce qui en fait une valeur sûre à l’essayage.",
    silhouettesServies: (lettres: string) =>
      `Elle est d’abord conseillée aux silhouettes ${lettres}. Rien n’empêche de l’essayer autrement : une morphologie ouvre des pistes, elle n’en ferme aucune.`,
  },
  elise: {
    dialogue: "Élise, conseillère MADAMOON",
    vous: "Vous",
    conseillere: "Conseillère — MADAMOON",
    ecrit: "Élise écrit",
    champ: "Écrivez à Élise…",
    champLabel: "Votre message pour Élise",
    envoyer: "Envoyer",

    trouverMaCoupe: "Trouver ma coupe",
    prendreRendezvous: "Prendre rendez-vous",
    questionsPratiques: "Questions pratiques",
    appeler: "Appeler la boutique",
    appelerCourt: "Appeler",
    ecrireCourt: "Écrire",
    voirShowroom: "Voir le showroom",
    voirCatalogue: "Voir le catalogue",
    lancerDiagnostic: "Lancer le diagnostic",
    voirRecommandations: "Voir mes recommandations",
    refaireDiagnostic: "Refaire le diagnostic",
    autresMaisons: "Voir les autres maisons",
    touteLaSelection: "Toute la sélection",
    autreQuestion: "Autre question",
    ouiJeLaConnais: "Oui, je la connais",
    guidezMoi: "Guidez-moi",
    plusEtroites: "Plus étroites",
    plusLarges: "Plus larges",
    alignees: "Alignées",
    courbesGenereuses: "Courbes généreuses",
    ouiBienMarquee: "Oui, bien marquée",
    peuMarquee: "Peu marquée",
    prononcees: "Prononcées",
    doucesFine: "Douces, silhouette fine",

    bonjour:
      "Bonjour, je suis Élise, conseillère chez MADAMOON. Trouver la robe d’une vie, c’est mon métier — et ma plus grande joie.",
    invitation:
      "Parlez-moi de votre mariage, posez-moi vos questions, ou laissez-vous guider.",
    essentiel:
      "L’essentiel est de trouver la robe qui met en valeur votre silhouette tout en vous ressemblant.",
    connaissezMorpho: "Connaissez-vous déjà votre morphologie ?",
    laquelle: "Très bien. Laquelle est la vôtre ?",
    pasAPas: "Je vous guide pas à pas.",
    epaulesHanches: "Comment décririez-vous vos épaules par rapport à vos hanches ?",
    tailleMarquee: "Et votre taille, est-elle marquée ?",
    derniereQuestion: "Dernière question : vos courbes sont plutôt…",
    pistes:
      "Ce sont des pistes, jamais des règles : en boutique, on essaie aussi ce qui n’était pas prévu. Voulez-vous voir la sélection correspondante ?",
    rdvPrivatise:
      "Avec plaisir. Le showroom est entièrement privatisé pour vous pendant une heure — venez accompagnée de vos proches.",
    faqIntro: "Bien sûr. Que souhaitez-vous savoir ? Vous pouvez aussi m’écrire librement.",
    dansVosCoupes: "dans vos coupes",
    aEssayer: "à essayer",
    nosRecommandations: "Nos recommandations",
    lObjectif: "L’objectif :",
    dansLOrdre: "Dans l’ordre",
    lettreLabel: (lettre: string) => `En ${lettre}`,
    chezMaison: (nom: string) => `Chez ${nom}`,
    toutesLesRobes: (nom: string) => `Toutes les robes ${nom}`,
    voirMaison: (nom: string) => `Voir ${nom}`,
    vousRegardez: (nom: string) =>
      `Vous regardez ${nom}. Je pars de votre silhouette, et je vous dis franchement si la réponse est ailleurs.`,
    voiciCeQui: (nom: string, liste: string) =>
      `Chez ${nom}, voici ce qui vous correspond : ${liste}.`,
    pasLesCoupes: (nom: string, liste: string) =>
      `${nom} ne travaille pas les coupes que je vous conseillerais en premier. Les maisons qui les ont, dans l’ordre : ${liste}.`,
    franche: (nom: string) =>
      `Je préfère être franche : ${nom} ne travaille pas les coupes que je vous conseillerais en premier.`,
    saufQue: (combien: number): string =>
      combien === 0
        ? " Voici les maisons faites pour vous."
        : combien === 1
          ? " Son autre robe vaut l’essai, mais voici d’abord les maisons faites pour vous."
          : " Ses autres robes valent l’essai, mais voici d’abord les maisons faites pour vous.",
    lesMaisonsPour: (liste: string) => `Les maisons pour cette morphologie : ${liste}.`,

    localRdv: (adresse: string, cp: string) =>
      `Avec plaisir. Le showroom est privatisé pour vous pendant une heure, sur rendez-vous uniquement : lundi 12h–21h, du mardi au samedi 10h–19h, au ${adresse}, Paris ${cp}.`,
    localPrix: (prix: string) =>
      `Nos robes commencent à ${prix}, retouches comprises. Le sur-mesure se chiffre après l’essayage, selon la robe et le tissu.`,
    localHoraires: (adresse: string, cp: string, ville: string) =>
      `Le showroom vous reçoit sur rendez-vous uniquement : lundi de 12h à 21h, du mardi au samedi de 10h à 19h — ${adresse}, ${cp} ${ville}.`,
    localCreateurs: (liste: string) =>
      `Nos robes sont choisies chez ${liste}, avec un service de confection sur mesure.`,
    localDiagnostic:
      "Chaque femme est unique. Le plus simple est un petit diagnostic ensemble, pour identifier les coupes qui vous mettront en valeur. On commence ?",
    localMerci:
      "Avec grand plaisir. Je reste à votre écoute, et au plaisir de vous accueillir au showroom.",
    localDefaut:
      "Je préfère vous répondre précisément plutôt que de m’avancer. Le mieux est d’en parler de vive voix avec la boutique — ou je peux vous guider ici sur votre silhouette, nos prix et la prise de rendez-vous.",
  },
  catalogue: {
    nom: "Robes de mariée MADAMOON",
    titre: "Nos robes de mariée",
    robesDe: (pluriel: string) => `Robes ${pluriel}`,
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
  theme: {
    versSombre: "Switch to dark mode",
    versClair: "Back to light mode",
    intitule: "Appearance",
    sombre: "Dark",
    clair: "Light",
  },
  fiche: {
    laFiche: "About",
    silhouettes: "The body shapes it serves",
    coupe: "Silhouette",
    maison: "House",
    confection: "Made to order",
    surMesure: "Made to measure, alterations included",
    aPartirDe: "From",
    essayer: "Try it on at the showroom",
    memeFamille: "In the same family",
    toutesLes: (pluriel: string) => `All ${pluriel}`,
    toutesSilhouettes:
      "It suits every body shape — which is rare, and what makes it a safe bet at a fitting.",
    silhouettesServies: (lettres: string) =>
      `It is first recommended for the ${lettres} shapes. Nothing stops you trying it otherwise: a body shape opens paths, it closes none.`,
  },
  elise: {
    dialogue: "Élise, MADAMOON consultant",
    vous: "You",
    conseillere: "Consultant — MADAMOON",
    ecrit: "Élise is writing",
    champ: "Write to Élise…",
    champLabel: "Your message for Élise",
    envoyer: "Send",

    trouverMaCoupe: "Find my silhouette",
    prendreRendezvous: "Book an appointment",
    questionsPratiques: "Practical questions",
    appeler: "Call the boutique",
    appelerCourt: "Call",
    ecrireCourt: "Email",
    voirShowroom: "See the showroom",
    voirCatalogue: "See the catalogue",
    lancerDiagnostic: "Start",
    voirRecommandations: "See my recommendations",
    refaireDiagnostic: "Start again",
    autresMaisons: "See the other houses",
    touteLaSelection: "The whole selection",
    autreQuestion: "Another question",
    ouiJeLaConnais: "Yes, I know it",
    guidezMoi: "Guide me",
    plusEtroites: "Narrower",
    plusLarges: "Broader",
    alignees: "In line",
    courbesGenereuses: "Generous curves",
    ouiBienMarquee: "Yes, clearly",
    peuMarquee: "Barely",
    prononcees: "Pronounced",
    doucesFine: "Soft, a fine figure",

    bonjour:
      "Hello, I am Élise, a consultant at MADAMOON. Finding the dress of a lifetime is my work — and my greatest joy.",
    invitation: "Tell me about your wedding, ask me anything, or let me guide you.",
    essentiel:
      "What matters is finding the dress that shows your figure at its best while still looking like you.",
    connaissezMorpho: "Do you already know your body shape?",
    laquelle: "Very good. Which one is yours?",
    pasAPas: "I will guide you step by step.",
    epaulesHanches: "How would you describe your shoulders compared with your hips?",
    tailleMarquee: "And your waist — is it marked?",
    derniereQuestion: "Last question: your curves are rather…",
    pistes:
      "These are paths, never rules: in the boutique we also try what was not planned. Would you like to see the matching selection?",
    rdvPrivatise:
      "With pleasure. The showroom is yours alone for an hour — come with the people close to you.",
    faqIntro: "Of course. What would you like to know? You can also simply write to me.",
    dansVosCoupes: "in your silhouettes",
    aEssayer: "to try on",
    nosRecommandations: "Our recommendations",
    lObjectif: "The aim:",
    dansLOrdre: "In order",
    lettreLabel: (lettre: string) => `Shape ${lettre}`,
    chezMaison: (nom: string) => `At ${nom}`,
    toutesLesRobes: (nom: string) => `All ${nom} dresses`,
    voirMaison: (nom: string) => `See ${nom}`,
    vousRegardez: (nom: string) =>
      `You are looking at ${nom}. I start from your figure, and I will tell you honestly if the answer lies elsewhere.`,
    voiciCeQui: (nom: string, liste: string) => `At ${nom}, here is what suits you: ${liste}.`,
    pasLesCoupes: (nom: string, liste: string) =>
      `${nom} does not work the cuts I would recommend to you first. The houses that do, in order: ${liste}.`,
    franche: (nom: string) =>
      `Let me be honest: ${nom} does not work the cuts I would recommend to you first.`,
    saufQue: (combien: number): string =>
      combien === 0
        ? " Here are the houses made for you."
        : combien === 1
          ? " Its other dress is worth trying, but here first are the houses made for you."
          : " Its other dresses are worth trying, but here first are the houses made for you.",
    lesMaisonsPour: (liste: string) => `The houses for this body shape: ${liste}.`,

    localRdv: (adresse: string, cp: string) =>
      `With pleasure. The showroom is yours alone for an hour, by appointment only: Monday 12pm–9pm, Tuesday to Saturday 10am–7pm, at ${adresse}, Paris ${cp}.`,
    localPrix: (prix: string) =>
      `Our dresses start at ${prix}, alterations included. Made to measure is quoted after the fitting, depending on the dress and the fabric.`,
    localHoraires: (adresse: string, cp: string, ville: string) =>
      `The showroom receives you by appointment only: Monday 12pm to 9pm, Tuesday to Saturday 10am to 7pm — ${adresse}, ${cp} ${ville}.`,
    localCreateurs: (liste: string) =>
      `Our dresses are chosen from ${liste}, with a made-to-measure service.`,
    localDiagnostic:
      "Every woman is different. The simplest way is a short diagnosis together, to find the cuts that will suit you. Shall we begin?",
    localMerci:
      "With great pleasure. I remain at your disposal, and I look forward to welcoming you at the showroom.",
    localDefaut:
      "I would rather answer you precisely than guess. The best is to speak with the boutique directly — or I can guide you here on your figure, our prices and booking an appointment.",
  },
  catalogue: {
    nom: "MADAMOON wedding dresses",
    titre: "Our wedding dresses",
    robesDe: (pluriel: string) => `The ${pluriel}`,
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
