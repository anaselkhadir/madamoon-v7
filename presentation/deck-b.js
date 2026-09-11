/* La présentation MADAMOON — seconde moitié. */
const S = require("./systeme.js");
const { T, texte, fond, filet, surtitre, numero, pied, page, intercalaire,
        cartes, tirets, chiffre, planche, telephone, legende, spc } = S;

module.exports = function seconde(pres, depart) {
  let n = depart;
  const p = () => ++n;

  /* ═════════════════════════════════ 03 · trois portes ═════ */
  intercalaire(pres, {
    numero: "03", titre: "Trois portes d'entrée",
    ligne: "Par la coupe, par la morphologie, par la maison. Aucune n'est la bonne : ce sont des chemins, pas des règles.",
  });

  {
    const s = page(pres, {
      rubrique: "Trois portes", titre: "Par la coupe",
      chapeau: "Six pages, une par ligne. Les robes y sont rangées par maison, et la page dit à qui la coupe va.",
      n: p(),
    });
    planche(s, "web-coupe", { x: T.MARGE, y: 3.14, l: 5.6 });
    planche(s, "sec-morpho-scene", { x: T.MARGE + 5.6 + 0.43, y: 3.14, l: 5.6 });
    legende(s, "le premier écran d'une coupe", { x: T.MARGE, y: 6.76, l: 5.6 });
    legende(s, "la scène des coupes, qui se découvre au défilement", { x: T.MARGE + 5.6 + 0.43, y: 6.76, l: 5.6 });
    s.addNotes("Sirène, princesse, fluide, trapèze, minimaliste, deux-en-un. Chaque page porte son propre catalogue PDF.");
  }

  {
    const s = page(pres, {
      rubrique: "Trois portes", titre: "Par la morphologie",
      chapeau: "Six pages écrites pour être lues, pas seulement indexées. Ce sont les plus longues du site, et les plus travaillées.",
      n: p(),
    });
    planche(s, "web-morphologie", { x: T.MARGE, y: 3.14, l: 6.3 });
    tirets(s, { x: 7.85, y: 3.14, l: 4.63, titre: null, pas: 0.72,
      items: ["Comment se reconnaître, y compris devant un miroir",
              "Pourquoi chaque coupe fonctionne, en toutes lettres",
              "Les robes rangées en trois niveaux de préférence",
              "Les questions que les mariées posent vraiment"] });
    s.addNotes("Deux règles de ton tenues du début à la fin : aucune robe n'est déconseillée, et aucun corps n'est un problème à corriger. Les mots « cacher » et « camoufler » ne figurent nulle part.");
  }

  {
    const s = page(pres, {
      rubrique: "Trois portes", titre: "Une page de morphologie, de haut en bas",
      chapeau: "Quatre temps, dans cet ordre, sur chacune des six pages.",
      n: p(),
    });
    const l = 2.62, e = 0.38;
    [["sec-morpho-reconnaitre", "Se reconnaître"],
     ["sec-morpho-modeles", "Les robes, en trois niveaux"],
     ["sec-morpho-questions", "Les questions posées"],
     ["sec-morpho-audela", "Au-delà de la morphologie"]].forEach(([f, t], i) => {
      const x = T.MARGE + i * (l + e);
      planche(s, f, { x, y: 3.2, l, marge: 0.08 });
      texte(s, t, { x, y: 4.98, w: l, h: 0.5, fontFace: T.TITRE, fontSize: 13, color: T.NOIR,
                    charSpacing: spc(13), lineSpacingMultiple: 1.2, valign: "top", isTextBox: true, margin: 0 });
    });
    pied(s, "« Une morphologie dit par où commencer. Elle ne dit pas qui vous êtes le jour de votre mariage. » — le bloc qui ferme les six pages.");
    s.addNotes("La dernière section est identique sur les six pages, et c'est voulu : c'est un principe de la maison, pas une variation de conseil.");
  }

  {
    const s = page(pres, {
      rubrique: "Trois portes", titre: "Par la maison",
      chapeau: "Cinq pages, une par créateur. La page est un filtre : on n'y montre que ses robes, que ses coupes.",
      n: p(),
    });
    planche(s, "web-maison", { x: T.MARGE, y: 3.14, l: 5.6 });
    planche(s, "sec-maison-morpho", { x: T.MARGE + 5.6 + 0.43, y: 3.14, l: 5.6 });
    legende(s, "Olya Mak  ·  Barcelone", { x: T.MARGE, y: 6.76, l: 5.6 });
    legende(s, "à qui ses coupes vont — et quand elles ne vont pas", { x: T.MARGE + 5.6 + 0.43, y: 6.76, l: 5.6 });
    s.addNotes("Rien n'est complété par le reste du catalogue. Une maison qui n'a que quatre robes en a quatre sur sa page : c'est la seule façon que le filtre veuille dire quelque chose.");
  }

  /* ═════════════════════════════════ 04 · Élise ═════ */
  intercalaire(pres, {
    numero: "04", titre: "Élise",
    ligne: "La conseillère de la maison. Elle part de la silhouette, et elle dit franchement quand la réponse est ailleurs.",
  });

  {
    const s = page(pres, { rubrique: "Élise", titre: "Une conseillère, pas une bulle de support", n: p() });
    planche(s, "web-elise", { x: T.MARGE, y: 2.3, l: 7.5 });
    tirets(s, { x: 9.1, y: 2.3, l: 3.38, titre: null, pas: 0.66,
      items: ["Elle s'ouvre du bouton « Trouver ma robe », depuis n'importe quelle page",
              "Trois questions suffisent à poser une morphologie",
              "Elle rend un verdict rédigé, pas une liste de liens",
              "On peut aussi lui écrire librement"] });
    legende(s, "le diagnostic, mené jusqu'au verdict", { x: T.MARGE, y: 7.06, l: 7.5 });
    s.addNotes("Montrer en direct si le temps le permet : le bouton rouge de l'accueil l'ouvre.");
  }

  {
    const s = page(pres, {
      rubrique: "Élise", titre: "Ce qu'elle sait faire",
      chapeau: "Elle connaît le catalogue, les horaires, les prix et les délais. Et elle sait dire non.",
      n: p(),
    });
    cartes(s, [
      { label: "01", titre: "Le diagnostic", texte: "Épaules, taille, courbes : trois questions, et la morphologie est posée. Celles qui la connaissent déjà la choisissent directement." },
      { label: "02", titre: "La franchise", texte: "Ouverte depuis la page d'une maison, elle ne recommande que ses robes — et quand cette maison n'a pas la coupe, elle le dit et nomme celles qui l'ont." },
      { label: "03", titre: "Les questions pratiques", texte: "Délais, essayage, sur-mesure, paiement, prix, accompagnants, adresse : sept réponses écrites par la maison." },
      { label: "04", titre: "Les deux langues", texte: "Elle parle la langue de la page. Son repli hors ligne reconnaît « rdv » comme « appointment » : la même liste sert les deux." },
    ]);
    pied(s, "Si le service de conversation ne répond pas, elle bascule sur ses propres réponses plutôt que de rester muette.");
    s.addNotes("La franchise est le point à souligner : une conseillère qui vend ce qu'elle a sous la main n'est pas une conseillère.");
  }

  /* ═════════════════════════════════ 05 · coups de cœur ═════ */
  intercalaire(pres, {
    numero: "05", titre: "Les coups de cœur",
    ligne: "La mariée retient ses robes, et repart avec sa liste — ou l'envoie à sa mère.",
  });

  {
    const s = page(pres, {
      rubrique: "Les coups de cœur", titre: "Retenir une robe",
      chapeau: "Un cœur posé sur chaque photographie. Un geste, sans fenêtre de confirmation et sans compte à créer.",
      n: p(),
    });
    planche(s, "web-coeurs", { x: T.MARGE, y: 3.14, l: 6.3 });
    const lt = telephone(s, "iphone-coeurs", { x: 8.25, y: 2.86, h: 4.0 });
    legende(s, "la liste, sur téléphone", { x: 8.25, y: 6.96, l: 2.6 });
    s.addNotes("La liste vit dans le navigateur de la cliente. Rien ne nous est transmis, aucun compte n'est demandé.");
  }

  {
    const s = page(pres, {
      rubrique: "Les coups de cœur", titre: "La sélection se partage",
      chapeau: "Le site fabrique un lien qui porte la sélection avec lui. Celle qui le reçoit voit exactement les mêmes robes.",
      n: p(),
    });
    cartes(s, [
      { label: "01", titre: "Le lien", texte: "Un bouton, et l'adresse est copiée. Sur téléphone, la feuille de partage s'ouvre directement vers WhatsApp ou les messages." },
      { label: "02", titre: "Ce qu'il porte", texte: "Les robes elles-mêmes, écrites dans l'adresse. Aucun serveur n'est interrogé, aucun identifiant n'est créé." },
      { label: "03", titre: "À l'arrivée", texte: "La sélection s'affiche telle quelle. Celle qui reçoit garde la sienne — elle adopte la liste si elle le veut, d'un bouton." },
      { label: "04", titre: "Le compteur", texte: "Un cœur en haut de page indique combien de robes sont retenues. Il suit la cliente de page en page." },
    ]);
    pied(s, "Une robe retirée du catalogue disparaît du lien en silence : un lien gardé six mois ne montre jamais une robe que vous ne présentez plus.");
    s.addNotes("Le partage était votre demande : la mariée envoie sa sélection à sa mère ou à son témoin.");
  }

  /* ═════════════════════════════════ 06 · le rendez-vous ═════ */
  intercalaire(pres, {
    numero: "06", titre: "Le rendez-vous",
    ligne: "La réservation se fait sur le site, dans votre formulaire, sans le quitter.",
  });

  {
    const s = page(pres, {
      rubrique: "Le rendez-vous", titre: "Le calendrier, posé dans la page",
      chapeau: "C'est votre compte Calendly, celui de madamoon.fr. Il n'a pas été touché : le nouveau site s'y branche.",
      n: p(),
    });
    planche(s, "web-rendezvous", { x: T.MARGE, y: 3.14, l: 5.6 });
    planche(s, "sec-calendrier", { x: T.MARGE + 5.6 + 0.43, y: 3.14, l: 5.6 });
    legende(s, "l'essentiel à droite de la photographie", { x: T.MARGE, y: 6.76, l: 5.6 });
    legende(s, "le formulaire, sans sortir du site", { x: T.MARGE + 5.6 + 0.43, y: 6.76, l: 5.6 });
    s.addNotes("Une réservation qui quitte le site en perd une partie en chemin. Le bouton ne renvoie plus ailleurs : il descend au calendrier.");
  }

  {
    const s = page(pres, {
      rubrique: "Le rendez-vous", titre: "Ce qui accompagne la réservation",
      chapeau: "Trois détails qui font la différence entre une visite et un rendez-vous pris.",
      n: p(),
    });
    cartes(s, [
      { label: "01", titre: "La robe repérée", texte: "Arrivée depuis une fiche, la mariée voit « Le modèle Clover sera préparé pour votre venue ». Le nom voyage jusqu'à la réservation." },
      { label: "02", titre: "Les catalogues", texte: "Un PDF par coupe, par maison, par morphologie et par robe. Le téléchargement est immédiat : plus de formulaire à remplir." },
      { label: "03", titre: "Le repli", texte: "Si un bloqueur retient le calendrier, la page propose d'appeler ou d'ouvrir le formulaire dans un onglet. Elle ne reste jamais vide." },
    ]);
    pied(s, "Le formulaire reste celui de votre compte : les questions, les créneaux et les notifications sont inchangés.");
    s.addNotes("Le formulaire de collecte a été retiré des catalogues à votre demande : une mariée arrêtée par quatre champs ferme l'onglet.");
  }

  return n;
};
