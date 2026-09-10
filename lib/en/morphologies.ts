/*
 * Les six morphologies, en anglais.
 *
 * Les lettres restent. C'est le système de la maison — elles se lisent
 * en gros serif sur les photographies de l'accueil — et les traduire en
 * « pear », « apple », « hourglass » aurait remplacé un vocabulaire
 * clair par un autre qui compare les femmes à des fruits.
 *
 * Ce qui se traduit, c'est ce qu'elles décrivent.
 */

export const MORPHO_NOM: Record<string, string> = {
  O: "The O shape",
  A: "The A shape",
  V: "The V shape",
  H: "The H shape",
  "8": "The 8 shape",
  X: "The X shape",
};

export const MORPHO_SILHOUETTE: Record<string, string> = {
  O: "Generous curves, a full bust and a soft middle.",
  A: "Shoulders narrower than the hips, a clearly drawn waist.",
  V: "Broad shoulders, narrower hips.",
  H: "A straight line, a waist that barely marks.",
  "8": "Shoulders and hips in balance, a marked waist.",
  X: "A balanced figure, soft curves, a fine waist.",
};

export const MORPHO_OBJECTIF: Record<string, string> = {
  O: "Lengthen the line and bring the bust forward.",
  A: "Draw the eye back up to the shoulders.",
  V: "Soften the top and give volume below.",
  H: "Create curve, without forcing it.",
  "8": "Bring out a harmony that is already there.",
  X: "Show the figure without overstating it.",
};
