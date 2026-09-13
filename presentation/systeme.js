/*
 * Le système ANVSLAB, relevé sur ANVSLAB-CDC.pptx.
 *
 * Rien n'est inventé ici : la marge, les tailles, l'interlettrage et
 * les couleurs sont ceux du cahier des charges. Les mesures viennent
 * du XML des diapositives, pas d'une estimation à l'œil.
 */

const T = {
  /* La page */
  L: 13.333,
  H: 7.5,
  MARGE: 0.85,
  COLONNE: 11.633,

  /* Les couleurs */
  NOIR: "000000",
  BLANC: "FFFFFF",
  ACCENT: "FF2D00",
  GRIS: "696969",
  GRIS_CLAIR: "9A9A9A",
  FILET: "E0E0E0",
  FILET_NOIR: "2A2A2A",
  CARTE: "F4F4F4",

  /* Les polices */
  TITRE: "Helvetica Neue",
  MONO: "Menlo",
};

/* L'interlettrage suit la taille : serré dans les grands corps,
 * ouvert dans les petits. La règle est tirée du document. */
const spc = (pt) => (pt >= 16 ? -0.035 * pt : pt <= 9 ? 1.02 : -0.03 * pt);

const texte = (slide, contenu, o) =>
  slide.addText(contenu, { isTextBox: true, margin: 0, ...o });

/* ————————————————————————————————— les briques ————— */

/** Le fond plein d'une diapositive. */
function fond(slide, couleur) {
  slide.background = { color: couleur };
}

/** Le filet d'un pixel, celui qui sépare sans encadrer. */
function filet(slide, y, couleur, x = T.MARGE, l = T.COLONNE) {
  slide.addShape("rect", { x, y, w: l, h: 0.012, fill: { color: couleur }, line: { type: "none" } });
}

/** Le sur-titre en capitales, dans la police à chasse fixe. */
function surtitre(slide, mot, couleur = T.GRIS_CLAIR, y = 0.62) {
  texte(slide, mot.toUpperCase(), {
    x: T.MARGE, y, w: 7.5, h: 0.24,
    fontFace: T.MONO, fontSize: 8.5, color: couleur, charSpacing: spc(8.5), valign: "middle",
  });
}

/** Le numéro de page, en bas à droite. */
function numero(slide, n, couleur = T.GRIS_CLAIR) {
  texte(slide, String(n).padStart(2, "0"), {
    x: 11.28, y: 7.06, w: 1.2, h: 0.24, align: "right",
    fontFace: T.MONO, fontSize: 8.5, color: couleur, charSpacing: spc(8.5), valign: "middle",
  });
}

/** La phrase de bas de page, au-dessus du filet de pied. */
function pied(slide, phrase) {
  filet(slide, 6.16, T.FILET);
  texte(slide, phrase, {
    x: T.MARGE, y: 6.34, w: T.COLONNE, h: 0.34,
    fontFace: T.TITRE, fontSize: 11.5, color: T.GRIS, charSpacing: spc(11.5), valign: "middle",
  });
}

/* ————————————————————————————————— les gabarits ————— */

/** La page de contenu : fond blanc, sur-titre, filet, titre, chapeau. */
function page(pres, { rubrique, titre, chapeau, n, largeurTitre = 10.9 }) {
  const s = pres.addSlide();
  fond(s, T.BLANC);
  surtitre(s, rubrique);
  filet(s, 0.96, T.FILET);
  if (titre) {
    texte(s, titre, {
      x: T.MARGE, y: 1.40, w: largeurTitre, h: 0.68,
      fontFace: T.TITRE, fontSize: 32, color: T.NOIR, charSpacing: spc(32),
      lineSpacingMultiple: 1.08, valign: "top",
    });
  }
  if (chapeau) {
    texte(s, chapeau, {
      x: T.MARGE, y: 2.36, w: 9.4, h: 0.62,
      fontFace: T.TITRE, fontSize: 13.5, color: T.GRIS, charSpacing: spc(13.5),
      lineSpacingMultiple: 1.35, valign: "top",
    });
  }
  if (n) numero(s, n);
  return s;
}

/** L'intercalaire : fond noir, grand numéro rouge, titre blanc. */
function intercalaire(pres, { numero: num, titre, ligne }) {
  const s = pres.addSlide();
  fond(s, T.NOIR);
  texte(s, num, {
    x: T.MARGE, y: 1.84, w: 3.4, h: 1.74,
    fontFace: T.TITRE, fontSize: 104, color: T.ACCENT, charSpacing: spc(104), valign: "middle",
  });
  texte(s, titre, {
    x: T.MARGE, y: 3.58, w: 10.5, h: 1.2,
    fontFace: T.TITRE, fontSize: 54, color: T.BLANC, charSpacing: spc(54), valign: "middle",
  });
  s.addShape("rect", {
    x: T.MARGE, y: 4.94, w: 2.2, h: 0.032, fill: { color: T.ACCENT }, line: { type: "none" },
  });
  texte(s, ligne, {
    x: T.MARGE, y: 5.18, w: 8.6, h: 0.9,
    fontFace: T.TITRE, fontSize: 14.5, color: T.GRIS_CLAIR, charSpacing: spc(14.5),
    lineSpacingMultiple: 1.4, valign: "top",
  });
  return s;
}

/**
 * Les cartes : de deux à quatre colonnes, fond gris très clair.
 * La largeur se déduit du nombre, jamais l'inverse.
 */
function cartes(slide, liste, { y = 3.0, h = 3.14, ecart = 0.22 } = {}) {
  const n = liste.length;
  const l = (T.COLONNE - ecart * (n - 1)) / n;
  const dedans = 0.3;
  liste.forEach((c, i) => {
    const x = T.MARGE + i * (l + ecart);
    slide.addShape("rect", { x, y, w: l, h, fill: { color: T.CARTE }, line: { type: "none" } });
    if (c.label) {
      texte(slide, c.label.toUpperCase(), {
        x: x + dedans, y: y + dedans, w: l - 2 * dedans, h: 0.24,
        fontFace: T.MONO, fontSize: 8.5, color: T.GRIS, charSpacing: spc(8.5), valign: "middle",
      });
    }
    texte(slide, c.titre, {
      x: x + dedans, y: y + dedans + (c.label ? 0.38 : 0), w: l - 2 * dedans, h: 0.72,
      fontFace: T.TITRE, fontSize: 17, color: T.NOIR, charSpacing: spc(17),
      lineSpacingMultiple: 1.12, valign: "top",
    });
    texte(slide, c.texte, {
      x: x + dedans, y: y + dedans + (c.label ? 1.22 : 0.84), w: l - 2 * dedans, h: h - dedans * 2 - (c.label ? 1.22 : 0.84),
      fontFace: T.TITRE, fontSize: 11, color: T.GRIS, charSpacing: spc(11),
      lineSpacingMultiple: 1.4, valign: "top",
    });
  });
}

/** Une liste à tirets, comme les colonnes du cahier des charges. */
function tirets(slide, { x, y, l, titre, items, pas = 0.52 }) {
  if (titre) {
    slide.addShape("rect", { x, y, w: l, h: 0.02, fill: { color: T.NOIR }, line: { type: "none" } });
    texte(slide, titre, {
      x, y: y + 0.16, w: l, h: 0.4,
      fontFace: T.TITRE, fontSize: 15, color: T.NOIR, charSpacing: spc(15), valign: "middle",
    });
  }
  const depart = y + (titre ? 0.62 : 0);
  items.forEach((it, i) => {
    const yy = depart + i * pas;
    texte(slide, "—", {
      x, y: yy, w: 0.22, h: 0.26,
      fontFace: T.TITRE, fontSize: 11, color: T.ACCENT, valign: "top",
    });
    texte(slide, it, {
      x: x + 0.28, y: yy - 0.01, w: l - 0.28, h: pas,
      fontFace: T.TITRE, fontSize: 11, color: T.GRIS, charSpacing: spc(11),
      lineSpacingMultiple: 1.32, valign: "top",
    });
  });
}

/** Un grand chiffre et sa légende. */
function chiffre(slide, { x, y, l, valeur, legende, couleur = T.NOIR }) {
  texte(slide, valeur, {
    x, y, w: l, h: 1.1,
    fontFace: T.TITRE, fontSize: 52, color: couleur, charSpacing: spc(52), valign: "middle",
  });
  slide.addShape("rect", { x, y: y + 1.12, w: 0.9, h: 0.02, fill: { color: T.ACCENT }, line: { type: "none" } });
  texte(slide, legende, {
    x, y: y + 1.26, w: l, h: 0.7,
    fontFace: T.TITRE, fontSize: 11.5, color: T.GRIS, charSpacing: spc(11.5),
    lineSpacingMultiple: 1.35, valign: "top",
  });
}

/* ————————————————————————————————— les images ————— */

const RATIO = { ecran: 1.6, iphone: 1238 / 2600, large: 960 / 540 };

/** Une capture posée sur un carton gris : le blanc du site ne se
 *  confond plus avec le blanc de la diapositive. */
function planche(slide, fichier, { x, y, l, sorte = "ecran", carton = true, marge = 0.14 }) {
  const h = l / RATIO[sorte];
  if (carton) {
    slide.addShape("rect", {
      x: x - marge, y: y - marge, w: l + 2 * marge, h: h + 2 * marge,
      fill: { color: T.CARTE }, line: { type: "none" },
    });
  }
  slide.addImage({ path: `images/${fichier}.jpg`, x, y, w: l, h });
  return h;
}

/** Un téléphone, sans carton : son cadre lui suffit. */
function telephone(slide, fichier, { x, y, h }) {
  const l = h * RATIO.iphone;
  slide.addImage({ path: `images/${fichier}.jpg`, x, y, w: l, h });
  return l;
}

/** La légende sous une image. */
function legende(slide, mot, { x, y, l }) {
  texte(slide, mot, {
    x, y, w: l, h: 0.26,
    fontFace: T.MONO, fontSize: 8.5, color: T.GRIS_CLAIR, charSpacing: spc(8.5), valign: "middle",
  });
}

module.exports = {
  T, spc, texte, fond, filet, surtitre, numero, pied,
  page, intercalaire, cartes, tirets, chiffre, planche, telephone, legende, RATIO,
};
