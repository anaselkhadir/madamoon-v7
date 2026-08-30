"use client";

import { useSearchParams } from "next/navigation";
import { ROBES } from "@/lib/madamoon";

/*
 * La robe repérée pendant la visite.
 *
 * Le modèle voyage dans l'adresse (?robe=uma) depuis la fiche. La lecture
 * se fait côté navigateur : la page de rendez-vous reste ainsi une page
 * statique, servable partout, y compris sur un hébergement de fichiers.
 */

export default function RobeChoisie() {
  const robe = ROBES.find((r) => r.slug === useSearchParams().get("robe"));
  if (!robe) return null;

  return (
    <p className="texte mt-6">
      Le modèle <strong className="text-encre">{robe.nom}</strong> sera préparé pour votre
      venue — {robe.ligne.toLowerCase()}.
    </p>
  );
}
