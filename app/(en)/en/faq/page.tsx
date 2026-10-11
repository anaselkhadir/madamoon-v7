import type { Metadata } from "next";
import PageFaq from "@/components/pages/PageFaq";

export const metadata: Metadata = {
  title: "Wedding dress questions, answered",
  description:
    "How long it takes, how a fitting works, the stages of made-to-measure, payment, price, showroom hours: the answers from MADAMOON, Paris 10e.",
  alternates: {
    canonical: "/en/faq/",
    languages: { fr: "/faq/", en: "/en/faq/", "x-default": "/faq/" },
  },
  /* L'adresse canonique sert aussi d'adresse de partage : sans elle,
   * un lien collé avec un paramètre de campagne devient un objet
   * distinct pour Facebook et Pinterest, et l'attribution se divise. */
  openGraph: { url: "/en/faq/" },
};

export default function Faq() {
  return <PageFaq langue="en" />;
}
