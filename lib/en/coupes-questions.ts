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
};
