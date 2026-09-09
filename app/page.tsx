import type { Metadata } from "next";
import Hero from "@/components/accueil/Hero";
import Silhouette from "@/components/accueil/Silhouette";
import Coupes from "@/components/accueil/Coupes";
import Createurs from "@/components/accueil/Createurs";
import Avis from "@/components/accueil/Avis";
import Showroom from "@/components/accueil/Showroom";

/*
 * L'accueil.
 *
 * Une seule phrase, en six temps : on entre par une image, on comprend
 * sa ligne, on voit ce qu'une coupe en fait, on apprend qui dessine les
 * robes, on écoute celles qui les ont portées, on pousse la porte. Puis
 * on prend rendez-vous.
 *
 * L'ordre n'est jamais énoncé — il est seulement tenu. Les robes elles-
 * mêmes ne sont pas montrées ici : on y arrive par une coupe ou par une
 * maison, ce qui vaut mieux qu'une vitrine de plus. L'accueil présente
 * des façons de chercher, pas un catalogue.
 *
 * Le hero défile comme le reste. Il est resté un temps collé, la
 * silhouette remontant par-dessus ; la maison n'a pas aimé cette
 * transition, et elle avait raison — le hero y restait figé pendant huit
 * cents pixels, coupé par une ligne blanche franche. Une image qui s'en
 * va vers le haut se passe d'effet.
 */

export const metadata: Metadata = {
  title: "Robes de mariée à Paris — Boutique MADAMOON",
  description:
    "Boutique de robes de mariée à Paris 10e. Les collections de cinq créateurs, essayage privé sur rendez-vous, confection sur mesure à partir de 1 500 €.",
  alternates: { canonical: "/" },
};

export default function Accueil() {
  return (
    <>
      <Hero />
      <Silhouette />
      <Coupes />
      <Createurs />
      <Avis />
      <Showroom />
    </>
  );
}
