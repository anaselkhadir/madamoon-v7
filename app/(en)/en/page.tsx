import type { Metadata } from "next";
import Hero from "@/components/accueil/Hero";
import Silhouette from "@/components/accueil/Silhouette";
import Coupes from "@/components/accueil/Coupes";
import Createurs from "@/components/accueil/Createurs";
import Avis from "@/components/accueil/Avis";
import Showroom from "@/components/accueil/Showroom";

/*
 * L'accueil, en anglais.
 *
 * La même page que le français, dans la même langue de composants :
 * seules les propriétés changent. Rien n'est recopié — le jour où une
 * section bouge, elle bouge des deux côtés.
 *
 * L'ouverture n'est pas montée ici. Elle se joue une fois par session
 * sur l'accueil français, et la rejouer en passant à l'anglais ferait
 * quatre secondes de noir pour un changement de langue.
 */

export const metadata: Metadata = {
  /* Absolu : la page anglaise est un segment enfant de son gabarit, et
   * le modèle « %s — MADAMOON » s'y appliquerait — le titre disait deux
   * fois le nom de la maison. La page française, elle, partage son
   * segment avec le gabarit et y échappe. */
  title: { absolute: "Wedding dresses in Paris — MADAMOON bridal boutique" },
  description:
    "Bridal boutique in Paris 10e. The collections of five designers, private fittings by appointment, made to measure from €1,500.",
  alternates: { canonical: "/en", languages: { fr: "/", en: "/en" } },
};

export default function Home() {
  return (
    <>
      <Hero langue="en" />
      <Silhouette langue="en" />
      <Coupes langue="en" />
      <Createurs langue="en" />
      <Avis langue="en" />
      <Showroom langue="en" />
    </>
  );
}
