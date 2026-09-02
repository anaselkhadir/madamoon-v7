import type { Metadata } from "next";
import Hero from "@/components/accueil/Hero";
import RobesEnRoue from "@/components/accueil/RobesEnRoue";
import Cercle from "@/components/accueil/Cercle";
import Dos from "@/components/accueil/Dos";
import Avis from "@/components/accueil/Avis";
import Showroom from "@/components/accueil/Showroom";
import Rendezvous from "@/components/accueil/Rendezvous";

/*
 * L'accueil.
 *
 * Le rythme de la référence : une image plein cadre, puis des sections
 * courtes séparées par un intitulé en capitales. Chaque scène apporte une
 * image nouvelle — aucune n'est là pour occuper un écran.
 *
 * Le hero et « Nos robes de mariée » partagent une boîte : c'est elle qui
 * borne le collant du hero. Celui-ci ne bouge pas et ne change pas
 * d'apparence — ni flou, ni fondu, ni voile — pendant que la roue remonte
 * par-dessus, portée par son propre fond blanc.
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
      <div className="relative">
        <Hero />
        <RobesEnRoue />
      </div>
      <Cercle />
      <Dos />
      <Avis />
      <Showroom />
      <Rendezvous />
    </>
  );
}
