import type { Metadata } from "next";
import PageMorphologies from "@/components/pages/PageMorphologies";

export const metadata: Metadata = {
  title: "Robe de mariée selon sa morphologie",
  description:
    "Silhouette en O, A, V, H, 8 ou X : les coupes de robe de mariée conseillées pour chaque morphologie, à essayer au showroom MADAMOON, Paris 10e.",
  alternates: {
    canonical: "/morphologies",
    languages: { fr: "/morphologies", en: "/en/body-shapes" },
  },
};

export default function Morphologies() {
  return <PageMorphologies langue="fr" />;
}
