import type { Metadata } from "next";
import PageTrouver from "@/components/pages/PageTrouver";

export const metadata: Metadata = {
  title: "Trouver ma robe de mariée",
  description:
    "Trois façons de commencer : par la coupe, par votre morphologie, ou en conversation avec Élise. Robes de mariée MADAMOON, showroom Paris 10e.",
  alternates: {
    canonical: "/trouver-ma-robe/",
    languages: {
      fr: "/trouver-ma-robe/",
      en: "/en/find-my-dress/",
      "x-default": "/trouver-ma-robe/",
    },
  },
  /* L'adresse canonique sert aussi d'adresse de partage : sans elle,
   * un lien collé avec un paramètre de campagne devient un objet
   * distinct pour Facebook et Pinterest, et l'attribution se divise. */
  openGraph: { url: "/trouver-ma-robe/" },
};

export default function Trouver() {
  return <PageTrouver langue="fr" />;
}
