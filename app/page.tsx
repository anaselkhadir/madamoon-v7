import type { Metadata } from "next";
import Hero from "@/components/accueil/Hero";
import Silhouette from "@/components/accueil/Silhouette";
import Coupes from "@/components/accueil/Coupes";
import RobesEnScene from "@/components/accueil/RobesEnScene";
import Createurs from "@/components/accueil/Createurs";
import Avis from "@/components/accueil/Avis";
import Showroom from "@/components/accueil/Showroom";
import Rendezvous from "@/components/accueil/Rendezvous";

/*
 * L'accueil.
 *
 * Une seule phrase, en sept temps : on entre par une image, on comprend
 * sa ligne, on voit ce qu'une coupe en fait, on regarde les robes, on
 * apprend qui les dessine, on écoute celles qui les ont portées, on
 * pousse la porte. Puis on prend rendez-vous.
 *
 * L'ordre n'est jamais énoncé — il est seulement tenu. Chaque scène
 * répond à un geste différent : le défilement conduit la silhouette, la
 * main conduit les coupes, les robes tournent seules, la bande des
 * maisons dérive, les paroles montent une à une. Deux scènes voisines
 * qui obéissent au même geste finissent par se ressembler, quelles que
 * soient leurs images.
 *
 * Le hero et la silhouette partagent une boîte : c'est elle qui borne le
 * collant du hero. Celui-ci ne bouge pas et ne change pas d'apparence —
 * ni flou, ni fondu, ni voile — pendant que la silhouette remonte
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
        <Silhouette />
      </div>
      <Coupes />
      <RobesEnScene />
      <Createurs />
      <Avis />
      <Showroom />
      <Rendezvous />
    </>
  );
}
