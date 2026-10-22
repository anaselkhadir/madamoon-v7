import { MAISON } from "@/lib/madamoon";
import { SLUGS_QUESTIONS, type Article } from "@/lib/questions";

/*
 * The question pages, in English.
 *
 * Same order, same commitments as the French table. We translate, we do
 * not embellish: if a delay, a payment step or a price changes in French,
 * it changes here.
 */

const ADDRESS = `${MAISON.adresse}, ${MAISON.codePostal} ${MAISON.ville}`;

export const ARTICLES_EN: Article[] = [
  /* ————————————————————————————————————————— timing ————— */
  {
    slug: SLUGS_QUESTIONS[0],
    description:
      "Wedding dress: book your fitting eight to nine months before the wedding. Why it takes that long, and what to do if you have less time.",
    chapo:
      "Eight to nine months before the date: that is when the boutique recommends a first fitting. Here is what that time covers, and what to do if your wedding is sooner.",
    sections: [
      {
        titre: "Why eight to nine months",
        texte: [
          "At MADAMOON, a dress is not taken off a rail. Once chosen, it is made in the atelier to your measurements, then tried on and fitted on site by the boutique's seamstresses.",
          "Each of these stages needs its own time: the choice, the making, the second fitting, the alterations, the final fitting. Starting early gives each one the room it needs — and lets you reach the last weeks without rushing.",
        ],
      },
      {
        titre: "What that time covers",
        texte: ["Between your first appointment and the day you leave with your dress:"],
        ordonnee: true,
        liste: [
          "the first fitting, in a showroom reserved for you;",
          "your measurements, taken the very day you choose;",
          "the making of your dress in the atelier;",
          "a second fitting once it is ready;",
          "the alterations, done on site by our seamstresses;",
          "the final fitting, then collection.",
        ],
      },
      {
        titre: "If you have less time",
        texte: [
          "No need to worry. Tell us when you book, giving your wedding date: the boutique almost always finds a way.",
          "One piece of advice in that case: come with an idea of the silhouettes you are drawn to. The catalogue and the pages on silhouettes and body shapes are there for that — your fitting will be all the more productive.",
        ],
      },
      {
        titre: "Preparing that first appointment",
        texte: [
          "Browse the dresses online and keep the ones that stop you in your favourites. If you are unsure about the silhouette, Élise, the site's advisor, starts from your body shape and points you in a direction in a few questions.",
        ],
      },
    ],
    aRetenir: [
      "First fitting: ideally eight to nine months before the wedding.",
      "That time covers the choice, the making and the alterations.",
      "Less time? Say so when you book: there is almost always a way.",
    ],
    liens: [
      { href: "/robes", label: "See all the dresses" },
      { href: "/trouver-ma-robe", label: "Find my dress with Élise" },
      { href: "/morphologies", label: "Body shapes" },
    ],
  },

  /* ——————————————————————————————————————— the fitting ————— */
  {
    slug: SLUGS_QUESTIONS[1],
    description:
      "A wedding dress fitting at MADAMOON: the showroom reserved for you for an hour, your loved ones with you, no make-up. Free, by appointment, Paris 10e.",
    chapo:
      "An hour, a showroom that is yours alone, your loved ones around you: a fitting at MADAMOON is a private appointment. Here is how it goes.",
    sections: [
      {
        titre: "A showroom reserved for you",
        texte: [
          "As soon as you have booked, the showroom is yours alone for an hour. No other client, no waiting between fitting rooms: the hour belongs to you, and you only.",
          "The place is part of the moment — a nineteenth-century setting on rue du Faubourg Saint-Martin, designed so that a fitting is an experience to share, not a race.",
        ],
      },
      {
        titre: "How the hour goes",
        texte: [
          "The appointment starts with a conversation. Before you try anything on, the boutique wants to understand who you are, what you love and what you want your wedding day to say.",
          "Then come the recommendations — silhouette, shape, fabric — and the fittings. The aim is not to go through as many dresses as possible, but to lead you to the one in which you recognise yourself.",
        ],
      },
      {
        titre: "Coming without make-up",
        texte: [
          "To keep the dresses at their best, the boutique asks you to come without make-up: foundation and lipstick mark lace and satin, and these dresses are tried on by other brides after you. We are quite certain you are beautiful as you are.",
          "A practical tip: simple, skin-tone underwear will help you judge how each dress falls.",
        ],
      },
      {
        titre: "Preparing your visit",
        texte: [
          "If some models caught your eye on the site, mention them when you book: they will be ready for your visit. Your favourites are saved online, with one click on the heart of each dress.",
          "The fitting is free, and it is by appointment only.",
        ],
      },
    ],
    aRetenir: [
      "One hour, the showroom reserved for you.",
      "Your loved ones are welcome.",
      "Come without make-up, to protect the dresses.",
      "Free, by appointment only.",
    ],
    liens: [
      { href: "/showroom", label: "Discover the showroom" },
      { href: "/coups-de-coeur", label: "My favourites" },
      { href: "/rendez-vous", label: "Book an appointment" },
    ],
  },

  /* ———————————————————————————————————————— the stages ————— */
  {
    slug: SLUGS_QUESTIONS[2],
    description:
      "A made-to-measure wedding dress: fitting, measurements, making in the atelier, fittings, alterations included, collection. The stages at MADAMOON, Paris.",
    chapo:
      "From the first fitting to collection, a made-to-measure dress goes through eight stages. Here they are in order, with what happens at each.",
    sections: [
      {
        titre: "The eight stages of your dress",
        texte: [],
        ordonnee: true,
        liste: [
          "The appointment — you book your first fitting, ideally eight to nine months before the wedding.",
          "The private fitting — an hour at the showroom, reserved for you and your loved ones.",
          "The measurements — once your choice is made, they are taken the same day, so the making can begin.",
          "The making — your dress is made in the atelier, to your measurements: fine fabrics, hand finishing.",
          "The second fitting — when your dress is ready, you come and try it on in the boutique.",
          "The alterations — if anything needs adjusting, our seamstresses take care of it, on site.",
          "The final fitting — it confirms the fall, the length, the ease.",
          "Collection — you leave with your dress, perfectly fitted.",
        ],
      },
      {
        titre: "Made-to-measure or semi-custom",
        texte: [
          "Most of the boutique's dresses are made to measure, from your measurements.",
          "Watters Designs dresses are semi-custom: the dress is made on the house's own pattern, then fitted to your figure. Each page on the site says how the dress is made. Either way, alterations are included.",
        ],
      },
      {
        titre: "Alterations, included",
        texte: [
          "Alterations are part of the making: they are not added to the price. They are done on site by the boutique's seamstresses, who adjust your dress right up to the last fitting.",
        ],
      },
      {
        titre: "When to pay",
        texte: [
          "Payment follows the stages: a deposit on the day of your measurements, the balance on the day of the alterations.",
        ],
      },
    ],
    aRetenir: [
      "Measurements taken the same day you choose.",
      "Made in the atelier, to your measurements — semi-custom for Watters Designs.",
      "Alterations included, done on site.",
      "A final fitting before you leave with your dress.",
    ],
    liens: [
      { href: "/robes", label: "See all the dresses" },
      { href: "/createurs/watters-designs", label: "Watters Designs" },
      { href: "/rendez-vous", label: "Book an appointment" },
    ],
  },

  /* ——————————————————————————————————————— payment ————— */
  {
    slug: SLUGS_QUESTIONS[3],
    description:
      "Paying for a wedding dress at MADAMOON: a deposit on the day of your measurements, the balance on the day of the alterations. Alterations are included.",
    chapo:
      "Two payments, at two precise points in the journey: a deposit when the making begins, the balance once your dress is fitted.",
    sections: [
      {
        titre: "The deposit, on the day of your measurements",
        texte: [
          "Once your dress is chosen, the boutique takes your measurements the same day. The deposit is paid that day: it sets the making of your dress in motion in the atelier, to your measurements.",
        ],
      },
      {
        titre: "The balance, on the day of the alterations",
        texte: [
          "When your dress is ready, you come and try it on in the boutique. If it needs adjusting, an alterations appointment is arranged with one of the seamstresses, on site. The balance is paid that day.",
        ],
      },
      {
        titre: "What the price includes",
        texte: [
          "The price of a made-to-measure dress includes its making and its alterations: the adjustments made by our seamstresses are not added to the bill. Accessories sold separately — a veil, gloves — are paid for on their own.",
        ],
      },
      {
        titre: "The details, with the boutique",
        texte: [
          "The amount of the deposit and the payment methods are settled with the boutique when you choose your dress. Do ask during your appointment, or call the showroom beforehand.",
        ],
      },
    ],
    aRetenir: [
      "A deposit, on the day of your measurements.",
      "The balance, on the day of the alterations.",
      "Alterations are included in the price.",
    ],
    liens: [
      { href: "/rendez-vous", label: "Book an appointment" },
      { href: "/robes", label: "See all the dresses" },
    ],
  },

  /* ————————————————————————————————————————— price ————— */
  {
    slug: SLUGS_QUESTIONS[4],
    description:
      "The price of a made-to-measure wedding dress at MADAMOON: from €1,500, alterations included. What makes the price vary, and how to find it out.",
    chapo:
      "A made-to-measure wedding dress at MADAMOON starts at €1,500, alterations included. Here is what that price covers, and why it varies from one dress to another.",
    sections: [
      {
        titre: "From €1,500",
        texte: [
          "That is the starting price of a dress made to measure by the boutique. It includes the making in the atelier, to your measurements, and the alterations done on site by our seamstresses up to the last fitting.",
        ],
      },
      {
        titre: "What makes the price vary",
        texte: [
          "From one dress to another, the price depends first on the model and the house that designed it, then on what it is made of: the fabric — satin, crêpe, tulle, Chantilly lace —, how dense the embroidery is, the fullness of the skirt, the length of the train.",
          "Some dresses come with pieces sold separately, such as a veil or gloves. They are chosen on their own, and are not included in the price of the dress.",
        ],
      },
      {
        titre: "A made-to-measure dress has no price tag",
        texte: [
          "Its price is worked out with you, according to the model and what you make of it. The boutique prefers to discuss it in person, dress by dress, rather than quote a figure that would not match yours.",
        ],
      },
      {
        titre: "Finding out the price of a model",
        texte: [
          "Contact the boutique directly with the models you are interested in, or ask during your fitting. You can keep those models in your favourites on the site, to find them again easily.",
        ],
      },
    ],
    aRetenir: [
      "From €1,500 for a made-to-measure dress.",
      "Making and alterations included.",
      "The price varies with the model, the house and the fabrics.",
      "For a specific model: contact the boutique.",
    ],
    liens: [
      { href: "/robes", label: "See all the dresses" },
      { href: "/coups-de-coeur", label: "My favourites" },
      { href: "/rendez-vous", label: "Book an appointment" },
    ],
  },

  /* ——————————————————————————————————— coming with others ————— */
  {
    slug: SLUGS_QUESTIONS[5],
    description:
      "Bringing someone to your wedding dress fitting: yes, and we recommend it. The MADAMOON showroom is reserved for you and your loved ones. Paris 10e.",
    chapo:
      "Yes — and we recommend it. The showroom is reserved for you: your family and your friends are welcome for the whole of the fitting.",
    sections: [
      {
        titre: "A moment to share",
        texte: [
          "Choosing a wedding dress is rarely done alone. Because the showroom is reserved for you for an hour, your loved ones are not onlookers standing in an aisle: they are your guests, for the length of the fitting.",
          "The boutique wanted it that way — a setting designed to make the fitting an experience to share with the people who matter.",
        ],
      },
      {
        titre: "Who to bring",
        texte: [
          "A piece of advice: come with the people whose opinion really matters to you, and who help you see clearly. A mother, a sister, a friend who knows you well.",
          "If you are coming as a group, say so when you book: the boutique can prepare for your visit.",
        ],
      },
      {
        titre: "Your own eye first",
        texte: [
          "Your loved ones' opinions are precious, but you are the one who will wear the dress. The advisor is there to help you weigh them — and to recognise the dress in which you feel like yourself.",
        ],
      },
    ],
    aRetenir: [
      "Yes, and we recommend it.",
      "The showroom is reserved for you and your loved ones.",
      "Coming as a group? Say so when you book.",
    ],
    liens: [
      { href: "/showroom", label: "Discover the showroom" },
      { href: "/rendez-vous", label: "Book an appointment" },
    ],
  },

  /* ————————————————————————————————————— the showroom ————— */
  {
    slug: SLUGS_QUESTIONS[6],
    description: `The MADAMOON showroom: ${ADDRESS}. Fittings by appointment, Monday 12pm to 9pm, Tuesday to Saturday 10am to 7pm.`,
    chapo: `The MADAMOON showroom is at ${ADDRESS}. Fittings there are by appointment only.`,
    sections: [
      {
        titre: "The address",
        texte: [
          `${ADDRESS}, in the 10th arrondissement. The showroom sits in an elegant nineteenth-century setting: a timeless place, designed for trying on a wedding dress.`,
        ],
      },
      {
        titre: "Opening hours",
        texte: ["Fittings are by appointment only:"],
        liste: ["Monday, 12pm to 9pm;", "Tuesday to Saturday, 10am to 7pm."],
      },
      {
        titre: "Why by appointment",
        texte: [
          "Because the showroom is reserved for each bride, for an hour. An appointment guarantees you the place, the dresses and the boutique's full attention — no waiting, and no other client in the fitting room.",
        ],
      },
      {
        titre: "Getting in touch",
        texte: [
          `By phone on ${MAISON.telephone}, or by email at ${MAISON.email}. For directions, the boutique's Google Maps listing will guide you to the door.`,
        ],
      },
    ],
    aRetenir: [ADDRESS, "Monday: 12pm – 9pm. Tuesday to Saturday: 10am – 7pm.", "By appointment only."],
    liens: [
      { href: "/showroom", label: "Discover the showroom" },
      { href: "/rendez-vous", label: "Book an appointment" },
    ],
  },
];
