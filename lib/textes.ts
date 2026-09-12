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
    titre: "Vous vous mariez bientôt ?",
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
    legende: "Les morphologies",
    titre: "Avant la robe, la ligne.",
    texte:
      "Six morphologies, et pour chacune les coupes qui allongent, équilibrent ou révèlent la ligne.",
    lien: "Les six morphologies",
    precedentes: "Voir les morphologies précédentes",
    suivantes: "Voir les morphologies suivantes",
  },
  coupes: {
    legende: "Les coupes",
    titre: "Trouvez la coupe qui vous va.",
    texte: "La coupe, c’est la forme de la robe. En voici six.",
    lien: "Toutes les coupes",
    presentee: "Coupe présentée",
    les: "Les",
  },
  createurs: {
    legende: "Les créateurs",
    titre: "Plusieurs maisons. Aucune par hasard.",
    /* La phrase est écrite, non composée à partir des maisons montrées :
     * leur nombre change avec les collections, et la ligne n'a pas à
     * être reprise chaque fois. */
    lieux:
      "Biarritz, Newport Beach, Rome, Dallas, Barcelone — les plus belles robes des collections nuptiales, choisies une par une pour vous.",
    autres: "Autres créateurs",
    autresNote: "De petits ateliers, trouvés un par un.",
    precedentes: "Voir les maisons précédentes",
    suivantes: "Voir les maisons suivantes",
  },
  avis: {
    legende: "Ce qu’elles en disent",
    /* Ni le nombre d'avis ni le rang dans l'arrondissement : la maison
     * ne veut pas d'un chiffre qu'il faut tenir à jour, ni d'une
     * comparaison. La note reste, le décompte passe dans les données
     * structurées — invisible à la lecture, lu par Google. */
    experience: "MADAMOON n’est pas une simple boutique à visiter, c’est une expérience à vivre.",
    lesAvis: "Voir les avis Google",
  },
  showroom: {
    legende: "Le showroom — Paris 10",
    titre: "Poussez la porte",
    texte: "Une heure, le showroom pour vous seule, et quelqu’un qui connaît chaque robe.",
    lien: "Découvrir le showroom",
    alt: "L’entrée du showroom MADAMOON, rue du Faubourg Saint-Martin",
  },
  panier: {
    vide: "Vos coups de cœur, vide pour l’instant",
    pleinUn: "Vos coups de cœur, 1 robe",
    plein: (n: number) => `Vos coups de cœur, ${n} robes`,
    ajouter: (nom: string) => `Ajouter ${nom} aux coups de cœur`,
    retirer: (nom: string) => `Retirer ${nom} des coups de cœur`,
    dedans: (nom: string) => `${nom} est dans vos coups de cœur`,
    coupDeCoeur: "Coup de cœur",
    dansLesVotres: "Dans vos coups de cœur",
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
    autresVues: (nom: string) => `Autres vues de ${nom}`,
    laFiche: "La fiche",
    silhouettes: "Les morphologies qu’elle sert",
    coupe: "La coupe",
    maison: "La maison",
    confection: "La confection",
    surMesure: "Sur mesure, retouches incluses",
    aPartirDe: "À partir de",
    essayer: "L’essayer au showroom",
    memeFamille: "Dans la même famille",
    toutesLes: (pluriel: string) => `Toutes les ${pluriel}`,
    toutesSilhouettes:
      "Elle va à toutes les morphologies — c’est rare, et c’est ce qui en fait une valeur sûre à l’essayage.",
    silhouettesServies: (lettres: string) =>
      `Elle est d’abord conseillée aux morphologies ${lettres}. Rien n’empêche de l’essayer autrement : une morphologie ouvre des pistes, elle n’en ferme aucune.`,
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
    doucesFine: "Douces, ligne fine",

    bonjour:
      "Bonjour, je suis Élise, conseillère chez MADAMOON. Trouver la robe d’une vie, c’est mon métier — et ma plus grande joie.",
    invitation:
      "Parlez-moi de votre mariage, posez-moi vos questions, ou laissez-vous guider.",
    essentiel:
      "L’essentiel est de trouver la robe qui met en valeur votre morphologie tout en vous ressemblant.",
    connaissezMorpho: "Connaissez-vous déjà votre morphologie ?",
    laquelle: "Très bien. Laquelle est la vôtre ?",
    pasAPas: "Je vous guide pas à pas.",
    epaulesHanches: "Comment décririez-vous vos épaules par rapport à vos hanches ?",
    tailleMarquee: "Et votre taille, est-elle marquée ?",
    derniereQuestion: "Dernière question : vos courbes sont plutôt…",
    pistes:
      "Ce sont des pistes, jamais des règles : en boutique, on essaie aussi ce qui n’était pas prévu. Voulez-vous voir la sélection correspondante ?",
    rdvPrivatise:
      "Avec plaisir. Le showroom est entièrement privatisé pour vous pendant une heure — venez accompagnée de vos proches.",
    faqIntro: "Bien sûr. Que souhaitez-vous savoir ? Vous pouvez aussi m’écrire librement.",
    dansVosCoupes: "dans vos coupes",
    aEssayer: "à essayer",
    nosRecommandations: "Nos recommandations",
    /* Le deux-points de la version lue à voix haute : insécable en
     * français, collé en anglais. */
    recommandationsPlat: "Nos recommandations\u00a0:",
    lObjectif: "L’objectif :",
    dansLOrdre: "Dans l’ordre",
    lettreLabel: (lettre: string) => `En ${lettre}`,
    chezMaison: (nom: string) => `Chez ${nom}`,
    toutesLesRobes: (nom: string) => `Toutes les robes ${nom}`,
    voirMaison: (nom: string) => `Voir ${nom}`,
    vousRegardez: (nom: string) =>
      `Vous regardez ${nom}. Je pars de votre morphologie, et je vous dis franchement si la réponse est ailleurs.`,
    voiciCeQui: (nom: string, liste: string) =>
      `Chez ${nom}, voici ce qui vous correspond : ${liste}.`,
    pasLesCoupes: (nom: string, liste: string) =>
      `${nom} ne travaille pas les coupes que je vous conseillerais en premier. Les maisons qui les ont, dans l’ordre : ${liste}.`,
    franche: (nom: string) =>
      `Je préfère être franche : ${nom} ne travaille pas les coupes que je vous conseillerais en premier.`,
    saufQue: (combien: number): string =>
      combien === 0
        ? " Voici les maisons faites pour vous."
        : combien === 1
          ? " Son autre robe vaut l’essai, mais voici d’abord les maisons faites pour vous."
          : " Ses autres robes valent l’essai, mais voici d’abord les maisons faites pour vous.",
    lesMaisonsPour: (liste: string) => `Les maisons pour cette morphologie : ${liste}.`,

    localRdv: (adresse: string, cp: string) =>
      `Avec plaisir. Le showroom est privatisé pour vous pendant une heure, sur rendez-vous uniquement : lundi 12h–21h, du mardi au samedi 10h–19h, au ${adresse}, Paris ${cp}.`,
    localPrix: (prix: string) =>
      `Nos robes commencent à ${prix}, retouches comprises. Le sur-mesure se chiffre après l’essayage, selon la robe et le tissu.`,
    localHoraires: (adresse: string, cp: string, ville: string) =>
      `Le showroom vous reçoit sur rendez-vous uniquement : lundi de 12h à 21h, du mardi au samedi de 10h à 19h — ${adresse}, ${cp} ${ville}.`,
    localCreateurs: (liste: string) =>
      `Nos robes sont choisies chez ${liste}, avec un service de confection sur mesure.`,
    localDiagnostic:
      "Chaque femme est unique. Le plus simple est un petit diagnostic ensemble, pour identifier les coupes qui vous mettront en valeur. On commence ?",
    localMerci:
      "Avec grand plaisir. Je reste à votre écoute, et au plaisir de vous accueillir au showroom.",
    localDefaut:
      "Je préfère vous répondre précisément plutôt que de m’avancer. Le mieux est d’en parler de vive voix avec la boutique — ou je peux vous guider ici sur votre morphologie, nos prix et la prise de rendez-vous.",
  },
  pages: {
    coupes: {
      titre: "Les coupes",
      intro:
        "Six coupes. La coupe n’est pas une règle : c’est le premier tri, celui qui fait gagner une heure d’essayage.",
    },
    morphologies: {
      titre: "Les morphologies",
      toutesLesCoupes: "Toutes les coupes",
      intro:
        "Une morphologie n’exclut jamais une robe : elle ouvre des pistes. Rien n’est « à éviter » — c’est un conseil de style, pas une règle, et au showroom on essaie aussi ce qui n’était pas prévu.",
      guide: "Vous ne savez pas laquelle est la vôtre ? Élise vous guide en trois questions.",
    },
    coupe: {
      nos: (pluriel: string, maison: string) => `Nos ${pluriel} ${maison}`,
      nosAutres: (pluriel: string) => `Nos autres ${pluriel}`,
      lesNotres: (pluriel: string) => `Nos ${pluriel}`,
      laMaison: "La maison",
      aQuiElleVa: "À qui cette coupe va",
      toutesLesMorphologies: "Toutes les morphologies",
      pistes: (coupe: string) =>
        `Une morphologie n’exclut jamais une robe : elle ouvre des pistes. La ${coupe} est celle que l’on conseille d’abord à ces morphologies — les autres l’essaient tout aussi bien en boutique.`,
    },
    maison: {
      lesRobesDe: (nom: string) => `Les robes ${nom}`,
      voirToutesLesRobes: "Voir toutes les robes",
      sesCoupes: "Ses coupes",
      toutesLesCoupes: "Toutes les coupes",
      travaille: (nom: string, combien: number) =>
        `${nom} travaille ${combien === 1 ? "une seule coupe" : `${combien} coupes`} au catalogue MADAMOON. L’image est prise sur l’une de ses robes, jamais sur celle d’une autre maison.`,
      aQuiCesCoupesVont: "À qui ces coupes vont",
      toutesLesMorphologies: "Toutes les morphologies",
      pistes: (dela: string) =>
        `Une morphologie n’exclut jamais une robe : elle ouvre des pistes. Voici celles que les coupes ${dela} servent en premier — les autres s’essaient tout aussi bien en boutique.`,
      trouverMaRobeDe: (nom: string) => `Trouver ma robe ${nom}`,
    },
    morpho: {
      reconnaitre: (lettre: string) => `Reconnaître une morphologie en ${lettre}`,
      lesProportions: "Les proportions",
      pasExacte:
        "Une morphologie ne se lit pas dans un miroir en trente secondes, et elle n’a pas à être exacte : c’est un point de départ pour savoir quoi essayer en premier. Si vous hésitez entre deux,",
      eliseVousGuide: "Élise vous guide",
      enTroisQuestions: " en trois questions.",
      lesCoupes: "Les coupes qui vous mettent en valeur",
      voir: "Voir",
      toutesNosRobes: (coupe: string) => `Toutes nos robes ${coupe}`,
      toutesLesCoupes: "Toutes les coupes",
      voiciPourquoi:
        "Voici pourquoi ces lignes fonctionnent, et ce qu’elles font réellement une fois la robe enfilée.",
      decouvrez: (apposition: string, lettre: string) =>
        `Découvrez nos robes de mariée ${apposition} adaptées à une morphologie en ${lettre}`,
      ouDirectement: " — ou allez directement à ",
      et: " et ",
      nosRobes: "Nos robes pour cette morphologie",
      voirToutLeCatalogue: "Voir tout le catalogue",
      particulierement: "Particulièrement adaptées",
      particulierementNote:
        "Les coupes que nous sortons en premier de la penderie quand vous poussez la porte.",
      egalement: "Également intéressantes à essayer",
      egalementNote:
        "Elles ne sont pas les plus évidentes, et c’est souvent l’une d’elles qui surprend.",
      selonVosEnvies: "À découvrir selon vos envies",
      selonVosEnviesNote:
        "Le reste de la sélection. En cabine tout se tente, et rien ici n’est écarté.",
      lesQuestions: "Les questions que l’on nous pose",
      poserLaVotre: "Poser la vôtre",
      commentSavoir: (lettre: string) => `Comment savoir si j’ai une morphologie en ${lettre} ?`,
      auDela: "Au-delà de la morphologie",
      auDelaPhrase:
        "Une morphologie dit par où commencer. Elle ne dit pas qui vous êtes le jour de votre mariage.",
      lesMaisons: "Les maisons qui vous vont",
      enCoupes: (liste: string) => ` — en ${liste}`,
    },
    showroom: {
      titre: "Le showroom",
      accroche: "Paris 10",
      surRendezVous: " — sur rendez-vous",
      prendreRendezvous: "Prendre rendez-vous",
      laVisite: "La visite",
      uneHeure: "Une heure, le showroom privatisé, et quelqu’un qui connaît chaque robe.",
      venir: "Venir",
      altScene: "Robes de mariée suspendues dans le showroom",
      altDetail: "Détail d’une robe de mariée",
    },
    maisonPage: {
      titre: "La maison",
      accroche: "Une boutique parisienne, cinq créateurs, et le temps qu’il faut pour choisir.",
      texteAvant:
        "MADAMOON n’édite pas ses propres collections : la maison choisit, robe par robe, chez cinq créateurs — puis fait confectionner et ajuster la vôtre à l’atelier. Le showroom du 10",
      texteApres: " se privatise le temps d’un essayage.",
      prendreRendezvous: "Prendre rendez-vous",
      lesCreateurs: "Les créateurs",
      voirLesRobes: "Voir les robes",
      altScene: "Robe de mariée présentée en boutique",
    },
    rendezvous: {
      surtitre: "Essayage privé, sur rendez-vous",
      titre: "Prendre rendez-vous",
      choisirUnCreneau: "Choisir un créneau",
      leShowroom: "Le showroom",
      horaires: "Horaires",
      uneHeure:
        "Une heure, au showroom. L’essayage est gratuit pour la mariée et deux accompagnants.",
      altScene: "L’entrée du showroom",
      robeAvant: "Le modèle ",
      robeApres: (ligne: string) => ` sera préparé pour votre venue — ${ligne}.`,
    },
    trouver: {
      titre: "Trouver ma robe",
      voirToutesLesRobes: "Voir toutes les robes",
      intro:
        "Trois portes, et aucune n’est la bonne. Ce sont des pistes, pas des règles : au showroom, beaucoup de mariées repartent avec une robe qu’elles n’auraient pas choisie sur photo.",
      parLaCoupe: "Par la coupe",
      parLaCoupeTexte:
        "Sirène, princesse, fluide, trapèze, minimaliste, deux-en-un. Le mot que les mariées emploient en boutique, et le tri qui fait gagner une heure d’essayage.",
      parLaMorphologie: "Par la morphologie",
      parLaMorphologieTexte:
        "En O, A, V, H, 8 ou X. Non pour exclure des robes — rien n’est « à éviter » — mais pour savoir lesquelles proposer en premier.",
      parLaMaison: "Par la maison",
      parLaMaisonTexte:
        "Cinq créateurs, chacun avec sa main : les dentelles de Watters, le mikado de Casablanca, le drapé d’Olya Mak.",
      elise: (adresse: string) =>
        `Ou laissez-vous guider : Élise part de votre morphologie, en trois questions, et vous dit franchement si la réponse est chez une autre maison. Elle donne aussi l’adresse et les horaires — ${adresse}, sur rendez-vous.`,
    },
    calendly: {
      souvre: "Le calendrier s’ouvre",
      echec: "Le calendrier n’a pas pu s’ouvrir",
      patience: "Encore un instant. Vous pouvez aussi réserver dans un nouvel onglet.",
      bloque:
        "Il est peut-être retenu par un bloqueur. Vous pouvez réserver directement sur la page de la maison, ou nous appeler.",
      choisirUnCreneau: "Choisir un créneau",
    },
    introuvable: {
      erreur: "Erreur 404",
      titre: "Cette page n’existe pas",
      texte: "Le lien a peut-être changé. Les robes, elles, sont toujours là.",
      voirLesRobes: "Voir les robes",
      accueil: "Retour à l’accueil",
    },
  },
  coeurs: {
    vosCoupsDeCoeur: "Vos coups de cœur",
    selectionPartagee: "Une sélection partagée",
    voirToutesLesRobes: "Voir toutes les robes",
    voirLesRobes: "Voir les robes",
    prendreRendezvous: "Prendre rendez-vous",
    lienPerime:
      "Ce lien ne désigne aucune robe que nous présentons encore. Le catalogue a peut-être changé depuis qu’il a été envoyé.",
    retenuePourVous: (n: number) =>
      n === 1 ? "Une robe a été retenue pour vous." : `${n} robes ont été retenues pour vous.`,
    essaientEnsemble: "Elles s’essaient ensemble, sur rendez-vous, au showroom.",
    dejaDedans: "Déjà dans vos coups de cœur",
    ajouterAuxMiens: "Ajouter à mes coups de cœur",
    voirLesMiens: "Voir mes coups de cœur",
    plusAuCatalogue: (n: number) =>
      n === 1
        ? "Une robe de ce lien n’est plus au catalogue."
        : `${n} robes de ce lien ne sont plus au catalogue.`,
    aucun:
      "Vous n’avez pas encore de coup de cœur. Parcourez le catalogue et touchez le cœur posé sur une robe : elle vous attendra ici.",
    partirDeMaSilhouette: "Partir de ma morphologie",
    retenues: (n: number) => (n === 1 ? "Une robe retenue." : `${n} robes retenues.`),
    apportez:
      "Apportez cette liste au showroom : l’essayage se prépare mieux quand on sait par où commencer.",
    viderLaListe: "Vider la liste",
    gardee:
      "Cette liste est gardée dans ce navigateur. Elle ne vous suit pas d’un appareil à l’autre et ne nous est pas transmise — le lien de partage, lui, porte la sélection avec lui.",
    partager: "Partager ma sélection",
    copie: "Lien copié",
    lienACopier: "Le lien de votre sélection, à copier",
    titrePartage: "Ma sélection MADAMOON",
    textePartage: (n: number) =>
      n === 1
        ? "La robe que j’ai retenue chez MADAMOON."
        : `Les ${n} robes que j’ai retenues chez MADAMOON.`,
  },
  catalogue: {
    nom: "Robes de mariée MADAMOON",
    titre: "Nos robes de mariée",
    robesDe: (pluriel: string) => `Robes ${pluriel}`,
    telecharger: (intitule: string) => `Télécharger le catalogue ${intitule}`,
    fichier: (intitule: string) => `MADAMOON — Catalogue ${intitule}.pdf`,
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
    legende: "Body shapes",
    titre: "Before the dress, the line.",
    texte:
      "Six body shapes, and for each the cuts that lengthen, balance or reveal it.",
    lien: "The six body shapes",
    precedentes: "See the previous body shapes",
    suivantes: "See the next body shapes",
  },
  coupes: {
    legende: "The silhouettes",
    titre: "Find the cut that suits you.",
    texte: "The cut is the shape of the dress. Here are six.",
    lien: "All silhouettes",
    presentee: "Silhouette shown",
    les: "All",
  },
  createurs: {
    legende: "The designers",
    titre: "Several houses. None by chance.",
    lieux:
      "Biarritz, Newport Beach, Rome, Dallas, Barcelona — the finest dresses of the bridal collections, chosen one by one for you.",
    autres: "Other designers",
    autresNote: "Small ateliers, found one by one.",
    precedentes: "See the previous houses",
    suivantes: "See the next houses",
  },
  avis: {
    legende: "What they say",
    experience: "MADAMOON is not simply a boutique to visit — it is an experience to live.",
    lesAvis: "See the Google reviews",
  },
  showroom: {
    legende: "The showroom — Paris 10",
    texte: "An hour, the showroom to yourself, and someone who knows every dress.",
    titre: "Push the door open",
    lien: "See the showroom",
    alt: "The entrance to the MADAMOON showroom, rue du Faubourg Saint-Martin",
  },
  panier: {
    vide: "Your favourites, empty for now",
    pleinUn: "Your favourites, 1 dress",
    plein: (n: number) => `Your favourites, ${n} dresses`,
    ajouter: (nom: string) => `Add ${nom} to your favourites`,
    retirer: (nom: string) => `Remove ${nom} from your favourites`,
    dedans: (nom: string) => `${nom} is in your favourites`,
    coupDeCoeur: "Favourite",
    dansLesVotres: "In your favourites",
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
    autresVues: (nom: string) => `Other views of ${nom}`,
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
    recommandationsPlat: "Our recommendations:",
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
  pages: {
    coupes: {
      titre: "The silhouettes",
      intro:
        "Six cuts. The cut is not a rule: it is the first sorting, the one that saves an hour of fittings.",
    },
    morphologies: {
      titre: "Body shapes",
      toutesLesCoupes: "All silhouettes",
      intro:
        "A body shape never rules a dress out: it opens paths. Nothing is “to be avoided” — it is advice on style, not a rule, and in the showroom we also try what was not planned.",
      guide: "Not sure which one is yours? Élise will guide you in three questions.",
    },
    coupe: {
      nos: (pluriel: string, maison: string) => `Our ${maison} ${pluriel}`,
      nosAutres: (pluriel: string) => `Our other ${pluriel}`,
      lesNotres: (pluriel: string) => `Our ${pluriel}`,
      laMaison: "The house",
      aQuiElleVa: "Who this cut suits",
      toutesLesMorphologies: "All body shapes",
      pistes: (coupe: string) =>
        `A body shape never rules a dress out: it opens paths. The ${coupe} is the one we recommend first to these body shapes — the others try it on just as happily in the boutique.`,
    },
    maison: {
      lesRobesDe: (nom: string) => `The ${nom} dresses`,
      voirToutesLesRobes: "See all the dresses",
      sesCoupes: "Its silhouettes",
      toutesLesCoupes: "All silhouettes",
      travaille: (nom: string, combien: number) =>
        `${nom} works ${combien === 1 ? "a single cut" : `${combien} cuts`} in the MADAMOON catalogue. The image is taken from one of its own dresses, never from another house’s.`,
      aQuiCesCoupesVont: "Who these cuts suit",
      toutesLesMorphologies: "All body shapes",
      pistes: (dela: string) =>
        `A body shape never rules a dress out: it opens paths. Here are the ones the ${dela} cuts serve first — the others are tried on just as happily in the boutique.`,
      trouverMaRobeDe: (nom: string) => `Find my ${nom} dress`,
    },
    morpho: {
      reconnaitre: (lettre: string) => `Recognising the ${lettre} shape`,
      lesProportions: "The proportions",
      pasExacte:
        "A body shape is not read in a mirror in thirty seconds, and it does not have to be exact: it is a starting point, to know what to try on first. If you hesitate between two,",
      eliseVousGuide: "Élise will guide you",
      enTroisQuestions: " in three questions.",
      lesCoupes: "The cuts that suit you",
      voir: "See",
      toutesNosRobes: (coupe: string) => `All our ${coupe} dresses`,
      toutesLesCoupes: "All silhouettes",
      voiciPourquoi:
        "Here is why these lines work, and what they actually do once the dress is on.",
      decouvrez: (apposition: string, lettre: string) =>
        `Discover our ${apposition} wedding dresses suited to the ${lettre} shape`,
      ouDirectement: " — or go straight to ",
      et: " and ",
      nosRobes: "Our dresses for this figure",
      voirToutLeCatalogue: "See the whole catalogue",
      particulierement: "Particularly suited",
      particulierementNote:
        "The cuts we take out of the wardrobe first when you push the door open.",
      egalement: "Also worth trying",
      egalementNote:
        "They are not the most obvious ones, and it is often one of them that surprises.",
      selonVosEnvies: "To discover as you please",
      selonVosEnviesNote:
        "The rest of the selection. In the fitting room everything may be tried, and nothing here is ruled out.",
      lesQuestions: "The questions we are asked",
      poserLaVotre: "Ask yours",
      commentSavoir: (lettre: string) => `How do I know if I have the ${lettre} shape?`,
      auDela: "Beyond the body shape",
      auDelaPhrase:
        "A body shape says where to begin. It does not say who you are on the day of your wedding.",
      lesMaisons: "The houses that suit you",
      enCoupes: (liste: string) => ` — in ${liste}`,
    },
    showroom: {
      titre: "The showroom",
      accroche: "Paris 10",
      surRendezVous: " — by appointment",
      prendreRendezvous: "Book an appointment",
      laVisite: "The visit",
      uneHeure: "An hour, the showroom to yourself, and someone who knows every dress.",
      venir: "Coming to us",
      altScene: "Wedding dresses hanging in the showroom",
      altDetail: "A detail of a wedding dress",
    },
    maisonPage: {
      titre: "The house",
      accroche: "A Paris boutique, five designers, and the time it takes to choose.",
      texteAvant:
        "MADAMOON does not produce its own collections: the house chooses, dress by dress, from five designers — then has yours made and fitted in the atelier. The showroom in the 10th arrondissement is yours alone for the length of a fitting.",
      texteApres: "",
      prendreRendezvous: "Book an appointment",
      lesCreateurs: "The designers",
      voirLesRobes: "See the dresses",
      altScene: "A wedding dress shown in the boutique",
    },
    rendezvous: {
      surtitre: "Private fitting, by appointment",
      titre: "Book an appointment",
      choisirUnCreneau: "Choose a time",
      leShowroom: "The showroom",
      horaires: "Opening hours",
      uneHeure:
        "One hour, at the showroom. The fitting is free for the bride and two guests.",
      altScene: "The entrance to the showroom",
      robeAvant: "The ",
      robeApres: (ligne: string) => ` will be made ready for your visit — ${ligne}.`,
    },
    trouver: {
      titre: "Find my dress",
      voirToutesLesRobes: "See all the dresses",
      intro:
        "Three doors, and none of them is the right one. These are paths, not rules: at the showroom, many brides leave with a dress they would never have chosen from a photograph.",
      parLaCoupe: "By silhouette",
      parLaCoupeTexte:
        "Mermaid, ball gown, sheath, A-line, minimalist, two-in-one. The word brides use in the boutique, and the sorting that saves an hour of fittings.",
      parLaMorphologie: "By body shape",
      parLaMorphologieTexte:
        "O, A, V, H, 8 or X. Not to rule dresses out — nothing is “to be avoided” — but to know which to offer first.",
      parLaMaison: "By house",
      parLaMaisonTexte:
        "Five designers, each with their own hand: the laces of Watters, the mikado of Casablanca, the draping of Olya Mak.",
      elise: (adresse: string) =>
        `Or let yourself be guided: Élise starts from your figure, in three questions, and tells you honestly if the answer lies with another house. She also gives the address and the hours — ${adresse}, by appointment.`,
    },
    calendly: {
      souvre: "The calendar is opening",
      echec: "The calendar could not open",
      patience: "One moment. You can also book in a new tab.",
      bloque:
        "It may be held back by a blocker. You can book directly on the house’s own page, or call us.",
      choisirUnCreneau: "Choose a time",
    },
    introuvable: {
      erreur: "Error 404",
      titre: "This page does not exist",
      texte: "The link may have changed. The dresses, though, are still here.",
      voirLesRobes: "See the dresses",
      accueil: "Back to the home page",
    },
  },
  coeurs: {
    vosCoupsDeCoeur: "Your favourites",
    selectionPartagee: "A shared selection",
    voirToutesLesRobes: "See all the dresses",
    voirLesRobes: "See the dresses",
    prendreRendezvous: "Book an appointment",
    lienPerime:
      "This link points to no dress we still show. The catalogue may have changed since it was sent.",
    retenuePourVous: (n: number) =>
      n === 1 ? "One dress has been chosen for you." : `${n} dresses have been chosen for you.`,
    essaientEnsemble: "They are tried on together, by appointment, at the showroom.",
    dejaDedans: "Already in your favourites",
    ajouterAuxMiens: "Add to my favourites",
    voirLesMiens: "See my favourites",
    plusAuCatalogue: (n: number) =>
      n === 1
        ? "One dress from this link is no longer in the catalogue."
        : `${n} dresses from this link are no longer in the catalogue.`,
    aucun:
      "You have no favourites yet. Browse the catalogue and touch the heart on a dress: it will be waiting for you here.",
    partirDeMaSilhouette: "Start from my figure",
    retenues: (n: number) => (n === 1 ? "One dress chosen." : `${n} dresses chosen.`),
    apportez:
      "Bring this list to the showroom: a fitting goes better when you know where to begin.",
    viderLaListe: "Empty the list",
    gardee:
      "This list is kept in this browser. It does not follow you from one device to another and is not sent to us — the sharing link, however, carries the selection with it.",
    partager: "Share my selection",
    copie: "Link copied",
    lienACopier: "The link to your selection, to copy",
    titrePartage: "My MADAMOON selection",
    textePartage: (n: number) =>
      n === 1
        ? "The dress I have chosen at MADAMOON."
        : `The ${n} dresses I have chosen at MADAMOON.`,
  },
  catalogue: {
    nom: "MADAMOON wedding dresses",
    titre: "Our wedding dresses",
    robesDe: (pluriel: string) => `The ${pluriel}`,
    telecharger: (intitule: string) => `Download the ${intitule} catalogue`,
    fichier: (intitule: string) => `MADAMOON — ${intitule} catalogue.pdf`,
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
