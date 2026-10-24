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
  A: [
    /* ——————————————————————————————————————— quelle robe ————— */
    {
      slug: "quelle-robe-de-mariee-morphologie-a",
      q: "Quelle robe de mariée choisir pour une morphologie en A ?",
      r: "Commencez par les princesses et les trapèzes : un haut de robe travaillé retient le regard, et une jupe qui s'ouvre répond aux hanches sans les souligner. Une encolure bateau ou un bustier droit élargit les épaules. Les fluides et les deux en un valent aussi l'essai.",
      description:
        "Robe de mariée et morphologie en A : princesse et trapèze en premier, un haut travaillé, une jupe qui s'ouvre. Les conseils de la boutique MADAMOON, Paris.",
      chapo:
        "Un haut de robe travaillé, une jupe qui s'ouvre : avec une morphologie en A, l'équilibre se fait seul. Voici par où commencer.",
      sections: [
        {
          titre: "Les deux coupes à essayer en premier",
          texte: [
            "La princesse joue tout sur le bustier : broderie, drapé, encolure. L'ampleur de sa jupe ne demande rien — elle répond aux hanches sans y toucher.",
            "La trapèze ouvre sa jupe dès la taille et suit les hanches au lieu de les épouser. C'est la coupe la plus facile à porter une journée entière.",
          ],
        },
        {
          titre: "Celles qui valent l'essai",
          texte: [
            "La fluide ne cherche pas l'équilibre, elle passe à côté — et c'est parfois exactement ce qu'on veut quand on refuse une robe qui construit. La deux en un, avec sa surjupe qui se retire au dîner, offre deux volumes dans la même soirée.",
          ],
        },
        {
          titre: "Le détail qui change la proportion",
          texte: [
            "Une encolure bateau ou un bustier droit élargit visuellement les épaules. Quelques centimètres de ligne en haut suffisent à changer toute la silhouette.",
          ],
        },
      ],
      aRetenir: [
        "Princesse et trapèze en premier.",
        "Un haut de robe travaillé.",
        "Une encolure qui élargit les épaules.",
      ],
      liens: [
        { href: "/morphologies/a", label: "La morphologie en A" },
        { href: "/coupes/princesse", label: "Les robes princesse" },
        { href: "/coupes/trapeze", label: "Les robes trapèze" },
      ],
    },

    /* ——————————————————————————————————————— la reconnaître ————— */
    {
      slug: "reconnaitre-morphologie-a",
      q: "Comment reconnaître une morphologie en A ou pyramide ?",
      r: "Vos hanches sont plus larges que vos épaules, et votre taille se dessine nettement ; les épaules sont fines. Devant le miroir, une veste cintrée vous va sans retouche, alors que les jupes droites tirent sur les hanches.",
      description:
        "Reconnaître une morphologie en A, dite pyramide : des hanches plus larges que les épaules, une taille marquée, des épaules fines. Trois repères simples.",
      chapo:
        "On l'appelle aussi « pyramide » ou « triangle ». Trois repères suffisent pour s'y reconnaître, dont un devant le miroir.",
      sections: [
        {
          titre: "Les trois repères",
          texte: [],
          liste: [
            "Le repère — vos hanches sont plus larges que vos épaules, et votre taille se dessine nettement.",
            "Le haut — les épaules sont fines.",
            "Devant le miroir — une veste cintrée vous va sans retouche, alors que les jupes droites tirent.",
          ],
        },
        {
          titre: "À ne pas confondre",
          texte: [
            "La morphologie en V est son contraire : des épaules larges et des hanches plus étroites. La morphologie en 8 a une taille marquée comme le A, mais des épaules et des hanches équilibrées.",
          ],
        },
        {
          titre: "Une silhouette, pas une étiquette",
          texte: [
            "Beaucoup de mariées se trouvent entre deux morphologies. Les coupes conseillées se recoupent, et c'est l'essayage qui tranche. Si vous hésitez, Élise, la conseillère du site, vous oriente en trois questions.",
          ],
        },
      ],
      aRetenir: [
        "Hanches plus larges que les épaules.",
        "Une taille bien dessinée.",
        "Les jupes droites tirent sur les hanches.",
      ],
      liens: [
        { href: "/morphologies/a", label: "La morphologie en A" },
        { href: "/morphologies", label: "Les six morphologies" },
        { href: "/trouver-ma-robe", label: "Trouver ma robe avec Élise" },
      ],
    },

    /* ——————————————————————————— des épaules plus étroites ————— */
    {
      slug: "equilibrer-epaules-etroites-hanches",
      q: "Quelle coupe permet d'équilibrer des épaules plus étroites que les hanches ?",
      r: "La princesse et la trapèze : leur haut structuré élargit la ligne des épaules, et leur jupe s'ouvre dès la taille pour accompagner les hanches. L'équilibre se fait par le haut, jamais en cachant le bas.",
      description:
        "Équilibrer des épaules plus étroites que les hanches : une princesse ou une trapèze, un haut structuré, une jupe qui s'ouvre dès la taille. Conseils MADAMOON.",
      chapo:
        "Équilibrer une silhouette, ce n'est pas cacher ce qu'on aime moins : c'est donner au reste de quoi répondre. Voici comment.",
      sections: [
        {
          titre: "Par le haut, jamais en cachant le bas",
          texte: [
            "Une encolure bateau ou un bustier droit ajoutent quelques centimètres de ligne aux épaules, et cela suffit à changer toute la proportion. La jupe, elle, n'a rien à démontrer.",
          ],
        },
        {
          titre: "Les deux coupes qui le font le mieux",
          texte: [
            "La princesse, avec son bustier travaillé et l'ampleur de sa jupe, qui répond aux hanches sans y toucher. La trapèze, dont la jupe s'ouvre dès la taille et suit les hanches au lieu de les épouser.",
          ],
        },
        {
          titre: "Des épaules qui prennent de la place",
          texte: [
            "Des épaules dénudées, comme sur Trinity ou Kensington, des bretelles tombantes, comme sur Addison, ou un col carré, comme sur Dolores, élargissent aussi la ligne du haut.",
          ],
        },
      ],
      aRetenir: [
        "Princesse ou trapèze.",
        "Un haut structuré, qui élargit les épaules.",
        "Une jupe qui s'ouvre dès la taille.",
      ],
      liens: [
        { href: "/robes/trinity", label: "Trinity" },
        { href: "/robes/addison", label: "Addison" },
        { href: "/morphologies/a", label: "La morphologie en A" },
      ],
    },

    /* ——————————————————————————————————————— la princesse ————— */
    {
      slug: "robe-princesse-morphologie-a",
      q: "Une robe de mariée princesse convient-elle à une morphologie en A ?",
      r: "Oui, c'est l'une des deux coupes à essayer en premier. Tout se joue sur le bustier — broderie, drapé, encolure —, et l'ampleur de la jupe répond aux hanches sans y toucher.",
      description:
        "Robe de mariée princesse et morphologie en A : l'une des deux coupes à essayer en premier. Pourquoi elle fonctionne, et les princesses de MADAMOON, Paris.",
      chapo:
        "La princesse est faite pour une morphologie en A : elle travaille le haut et laisse la jupe faire le reste.",
      sections: [
        {
          titre: "Pourquoi elle fonctionne",
          texte: [
            "Le bustier retient le regard : il est brodé, drapé, structuré. La jupe, ample, répond aux hanches sans les souligner — elle ne les épouse pas, elle les accompagne.",
          ],
        },
        {
          titre: "Ce qu'il faut regarder",
          texte: [
            "Le bustier d'abord : c'est lui qui fait la robe. Puis l'encolure, qui peut élargir les épaules. Le mikado, matière structurée, donne à la jupe une ampleur nette ; le tulle, une ampleur plus légère.",
          ],
        },
        {
          titre: "Les princesses de la boutique",
          texte: ["Parmi elles :"],
          liste: [
            "Trinity — mikado ou jacquard, épaules dénudées ;",
            "Fern — mikado brodé de fleurs de perles ;",
            "Kensington — mikado, épaules dénudées ;",
            "Addison — satin de soie, bretelles tombantes amovibles ;",
            "Ember — corset structuré, silhouette couture.",
          ],
        },
      ],
      aRetenir: [
        "Oui : l'une des deux coupes à essayer en premier.",
        "Tout se joue sur le bustier.",
        "La jupe répond aux hanches sans les souligner.",
      ],
      liens: [
        { href: "/coupes/princesse", label: "Les robes princesse" },
        { href: "/robes/fern", label: "Fern" },
        { href: "/robes/kensington", label: "Kensington" },
        { href: "/morphologies/a", label: "La morphologie en A" },
      ],
    },

    /* ——————————————————————————————————————— la trapèze ————— */
    {
      slug: "robe-trapeze-morphologie-a",
      q: "Une robe trapèze est-elle adaptée à une morphologie en A ?",
      r: "Oui, c'est l'une des deux coupes à essayer en premier. Sa jupe s'ouvre dès la taille et suit les hanches au lieu de les épouser : c'est la coupe la plus facile à porter une journée entière.",
      description:
        "Robe de mariée trapèze et morphologie en A : l'une des deux coupes à essayer en premier, la plus facile à porter. Les trapèzes de MADAMOON, Paris 10e.",
      chapo:
        "La trapèze porte bien son nom : elle a déjà la forme d'une silhouette en A, et c'est pour cela qu'elle lui va si naturellement.",
      sections: [
        {
          titre: "Pourquoi elle fonctionne",
          texte: [
            "La jupe s'ouvre dès la taille et suit les hanches sans les mouler. La taille, bien dessinée chez une morphologie en A, reste marquée ; le haut est libre de retenir le regard.",
          ],
        },
        {
          titre: "Ce qu'il faut regarder",
          texte: [
            "Le corsage : perlé, brodé ou en dentelle, il équilibre les hanches. Et l'encolure : un décolleté droit, comme sur Nirali, ou un bustier cœur, comme sur Finell, structurent le haut.",
          ],
        },
        {
          titre: "Les trapèzes de la boutique",
          texte: ["Parmi elles :"],
          liste: [
            "Emerald — corsage perlé, décolleté en V ;",
            "Carrie — pailletée, corset perlé à la main ;",
            "Finell — bustier cœur en satin ;",
            "Solana — appliqués de dentelle et sequins mats ;",
            "Charlotte — dentelle Caterina.",
          ],
        },
      ],
      aRetenir: [
        "Oui : l'une des deux coupes à essayer en premier.",
        "La jupe suit les hanches sans les mouler.",
        "Un corsage travaillé pour équilibrer.",
      ],
      liens: [
        { href: "/coupes/trapeze", label: "Les robes trapèze" },
        { href: "/robes/emerald", label: "Emerald" },
        { href: "/robes/carrie", label: "Carrie" },
        { href: "/morphologies/a", label: "La morphologie en A" },
      ],
    },

    /* ——————————————————————————————————————— la sirène ————— */
    {
      slug: "robe-sirene-morphologie-a",
      q: "Peut-on porter une robe sirène avec une morphologie en A ?",
      r: "Oui, à condition que le haut ait de quoi équilibrer : une manche, une bretelle large, un décolleté travaillé. Beaucoup de mariées en A repartent avec une sirène qu'elles n'avaient pas prévu d'essayer.",
      description:
        "Robe de mariée sirène et morphologie en A : oui, avec un haut qui équilibre — manches, bretelles, décolleté travaillé. Les sirènes de MADAMOON, Paris.",
      chapo:
        "La sirène épouse les hanches : on la croit déconseillée pour une morphologie en A. Elle se porte pourtant très bien — voici à quelle condition.",
      sections: [
        {
          titre: "Oui, avec un haut qui équilibre",
          texte: [
            "La sirène souligne les hanches et la taille. Pour qu'elle équilibre la silhouette, le haut doit avoir du poids : une manche, une bretelle large, un décolleté travaillé.",
          ],
        },
        {
          titre: "Elle se juge portée",
          texte: [
            "Beaucoup de mariées en A repartent avec une sirène qu'elles n'avaient pas prévu d'essayer. Essayez-la après les princesses et les trapèzes, pour comparer.",
          ],
        },
        {
          titre: "Les sirènes de la boutique",
          texte: [
            "Montana, en satin mat, a des manches longues en dentelle et un dos illusion : un haut qui a de quoi équilibrer. Shiloh associe une dentelle de Chantilly à une jupe en crêpe ; Zina a une fente et des fleurs 3D optionnelles.",
          ],
        },
      ],
      aRetenir: [
        "Oui, avec un haut qui équilibre.",
        "Manches, bretelles larges, décolleté travaillé.",
        "À essayer après les princesses et les trapèzes.",
      ],
      liens: [
        { href: "/coupes/sirene", label: "Les robes sirène" },
        { href: "/robes/montana", label: "Montana" },
        { href: "/robes/shiloh", label: "Shiloh" },
      ],
    },

    /* ——————————————————————————————————————— l'encolure ————— */
    {
      slug: "decollete-elargir-les-epaules",
      q: "Quel décolleté choisir pour élargir visuellement la ligne des épaules ?",
      r: "Une encolure bateau ou un bustier droit : ils tracent une ligne horizontale qui élargit les épaules. Des épaules dénudées, des bretelles tombantes ou un col carré produisent le même effet.",
      description:
        "Élargir visuellement les épaules : encolure bateau, bustier droit, épaules dénudées, bretelles tombantes, col carré. Les conseils de la boutique MADAMOON.",
      chapo:
        "Quelques centimètres de ligne en haut suffisent à changer toute la proportion. Voici les décolletés qui les donnent.",
      sections: [
        {
          titre: "L'encolure bateau et le bustier droit",
          texte: [
            "Tous deux tracent une ligne horizontale, d'une épaule à l'autre, qui élargit le haut du corps. Ce sont les encolures que la boutique conseille d'abord pour une morphologie en A.",
            "Aucune robe du catalogue n'est décrite avec une encolure bateau. Nirali, de Watters Designs, a un décolleté droit ; Fortune, un bustier.",
          ],
        },
        {
          titre: "Les épaules dénudées et les bretelles tombantes",
          texte: [
            "Elles prolongent la ligne au-delà des épaules. Trinity, Kensington et Dove ont les épaules dénudées ; Addison, des bretelles tombantes amovibles ; Hera, des bretelles tombantes.",
          ],
        },
        {
          titre: "Le col carré",
          texte: [
            "Plus graphique, il dessine une ligne nette sur le buste. Dolores, Clover Perles et River ont un col ou un décolleté carré.",
          ],
        },
      ],
      aRetenir: [
        "Encolure bateau ou bustier droit.",
        "Épaules dénudées, bretelles tombantes.",
        "Un col carré, plus graphique.",
      ],
      liens: [
        { href: "/robes/nirali", label: "Nirali" },
        { href: "/robes/kensington", label: "Kensington" },
        { href: "/robes/dolores", label: "Dolores" },
        { href: "/morphologies/a", label: "La morphologie en A" },
      ],
    },

    /* ——————————————————————————————————————— le bustier ————— */
    {
      slug: "bustier-morphologie-a",
      q: "Un bustier est-il adapté à une morphologie en A ?",
      r: "Oui, et c'est l'une des encolures que la boutique conseille : un bustier droit trace une ligne qui élargit les épaules, et un bustier travaillé retient le regard en haut. Associé à une jupe évasée, il équilibre les hanches.",
      description:
        "Robe de mariée bustier et morphologie en A : un bustier droit élargit les épaules, un bustier travaillé retient le regard. Les bustiers de MADAMOON, Paris.",
      chapo:
        "Un bustier et une jupe évasée : c'est l'association que la boutique conseille d'abord pour une morphologie en A.",
      sections: [
        {
          titre: "Pourquoi il fonctionne",
          texte: [
            "Un bustier droit trace une ligne horizontale qui élargit les épaules. Un bustier travaillé — brodé, perlé, drapé — retient le regard en haut du corps. Avec une jupe évasée, il équilibre les hanches.",
          ],
        },
        {
          titre: "Droit, cœur ou corseté",
          texte: [
            "Le bustier droit élargit le plus la ligne. Le bustier cœur, comme sur Finell, adoucit le buste. Le corset structuré, comme sur Ember ou Guinevere, dessine la taille, bien marquée chez une morphologie en A.",
          ],
        },
        {
          titre: "Le maintien",
          texte: [
            "Un bustier doit tenir sans bretelles : c'est son ajustement qui compte. Les couturières de la boutique l'ajustent sur vous jusqu'au dernier essayage, retouches incluses.",
          ],
        },
      ],
      aRetenir: [
        "Oui : un bustier droit élargit les épaules.",
        "Travaillé, il retient le regard en haut.",
        "Avec une jupe évasée.",
      ],
      liens: [
        { href: "/robes/finell", label: "Finell" },
        { href: "/robes/ember", label: "Ember" },
        { href: "/robes/fortune", label: "Fortune" },
      ],
    },

    /* ——————————————————————————————— attirer le regard vers le haut ————— */
    {
      slug: "robe-attirer-le-regard-haut-du-corps",
      q: "Comment choisir une robe qui attire le regard vers le haut du corps ?",
      r: "Concentrez le travail de la robe en haut : un corsage brodé, perlé ou drapé, une encolure qui élargit les épaules, des manches ou des bretelles qui comptent. La jupe, plus simple, laisse le regard monter.",
      description:
        "Attirer le regard vers le haut du corps : un corsage brodé ou perlé, une encolure qui élargit, des manches. Les conseils de la boutique MADAMOON, Paris 10e.",
      chapo:
        "Le regard va où la robe travaille. Pour une morphologie en A, tout l'enjeu est de le porter vers le haut.",
      sections: [
        {
          titre: "Le travail en haut, la simplicité en bas",
          texte: [
            "Une robe dont le corsage est brodé, perlé ou drapé et dont la jupe reste simple fait monter le regard d'elle-même. C'est le principe de la princesse et de la trapèze.",
          ],
        },
        {
          titre: "Les détails qui retiennent le regard",
          texte: ["Dans le catalogue de la boutique :"],
          liste: [
            "un corsage perlé, comme sur Emerald ou Carrie ;",
            "des broderies, comme sur Fern, en mikado brodé de fleurs de perles ;",
            "des épaules dénudées, comme sur Trinity ;",
            "des manches, longues comme sur Pendant ou ballon comme sur Ryle.",
          ],
        },
        {
          titre: "Le jour J",
          texte: [
            "Un conseil : la coiffure et les bijoux jouent le même rôle. Un chignon dégage les épaules, des boucles d'oreilles portent le regard au visage.",
          ],
        },
      ],
      aRetenir: [
        "Le travail de la robe en haut.",
        "Corsage perlé, broderies, épaules dénudées.",
        "Une jupe plus simple.",
      ],
      liens: [
        { href: "/robes/fern", label: "Fern" },
        { href: "/robes/emerald", label: "Emerald" },
        { href: "/robes/ryle", label: "Ryle" },
      ],
    },

    /* ——————————————————————————————————————— le corsage ————— */
    {
      slug: "corsage-robe-de-mariee-silhouette-a",
      q: "Quel type de corsage choisir pour une silhouette en A ?",
      r: "Un corsage travaillé, qui donne du poids au haut du corps : brodé, perlé, drapé, ou structuré en corset. Sa ligne compte autant que son décor — droite ou carrée, elle élargit les épaules.",
      description:
        "Quel corsage pour une silhouette en A : brodé, perlé, drapé ou corseté, avec une ligne droite ou carrée. Les corsages des robes MADAMOON, Paris 10e.",
      chapo:
        "Le corsage est la partie de la robe qui travaille le plus pour une morphologie en A. Voici comment le choisir.",
      sections: [
        {
          titre: "Un décor qui retient le regard",
          texte: [
            "Brodé, perlé ou drapé, le corsage donne au haut du corps de quoi retenir le regard. Emerald et Carrie ont un corsage perlé, Maribel un corsage brodé à la main, Dove un décolleté drapé.",
          ],
        },
        {
          titre: "Une construction qui dessine",
          texte: [
            "Un corset structuré marque la taille, déjà bien dessinée chez une morphologie en A, et tient le buste. Ember a un corset structuré, Guinevere et Santana une taille basque qui descend en pointe.",
          ],
        },
        {
          titre: "Une ligne qui élargit",
          texte: [
            "La ligne du haut du corsage compte autant que son décor : droite, comme sur Nirali, ou carrée, comme sur Dolores, elle élargit les épaules.",
          ],
        },
      ],
      aRetenir: [
        "Brodé, perlé ou drapé.",
        "Un corset qui marque la taille.",
        "Une ligne droite ou carrée.",
      ],
      liens: [
        { href: "/robes/guinevere", label: "Guinevere" },
        { href: "/robes/maribel", label: "Maribel" },
        { href: "/robes/nirali", label: "Nirali" },
      ],
    },

    /* ——————————————————————————————— des hanches plus larges ————— */
    {
      slug: "robe-de-mariee-hanches-larges",
      q: "Quelle robe de mariée choisir quand les hanches sont plus larges que les épaules ?",
      r: "Une robe dont la jupe s'ouvre dès la taille et suit les hanches sans les mouler — une princesse ou une trapèze —, avec un haut travaillé qui équilibre. Rien à cacher : la jupe accompagne les hanches, le haut fait le reste.",
      description:
        "Robe de mariée pour des hanches plus larges que les épaules : une jupe qui s'ouvre dès la taille, un haut travaillé. Princesse ou trapèze chez MADAMOON.",
      chapo:
        "Des hanches plus larges que les épaules n'appellent pas une robe qui les cache, mais une robe qui les accompagne.",
      sections: [
        {
          titre: "Une jupe qui accompagne",
          texte: [
            "La jupe s'ouvre dès la taille et suit les hanches au lieu de les épouser. La princesse le fait avec ampleur, la trapèze avec une ligne en A plus légère.",
          ],
        },
        {
          titre: "Une matière qui tombe",
          texte: [
            "Un tulle léger ou une dentelle donnent une jupe aérienne qui ne marque pas ; un mikado, une jupe structurée qui garde sa forme. Un satin très fin, qui colle, se juge à l'essayage.",
          ],
        },
        {
          titre: "Un haut qui équilibre",
          texte: [
            "Le haut fait l'autre moitié du travail : un bustier travaillé, une encolure qui élargit les épaules, des manches ou des bretelles qui comptent.",
          ],
        },
      ],
      aRetenir: [
        "Une jupe qui s'ouvre dès la taille.",
        "Princesse ou trapèze.",
        "Un haut travaillé qui équilibre.",
      ],
      liens: [
        { href: "/coupes/princesse", label: "Les robes princesse" },
        { href: "/coupes/trapeze", label: "Les robes trapèze" },
        { href: "/morphologies/a", label: "La morphologie en A" },
      ],
    },

    /* ——————————————————————————————— les premières à essayer ————— */
    {
      slug: "premieres-coupes-morphologie-a",
      q: "Quelles coupes essayer en premier quand on a une morphologie en A ?",
      r: "La princesse et la trapèze, avec un haut travaillé et une encolure qui élargit les épaules. Ensuite, une fluide et une deux en un, pour comparer — et une sirène si l'envie est là.",
      description:
        "Morphologie en A : quelles coupes essayer en premier ? La princesse et la trapèze, puis une fluide et une deux en un pour comparer. Les conseils MADAMOON.",
      chapo:
        "L'ordre des essayages aide à comprendre ce qui vous va, et pourquoi. Voici celui que la boutique conseille pour une morphologie en A.",
      sections: [
        {
          titre: "L'ordre des essayages",
          texte: [],
          ordonnee: true,
          liste: [
            "Une princesse — pour voir l'effet d'un bustier travaillé et d'une jupe ample.",
            "Une trapèze — la jupe en A dès la taille, la plus facile à porter.",
            "Une fluide — pour comparer avec une robe qui ne construit pas.",
            "Une deux en un — deux volumes dans la même robe.",
          ],
        },
        {
          titre: "Et la sirène",
          texte: [
            "Elle n'est pas dans la liste de départ, mais elle vaut l'essai si elle vous attire, avec un haut qui équilibre. Beaucoup de mariées en A repartent avec une sirène qu'elles n'avaient pas prévu d'essayer.",
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
        "D'abord une princesse et une trapèze.",
        "Puis une fluide et une deux en un.",
        "Une sirène si l'envie est là.",
      ],
      liens: [
        { href: "/coupes/princesse", label: "Les robes princesse" },
        { href: "/coupes/trapeze", label: "Les robes trapèze" },
        { href: "/rendez-vous", label: "Prendre rendez-vous" },
      ],
    },
  ],
  H: [
    /* ——————————————————————————————————————— quelle robe ————— */
    {
      slug: "quelle-robe-de-mariee-morphologie-h",
      q: "Quelle robe de mariée choisir pour une morphologie en H ?",
      r: "Commencez par les fluides et les sirènes légères : cintrée à la taille ou portée avec une ceinture, la fluide marque là où vous le décidez ; la sirène crée la courbe au lieu de la chercher. La trapèze et la princesse valent aussi l'essai.",
      description:
        "Robe de mariée et morphologie en H : fluide et sirène légère en premier, une taille marquée par la coupe. Les conseils de la boutique MADAMOON, Paris 10e.",
      chapo:
        "Créer la courbe plutôt que la chercher : avec une morphologie en H, c'est la coupe qui la dessine. Voici par où commencer.",
      sections: [
        {
          titre: "Les deux coupes à essayer en premier",
          texte: [
            "La fluide, cintrée à la taille ou portée avec une ceinture, marque là où vous le décidez, et nulle part ailleurs.",
            "La sirène dessine ce qui ne se voit pas encore : ajustée jusqu'aux cuisses puis évasée, elle crée la courbe au lieu de la souligner.",
          ],
        },
        {
          titre: "Celles qui valent l'essai",
          texte: [
            "La trapèze ouvre sa jupe à partir d'une taille haute et donne du mouvement là où la ligne est droite. La princesse, avec son corset et son ampleur, construit une taille.",
          ],
        },
        {
          titre: "Marquer la taille, ou pas",
          texte: [
            "Marquer la taille est une option, pas une correction. Une robe droite, en satin net, sur une ligne longue, est l'un des plus beaux partis pris qui soient.",
          ],
        },
      ],
      aRetenir: [
        "Fluide et sirène légère en premier.",
        "Une taille marquée par la coupe ou une ceinture.",
        "Trapèze et princesse valent l'essai.",
      ],
      liens: [
        { href: "/morphologies/h", label: "La morphologie en H" },
        { href: "/coupes/fluide", label: "Les robes fluides" },
        { href: "/coupes/sirene", label: "Les robes sirène" },
      ],
    },

    /* ——————————————————————————————————————— la reconnaître ————— */
    {
      slug: "reconnaitre-morphologie-h",
      q: "Comment reconnaître une morphologie en H ?",
      r: "Vos épaules, votre taille et vos hanches sont sur une même ligne droite et verticale, et la taille est peu marquée. Devant le miroir, une simple ceinture change toute votre ligne — plus nettement que sur d'autres morphologies.",
      description:
        "Reconnaître une morphologie en H : épaules, taille et hanches sur une même ligne, une taille peu marquée, une allure longiligne. Trois repères simples.",
      chapo:
        "Une ligne droite, une allure longiligne : trois repères suffisent pour s'y reconnaître, dont un devant le miroir.",
      sections: [
        {
          titre: "Les trois repères",
          texte: [],
          liste: [
            "Le repère — épaules, taille et hanches sont sur une même ligne droite et verticale.",
            "La taille — peu marquée.",
            "Devant le miroir — une simple ceinture change toute votre ligne, plus nettement que sur d'autres morphologies.",
          ],
        },
        {
          titre: "À ne pas confondre",
          texte: [
            "La morphologie en O a elle aussi une taille peu creusée, mais avec une poitrine généreuse et des courbes. La morphologie en X a des proportions équilibrées comme le H, mais une taille fine et des courbes douces.",
          ],
        },
        {
          titre: "Une silhouette, pas une étiquette",
          texte: [
            "Beaucoup de mariées se trouvent entre deux morphologies. Les coupes conseillées se recoupent, et c'est l'essayage qui tranche. Si vous hésitez, Élise, la conseillère du site, vous oriente en trois questions.",
          ],
        },
      ],
      aRetenir: [
        "Épaules, taille et hanches alignées.",
        "Une taille peu marquée.",
        "Une ceinture change toute la ligne.",
      ],
      liens: [
        { href: "/morphologies/h", label: "La morphologie en H" },
        { href: "/morphologies", label: "Les six morphologies" },
        { href: "/trouver-ma-robe", label: "Trouver ma robe avec Élise" },
      ],
    },

    /* ——————————————————————————————————— une taille peu marquée ————— */
    {
      slug: "robe-de-mariee-taille-peu-marquee",
      q: "Quelle robe choisir quand la taille est peu marquée ?",
      r: "Une robe qui crée la taille au lieu de la chercher : une fluide cintrée ou ceinturée, une sirène légère, ou un corsage structuré qui dessine la ligne. Ou, au contraire, une robe droite qui assume la ligne longue — c'est un parti pris tout aussi beau.",
      description:
        "Robe de mariée pour une taille peu marquée : fluide cintrée ou ceinturée, sirène légère, corsage structuré, ou robe droite assumée. Les conseils MADAMOON.",
      chapo:
        "Une taille peu marquée laisse deux chemins : la dessiner, ou en faire une force. Les deux sont beaux.",
      sections: [
        {
          titre: "Dessiner la taille",
          texte: [
            "Une fluide cintrée à la taille, ou portée avec une ceinture, marque la ligne exactement où vous le voulez. Une sirène légère crée la courbe en s'évasant sous les cuisses. Un corsage structuré, avec une taille basque en pointe, dessine une taille qui n'était pas là.",
          ],
        },
        {
          titre: "Assumer la ligne",
          texte: [
            "Marquer la taille n'est pas une obligation. Une robe droite, en satin net, sur une ligne longue, met en valeur une silhouette élancée sans rien lui demander.",
          ],
        },
        {
          titre: "Les robes de la boutique",
          texte: [
            "Monica, en jacquard floral, a une ceinture ; Guinevere et Oksana, un corset à taille basque en pointe ; Dove, une robe fluide en satin mat au décolleté drapé.",
          ],
        },
      ],
      aRetenir: [
        "Créer la taille : coupe cintrée, ceinture, corset.",
        "Ou assumer la ligne longue.",
        "Les deux sont de beaux partis pris.",
      ],
      liens: [
        { href: "/robes/monica", label: "Monica" },
        { href: "/robes/guinevere", label: "Guinevere" },
        { href: "/morphologies/h", label: "La morphologie en H" },
      ],
    },

    /* ——————————————————————————————————————— la fluide ————— */
    {
      slug: "robe-fluide-morphologie-h",
      q: "Une robe de mariée fluide convient-elle à une morphologie en H ?",
      r: "Oui, c'est l'une des deux coupes à essayer en premier. Cintrée à la taille ou portée avec une ceinture, elle marque là où vous le décidez, et son tombé suit la ligne longue d'une silhouette en H.",
      description:
        "Robe de mariée fluide et morphologie en H : l'une des deux coupes à essayer en premier, cintrée ou ceinturée. Les robes fluides de MADAMOON, Paris 10e.",
      chapo:
        "La fluide et la silhouette en H partagent la même qualité : une ligne longue. Voici comment en tirer le meilleur.",
      sections: [
        {
          titre: "Pourquoi elle fonctionne",
          texte: [
            "Son tombé suit la ligne longue d'une morphologie en H sans rien forcer. Cintrée à la taille ou portée avec une ceinture, elle marque la taille là où vous le décidez, et nulle part ailleurs.",
          ],
        },
        {
          titre: "Ce qu'il faut regarder",
          texte: [
            "La taille : cintrée, ceinturée ou drapée, c'est elle qui crée la courbe. La matière ensuite : un satin mat ou un crêpe tombent net ; une mousseline flotte davantage.",
          ],
        },
        {
          titre: "Les fluides de la boutique",
          texte: ["Parmi elles :"],
          liste: [
            "Dove — satin mat, décolleté drapé, épaules dénudées ;",
            "Hélène — corset perlé à fleurs en relief, jupe en mousseline ;",
            "Marie — une ligne intemporelle, de Monica Loretti ;",
            "Murielle — dentelle florale, manches illusion ;",
            "Ryle — manches ballon, de Watters Designs.",
          ],
        },
      ],
      aRetenir: [
        "Oui : l'une des deux coupes à essayer en premier.",
        "Cintrée ou ceinturée, elle crée la taille.",
        "Un tombé qui suit la ligne longue.",
      ],
      liens: [
        { href: "/coupes/fluide", label: "Les robes fluides" },
        { href: "/robes/dove", label: "Dove" },
        { href: "/robes/helene", label: "Hélène" },
        { href: "/morphologies/h", label: "La morphologie en H" },
      ],
    },

    /* ——————————————————————————————————————— la ceinture ————— */
    {
      slug: "ceinture-robe-de-mariee-silhouette-h",
      q: "Une ceinture peut-elle structurer une robe de mariée sur une silhouette en H ?",
      r: "Oui, et plus nettement que sur d'autres morphologies : sur une silhouette en H, une simple ceinture change toute la ligne. Elle marque la taille là où vous le décidez, sur une fluide comme sur une trapèze.",
      description:
        "Ceinture et robe de mariée sur une silhouette en H : elle marque la taille et change toute la ligne. Comment la choisir, avec les robes MADAMOON, Paris.",
      chapo:
        "C'est le repère du miroir pour une morphologie en H : une ceinture change tout. Voici comment s'en servir.",
      sections: [
        {
          titre: "Pourquoi elle change tout",
          texte: [
            "Sur une ligne droite, une ceinture trace l'horizontale qui manquait : elle crée une taille, et la silhouette se partage d'un coup en deux. Sur une morphologie en H, l'effet est plus net que sur toute autre.",
          ],
        },
        {
          titre: "Où la placer",
          texte: [
            "À la taille naturelle, elle dessine une courbe ; un peu plus haut, elle allonge les jambes. L'essayage dit où elle tombe le mieux.",
          ],
        },
        {
          titre: "Les robes de la boutique",
          texte: [
            "Monica, de Monica Loretti, en jacquard floral, a une ceinture qui marque la taille. Pour une autre robe, parlez-en à la boutique au moment de l'essayage : c'est elle qui vous dira ce qui est possible.",
          ],
        },
      ],
      aRetenir: [
        "Oui : sur une silhouette en H, elle change toute la ligne.",
        "À la taille naturelle pour une courbe.",
        "Un peu plus haut pour allonger.",
      ],
      liens: [
        { href: "/robes/monica", label: "Monica" },
        { href: "/coupes/fluide", label: "Les robes fluides" },
        { href: "/morphologies/h", label: "La morphologie en H" },
      ],
    },

    /* ——————————————————————————————————————— la sirène ————— */
    {
      slug: "robe-sirene-morphologie-h",
      q: "Une robe sirène peut-elle dessiner les courbes d'une morphologie en H ?",
      r: "Oui, c'est même l'une des deux coupes à essayer en premier. Ajustée jusqu'aux cuisses puis évasée, la sirène crée la courbe au lieu de la souligner. Choisissez-la légère, pour qu'elle allonge la ligne sans la contraindre.",
      description:
        "Robe de mariée sirène et morphologie en H : elle crée la courbe au lieu de la chercher. Pourquoi la choisir légère, et les sirènes de MADAMOON, Paris.",
      chapo:
        "La sirène est la coupe qui dessine des courbes là où il n'y en a pas encore. Pour une morphologie en H, c'est l'une des premières à essayer.",
      sections: [
        {
          titre: "Pourquoi elle fonctionne",
          texte: [
            "Elle dessine ce qui ne se voit pas encore. Ajustée jusqu'aux cuisses, puis évasée, elle crée une courbe au niveau des hanches et met la taille en évidence par contraste.",
          ],
        },
        {
          titre: "Une sirène légère",
          texte: [
            "La boutique conseille des sirènes légères pour une morphologie en H : elles dessinent des courbes tout en allongeant la ligne, sans la contraindre. Un corset structuré, quand il y en a un, renforce la taille.",
          ],
        },
        {
          titre: "Les sirènes de la boutique",
          texte: [
            "Meredith, en dentelle en relief ; Riviera, en charmeuse, au corset structuré et aux manches amovibles ; Rowan, fourreau en charmeuse au corset perlé ; Zina, à fente, avec des fleurs 3D optionnelles.",
          ],
        },
      ],
      aRetenir: [
        "Oui : l'une des deux coupes à essayer en premier.",
        "Elle crée la courbe au lieu de la chercher.",
        "Légère, pour allonger la ligne.",
      ],
      liens: [
        { href: "/coupes/sirene", label: "Les robes sirène" },
        { href: "/robes/meredith", label: "Meredith" },
        { href: "/robes/riviera", label: "Riviera" },
      ],
    },

    /* ——————————————————————————————————————— la robe empire ————— */
    {
      slug: "robe-empire-morphologie-h",
      q: "Une robe empire est-elle adaptée à une morphologie en H ?",
      r: "Très bien. Elle remonte la taille sous la poitrine et allonge tout ce qui suit. Elle mérite un essayage même si l'idée ne vous attirait pas sur photographie. La boutique ne classe pas ses robes en « empire » : ses robes fluides sont les plus proches de cette ligne.",
      description:
        "Robe de mariée empire et morphologie en H : la taille remonte sous la poitrine et la ligne s'allonge. Pourquoi l'essayer, et les robes qui s'en approchent.",
      chapo:
        "La coupe empire est l'une de celles que la boutique conseille d'essayer pour une morphologie en H — même quand l'idée ne séduit pas sur photo.",
      sections: [
        {
          titre: "Ce qu'est une robe empire",
          texte: [
            "Une robe empire a sa taille placée haut, juste sous la poitrine, et une jupe qui descend ensuite droite ou légèrement évasée.",
          ],
        },
        {
          titre: "Pourquoi elle sert une morphologie en H",
          texte: [
            "Elle crée une taille là où la ligne n'en marquait pas, en la remontant sous la poitrine, et elle allonge tout ce qui suit. C'est une coupe qui se comprend une fois portée.",
          ],
        },
        {
          titre: "Chez MADAMOON",
          texte: [
            "Le catalogue se range en cinq coupes — sirène, princesse, fluide, trapèze, deux en un — et aucune robe n'y est classée « empire ». Les robes fluides sont celles qui s'en rapprochent le plus. Si c'est cette ligne que vous cherchez, dites-le en prenant rendez-vous.",
          ],
        },
      ],
      aRetenir: [
        "Très bien : la taille remonte sous la poitrine.",
        "Elle allonge tout ce qui suit.",
        "À la boutique : les robes fluides s'en rapprochent.",
      ],
      liens: [
        { href: "/coupes/fluide", label: "Les robes fluides" },
        { href: "/morphologies/h", label: "La morphologie en H" },
        { href: "/rendez-vous", label: "Prendre rendez-vous" },
      ],
    },

    /* ——————————————————————————————— un corsage qui marque la taille ————— */
    {
      slug: "corsage-creer-taille-marquee",
      q: "Quel corsage choisir pour créer une impression de taille marquée ?",
      r: "Un corsage structuré qui dessine la taille : un corset, surtout avec une taille basque qui descend en pointe, un jeu de coutures, ou un décor qui s'arrête net à la taille. Le contraste entre un corsage travaillé et une jupe plus libre fait le reste.",
      description:
        "Créer une impression de taille marquée : corset, taille basque en pointe, coutures, décor qui s'arrête à la taille. Les corsages des robes MADAMOON, Paris.",
      chapo:
        "Une taille peut se construire. Voici les corsages qui la dessinent, même quand la silhouette ne la marque pas.",
      sections: [
        {
          titre: "Le corset",
          texte: [
            "Un corset structuré tient le buste et dessine la taille. Ember et Riviera ont un corset structuré ; Carrie, Rowan et Hélène, un corset perlé.",
          ],
        },
        {
          titre: "La taille basque en pointe",
          texte: [
            "Elle descend en V sous la taille naturelle et allonge le buste : la taille paraît plus fine par contraste. Guinevere et Oksana ont un corset à taille basque en pointe ; Santana, une taille basque.",
          ],
        },
        {
          titre: "Le contraste",
          texte: [
            "Un corsage travaillé — perlé, brodé, en dentelle — qui s'arrête net à la taille, au-dessus d'une jupe plus simple, crée une ligne horizontale que l'œil lit comme une taille.",
          ],
        },
      ],
      aRetenir: [
        "Un corset structuré.",
        "Une taille basque en pointe.",
        "Un corsage travaillé, une jupe plus libre.",
      ],
      liens: [
        { href: "/robes/guinevere", label: "Guinevere" },
        { href: "/robes/oksana", label: "Oksana" },
        { href: "/robes/ember", label: "Ember" },
      ],
    },

    /* ——————————————————————————————————— du volume et du relief ————— */
    {
      slug: "volume-relief-silhouette-h",
      q: "Comment apporter du volume ou du relief à une silhouette en H ?",
      r: "Par la coupe — une jupe de princesse ou une sirène qui s'évase —, par la matière — une dentelle en relief, des fleurs 3D, un drapé — ou par les détails — des manches ballon, des rubans. Le relief crée la courbe que la ligne droite ne dessine pas.",
      description:
        "Apporter du volume ou du relief à une silhouette en H : une jupe ample, une dentelle en relief, des fleurs 3D, un drapé, des manches. Les robes MADAMOON.",
      chapo:
        "Une silhouette en H gagne à ce que la robe apporte ce que la ligne ne donne pas. Voici où trouver le volume et le relief.",
      sections: [
        {
          titre: "Par la coupe",
          texte: [
            "Une jupe de princesse donne de l'ampleur sous une taille construite. Une sirène, en s'évasant sous les cuisses, crée un volume au bas de la robe et une courbe aux hanches. Alicia et Lovia peuvent se porter en trapèze ou en volume princesse.",
          ],
        },
        {
          titre: "Par la matière",
          texte: [
            "Une dentelle en relief, comme sur Meredith ; des fleurs 3D, comme sur Zina ; un corset perlé à fleurs en relief, comme sur Hélène ; un drapé, comme celui de Dove. La lumière accroche le relief et donne du modelé à la silhouette.",
          ],
        },
        {
          titre: "Par les détails",
          texte: [
            "Des manches ballon, comme sur Ryle, ou des rubans de velours, comme sur Mitra, ajoutent du relief sans changer la coupe.",
          ],
        },
      ],
      aRetenir: [
        "Une jupe ample ou une sirène qui s'évase.",
        "Dentelle en relief, fleurs 3D, drapé.",
        "Manches ballon, rubans.",
      ],
      liens: [
        { href: "/robes/meredith", label: "Meredith" },
        { href: "/robes/zina", label: "Zina" },
        { href: "/robes/ryle", label: "Ryle" },
      ],
    },

    /* ——————————————————————————————————— une silhouette longiligne ————— */
    {
      slug: "robe-de-mariee-silhouette-longiligne",
      q: "Quelle robe de mariée choisir pour une silhouette longiligne ?",
      r: "Une robe qui suit la ligne : une fluide au tombé net, une sirène légère, ou une robe droite et minimaliste qui fait de la longueur un parti pris. Si vous voulez des courbes, une taille cintrée ou ceinturée les dessine.",
      description:
        "Robe de mariée pour une silhouette longiligne : fluide au tombé net, sirène légère, robe droite minimaliste, ou taille marquée. Les conseils MADAMOON, Paris.",
      chapo:
        "Une silhouette longiligne a une chance rare : la longueur. La robe peut la célébrer, ou y ajouter des courbes.",
      sections: [
        {
          titre: "Célébrer la ligne",
          texte: [
            "Une robe droite, en satin net, sur une ligne longue, est l'un des plus beaux partis pris qui soient. Les robes minimalistes en crêpe, comme Milan, de Monica Loretti, ou Bondi, de Casablanca Bridal, jouent cette carte.",
          ],
        },
        {
          titre: "Ajouter des courbes",
          texte: [
            "Une fluide cintrée à la taille, ou portée avec une ceinture, marque la taille. Une sirène légère crée une courbe aux hanches en allongeant encore la ligne.",
          ],
        },
        {
          titre: "Jouer la longueur",
          texte: [
            "Une traîne, une fente ou des manches longues prolongent la ligne. Siddalee a une longue traîne ; Monica et Murielle, une fente ; Pendant, des manches longues.",
          ],
        },
      ],
      aRetenir: [
        "Une robe droite et minimaliste, assumée.",
        "Ou une taille cintrée pour des courbes.",
        "Traîne, fente, manches longues prolongent la ligne.",
      ],
      liens: [
        { href: "/robes/milan", label: "Milan" },
        { href: "/robes/bondi", label: "Bondi" },
        { href: "/morphologies/h", label: "La morphologie en H" },
      ],
    },

    /* ——————————————————————————————————————— la taille basse ————— */
    {
      slug: "robe-taille-basse-morphologie-h",
      q: "Les robes à taille basse conviennent-elles à une morphologie en H ?",
      r: "Oui, si vous aimez la ligne longue : une taille basse allonge le buste et joue la silhouette droite au lieu de la contrarier. Elle ne crée pas de taille — pour des courbes, préférez une taille cintrée ou une taille haute.",
      description:
        "Robe de mariée à taille basse et morphologie en H : elle allonge le buste et joue la ligne droite. Quand la choisir, et les tailles basses de MADAMOON.",
      chapo:
        "La taille basse ne cherche pas à creuser la taille : elle la déplace. Sur une silhouette en H, c'est un choix de style plus qu'une correction.",
      sections: [
        {
          titre: "Ce qu'elle fait",
          texte: [
            "La couture descend sous la taille naturelle, vers les hanches. Le buste paraît plus long, et la jupe part plus bas. Sur une ligne droite, l'effet est élancé et graphique.",
          ],
        },
        {
          titre: "Quand la choisir",
          texte: [
            "Si vous aimez votre ligne longue et voulez la jouer plutôt que la transformer. Si vous cherchez au contraire des courbes, une taille cintrée, une ceinture ou une taille haute empire les dessineront davantage.",
          ],
        },
        {
          titre: "Les tailles basses de la boutique",
          texte: [
            "Nirali, trapèze au décolleté droit ; Mitra, trapèze en dentelle Cassie et rubans de velours ; Clover Perles, princesse en dentelle Caterina au décolleté carré — toutes trois de Watters Designs.",
          ],
        },
      ],
      aRetenir: [
        "Oui, pour jouer la ligne longue.",
        "Elle allonge le buste.",
        "Pour des courbes : taille cintrée ou haute.",
      ],
      liens: [
        { href: "/robes/nirali", label: "Nirali" },
        { href: "/robes/mitra", label: "Mitra" },
        { href: "/robes/clover-perles", label: "Clover Perles" },
      ],
    },

    /* ——————————————————————————————— les premières à essayer ————— */
    {
      slug: "premieres-coupes-morphologie-h",
      q: "Quelles coupes essayer en premier pour une morphologie en H ?",
      r: "La fluide et la sirène légère, qui dessinent des courbes tout en allongeant la ligne. Ensuite, une trapèze et une princesse, pour comparer — et une robe empire si l'occasion se présente.",
      description:
        "Morphologie en H : quelles coupes essayer en premier ? La fluide et la sirène légère, puis une trapèze et une princesse pour comparer. Les conseils MADAMOON.",
      chapo:
        "L'ordre des essayages aide à comprendre ce qui vous va, et pourquoi. Voici celui que la boutique conseille pour une morphologie en H.",
      sections: [
        {
          titre: "L'ordre des essayages",
          texte: [],
          ordonnee: true,
          liste: [
            "Une fluide — cintrée ou ceinturée, elle marque la taille où vous le voulez.",
            "Une sirène légère — elle crée la courbe au lieu de la chercher.",
            "Une trapèze — la jupe s'ouvre à partir d'une taille haute.",
            "Une princesse — pour voir l'effet d'un corset et d'une jupe ample.",
          ],
        },
        {
          titre: "Et la robe empire",
          texte: [
            "Elle mérite un essayage, même si l'idée ne vous attirait pas sur photo. Demandez à la boutique les modèles qui s'en approchent.",
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
        "D'abord une fluide et une sirène légère.",
        "Puis une trapèze et une princesse.",
        "Une robe empire, si l'occasion se présente.",
      ],
      liens: [
        { href: "/coupes/fluide", label: "Les robes fluides" },
        { href: "/coupes/sirene", label: "Les robes sirène" },
        { href: "/rendez-vous", label: "Prendre rendez-vous" },
      ],
    },
  ],
};

/** Les questions d'une morphologie, ou rien si elle n'en a pas encore. */
export const questionsMorpho = (lettre: Lettre) => QUESTIONS_MORPHO[lettre];
