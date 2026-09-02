import type { Categorie, Lettre } from "@/lib/madamoon";

/*
 * Ce que l'on écrit sur une morphologie.
 *
 * MORPHOLOGIES, dans lib/madamoon.ts, tient les données du conseil : les
 * coupes recommandées, l'objectif, la phrase courte. Ce fichier-ci tient
 * la matière rédigée — celle qui remplit la page et que les moteurs
 * lisent.
 *
 * Deux règles de ton, tenues partout :
 *
 * Aucune robe n'est déconseillée. Une morphologie ouvre des pistes, elle
 * n'en ferme aucune ; les coupes moins évidentes sont présentées pour ce
 * qu'elles apportent, jamais pour ce qu'elles rateraient.
 *
 * Aucun corps n'est un problème à corriger. On écrit ce qu'une coupe
 * fait, pas ce qu'elle « cache » ou « camoufle » — ces mots-là ne
 * figurent nulle part, et c'est délibéré.
 */

export type Repere = { titre: string; texte: string };

export type Edito = {
  /* Le titre de la page : la question que la mariée pose. */
  question: string;
  /* La ligne du premier écran. Une phrase, pas deux. */
  promesse: string;
  /* Trois façons de se reconnaître, dont une qui se vérifie devant un
   * miroir : la lecture seule ne suffit jamais à se situer. */
  reperes: Repere[];
  proportions: string;
  /* Pourquoi chaque coupe fonctionne. Rédigé pour les recommandées comme
   * pour celles qui valent l'essai — la seconde liste mérite autant
   * d'explication que la première, sans quoi elle sonne comme un lot de
   * consolation. */
  pourquoi: Partial<Record<Categorie, string>>;
  /* Le détail qui fait souvent basculer un essayage. */
  detail: string;
};

export const EDITO: Record<Lettre, Edito> = {
  O: {
    question: "Quelle robe pour une silhouette en O ?",
    promesse:
      "Un tombé qui glisse, un décolleté qui ouvre le buste : la ligne s'allonge d'elle-même.",
    reperes: [
      {
        titre: "Le repère",
        texte:
          "Vos épaules et vos hanches sont d'une largeur proche, et c'est la taille qui prend le plus de place.",
      },
      {
        titre: "La poitrine",
        texte:
          "Elle est généreuse et se remarque en premier. Beaucoup de robes s'écrivent à partir de là.",
      },
      {
        titre: "Devant le miroir",
        texte:
          "La main descend des épaules aux hanches sans rencontrer de creux net à la taille.",
      },
    ],
    proportions: "Buste et hanches proches, taille peu creusée, poitrine marquée.",
    pourquoi: {
      Fluide:
        "Elle ne serre nulle part. Le tissu descend d'un seul tenant, du buste à l'ourlet, et la ligne paraît plus longue qu'elle ne l'est.",
      Trapèze:
        "Le buste est tenu, la jupe part en A dès la taille haute. Le regard s'arrête sur le décolleté, et la robe laisse tout le reste libre.",
      Minimaliste:
        "Le satin ne fait aucun bruit. Quand la coupe est juste, il n'y a rien à ajouter et rien qui vienne alourdir.",
      Princesse:
        "Un bustier travaillé porte le regard vers le haut, et l'ampleur de la jupe répond au buste sans le concurrencer.",
    },
    detail:
      "Le décolleté en V ou en cœur ouvre le buste et allonge le cou. C'est souvent lui, plus que la coupe, qui fait basculer un essayage.",
  },

  A: {
    question: "Quelle robe pour une silhouette en A ?",
    promesse: "Un haut de robe travaillé, une jupe qui s'ouvre : l'équilibre se fait seul.",
    reperes: [
      {
        titre: "Le repère",
        texte: "Vos hanches sont plus larges que vos épaules, et votre taille se dessine nettement.",
      },
      {
        titre: "Le haut",
        texte:
          "Les épaules sont fines — souvent plus étroites qu'on ne le croit soi-même en s'habillant.",
      },
      {
        titre: "Devant le miroir",
        texte: "Une veste cintrée vous va sans retouche, alors que les jupes droites tirent.",
      },
    ],
    proportions: "Épaules plus étroites que les hanches, taille marquée.",
    pourquoi: {
      Princesse:
        "Tout se joue sur le bustier : broderie, drapé, encolure. L'ampleur de la jupe, elle, ne demande rien — elle répond aux hanches sans y toucher.",
      Trapèze:
        "La jupe s'ouvre dès la taille et suit les hanches au lieu de les épouser. C'est la coupe la plus facile à porter une journée entière.",
      Fluide:
        "Elle ne cherche pas l'équilibre, elle passe à côté — et c'est parfois exactement ce qu'on veut quand on refuse une robe qui construit.",
      "Deux en un":
        "Une surjupe qui se retire au dîner : deux volumes dans la même soirée, et l'occasion de vivre les deux avant de trancher.",
    },
    detail:
      "Une encolure bateau ou un bustier droit élargit visuellement l'épaule. Deux centimètres de tissu suffisent à changer toute la proportion.",
  },

  V: {
    question: "Quelle robe pour une silhouette en V ?",
    promesse: "Adoucir l'épaule, donner de l'ampleur au bas : la robe rééquilibre sans effort.",
    reperes: [
      {
        titre: "Le repère",
        texte: "Vos épaules sont larges, vos hanches plus étroites, et la taille se devine peu.",
      },
      {
        titre: "Le haut",
        texte:
          "Les bretelles ne glissent jamais. C'est plutôt le bas des robes qui vous paraît étroit.",
      },
      {
        titre: "Devant le miroir",
        texte: "Les décolletés profonds vous vont : ils cassent la ligne horizontale des épaules.",
      },
    ],
    proportions: "Épaules larges, hanches étroites, silhouette sportive.",
    pourquoi: {
      Fluide:
        "Rien n'est construit aux épaules. Le tissu tombe depuis le buste, et le haut du corps cesse d'être le point d'appui de la robe.",
      Princesse:
        "L'ampleur de la jupe donne au bas la place qu'il n'a pas naturellement. L'épaule, du coup, ne mène plus la silhouette.",
      Trapèze:
        "Le même effet, en plus discret : la jupe s'ouvre, la ligne s'équilibre, et la robe reste simple à vivre.",
      "Deux en un":
        "La surjupe ajoute du volume au bas quand vous le voulez, et le retire quand vient le moment de danser.",
    },
    detail:
      "Le décolleté en V, croisé ou asymétrique, brise la largeur d'un trait vertical. C'est le détail qui compte le plus ici.",
  },

  H: {
    question: "Quelle robe pour une silhouette en H ?",
    promesse: "Créer la courbe plutôt que la chercher : c'est la coupe qui la dessine.",
    reperes: [
      {
        titre: "Le repère",
        texte: "Épaules, taille et hanches sont presque sur une même ligne, droite et longue.",
      },
      {
        titre: "La taille",
        texte: "Elle existe mais se devine peu, et beaucoup de robes glissent sans s'y accrocher.",
      },
      {
        titre: "Devant le miroir",
        texte:
          "Une simple ceinture change toute votre silhouette — plus nettement que sur d'autres morphologies.",
      },
    ],
    proportions: "Ligne droite, taille peu marquée, silhouette longiligne.",
    pourquoi: {
      Sirène:
        "Elle dessine ce qui ne se voit pas encore. Ajustée jusqu'au genou puis évasée, elle crée la courbe au lieu de la souligner.",
      Fluide:
        "Cintrée à la taille ou portée avec une ceinture, elle marque là où vous le décidez, et nulle part ailleurs.",
      Minimaliste:
        "Rien ne détourne de la ligne. Sur une silhouette longue, c'est souvent la robe la plus juste.",
      Trapèze:
        "La jupe s'ouvre à partir d'une taille haute et donne du mouvement là où la ligne est droite.",
    },
    detail:
      "La coupe empire remonte la taille sous la poitrine et allonge tout ce qui suit. Elle mérite un essayage même si l'idée ne vous attirait pas sur photo.",
  },

  "8": {
    question: "Quelle robe pour une silhouette en 8 ?",
    promesse: "L'équilibre est déjà là. La robe n'a qu'à le suivre.",
    reperes: [
      {
        titre: "Le repère",
        texte: "Épaules et hanches se répondent, et la taille se creuse nettement entre les deux.",
      },
      { titre: "Les courbes", texte: "Elles sont marquées, et régulières du haut jusqu'au bas." },
      {
        titre: "Devant le miroir",
        texte: "Les vêtements cintrés vous vont sans retouche ; ce sont les coupes droites qui flottent.",
      },
    ],
    proportions: "Épaules et hanches alignées, taille creusée, courbes marquées.",
    pourquoi: {
      Sirène:
        "Elle épouse une ligne déjà proportionnée. Ajustée jusqu'au genou, elle ne corrige rien : elle suit.",
      Minimaliste:
        "Le satin ne raconte que la coupe. Sur une silhouette équilibrée, c'est le parti pris le plus fort.",
      Princesse:
        "Le bustier se cintre à la taille et l'ampleur part de là. Le contraste est net, et c'est tout l'effet recherché.",
      Fluide:
        "Portée avec une ceinture ou coupée à la taille, elle garde la ligne tout en laissant respirer.",
    },
    detail:
      "Un bustier cœur ou une encolure en V prolonge la taille vers le haut. Ici, tout ce qui se cintre fonctionne.",
  },

  X: {
    question: "Quelle robe pour une silhouette en X ?",
    promesse: "Presque toutes les coupes vous vont. C'est le style du mariage qui tranchera.",
    reperes: [
      {
        titre: "Le repère",
        texte: "Épaules et hanches sont équilibrées, et la taille est fine, bien dessinée.",
      },
      {
        titre: "Les courbes",
        texte: "Elles sont douces plutôt que prononcées, et la ligne reste harmonieuse.",
      },
      {
        titre: "Devant le miroir",
        texte: "Vous hésitez entre plusieurs styles en cabine — le plus souvent parce qu'ils vous vont tous.",
      },
    ],
    proportions: "Proportions équilibrées, taille fine, courbes douces.",
    pourquoi: {
      Sirène:
        "Ajustée puis évasée, elle suit la taille sans avoir à la créer. C'est la coupe qui en dit le plus avec le moins.",
      Princesse:
        "L'ampleur part d'une taille déjà fine : le contraste se fait tout seul, sans que la robe ait à forcer.",
      Fluide:
        "Elle ne construit rien et n'en a pas besoin. La ligne se suffit ; le tissu ne fait que l'accompagner.",
      Minimaliste:
        "Une coupe, une matière, rien d'autre. Quand les proportions sont justes, le dépouillement devient le luxe.",
      Trapèze:
        "La plus simple à vivre, et la plus discrète. Elle convient quand la robe ne doit pas être le sujet de la journée.",
    },
    detail:
      "Ici, la question n'est plus « qu'est-ce qui me va ? » mais « qu'est-ce qui me ressemble ? ». C'est une meilleure question.",
  },
};

/*
 * Ce qui compte autant que la morphologie.
 *
 * Ce bloc est le même sur les six pages, et c'est voulu : c'est un
 * principe de la maison, pas une variation de conseil.
 */
export const AU_DELA: Repere[] = [
  {
    titre: "Le style",
    texte:
      "Une robe se choisit aussi contre son type. Une silhouette en 8 peut vouloir du fluide, et avoir raison.",
  },
  {
    titre: "Le lieu",
    texte:
      "Une traîne de deux mètres sur une plage, un satin lourd en août : la robe doit tenir la journée, pas seulement la photographie.",
  },
  {
    titre: "Le confort",
    texte:
      "Vous la porterez douze heures. Si vous ne pouvez ni vous asseoir ni lever les bras, aucune coupe ne rattrapera cela.",
  },
  {
    titre: "L'émotion",
    texte:
      "C'est le seul critère qui décide vraiment. En cabine, les mariées savent en trente secondes — bien avant d'avoir regardé la coupe.",
  },
];
