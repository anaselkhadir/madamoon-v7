import type { Metadata } from "next";
import PageAPropos from "@/components/pages/PageAPropos";

export const metadata: Metadata = {
  title: "L'histoire de MADAMOON, par sa fondatrice",
  description:
    "Mouna a quitté la direction d'un site ferroviaire pour ouvrir MADAMOON, boutique de robes de mariée à Paris 10e. Son récit : le nom, le déclic, le showroom.",
  alternates: {
    canonical: "/a-propos/",
    languages: { fr: "/a-propos/", en: "/en/about/", "x-default": "/a-propos/" },
  },
  /* L'adresse canonique sert aussi d'adresse de partage : sans elle,
   * un lien collé avec un paramètre de campagne devient un objet
   * distinct pour Facebook et Pinterest, et l'attribution se divise. */
  openGraph: { url: "/a-propos/" },
};

export default function AProps() {
  return <PageAPropos langue="fr" />;
}
