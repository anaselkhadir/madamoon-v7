import type { Metadata } from "next";
import PageAPropos from "@/components/pages/PageAPropos";

export const metadata: Metadata = {
  title: "The MADAMOON story, by its founder",
  description:
    "Mouna left the running of a railway site to open MADAMOON, a wedding dress boutique in Paris 10e. Her story: the name, the turning point, the showroom.",
  alternates: {
    canonical: "/en/about/",
    languages: { fr: "/a-propos/", en: "/en/about/", "x-default": "/a-propos/" },
  },
  /* L'adresse canonique sert aussi d'adresse de partage : sans elle,
   * un lien collé avec un paramètre de campagne devient un objet
   * distinct pour Facebook et Pinterest, et l'attribution se divise. */
  openGraph: { url: "/en/about/" },
};

export default function About() {
  return <PageAPropos langue="en" />;
}
