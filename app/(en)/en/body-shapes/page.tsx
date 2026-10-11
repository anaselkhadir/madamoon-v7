import type { Metadata } from "next";
import PageMorphologies from "@/components/pages/PageMorphologies";

export const metadata: Metadata = {
  title: "Choosing a wedding dress for your body shape",
  description:
    "O, A, V, H, 8 or X: the wedding dress cuts we recommend for each body shape, to try on at the MADAMOON showroom, Paris 10e.",
  alternates: {
    canonical: "/en/body-shapes/",
    languages: { fr: "/morphologies/", en: "/en/body-shapes/", "x-default": "/morphologies/" },
  },
  /* L'adresse canonique sert aussi d'adresse de partage : sans elle,
   * un lien collé avec un paramètre de campagne devient un objet
   * distinct pour Facebook et Pinterest, et l'attribution se divise. */
  openGraph: { url: "/en/body-shapes/" },
};

export default function BodyShapes() {
  return <PageMorphologies langue="en" />;
}
