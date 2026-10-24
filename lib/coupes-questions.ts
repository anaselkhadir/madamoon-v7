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
};
