/*
 * Le formulaire de rendez-vous.
 *
 * C'est celui de la maison, et le même que celui de madamoon.fr : un
 * WordPress qui embarque déjà ce widget. Rien n'y est touché — le
 * nouveau site se branche sur le même compte, pas sur une copie.
 *
 * Relevé sur le compte Calendly de contact@madamoon.fr le 8 septembre
 * 2026 : un seul type actif, « RDV essayage », une heure, au showroom,
 * avec six questions dont la date du mariage et la taille.
 *
 * L'adresse pointe le type d'événement et non la page du compte. Les deux
 * mènent au même formulaire tant qu'il n'y en a qu'un ; celle-ci épargne
 * un clic, et le jour où la maison en ajoutera un second, elle continuera
 * de mener à l'essayage plutôt que d'ouvrir une liste.
 */

export const CALENDLY = {
  compte: "madamoon-prise-de-rendez-vous",
  evenement: "prise-de-rendez-vous",
  script: "https://assets.calendly.com/assets/external/widget.js",
} as const;

export const CALENDLY_URL = `https://calendly.com/${CALENDLY.compte}/${CALENDLY.evenement}`;

/*
 * Les couleurs du widget.
 *
 * Calendly les accepte en hexadécimal sans dièse. Ce sont celles du site,
 * reprises de globals.css : l'action, l'encre et le blanc. Sans elles, le
 * bleu de Calendly arriverait au milieu d'une page qui n'en contient
 * aucun.
 *
 * « hide_gdpr_banner » reprend le réglage de madamoon.fr, pour que les
 * deux sites se comportent de la même façon.
 */
const HABILLAGE = {
  background_color: "ffffff",
  text_color: "14100c",
  primary_color: "910000",
  hide_gdpr_banner: "1",
};

/*
 * L'adresse du formulaire, éventuellement marquée.
 *
 * Quand la visiteuse arrive depuis une fiche, le nom de la robe est joint
 * en marqueur de campagne plutôt qu'écrit dans une réponse : le champ
 * libre appartient à la mariée, on n'y met pas de mots à sa place. La
 * maison retrouve l'information sur la réservation.
 */
export function urlCalendly(robe?: string): string {
  const p = new URLSearchParams(HABILLAGE);
  if (robe) {
    p.set("utm_source", "madamoon.fr");
    p.set("utm_medium", "fiche-robe");
    p.set("utm_content", robe);
  }
  return `${CALENDLY_URL}?${p.toString()}`;
}
