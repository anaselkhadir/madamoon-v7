/*
 * MADAMOON — proposition pour la phase 2.
 *
 * Même système ANVSLAB que les deux présentations précédentes. Les
 * positions et volumes viennent du relevé du 13 septembre 2026 ; les
 * projections appliquent le taux de clic implicite de ce même relevé.
 */
const pptxgen = require("pptxgenjs");
const S = require("./systeme.js");
const { T, texte, fond, filet, surtitre, numero, page, intercalaire, cartes, tirets, chiffre, spc } = S;

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.author = "ANVSLAB";
pres.company = "ANVSLAB";
pres.title = "MADAMOON — proposition phase 2";
pres.subject = "Référencement, accompagnement et évolutions du site, 12 mois";

let n = 0;
const p = () => ++n;
const NB = " ", FINE = " ";
const g = (t) => `«${FINE}${t}${FINE}»`;
const euros = (v) => `${String(v).replace(/\B(?=(\d{3})+(?!\d))/g, FINE)}${NB}€`;

/** Tableau sobre ; une cellule peut porter sa couleur : { t, c, gras }. */
function tableau(s, lignes, { x, y, w, colW, taille = 10.5, hauteur = 0.36, aligne = [] }) {
  const entete = lignes[0].map((t, j) => ({
    text: t.toUpperCase(),
    options: { fontFace: T.MONO, fontSize: 8, color: T.GRIS_CLAIR, charSpacing: spc(8), align: aligne[j] || "left",
               border: [{ type: "none" }, { type: "none" }, { pt: 1, color: T.NOIR }, { type: "none" }] },
  }));
  const corps = lignes.slice(1).map((r) => r.map((cel, j) => {
    const o = typeof cel === "object" ? cel : { t: cel };
    return {
      text: o.t,
      options: { fontFace: T.TITRE, fontSize: o.taille || taille, charSpacing: spc(o.taille || taille), bold: !!o.gras,
                 color: o.c || (j === 0 ? T.NOIR : T.GRIS), align: aligne[j] || "left",
                 border: [{ type: "none" }, { type: "none" }, { pt: 0.75, color: o.filet || T.FILET }, { type: "none" }] },
    };
  }));
  s.addTable([entete, ...corps], { x, y, w, colW, rowH: hauteur, margin: [0.04, 0.08, 0.04, 0.02], valign: "middle" });
}

/** Un petit chiffre et sa légende, empilables. */
function stat(s, { x, y, l, valeur, legende, couleur = T.NOIR }) {
  texte(s, valeur, { x, y, w: l, h: 0.66, fontFace: T.TITRE, fontSize: 38, color: couleur, charSpacing: spc(38), valign: "middle" });
  texte(s, legende, { x, y: y + 0.7, w: l, h: 0.56, fontFace: T.TITRE, fontSize: 11, color: T.GRIS, charSpacing: spc(11), lineSpacingMultiple: 1.3, valign: "top" });
}

function pieds(s, clair = false) {
  const c = clair ? T.GRIS : T.GRIS;
  filet(s, 6.46, clair ? T.FILET_NOIR : T.FILET);
  texte(s, "PARIS 10ᵉ  ·  FRANCE", { x: T.MARGE, y: 6.66, w: 5.2, h: 0.24, fontFace: T.MONO, fontSize: 8.5, color: c, charSpacing: spc(8.5), valign: "middle" });
  texte(s, "ANVSLAB.COM", { x: 7.28, y: 6.66, w: 5.2, h: 0.24, align: "right", fontFace: T.MONO, fontSize: 8.5, color: T.ACCENT, charSpacing: spc(8.5), valign: "middle" });
}

/* ═════════════════════════════════════════════ couverture ═════ */
{
  const s = pres.addSlide();
  fond(s, T.NOIR);
  surtitre(s, "Proposition  ·  phase 2  ·  septembre 2026", T.GRIS);
  filet(s, 0.96, T.FILET_NOIR);
  texte(s, "MADAMOON", { x: T.MARGE, y: 1.14, w: T.COLONNE, h: 1.64, fontFace: T.TITRE, fontSize: 96, color: T.BLANC, charSpacing: spc(96), valign: "middle" });
  s.addShape("rect", { x: T.MARGE, y: 2.9, w: 1.15, h: 0.04, fill: { color: T.ACCENT }, line: { type: "none" } });
  texte(s, "Proposition pour la phase 2", { x: T.MARGE, y: 3.14, w: 9, h: 0.7, fontFace: T.TITRE, fontSize: 31, color: T.BLANC, charSpacing: spc(31), valign: "middle" });
  texte(s, "Le référencement sur Google et Pinterest, et douze mois pour faire du site un outil qui remplit l'agenda de la boutique.", {
    x: T.MARGE, y: 3.9, w: 7.6, h: 0.62, fontFace: T.TITRE, fontSize: 13.5, color: T.GRIS_CLAIR, charSpacing: spc(13.5), lineSpacingMultiple: 1.4, valign: "top",
  });
  /* La première étape : posée dès la couverture, comme demandé. */
  const y = 4.84;
  s.addShape("rect", { x: T.MARGE, y, w: T.COLONNE, h: 1.46, fill: { color: "141414" }, line: { type: "none" } });
  s.addShape("rect", { x: T.MARGE, y, w: 0.06, h: 1.46, fill: { color: T.ACCENT }, line: { type: "none" } });
  texte(s, "LA PREMIÈRE ÉTAPE", { x: T.MARGE + 0.4, y: y + 0.24, w: 4, h: 0.24, fontFace: T.MONO, fontSize: 8.5, color: T.ACCENT, charSpacing: spc(8.5), valign: "middle" });
  texte(s, `Tester le site jusqu'au 30 septembre 2026, puis décider ensemble du lancement de la phase 2.`, {
    x: T.MARGE + 0.4, y: y + 0.56, w: 10.6, h: 0.7, fontFace: T.TITRE, fontSize: 20, color: T.BLANC, charSpacing: spc(20), valign: "middle",
  });
  pieds(s, true);
  s.addNotes("La phase 2 ne commence qu'après la période de test, sur décision de la boutique.");
}

/* ═════════════════════════════════════════════ 01 — Google ═════ */
intercalaire(pres, { numero: "01", titre: "Le référencement", ligne: "Google et Pinterest : où MADAMOON apparaît aujourd'hui, et où nous voulons l'amener." });

{
  const s = page(pres, { rubrique: "Le point de départ", titre: "Où MADAMOON apparaît aujourd'hui sur Google", n: p() });
  const R = T.ACCENT, V = "1E7A3C";
  tableau(s, [
    ["Intention de recherche", "Type d'intention", "Recherches / mois", "Position", "Page", "Visites estimées"],
    ["robe de mariée Paris", "Transactionnelle, locale", "1 000 – 2 000", { t: "55", c: R, gras: true }, { t: "6", c: R }, { t: "0", c: R }],
    ["robe de mariée à Paris", "Locale", "700 – 1 500", { t: "170+", c: R, gras: true }, { t: "20+", c: R }, { t: "0", c: R }],
    ["boutique robe de mariée Paris", "Locale, transactionnelle", "500 – 1 000", { t: "10", c: R, gras: true }, { t: "2", c: R }, "19"],
    ["magasin robe de mariée Paris", "Transactionnelle", "300 – 700", { t: "20+", c: R, gras: true }, { t: "3+", c: R }, { t: "0", c: R }],
    ["essayage robe de mariée Paris", "Très transactionnelle", "100 – 300", { t: "20+", c: R, gras: true }, { t: "3+", c: R }, { t: "0", c: R }],
    ["robe de mariée sur mesure Paris", "Transactionnelle", "200 – 500", { t: "2", c: V, gras: true }, { t: "1", c: V }, "41"],
    ["robe de mariée Paris 10", "Hyper-locale", "50 – 150", { t: "1", c: V, gras: true }, { t: "1", c: V }, "23"],
    ["robe de mariée 75010", "Hyper-locale", "20 – 80", { t: "1", c: V, gras: true }, { t: "1", c: V }, "12"],
  ], { x: T.MARGE, y: 2.25, w: T.COLONNE, colW: [3.45, 2.45, 1.85, 1.2, 0.95, 1.733], taille: 11, hauteur: 0.42,
       aligne: ["left", "left", "right", "right", "right", "right"] });
  texte(s, `Relevé du 13 septembre 2026. Visites estimées par mois, selon la position actuelle. En rouge${NB}: hors de la première page.`, {
    x: T.MARGE, y: 6.2, w: T.COLONNE, h: 0.3, fontFace: T.TITRE, fontSize: 10, color: T.GRIS_CLAIR, charSpacing: spc(10), valign: "middle",
  });
}

{
  const s = page(pres, {
    rubrique: "Le point de départ",
    titre: "Une demande forte, captée par d'autres",
    chapeau: "MADAMOON tient les recherches les plus locales. Les plus recherchées — celles où une future mariée commence — lui échappent.",
    n: p(),
  });
  const x = T.MARGE, l = 3.7;
  stat(s, { x, y: 3.2, l, valeur: "≈ 4 550", legende: "recherches par mois sur ces 8 intentions" });
  stat(s, { x, y: 4.5, l, valeur: "≈ 95", legende: "visites par mois captées aujourd'hui, soit 2 %", couleur: T.ACCENT });
  stat(s, { x, y: 5.8, l, valeur: "5 sur 8", legende: "intentions hors de la première page, dont les deux plus recherchées" });
  s.addChart(pres.charts.BAR, [{
    name: "Visites par mois",
    labels: ["Aujourd'hui", "Top 3 — estimation basse", "Top 3 — estimation haute"],
    values: [95, 364, 1024],
  }], {
    x: 5.2, y: 3.05, w: 7.3, h: 3.55, barDir: "col", barGapWidthPct: 70,
    chartColors: [T.ACCENT], showValue: true, dataLabelPosition: "outEnd", dataLabelColor: T.NOIR, dataLabelFontSize: 12, dataLabelFontFace: T.TITRE,
    dataLabelFormatCode: "#,##0",
    catAxisLabelColor: T.GRIS, catAxisLabelFontSize: 10, catAxisLabelFontFace: T.TITRE, catAxisLineShow: false,
    valAxisHidden: true, valGridLine: { style: "none" }, catGridLine: { style: "none" },
    showLegend: false, showTitle: true, title: "Visites estimées par mois sur ces 8 intentions", titleFontSize: 11, titleColor: T.GRIS, titleFontFace: T.TITRE,
  });
  s.addNotes("Estimation : taux de clic implicite du relevé — environ 22,5 % en première position, 12 % en deuxième — et environ 8 % en troisième.");
}

{
  const s = page(pres, { rubrique: "Les objectifs", titre: "Deux objectifs, deux dates", n: p() });
  cartes(s, [
    { label: "D'ici le 15 novembre 2026", titre: "La première page",
      texte: `Les 5 intentions encore hors de la première page y entrent${NB}: robe de mariée Paris, robe de mariée à Paris, boutique, magasin et essayage de robe de mariée à Paris.` },
    { label: "Du 15 novembre au 31 décembre 2026", titre: "Les trois premiers résultats",
      texte: `Les 8 intentions dans le top 3 de Google, y compris les 3 où MADAMOON est déjà en première page — pour passer d'environ 95 à plusieurs centaines de visites par mois.` },
  ], { y: 2.2, h: 2.55 });
  tirets(s, { x: T.MARGE, y: 4.98, l: T.COLONNE, pas: 0.4, items: [
    "Le nouveau site mis en ligne sur madamoon.fr dès la décision prise, avec des redirections qui conservent le référencement acquis",
    "Une fiche Google Business Profile complète, et des avis clients qui continuent d'arriver",
    "Les positions relevées et partagées à chaque étape, dans les flashs statistiques",
  ] });
  texte(s, `Google ne permet à personne de garantir un classement${NB}: l'engagement porte sur les moyens mis en œuvre et sur la transparence des résultats, mesurés chaque mois.`, {
    x: T.MARGE, y: 6.34, w: T.COLONNE, h: 0.3, fontFace: T.TITRE, fontSize: 9.5, color: T.GRIS_CLAIR, charSpacing: spc(9.5), valign: "middle",
  });
}

{
  const s = page(pres, {
    rubrique: "Les objectifs",
    titre: "La méthode",
    chapeau: "Quatre chantiers menés ensemble. Aucun ne suffit seul : c'est leur combinaison qui fait monter une boutique locale.",
    n: p(),
  });
  cartes(s, [
    { label: "Technique", titre: "Un site que Google lit sans effort",
      texte: "Mise en ligne sur madamoon.fr et migration, vitesse, indexation des 174 pages, données structurées, plan du site." },
    { label: "Contenu", titre: "Une page par intention",
      texte: "Essayage, sur mesure, boutique, Paris 10ᵉ : chaque recherche trouve une page qui lui répond, écrite pour la cliente." },
    { label: "Local", titre: "La boutique sur la carte",
      texte: "Fiche Google Business Profile, photos, horaires, avis, et présence dans les annuaires du mariage." },
    { label: "Autorité", titre: "Des liens qui comptent",
      texte: "Mentions dans les médias et blogs mariage, partenaires : photographes, lieux de réception, créateurs." },
  ], { y: 3.2, h: 2.75 });
}

{
  const s = page(pres, {
    rubrique: "Pinterest",
    titre: "Pinterest, l'autre moteur de recherche des mariées",
    chapeau: `Une future mariée ne cherche pas seulement sur Google${NB}: elle compose sa robe en images, bien avant de réserver un essayage. Revendiquer le compte, c'est y faire entrer MADAMOON sous son nom.`,
    n: p(),
  });
  const l = 3.6, e = (T.COLONNE - 3 * l) / 2;
  stat(s, { x: T.MARGE, y: 3.15, l, valeur: "640 M", legende: "utilisateurs chaque mois dans le monde, dont 157 millions en Europe" });
  stat(s, { x: T.MARGE + l + e, y: 3.15, l, valeur: "≈ 27 %", legende: "de la population française atteinte par Pinterest" });
  stat(s, { x: T.MARGE + 2 * (l + e), y: 3.15, l, valeur: "160", couleur: T.ACCENT, legende: "photos des 60 robes du catalogue, prêtes à devenir des épingles" });
  tirets(s, { x: T.MARGE, y: 4.72, l: T.COLONNE, titre: "Ce que la revendication débloque", pas: 0.34, items: [
    "Les épingles enrichies : nom, description et lien de chaque robe, repris du site — les balises sont déjà en place sur les 60 fiches",
    "Les statistiques du site sur Pinterest : impressions, enregistrements, clics vers madamoon.fr",
    "Le nom de MADAMOON sur toutes les épingles de ses robes, y compris celles enregistrées par les mariées elles-mêmes",
  ] });
  texte(s, `Sources${NB}: Pinterest, résultats du 2ᵉ trimestre 2026${FINE}; DataReportal, Digital 2026 France.`, {
    x: T.MARGE, y: 6.78, w: 9, h: 0.24, fontFace: T.TITRE, fontSize: 9.5, color: T.GRIS_CLAIR, charSpacing: spc(9.5), valign: "middle",
  });
}

{
  const s = page(pres, { rubrique: "Pinterest", titre: "Le trafic que Pinterest peut apporter", n: p() });
  tableau(s, [
    ["Scénario", "Impressions / mois", "Taux de clic", "Visites / mois"],
    ["Prudent", "20 000", "0,48 %", { t: "≈ 95", c: T.NOIR, gras: true }],
    ["Intermédiaire", "60 000", "0,48 %", { t: "≈ 290", c: T.NOIR, gras: true }],
    ["Ambitieux", "150 000", "0,48 %", { t: "≈ 720", c: T.ACCENT, gras: true }],
  ], { x: T.MARGE, y: 2.25, w: 6.2, colW: [1.8, 1.7, 1.2, 1.5], taille: 12, hauteur: 0.5, aligne: ["left", "right", "right", "right"] });
  tirets(s, { x: T.MARGE, y: 4.45, l: 6.2, pas: 0.56, items: [
    "160 épingles : les 60 robes, avec toutes leurs photos, rangées en tableaux par coupe, morphologie et créateur",
    "Une épingle classique obtient en moyenne 4,8 clics vers le site pour 1 000 impressions",
    "Même le scénario prudent égale les visites que Google apporte aujourd'hui sur les 8 intentions",
  ] });
  s.addChart(pres.charts.BAR, [{
    name: "Visites par mois",
    labels: ["Google aujourd'hui", "Pinterest prudent", "Pinterest intermédiaire", "Pinterest ambitieux"],
    values: [95, 96, 288, 720],
  }], {
    x: 7.45, y: 2.2, w: 5.05, h: 3.95, barDir: "col", barGapWidthPct: 60,
    chartColors: [T.ACCENT], showValue: true, dataLabelPosition: "outEnd", dataLabelColor: T.NOIR, dataLabelFontSize: 11, dataLabelFontFace: T.TITRE,
    catAxisLabelColor: T.GRIS, catAxisLabelFontSize: 9, catAxisLabelFontFace: T.TITRE, catAxisLineShow: false,
    valAxisHidden: true, valGridLine: { style: "none" }, catGridLine: { style: "none" },
    showLegend: false, showTitle: true, title: "Visites estimées par mois", titleFontSize: 11, titleColor: T.GRIS, titleFontFace: T.TITRE,
  });
  texte(s, `Scénarios d'impressions à confirmer par les statistiques du compte, dès sa revendication. Taux de clic${NB}: WebFX, benchmarks Pinterest.`, {
    x: T.MARGE, y: 6.78, w: 10, h: 0.24, fontFace: T.TITRE, fontSize: 9.5, color: T.GRIS_CLAIR, charSpacing: spc(9.5), valign: "middle",
  });
}

/* ═════════════════════════════════════════════ 02 — les services ═════ */
intercalaire(pres, { numero: "02", titre: "Au-delà de Google", ligne: "Douze mois pour entretenir le site, l'améliorer, et en faire un outil de rendez-vous." });

{
  const s = page(pres, {
    rubrique: "Le site",
    titre: "Un site entretenu, et qui s'améliore",
    chapeau: "Le site ne se livre pas une fois pour toutes : il s'ajuste à ce que font vraiment les clientes.",
    n: p(),
  });
  cartes(s, [
    { label: "12 mois", titre: "Support technique et gestion du site",
      texte: "Mises à jour, sauvegardes, corrections, nouvelles robes, photos et textes. Une demande, une réponse, pendant douze mois." },
    { label: "Une semaine par section", titre: "Amélioration continue du design",
      texte: "Accueil, catalogue, fiche robe, coupes, morphologies, créateurs, showroom et maison, rendez-vous : huit semaines, une section à la fois." },
    { label: "Après l'étude du parcours client", titre: "Un mode éditorial repensé",
      texte: "Le parcours de la cliente type — sa recherche, ses doutes, ses visites — est étudié, puis les textes et l'enchaînement des pages le suivent." },
  ], { y: 3.2, h: 2.75 });
}

{
  const s = page(pres, {
    rubrique: "Les rendez-vous",
    titre: "Plus de rendez-vous, et des clientes qui reviennent",
    chapeau: "Le site ne s'arrête plus à la prise de contact : il accompagne la future mariée jusqu'à l'essayage, et après.",
    n: p(),
  });
  cartes(s, [
    { label: "Nouveau", titre: "Un espace client MADAMOON",
      texte: "Coups de cœur conservés, rendez-vous à venir, préparation de l'essayage : un compte à elle." },
    { label: "Au-delà de Calendly", titre: "Des rendez-vous sur mesure",
      texte: "Conçue pour la boutique et à ses couleurs : créneaux, rappels, et les robes à préparer avant la visite." },
    { label: "Version 2.0", titre: "Élise, plus conversationnelle",
      texte: "Une conseillère qui dialogue vraiment, connaît le catalogue, et conduit jusqu'au rendez-vous." },
    { label: "Nouveau", titre: "L'e-mail marketing",
      texte: "Confirmations, rappels, suivi après l'essayage, nouvelles collections : les messages qui font revenir." },
  ], { y: 3.2, h: 2.75 });
}

{
  const s = page(pres, {
    rubrique: "Mesure et protection",
    titre: "Mesurer et protéger",
    chapeau: "Des chiffres lisibles à chaque étape, et un site protégé avant même son hébergement.",
    n: p(),
  });
  cartes(s, [
    { label: "À chaque étape", titre: "Les flashs statistiques",
      texte: "L'état du trafic organique à un moment donné : positions, visites, évolution depuis le flash précédent." },
    { label: "Suivi continu", titre: "Les indicateurs clés",
      texte: "Taux de conversion visiteur → rendez-vous, part du trafic organique, part du trafic publicitaire." },
    { label: "Avant l'hébergement", titre: "La cybersécurité",
      texte: "Détection des robots malveillants par leurs gestes de navigation. Google, ChatGPT et les autres moteurs d'IA restent bienvenus." },
  ], { y: 3.2, h: 2.75 });
}

{
  const s = page(pres, {
    rubrique: "Mesure et protection",
    titre: "Voir ce que font vraiment les visiteuses",
    chapeau: `Deux outils installés sur le site, pour cesser de deviner${NB}: l'un rend la publicité moins chère, l'autre montre le parcours réel de chaque visite.`,
    n: p(),
  });
  cartes(s, [
    { label: "Facebook et Instagram", titre: "Meta Pixel",
      texte: "Meta ne compte plus chaque visite comme une réussite : il apprend les vraies actions — fiche consultée, rendez-vous demandé — et vise les profils qui réservent. Le coût par rendez-vous baisse." },
    { label: "Le parcours en vidéo", titre: "Microsoft Clarity",
      texte: "Chaque visite se revoit en vidéo, et des cartes de chaleur montrent où l'on clique et où l'on renonce : ce qu'il faut mettre en avant, ce qui se trouve mal." },
    { label: "Conformité", titre: "Le consentement",
      texte: "Les deux outils ne s'activent qu'avec l'accord de la visiteuse, par un bandeau conforme aux règles de la CNIL. Clarity masque les informations saisies dans les formulaires." },
  ], { y: 3.1, h: 3.05 });
}

/* ═════════════════════════════════════════════ 03 — calendrier et investissement ═════ */
intercalaire(pres, { numero: "03", titre: "Calendrier et investissement", ligne: "Les dates qui comptent, et ce que représente la phase 2." });

{
  const s = page(pres, { rubrique: "Le calendrier", titre: "Les dates qui comptent", n: p() });
  const y = 3.05, x0 = T.MARGE, x1 = T.MARGE + T.COLONNE;
  s.addShape("rect", { x: x0, y, w: T.COLONNE, h: 0.02, fill: { color: T.NOIR }, line: { type: "none" } });
  const jalons = [
    { quand: "30 septembre 2026", quoi: "Fin du test", detail: `Premier versement${NB}: ${euros(1500)}. Décision de lancer la phase 2.`, accent: true },
    { quand: "Octobre 2026", quoi: "Les fondations", detail: "Mise en ligne sur madamoon.fr, cybersécurité, Google Business Profile, Pinterest, Meta Pixel et Clarity." },
    { quand: "15 novembre 2026", quoi: "La première page", detail: `Second versement${NB}: ${euros(1000)}. Objectif${NB}: les 8 intentions en première page de Google.`, accent: true },
    { quand: "31 décembre 2026", quoi: "Le top 3", detail: "Objectif : les 8 intentions dans les trois premiers résultats.", accent: true },
    { quand: "Jusqu'en septembre 2027", quoi: "Le suivi", detail: "Support, une semaine par section, espace client, rendez-vous, Élise 2.0, e-mail marketing, pendant douze mois." },
  ];
  const pas = T.COLONNE / jalons.length;
  jalons.forEach((j, i) => {
    const x = x0 + i * pas;
    s.addShape("ellipse", { x: x - 0.0, y: y - 0.09, w: 0.2, h: 0.2, fill: { color: j.accent ? T.ACCENT : T.NOIR }, line: { type: "none" } });
    texte(s, j.quand.toUpperCase(), { x, y: y + 0.36, w: pas - 0.25, h: 0.24, fontFace: T.MONO, fontSize: 8.5, color: j.accent ? T.ACCENT : T.GRIS, charSpacing: spc(8.5), valign: "middle" });
    texte(s, j.quoi, { x, y: y + 0.7, w: pas - 0.25, h: 0.42, fontFace: T.TITRE, fontSize: 17, color: T.NOIR, charSpacing: spc(17), valign: "top" });
    texte(s, j.detail, { x, y: y + 1.2, w: pas - 0.3, h: 1.5, fontFace: T.TITRE, fontSize: 11, color: T.GRIS, charSpacing: spc(11), lineSpacingMultiple: 1.38, valign: "top" });
  });
}

{
  const s = page(pres, { rubrique: "L'investissement", titre: "Ce que représente la phase 2", n: p() });
  const services = [
    ["Référencement : stratégie, optimisation, contenus, suivi des positions", 4500],
    ["Mise en ligne sur madamoon.fr et migration du référencement", 1500],
    ["Fiche Google Business Profile", 600],
    ["Support technique et gestion du site — 12 mois", 2400],
    ["Amélioration continue du design — une semaine par section", 6000],
    ["Mode éditorial repensé après étude du parcours client", 2500],
    ["Espace client MADAMOON", 3500],
    ["Prise de rendez-vous sur mesure, au-delà de Calendly", 3000],
    ["Élise 2.0", 3500],
    ["E-mail marketing", 1500],
    ["Flashs statistiques du trafic organique", 1200],
    ["Suivi des indicateurs clés", 1800],
    ["Protections de cybersécurité", 2000],
    ["Meta Pixel et Microsoft Clarity, avec bandeau de consentement", 2200],
    ["Pinterest : revendication du compte, épingles enrichies, tableaux", 1200],
  ];
  const total = services.reduce((a, [, v]) => a + v, 0);
  tableau(s, [
    ["Service", "Valeur marchande"],
    ...services.map(([t, v]) => [t, euros(v)]),
    [{ t: "Total", gras: true, filet: T.NOIR }, { t: euros(total), gras: true, c: T.NOIR, filet: T.NOIR }],
  ], { x: T.MARGE, y: 2.15, w: 7.4, colW: [5.6, 1.8], taille: 9.5, hauteur: 0.27, aligne: ["left", "right"] });

  const x = 8.75, l = 3.73;
  texte(s, "VALEUR MARCHANDE", { x, y: 2.2, w: l, h: 0.24, fontFace: T.MONO, fontSize: 8.5, color: T.GRIS_CLAIR, charSpacing: spc(8.5), valign: "middle" });
  texte(s, [{ text: euros(total), options: { strike: "sngStrike" } }], { x, y: 2.5, w: l, h: 0.8, fontFace: T.TITRE, fontSize: 40, color: T.GRIS_CLAIR, charSpacing: spc(40), valign: "middle" });
  texte(s, "VOTRE INVESTISSEMENT", { x, y: 3.6, w: l, h: 0.24, fontFace: T.MONO, fontSize: 8.5, color: T.ACCENT, charSpacing: spc(8.5), valign: "middle" });
  texte(s, euros(2500), { x, y: 3.84, w: l, h: 1.38, fontFace: T.TITRE, fontSize: 80, color: T.ACCENT, charSpacing: spc(80), valign: "middle" });
  s.addShape("rect", { x, y: 5.28, w: 0.9, h: 0.02, fill: { color: T.ACCENT }, line: { type: "none" } });
  const remise = Math.round((1 - 2500 / total) * 100);
  texte(s, `Soit ${remise}${NB}% de moins que la valeur marchande, pour douze mois.`, {
    x, y: 5.44, w: l, h: 0.42, fontFace: T.TITRE, fontSize: 12.5, color: T.NOIR, charSpacing: spc(12.5), lineSpacingMultiple: 1.35, valign: "top",
  });
  texte(s, "Valeurs marchandes indicatives : tarifs d'indépendants en France.", {
    x: T.MARGE, y: 6.84, w: 7.4, h: 0.24, fontFace: T.TITRE, fontSize: 9.5, color: T.GRIS_CLAIR, charSpacing: spc(9.5), valign: "middle",
  });
  texte(s, "ÉCHÉANCIER", { x, y: 6.1, w: l, h: 0.24, fontFace: T.MONO, fontSize: 8.5, color: T.GRIS_CLAIR, charSpacing: spc(8.5), valign: "middle" });
  [[euros(1500), "au lancement de la phase 2"], [euros(1000), "le 15 novembre 2026"]].forEach(([v, q], i) => {
    texte(s, [
      { text: v, options: { bold: true, color: T.NOIR } },
      { text: `  ${q}`, options: { color: T.GRIS } },
    ], { x, y: 6.38 + i * 0.3, w: l, h: 0.28, fontFace: T.TITRE, fontSize: 12, charSpacing: spc(12), valign: "middle" });
  });
  console.log(`total ${total} — remise ${remise} %`);
}

/* ═════════════════════════════════════════════ fin ═════ */
{
  const s = pres.addSlide();
  fond(s, T.NOIR);
  surtitre(s, "MADAMOON  ·  proposition phase 2", T.GRIS);
  filet(s, 0.96, T.FILET_NOIR);
  texte(s, "LA PREMIÈRE ÉTAPE", { x: T.MARGE, y: 1.7, w: 6, h: 0.24, fontFace: T.MONO, fontSize: 8.5, color: T.ACCENT, charSpacing: spc(8.5), valign: "middle" });
  texte(s, "Tester le site\njusqu'au 30 septembre.", { x: T.MARGE, y: 2.05, w: T.COLONNE, h: 2.1, fontFace: T.TITRE, fontSize: 54, color: T.BLANC, charSpacing: spc(54), lineSpacingMultiple: 1.05, valign: "top" });
  s.addShape("rect", { x: T.MARGE, y: 4.35, w: 1.15, h: 0.04, fill: { color: T.ACCENT }, line: { type: "none" } });
  texte(s, `Puis décider ensemble du lancement de la phase 2. D'ici là, chaque remarque sur le site est la bienvenue${NB}: elle sera prise en compte avant la mise en ligne sur madamoon.fr.`, {
    x: T.MARGE, y: 4.65, w: 8.2, h: 1.0, fontFace: T.TITRE, fontSize: 14.5, color: T.GRIS_CLAIR, charSpacing: spc(14.5), lineSpacingMultiple: 1.4, valign: "top",
  });
  pieds(s, true);
}

pres.writeFile({ fileName: "MADAMOON-proposition-phase-2.pptx" }).then(() => console.log(`écrit — ${pres.slides.length} diapositives`));
