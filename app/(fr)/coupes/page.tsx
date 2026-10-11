import type { Metadata } from "next";
import PageCoupes from "@/components/pages/PageCoupes";

export const metadata: Metadata = {
  title: "Les coupes de robe de mariée",
  description:
    "Sirène, princesse, fluide, trapèze, deux-en-un : les coupes du showroom MADAMOON, Paris 10e. Essayage privé sur rendez-vous.",
  alternates: {
    canonical: "/coupes/",
    languages: { fr: "/coupes/", en: "/en/silhouettes/", "x-default": "/coupes/" },
  },
  /* L'adresse canonique sert aussi d'adresse de partage : sans elle,
   * un lien collé avec un paramètre de campagne devient un objet
   * distinct pour Facebook et Pinterest, et l'attribution se divise. */
  openGraph: { url: "/coupes/" },
};

export default function Coupes() {
  return <PageCoupes langue="fr" />;
}
