"use client";

import { useEffect } from "react";
import { consenti, surConsentement } from "@/lib/consentement";

/*
 * Microsoft Clarity, derrière le consentement.
 *
 * Clarity enregistre le parcours des visiteuses — cartes de chaleur,
 * rejeux de session : un traceur analytique, que la CNIL n'exempte pas.
 * Le script ne part donc que si la catégorie « analytique » a été
 * acceptée, jamais avant le choix, et il se pose en cours de visite si
 * la visiteuse accepte depuis le bandeau.
 *
 * Une fois chargé, un script ne se décharge pas : si le consentement est
 * retiré plus tard, on le dit à Clarity — « consent », faux — et rien
 * n'est plus envoyé ; au chargement suivant il ne reviendra pas.
 *
 * Le marqueur est celui du compte MADAMOON.
 */

const MARQUEUR = "yj46ivwiuf";

type AvecClarity = Window & {
  clarity?: ((...args: unknown[]) => void) & { q?: unknown[] };
};

function poser() {
  const w = window as AvecClarity;
  if (document.getElementById("clarity-madamoon")) {
    w.clarity?.("consent");
    return;
  }
  /* La file d'attente de Clarity, telle que la donne Microsoft : les
   * appels faits avant l'arrivée du script y sont gardés. */
  w.clarity =
    w.clarity ||
    function (...args: unknown[]) {
      (w.clarity!.q = w.clarity!.q || []).push(args);
    };
  const script = document.createElement("script");
  script.id = "clarity-madamoon";
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${MARQUEUR}`;
  document.head.appendChild(script);
}

export default function Clarity() {
  useEffect(() => {
    if (consenti("analytique")) poser();
    return surConsentement((choix) => {
      if (choix.analytique) poser();
      else (window as AvecClarity).clarity?.("consent", false);
    });
  }, []);

  return null;
}
