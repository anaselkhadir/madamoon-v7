import type { Metadata } from "next";
import PageCoupes from "@/components/pages/PageCoupes";

export const metadata: Metadata = {
  title: "Les six coupes de robe de mariée",
  description:
    "Sirène, princesse, fluide, trapèze, minimaliste, deux-en-un : les six coupes du showroom MADAMOON, Paris 10e. Essayage privé sur rendez-vous.",
  alternates: { canonical: "/coupes", languages: { fr: "/coupes", en: "/en/silhouettes" } },
};

export default function Coupes() {
  return <PageCoupes langue="fr" />;
}
