"use client";

import { useCallback, useEffect, useState } from "react";
import { media as chemin } from "@/lib/chemin";

/*
 * L'ouverture.
 *
 * Quatre secondes de noir avant la maison : deux mots, une signature, et
 * la page qui paraît. C'est le générique d'un film, pas un écran de
 * chargement — il ne retient rien, ne demande rien, et se passe d'un
 * geste.
 *
 * Le minutage est entièrement dans la feuille de style : les animations
 * y sont déclarées avec leurs retards, et le navigateur les joue hors du
 * fil principal. Ce composant ne porte que ce que le CSS ne sait pas
 * faire — rendre la page au bon moment, et savoir s'arrêter.
 *
 * Il ne décide pas non plus s'il doit paraître. C'est un script du
 * gabarit, exécuté avant la première peinture, qui pose « data-ouverture »
 * sur la racine ; sans cet attribut, ce composant ne rend rien. Décider
 * ici serait décider trop tard : le hero aurait déjà clignoté.
 *
 * Le contenu de la page reste dans le document, simplement recouvert :
 * les moteurs le lisent, les lecteurs d'écran aussi. La scène est
 * masquée à l'arbre d'accessibilité — elle n'a rien à dire qui ne soit
 * déjà écrit dessous.
 */

/* Les mêmes instants que la feuille de style. Ils y sont écrits en dur
 * pour que le navigateur n'ait pas à attendre le script ; ils sont
 * rappelés ici pour ce qui doit arriver ensuite. */
const FOND = 3350; // le noir commence à s'effacer
const FIN = 4150; // la scène quitte le document
const PASSE = 350; // le fondu quand on passe l'ouverture

export default function Ouverture() {
  /* Ni « true » ni « false » au premier rendu : on ne sait pas encore.
   * Rendre « true » du côté du serveur poserait une scène noire dans le
   * HTML de tout le monde, robots compris. */
  const [visible, setVisible] = useState(false);
  const [passe, setPasse] = useState(false);

  const relacher = useCallback(() => {
    document.documentElement.removeAttribute("data-ouverture");
  }, []);

  useEffect(() => {
    if (!document.documentElement.hasAttribute("data-ouverture")) return;
    setVisible(true);

    /* Le noir de la racine s'efface au même instant que celui de la
     * scène : deux fondus superposés n'en font qu'un. */
    const t1 = window.setTimeout(relacher, FOND);
    const t2 = window.setTimeout(() => setVisible(false), FIN);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [relacher]);

  /* Un clic, une touche, un doigt, une molette : on passe. Rien n'est
   * demandé, mais rien n'est imposé non plus — et la première tabulation
   * rend la page au clavier avant qu'il ne se perde dans un contenu
   * qu'il ne voit pas. */
  useEffect(() => {
    if (!visible || passe) return;
    const sortir = () => {
      setPasse(true);
      relacher();
      window.setTimeout(() => setVisible(false), PASSE);
    };
    const evenements = ["pointerdown", "keydown", "wheel", "touchstart"] as const;
    evenements.forEach((e) => window.addEventListener(e, sortir, { once: true, passive: true }));
    return () => evenements.forEach((e) => window.removeEventListener(e, sortir));
  }, [visible, passe, relacher]);

  if (!visible) return null;

  return (
    <div className="ouverture" data-passe={passe || undefined} aria-hidden="true">
      <div className="ouverture-scene">
        <span className="ouverture-ligne">L&rsquo;élégance.</span>
        <span className="ouverture-ligne">La grâce.</span>
      </div>
      {/* Le logo de la maison, tel qu'il est. La version blanche existe
        * déjà : c'est celle que la barre pose sur la vidéo du hero. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={chemin("/marque/logo-blanc.png")}
        alt=""
        width={513}
        height={56}
        className="ouverture-signature"
        decoding="sync"
      />
    </div>
  );
}
