import type { Lettre } from "@/lib/madamoon";
import { QUESTIONS_MORPHO, type QuestionMorpho } from "@/lib/morphologies-questions";

/*
 * The body-shape questions, in English.
 *
 * Same order, same addresses, same facts as the French table: the
 * dresses named are the ones the boutique itself associates with each
 * body shape. We translate, we do not embellish.
 */

const fr = (l: Lettre, i: number) => QUESTIONS_MORPHO[l]![i].slug;

export const QUESTIONS_MORPHO_EN: Partial<Record<Lettre, QuestionMorpho[]>> = {
  O: [
    {
      slug: fr("O", 0),
      q: "Which wedding dress should I choose for an O body shape?",
      r: "Start with sheath and A-line dresses: the fabric falls in one piece, without squeezing, and the line looks longer. Choose a V or sweetheart neckline, which opens the bust. Ball gowns and mermaids are worth trying too: no dress is off-limits.",
      description:
        "Wedding dress for an O body shape: sheath and A-line first, a V or sweetheart neckline. Advice from the MADAMOON boutique, Paris 10e.",
      chapo:
        "A fall that glides, a neckline that opens the bust: with an O body shape, the line lengthens by itself. Here is where to start, and why.",
      sections: [
        {
          titre: "The two silhouettes to try first",
          texte: [
            "A sheath dress squeezes nowhere. The fabric falls in one piece, from bust to hem, and the line looks longer than it is.",
            "An A-line holds the bust and opens the skirt from the waist. The eye stops at the neckline, and the dress leaves everything else free.",
          ],
        },
        {
          titre: "Those worth trying",
          texte: [
            "A ball gown draws the eye upwards with its worked bodice, and the fullness of its skirt answers the bust without competing with it. A mermaid needs a fabric with hold — crêpe rather than a light satin.",
            "A body shape never rules a dress out: it only tells you where to start.",
          ],
        },
        {
          titre: "The detail that tips it",
          texte: [
            "A V or sweetheart neckline opens the bust and lengthens the neck. It is often that, more than the silhouette, that tips a fitting.",
            "Among the dresses the boutique recommends for an O body shape: Dove, a matte-satin sheath with a draped neckline; Marie, a sheath by Monica Loretti; Emerald, an A-line with a V neckline; Monica, a jacquard A-line with a belt.",
          ],
        },
      ],
      aRetenir: [
        "Sheath and A-line first.",
        "A V or sweetheart neckline.",
        "Ball gowns and mermaids are worth trying.",
      ],
      liens: [
        { href: "/morphologies/o", label: "The O body shape" },
        { href: "/robes/dove", label: "Dove" },
        { href: "/robes/emerald", label: "Emerald" },
        { href: "/coupes/fluide", label: "Sheath dresses" },
      ],
    },
    {
      slug: fr("O", 1),
      q: "How do I recognise an O body shape?",
      r: "Your shoulders and hips are of similar width, and the waist takes up the most room; the bust is generous and is noticed first. In front of the mirror, your hand runs from shoulders to hips without meeting a clear dip at the waist.",
      description:
        "Recognising an O body shape: shoulders and hips of similar width, a soft waist, a generous bust. Three simple markers, one of them in front of the mirror.",
      chapo:
        "Three markers are enough, and one of them is checked in front of a mirror: reading alone is never enough to place yourself.",
      sections: [
        {
          titre: "The three markers",
          texte: [],
          liste: [
            "The marker — your shoulders and hips are of similar width, and the waist takes up the most room.",
            "The bust — it is generous and noticed first. Many dresses are written from there.",
            "In front of the mirror — your hand runs from shoulders to hips without meeting a clear dip at the waist.",
          ],
        },
        {
          titre: "Not to be confused with",
          texte: [
            "The H body shape also has a soft waist, but on a straight line, without the bust and curves of the O. The 8 body shape has balanced shoulders and hips like the O, but a clearly defined waist.",
          ],
        },
        {
          titre: "A figure, not a label",
          texte: [
            "Many brides find themselves between two body shapes. That is not a problem: the recommended silhouettes overlap, and the fitting decides. If you are unsure, Élise, the site's advisor, points you in a direction in three questions.",
          ],
        },
      ],
      aRetenir: [
        "Shoulders and hips of similar width.",
        "A soft waist, a generous bust.",
        "No clear dip at the waist in the mirror.",
      ],
      liens: [
        { href: "/morphologies/o", label: "The O body shape" },
        { href: "/morphologies", label: "The six body shapes" },
        { href: "/trouver-ma-robe", label: "Find my dress with Élise" },
      ],
    },
    {
      slug: fr("O", 2),
      q: "Which wedding dress silhouette suits a figure with generous curves?",
      r: "A silhouette that follows the curves without squeezing them: the sheath, which glides along the body, and the A-line, which opens from the waist. If your waist is defined, mermaids and ball gowns highlight curves very well too.",
      description:
        "Wedding dress for generous curves: sheath and A-line, or mermaid and ball gown if the waist is defined. Advice from the MADAMOON boutique, Paris.",
      chapo:
        "Generous curves do not call for a single silhouette: it all depends on where they are. Here is how to find your way.",
      sections: [
        {
          titre: "If the curves are at the bust and waist",
          texte: [
            "That is the O body shape. Sheath and A-line dresses come first: they do not squeeze the waist, let the fabric fall in one piece and lengthen the line. A V or sweetheart neckline flatters the bust.",
          ],
        },
        {
          titre: "If the waist is clearly defined",
          texte: [
            "That is more of an 8 body shape: balanced shoulders and hips, a defined waist. Every silhouette works then. Mermaids follow the curves, and anything fitted at the waist highlights the natural balance.",
          ],
        },
        {
          titre: "What matters as much as the silhouette",
          texte: [
            "Fabric and support. Crêpe or matte satin hold better than a fabric that is too light; a corset or a structured bodice supports the bust. Several of the boutique's dresses have a worked corset, like Carrie, with its hand-beaded corset, or Ember.",
          ],
        },
      ],
      aRetenir: [
        "Curves at bust and waist: sheath, A-line.",
        "Defined waist: every silhouette, mermaid first.",
        "A fabric with hold, a well-supported bust.",
      ],
      liens: [
        { href: "/morphologies/o", label: "The O body shape" },
        { href: "/morphologies/8", label: "The 8 body shape" },
        { href: "/coupes", label: "Silhouettes" },
      ],
    },
    {
      slug: fr("O", 3),
      q: "Does an A-line wedding dress suit an O body shape?",
      r: "Yes, it is one of the two silhouettes to try first. The bust is held, the skirt opens in an A from the waist: the eye stops at the neckline, and the dress leaves everything else free.",
      description:
        "A-line wedding dress and O body shape: one of the two silhouettes to try first. Why it works, and the A-line dresses at MADAMOON, Paris.",
      chapo:
        "The A-line is the most universal silhouette in the catalogue, and one of the two the boutique recommends first for an O body shape.",
      sections: [
        {
          titre: "Why it works",
          texte: [
            "The bust is held, then the skirt opens in an A from the waist, without squeezing or marking it. The eye stops at the neckline, and the dress leaves everything else free.",
          ],
        },
        {
          titre: "What to look at",
          texte: [
            "The neckline first: a V or a sweetheart opens the bust. Then the fabric: tulle or light lace give an airy skirt, satin a cleaner line.",
          ],
        },
        {
          titre: "The boutique's A-line dresses",
          texte: ["Among those the boutique recommends for an O body shape:"],
          liste: [
            "Emerald — beaded bodice, V neckline, tulle or satin skirt;",
            "Monica — floral jacquard, V neckline, belt;",
            "Solana — lace appliqués and matte sequins;",
            "Finell — satin sweetheart bodice;",
            "Pendant — lace and long sleeves.",
          ],
        },
      ],
      aRetenir: [
        "Yes: one of the two silhouettes to try first.",
        "The skirt opens from the waist, without squeezing it.",
        "With a V or sweetheart neckline.",
      ],
      liens: [
        { href: "/coupes/trapeze", label: "A-line dresses" },
        { href: "/robes/emerald", label: "Emerald" },
        { href: "/robes/monica", label: "Monica" },
        { href: "/morphologies/o", label: "The O body shape" },
      ],
    },
    {
      slug: fr("O", 4),
      q: "Is an empire wedding dress suited to an O body shape?",
      r: "Yes, it is a natural option: the seam placed under the bust flatters it, then the skirt falls freely, without marking the waist. The boutique does not class its dresses as \"empire\": its sheath dresses are the closest to that line.",
      description:
        "Empire wedding dress and O body shape: a high waist under the bust, a free-falling skirt. Why it suits, and the dresses that come closest to it.",
      chapo:
        "The empire line places the waist just under the bust. For an O body shape, it is an idea that lands right — here is why.",
      sections: [
        {
          titre: "What an empire dress is",
          texte: [
            "An empire dress has its waist placed high, just under the bust, and a skirt that then falls straight or slightly flared.",
          ],
        },
        {
          titre: "Why it serves an O body shape",
          texte: [
            "It does exactly what the body shape asks for: flatter the bust and lengthen the line. The eye stops at the bust, and the skirt passes over the waist without marking it.",
          ],
        },
        {
          titre: "At MADAMOON",
          texte: [
            "The boutique's catalogue is arranged in five silhouettes — mermaid, ball gown, sheath, A-line, two-in-one — and no dress is classed as \"empire\". Sheath dresses come closest: a fall in one piece that squeezes nowhere.",
            "If that is the line you are looking for, say so when you book: the boutique will suggest the models that come closest.",
          ],
        },
      ],
      aRetenir: [
        "Yes: the high waist flatters the bust.",
        "The skirt falls without marking the waist.",
        "At the boutique: sheath dresses come closest.",
      ],
      liens: [
        { href: "/coupes/fluide", label: "Sheath dresses" },
        { href: "/morphologies/o", label: "The O body shape" },
        { href: "/rendez-vous", label: "Book an appointment" },
      ],
    },
    {
      slug: fr("O", 5),
      q: "Can I wear a mermaid wedding dress with an O body shape?",
      r: "Yes. A body shape never rules a dress out, it only tells you where to start. A mermaid needs a fabric with hold — crêpe rather than a light satin — and is judged far better in the fitting room than in a photograph.",
      description:
        "Mermaid wedding dress and O body shape: yes, with a fabric that holds, such as crêpe. What to look at, and the mermaid dresses at MADAMOON, Paris.",
      chapo:
        "The mermaid is not the first silhouette recommended for an O body shape, but it is worth trying. Here is how to choose one.",
      sections: [
        {
          titre: "Yes, with the right fabric",
          texte: [
            "A mermaid dress follows the figure down to the knees before flaring. It therefore needs a fabric that holds and smooths: crêpe rather than a light satin, which would show everything.",
          ],
        },
        {
          titre: "It is judged when worn",
          texte: [
            "In a photograph, a mermaid looks demanding. In the fitting room, it is often another story. Try it after the sheath and A-line dresses, to compare: the fitting decides.",
          ],
        },
        {
          titre: "The boutique's mermaid dresses",
          texte: [
            "Zina, a mermaid with a slit by Casablanca Bridal, is among the dresses the boutique recommends for an O body shape. Several mermaids in the catalogue are in crêpe: Mira and Milan by Monica Loretti, Bondi, or Shiloh, whose skirt is crêpe.",
          ],
        },
      ],
      aRetenir: [
        "Yes: no dress is off-limits.",
        "A fabric that holds, like crêpe.",
        "Try it after the sheath and A-line dresses.",
      ],
      liens: [
        { href: "/coupes/sirene", label: "Mermaid dresses" },
        { href: "/robes/zina", label: "Zina" },
        { href: "/robes/mira", label: "Mira" },
      ],
    },
    {
      slug: fr("O", 6),
      q: "Which neckline should I choose for a wedding dress with a generous bust?",
      r: "V and sweetheart first: they open the bust, lengthen the neck and shape the chest without enclosing it. A draped neckline works too. In every case, inner support — a corset, a structured bodice — makes the difference.",
      description:
        "Wedding dress and a generous bust: a V or sweetheart neckline, a drape, and good support. Advice and dresses from the MADAMOON boutique, Paris.",
      chapo:
        "With a generous bust, the neckline often matters more than the silhouette. Here are the ones that serve it best.",
      sections: [
        {
          titre: "V and sweetheart",
          texte: [
            "They open the bust and lengthen the neck, without enclosing the chest. It is often that detail, more than the silhouette, that tips a fitting.",
            "In the catalogue: Emerald, Monica and Livia have a V neckline; Finell, a sweetheart bodice.",
          ],
        },
        {
          titre: "Other options",
          texte: [
            "A draped neckline, like Dove's, softens the bust. Off-the-shoulder straps, like Addison's, frame the shoulders. A square neck, more graphic, is judged at the fitting.",
          ],
        },
        {
          titre: "Support",
          texte: [
            "A corset or a structured bodice supports the bust, and it is what lets you wear the neckline you love. The boutique's seamstresses adjust that support over the fittings.",
          ],
        },
      ],
      aRetenir: [
        "V and sweetheart first.",
        "A drape softens the bust.",
        "A corset or structured bodice for support.",
      ],
      liens: [
        { href: "/robes/emerald", label: "Emerald" },
        { href: "/robes/finell", label: "Finell" },
        { href: "/robes/dove", label: "Dove" },
        { href: "/morphologies/o", label: "The O body shape" },
      ],
    },
    {
      slug: fr("O", 7),
      q: "Which fabric should I favour for a fluid, comfortable wedding dress?",
      r: "Chiffon and crêpe, soft and light, follow movement without marking; matte satin gives more hold while staying fluid. A stretch version adds ease for a long day.",
      description:
        "A fluid, comfortable wedding dress: chiffon, crêpe, matte satin, stretch versions. How to choose your fabric, with dresses from the MADAMOON boutique.",
      chapo:
        "A fluid dress depends first on its fabric. Here are those that move well, and what they change over the day.",
      sections: [
        {
          titre: "Chiffon",
          texte: [
            "Light and airy, it floats around the body. Maribel, by Casablanca Bridal, is in stretch chiffon; Hélène pairs a fluid chiffon skirt with a beaded corset.",
          ],
        },
        {
          titre: "Crêpe",
          texte: [
            "Denser, it smooths the figure and falls straight. It holds its shape without marking — it is also the fabric to prefer for a mermaid.",
          ],
        },
        {
          titre: "Matte satin",
          texte: [
            "It gives hold and a soft light, without the sheen of a glossy satin. Dove, a sheath dress by Casablanca Bridal, is in matte satin.",
          ],
        },
        {
          titre: "Comfort for a whole day",
          texte: [
            "A stretch fabric follows the body and lets you move freely. A tip: at the fitting, sit down, raise your arms, take a few dance steps. Mathilda, by Monica Loretti, was designed for comfort, right down to brides who are expecting.",
          ],
        },
      ],
      aRetenir: [
        "Chiffon: light and airy.",
        "Crêpe: smooth, falls straight.",
        "Matte satin: hold, a soft light.",
        "Stretch: ease for a long day.",
      ],
      liens: [
        { href: "/coupes/fluide", label: "Sheath dresses" },
        { href: "/robes/maribel", label: "Maribel" },
        { href: "/robes/mathilda", label: "Mathilda" },
      ],
    },
    {
      slug: fr("O", 8),
      q: "How do I choose a wedding dress that defines the waist without squeezing it?",
      r: "Rather than a tight waist, look for a drawn one: a belt, a seam, a drape or a play of fabrics that creates the line without constraining. A corset well fitted by the seamstresses supports without squeezing.",
      description:
        "Defining the waist without squeezing it: a belt, a basque waist, a drape, a fitted corset. Advice from MADAMOON for a comfortable wedding dress.",
      chapo:
        "Marking the waist does not mean squeezing it. Here are the details that draw it, and why fitting matters more than anything.",
      sections: [
        {
          titre: "Draw rather than tighten",
          texte: [
            "A waist is read through a line, not through pressure. A well-placed seam, a change of fabric or a drape are enough to bring it out, without constraining anything.",
          ],
        },
        {
          titre: "The details that mark the waist",
          texte: ["In the boutique's catalogue:"],
          liste: [
            "a belt, as on Monica, in floral jacquard;",
            "a basque waist, as on Santana, dipping to a point;",
            "a draped neckline, as on Dove, which guides the eye;",
            "a contrast between a worked bodice and a simpler skirt.",
          ],
        },
        {
          titre: "Fitting is everything",
          texte: [
            "A dress that is too tight squeezes; a well-fitted dress holds. At MADAMOON, the dress is made to your measurements, then fitted by the seamstresses up to the last fitting, alterations included.",
          ],
        },
      ],
      aRetenir: [
        "A drawn waist, not a tight one.",
        "Belt, basque waist, drape.",
        "Fitted on you, alterations included.",
      ],
      liens: [
        { href: "/robes/monica", label: "Monica" },
        { href: "/robes/santana", label: "Santana" },
        { href: "/faq/etapes-robe-de-mariee-sur-mesure", label: "The stages of made-to-measure" },
      ],
    },
    {
      slug: fr("O", 9),
      q: "Which wedding dress should I choose to show off my curves?",
      r: "A dress that follows your curves instead of hiding them: a sheath in a soft fabric, an A-line that highlights the bust, or a crêpe mermaid if you like a line closer to the body. The neckline and the fabric matter as much as the silhouette.",
      description:
        "A wedding dress to show off your curves: follow the figure rather than hide it, a neckline that opens the bust, a fabric that holds.",
      chapo:
        "Showing off your curves starts with no longer wanting to hide them. Here is how to choose a dress that goes with them.",
      sections: [
        {
          titre: "Follow rather than hide",
          texte: [
            "A dress that is too full adds volume where you do not want it. Better a dress that follows the figure: a sheath that glides along the body, an A-line that holds the bust, or a mermaid if you like a line closer to the body.",
          ],
        },
        {
          titre: "The bust first",
          texte: [
            "A V or sweetheart neckline opens the bust and lengthens the neck. It is often the detail that changes everything in a dress.",
          ],
        },
        {
          titre: "Fabrics that sculpt",
          texte: [
            "Crêpe and matte satin smooth and hold their shape; mikado, more structured, builds a ball gown. Lace laid over a corset draws the curves without adding anything.",
          ],
        },
      ],
      aRetenir: [
        "A dress that follows the figure.",
        "A neckline that opens the bust.",
        "Crêpe, matte satin, mikado: fabrics that hold.",
      ],
      liens: [
        { href: "/morphologies/o", label: "The O body shape" },
        { href: "/coupes", label: "Silhouettes" },
        { href: "/robes", label: "See all the dresses" },
      ],
    },
    {
      slug: fr("O", 10),
      q: "Are sleeves a good option for a wedding dress with an O body shape?",
      r: "Yes. Long lace sleeves for a slender line, sheer sleeves for a light touch, or detachable sleeves to change look in the evening: sleeves balance the upper body and can be worn in any season.",
      description:
        "Wedding dress with sleeves and an O body shape: long, sheer or detachable. What they bring, and the MADAMOON dresses that have them. Paris 10e.",
      chapo:
        "Sleeves come in several forms, and each changes the silhouette in its own way. Here is what they bring to an O body shape.",
      sections: [
        {
          titre: "Long lace sleeves",
          texte: [
            "They extend the line and give a slender look. Pendant, by Watters Designs, which the boutique recommends for an O body shape, is a lace A-line with long sleeves.",
          ],
        },
        {
          titre: "Sheer sleeves",
          texte: [
            "A light transparency on the arms, which covers without weighing down. Murielle, by Monica Loretti, is an example, with its plunging neckline.",
          ],
        },
        {
          titre: "Detachable sleeves",
          texte: [
            "Two looks in the same day: with sleeves for the ceremony, without for the evening. Aster, by Watters Designs, has detachable sleeves.",
          ],
        },
        {
          titre: "With which neckline",
          texte: [
            "Keep the bust open: a V neckline with sleeves stays light and flatters the bust.",
          ],
        },
      ],
      aRetenir: [
        "Yes: they balance the upper body.",
        "Long, sheer or detachable.",
        "With an open neckline, such as a V.",
      ],
      liens: [
        { href: "/robes/pendant", label: "Pendant" },
        { href: "/robes/murielle", label: "Murielle" },
        { href: "/robes/aster", label: "Aster" },
      ],
    },
    {
      slug: fr("O", 11),
      q: "Which wedding dress should I try first with an O body shape?",
      r: "A sheath or A-line dress, with a V or sweetheart neckline: that is the combination that best serves an O body shape. Only then a ball gown and a mermaid, to compare.",
      description:
        "O body shape: which wedding dress to try first? A sheath or an A-line, then a ball gown and a mermaid to compare. Advice from MADAMOON, Paris.",
      chapo:
        "The order of fittings matters: it helps you understand what suits you, and why. Here is the one the boutique recommends for an O body shape.",
      sections: [
        {
          titre: "The order of fittings",
          texte: [],
          ordonnee: true,
          liste: [
            "A sheath dress — it squeezes nowhere and lengthens the line.",
            "An A-line — the bust held, the skirt free from the waist.",
            "A ball gown — to see the effect of a worked bodice and a full skirt.",
            "A mermaid — in crêpe, to compare with a line close to the body.",
          ],
        },
        {
          titre: "Dresses to start with",
          texte: [
            "Among those the boutique recommends for an O body shape: Dove and Marie, sheath dresses; Emerald and Monica, A-lines with a V neckline.",
          ],
        },
        {
          titre: "Coming prepared",
          texte: [
            "Keep your favourite dresses in your favourites and mention them when you book: they will be ready when you arrive.",
          ],
        },
      ],
      aRetenir: [
        "First a sheath or an A-line.",
        "A V or sweetheart neckline.",
        "Then a ball gown and a mermaid, to compare.",
      ],
      liens: [
        { href: "/robes/dove", label: "Dove" },
        { href: "/robes/marie", label: "Marie" },
        { href: "/robes/emerald", label: "Emerald" },
        { href: "/rendez-vous", label: "Book an appointment" },
      ],
    },
  ],
  A: [
    {
      slug: fr("A", 0),
      q: "Which wedding dress should I choose for an A body shape?",
      r: "Start with ball gowns and A-lines: a worked bodice holds the eye, and a skirt that opens answers the hips without highlighting them. A bateau neckline or a straight bodice widens the shoulders. Sheath and two-in-one dresses are worth trying too.",
      description:
        "Wedding dress for an A body shape: ball gown and A-line first, a worked bodice, a skirt that opens. Advice from the MADAMOON boutique, Paris 10e.",
      chapo:
        "A worked bodice, a skirt that opens: with an A body shape, the balance comes by itself. Here is where to start.",
      sections: [
        {
          titre: "The two silhouettes to try first",
          texte: [
            "A ball gown plays everything on the bodice: embroidery, drape, neckline. The fullness of its skirt asks nothing — it answers the hips without touching them.",
            "An A-line opens its skirt from the waist and follows the hips instead of hugging them. It is the easiest silhouette to wear for a whole day.",
          ],
        },
        {
          titre: "Those worth trying",
          texte: [
            "A sheath does not seek balance, it sidesteps it — and that is sometimes exactly what you want when you refuse a dress that builds. A two-in-one, with its overskirt removed for dinner, gives two volumes in the same evening.",
          ],
        },
        {
          titre: "The detail that changes the proportion",
          texte: [
            "A bateau neckline or a straight bodice visually widens the shoulders. A few centimetres of line at the top are enough to change the whole silhouette.",
          ],
        },
      ],
      aRetenir: [
        "Ball gown and A-line first.",
        "A worked bodice.",
        "A neckline that widens the shoulders.",
      ],
      liens: [
        { href: "/morphologies/a", label: "The A body shape" },
        { href: "/coupes/princesse", label: "Ball gowns" },
        { href: "/coupes/trapeze", label: "A-line dresses" },
      ],
    },
    {
      slug: fr("A", 1),
      q: "How do I recognise an A or pear body shape?",
      r: "Your hips are wider than your shoulders, and your waist is clearly defined; the shoulders are narrow. In front of the mirror, a fitted jacket suits you without alteration, while straight skirts pull at the hips.",
      description:
        "Recognising an A body shape, also called pear: hips wider than shoulders, a defined waist, narrow shoulders. Three simple markers.",
      chapo:
        "It is also called \"pear\" or \"triangle\". Three markers are enough to recognise it, one of them in front of the mirror.",
      sections: [
        {
          titre: "The three markers",
          texte: [],
          liste: [
            "The marker — your hips are wider than your shoulders, and your waist is clearly defined.",
            "The top — the shoulders are narrow.",
            "In front of the mirror — a fitted jacket suits you without alteration, while straight skirts pull.",
          ],
        },
        {
          titre: "Not to be confused with",
          texte: [
            "The V body shape is its opposite: broad shoulders and narrower hips. The 8 body shape has a defined waist like the A, but balanced shoulders and hips.",
          ],
        },
        {
          titre: "A figure, not a label",
          texte: [
            "Many brides find themselves between two body shapes. The recommended silhouettes overlap, and the fitting decides. If you are unsure, Élise, the site's advisor, points you in a direction in three questions.",
          ],
        },
      ],
      aRetenir: [
        "Hips wider than shoulders.",
        "A well-defined waist.",
        "Straight skirts pull at the hips.",
      ],
      liens: [
        { href: "/morphologies/a", label: "The A body shape" },
        { href: "/morphologies", label: "The six body shapes" },
        { href: "/trouver-ma-robe", label: "Find my dress with Élise" },
      ],
    },
    {
      slug: fr("A", 2),
      q: "Which silhouette balances shoulders narrower than the hips?",
      r: "The ball gown and the A-line: their structured top widens the line of the shoulders, and their skirt opens from the waist to go with the hips. Balance comes from the top, never by hiding the bottom.",
      description:
        "Balancing shoulders narrower than the hips: a ball gown or an A-line, a structured top, a skirt that opens from the waist. Advice from MADAMOON.",
      chapo:
        "Balancing a figure is not hiding what you like less: it is giving the rest something to answer with. Here is how.",
      sections: [
        {
          titre: "From the top, never by hiding the bottom",
          texte: [
            "A bateau neckline or a straight bodice adds a few centimetres of line to the shoulders, and that is enough to change the whole proportion. The skirt has nothing to prove.",
          ],
        },
        {
          titre: "The two silhouettes that do it best",
          texte: [
            "The ball gown, with its worked bodice and the fullness of its skirt, which answers the hips without touching them. The A-line, whose skirt opens from the waist and follows the hips instead of hugging them.",
          ],
        },
        {
          titre: "Shoulders that take up room",
          texte: [
            "Off-the-shoulder necklines, as on Trinity or Kensington, dropped straps, as on Addison, or a square neck, as on Dolores, also widen the top line.",
          ],
        },
      ],
      aRetenir: [
        "Ball gown or A-line.",
        "A structured top that widens the shoulders.",
        "A skirt that opens from the waist.",
      ],
      liens: [
        { href: "/robes/trinity", label: "Trinity" },
        { href: "/robes/addison", label: "Addison" },
        { href: "/morphologies/a", label: "The A body shape" },
      ],
    },
    {
      slug: fr("A", 3),
      q: "Does a ball-gown wedding dress suit an A body shape?",
      r: "Yes, it is one of the two silhouettes to try first. Everything is played on the bodice — embroidery, drape, neckline — and the fullness of the skirt answers the hips without touching them.",
      description:
        "Ball-gown wedding dress and A body shape: one of the two silhouettes to try first. Why it works, and the ball gowns at MADAMOON, Paris.",
      chapo:
        "The ball gown is made for an A body shape: it works the top and lets the skirt do the rest.",
      sections: [
        {
          titre: "Why it works",
          texte: [
            "The bodice holds the eye: embroidered, draped, structured. The full skirt answers the hips without highlighting them — it does not hug them, it goes with them.",
          ],
        },
        {
          titre: "What to look at",
          texte: [
            "The bodice first: it makes the dress. Then the neckline, which can widen the shoulders. Mikado, a structured fabric, gives the skirt a clean fullness; tulle, a lighter one.",
          ],
        },
        {
          titre: "The boutique's ball gowns",
          texte: ["Among them:"],
          liste: [
            "Trinity — mikado or jacquard, off the shoulder;",
            "Fern — mikado embroidered with beaded flowers;",
            "Kensington — mikado, off the shoulder;",
            "Addison — silk satin, detachable dropped straps;",
            "Ember — structured corset, couture silhouette.",
          ],
        },
      ],
      aRetenir: [
        "Yes: one of the two silhouettes to try first.",
        "Everything is played on the bodice.",
        "The skirt answers the hips without highlighting them.",
      ],
      liens: [
        { href: "/coupes/princesse", label: "Ball gowns" },
        { href: "/robes/fern", label: "Fern" },
        { href: "/robes/kensington", label: "Kensington" },
        { href: "/morphologies/a", label: "The A body shape" },
      ],
    },
    {
      slug: fr("A", 4),
      q: "Is an A-line dress suited to an A body shape?",
      r: "Yes, it is one of the two silhouettes to try first. Its skirt opens from the waist and follows the hips instead of hugging them: it is the easiest silhouette to wear for a whole day.",
      description:
        "A-line wedding dress and A body shape: one of the two silhouettes to try first, the easiest to wear. The A-line dresses at MADAMOON, Paris 10e.",
      chapo:
        "The A-line already has the shape of an A figure, and that is why it suits it so naturally.",
      sections: [
        {
          titre: "Why it works",
          texte: [
            "The skirt opens from the waist and follows the hips without moulding them. The waist, well defined in an A body shape, stays marked; the top is free to hold the eye.",
          ],
        },
        {
          titre: "What to look at",
          texte: [
            "The bodice: beaded, embroidered or in lace, it balances the hips. And the neckline: a straight neckline, as on Nirali, or a sweetheart bodice, as on Finell, structure the top.",
          ],
        },
        {
          titre: "The boutique's A-line dresses",
          texte: ["Among them:"],
          liste: [
            "Emerald — beaded bodice, V neckline;",
            "Carrie — sequinned, hand-beaded corset;",
            "Finell — satin sweetheart bodice;",
            "Solana — lace appliqués and matte sequins;",
            "Charlotte — Caterina lace.",
          ],
        },
      ],
      aRetenir: [
        "Yes: one of the two silhouettes to try first.",
        "The skirt follows the hips without moulding them.",
        "A worked bodice to balance.",
      ],
      liens: [
        { href: "/coupes/trapeze", label: "A-line dresses" },
        { href: "/robes/emerald", label: "Emerald" },
        { href: "/robes/carrie", label: "Carrie" },
        { href: "/morphologies/a", label: "The A body shape" },
      ],
    },
    {
      slug: fr("A", 5),
      q: "Can I wear a mermaid dress with an A body shape?",
      r: "Yes, provided the top has something to balance with: a sleeve, a wide strap, a worked neckline. Many A-shaped brides leave with a mermaid they had not planned to try.",
      description:
        "Mermaid wedding dress and A body shape: yes, with a top that balances — sleeves, straps, a worked neckline. The mermaid dresses at MADAMOON, Paris.",
      chapo:
        "A mermaid hugs the hips: people assume it is not for an A body shape. Yet it is worn very well — here is on what condition.",
      sections: [
        {
          titre: "Yes, with a top that balances",
          texte: [
            "A mermaid highlights the hips and waist. For it to balance the figure, the top needs weight: a sleeve, a wide strap, a worked neckline.",
          ],
        },
        {
          titre: "It is judged when worn",
          texte: [
            "Many A-shaped brides leave with a mermaid they had not planned to try. Try it after the ball gowns and A-lines, to compare.",
          ],
        },
        {
          titre: "The boutique's mermaid dresses",
          texte: [
            "Montana, in matte satin, has long lace sleeves and an illusion back: a top with something to balance with. Shiloh pairs Chantilly lace with a crêpe skirt; Zina has a slit and optional 3D flowers.",
          ],
        },
      ],
      aRetenir: [
        "Yes, with a top that balances.",
        "Sleeves, wide straps, a worked neckline.",
        "Try it after ball gowns and A-lines.",
      ],
      liens: [
        { href: "/coupes/sirene", label: "Mermaid dresses" },
        { href: "/robes/montana", label: "Montana" },
        { href: "/robes/shiloh", label: "Shiloh" },
      ],
    },
    {
      slug: fr("A", 6),
      q: "Which neckline visually widens the line of the shoulders?",
      r: "A bateau neckline or a straight bodice: they draw a horizontal line that widens the shoulders. Off-the-shoulder necklines, dropped straps or a square neck have the same effect.",
      description:
        "Visually widening the shoulders: bateau neckline, straight bodice, off the shoulder, dropped straps, square neck. Advice from the MADAMOON boutique.",
      chapo:
        "A few centimetres of line at the top are enough to change the whole proportion. Here are the necklines that give them.",
      sections: [
        {
          titre: "The bateau neckline and the straight bodice",
          texte: [
            "Both draw a horizontal line from one shoulder to the other, which widens the upper body. They are the necklines the boutique recommends first for an A body shape.",
            "No dress in the catalogue is described with a bateau neckline. Nirali, by Watters Designs, has a straight neckline; Fortune, a strapless bodice.",
          ],
        },
        {
          titre: "Off the shoulder and dropped straps",
          texte: [
            "They extend the line beyond the shoulders. Trinity, Kensington and Dove are off the shoulder; Addison has detachable dropped straps; Hera, dropped straps.",
          ],
        },
        {
          titre: "The square neck",
          texte: [
            "More graphic, it draws a clean line across the bust. Dolores, Clover Perles and River have a square neck or neckline.",
          ],
        },
      ],
      aRetenir: [
        "Bateau neckline or straight bodice.",
        "Off the shoulder, dropped straps.",
        "A square neck, more graphic.",
      ],
      liens: [
        { href: "/robes/nirali", label: "Nirali" },
        { href: "/robes/kensington", label: "Kensington" },
        { href: "/robes/dolores", label: "Dolores" },
        { href: "/morphologies/a", label: "The A body shape" },
      ],
    },
    {
      slug: fr("A", 7),
      q: "Is a strapless bodice suited to an A body shape?",
      r: "Yes, and it is one of the necklines the boutique recommends: a straight bodice draws a line that widens the shoulders, and a worked bodice holds the eye at the top. Paired with a flared skirt, it balances the hips.",
      description:
        "Strapless wedding dress and A body shape: a straight bodice widens the shoulders, a worked bodice holds the eye. The bodices at MADAMOON, Paris.",
      chapo:
        "A bodice and a flared skirt: that is the pairing the boutique recommends first for an A body shape.",
      sections: [
        {
          titre: "Why it works",
          texte: [
            "A straight bodice draws a horizontal line that widens the shoulders. A worked bodice — embroidered, beaded, draped — holds the eye at the top of the body. With a flared skirt, it balances the hips.",
          ],
        },
        {
          titre: "Straight, sweetheart or corseted",
          texte: [
            "A straight bodice widens the line the most. A sweetheart bodice, as on Finell, softens the bust. A structured corset, as on Ember or Guinevere, draws the waist, already well defined in an A body shape.",
          ],
        },
        {
          titre: "Support",
          texte: [
            "A strapless bodice must hold without straps: its fit is what counts. The boutique's seamstresses fit it on you up to the last fitting, alterations included.",
          ],
        },
      ],
      aRetenir: [
        "Yes: a straight bodice widens the shoulders.",
        "Worked, it holds the eye at the top.",
        "With a flared skirt.",
      ],
      liens: [
        { href: "/robes/finell", label: "Finell" },
        { href: "/robes/ember", label: "Ember" },
        { href: "/robes/fortune", label: "Fortune" },
      ],
    },
    {
      slug: fr("A", 8),
      q: "How do I choose a dress that draws the eye to the upper body?",
      r: "Concentrate the dress's work at the top: an embroidered, beaded or draped bodice, a neckline that widens the shoulders, sleeves or straps that count. The skirt, simpler, lets the eye rise.",
      description:
        "Drawing the eye to the upper body: an embroidered or beaded bodice, a widening neckline, sleeves. Advice from the MADAMOON boutique, Paris 10e.",
      chapo:
        "The eye goes where the dress works. For an A body shape, the whole point is to carry it upwards.",
      sections: [
        {
          titre: "Work at the top, simplicity below",
          texte: [
            "A dress with an embroidered, beaded or draped bodice and a simple skirt makes the eye rise by itself. That is the principle of the ball gown and the A-line.",
          ],
        },
        {
          titre: "The details that hold the eye",
          texte: ["In the boutique's catalogue:"],
          liste: [
            "a beaded bodice, as on Emerald or Carrie;",
            "embroidery, as on Fern, in mikado embroidered with beaded flowers;",
            "an off-the-shoulder neckline, as on Trinity;",
            "sleeves, long as on Pendant or balloon as on Ryle.",
          ],
        },
        {
          titre: "On the day",
          texte: [
            "A tip: hair and jewellery play the same role. An updo frees the shoulders, earrings carry the eye to the face.",
          ],
        },
      ],
      aRetenir: [
        "The dress's work at the top.",
        "Beaded bodice, embroidery, off the shoulder.",
        "A simpler skirt.",
      ],
      liens: [
        { href: "/robes/fern", label: "Fern" },
        { href: "/robes/emerald", label: "Emerald" },
        { href: "/robes/ryle", label: "Ryle" },
      ],
    },
    {
      slug: fr("A", 9),
      q: "Which type of bodice should I choose for an A figure?",
      r: "A worked bodice that gives weight to the upper body: embroidered, beaded, draped, or structured as a corset. Its line matters as much as its decoration — straight or square, it widens the shoulders.",
      description:
        "Which bodice for an A figure: embroidered, beaded, draped or corseted, with a straight or square line. The bodices of MADAMOON dresses, Paris 10e.",
      chapo:
        "The bodice is the part of the dress that works hardest for an A body shape. Here is how to choose it.",
      sections: [
        {
          titre: "Decoration that holds the eye",
          texte: [
            "Embroidered, beaded or draped, the bodice gives the upper body something to hold the eye. Emerald and Carrie have a beaded bodice, Maribel a hand-embroidered bodice, Dove a draped neckline.",
          ],
        },
        {
          titre: "A construction that shapes",
          texte: [
            "A structured corset marks the waist, already well defined in an A body shape, and holds the bust. Ember has a structured corset, Guinevere and Santana a basque waist dipping to a point.",
          ],
        },
        {
          titre: "A line that widens",
          texte: [
            "The top line of the bodice matters as much as its decoration: straight, as on Nirali, or square, as on Dolores, it widens the shoulders.",
          ],
        },
      ],
      aRetenir: [
        "Embroidered, beaded or draped.",
        "A corset that marks the waist.",
        "A straight or square line.",
      ],
      liens: [
        { href: "/robes/guinevere", label: "Guinevere" },
        { href: "/robes/maribel", label: "Maribel" },
        { href: "/robes/nirali", label: "Nirali" },
      ],
    },
    {
      slug: fr("A", 10),
      q: "Which wedding dress should I choose when my hips are wider than my shoulders?",
      r: "A dress whose skirt opens from the waist and follows the hips without moulding them — a ball gown or an A-line — with a worked top that balances. Nothing to hide: the skirt goes with the hips, the top does the rest.",
      description:
        "Wedding dress for hips wider than shoulders: a skirt that opens from the waist, a worked top. Ball gown or A-line at MADAMOON.",
      chapo:
        "Hips wider than shoulders do not call for a dress that hides them, but for a dress that goes with them.",
      sections: [
        {
          titre: "A skirt that goes with them",
          texte: [
            "The skirt opens from the waist and follows the hips instead of hugging them. The ball gown does it with fullness, the A-line with a lighter A line.",
          ],
        },
        {
          titre: "A fabric that falls",
          texte: [
            "Light tulle or lace gives an airy skirt that does not mark; mikado, a structured skirt that keeps its shape. A very fine satin, which clings, is judged at the fitting.",
          ],
        },
        {
          titre: "A top that balances",
          texte: [
            "The top does the other half of the work: a worked bodice, a neckline that widens the shoulders, sleeves or straps that count.",
          ],
        },
      ],
      aRetenir: [
        "A skirt that opens from the waist.",
        "Ball gown or A-line.",
        "A worked top that balances.",
      ],
      liens: [
        { href: "/coupes/princesse", label: "Ball gowns" },
        { href: "/coupes/trapeze", label: "A-line dresses" },
        { href: "/morphologies/a", label: "The A body shape" },
      ],
    },
    {
      slug: fr("A", 11),
      q: "Which silhouettes should I try first with an A body shape?",
      r: "The ball gown and the A-line, with a worked top and a neckline that widens the shoulders. Then a sheath and a two-in-one, to compare — and a mermaid if you feel like it.",
      description:
        "A body shape: which silhouettes to try first? The ball gown and the A-line, then a sheath and a two-in-one to compare. Advice from MADAMOON.",
      chapo:
        "The order of fittings helps you understand what suits you, and why. Here is the one the boutique recommends for an A body shape.",
      sections: [
        {
          titre: "The order of fittings",
          texte: [],
          ordonnee: true,
          liste: [
            "A ball gown — to see the effect of a worked bodice and a full skirt.",
            "An A-line — the A skirt from the waist, the easiest to wear.",
            "A sheath — to compare with a dress that does not build.",
            "A two-in-one — two volumes in the same dress.",
          ],
        },
        {
          titre: "And the mermaid",
          texte: [
            "It is not on the starting list, but it is worth trying if it attracts you, with a top that balances. Many A-shaped brides leave with a mermaid they had not planned to try.",
          ],
        },
        {
          titre: "Coming prepared",
          texte: [
            "Keep your favourite dresses in your favourites and mention them when you book: they will be ready when you arrive.",
          ],
        },
      ],
      aRetenir: [
        "First a ball gown and an A-line.",
        "Then a sheath and a two-in-one.",
        "A mermaid if you feel like it.",
      ],
      liens: [
        { href: "/coupes/princesse", label: "Ball gowns" },
        { href: "/coupes/trapeze", label: "A-line dresses" },
        { href: "/rendez-vous", label: "Book an appointment" },
      ],
    },
  ],
};
