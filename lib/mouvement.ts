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
  if (!l) return;
  abonnes.forEach((fn) => l.on("scroll", fn));
  /* Lenis défile par lui-même : il ne tient pas compte du blocage posé
   * par l'attente des cookies, il faut l'arrêter aussi. */
  if (document.documentElement.hasAttribute("data-cookies-attente")) l.stop();
}

/* L'attente des cookies est levée : le défilement lissé reprend. */
export function reprendreLenis() {
  instance?.start();
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

/* Le mouvement se coupe entièrement si l'utilisatrice le demande. */
export function mouvementReduit() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
