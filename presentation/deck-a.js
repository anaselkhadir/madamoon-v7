/* La présentation MADAMOON — première moitié. */
const S = require("./systeme.js");
const { T, texte, fond, filet, surtitre, numero, pied, page, intercalaire,
        cartes, tirets, chiffre, planche, telephone, legende, spc } = S;

module.exports = function premiere(pres) {
  let n = 0;
  const p = () => ++n;

  /* ═════════════════════════════════ couverture ═════ */
  {
    const s = pres.addSlide();
    fond(s, T.NOIR);
    surtitre(s, "Présentation de livraison  ·  phase 1", T.GRIS);
    filet(s, 0.96, T.FILET_NOIR);
    texte(s, "MADAMOON", {
      x: T.MARGE, y: 1.5, w: T.COLONNE, h: 1.6,
      fontFace: T.TITRE, fontSize: 96, color: T.BLANC, charSpacing: spc(96), valign: "middle",
    });
    s.addShape("rect", { x: T.MARGE, y: 3.32, w: 1.15, h: 0.04, fill: { color: T.ACCENT }, line: { type: "none" } });
    texte(s, "Le nouveau site\nde la boutique", {
      x: T.MARGE, y: 3.7, w: 8.2, h: 1.6,
      fontFace: T.TITRE, fontSize: 31, color: T.BLANC, charSpacing: spc(31),
      lineSpacingMultiple: 1.15, valign: "top",
    });
    texte(s, "174 pages, deux langues, un catalogue entier et une conseillère. Ce document présente ce qui a été conçu, écrit et mis en ligne — page par page, fonction par fonction.", {
      x: T.MARGE, y: 5.42, w: 7.4, h: 0.9,
      fontFace: T.TITRE, fontSize: 13.5, color: T.GRIS_CLAIR, charSpacing: spc(13.5),
      lineSpacingMultiple: 1.4, valign: "top",
    });
    filet(s, 6.46, T.FILET_NOIR);
    texte(s, "PARIS 10ᵉ  ·  FRANCE", {
      x: T.MARGE, y: 6.66, w: 5.2, h: 0.24,
      fontFace: T.MONO, fontSize: 8.5, color: T.GRIS, charSpacing: spc(8.5), valign: "middle",
    });
    texte(s, "ANVSLAB.COM", {
      x: 7.28, y: 6.66, w: 5.2, h: 0.24, align: "right",
      fontFace: T.MONO, fontSize: 8.5, color: T.ACCENT, charSpacing: spc(8.5), valign: "middle",
    });
    s.addNotes("Ouverture. Le site est en ligne, la phase 1 est livrée. Ce document se lit de bout en bout ou se picore par section.");
  }

  /* ═════════════════════════════════ comment lire ═════ */
  {
    const s = page(pres, {
      rubrique: "À propos",
      titre: "Comment lire ce document",
      chapeau: "Il suit l'ordre d'une visite : ce que l'on voit d'abord, puis ce que l'on découvre, puis ce qui travaille sans se montrer.",
      n: p(),
    });
    const l = 3.58, e = 0.44;
    tirets(s, { x: T.MARGE, y: 3.14, l, titre: "Ce qu'il contient",
      items: ["Chaque page du site, en capture",
              "Chaque fonction, et la raison qui l'a fait naître",
              "Le travail invisible : référencement, vitesse, accessibilité",
              "Ce qui reste à trancher ensemble"] });
    tirets(s, { x: T.MARGE + l + e, y: 3.14, l, titre: "Ce qu'il n'est pas",
      items: ["Un document technique : rien n'y demande de savoir coder",
              "Un devis : la phase 1 est livrée",
              "Un guide d'utilisation : il viendra séparément",
              "Un document figé : il suit le site"] });
    tirets(s, { x: T.MARGE + 2 * (l + e), y: 3.14, l, titre: "Comment il s'utilise",
      items: ["Pour valider ce qui a été livré",
              "Pour préparer les décisions de la phase 2",
              "Pour présenter le site à un tiers",
              "Les captures sont celles du site en ligne"] });
    s.addNotes("Cadrer la lecture. Insister : toutes les captures viennent du site réel, rien n'est une maquette.");
  }

  /* ═════════════════════════════════ les chiffres ═════ */
  {
    const s = page(pres, {
      rubrique: "La livraison",
      titre: "Ce qui a été livré",
      chapeau: "Treize jours de travail, du 30 août au 11 septembre 2026. Le site est en ligne et se visite.",
      n: p(),
    });
    const l = 2.62, e = 0.38;
    const items = [
      ["174", "pages publiées,\ndont 86 en anglais"],
      ["2", "langues, chacune\navec sa propre racine"],
      ["60", "fiches robes, cinq maisons,\nsix coupes, six morphologies"],
      ["102", "kilo-octets de code\nau premier chargement"],
    ];
    items.forEach(([v, leg], i) => {
      chiffre(s, { x: T.MARGE + i * (l + e), y: 3.32, l, valeur: v, legende: leg,
                   couleur: i === 3 ? T.ACCENT : T.NOIR });
    });
    pied(s, "Un site statique : aucune base de données à maintenir, aucun serveur à surveiller, rien qui puisse tomber un samedi.");
    s.addNotes("Les chiffres qui comptent. 102 ko : un site de mode classique en charge dix fois plus.");
  }

  /* ═════════════════════════════════ 01 · le premier écran ═════ */
  intercalaire(pres, {
    numero: "01", titre: "Le premier écran",
    ligne: "Ce que voit une mariée dans les trois secondes qui suivent son arrivée.",
  });

  {
    const s = page(pres, { rubrique: "Le premier écran", titre: "L'accueil", n: p() });
    planche(s, "web-accueil", { x: T.MARGE, y: 2.3, l: 7.5 });
    tirets(s, { x: 9.1, y: 2.3, l: 3.38, titre: null, pas: 0.66,
      items: ["Un film plein cadre, sans son, qui se met en pause d'un bouton",
              "Une question plutôt qu'un slogan : « Vous vous mariez bientôt ? »",
              "Deux actions seulement — l'essayage, et le conseil",
              "Le bandeau des engagements défile en continu sous le film"] });
    legende(s, "madamoon.fr  ·  accueil  ·  1440 × 900", { x: T.MARGE, y: 7.06, l: 7.5 });
    s.addNotes("Le hero. Le film est encodé pour démarrer vite : l'index est placé en tête de fichier, la première image paraît en moins d'une seconde sur un réseau mobile.");
  }

  {
    const s = page(pres, {
      rubrique: "Le premier écran", titre: "L'ouverture",
      chapeau: "Trois secondes de noir avant le site, une seule fois par visite. Elle s'efface d'elle-même et ne revient pas.",
      n: p(),
    });
    cartes(s, [
      { label: "Temps 1", titre: "L'élégance.", texte: "Un mot paraît sur fond noir, en lettres blanches. Rien d'autre à l'écran." },
      { label: "Temps 2", titre: "La grâce.", texte: "Le second mot remplace le premier. Le rythme est celui d'une respiration." },
      { label: "Temps 3", titre: "Le sigle", texte: "MADAMOON s'inscrit, tenu une seconde, puis le noir s'ouvre sur le film." },
      { label: "Toujours", titre: "Escamotable", texte: "Une fois vue, elle ne rejoue pas. Et elle ne joue jamais pour qui a demandé moins d'animations à son appareil." },
    ], { y: 3.2, h: 2.8 });
    pied(s, "Elle ne coûte rien au référencement : le texte de la page est lu par les moteurs pendant que le noir est encore à l'écran.");
    s.addNotes("L'ouverture cinématique. Souligner : une fois par session, jamais deux. Et le respect de « prefers-reduced-motion », qui est une obligation d'accessibilité.");
  }

  {
    const s = page(pres, {
      rubrique: "Le premier écran", titre: "Ce que l'accueil raconte ensuite",
      chapeau: "Trois sections, trois façons d'entrer dans le catalogue. Chacune mène ailleurs.",
      n: p(),
    });
    const l = 3.58, e = 0.44;
    [["sec-silhouette", "La silhouette", "Six morphologies, en rail qui se pousse"],
     ["sec-coupes", "Les coupes", "Six lignes, une photographie par nom survolé"],
     ["sec-createurs", "Les maisons", "Cinq créateurs, et d'où ils viennent"]].forEach(([f, t, d], i) => {
      const x = T.MARGE + i * (l + e);
      planche(s, f, { x, y: 3.2, l, marge: 0.1 });
      texte(s, t, { x, y: 5.62, w: l, h: 0.34, fontFace: T.TITRE, fontSize: 15, color: T.NOIR,
                    charSpacing: spc(15), valign: "middle", isTextBox: true, margin: 0 });
      texte(s, d, { x, y: 5.96, w: l, h: 0.5, fontFace: T.TITRE, fontSize: 11, color: T.GRIS,
                    charSpacing: spc(11), lineSpacingMultiple: 1.32, valign: "top", isTextBox: true, margin: 0 });
    });
    s.addNotes("Les trois portes d'entrée annoncées dès l'accueil.");
  }

  {
    const s = page(pres, {
      rubrique: "Le premier écran", titre: "Les avis, et la porte du showroom",
      chapeau: "Les avis sont ceux de Google, repris tels quels. Rien n'a été écrit, rien n'a été choisi.",
      n: p(),
    });
    planche(s, "sec-avis", { x: T.MARGE, y: 3.2, l: 5.6 });
    planche(s, "sec-showroom", { x: T.MARGE + 5.6 + 0.43, y: 3.2, l: 5.6 });
    legende(s, "la note en vedette  ·  5,0 sur 200 avis", { x: T.MARGE, y: 6.82, l: 5.6 });
    legende(s, "le showroom, en bas de page", { x: T.MARGE + 5.6 + 0.43, y: 6.82, l: 5.6 });
    s.addNotes("La note en vedette : la version retenue après votre retour sur la première proposition.");
  }

  /* ═════════════════════════════════ 02 · le catalogue ═════ */
  intercalaire(pres, {
    numero: "02", titre: "Le catalogue",
    ligne: "Soixante fiches, cinq maisons, et un menu qui range les robes de deux façons.",
  });

  {
    const s = page(pres, { rubrique: "Le catalogue", titre: "Toutes les robes", n: p() });
    planche(s, "web-robes", { x: T.MARGE, y: 2.3, l: 7.5 });
    tirets(s, { x: 9.1, y: 2.3, l: 3.38, titre: null, pas: 0.66,
      items: ["Le catalogue entier sur une page, rangé par coupe",
              "Un cœur posé sur chaque robe, sans quitter la page",
              "Les images se chargent à mesure que l'on descend",
              "Aucun nombre affiché : la maison ne veut pas compter ses robes en vitrine"] });
    legende(s, "madamoon.fr/robes", { x: T.MARGE, y: 7.06, l: 7.5 });
    s.addNotes("La page catalogue. Le choix de ne jamais afficher le nombre de robes est tenu partout, y compris dans les descriptions que Google affiche.");
  }

  {
    const s = page(pres, {
      rubrique: "Le catalogue", titre: "La fiche d'une robe",
      chapeau: "Un premier écran photographique, puis tout ce qu'il faut savoir avant de venir l'essayer.",
      n: p(),
    });
    planche(s, "web-fiche", { x: T.MARGE, y: 3.14, l: 5.6 });
    planche(s, "sec-fiche-detail", { x: T.MARGE + 5.6 + 0.43, y: 3.14, l: 5.6 });
    legende(s, "le nom posé dans l'image", { x: T.MARGE, y: 6.76, l: 5.6 });
    legende(s, "la coupe, la maison, la confection, le prix de départ", { x: T.MARGE + 5.6 + 0.43, y: 6.76, l: 5.6 });
    s.addNotes("Soixante fiches bâties sur le même gabarit, alimentées par une seule table de données : corriger une ligne corrige partout.");
  }

  {
    const s = page(pres, {
      rubrique: "Le catalogue", titre: "Le menu, deux classements",
      chapeau: "Une cliente cherche une maison ; une autre cherche une coupe. Le menu répond aux deux sans changer de page.",
      n: p(),
    });
    planche(s, "web-menu", { x: T.MARGE, y: 3.14, l: 6.3 });
    tirets(s, { x: 7.85, y: 3.14, l: 4.63, titre: null, pas: 0.66,
      items: ["Par créateur : les cinq maisons et leurs modèles",
              "Par coupe : sirène, princesse, fluide, trapèze, minimaliste, deux-en-un",
              "Les robes sans créateur renseigné forment un groupe à part, jamais rangées sous un nom qui n'est pas le leur"] });
    s.addNotes("Le méga-menu. Sur téléphone il devient trois onglets, montrés plus loin.");
  }

  return n;
};
