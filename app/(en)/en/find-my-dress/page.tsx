import type { Metadata } from "next";
import PageTrouver from "@/components/pages/PageTrouver";

export const metadata: Metadata = {
  title: "Find my wedding dress",
  description:
    "Three ways to begin: by silhouette, by your body shape, or in conversation with Élise. MADAMOON wedding dresses, showroom in Paris 10e.",
  alternates: {
    canonical: "/en/find-my-dress/",
    languages: {
      fr: "/trouver-ma-robe/",
      en: "/en/find-my-dress/",
      "x-default": "/trouver-ma-robe/",
    },
  },
  /* L'adresse canonique sert aussi d'adresse de partage : sans elle,
   * un lien collé avec un paramètre de campagne devient un objet
   * distinct pour Facebook et Pinterest, et l'attribution se divise. */
  openGraph: { url: "/en/find-my-dress/" },
};

export default function FindMyDress() {
  return <PageTrouver langue="en" />;
}
