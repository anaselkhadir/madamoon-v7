import type { Metadata } from "next";
import PageMorphologies from "@/components/pages/PageMorphologies";

export const metadata: Metadata = {
  title: "Robe de mariée selon sa morphologie",
  description:
    "Morphologie en O, A, V, H, 8 ou X : les coupes de robe de mariée conseillées pour chaque morphologie, à essayer au showroom MADAMOON, Paris 10e.",
  alternates: {
    canonical: "/morphologies/",
    languages: { fr: "/morphologies/", en: "/en/body-shapes/", "x-default": "/morphologies/" },
  },
  /* L'adresse canonique sert aussi d'adresse de partage : sans elle,
   * un lien collé avec un paramètre de campagne devient un objet
   * distinct pour Facebook et Pinterest, et l'attribution se divise. */
  openGraph: { url: "/morphologies/" },
};

export default function Morphologies() {
  return <PageMorphologies langue="fr" />;
}
