import type { Metadata } from "next";
import PageRobes from "@/components/pages/PageRobes";

export const metadata: Metadata = {
  title: "Wedding dresses to try on in our Paris showroom",
  description:
    "MADAMOON wedding dresses: mermaid, ball gown, sheath, A-line, two-in-one. The collections of several designers, to try on by appointment in Paris 10e.",
  alternates: {
    canonical: "/en/dresses/",
    languages: { fr: "/robes/", en: "/en/dresses/", "x-default": "/robes/" },
  },
  /* L'adresse canonique sert aussi d'adresse de partage : sans elle,
   * un lien collé avec un paramètre de campagne devient un objet
   * distinct pour Facebook et Pinterest, et l'attribution se divise. */
  openGraph: { url: "/en/dresses/" },
};

export default function Dresses() {
  return <PageRobes langue="en" />;
}
