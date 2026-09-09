import type { Metadata } from "next";
import TitreSection from "@/components/TitreSection";
import ListeCoupsDeCoeur from "@/components/parcours/ListeCoupsDeCoeur";

/*
 * Les coups de cœur.
 *
 * Le contenu appartient au navigateur de la visiteuse ; cette page n'est
 * qu'un cadre. Elle reste hors des moteurs : il n'y a rien à indexer
 * d'une liste qui n'existe que chez elle, et une adresse vide dans les
 * résultats de recherche ne rendrait service à personne.
 */

export const metadata: Metadata = {
  title: "Vos coups de cœur",
  description:
    "Les robes de mariée que vous avez retenues chez MADAMOON, à retrouver avant votre essayage privé à Paris 10e.",
  alternates: { canonical: "/coups-de-coeur" },
  robots: { index: false, follow: true },
};

export default function CoupsDeCoeur() {
  return (
    <>
      <div className="pt-[var(--entete)]">
        <TitreSection
          niveau={1}
          titre="Vos coups de cœur"
          lien={{ href: "/robes", label: "Voir toutes les robes" }}
        />
      </div>
      <ListeCoupsDeCoeur />
    </>
  );
}
