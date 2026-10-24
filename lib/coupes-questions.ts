import type { QuestionMorpho } from "@/lib/morphologies-questions";

/*
 * Les questions des pages de coupe, et leurs pages.
 *
 * Même principe que les morphologies : en bas de la page d'une coupe,
 * une rangée par question et un bouton « Savoir plus » qui mène à sa
 * page, sous l'adresse de la coupe — /coupes/sirene/….
 *
 * Les questions viennent de la maison. Les réponses s'en tiennent à ce
 * que le site sait : la définition de chaque coupe, les morphologies qui
 * la conseillent, et ce que disent les fiches des robes — une fente « qui
 * facilite les mouvements », une doublure extensible, une robe « pensée
 * pour un mariage civil ». Ce qui relève du conseil général — s'asseoir,
 * monter un escalier — est écrit comme un conseil. Ce que le catalogue
 * n'a pas — aucune robe n'y est classée « trompette » — est dit tel quel.
 *
 * Une coupe absente de cette table n'affiche pas de questions.
 */

export type QuestionCoupe = QuestionMorpho;

export const QUESTIONS_COUPES: Record<string, QuestionCoupe[]> = {
  sirene: [
    /* ——————————————————————————————————————— la définition ————— */
    {
      slug: "qu-est-ce-qu-une-robe-de-mariee-sirene",
      q: "Qu'est-ce qu'une robe de mariée sirène ?",
      r: "Une robe ajustée jusqu'aux cuisses, puis évasée jusqu'au sol. Elle épouse la poitrine, la taille et les hanches, et dessine la silhouette avant de s'ouvrir en une jupe qui se termine souvent en traîne. C'est la coupe la plus féminine et la plus sensuelle du catalogue.",
      description:
        "Qu'est-ce qu'une robe de mariée sirène ? Ajustée jusqu'aux cuisses puis évasée, elle dessine la taille et les hanches. Définition et sirènes MADAMOON, Paris.",
      chapo:
        "Féminine et sensuelle : la sirène est la coupe qui dessine le plus la silhouette. Voici ce qui la définit.",
      sections: [
        {
          titre: "Une ligne en deux temps",
          texte: [
            "La sirène est ajustée jusqu'aux cuisses, puis évasée. Dans sa partie haute, elle suit la poitrine, la taille et les hanches ; sous les cuisses, la jupe s'ouvre et descend jusqu'au sol, souvent prolongée d'une traîne.",
          ],
        },
        {
          titre: "Ce qu'elle fait à la silhouette",
          texte: [
            "Elle dessine la taille et les hanches. Sur une silhouette déjà courbée, elle suit ; sur une silhouette plus droite, elle crée la courbe en s'évasant.",
          ],
        },
        {
          titre: "Les sirènes de la boutique",
          texte: [
            "C'est la coupe la plus représentée du catalogue, chez Casablanca Bridal, Watters Designs, Monica Loretti et Olya Mak : en satin mat comme Sheridan ou Venus, en dentelle comme Oksana ou Summer, en crêpe comme Mira ou Bondi, en charmeuse comme Riviera.",
          ],
        },
      ],
      aRetenir: [
        "Ajustée jusqu'aux cuisses, puis évasée.",
        "Elle dessine la taille et les hanches.",
        "Féminine et sensuelle.",
      ],
      liens: [
        { href: "/coupes/sirene", label: "Les robes sirène" },
        { href: "/robes/sheridan", label: "Sheridan" },
        { href: "/robes/oksana", label: "Oksana" },
      ],
    },

    /* ——————————————————————————————————————— les morphologies ————— */
    {
      slug: "robe-sirene-quelle-morphologie",
      q: "À quelle morphologie la robe de mariée sirène convient-elle ?",
      r: "Elle fait partie des premières coupes à essayer pour les morphologies en H, en 8 et en X, et vaut l'essai pour une morphologie en O avec une matière qui tient. Pour une morphologie en A, elle se porte très bien avec un haut qui équilibre. Aucune morphologie ne l'interdit.",
      description:
        "Robe de mariée sirène : à quelles morphologies convient-elle ? En premier pour H, 8 et X, à essayer pour O et A. Les conseils de la boutique MADAMOON.",
      chapo:
        "La sirène a la réputation d'être réservée aux silhouettes en sablier. C'est faux : voici à qui elle va, et à quelle condition.",
      sections: [
        {
          titre: "Les morphologies pour qui elle vient en premier",
          texte: [],
          liste: [
            "En H — elle crée la courbe au lieu de la chercher ; choisie légère, elle allonge la ligne.",
            "En 8 — elle épouse une ligne déjà proportionnée, sans rien corriger.",
            "En X — elle suit la taille sans avoir à la créer : la coupe qui en dit le plus avec le moins.",
          ],
        },
        {
          titre: "Celles pour qui elle vaut l'essai",
          texte: [
            "En O, elle demande une matière qui tient — un crêpe plutôt qu'un satin léger — et se juge en cabine bien mieux que sur photographie. En A, elle se porte très bien si le haut a de quoi équilibrer : une manche, une bretelle large, un décolleté travaillé.",
          ],
        },
        {
          titre: "Aucune ne l'interdit",
          texte: [
            "Une morphologie n'exclut jamais une robe : elle indique seulement par quoi commencer. Beaucoup de mariées repartent avec une sirène qu'elles n'avaient pas prévu d'essayer.",
          ],
        },
      ],
      aRetenir: [
        "En premier : morphologies en H, en 8 et en X.",
        "À essayer : en O et en A, à certaines conditions.",
        "Aucune morphologie ne l'interdit.",
      ],
      liens: [
        { href: "/morphologies/h/robe-sirene-morphologie-h", label: "La sirène et la morphologie en H" },
        { href: "/morphologies/o/robe-sirene-morphologie-o", label: "La sirène et la morphologie en O" },
        { href: "/morphologies", label: "Les six morphologies" },
      ],
    },

    /* ——————————————————————————————————————— le fourreau ————— */
    {
      slug: "difference-robe-sirene-robe-fourreau",
      q: "Quelle différence entre une robe sirène et une robe fourreau ?",
      r: "Les deux sont ajustées et suivent le corps. La sirène s'évase sous les cuisses, en une jupe qui s'ouvre jusqu'au sol ; le fourreau descend droit, ou presque, sans s'évaser. Au catalogue, les fourreaux sont rangés avec les sirènes.",
      description:
        "Robe sirène ou robe fourreau : toutes deux ajustées, la sirène s'évase sous les cuisses, le fourreau descend droit. La différence, et les modèles MADAMOON.",
      chapo:
        "Ce sont deux cousines : même départ, deux arrivées. Voici ce qui les distingue.",
      sections: [
        {
          titre: "Ce qu'elles partagent",
          texte: [
            "Toutes deux sont ajustées : elles suivent la poitrine, la taille et les hanches, sans ampleur. Elles demandent une matière qui tombe bien et un ajustement précis.",
          ],
        },
        {
          titre: "Ce qui les distingue",
          texte: [],
          liste: [
            "La sirène — elle s'évase sous les cuisses, en une jupe qui s'ouvre jusqu'au sol.",
            "Le fourreau — il descend droit ou presque, sans s'évaser, en gardant la ligne du corps jusqu'en bas.",
          ],
        },
        {
          titre: "Au catalogue",
          texte: [
            "La boutique range ses fourreaux avec les sirènes. Siddalee et Rowan, de Watters Designs, sont des fourreaux ; Bella, de Casablanca Bridal, se porte en sirène ou en fourreau ; Amaryllis, en coupe droite ou sirène.",
          ],
        },
      ],
      aRetenir: [
        "Les deux sont ajustées.",
        "La sirène s'évase sous les cuisses.",
        "Le fourreau descend droit.",
      ],
      liens: [
        { href: "/robes/siddalee", label: "Siddalee" },
        { href: "/robes/bella", label: "Bella" },
        { href: "/morphologies/8/robe-fourreau-silhouette-8", label: "Le fourreau et la morphologie en 8" },
      ],
    },

    /* ——————————————————————————————————————— la trompette ————— */
    {
      slug: "difference-robe-sirene-robe-trompette",
      q: "Quelle différence entre une robe sirène et une robe trompette ?",
      r: "Toutes deux sont ajustées puis évasées. La différence tient au point où s'ouvre la jupe : plus bas pour la sirène, vers le genou ; plus haut pour la trompette, vers le milieu de la cuisse, ce qui la rend plus facile à porter. La boutique range ces deux lignes sous le nom de sirène.",
      description:
        "Robe sirène ou robe trompette : la jupe s'ouvre vers le genou pour la sirène, plus haut pour la trompette, plus facile à porter. La différence expliquée.",
      chapo:
        "Sirène, trompette, « fit-and-flare » : trois noms pour une même famille. Ce qui change, c'est l'endroit où la jupe s'ouvre.",
      sections: [
        {
          titre: "Le point d'évasement",
          texte: [
            "La sirène reste ajustée plus longtemps et s'évase plus bas, vers le genou : l'effet est spectaculaire, et la démarche plus contenue. La trompette s'ouvre plus haut, vers le milieu de la cuisse : la jupe prend plus tôt son ampleur, et la robe laisse davantage bouger.",
          ],
        },
        {
          titre: "Laquelle choisir",
          texte: [
            "Si vous aimez la ligne la plus sculptée, la sirène. Si vous voulez danser toute la nuit sans y penser, une jupe qui s'ouvre plus haut. Les deux se jugent à l'essayage, en marchant.",
          ],
        },
        {
          titre: "Au catalogue",
          texte: [
            "La boutique n'a pas de catégorie « trompette » : ces lignes sont rangées avec les sirènes. Plusieurs fiches parlent d'une coupe « fit-and-flare », comme celles de Sheridan ou d'Enid. Le point exact où s'ouvre chaque jupe se voit en cabine.",
          ],
        },
      ],
      aRetenir: [
        "Sirène : la jupe s'ouvre vers le genou.",
        "Trompette : plus haut, vers la mi-cuisse.",
        "Les deux sont rangées en sirène au catalogue.",
      ],
      liens: [
        { href: "/coupes/sirene", label: "Les robes sirène" },
        { href: "/robes/enid", label: "Enid" },
        { href: "/robes/sheridan", label: "Sheridan" },
      ],
    },

    /* ——————————————————————————————————————— le confort ————— */
    {
      slug: "robe-sirene-confortable-marcher-danser",
      q: "Une robe sirène est-elle confortable pour marcher et danser ?",
      r: "Oui, si elle est bien choisie et bien ajustée. Une fente, une matière extensible ou une jupe qui s'ouvre un peu plus haut laissent marcher et danser librement. Le plus sûr est de le vérifier à l'essayage, en bougeant vraiment.",
      description:
        "Robe de mariée sirène et confort : une fente, une matière extensible, un bon ajustement pour marcher et danser. Les conseils et sirènes de MADAMOON, Paris.",
      chapo:
        "La sirène a la réputation d'entraver. Bien choisie et bien ajustée, elle se danse pourtant toute la nuit.",
      sections: [
        {
          titre: "Ce qui laisse bouger",
          texte: [],
          liste: [
            "Une fente — celle de Bondi, haute sur la cuisse, « facilite les mouvements », dit sa fiche ; Mira, Milan, Charlize, Shiloh et Zina en ont une aussi.",
            "Une matière extensible — Sheridan a une doublure extensible, Zina est en georgette stretch.",
            "Une jupe qui s'ouvre un peu plus haut — la démarche est plus libre.",
          ],
        },
        {
          titre: "L'ajustement",
          texte: [
            "Une sirène trop serrée entrave ; bien ajustée, elle suit. Chez MADAMOON, la robe est ajustée sur vous par les couturières jusqu'au dernier essayage, retouches incluses.",
          ],
        },
        {
          titre: "Le vérifier en cabine",
          texte: [
            "Un conseil : marchez, montez une marche, asseyez-vous, faites quelques pas de danse. Une robe qui gêne en cabine gênera toute la journée.",
          ],
        },
      ],
      aRetenir: [
        "Oui, bien choisie et bien ajustée.",
        "Une fente ou une matière extensible aident.",
        "Bougez vraiment à l'essayage.",
      ],
      liens: [
        { href: "/robes/bondi", label: "Bondi" },
        { href: "/robes/zina", label: "Zina" },
        { href: "/robes/sheridan", label: "Sheridan" },
      ],
    },

    /* ——————————————————————————————————— s'asseoir, se déplacer ————— */
    {
      slug: "s-asseoir-se-deplacer-robe-sirene",
      q: "Comment s'asseoir et se déplacer avec une robe de mariée sirène ?",
      r: "Asseyez-vous sur le bord du siège, en remontant légèrement la jupe ; marchez à pas un peu plus courts ; pour un escalier, soulevez le devant de la jupe. Si la robe a une traîne, demandez à la boutique comment la porter le soir.",
      description:
        "S'asseoir et se déplacer en robe de mariée sirène : sur le bord du siège, à petits pas, la jupe soulevée dans l'escalier. Les conseils pratiques de MADAMOON.",
      chapo:
        "Quelques gestes simples, et la sirène se vit toute la journée sans y penser. Voici lesquels.",
      sections: [
        {
          titre: "S'asseoir",
          texte: [
            "Un conseil : asseyez-vous sur le bord du siège plutôt qu'au fond, le dos droit, en remontant légèrement la jupe au niveau des genoux. Le tissu ne tire pas, et la robe ne se froisse pas.",
          ],
        },
        {
          titre: "Marcher et monter un escalier",
          texte: [
            "Marchez à pas un peu plus courts qu'à l'habitude : la sirène est ajustée jusqu'aux cuisses. Dans un escalier, soulevez le devant de la jupe d'une main, pour ne pas marcher dessus.",
          ],
        },
        {
          titre: "La traîne",
          texte: [
            "Beaucoup de sirènes se prolongent en traîne — celles de Venus, de Summer ou de Siddalee sont longues. Pour la soirée, demandez à la boutique comment la relever ou la porter, au moment des retouches.",
          ],
        },
      ],
      aRetenir: [
        "Sur le bord du siège, la jupe un peu remontée.",
        "Des pas un peu plus courts.",
        "La traîne : à voir avec la boutique.",
      ],
      liens: [
        { href: "/coupes/sirene/robe-sirene-confortable-marcher-danser", label: "Le confort d'une sirène" },
        { href: "/robes/venus", label: "Venus" },
        { href: "/robes/summer", label: "Summer" },
      ],
    },

    /* ——————————————————————————————————————— le décolleté ————— */
    {
      slug: "decollete-robe-sirene",
      q: "Quel type de décolleté choisir avec une robe sirène ?",
      r: "Celui qui répond à votre silhouette et au style de la robe : un cœur pour adoucir, un V ou un décolleté plongeant pour allonger, un décolleté droit ou des épaules dénudées pour élargir les épaules, un drapé pour la douceur. La sirène se marie avec tous.",
      description:
        "Quel décolleté pour une robe sirène : cœur, V, plongeant, droit, épaules dénudées, drapé. Comment choisir, avec les sirènes de la boutique MADAMOON.",
      chapo:
        "La sirène dessine le bas de la silhouette ; le décolleté décide du haut. Voici comment les accorder.",
      sections: [
        {
          titre: "Les décolletés du catalogue",
          texte: [],
          liste: [
            "Le cœur — Meredith, Ariel ; en cœur pointu, plus graphique, Sheridan et Oksana.",
            "Le V et le plongeant — Summer, Bondi ; Aleida, plongeant, entre de fines bretelles ; Mira, profond.",
            "Le droit et les épaules dénudées — Enid, qui se porte en bustier ou en col bardot.",
            "Le drapé — Rowan ; Milan, drapé au niveau du buste.",
          ],
        },
        {
          titre: "Selon votre silhouette",
          texte: [
            "Un V ou un cœur ouvrent le buste et allongent le cou, pour une poitrine généreuse. Des épaules dénudées ou un décolleté droit élargissent les épaules, pour une morphologie en A. Avec des proportions équilibrées, rien n'est à compenser.",
          ],
        },
        {
          titre: "Selon le style",
          texte: [
            "Un décolleté plongeant pour une sirène sensuelle, un col bardot pour une allure plus classique, des bretelles amovibles — comme sur Ariel ou Siddalee — pour changer d'allure entre la cérémonie et la soirée.",
          ],
        },
      ],
      aRetenir: [
        "La sirène se marie avec tous les décolletés.",
        "V et cœur ouvrent le buste.",
        "Épaules dénudées et droit élargissent les épaules.",
      ],
      liens: [
        { href: "/robes/meredith", label: "Meredith" },
        { href: "/robes/enid", label: "Enid" },
        { href: "/robes/aleida", label: "Aleida" },
      ],
    },

    /* ——————————————————————————————————————— la matière ————— */
    {
      slug: "matiere-robe-sirene",
      q: "Quelle matière choisir pour une robe sirène ?",
      r: "Une matière qui tient et qui lisse la silhouette : le crêpe et le satin mat en premier, la charmeuse pour un tombé plus souple, la dentelle pour le décor. Une version extensible ajoute du confort.",
      description:
        "Quelle matière pour une robe de mariée sirène : crêpe, satin mat, charmeuse, dentelle, versions stretch. Comment choisir, avec les sirènes MADAMOON.",
      chapo:
        "La sirène épouse le corps : sa matière se voit plus que dans toute autre coupe. Voici comment la choisir.",
      sections: [
        {
          titre: "Les matières qui tiennent",
          texte: [
            "Le crêpe lisse la silhouette et tombe droit — Mira, Milan, Bondi, Elin. Le satin mat donne de la tenue et une lumière douce — Sheridan, Venus, Montana, Ariel. Le néoprène, plus structuré encore, sculpte la ligne — Enid.",
          ],
        },
        {
          titre: "Les matières plus souples",
          texte: [
            "La charmeuse, fluide et lumineuse, suit le corps de près — Riviera, Rowan, Amaryllis. La georgette stretch de Zina associe souplesse et confort.",
          ],
        },
        {
          titre: "La dentelle",
          texte: [
            "Posée sur une sirène, elle ajoute le décor sans changer la ligne : dentelle de Chantilly pour Oksana et Shiloh, dentelle d'Alençon pour Summer, dentelle en relief pour Meredith.",
          ],
        },
      ],
      aRetenir: [
        "Crêpe et satin mat : de la tenue.",
        "Charmeuse : un tombé plus souple.",
        "Dentelle : le décor.",
      ],
      liens: [
        { href: "/robes/mira", label: "Mira" },
        { href: "/robes/venus", label: "Venus" },
        { href: "/robes/riviera", label: "Riviera" },
      ],
    },

    /* ——————————————————————————————————————— le mariage civil ————— */
    {
      slug: "robe-sirene-mariage-civil",
      q: "Une robe sirène convient-elle à un mariage civil ?",
      r: "Oui. Une sirène minimaliste en crêpe ou en satin, sans longue traîne, a toute sa place à la mairie. Certaines sont même pensées pour cela, comme Elin, d'Olya Mak, courte et en crêpe.",
      description:
        "Robe de mariée sirène pour un mariage civil : minimaliste, en crêpe ou en satin, sans longue traîne. Les sirènes MADAMOON pour la mairie, Paris 10e.",
      chapo:
        "La mairie n'appelle pas une robe moins belle, mais une robe plus simple à vivre. La sirène sait l'être.",
      sections: [
        {
          titre: "Une sirène pensée pour la mairie",
          texte: [
            "Elin, d'Olya Mak, est une robe courte en crêpe, pensée pour un mariage civil : une ligne épurée, qui va à l'essentiel.",
          ],
        },
        {
          titre: "Des sirènes minimalistes",
          texte: [
            "Milan, de Monica Loretti, en crêpe léger ; Bondi et Enid, de Casablanca Bridal, minimalistes. Sans longue traîne ni volume, elles se portent facilement dans une salle de mairie, puis en ville.",
          ],
        },
        {
          titre: "Deux cérémonies, deux allures",
          texte: [
            "Si la mairie précède une cérémonie religieuse ou une réception, une robe qui change d'allure peut servir aux deux : Mira peut s'accompagner d'une jupe amovible en tulle, Tessa d'une surjupe détachable.",
          ],
        },
      ],
      aRetenir: [
        "Oui : une sirène minimaliste a sa place à la mairie.",
        "Elin est pensée pour un mariage civil.",
        "Une jupe amovible pour deux cérémonies.",
      ],
      liens: [
        { href: "/robes/elin", label: "Elin" },
        { href: "/robes/milan", label: "Milan" },
        { href: "/robes/mira", label: "Mira" },
      ],
    },

    /* ——————————————————————————————————————— la dentelle ————— */
    {
      slug: "robe-sirene-dentelle",
      q: "Comment choisir une robe sirène avec de la dentelle ?",
      r: "Regardez trois choses : la dentelle elle-même — Chantilly, Alençon, en relief —, l'endroit où elle est posée — toute la robe, le corsage, le dos ou la traîne —, et la façon dont elle s'arrête, souvent en feston au bas de la jupe.",
      description:
        "Choisir une robe sirène en dentelle : Chantilly, Alençon ou relief, posée partout ou sur le dos, festonnée en bas. Les sirènes en dentelle de MADAMOON.",
      chapo:
        "Toutes les dentelles ne racontent pas la même histoire. Sur une sirène, qui épouse le corps, elles se voient d'autant plus.",
      sections: [
        {
          titre: "La dentelle elle-même",
          texte: [
            "La dentelle de Chantilly est fine et souple — Oksana, Shiloh, Charlize. La dentelle d'Alençon, plus dessinée, a un relief délicat — Summer. La dentelle en relief, plus marquée, sculpte la robe — Meredith. Fancy et Aleida jouent les dentelles scintillantes.",
          ],
        },
        {
          titre: "L'endroit où elle est posée",
          texte: [
            "Sur toute la robe, elle habille la silhouette entière, comme sur Uma ou Fancy. Sur le dos, elle crée une surprise — Venus a un dos en dentelle, Montana un dos illusion. Sur la traîne, elle prolonge la robe — celle d'Aleida est en dentelle festonnée.",
          ],
        },
        {
          titre: "Après le mariage",
          texte: [
            "La dentelle est la matière la plus fragile d'une robe. Un pressing spécialisé et un rangement à plat la gardent belle longtemps.",
          ],
        },
      ],
      aRetenir: [
        "Chantilly, Alençon ou relief.",
        "Partout, au dos ou sur la traîne.",
        "Une matière fragile, à entretenir.",
      ],
      liens: [
        { href: "/robes/summer", label: "Summer" },
        { href: "/robes/meredith", label: "Meredith" },
        { href: "/faq/entretenir-robe-de-mariee-dentelle", label: "Entretenir une robe en dentelle" },
      ],
    },

    /* ——————————————————————————————————————— les manches ————— */
    {
      slug: "robe-sirene-avec-manches",
      q: "Une robe sirène avec manches est-elle possible ?",
      r: "Oui. Des manches longues en dentelle ou en satin, ou des manches amovibles qu'on retire pour la soirée : plusieurs sirènes du catalogue en ont. Elles équilibrent le haut du corps et se portent en toute saison.",
      description:
        "Robe de mariée sirène avec manches : longues en dentelle ou en satin, ou amovibles. Les sirènes à manches de MADAMOON — Montana, Bella, Riviera — à Paris.",
      chapo:
        "Une sirène à manches allie la ligne la plus sculptée à une allure plus couverte. Le catalogue en a plusieurs.",
      sections: [
        {
          titre: "Des manches longues",
          texte: [
            "Montana, de Casablanca Bridal, en satin mat, a des manches longues en dentelle et un dos illusion. Bella, en satin orné de perles, associe des manches longues à un dos nu.",
          ],
        },
        {
          titre: "Des manches amovibles",
          texte: [
            "Riviera, de Watters Designs, en charmeuse, a des manches amovibles, et son corsage comme ses manches sont sublimés de perles : avec manches pour la cérémonie, sans pour la soirée.",
          ],
        },
        {
          titre: "Ce qu'elles apportent",
          texte: [
            "Elles équilibrent le haut du corps — utile pour une morphologie en A — et habillent un mariage d'hiver ou une cérémonie religieuse.",
          ],
        },
      ],
      aRetenir: [
        "Oui : plusieurs sirènes en ont.",
        "Longues ou amovibles.",
        "Elles équilibrent le haut du corps.",
      ],
      liens: [
        { href: "/robes/montana", label: "Montana" },
        { href: "/robes/riviera", label: "Riviera" },
        { href: "/faq/robe-de-mariee-hiver", label: "Une robe pour un mariage en hiver" },
      ],
    },

    /* ——————————————————————————————————————— les accessoires ————— */
    {
      slug: "accessoiriser-robe-sirene",
      q: "Comment accessoiriser une robe de mariée sirène ?",
      r: "Avec retenue : la sirène dessine déjà la silhouette. Un voile, une cape ou des bijoux, mais rarement tous à la fois. Certaines sirènes ont leurs propres pièces — la cape assortie de Sheridan, les chaînes de perles amovibles d'Oksana, les fleurs 3D optionnelles de Zina.",
      description:
        "Accessoiriser une robe de mariée sirène : voile, cape, bijoux, avec retenue. Les pièces des sirènes MADAMOON — cape de Sheridan, perles d'Oksana — à Paris.",
      chapo:
        "La sirène est déjà une déclaration. L'accessoire la prolonge — à condition de ne pas lui faire concurrence.",
      sections: [
        {
          titre: "Les pièces des robes",
          texte: [],
          liste: [
            "Sheridan — une cape en tulle plissé asymétrique, ornée de la même dentelle que la robe.",
            "Oksana — des chaînes de perles et de sequins amovibles sur le décolleté, et des bretelles perlées amovibles.",
            "Zina — des fleurs 3D faites main, optionnelles.",
            "Ariel, Siddalee — des bretelles amovibles.",
          ],
        },
        {
          titre: "Le voile",
          texte: [
            "Un conseil : accordez sa longueur à la traîne. Un voile long prolonge une sirène à traîne ; un voile court laisse voir le dos, souvent travaillé sur une sirène.",
          ],
        },
        {
          titre: "Les bijoux",
          texte: [
            "Avec un décolleté chargé de perles ou de dentelle, des boucles d'oreilles suffisent. Avec une sirène minimaliste, un bijou plus marqué peut porter toute la tenue.",
          ],
        },
      ],
      aRetenir: [
        "Avec retenue : la sirène se suffit.",
        "Certaines robes ont leurs propres pièces.",
        "Un voile accordé à la traîne.",
      ],
      liens: [
        { href: "/robes/sheridan", label: "Sheridan" },
        { href: "/robes/oksana", label: "Oksana" },
        { href: "/robes/zina", label: "Zina" },
      ],
    },
  ],
  princesse: [
    /* ——————————————————————————————————————— la définition ————— */
    {
      slug: "qu-est-ce-qu-une-robe-de-mariee-princesse",
      q: "Qu'est-ce qu'une robe de mariée princesse ?",
      r: "Une robe au corsage ajusté, souvent structuré en corset, d'où part une jupe ample qui descend jusqu'au sol. C'est la silhouette des robes de bal : la taille est marquée, le volume assumé. La boutique la dit raffinée et solennelle.",
      description:
        "Qu'est-ce qu'une robe de mariée princesse ? Un corset travaillé, une taille marquée, une jupe ample jusqu'au sol. Définition et princesses MADAMOON, Paris.",
      chapo:
        "Raffinée et solennelle : la princesse est la robe de bal de la mariée. Voici ce qui la définit.",
      sections: [
        {
          titre: "Un corsage, puis le volume",
          texte: [
            "Le haut est ajusté : un bustier ou un corset qui suit la poitrine et marque la taille. De la taille — ou d'une taille basque ou basse, qui descend un peu plus bas — part une jupe ample, qui s'élargit jusqu'au sol et se prolonge souvent d'une traîne.",
          ],
        },
        {
          titre: "Ce qu'elle fait à la silhouette",
          texte: [
            "Elle affine la taille par contraste avec l'ampleur de la jupe, et elle couvre entièrement les hanches et les jambes. C'est la coupe des cérémonies solennelles et des grands lieux.",
          ],
        },
        {
          titre: "Les princesses de la boutique",
          texte: [
            "Chez Casablanca Bridal, Guinevere en jacquard, Kensington en mikado, Addison en satin de soie, Santana en tulle et organza ; chez Watters Designs, Clover en dentelle Caterina, Ember en Dupioni, Fern et Trinity en mikado ; chez Olya Mak, Seraphina en dentelle brodée à la main.",
          ],
        },
      ],
      aRetenir: [
        "Un corsage ajusté, une jupe ample.",
        "La taille marquée par contraste.",
        "Raffinée et solennelle.",
      ],
      liens: [
        { href: "/coupes/princesse", label: "Les robes princesse" },
        { href: "/robes/guinevere", label: "Guinevere" },
        { href: "/robes/kensington", label: "Kensington" },
      ],
    },

    /* ——————————————————————————————————————— les morphologies ————— */
    {
      slug: "robe-princesse-quelle-morphologie",
      q: "À quelle morphologie la robe princesse convient-elle ?",
      r: "Elle fait partie des premières coupes à essayer pour les morphologies en A, en V, en 8 et en X. Pour une morphologie en O ou en H, elle vient en second, et vaut l'essai. Aucune morphologie ne l'interdit : tout se joue sur le corsage et le volume de la jupe.",
      description:
        "Robe de mariée princesse : à quelles morphologies convient-elle ? En premier pour A, V, 8 et X, à essayer pour O et H. Les conseils de la boutique MADAMOON.",
      chapo:
        "La princesse va à plus de silhouettes qu'on ne le croit. Voici pour qui elle vient en premier, et pourquoi.",
      sections: [
        {
          titre: "Les morphologies pour qui elle vient en premier",
          texte: [],
          liste: [
            "En A — son corsage travaillé ramène le regard vers le haut, et la jupe répond aux hanches sans les marquer.",
            "En V — la jupe ample donne du volume au bas et équilibre des épaules plus larges.",
            "En 8 — le corsage se cintre à la taille et l'ampleur part de là : le contraste est net.",
            "En X — l'ampleur part d'une taille déjà fine, sans que la robe ait à forcer.",
          ],
        },
        {
          titre: "Celles pour qui elle vaut l'essai",
          texte: [
            "En O, préférez une jupe plus légère et un décolleté en V ou en cœur, qui met la poitrine en valeur. En H, un corset et une taille basque dessinent la taille que la silhouette ne marque pas.",
          ],
        },
        {
          titre: "Au catalogue",
          texte: [
            "Plusieurs princesses de la boutique — Addison, Clover, Ember, Kensington, Livia, Seraphina — sont indiquées, sur leurs fiches, pour les six morphologies. C'est l'essayage qui tranche.",
          ],
        },
      ],
      aRetenir: [
        "En premier pour A, V, 8 et X.",
        "À essayer pour O et H.",
        "Le corsage et le volume font la différence.",
      ],
      liens: [
        { href: "/morphologies/a/robe-princesse-morphologie-a", label: "La princesse et la morphologie en A" },
        { href: "/morphologies/8/robe-princesse-morphologie-8", label: "La princesse et la morphologie en 8" },
        { href: "/morphologies", label: "Les six morphologies" },
      ],
    },

    /* ——————————————————————————————————————— la trapèze ————— */
    {
      slug: "difference-robe-princesse-robe-trapeze",
      q: "Quelle différence entre une robe princesse et une robe trapèze ?",
      r: "Les deux ont un buste ajusté et une jupe qui s'élargit. La trapèze s'ouvre en A, régulièrement, sans ampleur excessive ; la princesse marque la taille par un corset et assume un vrai volume de jupe. Plusieurs robes du catalogue se situent entre les deux.",
      description:
        "Robe princesse ou robe trapèze : la trapèze s'ouvre en A, la princesse marque la taille et assume le volume. La différence, et les modèles MADAMOON à Paris.",
      chapo:
        "Elles partagent un même départ, un buste ajusté. Ce qui les sépare, c'est la jupe.",
      sections: [
        {
          titre: "Ce qu'elles partagent",
          texte: [
            "Un haut ajusté et une jupe qui s'élargit vers le sol : ni l'une ni l'autre ne suit les hanches et les cuisses, à la différence d'une sirène.",
          ],
        },
        {
          titre: "Ce qui les distingue",
          texte: [],
          liste: [
            "La trapèze — la jupe s'ouvre en A, en ligne droite depuis la taille. La boutique la tient pour la coupe la plus universelle.",
            "La princesse — un corset travaillé, une taille marquée et une jupe ample, au volume assumé : la silhouette d'une robe de bal.",
          ],
        },
        {
          titre: "Entre les deux",
          texte: [
            "Hayes, Sienna et Charlotte sont décrites au catalogue comme des robes « princesse ou trapèze » : le volume de leur jupe les place à la frontière. C'est en cabine que l'on voit de quel côté elles penchent sur vous.",
          ],
        },
      ],
      aRetenir: [
        "Trapèze : une jupe qui s'ouvre en A.",
        "Princesse : un vrai volume, une taille marquée.",
        "Certaines robes sont entre les deux.",
      ],
      liens: [
        { href: "/coupes/trapeze", label: "Les robes trapèze" },
        { href: "/robes/hayes", label: "Hayes" },
        { href: "/robes/charlotte", label: "Charlotte" },
      ],
    },

    /* ——————————————————————————————————————— les petites tailles ————— */
    {
      slug: "robe-princesse-petite-taille",
      q: "Une robe princesse est-elle adaptée aux petites tailles ?",
      r: "Oui, à condition de proportionner le volume. Une jupe moins large, une matière légère comme le tulle ou l'organza, un décolleté en V ou une taille basque en pointe allongent la silhouette. Et la longueur se règle sur vous, aux retouches.",
      description:
        "Robe de mariée princesse et petite taille : un volume proportionné, des matières légères, un décolleté en V pour allonger. Les conseils de MADAMOON, Paris.",
      chapo:
        "Une princesse n'est pas réservée aux grandes silhouettes. Elle demande seulement que le volume soit à votre échelle.",
      sections: [
        {
          titre: "Proportionner le volume",
          texte: [
            "C'est le conseil principal : une jupe dont l'ampleur reste en rapport avec votre taille. Une jupe très large et très structurée peut prendre le dessus sur une petite silhouette ; une ampleur plus mesurée la laisse respirer.",
          ],
        },
        {
          titre: "Ce qui allonge",
          texte: [],
          liste: [
            "Un décolleté en V — Livia, Amandine, Santana : il étire le buste.",
            "Une taille basque en pointe — Guinevere, Santana : elle prolonge la ligne vers le bas.",
            "Des matières aériennes — le tulle et l'organza donnent du volume sans poids.",
          ],
        },
        {
          titre: "La longueur",
          texte: [
            "Après l'essayage, la boutique prend vos mensurations pour lancer la confection, et ses couturières ajustent la robe sur place. Un conseil : venez aux essayages avec les chaussures du jour J, la longueur se règle sur elles.",
          ],
        },
      ],
      aRetenir: [
        "Oui, avec un volume à votre échelle.",
        "Le V et la taille basque allongent.",
        "La longueur se règle sur vous.",
      ],
      liens: [
        { href: "/robes/livia", label: "Livia" },
        { href: "/robes/santana", label: "Santana" },
        { href: "/faq/duree-retouches-robe-de-mariee", label: "La durée des retouches" },
      ],
    },

    /* ——————————————————————————————————————— le volume ————— */
    {
      slug: "choisir-volume-jupe-robe-princesse",
      q: "Comment choisir le volume de jupe d'une robe princesse ?",
      r: "Selon trois choses : votre silhouette, le lieu et la journée que vous voulez vivre. La matière décide aussi : le mikado ou le jacquard tiennent un volume structuré, le tulle et l'organza un volume aérien. Le plus sûr est d'essayer deux ampleurs différentes.",
      description:
        "Choisir le volume de jupe d'une robe de mariée princesse : silhouette, lieu, matière. Mikado structuré ou tulle aérien, les conseils de MADAMOON à Paris.",
      chapo:
        "Le volume fait la princesse. Il se choisit comme une coupe : à votre silhouette, à votre lieu, à votre journée.",
      sections: [
        {
          titre: "La matière fait le volume",
          texte: [],
          liste: [
            "Structuré — le mikado de Livia, « une jupe qui tient toute seule », ou celui de Kensington, qui apporte structure et volume.",
            "Texturé — le jacquard floral de Guinevere, pour une jupe de robe de bal.",
            "Aérien — le tulle et l'organza de Santana, une jupe volumineuse mais légère.",
            "Ample et léger — la jupe d'Ember, en Dupioni, ou celle de Seraphina, volumineuse tout en gardant « une légèreté aérienne ».",
          ],
        },
        {
          titre: "Le lieu et la journée",
          texte: [
            "Un conseil : un grand volume se déploie dans une salle de réception, un château, une église ; il demande plus de place dans une mairie, une voiture ou sur une piste de danse animée. Pensez à toute la journée, pas seulement à l'entrée.",
          ],
        },
        {
          titre: "À votre silhouette",
          texte: [
            "Pour une petite silhouette, une ampleur mesurée ; pour des épaules larges, une jupe généreuse qui rééquilibre. En cabine, comparez deux volumes : la différence se voit tout de suite.",
          ],
        },
      ],
      aRetenir: [
        "La matière fait le volume.",
        "Pensez au lieu et à toute la journée.",
        "Essayez deux ampleurs.",
      ],
      liens: [
        { href: "/robes/livia", label: "Livia" },
        { href: "/robes/santana", label: "Santana" },
        { href: "/robes/kensington", label: "Kensington" },
      ],
    },

    /* ——————————————————————————————————————— la danse ————— */
    {
      slug: "robe-princesse-confortable-danser",
      q: "Une robe princesse est-elle confortable pour danser ?",
      r: "Oui, si elle est bien ajustée et que son volume vous laisse bouger. Une jupe légère se porte plus facilement qu'une jupe très structurée, et une traîne se gère mieux relevée. Le corsage doit tenir sans gêner : c'est à vérifier à l'essayage, en bougeant vraiment.",
      description:
        "Robe de mariée princesse et danse : un corsage qui tient sans serrer, une jupe légère, une traîne qu'on relève. Les conseils de la boutique MADAMOON, Paris.",
      chapo:
        "Une princesse n'empêche pas de danser. Elle demande de choisir la robe pour la soirée autant que pour la cérémonie.",
      sections: [
        {
          titre: "Le corsage",
          texte: [
            "Un corsage structuré tient la robe : c'est lui qui porte le poids de la jupe. Celui de Clover, d'après sa fiche, « assure un bon maintien ». Il doit aussi vous laisser lever les bras et respirer : à l'essayage, faites les gestes de la soirée.",
          ],
        },
        {
          titre: "La jupe",
          texte: [
            "Plus elle est légère, plus elle suit le mouvement. La jupe d'Ember est décrite comme « ample et légère » ; celle de Seraphina garde « une légèreté aérienne ». Une jupe très structurée, en mikado, se porte magnifiquement mais pèse davantage.",
          ],
        },
        {
          titre: "La traîne",
          texte: [
            "Un conseil : demandez en cabine comment la traîne se relève ou s'accroche pour la soirée. Une traîne longue, comme celle de deux mètres de Kensington, se porte pour l'entrée, pas pour la piste.",
          ],
        },
      ],
      aRetenir: [
        "Un corsage qui tient sans serrer.",
        "Une jupe légère suit le mouvement.",
        "La traîne se relève pour danser.",
      ],
      liens: [
        { href: "/robes/clover-perles", label: "Clover" },
        { href: "/robes/ember", label: "Ember" },
        { href: "/robes/seraphina", label: "Seraphina" },
      ],
    },

    /* ——————————————————————————————————————— le corsage ————— */
    {
      slug: "corsage-robe-princesse",
      q: "Quel corsage choisir avec une jupe princesse ?",
      r: "Celui qui met en valeur votre buste et équilibre le volume de la jupe. Un bustier cœur, un décolleté en V, une encolure carrée, des épaules dénudées ou des manches longues : le catalogue a chacun. Une taille basque ou basse prolonge le corsage et affine la ligne.",
      description:
        "Quel corsage pour une robe de mariée princesse ? Bustier cœur, V, carré, épaules dénudées, manches longues, taille basque. Les princesses MADAMOON, Paris.",
      chapo:
        "La jupe fait le volume ; le corsage fait le caractère. Voici les possibilités, robe par robe.",
      sections: [
        {
          titre: "Les décolletés",
          texte: [],
          liste: [
            "Cœur — Guinevere, plongeant et pointu ; Hayes, revisité ; Ember, souligné d'une découpe en V.",
            "En V — Livia, un V franc ; Amandine, plongeant ; Santana, sur de fines bretelles.",
            "Carré — Clover, en dentelle Caterina.",
            "Épaules dénudées — Kensington, brodée de perles jusqu'aux manches ; Trinity.",
          ],
        },
        {
          titre: "Les manches et les bretelles",
          texte: [
            "Seraphina, d'Olya Mak, associe un corsage transparent à des manches longues et à un dos nu. Addison a des bretelles tombantes amovibles : on les porte ou non.",
          ],
        },
        {
          titre: "La ligne de taille",
          texte: [
            "La taille basque, qui descend en pointe sous la taille, prolonge le corsage : Guinevere, Santana. La taille basse aussi : Ember, Clover. Elles affinent la ligne et font partir le volume un peu plus bas. Un conseil : un corsage chargé appelle une jupe épurée, et l'inverse.",
          ],
        },
      ],
      aRetenir: [
        "Le corsage fait le caractère.",
        "Cœur, V, carré ou épaules dénudées.",
        "La taille basque affine la ligne.",
      ],
      liens: [
        { href: "/robes/guinevere", label: "Guinevere" },
        { href: "/robes/clover-perles", label: "Clover" },
        { href: "/robes/seraphina", label: "Seraphina" },
      ],
    },

    /* ——————————————————————————————————————— bustier ou corset ————— */
    {
      slug: "difference-bustier-corset-robe-princesse",
      q: "Quelle différence entre un bustier et un corset sur une robe princesse ?",
      r: "Le bustier désigne une forme : un haut sans bretelles ni manches, qui s'arrête au-dessus de la poitrine. Le corset désigne une construction : un corsage structuré, souvent baleiné, qui modèle la taille. Une robe peut être les deux à la fois, comme Guinevere et son corset bustier.",
      description:
        "Bustier ou corset sur une robe de mariée princesse : l'un est une forme sans bretelles, l'autre une structure qui modèle la taille. La différence expliquée.",
      chapo:
        "Deux mots souvent confondus. L'un dit ce que l'on voit, l'autre ce qui tient la robe.",
      sections: [
        {
          titre: "Le bustier, une forme",
          texte: [
            "Un haut sans bretelles ni manches, qui laisse les épaules et les bras nus. Il tient par sa structure et par l'ajustement. Hayes, Sienna et Charlotte sont des bustiers à décolleté cœur.",
          ],
        },
        {
          titre: "Le corset, une construction",
          texte: [
            "Un corsage structuré, souvent baleiné, qui modèle la taille et porte le poids de la jupe. Il peut avoir des bretelles ou des manches. Ember a un corset « qui structure la silhouette » ; Clover, un corsage structuré qui « assure un bon maintien ».",
          ],
        },
        {
          titre: "Les deux à la fois",
          texte: [
            "Guinevere réunit les deux : un corset bustier, à décolleté cœur plongeant, prolongé d'une taille basque. Charlotte aussi, avec son corset en taille basque. À l'essayage, vérifiez que le haut tient seul quand vous levez les bras.",
          ],
        },
      ],
      aRetenir: [
        "Le bustier est une forme : sans bretelles.",
        "Le corset est une structure : il modèle la taille.",
        "Une robe peut être les deux.",
      ],
      liens: [
        { href: "/robes/guinevere", label: "Guinevere" },
        { href: "/robes/ember", label: "Ember" },
        { href: "/coupes/princesse/corsage-robe-princesse", label: "Quel corsage choisir" },
      ],
    },

    /* ——————————————————————————————————————— sans excès ————— */
    {
      slug: "robe-princesse-pas-trop-imposante",
      q: "Comment éviter qu'une robe princesse soit trop imposante ?",
      r: "En jouant sur trois choses : une jupe d'ampleur mesurée, une matière légère comme le tulle ou l'organza, et un corsage qui équilibre la jupe. Une traîne modérée allège aussi la silhouette. Et certaines robes, entre princesse et trapèze, sont à comparer en cabine.",
      description:
        "Une robe de mariée princesse sans excès : volume mesuré, tulle léger, corsage qui équilibre, traîne modérée. Les conseils et modèles de MADAMOON à Paris.",
      chapo:
        "On peut aimer la princesse sans vouloir disparaître dedans. Voici comment garder l'allure et alléger le reste.",
      sections: [
        {
          titre: "Alléger la jupe",
          texte: [
            "Une ampleur mesurée plutôt que maximale, et une matière aérienne : le tulle et l'organza donnent du volume sans masse. Une jupe épurée, comme celle d'Addison, en satin de soie, garde la ligne nette.",
          ],
        },
        {
          titre: "Équilibrer le haut",
          texte: [
            "Un conseil : quand la jupe est généreuse, un corsage plus simple la laisse respirer, et un décolleté en V ou des épaules dégagées ouvrent la silhouette. Une traîne modérée, plutôt qu'une traîne cathédrale, allège encore l'ensemble.",
          ],
        },
        {
          titre: "Entre deux coupes",
          texte: [
            "Hayes, Sienna et Charlotte, décrites comme « princesse ou trapèze », sont à la frontière des deux. À essayer à côté d'une princesse plus ample, pour comparer.",
          ],
        },
      ],
      aRetenir: [
        "Une ampleur mesurée, une matière légère.",
        "Un corsage qui équilibre la jupe.",
        "Comparer avec une princesse-trapèze.",
      ],
      liens: [
        { href: "/robes/hayes", label: "Hayes" },
        { href: "/robes/addison", label: "Addison" },
        { href: "/coupes/princesse/choisir-volume-jupe-robe-princesse", label: "Choisir le volume de jupe" },
      ],
    },

    /* ——————————————————————————————————————— en extérieur ————— */
    {
      slug: "robe-princesse-mariage-exterieur",
      q: "Une robe princesse convient-elle à un mariage en extérieur ?",
      r: "Oui, avec quelques précautions. Une jupe légère en tulle ou en organza se porte mieux qu'une jupe très lourde, et une traîne courte ou qui se relève évite l'herbe et le gravier. Pensez au terrain, à la saison et à la distance à parcourir.",
      description:
        "Robe de mariée princesse en extérieur : une jupe légère, une traîne courte ou qu'on relève, une matière adaptée au terrain. Les conseils de MADAMOON, Paris.",
      chapo:
        "Un jardin, une cour, un domaine : la princesse y a toute sa place. Elle demande simplement de penser au sol.",
      sections: [
        {
          titre: "Le sol et la traîne",
          texte: [
            "Un conseil : sur l'herbe ou le gravier, une traîne longue ramasse tout ce qu'elle touche. Une traîne plus courte, ou qui se relève après la cérémonie, vous laisse circuler sans y penser.",
          ],
        },
        {
          titre: "La matière",
          texte: [
            "Le tulle et l'organza, comme sur Santana, sont aériens et bougent avec l'air ; le mikado et le jacquard tiennent leur forme. Par temps chaud, une jupe légère est la plus agréable à porter toute la journée.",
          ],
        },
        {
          titre: "La saison",
          texte: [
            "Pour un mariage d'été, des épaules dégagées ou de fines bretelles ; pour une fin de saison, des manches longues comme celles de Seraphina. Et pour le soir, une étole ou une cape.",
          ],
        },
      ],
      aRetenir: [
        "Oui, avec une jupe légère.",
        "Une traîne courte ou qui se relève.",
        "Pensez au terrain et à la saison.",
      ],
      liens: [
        { href: "/robes/santana", label: "Santana" },
        { href: "/robes/seraphina", label: "Seraphina" },
        { href: "/faq/robe-de-mariee-hiver", label: "Une robe pour un mariage en hiver" },
      ],
    },

    /* ——————————————————————————————————————— le voile ————— */
    {
      slug: "voile-robe-de-mariee-princesse",
      q: "Quel voile porter avec une robe de mariée princesse ?",
      r: "Un voile qui s'accorde au volume et à la traîne. Un voile long, qui prolonge la traîne, souligne la solennité ; un voile plus court laisse voir le dos et la jupe. Santana a même son voile assorti, longueur « doigts », disponible séparément.",
      description:
        "Quel voile avec une robe de mariée princesse ? Long pour prolonger la traîne, court pour laisser voir le dos. Le voile assorti de Santana, chez MADAMOON.",
      chapo:
        "Avec une princesse, le voile complète la silhouette. Voici comment l'accorder à la robe.",
      sections: [
        {
          titre: "Long ou court",
          texte: [],
          liste: [
            "Un voile long — il prolonge la traîne et accompagne une cérémonie solennelle ; il va à une robe à traîne, comme Kensington ou Guinevere.",
            "Un voile longueur « doigts » — il s'arrête au bout des doigts, bras le long du corps, et laisse voir toute la jupe.",
            "Un voile court — il dégage le dos et le corsage.",
          ],
        },
        {
          titre: "Le dos de la robe",
          texte: [
            "Quand le dos est travaillé, laissez-le voir : la rangée de boutons d'Addison, qui court jusqu'au bout de la traîne, ou le dos nu de Seraphina. Un voile en tulle léger et transparent les laisse paraître.",
          ],
        },
        {
          titre: "Le voile de Santana",
          texte: [
            "D'après sa fiche, Santana, de Casablanca Bridal, peut être accompagnée d'un voile assorti, longueur « doigts », et de gants en tulle de soie ornés de dentelle florale, disponibles séparément.",
          ],
        },
      ],
      aRetenir: [
        "Accordé au volume et à la traîne.",
        "Long pour la solennité, court pour le dos.",
        "Santana a son voile assorti.",
      ],
      liens: [
        { href: "/robes/santana", label: "Santana" },
        { href: "/robes/addison", label: "Addison" },
        { href: "/robes/seraphina", label: "Seraphina" },
      ],
    },

    /* ——————————————————————————————————————— les accessoires ————— */
    {
      slug: "accessoiriser-robe-princesse",
      q: "Comment accessoiriser une robe princesse sans surcharger la silhouette ?",
      r: "En choisissant un point fort et en laissant le reste discret. Une princesse porte déjà du volume : un corsage brodé appelle peu de bijoux, un corsage épuré peut accueillir un collier ou des gants. Voile, bijoux et coiffure se choisissent ensemble.",
      description:
        "Accessoiriser une robe de mariée princesse sans surcharge : un seul point fort, des bijoux mesurés, un voile accordé. Les conseils et modèles de MADAMOON, Paris.",
      chapo:
        "La princesse est déjà une déclaration. L'accessoire la prolonge, à condition de ne pas lui faire concurrence.",
      sections: [
        {
          titre: "Un seul point fort",
          texte: [
            "Un conseil : décidez de ce qui doit attirer le regard — le corsage, le voile, un bijou — et laissez le reste en retrait. Avec une robe brodée de perles, comme Kensington ou Fern, des boucles d'oreilles suffisent.",
          ],
        },
        {
          titre: "Les pièces des robes",
          texte: [],
          liste: [
            "Santana — des gants transparents en tulle de soie, ornés de dentelle florale, et un voile assorti, disponibles séparément.",
            "Addison — des bretelles tombantes amovibles.",
            "Clover — avec ou sans les perles qui soulignent le décolleté et les contours du corset.",
          ],
        },
        {
          titre: "Les bijoux et le décolleté",
          texte: [
            "Un décolleté en V, comme celui de Livia, accueille un pendentif ; une encolure carrée ou des épaules dénudées mettent en valeur un collier court ou des boucles plus marquées ; un bustier cœur se suffit souvent à lui-même.",
          ],
        },
      ],
      aRetenir: [
        "Un seul point fort.",
        "Certaines robes ont leurs propres pièces.",
        "Le bijou suit le décolleté.",
      ],
      liens: [
        { href: "/robes/santana", label: "Santana" },
        { href: "/robes/clover-perles", label: "Clover" },
        { href: "/coupes/princesse/voile-robe-de-mariee-princesse", label: "Quel voile choisir" },
      ],
    },

    /* ——————————————————————————————————————— les matières ————— */
    {
      slug: "robe-princesse-satin-ou-dentelle",
      q: "Peut-on choisir une robe princesse en satin ou en dentelle ?",
      r: "Oui, les deux. Le satin donne une princesse lisse et lumineuse, comme Addison en satin de soie ; la dentelle, une princesse romantique, comme Clover en dentelle Caterina ou Seraphina, brodée à la main. Le catalogue a aussi du mikado, du jacquard et du Dupioni.",
      description:
        "Robe de mariée princesse en satin ou en dentelle : Addison en satin de soie, Clover et Seraphina en dentelle, et aussi le mikado. Les princesses MADAMOON, Paris.",
      chapo:
        "La princesse se décline dans toutes les matières nobles. Chacune lui donne un caractère différent.",
      sections: [
        {
          titre: "En satin",
          texte: [
            "Lisse et lumineux, il donne une ligne nette. Addison, de Casablanca Bridal, est en satin de soie, avec des motifs floraux en mousseline appliqués à la main ; Hayes associe le satin mat à la dentelle.",
          ],
        },
        {
          titre: "En dentelle",
          texte: [
            "Romantique, elle habille le corsage ou toute la robe. Clover est en dentelle Caterina ; Seraphina, d'Olya Mak, en dentelle brodée à la main ; Amandine arbore des motifs d'un style royal ; Santana pose une dentelle florale sur un corsage transparent.",
          ],
        },
        {
          titre: "Les autres matières",
          texte: [],
          liste: [
            "Le mikado — Livia, Kensington, Fern, Trinity : une matière qui tient le volume.",
            "Le jacquard — Guinevere, en jacquard floral texturé.",
            "Le Dupioni — Ember.",
            "Le tulle et l'organza — la jupe de Santana.",
          ],
        },
      ],
      aRetenir: [
        "Oui, en satin comme en dentelle.",
        "Le satin pour une ligne nette, la dentelle pour le romantisme.",
        "Le mikado pour un volume qui tient.",
      ],
      liens: [
        { href: "/robes/addison", label: "Addison" },
        { href: "/robes/clover-perles", label: "Clover" },
        { href: "/faq/entretenir-robe-de-mariee-dentelle", label: "Entretenir une robe en dentelle" },
      ],
    },

    /* ——————————————————————————————————————— se déplacer ————— */
    {
      slug: "se-deplacer-robe-de-mariee-volumineuse",
      q: "Comment se déplacer facilement avec une robe de mariée volumineuse ?",
      r: "En vous entraînant avant le jour J, avec vos chaussures. Un pas un peu plus court, la jupe avancée du bout du pied, le devant relevé dans les escaliers, la traîne relevée pour la soirée. Et une personne de confiance pour vous aider à la manœuvrer.",
      description:
        "Se déplacer avec une robe de mariée volumineuse : marcher, monter un escalier, s'asseoir, gérer la traîne. Les conseils pratiques de la boutique MADAMOON, Paris.",
      chapo:
        "Une princesse se porte toute la journée. Quelques gestes simples la rendent facile.",
      sections: [
        {
          titre: "Marcher",
          texte: [
            "Un conseil : un pas un peu plus court, et la jupe qu'on avance légèrement du bout du pied à chaque pas, pour ne pas marcher dessus. Entraînez-vous aux essayages, avec les chaussures du jour J.",
          ],
        },
        {
          titre: "L'escalier, la voiture, la chaise",
          texte: [],
          liste: [
            "L'escalier — relevez le devant de la jupe des deux mains pour voir les marches ; la traîne suit derrière.",
            "La voiture — asseyez-vous d'abord, puis rentrez les jambes et la jupe ; quelqu'un peut aider à la ranger.",
            "La chaise — asseyez-vous au bord, laissez la jupe s'étaler et ramenez la traîne sur le côté.",
          ],
        },
        {
          titre: "La traîne et les poches",
          texte: [
            "Demandez en cabine comment la traîne se relève pour la soirée. Certaines princesses ont des poches : Guinevere, des poches discrètes ; Addison, des poches « bien pratiques » — de quoi garder un mouchoir à portée de main.",
          ],
        },
      ],
      aRetenir: [
        "Entraînez-vous avec vos chaussures.",
        "Relevez le devant dans les escaliers.",
        "La traîne se relève pour la soirée.",
      ],
      liens: [
        { href: "/robes/guinevere", label: "Guinevere" },
        { href: "/robes/addison", label: "Addison" },
        { href: "/coupes/princesse/robe-princesse-confortable-danser", label: "Danser en robe princesse" },
      ],
    },
  ],
};
