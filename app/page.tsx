import type { Metadata } from "next";
import Hero from "@/components/accueil/Hero";
import Modeles from "@/components/accueil/Modeles";
import Cercle from "@/components/accueil/Cercle";
import Dos from "@/components/accueil/Dos";
import Showroom from "@/components/accueil/Showroom";
import Rendezvous from "@/components/accueil/Rendezvous";

/*
 * L'accueil.
 *
 * Le rythme de la référence : une image plein cadre, puis des sections
 * courtes séparées par un intitulé en capitales. Chaque scène apporte une
 * image nouvelle — aucune n'est là pour occuper un écran.
 */

export const metadata: Metadata = {
  title: "Robes de mariée à Paris — Boutique MADAMOON",
  description:
    "Boutique de robes de mariée à Paris 10e. Quarante modèles de cinq créateurs, essayage privé sur rendez-vous, confection sur mesure à partir de 1 500 €.",
  alternates: { canonical: "/" },
};

export default function Accueil() {
  return (
    <>
      <Hero />
      <Modeles />
      <Cercle />
      <Dos />
      <Showroom />
      <Rendezvous />
    </>
  );
}
