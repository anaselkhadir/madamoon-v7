"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { autreLangue, langueDe } from "@/lib/langue";

/*
 * Le commutateur de langue, à côté des coups de cœur.
 *
 * Deux lettres, un filet entre elles, celle de la page en cours à
 * l'encre et l'autre en brume. Pas de drapeau : un drapeau désigne un
 * pays, pas une langue, et la maison reçoit des mariées qui parlent
 * anglais sans être anglaises.
 *
 * Le lien mène à la même page dans l'autre langue — pas à l'accueil.
 * Une mariée qui lit la fiche d'Uma en français doit retrouver Uma en
 * anglais, et non repartir de zéro.
 *
 * C'est un « next/link » brut et non notre « Lien » : celui-ci traduit
 * l'adresse vers la langue courante, ce qui annulerait exactement ce
 * qu'on demande ici.
 */

export default function Langue() {
  const chemin = usePathname() ?? "/";
  const courante = langueDe(chemin);
  const autre = autreLangue(chemin);

  return (
    <p className="lien-nav flex shrink-0 items-center gap-1.5 py-3">
      <span aria-current="true" className="text-encre">
        {courante.toUpperCase()}
      </span>
      <span aria-hidden="true" className="text-fil">
        /
      </span>
      <NextLink
        href={autre.adresse}
        hrefLang={autre.langue}
        lang={autre.langue}
        aria-label={autre.langue === "en" ? "Read this page in English" : "Lire cette page en français"}
        className="text-brume transition-colors duration-500 hover:text-encre"
      >
        {autre.langue.toUpperCase()}
      </NextLink>
    </p>
  );
}
