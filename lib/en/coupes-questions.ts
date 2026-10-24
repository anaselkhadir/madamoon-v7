import { QUESTIONS_COUPES, type QuestionCoupe } from "@/lib/coupes-questions";

/*
 * The silhouette questions, in English.
 *
 * Same order, same addresses, same facts as the French table: what the
 * dresses' own pages say, nothing more. We translate, we do not embellish.
 */

const fr = (ancre: string, i: number) => QUESTIONS_COUPES[ancre][i].slug;

export const QUESTIONS_COUPES_EN: Record<string, QuestionCoupe[]> = {
  sirene: [
    {
      slug: fr("sirene", 0),
      q: "What is a mermaid wedding dress?",
      r: "A dress fitted to the thighs, then flared to the floor. It hugs the bust, waist and hips, shaping the figure before opening into a skirt that often ends in a train. It is the most feminine and sensual silhouette in the catalogue.",
      description:
        "What is a mermaid wedding dress? Fitted to the thighs then flared, it shapes the waist and hips. Definition, and the mermaid dresses at MADAMOON, Paris.",
      chapo:
        "Feminine and sensual: the mermaid is the silhouette that shapes the figure the most. Here is what defines it.",
      sections: [
        {
          titre: "A line in two movements",
          texte: [
            "A mermaid is fitted to the thighs, then flared. In its upper part, it follows the bust, waist and hips; below the thighs, the skirt opens and falls to the floor, often extended by a train.",
          ],
        },
        {
          titre: "What it does to the figure",
          texte: [
            "It shapes the waist and hips. On an already curvy figure, it follows; on a straighter figure, it creates the curve as it flares.",
          ],
        },
        {
          titre: "The boutique's mermaid dresses",
          texte: [
            "It is the most represented silhouette in the catalogue, from Casablanca Bridal, Watters Designs, Monica Loretti and Olya Mak: in matte satin like Sheridan or Venus, in lace like Oksana or Summer, in crêpe like Mira or Bondi, in charmeuse like Riviera.",
          ],
        },
      ],
      aRetenir: [
        "Fitted to the thighs, then flared.",
        "It shapes the waist and hips.",
        "Feminine and sensual.",
      ],
      liens: [
        { href: "/coupes/sirene", label: "Mermaid dresses" },
        { href: "/robes/sheridan", label: "Sheridan" },
        { href: "/robes/oksana", label: "Oksana" },
      ],
    },
    {
      slug: fr("sirene", 1),
      q: "Which body shape does a mermaid wedding dress suit?",
      r: "It is among the first silhouettes to try for H, 8 and X body shapes, and worth trying for an O body shape with a fabric that holds. For an A body shape, it is worn very well with a top that balances. No body shape rules it out.",
      description:
        "Mermaid wedding dress: which body shapes does it suit? First for H, 8 and X, worth trying for O and A. Advice from the MADAMOON boutique.",
      chapo:
        "The mermaid is said to be reserved for hourglass figures. That is not true: here is who it suits, and on what condition.",
      sections: [
        {
          titre: "The body shapes for which it comes first",
          texte: [],
          liste: [
            "H — it creates the curve instead of looking for it; chosen light, it lengthens the line.",
            "8 — it hugs an already proportioned line, without correcting anything.",
            "X — it follows the waist without having to create it: the silhouette that says the most with the least.",
          ],
        },
        {
          titre: "Those for which it is worth trying",
          texte: [
            "For an O, it needs a fabric that holds — crêpe rather than a light satin — and is judged far better in the fitting room than in a photograph. For an A, it is worn very well if the top has something to balance with: a sleeve, a wide strap, a worked neckline.",
          ],
        },
        {
          titre: "None rules it out",
          texte: [
            "A body shape never rules a dress out: it only tells you where to start. Many brides leave with a mermaid they had not planned to try.",
          ],
        },
      ],
      aRetenir: [
        "First: H, 8 and X body shapes.",
        "Worth trying: O and A, on certain conditions.",
        "No body shape rules it out.",
      ],
      liens: [
        { href: "/morphologies/h/robe-sirene-morphologie-h", label: "The mermaid and the H body shape" },
        { href: "/morphologies/o/robe-sirene-morphologie-o", label: "The mermaid and the O body shape" },
        { href: "/morphologies", label: "The six body shapes" },
      ],
    },
    {
      slug: fr("sirene", 2),
      q: "What is the difference between a mermaid dress and a column dress?",
      r: "Both are fitted and follow the body. The mermaid flares below the thighs, into a skirt that opens to the floor; the column falls straight, or nearly so, without flaring. In the catalogue, column dresses are filed with the mermaids.",
      description:
        "Mermaid or column dress: both fitted, the mermaid flares below the thighs, the column falls straight. The difference, and the MADAMOON models.",
      chapo:
        "They are cousins: the same start, two different endings. Here is what sets them apart.",
      sections: [
        {
          titre: "What they share",
          texte: [
            "Both are fitted: they follow the bust, waist and hips, without fullness. They need a fabric that falls well and a precise fit.",
          ],
        },
        {
          titre: "What sets them apart",
          texte: [],
          liste: [
            "The mermaid — it flares below the thighs, into a skirt that opens to the floor.",
            "The column — it falls straight or nearly so, without flaring, keeping the line of the body to the bottom.",
          ],
        },
        {
          titre: "In the catalogue",
          texte: [
            "The boutique files its column dresses with the mermaids. Siddalee and Rowan, by Watters Designs, are column dresses; Bella, by Casablanca Bridal, can be worn as a mermaid or a column; Amaryllis, as a straight cut or a mermaid.",
          ],
        },
      ],
      aRetenir: [
        "Both are fitted.",
        "The mermaid flares below the thighs.",
        "The column falls straight.",
      ],
      liens: [
        { href: "/robes/siddalee", label: "Siddalee" },
        { href: "/robes/bella", label: "Bella" },
        { href: "/morphologies/8/robe-fourreau-silhouette-8", label: "The column and the 8 body shape" },
      ],
    },
    {
      slug: fr("sirene", 3),
      q: "What is the difference between a mermaid dress and a trumpet dress?",
      r: "Both are fitted then flared. The difference lies in where the skirt opens: lower for the mermaid, around the knee; higher for the trumpet, around mid-thigh, which makes it easier to wear. The boutique files both lines under mermaid.",
      description:
        "Mermaid or trumpet dress: the skirt opens around the knee for the mermaid, higher for the trumpet, easier to wear. The difference explained.",
      chapo:
        "Mermaid, trumpet, fit-and-flare: three names for one family. What changes is where the skirt opens.",
      sections: [
        {
          titre: "The flare point",
          texte: [
            "The mermaid stays fitted longer and flares lower, around the knee: the effect is spectacular, and the stride more contained. The trumpet opens higher, around mid-thigh: the skirt takes its fullness earlier, and the dress lets you move more.",
          ],
        },
        {
          titre: "Which to choose",
          texte: [
            "If you love the most sculpted line, the mermaid. If you want to dance all night without thinking about it, a skirt that opens higher. Both are judged at the fitting, while walking.",
          ],
        },
        {
          titre: "In the catalogue",
          texte: [
            "The boutique has no \"trumpet\" category: these lines are filed with the mermaids. Several pages speak of a fit-and-flare cut, like Sheridan's or Enid's. The exact point where each skirt opens shows in the fitting room.",
          ],
        },
      ],
      aRetenir: [
        "Mermaid: the skirt opens around the knee.",
        "Trumpet: higher, around mid-thigh.",
        "Both are filed as mermaid in the catalogue.",
      ],
      liens: [
        { href: "/coupes/sirene", label: "Mermaid dresses" },
        { href: "/robes/enid", label: "Enid" },
        { href: "/robes/sheridan", label: "Sheridan" },
      ],
    },
    {
      slug: fr("sirene", 4),
      q: "Is a mermaid dress comfortable for walking and dancing?",
      r: "Yes, if it is well chosen and well fitted. A slit, a stretch fabric or a skirt that opens a little higher let you walk and dance freely. The surest way is to check at the fitting, by really moving.",
      description:
        "Mermaid wedding dress and comfort: a slit, a stretch fabric, a good fit for walking and dancing. Advice and mermaid dresses from MADAMOON, Paris.",
      chapo:
        "The mermaid is said to restrict movement. Well chosen and well fitted, it can be danced in all night.",
      sections: [
        {
          titre: "What lets you move",
          texte: [],
          liste: [
            "A slit — Bondi's, high on the thigh, \"makes movement easier\", says its page; Mira, Milan, Charlize, Shiloh and Zina have one too.",
            "A stretch fabric — Sheridan has a stretch lining, Zina is in stretch georgette.",
            "A skirt that opens a little higher — the stride is freer.",
          ],
        },
        {
          titre: "The fit",
          texte: [
            "A mermaid that is too tight restricts; well fitted, it follows. At MADAMOON, the dress is fitted on you by the seamstresses up to the last fitting, alterations included.",
          ],
        },
        {
          titre: "Check it in the fitting room",
          texte: [
            "A tip: walk, climb a step, sit down, take a few dance steps. A dress that bothers you in the fitting room will bother you all day.",
          ],
        },
      ],
      aRetenir: [
        "Yes, well chosen and well fitted.",
        "A slit or a stretch fabric helps.",
        "Really move at the fitting.",
      ],
      liens: [
        { href: "/robes/bondi", label: "Bondi" },
        { href: "/robes/zina", label: "Zina" },
        { href: "/robes/sheridan", label: "Sheridan" },
      ],
    },
    {
      slug: fr("sirene", 5),
      q: "How do I sit down and move in a mermaid wedding dress?",
      r: "Sit on the edge of the seat, lifting the skirt slightly; walk with slightly shorter steps; on stairs, lift the front of the skirt. If the dress has a train, ask the boutique how to wear it in the evening.",
      description:
        "Sitting and moving in a mermaid wedding dress: on the edge of the seat, with small steps, the skirt lifted on stairs. Practical advice from MADAMOON.",
      chapo:
        "A few simple gestures, and a mermaid is lived in all day without a thought. Here they are.",
      sections: [
        {
          titre: "Sitting down",
          texte: [
            "A tip: sit on the edge of the seat rather than at the back, with a straight back, lifting the skirt slightly at the knees. The fabric does not pull, and the dress does not crease.",
          ],
        },
        {
          titre: "Walking and climbing stairs",
          texte: [
            "Walk with slightly shorter steps than usual: a mermaid is fitted to the thighs. On stairs, lift the front of the skirt with one hand, so as not to step on it.",
          ],
        },
        {
          titre: "The train",
          texte: [
            "Many mermaids extend into a train — those of Venus, Summer and Siddalee are long. For the evening, ask the boutique how to lift or carry it, at the time of the alterations.",
          ],
        },
      ],
      aRetenir: [
        "On the edge of the seat, the skirt slightly lifted.",
        "Slightly shorter steps.",
        "The train: to discuss with the boutique.",
      ],
      liens: [
        { href: "/coupes/sirene/robe-sirene-confortable-marcher-danser", label: "Comfort in a mermaid dress" },
        { href: "/robes/venus", label: "Venus" },
        { href: "/robes/summer", label: "Summer" },
      ],
    },
    {
      slug: fr("sirene", 6),
      q: "Which neckline should I choose with a mermaid dress?",
      r: "The one that answers your figure and the style of the dress: a sweetheart to soften, a V or plunging neckline to lengthen, a straight neckline or bare shoulders to widen the shoulders, a drape for softness. A mermaid goes with all of them.",
      description:
        "Which neckline for a mermaid dress: sweetheart, V, plunging, straight, off the shoulder, draped. How to choose, with the mermaid dresses at MADAMOON.",
      chapo:
        "A mermaid shapes the lower figure; the neckline decides the top. Here is how to match them.",
      sections: [
        {
          titre: "The catalogue's necklines",
          texte: [],
          liste: [
            "Sweetheart — Meredith, Ariel; as a pointed sweetheart, more graphic, Sheridan and Oksana.",
            "V and plunging — Summer, Bondi; Aleida, plunging, between fine straps; Mira, deep.",
            "Straight and off the shoulder — Enid, worn strapless or with a Bardot neckline.",
            "Draped — Rowan; Milan, draped at the bust.",
          ],
        },
        {
          titre: "By your figure",
          texte: [
            "A V or a sweetheart opens the bust and lengthens the neck, for a generous bust. Bare shoulders or a straight neckline widen the shoulders, for an A body shape. With balanced proportions, nothing needs compensating.",
          ],
        },
        {
          titre: "By style",
          texte: [
            "A plunging neckline for a sensual mermaid, a Bardot neckline for a more classic look, detachable straps — as on Ariel or Siddalee — to change look between the ceremony and the evening.",
          ],
        },
      ],
      aRetenir: [
        "A mermaid goes with every neckline.",
        "V and sweetheart open the bust.",
        "Bare shoulders and straight necklines widen the shoulders.",
      ],
      liens: [
        { href: "/robes/meredith", label: "Meredith" },
        { href: "/robes/enid", label: "Enid" },
        { href: "/robes/aleida", label: "Aleida" },
      ],
    },
    {
      slug: fr("sirene", 7),
      q: "Which fabric should I choose for a mermaid dress?",
      r: "A fabric that holds and smooths the figure: crêpe and matte satin first, charmeuse for a softer fall, lace for decoration. A stretch version adds comfort.",
      description:
        "Which fabric for a mermaid wedding dress: crêpe, matte satin, charmeuse, lace, stretch versions. How to choose, with the mermaid dresses at MADAMOON.",
      chapo:
        "A mermaid hugs the body: its fabric shows more than in any other silhouette. Here is how to choose it.",
      sections: [
        {
          titre: "Fabrics that hold",
          texte: [
            "Crêpe smooths the figure and falls straight — Mira, Milan, Bondi, Elin. Matte satin gives hold and a soft light — Sheridan, Venus, Montana, Ariel. Neoprene, more structured still, sculpts the line — Enid.",
          ],
        },
        {
          titre: "Softer fabrics",
          texte: [
            "Charmeuse, fluid and luminous, follows the body closely — Riviera, Rowan, Amaryllis. Zina's stretch georgette combines suppleness and comfort.",
          ],
        },
        {
          titre: "Lace",
          texte: [
            "Laid on a mermaid, it adds decoration without changing the line: Chantilly lace for Oksana and Shiloh, Alençon lace for Summer, raised lace for Meredith.",
          ],
        },
      ],
      aRetenir: [
        "Crêpe and matte satin: hold.",
        "Charmeuse: a softer fall.",
        "Lace: decoration.",
      ],
      liens: [
        { href: "/robes/mira", label: "Mira" },
        { href: "/robes/venus", label: "Venus" },
        { href: "/robes/riviera", label: "Riviera" },
      ],
    },
    {
      slug: fr("sirene", 8),
      q: "Is a mermaid dress suitable for a civil wedding?",
      r: "Yes. A minimalist mermaid in crêpe or satin, without a long train, has every place at the town hall. Some are even designed for it, like Elin, by Olya Mak, short and in crêpe.",
      description:
        "Mermaid wedding dress for a civil wedding: minimalist, in crêpe or satin, without a long train. The MADAMOON mermaid dresses for the town hall, Paris.",
      chapo:
        "The town hall does not call for a less beautiful dress, but for a simpler one to live in. A mermaid can be that.",
      sections: [
        {
          titre: "A mermaid designed for the town hall",
          texte: [
            "Elin, by Olya Mak, is a short crêpe dress designed for a civil wedding: a pared-back line that goes to the essential.",
          ],
        },
        {
          titre: "Minimalist mermaids",
          texte: [
            "Milan, by Monica Loretti, in light crêpe; Bondi and Enid, by Casablanca Bridal, minimalist. Without a long train or volume, they are easy to wear in a town hall, then in town.",
          ],
        },
        {
          titre: "Two ceremonies, two looks",
          texte: [
            "If the town hall precedes a religious ceremony or a reception, a dress that changes look can serve both: Mira can come with a detachable tulle skirt, Tessa with a detachable overskirt.",
          ],
        },
      ],
      aRetenir: [
        "Yes: a minimalist mermaid belongs at the town hall.",
        "Elin is designed for a civil wedding.",
        "A detachable skirt for two ceremonies.",
      ],
      liens: [
        { href: "/robes/elin", label: "Elin" },
        { href: "/robes/milan", label: "Milan" },
        { href: "/robes/mira", label: "Mira" },
      ],
    },
    {
      slug: fr("sirene", 9),
      q: "How do I choose a mermaid dress with lace?",
      r: "Look at three things: the lace itself — Chantilly, Alençon, raised —, where it is placed — the whole dress, the bodice, the back or the train —, and how it ends, often scalloped at the bottom of the skirt.",
      description:
        "Choosing a lace mermaid dress: Chantilly, Alençon or raised, all over or on the back, scalloped at the hem. The lace mermaid dresses at MADAMOON.",
      chapo:
        "Not all lace tells the same story. On a mermaid, which hugs the body, it shows all the more.",
      sections: [
        {
          titre: "The lace itself",
          texte: [
            "Chantilly lace is fine and supple — Oksana, Shiloh, Charlize. Alençon lace, more defined, has a delicate relief — Summer. Raised lace, more marked, sculpts the dress — Meredith. Fancy and Aleida play sparkling laces.",
          ],
        },
        {
          titre: "Where it is placed",
          texte: [
            "All over, it dresses the whole figure, as on Uma or Fancy. On the back, it creates a surprise — Venus has a lace back, Montana an illusion back. On the train, it extends the dress — Aleida's is in scalloped lace.",
          ],
        },
        {
          titre: "After the wedding",
          texte: [
            "Lace is the most delicate fabric on a dress. A specialist dry cleaner and storing it flat keep it beautiful for a long time.",
          ],
        },
      ],
      aRetenir: [
        "Chantilly, Alençon or raised.",
        "All over, on the back or on the train.",
        "A delicate fabric, to look after.",
      ],
      liens: [
        { href: "/robes/summer", label: "Summer" },
        { href: "/robes/meredith", label: "Meredith" },
        { href: "/faq/entretenir-robe-de-mariee-dentelle", label: "Caring for a lace dress" },
      ],
    },
    {
      slug: fr("sirene", 10),
      q: "Is a mermaid dress with sleeves possible?",
      r: "Yes. Long sleeves in lace or satin, or detachable sleeves you remove for the evening: several mermaids in the catalogue have them. They balance the upper body and can be worn in any season.",
      description:
        "Mermaid wedding dress with sleeves: long in lace or satin, or detachable. The MADAMOON mermaids with sleeves — Montana, Bella, Riviera — in Paris.",
      chapo:
        "A mermaid with sleeves combines the most sculpted line with a more covered look. The catalogue has several.",
      sections: [
        {
          titre: "Long sleeves",
          texte: [
            "Montana, by Casablanca Bridal, in matte satin, has long lace sleeves and an illusion back. Bella, in satin with pearls, pairs long sleeves with an open back.",
          ],
        },
        {
          titre: "Detachable sleeves",
          texte: [
            "Riviera, by Watters Designs, in charmeuse, has detachable sleeves, and both its bodice and sleeves are adorned with pearls: with sleeves for the ceremony, without for the evening.",
          ],
        },
        {
          titre: "What they bring",
          texte: [
            "They balance the upper body — useful for an A body shape — and dress a winter wedding or a religious ceremony.",
          ],
        },
      ],
      aRetenir: [
        "Yes: several mermaids have them.",
        "Long or detachable.",
        "They balance the upper body.",
      ],
      liens: [
        { href: "/robes/montana", label: "Montana" },
        { href: "/robes/riviera", label: "Riviera" },
        { href: "/faq/robe-de-mariee-hiver", label: "A dress for a winter wedding" },
      ],
    },
    {
      slug: fr("sirene", 11),
      q: "How do I accessorise a mermaid wedding dress?",
      r: "With restraint: a mermaid already shapes the figure. A veil, a cape or jewellery, but rarely all at once. Some mermaids have their own pieces — Sheridan's matching cape, Oksana's detachable pearl chains, Zina's optional 3D flowers.",
      description:
        "Accessorising a mermaid wedding dress: veil, cape, jewellery, with restraint. The pieces of the MADAMOON mermaids — Sheridan's cape, Oksana's pearls.",
      chapo:
        "A mermaid is already a statement. The accessory extends it — as long as it does not compete with it.",
      sections: [
        {
          titre: "The dresses' own pieces",
          texte: [],
          liste: [
            "Sheridan — an asymmetric pleated tulle cape, adorned with the same lace as the dress.",
            "Oksana — detachable pearl and sequin chains on the neckline, and detachable beaded straps.",
            "Zina — handmade 3D flowers, optional.",
            "Ariel, Siddalee — detachable straps.",
          ],
        },
        {
          titre: "The veil",
          texte: [
            "A tip: match its length to the train. A long veil extends a mermaid with a train; a short veil lets the back show, often worked on a mermaid.",
          ],
        },
        {
          titre: "Jewellery",
          texte: [
            "With a neckline loaded with pearls or lace, earrings are enough. With a minimalist mermaid, a bolder piece can carry the whole look.",
          ],
        },
      ],
      aRetenir: [
        "With restraint: a mermaid is enough on its own.",
        "Some dresses have their own pieces.",
        "A veil matched to the train.",
      ],
      liens: [
        { href: "/robes/sheridan", label: "Sheridan" },
        { href: "/robes/oksana", label: "Oksana" },
        { href: "/robes/zina", label: "Zina" },
      ],
    },
  ],
  princesse: [
    {
      slug: fr("princesse", 0),
      q: "What is a ball gown wedding dress?",
      r: "A dress with a fitted bodice, often built as a corset, from which a full skirt falls to the floor. It is the silhouette of the ball gown: a defined waist and an assumed volume. The boutique calls it refined and stately.",
      description:
        "What is a ball gown wedding dress? A crafted corset, a defined waist, a full skirt to the floor. Definition, and the ball gowns at MADAMOON, Paris.",
      chapo:
        "Refined and stately: the ball gown is the bride's evening gown. Here is what defines it.",
      sections: [
        {
          titre: "A bodice, then the volume",
          texte: [
            "The top is fitted: a strapless bodice or a corset that follows the bust and defines the waist. From the waist — or from a basque or dropped waist, which sits a little lower — falls a full skirt that widens to the floor and often ends in a train.",
          ],
        },
        {
          titre: "What it does to the figure",
          texte: [
            "It slims the waist by contrast with the fullness of the skirt, and it entirely covers the hips and legs. It is the silhouette of formal ceremonies and grand venues.",
          ],
        },
        {
          titre: "The boutique's ball gowns",
          texte: [
            "From Casablanca Bridal, Guinevere in jacquard, Kensington in mikado, Addison in silk satin, Santana in tulle and organza; from Watters Designs, Clover in Caterina lace, Ember in Dupioni, Fern and Trinity in mikado; from Olya Mak, Seraphina in hand-embroidered lace.",
          ],
        },
      ],
      aRetenir: [
        "A fitted bodice, a full skirt.",
        "The waist defined by contrast.",
        "Refined and stately.",
      ],
      liens: [
        { href: "/coupes/princesse", label: "Ball gown dresses" },
        { href: "/robes/guinevere", label: "Guinevere" },
        { href: "/robes/kensington", label: "Kensington" },
      ],
    },
    {
      slug: fr("princesse", 1),
      q: "Which body shape does a ball gown suit?",
      r: "It is one of the first silhouettes to try for the A, V, 8 and X body shapes. For an O or H body shape, it comes second, and is worth trying. No body shape rules it out: it all comes down to the bodice and the volume of the skirt.",
      description:
        "Ball gown wedding dress: which body shapes does it suit? First for A, V, 8 and X, worth trying for O and H. Advice from the MADAMOON boutique.",
      chapo:
        "The ball gown suits more figures than people think. Here is who it comes first for, and why.",
      sections: [
        {
          titre: "The body shapes it comes first for",
          texte: [],
          liste: [
            "A — its crafted bodice draws the eye upwards, and the skirt answers the hips without marking them.",
            "V — the full skirt adds volume below and balances broader shoulders.",
            "8 — the bodice cinches at the waist and the fullness starts there: the contrast is clear.",
            "X — the fullness starts from an already slim waist, without the dress having to force it.",
          ],
        },
        {
          titre: "The ones it is worth trying for",
          texte: [
            "For an O, choose a lighter skirt and a V or sweetheart neckline, which flatters the bust. For an H, a corset and a basque waist draw the waist the figure does not mark.",
          ],
        },
        {
          titre: "In the catalogue",
          texte: [
            "Several of the boutique's ball gowns — Addison, Clover, Ember, Kensington, Livia, Seraphina — are listed, on their pages, for all six body shapes. The fitting decides.",
          ],
        },
      ],
      aRetenir: [
        "First for A, V, 8 and X.",
        "Worth trying for O and H.",
        "The bodice and the volume make the difference.",
      ],
      liens: [
        { href: "/morphologies/a/robe-princesse-morphologie-a", label: "The ball gown and the A body shape" },
        { href: "/morphologies/8/robe-princesse-morphologie-8", label: "The ball gown and the 8 body shape" },
        { href: "/morphologies", label: "The six body shapes" },
      ],
    },
    {
      slug: fr("princesse", 2),
      q: "What is the difference between a ball gown and an A-line dress?",
      r: "Both have a fitted bodice and a skirt that widens. The A-line opens in an A, evenly, without excessive fullness; the ball gown defines the waist with a corset and carries a real volume of skirt. Several dresses in the catalogue sit between the two.",
      description:
        "Ball gown or A-line: the A-line opens in an A, the ball gown defines the waist and carries volume. The difference, and the MADAMOON dresses in Paris.",
      chapo:
        "They share the same start, a fitted bodice. What sets them apart is the skirt.",
      sections: [
        {
          titre: "What they share",
          texte: [
            "A fitted top and a skirt that widens towards the floor: neither follows the hips and thighs, unlike a mermaid.",
          ],
        },
        {
          titre: "What sets them apart",
          texte: [],
          liste: [
            "The A-line — the skirt opens in an A, in a straight line from the waist. The boutique considers it the most universal silhouette.",
            "The ball gown — a crafted corset, a defined waist and a full skirt with assumed volume: the silhouette of an evening gown.",
          ],
        },
        {
          titre: "Between the two",
          texte: [
            "Hayes, Sienna and Charlotte are described in the catalogue as \"ball gown or A-line\" dresses: the volume of their skirt puts them on the border. The fitting room shows which way they lean on you.",
          ],
        },
      ],
      aRetenir: [
        "A-line: a skirt that opens in an A.",
        "Ball gown: real volume, a defined waist.",
        "Some dresses sit between the two.",
      ],
      liens: [
        { href: "/coupes/trapeze", label: "A-line dresses" },
        { href: "/robes/hayes", label: "Hayes" },
        { href: "/robes/charlotte", label: "Charlotte" },
      ],
    },
    {
      slug: fr("princesse", 3),
      q: "Is a ball gown suitable for petite brides?",
      r: "Yes, provided the volume is in proportion. A less wide skirt, a light fabric such as tulle or organza, a V neckline or a pointed basque waist lengthen the figure. And the length is set to you, at the alterations.",
      description:
        "Ball gown wedding dress for petite brides: proportioned volume, light fabrics, a V neckline to lengthen. Advice from MADAMOON, Paris.",
      chapo:
        "A ball gown is not reserved for tall figures. It simply asks for volume on your scale.",
      sections: [
        {
          titre: "Proportion the volume",
          texte: [
            "This is the main advice: a skirt whose fullness stays in proportion to your height. A very wide, very structured skirt can overwhelm a petite figure; a more measured fullness lets it breathe.",
          ],
        },
        {
          titre: "What lengthens",
          texte: [],
          liste: [
            "A V neckline — Livia, Amandine, Santana: it elongates the bust.",
            "A pointed basque waist — Guinevere, Santana: it extends the line downwards.",
            "Airy fabrics — tulle and organza give volume without weight.",
          ],
        },
        {
          titre: "The length",
          texte: [
            "After the fitting, the boutique takes your measurements to begin making the dress, and its seamstresses adjust it on site. A tip: come to your fittings in your wedding-day shoes, as the length is set to them.",
          ],
        },
      ],
      aRetenir: [
        "Yes, with volume on your scale.",
        "The V and the basque waist lengthen.",
        "The length is set to you.",
      ],
      liens: [
        { href: "/robes/livia", label: "Livia" },
        { href: "/robes/santana", label: "Santana" },
        { href: "/faq/duree-retouches-robe-de-mariee", label: "How long alterations take" },
      ],
    },
    {
      slug: fr("princesse", 4),
      q: "How do you choose the skirt volume of a ball gown?",
      r: "Based on three things: your figure, the venue and the day you want to live. The fabric decides too: mikado or jacquard hold a structured volume, tulle and organza an airy one. The surest way is to try two different fullnesses.",
      description:
        "Choosing the skirt volume of a ball gown wedding dress: figure, venue, fabric. Structured mikado or airy tulle, advice from MADAMOON in Paris.",
      chapo:
        "Volume makes the ball gown. It is chosen like a silhouette: to your figure, your venue, your day.",
      sections: [
        {
          titre: "The fabric makes the volume",
          texte: [],
          liste: [
            "Structured — Livia's mikado, \"a skirt that stands on its own\", or Kensington's, which brings structure and volume.",
            "Textured — Guinevere's floral jacquard, for an evening-gown skirt.",
            "Airy — Santana's tulle and organza, a voluminous yet light skirt.",
            "Full and light — Ember's skirt, in Dupioni, or Seraphina's, voluminous while keeping \"an airy lightness\".",
          ],
        },
        {
          titre: "The venue and the day",
          texte: [
            "A tip: a large volume unfolds in a reception hall, a château, a church; it needs more room in a town hall, a car or on a busy dance floor. Think of the whole day, not just the entrance.",
          ],
        },
        {
          titre: "To your figure",
          texte: [
            "For a petite figure, a measured fullness; for broad shoulders, a generous skirt that rebalances. In the fitting room, compare two volumes: the difference shows at once.",
          ],
        },
      ],
      aRetenir: [
        "The fabric makes the volume.",
        "Think of the venue and the whole day.",
        "Try two fullnesses.",
      ],
      liens: [
        { href: "/robes/livia", label: "Livia" },
        { href: "/robes/santana", label: "Santana" },
        { href: "/robes/kensington", label: "Kensington" },
      ],
    },
    {
      slug: fr("princesse", 5),
      q: "Is a ball gown comfortable to dance in?",
      r: "Yes, if it fits well and its volume lets you move. A light skirt is easier to wear than a very structured one, and a train is easier bustled. The bodice must hold without hindering: check it at the fitting, by really moving.",
      description:
        "Ball gown wedding dress and dancing: a bodice that holds without squeezing, a light skirt, a bustled train. Advice from the MADAMOON boutique, Paris.",
      chapo:
        "A ball gown does not stop you dancing. It asks you to choose the dress for the evening as much as for the ceremony.",
      sections: [
        {
          titre: "The bodice",
          texte: [
            "A structured bodice holds the dress: it carries the weight of the skirt. Clover's, according to its page, \"provides good support\". It must also let you raise your arms and breathe: at the fitting, make the gestures of the evening.",
          ],
        },
        {
          titre: "The skirt",
          texte: [
            "The lighter it is, the better it follows movement. Ember's skirt is described as \"full and light\"; Seraphina's keeps \"an airy lightness\". A very structured skirt, in mikado, wears beautifully but weighs more.",
          ],
        },
        {
          titre: "The train",
          texte: [
            "A tip: ask in the fitting room how the train is bustled or hooked up for the evening. A long train, like Kensington's two metres, is worn for the entrance, not for the dance floor.",
          ],
        },
      ],
      aRetenir: [
        "A bodice that holds without squeezing.",
        "A light skirt follows movement.",
        "The train is bustled for dancing.",
      ],
      liens: [
        { href: "/robes/clover-perles", label: "Clover" },
        { href: "/robes/ember", label: "Ember" },
        { href: "/robes/seraphina", label: "Seraphina" },
      ],
    },
    {
      slug: fr("princesse", 6),
      q: "Which bodice goes with a ball gown skirt?",
      r: "The one that flatters your bust and balances the volume of the skirt. A sweetheart bodice, a V neckline, a square neckline, off-the-shoulder or long sleeves: the catalogue has each. A basque or dropped waist extends the bodice and slims the line.",
      description:
        "Which bodice for a ball gown wedding dress? Sweetheart, V, square, off-the-shoulder, long sleeves, basque waist. The MADAMOON ball gowns, Paris.",
      chapo:
        "The skirt makes the volume; the bodice makes the character. Here are the options, dress by dress.",
      sections: [
        {
          titre: "The necklines",
          texte: [],
          liste: [
            "Sweetheart — Guinevere, plunging and pointed; Hayes, reinterpreted; Ember, accented with a V cut-out.",
            "V — Livia, a clean V; Amandine, plunging; Santana, on fine straps.",
            "Square — Clover, in Caterina lace.",
            "Off-the-shoulder — Kensington, beaded down to the sleeves; Trinity.",
          ],
        },
        {
          titre: "Sleeves and straps",
          texte: [
            "Seraphina, by Olya Mak, pairs a sheer bodice with long sleeves and an open back. Addison has removable off-the-shoulder straps: worn or not.",
          ],
        },
        {
          titre: "The waistline",
          texte: [
            "The basque waist, which dips to a point below the waist, extends the bodice: Guinevere, Santana. So does the dropped waist: Ember, Clover. They slim the line and start the volume a little lower. A tip: an ornate bodice calls for a plain skirt, and vice versa.",
          ],
        },
      ],
      aRetenir: [
        "The bodice makes the character.",
        "Sweetheart, V, square or off-the-shoulder.",
        "The basque waist slims the line.",
      ],
      liens: [
        { href: "/robes/guinevere", label: "Guinevere" },
        { href: "/robes/clover-perles", label: "Clover" },
        { href: "/robes/seraphina", label: "Seraphina" },
      ],
    },
    {
      slug: fr("princesse", 7),
      q: "What is the difference between a strapless bodice and a corset on a ball gown?",
      r: "Strapless describes a shape: a top with no straps or sleeves, ending above the bust. Corset describes a construction: a structured bodice, often boned, that shapes the waist. A dress can be both, like Guinevere and its strapless corset.",
      description:
        "Strapless bodice or corset on a ball gown wedding dress: one is a shape without straps, the other a structure that shapes the waist. The difference explained.",
      chapo:
        "Two words often confused. One says what you see, the other what holds the dress.",
      sections: [
        {
          titre: "Strapless, a shape",
          texte: [
            "A top with no straps or sleeves, leaving the shoulders and arms bare. It holds through its structure and its fit. Hayes, Sienna and Charlotte are strapless with a sweetheart neckline.",
          ],
        },
        {
          titre: "The corset, a construction",
          texte: [
            "A structured bodice, often boned, that shapes the waist and carries the weight of the skirt. It can have straps or sleeves. Ember has a corset \"that structures the figure\"; Clover, a structured bodice that \"provides good support\".",
          ],
        },
        {
          titre: "Both at once",
          texte: [
            "Guinevere combines the two: a strapless corset with a plunging sweetheart neckline, extended by a basque waist. So does Charlotte, with its basque-waist corset. At the fitting, check that the top holds on its own when you raise your arms.",
          ],
        },
      ],
      aRetenir: [
        "Strapless is a shape: no straps.",
        "A corset is a structure: it shapes the waist.",
        "A dress can be both.",
      ],
      liens: [
        { href: "/robes/guinevere", label: "Guinevere" },
        { href: "/robes/ember", label: "Ember" },
        { href: "/coupes/princesse/corsage-robe-princesse", label: "Which bodice to choose" },
      ],
    },
    {
      slug: fr("princesse", 8),
      q: "How do you keep a ball gown from looking too imposing?",
      r: "By playing on three things: a skirt of measured fullness, a light fabric such as tulle or organza, and a bodice that balances the skirt. A moderate train also lightens the figure. And some dresses, between ball gown and A-line, are worth comparing in the fitting room.",
      description:
        "A ball gown wedding dress without excess: measured volume, light tulle, a balancing bodice, a moderate train. Advice and dresses from MADAMOON in Paris.",
      chapo:
        "You can love the ball gown without wanting to disappear into it. Here is how to keep the look and lighten the rest.",
      sections: [
        {
          titre: "Lighten the skirt",
          texte: [
            "A measured fullness rather than the maximum, and an airy fabric: tulle and organza give volume without mass. A plain skirt, like Addison's in silk satin, keeps the line clean.",
          ],
        },
        {
          titre: "Balance the top",
          texte: [
            "A tip: when the skirt is generous, a simpler bodice lets it breathe, and a V neckline or bare shoulders open up the figure. A moderate train, rather than a cathedral train, lightens the whole further.",
          ],
        },
        {
          titre: "Between two silhouettes",
          texte: [
            "Hayes, Sienna and Charlotte, described as \"ball gown or A-line\", sit on the border between the two. Try them next to a fuller ball gown, to compare.",
          ],
        },
      ],
      aRetenir: [
        "Measured fullness, a light fabric.",
        "A bodice that balances the skirt.",
        "Compare with a ball gown A-line.",
      ],
      liens: [
        { href: "/robes/hayes", label: "Hayes" },
        { href: "/robes/addison", label: "Addison" },
        { href: "/coupes/princesse/choisir-volume-jupe-robe-princesse", label: "Choosing the skirt volume" },
      ],
    },
    {
      slug: fr("princesse", 9),
      q: "Does a ball gown suit an outdoor wedding?",
      r: "Yes, with a few precautions. A light skirt in tulle or organza wears better than a very heavy one, and a short or bustled train avoids grass and gravel. Think of the ground, the season and the distance to cover.",
      description:
        "Ball gown wedding dress outdoors: a light skirt, a short or bustled train, a fabric suited to the ground. Advice from MADAMOON, Paris.",
      chapo:
        "A garden, a courtyard, an estate: the ball gown belongs there. It simply asks you to think about the ground.",
      sections: [
        {
          titre: "The ground and the train",
          texte: [
            "A tip: on grass or gravel, a long train picks up everything it touches. A shorter train, or one bustled after the ceremony, lets you move around without thinking about it.",
          ],
        },
        {
          titre: "The fabric",
          texte: [
            "Tulle and organza, as on Santana, are airy and move with the breeze; mikado and jacquard hold their shape. In hot weather, a light skirt is the most pleasant to wear all day.",
          ],
        },
        {
          titre: "The season",
          texte: [
            "For a summer wedding, bare shoulders or fine straps; for the end of the season, long sleeves like Seraphina's. And for the evening, a stole or a cape.",
          ],
        },
      ],
      aRetenir: [
        "Yes, with a light skirt.",
        "A short or bustled train.",
        "Think of the ground and the season.",
      ],
      liens: [
        { href: "/robes/santana", label: "Santana" },
        { href: "/robes/seraphina", label: "Seraphina" },
        { href: "/faq/robe-de-mariee-hiver", label: "A dress for a winter wedding" },
      ],
    },
    {
      slug: fr("princesse", 10),
      q: "Which veil goes with a ball gown wedding dress?",
      r: "A veil that matches the volume and the train. A long veil, extending the train, underlines the formality; a shorter veil lets the back and skirt show. Santana even has its matching fingertip veil, sold separately.",
      description:
        "Which veil with a ball gown wedding dress? Long to extend the train, short to show the back. Santana's matching veil, at MADAMOON.",
      chapo:
        "With a ball gown, the veil completes the silhouette. Here is how to match it to the dress.",
      sections: [
        {
          titre: "Long or short",
          texte: [],
          liste: [
            "A long veil — it extends the train and suits a formal ceremony; it goes with a dress with a train, like Kensington or Guinevere.",
            "A fingertip veil — it stops at the fingertips, arms by your sides, and lets the whole skirt show.",
            "A short veil — it reveals the back and the bodice.",
          ],
        },
        {
          titre: "The back of the dress",
          texte: [
            "When the back is worked, let it show: Addison's row of buttons, running to the end of the train, or Seraphina's open back. A light, sheer tulle veil lets them through.",
          ],
        },
        {
          titre: "Santana's veil",
          texte: [
            "According to its page, Santana, by Casablanca Bridal, can be paired with a matching fingertip veil and sheer silk tulle gloves adorned with floral lace, sold separately.",
          ],
        },
      ],
      aRetenir: [
        "Matched to the volume and the train.",
        "Long for formality, short for the back.",
        "Santana has its matching veil.",
      ],
      liens: [
        { href: "/robes/santana", label: "Santana" },
        { href: "/robes/addison", label: "Addison" },
        { href: "/robes/seraphina", label: "Seraphina" },
      ],
    },
    {
      slug: fr("princesse", 11),
      q: "How do you accessorise a ball gown without overloading the figure?",
      r: "By choosing one focal point and keeping the rest discreet. A ball gown already carries volume: an embroidered bodice calls for little jewellery, a plain bodice can take a necklace or gloves. Veil, jewellery and hairstyle are chosen together.",
      description:
        "Accessorising a ball gown wedding dress without overload: one focal point, measured jewellery, a matched veil. Advice and dresses from MADAMOON, Paris.",
      chapo:
        "The ball gown is already a statement. The accessory extends it, as long as it does not compete with it.",
      sections: [
        {
          titre: "One focal point",
          texte: [
            "A tip: decide what should draw the eye — the bodice, the veil, a piece of jewellery — and keep the rest in the background. With a beaded dress, like Kensington or Fern, earrings are enough.",
          ],
        },
        {
          titre: "The dresses' own pieces",
          texte: [],
          liste: [
            "Santana — sheer silk tulle gloves adorned with floral lace, and a matching veil, sold separately.",
            "Addison — removable off-the-shoulder straps.",
            "Clover — with or without the pearls that accent the neckline and the edges of the corset.",
          ],
        },
        {
          titre: "Jewellery and neckline",
          texte: [
            "A V neckline, like Livia's, welcomes a pendant; a square neckline or bare shoulders show off a short necklace or bolder earrings; a sweetheart bodice is often enough on its own.",
          ],
        },
      ],
      aRetenir: [
        "One focal point.",
        "Some dresses have their own pieces.",
        "The jewellery follows the neckline.",
      ],
      liens: [
        { href: "/robes/santana", label: "Santana" },
        { href: "/robes/clover-perles", label: "Clover" },
        { href: "/coupes/princesse/voile-robe-de-mariee-princesse", label: "Which veil to choose" },
      ],
    },
    {
      slug: fr("princesse", 12),
      q: "Can you choose a ball gown in satin or in lace?",
      r: "Yes, both. Satin makes a smooth, luminous ball gown, like Addison in silk satin; lace a romantic one, like Clover in Caterina lace or Seraphina, embroidered by hand. The catalogue also has mikado, jacquard and Dupioni.",
      description:
        "Ball gown wedding dress in satin or lace: Addison in silk satin, Clover and Seraphina in lace, and mikado too. The MADAMOON ball gowns, Paris.",
      chapo:
        "The ball gown comes in every noble fabric. Each gives it a different character.",
      sections: [
        {
          titre: "In satin",
          texte: [
            "Smooth and luminous, it gives a clean line. Addison, by Casablanca Bridal, is in silk satin, with hand-appliquéd chiffon floral motifs; Hayes pairs matte satin with lace.",
          ],
        },
        {
          titre: "In lace",
          texte: [
            "Romantic, it dresses the bodice or the whole gown. Clover is in Caterina lace; Seraphina, by Olya Mak, in hand-embroidered lace; Amandine features regal motifs; Santana lays floral lace over a sheer bodice.",
          ],
        },
        {
          titre: "The other fabrics",
          texte: [],
          liste: [
            "Mikado — Livia, Kensington, Fern, Trinity: a fabric that holds volume.",
            "Jacquard — Guinevere, in textured floral jacquard.",
            "Dupioni — Ember.",
            "Tulle and organza — Santana's skirt.",
          ],
        },
      ],
      aRetenir: [
        "Yes, in satin as in lace.",
        "Satin for a clean line, lace for romance.",
        "Mikado for volume that holds.",
      ],
      liens: [
        { href: "/robes/addison", label: "Addison" },
        { href: "/robes/clover-perles", label: "Clover" },
        { href: "/faq/entretenir-robe-de-mariee-dentelle", label: "Caring for a lace wedding dress" },
      ],
    },
    {
      slug: fr("princesse", 13),
      q: "How do you move easily in a voluminous wedding dress?",
      r: "By practising before the big day, in your shoes. A slightly shorter step, the skirt nudged forward with the tip of your foot, the front lifted on the stairs, the train bustled for the evening. And someone you trust to help you manage it.",
      description:
        "Moving in a voluminous wedding dress: walking, climbing stairs, sitting down, handling the train. Practical advice from the MADAMOON boutique, Paris.",
      chapo:
        "A ball gown is worn all day. A few simple gestures make it easy.",
      sections: [
        {
          titre: "Walking",
          texte: [
            "A tip: a slightly shorter step, and the skirt nudged forward with the tip of your foot at each step, so you never tread on it. Practise at your fittings, in your wedding-day shoes.",
          ],
        },
        {
          titre: "Stairs, the car, a chair",
          texte: [],
          liste: [
            "Stairs — lift the front of the skirt with both hands to see the steps; the train follows behind.",
            "The car — sit down first, then bring in your legs and the skirt; someone can help tuck it in.",
            "A chair — sit on the edge, let the skirt spread and bring the train to the side.",
          ],
        },
        {
          titre: "The train and the pockets",
          texte: [
            "Ask in the fitting room how the train is bustled for the evening. Some ball gowns have pockets: Guinevere, discreet pockets; Addison, \"very handy\" pockets — enough to keep a handkerchief within reach.",
          ],
        },
      ],
      aRetenir: [
        "Practise in your shoes.",
        "Lift the front on the stairs.",
        "The train is bustled for the evening.",
      ],
      liens: [
        { href: "/robes/guinevere", label: "Guinevere" },
        { href: "/robes/addison", label: "Addison" },
        { href: "/coupes/princesse/robe-princesse-confortable-danser", label: "Dancing in a ball gown" },
      ],
    },
  ],
};
