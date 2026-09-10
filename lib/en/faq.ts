import { MAISON } from "@/lib/madamoon";

/*
 * La FAQ en anglais, rangée dans l'ordre de la table française.
 *
 * Les réponses portent des engagements de la maison — délais, acompte,
 * prix de départ. On traduit, on n'arrange pas : si un chiffre change en
 * français, il change ici.
 */

export const FAQ_EN: { q: string; r: string }[] = [
  {
    q: "How long before the wedding should I come?",
    r: "Ideally, book your fitting eight to nine months before the wedding date. There is no need to worry if you have less time than that: we will always find a way. Simply book an appointment, and we take care of the rest.",
  },
  {
    q: "How does a fitting at the showroom work?",
    r: "As soon as you have booked, the showroom is yours alone for an hour. You are welcome to come with your family or your friends. So that we may keep our dresses at their best, please come without make-up: we are quite certain you are beautiful as you are.",
  },
  {
    q: "What are the stages of a made-to-measure dress?",
    r: "The first stage is your first fitting appointment. Once the fitting is over and your choice is made, we take your measurements the same day so the atelier can begin. When your dress is ready, you come and try it on in the boutique to see whether anything needs adjusting. If so, an alterations appointment is arranged with one of our seamstresses on site. Finally, you collect your dress after the last fitting.",
  },
  {
    q: "How does payment work?",
    r: "A deposit is paid on the day your measurements are taken. The balance is paid on the day of the alterations.",
  },
  {
    q: "What is the price range for a made-to-measure dress?",
    r: "For a made-to-measure dress, prices start from €1,500. Do contact us directly for more detail on the models you have in mind.",
  },
  {
    q: "May I bring someone with me?",
    r: "Yes, and we recommend it. The showroom is private: your family and your friends are welcome for the whole of the fitting.",
  },
  {
    q: "Where is the MADAMOON showroom?",
    r: `At ${MAISON.adresse}, ${MAISON.codePostal} ${MAISON.ville}. Fittings take place by appointment only: Monday 12pm to 9pm, Tuesday to Saturday 10am to 7pm.`,
  },
];
