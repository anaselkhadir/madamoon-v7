/*
 * MADAMOON — les corrections et ajustements depuis la livraison.
 *
 * Même système que la présentation de livraison (systeme.js) : une
 * seule identité ANVSLAB d'un document à l'autre. Les « avant » sont
 * les captures de la première présentation, les « après » viennent du
 * site en ligne, au même cadrage.
 */
const pptxgen = require("pptxgenjs");
const S = require("./systeme.js");
const { T, texte, fond, filet, surtitre, numero, page, intercalaire,
        cartes, tirets, chiffre, planche, telephone, legende, spc, RATIO } = S;

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.author = "ANVSLAB";
pres.company = "ANVSLAB";
pres.title = "MADAMOON — corrections et ajustements";
pres.subject = "Les retours de la maison, du 11 au 13 septembre 2026";

let n = 0;
const p = () => ++n;
const NB = " ";   // avant les deux-points
const FIN_ = " "; // avant ? ! ; et dans les guillemets
const g = (t) => `«${FIN_}${t}${FIN_}»`;

/* ————————————————————————————— briques propres à ce document ————— */

/** Deux captures d'écran côte à côte, avec leur mot au-dessus. */
function avantApres(s, avant, apres, { y = 2.22, note }) {
  const e = 0.7, l = (T.COLONNE - e) / 2;
  [["Avant", avant, T.GRIS_CLAIR], ["Après", apres, T.ACCENT]].forEach(([mot, img, c], i) => {
    const x = T.MARGE + i * (l + e);
    texte(s, mot.toUpperCase(), {
      x, y, w: l, h: 0.24, fontFace: T.MONO, fontSize: 8.5, color: c, charSpacing: spc(8.5), valign: "middle",
    });
    planche(s, img, { x: x + 0.14, y: y + 0.44, l: l - 0.28 });
  });
  if (note) {
    texte(s, note, {
      x: T.MARGE, y: 6.2, w: T.COLONNE, h: 0.72,
      fontFace: T.TITRE, fontSize: 11.5, color: T.GRIS, charSpacing: spc(11.5),
      lineSpacingMultiple: 1.35, valign: "top",
    });
  }
}

/** Un tableau sobre : filets fins, en-tête à chasse fixe. */
function tableau(s, lignes, { x, y, w, colW, taille = 10.5, hauteur = 0.36 }) {
  const entete = lignes[0].map((t) => ({
    text: t.toUpperCase(),
    options: { fontFace: T.MONO, fontSize: 8, color: T.GRIS_CLAIR, charSpacing: spc(8), bold: false,
               border: [{ type: "none" }, { type: "none" }, { pt: 1, color: T.NOIR }, { type: "none" }] },
  }));
  const corps = lignes.slice(1).map((r) => r.map((t, j) => ({
    text: t,
    options: { fontFace: T.TITRE, fontSize: taille, charSpacing: spc(taille),
               color: j === 0 ? T.NOIR : j === r.length - 1 ? T.NOIR : T.GRIS,
               border: [{ type: "none" }, { type: "none" }, { pt: 0.75, color: T.FILET }, { type: "none" }] },
  })));
  s.addTable([entete, ...corps], {
    x, y, w, colW, rowH: hauteur, margin: [0.05, 0.08, 0.05, 0], valign: "middle",
  });
}

/* ═════════════════════════════════════════════ couverture ═════ */
{
  const s = pres.addSlide();
  fond(s, T.NOIR);
  surtitre(s, "Corrections et ajustements  ·  11 — 13 septembre 2026", T.GRIS);
  filet(s, 0.96, T.FILET_NOIR);
  texte(s, "MADAMOON", {
    x: T.MARGE, y: 1.5, w: T.COLONNE, h: 1.6,
    fontFace: T.TITRE, fontSize: 96, color: T.BLANC, charSpacing: spc(96), valign: "middle",
  });
  s.addShape("rect", { x: T.MARGE, y: 3.32, w: 1.15, h: 0.04, fill: { color: T.ACCENT }, line: { type: "none" } });
  texte(s, "Les retours de la maison,\nappliqués et en ligne", {
    x: T.MARGE, y: 3.7, w: 8.2, h: 1.6,
    fontFace: T.TITRE, fontSize: 31, color: T.BLANC, charSpacing: spc(31), lineSpacingMultiple: 1.15, valign: "top",
  });
  texte(s, "Les vingt-neuf modifications faites depuis la présentation de livraison. Pour chacune, ce qui a changé et pourquoi — et quand l'écran le montre, l'avant et l'après.", {
    x: T.MARGE, y: 5.42, w: 7.4, h: 0.9,
    fontFace: T.TITRE, fontSize: 13.5, color: T.GRIS_CLAIR, charSpacing: spc(13.5), lineSpacingMultiple: 1.4, valign: "top",
  });
  filet(s, 6.46, T.FILET_NOIR);
  texte(s, "PARIS 10ᵉ  ·  FRANCE", {
    x: T.MARGE, y: 6.66, w: 5.2, h: 0.24, fontFace: T.MONO, fontSize: 8.5, color: T.GRIS, charSpacing: spc(8.5), valign: "middle",
  });
  texte(s, "ANVSLAB.COM", {
    x: 7.28, y: 6.66, w: 5.2, h: 0.24, align: "right", fontFace: T.MONO, fontSize: 8.5, color: T.ACCENT, charSpacing: spc(8.5), valign: "middle",
  });
  s.addNotes("Ce document complète la présentation de livraison du 11 septembre. Il ne reprend que ce qui a changé depuis.");
}

/* ═════════════════════════════════════════════ en bref ═════ */
{
  const s = page(pres, {
    rubrique: "En bref",
    titre: "Trois jours de retours, tous en ligne",
    chapeau: `Les demandes sont arrivées par courrier et par captures d'écran. Chacune a été appliquée, vérifiée sur le site en ligne, puis publiée. Les rares points encore ouverts attendent une décision ou un fichier${NB}: ils sont en fin de document.`,
    n: p(),
  });
  const l = 2.55, e = (T.COLONNE - 4 * l) / 3;
  [["29", "modifications publiées sur le site"],
   ["60", "robes vérifiées, photo par photo"],
   ["106", "listes de cartes corrigées"],
   ["77", "catalogues PDF régénérés"]].forEach(([v, t], i) =>
    chiffre(s, { x: T.MARGE + i * (l + e), y: 3.45, l, valeur: v, legende: t, couleur: i === 0 ? T.ACCENT : T.NOIR }));
}

/* ═════════════════════════════════════════════ 01 — les mots ═════ */
intercalaire(pres, { numero: "01", titre: "Les mots", ligne: "Le vocabulaire de la maison, et les phrases qu'elle a reprises." });

{
  const s = page(pres, {
    rubrique: "Les mots",
    titre: `${g("Silhouette")} devient ${g("morphologie")}`,
    chapeau: "Le mot servait à deux choses. Il n'a pas été remplacé à l'aveugle, mais selon ce qu'il désignait.",
    n: p(),
  });
  cartes(s, [
    { label: "La catégorie", titre: g("Morphologie"),
      texte: `${g("Une silhouette en A")} devient ${g("une morphologie en A")}. 62 textes repris, plus aucune occurrence sur les 88 pages françaises.` },
    { label: "La ligne du corps", titre: g("Ligne"),
      texte: `On ne dit pas ${g("allonger la morphologie")}${NB}: la phrase se reprend — ${g("ligne droite, allure longiligne")}.` },
    { label: "L'anglais", titre: "Inchangé",
      texte: `En anglais, ${g("silhouette")} désigne la coupe d'une robe et ${g("body shape")} la morphologie. Les deux étaient déjà justes.` },
  ], { y: 3.2, h: 2.7 });
}

{
  const s = page(pres, { rubrique: "Les mots", titre: "Les phrases reprises", n: p() });
  tableau(s, [
    ["Où", "Avant", "Après"],
    ["Titre des coupes", "Une même femme, six lignes.", "Trouvez la coupe qui vous va."],
    ["Introduction des coupes", "C'est la coupe qui décide de la ligne, bien avant la taille.", "La coupe, c'est la forme de la robe. En voici six."],
    ["Coupe sirène", "Ajustée jusqu'aux genoux, puis évasée.", "Ajustée jusqu'aux cuisses, puis évasée."],
    ["Coupe fluide", "Un tombé souple, sans structure apparente. Elle suit le mouvement.", "Un tombé souple qui suit naturellement le mouvement."],
    ["Coupe minimaliste", "Nette et silencieuse", "Nette et épurée"],
    ["Créateurs", "Cinq maisons. Aucune par hasard.", "Plusieurs maisons. Aucune par hasard."],
    ["Avis", "La note, le nombre d'avis et le rang dans l'arrondissement", "La note, et une phrase de la maison"],
    ["Fiche d'une robe", "Les silhouettes qu'elle sert", "Les morphologies qu'elle sublime"],
    ["Gabriel", "Une robe courte en plumetis, une jupe transparente par-dessus.", "Une robe courte délicatement perlée, une jupe transparente en dessous."],
    ["Siddalee", "Fourreau à motifs floraux, longue traîne", "Sirène à motifs floraux, longue traîne"],
    ["Titres du catalogue", "Robes robes fluides", "Robes fluides"],
  ], { x: T.MARGE, y: 2.3, w: T.COLONNE, colW: [2.3, 4.67, 4.663], taille: 10, hauteur: 0.37 });
  texte(s, "Chaque phrase est reprise en anglais, et dans les catalogues PDF où elle figure.", {
    x: T.MARGE, y: 6.78, w: 9, h: 0.26, fontFace: T.TITRE, fontSize: 10, color: T.GRIS_CLAIR, charSpacing: spc(10), valign: "middle",
  });
}

{
  const s = page(pres, { rubrique: "Les mots", titre: "Sur la fiche d'une robe", n: p() });
  /* Deux gros plans, l'un sur l'autre : pleine page, les deux captures
   * se ressemblaient trop pour que la différence se lise. */
  const l = 5.4, h = l / (2300 / 800), x = T.MARGE + 0.14;
  [["AVANT", "zoom-fiche-avant", 2.2, T.GRIS_CLAIR], ["APRÈS", "zoom-fiche-apres", 4.74, T.ACCENT]].forEach(([mot, img, y, c]) => {
    texte(s, mot, { x: T.MARGE, y, w: 3, h: 0.24, fontFace: T.MONO, fontSize: 8.5, color: c, charSpacing: spc(8.5), valign: "middle" });
    s.addShape("rect", { x: x - 0.14, y: y + 0.3, w: l + 0.28, h: h + 0.2, fill: { color: T.CARTE }, line: { type: "none" } });
    s.addImage({ path: `images/${img}.jpg`, x, y: y + 0.4, w: l, h });
  });
  tirets(s, { x: 7.2, y: 2.5, l: 5.28, pas: 1.05, items: [
    `${g("Les silhouettes qu'elle sert")} devient ${g("Les morphologies qu'elle sublime")}${NB}: le vocabulaire de la maison, et un verbe qui dit ce que la robe apporte.`,
    `Le bloc ${g("À partir de 1 500 €")} disparaît de toutes les fiches. C'est le prix de départ de la maison${NB}; posé sous une photo, il se lisait comme le prix de cette robe-là.`,
    `Le prix reste là où il parle de la maison${NB}: le bandeau défilant de l'accueil, et les réponses d'Élise.`,
  ] });
}

/* ═════════════════════════════════════════════ 02 — l'accueil ═════ */
intercalaire(pres, { numero: "02", titre: "L'accueil", ligne: "Les morphologies en dessin, les coupes, les créateurs, et l'ouverture du site." });

{
  const s = page(pres, { rubrique: "L'accueil", titre: "Les morphologies, en dessin", n: p() });
  avantApres(s, "avant-sec-silhouette", "ap-sec-morphologies", {
    note: `Une photo de robe au-dessus d'un type de corps se lisait comme une recommandation. Six dessins tirés de la planche de la maison, sans fond, dont le trait suit le thème clair ou sombre. La main du O, coupée au bord de la planche, est reprise sur la figure A.`,
  });
}

{
  const s = page(pres, { rubrique: "L'accueil", titre: "Les coupes, un titre plus simple", n: p() });
  avantApres(s, "avant-sec-coupes", "ap-sec-coupes", {
    note: `${g("Une même femme, six lignes")} devient ${g("Trouvez la coupe qui vous va")} — le même geste que ${g("Trouver ma robe")} en haut de page. La phrase d'introduction dit d'abord ce qu'est une coupe.`,
  });
}

{
  const s = page(pres, { rubrique: "L'accueil", titre: "Les créateurs, un rail que l'on pousse", n: p() });
  avantApres(s, "avant-sec-createurs", "ap-sec-createurs", {
    note: `La bande ne dérive plus toute seule au défilement${NB}: elle se tire à la souris et se pousse aux flèches. Quatre maisons nommées, les petits ateliers réunis sous ${g("Autres créateurs")}. Les villes sont précisées${NB}: Newport Beach et Rome.`,
  });
}

{
  const s = page(pres, {
    rubrique: "L'accueil",
    titre: "Le site s'ouvre toujours en haut",
    chapeau: `Sur iPhone, un geste pendant les quatre secondes du rideau d'ouverture faisait défiler la page en dessous${NB}: elle apparaissait coupée au milieu, sans l'en-tête.`,
    n: p(),
  });
  chiffre(s, { x: T.MARGE, y: 3.35, l: 3.0, valeur: "652 px", legende: "où la page s'arrêtait après un glissement pendant le rideau, mesuré sur le site en ligne" });
  chiffre(s, { x: T.MARGE + 3.55, y: 3.35, l: 3.0, valeur: "0 px", couleur: T.ACCENT, legende: "après la correction : le défilement est verrouillé pendant tout le rideau" });
  tirets(s, { x: 8.1, y: 3.35, l: 4.38, titre: "Ce qui a changé", pas: 0.62, items: [
    "Safari ignorait le blocage du défilement : il est désormais bloqué au doigt, à la molette et au clavier",
    "Le geste qui passe l'ouverture la passe, sans faire défiler la page",
    "Un lien vers une section précise de la page reste respecté",
  ] });
}

/* ═════════════════════════════════════════════ 03 — le catalogue ═════ */
intercalaire(pres, { numero: "03", titre: "Le catalogue", ligne: "Les créateurs, les coupes, et les photos de chaque robe." });

{
  const s = page(pres, { rubrique: "Le catalogue", titre: "Des robes rangées au bon endroit", n: p() });
  tableau(s, [
    ["Robe", "Avant", "Après"],
    ["Amandine", "Monica Loretti", "Autres créateurs"],
    ["Lorette", "Monica Loretti", "Autres créateurs"],
    ["Zina", "Angeola Biarritz  ·  fluide", "Casablanca Bridal  ·  sirène"],
    ["Sienna", "Angeola Biarritz", "Casablanca Bridal"],
    ["Siddalee", "Coupe fluide", "Coupe sirène"],
    ["Tessa", "Photo sans surjupe", "Photo avec surjupe"],
  ], { x: T.MARGE, y: 2.3, w: 6.9, colW: [1.5, 2.7, 2.7], taille: 11, hauteur: 0.46 });
  tableau(s, [
    ["Maison", "Avant", "Après"],
    ["Watters Designs", "20", "20"],
    ["Casablanca Bridal", "17", "19"],
    ["Monica Loretti", "8", "6"],
    ["Olya Mak", "4", "4"],
    ["Angeola Biarritz", "2", "0"],
    ["Autres créateurs", "9", "11"],
  ], { x: 8.3, y: 2.3, w: 4.18, colW: [2.38, 0.9, 0.9], taille: 11, hauteur: 0.46 });
  texte(s, `Monica Loretti change aussi d'image d'ouverture${NB}: Lorette n'étant plus à elle, c'est Monica, photographiée sur une place romaine. Les catalogues PDF des maisons et des coupes concernées sont refaits.`, {
    x: T.MARGE, y: 5.75, w: T.COLONNE, h: 0.7, fontFace: T.TITRE, fontSize: 11.5, color: T.GRIS, charSpacing: spc(11.5), lineSpacingMultiple: 1.35, valign: "top",
  });
}

{
  const s = page(pres, { rubrique: "Le catalogue", titre: `${g("Autres créateurs")} a sa page`, n: p() });
  const l = 6.6;
  planche(s, "ap-autres-createurs", { x: T.MARGE + 0.14, y: 2.44, l });
  tirets(s, { x: 8.2, y: 2.3, l: 4.28, pas: 0.66, items: [
    "Les 11 robes sans maison réunies sur une page, en français et en anglais",
    "Un repère sur chaque carte : les 60 robes en portent désormais un",
    "La vignette de l'accueil et le menu mènent à cette page",
    "Un catalogue PDF de 13 pages",
    "Les ateliers ne sont pas nommés : la maison ne les désigne pas à la concurrence",
  ] });
}

{
  const s = page(pres, { rubrique: "Le catalogue", titre: "Chaque robe montre toutes ses photos", n: p() });
  const h = 4.25;
  const l1 = telephone(s, "iphone-ap-meredith", { x: T.MARGE, y: 2.2, h });
  legende(s, "MEREDITH — LA VUE DE FACE REVIENT", { x: T.MARGE, y: 2.2 + h + 0.1, l: l1 + 0.8 });
  telephone(s, "iphone-ap-tessa", { x: T.MARGE + l1 + 0.9, y: 2.2, h });
  legende(s, "TESSA — AVEC SA SURJUPE", { x: T.MARGE + l1 + 0.9, y: 2.2 + h + 0.1, l: l1 + 0.8 });
  tirets(s, { x: 6.55, y: 2.3, l: 5.93, pas: 0.9, items: [
    "Quand une robe a une vidéo, sa première photo — presque toujours la vue de face — n'apparaissait nulle part. 7 robes concernées : Addison, Meredith, Tessa, Ariel, Venus, Solana, Montana.",
    "Vérifié sur les 60 fiches : toutes les photos s'affichent, et chaque robe a au moins une vue de face.",
    "Tessa, deux-en-un, se montre désormais avec sa surjupe : sur les cartes, dans l'aperçu des liens partagés et sur le catalogue PDF.",
    "Chaque robe peut désigner la photo qui la représente : une ligne suffit pour en changer.",
  ] });
}

/* ═════════════════════════════════════════════ 04 — le téléphone ═════ */
intercalaire(pres, { numero: "04", titre: "Le téléphone", ligne: "Des cartes qui laissent voir la robe, des listes qui tiennent, un rendez-vous plus discret." });

{
  const s = page(pres, { rubrique: "Le téléphone", titre: "Les cartes laissent voir la robe", n: p() });
  const h = 4.25, y = 2.3;
  const l = h * RATIO.iphone, e = 0.42;
  [["avant-iphone-robes", "AVANT"], ["iphone-ap-robes", "APRÈS — COUPES"], ["iphone-ap-tuiles", "APRÈS — ROBES"]].forEach(([img, mot], i) => {
    const x = T.MARGE + i * (l + e);
    telephone(s, img, { x, y, h });
    texte(s, mot, { x, y: y + h + 0.1, w: l + 0.4, h: 0.26, fontFace: T.MONO, fontSize: 8.5,
      color: i === 0 ? T.GRIS_CLAIR : T.ACCENT, charSpacing: spc(8.5), valign: "middle" });
  });
  tirets(s, { x: 7.75, y: 2.3, l: 4.73, pas: 0.84, items: [
    "Le nom et sa ligne passent en bas de la carte : ils ne couvrent plus le buste de la robe",
    "La carte gagne un septième en hauteur : 176 × 284 px au lieu de 176 × 245",
    "Sur les robes, la description s'efface au doigt, et le nom passe de 30 à 22 px",
    "Le widget de rendez-vous passe de 272 × 94 à 216 × 75 px",
    "Sur ordinateur, les cartes gardent leur taille et leur description",
  ] });
}

{
  const s = page(pres, { rubrique: "Le téléphone", titre: "La dernière carte ne reste plus seule", n: p() });
  const h = 4.25;
  const l = telephone(s, "iphone-ap-grille", { x: T.MARGE, y: 2.2, h });
  legende(s, "COUPE DEUX-EN-UN — CHASTITY", { x: T.MARGE, y: 2.2 + h + 0.1, l: 3 });
  chiffre(s, { x: T.MARGE + l + 0.8, y: 2.3, l: 2.6, valeur: "106", couleur: T.ACCENT, legende: "listes du site avaient une carte seule sur leur dernière ligne" });
  tirets(s, { x: 7.2, y: 2.3, l: 5.28, pas: 0.7, items: [
    "Une carte seule en fin de liste se place au milieu, avec autant de blanc de chaque côté",
    "Même règle sur ordinateur, où les listes ont trois colonnes",
    "La taille des cartes ne change pas d'un pixel",
    "L'espace qui manquait avant la photo du showroom est rendu",
    "Les trois onglets du menu téléphone passent en gras",
  ] });
}

/* ═════════════════════════════════════════════ ce qui reste ouvert ═════ */
{
  const s = page(pres, {
    rubrique: "À trancher",
    titre: "Ce qui reste ouvert",
    chapeau: "Rien de ce qui suit n'empêche le site de fonctionner. Ce sont des décisions à prendre ou des fichiers à recevoir.",
    n: p(),
  });
  const l = 5.5, e = T.COLONNE - 2 * l;
  tirets(s, { x: T.MARGE, y: 3.2, l, titre: "Des décisions", pas: 0.86, items: [
    `Angeola Biarritz n'a plus de robe, et sa page reste en ligne, vide. La retirer, l'annoncer ${g("à venir")}, ou lui rendre ses modèles${FIN_}?`,
    `Le prix ${g("à partir de 1 500 €")} figure encore dans l'aperçu des liens partagés, les épingles Pinterest et les résultats Google. Le retirer aussi${FIN_}?`,
    `Marie illustre la coupe minimaliste à l'accueil, mais elle est classée fluide. La reclasser${FIN_}?`,
  ] });
  tirets(s, { x: T.MARGE + l + e, y: 3.2, l, titre: "Des fichiers à recevoir", pas: 0.86, items: [
    "La photo du showroom",
    "D'autres photos pour 8 robes qui n'en ont qu'une, en petite taille : Nirali, Calla, Fortune, Siddalee, Mitra, Ember, Rowan, Clover perles",
    "Uma, Camille, Riviera et Summer commencent par une vue de dos : dire si la face doit passer en premier",
  ] });
}

/* ═════════════════════════════════════════════ fin ═════ */
{
  const s = pres.addSlide();
  fond(s, T.NOIR);
  surtitre(s, "MADAMOON  ·  corrections et ajustements", T.GRIS);
  filet(s, 0.96, T.FILET_NOIR);
  texte(s, "Tout est en ligne.", {
    x: T.MARGE, y: 2.2, w: T.COLONNE, h: 1.3,
    fontFace: T.TITRE, fontSize: 60, color: T.BLANC, charSpacing: spc(60), valign: "middle",
  });
  s.addShape("rect", { x: T.MARGE, y: 3.66, w: 1.15, h: 0.04, fill: { color: T.ACCENT }, line: { type: "none" } });
  texte(s, `Chaque modification de ce document est visible dès maintenant sur le site. Si une page affiche encore l'ancienne version, il suffit de la rafraîchir${NB}: le téléphone la garde parfois en mémoire.`, {
    x: T.MARGE, y: 4.0, w: 7.6, h: 1.0,
    fontFace: T.TITRE, fontSize: 14.5, color: T.GRIS_CLAIR, charSpacing: spc(14.5), lineSpacingMultiple: 1.4, valign: "top",
  });
  texte(s, "anaselkhadir.github.io/madamoon-v7", {
    x: T.MARGE, y: 5.3, w: 7.6, h: 0.4,
    fontFace: T.TITRE, fontSize: 16, color: T.BLANC, charSpacing: spc(16), valign: "middle",
  });
  filet(s, 6.46, T.FILET_NOIR);
  texte(s, "PARIS 10ᵉ  ·  FRANCE", {
    x: T.MARGE, y: 6.66, w: 5.2, h: 0.24, fontFace: T.MONO, fontSize: 8.5, color: T.GRIS, charSpacing: spc(8.5), valign: "middle",
  });
  texte(s, "ANVSLAB.COM", {
    x: 7.28, y: 6.66, w: 5.2, h: 0.24, align: "right", fontFace: T.MONO, fontSize: 8.5, color: T.ACCENT, charSpacing: spc(8.5), valign: "middle",
  });
}

pres.writeFile({ fileName: "MADAMOON-corrections.pptx" }).then(() => console.log(`écrit — ${pres.slides.length} diapositives, ${n} numérotées`));
