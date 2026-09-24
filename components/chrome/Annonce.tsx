"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Lien from "@/components/Lien";
import { langueDe } from "@/lib/langue";
import { ANNONCES, ANNONCE_DELAI, ANNONCE_DUREE, ANNONCE_GLISSE } from "@/lib/annonces";

/*
 * L'annonce qui passe sur le bandeau.
 *
 * Elle descend de derrière la bande blanche, en rouge de la maison, dit
 * une ligne, puis remonte. Rien ne bouge autour : elle est posée sur le
 * bandeau, à sa hauteur exacte, et le rend intact en partant.
 *
 * Une fois par visite — le drapeau tient dans la session, comme celui de
 * l'ouverture. La barre ne se démonte pas d'une page à l'autre : la
 * séquence se joue donc une seule fois, même si la visiteuse parcourt
 * dix robes.
 *
 * Sous 901 px le bandeau n'existe pas — « --barre » y vaut zéro — et
 * l'annonce n'a pas de place où s'inscrire : elle ne paraît pas.
 */

const CLE = "madamoon.annonce";

export default function Annonce() {
  const langue = langueDe(usePathname() ?? "/");
  const [rang, setRang] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (ANNONCES.length === 0) return;
    try {
      if (sessionStorage.getItem(CLE)) return;
    } catch {
      /* Stockage refusé : l'annonce passera à chaque visite. */
    }

    const minuteries: ReturnType<typeof setTimeout>[] = [];
    let t = ANNONCE_DELAI;
    ANNONCES.forEach((_, i) => {
      minuteries.push(
        setTimeout(() => {
          setRang(i);
          setVisible(true);
        }, t),
      );
      t += ANNONCE_DUREE;
      minuteries.push(setTimeout(() => setVisible(false), t));
      t += ANNONCE_GLISSE;
    });
    minuteries.push(
      setTimeout(() => {
        setRang(null);
        try {
          sessionStorage.setItem(CLE, "1");
        } catch {
          /* rien : le drapeau n'est qu'un confort */
        }
      }, t),
    );

    return () => minuteries.forEach(clearTimeout);
  }, []);

  if (rang === null) return null;

  const annonce = ANNONCES[rang];
  const mot = langue === "en" ? annonce.en : annonce.fr;
  /* Le blanc est redit en propre : « .mention » n'est pas calquée et
   * l'emporterait sur un utilitaire de couleur. */
  const habits = "mention text-center";
  const teinte = { color: "var(--color-sur-image)" };

  return (
    <div
      /* « status » et non « alert » : une nouvelle de boutique
        * n'interrompt pas ce que la visiteuse est en train de lire. */
      role="status"
      className={`annonce absolute inset-0 z-10 flex items-center justify-center gouttiere transition-transform [transition-timing-function:var(--ease-doux)] ${
        visible ? "translate-y-0" : "pointer-events-none -translate-y-full"
      }`}
      style={{
        background: "var(--color-action)",
        transitionDuration: `${ANNONCE_GLISSE}ms`,
      }}
    >
      {annonce.href ? (
        <Lien href={annonce.href} className={`${habits} souligne`} style={teinte}>
          {mot}
        </Lien>
      ) : (
        <span className={habits} style={teinte}>
          {mot}
        </span>
      )}
    </div>
  );
}
