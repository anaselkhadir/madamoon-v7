import type { Metadata } from "next";
import PageTrouver from "@/components/pages/PageTrouver";

export const metadata: Metadata = {
  title: "Trouver ma robe de mariée",
  description:
    "Trois façons de commencer : par la coupe, par votre morphologie, ou en conversation avec Élise. Robes de mariée MADAMOON, showroom Paris 10e.",
  alternates: {
    canonical: "/trouver-ma-robe",
    languages: { fr: "/trouver-ma-robe", en: "/en/find-my-dress" },
  },
};

export default function Trouver() {
  return <PageTrouver langue="fr" />;
}
