/* La présentation MADAMOON — dernière partie. */
const S = require("./systeme.js");
const { T, texte, fond, filet, surtitre, numero, pied, page, intercalaire,
        cartes, tirets, chiffre, planche, telephone, legende, spc } = S;

module.exports = function troisieme(pres, depart) {
  let n = depart;
  const p = () => ++n;

  /* ═════════════════════════════════ 07 · le téléphone ═════ */
  intercalaire(pres, {
    numero: "07", titre: "Le téléphone",
    ligne: "Là où se fait l'essentiel des visites. Le site n'y est pas réduit : il y est redessiné.",
  });

  {
    const s = page(pres, {
      rubrique: "Le téléphone", titre: "Le site sous le pouce",
      chapeau: "Captures réelles, prises sur un écran de téléphone. Rien n'est une maquette.",
      n: p(),
    });
    /* Les intitulés au-dessus des appareils : en dessous, le dernier
     * venait buter contre le folio. */
    const h = 3.46, pas = 2.28;
    [["iphone-accueil", "L'accueil"], ["iphone-robes", "Le catalogue"], ["iphone-fiche", "Une robe"],
     ["iphone-morphologie", "Une morphologie"], ["iphone-showroom", "Le showroom"]].forEach(([f, t], i) => {
      const x = T.MARGE + 0.14 + i * pas;
      const l = telephone(s, f, { x, y: 3.38, h });
      texte(s, t, { x: x - 0.2, y: 3.02, w: l + 0.4, h: 0.28, align: "center",
        fontFace: T.MONO, fontSize: 8.5, color: T.GRIS_CLAIR, charSpacing: spc(8.5),
        valign: "middle", isTextBox: true, margin: 0 });
    });
    s.addNotes("Cinq écrans réels. Les captures sont prises à la définition d'un iPhone Pro, sans redimensionnement.");
  }

  {
    const s = page(pres, {
      rubrique: "Le téléphone", titre: "Le menu, et Élise",
      chapeau: "Le menu du téléphone ne recopie pas celui du web : il tient en trois onglets et cinq entrées.",
      n: p(),
    });
    telephone(s, "iphone-menu", { x: 1.3, y: 3.1, h: 3.62 });
    telephone(s, "iphone-elise", { x: 3.85, y: 3.1, h: 3.62 });
    tirets(s, { x: 6.7, y: 3.2, l: 5.78, titre: null, pas: 0.72,
      items: ["Cinq entrées seulement : robes, coupes, morphologies, showroom, la maison",
              "Trois onglets pour ranger le catalogue, en petites capitales",
              "Le thème clair ou sombre se choisit en bas du menu",
              "Élise occupe l'écran entier, et se ferme d'un mot"] });
    s.addNotes("Le menu mobile a été refait après votre retour : la version web était trop lourde pour un pouce.");
  }

  {
    const s = page(pres, {
      rubrique: "Le téléphone", titre: "Ce qui change sous le pouce",
      chapeau: "Quatre décisions prises pour le téléphone, et pour lui seul.",
      n: p(),
    });
    cartes(s, [
      { label: "01", titre: "Le texte descend", texte: "Sur une fiche robe, le nom et les boutons se rangent en bas de l'image. Au centre, ils barraient la robe — le buste, la coupe, ce que la mariée vient voir." },
      { label: "02", titre: "Les icônes", texte: "Le catalogue et le coup de cœur se réduisent à un cercle. Seul l'essayage garde son intitulé, et les trois tiennent sur une ligne." },
      { label: "03", titre: "La barre se pose", texte: "Sur les pages qui ouvrent sur une photographie, la barre devient transparente et laisse l'image monter jusqu'en haut." },
      { label: "04", titre: "Les films", texte: "Les vidéos sont réencodées pour démarrer vite, et recadrées pour le format vertical : plus de bandes noires." },
    ]);
    pied(s, "Vérifié jusqu'à 320 pixels de large — le plus petit téléphone encore en circulation.");
    s.addNotes("Chacune de ces quatre décisions vient d'un retour que vous avez fait sur une capture d'écran.");
  }

  /* ═════════════════════════════════ 08 · deux langues ═════ */
  intercalaire(pres, {
    numero: "08", titre: "Deux langues",
    ligne: "Le site entier existe en anglais. Quatre-vingt-six pages, écrites et non traduites à la machine.",
  });

  {
    const s = page(pres, {
      rubrique: "Deux langues", titre: "Le site en anglais",
      chapeau: "Une adresse par page : /robes devient /en/dresses, /coupes/sirene devient /en/silhouettes/mermaid.",
      n: p(),
    });
    planche(s, "web-anglais", { x: T.MARGE, y: 3.14, l: 5.6 });
    planche(s, "web-anglais-morpho", { x: T.MARGE + 5.6 + 0.43, y: 3.14, l: 5.6 });
    legende(s, "madamoon.fr/en", { x: T.MARGE, y: 6.76, l: 5.6 });
    legende(s, "les morphologies, réécrites en anglais", { x: T.MARGE + 5.6 + 0.43, y: 6.76, l: 5.6 });
    s.addNotes("Deux mille mots d'éditorial réécrits, pas traduits mot à mot. Les deux règles de ton du français y tiennent aussi.");
  }

  {
    const s = page(pres, {
      rubrique: "Deux langues", titre: "Comment c'est construit",
      chapeau: "Le français fait autorité. L'anglais est une table rangée par les mêmes clefs, à côté.",
      n: p(),
    });
    cartes(s, [
      { label: "01", titre: "Un bouton, pas un drapeau", texte: "« FR » avec une flèche en haut à droite. On clique, on choisit. Un drapeau désigne un pays, pas une langue." },
      { label: "02", titre: "Rien d'autre ne change", texte: "Mêmes animations, mêmes couleurs, même barre. Une page anglaise est la même page, dans l'autre langue." },
      { label: "03", titre: "Les moteurs le savent", texte: "Chaque page déclare sa jumelle. Google sert la version française à Paris et l'anglaise à Londres, sans les opposer." },
      { label: "04", titre: "À relire", texte: "Un document met les 661 phrases en regard, français à gauche, anglais à droite. Vous marquez ce qui sonne faux, nous corrigeons." },
    ]);
    pied(s, "Y compris les descriptions d'images, que seuls Google et les lecteurs d'écran entendent : elles sont écrites dans les deux langues.");
    s.addNotes("Le document de relecture vous a été envoyé séparément : un lien privé, à ouvrir et annoter.");
  }

  /* ═════════════════════════════════ 09 · deux thèmes ═════ */
  intercalaire(pres, {
    numero: "09", titre: "Deux thèmes",
    ligne: "Clair par défaut. Sombre au choix, et le choix est retenu d'une visite à l'autre.",
  });

  {
    const s = page(pres, {
      rubrique: "Deux thèmes", titre: "Le mode sombre",
      chapeau: "Ce n'est pas une inversion : chaque couleur a été reprise. Le rouge de la maison est le même, et le sigle passe en blanc.",
      n: p(),
    });
    planche(s, "web-sombre-accueil", { x: T.MARGE, y: 3.2, l: 4.55, carton: false });
    planche(s, "web-sombre-fiche", { x: T.MARGE + 4.55 + 0.38, y: 3.2, l: 4.55, carton: false });
    telephone(s, "iphone-sombre", { x: 10.7, y: 2.88, h: 3.76 });
    legende(s, "l'accueil", { x: T.MARGE, y: 6.16, l: 4.55 });
    legende(s, "une fiche robe", { x: T.MARGE + 4.55 + 0.38, y: 6.16, l: 4.55 });
    legende(s, "sur téléphone", { x: 10.7, y: 6.78, l: 2.0 });
    s.addNotes("Les boutons blancs posés sur une photographie restent blancs : ils se lisent sur l'image, et l'image ne change pas de thème.");
  }

  /* ═════════════════════════════════ 10 · l'invisible ═════ */
  intercalaire(pres, {
    numero: "10", titre: "Ce qui ne se voit pas",
    ligne: "Le référencement, la vitesse, l'accessibilité. Le travail qu'une cliente ne remarque jamais — et qui décide si elle arrive.",
  });

  {
    const s = page(pres, {
      rubrique: "L'invisible", titre: "Le référencement",
      chapeau: "Chaque page est écrite pour une question que les mariées tapent réellement.",
      n: p(),
    });
    cartes(s, [
      { label: "01", titre: "Les titres", texte: "« Robe de mariée sirène à Paris », « Robe de mariée pour une silhouette en A ». Une page, une requête, jamais deux pages sur le même mot." },
      { label: "02", titre: "Les données structurées", texte: "Chaque robe est déclarée comme un produit — nom, maison, prix de départ, disponibilité. Chaque page de morphologie porte ses questions-réponses." },
      { label: "03", titre: "Les épingles", texte: "Les fiches sont préparées pour Pinterest en épingles enrichies : le nom, la maison et le prix voyagent avec l'image." },
      { label: "04", titre: "Les images", texte: "Mille sept cent trente descriptions calculées à partir des données — jamais deux fois la même, jamais un angle de vue inventé." },
    ]);
    pied(s, "Le plan du site déclare les 174 adresses et leurs jumelles anglaises. Il se met à jour tout seul à chaque mise en ligne.");
    s.addNotes("Point important : la copie de démonstration est volontairement invisible aux moteurs. Seul madamoon.fr sera indexé le jour de la bascule.");
  }

  {
    const s = page(pres, {
      rubrique: "L'invisible", titre: "Le maillage interne",
      chapeau: "Les pages se renvoient les unes aux autres par des phrases, jamais par des listes de liens.",
      n: p(),
    });
    planche(s, "maillage", { x: 4.0, y: 3.0, l: 6.6, sorte: "large" });
    tirets(s, { x: T.MARGE, y: 3.1, l: 2.9, titre: null, pas: 0.72,
      items: ["Une coupe renvoie aux morphologies qu'elle sert",
              "Une morphologie renvoie aux coupes conseillées",
              "Une maison renvoie à ses coupes et à ses robes",
              "L'ancre dit ce qu'on trouve au bout"] });
    s.addNotes("« Cliquez ici » n'apprend rien, ni à la lectrice ni à un moteur. Le schéma complet vous a été remis en PDF.");
  }

  {
    const s = page(pres, {
      rubrique: "L'invisible", titre: "La technique, en clair",
      chapeau: "Un site de fichiers, sans base de données. Rien qui puisse tomber un samedi de rendez-vous.",
      n: p(),
    });
    cartes(s, [
      { label: "01", titre: "Un site statique", texte: "Chaque page est écrite une fois, à la compilation, et servie telle quelle. Pas de serveur à surveiller, pas de mise à jour de sécurité urgente." },
      { label: "02", titre: "102 ko", texte: "Le poids du code au premier chargement. Un site de mode courant en charge dix fois plus, et se charge dix fois plus lentement." },
      { label: "03", titre: "Les médias", texte: "Neuf films réencodés pour démarrer vite, et 1 730 images produites en plusieurs tailles : le téléphone ne charge pas l'image du grand écran." },
      { label: "04", titre: "Une seule source", texte: "Le catalogue tient dans une table. Corriger le nom d'une robe la corrige sur les 174 pages, dans les deux langues, d'un seul geste." },
    ]);
    pied(s, "Le site vit dans un dépôt versionné : chaque changement est daté, expliqué, et réversible.");
    s.addNotes("Insister sur le dernier point : la maintenance est une correction de données, pas une intervention technique.");
  }

  {
    const s = page(pres, {
      rubrique: "L'invisible", titre: "L'accessibilité",
      chapeau: "Le site doit se lire au doigt, au clavier, à la voix, et par quelqu'un qui ne distingue pas les couleurs.",
      n: p(),
    });
    cartes(s, [
      { label: "01", titre: "Les lecteurs d'écran", texte: "Chaque image est décrite, chaque bouton nommé. Le cœur annonce « Ajouter Clover aux coups de cœur », pas « bouton »." },
      { label: "02", titre: "Le clavier", texte: "Tout se parcourt sans souris, et le repère de focus reste visible. Un lien d'évitement ouvre chaque page." },
      { label: "03", titre: "Le mouvement", texte: "Qui a demandé moins d'animations à son appareil reçoit un site immobile : l'ouverture ne joue pas, les sections paraissent d'emblée." },
      { label: "04", titre: "La couleur", texte: "Aucune information ne repose sur elle seule. Le cœur se remplit, le trait change — on voit l'état sans voir la teinte." },
    ]);
    pied(s, "Ce n'est pas une option : c'est ce que la loi demande à un site commercial français, et ce qu'une mariée malvoyante attend.");
    s.addNotes("Beaucoup de sites de mode échouent sur ce point. Celui-ci a été construit avec, pas corrigé après.");
  }

  /* ═════════════════════════════════ 11 · la suite ═════ */
  intercalaire(pres, {
    numero: "11", titre: "La suite",
    ligne: "Ce qui reste à trancher ensemble avant la bascule sur madamoon.fr.",
  });

  {
    const s = page(pres, {
      rubrique: "La suite", titre: "Ce qui attend une décision",
      chapeau: "Rien de bloquant. Ce sont des choix qui vous appartiennent, et que nous n'avons pas voulu prendre à votre place.",
      n: p(),
    });
    const l = 3.58, e = 0.44;
    tirets(s, { x: T.MARGE, y: 3.14, l, titre: "De votre côté",
      items: ["Relire l'anglais dans le document fourni",
              "Revendiquer le domaine sur Pinterest",
              "Deux robes dont la maison reste à confirmer",
              "Sept robes sans créateur renseigné"] });
    tirets(s, { x: T.MARGE + l + e, y: 3.14, l, titre: "De notre côté",
      items: ["La bascule du domaine madamoon.fr",
              "Deux photographies à remplacer, trop petites",
              "La langue de réponse du service d'Élise",
              "Les avis Google, laissés en français"] });
    tirets(s, { x: T.MARGE + 2 * (l + e), y: 3.14, l, titre: "À discuter",
      items: ["Le journal des visites et ce qu'on en tire",
              "Les pages de quartier : Paris 10ᵉ, République",
              "Le blog, s'il a lieu d'être",
              "La phase 2 et son périmètre"] });
    s.addNotes("Aucun de ces points n'empêche la mise en ligne. Les deux premiers de chaque colonne sont les plus urgents.");
  }

  /* ═════════════════════════════════ clôture ═════ */
  {
    const s = pres.addSlide();
    fond(s, T.NOIR);
    surtitre(s, "Phase 1  ·  livrée", T.GRIS);
    filet(s, 0.96, T.FILET_NOIR);
    texte(s, "Le site est\nen ligne.", {
      x: T.MARGE, y: 2.1, w: 10.5, h: 2.4,
      fontFace: T.TITRE, fontSize: 62, color: T.BLANC, charSpacing: spc(62),
      lineSpacingMultiple: 1.05, valign: "middle",
    });
    s.addShape("rect", { x: T.MARGE, y: 4.62, w: 2.2, h: 0.032, fill: { color: T.ACCENT }, line: { type: "none" } });
    texte(s, "Il se visite, il se montre, il se corrige. Dites-nous ce que vous voulez changer — tout ce qui est écrit ici se modifie.", {
      x: T.MARGE, y: 4.9, w: 8.2, h: 1.0,
      fontFace: T.TITRE, fontSize: 14.5, color: T.GRIS_CLAIR, charSpacing: spc(14.5),
      lineSpacingMultiple: 1.4, valign: "top",
    });
    filet(s, 6.46, T.FILET_NOIR);
    texte(s, "MADAMOON  ·  PARIS 10ᵉ", {
      x: T.MARGE, y: 6.66, w: 5.2, h: 0.24,
      fontFace: T.MONO, fontSize: 8.5, color: T.GRIS, charSpacing: spc(8.5), valign: "middle",
    });
    texte(s, "ANVSLAB.COM", {
      x: 7.28, y: 6.66, w: 5.2, h: 0.24, align: "right",
      fontFace: T.MONO, fontSize: 8.5, color: T.ACCENT, charSpacing: spc(8.5), valign: "middle",
    });
    s.addNotes("Clôture. Ouvrir la discussion sur la phase 2.");
  }

  return n;
};
