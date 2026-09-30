"use client";

import type Lenis from "lenis";

/*
 * Le registre du défilement.
 *
 * Lenis est instancié une seule fois, dans <Mouvement />. Les scènes qui
 * ont besoin de GSAP s'y abonnent ensuite — c'est ce qui permet de ne
 * charger GSAP que sur les pages qui l'utilisent réellement.
 */

let instance: Lenis | null = null;
const abonnes = new Set<() => void>();

export function enregistrerLenis(l: Lenis | null) {
  instance = l;
  if (l) abonnes.forEach((fn) => l.on("scroll", fn));
}

/* S'abonner au défilement lissé. Rend la fonction de désabonnement. */
export function surDefilement(fn: () => void) {
  abonnes.add(fn);
  instance?.on("scroll", fn);
  return () => {
    abonnes.delete(fn);
    instance?.off("scroll", fn);
  };
}

/*
 * Resynchroniser Lenis sur la position réelle de la page.
 *
 * Lenis tient sa propre position et la rejoint à chaque image. Le
 * routeur, lui, remonte la fenêtre en haut au changement de page — mais
 * sans le dire à Lenis, qui à l'image suivante ramène la page là où elle
 * était sur la page précédente. On arrivait donc en bas d'une fiche de
 * robe quand on l'avait ouverte depuis le bas du catalogue.
 *
 * On ne force pas le zéro : on prend la position que le routeur vient de
 * poser. Un retour en arrière, où il restaure la place d'avant, la garde
 * donc lui aussi.
 */
export function accorderDefilement() {
  if (typeof window === "undefined" || !instance) return;
  instance.scrollTo(window.scrollY, { immediate: true, force: true });
}

/* Le mouvement se coupe entièrement si l'utilisatrice le demande. */
export function mouvementReduit() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
