import type { Lettre } from "@/lib/madamoon";
import type { Article } from "@/lib/questions";

/*
 * Les questions des pages de morphologie, et leurs pages.
 *
 * En bas de chaque page de morphologie, une liste de questions — la
 * question seule, et un bouton « Savoir plus » qui mène à sa page. La
 * page dédiée donne la réponse courte en tête, puis la développe, comme
 * celles de la FAQ.
 *
 * Les questions viennent de la maison ; les réponses s'en tiennent à ce
 * que le site sait déjà : les repères de chaque morphologie, les coupes
 * qu'elle conseille et pourquoi, et les robes que la boutique a
 * elle-même associées à cette morphologie sur ses fiches produit. Ce qui
 * relève du conseil général — l'effet d'une couture sous la poitrine,
 * d'une matière stretch — est écrit comme un conseil. Ce que le
 * catalogue n'a pas — aucune robe n'y est classée « empire » — est dit
 * tel quel.
 *
 * Les adresses vivent sous celle de la morphologie : /morphologies/o/…
 * Elles portent les mots de la recherche, pas le rang de la question.
 *
 * Une morphologie absente de cette table garde ses anciennes questions,
 * celles de « lib/morphologies.ts », jusqu'à ce que la maison envoie les
 * siennes.
 */

export type QuestionMorpho = Article & {
  q: string;
  /* La réponse courte : en tête de la page dédiée. */
  r: string;
};

export const QUESTIONS_MORPHO: Partial<Record<Lettre, QuestionMorpho[]>> = {
  O: [
    /* ——————————————————————————————————————— quelle robe ————— */
    {
      slug: "quelle-robe-de-mariee-morphologie-o",
      q: "Quelle robe de mariée choisir pour une morphologie en O ?",
      r: "Commencez par les coupes fluides et trapèze : le tissu descend d'un seul tenant, sans serrer, et la ligne paraît plus longue. Choisissez un décolleté en V ou en cœur, qui ouvre le buste. La princesse et la sirène valent aussi l'essai : aucune robe n'est interdite.",
      description:
        "Robe de mariée et morphologie en O : les coupes fluides et trapèze en premier, un décolleté en V ou en cœur. Les conseils de la boutique MADAMOON, Paris 10e.",
      chapo:
        "Un tombé qui glisse, un décolleté qui ouvre le buste : avec une morphologie en O, la ligne s'allonge d'elle-même. Voici par où commencer, et pourquoi.",
      sections: [
        {
          titre: "Les deux coupes à essayer en premier",
          texte: [
            "La robe fluide ne serre nulle part. Le tissu descend d'un seul tenant, du buste à l'ourlet, et la ligne paraît plus longue qu'elle ne l'est.",
            "La trapèze tient le buste et ouvre la jupe en A dès la taille. Le regard s'arrête sur le décolleté, et la robe laisse tout le reste libre.",
          ],
        },
        {
          titre: "Celles qui valent l'essai",
          texte: [
            "La princesse porte le regard vers le haut avec son bustier travaillé, et l'ampleur de sa jupe répond au buste sans le concurrencer. La sirène, elle, demande une matière qui tient — un crêpe plutôt qu'un satin léger.",
            "Une morphologie n'interdit aucune robe : elle indique seulement par quoi commencer.",
          ],
        },
        {
          titre: "Le détail qui fait basculer",
          texte: [
            "Le décolleté en V ou en cœur ouvre le buste et allonge le cou. C'est souvent lui, plus que la coupe, qui fait basculer un essayage.",
            "Parmi les robes que la boutique conseille pour une morphologie en O : Dove, fluide en satin mat au décolleté drapé ; Marie, fluide de Monica Loretti ; Emerald, trapèze au décolleté en V ; Monica, trapèze en jacquard avec ceinture.",
          ],
        },
      ],
      aRetenir: [
        "Fluide et trapèze en premier.",
        "Un décolleté en V ou en cœur.",
        "Princesse et sirène valent l'essai.",
      ],
      liens: [
        { href: "/morphologies/o", label: "La morphologie en O" },
        { href: "/robes/dove", label: "Dove" },
        { href: "/robes/emerald", label: "Emerald" },
        { href: "/coupes/fluide", label: "Les robes fluides" },
      ],
    },

    /* ——————————————————————————————————————— la reconnaître ————— */
    {
      slug: "reconnaitre-morphologie-o",
      q: "Comment reconnaître une morphologie en O ?",
      r: "Vos épaules et vos hanches sont d'une largeur proche, et c'est la taille qui prend le plus de place ; la poitrine est généreuse et se remarque en premier. Devant le miroir, la main descend des épaules aux hanches sans rencontrer de creux net à la taille.",
      description:
        "Reconnaître une morphologie en O : épaules et hanches proches, taille peu creusée, poitrine généreuse. Trois repères simples, dont un devant le miroir.",
      chapo:
        "Trois repères suffisent, et l'un d'eux se vérifie devant un miroir : la lecture seule ne suffit jamais à se situer.",
      sections: [
        {
          titre: "Les trois repères",
          texte: [],
          liste: [
            "Le repère — vos épaules et vos hanches sont d'une largeur proche, et c'est la taille qui prend le plus de place.",
            "La poitrine — elle est généreuse et se remarque en premier. Beaucoup de robes s'écrivent à partir de là.",
            "Devant le miroir — la main descend des épaules aux hanches sans rencontrer de creux net à la taille.",
          ],
        },
        {
          titre: "À ne pas confondre",
          texte: [
            "La morphologie en H a elle aussi une taille peu marquée, mais sur une ligne droite, sans la poitrine ni les courbes du O. La morphologie en 8 a des épaules et des hanches équilibrées comme le O, mais une taille nettement marquée.",
          ],
        },
        {
          titre: "Une silhouette, pas une étiquette",
          texte: [
            "Beaucoup de mariées se trouvent entre deux morphologies. Ce n'est pas un problème : les coupes conseillées se recoupent, et c'est l'essayage qui tranche. Si vous hésitez, Élise, la conseillère du site, vous oriente en trois questions.",
          ],
        },
      ],
      aRetenir: [
        "Épaules et hanches proches.",
        "Taille peu creusée, poitrine généreuse.",
        "Pas de creux net à la taille devant le miroir.",
      ],
      liens: [
        { href: "/morphologies/o", label: "La morphologie en O" },
        { href: "/morphologies", label: "Les six morphologies" },
        { href: "/trouver-ma-robe", label: "Trouver ma robe avec Élise" },
      ],
    },

    /* ——————————————————————————————————— les courbes généreuses ————— */
    {
      slug: "robe-de-mariee-courbes-genereuses",
      q: "Quelle coupe de robe de mariée convient à une silhouette avec des courbes généreuses ?",
      r: "Une coupe qui accompagne les courbes sans les comprimer : la fluide, qui glisse le long du corps, et la trapèze, qui s'ouvre en A dès la taille. Si votre taille est marquée, la sirène et la princesse les soulignent aussi très bien.",
      description:
        "Robe de mariée pour des courbes généreuses : fluide et trapèze, ou sirène et princesse si la taille est marquée. Les conseils de la boutique MADAMOON, Paris.",
      chapo:
        "Des courbes généreuses n'appellent pas une seule coupe : tout dépend d'où elles se trouvent. Voici comment s'y retrouver.",
      sections: [
        {
          titre: "Si les courbes sont au buste et à la taille",
          texte: [
            "C'est la morphologie en O. Les coupes fluides et trapèze viennent en premier : elles ne serrent pas la taille, laissent le tissu descendre d'un seul tenant et allongent la ligne. Un décolleté en V ou en cœur met la poitrine en valeur.",
          ],
        },
        {
          titre: "Si la taille est bien marquée",
          texte: [
            "C'est plutôt une morphologie en 8 : épaules et hanches équilibrées, taille creusée. Toutes les coupes conviennent alors. Les sirènes épousent les courbes, et tout ce qui se cintre à la taille accentue l'équilibre naturel.",
          ],
        },
        {
          titre: "Ce qui compte autant que la coupe",
          texte: [
            "La matière et le maintien. Un crêpe ou un satin mat tiennent mieux qu'un tissu trop léger ; un corset ou un bustier structuré soutient la poitrine. Plusieurs robes de la boutique ont un corset travaillé, comme Carrie, au corset perlé à la main, ou Ember.",
          ],
        },
      ],
      aRetenir: [
        "Courbes au buste et à la taille : fluide, trapèze.",
        "Taille marquée : toutes les coupes, la sirène en tête.",
        "Une matière qui tient, un buste bien soutenu.",
      ],
      liens: [
        { href: "/morphologies/o", label: "La morphologie en O" },
        { href: "/morphologies/8", label: "La morphologie en 8" },
        { href: "/coupes", label: "Les coupes" },
      ],
    },

    /* ——————————————————————————————————————— la trapèze ————— */
    {
      slug: "robe-trapeze-morphologie-o",
      q: "Une robe de mariée trapèze convient-elle à une morphologie en O ?",
      r: "Oui, c'est l'une des deux coupes à essayer en premier. Le buste est tenu, la jupe part en A dès la taille : le regard s'arrête sur le décolleté, et la robe laisse tout le reste libre.",
      description:
        "Robe de mariée trapèze et morphologie en O : l'une des deux coupes à essayer en premier. Pourquoi elle fonctionne, et les trapèzes de MADAMOON, Paris.",
      chapo:
        "La trapèze est la coupe la plus universelle du catalogue, et l'une des deux que la boutique conseille d'abord pour une morphologie en O.",
      sections: [
        {
          titre: "Pourquoi elle fonctionne",
          texte: [
            "Le buste est tenu, puis la jupe s'ouvre en A dès la taille, sans la serrer ni la marquer. Le regard s'arrête sur le décolleté, et la robe laisse tout le reste libre.",
          ],
        },
        {
          titre: "Ce qu'il faut regarder",
          texte: [
            "Le décolleté d'abord : un V ou un cœur ouvre le buste. La matière ensuite : un tulle ou une dentelle légère donnent une jupe aérienne, un satin une ligne plus nette.",
          ],
        },
        {
          titre: "Les trapèzes de la boutique",
          texte: ["Parmi celles que la boutique conseille pour une morphologie en O :"],
          liste: [
            "Emerald — corsage perlé, décolleté en V, jupe de tulle ou de satin ;",
            "Monica — jacquard floral, décolleté en V, ceinture ;",
            "Solana — appliqués de dentelle et sequins mats ;",
            "Finell — bustier cœur en satin ;",
            "Pendant — dentelle et manches longues.",
          ],
        },
      ],
      aRetenir: [
        "Oui : l'une des deux coupes à essayer en premier.",
        "La jupe s'ouvre dès la taille, sans la serrer.",
        "Avec un décolleté en V ou en cœur.",
      ],
      liens: [
        { href: "/coupes/trapeze", label: "Les robes trapèze" },
        { href: "/robes/emerald", label: "Emerald" },
        { href: "/robes/monica", label: "Monica" },
        { href: "/morphologies/o", label: "La morphologie en O" },
      ],
    },

    /* ——————————————————————————————————————— la robe empire ————— */
    {
      slug: "robe-empire-morphologie-o",
      q: "Une robe empire est-elle adaptée à une morphologie en O ?",
      r: "Oui, c'est une piste naturelle : la couture placée sous la poitrine met le buste en valeur, puis la jupe tombe librement, sans marquer la taille. La boutique ne classe pas ses robes en « empire » : ce sont ses modèles fluides qui s'en rapprochent le plus.",
      description:
        "Robe de mariée empire et morphologie en O : une taille haute sous la poitrine, une jupe libre. Pourquoi elle convient, et les robes qui s'en approchent.",
      chapo:
        "La ligne empire place la taille juste sous la poitrine. Pour une morphologie en O, c'est une idée qui tombe juste — voici pourquoi.",
      sections: [
        {
          titre: "Ce qu'est une robe empire",
          texte: [
            "Une robe empire a sa taille placée haut, juste sous la poitrine, et une jupe qui descend ensuite droite ou légèrement évasée.",
          ],
        },
        {
          titre: "Pourquoi elle sert une morphologie en O",
          texte: [
            "Elle fait exactement ce que la morphologie demande : mettre la poitrine en valeur et allonger la ligne. Le regard s'arrête sur le buste, et la jupe passe sur la taille sans la marquer.",
          ],
        },
        {
          titre: "Chez MADAMOON",
          texte: [
            "Le catalogue de la boutique se range en cinq coupes — sirène, princesse, fluide, trapèze, deux en un — et aucune robe n'y est classée « empire ». Les robes fluides sont celles qui s'en rapprochent le plus : un tombé d'un seul tenant, qui ne serre nulle part.",
            "Si c'est cette ligne que vous cherchez, dites-le en prenant rendez-vous : la boutique vous proposera les modèles qui s'en approchent.",
          ],
        },
      ],
      aRetenir: [
        "Oui : la taille haute met le buste en valeur.",
        "La jupe tombe sans marquer la taille.",
        "À la boutique : les robes fluides s'en rapprochent.",
      ],
      liens: [
        { href: "/coupes/fluide", label: "Les robes fluides" },
        { href: "/morphologies/o", label: "La morphologie en O" },
        { href: "/rendez-vous", label: "Prendre rendez-vous" },
      ],
    },

    /* ——————————————————————————————————————— la sirène ————— */
    {
      slug: "robe-sirene-morphologie-o",
      q: "Peut-on porter une robe de mariée sirène avec une morphologie en O ?",
      r: "Oui. Une morphologie n'interdit aucune robe, elle indique seulement par quoi commencer. La sirène demande une matière qui tient — un crêpe plutôt qu'un satin léger — et se juge en cabine bien mieux que sur photographie.",
      description:
        "Robe de mariée sirène et morphologie en O : oui, avec une matière qui tient, comme le crêpe. Ce qu'il faut regarder, et les sirènes de MADAMOON, Paris.",
      chapo:
        "La sirène n'est pas la première coupe conseillée pour une morphologie en O, mais elle vaut l'essai. Voici comment la choisir.",
      sections: [
        {
          titre: "Oui, avec la bonne matière",
          texte: [
            "La sirène épouse la silhouette jusqu'aux genoux avant de s'évaser. Elle demande donc une matière qui tient et qui lisse : un crêpe plutôt qu'un satin léger, qui marquerait tout.",
          ],
        },
        {
          titre: "Elle se juge portée",
          texte: [
            "Sur une photographie, une sirène paraît exigeante. En cabine, c'est souvent une autre histoire. Essayez-la après les fluides et les trapèzes, pour comparer : c'est l'essayage qui tranche.",
          ],
        },
        {
          titre: "Les sirènes de la boutique",
          texte: [
            "Zina, sirène à fente de Casablanca Bridal, fait partie des robes que la boutique conseille pour une morphologie en O. Plusieurs sirènes du catalogue sont en crêpe : Mira et Milan de Monica Loretti, Bondi, ou Shiloh, dont la jupe est en crêpe.",
          ],
        },
      ],
      aRetenir: [
        "Oui : aucune robe n'est interdite.",
        "Une matière qui tient, comme le crêpe.",
        "À essayer après les fluides et les trapèzes.",
      ],
      liens: [
        { href: "/coupes/sirene", label: "Les robes sirène" },
        { href: "/robes/zina", label: "Zina" },
        { href: "/robes/mira", label: "Mira" },
      ],
    },

    /* ——————————————————————————————————————— le décolleté ————— */
    {
      slug: "decollete-robe-de-mariee-poitrine-genereuse",
      q: "Quel décolleté choisir pour une robe de mariée quand on a une poitrine généreuse ?",
      r: "Le V et le cœur en premier : ils ouvrent le buste, allongent le cou et dessinent la poitrine sans l'enfermer. Un décolleté drapé fonctionne aussi. Dans tous les cas, c'est le maintien intérieur — un corset, un bustier structuré — qui fait la différence.",
      description:
        "Robe de mariée et poitrine généreuse : un décolleté en V ou en cœur, un drapé, et un bon maintien. Les conseils et les robes de la boutique MADAMOON, Paris.",
      chapo:
        "Avec une poitrine généreuse, le décolleté compte souvent plus que la coupe. Voici ceux qui la servent le mieux.",
      sections: [
        {
          titre: "Le V et le cœur",
          texte: [
            "Ils ouvrent le buste et allongent le cou, sans enfermer la poitrine. C'est souvent ce détail, plus que la coupe, qui fait basculer un essayage.",
            "Dans le catalogue : Emerald, Monica et Livia ont un décolleté en V ; Finell, un bustier cœur.",
          ],
        },
        {
          titre: "Les autres options",
          texte: [
            "Un décolleté drapé, comme celui de Dove, adoucit le buste. Des bretelles tombantes, comme celles d'Addison, encadrent les épaules. Un col carré, plus graphique, se juge à l'essayage.",
          ],
        },
        {
          titre: "Le maintien",
          texte: [
            "Un corset ou un bustier structuré soutient la poitrine, et c'est lui qui permet de porter le décolleté qu'on aime. Les couturières de la boutique ajustent ce maintien au fil des essayages.",
          ],
        },
      ],
      aRetenir: [
        "Le V et le cœur en premier.",
        "Un drapé adoucit le buste.",
        "Un corset ou un bustier structuré pour le maintien.",
      ],
      liens: [
        { href: "/robes/emerald", label: "Emerald" },
        { href: "/robes/finell", label: "Finell" },
        { href: "/robes/dove", label: "Dove" },
        { href: "/morphologies/o", label: "La morphologie en O" },
      ],
    },

    /* ——————————————————————————————————————— la matière ————— */
    {
      slug: "matiere-robe-de-mariee-fluide-confortable",
      q: "Quelle matière privilégier pour une robe de mariée fluide et confortable ?",
      r: "La mousseline et le crêpe, souples et légers, suivent le mouvement sans marquer ; un satin mat donne plus de tenue tout en restant fluide. Une version stretch ajoute de l'aisance pour une longue journée.",
      description:
        "Robe de mariée fluide et confortable : mousseline, crêpe, satin mat, versions stretch. Comment choisir sa matière, avec les robes de la boutique MADAMOON.",
      chapo:
        "Une robe fluide tient d'abord à sa matière. Voici celles qui bougent bien, et ce qu'elles changent à la journée.",
      sections: [
        {
          titre: "La mousseline",
          texte: [
            "Légère et vaporeuse, elle flotte autour du corps. Maribel, de Casablanca Bridal, est en mousseline stretch ; Hélène associe une jupe fluide en mousseline à un corset perlé.",
          ],
        },
        {
          titre: "Le crêpe",
          texte: [
            "Plus dense, il lisse la silhouette et tombe droit. Il tient bien la forme sans marquer — c'est aussi la matière à préférer pour une sirène.",
          ],
        },
        {
          titre: "Le satin mat",
          texte: [
            "Il donne de la tenue et une lumière douce, sans les reflets d'un satin brillant. Dove, robe fluide de Casablanca Bridal, est en satin mat.",
          ],
        },
        {
          titre: "Le confort d'une journée",
          texte: [
            "Une matière stretch suit le corps et laisse bouger librement. Un conseil : à l'essayage, asseyez-vous, levez les bras, faites quelques pas de danse. Mathilda, de Monica Loretti, a été pensée pour le confort, jusqu'aux mariées enceintes.",
          ],
        },
      ],
      aRetenir: [
        "Mousseline : légère et vaporeuse.",
        "Crêpe : lisse, tombe droit.",
        "Satin mat : de la tenue, une lumière douce.",
        "Stretch : l'aisance d'une longue journée.",
      ],
      liens: [
        { href: "/coupes/fluide", label: "Les robes fluides" },
        { href: "/robes/maribel", label: "Maribel" },
        { href: "/robes/mathilda", label: "Mathilda" },
      ],
    },

    /* ——————————————————————————————————— la taille, sans comprimer ————— */
    {
      slug: "robe-de-mariee-souligner-la-taille",
      q: "Comment choisir une robe de mariée qui souligne la taille sans comprimer ?",
      r: "Plutôt qu'une taille serrée, cherchez une taille dessinée : une ceinture, une couture, un drapé ou un jeu de matières qui crée la ligne sans contraindre. Un corset bien ajusté par les couturières soutient sans comprimer.",
      description:
        "Souligner la taille sans la comprimer : ceinture, taille basque, drapé, corset ajusté. Les conseils MADAMOON pour une robe de mariée confortable.",
      chapo:
        "Marquer la taille ne veut pas dire la serrer. Voici les détails qui la dessinent, et pourquoi l'ajustement compte plus que tout.",
      sections: [
        {
          titre: "Dessiner plutôt que serrer",
          texte: [
            "Une taille se lit par une ligne, pas par une pression. Une couture bien placée, un changement de matière ou un drapé suffisent à la faire apparaître, sans rien contraindre.",
          ],
        },
        {
          titre: "Les détails qui marquent la taille",
          texte: ["Dans le catalogue de la boutique :"],
          liste: [
            "une ceinture, comme sur Monica, en jacquard floral ;",
            "une taille basque, comme sur Santana, qui descend en pointe ;",
            "un décolleté drapé, comme sur Dove, qui guide le regard ;",
            "un contraste entre un corsage travaillé et une jupe plus simple.",
          ],
        },
        {
          titre: "L'ajustement fait tout",
          texte: [
            "Une robe trop serrée comprime ; une robe bien ajustée tient. Chez MADAMOON, la robe est confectionnée à vos mesures, puis ajustée par les couturières jusqu'au dernier essayage, retouches incluses.",
          ],
        },
      ],
      aRetenir: [
        "Une taille dessinée, pas serrée.",
        "Ceinture, taille basque, drapé.",
        "Un ajustement fait sur vous, retouches incluses.",
      ],
      liens: [
        { href: "/robes/monica", label: "Monica" },
        { href: "/robes/santana", label: "Santana" },
        { href: `/faq/etapes-robe-de-mariee-sur-mesure`, label: "Les étapes du sur-mesure" },
      ],
    },

    /* ——————————————————————————————————— mettre en valeur ses courbes ————— */
    {
      slug: "robe-de-mariee-mettre-en-valeur-ses-courbes",
      q: "Quelle robe de mariée choisir pour mettre en valeur ses courbes ?",
      r: "Une robe qui suit vos courbes au lieu de les cacher : une fluide en matière souple, une trapèze qui souligne le buste, ou une sirène en crêpe si vous aimez une ligne plus près du corps. Le décolleté et la matière comptent autant que la coupe.",
      description:
        "Robe de mariée pour mettre en valeur ses courbes : suivre la silhouette plutôt que la cacher, un décolleté qui ouvre le buste, une matière qui tient.",
      chapo:
        "Mettre ses courbes en valeur, c'est d'abord cesser de vouloir les cacher. Voici comment choisir une robe qui les accompagne.",
      sections: [
        {
          titre: "Suivre plutôt que masquer",
          texte: [
            "Une robe trop ample ajoute du volume là où l'on n'en veut pas. Mieux vaut une robe qui suit la silhouette : une fluide qui glisse le long du corps, une trapèze qui tient le buste, ou une sirène si vous aimez une ligne plus près du corps.",
          ],
        },
        {
          titre: "Le buste d'abord",
          texte: [
            "Un décolleté en V ou en cœur ouvre le buste et allonge le cou. C'est souvent le détail qui change tout dans une robe.",
          ],
        },
        {
          titre: "Les matières qui sculptent",
          texte: [
            "Le crêpe et le satin mat lissent et tiennent la forme ; le mikado, plus structuré, construit une princesse. Une dentelle posée sur un corset dessine les courbes sans rien ajouter.",
          ],
        },
      ],
      aRetenir: [
        "Une robe qui suit la silhouette.",
        "Un décolleté qui ouvre le buste.",
        "Crêpe, satin mat, mikado : des matières qui tiennent.",
      ],
      liens: [
        { href: "/morphologies/o", label: "La morphologie en O" },
        { href: "/coupes", label: "Les coupes" },
        { href: "/robes", label: "Voir toutes les robes" },
      ],
    },

    /* ——————————————————————————————————————— les manches ————— */
    {
      slug: "manches-robe-de-mariee-morphologie-o",
      q: "Les manches sont-elles une bonne option pour une robe de mariée en morphologie O ?",
      r: "Oui. Longues en dentelle pour une ligne élancée, en transparence pour une touche légère, ou amovibles pour changer d'allure le soir : les manches équilibrent le haut du corps et se portent en toute saison.",
      description:
        "Robe de mariée à manches et morphologie en O : longues, illusion ou amovibles. Ce qu'elles apportent, et les robes MADAMOON qui en ont. Paris 10e.",
      chapo:
        "Les manches ont plusieurs visages, et chacune change la silhouette à sa façon. Voici ce qu'elles apportent à une morphologie en O.",
      sections: [
        {
          titre: "Des manches longues en dentelle",
          texte: [
            "Elles prolongent la ligne et donnent une allure élancée. Pendant, de Watters Designs, que la boutique conseille pour une morphologie en O, est une trapèze en dentelle à manches longues.",
          ],
        },
        {
          titre: "Des manches illusion",
          texte: [
            "Une transparence légère sur les bras, qui habille sans alourdir. Murielle, de Monica Loretti, en est un exemple, avec son décolleté plongeant.",
          ],
        },
        {
          titre: "Des manches amovibles",
          texte: [
            "Deux allures dans la même journée : avec manches pour la cérémonie, sans pour la soirée. Aster, de Watters Designs, a des manches amovibles.",
          ],
        },
        {
          titre: "Avec quel décolleté",
          texte: [
            "Gardez le buste ouvert : un décolleté en V avec des manches reste léger, et met la poitrine en valeur.",
          ],
        },
      ],
      aRetenir: [
        "Oui : elles équilibrent le haut du corps.",
        "Longues, illusion ou amovibles.",
        "Avec un décolleté ouvert, comme un V.",
      ],
      liens: [
        { href: "/robes/pendant", label: "Pendant" },
        { href: "/robes/murielle", label: "Murielle" },
        { href: "/robes/aster", label: "Aster" },
      ],
    },

    /* ——————————————————————————————————————— la première à essayer ————— */
    {
      slug: "premiere-robe-a-essayer-morphologie-o",
      q: "Quelle robe de mariée essayer en premier pour une morphologie en O ?",
      r: "Une robe fluide ou trapèze, avec un décolleté en V ou en cœur : c'est la combinaison qui sert le mieux une morphologie en O. Ensuite seulement, une princesse et une sirène, pour comparer.",
      description:
        "Morphologie en O : quelle robe de mariée essayer en premier ? Une fluide ou une trapèze, puis une princesse et une sirène pour comparer.",
      chapo:
        "L'ordre des essayages compte : il aide à comprendre ce qui vous va, et pourquoi. Voici celui que la boutique conseille pour une morphologie en O.",
      sections: [
        {
          titre: "L'ordre des essayages",
          texte: [],
          ordonnee: true,
          liste: [
            "Une robe fluide — elle ne serre nulle part et allonge la ligne.",
            "Une trapèze — le buste tenu, la jupe libre dès la taille.",
            "Une princesse — pour voir l'effet d'un bustier travaillé et d'une jupe ample.",
            "Une sirène — en crêpe, pour comparer avec une ligne près du corps.",
          ],
        },
        {
          titre: "Des robes pour commencer",
          texte: [
            "Parmi celles que la boutique conseille pour une morphologie en O : Dove et Marie, fluides ; Emerald et Monica, trapèzes au décolleté en V.",
          ],
        },
        {
          titre: "Venir préparée",
          texte: [
            "Gardez vos robes préférées dans vos coups de cœur et dites-le en réservant : elles seront prêtes à votre arrivée.",
          ],
        },
      ],
      aRetenir: [
        "D'abord une fluide ou une trapèze.",
        "Un décolleté en V ou en cœur.",
        "Puis une princesse et une sirène, pour comparer.",
      ],
      liens: [
        { href: "/robes/dove", label: "Dove" },
        { href: "/robes/marie", label: "Marie" },
        { href: "/robes/emerald", label: "Emerald" },
        { href: "/rendez-vous", label: "Prendre rendez-vous" },
      ],
    },
  ],
};

/** Les questions d'une morphologie, ou rien si elle n'en a pas encore. */
export const questionsMorpho = (lettre: Lettre) => QUESTIONS_MORPHO[lettre];
